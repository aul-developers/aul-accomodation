"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import {
  LayoutDashboard,
  Building2,
  Receipt,
  Grid,
  Settings,
  HelpCircle,
  Trophy,
  History,
  Users,
} from "lucide-react";

export function DashboardSidebar({
  className,
  onNavClick,
}: {
  className?: string;
  onNavClick?: () => void;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  const studentLinks = [
    { title: "Dashboard", href: "/student", icon: LayoutDashboard },
    { title: "Hostels", href: "/student/hostels", icon: Grid },
    { title: "My Allocation", href: "/student/allocation", icon: Building2 },
    { title: "Payments", href: "/student/payment", icon: Receipt },
  ];

  const adminLinks = [
    { title: "Overview", href: "/admin", icon: LayoutDashboard },
    { title: "Hostel Management", href: "/admin/hostels", icon: Building2 },
    { title: "Room Allocations", href: "/admin/allocations", icon: Users },
    { title: "System Logs", href: "/admin/logs", icon: History },
  ];

  const links = isAdmin ? adminLinks : studentLinks;

  return (
    /* 
      Heavy rounding on the right (rounded-r-[60px]) to create the "semi-circle" effect requested. 
      Width increased to 280px to accommodate the heavy curve without cutting off content.
    */
    <aside
      className={cn(
        "bg-primary flex flex-col w-[280px] shrink-0 h-screen transition-all duration-300 rounded-r-[60px] shadow-2xl shadow-primary/30 overflow-hidden border-r border-white/5",
        className || "hidden md:flex fixed left-0 top-0 z-50"
      )}
    >
      {/* Header - Prominent Logo Display */}
      <div className="flex items-center gap-4 px-8 h-28 pt-6">
        <div className="bg-white p-2.5 rounded-full shadow-lg shadow-black/10 transform hover:scale-105 transition-transform">
          <Logo width={32} height={32} />
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-2xl tracking-tight leading-none text-white">
            Anchor
          </span>
          <span className="text-[10px] uppercase tracking-widest text-white/60 font-medium mt-1">
            PORTAL
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-6 space-y-3 overflow-y-auto mt-2 pb-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive =
            pathname === link.href ||
            (pathname.startsWith(link.href) &&
              link.href !== "/student" &&
              link.href !== "/admin");

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavClick}
              className={cn(
                "flex items-center gap-4 rounded-2xl px-5 py-4 text-sm font-bold transition-all relative overflow-hidden group",
                isActive
                  ? "bg-white text-primary shadow-xl translate-x-1"
                  : "text-white/60 hover:text-white hover:bg-white/10 hover:translate-x-1"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5",
                  isActive
                    ? "text-primary"
                    : "text-white/60 group-hover:text-white"
                )}
              />
              <span className="relative z-10">{link.title}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer Area */}
      <div className="px-6 pb-10 space-y-6 mt-auto">
        {/* User Mini Profile */}
        <div className="flex items-center gap-4 px-3 pt-2 border-t border-white/10">
          <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
            <Logo width={20} height={20} />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate text-white">John Doe</p>
            <p className="text-[10px] text-white/50 truncate font-medium">
              student@aul.edu.ng
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
