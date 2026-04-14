"use client"
import Image from "next/image";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ShellSection } from "../ui/shell";
const data: {
  title: string;
  items: { text: string; src?: string }[][];
}[] = [
  {
    title: "Design",
    items: [
      [
        {
          text: "shadcn",
          src: "/memes/figma.jpg",
        },
      ],
      [
        {
          text: "Tailwind",
        },
      ],
    ],
  },
  {
    title: "Front-end",
    items: [
      [{ text: "Accessible HTML" }, { text: "CSS" }],
      [
        {
          text: "JavaScript",
          src: "/memes/javascript.jpg",
        },
        {
          text: "TypeScript",
          src: "/memes/typescript.jpg",
        },
      ],

      [
        {
          text: "React",
          src: "/memes/react.jpg",
        },
        {
          text: "Next.js",
        },
        {
          text: "CRA",
        },
      ],

      [{ text: "CSS-in-JS" }],
    ],
  },
  {
    title: "Back-end",
    items: [
      [{ text: "Node.js" }],
      [{ text: "Express" }],
      [{ text: "REST & GraphQL APIs" }],
      [{ text: "MySQL & PostgreSQL" }],
      [{ text: "MongoDB and Mongoose" }],
      [
        {
          text: "Prisma",
          src: "/memes/prisma.jpg",
        },
      ],
    ],
  },
  {
    title: "Other",
    items: [
      [
        {
          text: "Vercel",
        },
      ],
      [
        {
          text: "AWS",
          src: "/memes/aws.gif",
        },
      ],
      [{ text: "Git" }],
      [{ text: "Postman" }],
    ],
  },
];

export const Skills = () => {
  return (
    <ShellSection index={2}>
      <TooltipProvider>
      <div className="container px-4 mx-auto">
      <h2 className="text-[15px] font-medium">Skills and tools</h2>
      <h4 className="mt-2 ">
        Some of the languages, tools and concepts I have experience with.
      </h4>

      <div className="flex flex-wrap mt-5 -mx-4 group">
        {data.map((field, fieldIndex) => {
          return (
            <div key={fieldIndex} className="w-1/2 px-4 mt-4 lg:w-1/4">
              <div className=" ">
                {field.title}
              </div>
              <ul className="mt-4 space-y-1 text-sm text-gray-600 transition-colors group-hover:text-gray-500">
                {field.items.map((item, itemIndex) => {
                  return (
                    <li key={itemIndex} className="leading-8">
                      {item.map((child, childIndex) => {
                        const prefix =
                          childIndex === 0
                            ? null
                            : item.length > 1 && item.length - 1 === childIndex
                              ? " & "
                              : ", ";

                        return (
                          <React.Fragment key={childIndex}>
                            {prefix}
                            {child.src ? (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="cursor-help underline decoration-dotted underline-offset-4">
                                    {child.text}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent className="p-1" side="top" align="start">
                                  <Image
                                    src={child.src}
                                    alt={child.text}
                                    width={220}
                                    height={130}
                                    className="h-auto w-auto max-w-55 rounded-md"
                                  />
                                </TooltipContent>
                              </Tooltip>
                            ) : (
                              <span>{child.text}</span>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
      </div>
    </TooltipProvider>
    </ShellSection>
    
  );
};
