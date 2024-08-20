"use client";
import Link from "next/link";

import { useAdmin, usePosts } from "@/store";
import { shallow } from "zustand/shallow";
import { useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { usePathname, useSearchParams } from "next/navigation";
import { activeLink } from "@/services/activeRoute";
import { useSession } from "next-auth/react";
import { DeletePostButton } from "./DeletePostButton";
import { removePost } from "@/app/[stage]/actions";

// type Props = {
//   posts: any[];
// };

export const TitleAside = ({ stage }: { stage: string }) => {
  const [posts, loading, getAllPosts] = usePosts(
    (state) => [state.posts, state.loading, state.getAllPosts],
    shallow
  );

  const [admin, changeAdmin] = useAdmin(
    (state) => [state.admin, state.changeAdmin],
    shallow
  );

  useEffect(() => {
    getAllPosts(stage);
  }, [getAllPosts]);
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  console.log(stage);
  return (
    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-1/5 shrink-0 md:sticky md:block">
      <div className="relative overflow-hidden h-full py-6 pr-6 lg:py-8">
        <div
          className="h-full w-full rounded-[inherit]"
          style={{ overflow: " hidden scroll" }}
        >
          {session?.user.role === "admin" &&
            (admin ? (
              <Button
                variant="default"
                className="w-full"
                onClick={() => changeAdmin(false)}
              >
                Скрыть админ панель
              </Button>
            ) : (
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => changeAdmin(true)}
              >
                Показать админ панель
              </Button>
            ))}
          {loading ? (
            <h3>Loading...</h3>
          ) : (
            posts.map((post: any) => {
              const isActive = activeLink(post.id, pathname, callbackUrl);
              return (
                <li key={post.id}>
                  <Link
                    href={`/stage${stage}/${post.id}`}
                    className={
                      isActive
                        ? buttonVariants({ variant: "navActive" }) + " link"
                        : buttonVariants({ variant: "nav" }) + " link"
                    }
                  >
                    {post.title}
                  </Link>
                  {session?.user.role === "admin" && admin && (
                    <div className="mt-2 flex flex-col gap-2">
                      <Link
                        href={`/stage${stage}/${post.id}/edit`}
                        className={buttonVariants({ variant: "secondary" })}
                      >
                        Редактировать
                      </Link>
                      <form
                        className="flex"
                        action={removePost.bind(null, post.id, stage)}
                      >
                        <DeletePostButton stage={stage} />
                      </form>
                    </div>
                  )}
                </li>
              );
            })
          )}
          {session?.user.role === "admin" && (
            <Link
              href={`/stage${stage}/new`}
              className={buttonVariants({ variant: "secondary" })}
            >
              Добавить тему
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
};
