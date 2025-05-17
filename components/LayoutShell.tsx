'use client';

import { useSidebar } from '@/context/SidebarContext';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className={`flex flex-col flex-1 transition-all ${collapsed ? 'sm:ml-16' : 'sm:ml-64'}`}>
        <Navbar/>
        <main className="flex-1 p-4 pt-12">{children}</main>
        <Footer/>
      </div>
    </div>
  );
}
