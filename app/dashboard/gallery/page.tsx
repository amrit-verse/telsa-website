import { Metadata } from "next";
import { Image as ImageIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Gallery Management | Admin Dashboard",
};

export default function AdminGalleryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-primary">Gallery Management</h1>
        <p className="text-muted-foreground text-sm">Upload and organize event photos and institutional imagery.</p>
      </div>

      <div className="bg-card border border-border rounded-sm shadow-sm overflow-hidden min-h-[400px] flex items-center justify-center p-8">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-6">
            <ImageIcon className="w-8 h-8 text-primary opacity-70" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-primary mb-3">Gallery Module Pending</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            The comprehensive media management and gallery organization module is currently under active development. This section will soon allow administrators to upload, tag, and publish institutional imagery directly to the public portal.
          </p>
        </div>
      </div>
    </div>
  );
}
