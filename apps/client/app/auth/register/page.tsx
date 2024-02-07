"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUser } from "@client/app/validationSchemas";
import { z } from "zod";
import { supabase } from "@client/app/supabase";
export default function Register() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateUser),
  });
  type CreateUserForm = z.infer<typeof CreateUser>;
  const onSubmit: SubmitHandler<CreateUserForm> = () => {};
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Register</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your information to create an account
          </p>
        </div>
        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              // console.log(data);
              // await axios.post("/api/issues", requestData);
              // router.push("/issues");
              // router.refresh();
            } catch (error: any) {
              console.log(error);
            }
          })}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                required
                type="email"
                {...register("email")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Choose a username"
                {...register("username")}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register("password")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                {...register("confirmPassword")}
              />
            </div>

            <Button
              className="w-full h-8 bg-blue-500 text-white hover:bg-blue-700"
              type="submit"
            >
              Register
            </Button>
          </div>

          <Separator className="my-8" />

          <div className="space-y-4">
            <Button
              onClick={() =>
                supabase.auth.signInWithOAuth({
                  provider: "google",
                  options: {
                    queryParams: {
                      access_type: "offline",
                      prompt: "consent",
                    },
                  },
                })
              }
              className="w-full h-8 bg-[#131314] text-white hover:bg-slate-700"
            >
              <FaGoogle className="w-6 h-6 mr-2" />
              Register with Google
            </Button>

            <Button className="w-full h-8 bg-gray-800 text-white hover:bg-slate-700">
              <FaGithub
                onClick={() =>
                  supabase.auth.signInWithOAuth({
                    provider: "github",
                    options: {
                      queryParams: {
                        access_type: "offline",
                        prompt: "consent",
                      },
                    },
                  })
                }
                className="w-6 h-6 mr-2"
              />
              Register with GitHub
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
