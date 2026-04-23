"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

const pages: { name: string; href: string }[] = [
  {
    name: "[/]",
    href: "/",
  },
  {
    name: "[/about]",
    href: "/about",
  },
  {
    name: "[/posts]",
    href: "/posts",
  },
  {
    name: "[now]",
    href: "/now",
  },
];

const Pages = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-row gap-3.5">
      {pages.map((page, index) => (
        <Link
          key={index}
          href={page.href}
          aria-current={pathname === page.href ? "page" : undefined}
          className={cn(
            "transition-colors hover:text-zinc-950 dark:hover:text-zinc-300",
            pathname === page.href
              ? "text-emerald-600 dark:text-emerald-400 font-medium"
              : "text-zinc-800 dark:text-zinc-500",
          )}
        >
          {page.name}
        </Link>
      ))}
    </div>
  );
};

export default Pages;
