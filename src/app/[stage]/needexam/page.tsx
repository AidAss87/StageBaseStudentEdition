// components/AccessDeniedPage.tsx

import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StageKey } from "@/types/stage";
import Link from "next/link";

const stageInfo = {
  stage1: "Как ты сюда попал?",
  stage2: "Stage_1 — Верстальщик",
  stage3: "Stage_2 — Стажер разработчик",
  stage4: "Stage_3 — Младший разработчик",
};

const AccessDeniedPage = ({
  params: { stage },
}: {
  params: { stage: StageKey };
}) => {
  return (
    <div className="container mx-auto p-6 flex justify-center h-full">
      <Card className="mb-6 max-w-screen-md p-8 justify-center flex flex-col max-h-max" >
        <h1 className="text-4xl font-bold  mb-4">Еще не время...</h1>
        <p className="text-lg mb-6">
          Вы не можете перейти к данному этапу, пока не сдадите экзамен на
          предыдущем этапе: <strong>{stageInfo[stage]}</strong>.
        </p>
        <Link href="/" className={buttonVariants({ variant: "default" })}>
          Перейти к входу
        </Link>
      </Card>
    </div>
  );
};

export default AccessDeniedPage;
