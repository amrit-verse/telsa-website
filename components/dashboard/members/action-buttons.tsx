"use client";

import { useTransition } from "react";
import { updateMembershipStatus } from "@/lib/actions/membership.actions";
import { CheckCircle, XCircle } from "lucide-react";

export default function MembershipActionButtons({ membershipId, currentStatus }: { membershipId: string, currentStatus: string }) {
  const [isPending, startTransition] = useTransition();

  const handleStatusUpdate = (status: "ACTIVE" | "REJECTED") => {
    if (confirm(`Are you sure you want to mark this application as ${status}?`)) {
      startTransition(async () => {
        await updateMembershipStatus(membershipId, status);
      });
    }
  };

  if (currentStatus !== "PENDING") {
    return (
      <div className="flex items-center gap-2 text-sm font-medium px-4 py-2 border rounded-sm bg-slate-50 dark:bg-slate-900 text-muted-foreground">
        This application has already been processed.
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        disabled={isPending}
        onClick={() => handleStatusUpdate("ACTIVE")}
        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-sm disabled:opacity-50 transition-colors shadow-sm"
      >
        <CheckCircle className="w-5 h-5" />
        {isPending ? "Processing..." : "Approve Membership"}
      </button>
      <button
        disabled={isPending}
        onClick={() => handleStatusUpdate("REJECTED")}
        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-destructive hover:bg-destructive/90 text-white font-medium rounded-sm disabled:opacity-50 transition-colors shadow-sm"
      >
        <XCircle className="w-5 h-5" />
        {isPending ? "Processing..." : "Reject Application"}
      </button>
    </div>
  );
}
