"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo",
  api_key: process.env.CLOUDINARY_API_KEY || "123",
  api_secret: process.env.CLOUDINARY_API_SECRET || "abc",
});

export async function uploadImageToCloudinary(file: File): Promise<{ url: string; publicId: string }> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { 
        folder: "telsa_membership",
        resource_type: "image"
      }, 
      (error, result) => {
        if (error || !result) {
          console.error("Cloudinary Upload Error:", error);
          reject(error || new Error("Upload failed"));
        } else {
          resolve({ url: result.secure_url, publicId: result.public_id });
        }
      }
    );
    uploadStream.end(buffer);
  });
}

export async function deleteImageFromCloudinary(publicId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        console.error("Cloudinary Delete Error:", error);
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
