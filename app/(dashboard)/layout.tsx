import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-slate-50">
      <Toaster position="top-right" richColors />
      <div className="print:hidden">
        <DashboardSidebar />
      </div>
      {/* 
        Sidebar is fixed (w-64 = 256px).
        We use padding-left (md:pl-64) to offset the main content.
        This prevents double-margins and grid conflicts.
      */}
      <div className="flex flex-col min-h-screen md:pl-[280px] transition-[padding] duration-300 print:pl-0 print:block pt-24 md:pt-0">
        <div className="print:hidden">
          <DashboardHeader />
        </div>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 w-full max-w-full overflow-x-hidden print:p-0">
          {children}
        </main>
      </div>
    </div>
  );
}
