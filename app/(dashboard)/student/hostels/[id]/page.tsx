"use client";

import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { hostels, rooms } from "@/lib/data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  BedDouble,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Filter,
  CreditCard,
} from "lucide-react";
import { useState } from "react";

export default function HostelDetailsPage() {
  const { id } = useParams();
  const hostel = hostels.find((h) => h.id === id);

  // 1. Get rooms for this hostel
  const hostelRooms = rooms.filter((r) => r.hostelId === id);

  // 2. Simple Filter State
  const [filterType, setFilterType] = useState<number | "all">("all");

  if (!hostel) {
    return notFound();
  }

  // Filter logic
  const filteredRooms =
    filterType === "all"
      ? hostelRooms
      : hostelRooms.filter((r) => r.capacity === filterType);

  return (
    <div className="flex flex-col gap-8 pb-32 max-w-7xl mx-auto w-full px-4 md:px-8 pt-6">
      {/* Header / Breadcrumb */}
      <div>
        <Link
          href="/student/hostels"
          className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Hostels
        </Link>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 font-heading">
            {hostel.name}
          </h1>
          <p className="text-lg text-slate-500 max-w-3xl leading-relaxed">
            {hostel.description}
          </p>
        </div>
      </div>

      {/* Filter Tabs - Modern Pills */}
      <div className="flex flex-wrap gap-3 pb-2 pt-2">
        <button
          onClick={() => setFilterType("all")}
          className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 border ${
            filterType === "all"
              ? "bg-[#3e163e] text-white border-[#3e163e] shadow-lg shadow-purple-900/20 scale-105"
              : "bg-white text-slate-600 border-slate-200 hover:border-[#3e163e]/30 hover:bg-slate-50 shadow-sm"
          }`}
        >
          All Rooms
        </button>
        {hostel.roomTypes.map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 border ${
              filterType === type
                ? "bg-[#3e163e] text-white border-[#3e163e] shadow-lg shadow-purple-900/20 scale-105"
                : "bg-white text-slate-600 border-slate-200 hover:border-[#3e163e]/30 hover:bg-slate-50 shadow-sm"
            }`}
          >
            {type}-Bed Rooms
          </button>
        ))}
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRooms.map((room) => {
          const occupiedCount = room.occupants.length;
          const availableSpaces = room.capacity - occupiedCount;
          const isFull = availableSpaces === 0;

          return (
            <div
              key={room.id}
              className={`group relative flex flex-col rounded-3xl bg-white transition-all duration-300 ${
                isFull
                  ? "opacity-60 grayscale-[0.5]"
                  : "hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5 shadow-xl shadow-slate-200/50 ring-1 ring-slate-100"
              }`}
            >
              {/* Card Header Strip */}
              <div className="px-6 pt-6 pb-2 flex justify-between items-start">
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {room.capacity} Bedded Room
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    Room {room.roomNumber}
                  </h3>
                </div>
                {isFull ? (
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-[10px] font-bold uppercase tracking-wide">
                    Full
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-bold uppercase tracking-wide">
                    Available
                  </span>
                )}
              </div>

              <div className="px-6 py-4 space-y-6 flex-1">
                {/* Occupancy Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-500">
                    <span>Occupancy</span>
                    <span>
                      {occupiedCount} / {room.capacity}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      style={{
                        width: `${(occupiedCount / room.capacity) * 100}%`,
                      }}
                      className={`h-full rounded-full transition-all duration-500 ${
                        isFull ? "bg-red-400" : "bg-primary"
                      }`}
                    />
                  </div>
                </div>

                {/* Price and Spaces */}
                <div className="flex items-end justify-between border-t border-dashed border-slate-100 pt-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">
                      Spaces Left
                    </span>
                    <div className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-primary" />
                      {availableSpaces} Beds
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-extrabold text-slate-900">
                      ₦
                      {hostel.priceList[room.capacity]
                        ? hostel.priceList[room.capacity].toLocaleString()
                        : "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 mt-auto">
                <Link
                  href={isFull ? "#" : `/student/payment?roomId=${room.id}`}
                  className={`block w-full ${
                    isFull ? "cursor-not-allowed" : ""
                  }`}
                >
                  <button
                    disabled={isFull}
                    className={`w-full py-4 rounded-xl text-sm font-bold transition-all active:scale-[0.98] ${
                      isFull
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "bg-slate-900 text-white hover:bg-primary shadow-lg shadow-slate-900/10 hover:shadow-primary/20"
                    }`}
                  >
                    {isFull ? "Fully Booked" : "Select Room"}
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
