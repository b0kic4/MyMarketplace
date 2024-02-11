import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { FiPackage, FiPlus } from "react-icons/fi";

const Headerbar = () => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
      <Link className="lg:hidden" href="#">
        <FiPackage className="h-6 w-6" />
        <span className="sr-only">Home</span>
      </Link>
      <div className="w-full flex-1">
        <form>
          <div className="flex items-center">
            <Input
              className="w-1/3 h-10 rounded-l-lg"
              placeholder="Search for products..."
              type="search"
            />
            <span className="flex items-center justify-center rounded-r-lg p-2">
              <FaSearch className="text-gray-500" />
            </span>
          </div>
        </form>
      </div>
      <Button>
        <Link className="flex items-center gap-2" href={"/products/new"}>
          <FiPlus className="h-4 w-4" />
          New Product
        </Link>
      </Button>
    </header>
  );
};

export default Headerbar;
