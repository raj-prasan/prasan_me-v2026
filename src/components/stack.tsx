import { skillGroups } from "@/content/site"

export function Stack() {
  return (
    <section className="section" id="stack" aria-labelledby="stack-title">
      <div className="wrap">
        <h2 className="font-display section-heading" id="stack-title" data-thread="section">
          <span className="section-index">03</span>
          <span className="section-label">Stack</span>
        </h2>
        <p className="contact-body" data-reveal style={{ marginTop: 0 }}>
          Languages, tools, and concepts I have worked with.
        </p>
        <div className="stack-grid">
          {skillGroups.map((group) => (
            <div className="stack-group" key={group.title} data-thread="block" data-reveal>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
