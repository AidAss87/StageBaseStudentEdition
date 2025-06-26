// components/FavoriteToggle.tsx
"use client";
import { useTransition } from "react";
import { addFavorite, removeFavorite } from "@/app/[stage]/actions";

export function FavoriteToggle({
  postId,
  isFav,
  onToggle,
}: {
  postId: string;
  isFav: boolean;
  onToggle?: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("postId", postId);

      if (isFav) {
        await removeFavorite(formData);
      } else {
        await addFavorite(formData);
      }

      onToggle?.(); // Обновить клиентский стейт (например, через fetch)
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`text-xl ${isFav ? "text-yellow-400" : "text-gray-400"}`}
      aria-label={isFav ? "Удалить из избранного" : "Добавить в избранное"}
    >
      {isFav ? "★" : "☆"}
    </button>
  );
}
