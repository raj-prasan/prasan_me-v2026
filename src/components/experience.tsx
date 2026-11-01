import { prisma } from "@/lib/prisma"

function displayText(value: string | null | undefined) {
  return value?.trim() ?? ""
}

export async function Experience() {
  const workExperience = await prisma.workExperience.findMany({
    orderBy: {
      id: "desc",
    },
  })

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
          {workExperience.map((work) => {
            const title = displayText(work.title)
            const status = displayText(work.status)
            const href = displayText(work.href)
            const buttonText = displayText(work.buttonText)
            const labelDuplicatesTitle =
              buttonText.length > 0 &&
              buttonText.localeCompare(title, undefined, { sensitivity: "accent" }) === 0
            // A repeated company name is not a second label. Keep the link when
            // the row still has a real URL, using the existing fallback text.
            const pillLabel = labelDuplicatesTitle ? (href ? "View Details" : "") : buttonText

            return (
              <li className="exp-row" key={work.id} data-thread="row" data-reveal>
                <p className="exp-org">{title}</p>
                {status ? <p className="exp-kind">{status}</p> : <p className="exp-kind" />}
                <p className="exp-detail">
                  {pillLabel ? (
                    href ? (
                      <a href={href} target="_blank" rel="noreferrer noopener">
                        {pillLabel}
                      </a>
                    ) : (
                      pillLabel
                    )
                  ) : null}
                </p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
