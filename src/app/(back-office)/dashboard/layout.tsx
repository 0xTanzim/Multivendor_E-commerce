import Navbar from "@/app/components/backOffice/Navbar";
import Sidebar from "@/app/components/backOffice/Sidebar";
import { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

function dashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex">
      {/* sidebar */}
      <Sidebar />

      <div className="w-full">
        {/* Header */}
        <Navbar />
        {/* Main */}
        <main className="p-6 bg-slate-900 text-slate-50 min-h-screen mt-16 ml-60">
          {children}
        </main>
      </div>
    </div>
  );
}

export default dashboardLayout;

