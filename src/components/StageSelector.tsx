import { Stage } from "@/entities/stage/model/types";

interface Props {
  stages: Stage[];
  selectedId: number;
  onSelect: (id: number) => void;
}

export const StageSelector = ({ stages, selectedId, onSelect }: Props) => {
  return (
    <div className="w-[219px] rounded-[20px] h-[839px] p-4 border border-black">
      <ul className="flex flex-col gap-2">
        {stages.map((stage) => (
          <li
            key={stage.id}
            onClick={() => onSelect(stage.id)}
            className={`cursor-pointer p-2 rounded font-manrope`}
          >
            <span className={stage.text === "НАЧИНАЕМ" ? "font-bold" : ""}>
              {stage.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
