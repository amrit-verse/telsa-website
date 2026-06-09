import { Metadata } from "next";
import { organization } from "@/lib/data/organization";
import Link from "next/link";

export const metadata: Metadata = {
  title: "History & Mandate | Terai Law Students Association",
  description: "The historical foundation, constitution, and core mandate of the Terai Law Students Association (TeLSA) at Prithvi Narayan Campus.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-10 md:py-24 max-w-4xl">
      {/* Institutional Header */}
      <div className="mb-12 md:mb-20 text-center border-b border-border pb-8 md:pb-12">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">History & Mandate</h1>
        <div className="w-16 h-px bg-secondary mx-auto mb-8"></div>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-light">
          The Terai Law Students Association ({organization.shortName}) is the definitive representative body for Terai-origin scholars at the Faculty of Law, Prithvi Narayan Campus.
        </p>
      </div>

      {/* The Historical Foundation */}
      <section className="mb-24">
        <h2 className="font-serif text-3xl font-bold text-primary mb-6">The Founding Context</h2>
        <div className="prose prose-lg dark:prose-invert text-muted-foreground max-w-none">
          <p className="leading-relaxed mb-6">
            Established in <strong>{organization.established}</strong>, the Terai Law Students Association was convened out of a critical academic necessity. It was founded to amplify the distinct voices, scholarship, and advocacy of law students hailing from the 22 districts of the Terai region studying at Prithvi Narayan Campus, Pokhara.
          </p>
          <p className="leading-relaxed mb-6">
            The association recognizes the unique socio-legal intersections faced by these communities—including groups formally recognized by the Madhesi, Muslim, and Tharu commissions. By establishing a formalized institutional framework, {organization.shortName} ensures that geography and background serve as assets to legal scholarship rather than barriers to professional excellence.
          </p>
          <p className="leading-relaxed">
            Since our inception, we have systematically organized legal awareness campaigns, rigorous moot court proceedings, cultural symposia, and community service programs. Our mandate is to transform legal education into actionable social justice.
          </p>
        </div>
      </section>

      {/* The Six Pillars */}
      <section className="mb-24">
        <h2 className="font-serif text-3xl font-bold text-primary mb-10 border-b border-border pb-4">Core Objectives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <div className="flex flex-col">
            <span className="text-secondary font-serif text-2xl font-bold mb-2">I.</span>
            <h3 className="font-bold text-primary text-lg mb-2">Defense of Student Rights</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">To uncompromisingly safeguard the academic, social, and professional rights of our scholars within the university ecosystem.</p>
          </div>
          <div className="flex flex-col">
            <span className="text-secondary font-serif text-2xl font-bold mb-2">II.</span>
            <h3 className="font-bold text-primary text-lg mb-2">Advancement of Legal Literacy</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">To actively promote legal education and research, extending critical legal literacy to marginalized communities.</p>
          </div>
          <div className="flex flex-col">
            <span className="text-secondary font-serif text-2xl font-bold mb-2">III.</span>
            <h3 className="font-bold text-primary text-lg mb-2">Institutional Unity</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">To build an enduring professional network that fosters collaboration among Terai/Madhesh legal scholars nationwide.</p>
          </div>
          <div className="flex flex-col">
            <span className="text-secondary font-serif text-2xl font-bold mb-2">IV.</span>
            <h3 className="font-bold text-primary text-lg mb-2">Professional Rigor</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">To mandate excellence in leadership, appellate advocacy (moot court), and comprehensive legal drafting.</p>
          </div>
          <div className="flex flex-col">
            <span className="text-secondary font-serif text-2xl font-bold mb-2">V.</span>
            <h3 className="font-bold text-primary text-lg mb-2">Social Justice Advocacy</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">To act as a structural counterweight against systemic discrimination, inequality, and social injustice in all its legal forms.</p>
          </div>
          <div className="flex flex-col">
            <span className="text-secondary font-serif text-2xl font-bold mb-2">VI.</span>
            <h3 className="font-bold text-primary text-lg mb-2">Authoritative Publication</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">To document, publish, and disseminate peer-reviewed legal research and academic findings to the broader legal community.</p>
          </div>
        </div>
      </section>

      {/* Constitutional Foundation */}
      <section className="bg-slate-50 dark:bg-slate-900 border border-border p-8 md:p-12">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-primary flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
          </div>
          <h2 className="font-serif text-2xl font-bold text-primary mb-4">The Organizational Constitution</h2>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mb-8">
            The Terai Law Students Association operates under a strict constitutional framework outlining the duties of the Executive Committee, membership eligibility, and electoral protocols.
          </p>
          <Link 
            href="/about/constitution" 
            className="inline-flex h-12 md:h-10 items-center justify-center border border-primary px-8 text-sm font-bold tracking-widest uppercase text-primary hover:bg-primary hover:text-primary-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            Review the Constitution
          </Link>
        </div>
      </section>

      {/* Organizational Timeline */}
      <section className="mt-24">
        <h2 className="font-serif text-3xl font-bold text-primary mb-10 border-b border-border pb-4">Organizational Timeline</h2>
        
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-primary text-secondary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <span className="font-serif text-sm font-bold">I</span>
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-sm border border-border bg-card shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif text-lg font-bold text-primary">Inception</span>
                <span className="font-mono text-sm text-secondary font-medium tracking-wider">2080 B.S.</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                TeLSA was formally established at Prithvi Narayan Campus by visionary law students from the 22 Terai districts to secure a collective representative voice.
              </p>
            </div>
          </div>

          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-slate-100 dark:bg-slate-800 text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <span className="font-serif text-sm font-bold">II</span>
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-sm border border-border bg-card shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif text-lg font-bold text-primary">First General Assembly</span>
                <span className="font-mono text-sm text-secondary font-medium tracking-wider">2081 B.S.</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The inaugural General Assembly ratified the official constitution, electing the first unified Executive Committee to lead the association&apos;s legal mandates.
              </p>
            </div>
          </div>

          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-slate-100 dark:bg-slate-800 text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <span className="font-serif text-sm font-bold">III</span>
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-sm border border-border bg-card shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif text-lg font-bold text-primary">Digital Transformation</span>
                <span className="font-mono text-sm text-secondary font-medium tracking-wider">Present</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Launch of the official TeLSA Management Platform, establishing an enduring digital archive for events, publications, and institutional memory.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
