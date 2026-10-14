import { buttonVariants } from "../ui/button";
import { ShellSection } from "../ui/shell";
import Link from "next/link";
import { cn } from "@/lib/utils"
import { prisma } from "@/lib/prisma";

export interface WorkProps {
  href: string
  title: string
  status?: "freelancing" | "contract"
  buttonText?: string
}

function displayText(value: string | null | undefined) {
  return value?.trim() ?? ""
}

export async function WorkExperience(){
  const workExperience = await prisma.workExperience.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return ( 
    <ShellSection index={2} title="Experience">
      {workExperience.map((work) => {
        const title = displayText(work.title)
        const status = displayText(work.status)
        const href = displayText(work.href)
        const buttonText = displayText(work.buttonText)
        const labelDuplicatesTitle =
          buttonText.length > 0 &&
          buttonText.localeCompare(title, undefined, { sensitivity: "accent" }) === 0
        // A repeated company name is not a second label. Keep the link when
        // the row still has a real URL, using the existing fallback text.
        const pillLabel = labelDuplicatesTitle
          ? href
            ? "View Details"
            : ""
          : buttonText
        const pillClassName = buttonVariants({
          variant: "outline",
          size: "xs",
          className: "text-xs text-muted-foreground",
        })

        return (
          <div
            key={work.id}
            className={cn(
              "w-full justify-between items-center flex border-input"
            )}
          >
            <div className="flex items-center space-x-2">
              <span className="text-[15px] leading-4">{title}</span>
              {status ? (
                <div className="inline-flex items-center rounded-full border border-input px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-xs font-normal text-muted-foreground">
                  {status}
                </div>
              ) : null}
            </div>
            {pillLabel ? (
              href ? (
                <Link href={href} className={pillClassName}>
                  {pillLabel}
                </Link>
              ) : (
                <span className={pillClassName}>{pillLabel}</span>
              )
            ) : null}
          </div>
        )
      })}
    </ShellSection>
   );
}
