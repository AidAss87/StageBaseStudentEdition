import type { AuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { users } from "./users";

export const authConfig: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        name: { label: "name", type: "text", required: true },
        password: { label: "password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.name || !credentials.password) return null;
        const currentUser = users.find(
          (user) => user.name === credentials.name
        );
        if (currentUser && currentUser.password === credentials.password) {
          const { password, ...userWithoutPass } = currentUser;
          return userWithoutPass as User;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
};
