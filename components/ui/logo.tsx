import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string; // For container styles
  width?: number;
  height?: number;
  variant?: "light" | "dark" | "color"; // color = original
  type?: "full" | "icon";
  disableLink?: boolean;
}

export function Logo({
  className,
  width = 80,
  height = 80,
  type = "full",
  disableLink = false,
}: LogoProps) {
  const Content = (
    <div className="relative shrink-0">
      <Image
        src="/logo.png"
        alt="Anchor University Logo"
        width={width}
        height={height}
        className="object-contain"
        priority
        unoptimized // Add unoptimized to bypass potential caching/optimization issues
      />
    </div>
  );

  if (disableLink) {
    return (
      <div
        className={cn(
          "flex items-center gap-3 transition-opacity hover:opacity-90",
          className
        )}
      >
        {Content}
      </div>
    );
  }

  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-3 transition-opacity hover:opacity-90",
        className
      )}
    >
      {Content}
    </Link>
  );
}
