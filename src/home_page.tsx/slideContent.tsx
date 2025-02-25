"use client";
import { FC, useEffect, useState } from "react";

export const SlideContent: FC<{
  code: string;
  description: string;
  text: string;
}> = ({ code, description, text }) => {
  const [displayText, setDisplayText] = useState(code);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayText(description);
    }, 7000); // Задержка 2 секунды перед переключением текста

    return () => clearTimeout(timer); // Очистка таймера при размонтировании
  }, [description]);
  console.log(text);

  return (
    <div className="flex flex-col items-center justify-center text-center h-full ">
      <div className="-rotate-90">
        <h2>{displayText}</h2>
        <p>{text}</p>
      </div>
    </div>
  );
};
