"use client";
import React from "react";
import Navbar from "../components/Navbar";

export const dynamic = "force-dynamic";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full min-h-screen">
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex flex-col md:flex-row gap-4 md:gap-8 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
