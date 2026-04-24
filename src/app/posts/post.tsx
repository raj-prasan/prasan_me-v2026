import { Button } from "@/components/ui/button"
import LastUpdated from "@/components/ui/last-updated"
import Image from "next/image"

export interface PostProps{
  id: string
  title: string
  content: string
  image?: string
  createdAt: string
  tags? : string[]
}
const Post = ({id,title,content,image,createdAt,tags}: PostProps) => {
  const newDate = new Date(createdAt);
  return (  
    
    <div className="my-2">
      <div className="flex flex-row gap-4">
        <div className="shrink-0 mt-1">
          <Image alt="profile picture" src="/https://res.cloudinary.com/dby6qs2rb/image/upload/v1777048427/IMG-20250217-WA0003_1_tch3g5.jpg" height={40} width={40} className="rounded-md" />
        </div>
        
        <div className="flex flex-col flex-1">
          <div className="flex flex-row gap-3 items-center">
            <p className="font-bold text-md inline">Prasan Raj</p>
            <LastUpdated date={newDate} className="mt-0 text-sm font-[family-name:var(--font-pixelify-sans)]"/>
          </div>
          
          <div className="flex flex-col">
            <div className="text-[hsl(var(--foreground))] transition-colors hover:text-emerald-200 font-semibold text-medium py-3">{title}</div>
            <p className="text-[hsl(var(--muted-foreground))]">{content}</p>
          </div>
          
          {image ? (
            <div className="mt-4">
              <img alt={title} src={image} className="rounded-lg w-full h-80 object-cover" />
            </div>
          ) : null}
          
          <div className="font-[family-name:var(--font-pixelify-sans)] flex items-center text-md mt-4 text-[hsl(var(--muted-foreground))] justify-between">
            <div>
              {tags?.map((tag,index)=>(
                <span key={index} className="mr-2">{tag}</span>
              ))}
            </div>
            <Button size="sm" className="mt-0">
              Share
            </Button>
          </div>
        </div>
      </div>

      <hr className="mt-5"></hr>
    </div>
  );
}
 
export default Post;