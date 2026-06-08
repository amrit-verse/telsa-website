import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import EditEventForm from "@/components/dashboard/events/edit-form";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const event = await prisma.event.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!event) return notFound();

  return (
    <div className="space-y-6">
      <Link href="/dashboard/events" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Events
      </Link>
      <EditEventForm event={event} />
    </div>
  );
}
