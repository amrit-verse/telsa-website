import { Metadata } from "next";
import { organization } from "@/lib/data/organization";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Terai Law Students' Association. Find our email, phone number, and official address in Kaski, Nepal.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-16 max-w-6xl">
      <div className="mb-16 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">Contact Us</h1>
        <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have questions about membership, events, or our initiatives? We are here to help. Reach out to the {organization.shortName} executive team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info & Map */}
        <div>
          <h2 className="font-serif text-3xl font-bold text-primary mb-8">Official Information</h2>
          <div className="space-y-8 mb-12">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-secondary shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <h3 className="font-bold text-primary uppercase tracking-wider text-sm mb-1">Phone Number</h3>
                <p className="text-muted-foreground text-lg">{organization.phone}</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-secondary shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <div>
                <h3 className="font-bold text-primary uppercase tracking-wider text-sm mb-1">Email Address</h3>
                <p className="text-muted-foreground text-lg">{organization.email}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-secondary shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <h3 className="font-bold text-primary uppercase tracking-wider text-sm mb-1">Office Location</h3>
                <p className="text-muted-foreground text-lg">{organization.location}</p>
              </div>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div>
            <h3 className="sr-only">Map of our Office Location</h3>
            <div className="w-full h-64 bg-slate-100 dark:bg-slate-900 border border-border rounded-sm overflow-hidden shadow-sm">
              <iframe 
                title={`Google Maps showing ${organization.location}`}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112513.33649495733!2d83.91030095945391!3d28.209618059000676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995937bbf0376ff%3A0xf6dd8232bc566212!2sPokhara!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Contact Form UI */}
        <div className="bg-card border border-border p-8 rounded-sm shadow-sm">
          <h2 className="font-serif text-3xl font-bold text-primary mb-6">Send a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary" htmlFor="fullName">Full Name</label>
                <input id="fullName" disabled type="text" placeholder="John Doe" className="w-full px-4 py-2 border border-border rounded-sm bg-background text-sm focus:outline-none opacity-70 cursor-not-allowed" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary" htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" disabled type="email" placeholder="john@example.com" className="w-full px-4 py-2 border border-border rounded-sm bg-background text-sm focus:outline-none opacity-70 cursor-not-allowed" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary" htmlFor="subject">Subject</label>
              <input id="subject" disabled type="text" placeholder="Membership Inquiry" className="w-full px-4 py-2 border border-border rounded-sm bg-background text-sm focus:outline-none opacity-70 cursor-not-allowed" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary" htmlFor="message">Message</label>
              <textarea id="message" disabled rows={5} placeholder="How can we help you?" className="w-full px-4 py-2 border border-border rounded-sm bg-background text-sm focus:outline-none opacity-70 cursor-not-allowed resize-none"></textarea>
            </div>
            <button disabled className="w-full h-12 bg-primary text-primary-foreground font-medium rounded-sm opacity-50 cursor-not-allowed">
              Submit Message (Coming Soon)
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
