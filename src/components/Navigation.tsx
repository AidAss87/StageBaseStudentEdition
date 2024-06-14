"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import logo from "../assets/images/logo.svg";

type NavLink = {
  label: string;
  href: string;
};
type Props = {
  navLinks: NavLink[];
};

export const Navigation = ({ navLinks }: Props) => {
  const pathname = usePathname();
  const session = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  console.log(session);
  return (
    <>
      <nav>
        <ul className="flex h-full">
          {/* <Image src={logo} alt={"logo"} className="w-16 h-16 bg-white/50 "  /> */}
          {navLinks.map((link) => {
            console.log(pathname, link.href);
            const isActive =
              pathname === link.href ||
              (pathname.includes(link.href) && link.href.length > 1);

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
      {!session?.data ? (
        <Link className={`py-5 px-10 font-serif text-white`} href={"/signin"}>
          Log in
        </Link>
      ) : (
        <Link
          onClick={async () => {
            signOut({
              callbackUrl: "/signin",
            });
          }}
          className={`py-5 px-10 font-serif text-white`}
          href={""}
        >
          Log Out
        </Link>
      )}
    </>
  );
};
