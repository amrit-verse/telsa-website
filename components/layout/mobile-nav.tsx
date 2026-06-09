"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { publicNavigation } from "@/lib/data/navigation";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="md:hidden p-2 text-primary focus:outline-none focus:ring-2 focus:ring-secondary rounded-sm"
        aria-label="Open mobile navigation menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
        </svg>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col p-0 h-[100dvh] max-h-[100dvh] justify-between overflow-hidden">
        <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
        <SheetDescription className="sr-only">Links to navigate the TeLSA public website.</SheetDescription>
        
        {/* Institutional Identity Block */}
        <div className="flex flex-col items-center text-center p-6 bg-slate-50 dark:bg-slate-900 border-b border-border shrink-0">
          <div className="relative w-16 h-16 mb-3 bg-white border border-border shadow-sm p-1 shrink-0">
            <Image 
              src="/images/telsa-logo.jpeg" 
              alt="TeLSA Official Logo" 
              fill
              className="object-contain p-1"
              sizes="80px"
              priority
            />
          </div>
          <h2 className="font-serif text-lg leading-tight text-primary dark:text-primary-foreground mt-1">
            Terai Law Students&apos; Association
          </h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium mt-1">
            Prithvi Narayan Campus
          </p>
          <p className="text-[10px] uppercase tracking-widest text-secondary font-bold mt-1">
            Established 2080 B.S.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col px-6 py-2 flex-1 justify-center">
          {publicNavigation.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`py-2.5 text-base font-serif transition-colors border-b border-border/50 last:border-0 ${
                  isActive ? "text-secondary font-bold" : "text-primary/80 dark:text-primary-foreground/80 hover:text-primary dark:hover:text-primary-foreground"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="mt-4 pt-4 border-t border-border flex flex-col gap-3">
            <Link 
              href="/join" 
              onClick={() => setOpen(false)}
              className="inline-flex h-12 items-center justify-center bg-primary border border-primary text-sm font-bold tracking-widest uppercase text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Membership Application
            </Link>
            <Link 
              href="/login" 
              onClick={() => setOpen(false)}
              className="inline-flex h-12 items-center justify-center bg-transparent border border-primary text-sm font-bold tracking-widest uppercase text-primary hover:bg-primary/5 transition-colors"
            >
              Member Portal
            </Link>
          </div>
        </nav>

        {/* Institutional Footer */}
        <div className="p-4 bg-primary text-primary-foreground text-center shrink-0">
          <p className="text-[10px] font-medium tracking-widest uppercase text-primary-foreground/70">
            Established 2080 B.S. • Pokhara, Nepal
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
