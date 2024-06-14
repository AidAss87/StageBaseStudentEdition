import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function DELETE(req: Request, { params }: { id: string }) {
  const id = params.id;
  // redirect('/stage1')
  // const headersList = headers()
  // const cookiesList = cookies()
  return NextResponse.json(id);
}
