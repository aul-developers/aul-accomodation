"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Calendar,
  Shield,
  Edit,
} from "lucide-react";

export default function ProfilePage() {
  // Mock User Data - Strictly from Registration
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@aul.edu.ng",
    matricNumber: "AUL/SCI/21/0089",
    status: "Active",
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          My Profile
        </h1>
        <p className="text-slate-500">
          Manage your personal information and account settings.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Left Column: Identity Card */}
        <div className="md:col-span-1 space-y-6">
          <Card className="border-none shadow-md overflow-hidden bg-white">
            <div className="h-32 bg-primary/10 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5" />
            </div>
            <CardContent className="relative pt-0 px-6 pb-6 text-center">
              <div className="relative -mt-16 mb-4 inline-block">
                <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                  <AvatarImage src="/avatars/01.png" alt={user.firstName} />
                  <AvatarFallback className="text-4xl font-bold bg-primary text-white">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-2 right-2 h-6 w-6 bg-green-500 border-2 border-white rounded-full" />
              </div>

              <h2 className="text-2xl font-bold text-slate-900">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-slate-500 font-medium mb-1">
                {user.matricNumber}
              </p>
              <Badge
                variant="secondary"
                className="mt-2 bg-primary/10 text-primary hover:bg-primary/20"
              >
                Student
              </Badge>

              <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col gap-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Status</span>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 uppercase text-[10px] tracking-wider">
                    {user.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Account Information */}
          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="border-b border-slate-100 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Account Information
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 grid gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Full Name
                </label>
                <p className="font-medium text-slate-900 flex items-center gap-2">
                  {user.firstName} {user.lastName}
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Matriculation Number
                </label>
                <p className="font-medium text-slate-900">
                  {user.matricNumber}
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Email Address
                </label>
                <p className="font-medium text-slate-900 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-slate-400" />
                  {user.email}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
