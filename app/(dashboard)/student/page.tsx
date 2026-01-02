"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  History,
  ArrowRight,
  BedDouble,
  CalendarDays,
  CreditCard,
  FileText,
  Wallet,
} from "lucide-react";
import { allocations } from "@/lib/data";

export default function StudentDashboard() {
  const currentAllocation = allocations.find((a) => a.status === "Active");

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Dashboard
          </h1>
          <p className="text-slate-500 mt-1">Welcome back, John Doe</p>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Current Session
          </p>
          <p className="font-semibold text-primary">2025/2026 Academic Year</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Info - Allocation Status */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm overflow-hidden bg-white">
            <CardHeader className="bg-slate-50 border-b border-slate-100 flex flex-row items-center justify-between py-4">
              <CardTitle className="flex items-center gap-2 text-base font-bold text-primary">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Current Allocation
              </CardTitle>
              {currentAllocation ? (
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-md uppercase tracking-wider">
                  Active
                </span>
              ) : (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-md uppercase tracking-wider">
                  Pending
                </span>
              )}
            </CardHeader>
            <CardContent className="p-8">
              {currentAllocation ? (
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                  <div className="h-24 w-24 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0">
                    <Building2 className="h-10 w-10 text-primary" />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">
                        {currentAllocation.hostelName}
                      </h3>
                      <p className="text-slate-500 flex items-center gap-2">
                        <BedDouble className="h-4 w-4" /> Room{" "}
                        {currentAllocation.roomNumber} •{" "}
                        {currentAllocation.bedSpace}
                      </p>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />
                        <span>
                          Allocated:{" "}
                          {new Date(
                            currentAllocation.dateAllocated
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 w-full md:w-auto">
                    <Link href="/student/allocation">
                      <Button
                        size="lg"
                        className="w-full bg-primary text-white hover:bg-primary/90 shadow-md gap-2"
                      >
                        <FileText className="h-4 w-4" /> View Slip
                      </Button>
                    </Link>
                    <Link href="/student/payment">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full border-primary/20 text-primary hover:bg-primary/5 gap-2"
                      >
                        <CreditCard className="h-4 w-4" /> Receipts
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                    <Building2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    No Active Allocation
                  </h3>
                  <p className="text-slate-500 max-w-sm mx-auto mt-2 mb-6">
                    You have not been allocated a room for this session yet.
                    Browse hostels to apply.
                  </p>
                  <Link href="/student/hostels">
                    <Button className="bg-primary text-white hover:bg-primary/90">
                      Browse Hostels
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Panel */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-white h-full">
            <CardHeader className="border-b border-slate-100 py-4">
              <CardTitle className="text-base font-bold text-primary">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid gap-4">
              {/* Browse Hostels */}
              <Link href="/student/hostels" className="group block">
                <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-primary/20 hover:bg-primary/5 transition-all cursor-pointer">
                  <div className="h-10 w-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">
                      Browse Hostels
                    </p>
                    <p className="text-xs text-slate-500">
                      View available rooms
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 ml-auto text-slate-300 group-hover:text-primary transition-colors" />
                </div>
              </Link>

              {/* Payments */}
              <Link href="/student/payment" className="group block">
                <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-primary/20 hover:bg-primary/5 transition-all cursor-pointer">
                  <div className="h-10 w-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Wallet className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Payments</p>
                    <p className="text-xs text-slate-500">
                      View history & invoices
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 ml-auto text-slate-300 group-hover:text-primary transition-colors" />
                </div>
              </Link>

              {/* History */}
              <Link href="/student/history" className="group block">
                <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-primary/20 hover:bg-primary/5 transition-all cursor-pointer">
                  <div className="h-10 w-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <History className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">History</p>
                    <p className="text-xs text-slate-500">Previous sessions</p>
                  </div>
                  <ArrowRight className="h-4 w-4 ml-auto text-slate-300 group-hover:text-primary transition-colors" />
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
