import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { backendUrl } from "@client/lib/Constants";
import NextAuth from "next-auth/next";
import axios from "axios";
// implement in here google auth provider
// client side - useSesion()
// server side - getServerSesion()
export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "example",
        },
        email: {
          label: "email",
          type: "text",
          placeholder: "example@example.com",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        if (
          !credentials?.username ||
          credentials?.password ||
          !credentials.email
        )
          return null;
        const { username, password, email } = credentials;
        try {
          const res = await axios.post("http://localhost:4000/auth/login", {
            email: email,
            username: username,
            password: password,
          });
          const user = await res.data();
          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
};

const handeler = NextAuth(authOptions);

export { handeler as GET, handeler as POST };
