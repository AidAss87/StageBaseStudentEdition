"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { User } from "@/types/user";
import { redirect } from "next/navigation";

import bcrypt from "bcrypt";
import { sendEmail } from "@/helpers/mailer";

export async function createUser(data: FormData) {
  try {
    const entries = Object.fromEntries(data.entries());
    const { name, email, pass }: { name: string; email: string; pass: string } =
      {
        name: entries.name as string,
        email: entries.email as string,
        pass: entries.pass as string,
      };

    // Проверка, существует ли пользователь с таким именем
    const existingUser = await prisma.user.findUnique({
      where: { name },
    });
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        status: "error",
        message: "User with this name already exists",
      };
    }
    if (existingEmail) {
      return {
        status: "error",
        message: "User with this email already exists",
      };
    }

    // Хэшируем пароль перед сохранением
    const hashedPassword = await bcrypt.hash(pass, 10);

    // Создание нового пользователя
    await prisma.user.create({
      data: {
        name,
        email,
        pass: hashedPassword,
      },
    });
    const currentUser = await prisma.user.findUnique({
      where: { name },
    });
    if (currentUser) {
      sendEmail({
        email: email,
        emailType: "VERIFY",
        id: currentUser.id,
      });
      return { status: "success" };
    } else {
      throw new Error("Пользователь не добавлен");
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      status: "error",
      message: "An error occurred while creating the user",
    };
  }
}
export async function updateUser(id: string, role: User["role"]) {
  await prisma.user.update({
    where: {
      id,
    },
    data: {
      role,
    },
  });
  revalidatePath(`/users`, "layout");
}
export async function removeUser(id: string) {
  await prisma.user.delete({
    where: {
      id,
    },
  });
  revalidatePath(`/users`, "layout");
  return { success: true };
}
