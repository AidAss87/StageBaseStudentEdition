"use client";
import Link from "next/link";

import { useAdmin, usePosts } from "@/store";
import { shallow } from "zustand/shallow";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { usePathname, useSearchParams } from "next/navigation";
import { activeLink } from "@/services/activeRoute";
import { useSession } from "next-auth/react";
import { DeletePostButton } from "./DeletePostButton";
import { addFavorite, removeFavorite } from "@/features/api/favorites/action";

export const TitleAside = ({ stage }: { stage: string }) => {
  const [posts, loading, getAllPosts] = usePosts(
    (state) => [state.posts, state.loading, state.getAllPosts],
    shallow
  );

  const [admin, changeAdmin] = useAdmin(
    (state) => [state.admin, state.changeAdmin],
    shallow
  );

  const { data: session } = useSession();

  // Избранное - массив postId
  const [favorites, setFavorites] = useState<string[]>([]);

  // Загружаем избранное при монтировании и смене сессии
  useEffect(() => {
    if (!session) return;
    fetch("/api/favorites")
      .then((res) => res.json())
      .then((data) => setFavorites(data.map((fav: any) => fav.postId)));
  }, [session]);

  useEffect(() => {
    getAllPosts(stage);
  }, [getAllPosts, stage]);

  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Обновить избранное после формы - можно добавить так, или через mutate
  const refreshFavorites = () => {
    if (!session) return;
    fetch("/api/favorites")
      .then((res) => res.json())
      .then((data) => setFavorites(data.map((fav: any) => fav.postId)));
  };

  return (
    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-1/5 shrink-0 md:sticky md:block">
      <div className="relative overflow-hidden h-full py-6 pr-6 lg:py-8">
        <div
          className="h-full w-full rounded-[inherit]"
          style={{ overflow: " hidden scroll" }}
        >
          <input
            type="text"
            placeholder="Поиск по темам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
            filteredPosts.map((post: any) => {
              const isActive = activeLink(post.id, pathname, callbackUrl);
              const isFav = favorites.includes(post.id);

              return (
                <li key={post.id} className="flex items-center justify-between">
                  <Link
                    href={`/stage${stage}/${post.id}`}
                    className={
                      isActive
                        ? buttonVariants({ variant: "navActive" }) +
                          " link flex-grow"
                        : buttonVariants({ variant: "nav" }) + " link flex-grow"
                    }
                  >
                    {post.title}
                  </Link>

                  {session && (
                    <div className="ml-2 flex gap-2">
                      {isFav ? (
                        <div>
                          <input type="hidden" name="postId" value={post.id} />
                          <button
                            onClick={async () => {
                              console.log(post.id, session.user);
                              await removeFavorite(post.id, session.user.id);
                            }}
                            type="submit"
                            className="text-gray-400 text-xl"
                            aria-label="Добавить в избранное"
                          >
                            ☆
                          </button>
                        </div>
                      ) : (
                        <div>
                          <button
                            onClick={async () => {
                              console.log(post.id, session.user);
                              await addFavorite(post.id, session.user.id);
                            }}
                            type="submit"
                            className="text-gray-400 text-xl"
                            aria-label="Добавить в избранное"
                          >
                            ☆
                          </button>
                        </div>
                      )}
                    </div>
                  )}

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
