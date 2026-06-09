import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { organization } from "@/lib/data/organization";
import { committeeMembers, getPresident } from "@/lib/data/committee";
import { db } from "@/lib/db";
import { format } from "date-fns";

export const metadata: Metadata = {
  title: "Official Homepage | Terai Law Students' Association",
  description: "Official representative body for Terai-origin law students at Prithvi Narayan Campus.",
};

export default async function HomePage() {
  const president = getPresident();
  const coreMembers = committeeMembers.filter(m => m.roleType === "core" && m.position !== "President");
  const execMembers = committeeMembers.filter(m => m.roleType === "executive");
  
  // Fetch real notices and events instead of static placeholders
  const dbNotices = await db.publication.findMany({
    where: { status: 'PUBLISHED', type: 'NOTICE' },
    orderBy: { publishedDate: 'desc' },
    take: 3,
  });

  const dbEvents = await db.event.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { startDate: 'desc' },
    take: 2,
  });

  const notices = [
    ...dbNotices.map(n => ({
      date: format(new Date(n.publishedDate), 'yyyy-MM-dd'),
      title: n.title,
      link: `/publications/${n.slug}`,
      isNotice: true
    })),
    ...dbEvents.map(e => ({
      date: format(new Date(e.startDate), 'yyyy-MM-dd'),
      title: e.title,
      link: `/events/${e.slug}`,
      isNotice: false
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

  return (
    <>
      {/* Formal Header/Hero */}
      <section className="w-full bg-white dark:bg-slate-950 py-16 md:py-20 lg:py-32 border-b-2 border-primary relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-16">
            <div className="w-full lg:w-3/5 xl:w-2/3 max-w-4xl z-10 pt-4">
              <div className="mb-8 flex flex-col gap-2">
                <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-secondary">
                  {organization.location}
                </span>
                <span className="text-[10px] md:text-xs font-medium tracking-widest text-muted-foreground uppercase">
                  Established {organization.established}
                </span>
              </div>
              
              <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-normal mb-8 leading-tight md:leading-none text-primary dark:text-primary-foreground tracking-tight break-words">
                Terai Law Students&apos; Association
              </h1>
              
              <div className="w-full max-w-2xl h-px bg-border mb-10"></div>
              
              <p className="text-lg sm:text-xl md:text-3xl text-primary/80 dark:text-primary-foreground/80 max-w-3xl leading-relaxed font-serif">
                The definitive representative body dedicated to academic rigor, student advocacy, and the uncompromising defense of legal rights at Prithvi Narayan Campus.
              </p>
            </div>
            
            <div className="w-full lg:w-2/5 xl:w-1/3 flex justify-center lg:justify-end z-0">
              <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-full aspect-[4/3] lg:aspect-square opacity-[0.92]">
                <Image
                  src="/images/map.png"
                  alt="Map of Nepal"
                  fill
                  priority
                  className="object-contain object-center lg:object-right"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official Notices */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900 border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 className="font-serif text-3xl font-normal text-primary mb-2 border-l-4 border-secondary pl-4">
                Official Notices
              </h2>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed pl-5 font-serif">
                Announcements, formal proceedings, and scheduled assemblies of the Association.
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="border-t-2 border-primary">
                {notices.length > 0 ? notices.map((notice, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 sm:py-5 border-b border-border hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors px-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 w-full">
                      <time className="font-mono text-xs sm:text-sm text-secondary font-medium tracking-wider w-32 shrink-0">
                        {notice.date}
                      </time>
                      <Link href={notice.link} className="font-serif font-medium text-base sm:text-lg text-primary dark:text-primary-foreground hover:underline w-full leading-snug">
                        {notice.title}
                      </Link>
                    </div>
                  </div>
                )) : (
                  <div className="py-8 px-4 text-center border-b border-border">
                    <p className="text-muted-foreground font-serif">No official notices or events are currently scheduled.</p>
                  </div>
                )}
                <div className="pt-6 text-right">
                  <Link href="/publications" className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary hover:underline">
                    View All Records &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* From the Desk of the President */}
      {president && (
        <section className="py-16 md:py-24 bg-white dark:bg-slate-950 border-b border-border">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-start">
              <div className="w-full md:w-1/3 shrink-0">
                <div className="border border-border/50 p-4 bg-white dark:bg-slate-950 shadow-sm">
                  <div className="relative aspect-[3/4] w-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-border/20">
                    {president.image ? (
                      <Image 
                        src={president.image} 
                        alt={president.name} 
                        fill 
                        className="object-cover object-top" 
                        sizes="(max-width: 768px) 100vw, 33vw" 
                      />
                    ) : (
                      <span className="font-serif text-muted-foreground text-sm uppercase tracking-widest">Portrait Unavailable</span>
                    )}
                  </div>
                </div>
                <div className="mt-8 text-center border-b border-border pb-6">
                  <h3 className="font-serif text-2xl font-medium text-primary">{president.name}</h3>
                  <p className="text-xs text-secondary font-bold uppercase tracking-[0.2em] mt-2">
                    President, {organization.shortName}
                  </p>
                </div>
              </div>
              
              <div className="w-full md:w-2/3 md:pt-4">
                <h2 className="font-serif text-3xl md:text-4xl font-normal text-primary mb-6 md:mb-8 border-b-2 border-secondary inline-block pb-3">
                  From the Desk of the President
                </h2>
                <div className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-p:font-serif prose-p:leading-loose text-primary/90 dark:text-primary-foreground/90 max-w-none">
                  <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-secondary first-letter:mr-3 first-letter:float-left first-letter:leading-none">
                    {president.message || "An official address from the President will be documented here shortly. The Terai Law Students' Association remains steadfast in its commitment to the rule of law and the academic prosperity of its members."}
                  </p>
                  <p>
                    We recognize the unique challenges faced by law scholars from the Terai region and operate as a united front to champion equity within the Faculty of Law at Prithvi Narayan Campus. Through rigorous moot court preparations, legal aid initiatives, and continuous academic advocacy, we ensure our members are equipped not just as students, but as future custodians of justice.
                  </p>
                  <p className="italic mt-10 text-xl font-serif">
                    In solidarity and service,
                  </p>
                  <div className="mt-8 border-t border-border/50 pt-6 w-48">
                    <span className="block font-serif text-xl text-primary">{president.name}</span>
                    <span className="block text-xs uppercase tracking-widest text-muted-foreground mt-2">President</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Executive Committee Grid */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900 border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-primary mb-4 md:mb-6">The Executive Committee</h2>
            <div className="w-24 h-px bg-secondary mx-auto"></div>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <h3 className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-8 border-b border-border pb-4">Core Leadership</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 md:gap-y-12 mb-12 md:mb-16">
              {coreMembers.map((member, idx) => (
                <div key={idx} className="flex flex-col border-t-2 border-primary/20 pt-4 hover:border-secondary transition-colors">
                  <h4 className="font-serif text-lg md:text-xl font-medium text-primary mb-1">{member.name}</h4>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-secondary">
                    {member.position}
                  </p>
                </div>
              ))}
            </div>

            <h3 className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-8 border-b border-border pb-4">Executive Members</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 md:gap-y-12">
              {execMembers.map((member, idx) => (
                <div key={idx} className="flex flex-col border-t border-border pt-4 hover:border-secondary transition-colors">
                  <h4 className="font-serif text-base md:text-lg font-medium text-primary mb-1">{member.name}</h4>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    {member.position}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Membership & Governance */}
      <section className="py-16 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto border border-primary-foreground/20 p-6 md:p-16 relative bg-primary">
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-secondary"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-secondary"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-secondary"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-secondary"></div>
            
            <div className="text-center mb-8 md:mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal mb-6 md:mb-8">Membership Protocol</h2>
              <div className="w-16 md:w-24 h-px bg-secondary mx-auto"></div>
            </div>
            
            <div className="space-y-8 font-serif text-xl leading-relaxed text-primary-foreground/90 text-center max-w-2xl mx-auto">
              <p>
                Membership to the Terai Law Students&apos; Association is granted exclusively to scholars currently enrolled in the Faculty of Law at Prithvi Narayan Campus.
              </p>
              <p>
                Candidates must demonstrate an unwavering commitment to the association&apos;s constitution, academic integrity, and the collective advancement of the legal fraternity.
              </p>
            </div>
            
            <div className="mt-12 md:mt-16 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <Link 
                href="/join" 
                className="inline-flex h-12 md:h-14 items-center justify-center bg-secondary px-8 md:px-10 text-[10px] md:text-sm font-bold tracking-widest uppercase text-secondary-foreground hover:bg-white transition-colors"
              >
                Access Application
              </Link>
              <Link 
                href="/about" 
                className="inline-flex h-12 md:h-14 items-center justify-center bg-transparent border border-primary-foreground/30 px-8 md:px-10 text-[10px] md:text-sm font-bold tracking-widest uppercase text-white hover:bg-primary-foreground/10 transition-colors"
              >
                Read Constitution
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
