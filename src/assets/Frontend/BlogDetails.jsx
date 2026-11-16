import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../Css/BlogDetails.css";
import { posts, toId } from "./blogData";

/* ---------------------------- ICONS ---------------------------- */
const base = {
  viewBox: "0 0 24 24",
  width: 16,
  height: 16,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const Icon = {
  clock: () => (
    <svg {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  calendar: () => (
    <svg {...base}>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  ),
  arrowLeft: () => (
    <svg {...base} strokeWidth="2">
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  ),
  arrowRight: () => (
    <svg {...base} strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  link: () => (
    <svg {...base}>
      <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" />
    </svg>
  ),
  check: () => (
    <svg {...base} strokeWidth="2.2">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  ),
  list: () => (
    <svg {...base}>
      <path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01" />
    </svg>
  ),
  bulb: () => (
    <svg {...base} width="20" height="20">
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.2h5c0-.9.4-1.7 1.1-2.2A6 6 0 0 0 12 3z" />
    </svg>
  ),
  phone: () => (
    <svg {...base} width="18" height="18">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  ),
  facebook: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path fill="currentColor" d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3z" />
    </svg>
  ),
  whatsapp: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path fill="currentColor" d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3zm0 16.4c-1.4 0-2.8-.4-4-1.1l-.3-.2-2.7.7.7-2.6-.2-.3A7.4 7.4 0 1 1 12 19.4zm4.1-5.5c-.2-.1-1.3-.7-1.5-.7-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6 6 0 0 1-3-2.6c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.8 2c0 1.2.9 2.3 1 2.5.1.2 1.7 2.6 4.1 3.6 1.5.7 2.1.7 2.9.6.5-.1 1.3-.6 1.5-1.1.2-.5.2-1 .1-1.1l-.4-.3z" />
    </svg>
  ),
  linkedin: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path fill="currentColor" d="M6.9 8.8H3.8V20h3.1V8.8zM5.3 4a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zM20.2 13.6c0-3-1.6-5-4.3-5-1.4 0-2.4.8-2.8 1.5V8.8h-3V20h3.1v-5.6c0-1.5.3-2.9 2.1-2.9 1.8 0 1.8 1.7 1.8 3V20h3.1v-6.4z" />
    </svg>
  ),
  cross: () => (
    <svg viewBox="0 0 24 24" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3z" />
    </svg>
  ),
};

/* Image na thakle placeholder */
const Cover = ({ src, alt, className = "", eager = false }) => {
  const [failed, setFailed] = useState(!src);
  useEffect(() => setFailed(!src), [src]);
  return (
    <div className={`bd-cover ${failed ? "bd-cover--empty" : ""} ${className}`}>
      {failed ? (
        <Icon.cross />
      ) : (
        <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} onError={() => setFailed(true)} />
      )}
    </div>
  );
};

/* Author er naam theke 2 ta letter (Akashbari Medical Team -> AM) */
const initials = (name) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

