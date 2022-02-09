import NextAuth from "next-auth";
import { Role, Branch } from "entities";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      role: string;
      username: string;
    };
  }
}
