"use client";

import { useTransition, useState } from "react";
import { createEvent } from "@/lib/actions/event.actions";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewEventPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const res = await createEvent(formData);
      if (res.success) {
        router.push("/dashboard/events");
      } else {
        setError(res.error || "Failed to create event.");
      }
    });
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-serif font-bold text-primary">Create New Event</h1>
        <p className="text-sm text-muted-foreground">Fill in the details to publish or draft a new event.</p>
      </div>

      <div className="bg-card border border-border rounded-sm shadow-sm p-6">
        {error && <div className="mb-6 p-4 bg-destructive/10 text-destructive text-sm rounded-sm">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Event Title *</label>
              <input required name="title" type="text" className="w-full px-4 py-2 border rounded-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">URL Slug *</label>
              <input required name="slug" type="text" placeholder="e.g. legal-literacy-2026" className="w-full px-4 py-2 border rounded-sm lowercase" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Category *</label>
              <select required name="category" className="w-full px-4 py-2 border rounded-sm">
                <option value="Legal Literacy Campaign">Legal Literacy Campaign</option>
                <option value="Legal Awareness Program">Legal Awareness Program</option>
                <option value="Research & Publication">Research & Publication</option>
                <option value="Sports Activity">Sports Activity</option>
                <option value="Cultural Program">Cultural Program</option>
                <option value="Moot Court">Moot Court</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Location *</label>
              <input required name="location" type="text" className="w-full px-4 py-2 border rounded-sm" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Start Date *</label>
              <input required name="startDate" type="datetime-local" className="w-full px-4 py-2 border rounded-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">End Date (Optional)</label>
              <input name="endDate" type="datetime-local" className="w-full px-4 py-2 border rounded-sm" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-primary">Short Description *</label>
            <textarea required name="shortDescription" rows={2} className="w-full px-4 py-2 border rounded-sm" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-primary">Full Description *</label>
            <textarea required name="description" rows={6} className="w-full px-4 py-2 border rounded-sm" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Banner Image (Max 5MB)</label>
              <input name="bannerImage" type="file" accept="image/*" className="w-full text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Initial Status *</label>
              <select required name="status" className="w-full px-4 py-2 border rounded-sm">
                <option value="DRAFT">Draft (Hidden)</option>
                <option value="PUBLISHED">Published (Public)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-border space-y-4">
            <h3 className="font-bold text-primary font-serif">Registration Settings</h3>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="registrationRequired" id="regReq" className="w-4 h-4 text-secondary focus:ring-secondary" />
              <label htmlFor="regReq" className="text-sm font-medium">Require Registration via TeLSA website</label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary text-muted-foreground">Registration Deadline</label>
                <input name="registrationDeadline" type="datetime-local" className="w-full px-4 py-2 border rounded-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary text-muted-foreground">Max Participants</label>
                <input name="maxParticipants" type="number" min="1" className="w-full px-4 py-2 border rounded-sm" />
              </div>
            </div>
          </div>

          <button disabled={isPending} className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-sm disabled:opacity-50 flex items-center justify-center">
            {isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating Event...</> : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
}
