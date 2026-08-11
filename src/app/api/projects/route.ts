import { prisma } from "@/lib/prisma";

export async function GET() {
  const projectsData = await prisma.project.findMany();

  return Response.json({data:projectsData});
}