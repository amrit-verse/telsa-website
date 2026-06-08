import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Membership",
  description: "Learn about the eligibility criteria, fee structure, and approval workflow to become a member of the Terai Law Students' Association (TeLSA).",
};

export default function MembershipPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-16 max-w-5xl">
      <div className="mb-16 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">Join TeLSA</h1>
        <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Become a part of the leading association for Terai/Madhesh law students. We are united in our commitment to academic excellence and social justice.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        {/* Eligibility Criteria */}
        <section className="bg-card border border-border p-8 rounded-sm shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-primary mb-6">Eligibility Criteria</h2>
          <ul className="space-y-4 text-muted-foreground">
            <li className="flex gap-3">
              <svg className="w-6 h-6 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>Must be a <strong>Nepalese citizen</strong>.</span>
            </li>
            <li className="flex gap-3">
              <svg className="w-6 h-6 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>Must be enrolled as a <strong>Bachelor's level law student or above</strong>.</span>
            </li>
            <li className="flex gap-3">
              <svg className="w-6 h-6 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>Must be a permanent resident of one of the <strong>22 Terai districts</strong>.</span>
            </li>
            <li className="flex gap-3">
              <svg className="w-6 h-6 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>Eligible groups recognized through the <strong>Madhesi, Muslim, and Tharu commissions</strong> are highly encouraged to apply.</span>
            </li>
          </ul>
        </section>

        {/* Fee Structure */}
        <section className="bg-card border border-border p-8 rounded-sm shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-primary mb-6">Fee Structure</h2>
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-bold text-primary text-lg">Ordinary Membership</h3>
                <p className="text-sm text-muted-foreground">Standard yearly membership.</p>
              </div>
              <span className="text-2xl font-serif font-bold text-secondary">NPR 100</span>
            </div>
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-bold text-primary text-lg">Lifetime Membership</h3>
                <p className="text-sm text-muted-foreground">Permanent membership.</p>
              </div>
              <span className="text-2xl font-serif font-bold text-secondary">NPR 500</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-primary text-lg">Annual Renewal</h3>
                <p className="text-sm text-muted-foreground">For ordinary members only.</p>
              </div>
              <span className="text-2xl font-serif font-bold text-secondary">NPR 100</span>
            </div>
          </div>
        </section>
      </div>

      {/* Workflow & CTA */}
      <section className="bg-primary text-primary-foreground rounded-sm p-8 md:p-12 text-center">
        <h2 className="font-serif text-3xl font-bold mb-8">Application Workflow</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-secondary text-primary font-bold flex items-center justify-center mb-4 text-xl">1</div>
            <h4 className="font-bold mb-2">Apply Online</h4>
            <p className="text-sm text-primary-foreground/70">Submit your personal and academic details.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-secondary text-primary font-bold flex items-center justify-center mb-4 text-xl">2</div>
            <h4 className="font-bold mb-2">Upload Proof</h4>
            <p className="text-sm text-primary-foreground/70">Attach your payment screenshot and ID.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-secondary text-primary font-bold flex items-center justify-center mb-4 text-xl">3</div>
            <h4 className="font-bold mb-2">Admin Review</h4>
            <p className="text-sm text-primary-foreground/70">The Executive Committee verifies your details.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-secondary text-primary font-bold flex items-center justify-center mb-4 text-xl">4</div>
            <h4 className="font-bold mb-2">Approval</h4>
            <p className="text-sm text-primary-foreground/70">Gain full access to the member portal.</p>
          </div>
        </div>
        
        <div className="pt-8 border-t border-primary-foreground/20">
          <p className="mb-6 text-primary-foreground/80">The online application portal is currently being finalized.</p>
          <button disabled className="bg-secondary/50 text-primary-foreground/50 cursor-not-allowed px-8 py-3 rounded-sm font-medium border border-transparent">
            Apply for Membership (Coming Soon)
          </button>
        </div>
      </section>
    </div>
  );
}
