import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about the Terai Law Students' Association (TeLSA), our mission, and our dedication to legal literacy and student rights in Nepal.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-16 max-w-5xl">
      {/* Header Section */}
      <div className="mb-16 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">About TeLSA</h1>
        <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
          Established in 2080 B.S. in Pokhara Metropolitan City, Kaski, Nepal, the Terai Law Students' Association is a premier organization representing the interests and aspirations of law students from the Terai/Madhesh region.
        </p>
      </div>

      {/* Mission Section */}
      <section className="mb-20">
        <div className="bg-card border border-border p-8 md:p-12 rounded-sm shadow-sm">
          <h2 className="font-serif text-3xl font-bold text-primary mb-8 border-b pb-4">Our Mission & Objectives</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-muted-foreground">
            <li className="flex items-start gap-4">
              <span className="text-secondary font-bold text-xl mt-1">01.</span>
              <p className="leading-relaxed"><strong>Protect Rights:</strong> Safeguard the academic, social, and professional rights and interests of law students.</p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-secondary font-bold text-xl mt-1">02.</span>
              <p className="leading-relaxed"><strong>Legal Education:</strong> Promote legal education, research, and widespread legal literacy among marginalized communities.</p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-secondary font-bold text-xl mt-1">03.</span>
              <p className="leading-relaxed"><strong>Foster Unity:</strong> Support unity, collaboration, and networking among Terai/Madhesh law students across Nepal.</p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-secondary font-bold text-xl mt-1">04.</span>
              <p className="leading-relaxed"><strong>Leadership:</strong> Encourage leadership, moot court participation, and overall personality development.</p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-secondary font-bold text-xl mt-1">05.</span>
              <p className="leading-relaxed"><strong>Social Justice:</strong> Actively work against systemic discrimination, inequality, and social injustice in all its forms.</p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-secondary font-bold text-xl mt-1">06.</span>
              <p className="leading-relaxed"><strong>Community Action:</strong> Conduct impactful legal awareness programs and publish authoritative legal research.</p>
            </li>
          </ul>
        </div>
      </section>

      {/* Origin Story / Organization info */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-serif text-3xl font-bold text-primary mb-6">Our Roots</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            TeLSA was founded out of a critical need to amplify the voices of law students hailing from the 22 districts of the Terai region. We recognize the unique socio-legal challenges faced by these communities, including groups recognized by the Madhesi, Muslim, and Tharu commissions.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            From our headquarters in Kaski, we coordinate national efforts to ensure that geography and background are never barriers to legal excellence and justice.
          </p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-900 rounded-sm p-8 border border-border flex items-center justify-center min-h-[300px]">
          {/* Placeholder for TeLSA Group Photo */}
          <div className="text-center text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 opacity-50"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
            <p className="text-sm">TeLSA Members Assembly (Placeholder)</p>
          </div>
        </div>
      </section>
    </div>
  );
}
