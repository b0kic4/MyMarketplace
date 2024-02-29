"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useCallback } from "react";
import {
  FaBookmark,
  FaClock,
  FaDollarSign,
  FaShoppingCart,
} from "react-icons/fa";
import { FiGrid, FiPackage } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const Navbuttons = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = useCallback(
    (filterName: string) => {
      const newPath = `${window.location.pathname}?filter=${filterName}`;
      router.push(newPath);
    },
    [router]
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
        <div className="grid gap-3">
          <p className="text-gray-500 dark:text-gray-400">Browse our catalog</p>
          <Button
            className="border-gray-200 gap-2 dark:border-gray-800"
            variant="outline"
            onClick={() => handleFilterChange("all")}
          >
            <FiGrid className="h-4 w-4 mr-2" />
            All Products
            {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"> */}
            {/* {props.countAllProducts} */}
            {/* </Badge> */}
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-4 md:flex-row md:justify-start md:space-x-4 p-4 items-start">
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            className="border-gray-200 gap-2 dark:border-gray-800"
            variant="outline"
            onClick={() => handleFilterChange("newArrivals")}
          >
            <FaClock className="h-4 w-4 mr-2" />
            New Arrivals
            {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"> */}
            {/* {props.countNewArrivals} */}
            {/* </Badge> */}
          </Button>
          <Button
            className="border-gray-200 gap-2 dark:border-gray-800"
            variant="outline"
            onClick={() => handleFilterChange("userdItems")}
          >
            <FaDollarSign className="h-4 w-4 mr-2" />
            Used Items
            {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"> */}
            {/* {props.countUsedItems} */}
            {/* </Badge> */}
          </Button>
          <Button
            className="border-gray-200 gap-2 dark:border-gray-800"
            variant="outline"
            onClick={() => handleFilterChange("myProducts")}
          >
            <FiPackage className="h-4 w-4 mr-2" />
            My Products
            {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              {props.countMyProducts}
            </Badge> */}
          </Button>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:space-x-4">
          <Button
            className="border-gray-200 gap-2 dark:border-gray-800"
            variant="outline"
            onClick={() => handleFilterChange("savedProducts")}
          >
            <FaBookmark className="h-4 w-4 mr-2" />
            Saved
            {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"> */}
            {/* {props.countSavedProducts} */}
            {/* </Badge> */}
          </Button>
          <Link href={"/products/cart"}>
            <Button
              className="border-gray-200 gap-2 dark:border-gray-800"
              variant="outline"
              onClick={() => router.push("/cart")}
            >
              <FaShoppingCart />
              Cart
              {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"> */}
              {/* {props.countCartProducts} */}
              {/* </Badge> */}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbuttons;
