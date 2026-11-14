import  { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/Faq.css";

/* ---------------------------- DATA ---------------------------- */
// Ei prosno-uttor gulo SAMPLE. Tomar asol tothyo, policy ar service onujayi edit koro
const categories = [
  "All",
  "General",
  "Treatment & Hospitals",
  "Visa & Travel",
  "Cost & Payment",
  "Support & Stay",
];

const faqs = [
  /* ---------- General ---------- */
  {
    id: 1,
    category: "General",
    q: "What is medical tourism?",
    a: "Medical tourism means travelling to another city or country to receive medical treatment. Patients usually choose it to access specialist doctors, advanced technology, shorter waiting times, or more affordable care.",
  },
  {
    id: 2,
    category: "General",
    q: "How does Akashbari Medical help me?",
    a: "We guide you through the whole journey: understanding your reports, suggesting suitable hospitals and doctors, arranging appointments, helping with the visa, travel and stay, and supporting you until follow-up.",
  },

  /* ---------- Treatment & Hospitals ---------- */
  {
    id: 3,
    category: "Treatment & Hospitals",
    q: "Which countries and hospitals do you work with?",
    a: "We work with partner hospitals in Bangladesh, India, Thailand, Malaysia, and China. You can browse the Hospitals menu to see the options for each country.",
  },
  {
    id: 4,
    category: "Treatment & Hospitals",
    q: "Can I get a second opinion without travelling?",
    a: "Yes. You can share your reports for an online review or a video consultation with a specialist, and decide about travel only if it is suitable for your care.",
  },

  /* ---------- Visa & Travel ---------- */
  {
    id: 5,
    category: "Visa & Travel",
    q: "Do you help with the medical visa?",
    a: "Yes. We help you prepare the required documents and guide you through the medical visa process. Final approval depends on the embassy or authority of the destination country.",
  },
  {
    id: 6,
    category: "Visa & Travel",
    q: "Can a family member travel with me?",
    a: "In most cases a companion or attendant can travel with the patient. The rules depend on the destination country, and we will guide you on what is needed.",
  },

  /* ---------- Cost & Payment ---------- */
  {
    id: 7,
    category: "Cost & Payment",
    q: "How much will my treatment cost?",
    a: "Cost depends on your condition, the hospital, the treatment plan, and the length of stay. After reviewing your reports we share a clear estimate so you know what to expect.",
  },
  {
    id: 8,
    category: "Cost & Payment",
    q: "Are there any hidden charges?",
    a: "We aim to be fully transparent. We explain what an estimate includes and what may cost extra, so there are no surprises later.",
  },

  /* ---------- Support & Stay ---------- */
  {
    id: 9,
    category: "Support & Stay",
    q: "Will someone help me in my own language?",
    a: "Yes. We provide patient support and interpreter assistance so you can understand your doctors and communicate comfortably during your treatment.",
  },
  {
    id: 10,
    category: "Support & Stay",
    q: "Do you arrange accommodation near the hospital?",
    a: "Yes. We can arrange medical accommodation close to the hospital that suits your budget and your family's needs.",
  },
];

/* ---------------------------- ICONS ---------------------------- */
const base = {
  viewBox: "0 0 24 24",
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

const ChevronIcon = () => (
  <svg {...base} width="18" height="18" strokeWidth="2">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const PhoneIcon = () => (
  <svg {...base} width="16" height="16">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </svg>
);

const ArrowIcon = () => (
  <svg {...base} width="14" height="14" strokeWidth="2">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

const HelpIcon = () => (
  <svg {...base} width="40" height="40" strokeWidth="1.6">
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7" />
    <circle cx="12" cy="17" r="0.6" fill="currentColor" />
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
      className={`fq-reveal fq-reveal--${direction} ${shown ? "is-shown" : ""} ${className}`}
      style={{ "--d": `${delay}s` }}
    >
      {children}
    </div>
  );
};

/* ---------------------------- PAGE ---------------------------- */
const Faq = () => {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(1);

  // Prottek category te koyta prosno ache
  const counts = useMemo(() => {
    const map = { All: faqs.length };
    faqs.forEach((f) => {
      map[f.category] = (map[f.category] || 0) + 1;
    });
    return map;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((f) => {
      const matchCat = category === "All" || f.category === category;
      const matchQuery = !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [category, query]);

  const toggle = (id) => setOpenId((cur) => (cur === id ? null : id));

  const reset = () => {
    setQuery("");
    setCategory("All");
  };

  return (
    <main className="fq-page">
      {/* ================= HERO ================= */}
      <section className="fq-hero">
        <div className="fq-blob fq-blob--one" aria-hidden="true" />
        <div className="fq-blob fq-blob--two" aria-hidden="true" />

        <div className="fq-container fq-hero-inner">
          <span className="fq-badge fq-in" style={{ "--d": "0s" }}>FAQ</span>
          <h1 className="fq-hero-title fq-in" style={{ "--d": "0.1s" }}>
            Frequently asked <em>questions</em>
          </h1>
          <p className="fq-hero-desc fq-in" style={{ "--d": "0.2s" }}>
            Quick answers about treatment abroad, hospitals, visa, cost, and support. Cannot find what you
            need? Our team is happy to help.
          </p>

          <div className="fq-search fq-in" style={{ "--d": "0.3s" }}>
            <SearchIcon />
            <input
              type="search"
              placeholder="Search your question..."
              aria-label="Search questions"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="fq-section">
        <div className="fq-container fq-layout">
          {/* ---- Category list (desktop: sidebar, mobile: scroll chips) ---- */}
          <aside className="fq-side">
            <p className="fq-side-title">Categories</p>
            <div className="fq-cats" role="tablist" aria-label="FAQ categories">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={category === c}
                  className={`fq-cat ${category === c ? "is-active" : ""}`}
                  onClick={() => {
                    setCategory(c);
                    setOpenId(null);
                  }}
                >
                  <span>{c}</span>
                  <em>{counts[c] || 0}</em>
                </button>
              ))}
            </div>
          </aside>

          {/* ---- Accordion ---- */}
          <div className="fq-list-wrap">
            {filtered.length > 0 ? (
              <div className="fq-list" key={`${category}-${query}`}>
                {filtered.map((f, i) => {
                  const open = openId === f.id;
                  return (
                    <Reveal key={f.id} delay={Math.min(i, 5) * 0.05} className={`fq-item ${open ? "is-open" : ""}`}>
                      <h3>
                        <button
                          type="button"
                          className="fq-q"
                          id={`fq-q-${f.id}`}
                          aria-expanded={open}
                          aria-controls={`fq-a-${f.id}`}
                          onClick={() => toggle(f.id)}
                        >
                          <span className="fq-q-text">{f.q}</span>
                          <span className="fq-chevron"><ChevronIcon /></span>
                        </button>
                      </h3>
                      <div
                        className="fq-a"
                        id={`fq-a-${f.id}`}
                        role="region"
                        aria-labelledby={`fq-q-${f.id}`}
                      >
                        <div className="fq-a-inner">
                          <p>{f.a}</p>
                          {category === "All" && <span className="fq-a-tag">{f.category}</span>}
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            ) : (
              <div className="fq-empty">
                <span className="fq-empty-icon"><HelpIcon /></span>
                <h3>No matching questions</h3>
                <p>Try a different keyword, or contact our team and we will answer you directly.</p>
                <div className="fq-empty-actions">
                  <button type="button" className="fq-btn fq-btn--ghost" onClick={reset}>
                    Clear search
                  </button>
                  <Link to="/contact" className="fq-btn">
                    Ask us <ArrowIcon />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= STILL HAVE QUESTIONS ================= */}
      <section className="fq-cta-wrap">
        <div className="fq-container">
          <Reveal className="fq-cta">
            <div className="fq-cta-text">
              <h2>Still have questions?</h2>
              <p>
                Our patient support team is ready to listen and guide you. Share your question and we will
                get back to you shortly.
              </p>
            </div>
            <div className="fq-cta-actions">
              <Link to="/contact" className="fq-btn fq-btn--white">
                Contact Us <ArrowIcon />
              </Link>
              <Link to="/services/doctor-appointment" className="fq-btn fq-btn--outline-white">
                <PhoneIcon /> Book Appointment
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default Faq;
