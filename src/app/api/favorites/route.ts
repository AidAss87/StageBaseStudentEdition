// app/api/favorites/route.ts
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authConfig from "@/configs/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authConfig);
  if (!session) return NextResponse.json([], { status: 401 });

  const favorites = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    select: { postId: true },
  });

  return NextResponse.json(favorites);
}
