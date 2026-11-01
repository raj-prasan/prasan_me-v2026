/**
 * Portfolio content. Edit this file to update copy, projects, and links.
 *
 * Facts come from the previous site (prasan.tech) and public GitHub repos.
 * Do not add employers, awards, metrics, or grades that are not listed here.
 *
 * TODOs for Prasan:
 * - Experience rows have no dates in the source data. Add `years` when you want them shown.
 * - Posts and the Now page lived in the database and were not in the repo, so they are not on this page.
 * - toolkit-cli has no README; the description is the one from the previous site.
 * - KoLLaM is featured because it was on the previous site. The GitHub repo is a fork.
 * - Phone number is intentionally omitted.
 */

export const profile = {
  name: "Prasan Raj",
  handle: "raj-prasan",
  role: "Full-stack developer",
  site: "https://prasan.tech",
  siteLabel: "prasan.tech",
  email: "rajprasanj@gmail.com",
  github: "https://github.com/raj-prasan",
  linkedin: "https://linkedin.com/in/prasan-raj",
  location: "Assam, India",
  headline: ["I build", "systems", "that hold"],
  description:
    "Prasan Raj is a full-stack developer studying B.Tech Computer Science and Engineering at Tezpur University. He builds modern, secure web applications.",
} as const

export const hero = {
  eyebrow: "Full-stack developer · Tezpur University",
  lede: "B.Tech CSE, Tezpur University. Assam, India. 2024–2028.",
  scroll: "Scroll to follow the thread",
} as const

export const about = {
  pull: "Modern, secure, high-performance web software. Built to stay understandable.",
  paragraphs: [
    "I'm a full-stack developer. I care about applications that stay fast, secure, and aligned with practices that still hold after the demo is over.",
    "The person I keep coming back to is Linus Torvalds: a pragmatic, iterative way of building software. Learn the system in front of you, then make the next version simpler and more reliable.",
  ],
  education: {
    school: "Tezpur University",
    degree: "B.Tech, Computer Science & Engineering",
    years: "2024–2028",
    place: "Assam, India",
  },
} as const

export type ProjectStatus = "wip" | "maintained" | "archived"

export type ProjectLayout = "feature" | "companion" | "wide" | "standard" | "half"

export type Project = {
  title: string
  description: string
  status?: ProjectStatus
  code: string
  live?: string
  tags: string[]
  layout: ProjectLayout
}

export const projects: Project[] = [
  {
    title: "Varya",
    description:
      "Seamless AI support that scales with your team's knowledge. Chat, voice, and human handoff grounded in the company knowledge base.",
    status: "maintained",
    code: "https://github.com/raj-prasan/varya",
    live: "https://varya.live",
    tags: ["Next.js", "Convex", "Clerk", "TypeScript"],
    layout: "feature",
  },
  {
    title: "Pukaar",
    description:
      "Real-time crowdsourced disaster response, hyper-local relief coordination, and SOS dispatch. Built for TEZHACK 2026.",
    code: "https://github.com/raj-prasan/pukaar",
    live: "https://pukaar-web.vercel.app",
    tags: ["Next.js", "React Native", "Convex", "Clerk"],
    layout: "companion",
  },
  {
    title: "Social Studio",
    description:
      "Flyrank capstone. An AI studio that turns long-form writing into platform-specific posts for X, LinkedIn, and Instagram.",
    code: "https://github.com/raj-prasan/flyrank-capstone-social-studio",
    tags: ["React", "Express", "Redis", "Postgres"],
    layout: "wide",
  },
  {
    title: "sunoAI",
    description:
      "A secure, AI-powered journaling platform for understanding your thoughts and mental well-being.",
    status: "archived",
    code: "https://github.com/raj-prasan/sunoAI",
    live: "https://sunoai-gamma.vercel.app",
    tags: ["Next.js", "Convex", "Groq"],
    layout: "standard",
  },
  {
    title: "docos",
    description:
      "A clean, collaborative, fast document editor inspired by Google Docs, built with modern web technologies.",
    status: "wip",
    code: "https://github.com/raj-prasan/docos",
    tags: ["Next.js", "Liveblocks", "Clerk"],
    layout: "half",
  },
  {
    title: "splitz",
    description:
      "A group expense tracker for shared bills, balances, and settling up. Clean UI for friends and small groups.",
    status: "archived",
    code: "https://github.com/raj-prasan/splitz",
    live: "https://splitzpay.vercel.app",
    tags: ["Next.js", "React"],
    layout: "half",
  },
  {
    title: "KoLLaM",
    description: "AI meets traditional kolam art and sharing.",
    status: "archived",
    code: "https://github.com/raj-prasan/KoLLaM",
    tags: ["Next.js", "Supabase", "GraphQL"],
    layout: "wide",
  },
  {
    title: "toolkit-cli",
    description: "A toolkit CLI for automation and development tasks.",
    status: "wip",
    code: "https://github.com/raj-prasan/toolkit-cli",
    tags: ["Node.js"],
    layout: "standard",
  },
]

export const skillGroups: { title: string; items: string[] }[] = [
  {
    title: "Design",
    items: ["shadcn", "Tailwind"],
  },
  {
    title: "Front-end",
    items: [
      "Accessible HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "CRA",
      "CSS-in-JS",
    ],
  },
  {
    title: "Back-end",
    items: [
      "Node.js",
      "Express",
      "REST & GraphQL APIs",
      "MySQL & PostgreSQL",
      "MongoDB and Mongoose",
      "Prisma",
    ],
  },
  {
    title: "Other",
    items: ["Vercel", "AWS", "Git", "Postman"],
  },
]

export type ExperienceItem = {
  org: string
  kind: string
  detail: string
  href?: string
  /** TODO: add when known. Not shown while empty. */
  years?: string
}

export const experience: ExperienceItem[] = [
  {
    org: "GirlScript Summer of Code",
    kind: "Volunteer",
    detail: "Open source contributor",
  },
  {
    org: "Independent Web Developer",
    kind: "Freelancing",
    detail: "Building modern web apps",
  },
  {
    org: "Flyrank AI",
    kind: "Internship",
    detail: "flyrank.ai",
    href: "https://flyrank.ai/",
  },
]

export const contact = {
  title: ["Let's", "build", "something"],
  body: "If you are looking to connect for a project, write to me.",
} as const

export const nav = [
  { href: "#top", label: "Index" },
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const

export const statusLabel: Record<ProjectStatus, string> = {
  maintained: "Maintained",
  wip: "WIP",
  archived: "Archived",
}
