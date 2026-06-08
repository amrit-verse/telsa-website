"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, Search, LogOut, User } from "lucide-react";
import { dashboardLinks } from "./sidebar";

export default function DashboardHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-4 sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Mobile Sidebar Trigger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <button className="md:hidden p-2 text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-secondary rounded-sm" aria-label="Open Admin Menu">
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0 flex flex-col">
            <SheetTitle className="sr-only">Dashboard Navigation</SheetTitle>
            <div className="h-16 flex items-center px-6 border-b bg-primary">
              <span className="font-serif font-bold text-xl text-primary-foreground">TeLSA Admin</span>
            </div>
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              {dashboardLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium ${
                      isActive ? "bg-primary/5 text-primary border-l-2 border-secondary" : "text-muted-foreground border-l-2 border-transparent"
                    }`}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Global Search Placeholder */}
        <div className="hidden sm:flex items-center relative w-72">
          <Search className="w-4 h-4 absolute left-3 text-muted-foreground" aria-hidden="true" />
          <input 
            type="text" 
            placeholder="Search members, events, publications..." 
            className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-100 dark:bg-slate-900 border border-transparent rounded-sm focus:outline-none focus:border-border focus:ring-1 focus:ring-secondary"
            disabled
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-secondary rounded-full" aria-label="User Menu">
              <Avatar className="w-9 h-9 border border-border shadow-sm">
                <AvatarFallback className="bg-primary/5 text-primary font-bold text-sm">AD</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="w-4 h-4 mr-2" />
              <span>Profile Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
