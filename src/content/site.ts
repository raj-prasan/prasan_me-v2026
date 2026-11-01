/**
 * Static UI copy only.
 * Projects, experience, posts, and the Now page are read from Postgres.
 * Phone number is intentionally omitted.
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

export const contact = {
  title: ["Let's", "build", "something"],
  body: "If you are looking to connect for a project, write to me.",
} as const

export const nav = [
  { href: "/#top", label: "Index" },
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#stack", label: "Stack" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
  { href: "/posts", label: "Posts" },
  { href: "/now", label: "Now" },
] as const

export const postsIntro =
  "I built this page to capture and share small updates, ideas, and progress—without overthinking or waiting for something big."

export const nowIntro = {
  before: "Inspired by",
  linkLabel: "nownownow.com",
  href: "https://nownownow.com/",
  after:
    ", this page gives a snapshot of what I'm building, learning, and exploring right now — a simple way to document where I am in life without the noise of constant updates.",
  left: "Make it happen.",
  right: "Driven by curiosity.",
  mapLabel: "Tezpur, Assam",
  mapHref:
    "https://www.openstreetmap.org/?mlat=26.69961&mlon=92.83507#map=14/26.69961/92.83507",
} as const

/** Labels for the Status enum stored on Project. */
export const statusLabel = {
  maintained: "Maintained",
  wip: "WIP",
  archived: "Archived",
} as const
