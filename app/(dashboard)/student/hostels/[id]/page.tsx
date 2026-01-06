"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { hostels, rooms } from "@/lib/data";
import {
  Users,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
} from "lucide-react";

export default function HostelDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const hostel = hostels.find((h) => h.id === id);

  // 1. Get rooms for this hostel
  const hostelRooms = rooms.filter((r) => r.hostelId === id);

  if (!hostel) {
    return notFound();
  }

  // 2. Aggregate Data by Room Type
  const roomTypesData = hostel.roomConfigs
    ? Object.entries(hostel.roomConfigs).map(([typeStr, config]) => {
        const type = parseInt(typeStr);
        const totalBeds = config.totalRooms * type;

        // In a real app, we check actual allocations.
        // Here we check mock rooms that match this type.
        const roomsOfType = hostelRooms.filter((r) => r.capacity === type);
        const occupiedBeds = roomsOfType.reduce(
          (acc, r) => acc + r.occupants.length,
          0
        );

        const availableBeds = totalBeds - occupiedBeds;
        const price = config.price;

        return {
          type,
          totalBeds,
          occupiedBeds,
          availableBeds: Math.max(0, availableBeds),
          price,
          isAvailable: availableBeds > 0,
        };
      })
    : hostel.roomTypes.map((type) => {
        const roomsOfType = hostelRooms.filter((r) => r.capacity === type);
        const totalBeds = roomsOfType.reduce((acc, r) => acc + r.capacity, 0);
        const occupiedBeds = roomsOfType.reduce(
          (acc, r) => acc + r.occupants.length,
          0
        );
        const availableBeds = totalBeds - occupiedBeds;
        const price = hostel.priceList[type] || hostel.price;

        return {
          type,
          totalBeds,
          occupiedBeds,
          availableBeds,
          price,
          isAvailable: availableBeds > 0,
        };
      });

  const handleSelectCategory = (type: number) => {
    // Navigate to payment with Category info
    // "Random Allocation" means we just pay for the type, system assigns later
    router.push(`/student/payment?hostelId=${hostel.id}&roomType=${type}`);
  };

  return (
    <div className="flex flex-col gap-8 pb-32 max-w-7xl mx-auto w-full px-4 md:px-8 pt-6 relative">
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

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Column: Room Categories */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            Available Room Types
          </h2>

          <div className="grid gap-6">
            {roomTypesData.map((data) => (
              <div
                key={data.type}
                className={`group relative overflow-hidden rounded-3xl bg-white transition-all duration-300 ${
                  data.isAvailable
                    ? "hover:shadow-2xl hover:shadow-primary/5 shadow-xl shadow-slate-200/50 ring-1 ring-slate-100"
                    : "opacity-75 grayscale-[0.5] ring-1 ring-slate-100"
                }`}
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Visual Side */}
                  <div
                    className={`sm:w-32 bg-slate-100 flex items-center justify-center p-6 ${
                      data.isAvailable ? "bg-purple-50" : "bg-slate-100"
                    }`}
                  >
                    <div className="text-center">
                      <span className="block text-4xl font-extrabold text-slate-900">
                        {data.type}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Beds
                      </span>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="flex-1 p-6 flex flex-col justify-between gap-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">
                          {data.type} Bedded Room
                        </h3>
                        <div className="text-xs font-semibold text-slate-500 mt-1 flex items-center gap-2">
                          {data.isAvailable ? (
                            <span className="text-emerald-600 flex items-center gap-1">
                              <Zap className="w-3 h-3" /> {data.availableBeds}{" "}
                              spaces remaining
                            </span>
                          ) : (
                            <span className="text-red-500">Fully Booked</span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-extrabold text-primary">
                          ₦{data.price.toLocaleString()}
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase">
                          Per Session
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar (Aggregate) */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <span>Total Capacity</span>
                        <span>
                          {data.occupiedBeds} / {data.totalBeds} Taken
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          style={{
                            width: `${
                              (data.occupiedBeds / data.totalBeds) * 100
                            }%`,
                          }}
                          className={`h-full rounded-full transition-all duration-500 ${
                            !data.isAvailable ? "bg-red-400" : "bg-primary"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => handleSelectCategory(data.type)}
                        disabled={!data.isAvailable}
                        className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer ${
                          data.isAvailable
                            ? "bg-slate-900 text-white hover:bg-primary shadow-lg shadow-slate-900/10 hover:shadow-primary/20"
                            : "bg-slate-100 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        {data.isAvailable ? "Select & Pay" : "Sold Out"}
                        {data.isAvailable && <ArrowRight className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Info / instructions */}
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 md:p-8">
            <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5" /> How Allocation Works
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-blue-800 leading-relaxed">
                <span className="shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                  1
                </span>
                <span>
                  Select your preferred <strong>Room Type</strong> (e.g., 4-Bed
                  or 6-Bed). You are paying for a <em>category</em>, not a
                  specific room number.
                </span>
              </li>
              <li className="flex gap-3 text-sm text-blue-800 leading-relaxed">
                <span className="shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                  2
                </span>
                <span>Complete your payment securely.</span>
              </li>
              <li className="flex gap-3 text-sm text-blue-800 leading-relaxed">
                <span className="shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                  3
                </span>
                <span>
                  The system will <strong>automatically assign</strong> you to
                  the best available room in that category immediately after
                  payment.
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Hostel Facilities
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-sm text-slate-600 font-medium p-3 bg-slate-50 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                24/7 Security
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 font-medium p-3 bg-slate-50 rounded-xl">
                <Zap className="w-5 h-5 text-amber-500" />
                Stable Power
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 font-medium p-3 bg-slate-50 rounded-xl">
                <Users className="w-5 h-5 text-blue-500" />
                Common Room
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
