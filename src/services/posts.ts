"use server";
import { prisma } from "@/lib/prisma";

export async function getPostById(id: string) {
  return prisma.post.findUnique({
    where: {
      id,
    },
  });
}

export async function getAllPosts(stage: string) {
  return prisma.post.findMany({
    where: {
      stage: {
        contains: stage,
      },
    },
  });
}

export async function getAllPostsBySearch(search: string) {
  return prisma.post.findMany({
    where: {
      body: {
        contains: search,
      },
    },
  });
}
