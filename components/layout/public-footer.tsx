import Link from "next/link";

export default function PublicFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-primary text-primary-foreground border-t border-primary/20">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-serif text-2xl font-bold text-secondary">TeLSA</h3>
            <p className="text-primary-foreground/80 text-sm max-w-md leading-relaxed">
              Terai Law Students' Association (TeLSA) is dedicated to protecting students' rights, promoting legal education, and working against social injustice in Nepal.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold tracking-wider text-sm text-secondary uppercase">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/about" className="text-sm text-primary-foreground/80 hover:text-white transition-colors">About Us</Link>
              <Link href="/executive-committee" className="text-sm text-primary-foreground/80 hover:text-white transition-colors">Executive Committee</Link>
              <Link href="/membership" className="text-sm text-primary-foreground/80 hover:text-white transition-colors">Membership</Link>
              <Link href="/events" className="text-sm text-primary-foreground/80 hover:text-white transition-colors">Events & Activities</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold tracking-wider text-sm text-secondary uppercase">Contact Us</h4>
            <address className="not-italic flex flex-col gap-2 text-sm text-primary-foreground/80">
              <p>Pokhara Metropolitan City Ward No. 1</p>
              <p>Kaski, Nepal</p>
              <p className="mt-2">Phone: <a href="tel:9768028358" className="hover:text-white">9768028358</a></p>
              <p>Email: <a href="mailto:asktelsa@gmail.com" className="hover:text-white">asktelsa@gmail.com</a></p>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/60">
            &copy; {currentYear} Terai Law Students' Association. All rights reserved. Est. 2080 B.S.
          </p>
          <div className="flex gap-4 text-sm text-primary-foreground/60">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
