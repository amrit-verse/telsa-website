import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar, MapPin, ChevronLeft, Clock, Users } from "lucide-react";
import { EventRegistrationForm } from "@/components/events/registration-form";

export default async function PublicEventDetailPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params;
  const event = await prisma.event.findUnique({
    where: { slug: resolvedParams.slug, status: "PUBLISHED" },
    include: { _count: { select: { registrations: true } } }
  });

  if (!event) return notFound();

  const isFull = event.maxParticipants !== null && event._count.registrations >= event.maxParticipants;
  const isExpired = event.registrationDeadline !== null && new Date() > new Date(event.registrationDeadline);

  return (
    <div className="pb-24">
      {/* Hero Banner */}
      <div className="w-full h-[40vh] md:h-[50vh] relative bg-slate-900 border-b border-border">
        {event.imageUrl ? (
          <Image src={event.imageUrl} alt={event.title} fill className="object-cover opacity-60" priority />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <Calendar className="w-32 h-32 text-white" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 pb-8">
          <div className="container mx-auto max-w-5xl">
            <Link href="/events" className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white mb-6 transition-colors">
              <ChevronLeft className="w-4 h-4 mr-1" /> Back to Events
            </Link>
            <div className="mb-4">
              <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wider rounded-sm">
                {event.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 leading-tight drop-shadow-md">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-12 pt-12 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-serif font-bold text-primary mb-6 border-b pb-2">About this Event</h2>
              <div className="prose dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
                {event.description}
              </div>
            </section>
          </div>

          {/* Sidebar / Registration */}
          <div className="space-y-8">
            <div className="bg-card border border-border rounded-sm shadow-sm p-6">
              <h3 className="font-serif text-xl font-bold text-primary mb-6">Event Details</h3>
              
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-foreground">Date</p>
                    <p className="text-sm text-muted-foreground">{format(new Date(event.startDate), 'MMMM dd, yyyy')}</p>
                    {event.endDate && (
                      <p className="text-sm text-muted-foreground">to {format(new Date(event.endDate), 'MMMM dd, yyyy')}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-foreground">Location</p>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                  </div>
                </div>

                {event.registrationRequired && (
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-foreground">Capacity</p>
                      <p className="text-sm text-muted-foreground">
                        {event.maxParticipants ? `${event._count.registrations} / ${event.maxParticipants} Registered` : 'Unlimited capacity'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Registration Card */}
            {event.registrationRequired && (
              <div className="bg-card border border-border rounded-sm shadow-md p-6">
                <h3 className="font-serif text-xl font-bold text-primary mb-2">Register</h3>
                
                {event.registrationDeadline && (
                  <p className="text-xs text-muted-foreground mb-6 flex items-center gap-1.5 border-b pb-4">
                    <Clock className="w-3 h-3 text-amber-500" /> 
                    Deadline: {format(new Date(event.registrationDeadline), 'MMM dd, yyyy HH:mm')}
                  </p>
                )}

                <EventRegistrationForm 
                  eventId={event.id} 
                  isFull={isFull} 
                  isExpired={isExpired} 
                />
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
