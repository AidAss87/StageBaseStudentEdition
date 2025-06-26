import { CircularProgress } from "@/shared/ui/CircularProgress/CircularProgress";
import { Stage } from "@/entities/stage/model/types";
import Cube from "@/home_page.tsx/cube";

interface Props {
  stage: Stage;
  progress: number;
}

export const StageDescription = ({ stage, progress }: Props) => {
  const isIntro = stage.id === 0;


  return (
    <div
      className={`p-6 rounded-[20px] w-[1196px] flex flex-col items-start gap-4 ${
        isIntro ? "bg-[#4E4E4E]" : "bg-[#EBEBEB]"
      }`}
    >
      <h2 className="text-2xl font-bold">{stage.text}</h2>
      <p className="text-gray-700">{stage.description}</p>
      <CircularProgress value={progress} size={80} color={stage.color} />
    </div>
  );
};
