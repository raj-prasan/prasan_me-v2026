import { projects, statusLabel } from "@/content/site"

function Arrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path
        d="M2 10 L10 2 M4 2 H10 V8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  )
}

export function Work() {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <h2 className="font-display section-heading" id="work-title" data-thread="section">
          <span className="section-index">02</span>
          <span className="section-label">Selected work</span>
        </h2>
        <div className="bento">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className={`card layout-${project.layout}`}
              data-thread="card"
              data-reveal
            >
              <div>
                <div className="card-top">
                  <span className="card-kicker">
                    <strong>{String(index + 1).padStart(2, "0")}</strong>
                  </span>
                  {project.status ? (
                    <span className={`card-kicker status-${project.status}`}>
                      {statusLabel[project.status]}
                    </span>
                  ) : (
                    <span className="card-kicker">Project</span>
                  )}
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <div>
                <ul className="tags" aria-label={`${project.title} technologies`}>
                  {project.tags.map((tag) => (
                    <li className="tag" key={tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="card-links">
                  <a href={project.code} target="_blank" rel="noreferrer noopener">
                    Code <Arrow />
                  </a>
                  {project.live ? (
                    <a href={project.live} target="_blank" rel="noreferrer noopener">
                      Live <Arrow />
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
