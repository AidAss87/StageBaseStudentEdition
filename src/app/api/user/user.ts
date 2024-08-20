"use server";

import { prisma } from "@/lib/prisma"; // Убедитесь, что Prisma Client настроен
import { redirect } from "next/navigation";

type User = {
  name: string;
  role: string;
  pass: string;
};

export async function createUser(data: FormData) {
  const { name, role, pass } = Object.fromEntries(data);

  // Проверка, существует ли пользователь с таким email
  const existingUser = await prisma.user.findUnique({
    where: { name },
  });

  if (existingUser) {
    return "User with this name already exists";
  }
  const post = await prisma.user.create({
    data: {
      name,
      role,
      pass,
    },
  });

  redirect(`/`);
}
