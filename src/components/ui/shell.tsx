import { cn } from "@/lib/utils"

export function ShellSection({
  className,
  children,
  index,
  title,
  foreground = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { index: number } & {foreground?: boolean})  {
  return (
    <section
      className={cn(
        `animate-slide-from-down-and-fade-${index} space-y-4 text-sm`,
        className
      )}
      {...props}
    >
      <h3 className={cn("font-medium text-[16px]", { "text-zinc-500": foreground })}>
        {title}
      </h3>
      {children}
    </section>
  )
}
