import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {
  FaBookmark,
  FaClock,
  FaDollarSign,
  FaShoppingCart,
} from "react-icons/fa";
import { FiGrid, FiPackage } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
interface NavbuttonsProps {
  // handlers
  onFilterAll: () => void;
  onFilterNewArrivals: () => void;
  onFilterUsedItems: () => void;
  onFilterSaved: () => void;
  handleFilterMyProducts: () => void;
  handleFilterCart: () => void;
  // values
  countAllProducts: number | undefined;
  countUsedItems: number | undefined;
  countNewArrivals: number | undefined;
  countSavedProducts: number | undefined;
  countMyProducts: number | undefined;
  countCartProducts: number | undefined;
}

const Navbuttons: React.FC<NavbuttonsProps> = (props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
        <div className="grid gap-3">
          <p className="text-gray-500 dark:text-gray-400">Browse our catalog</p>
          <Button
            className="border-gray-200 gap-2 dark:border-gray-800"
            variant="outline"
            onClick={props.onFilterAll}
          >
            <FiGrid className="h-4 w-4 mr-2" />
            All Products
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              {props.countAllProducts}
            </Badge>
          </Button>
        </div>
      </div>
      <div className="sm:flex-row sm:space-x-4 md:flex-col md:space-y-4 p-4 items-center">
        <div className="flex flex-col gap-4 sm:gap-0 md:space-x-4 sm:flex-row">
          <Button
            className="border-gray-200 gap-2 dark:border-gray-800"
            variant="outline"
            onClick={props.onFilterNewArrivals}
          >
            <FaClock className="h-4 w-4 mr-2" />
            New Arrivals
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              {props.countNewArrivals}
            </Badge>
          </Button>
          <Button
            className="border-gray-200 gap-2 dark:border-gray-800"
            variant="outline"
            onClick={props.onFilterUsedItems}
          >
            <FaDollarSign className="h-4 w-4 mr-2" />
            Used Items
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              {props.countUsedItems}
            </Badge>
          </Button>
          <Button
            className="border-gray-200 gap-2 dark:border-gray-800"
            variant="outline"
            onClick={props.handleFilterMyProducts}
          >
            <FiPackage className="h-4 w-4 mr-2" />
            My Products
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              {props.countMyProducts}
            </Badge>
          </Button>

          <Button
            className="border-gray-200 gap-2 dark:border-gray-800"
            variant="outline"
            onClick={props.onFilterSaved}
          >
            <FaBookmark className="h-4 w-4 mr-2" />
            Saved
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              {props.countSavedProducts}
            </Badge>
          </Button>
          <Button
            className="border-gray-200 gap-2 dark:border-gray-800"
            variant="outline"
            onClick={props.handleFilterCart}
          >
            <FaShoppingCart />
            Cart
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              {props.countCartProducts}
            </Badge>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbuttons;
