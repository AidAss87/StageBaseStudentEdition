// middleware.ts

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Получаем роль пользователя из токена NextAuth
    const userRole = req.nextauth.token?.role;

    // Проверяем, авторизован ли пользователь и какая у него роль
    const isAdmin = userRole === "admin";
    const isGuest = userRole === "guest";
    const isStage1 = userRole === "stage1";
    const isStage2 = userRole === "stage2";
    const isStage3 = userRole === "stage3";
    const isStage4 = userRole === "stage4";
    const isAuthenticated =
      isAdmin || isGuest || isStage1 || isStage2 || isStage3 || isStage4;
    console.log(userRole);
    // Задаем доступные маршруты и условия доступа
    const path = req.nextUrl.pathname;
    if (!isAuthenticated) {
      // Если пользователь не авторизован, отправляем на страницу входа
      return NextResponse.redirect(new URL("/signin", req.url));
    } else if (isAdmin) {
      // Админу доступны все страницы
      return NextResponse.next();
    } else if (isStage1) {
      console.log("stage1 true");
      // Пользователь с ролью "user" может получить доступ только к /stage1
      if (path.startsWith("/stage1")) {
        return NextResponse.next();
      } else {
        // Доступ к остальным страницам запрещен
        if (!path.endsWith("/needexam")) {
          return NextResponse.redirect(new URL(path + "/needexam", req.url));
        }
        return NextResponse.next();
      }
    } else if (isStage2) {
      if (path.startsWith("/stage1") || path.startsWith("/stage2")) {
        return NextResponse.next();
      } else {
        if (!path.endsWith("/needexam")) {
          return NextResponse.redirect(new URL(path + "/needexam", req.url));
        }
        return NextResponse.next();
      }
    } else if (isStage3) {
      if (
        path.startsWith("/stage1") ||
        path.startsWith("/stage2") ||
        path.startsWith("/stage3")
      ) {
        return NextResponse.next();
      } else {
        if (!path.endsWith("/needexam")) {
          return NextResponse.redirect(new URL(path + "/needexam", req.url));
        }
        return NextResponse.next();
      }
    } else if (isStage4) {
      if (
        path.startsWith("/stage1") ||
        path.startsWith("/stage2") ||
        path.startsWith("/stage3") ||
        path.startsWith("/stage4")
      ) {
        return NextResponse.next();
      } else {
        if (!path.endsWith("/needexam")) {
          return NextResponse.redirect(new URL(path + "/needexam", req.url));
        }
        return NextResponse.next();
      }
    } else if (isGuest) {
      return NextResponse.redirect(new URL("/guestpage", req.url));
    }

    // Для всех остальных случаев (например, неизвестная роль)
    return NextResponse.redirect(new URL("/signin", req.url));
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        const userRole = token?.role;
        const isAdmin = userRole === "admin";
        const isGuest = userRole === "guest";
        const isStage1 = userRole === "stage1";
        const isStage2 = userRole === "stage2";
        const isStage3 = userRole === "stage3";
        const isStage4 = userRole === "stage4";
        const isAuthenticated =
          isAdmin || isGuest || isStage1 || isStage2 || isStage3 || isStage4;

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
