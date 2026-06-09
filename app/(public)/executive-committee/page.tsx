import { Metadata } from "next";
import { committeeMembers } from "@/lib/data/committee";

export const metadata: Metadata = {
  title: "Executive Committee",
  description: "Meet the current Executive Committee of the Terai Law Students' Association (TeLSA).",
};

export default function ExecutiveCommitteePage() {
  const coreMembers = committeeMembers.filter(m => m.roleType === "core");
  const execMembers = committeeMembers.filter(m => m.roleType === "executive");

  return (
    <div className="container mx-auto px-4 md:px-8 py-16 max-w-6xl">
      <div className="mb-16 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">Executive Committee</h1>
        <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          The dedicated leadership team guiding the Terai Law Students&apos; Association towards its mission of legal literacy, unity, and student empowerment.
        </p>
      </div>

      {/* Core Committee Section */}
      <section className="mb-20">
        <h2 className="font-serif text-3xl font-bold text-center text-primary mb-12">Core Leadership</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {coreMembers.map((member, index) => (
            <div key={index} className="bg-card border border-border rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
              {/* Typographic Monogram Fallback */}
              <div className="w-full h-64 bg-primary flex items-center justify-center relative overflow-hidden">
                <span className="font-serif text-6xl text-primary-foreground font-bold tracking-widest">{member.name.charAt(0)}</span>
                {/* Subtle gradient overlay to match aesthetic */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-6 text-center border-t-2 border-secondary/20 group-hover:border-secondary transition-colors">
                <h3 className="font-serif text-xl font-bold text-primary mb-1">{member.name}</h3>
                <p className="text-secondary font-semibold text-sm tracking-wide uppercase">{member.position}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Executive Members Section */}
      <section>
        <h2 className="font-serif text-3xl font-bold text-center text-primary mb-12">Executive Members</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {execMembers.map((member, index) => (
            <div key={index} className="bg-card border border-border p-6 rounded-sm text-center shadow-sm hover:border-secondary/50 transition-colors">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
                <span className="font-serif text-2xl font-bold text-primary">{member.name.charAt(0)}</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-primary mb-1">{member.name}</h3>
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">{member.position}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
