import type { NextApiRequest, NextApiResponse } from "next";

import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export async function POST(req: any, res: NextApiResponse) {
  const formData = await req.formData();
  console.log(formData);

  const file = formData.get("file");
  const title = formData.get("title").replaceAll(" ", "_");

  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  console.log(file);

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = file.name.replaceAll(" ", "_");
  console.log(filename);
  try {
    await writeFile(
      path.join(process.cwd(), `public/assets/images/post/` + title + filename),
      buffer
    );
    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
}
