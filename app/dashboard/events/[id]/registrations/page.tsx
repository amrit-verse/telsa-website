import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Download, Users } from "lucide-react";
import { format } from "date-fns";

export default async function EventRegistrationsPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params;
  
  const event = await prisma.event.findUnique({
    where: { id: resolvedParams.id },
    include: {
      registrations: {
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!event) return notFound();

  return (
    <div className="space-y-6">
      <Link href="/dashboard/events" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Events
      </Link>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-primary">Registrations: {event.title}</h1>
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            <Users className="w-4 h-4" /> {event.registrations.length} total attendees 
            {event.maxParticipants ? ` / ${event.maxParticipants} limit` : ''}
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-border bg-card text-foreground font-medium rounded-sm hover:bg-slate-50 transition-colors">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="bg-card border border-border rounded-sm shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-900 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-bold text-primary">Attendee Name</th>
                <th className="px-6 py-4 font-bold text-primary">Contact Info</th>
                <th className="px-6 py-4 font-bold text-primary">College / Univ.</th>
                <th className="px-6 py-4 font-bold text-primary">Registered At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {event.registrations.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                    No registrations found for this event.
                  </td>
                </tr>
              ) : (
                event.registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-primary">{reg.name}</td>
                    <td className="px-6 py-4">
                      <div className="text-foreground">{reg.email}</div>
                      <div className="text-xs text-muted-foreground">{reg.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{reg.college}</td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {format(new Date(reg.createdAt), 'MMM dd, yyyy - HH:mm')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
