import { contact, profile } from "@/content/site"

export function Contact() {
  return (
    <section className="section section-contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <h2 className="font-display section-heading" data-thread="section">
          <span className="section-index">05</span>
          <span className="section-label">Contact</span>
        </h2>
        <p className="font-display contact-title" id="contact-title">
          {contact.title.map((line, index) => (
            <span key={line} data-thread={index === contact.title.length - 1 ? "contact-line" : undefined}>
              {line}
              {index === contact.title.length - 1 ? <span className="accent">.</span> : null}
            </span>
          ))}
        </p>
        <p className="contact-body">{contact.body}</p>
        <a className="email-link" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <div className="contact-links">
          <a href={profile.github} target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer noopener">
            LinkedIn
          </a>
          <a href={profile.site}>{profile.siteLabel}</a>
        </div>
        <div className="end-anchor" data-thread="end" aria-hidden="true" />
      </div>
    </section>
  )
}
