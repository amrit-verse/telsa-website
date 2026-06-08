"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  BookOpen, 
  Image as ImageIcon, 
  Shield, 
  Settings 
} from "lucide-react";

export const dashboardLinks = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Members", href: "/dashboard/members", icon: Users },
  { name: "Events", href: "/dashboard/events", icon: Calendar },
  { name: "Publications", href: "/dashboard/publications", icon: BookOpen },
  { name: "Gallery", href: "/dashboard/gallery", icon: ImageIcon },
  { name: "Committee", href: "/dashboard/committee", icon: Shield },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-card h-screen sticky top-0 shadow-sm z-10">
      <div className="h-16 flex items-center px-6 border-b">
        <Link href="/" className="font-serif font-bold text-xl text-primary flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">T</div>
          TeLSA Admin
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5" aria-label="Dashboard Sidebar">
        {dashboardLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
                isActive 
                  ? "bg-primary/5 text-primary border-l-2 border-secondary" 
                  : "text-muted-foreground hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-foreground border-l-2 border-transparent"
              }`}
            >
              <link.icon className={`w-[18px] h-[18px] ${isActive ? "text-secondary" : "opacity-70"}`} aria-hidden="true" />
              {link.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t text-xs text-muted-foreground text-center bg-slate-50/50 dark:bg-slate-900/50">
        TeLSA OS v1.0
      </div>
    </aside>
  );
}
