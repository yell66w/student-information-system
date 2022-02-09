import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../lib/prisma";
import * as bcrypt from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.account.findUnique({
          where: {
            username: credentials?.username,
          },
        });
        if (user && credentials?.password && user?.password) {
          if (bcrypt.compareSync(credentials?.password, user.password)) {
            return {
              id: user.id,
              username: user.username,
              role: user.role,
            };
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.role) {
        token.role = user.role;
      }
      if (user?.username) {
        token.username = user.username;
      }
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.username = token?.username as string;
      session.user.role = token?.role as string;
      session.user.id = token?.id as string;
      return session;
    },
  },
});
