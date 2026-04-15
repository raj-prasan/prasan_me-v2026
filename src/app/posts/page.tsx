import { ShellSection } from "@/components/ui/shell";
import Post from "./post";
import { PostData } from "@/lib/constants";

const PostsPage = () => {
  return ( 
    <div>
      <section className="prose prose-zinc dark:prose-invert text-[15px] animate-slide-from-down-and-fade-2 text-pretty pb-6">
        <p className="leading relaxed">
          I built this page to capture and share small updates, ideas, and progress—without overthinking or waiting for something big.
        </p>
      </section>
      <ShellSection index={2} title="POSTS" foreground>
        <div className="flex flex-col gap-6">
          {PostData.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              image={post.image}
              createdAt={post.createdAt}
              tags={post.tags}
            />
          ))}
        </div>
      </ShellSection>
    </div>
   );
}
 
export default PostsPage;