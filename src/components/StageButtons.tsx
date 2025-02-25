"use client";

import { CircularProgress } from "@/shared/ui/CircularProgress/CircularProgress";
import { useStage } from "@/store";
import React from "react";

const stageData = [
  { id: 0, color: "green", text: "Stage 1" },
  { id: 1, color: "yellow", text: "Stage 2" },
  { id: 2, color: "orange", text: "Stage 3" },
  { id: 3, color: "red", text: "Stage 4" },

];

export const StageButtons = () => {
  const { currentStage, setCurrentStage } = useStage();
  const progressValue = currentStage * 25;

  const isValidStage = currentStage >= 1 && currentStage <= stageData.length;
  // Выбираем данные для текущего этапа или используем данные по умолчанию
  const currentStageData = isValidStage
    ? stageData[currentStage - 1] // currentStage начинается с 1
    : { color: "gray", procent: 0 }; // Значения по умолчанию

  const stageText = isValidStage ? `Stage ${currentStage}` : "Stage 0";

  return (
    <div>
      <h1 className="">Choose Your Stage:</h1>
      <div>
        <CircularProgress
          value={progressValue}
          size={200}
          color={currentStageData.color}
          text={stageText}
        />
      </div>
      <div className="mt-4">
        {stageData.map((stage, index) => (
          <button
            key={index}
            onClick={() => setCurrentStage(index + 1)}
            className={`px-4 py-2 mr-2 rounded ${
              currentStage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {stage.text}
          </button>
        ))}
      </div>
    </div>
  );
};
