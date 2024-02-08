import Link from "next/link";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { IoMenu } from "react-icons/io5";
import { FaMountain } from "react-icons/fa";
import {
  currentUser,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default async function Navbar() {
  // const user = useUser();
  const user = await currentUser();
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
          <div>
            <div className="flex flex-col gap-2">
              <Link
                className="flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium dark:bg-gray-800/50"
                href="#"
              >
                Home
              </Link>
              <Link
                className="flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium dark:bg-gray-800/50"
                href="#"
              >
                Products
              </Link>
              <Link
                className="flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium dark:bg-gray-800/50"
                href="#"
              >
                Categories
              </Link>
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
        </nav>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <SignedIn>
          {user && user.username}
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
