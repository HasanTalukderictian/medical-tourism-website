import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/SisterConcern.css";

/* =====================================================================
   SISTER CONCERN DATA
   ---------------------------------------------------------------------
   - Description / services SAMPLE. Prottek company r asol info diye update koro.
   - Logo thakle import kore `logo` e dao (jemon: logo: HolidaysLogo).
     Logo na thakle initials (short) diye sundor badge dekhabe.
   - Image: online (Unsplash). Chaile website er screenshot / local image dao.
   ===================================================================== */
const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1100&q=80`;

const concerns = [
  {
    id: "holidays",
    name: "Akashbari Holidays",
    short: "AH",
    url: "https://www.akashbariholidays.com/",
    domain: "akashbariholidays.com",
    category: "Travel & Holidays",
    color: "#689f38",
    logo: null,
    img: u("photo-1507525428034-b723cf961d3e"),
    tagline: "Holiday packages, made simple",
    text: "Complete holiday solutions for families, couples and groups, with tour packages, hotel booking and travel planning at home and abroad.",
    services: ["Tour packages", "Hotel booking", "Air tickets", "Visa support"],
  },
  {
    id: "rupkatha",
    name: "Rupkatha Tours BD",
    short: "RT",
    url: "https://rupkathatoursbd.com/",
    domain: "rupkathatoursbd.com",
    category: "Tours & Travel",
    color: "#f58a3c",
    logo: null,
    img: u("photo-1469854523086-cc02fe5d8800"),
    tagline: "Explore the beauty of Bangladesh",
    text: "Guided tours and group trips to the most beautiful places in Bangladesh and beyond, planned with care so you can just enjoy the journey.",
    services: ["Group tours", "Domestic trips", "Corporate tours", "Guided travel"],
  },
  {
    id: "global",
    name: "Akashbari Global Service",
    short: "AG",
    url: "https://www.akashbariglobalservice.com/",
    domain: "akashbariglobalservice.com",
    category: "Global Services",
    color: "#2f7f8f",
    logo: null,
    img: u("photo-1436491865332-7a61a109cc05"),
    tagline: "Your trusted partner for going abroad",
    text: "Professional support for international travel, including visa processing, documentation and consultancy for people travelling overseas.",
    services: ["Visa processing", "Documentation", "Consultancy", "Ticketing"],
  },
  {
    id: "cholojai",
    name: "Cholojai",
    short: "CJ",
    url: "https://cholojai.co/",
    domain: "cholojai.co",
    category: "Online Travel",
    color: "#7a5cc7",
    logo: null,
    img: u("photo-1488646953014-85cb44e25828"),
    tagline: "Let's go, anywhere, anytime",
    text: "An easy online platform to plan and book your next trip. Search, compare and book travel in just a few clicks.",
    services: ["Online booking", "Flights", "Hotels", "Travel deals"],
  },
  {
    id: "resort",
    name: "Akashbari Resort",
    short: "AR",
    url: "https://akashbariresort.com/",
    domain: "akashbariresort.com",
    category: "Resort & Hospitality",
    color: "#c2603a",
    logo: null,
    img: u("photo-1566073771259-6a8506099945"),
    tagline: "Relax, refresh, reconnect with nature",
    text: "A peaceful resort for weekend getaways, family holidays and corporate events, with comfortable rooms, fresh food and natural surroundings.",
    services: ["Rooms & cottages", "Restaurant", "Events & picnics", "Day-long packages"],
  },
];

const stats = [
  { value: concerns.length + 1, suffix: "", label: "Companies in the group" },
  { value: 10, suffix: "+", label: "Years of service" },
  { value: 50, suffix: "K+", label: "Happy customers" },
  { value: 100, suffix: "+", label: "Team members" },
];

// Ekjon patient / traveller kivabe pura group er service pay
const journey = [
  { icon: "heart", title: "Treatment plan", by: "Akashbari Medical", text: "We find the right hospital and doctor." },
  { icon: "doc", title: "Visa & documents", by: "Akashbari Global Service", text: "Visa file and paperwork handled." },
  { icon: "plane", title: "Tickets & travel", by: "Akashbari Holidays · Cholojai", text: "Best fares and easy booking." },
  { icon: "leaf", title: "Rest & recovery", by: "Akashbari Resort · Rupkatha Tours", text: "Relax and recover after treatment." },
];

const values = [
  { icon: "shield", title: "Trust", text: "One family name, one promise of honest service." },
  { icon: "users", title: "Customer first", text: "Every company puts people before profit." },
  { icon: "award", title: "Quality", text: "Same standard of care across all our services." },
  { icon: "link", title: "Connected", text: "Our companies work together to serve you better." },
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

const paths = {
  heart: <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />,
  doc: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
  plane: <path d="M10.5 13.5L3 11l1.5-1.5 8 .5 4-4.5a2 2 0 0 1 3 3L15.5 13l.5 8L14.5 22.5 12 15" />,
  leaf: <><path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15" /><path d="M5 19l7-7" /></>,
  shield: <><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c.6-3.4 3-5 6-5s5.4 1.6 6 5" /><circle cx="17" cy="9" r="2.4" /><path d="M16.5 14.2c2.4.2 4 1.7 4.5 4.3" /></>,
  award: <><circle cx="12" cy="9" r="5.5" /><path d="M8.5 13.5L7 21l5-2.5 5 2.5-1.5-7.5" /></>,
  link: <><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></>,
  external: <><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.8" /><path d="M21 16l-5-5-8 8" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
};

const Icon = ({ name, size = 24 }) => (
  <svg {...base} width={size} height={size}>
    {paths[name] || paths.check}
  </svg>
);

/* ------------------- Helpers ------------------- */
const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
};

const Reveal = ({ children, className = "", delay = 0, direction = "up", as: Tag = "div", style, ...rest }) => {
  const [ref, shown] = useInView();
  return (
    <Tag
      ref={ref}
      className={`sc-reveal sc-reveal--${direction} ${shown ? "is-shown" : ""} ${className}`}
      style={{ "--d": `${delay}s`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

const Counter = ({ value, suffix }) => {
  const [ref, inView] = useInView(0.4);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      return;
    }
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const k = Math.min(1, (t - start) / 1400);
      setN(Math.round(value * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <strong ref={ref}>
      {n}
      {suffix}
    </strong>
  );
};

const Pic = ({ src, alt, className = "" }) => {
  const [failed, setFailed] = useState(!src);
  return (
    <div className={`sc-pic ${failed ? "sc-pic--empty" : ""} ${className}`}>
      {failed ? <Icon name="image" size={40} /> : <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />}
    </div>
  );
};

// Logo thakle image, na thakle initials badge
const Logo = ({ c, size = "md" }) => (
  <span className={`sc-logo sc-logo--${size}`} style={{ "--c": c.color }}>
    {c.logo ? <img src={c.logo} alt="" /> : c.short}
  </span>
);

/* ---------------------------- PAGE ---------------------------- */
const SisterConcern = () => {
  const [hover, setHover] = useState(null);

  return (
    <main className="sc-page">
      {/* ================= HERO with orbit ================= */}
      <section className="sc-hero">
        <div className="sc-container sc-hero-grid">
          <div className="sc-hero-text">
            <span className="sc-chip sc-in" style={{ "--d": "0s" }}>
              <Icon name="link" size={15} /> Our Sister Concerns
            </span>
            <h1 className="sc-in" style={{ "--d": "0.1s" }}>
              One family, <br />
              <span>many ways</span> to serve you.
            </h1>
            <p className="sc-in" style={{ "--d": "0.2s" }}>
              Akashbari Medical is part of a growing family of companies in healthcare, travel, global
              services, and hospitality. Together, we take care of your journey from start to finish.
            </p>
            <div className="sc-hero-actions sc-in" style={{ "--d": "0.3s" }}>
              <a href="#sc-companies" className="sc-btn">
                Meet Our Companies <Icon name="arrow" size={16} />
              </a>
              <Link to="/contact" className="sc-btn sc-btn--ghost">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Orbit: center = Akashbari Medical, around = sister concerns */}
          <div className="sc-orbit sc-in" style={{ "--d": "0.25s", "--n": concerns.length }} aria-label="Akashbari group of companies">
            <div className="sc-orbit-ring sc-orbit-ring--1" aria-hidden="true" />
            <div className="sc-orbit-ring sc-orbit-ring--2" aria-hidden="true" />
            <div className="sc-orbit-center">
              <span className="sc-orbit-pulse" aria-hidden="true" />
              <Icon name="heart" size={28} />
              <strong>Akashbari</strong>
              <small>Medical</small>
            </div>
            <ul className="sc-orbit-track">
              {concerns.map((c, i) => (
                <li key={c.id} className="sc-orbit-item" style={{ "--i": i }}>
                  <a
                    href={`#sc-${c.id}`}
                    className={`sc-orbit-node ${hover === c.id ? "is-hover" : ""}`}
                    onMouseEnter={() => setHover(c.id)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(c.id)}
                    onBlur={() => setHover(null)}
                  >
                    <Logo c={c} size="sm" />
                    <span className="sc-orbit-name">{c.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <div className="sc-container">
        <Reveal className="sc-stats">
          {stats.map((s) => (
            <div key={s.label} className="sc-stat">
              <Counter value={s.value} suffix={s.suffix} />
              <span>{s.label}</span>
            </div>
          ))}
        </Reveal>
      </div>

      {/* ================= QUICK LOGO STRIP ================= */}
      <section className="sc-section sc-section--tight">
        <div className="sc-container">
          <Reveal className="sc-strip">
            {concerns.map((c) => (
              <a key={c.id} href={`#sc-${c.id}`} className="sc-strip-item" style={{ "--c": c.color }}>
                <Logo c={c} />
                <span>
                  <strong>{c.name}</strong>
                  <small>{c.category}</small>
                </span>
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ================= COMPANIES (zigzag showcase) ================= */}
      <section className="sc-section" id="sc-companies">
        <div className="sc-container">
          <Reveal className="sc-head">
            <span className="sc-label">Our Companies</span>
            <h2 className="sc-title">Meet the Akashbari family</h2>
            <p>Each company is an expert in its own field, and all share the same promise: honest, caring service.</p>
          </Reveal>

          <div className="sc-list">
            {concerns.map((c, i) => (
              <article key={c.id} id={`sc-${c.id}`} className={`sc-company ${i % 2 ? "sc-company--flip" : ""}`} style={{ "--c": c.color }}>
                {/* Browser-window mockup */}
                <Reveal direction={i % 2 ? "right" : "left"} className="sc-browser-wrap">
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="sc-browser" aria-label={`Visit ${c.name} website (opens in a new tab)`}>
                    <div className="sc-browser-bar" aria-hidden="true">
                      <span className="sc-dots"><i /><i /><i /></span>
                      <span className="sc-url">
                        <Icon name="lock" size={12} /> {c.domain}
                      </span>
                    </div>
                    <div className="sc-browser-body">
                      <Pic src={c.img} alt="" className="sc-browser-pic" />
                      <span className="sc-browser-overlay">
                        <span>Visit website <Icon name="external" size={16} /></span>
                      </span>
                    </div>
                  </a>
                  <span className="sc-number" aria-hidden="true">0{i + 1}</span>
                </Reveal>

                <Reveal direction={i % 2 ? "left" : "right"} className="sc-company-text">
                  <div className="sc-company-top">
                    <Logo c={c} size="lg" />
                    <span className="sc-cat">{c.category}</span>
                  </div>
                  <h3>{c.name}</h3>
                  <p className="sc-tagline">{c.tagline}</p>
                  <p className="sc-desc">{c.text}</p>
                  <ul className="sc-services">
                    {c.services.map((s) => (
                      <li key={s}>
                        <span><Icon name="check" size={12} /></span> {s}
                      </li>
                    ))}
                  </ul>
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="sc-visit">
                    Visit {c.domain} <Icon name="external" size={16} />
                    <span className="sc-sr"> (opens in a new tab)</span>
                  </a>
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONNECTED JOURNEY ================= */}
      <section className="sc-journey-wrap">
        <div className="sc-container">
          <Reveal className="sc-head">
            <span className="sc-label sc-label--light">Better Together</span>
            <h2 className="sc-title sc-title--light">How our companies work together for you</h2>
            <p>One call to us, and the whole family takes care of your trip, from treatment to relaxation.</p>
          </Reveal>

          <ol className="sc-journey">
            {journey.map((j, i) => (
              <Reveal as="li" key={j.title} delay={i * 0.12} className="sc-jstep">
                <span className="sc-jicon">
                  <Icon name={j.icon} size={26} />
                </span>
                <span className="sc-jno">Step {i + 1}</span>
                <h3>{j.title}</h3>
                <p>{j.text}</p>
                <small>{j.by}</small>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="sc-section">
        <div className="sc-container sc-values-grid">
          <Reveal direction="left" className="sc-values-intro">
            <span className="sc-label">Our Values</span>
            <h2 className="sc-title">Different services, the same heart</h2>
            <p>
              Whether you are a patient, a traveller, or a guest at our resort, you will feel the same care and
              trust that the Akashbari name stands for.
            </p>
          </Reveal>

          <div className="sc-values">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08} className="sc-value">
                <span className="sc-value-icon"><Icon name={v.icon} size={24} /></span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="sc-cta-wrap">
        <div className="sc-container">
          <Reveal className="sc-cta">
            <div className="sc-cta-logos" aria-hidden="true">
              {concerns.map((c) => (
                <Logo key={c.id} c={c} size="sm" />
              ))}
            </div>
            <h2>Want to work with the Akashbari group?</h2>
            <p>For partnerships, corporate services, or any question about our companies, we are happy to talk.</p>
            <div className="sc-cta-actions">
              <Link to="/contact" className="sc-btn sc-btn--white">
                Contact Us <Icon name="arrow" size={16} />
              </Link>
          
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default SisterConcern;
