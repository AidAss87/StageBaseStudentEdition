"use client";

import { Navigation } from "./Navigation";
import SearchBar from "./SearchBar";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Stage 1", href: "/stage1" },
  { label: "Stage 2", href: "/stage2" },
  { label: "Stage 3", href: "/stage3" },
  { label: "Stage 4", href: "/stage4" },
];

export const TheHeader = () => {
  return (
    //border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60 - это убрал у header
    <header className="h-16 fixed top-0 z-50 w-full bg-white">
      <div className="container flex justify-between items-center h-full">
        <Navigation navLinks={navItems} />
        {/* <SearchBar /> */}
      </div>
    </header>
  );
};
