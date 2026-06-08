"use client";

import { useTransition, useState } from "react";
import { createPublication } from "@/lib/actions/publication.actions";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewPublicationPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const res = await createPublication(formData);
      if (res.success) {
        router.push("/dashboard/publications");
      } else {
        setError(res.error || "Failed to create publication.");
      }
    });
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-serif font-bold text-primary">Upload Legal Resource</h1>
        <p className="text-sm text-muted-foreground">Add a new academic paper, note, or notice to the library.</p>
      </div>

      <div className="bg-card border border-border rounded-sm shadow-sm p-6">
        {error && <div className="mb-6 p-4 bg-destructive/10 text-destructive text-sm rounded-sm">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Title *</label>
              <input required name="title" type="text" className="w-full px-4 py-2 border rounded-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">URL Slug *</label>
              <input required name="slug" type="text" placeholder="e.g. human-rights-paper" className="w-full px-4 py-2 border rounded-sm lowercase" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Resource Type *</label>
              <select required name="type" className="w-full px-4 py-2 border rounded-sm font-medium">
                <option value="NOTES">Notes</option>
                <option value="RESEARCH_PAPER">Research Paper</option>
                <option value="LEGAL_ARTICLE">Legal Article</option>
                <option value="MOOT_COURT">Moot Court Resources</option>
                <option value="REPORT">Report</option>
                <option value="NOTICE">Notice</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Author(s) *</label>
              <input required name="author" type="text" placeholder="e.g. Adv. John Doe" className="w-full px-4 py-2 border rounded-sm" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-primary">Abstract / Summary *</label>
            <textarea required name="summary" rows={2} className="w-full px-4 py-2 border rounded-sm" />
            <p className="text-xs text-muted-foreground">A brief 1-2 sentence overview for the library grid.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-primary">Full Description / Context *</label>
            <textarea required name="content" rows={8} className="w-full px-4 py-2 border rounded-sm" />
            <p className="text-xs text-muted-foreground">The full academic context or methodology displayed on the details page.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Published Date *</label>
              <input required name="publishedDate" type="date" className="w-full px-4 py-2 border rounded-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Search Tags</label>
              <input name="tags" type="text" placeholder="e.g. Constitutional Law, Human Rights" className="w-full px-4 py-2 border rounded-sm" />
              <p className="text-xs text-muted-foreground">Comma separated.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border bg-slate-50 dark:bg-slate-900/50 p-4 rounded-sm border">
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">PDF Document * (Max 25MB)</label>
              <input required name="pdfFile" type="file" accept="application/pdf" className="w-full text-sm font-medium" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Cover Image (Max 5MB)</label>
              <input name="coverImage" type="file" accept="image/*" className="w-full text-sm" />
              <p className="text-xs text-muted-foreground">Optional thumbnail. OpenGraph will use this.</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-primary">Visibility Status *</label>
            <select required name="status" className="w-full px-4 py-2 border rounded-sm">
              <option value="DRAFT">Draft (Hidden)</option>
              <option value="PUBLISHED">Published (Visible on Library)</option>
            </select>
          </div>

          <button disabled={isPending} className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-sm disabled:opacity-50 flex items-center justify-center">
            {isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading PDF & Saving...</> : "Publish Resource"}
          </button>
        </form>
      </div>
    </div>
  );
}
