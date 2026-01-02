"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-primary/10 selection:text-primary">
      {/* Navbar - Ultra Minimal */}
      <nav className="w-full p-8 md:p-12 flex items-center justify-between container mx-auto">
        <Logo width={50} height={50} />
        <div className="flex items-center gap-6 text-sm font-semibold tracking-wide">
          <span className="hidden md:inline-block text-slate-500">
            2025/2026 Session
          </span>
          <Link
            href="/login"
            className="text-primary hover:opacity-80 transition-opacity"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Main Content - Swiss Minimalist Hero */}
      <main className="flex-1 flex flex-col justify-center container mx-auto px-8 md:px-0">
        <div className="max-w-5xl space-y-12">
          <div className="space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-md text-xs font-bold uppercase tracking-widest text-primary w-fit">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Portal Open</span>
            </div>

            {/* Massive Typography - Improved Visibility */}
            <h1 className="text-7xl md:text-9xl font-bold font-heading tracking-tighter leading-[0.9] text-primary">
              Student <br />
              <span className="text-slate-400">Living.</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 max-w-2xl font-light leading-relaxed pt-4">
              The official accommodation platform for Anchor University.{" "}
              <br className="hidden md:block" />
              Secure your space in minutes, not days.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-4">
            <Link href="/login">
              <Button className="h-16 px-12 text-lg font-bold bg-primary text-white hover:bg-primary/90 rounded-none transition-all shadow-none flex items-center gap-4">
                Access Portal <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="p-8 md:p-12 w-full container mx-auto flex flex-col md:flex-row items-start md:items-end justify-between text-xs text-slate-400 font-medium uppercase tracking-widest gap-4">
        <div className="space-y-1">
          <p>Anchor University Lagos</p>
          <p>© {new Date().getFullYear()} All Rights Reserved</p>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <span>Official Secure Gateway</span>
        </div>
      </footer>
    </div>
  );
}
