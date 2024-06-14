"use client";
import Link from "next/link";
import { usePosts } from "@/store";
import { shallow } from "zustand/shallow";
import { useEffect } from "react";
import { buttonVariants } from "@/components/ui/button";

// type Props = {
//   posts: any[];
// };

export const Posts = () => {
  const [posts, loading, getAllPosts] = usePosts(
    (state) => [state.posts, state.loading, state.getAllPosts],
    shallow
  );

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);
  console.log(posts);
  return (
    <>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        posts.map((post: any) => (
          <li key={post.id}>
            <Link href={`/stage1/${post.id}`}>{post.title}</Link>
          </li>
        ))
      )}
      <Link
        href={`/stage1/new`}
        className={buttonVariants({ variant: "secondary" })}
      >Добавить тему</Link>
    </>
  );
};
