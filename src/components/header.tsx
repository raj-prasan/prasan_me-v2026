"use client"

import { useEffect, useId, useRef, useState } from "react"
import Link from "next/link"
import { nav, profile } from "@/content/site"
import { getLenis } from "@/lib/lenis-store"

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 12
      setScrolled((prev) => (prev === next ? prev : next))
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle("menu-open", open)
    const lenis = getLenis()
    if (open) {
      lenis?.stop()
      const first = dialogRef.current?.querySelector<HTMLElement>(".menu-list a")
      first?.focus()
    } else {
      lenis?.start()
    }
    return () => {
      document.body.classList.remove("menu-open")
      getLenis()?.start()
    }
  }, [open])

  function close(returnFocus = true) {
    setOpen(false)
    if (returnFocus) buttonRef.current?.focus()
  }

  function scrollToHref(href: string) {
    const el = document.querySelector(href)
    setOpen(false)
    buttonRef.current?.focus()
    if (!el) return
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(el as HTMLElement, { offset: 0 })
    } else {
      el.scrollIntoView({ behavior: "auto", block: "start" })
    }
  }

  function onNavClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    const hash = href.startsWith("/#") ? href.slice(1) : href.startsWith("#") ? href : ""
    const onHome = window.location.pathname === "/"
    if (!hash || !onHome) {
      setOpen(false)
      return
    }
    event.preventDefault()
    scrollToHref(hash)
  }

  function onMenuKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault()
      close()
      return
    }
    const root = dialogRef.current
    if (!root) return
    const items = Array.from(root.querySelectorAll<HTMLElement>("a, button"))
    if (items.length === 0) return
    const current = document.activeElement as HTMLElement | null
    const index = items.indexOf(current as HTMLElement)

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault()
      const delta = event.key === "ArrowDown" ? 1 : -1
      const next = items[(index + delta + items.length) % items.length]
      next?.focus()
    }

    if (event.key === "Home") {
      event.preventDefault()
      items[0]?.focus()
    }
    if (event.key === "End") {
      event.preventDefault()
      items[items.length - 1]?.focus()
    }
    if (event.key === "Tab") {
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && current === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && current === last) {
        event.preventDefault()
        first?.focus()
      }
    }
  }

  return (
    <>
      <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
        <div className="header-inner">
          <Link className="logo" href="/#top" aria-label={`${profile.name}, home`}>
            <span aria-hidden="true">PR</span>
            <span className="logo-dot" aria-hidden="true" />
          </Link>
          <button
            ref={buttonRef}
            className="menu-button"
            type="button"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => (open ? close() : setOpen(true))}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <div
        id="site-menu"
        ref={dialogRef}
        className={open ? "menu is-open" : "menu"}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-hidden={!open}
        inert={!open}
        onKeyDown={onMenuKeyDown}
      >
        <div className="menu-top">
          <p id={titleId} className="eyebrow" style={{ margin: 0 }}>
            {profile.name}
          </p>
          <button className="menu-button" type="button" onClick={() => close()}>
            Close
          </button>
        </div>
        <div className="menu-body">
          <nav aria-label="Sections">
            <ol className="menu-list">
              {nav.map((item, index) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{ transitionDelay: open ? `${index * 45}ms` : "0ms" }}
                    onClick={(event) => onNavClick(event, item.href)}
                  >
                    <span className="menu-index">{String(index).padStart(2, "0")}</span>
                    <span className="label">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          <div className="menu-side">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.github} target="_blank" rel="noreferrer noopener">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer noopener">
              LinkedIn
            </a>
            <a href={profile.site}>{profile.siteLabel}</a>
          </div>
        </div>
      </div>
    </>
  )
}
