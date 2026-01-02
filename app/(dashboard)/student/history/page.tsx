"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { allocations } from "@/lib/data";
import {
  CalendarDays,
  MapPin,
  BedDouble,
  FileText,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HistoryPage() {
  // Sort allocations by date (newest first)
  const sortedAllocations = [...allocations]
    .sort(
      (a, b) =>
        new Date(b.dateAllocated).getTime() -
        new Date(a.dateAllocated).getTime()
    )
    .slice(0, 5);

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Allocation History
        </h1>
        <p className="text-slate-500">
          View your accommodation records for all academic sessions.
        </p>
      </div>

      <div className="grid gap-6">
        {sortedAllocations.length > 0 ? (
          sortedAllocations.map((allocation) => {
            const isActive = allocation.status === "Active";

            return (
              <Card
                key={allocation.id}
                className={`border-none shadow-sm overflow-hidden ${
                  isActive
                    ? "bg-white ring-1 ring-primary/10"
                    : "bg-slate-50/50"
                }`}
              >
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Status Strip */}
                    <div
                      className={`w-full md:w-2 h-2 md:h-auto ${
                        isActive ? "bg-green-500" : "bg-slate-300"
                      }`}
                    />

                    <div className="flex-1 p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold text-slate-900">
                            {allocation.hostelName}
                          </h3>
                          <Badge
                            variant={isActive ? "default" : "secondary"}
                            className={
                              isActive
                                ? "bg-green-100 text-green-700 hover:bg-green-100"
                                : "bg-slate-200 text-slate-600"
                            }
                          >
                            {isActive ? "Current Session" : "Completed"}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
                          <div className="flex items-center gap-2">
                            <BedDouble className="h-4 w-4" />
                            <span>Room {allocation.roomNumber}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4" />
                            <span>
                              {new Date(allocation.dateAllocated).getFullYear()}
                              /
                              {new Date(
                                allocation.dateAllocated
                              ).getFullYear() + 1}{" "}
                              Session
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>Campus A</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 text-slate-600"
                        >
                          <FileText className="h-4 w-4" /> Details
                        </Button>
                        {isActive && (
                          <Button
                            size="sm"
                            className="gap-2 bg-primary text-white hover:bg-primary/90"
                          >
                            <Download className="h-4 w-4" /> Allocation Slip
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <CalendarDays className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              No History Found
            </h3>
            <p className="text-slate-500 max-w-sm mx-auto mt-2">
              You haven't made any accommodation requests yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
