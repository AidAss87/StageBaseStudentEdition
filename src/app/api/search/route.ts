// import { searchPosts } from "@/app/[stage]/actions";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const query = searchParams.get("q") || "";

//   const posts = await searchPosts(query);
//   return NextResponse.json(posts);
// }

// const user = await prisma.post.findMany({
//   where: {
//     OR: [
//       { title: { contains: query, mode: "insensitive" } },
//       { body: { contains: query, mode: "insensitive" } },
//     ],
//   },
// });

// if (!user) {
//   return NextResponse.json({ error: "Invalid token" }, { status: 400 });
// }

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { value } = reqBody;

    const posts = await prisma.post.findMany({
      where: {
        OR: [{ title: { contains: value } }, { body: { contains: value } }],
      },
    });

    const filteredPosts = posts.map((post) => {
      return { id: post.id, title: post.title, stage: post.stage };
    });

    return NextResponse.json(filteredPosts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // Ensure the Prisma client is disconnected when done
  }
}
