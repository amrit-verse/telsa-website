"use client";

import { useState, useTransition } from "react";
import { registerForEvent } from "@/lib/actions/event.actions";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export function EventRegistrationForm({ eventId, isFull, isExpired }: { eventId: string, isFull: boolean, isExpired: boolean }) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isExpired) {
    return (
      <div className="p-6 bg-slate-50 dark:bg-slate-900 border border-border rounded-sm text-center">
        <p className="text-muted-foreground font-medium">Registration for this event has closed.</p>
      </div>
    );
  }

  if (isFull) {
    return (
      <div className="p-6 bg-red-50 text-red-700 border border-red-200 rounded-sm text-center">
        <p className="font-bold">This event has reached maximum capacity.</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="p-8 bg-green-50 text-green-800 border border-green-200 rounded-sm text-center">
        <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-green-600" />
        <h3 className="text-xl font-bold mb-2">Registration Confirmed!</h3>
        <p className="text-sm">You have successfully registered for this event. We look forward to seeing you there.</p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    formData.append("eventId", eventId);
    
    startTransition(async () => {
      const res = await registerForEvent(formData);
      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.error || "Registration failed.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-destructive/10 text-destructive text-sm rounded-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-primary">Full Name *</label>
          <input required name="name" type="text" className="w-full px-4 py-2 border rounded-sm" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-primary">Email *</label>
          <input required name="email" type="email" className="w-full px-4 py-2 border rounded-sm" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-primary">Phone *</label>
          <input required name="phone" type="tel" className="w-full px-4 py-2 border rounded-sm" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-primary">College / Univ. *</label>
          <input required name="college" type="text" className="w-full px-4 py-2 border rounded-sm" />
        </div>
      </div>

      <button disabled={isPending} className="w-full py-3 bg-secondary text-secondary-foreground font-bold rounded-sm disabled:opacity-50 transition-colors flex justify-center items-center">
        {isPending ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...</> : "Register Now"}
      </button>
    </form>
  );
}
