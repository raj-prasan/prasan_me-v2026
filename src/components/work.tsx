import { getProjects } from "@/controllers/projects"
import { statusLabel } from "@/content/site"

const layouts = ["feature", "companion", "wide", "standard", "half"] as const

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

function linkLabel(href: string) {
  try {
    const host = new URL(href).hostname
    if (host.includes("github.com")) return "Code"
    return "Open"
  } catch {
    return "Open"
  }
}

export async function Work() {
  const projects = await getProjects()

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
              key={project.id}
              className={`card layout-${layouts[index % layouts.length]}`}
              data-thread="card"
              data-reveal
            >
              <div>
                <div className="card-top">
                  <span className="card-kicker">
                    <strong>{String(index + 1).padStart(2, "0")}</strong>
                  </span>
                  <span className={`card-kicker status-${project.status}`}>
                    {statusLabel[project.status]}
                  </span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              {project.href ? (
                <div className="card-links">
                  <a href={project.href} target="_blank" rel="noreferrer noopener">
                    {linkLabel(project.href)} <Arrow />
                  </a>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
