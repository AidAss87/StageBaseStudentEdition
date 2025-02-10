"use client";

import { useState } from "react";
import { Navigation } from "./Navigation";
import { ThemeButton } from "./ThemeButton";
import { CircularProgress } from "@/shared/ui/CircularProgress/CircularProgress";
import { useStage } from "@/store";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Stage 1", href: "/stage1" },
  { label: "Stage 2", href: "/stage2" },
  { label: "Stage 3", href: "/stage3" },
  { label: "Stage 4", href: "/stage4" },
];

const stageData = [
  { color: "green", text: "Stage 1" },
  { color: "yellow", text: "Stage 2" },
  { color: "orange", text: "Stage 3" },
  { color: "red", text: "Stage 4" },
];

export const TheHeader = () => {
  const { currentStage, setCurrentStage } = useStage();
  const progressValue = currentStage * 25;

  const isValidStage = currentStage >= 1 && currentStage <= stageData.length;
  // Выбираем данные для текущего этапа или используем данные по умолчанию
  const currentStageData = isValidStage
    ? stageData[currentStage - 1] // currentStage начинается с 1
    : { color: "gray", procent: 0 }; // Значения по умолчанию

  const stageText = isValidStage ? `Stage ${currentStage}` : "Stage 0";

  return (
    <header className="h-16 fixed top-0 z-50 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex justify-between items-center h-full">
        <Navigation navLinks={navItems} onStageChange={setCurrentStage} />
        <CircularProgress
          value={progressValue}
          size={100}
          strokeWidth={10}
          color={currentStageData.color}
          text={stageText}
          fontSize={15}
        />
      </div>
    </header>
  );
};
