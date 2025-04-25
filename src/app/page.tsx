"use client";
import Cube from "@/home_page.tsx/cube";
import { useState, useEffect } from "react";

const texts = ["Hello, Junior!", "Привет, Студент!"];

export default function TypingEffect() {
  const [displayedText, setDisplayedText] = useState(""); // Начальное состояние пустое
  const [index, setIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [phase, setPhase] = useState(0); // 0 - печатаем, 1 - удаляем
  const [isCompleted, setIsCompleted] = useState(false); // Состояние завершения эффекта

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

  return (
    <div className="flex flex-col items-center justify-center px-4 pt-2">
      <div
        id="swiper-area"
        className="absolute inset-0 h-screen w-screen -z-50"
      ></div>
      <div className="font-mono text-2xl tracking-wide h-10 overflow-hidden">
        {displayedText}
      </div>
      <div className="w-full max-w-2xl">
        <Cube />
      </div>
    </div>
  );
}
