import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

const authConfig = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        name: { label: "Name", type: "text", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        console.log(credentials);
        if (!credentials?.name || !credentials.password) return null;

        // Запрос к базе данных для поиска пользователя
        const user = await prisma.user.findUnique({
          where: { name: credentials.name },
        });
        console.log(user);

        if (user && user.pass === credentials.password) {
          // Исключаем пароль из возвращаемого объекта
          const { pass, ...userWithoutPass } = user;
          return userWithoutPass;
        }

        // Если пользователь не найден или пароль неверен, возвращаем null
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Добавляем роль в JWT
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role; // Передаем роль в сессию
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin", // Страница входа
    error: "/error", // Страница ошибки
  },
};

export default authConfig;
