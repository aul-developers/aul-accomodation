"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { hostels } from "@/lib/data";
import {
  Users,
  BedDouble,
  ShieldCheck,
  Wifi,
  Zap,
  MapPin,
  ArrowRight,
  Star,
} from "lucide-react";

export default function HostelsPage() {
  return (
    <div className="flex flex-col gap-10 pb-20 max-w-7xl mx-auto w-full px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto space-y-4 pt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
          Student Halls of Residence
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Official on-campus accommodation for the 2025/2026 Academic Session.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {hostels.map((hostel) => (
          <div key={hostel.id} className="group">
            <Card className="h-full border-0 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 bg-white rounded-2xl overflow-hidden flex flex-col">
              {/* Image Section */}
              <div className="relative h-64 w-full overflow-hidden">
                {/* Placeholder */}
                <img
                  src={hostel.image}
                  alt={hostel.name}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge
                    className={`
                      px-3 py-1.5 shadow-sm text-xs font-bold tracking-wide border-0 backdrop-blur-md
                      ${
                        hostel.gender === "Female"
                          ? "bg-pink-500/90 text-white"
                          : hostel.gender === "Male"
                          ? "bg-blue-600/90 text-white"
                          : "bg-purple-600/90 text-white"
                      }
                   `}
                  >
                    {hostel.gender} Students
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                  <div className="flex gap-2 text-[10px] font-bold text-white uppercase tracking-wider">
                    <span className="bg-black/40 backdrop-blur-md px-2 py-1 rounded inline-flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" /> 24/7 Security
                    </span>
                    <span className="bg-black/40 backdrop-blur-md px-2 py-1 rounded inline-flex items-center gap-1">
                      <Wifi className="h-3 w-3" /> Campus WiFi
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <CardContent className="flex-1 p-6 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                      {hostel.name}
                    </h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> Main Campus
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-slate-400 font-bold uppercase">
                      Session Fee
                    </span>
                    <span className="text-xl font-bold text-primary">
                      ₦{hostel.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                  {hostel.description}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-3 mt-auto pt-4">
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">
                        Total Beds
                      </p>
                      <p className="font-bold text-slate-900">
                        {hostel.capacity}
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                      <BedDouble className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">
                        Vacant
                      </p>
                      <p className="font-bold text-slate-900">
                        {hostel.availableRooms}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Link href={`/student/hostels/${hostel.id}`} className="w-full">
                  <Button className="w-full h-12 text-base font-bold bg-slate-900 hover:bg-primary text-white transition-all shadow-lg hover:shadow-primary/25 rounded-xl group/btn">
                    Select Hall
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
