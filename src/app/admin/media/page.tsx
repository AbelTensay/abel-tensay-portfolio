"use client";

import React, { useState } from "react";
import { Image, Upload, Trash2, ExternalLink, FileCode, Check } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface MediaAsset {
  id: string;
  name: string;
  url: string;
  size: string;
  type: string;
  createdAt: string;
}

const INITIAL_ASSETS: MediaAsset[] = [
  {
    id: "asset-1",
    name: "digital-ekub-cover.png",
    url: "https://public.blob.vercel-storage.com/digital-ekub-cover.png",
    size: "420 KB",
    type: "image/png",
    createdAt: "Today at 10:15 AM",
  },
  {
    id: "asset-2",
    name: "vision-processing-architecture.png",
    url: "https://public.blob.vercel-storage.com/vision-processing.png",
    size: "890 KB",
    type: "image/png",
    createdAt: "Yesterday at 02:20 PM",
  },
  {
    id: "asset-3",
    name: "abel-tensay-resume.pdf",
    url: "https://public.blob.vercel-storage.com/abel-tensay-resume.pdf",
    size: "1.2 MB",
    type: "application/pdf",
    createdAt: "3 days ago",
  },
];

export default function AdminMediaPage() {
  const [assets, setAssets] = useState<MediaAsset[]>(INITIAL_ASSETS);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this media asset?")) {
      setAssets((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="min-h-screen flex bg-neutral-950 text-neutral-100">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <Heading level={1} eyebrow="CMS // Media Storage">
              Media & Vercel Blob Assets
            </Heading>
            <Text variant="small" className="text-neutral-400 mt-1">
              Upload images, screenshots, and PDF documents to Vercel Blob storage.
            </Text>
          </div>

          <Button variant="primary" size="sm" leftIcon={<Upload className="h-4 w-4" />}>
            Upload Asset
          </Button>
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {assets.map((asset) => (
            <Card key={asset.id} hoverEffect={false} className="p-4 space-y-3 bg-neutral-900/40 border-neutral-800">
              <div className="h-32 rounded-lg bg-neutral-950 flex items-center justify-center border border-neutral-800 text-neutral-500 overflow-hidden relative group">
                {asset.type.startsWith("image") ? (
                  <Image className="h-8 w-8 text-blue-400" />
                ) : (
                  <FileCode className="h-8 w-8 text-purple-400" />
                )}
                <div className="absolute inset-0 bg-neutral-950/80 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleCopy(asset.url, asset.id)}
                    className="p-2 rounded bg-neutral-800 text-xs font-mono text-neutral-200 hover:text-white"
                  >
                    {copiedId === asset.id ? <Check className="h-4 w-4 text-emerald-400" /> : "Copy Link"}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-mono font-bold text-neutral-200 truncate">{asset.name}</h4>
                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
                  <span>{asset.size}</span>
                  <span>{asset.createdAt}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between">
                <a
                  href={asset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-mono text-blue-400 hover:underline flex items-center gap-1"
                >
                  <span>Open URL</span>
                  <ExternalLink className="h-3 w-3" />
                </a>

                <button
                  onClick={() => handleDelete(asset.id)}
                  className="text-[10px] font-mono text-red-400 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="h-3 w-3" />
                  <span>Delete</span>
                </button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
