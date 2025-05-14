
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/layout/navbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/app-sidebar';

const MainLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex flex-col flex-grow">
          <Navbar />
          <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-50">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
