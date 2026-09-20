import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { requireAdminSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    // Enforce server-side admin authentication
    await requireAdminSession();

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    const isVercelBlobConfigured = token && !token.includes("placeholder");

    let url: string;

    if (isVercelBlobConfigured) {
      // Upload to Vercel Blob Storage
      const blob = await put(file.name, file, {
        access: "public",
        addRandomSuffix: true,
      });
      url = blob.url;
    } else {
      // Fallback for local development if BLOB token is not configured
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString("base64");
      const mimeType = file.type || "application/octet-stream";
      url = `data:${mimeType};base64,${base64}`;
    }

    const formatSize = (bytes: number): string => {
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const newAsset = {
      id: `asset-${Date.now()}`,
      name: file.name,
      url,
      size: formatSize(file.size),
      type: file.type || "unknown",
      createdAt: "Just now",
    };

    return NextResponse.json(newAsset);
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { error: "Unauthorized or failed to upload file" },
      { status: 401 }
    );
  }
}
