import { prisma } from "@/lib/prisma";

export async function getProjects(){
  const projectsData = await prisma.project.findMany({
    orderBy:{
      updated_at: "desc"
    }
  });
  return projectsData;
}
