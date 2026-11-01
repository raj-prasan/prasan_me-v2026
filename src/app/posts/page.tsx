import type { Metadata } from "next"
import Link from "next/link"
import getPosts from "@/controllers/posts"
import { Footer } from "@/components/footer"
import { postsIntro } from "@/content/site"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Posts",
  description: postsIntro,
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date)
}

export default async function PostsPage() {
  const postData = await getPosts()
  const posts = [...postData].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  return (
    <main id="content">
      <section className="section page-top">
        <div className="wrap">
          <Link className="eyebrow" href="/">
            Index
          </Link>
          <h1 className="font-display page-title" data-thread="section">
            Posts
          </h1>
          <p className="contact-body">{postsIntro}</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }} aria-label="Posts">
        <div className="wrap">
          {posts.length === 0 ? (
            <p className="contact-body">No posts yet.</p>
          ) : (
            <ol className="post-list">
              {posts.map((post) => (
                <li className="post" key={post.id} data-thread="card">
                  <div className="post-meta">
                    <span>Prasan Raj</span>
                    <time dateTime={post.createdAt.toISOString()}>
                      {formatDate(post.createdAt)}
                    </time>
                  </div>
                  <h2>{post.title}</h2>
                  <p>{post.content}</p>
                  {post.image ? (
                    // URLs come from the database and are not known at build time.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img alt={post.title} src={post.image} />
                  ) : null}
                  {post.tags.length > 0 ? (
                    <ul className="tags" aria-label="Tags">
                      {post.tags.map((tag) => (
                        <li className="tag" key={tag}>
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}
