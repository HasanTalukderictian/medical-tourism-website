import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/Blog.css";

/* ---------------------------- IMAGES ----------------------------
   Post er image pele import kore post er `image` field e boshao. Jemon:
   import hospitalImg from "../Image/blog/hospital.jpg";
   ... image: hospitalImg
   Image na thakle sundor placeholder dekhabe.
------------------------------------------------------------------- */

/* ---------------------------- DATA ---------------------------- */
// Ei post gulo SAMPLE. Tomar asol blog post diye replace koro
const categories = ["All", "Treatment Guide", "Visa & Travel", "Hospitals", "Health Tips", "Patient Stories"];

const posts = [
  {
    id: 1,
    slug: "how-to-choose-the-right-hospital-abroad",
    title: "How to Choose the Right Hospital for Treatment Abroad",
    excerpt:
      "Accreditation, specialist experience, language support, and aftercare all matter. Here is a simple checklist to compare hospitals before you decide.",
    category: "Hospitals",
    author: "Akashbari Medical Team",
    date: "Nov 10, 2026",
    readTime: 6,
    featured: true,
    image: null,
  },
  {
    id: 2,
    slug: "medical-visa-guide-for-patients",
    title: "Medical Visa Guide: Documents You Need Before You Travel",
    excerpt:
      "A clear walkthrough of the papers, invitation letters, and records usually needed when applying for a medical visa.",
    category: "Visa & Travel",
    author: "Akashbari Medical Team",
    date: "Nov 4, 2026",
    readTime: 5,
    image: null,
  },
  {
    id: 3,
    slug: "what-to-expect-from-a-second-opinion",
    title: "What to Expect From an Online Second Opinion",
    excerpt:
      "How a written review or video consultation works, what records to prepare, and how to use the advice with your local doctor.",
    category: "Treatment Guide",
    author: "Akashbari Medical Team",
    date: "Oct 28, 2026",
    readTime: 4,
    image: null,
  },
  {
    id: 4,
    slug: "preparing-for-treatment-abroad-checklist",
    title: "Preparing for Treatment Abroad: A Practical Checklist",
    excerpt:
      "From medical reports and medicines to travel insurance and a family companion, plan every step so nothing is missed.",
    category: "Visa & Travel",
    author: "Akashbari Medical Team",
    date: "Oct 20, 2026",
    readTime: 7,
    image: null,
  },
  {
    id: 5,
    slug: "questions-to-ask-your-specialist",
    title: "10 Questions to Ask Your Specialist Before Treatment",
    excerpt:
      "Understand your diagnosis, options, risks, and recovery plan by asking the right questions at your first consultation.",
    category: "Health Tips",
    author: "Akashbari Medical Team",
    date: "Oct 12, 2026",
    readTime: 5,
    image: null,
  },
  {
    id: 6,
    slug: "understanding-treatment-cost-estimates",
    title: "Understanding Treatment Cost Estimates and Hidden Charges",
    excerpt:
      "What is usually included in a package, what may cost extra, and how to ask for a clear and transparent estimate.",
    category: "Treatment Guide",
    author: "Akashbari Medical Team",
    date: "Oct 5, 2026",
    readTime: 6,
    image: null,
  },
  {
    id: 7,
    slug: "a-patient-journey-from-dhaka",
    title: "A Patient Journey: From First Call to Recovery",
    excerpt:
      "A family shares how guided support made a stressful treatment journey simpler, from planning to follow-up care.",
    category: "Patient Stories",
    author: "Akashbari Medical Team",
    date: "Sep 27, 2026",
    readTime: 4,
    image: null,
  },
  {
    id: 8,
    slug: "healthy-habits-after-treatment",
    title: "Healthy Habits That Support Recovery After Treatment",
    excerpt:
      "Simple routines around rest, food, movement, and follow-up visits that can help you recover with confidence.",
    category: "Health Tips",
    author: "Akashbari Medical Team",
    date: "Sep 18, 2026",
    readTime: 5,
    image: null,
  },
];

const PAGE_SIZE = 6;

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

const SearchIcon = () => (
  <svg {...base} width="18" height="18">
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);

