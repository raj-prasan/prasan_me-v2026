import { ShellSection } from "@/components/ui/shell";
import Post from "./post";
import { prisma } from "@/lib/prisma";

const PostsPage = async() => {
  const postData = await prisma.post.findMany();
  return ( 
    <div>
      <section className="prose prose-zinc dark:prose-invert text-[15px] animate-slide-from-down-and-fade-2 text-pretty items-center gap-8 container py-3 md:py-4 space-y-12">
        <p className="leading relaxed">
          I built this page to capture and share small updates, ideas, and progress—without overthinking or waiting for something big.
        </p>
      </section>
      <ShellSection index={2} title="POSTS" foreground>
        <div className="flex flex-col gap-6">
          {postData.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              image={post.image ?? undefined}
              createdAt={post.createdAt.toISOString()}
              tags={post.tags}
            />
          ))}
        </div>
      </ShellSection>
    </div>
   );
}
 
export default PostsPage;