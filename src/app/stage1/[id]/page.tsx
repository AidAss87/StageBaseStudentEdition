import { Button } from "@/components/ui/button";
import { ReactElement } from "react";
import { buttonVariants } from "@/components/ui/button";
import { removePost } from "../actions";
import Link from "next/link";

interface IProps extends ReactElement<"div"> {
  params: {
    id: string;
  };
}

// export async function generateMetadata({

//     params: {id},
// }: Props): Promise<Metadata>{

// }

export default async function Lesson({
  params: { id },
  ...otherProps
}: IProps) {
  return (
    <div {...otherProps}>
      <p>Lesson name</p>
      <form action={removePost.bind(null, id)}>
        <input
          className={
            buttonVariants({ variant: "destructive" }) + " cursor-pointer"
          }
          type="submit"
          value="Удалить"
        />
      </form>
      <Link
        href={`/stage1/${id}/edit`}
        className={buttonVariants({ variant: "secondary" })}
      >
        Редактировать
      </Link>
    </div>
  );
}
