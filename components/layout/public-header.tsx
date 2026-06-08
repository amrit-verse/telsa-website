"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { publicNavigation } from "@/lib/data/navigation";
import MobileNav from "@/components/layout/mobile-nav";

export default function PublicHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm transition-all duration-300">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          {/* Logo Placeholder */}
          <Link href="/" className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-secondary rounded-sm p-1">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-serif font-bold text-xl" aria-hidden="true">
              T
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl leading-none text-primary dark:text-primary-foreground">TeLSA</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Nepal</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {publicNavigation.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link 
                key={link.href}
                href={link.href} 
                className={`text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-secondary rounded-sm px-2 py-1 ${
                  isActive ? "text-secondary font-bold" : "text-foreground hover:text-secondary"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link 
            href="/join" 
            className="hidden md:inline-flex h-10 items-center justify-center rounded-sm bg-secondary px-6 text-sm font-medium text-secondary-foreground shadow hover:bg-secondary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Join TeLSA
          </Link>
          <Link 
            href="/login" 
            className="hidden md:inline-flex text-sm font-medium hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-secondary rounded-sm px-2 py-1"
          >
            Login
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
