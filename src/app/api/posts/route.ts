import { prisma } from "@/lib/prisma";

export async function GET() {
  const postsData = await prisma.post.findMany();

  return Response.json({data:postsData});
}