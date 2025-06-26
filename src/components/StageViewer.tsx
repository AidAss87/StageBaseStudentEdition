import { Stage } from "@/entities/stage/model/types";
import { StageSelector } from "./StageSelector";
import Cube from "@/home_page.tsx/Cube";
import { StageSlide } from "./stage/ui/StageSlide";
import { StageOne } from "./stage/ui/StageOne";
import { StageTwo } from "./stage/ui/StageTwo";
import { StageThree } from "./stage/ui/StageThree";
import { StageFour } from "./stage/ui/StageFour";
import { ReadMe } from "./stage/ui/ReadMe";
import { CircularProgress } from "@/shared/ui/CircularProgress/CircularProgress";
import { StageBegin } from "./stage/ui/StageBegin";

interface Props {
  currentStageIndex: number;
  setCurrentStageIndex: (id: number) => void;
  progress: number;
  stageData: Stage[]; // ✅ добавь, если ещё не добавил
}

export const StageViewer = ({
  currentStageIndex,
  setCurrentStageIndex,
  progress,
  stageData,
}: Props) => {
  const slides = [
    <div className="relative w-full h-full bg-gradient-img bg-cover bg-center bg-[#F6F6F6] rounded-[20px]">
      <ReadMe />
      <div className="absolute top-16 right-10 z-10 ">
        <CircularProgress value={progress} size={80} color="#6c5ce7" />
      </div>
    </div>,
    <div className="relative w-full h-full bg-second-gradient-img bg-cover bg-center bg-[#F6F6F6] rounded-[20px]">
      <StageOne />
      <div className="absolute top-4 right-4 z-10">
        <CircularProgress value={progress} size={80} color="#008000" />
      </div>
    </div>,
    <div className="relative w-full h-full bg-second-gradient-img bg-cover bg-center bg-[#F6F6F6] rounded-[20px]">
      <StageTwo />
      <div className="absolute top-16 right-20 z-10">
        <CircularProgress
          value={progress}
          size={80}
          color=" #FFFF00"
          opacity={0.5}
        />
      </div>
    </div>,
    <div className="relative w-full h-full bg-second-gradient-img bg-cover bg-center bg-[#F6F6F6] rounded-[20px]">
      <StageThree />
      <div className="absolute top-20 right-20 z-10">
        <CircularProgress value={progress} size={60} color="#FFA500" />
      </div>
    </div>,
    <div className="relative w-full h-full bg-second-gradient-img bg-cover bg-center bg-[#F6F6F6] rounded-[20px]">
      <StageFour />
      <div className="absolute top-20 right-20 z-8">
        <CircularProgress value={progress} size={80} color="#FF0000" />
      </div>
    </div>,
    <div className="relative w-full h-full bg-gradient-img bg-cover bg-center bg-[#F6F6F6] rounded-[20px]">
      <StageBegin />
      <div className="absolute top-16 right-10 z-10 ">
        <CircularProgress value={progress} size={80} color="#6c5ce7" />
      </div>
    </div>,
  ];
  return (
    <div className="flex gap-[24px] ">
      <StageSelector
        stages={stageData}
        selectedId={currentStageIndex}
        onSelect={setCurrentStageIndex}
      />
      <div className="flex">
        <div className="relative">
          <Cube
            slides={slides}
            currentStageIndex={currentStageIndex}
            setCurrentStageIndex={setCurrentStageIndex}
          />
        </div>
      </div>
    </div>
  );
};
