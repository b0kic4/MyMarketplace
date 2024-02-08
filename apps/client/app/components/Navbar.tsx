"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdOutlineListAlt } from "react-icons/md";
import { BsStack } from "react-icons/bs";
import { LuPackage } from "react-icons/lu";
import Image from "next/image";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <>
      <Button
        onClick={toggleNav}
        className="lg:hidden md:hidden ml-auto p-2 focus:outline-none"
      >
        {isNavOpen ? "Close" : "Menu"}
      </Button>
      <nav
        className={`${
          isNavOpen ? "flex" : "hidden"
        } sm:flex md:flex lg:flex h-14 w-full items-center px-4 md:px-6`}
      >
        <Link
          className="flex items-center gap-2 text-lg font-semibold"
          href="#"
        >
          <LuPackage className="h-6 w-6" />
          <span>Home</span>
        </Link>
        <div className="flex-1 mx-4">
          <Link
            className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-950 dark:text-gray-400 dark:hover:text-gray-50 dark:focus:ring-gray-200"
            href="#"
          >
            <MdOutlineListAlt className="mr-2 h-4 w-4" />
            Products
          </Link>
          <Link
            className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-950 dark:text-gray-400 dark:hover:text-gray-50 dark:focus:ring-gray-200"
            href="#"
          >
            <BsStack className="mr-2 h-4 w-4" />
            Categories
          </Link>
        </div>
        <Link
          className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-950 dark:text-gray-400 dark:hover:text-gray-50 dark:focus:ring-gray-200"
          href="#"
        >
          About
        </Link>
        <Link
          className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-950 dark:text-gray-400 dark:hover:text-gray-50 dark:focus:ring-gray-200"
          href="#"
        >
          Contact
        </Link>
        <div className="flex items-center ml-4">
          <Button className="rounded-full" size="icon" variant="ghost">
            <Image
              alt="Avatar"
              className="rounded-full"
              height="32"
              src="/placeholder.svg"
              width="32"
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </div>
      </nav>
    </>
  );
}
