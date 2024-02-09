"use client";
import { Badge } from "@/components/ui/badge";
import { BarChartIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { FaHome, FaShoppingCart, FaUser } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="hidden bg-gray-100 border-r border-gray-200 w-60 lg:flex flex-col items-start gap-2 p-4 text-sm dark:bg-gray-800 dark:border-gray-800">
      <div className="flex items-center gap-2">
        <FiPackage className="h-4 w-4" />
        Products
      </div>
      <div className="grid gap-1 text-sm">
        <Link
          href="/"
          className={`flex items-center gap-3 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${pathname === "/products" ? "bg-gray-100 dark:bg-gray-800/50" : ""}`}
        >
          <FaHome className="h-4 w-4" />
          Home
        </Link>
        <Link
          href="/products/orders"
          className={`flex items-center gap-3 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${pathname === "/products/orders" ? "bg-gray-100 dark:bg-gray-800/50" : ""}`}
        >
          <FaShoppingCart className="h-4 w-4" />
          Orders
          <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
            6
          </Badge>
        </Link>
        <Link
          href="#"
          className={`flex items-center gap-3 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${pathname === "/customers" ? "bg-gray-100 dark:bg-gray-800/50" : ""}`}
        >
          <FaUser className="h-4 w-4" />
          Customers
        </Link>
        <Link
          href="#"
          className={`flex items-center gap-3 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${pathname === "/analytics" ? "bg-gray-100 dark:bg-gray-800/50" : ""}`}
        >
          <BarChartIcon className="h-4 w-4" />
          Analytics
        </Link>
      </div>
      <div className="mt-auto w-full">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Upgrade to Pro</CardTitle>
            <CardDescription>
              Unlock all features and get unlimited access to our support team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" size="sm">
              Upgrade
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
