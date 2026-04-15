import { cn } from "@/lib/utils";
import { Newsreader } from "next/font/google";
import Link from "next/link";
import { CustomLink } from "@/components/sections/contact-me";
import { now } from "@/lib/constants";
import { ShellSection } from "@/components/ui/shell";
import { MinimalMap } from "@/components/ui/minimal-map";
export interface NowProps {
  title: string
  contents: string[]
}
const newsreader = Newsreader({
  style: "italic",
  subsets: ["latin"],
});

const Now = () => {
  return (
    <section className="prose prose-zinc dark:prose-invert text-[15px] animate-slide-from-down-and-fade-2 text-pretty items-center gap-8 container py-3 md:py-4 space-y-12">
      <p className="leading-relaxed">
        Inspired by{" "}
        <span
          className={cn(
            "font-medium font-reader text-[16px] text-foreground",
            newsreader.className,
          )}
        >
          <CustomLink href={"https://nownownow.com/"} >
          nownownow.com
          </CustomLink>
           
        </span>
        , this page gives a snapshot of what I'm building,
        learning, and exploring right now — a simple way to document where I am
        in life without the noise of constant updates.
      </p>
      {
        now.map((n,index)=>{
          return(
            <ShellSection index={index} title={n.title} key={index} foreground={true}>
              {n.contents.map((content,index)=>{
                return(
                  <div className="leading-relaxed px-6 my-7" key={index}>
                    <span className="text-zinc-300 dark:text-zinc-700">-</span>
                    <p className="inline leading-relaxed text-zinc-500 dark:text-zinc-300">{content}</p>
                  </div>
                )
              })}
            </ShellSection>
          )
        })
      }
      <MinimalMap/>
    </section>
  );
};

export default Now;
