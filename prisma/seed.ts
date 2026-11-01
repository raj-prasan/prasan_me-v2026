/**
 * Local development seed only.
 * Refuses to run unless DATABASE_URL points at localhost.
 * Rows are sample data for screenshots and local UI, not a production dump.
 */
import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../generated/prisma/client"

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  console.error("DATABASE_URL is not set. Copy .env.example to .env first.")
  process.exit(1)
}

const hostname = new URL(databaseUrl).hostname
if (hostname !== "localhost" && hostname !== "127.0.0.1") {
  console.error(`Refusing to seed non-local database host "${hostname}".`)
  process.exit(1)
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
})

async function main() {
  await prisma.post.deleteMany()
  await prisma.project.deleteMany()
  await prisma.workExperience.deleteMany()
  await prisma.now.deleteMany()
  await prisma.lastUpdated.deleteMany()

  // Insert oldest first so id desc matches the previous site's order.
  await prisma.workExperience.create({
    data: {
      title: "Flyrank AI",
      href: "https://flyrank.ai/",
      buttonText: "Flyrank AI",
      status: "Internship",
    },
  })
  await prisma.workExperience.create({
    data: {
      title: "Independent Web Developer",
      href: "",
      buttonText: "Building Modern Web Apps",
      status: "freelancing",
    },
  })
  await prisma.workExperience.create({
    data: {
      title: "GirlScript Summer of Code",
      href: "",
      buttonText: "Open Source Contributor",
      status: "volunteer",
    },
  })

  const projects = [
    {
      title: "toolkit-cli",
      description: "A toolkit CLI for automation and development tasks.",
      href: "https://github.com/raj-prasan/toolkit-cli",
      status: "wip" as const,
      updated_at: new Date("2026-04-11T00:59:12Z"),
    },
    {
      title: "splitz",
      description: "A group expense tracker for shared bills, balances, and settling up.",
      href: "https://github.com/raj-prasan/splitz",
      status: "archived" as const,
      updated_at: new Date("2026-01-07T19:04:31Z"),
    },
    {
      title: "docos",
      description:
        "A clean, collaborative, fast document editor inspired by Google Docs.",
      href: "https://github.com/raj-prasan/docos",
      status: "wip" as const,
      updated_at: new Date("2026-02-01T05:26:58Z"),
    },
    {
      title: "KoLLaM",
      description: "AI meets traditional kolam art and sharing.",
      href: "https://github.com/raj-prasan/KoLLaM",
      status: "archived" as const,
      updated_at: new Date("2026-03-15T14:13:07Z"),
    },
    {
      title: "sunoAI",
      description: "AI journaling platform for mental well-being.",
      href: "https://github.com/raj-prasan/sunoAI",
      status: "archived" as const,
      updated_at: new Date("2026-05-09T17:39:03Z"),
    },
    {
      title: "Varya",
      description: "Seamless AI support that scales with your team's knowledge.",
      href: "https://varya.live",
      status: "maintained" as const,
      updated_at: new Date("2026-08-21T10:51:54Z"),
    },
  ]

  for (const project of projects) {
    await prisma.project.create({ data: project })
  }

  await prisma.post.create({
    data: {
      title: "Sample note",
      content:
        "Local sample post. This row is not from production. Short updates on the posts page are stored in the Post table.",
      tags: ["sample"],
      createdAt: new Date("2026-08-02T12:00:00Z"),
    },
  })
  await prisma.post.create({
    data: {
      title: "Sample: where projects come from",
      content:
        "Local sample post. Homepage project cards read title, description, link, and status from Postgres.",
      tags: ["sample", "projects"],
      createdAt: new Date("2026-10-18T09:30:00Z"),
    },
  })

  await prisma.now.create({
    data: {
      id: "building",
      title: "Building",
      contents: [
        "Sample row: the homepage, reading projects and experience from Postgres.",
        "Sample row: posts and this Now page, on the same database.",
      ],
    },
  })
  await prisma.now.create({
    data: {
      id: "learning",
      title: "Learning",
      contents: [
        "Sample row: Next.js, TypeScript, and Postgres, the same stack as the site.",
      ],
    },
  })

  await prisma.lastUpdated.create({
    data: { lastUpdate: new Date("2026-10-29T03:35:00Z") },
  })

  console.log("Seeded local sample rows into", hostname)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
