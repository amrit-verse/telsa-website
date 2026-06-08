"use server";

import prisma from "@/lib/db";
import { uploadImageToCloudinary, deleteImageFromCloudinary } from "./cloudinary";
import { revalidatePath } from "next/cache";
import { MembershipApplicationSchema } from "@/lib/validations/membership";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

// In-memory rate limiting architecture suitable for basic Vercel protection
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 3;

async function checkRateLimit(): Promise<boolean> {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "127.0.0.1";
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }
  
  if (now - record.timestamp > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }
  
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  
  record.count += 1;
  return true;
}

export async function applyForMembership(formData: FormData) {
  try {
    // 1. Rate Limiting Check
    if (!(await checkRateLimit())) {
      return { success: false, error: "Too many applications from your IP. Please try again later." };
    }

    // 2. Strict Zod Validation of Form Inputs
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      college: formData.get("college"),
      course: formData.get("course"),
      academicLevel: formData.get("academicLevel"),
      district: formData.get("district"),
      category: formData.get("category"),
      type: formData.get("type"),
    };

    const validatedData = MembershipApplicationSchema.safeParse(rawData);
    if (!validatedData.success) {
      return { 
        success: false, 
        error: "Validation failed: " + validatedData.error.errors.map(e => e.message).join(", ") 
      };
    }

    const { name, email, phone, college, course, academicLevel, district, category, type } = validatedData.data;

    // 3. File Validation (MIME & Size)
    const paymentProof = formData.get("paymentProof") as File;
    const studentId = formData.get("studentId") as File;

    if (!paymentProof || !studentId) {
      return { success: false, error: "Both Payment Proof and Student ID are required." };
    }
    if (paymentProof.size > MAX_FILE_SIZE || studentId.size > MAX_FILE_SIZE) {
      return { success: false, error: "Files must be strictly less than 5MB each." };
    }
    if (!ALLOWED_TYPES.includes(paymentProof.type) || !ALLOWED_TYPES.includes(studentId.type)) {
      return { success: false, error: "Only JPEG, PNG, and WebP images are allowed." };
    }

    // 4. Secure File Upload
    let paymentProofData, studentIdData;
    try {
      paymentProofData = await uploadImageToCloudinary(paymentProof);
      studentIdData = await uploadImageToCloudinary(studentId);
    } catch (error) {
      return { success: false, error: "Failed to securely upload documents." };
    }

    // 5. Atomic Database Transaction with Orphan Cleanup Strategy
    try {
      await prisma.$transaction(async (tx) => {
        const user = await tx.user.upsert({
          where: { email },
          update: { name, phone, college, course, academicLevel, category },
          create: {
            name, email, phone, college, course, academicLevel, category,
            passwordHash: "pending_account",
            role: "GUEST" // STRICT ISOLATION
          }
        });

        await tx.membership.create({
          data: {
            userId: user.id,
            type: type as "ORDINARY" | "LIFETIME",
            status: "PENDING",
            district,
            paymentProofUrl: paymentProofData.url,
            studentIdUrl: studentIdData.url,
          }
        });
      });
    } catch (error) {
      // ORPHAN CLEANUP: Database failed, destroy uploaded assets
      console.error("Database transaction failed, triggering Cloudinary orphan cleanup...");
      await deleteImageFromCloudinary(paymentProofData.publicId);
      await deleteImageFromCloudinary(studentIdData.publicId);
      throw error; 
    }

    revalidatePath("/dashboard/members");
    return { success: true };

  } catch (error) {
    console.error("Membership Application Error:", error);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}

export async function updateMembershipStatus(membershipId: string, status: "ACTIVE" | "REJECTED" | "EXPIRED") {
  try {
    // STRICT SERVER AUTHORIZATION (Do not rely solely on middleware)
    const session = await auth();
    if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) {
      return { success: false, error: "Unauthorized Server Action Request. Only Admins can execute this." };
    }

    await prisma.membership.update({
      where: { id: membershipId },
      data: { status }
    });
    
    revalidatePath("/dashboard/members");
    revalidatePath(`/dashboard/members/${membershipId}`);
    return { success: true };
  } catch (error) {
    console.error("Update Status Error:", error);
    return { success: false, error: "Failed to update membership status." };
  }
}
