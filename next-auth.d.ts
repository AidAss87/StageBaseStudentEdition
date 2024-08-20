// next-auth.d.ts

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: string; // Добавляем поле role в user
    } & DefaultSession["user"]; // Сохраняем остальные поля user
  }

  interface User {
    role: string; // Добавляем поле role в User
  }
}
