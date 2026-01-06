"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface ReservationTimerProps {
  expiryTime: Date;
  onExpire: () => void;
}

export function ReservationTimer({
  expiryTime,
  onExpire,
}: ReservationTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    minutes: number;
    seconds: number;
    isExpired: boolean;
  }>({ minutes: 0, seconds: 0, isExpired: false });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = expiryTime.getTime() - now;

      if (difference <= 0) {
        return { minutes: 0, seconds: 0, isExpired: true };
      }

      return {
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false,
      };
    };

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.isExpired) {
        clearInterval(timer);
        onExpire();
      }
    }, 1000);

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [expiryTime, onExpire]);

  if (timeLeft.isExpired) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 sm:left-auto sm:right-6 sm:bottom-6 z-50 animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-5 fade-in duration-300 w-full sm:w-auto">
      <div className="bg-[#3e163e] text-white px-6 py-4 rounded-t-2xl sm:rounded-2xl shadow-2xl shadow-purple-900/30 border-t sm:border border-white/10 flex items-center justify-between sm:justify-start gap-4 w-full">
        <div className="flex items-center gap-4">
          <div className="bg-white/10 p-2.5 rounded-xl animate-pulse">
            <Clock className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-purple-200">
              Bed Reserved For
            </div>
            <div className="text-2xl font-black font-mono tabular-nums leading-none mt-0.5">
              {String(timeLeft.minutes).padStart(2, "0")}:
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
          </div>
        </div>
        {/* Optional: Add a small checkout button here for mobile convenience in future */}
      </div>
    </div>
  );
}
