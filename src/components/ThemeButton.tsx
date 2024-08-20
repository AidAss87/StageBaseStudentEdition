"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { buttonVariants } from "@/components/ui/button";

import Image from "next/image";
import moon from "../../public/assets/images/icons/moon-stars-fill.svg";
import sun from "../../public/assets/images/icons/sun.svg";
import { useEffect, useState } from "react";

export function ThemeButton() {
  const [currentTheme, setCurrentTheme] = useState("system");

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "system";
    setCurrentTheme(theme);
    applyTheme(theme);
  }, []);

  function applyTheme(theme: string) {
    if (
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  function changeHandler(value: string) {
    setCurrentTheme(value);
    if (value === "system") {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", value);
    }
    applyTheme(value);
  }

  return (
    <Select onValueChange={changeHandler} value={currentTheme}>
      <SelectTrigger className="w-[40px] hover:bg-accent hover:text-accent-foreground outline-none focus:ring-0 focus:ring-offset-0 border-none">
        <Image src={currentTheme === "dark" ? moon : sun} alt="луна" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
}