const ClockIcon = () => (
  <svg {...base} width="14" height="14">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const ArrowIcon = () => (
  <svg {...base} width="14" height="14" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const PlusIcon = () => (
  <svg {...base} width="15" height="15" strokeWidth="2">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const SendIcon = () => (
  <svg {...base} width="15" height="15">
    <path d="M21 3L10 14" />
    <path d="M21 3l-7 18-4-7-7-4 18-7z" />
  </svg>
);

const CrossIcon = () => (
  <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3z" />
  </svg>
);

/* ------------------- Scroll reveal ------------------- */
const Reveal = ({ children, className = "", delay = 0, direction = "up" }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`bl-reveal bl-reveal--${direction} ${shown ? "is-shown" : ""} ${className}`}
      style={{ "--d": `${delay}s` }}
    >
      {children}
    </div>
  );
};

/* Image na thakle placeholder */
const Cover = ({ src, alt, category, className = "" }) => {
  const [failed, setFailed] = useState(!src);
  return (
    <div className={`bl-cover ${failed ? "bl-cover--empty" : ""} ${className}`}>
      {failed ? (
        <CrossIcon />
      ) : (
        <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
      )}
      <span className="bl-tag">{category}</span>
    </div>
  );
};

const Meta = ({ post }) => (
  <div className="bl-meta">
    <span>{post.date}</span>
    <i aria-hidden="true" />
    <span className="bl-read">
      <ClockIcon /> {post.readTime} min read
    </span>
  </div>
);

/* ---------------------------- PAGE ---------------------------- */
const Blog = () => {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const isFiltering = category !== "All" || query.trim() !== "";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchCat = category === "All" || p.category === category;
      const matchQuery = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [category, query]);

  // Filter na thakle featured post alada boro kore dekhabe
  const featured = !isFiltering ? posts.find((p) => p.featured) : null;
  const list = featured ? filtered.filter((p) => p.id !== featured.id) : filtered;
  const shown = list.slice(0, visibleCount);

  const changeCategory = (c) => {
    setCategory(c);
    setVisibleCount(PAGE_SIZE);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return;
    /* EKHANE tomar newsletter API call boshao. Ekhon shudhu demo. */
    setSubscribed(true);
    setEmail("");
  };

  return (
    <main className="bl-page">
      {/* ================= HERO ================= */}
      <section className="bl-hero">
        <div className="bl-blob bl-blob--one" aria-hidden="true" />
        <div className="bl-blob bl-blob--two" aria-hidden="true" />

        <div className="bl-container bl-hero-inner">
          <span className="bl-badge bl-in" style={{ "--d": "0s" }}>Our Blog</span>
          <h1 className="bl-hero-title bl-in" style={{ "--d": "0.1s" }}>
            Medical tourism <em>guides, tips &amp; stories</em>
          </h1>
          <p className="bl-hero-desc bl-in" style={{ "--d": "0.2s" }}>
            Helpful advice on treatment abroad, hospitals, visa, travel, and recovery, written to help you
            decide with confidence.
          </p>

          <div className="bl-search bl-in" style={{ "--d": "0.3s" }}>
            <SearchIcon />
            <input
              type="search"
              placeholder="Search articles..."
              aria-label="Search articles"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
            />
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="bl-section">
        <div className="bl-container">
          {/* Category chips */}
          <div className="bl-chips" role="tablist" aria-label="Blog categories">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={category === c}
                className={`bl-chip ${category === c ? "is-active" : ""}`}
                onClick={() => changeCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Featured */}
          {featured && (
            <Reveal className="bl-featured-wrap">
              <article className="bl-featured">
                <Cover src={featured.image} alt={featured.title} category={featured.category} className="bl-featured-cover" />
                <div className="bl-featured-body">
                  <span className="bl-flag">Featured</span>
                  <h2>
                    <Link to={`/blog/${featured.slug}`}>{featured.title}</Link>
                  </h2>
                  <p>{featured.excerpt}</p>
                  <Meta post={featured} />
                  <Link to={`/blog/${featured.slug}`} className="bl-btn">
                    Read Article <ArrowIcon />
                  </Link>
                </div>
              </article>
            </Reveal>
          )}

          {/* Grid. key => filter bodlale animation abar chole */}
          {shown.length > 0 ? (
            <div className="bl-grid" key={`${category}-${query}`}>
              {shown.map((post, i) => (
                <Reveal key={post.id} delay={(i % 3) * 0.1} className="bl-card-wrap">
                  <article className="bl-card">
                    <Cover src={post.image} alt={post.title} category={post.category} className="bl-card-cover" />
                    <div className="bl-card-body">
                      <Meta post={post} />
                      <h3>
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p>{post.excerpt}</p>
                      <Link to={`/blog/${post.slug}`} className="bl-more">
                        Read more <ArrowIcon />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="bl-empty">
              <h3>No articles found</h3>
              <p>Try a different keyword or category.</p>
              <button
                type="button"
                className="bl-btn"
                onClick={() => {
                  setQuery("");
                  changeCategory("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Load more */}
          {list.length > visibleCount && (
            <div className="bl-center">
              <button type="button" className="bl-btn bl-btn--ghost" onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}>
                Load more articles <PlusIcon />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="bl-news-wrap">
        <div className="bl-container">
          <Reveal className="bl-news">
            <div className="bl-news-text">
              <h2>Get health travel tips in your inbox</h2>
              <p>Join our newsletter for new guides, hospital updates, and helpful advice. No spam.</p>
            </div>

            {subscribed ? (
              <p className="bl-news-done" role="status">
                Thank you for subscribing!
              </p>
            ) : (
              <form className="bl-news-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Your email address"
                  aria-label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">
                  Subscribe <SendIcon />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default Blog;
