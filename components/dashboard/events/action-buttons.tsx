"use client";

import { useTransition } from "react";
import { archiveEvent, deleteEvent } from "@/lib/actions/event.actions";
import { Archive, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EventActionButtons({ eventId, currentStatus }: { eventId: string, currentStatus: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleArchive = () => {
    if (confirm(`Archive this event? This will mark it as COMPLETED and stop new registrations, but keep existing records.`)) {
      startTransition(async () => {
        await archiveEvent(eventId);
      });
    }
  };

  const handleDelete = () => {
    if (confirm(`CRITICAL WARNING: Are you sure you want to hard delete this event? All registration records and banner images will be permanently destroyed. Archiving is recommended instead.`)) {
      startTransition(async () => {
        const res = await deleteEvent(eventId);
        if (res.success) {
          router.push("/dashboard/events");
        } else {
          alert(res.error);
        }
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-border">
      <button
        disabled={isPending || currentStatus === "COMPLETED"}
        onClick={handleArchive}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-sm disabled:opacity-50 transition-colors"
      >
        <Archive className="w-4 h-4" />
        {currentStatus === "COMPLETED" ? "Archived" : "Archive Event"}
      </button>
      <button
        disabled={isPending}
        onClick={handleDelete}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive font-medium rounded-sm disabled:opacity-50 transition-colors"
      >
        <Trash2 className="w-4 h-4" />
        Hard Delete
      </button>
    </div>
  );
}
