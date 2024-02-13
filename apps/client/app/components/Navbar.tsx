"use client";
import Link from "next/link";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { IoMenu } from "react-icons/io5";
import { FaMountain, FaShoppingCart } from "react-icons/fa";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

export default function Navbar() {
  const user = useUser();
  const url = process.env.NEXT_PUBLIC_NESTJS_URL;
  const appendUserToDatabase = async () => {
    try {
      await axios.post(`${url}/user`, user.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    appendUserToDatabase();
  }, [user.user?.id]);

  const pathName = usePathname();
  const links = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Categories", href: "/categories" },
  ];

  return (
    <header className="flex items-center h-16 px-4 md:px-6 w-full border-b">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="rounded-full lg:hidden md:hidden w-8 h-8 p-2 items-center"
            id="navbar-menu"
            size="icon"
            variant="ghost"
          >
            <IoMenu className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2" side="bottom">
          <div />
          <div className="bg-slate-50">
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  className={`flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium dark:bg-gray-800/50 ${
                    pathName === link.href ? "active" : ""
                  }`}
                  key={link.href}
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <div className="hidden md:flex items-center gap-4">
        <Link href="#">
          <FaMountain className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="flex items-center gap-4" id="nav">
          {links.map((link) => (
            <Link
              className={`flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium dark:bg-gray-800/50 ${
                pathName === link.href ? "active" : ""
              }`}
              key={link.href}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <div className="flex items-center gap-2">
          <SignedIn>
            {user && user.user?.username}
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
