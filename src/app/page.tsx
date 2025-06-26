"use client";
import ASideStages from "@/components/StageSelector";
import { StageViewer } from "@/components/StageViewer";
import Cube from "@/home_page.tsx/cube";
import { CircularProgress } from "@/shared/ui/CircularProgress/CircularProgress";
import { useState, useEffect } from "react";

const texts = ["Hello, Junior!", "Привет, Студент!"];

const stageData = [
  {
    id: 0,
    color: "#4CAF50", // Зеленый
    text: "READ ME",
    code: "console.log('Stage 1');",
    description: "Вступление",
  },
  {
    id: 1,
    color: "#4CAF50", // Зеленый
    text: "Stage 1",
    code: "console.log('Stage 1');",
    description: "Первый этап",
  },
  {
    id: 2,
    color: "#FFEB3B", // Желтый
    text: "Stage 2",
    code: "console.log('Stage 2');",
    description: "Второй этап",
  },
  {
    id: 3,
    color: "#FF9800", // Оранжевый
    text: "Stage 3",
    code: "console.log('Stage 3');",
    description: "Третий этап",
  },
  {
    id: 4,
    color: "#F44336", // Красный
    text: "Stage 4",
    code: "console.log('Stage 4');",
    description: "Четвертый этап",
  },
  {
    id: 5,
    color: "#F44336", // Красный
    text: "НАЧИНАЕМ",
    code: "console.log('Stage 4');",
    description: "Четвертый этап",
  },
];

export default function TypingEffect() {
  const [displayedText, setDisplayedText] = useState(""); // Начальное состояние пустое
  const [index, setIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [phase, setPhase] = useState(0); // 0 - печатаем, 1 - удаляем
  const [isCompleted, setIsCompleted] = useState(false); // Состояние завершения эффекта
  const [currentStageIndex, setCurrentStageIndex] = useState(0); // Состояние текущего этапа

  console.log(currentStageIndex);

  useEffect(() => {
    if (isCompleted) return; // Если эффект завершен, не выполняем код

    const interval = setInterval(() => {
      const currentText = texts[currentTextIndex];

      if (phase === 0) {
        // Печатаем текущий текст
        if (index < currentText.length) {
          setDisplayedText((prev) => prev + currentText.charAt(index));
          setIndex((prev) => prev + 1);
        } else {
          // Если это последний текст, завершаем эффект
          if (currentTextIndex === texts.length - 1) {
            setIsCompleted(true); // Устанавливаем завершение
          } else {
            setPhase(1); // Переход к удалению
            setIndex(currentText.length - 1); // Устанавливаем индекс для удаления
          }
        }
      } else if (phase === 1) {
        // Удаляем текущий текст
        if (index >= 0) {
          setDisplayedText((prev) => prev.slice(0, -1));
          setIndex((prev) => prev - 1);
        } else {
          setPhase(0); // Переход к следующему тексту
          setCurrentTextIndex((prev) => prev + 1); // Переход к следующему тексту
          setIndex(0); // Сбрасываем индекс для следующего текста
        }
      }
    }, 200); // Скорость печати/удаления

    return () => clearInterval(interval);
  }, [index, phase, currentTextIndex, isCompleted]);

  // Прогресс для CircularProgress
  const totalStages = stageData.length; // Общее количество этапов
  let progress = (currentStageIndex / (totalStages - 1)) * 100;
  if (currentStageIndex === 0) {
    progress = 0;
  }

  return (
    <div className="flex gap-32 px-4 pt-2 justify-center w-full">

        <StageViewer
          stageData={stageData}
          currentStageIndex={currentStageIndex}
          setCurrentStageIndex={setCurrentStageIndex}
          progress={progress}
        />
     
    
    </div>
  );
}
