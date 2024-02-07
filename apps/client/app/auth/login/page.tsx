import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-500 dark:text-gray-400">Enter your email below to login to your account</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="m@example.com" required type="email" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" required type="password" />
          </div>

          <Button className="w-full h-8 bg-blue-500 text-white hover:bg-blue-700" type="submit">
            Login
          </Button>

          <Separator className="my-8" />

          <Button className="w-full h-8 bg-[#131314] text-white hover:bg-slate-700">
          <FaGoogle className="w-6 h-6 mr-2" />
            Login with Google
          </Button>
          <Button className="w-full h-8 bg-[#131314] text-white hover:bg-slate-700">
            <FaGithub className="w-6 h-6 mr-2"/>
            Login with Github
          </Button>

          <Link className="block text-center text-sm underline" href="#" passHref>
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
}
