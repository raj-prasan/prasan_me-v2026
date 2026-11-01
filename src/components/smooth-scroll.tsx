"use client"

import { useEffect } from "react"
import "lenis/dist/lenis.css"
import { setLenis } from "@/lib/lenis-store"

export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return

    let cancelled = false
    let cleanup = () => {}
    let timer = 0

    const begin = () => {
      if (cancelled) return
    ;(async () => {
      const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ])
      if (cancelled) return

      gsap.registerPlugin(ScrollTrigger)
      const lenis = new Lenis({
        lerp: 0.085,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.05,
      })
      setLenis(lenis)
      lenis.on("scroll", ScrollTrigger.update)

      const ticker = (time: number) => {
        lenis.raf(time * 1000)
      }
      gsap.ticker.add(ticker)
      gsap.ticker.lagSmoothing(0)

      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              once: true,
            },
          })
        })
      })

      const onHash = () => {
        if (!window.location.hash) return
        const target = document.querySelector(window.location.hash)
        if (target) lenis.scrollTo(target as HTMLElement, { offset: 0 })
      }
      onHash()

      cleanup = () => {
        ctx.revert()
        gsap.ticker.remove(ticker)
        lenis.destroy()
        setLenis(null)
      }
    })()
    }

    timer = window.setTimeout(begin, 1200)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
      cleanup()
    }
  }, [])

  return null
}
