// this is server side example
// import ClientSide from "./ClientSide";
// import { trpc } from "./trpc";

import Link from "next/link";
import { CardContent, Card } from "@/components/ui/card";
import { LuStore } from "react-icons/lu";
import Image from "next/image";
export default async function Home() {
  // getting hello from the nest successfully

  // const response = await trpc.hello.query({ name: "Boris" });
  return (
    // <div>
    //  <ClientSide />
    //   {response}
    // </div>
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <LuStore className="h-6 w-6" />
          <span className="sr-only">Marketplace</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Home
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Products
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Categories
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            About Us
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <Image
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                height="550"
                src="/placeholder.svg"
                width="550"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Welcome to the Marketplace
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Discover the best products from independent sellers around
                    the world.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="#"
                  >
                    Sign Up
                  </Link>
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                    href="#"
                  >
                    Log In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Featured Products
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Discover Our Best Sellers
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Explore the most popular products that our customers love and
                  trust.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardContent>
                  <Image
                    alt="Product Image"
                    className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full"
                    height="300"
                    src="/placeholder.svg"
                    width="300"
                  />
                  <h3 className="text-xl font-bold mt-4">Product 1</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    This is a description of the product.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Image
                    alt="Product Image"
                    className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full"
                    height="300"
                    src="/placeholder.svg"
                    width="300"
                  />
                  <h3 className="text-xl font-bold mt-4">Product 2</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    This is a description of the product.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Image
                    alt="Product Image"
                    className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full"
                    height="300"
                    src="/placeholder.svg"
                    width="300"
                  />
                  <h3 className="text-xl font-bold mt-4">Product 3</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    This is a description of the product.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Marketplace. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            FAQs
          </Link>
        </nav>
      </footer>
    </div>
  );
}
