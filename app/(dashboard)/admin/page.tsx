"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { hostels, allocations } from "@/lib/data";
import {
  Users,
  Building2,
  BedDouble,
  ArrowUpRight,
  DollarSign,
  Activity,
  TrendingUp,
  AlertCircle,
  Plus,
  Settings,
  FileText,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const totalHostels = hostels.length;
  const totalCapacity = hostels.reduce((acc, h) => acc + h.capacity, 0);
  const totalAllocations = allocations.filter(
    (a) => a.status === "Active"
  ).length;
  const occupancyRate =
    totalCapacity > 0 ? (totalAllocations / totalCapacity) * 100 : 0;
  const totalRevenue = allocations.length * 150000;

  // Mock Data for Charts (Preserved)
  const occupancyData = hostels.map((h) => ({
    name: h.name.split(" ")[0],
    occupied: h.capacity - h.availableRooms,
    available: h.availableRooms,
    capacity: h.capacity,
  }));

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Admin Overview
          </h1>
          <p className="text-slate-500 mt-1">
            Real-time accommodation status, revenue, and management.
          </p>
        </div>
        <div className="hidden md:flex gap-3">
          <Link href="/admin/allocations">
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" /> View Allocations
            </Button>
          </Link>
          <Link href="/admin/hostels">
            <Button className="bg-primary text-white hover:bg-primary/90 gap-2">
              <Plus className="h-4 w-4" /> Manage Hostels
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Card className="glass-card overflow-hidden relative border-none shadow-sm">
            <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-primary/5 to-transparent" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                Total Revenue
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <DollarSign className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-heading text-primary">
                ₦{(totalRevenue / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-green-600 font-medium mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> +12.5% vs last session
              </p>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="glass-card border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                Active Residents
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Users className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-heading text-slate-900">
                {totalAllocations}
              </div>
              <p className="text-xs text-slate-400 mt-1">Students allocated</p>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="glass-card border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                Occupancy Rate
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                <Activity className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-heading text-slate-900">
                {occupancyRate.toFixed(1)}%
              </div>
              <div className="h-1.5 w-full bg-slate-100 mt-2 rounded-full overflow-hidden">
                <div
                  style={{ width: `${occupancyRate}%` }}
                  className="h-full bg-orange-500 rounded-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="glass-card border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                Capacity
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                <BedDouble className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-heading text-slate-900">
                {totalCapacity}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Beds across {totalHostels} hostels
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid gap-6 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg md:text-xl">
                Occupancy By Hostel
              </CardTitle>
              <CardDescription className="text-sm">
                Real-time bed utilization
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[280px] md:h-[320px] w-full px-2 md:px-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={occupancyData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e2e8f0"
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#64748b"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#64748b"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                    cursor={false}
                  />
                  <Bar
                    dataKey="occupied"
                    name="Occupied"
                    fill="#1a237e" /* Primary Deep Plumish Blue */
                    radius={[4, 4, 0, 0]}
                    barSize={32}
                  />
                  <Bar
                    dataKey="available"
                    name="Available"
                    fill="#e2e8f0"
                    radius={[4, 4, 0, 0]}
                    barSize={32}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="border-none shadow-sm bg-primary text-white relative overflow-hidden">
            <CardHeader className="relative z-10 pb-3 md:pb-4">
              <CardTitle className="text-white text-lg md:text-xl">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 px-0">
              <div className="space-y-0">
                {allocations.slice(0, 5).map((allocation, i) => (
                  <div
                    key={allocation.id}
                    className="flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-4 hover:bg-white/10 transition-colors border-b border-white/10 last:border-0"
                  >
                    <div className="h-9 w-9 md:h-10 md:w-10 shrink-0 rounded-full bg-white/20 flex items-center justify-center text-white font-bold backdrop-blur-sm text-sm md:text-base">
                      {allocation.studentName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm md:text-base font-semibold truncate text-white">
                        {allocation.studentName}
                      </p>
                      <p className="text-xs text-white/50 truncate">
                        Room {allocation.roomNumber} • {allocation.hostelName}
                      </p>
                    </div>
                    <div className="text-[10px] md:text-xs font-mono text-white/40 bg-black/20 px-1.5 md:px-2 py-0.5 md:py-1 rounded">
                      NOW
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
