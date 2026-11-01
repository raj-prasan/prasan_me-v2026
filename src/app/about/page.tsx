import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "About",
  description: "About Prasan Raj.",
}

export default function AboutPage() {
  return (
    <main id="content">
      <section className="section page-top">
        <div className="wrap">
          <Link className="eyebrow" href="/#about">
            Index
          </Link>
          <h1 className="font-display page-title">About</h1>
          <p className="contact-body">Coming soon…</p>
        </div>
      </section>
      <Footer />
    </main>
  )
}
