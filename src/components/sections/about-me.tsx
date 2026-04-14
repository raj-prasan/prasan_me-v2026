"use client";

import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Newsreader } from "next/font/google";

const newsreader = Newsreader({
  style: "italic",
  subsets: ["latin"],
});

export function AboutMe() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="prose prose-zinc dark:prose-invert text-[15px] animate-slide-from-down-and-fade-2 text-pretty">
        <p className="leading-relaxed">
          I&#39;m a{" "}
          <span
            className={cn(
              "font-medium font-reader text-[16px] text-foreground",
              newsreader.className,
            )}
          >
            Full-Stack Developer
          </span>{" "}
          dedicated to crafting modern, secure, and high-performance web
          applications that align with industry best practices.
        </p>
        <p className="leading-relaxed py-10">
          Inspired by{" "}
          <span className="italic hover:underline underline-offset-4">
            Linus Torvalds,{" "}
          </span>
          I strive for continuous learning and improvement, always seeking better,
          more efficient ways to refine my skills and build reliable systems.
        </p>
      </section>
    );
  }

  return (
    <section className="prose prose-zinc dark:prose-invert text-[15px] animate-slide-from-down-and-fade-2 text-pretty">
      <p className="leading-relaxed">
        I&#39;m a{" "}
        <span
          className={cn(
            "font-medium font-reader text-[16px] text-foreground",
            newsreader.className,
          )}
        >
          Full-Stack Developer
        </span>{" "}
        dedicated to crafting modern, secure, and high-performance web
        applications that align with industry best practices.
      </p>
      <p className="leading-relaxed py-10">
        Inspired by{" "}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="italic hover:underline underline-offset-4">
                Linus Torvalds,{" "}
              </span>
            </TooltipTrigger>
            <TooltipContent align="start">
              <span className="italic prose prose-zinc dark:prose-invert text-sm">
                (n.) pragmatic, iterative approach to building software
              </span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>{" "}
        I strive for continuous learning and improvement, always seeking better,
        more efficient ways to refine my skills and build reliable systems.
      </p>
    </section>
  );
}