import { NewPostForm } from "@/components/NewPostForm";

export default function New({
  params: { stage },
}: {
  params: { stage: string };
}) {
  return (
    <div className="container pt-20">
      <NewPostForm
        stage={stage.replace(/\D/g, "")}
        title={""}
        body={""}
        id={""}
      />
    </div>
  );
}
