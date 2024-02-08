// this is server side example
// import ClientSide from "./ClientSide";
// import { trpc } from "./trpc";

import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/Navbar";

import {
  FaFacebook,
  FaInstagram,
  FaSave,
  FaSearchengin,
  FaShoppingBag,
  FaTwitter,
  FaUser,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Hero from "./components/Hero";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { FiPackage } from "react-icons/fi";
import Main from "./components/Main";
import Footer from "./components/Footer";
export default async function Home() {
  // getting hello from the nest successfully

  // const response = await trpc.hello.query({ name: "Boris" });

  return (
    <>
      <Navbar />
      <Hero />
      <Main />
      <Footer />
    </>
  );
}
