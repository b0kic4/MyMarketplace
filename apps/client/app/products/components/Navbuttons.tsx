import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { FaClock, FaDollarSign } from "react-icons/fa";
import { FiGrid, FiPackage } from "react-icons/fi";

const Navbuttons = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
        <div className="grid gap-3">
          <p className="text-gray-500 dark:text-gray-400">Browse our catalog</p>
          <Button
            className="border-gray-200 dark:border-gray-800"
            variant="outline"
          >
            <Link className="flex" href={"/products"}>
              <FiGrid className="h-4 w-4 mr-2" />
              All Products
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-4 md:gap-8">
        <Button
          className="border-gray-200 dark:border-gray-800"
          variant="outline"
        >
          <Link className="flex" href={"/products/new-arrivals"}>
            <FaClock className="h-4 w-4 mr-2" />
            New Arrivals
          </Link>
        </Button>
        <Button
          className="border-gray-200 dark:border-gray-800"
          variant="outline"
        >
          <Link className="flex" href={"/products/used-products"}>
            <FaDollarSign className="h-4 w-4 mr-2" />
            Used Items
          </Link>
        </Button>
        <Button
          className="border-gray-200 dark:border-gray-800"
          variant="outline"
        >
          <Link className="flex" href={"/products/my-products"}>
            <FiPackage className="h-4 w-4 mr-2" />
            My Products
          </Link>
        </Button>
      </div>
    </>
  );
};

export default Navbuttons;
