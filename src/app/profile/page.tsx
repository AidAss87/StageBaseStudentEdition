// app/profile/page.tsx

import authConfig from "@/configs/auth";
import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";
import Link from "next/link";

import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authConfig);

  if (!session) {
    // Если пользователь не авторизован — отправим на вход
    redirect("/signin");
  }

  const { user } = session;

  const favorites = await prisma.favorite.findMany({
    where: {
      userId: user.id,
    },
    include: {
      post: true,
    },
  });

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Мой профиль</h1>
      <div className="space-y-2">
        <p>
          <strong>Имя:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Роль:</strong> {user.role}
        </p>
      </div>
      <h2 className="text-2xl font-bold mt-8 mb-4">Избранное</h2>
      <ul className="space-y-2">
        {favorites.map((fav) => (
          <li key={fav.id}>
            <Link
              href={`/stage${fav.post.stage}/${fav.post.id}`}
              className="text-blue-600 underline"
            >
              {fav.post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
