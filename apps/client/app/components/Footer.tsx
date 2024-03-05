import Link from "next/link";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 dark:bg-gray-950">
      <div className="container grid gap-6 py-4 md:grid-cols-[1fr_300px] md:py-6 lg:grid-cols-[1fr_400px]">
        <div className="space-y-4">
          <Link className="flex items-center space-x-2" href="#">
            <FiPackage className="h-6 w-6" />
            <span className="text-xl font-bold">My Marketplace</span>
          </Link>
          <p className="text-sm text-gray-500 prose-300 dark:text-gray-400">
            The platform for rapid progress. Let your team focus on shipping
            features instead of managing infrastructure with automated CI/CD,
            built-in testing, and integrated collaboration.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-1 md:gap-2 lg:grid-cols-2 xl:grid-cols-3">
          <div className="space-y-2">
            <h4 className="font-semibold">Discover More</h4>
            <ul className="space-y-1.5">
              <li>
                <Link className="underline underline-offset-2" href="#">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="underline underline-offset-2" href="#">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="underline underline-offset-2" href="#">
                  FAQ
                </Link>
              </li>
              <li>
                <Link className="underline underline-offset-2" href="#">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Marketplace</h4>
            <ul className="space-y-1.5">
              <li>
                <Link className="underline underline-offset-2" href="#">
                  Featured Products
                </Link>
              </li>
              <li>
                <Link className="underline underline-offset-2" href="#">
                  All Products
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Connect</h4>
            <ul className="space-y-1.5">
              <li>
                <Link className="underline underline-offset-2" href="#">
                  Support
                </Link>
              </li>
              <li>
                <Link className="underline underline-offset-2" href="#">
                  Community
                </Link>
              </li>
              <li>
                <Link className="underline underline-offset-2" href="#">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-2 min-[300px]:flex-row items-start justify-center">
          <Link
            className="inline-flex h-8 items-center rounded-md border border-gray-200 bg-white px-3 text-xs font-medium shadow-sm gap-1.5 dark:border-gray-800 dark:bg-gray-950 dark:gap-1.5"
            href="https://twitter.com/bok1c4"
            target="_blank"
          >
            <FaTwitter className="h-4 w-4" />
            Twitter
          </Link>
          <Link
            className="inline-flex h-8 items-center rounded-md border  border-gray-200 bg-white px-3 text-xs font-medium shadow-sm gap-1.5  dark:border-gray-800 dark:bg-gray-950 dark:gap-1.5"
            href="https://github.com/b0kic4"
            target="_blank"

          >
            <FaGithub className="h-4 w-4" />
            GitHub
          </Link>
          <Link
            className="inline-flex h-8 items-center rounded-md border border-gray-200 bg-white px-3 text-xs font-medium shadow-sm gap-1.5  dark:border-gray-800 dark:bg-gray-950 dark:gap-1.5"
            href="https://www.linkedin.com/in/boris-nikolic-a44a2126a/"
            target="_blank"

          >
            <FaLinkedin className="h-4 w-4" />
            LinkedIn
          </Link>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="container flex flex-col gap-2 sm:flex-row py-4 md:gap-4 md:py-6 items-center px-4 xl:px-6">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2024 My Marketplace. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
