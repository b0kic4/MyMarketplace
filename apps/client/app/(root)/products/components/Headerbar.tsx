import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { FiPackage, FiPlus } from "react-icons/fi";

interface Props {
  setSearchQuery: (e: any) => void
}

const Headerbar: React.FC<Props> = ({ setSearchQuery }) => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
      <div className="w-full flex-1">
        <form>
          <div className="flex items-center">
            <div className="flex items-center">
              <Input
                className="w-full h-10 rounded-l-lg"
                placeholder="Search for products..."
                type="search"
                onChange={(e: any) => setSearchQuery(e.target.value)}
              />
              <span className="flex items-center justify-center rounded-r-lg p-2">
                <FaSearch className="text-gray-500" />
              </span>
            </div>
          </div>
        </form>
      </div>
      <div className="flex items-center gap-4 justify-center">
        <Button>
          <Link className="flex items-center gap-2" href={"/products/new"}>
            <FiPlus className="h-4 w-4" />
            New Product
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Headerbar;
