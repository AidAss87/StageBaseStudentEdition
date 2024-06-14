"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";

export async function createPost(data: FormData) {
  const { title, body } = Object.fromEntries(data);

//   redirect("/stage1/...", "push");
}

export async function updatePost(data: FormData) {
    const { title, body, id } = Object.fromEntries(data);
    
    revalidatePath(`/stage1/...`)
  //   redirect("/stage1/...", "push");
}

export async function removePost(data: FormData) {
  const { title, body, id } = Object.fromEntries(data);

  revalidatePath(`/stage1/...`);
  //   redirect("/stage1/...", "push");
}