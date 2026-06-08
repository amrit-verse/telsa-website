"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { publicNavigation } from "@/lib/data/navigation";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button 
          className="md:hidden p-2 text-primary focus:outline-none focus:ring-2 focus:ring-secondary rounded-sm"
          aria-label="Open mobile navigation menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
          </svg>
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col">
        <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
        <SheetDescription className="sr-only">Links to navigate the TeLSA public website.</SheetDescription>
        <nav className="flex flex-col gap-6 mt-8 flex-1">
          {publicNavigation.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-lg font-medium transition-colors ${
                  isActive ? "text-secondary font-bold" : "text-foreground hover:text-secondary"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="border-t pt-6 mt-auto flex flex-col gap-4 mb-8">
            <Link 
              href="/join" 
              onClick={() => setOpen(false)}
              className="inline-flex h-12 items-center justify-center rounded-sm bg-secondary px-6 text-base font-medium text-secondary-foreground shadow hover:bg-secondary/90 transition-colors"
            >
              Join TeLSA
            </Link>
            <Link 
              href="/login" 
              onClick={() => setOpen(false)}
              className="text-base font-medium text-muted-foreground hover:text-foreground text-center py-2"
            >
              Member Login
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
