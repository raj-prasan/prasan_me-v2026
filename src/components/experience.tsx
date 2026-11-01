import { experience } from "@/content/site"

export function Experience() {
  if (experience.length === 0) return null

  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <div className="wrap">
        <h2
          className="font-display section-heading"
          id="experience-title"
          data-thread="section"
        >
          <span className="section-index">04</span>
          <span className="section-label">Experience</span>
        </h2>
        <ol className="exp-list">
          {experience.map((item) => (
            <li className="exp-row" key={item.org} data-thread="row" data-reveal>
              <p className="exp-org">{item.org}</p>
              <p className="exp-kind">
                {item.kind}
                {item.years ? ` · ${item.years}` : ""}
              </p>
              <p className="exp-detail">
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noreferrer noopener">
                    {item.detail}
                  </a>
                ) : (
                  item.detail
                )}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
