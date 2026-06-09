import Link from "next/link";
import Image from "next/image";

export default function PublicFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-primary text-primary-foreground border-t border-primary/20">
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4 pb-8 md:pb-0 border-b border-primary-foreground/10 md:border-none">
            <div className="flex items-center gap-4 mb-2">
              <div className="relative w-12 h-12 bg-white rounded-sm overflow-hidden p-0.5 shrink-0">
                <Image 
                  src="/images/telsa-logo.jpeg" 
                  alt="TeLSA Logo" 
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <h3 className="font-serif text-2xl font-normal text-white">Terai Law Students&apos; Association</h3>
            </div>
            <p className="text-primary-foreground/80 text-sm max-w-md leading-relaxed font-serif">
              The definitive representative body dedicated to academic rigor, student advocacy, and the uncompromising defense of legal rights at Prithvi Narayan Campus.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 pb-8 md:pb-0 border-b border-primary-foreground/10 md:border-none">
            <h4 className="font-semibold tracking-[0.15em] text-xs text-secondary uppercase">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/about" className="text-sm font-serif text-primary-foreground/80 hover:text-white transition-colors">About TeLSA</Link>
              <Link href="/executive-committee" className="text-sm font-serif text-primary-foreground/80 hover:text-white transition-colors">Executive Committee</Link>
              <Link href="/publications" className="text-sm font-serif text-primary-foreground/80 hover:text-white transition-colors">Publications & Notices</Link>
              <Link href="/membership" className="text-sm font-serif text-primary-foreground/80 hover:text-white transition-colors">Membership Protocol</Link>
              <Link href="/events" className="text-sm font-serif text-primary-foreground/80 hover:text-white transition-colors">Events & Assemblies</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold tracking-[0.15em] text-xs text-secondary uppercase">Contact Information</h4>
            <address className="not-italic flex flex-col gap-2 text-sm text-primary-foreground/80 font-serif">
              <p>Prithvi Narayan Campus</p>
              <p>Pokhara, Nepal</p>
              <p className="mt-4 text-xs font-sans tracking-widest uppercase text-muted-foreground">Direct Line</p>
              <p><a href="tel:9768028358" className="hover:text-white transition-colors font-sans">9768028358</a></p>
              <p className="mt-2 text-xs font-sans tracking-widest uppercase text-muted-foreground">Official Correspondence</p>
              <p><a href="mailto:asktelsa@gmail.com" className="hover:text-white transition-colors font-sans break-all">asktelsa@gmail.com</a></p>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col items-center text-center gap-6 md:flex-row md:items-center md:justify-between md:text-left md:gap-4">
          <div className="flex flex-col gap-2 text-xs text-primary-foreground/60 tracking-wider">
            <p>&copy; {currentYear} Terai Law Students&apos; Association. All rights reserved.</p>
            <p className="uppercase text-[10px]">Official Representative Body • Established 2080 B.S. • Prithvi Narayan Campus</p>
          </div>
          <div className="flex gap-6 text-xs text-primary-foreground/60 uppercase tracking-widest">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
