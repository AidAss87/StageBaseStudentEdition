"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import logo from "../assets/images/logo.svg";
import { activeLink } from "@/services/activeRoute";
import { ThemeButton } from "./ThemeButton";
import SearchBar from "./SearchBar";

type NavLink = {
  label: string;
  href: string;
};
type Props = {
  navLinks: NavLink[];
  onStageChange: (index: number) => void;
  currentStage: number;
};

export const Navigation = ({ navLinks, onStageChange }: Props) => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <>
      <nav>
        <ul className="flex h-full">
          {navLinks.map((link, index) => {
            const isActive = activeLink(link.href, pathname, callbackUrl);
            return (
              <li key={link.label} className="flex items-center">
                <Link
                  href={link.href}
                  onClick={() => onStageChange(index)}
                  className={
                    isActive
                      ? buttonVariants({ variant: "navActive" })
                      : buttonVariants({ variant: "nav" })
                  }
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex gap-6">
        <SearchBar />

        {/* Только для администратора — ссылка на пользователей */}
        {session?.user.role === "admin" && (
          <Link className={buttonVariants({ variant: "nav" })} href="/users">
            Пользователи
          </Link>
        )}

        {/* Только для авторизованных — ссылка на "Мой профиль" */}
        {status === "authenticated" && (
          <Link className={buttonVariants({ variant: "nav" })} href="/profile">
            Мой профиль
          </Link>
        )}

        {/* Войти / Выйти */}
        {status !== "authenticated" ? (
          <Link className={buttonVariants({ variant: "nav" })} href="/signin">
            Войти
          </Link>
        ) : (
          <Link
            onClick={() => signOut({ callbackUrl: "/signin" })}
            className={buttonVariants({ variant: "nav" })}
            href=""
          >
            Выйти
          </Link>
        )}

        <ThemeButton />
      </div>
    </>
  );
};
