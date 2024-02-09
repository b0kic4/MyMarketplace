"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./_components/Sidebar";
import Navbar from "../components/Navbar";
export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showSidebar =
    pathname.startsWith("/products/orders") ||
    pathname.startsWith("/products") ||
    pathname.startsWith("/products/analytics");
  return (
    <div className="flex w-full min-h-screen">
      {showSidebar && <Sidebar />}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Include your navbar here */}
        <Navbar />
        <main className="flex-1 flex flex-col md:flex-row gap-4 md:gap-8 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
