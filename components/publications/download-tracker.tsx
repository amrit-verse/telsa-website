"use client";

import { Download } from "lucide-react";
import { incrementDownloadCount } from "@/lib/actions/publication.actions";

export default function DownloadTracker({ 
  publicationId, 
  fileUrl, 
  title 
}: { 
  publicationId: string, 
  fileUrl: string, 
  title: string 
}) {
  const handleDownload = () => {
    // Fire and forget analytics increment (non-blocking)
    incrementDownloadCount(publicationId);
    
    // Open the Cloudinary PDF in a new tab
    window.open(fileUrl, "_blank");
  };

  return (
    <button 
      onClick={handleDownload} 
      className="w-full md:w-auto px-8 py-4 bg-primary text-primary-foreground font-bold rounded-sm shadow-md hover:bg-primary/90 hover:shadow-lg transition-all flex items-center justify-center gap-3"
      title={`Download ${title}`}
    >
      <Download className="w-5 h-5" /> Download Document
    </button>
  );
}
