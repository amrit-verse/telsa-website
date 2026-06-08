"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { PublicationCreateSchema } from "@/lib/validations/publication";
import { uploadImageToCloudinary } from "./cloudinary";

// NOTE: Prisma imports paused due to DB unavailability.
// This is an architectural stub for Phase 4D.

const MAX_PDF_SIZE = 25 * 1024 * 1024; // 25MB for legal documents

export async function createPublication(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) {
      return { success: false, error: "Unauthorized access." };
    }

    const rawData = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      category: formData.get("category"),
      abstract: formData.get("abstract"),
      authorName: formData.get("authorName"),
      status: formData.get("status"),
      isPublic: formData.get("isPublic") === "true",
    };

    const validatedData = PublicationCreateSchema.safeParse(rawData);
    if (!validatedData.success) {
      return { success: false, error: validatedData.error.errors.map(e => e.message).join(", ") };
    }

    const pdfFile = formData.get("pdfFile") as File;
    if (!pdfFile || pdfFile.size > MAX_PDF_SIZE || pdfFile.type !== "application/pdf") {
      return { success: false, error: "A valid PDF file under 25MB is required." };
    }

    // 1. Upload PDF to Cloudinary (Mocked for now)
    // const uploadData = await uploadImageToCloudinary(pdfFile);

    // 2. Create Prisma Record (Mocked for now)
    /*
    await prisma.publication.create({
      data: {
        ...validatedData.data,
        fileUrl: uploadData.url
      }
    });
    */

    revalidatePath("/dashboard/publications");
    revalidatePath("/publications");
    return { success: true, message: "Architecture stub: Publication would be created here." };

  } catch (error) {
    console.error("Publication Creation Error:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
