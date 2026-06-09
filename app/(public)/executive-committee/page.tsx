import { Metadata } from "next";
import Image from "next/image";
import { committeeMembers } from "@/lib/data/committee";

export const metadata: Metadata = {
  title: "Executive Committee",
  description: "Meet the current Executive Committee of the Terai Law Students' Association (TeLSA).",
};

export default function ExecutiveCommitteePage() {
  const coreMembers = committeeMembers.filter(m => m.roleType === "core");
  const execMembers = committeeMembers.filter(m => m.roleType === "executive");

  return (
    <div className="container mx-auto px-4 md:px-8 py-10 md:py-16 max-w-6xl">
      <div className="mb-12 md:mb-16 text-center">
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4 md:mb-6">Executive Committee</h1>
        <div className="w-16 md:w-24 h-px md:h-1 bg-secondary mx-auto mb-6 md:mb-8"></div>
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
              {member.image ? (
                <div className="w-full h-64 relative bg-slate-100 dark:bg-slate-800">
                  <Image 
                    src={member.image} 
                    alt={`${member.name} - ${member.position}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              ) : (
                <div className="w-full h-64 bg-primary flex items-center justify-center relative overflow-hidden">
                  <span className="font-serif text-6xl text-primary-foreground font-bold tracking-widest">{member.name.charAt(0)}</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              )}
              <div className="p-4 md:p-6 text-center border-t-2 border-border transition-colors">
                <h3 className="font-serif text-lg md:text-xl font-bold text-primary mb-1">{member.name}</h3>
                <p className="text-secondary font-semibold text-xs md:text-sm tracking-wide uppercase">{member.position}</p>
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
            <div key={index} className="bg-card border border-border p-6 rounded-sm text-center shadow-sm transition-shadow hover:shadow-md">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4 border border-primary/20 relative overflow-hidden">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={`${member.name} - ${member.position}`}
                    fill
                    className="object-cover object-top"
                    sizes="80px"
                  />
                ) : (
                  <span className="font-serif text-2xl font-bold text-primary">{member.name.charAt(0)}</span>
                )}
              </div>
              <h3 className="font-serif text-base md:text-lg font-bold text-primary mb-1">{member.name}</h3>
              <p className="text-muted-foreground text-[10px] md:text-xs font-medium uppercase tracking-wider">{member.position}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
