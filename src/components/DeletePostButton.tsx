"use client";
import { usePosts } from "@/store";
import { buttonVariants } from "./ui/button";
import { shallow } from "zustand/shallow";

export const DeletePostButton = ({ stage }: { stage: string }) => {
  const [posts, loading, getAllPosts] = usePosts(
    (state) => [state.posts, state.loading, state.getAllPosts],
    shallow
  );

  return (
    <input
      //костыль
      onClick={() => {
        const time = setTimeout(() => {
          getAllPosts(stage);
          clearTimeout(time);
        }, 100);
      }}
      className={
        buttonVariants({ variant: "destructive" }) + " cursor-pointer w-full"
      }
      type="submit"
      value="Удалить"
    />
  );
};
