import { SubtitleAside } from "@/components/SubtitleAside";
import { TitleAside } from "@/components/TitleAside";

export default function StageLayout({
  children,
  params: { stage },
}: {
  children: React.ReactNode;
  params: { stage: string };
}) {
  console.log(stage);
  return (
    <section>
      <div className="container flex">
        <TitleAside stage={stage.replace(/\D/g, "")} />
        {children}
      </div>
    </section>
  );
}
