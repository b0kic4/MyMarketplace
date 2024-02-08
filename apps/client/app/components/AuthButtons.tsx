"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import React from "react";
const AuthButtons = () => {
  return (
    <div className="flex items-center space-x-4">
      <SignedOut>
        <SignInButton mode="modal" afterSignInUrl="/">
          <Button className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
            Sign Up
          </Button>
        </SignInButton>
      </SignedOut>
    </div>
  );
};

export default AuthButtons;
