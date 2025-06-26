"use server";

import authConfig from "@/configs/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function addFavorite(postId: string, userId: string) {
  try {
    await prisma.favorite.create({
      data: {
        postId,
        userId,
      },
    });
  } catch (error) {
    console.log(error);

    // уже есть — игнорируем
  }
}

export async function removeFavorite(postId: string, id: any) {
  const session = await getServerSession(authConfig);
  if (!session) throw new Error("Unauthorized");

  await prisma.favorite.deleteMany({
    where: {
      postId,
      userId: session.user.id,
    },
  });
}
