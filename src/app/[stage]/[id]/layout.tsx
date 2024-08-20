import { SubtitleAside } from "@/components/SubtitleAside";
import { TitleAside } from "@/components/TitleAside";

export default function StageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <SubtitleAside />
    </>
  );
}
