"use client";
import Link from "next/link";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { IoMenu } from "react-icons/io5";
import { FaMountain, FaShoppingCart, FaHome, FaShoppingBasket } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";

import { SignedIn, UserButton, useUser, SignInButton, SignedOut } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const user = useUser();
  const pathName = usePathname();

  const links = [
    { label: "Home", href: "/", Icon: FaHome },
    { label: "Products", href: "/products", Icon: FaShoppingBasket },
  ];

  const userLinks = [
    { label: "My Cart", href: "/products/cart", Icon: FaShoppingCart },
    { label: "My Orders", href: "/orders", Icon: FaTruckFast },
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
              {links.map(({ Icon, label, href }) => (
                <Link
                  className={`flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium dark:bg-gray-800/50 ${pathName === href ? "active" : ""}`}
                  key={href}
                  href={href}
                >
                  <Icon className="mr-2 h-5 w-5" />{label}
                </Link>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <div className="hidden md:flex items-center gap-4">
        <Link href="#">
          <FaMountain className="h-6 w-6" />
        </Link>
        <nav className="flex items-center gap-4" id="nav">
          {links.map(({ Icon, label, href }) => (
            <Link
              className={`flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium dark:bg-gray-800/50 ${pathName === href ? "active" : ""}`}
              key={href}
              href={href}
            >
              <Icon className="mr-2 h-5 w-5" />{label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <div className="flex items-center gap-4">
          <SignedIn>
            {userLinks.map(({ Icon, label, href }) => (
              <Link className={`flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium dark:bg-gray-800/50 ${pathName === href ? "active" : ""}`} key={href} href={href} passHref>
                <Icon className="mr-2 h-5 w-5" />{label}
              </Link>
            ))}
            {user && user.user?.username}
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
