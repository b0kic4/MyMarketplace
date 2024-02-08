// this is server side example
// import ClientSide from "./ClientSide";
// import { trpc } from "./trpc";

import Link from "next/link";
import { CardContent, Card } from "@/components/ui/card";
import { LuStore } from "react-icons/lu";
import Image from "next/image";
import Navbar from "./components/Navbar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { FaSearchengin } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { FaMountain } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";

export default async function Home() {
  // getting hello from the nest successfully

  // const response = await trpc.hello.query({ name: "Boris" });

  return (
    <>
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden" size="icon" variant="outline">
              <IoMenu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="#">
              <FaMountain className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <div className="grid gap-2 py-6">
              <Link
                className="flex w-full items-center py-2 text-lg font-semibold"
                href="#"
              >
                Home
              </Link>
              <Link
                className="flex w-full items-center py-2 text-lg font-semibold"
                href="#"
              >
                Products
              </Link>
              <Link
                className="flex w-full items-center py-2 text-lg font-semibold"
                href="#"
              >
                Categories
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-9 w-9">
                    <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
                    <AvatarFallback>JP</AvatarFallback>
                    <span className="sr-only">Toggle user menu</span>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>My Account</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SheetContent>
        </Sheet>
      </header>
      <div className="bg-gray-50/90 border-t border-b border-gray-200 dark:border-gray-800">
        <div className="container flex flex-col items-center justify-center h-[600px] px-4 space-y-2 md:px-6 lg:space-y-4 xl:space-y-6">
          <nav className="flex flex-row items-center space-x-4">
            <Link
              className="flex items-center space-x-2 text-2xl font-bold"
              href="#"
            >
              <HomeIcon className="w-6 h-6" />
              <span className="sr-only">Home</span>
            </Link>
            <div className="flex-1" />
            <div className="flex items-center space-x-4">
              <Link
                className="font-medium underline transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                href="#"
              >
                Sign Up
              </Link>
              <Link
                className="font-medium underline transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                href="#"
              >
                Log In
              </Link>
            </div>
          </nav>
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-6xl lg:text-7xl">
              Welcome to the Marketplace
            </h1>
            <div className="max-w-[700px]">
              <p className="text-gray-500 md:text-xl dark:text-gray-400">
                The #1 platform for buying and selling the best products.
                Discover unique items from trusted sellers.
              </p>
            </div>
          </div>
        </div>
      </div>
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col items-center justify-center space-y-4 px-4 py-12 md:px-6 md:py-24 lg:py-32 lg:items-start lg:px-12 xl:px-24">
          <div className="space-y-4 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Discover Our Best Sellers
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Shop the most popular products on our platform. These items are
              loved by our community.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-4">
            <form className="flex rounded-lg border">
              <Input
                className="flex-1 rounded-l-none rounded-r-md"
                placeholder="Search for items"
                type="email"
              />
              <Button className="rounded-l-none" type="submit">
                <FaSearchengin className="w-4 h-4" />
                <span className="sr-only">Search</span>
              </Button>
            </form>
          </div>
        </div>
        <div className="grid gap-6 px-4 py-12 md:px-6 lg:py-12 lg:grid-cols-2 xl:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Link className="font-semibold" href="#">
              <img
                alt="Product 1"
                className="aspect-[4/3] object-cover rounded-lg"
                height="200"
                src="/placeholder.svg"
                width="300"
              />
              <p className="text-sm font-medium/none">
                Retro Bluetooth Speaker
              </p>
            </Link>
            <p className="text-sm font-medium/none">by</p>
            <Link className="text-sm font-medium/none" href="#">
              <img
                alt="Avatar"
                className="rounded-full object-cover inline-block"
                height="24"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "24/24",
                  objectFit: "cover",
                }}
                width="24"
              />
              Acme Electronics
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <Link className="font-semibold" href="#">
              <img
                alt="Product 2"
                className="aspect-[4/3] object-cover rounded-lg"
                height="200"
                src="/placeholder.svg"
                width="300"
              />
              <p className="text-sm font-medium/none">Designer Watch</p>
            </Link>
            <p className="text-sm font-medium/none">by</p>
            <Link className="text-sm font-medium/none" href="#">
              <img
                alt="Avatar"
                className="rounded-full object-cover inline-block"
                height="24"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "24/24",
                  objectFit: "cover",
                }}
                width="24"
              />
              Timeless Treasures
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <Link className="font-semibold" href="#">
              <img
                alt="Product 3"
                className="aspect-[4/3] object-cover rounded-lg"
                height="200"
                src="/placeholder.svg"
                width="300"
              />
              <p className="text-sm font-medium/none">Vintage Camera</p>
            </Link>
            <p className="text-sm font-medium/none">by</p>
            <Link className="text-sm font-medium/none" href="#">
              <img
                alt="Avatar"
                className="rounded-full object-cover inline-block"
                height="24"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "24/24",
                  objectFit: "cover",
                }}
                width="24"
              />
              Shutterbug Co.
            </Link>
          </div>
        </div>
      </section>
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="container py-12">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col gap-2">
              <Link className="font-semibold" href="#">
                <img
                  alt="Product 4"
                  className="aspect-video object-cover rounded-lg"
                  height="266"
                  src="/placeholder.svg"
                  width="400"
                />
                <p className="text-sm font-medium/none">Artisanal Chocolates</p>
              </Link>
              <p className="text-sm font-medium/none">by</p>
              <Link className="text-sm font-medium/none" href="#">
                <img
                  alt="Avatar"
                  className="rounded-full object-cover inline-block"
                  height="24"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "24/24",
                    objectFit: "cover",
                  }}
                  width="24"
                />
                Sweet Delights
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link className="font-semibold" href="#">
                <img
                  alt="Product 5"
                  className="aspect-video object-cover rounded-lg"
                  height="266"
                  src="/placeholder.svg"
                  width="400"
                />
                <p className="text-sm font-medium/none">
                  Leather Messenger Bag
                </p>
              </Link>
              <p className="text-sm font-medium/none">by</p>
              <Link className="text-sm font-medium/none" href="#">
                <img
                  alt="Avatar"
                  className="rounded-full object-cover inline-block"
                  height="24"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "24/24",
                    objectFit: "cover",
                  }}
                  width="24"
                />
                Urban Style Co.
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link className="font-semibold" href="#">
                <img
                  alt="Product 6"
                  className="aspect-video object-cover rounded-lg"
                  height="266"
                  src="/placeholder.svg"
                  width="400"
                />
                <p className="text-sm font-medium/none">Wireless Earbuds</p>
              </Link>
              <p className="text-sm font-medium/none">by</p>
              <Link className="text-sm font-medium/none" href="#">
                <img
                  alt="Avatar"
                  className="rounded-full object-cover inline-block"
                  height="24"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "24/24",
                    objectFit: "cover",
                  }}
                  width="24"
                />
                SoundScape Audio
              </Link>
            </div>
          </div>
        </div>
      </div>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container flex flex-col items-center justify-center space-y-2 text-center md:space-y-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Join the Marketplace
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              Sign up to start buying and selling. Access exclusive deals and
              turn your closet into cash.
            </p>
          </div>
          <div className="w-full max-w-[400px] mx-auto space-y-4">
            <Input
              className="p-2"
              placeholder="Enter your email"
              type="email"
            />
            <Button className="w-full bg-gray-900 text-gray-50">Sign Up</Button>
          </div>
        </div>
      </section>
    </>
  );
}
