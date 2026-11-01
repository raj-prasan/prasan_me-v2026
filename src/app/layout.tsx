import type { Metadata, Viewport } from "next"
import { Barlow_Condensed, Geist_Mono } from "next/font/google"
import { Header } from "@/components/header"
import { Thread } from "@/components/thread"
import { Cursor } from "@/components/cursor"
import { SmoothScroll } from "@/components/smooth-scroll"
import { profile } from "@/content/site"
import "./globals.css"

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display-family",
  display: "swap",
  adjustFontFallback: true,
})

const mono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-family",
  display: "swap",
  adjustFontFallback: true,
})

export const viewport: Viewport = {
  themeColor: "#0c0c0b",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: {
    default: "Prasan Raj — I build systems that hold",
    template: "%s — Prasan Raj",
  },
  description: profile.description,
  applicationName: "Prasan Raj",
  authors: [{ name: profile.name, url: profile.site }],
  creator: profile.name,
  keywords: [
    "Prasan Raj",
    "prasan raj",
    "prasan raj portfolio",
    "prasan raj github",
    "raj-prasan",
    "prasan tezpur university",
    "full stack developer",
    "software developer",
    "Tezpur University",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: profile.site,
    title: "Prasan Raj — I build systems that hold",
    description: profile.description,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Prasan Raj — I build systems that hold",
    description: profile.description,
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: profile.site,
  email: profile.email,
  jobTitle: "Software Developer",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Assam",
    addressCountry: "India",
  },
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "Tezpur University",
  },
  sameAs: [profile.github, profile.linkedin],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>
        <a className="skip" href="#content">
          Skip to content
        </a>
        <div className="grain" aria-hidden="true" />
        <Header />
        <Thread />
        <SmoothScroll />
        <Cursor />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
