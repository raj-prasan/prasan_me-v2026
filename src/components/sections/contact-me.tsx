import { ShellSection } from "@/components/ui/shell";
import Link from "next/link";
import { ThemeToggle } from "../ui/change-theme";
export function ContactMe() {
  return (
    <ShellSection index={5} title="Connect">
      <div className="prose prose-zinc dark:prose-invert text-[15px]">
        <p>
          If you're looking to connect for a project, feel free to reach out via{" "}
          <CustomLink href="mailto:rajprasanj@gmail.com?subject=Hi%2C%20Prasan!">
            Email
          </CustomLink>
          . You can also follow me on{" "}
          <CustomLink href="https://github.com/raj-prasan">Github</CustomLink>{" "}
          and{" "}
          <CustomLink href="https://www.linkedin.com/in/prasan-raj/">
            LinkedIn
          </CustomLink>{" "}
          if you find my work interesting.
        </p>
      </div>
      <hr className="my-8"></hr>
      <div className="mt-3 flex items-center justify-center gap-3">
        <div className="text-center text-sm text-zinc-800 dark:text-zinc-500">
          © 2026. All rights reserved.
        </div>
        <ThemeToggle />
      </div>
    </ShellSection>
  );
}

interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
}

export function CustomLink({ href, children }: CustomLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className="prose prose-zinc dark:prose-invert underline-offset-4 text-[15px]  border-b border-dashed border-neutral-700 no-underline pb-[1.4px] hover:border-solid "
    >
      {children}
    </Link>
  );
}
