"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CircleUser, Menu, Bell, Search, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import { useState } from "react";

export function DashboardHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 md:sticky md:top-0 z-40 flex h-24 items-center justify-between gap-4 bg-white/80 backdrop-blur-xl px-4 md:px-8 border-b border-slate-100/50 transition-all duration-300">
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 md:hidden h-12 w-12 rounded-2xl bg-slate-50/50 text-slate-700 hover:bg-slate-100"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="p-0 border-r-0 bg-transparent w-auto border-none shadow-none [&>button]:hidden"
        >
          <VisuallyHidden.Root>
            <SheetTitle>Navigation Menu</SheetTitle>
          </VisuallyHidden.Root>
          {/* Reuse the sidebar logic but override 'hidden' and 'fixed' */}
          <DashboardSidebar
            className="flex w-[280px] relative h-full rounded-r-[60px]"
            onNavClick={() => setIsMobileMenuOpen(false)}
          />
        </SheetContent>
      </Sheet>

      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 flex-1 md:flex-initial">
        {/* Greeting Section */}
        <div className="hidden md:block ml-4">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            Good Morning, John
          </h2>
          <p className="text-xs text-slate-500 font-medium tracking-wide">
            Welcome back to your portal
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <Button
          variant="ghost"
          size="icon"
          className="relative text-slate-500 hover:text-primary hover:bg-primary/5 rounded-full w-10 h-10 transition-all"
        >
          <Bell className="h-6 w-6 md:h-5 md:w-5" />
          <span className="absolute top-2.5 right-3 h-2 w-2 bg-red-500 rounded-full border border-white animate-pulse" />
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-12 w-12 md:w-auto md:h-12 rounded-full md:pl-1 md:pr-4 gap-3 hover:bg-slate-50 transition-all group p-0"
            >
              <div className="h-10 w-10 rounded-full bg-[#471344] flex items-center justify-center text-white font-bold ring-4 ring-white shadow-lg shadow-purple-900/10 group-hover:scale-105 transition-transform shrink-0">
                JD
              </div>
              <div className="flex flex-col items-start text-left md:flex hidden">
                <span className="text-sm font-bold text-slate-700 leading-none group-hover:text-primary transition-colors">
                  John Doe
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  MAT: 2021/1234
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-300 group-hover:text-primary transition-colors md:block hidden" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-64 p-2 rounded-2xl shadow-2xl border-slate-100 bg-white/95 backdrop-blur-sm mt-2"
          >
            <DropdownMenuLabel className="font-normal p-3 bg-slate-50 rounded-xl mb-2">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-bold leading-none text-slate-900">
                  John Doe
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  computer.science@aul.edu.ng
                </p>
              </div>
            </DropdownMenuLabel>

            <div className="px-2 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Account
            </div>
            <Link href="/student/profile">
              <DropdownMenuItem className="rounded-lg font-medium cursor-pointer focus:bg-primary/5 focus:text-primary">
                Profile
              </DropdownMenuItem>
            </Link>
            <Link href="/student/history">
              <DropdownMenuItem className="rounded-lg font-medium cursor-pointer focus:bg-primary/5 focus:text-primary">
                History
              </DropdownMenuItem>
            </Link>

            <DropdownMenuSeparator className="my-2 bg-slate-50/50" />

            <div className="px-2 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Hostel
            </div>
            <Link href="/student/allocation">
              <DropdownMenuItem className="rounded-lg font-medium cursor-pointer focus:bg-primary/5 focus:text-primary">
                My Allocation
              </DropdownMenuItem>
            </Link>

            <DropdownMenuSeparator className="my-2 bg-slate-50/50" />

            <DropdownMenuItem
              className="text-red-600 focus:text-red-700 focus:bg-red-50 rounded-lg font-bold cursor-pointer"
              onClick={() => (window.location.href = "/login")}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
