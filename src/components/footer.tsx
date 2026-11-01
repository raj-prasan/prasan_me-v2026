import { profile } from "@/content/site"

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-bar">
        <span>© 2026 {profile.name}</span>
        <span>Crafted with care</span>
        <span>{profile.location}</span>
      </div>
    </footer>
  )
}
