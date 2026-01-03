"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<"student" | "admin">("student");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock login delay
    setTimeout(() => {
      setLoading(false);
      if (role === "admin") {
        router.push("/admin");
      } else {
        router.push("/student");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: Brand Blue Section */}
      <div className="bg-primary hidden lg:flex flex-col justify-center px-20">
        <div className="max-w-md">
          {/* Logo Container - White background for visibility */}
          <div className="bg-white p-4 rounded-3xl w-fit mb-10 shadow-lg">
            <Logo width={100} height={100} type="full" />
          </div>

          <h1 className="text-5xl font-bold font-heading text-white tracking-tight leading-tight mb-8">
            Welcome <br /> Back
          </h1>

          <div className="space-y-6 text-white text-lg font-light leading-relaxed opacity-90">
            <p>Sign in to your dashboard.</p>
            <p className="opacity-75 text-base">
              Manage your accommodation and payments securely.
            </p>
          </div>

          <div className="pt-12 mt-12 border-t border-white/20">
            <p className="text-white/60 text-xs font-medium uppercase tracking-widest">
              Anchor University Lagos
            </p>
          </div>
        </div>
      </div>

      {/* Right: White Section */}
      <div className="flex items-center justify-center p-8 bg-white relative">
        <div className="absolute top-8 left-8 lg:hidden">
          <Logo width={60} height={60} />
        </div>
        <div className="w-full max-w-[450px] space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-primary tracking-tight">
              Sign In
            </h2>
            <p className="text-slate-500">
              Access the {role === "student" ? "Student" : "Admin"} Portal
            </p>
          </div>

          {/* Toggle Pills */}
          <div className="bg-slate-50 p-1 rounded-lg flex">
            <button
              onClick={() => setRole("student")}
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                role === "student"
                  ? "bg-white text-primary shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Student
            </button>
            <button
              onClick={() => setRole("admin")}
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                role === "admin"
                  ? "bg-white text-primary shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-primary font-bold text-xs uppercase tracking-wider"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={
                  role === "student" ? "student@aul.edu.ng" : "admin@aul.edu.ng"
                }
                required
                className="h-12 bg-slate-50 border-none focus:bg-slate-100 focus:ring-0 rounded-lg placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-primary font-bold text-xs uppercase tracking-wider"
                >
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="h-12 bg-slate-50 border-none focus:bg-slate-100 focus:ring-0 rounded-lg placeholder:text-slate-400"
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full h-12 text-base font-bold bg-primary text-white hover:bg-primary/90 shadow-none rounded-lg transition-all"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>
          </form>

          <p className="text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-primary hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
