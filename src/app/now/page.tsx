import type { Metadata } from "next"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Footer } from "@/components/footer"
import { nowIntro } from "@/content/site"

export const metadata: Metadata = {
  title: "Now",
  description:
    "A snapshot of what Prasan Raj is building, learning, and exploring right now.",
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date)
}

export default async function NowPage() {
  const allNow = await prisma.now.findMany()
  const updateDate = await prisma.lastUpdated.findFirst()

  return (
    <main id="content">
      <section className="section page-top">
        <div className="wrap">
          <Link className="eyebrow" href="/">
            Index
          </Link>
          <h1 className="font-display page-title" data-thread="section">
            Now
          </h1>
          <p className="contact-body">
            {nowIntro.before}{" "}
            <a href={nowIntro.href} target="_blank" rel="noreferrer noopener">
              {nowIntro.linkLabel}
            </a>
            {nowIntro.after}
          </p>
          {updateDate ? (
            <p className="eyebrow" style={{ marginTop: "1.5rem" }}>
              <time dateTime={updateDate.lastUpdate.toISOString()}>
                Updated {formatDate(updateDate.lastUpdate)}
              </time>
            </p>
          ) : null}
        </div>
      </section>
      {allNow.map((entry, index) => (
        <section className="section" style={{ paddingTop: 0 }} key={entry.id}>
          <div className="wrap">
            <h2 className="font-display section-heading" data-thread="section">
              <span className="section-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="section-label">{entry.title}</span>
            </h2>
            <ul className="now-list">
              {entry.contents.map((content) => (
                <li key={content}>{content}</li>
              ))}
            </ul>
          </div>
        </section>
      ))}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="contact-links">
            <a href={nowIntro.mapHref} target="_blank" rel="noreferrer noopener">
              {nowIntro.mapLabel}
            </a>
          </p>
          <div className="now-signoff">
            <span>{nowIntro.left}</span>
            <span>{nowIntro.right}</span>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
