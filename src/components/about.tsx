import { about } from "@/content/site"

export function About() {
  const facts = [
    ["School", about.education.school],
    ["Degree", about.education.degree],
    ["Years", about.education.years],
    ["Place", about.education.place],
  ] as const

  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <h2 className="font-display section-heading" id="about-title" data-thread="section">
          <span className="section-index">01</span>
          <span className="section-label">About</span>
        </h2>
        <div className="about-grid">
          <p className="pull" data-reveal>
            {about.pull}
          </p>
          <div className="prose" data-reveal>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <dl className="edu">
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
