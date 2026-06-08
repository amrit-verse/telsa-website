/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useTransition, useState } from "react";
import { updateEvent } from "@/lib/actions/event.actions";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import EventActionButtons from "@/components/dashboard/events/action-buttons";

export default function EditEventForm({ event }: { event: any }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const res = await updateEvent(event.id, formData);
      if (res.success) {
        router.push("/dashboard/events");
      } else {
        setError(res.error || "Failed to update event.");
      }
    });
  }

  // Helper to format date for datetime-local input
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-serif font-bold text-primary">Edit Event: {event.title}</h1>
      </div>

      <div className="bg-card border border-border rounded-sm shadow-sm p-6">
        {error && <div className="mb-6 p-4 bg-destructive/10 text-destructive text-sm rounded-sm">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Event Title *</label>
              <input required name="title" type="text" defaultValue={event.title} className="w-full px-4 py-2 border rounded-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">URL Slug *</label>
              <input required name="slug" type="text" defaultValue={event.slug} className="w-full px-4 py-2 border rounded-sm lowercase" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Category *</label>
              <select required name="category" defaultValue={event.category} className="w-full px-4 py-2 border rounded-sm">
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
              <input required name="location" type="text" defaultValue={event.location} className="w-full px-4 py-2 border rounded-sm" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Start Date *</label>
              <input required name="startDate" type="datetime-local" defaultValue={formatDate(event.startDate)} className="w-full px-4 py-2 border rounded-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">End Date (Optional)</label>
              <input name="endDate" type="datetime-local" defaultValue={formatDate(event.endDate)} className="w-full px-4 py-2 border rounded-sm" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-primary">Short Description *</label>
            <textarea required name="shortDescription" rows={2} defaultValue={event.shortDescription} className="w-full px-4 py-2 border rounded-sm" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-primary">Full Description *</label>
            <textarea required name="description" rows={6} defaultValue={event.description} className="w-full px-4 py-2 border rounded-sm" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Update Banner Image (Max 5MB)</label>
              <input name="bannerImage" type="file" accept="image/*" className="w-full text-sm" />
              {event.imageUrl && <p className="text-xs text-muted-foreground mt-1">Leave blank to keep existing image.</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Status *</label>
              <select required name="status" defaultValue={event.status} className="w-full px-4 py-2 border rounded-sm">
                <option value="DRAFT">Draft (Hidden)</option>
                <option value="PUBLISHED">Published (Public)</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-border space-y-4">
            <h3 className="font-bold text-primary font-serif">Registration Settings</h3>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="registrationRequired" id="regReq" defaultChecked={event.registrationRequired} className="w-4 h-4 text-secondary focus:ring-secondary" />
              <label htmlFor="regReq" className="text-sm font-medium">Require Registration</label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary text-muted-foreground">Registration Deadline</label>
                <input name="registrationDeadline" type="datetime-local" defaultValue={formatDate(event.registrationDeadline)} className="w-full px-4 py-2 border rounded-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary text-muted-foreground">Max Participants</label>
                <input name="maxParticipants" type="number" min="1" defaultValue={event.maxParticipants || ""} className="w-full px-4 py-2 border rounded-sm" />
              </div>
            </div>
          </div>

          <button disabled={isPending} className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-sm disabled:opacity-50 flex items-center justify-center">
            {isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Updating Event...</> : "Update Event"}
          </button>
        </form>

        <EventActionButtons eventId={event.id} currentStatus={event.status} />
      </div>
    </div>
  );
}
