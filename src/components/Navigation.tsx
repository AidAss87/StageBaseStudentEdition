"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import logo from "../assets/images/logo.svg";
import { activeLink } from "@/services/activeRoute";
import { ThemeButton } from "./ThemeButton";

type NavLink = {
  label: string;
  href: string;
};
type Props = {
  navLinks: NavLink[];
};

export const Navigation = ({ navLinks }: Props) => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const opa = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  console.log(opa);
  return (
    <>
      <nav>
        <ul className="flex h-full ">
          {/* <Image src={logo} alt={"logo"} className="w-16 h-16 bg-white/50 "  /> */}
          {navLinks.map((link) => {
            const isActive = activeLink(link.href, pathname, callbackUrl);
            return (
              <li key={link.label} className="flex items-center">
                <Link
                  href={link.href}
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
      <div className="flex">
        {session?.user.role === "admin" && (
          <Link
            className={`${buttonVariants({
              variant: "nav",
            })} hover:${buttonVariants({ variant: "navActive" })}`}
            href={"/users"}
          >
            Пользователи
          </Link>
        )}
        {!(status === "authenticated") ? (
          <Link
            className={`${buttonVariants({
              variant: "nav",
            })} hover:${buttonVariants({ variant: "navActive" })}`}
            href={"/signin"}
          >
            Войти
          </Link>
        ) : (
          <Link
            onClick={async () => {
              signOut({
                callbackUrl: "/signin",
              });
            }}
            className={`${buttonVariants({
              variant: "nav",
            })} hover:${buttonVariants({ variant: "navActive" })}`}
            href={""}
          >
            Выйти
          </Link>
        )}
        <ThemeButton />
      </div>
    </>
  );
};
