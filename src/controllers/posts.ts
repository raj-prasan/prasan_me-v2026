import { prisma } from "@/lib/prisma"

async function getPosts(){
  const postData = await prisma.post.findMany();
  return postData;
}
export default getPosts;



