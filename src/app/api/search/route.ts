import { JSDOM } from "jsdom";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

function extractHeadings(html: string): string {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const headings = document.querySelectorAll("h1, h2, h3"); // Берём только заголовки
  return (
    Array.from(headings)
      .map((h) => h.textContent?.trim())
      .join(" ") || ""
  );
}

// Функция для извлечения контекста вокруг найденного слова
function getContext(
  text: string,
  searchTerm: string,
  charsBefore = 30,
  charsAfter = 30
): string | null {
  const index = text.toLowerCase().indexOf(searchTerm.toLowerCase());
  if (index === -1) return null; // Если не найдено — возвращаем null

  const start = Math.max(0, index - charsBefore);
  const end = Math.min(text.length, index + searchTerm.length + charsAfter);

  return `...${text.slice(start, end)}...`;
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { value } = reqBody;

    const posts = await prisma.post.findMany(); // Загружаем все статьи

    const filteredPosts = posts
      .map((post) => {
        const headingsText = extractHeadings(post.body); // Извлекаем заголовки
        const foundInTitle = post.title
          .toLowerCase()
          .includes(value.toLowerCase());
        const foundInHeadings = headingsText
          .toLowerCase()
          .includes(value.toLowerCase());

        if (!foundInTitle && !foundInHeadings) return null; // Если не найдено — пропускаем

        return {
          id: post.id,
          title: post.title,
          stage: post.stage,
          contextBody: foundInHeadings ? getContext(headingsText, value) : null, // Извлекаем контекст
        };
      })
      .filter(Boolean); // Убираем null-значения

    return NextResponse.json(filteredPosts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
