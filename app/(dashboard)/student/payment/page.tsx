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
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useState, Suspense } from "react";
import { toast } from "sonner";

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const roomId = searchParams.get("roomId");
  const status = searchParams.get("status");

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(status === "success");
  const [paymentMethod, setPaymentMethod] = useState<"paystack" | null>(null);

  // Find data
  const room = rooms.find((r) => r.id === roomId);
  const hostel = room ? hostels.find((h) => h.id === room.hostelId) : null;

  if (!roomId && !isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-2">
          No Selection Found
        </h2>
        <p className="text-slate-500 mb-6">
          Please go back and select a room to proceed with payment.
        </p>
        <Link href="/student/hostels">
          <Button>Browse Hostels</Button>
        </Link>
      </div>
    );
  }

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate Paystack Delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      toast.success("Payment Successful! Room Allocated.");
    }, 2000);
  };

  // Determine price based on room capacity
  const roomPrice =
    room && hostel && hostel.priceList
      ? hostel.priceList[room.capacity]
      : hostel?.price || 0;

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto text-center p-6 animate-in fade-in zoom-in duration-500">
        <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 shadow-xl shadow-green-100">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Allocation Confirmed!
        </h1>
        <p className="text-slate-500 mb-8">
          You have successfully paid for{" "}
          <strong>Room {room?.roomNumber}</strong> in{" "}
          <strong>{hostel?.name}</strong>. Your allocation slip is ready.
        </p>
        <div className="flex flex-col gap-3 w-full">
          <Link href="/student/allocation" className="w-full">
            <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
              View Allocation Slip
            </Button>
          </Link>
          <Link href="/student" className="w-full">
            <Button variant="outline" className="w-full">
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!room || !hostel) return <div>Invalid Room Selection</div>;

  return (
    <div className="max-w-2xl mx-auto w-full py-10 px-4">
      <Link
        href={`/student/hostels/${hostel.id}`}
        className="inline-flex items-center text-sm text-slate-500 hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Cancel & Return
      </Link>

      <Card className="border-none shadow-2xl shadow-primary/5 overflow-hidden">
        <div className="bg-primary px-8 py-6 text-white pattern-grid-lg">
          <h1 className="text-2xl font-bold">Secure Checkout</h1>
          <p className="text-primary-foreground/80 text-sm flex items-center gap-2 mt-1">
            <ShieldCheck className="h-4 w-4" /> 256-bit Encrypted Payment
          </p>
        </div>

        <CardContent className="p-8 space-y-8">
          {/* Summary */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">
              Allocation Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500">Hostel</p>
                <p className="text-lg font-bold text-slate-900">
                  {hostel.name}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Room Type</p>
                <p className="text-lg font-bold text-slate-900">
                  {room.capacity} Bedded Room
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Selected Room</p>
                <p className="text-xl font-bold text-primary">
                  Room {room.roomNumber}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Session</p>
                <Badge variant="secondary">2025/2026</Badge>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-slate-50 rounded-xl p-6 space-y-3 border border-slate-100">
            <div className="flex justify-between text-sm text-slate-600">
              <span>Accommodation Fee ({room.capacity} Man Room)</span>
              <span>₦{roomPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
              <span>Service Charge</span>
              <span>₦2,500</span>
            </div>
            <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
              <span className="font-bold text-slate-900">Total Payable</span>
              <span className="font-extrabold text-2xl text-primary">
                ₦{(roomPrice + 2500).toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-8 pt-0 flex flex-col gap-6">
          {!paymentMethod ? (
            <div className="space-y-4 w-full">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Select Payment Method
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <Link
                  href={`/student/payment/card?roomId=${roomId}`}
                  className="w-full"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full h-16 justify-start px-4 gap-4 border-slate-200 hover:bg-slate-50 hover:border-primary/50 group bg-white"
                  >
                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <CreditCard className="h-5 w-5 text-slate-600 group-hover:text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-slate-900">Pay with Card</p>
                      <p className="text-xs text-slate-500">
                        Visa, Mastercard, Verve
                      </p>
                    </div>
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full h-16 justify-start px-4 gap-4 border-slate-200 hover:bg-slate-50 hover:border-[#3bb75e] group bg-white"
                  onClick={() => setPaymentMethod("paystack")}
                  disabled={isProcessing}
                >
                  <div className="h-10 w-10 rounded-full bg-[#3bb75e]/10 flex items-center justify-center group-hover:bg-[#3bb75e]/20 transition-colors">
                    <ShieldCheck className="h-5 w-5 text-[#3bb75e]" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-900">Use Paystack</p>
                    <p className="text-xs text-slate-500">
                      Secure Bank Transfer / USSD
                    </p>
                  </div>
                </Button>
              </div>
            </div>
          ) : (
            <div className="w-full space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#3bb75e]" /> Paystack
                  Secure
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPaymentMethod(null)}
                  className="h-8 text-xs text-slate-500 hover:text-slate-900"
                  disabled={isProcessing}
                >
                  Change Method
                </Button>
              </div>

              <div className="space-y-6 text-center py-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-100 text-sm text-green-800">
                  You will be redirected to Paystack's secure checkout page to
                  complete your transaction.
                </div>
                <Button
                  size="lg"
                  className="w-full h-14 text-lg font-bold bg-[#3bb75e] hover:bg-[#329a4f] shadow-lg shadow-green-900/10"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Redirecting..." : "Proceed to Paystack"}
                </Button>
              </div>
            </div>
          )}

          <div className="text-center pt-2">
            <p className="text-[10px] text-slate-400 max-w-xs mx-auto">
              By proceeding, you agree to the university's accommodation terms
              and conditions.
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading payment portal...
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
