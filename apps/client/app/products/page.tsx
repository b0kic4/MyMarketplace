// https://v0.dev/r/ge7QyM20jYK
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { FiGrid, FiPackage } from "react-icons/fi";
import { FaHome, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { BarChartIcon, ChevronRightIcon } from "@radix-ui/react-icons";
export default function Page() {
  return (
    <div className="flex w-full min-h-screen">
      <div className="hidden bg-gray-100 border-r border-gray-200 w-60 lg:flex flex-col items-start gap-2 p-4 text-sm dark:bg-gray-800 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <FiPackage className="h-6 w-6" />
          <span className="font-semibold">Acme Inc</span>
        </div>
        <div className="grid gap-1 text-sm">
          <Link
            className="flex items-center gap-3 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="#"
          >
            <FaHome className="h-4 w-4" />
            Home
          </Link>
          <Link
            className="flex items-center gap-3 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="#"
          >
            <FaShoppingCart className="h-4 w-4" />
            Orders
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              6
            </Badge>
          </Link>
          <Link
            className="flex items-center gap-3 bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
            href="#"
          >
            <FiPackage className="h-4 w-4" />
            Products
          </Link>
          <Link
            className="flex items-center gap-3 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="#"
          >
            <FaUser className="h-4 w-4" />
            Customers
          </Link>
          <Link
            className="flex items-center gap-3 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="#"
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
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <Link className="lg:hidden" href="#">
            <FiPackage className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <FaSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                  placeholder="Search products..."
                  type="search"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                size="icon"
                variant="ghost"
              >
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="32"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                  }}
                  width="32"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
            </nav>
            <div className="mt-auto p-4">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle>Upgrade to Pro</CardTitle>
                  <CardDescription>
                    Unlock all features and get unlimited access to our support
                    team
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
                <img
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
                <img
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
