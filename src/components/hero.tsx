import { hero } from "@/content/site"

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="wrap hero-inner">
        <span data-thread="start" className="thread-anchor" aria-hidden="true" />
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1 className="font-display hero-title" id="hero-title">
          <span data-thread="hero-line">I build</span>
          <span data-thread="hero-line">systems</span>
          <span data-thread="hero-line">
            that hold<span className="accent">.</span>
          </span>
        </h1>
        <div className="hero-foot">
          <p>{hero.lede}</p>
          <p className="scroll-cue">
            <span data-thread="hero-end" className="thread-anchor" aria-hidden="true" />
            {hero.scroll}
            <span aria-hidden="true"> ↓</span>
          </p>
        </div>
      </div>
    </section>
  )
}
