"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { hostels, rooms } from "@/lib/data";
import { Users, ArrowLeft, Clock, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { ReservationTimer } from "@/components/reservation-timer";
import { toast } from "sonner"; // Assuming sonner is installed/configured as usually in these stacks, or I'll generic

export default function HostelDetailsPage() {
  const { id } = useParams();
  const router = useRouter(); // For navigation
  const hostel = hostels.find((h) => h.id === id);

  // 1. Get rooms for this hostel
  const hostelRooms = rooms.filter((r) => r.hostelId === id);

  // 2. Simple Filter State
  const [filterType, setFilterType] = useState<number | "all">("all");

  // 3. Reservation / Locking State
  const [lockedRoomId, setLockedRoomId] = useState<string | null>(null);
  const [lockExpiry, setLockExpiry] = useState<Date | null>(null);

  // Simulation: Rooms held by "other users"
  // mocked backend: currently empty set until backend is ready
  const [ghostHeldRooms, setGhostHeldRooms] = useState<Set<string>>(new Set());

  // REMOVED: Random simulation effect to prevent hydration mismatch/glitching as requested.

  if (!hostel) {
    return notFound();
  }

  // Filter logic
  const filteredRooms =
    filterType === "all"
      ? hostelRooms
      : hostelRooms.filter((r) => r.capacity === filterType);

  const handleLockRoom = (roomId: string) => {
    // 1. Optimistic UI update
    setLockedRoomId(roomId);

    // 2. Set expiry 15 mins from now
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 15);
    setLockExpiry(expiry);

    // 3. Toast
    // alert("Room locked! You have 15 minutes to complete payment.");
    // Using simple alert or if toast is available. I'll stick to visual cues.
  };

  const handleReleaseLock = () => {
    setLockedRoomId(null);
    setLockExpiry(null);
  };

  const handlePaymentClick = (roomId: string) => {
    router.push(`/student/payment?roomId=${roomId}`);
  };

  return (
    <div className="flex flex-col gap-8 pb-32 max-w-7xl mx-auto w-full px-4 md:px-8 pt-6 relative">
      {/* Timer Overlay */}
      {lockedRoomId && lockExpiry && (
        <ReservationTimer
          expiryTime={lockExpiry}
          onExpire={() => {
            handleReleaseLock();
            // Optional: alert("Reservation expired");
          }}
        />
      )}

      {/* Header / Breadcrumb */}
      <div>
        <Link
          href="/student/hostels"
          className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Hostels
        </Link>
        <div className="flex flex-col gap-3 sm:gap-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 font-heading">
            {hostel.name}
          </h1>
          <p className="text-base sm:text-lg text-slate-500 max-w-3xl leading-relaxed">
            {hostel.description}
          </p>
        </div>
      </div>

      {/* Filter Tabs - Modern Pills */}
      <div className="flex flex-wrap gap-2 sm:gap-3 pb-2 pt-2">
        <button
          onClick={() => setFilterType("all")}
          disabled={!!lockedRoomId}
          className={`px-5 py-2.5 sm:px-8 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 border ${
            filterType === "all"
              ? "bg-[#3e163e] text-white border-[#3e163e] shadow-lg shadow-purple-900/20 scale-105"
              : "bg-white text-slate-600 border-slate-200 hover:border-[#3e163e]/30 hover:bg-slate-50 shadow-sm"
          } ${
            lockedRoomId ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          All Rooms
        </button>
        {hostel.roomTypes.map((type) => (
          <button
            key={type}
            disabled={!!lockedRoomId}
            onClick={() => setFilterType(type)}
            className={`px-5 py-2.5 sm:px-8 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 border ${
              filterType === type
                ? "bg-[#3e163e] text-white border-[#3e163e] shadow-lg shadow-purple-900/20 scale-105"
                : "bg-white text-slate-600 border-slate-200 hover:border-[#3e163e]/30 hover:bg-slate-50 shadow-sm"
            } ${
              lockedRoomId ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
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

          // Check simulated states
          const isHeldByOthers = ghostHeldRooms.has(room.id);
          const isLockedByMe = lockedRoomId === room.id;
          const isLockedByAnyone =
            isFull || isHeldByOthers || (lockedRoomId && !isLockedByMe);

          // Card Visual State
          let cardOpacityClass = "";
          let cardFilterClass = "";

          if (lockedRoomId && !isLockedByMe) {
            // If I have locked a room, fade out all others heavily
            cardOpacityClass = "opacity-40 pointer-events-none";
            cardFilterClass = "grayscale-[0.8]";
          } else if (isFull) {
            cardOpacityClass = "opacity-60";
            cardFilterClass = "grayscale-[0.5]";
          } else if (isHeldByOthers) {
            // Held by others: visible but specific styling
            cardOpacityClass = "opacity-80";
          }

          return (
            <div
              key={room.id}
              className={`group relative flex flex-col rounded-3xl bg-white transition-all duration-300 ${cardOpacityClass} ${cardFilterClass} ${
                !isLockedByAnyone && !lockedRoomId
                  ? "hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5 shadow-xl shadow-slate-200/50 ring-1 ring-slate-100"
                  : "shadow-sm ring-1 ring-slate-100"
              } ${
                isLockedByMe
                  ? "ring-2 ring-emerald-500 shadow-2xl shadow-emerald-500/10 scale-[1.02] z-10"
                  : ""
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

                {/* Status Badges */}
                {isFull && (
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-[10px] font-bold uppercase tracking-wide">
                    Full
                  </span>
                )}
                {!isFull && isHeldByOthers && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wide">
                    <Lock className="w-3 h-3" /> Held
                  </span>
                )}
                {!isFull && !isHeldByOthers && isLockedByMe && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wide animate-pulse">
                    <Clock className="w-3 h-3" /> Reserved
                  </span>
                )}
                {!isFull && !isHeldByOthers && !isLockedByMe && (
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
                {isLockedByMe ? (
                  <div className="space-y-3">
                    <button
                      onClick={() => handlePaymentClick(room.id)}
                      className="w-full py-4 rounded-xl text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Complete Payment
                    </button>
                    <button
                      onClick={handleReleaseLock}
                      className="w-full py-2 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      Cancel Reservation
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleLockRoom(room.id)}
                    disabled={isFull || isHeldByOthers || !!lockedRoomId}
                    className={`w-full py-4 rounded-xl text-sm font-bold transition-all active:scale-[0.98] ${
                      isFull || isHeldByOthers
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : lockedRoomId
                        ? "bg-slate-100 text-slate-300 cursor-not-allowed" // Disabled because another room is locked
                        : "bg-slate-900 text-white hover:bg-primary shadow-lg shadow-slate-900/10 hover:shadow-primary/20 cursor-pointer"
                    }`}
                  >
                    {isFull
                      ? "Fully Booked"
                      : isHeldByOthers
                      ? "Held by User"
                      : "Select Room"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
