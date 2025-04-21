'use client';
import Navbar from '@/components/backOffice/layout/Navbar';
import Sidebar from '@/components/backOffice/layout/Sidebar';
import ProtectedRoute from '@/components/shared/auth/ProtectedRoute';
import { ReactNode, useState } from 'react';
import { Toaster } from 'react-hot-toast';

type DashboardLayoutProps = {
  children: ReactNode;
};

function DashboardLayout({ children }: DashboardLayoutProps) {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="flex">
      {/* sidebar */}
      <ProtectedRoute>
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

        <div className="lg:ml-64 ml-0 flex-grow bg-slate-100 min-h-screen">
          <Navbar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
          {/* Main */}
          <main className="p-6 bg-slate-100 dark:bg-slate-900 text-slate-50 min-h-screen  mt-16 ">
            {children}
          </main>
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
              zIndex: 9999,
            },
          }}
        />
      </ProtectedRoute>
    </div>
  );
}

export default DashboardLayout;
