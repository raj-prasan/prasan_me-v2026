"use client"

import { useEffect, useRef } from "react"

type Pt = { x: number; y: number }
type Sample = { x: number; y: number; d: number }
type Dot = { x: number; y: number; d: number; dist: number }
type Node = { x: number; y: number; d: number }

const GRID = 28

function layoutBox(el: Element) {
  const rect = el.getBoundingClientRect()
  const left = rect.left + window.scrollX
  const top = rect.top + window.scrollY
  return {
    left,
    top,
    width: rect.width,
    height: rect.height,
    right: left + rect.width,
    bottom: top + rect.height,
    cx: left + rect.width / 2,
    cy: top + rect.height / 2,
  }
}

function arc(cx: number, cy: number, r: number, a0: number, a1: number, steps: number): Pt[] {
  const pts: Pt[] = []
  for (let i = 0; i <= steps; i++) {
    const a = a0 + ((a1 - a0) * i) / steps
    pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r })
  }
  return pts
}

function toPath(points: Pt[]) {
  if (points.length < 2) return ""
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] ?? p2
    const c1x = p1.x + (p2.x - p0.x) / 8
    const c1y = p1.y + (p2.y - p0.y) / 8
    const c2x = p2.x - (p3.x - p1.x) / 8
    const c2y = p2.y - (p3.y - p1.y) / 8
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }
  return d
}

function dedupe(points: Pt[]) {
  const out: Pt[] = []
  for (const point of points) {
    const prev = out[out.length - 1]
    if (!prev || Math.hypot(point.x - prev.x, point.y - prev.y) > 8) out.push(point)
  }
  return out
}

