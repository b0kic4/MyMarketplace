import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "./components/ToastContainer";
const inter = Inter({ subsets: ["latin"] });

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "MyMarketplace",
  // description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <ToastContainer />
        </body>
      </html>
    </ClerkProvider>
  );
}
