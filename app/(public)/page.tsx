import Link from "next/link";
import { Metadata } from "next";
import { organization } from "@/lib/data/organization";
import { getPresident } from "@/lib/data/committee";

export const metadata: Metadata = {
  title: "Home | Terai Law Students' Association",
  description: "Protecting students' rights and promoting legal literacy among Terai/Madhesh law students in Nepal.",
};

export default function HomePage() {
  const president = getPresident();

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full bg-primary py-24 md:py-32 overflow-hidden">
        {/* Placeholder background texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="container relative mx-auto px-4 md:px-8 text-center text-primary-foreground">
          <span className="inline-block py-1 px-3 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-sm font-semibold tracking-wider uppercase mb-6">
            Est. {organization.established} | Kaski, Nepal
          </span>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Empowering the Next Generation of Legal Minds
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            {organization.name} works tirelessly against discrimination, promoting legal literacy, unity, and professional development.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/join" 
              className="w-full sm:w-auto h-12 inline-flex items-center justify-center rounded-sm bg-secondary px-8 text-base font-medium text-secondary-foreground shadow-sm hover:bg-secondary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            >
              Become a Member
            </Link>
            <Link 
              href="/about" 
              className="w-full sm:w-auto h-12 inline-flex items-center justify-center rounded-sm bg-transparent border border-primary-foreground/30 px-8 text-base font-medium text-primary-foreground hover:bg-primary-foreground/10 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* President's Message Section */}
      {president && (
        <section className="py-20 bg-slate-50 dark:bg-slate-900 border-b border-border">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto bg-card border border-border p-8 md:p-12 rounded-sm shadow-sm flex flex-col md:flex-row gap-8 items-center">
              <div className="shrink-0 w-48 h-48 rounded-full bg-slate-200 dark:bg-slate-800 border-4 border-background shadow-md overflow-hidden flex items-center justify-center">
                {/* President Image Placeholder */}
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground opacity-50"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-serif text-2xl font-bold text-primary mb-2">Message from the Leadership</h2>
                <div className="w-16 h-1 bg-secondary mx-auto md:mx-0 mb-6"></div>
                <blockquote className="text-lg italic text-muted-foreground leading-relaxed mb-6">
                  &quot;{president.message}&quot;
                </blockquote>
                <div>
                  <h3 className="font-bold text-primary">{president.name}</h3>
                  <p className="text-sm text-secondary font-semibold uppercase tracking-wider">{president.position}, {organization.shortName}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Mission Highlights Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">Our Core Mission</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">We are dedicated to fostering a supportive community and advancing legal excellence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card border border-border p-8 rounded-sm shadow-sm flex flex-col items-center text-center focus-within:ring-2 focus-within:ring-secondary transition-shadow hover:shadow-md">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                 <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3 className="font-serif text-xl font-bold mb-3 text-primary">Protecting Rights</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Safeguarding the rights and interests of law students, ensuring a fair and equitable academic environment.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card border border-border p-8 rounded-sm shadow-sm flex flex-col items-center text-center focus-within:ring-2 focus-within:ring-secondary transition-shadow hover:shadow-md">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                 <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              </div>
              <h3 className="font-serif text-xl font-bold mb-3 text-primary">Legal Literacy</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Conducting awareness programs, research, and publications to enhance legal literacy across communities.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card border border-border p-8 rounded-sm shadow-sm flex flex-col items-center text-center focus-within:ring-2 focus-within:ring-secondary transition-shadow hover:shadow-md">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                 <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h3 className="font-serif text-xl font-bold mb-3 text-primary">Student Unity</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Fostering unity and leadership development among Terai/Madhesh law students through collaborative activities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Events Teaser */}
      <section className="py-20 bg-slate-50 border-y border-border dark:bg-slate-900/50">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-8">Recent Activities</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10">Explore our latest moot court competitions, legal awareness campaigns, and cultural programs.</p>
          <Link 
            href="/events" 
            className="inline-flex h-12 items-center justify-center rounded-sm bg-primary px-8 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          >
            View All Events
          </Link>
        </div>
      </section>
    </>
  );
}