export function Thread() {
  const svgRef = useRef<SVGSVGElement>(null)
  const ghostRef = useRef<SVGPathElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const headRef = useRef<SVGCircleElement>(null)
  const headGlowRef = useRef<SVGCircleElement>(null)
  const nodesRef = useRef<SVGGElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pulseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    const ghost = ghostRef.current
    const path = pathRef.current
    const head = headRef.current
    const headGlow = headGlowRef.current
    const nodesGroup = nodesRef.current
    const canvas = canvasRef.current
    const pulse = pulseRef.current
    if (!svg || !ghost || !path || !head || !headGlow || !nodesGroup || !canvas || !pulse) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let samples: Sample[] = []
    let dots: Dot[] = []
    let nodes: Node[] = []
    let total = 0
    let frame = 0
    let running = true
    let paintQueued = false

    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

    const measure = () => {
      const width = document.documentElement.clientWidth
      const height = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
      )
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`)
      svg.style.width = `${width}px`
      svg.style.height = `${height}px`
      const clampX = (x: number) => clamp(x, 12, width - 12)
      const loopR = clamp(width * 0.018, width < 760 ? 8 : 14, 22)
      const pts: Pt[] = []
      const nodeSeeds: Pt[] = []
      const wrap = document.querySelector(".wrap")
      const gutter = wrap ? Math.max(14, layoutBox(wrap).left - 18) : 28

      const startEl = document.querySelector("[data-thread='start']")
      const lines = Array.from(document.querySelectorAll("[data-thread='hero-line']")).map(layoutBox)
      const heroEnd = document.querySelector("[data-thread='hero-end']")

      if (startEl) {
        const start = layoutBox(startEl)
        pts.push({ x: clampX(start.left + 4), y: start.top })
      }

      if (lines.length >= 3) {
        const [l0, l1, l2] = lines
        const y0 = l0.top + l0.height * 0.58
        const y1 = l1.top + l1.height * 0.58
        const y2 = l2.top + l2.height * 0.62
        pts.push({ x: clampX(l0.left - 10), y: l0.top + 8 })
        const room = (wrap ? layoutBox(wrap).right : width) - l0.right
        pts.push({ x: clampX(l0.left + 8), y: y0 })
        pts.push({ x: clampX(l0.right - 2), y: y0 })
        if (room > loopR * 2) {
          pts.push(
            ...arc(l0.right + 4, y0 + 4, loopR, Math.PI * 0.9, Math.PI * 0.9 + Math.PI * 1.15, 7).map((point) => ({
              x: clampX(point.x),
              y: point.y,
            })),
          )
        }
        pts.push({ x: clampX(l1.right - 4), y: y1 })
        pts.push({ x: clampX(l1.left + 6), y: y1 })
        if (l1.left > gutter + 28) {
          pts.push(
            ...arc(l1.left - 2, (y1 + y2) / 2, loopR * 0.7, -0.4, -0.4 - Math.PI * 1.05, 6).map((point) => ({
              x: clampX(point.x),
              y: point.y,
            })),
          )
        }
        pts.push({ x: clampX(l2.left + 10), y: y2 })
        pts.push({ x: clampX(l2.right - 4), y: y2 })
      }

      if (heroEnd && pts.length) {
        const cue = heroEnd.closest(".scroll-cue") ?? heroEnd
        const end = layoutBox(cue)
        const last = pts[pts.length - 1]
        pts.push({
          x: clampX((last.x + end.right) / 2),
          y: (last.y + end.top) / 2,
        })
        pts.push({ x: clampX(end.right - 6), y: end.top - 22 })
      }

      const flow = Array.from(
        document.querySelectorAll(
          "[data-thread='section'], [data-thread='card'], [data-thread='contact-line'], [data-thread='end']",
        ),
      )
      for (let i = 0; i < flow.length; i++) {
        const el = flow[i]
        const kind = el.getAttribute("data-thread")
        const box = layoutBox(el)
        if (kind === "section") {
          const point = { x: clampX(gutter), y: box.cy }
          pts.push(point)
          nodeSeeds.push(point)
        } else if (kind === "card") {
          const nextEl = flow[i + 1]
          const next = nextEl?.getAttribute("data-thread") === "card" ? layoutBox(nextEl) : null
          const paired = next && Math.abs(next.top - box.top) < 48 && next.left > box.right - 8
          if (paired && next) {
            const gap = clampX((box.right + next.left) / 2)
            pts.push({ x: gap, y: box.top - 6 })
            pts.push({ x: gap, y: Math.max(box.bottom, next.bottom) + 8 })
            i += 1
          } else {
            const edge = clampX(box.left - 14)
            pts.push({ x: edge, y: box.top + 22 })
            pts.push({ x: edge, y: box.bottom - 16 })
          }
        } else if (kind === "contact-line") {
          const title = document.querySelector(".contact-title")
          if (title) {
            const block = layoutBox(title)
            pts.push({ x: clampX(gutter), y: block.top + 8 })
            pts.push({ x: clampX(gutter), y: box.top + 4 })
          }
          const y = box.top + box.height * 0.62
          const endPoint = { x: clampX(box.right + 6), y }
          pts.push({ x: clampX(box.left + 8), y })
          pts.push(endPoint)
          nodeSeeds.push(endPoint)
        }
      }

      const cleaned = dedupe(pts)
      const d = toPath(cleaned)
      ghost.setAttribute("d", d)
      path.setAttribute("d", d)
      const length = path.getTotalLength()
      total = length
      path.style.strokeDasharray = `${length}`
      ghost.style.strokeDasharray = `${length}`

      samples = []
      const step = 48
      const sampleBudget = 40
      let sampleAt = 0
      const takeSamples = () => {
        if (!running) return
        const endAt = Math.min(length, sampleAt + step * sampleBudget)
        for (let dist = sampleAt; dist <= endAt; dist += step) {
          const point = path.getPointAtLength(dist)
          samples.push({ x: point.x, y: point.y, d: dist })
        }
        sampleAt = endAt + step
        if (sampleAt <= length) {
          window.setTimeout(takeSamples, 0)
        } else {
          const endPoint = path.getPointAtLength(length)
          samples.push({ x: endPoint.x, y: endPoint.y, d: length })
          buildDots()
          placeNodes()
          paint()
        }
      }

      const placeNodes = () => {
        nodes = []
        let sampleCursor = 0
        nodesGroup.replaceChildren()
        for (const seed of nodeSeeds) {
          if (!samples.length) break
          let best = samples[Math.min(sampleCursor, samples.length - 1)]
          let bestDist = Infinity
          let bestIndex = sampleCursor
          for (let index = sampleCursor; index < samples.length; index++) {
            const sample = samples[index]
            const dd = (sample.x - seed.x) ** 2 + (sample.y - seed.y) ** 2
            if (dd < bestDist) {
              bestDist = dd
              best = sample
              bestIndex = index
            } else if (bestDist < 3600 && index > bestIndex + 12) {
              break
            }
          }
          sampleCursor = bestIndex
          nodes.push({ x: best.x, y: best.y, d: best.d })
          const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
          circle.setAttribute("cx", best.x.toFixed(1))
          circle.setAttribute("cy", best.y.toFixed(1))
          circle.setAttribute("r", "4.5")
          circle.setAttribute("fill", "none")
          circle.setAttribute("stroke", "#D6FF3A")
          circle.setAttribute("stroke-width", "1.25")
          nodesGroup.appendChild(circle)
        }
      }

      const buildDots = () => {
        const dotMap = new Map<string, Dot>()
        for (const sample of samples) {
          const gx = Math.round(sample.x / GRID) * GRID
          const gy = Math.round(sample.y / GRID) * GRID
          for (let ox = -1; ox <= 1; ox++) {
            for (let oy = -1; oy <= 1; oy++) {
              const x = gx + ox * GRID
              const y = gy + oy * GRID
              const dist = Math.hypot(x - sample.x, y - sample.y)
              if (dist > 40) continue
              const key = `${x}:${y}`
              const prev = dotMap.get(key)
              if (!prev || dist < prev.dist) dotMap.set(key, { x, y, d: sample.d, dist })
            }
          }
        }
        dots = Array.from(dotMap.values())
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      window.setTimeout(takeSamples, 0)
    }

    const paint = () => {
      const atEnd =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 6
      const targetY = window.scrollY + window.innerHeight * 0.94
      let drawn = 0
      if (reduce.matches || atEnd) {
        drawn = total
      } else {
        for (const sample of samples) {
          if (sample.y <= targetY) drawn = Math.max(drawn, sample.d)
        }
      }
      path.style.strokeDashoffset = `${Math.max(0, total - drawn)}`
      const tip = total > 0 ? path.getPointAtLength(Math.min(drawn, total)) : null
      if (tip && !reduce.matches) {
        head.setAttribute("cx", tip.x.toFixed(1))
        head.setAttribute("cy", tip.y.toFixed(1))
        headGlow.setAttribute("cx", tip.x.toFixed(1))
        headGlow.setAttribute("cy", tip.y.toFixed(1))
        head.style.opacity = "1"
        headGlow.style.opacity = "1"
      } else {
        head.style.opacity = "0"
        headGlow.style.opacity = "0"
      }

      const circles = nodesGroup.querySelectorAll("circle")
      circles.forEach((circle, index) => {
        const node = nodes[index]
        if (!node) return
        const on = drawn + 8 >= node.d
        circle.setAttribute("fill", on ? "#D6FF3A" : "none")
        circle.setAttribute("stroke", on ? "#D6FF3A" : "rgba(214,255,58,0.45)")
      })

      const end = nodes[nodes.length - 1]
      if (end) {
        pulse.style.left = `${end.x}px`
        pulse.style.top = `${end.y}px`
        pulse.classList.toggle("is-idle", reduce.matches || drawn + 24 < total)
        pulse.style.opacity = drawn + 80 >= end.d ? "1" : "0"
      }

      const scrollY = window.scrollY
      const viewH = window.innerHeight
      ctx.clearRect(0, 0, window.innerWidth, viewH)
      for (const dot of dots) {
        if (!reduce.matches && dot.d > drawn + 6) continue
        const vy = dot.y - scrollY
        if (vy < -8 || vy > viewH + 8) continue
        const reveal = reduce.matches ? 1 : Math.min(1, (drawn - dot.d) / 90 + 0.15)
        const alpha = (1 - dot.dist / 50) * 0.72 * reveal
        if (alpha <= 0.02) continue
        ctx.beginPath()
        ctx.fillStyle = `rgba(214, 255, 58, ${alpha.toFixed(3)})`
        ctx.arc(dot.x, vy, dot.dist < 16 ? 1.7 : 1.25, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const requestPaint = () => {
      if (paintQueued) return
      paintQueued = true
      frame = requestAnimationFrame(() => {
        paintQueued = false
        if (running) paint()
      })
    }

    let resizeFrame = 0
    const onResize = () => {
      cancelAnimationFrame(resizeFrame)
      resizeFrame = requestAnimationFrame(() => {
        measure()
        paint()
      })
    }

    measure()
    paint()
    document.fonts?.ready.then(() => {
      if (!running) return
      measure()
      paint()
    })

    const observer = new ResizeObserver(onResize)
    observer.observe(document.documentElement)
    window.addEventListener("resize", onResize)
    window.addEventListener("scroll", requestPaint, { passive: true })
    reduce.addEventListener("change", requestPaint)

    return () => {
      running = false
      cancelAnimationFrame(frame)
      cancelAnimationFrame(resizeFrame)
      observer.disconnect()
      window.removeEventListener("resize", onResize)
      window.removeEventListener("scroll", requestPaint)
      reduce.removeEventListener("change", requestPaint)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="thread-canvas" aria-hidden="true" />
      <svg ref={svgRef} className="thread-svg" aria-hidden="true">
        <path
          ref={ghostRef}
          fill="none"
          stroke="rgba(214,255,58,0.1)"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          ref={pathRef}
          fill="none"
          stroke="#D6FF3A"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g ref={nodesRef} />
        <circle ref={headGlowRef} r="7" fill="rgba(214,255,58,0.28)" />
        <circle ref={headRef} r="3.25" fill="#D6FF3A" />
      </svg>
      <div ref={pulseRef} className="thread-pulse" aria-hidden="true">
        <span />
        <span />
      </div>
    </>
  )
}
