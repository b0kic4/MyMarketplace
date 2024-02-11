"use client";
// https://v0.dev/r/ge7QyM20jYK
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiGrid, FiPackage } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
export default function Page() {
  return (
    <div className="flex w-full min-h-screen">
      <div className="flex-1 flex flex-col min-h-screen">
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
            <Link href={"/products/new"}>New Product</Link>
          </Button>
        </header>
        <main className="flex-1 flex flex-col md:flex-row gap-4 md:gap-8 p-4 md:p-6">
          <div className="hidden border-r bg-gray-100/40 md:block dark:bg-gray-800/40 w-[250px]">
            <nav className="flex flex-col gap-2 p-4">
              <Button className="w-full text-left font-medium" variant="ghost">
                All Products
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge>
              </Button>
              <Button className="w-full text-left font-medium" variant="ghost">
                New Arrivals
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  12
                </Badge>
              </Button>
              <Button className="w-full text-left font-medium" variant="ghost">
                Used Items
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  4
                </Badge>
              </Button>
              <Button className="w-full text-left font-medium" variant="ghost">
                My Products
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  1
                </Badge>
              </Button>
            </nav>
          </div>
          <div className="grid gap-4 md:gap-8 w-full">
            <div className="flex items-center gap-4 md:gap-8">
              <div className="flex items-center gap-2">
                <ChevronRightIcon className="h-4 w-4" />
                <Link className="underline" href="#">
                  All Products
                </Link>
              </div>
              <Button className="md:ml-auto" size="icon" variant="outline">
                <FiGrid className="h-4 w-4" />
                <span className="sr-only">Toggle view</span>
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              <div className="relative group">
                <Link className="absolute inset-0 z-10" href="#">
                  <span className="sr-only">View</span>
                </Link>
                <Image
                  alt="Cover image"
                  className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
                  height={200}
                  src="/placeholder.svg"
                  width={200}
                />
                <div className="flex-1 py-4">
                  <h3 className="font-semibold tracking-tight">
                    Beach Bliss Flip-Flops
                  </h3>
                  <small className="text-sm leading-none text-gray-500 dark:text-gray-400">
                    Comfortable Footwear
                  </small>
                  <h4 className="font-semibold">$19.99</h4>
                </div>
              </div>
              <div className="relative group">
                <Link className="absolute inset-0 z-10" href="#">
                  <span className="sr-only">View</span>
                </Link>
                <img
                  alt="Cover image"
                  className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
                  height={200}
                  src="/placeholder.svg"
                  width={200}
                />
                <div className="flex-1 py-4">
                  <h3 className="font-semibold tracking-tight">
                    Sunset Shades Sunglasses
                  </h3>
                  <small className="text-sm leading-none text-gray-500 dark:text-gray-400">
                    UV Protection Eyewear
                  </small>
                  <h4 className="font-semibold">$29.99</h4>
                </div>
              </div>
              <div className="relative group">
                <Link className="absolute inset-0 z-10" href="#">
                  <span className="sr-only">View</span>
                </Link>
                <Image
                  alt="Cover image"
                  className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
                  height={200}
                  src="/placeholder.svg"
                  width={200}
                />
                <div className="flex-1 py-4">
                  <h3 className="font-semibold tracking-tight">
                    Cool Breeze Portable Fan
                  </h3>
                  <small className="text-sm leading-none text-gray-500 dark:text-gray-400">
                    On-the-Go Cooling
                  </small>
                  <h4 className="font-semibold">$14.99</h4>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
