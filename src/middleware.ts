// middleware.ts

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Получаем роль пользователя из токена NextAuth
    const userRole = req.nextauth.token?.role;

    // Проверяем, авторизован ли пользователь и какая у него роль
    const isAdmin = userRole === "admin";
    const isUser = userRole === "user";
    const isGuest = userRole === "guest";
    const isAuthenticated = isAdmin || isUser || isGuest;

    // Задаем доступные маршруты и условия доступа
    const path = req.nextUrl.pathname;
    if (!isAuthenticated) {
      // Если пользователь не авторизован, отправляем на страницу входа
      return NextResponse.redirect(new URL("/signin", req.url));
    } else if (isAdmin) {
      // Админу доступны все страницы
      return NextResponse.next();
    } else if (isUser) {
      // Пользователь с ролью "user" может получить доступ только к /stage1
      if (path.startsWith("/stage1")) {
        return NextResponse.next();
      } else {
        // Доступ к остальным страницам запрещен
        return NextResponse.redirect(new URL("/403", req.url));
      }
    } else if (isGuest) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    // Для всех остальных случаев (например, неизвестная роль)
    return NextResponse.redirect(new URL("/signin", req.url));
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        const isAdmin = token?.role === "admin";
        const isUser = token?.role === "user";
        const isGuest = token?.role === "guest";
        const isAuthenticated = isAdmin || isUser || isGuest;
        return isAuthenticated;
      },
    },
  }
);

// Применение middleware к маршрутам
export const config = {
  matcher: [
    "/stage1/:path*",
    "/stage2/:path*",
    "/stage3/:path*",
    "/stage4/:path*",
    "/users/:path*",
  ], // Обработка всех указанных маршрутов
};
