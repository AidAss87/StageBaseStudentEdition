import { NewPostForm } from "@/components/NewPostForm";
import { ReactElement } from "react";
import { getPostById } from "@/services/posts";
interface IProps extends ReactElement<"div"> {
  params: {
    id: string;
    stage: string;
  };
}

export default async function Edit({
  params: { id, stage },
  ...otherProps
}: IProps) {
  const post = await getPostById(id);
  return (
    <div className="container pt-20">
      <NewPostForm
        title={post?.title}
        body={post?.body}
        id={id}
        stage={stage.replace(/\D/g, "")}
      />
    </div>
  );
}
