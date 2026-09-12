"use server";

import { put, del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth";
import { env } from "@/lib/env";

export async function uploadMediaAsset(formData: FormData) {
  await requireAdminSession();

  const file = formData.get("file") as File;
  if (!file) {
    return { success: false, error: "No file provided for upload." };
  }

  // Max 10MB limit check
  if (file.size > 10 * 1024 * 1024) {
    return { success: false, error: "File size exceeds 10MB limit." };
  }

  try {
    if (env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`portfolio/${file.name}`, file, {
        access: "public",
        token: env.BLOB_READ_WRITE_TOKEN,
      });

      revalidatePath("/admin/media");
      return { success: true, url: blob.url };
    }

    // Development fallback mock response if BLOB_READ_WRITE_TOKEN is not configured locally
    revalidatePath("/admin/media");
    return {
      success: true,
      url: `https://public.blob.vercel-storage.com/${file.name}`,
    };
  } catch (err) {
    console.error("Vercel Blob Upload Error:", err);
    return { success: false, error: "Failed to upload asset to Vercel Blob." };
  }
}

export async function deleteMediaAsset(url: string) {
  await requireAdminSession();
  try {
    if (env.BLOB_READ_WRITE_TOKEN) {
      await del(url, { token: env.BLOB_READ_WRITE_TOKEN });
    }
    revalidatePath("/admin/media");
    return { success: true };
  } catch (err) {
    console.error("Vercel Blob Delete Error:", err);
    return { success: false, error: "Failed to delete asset." };
  }
}
