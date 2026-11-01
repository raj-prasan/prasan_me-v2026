import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page is not on prasan.tech.",
}

export default function NotFound() {
  return (
    <main id="content" className="not-found">
      <div className="wrap">
        <p className="eyebrow">404</p>
        <h1 className="font-display">
          Lost the
          <br />
          thread<span className="accent">.</span>
        </h1>
        <p>That page is not here. The work still is.</p>
        <p>
          <Link href="/">Back to the index</Link>
        </p>
      </div>
    </main>
  )
}
