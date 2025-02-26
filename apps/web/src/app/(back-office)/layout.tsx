"use client";
import Navbar from "@/components/backOffice/Navbar";
import Sidebar from "@/components/backOffice/Sidebar";
import { ReactNode, useState } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

function DashboardLayout({ children }: DashboardLayoutProps) {
    const [showSidebar, setShowSidebar] = useState(false)
  return (
    <div className="flex">
      {/* sidebar */}
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      {/* <div className="w-full"> */}
      <div className="lg:ml-64 ml-0 flex-grow bg-slate-100 min-h-screen">
        {/* Header */}
        <Navbar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
        {/* Main */}
        <main className="p-6 bg-slate-100 dark:bg-slate-900 text-slate-50 min-h-screen  mt-16 ">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;

