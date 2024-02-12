import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { FaBookmark, FaClock, FaDollarSign } from "react-icons/fa";
import { FiGrid, FiPackage } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
interface NavbuttonsProps {
  onFilterAll: () => void;
  onFilterNewArrivals: () => void;
  onFilterUsedItems: () => void;
  onFilterSaved: () => void;
  handleFilterMyProducts: () => void;
}

const Navbuttons: React.FC<NavbuttonsProps> = (props) => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
        <div className="grid gap-3">
          <p className="text-gray-500 dark:text-gray-400">Browse our catalog</p>
          <Button
            className="border-gray-200 dark:border-gray-800"
            variant="outline"
            onClick={props.onFilterAll}
          >
            <FiGrid className="h-4 w-4 mr-2" />
            All Products
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-4 md:gap-8">
        <Button
          className="border-gray-200 dark:border-gray-800"
          variant="outline"
          onClick={props.onFilterNewArrivals}
        >
          <FaClock className="h-4 w-4 mr-2" />
          New Arrivals
        </Button>
        <Button
          className="border-gray-200 dark:border-gray-800"
          variant="outline"
          onClick={props.onFilterUsedItems}
        >
          <FaDollarSign className="h-4 w-4 mr-2" />
          Used Items
        </Button>
        <Button
          className="border-gray-200 dark:border-gray-800"
          variant="outline"
          onClick={props.handleFilterMyProducts}
        >
          <FiPackage className="h-4 w-4 mr-2" />
          My Products
        </Button>
        <Button
          className="border-gray-200 dark:border-gray-800"
          variant="outline"
          onClick={props.onFilterSaved}
        >
          <FaBookmark className="h-4 w-4 mr-2" />
          Saved
        </Button>
      </div>
    </>
  );
};

export default Navbuttons;
