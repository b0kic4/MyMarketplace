import Link from "next/link";
import AuthButtons from "./AuthButtons";

export default function Hero() {
  return (
    <div className="bg-gray-50/90 border-t border-b border-gray-200 dark:border-gray-800">
      <div className="container flex flex-col items-center justify-center h-[600px] px-4 space-y-2 md:px-6 lg:space-y-4 xl:space-y-6">
        <nav className="flex flex-row items-center space-x-4">
          <Link
            className="flex items-center space-x-2 text-2xl font-bold"
            href="#"
          >
            <span className="sr-only">Home</span>
          </Link>
          <div className="flex-1" />
          <AuthButtons />
        </nav>
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-6xl lg:text-7xl">
            Welcome to the Marketplace
          </h1>
          <div className="max-w-[700px]">
            <p className="text-gray-500 md:text-xl dark:text-gray-400">
              The #1 platform for buying and selling the best products. Discover
              unique items from trusted sellers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
