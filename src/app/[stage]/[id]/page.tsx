import { ReactElement } from "react";
import { getPostById } from "@/services/posts";

interface IProps extends ReactElement<"div"> {
  params: {
    id: string;
    stage: string;
  };
}

// export async function generateMetadata({

//     params: {id},
// }: Props): Promise<Metadata>{

// }

export default async function Lesson({
  params: { id, stage },
  ...otherProps
}: IProps) {
  const post = await getPostById(id);
  // stage = stage.replace(/\D/g, "");
  return (
    <div {...otherProps}>
      <div
        className="notion-container"
        dangerouslySetInnerHTML={{ __html: post?.body }}
      />
    </div>
  );
}
