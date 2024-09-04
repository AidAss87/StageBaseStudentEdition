"use server";
import { prisma } from "@/lib/prisma";

export async function getAllUsers() {
  return prisma.user.findMany({});
}
