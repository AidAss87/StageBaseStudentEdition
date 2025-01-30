import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

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
        const user = await prisma.user.findFirst({
          where: {
            OR: [{ name: credentials.name }, { email: credentials.name }],
          },
        });
        console.log(user);
        if (!user) {
          throw new Error("user_not_found");
        }

        // Проверка верификации
        if (!user.isVerified) {
          throw new Error(`user_not_verified`);
        }

        if (user) {
          // Сравнение введенного пароля с хешированным паролем в базе данных
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.pass
          );

          if (isPasswordValid) {
            // Исключаем пароль из возвращаемого объекта
            const { pass, ...userWithoutPass } = user;
            return userWithoutPass;
          } else {
            throw new Error("invalid_password");
          }
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
        token.isVerified = user.isVerified;
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
