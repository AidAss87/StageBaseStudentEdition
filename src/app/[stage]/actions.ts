"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type Post = {
  title: string;
  body: string;
  id: string;
  stage: string;
};

export async function createPost(data: FormData) {
  const { title, body, stage, ...images } = Object.fromEntries(data) as Omit<
    Post,
    "id"
  >;

  const post = await prisma.post.create({
    data: {
      title,
      body,
      stage,
    },
  });
  revalidatePath(`/stage${stage}`, "layout");
  redirect(`/stage${stage}/${post.id}`);
}

export async function updatePost(data: FormData) {
  const { title, body, id, stage, ...images } = Object.fromEntries(data) as any;
  console.log(images);
  if (images) {
    for (let image in images) {
      console.log(image);
      const formData = new FormData();
      formData.append("title", title);
      formData.append(`file`, data.get(image));

      upladeImage(formData);
    }
  }

  const post = await prisma.post.update({
    where: {
      id,
    },
    data: {
      title,
      body,
      stage,
    },
  });
  revalidatePath(`/stage${stage}`, "layout");
  revalidatePath(`/stage${stage}/${post.id}`);
  redirect(`/stage${stage}/${post.id}`);
}

export async function removePost(id: string, stage: string) {
  await prisma.post.delete({
    where: {
      id,
    },
  });

  revalidatePath(`/stage${stage}`, "layout");
  redirect(`/stage${stage}`);
}


async function upladeImage(data: FormData) {
  console.log("work");
  try {
    const response = await fetch("http://localhost:3000/api/edit", {
      method: "POST",
      body: data,
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error uploading images:", error);
  }
}
