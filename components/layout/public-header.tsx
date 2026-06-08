"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { publicNavigation } from "@/lib/data/navigation";
import MobileNav from "@/components/layout/mobile-nav";
import { organization } from "@/lib/data/organization";

export default function PublicHeader() {
  const pathname = usePathname();

  return (
    <header className="w-full flex flex-col z-50">
      {/* Tier 1: Utility Bar (Deep Navy) */}
      <div className="bg-primary text-primary-foreground h-10 hidden md:flex items-center justify-between px-4 md:px-8 text-xs font-semibold tracking-wider uppercase border-b border-primary-foreground/10">
        <div className="flex items-center gap-6">
          <span>Prithvi Narayan Campus, Pokhara</span>
          <span className="text-secondary">Est. {organization.established}</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/contact" className="hover:text-secondary transition-colors focus:outline-none focus:ring-1 focus:ring-secondary">Contact</Link>
          <Link href="/login" className="hover:text-secondary transition-colors focus:outline-none focus:ring-1 focus:ring-secondary">Member Login</Link>
        </div>
      </div>

      {/* Tier 2: Main Navigation (White/Pearl) */}
      <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm transition-all duration-300 border-b border-border">
        <div className="container mx-auto flex h-24 items-center justify-between px-4 md:px-8">
          
          {/* Institutional Monogram */}
          <Link href="/" className="flex items-center gap-4 focus:outline-none focus:ring-2 focus:ring-secondary p-1">
            <div className="w-14 h-14 border border-primary flex items-center justify-center p-1 rounded-none">
              <div className="w-full h-full bg-primary flex items-center justify-center text-primary-foreground font-serif text-2xl" aria-hidden="true">
                <span className="leading-none tracking-tighter" style={{ fontFamily: "var(--font-playfair)" }}>T<span className="text-secondary text-lg">e</span>LSA</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl leading-none text-primary dark:text-primary-foreground tracking-normal">{organization.name}</span>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium mt-1">Prithvi Narayan Campus</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {publicNavigation.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={`text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-secondary px-1 py-2 border-b-2 ${
                    isActive ? "text-primary border-secondary" : "text-muted-foreground border-transparent hover:text-primary hover:border-border"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.name}
                </Link>
              );
            })}
            
            <Link 
              href="/join" 
              className="ml-4 inline-flex h-10 items-center justify-center rounded-none bg-secondary px-6 text-sm font-bold text-secondary-foreground hover:bg-secondary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary uppercase tracking-wider"
            >
              Join TeLSA
            </Link>
          </nav>

          {/* Mobile Actions */}
          <div className="flex items-center gap-4 md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
