import { db as prisma } from "@/lib/db";
import Link from "next/link";
import { Search, Plus, Calendar, Users, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";

export default async function AdminEventsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  const currentPage = Number(resolvedParams.page) || 1;
  const TAKE = 20;
  const SKIP = (currentPage - 1) * TAKE;

  const whereClause = {
    title: { contains: query, mode: "insensitive" as const }
  };

  const [events, totalCount] = await Promise.all([
    prisma.event.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { registrations: true } } },
      take: TAKE,
      skip: SKIP
    }),
    prisma.event.count({ where: whereClause })
  ]);

  const totalPages = Math.ceil(totalCount / TAKE);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-primary">Events Management</h1>
          <p className="text-muted-foreground text-sm">Create and manage TeLSA events and campaigns.</p>
        </div>
        <Link 
          href="/dashboard/events/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Create Event
        </Link>
      </div>

      <div className="bg-card border border-border rounded-sm shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between items-center bg-slate-50 dark:bg-slate-900">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search events..." 
              defaultValue={query}
              className="w-full pl-9 pr-4 py-2 border border-border rounded-sm text-sm focus:outline-none focus:border-secondary bg-background" 
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-900 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-bold text-primary">Event Title</th>
                <th className="px-6 py-4 font-bold text-primary">Status</th>
                <th className="px-6 py-4 font-bold text-primary">Start Date</th>
                <th className="px-6 py-4 font-bold text-primary">Registrations</th>
                <th className="px-6 py-4 font-bold text-primary text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {events.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    No events found.
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-primary">{event.title}</div>
                      <div className="text-xs text-muted-foreground">{event.category}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase tracking-wider
                        ${event.status === 'PUBLISHED' ? 'bg-green-100 text-green-700 border-green-200' : ''}
                        ${event.status === 'DRAFT' ? 'bg-slate-100 text-slate-700 border-slate-200' : ''}
                        ${event.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700 border-blue-200' : ''}
                        ${event.status === 'CANCELLED' ? 'bg-red-100 text-red-700 border-red-200' : ''}
                      `}>
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(event.startDate), 'MMM dd, yyyy')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {event.registrationRequired ? (
                        <div className="flex items-center gap-1.5 font-medium">
                          <Users className="w-4 h-4 text-secondary" />
                          {event._count.registrations} {event.maxParticipants ? `/ ${event.maxParticipants}` : ''}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">Not Required</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                      {event.registrationRequired && (
                        <Link href={`/dashboard/events/${event.id}/registrations`} className="p-1.5 text-muted-foreground hover:text-secondary border border-transparent hover:border-secondary/20 rounded transition-colors" title="View Registrations">
                          <Users className="w-4 h-4" />
                        </Link>
                      )}
                      <Link href={`/dashboard/events/${event.id}/edit`} className="p-1.5 text-muted-foreground hover:text-primary border border-transparent hover:border-primary/20 rounded transition-colors" title="Edit Event">
                        <Edit className="w-4 h-4" />
                      </Link>
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
