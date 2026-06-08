/* eslint-disable @typescript-eslint/no-explicit-any */
import { db as prisma } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { format } from "date-fns";

export default async function PublicEventsPage() {
  // Only fetch published events for the public side
  const events = await prisma.event.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { startDate: "asc" },
  });

  const now = new Date();
  const upcomingEvents = events.filter(e => e.startDate >= now || (e.endDate && e.endDate >= now));
  const pastEvents = events.filter(e => e.startDate < now && (!e.endDate || e.endDate < now));

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">TeLSA Events</h1>
        <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover our upcoming legal literacy campaigns, awareness programs, and student activities.
        </p>
      </div>

      {upcomingEvents.length > 0 && (
        <section className="mb-20">
          <h2 className="font-serif text-3xl font-bold text-primary mb-8 border-b pb-2">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {pastEvents.length > 0 && (
        <section>
          <h2 className="font-serif text-3xl font-bold text-primary mb-8 border-b pb-2">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-80">
            {pastEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {events.length === 0 && (
        <div className="text-center py-24 bg-slate-50 dark:bg-slate-900 rounded-sm border border-border">
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-bold text-primary mb-2">No Events Scheduled</h3>
          <p className="text-muted-foreground">Check back soon for upcoming TeLSA events.</p>
        </div>
      )}
    </div>
  );
}

function EventCard({ event }: { event: any }) {
  return (
    <div className="bg-card border border-border rounded-sm shadow-sm overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-md">
      {event.imageUrl ? (
        <div className="relative h-48 w-full bg-slate-100">
          <Image src={event.imageUrl} alt={event.title} fill className="object-cover" />
        </div>
      ) : (
        <div className="h-48 w-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-muted-foreground border-b border-border">
          <Calendar className="w-8 h-8 opacity-50" />
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-secondary uppercase tracking-wider">{event.category}</span>
        </div>
        <h3 className="font-serif text-xl font-bold text-primary mb-3 line-clamp-2">{event.title}</h3>
        <p className="text-sm text-muted-foreground mb-6 line-clamp-3 flex-1">{event.shortDescription}</p>
        
        <div className="space-y-2 mb-6 text-sm text-muted-foreground font-medium">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            {format(new Date(event.startDate), 'MMM dd, yyyy')}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        <Link 
          href={`/events/${event.slug}`}
          className="inline-flex items-center justify-center w-full py-2.5 bg-primary/5 hover:bg-primary/10 text-primary font-medium rounded-sm transition-colors border border-primary/20"
        >
          View Details <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  );
}
