"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { hostels, rooms } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { CreditCard, ShieldCheck, ArrowLeft, Lock } from "lucide-react";
import Link from "next/link";
import { useState, Suspense } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function CardPaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const roomId = searchParams.get("roomId");

  const [isProcessing, setIsProcessing] = useState(false);

  // Find data
  const room = rooms.find((r) => r.id === roomId);
  const hostel = room ? hostels.find((h) => h.id === room.hostelId) : null;

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate Gateway Processing
    setTimeout(() => {
      setIsProcessing(false);
      // Redirect back to main page with success query param or handle success here
      // For consistency with existing flow, let's redirect to notification page or show success here.
      // The previous flow set 'isSuccess' state. Since we are on a new page, maybe redirect to a success page?
      // Or we can redirect back to /student/payment?status=success&roomId=...

      // Let's redirect to the payment page with a success flag for now to reuse the success UI
      toast.success("Payment Successful! Room Allocated.");
      router.push(`/student/payment?status=success&roomId=${roomId}`);
    }, 2000);
  };

  if (!room || !hostel) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-2">
          Invalid Session
        </h2>
        <Link href="/student/hostels">
          <Button>Return to Hostels</Button>
        </Link>
      </div>
    );
  }

  const roomPrice =
    room && hostel && hostel.priceList
      ? hostel.priceList[room.capacity]
      : hostel?.price || 0;
  const totalAmount = roomPrice + 2500;

  return (
    <div className="max-w-xl mx-auto w-full py-10 px-4">
      <Link
        href={`/student/payment?roomId=${roomId}`}
        className="inline-flex items-center text-sm text-slate-500 hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Payment Method
      </Link>

      <Card className="border-none shadow-2xl shadow-primary/5 overflow-hidden">
        <div className="bg-slate-900 px-8 py-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                <CreditCard className="h-5 w-5" /> Pay with Card
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Enter your card details securely
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">Total to Pay</p>
              <p className="text-xl font-bold text-white">
                ₦{totalAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <CardContent className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase">
                Card Number
              </Label>
              <div className="relative">
                <Input
                  className="pl-10 h-12 border-slate-200 focus-visible:ring-primary"
                  placeholder="0000 0000 0000 0000"
                />
                <CreditCard className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-500 uppercase">
                  Expiry Date
                </Label>
                <Input
                  className="h-12 border-slate-200 focus-visible:ring-primary"
                  placeholder="MM / YY"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-500 uppercase">
                  CVV / CVC
                </Label>
                <div className="relative">
                  <Input
                    className="pl-10 h-12 border-slate-200 focus-visible:ring-primary"
                    placeholder="123"
                    type="password"
                    maxLength={3}
                  />
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase">
                Cardholder Name
              </Label>
              <Input
                className="h-12 border-slate-200 focus-visible:ring-primary"
                placeholder="e.g. JOHN DOE"
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-8 pt-0 flex flex-col gap-4">
          <Button
            size="lg"
            className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">Processing...</span>
            ) : (
              <span className="flex items-center gap-2">
                <Lock className="h-4 w-4" /> Pay ₦{totalAmount.toLocaleString()}
              </span>
            )}
          </Button>
          <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
            <ShieldCheck className="h-3 w-3" />
            <span>Payments are secured with 256-bit SSL encryption</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function CardPaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <CardPaymentContent />
    </Suspense>
  );
}
