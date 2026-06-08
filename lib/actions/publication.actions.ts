"use server";

import { db as prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { PublicationCreateSchema } from "@/lib/validations/publication";
import { uploadImageToCloudinary, deleteImageFromCloudinary } from "./cloudinary";

const MAX_PDF_SIZE = 25 * 1024 * 1024;
const MAX_IMG_SIZE = 5 * 1024 * 1024;

export async function createPublication(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) return { success: false, error: "Unauthorized access." };

    const rawData = {
      title: formData.get("title"), slug: formData.get("slug"), type: formData.get("type"),
      summary: formData.get("summary"), content: formData.get("content"), author: formData.get("author"),
      publishedDate: formData.get("publishedDate"), tags: formData.get("tags"), status: formData.get("status"),
    };

    const validatedData = PublicationCreateSchema.safeParse(rawData);
    if (!validatedData.success) return { success: false, error: validatedData.error.issues.map((e: {message: string}) => e.message).join(", ") };

    const pdfFile = formData.get("pdfFile") as File;
    if (!pdfFile || pdfFile.size === 0) return { success: false, error: "PDF Document is required." };
    if (pdfFile.size > MAX_PDF_SIZE || pdfFile.type !== "application/pdf") return { success: false, error: "Valid PDF under 25MB required." };

    const coverImage = formData.get("coverImage") as File;
    let coverImageUrl = null;
    let coverPublicId = null;
    
    if (coverImage && coverImage.size > 0) {
      if (coverImage.size > MAX_IMG_SIZE) return { success: false, error: "Cover max 5MB" };
      const upload = await uploadImageToCloudinary(coverImage);
      coverImageUrl = upload.url;
      coverPublicId = upload.publicId;
    }

    let fileUrl = null;
    let pdfPublicId = null;

    try {
      const pdfUpload = await uploadImageToCloudinary(pdfFile); // Works for PDFs with Cloudinary resource_type: auto
      fileUrl = pdfUpload.url;
      pdfPublicId = pdfUpload.publicId;

      await prisma.publication.create({
        data: { ...validatedData.data, fileUrl, coverImageUrl }
      });
    } catch (e) {
      if (coverPublicId) await deleteImageFromCloudinary(coverPublicId);
      if (pdfPublicId) await deleteImageFromCloudinary(pdfPublicId);
      return { success: false, error: "Database error. Failed to create publication." };
    }

    revalidatePath("/dashboard/publications"); revalidatePath("/publications");
    return { success: true };
  } catch (error) { return { success: false, error: "An unexpected error occurred." }; }
}

export async function updatePublication(id: string, formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) return { success: false, error: "Unauthorized access." };

    const rawData = {
      title: formData.get("title"), slug: formData.get("slug"), type: formData.get("type"),
      summary: formData.get("summary"), content: formData.get("content"), author: formData.get("author"),
      publishedDate: formData.get("publishedDate"), tags: formData.get("tags"), status: formData.get("status"),
    };

    const validatedData = PublicationCreateSchema.safeParse(rawData);
    if (!validatedData.success) return { success: false, error: validatedData.error.issues.map((e: {message: string}) => e.message).join(", ") };

    const pub = await prisma.publication.findUnique({ where: { id } });
    if (!pub) return { success: false, error: "Publication not found" };

    const pdfFile = formData.get("pdfFile") as File;
    let fileUrl = pub.fileUrl;
    if (pdfFile && pdfFile.size > 0) {
      if (pdfFile.size > MAX_PDF_SIZE || pdfFile.type !== "application/pdf") return { success: false, error: "Valid PDF under 25MB required." };
      const upload = await uploadImageToCloudinary(pdfFile);
      fileUrl = upload.url;
    }

    const coverImage = formData.get("coverImage") as File;
    let coverImageUrl = pub.coverImageUrl;
    if (coverImage && coverImage.size > 0) {
      if (coverImage.size > MAX_IMG_SIZE) return { success: false, error: "Cover max 5MB" };
      const upload = await uploadImageToCloudinary(coverImage);
      coverImageUrl = upload.url;
    }

    await prisma.publication.update({
      where: { id },
      data: { ...validatedData.data, fileUrl, coverImageUrl }
    });

    revalidatePath("/dashboard/publications"); revalidatePath(`/dashboard/publications/${id}/edit`); revalidatePath("/publications");
    return { success: true };
  } catch (error) { return { success: false, error: "Failed to update publication." }; }
}

export async function archivePublication(id: string) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) return { success: false, error: "Unauthorized" };
    await prisma.publication.update({ where: { id }, data: { status: "ARCHIVED" } });
    revalidatePath("/dashboard/publications");
    return { success: true };
  } catch (error) { return { success: false, error: "Failed to archive" }; }
}

export async function deletePublication(id: string) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) return { success: false, error: "Unauthorized" };
    await prisma.publication.delete({ where: { id } });
    revalidatePath("/dashboard/publications"); revalidatePath("/publications");
    return { success: true };
  } catch (error) { return { success: false, error: "Failed to delete" }; }
}

export async function incrementViewCount(id: string) {
  try {
    await prisma.publication.update({ where: { id }, data: { viewCount: { increment: 1 } } });
  } catch (e) { console.error("Failed to increment view count", e); }
}

export async function incrementDownloadCount(id: string) {
  try {
    await prisma.publication.update({ where: { id }, data: { downloadCount: { increment: 1 } } });
  } catch (e) { console.error("Failed to increment download count", e); }
}
