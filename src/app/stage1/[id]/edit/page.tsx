import { NewPostForm } from "@/components/NewPostForm";
import { ReactElement } from "react";
interface IProps extends ReactElement<"div"> {
  params: {
    id: string;
  };
}
export default function Edit({ params: { id }, ...otherProps }: IProps) {
  return (
    <div className="container pt-20">
          <NewPostForm title={"edit " + id} body="edit body" id={id} />
    </div>
  );
}
