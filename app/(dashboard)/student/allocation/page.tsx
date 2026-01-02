"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { allocations } from "@/lib/data";
import {
  CheckCircle2,
  Download,
  Printer,
  MapPin,
  Calendar,
  User,
  Hash,
  Home,
  BedDouble,
  Receipt,
} from "lucide-react";
import Image from "next/image";
import { Logo } from "@/components/ui/logo";

function AllocationContent() {
  const allocation = allocations.find((a) => a.status === "Active");
  const searchParams = useSearchParams();

  if (!allocation) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center gap-6">
        <div className="h-24 w-24 bg-slate-100 rounded-full flex items-center justify-center shadow-inner">
          <User className="h-10 w-10 text-slate-400" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            No Active Allocation
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            You do not have any active hostel allocation at this time.
          </p>
        </div>
        <Link href="/student/hostels">
          <Button size="lg" className="rounded-full">
            Apply for Hostel
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md md:max-w-2xl mx-auto w-full pb-20">
      {/* Action Buttons (Hidden on Print) - Centered as per image */}
      <div className="flex justify-center gap-4 mb-8 print:hidden min-h-[40px]">
        <Button
          variant="outline"
          className="rounded-full bg-white px-6 border-slate-200 hover:bg-slate-50 text-slate-700 font-medium shadow-sm"
          onClick={() => window.print()}
        >
          <Printer className="h-4 w-4 mr-2" /> Print
        </Button>
        <Button className="rounded-full bg-[#3e163e] hover:bg-[#2d0f2d] text-white px-6 shadow-lg shadow-purple-900/20 font-medium">
          <Download className="h-4 w-4 mr-2" /> Download
        </Button>
      </div>

      {/* The Slip Card */}
      <Card
        id="allocation-slip"
        className="w-full border-none shadow-2xl shadow-slate-200/50 bg-white relative overflow-hidden print:shadow-none print:w-full print:max-w-none rounded-[32px]"
      >
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #3e163e 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <CardContent className="p-5 md:p-8 space-y-6 md:space-y-8">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-dashed border-slate-100 pb-6 md:pb-8">
            <div className="flex items-start gap-3 md:gap-4">
              <Logo
                width={46}
                height={46}
                className="w-10 h-10 md:w-14 md:h-14"
                disableLink
              />
              <div className="space-y-1">
                <h1 className="text-lg md:text-xl font-extrabold text-[#3e163e] uppercase leading-none tracking-tight font-heading">
                  Anchor <br /> University
                </h1>
                <p className="text-[9px] md:text-[10px] font-bold text-slate-400 bg-slate-50 inline-block px-1.5 py-0.5 rounded-full border border-slate-100 uppercase tracking-wider">
                  Student Accommodation Slip
                </p>
              </div>
            </div>
            <div className="text-right space-y-0.5 md:space-y-1">
              <div className="text-[9px] md:text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                Ref:
              </div>
              <div className="text-xs md:text-sm font-bold text-slate-900 font-mono">
                U7ER7ZQYL
              </div>
              <div className="text-[9px] md:text-[10px] text-slate-400 mt-1 hidden xs:block">
                Generated: <br />
                <span className="text-slate-600 font-medium">
                  {new Date().toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Student Details */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">
              Student Details
            </h3>
            <div className="flex items-center gap-3 md:gap-4">
              <div className="h-12 w-12 md:h-14 md:w-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 text-slate-400">
                <User className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div>
                <div className="text-base md:text-lg font-bold text-slate-900 leading-tight">
                  John Doe
                </div>
                <div className="text-xs md:text-sm text-slate-500 font-medium">
                  Computer Science • 300L
                </div>
                <div className="text-[10px] md:text-xs text-slate-400 font-mono mt-0.5">
                  MAT: 2021/1234
                </div>
              </div>
            </div>
          </div>

          {/* Allocation Details */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">
              Allocation Details
            </h3>
            <div className="bg-slate-50/80 rounded-2xl p-4 md:p-6 border border-slate-100/60 space-y-3 md:space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3 text-slate-500">
                  <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100">
                    <Home className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  </div>
                  <span className="text-xs md:text-sm font-medium">Hostel</span>
                </div>
                <span className="text-xs md:text-sm font-bold text-slate-900">
                  {allocation.hostelName}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3 text-slate-500">
                  <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100">
                    <MapPin className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  </div>
                  <span className="text-xs md:text-sm font-medium">Room</span>
                </div>
                <span className="text-xs md:text-sm font-bold text-slate-900">
                  Room {allocation.roomNumber}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3 text-slate-500">
                  <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100">
                    <BedDouble className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  </div>
                  <span className="text-xs md:text-sm font-medium">
                    Bed Space
                  </span>
                </div>
                <span className="text-xs md:text-sm font-bold text-slate-900">
                  {allocation.bedSpace}
                </span>
              </div>

              <div className="border-t border-dashed border-slate-200 my-1 md:my-2 pt-1 md:pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3 text-slate-500">
                    <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100">
                      <Receipt className="h-3 w-3 md:h-3.5 md:w-3.5" />
                    </div>
                    <span className="text-xs md:text-sm font-medium">
                      Amount
                    </span>
                  </div>
                  <span className="text-xs md:text-sm font-extrabold text-[#3e163e]">
                    ₦{allocation.amountPaid.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3 text-slate-500">
                  <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100">
                    <Calendar className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  </div>
                  <span className="text-xs md:text-sm font-medium">Date</span>
                </div>
                <span className="text-xs md:text-sm font-bold text-slate-900">
                  {allocation.dateAllocated}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Warning */}
          <div className="bg-yellow-50 rounded-xl p-4 md:p-5 border border-yellow-100 text-center">
            <p className="text-[10px] md:text-xs text-yellow-800 italic font-semibold leading-relaxed">
              "This valid slip serves as your official gate pass into the
              university hostel. Please present it to the Porter/Matron upon
              arrival."
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// End of component

export default function AllocationPage() {
  return (
    <div className="flex flex-col items-center justify-center py-6 px-0 md:py-10 md:px-4 min-h-[calc(100vh-4rem)] bg-slate-50/50 dark:bg-slate-900/50">
      <Suspense
        fallback={
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="h-12 w-12 bg-slate-200 rounded-full"></div>
            <div className="h-4 w-32 bg-slate-200 rounded"></div>
          </div>
        }
      >
        <AllocationContent />
      </Suspense>
    </div>
  );
}
