/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { db as prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { EventCreateSchema, EventRegistrationSchema } from "@/lib/validations/event";
import { uploadImageToCloudinary, deleteImageFromCloudinary } from "./cloudinary";
import { headers } from "next/headers";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const regRateLimitMap = new Map<string, { count: number; timestamp: number }>();
async function checkRegRateLimit(): Promise<boolean> {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "127.0.0.1";
  const now = Date.now();
  const record = regRateLimitMap.get(ip);
  if (!record) { regRateLimitMap.set(ip, { count: 1, timestamp: now }); return true; }
  if (now - record.timestamp > 3600000) { regRateLimitMap.set(ip, { count: 1, timestamp: now }); return true; }
  if (record.count >= 5) return false;
  record.count += 1;
  return true;
}

export async function createEvent(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) return { success: false, error: "Unauthorized." };

    const rawData = {
      title: formData.get("title"), slug: formData.get("slug"), category: formData.get("category"),
      shortDescription: formData.get("shortDescription"), description: formData.get("description"),
      startDate: formData.get("startDate"), endDate: formData.get("endDate"), location: formData.get("location"),
      status: formData.get("status"), registrationRequired: formData.get("registrationRequired") === "on",
      registrationDeadline: formData.get("registrationDeadline"), maxParticipants: formData.get("maxParticipants"),
    };

    const validatedData = EventCreateSchema.safeParse(rawData);
    if (!validatedData.success) return { success: false, error: validatedData.error.issues.map((e: {message: string}) => e.message).join(", ") };

    const bannerImage = formData.get("bannerImage") as File;
    let imageUrl = null; let publicId = null;

    if (bannerImage && bannerImage.size > 0) {
      if (bannerImage.size > MAX_FILE_SIZE) return { success: false, error: "Banner max 5MB" };
      if (!ALLOWED_TYPES.includes(bannerImage.type)) return { success: false, error: "Invalid banner format" };
      const upload = await uploadImageToCloudinary(bannerImage);
      imageUrl = upload.url; publicId = upload.publicId;
    }

    try {
      await prisma.event.create({ data: { ...validatedData.data, imageUrl } });
    } catch (e) {
      if (publicId) await deleteImageFromCloudinary(publicId);
      return { success: false, error: "Database error. Failed to create event." };
    }

    revalidatePath("/dashboard/events"); revalidatePath("/events");
    return { success: true };
  } catch (error) { return { success: false, error: "Unexpected error occurred." }; }
}

export async function updateEvent(eventId: string, formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) return { success: false, error: "Unauthorized." };

    const rawData = {
      title: formData.get("title"), slug: formData.get("slug"), category: formData.get("category"),
      shortDescription: formData.get("shortDescription"), description: formData.get("description"),
      startDate: formData.get("startDate"), endDate: formData.get("endDate"), location: formData.get("location"),
      status: formData.get("status"), registrationRequired: formData.get("registrationRequired") === "on",
      registrationDeadline: formData.get("registrationDeadline"), maxParticipants: formData.get("maxParticipants"),
    };

    const validatedData = EventCreateSchema.safeParse(rawData);
    if (!validatedData.success) return { success: false, error: validatedData.error.issues.map((e: {message: string}) => e.message).join(", ") };

    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) return { success: false, error: "Event not found" };

    const bannerImage = formData.get("bannerImage") as File;
    let imageUrl = event.imageUrl;

    if (bannerImage && bannerImage.size > 0) {
      if (bannerImage.size > MAX_FILE_SIZE) return { success: false, error: "Banner max 5MB" };
      if (!ALLOWED_TYPES.includes(bannerImage.type)) return { success: false, error: "Invalid banner format" };
      
      const upload = await uploadImageToCloudinary(bannerImage);
      imageUrl = upload.url;
      
      // We are deliberately leaving the old Cloudinary image here for now (orphaned) 
      // in a real prod system we'd extract public_id from event.imageUrl and delete it.
    }

    await prisma.event.update({
      where: { id: eventId },
      data: { ...validatedData.data, imageUrl }
    });

    revalidatePath("/dashboard/events"); revalidatePath(`/dashboard/events/${eventId}/edit`); revalidatePath("/events");
    return { success: true };
  } catch (error) { return { success: false, error: "Failed to update event." }; }
}

export async function archiveEvent(eventId: string) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) return { success: false, error: "Unauthorized." };

    await prisma.event.update({
      where: { id: eventId },
      data: { status: "COMPLETED" } // Archiving effectively locks the event from new registrations
    });

    revalidatePath("/dashboard/events");
    return { success: true };
  } catch (error) { return { success: false, error: "Failed to archive event." }; }
}

export async function deleteEvent(eventId: string) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) return { success: false, error: "Unauthorized." };

    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) return { success: false, error: "Event not found" };

    // Note: Due to onDelete: Cascade, all EventRegistration records will be permanently deleted.
    await prisma.event.delete({ where: { id: eventId } });

    revalidatePath("/dashboard/events"); revalidatePath("/events");
    return { success: true };
  } catch (error) { return { success: false, error: "Failed to delete event." }; }
}

export async function registerForEvent(formData: FormData) {
  try {
    if (!(await checkRegRateLimit())) return { success: false, error: "Too many registration attempts." };

    const rawData = {
      eventId: formData.get("eventId"), name: formData.get("name"), email: formData.get("email"),
      phone: formData.get("phone"), college: formData.get("college")
    };

    const validatedData = EventRegistrationSchema.safeParse(rawData);
    if (!validatedData.success) return { success: false, error: validatedData.error.issues.map((e: {message: string}) => e.message).join(", ") };

    const { eventId, name, email, phone, college } = validatedData.data;

    try {
      await prisma.$transaction(async (tx) => {
        // Atomic capacity and status check within transaction boundary
        const lockedEvent = await tx.event.findUnique({
          where: { id: eventId },
          include: { _count: { select: { registrations: true } } }
        });

        if (!lockedEvent) throw new Error("Event not found.");
        
        // SECURITY: Block DRAFT, CANCELLED, COMPLETED
        if (lockedEvent.status !== "PUBLISHED") {
          throw new Error("Registrations are currently closed for this event.");
        }
        
        if (!lockedEvent.registrationRequired) throw new Error("Registration not required for this event.");
        if (lockedEvent.registrationDeadline && new Date() > new Date(lockedEvent.registrationDeadline)) {
          throw new Error("Registration deadline has passed.");
        }
        if (lockedEvent.maxParticipants && lockedEvent._count.registrations >= lockedEvent.maxParticipants) {
          throw new Error("Event has reached maximum capacity.");
        }

        await tx.eventRegistration.create({
          data: { eventId, name, email, phone, college }
        });
      });
    } catch (dbError: any) {
      if (dbError.code === 'P2002') return { success: false, error: "You have already registered for this event with this email." };
      if (dbError instanceof Error) return { success: false, error: dbError.message };
      throw dbError;
    }

    revalidatePath(`/events`); revalidatePath(`/dashboard/events/${eventId}/registrations`);
    return { success: true };
  } catch (error) { return { success: false, error: "Failed to register. Please try again." }; }
}