/* Article er content block render */
const Block = ({ block }) => {
  switch (block.type) {
    case "h2":
      return <h2 id={toId(block.text)}>{block.text}</h2>;
    case "list":
      return (
        <ul className="bd-list">
          {block.items.map((item) => (
            <li key={item}>
              <span className="bd-list-icon">
                <Icon.check />
              </span>
              {item}
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className="bd-steps">
          {block.items.map((item, i) => (
            <li key={item}>
              <span className="bd-step-no">{i + 1}</span>
              {item}
            </li>
          ))}
        </ol>
      );
    case "tip":
      return (
        <aside className="bd-tip">
          <span className="bd-tip-icon">
            <Icon.bulb />
          </span>
          <div>
            <strong>{block.title}</strong>
            <p>{block.text}</p>
          </div>
        </aside>
      );
    case "quote":
      return (
        <blockquote className="bd-quote">
          <p>{block.text}</p>
          {block.by && <cite>— {block.by}</cite>}
        </blockquote>
      );
    default:
      return <p>{block.text}</p>;
  }
};

/* Table of contents */
const Toc = ({ headings, active, className = "" }) => (
  <nav className={`bd-toc ${className}`} aria-label="Table of contents">
    <h4>
      <Icon.list /> In this article
    </h4>
    <ol>
      {headings.map((h) => {
        const id = toId(h);
        return (
          <li key={id}>
            <a href={`#${id}`} className={active === id ? "is-active" : ""} onClick={(e) => {
              e.preventDefault();
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}>
              {h}
            </a>
          </li>
        );
      })}
    </ol>
  </nav>
);

/* Share buttons */
const Share = ({ title, className = "" }) => {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard na thakle kichu korbe na */
    }
  };

  return (
    <div className={`bd-share ${className}`}>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
        <Icon.facebook />
      </a>
      <a href={`https://wa.me/?text=${t}%20${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">
        <Icon.whatsapp />
      </a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
        <Icon.linkedin />
      </a>
      <button type="button" onClick={copy} aria-label="Copy link" className={copied ? "is-copied" : ""}>
        {copied ? <Icon.check /> : <Icon.link />}
      </button>
      <span className="bd-copied" role="status">{copied ? "Link copied!" : ""}</span>
    </div>
  );
};

/* ---------------------------- PAGE ---------------------------- */
const BlogDetails = () => {
  const { slug } = useParams();
  const index = posts.findIndex((p) => p.slug === slug);
  const post = posts[index];

  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("");
  const articleRef = useRef(null);

  const headings = useMemo(
    () => (post ? post.content.filter((b) => b.type === "h2").map((b) => b.text) : []),
    [post]
  );

  // Related: age same category, tarpor baki gula
  const related = useMemo(() => {
    if (!post) return [];
    const others = posts.filter((p) => p.id !== post.id);
    return [...others.filter((p) => p.category === post.category), ...others.filter((p) => p.category !== post.category)].slice(0, 3);
  }, [post]);

  const prev = index > 0 ? posts[index - 1] : null;
  const next = index >= 0 && index < posts.length - 1 ? posts[index + 1] : null;

  // Notun post e gele upore jabe
  useEffect(() => {
    window.scrollTo(0, 0);
    setActive("");
  }, [slug]);

  // Page title
  useEffect(() => {
    if (!post) return;
    const old = document.title;
    document.title = `${post.title} | Akashbari Medical`;
    return () => {
      document.title = old;
    };
  }, [post]);

  // Reading progress bar
  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight * 0.6;
      const done = Math.min(Math.max(-rect.top + window.innerHeight * 0.2, 0), total);
      setProgress(total > 0 ? (done / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [slug]);

  // Kon heading pora hocche (TOC e highlight)
  // (screen er upor theke 160px er moddhe shesh je heading ta par hoyeche, sheta active)
  useEffect(() => {
    if (!headings.length) return;
    const onScroll = () => {
      let current = "";
      headings.forEach((h) => {
        const el = document.getElementById(toId(h));
        if (el && el.getBoundingClientRect().top <= 160) current = el.id;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  /* ---------- Post na pele ---------- */
  if (!post) {
    return (
      <main className="bd-page">
        <section className="bd-notfound">
          <span className="bd-notfound-code">404</span>
          <h1>Article not found</h1>
          <p>The article you are looking for may have been moved or removed.</p>
          <Link to="/blog" className="bd-btn">
            <Icon.arrowLeft /> Back to Blog
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="bd-page">
      {/* Reading progress */}
      <div className="bd-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      {/* ================= HERO ================= */}
      <header className="bd-hero">
        <div className="bd-container bd-narrow">
         

          <span className="bd-category">{post.category}</span>
          <h1 className="bd-title">{post.title}</h1>
          <p className="bd-excerpt">{post.excerpt}</p>

          <div className="bd-meta">
            <div className="bd-author">
              <span className="bd-avatar" aria-hidden="true">{initials(post.author)}</span>
              <div>
                <strong>{post.author}</strong>
                <small>Medical Tourism Experts</small>
              </div>
            </div>
            <div className="bd-meta-info">
              <span>
                <Icon.calendar /> {post.date}
              </span>
              <span>
                <Icon.clock /> {post.readTime} min read
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Cover */}
      <div className="bd-container bd-cover-wrap">
        <Cover src={post.image} alt={post.title} className="bd-hero-cover" eager />
      </div>

      {/* ================= BODY ================= */}
      <div className="bd-container bd-layout">
        <article className="bd-article" ref={articleRef}>
          {/* Mobile e TOC ekhane (desktop e sidebar e) */}
          {headings.length > 1 && <Toc headings={headings} active={active} className="bd-toc--mobile" />}

          <div className="bd-content">
            {post.content.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>

          {/* Tags + share */}
          <div className="bd-article-foot">
            {post.tags?.length > 0 && (
              <div className="bd-tags">
                {post.tags.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>
            )}
            <div className="bd-share-row">
              <span>Share:</span>
              <Share title={post.title} />
            </div>
          </div>

          {/* Author box */}
          <div className="bd-author-box">
            <span className="bd-avatar bd-avatar--lg" aria-hidden="true">{initials(post.author)}</span>
            <div>
              <small>Written by</small>
              <h3>{post.author}</h3>
              <p>
                Our medical tourism team helps patients compare hospitals, plan treatment, arrange visas and
                travel, and stay supported until recovery.
              </p>
            </div>
          </div>

          <p className="bd-disclaimer">
            This article is for general information only and is not medical advice. Please talk to a qualified
            doctor about your own condition.
          </p>

          {/* Prev / Next */}
          <nav className="bd-pager" aria-label="More articles">
            {prev ? (
              <Link to={`/blog/${prev.slug}`} className="bd-pager-link">
                <small>
                  <Icon.arrowLeft /> Previous
                </small>
                <span>{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link to={`/blog/${next.slug}`} className="bd-pager-link bd-pager-link--next">
                <small>
                  Next <Icon.arrowRight />
                </small>
                <span>{next.title}</span>
              </Link>
            )}
          </nav>
        </article>

        {/* ================= SIDEBAR ================= */}
        <aside className="bd-aside">
          <div className="bd-aside-inner">
            {headings.length > 1 && <Toc headings={headings} active={active} className="bd-toc--side" />}

            <div className="bd-cta">
              <h4>Need help planning treatment?</h4>
              <p>Share your reports and get a free treatment plan and cost estimate from top hospitals.</p>
              {/* Route ta tomar contact page onujayi change koro */}
              <Link to="/contact" className="bd-btn bd-btn--white">
                Get Free Consultation <Icon.arrowRight />
              </Link>
              {/* Asol number boshao */}
              <a href="tel:+8801000000000" className="bd-cta-call">
                <Icon.phone /> +880 1000-000000
              </a>
            </div>

            <div className="bd-side-share">
              <h4>Share this article</h4>
              <Share title={post.title} />
            </div>
          </div>
        </aside>
      </div>

      {/* ================= RELATED ================= */}
      {related.length > 0 && (
        <section className="bd-related">
          <div className="bd-container">
            <div className="bd-related-head">
              <h2>You may also like</h2>
              <Link to="/blog" className="bd-link">
                View all articles <Icon.arrowRight />
              </Link>
            </div>

            <div className="bd-related-grid">
              {related.map((p) => (
                <article className="bd-card" key={p.id}>
                  <Link to={`/blog/${p.slug}`} className="bd-card-media" tabIndex={-1} aria-hidden="true">
                    <Cover src={p.image} alt="" />
                    <span className="bd-card-tag">{p.category}</span>
                  </Link>
                  <div className="bd-card-body">
                    <div className="bd-card-meta">
                      <span>{p.date}</span>
                      <i aria-hidden="true" />
                      <span>{p.readTime} min read</span>
                    </div>
                    <h3>
                      <Link to={`/blog/${p.slug}`}>{p.title}</Link>
                    </h3>
                    <Link to={`/blog/${p.slug}`} className="bd-link">
                      Read more <Icon.arrowRight />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default BlogDetails;
