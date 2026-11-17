import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/SisterConcern.css";

import akashbari from '../Image/logo/logo.png'
import Rupkatha from '../Image/logo/Rupkotha-removebg-preview-COdq_v0G.png'
import AGS from '../Image/logo/1785228461064_ags.jpg'
import cholojai from '../Image/logo/logo (6).jpg'
import resort from '../Image/logo/Akashbari-resort-logo-png-01.png'
import medical from '../Image/logo/AKBH MEDICAL-01.png'
import rupkothaedu from '../Image/logo/Edu-world.jpg';

/* =====================================================================
   SISTER CONCERN DATA
   ---------------------------------------------------------------------
   - Description / services SAMPLE. Prottek company r asol info diye update koro.
   - Logo thakle import kore `logo` e dao (jemon: logo: HolidaysLogo).
     Logo na thakle initials (short) diye sundor badge dekhabe.
   - Website na thakle `url: null` dao. Tokhon "Contact us" button dekhabe.
   - Ei website er nijer page hole `internal: true` dao (jemon Akashbari Medical).
   - subtitle = company r role (GROUP HEAD / INDEPENDENT COMPANY / SISTER CONCERN).
     Company list e category r niche chhoto kore dekhay.
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
    subtitle: "Group Head",
    color: "#689f38",
    logo: akashbari,
    img: u("photo-1507525428034-b723cf961d3e"),
    tagline: "Holiday packages, made simple",
    text: "Complete holiday solutions for families, couples and groups, with tour packages, hotel booking and travel planning at home and abroad.",
    services: ["Tour packages", "Hotel booking", "Air tickets", "Visa support"],
  },
  {
    id: "resort",
    name: "Akashbari Hotels & Resorts",
    short: "AR",
    url: "https://akashbariresort.com/",
    domain: "akashbariresort.com",
    category: "5-Star Resorts",
    subtitle: "Independent Company",
    color: "#c2603a",
    logo: resort,
    img: u("photo-1566073771259-6a8506099945"),
    tagline: "Relax, refresh, reconnect with nature",
    text: "A peaceful resort for weekend getaways, family holidays and corporate events, with comfortable rooms, fresh food and natural surroundings.",
    services: ["Rooms & cottages", "Restaurant", "Events & picnics", "Day-long packages"],
  },
  {
    // Ei website (nijer). Visit e home page e jabe
    id: "medical",
    name: "Akashbari Medical",
    short: "AM",
    url: "/",
    internal: true,
    domain: "akashbarimedical.com",
    category: "Medical Tourism",
    subtitle: "Sister Concern",
    color: "#4f7d29",
    logo: medical,
    img: u("photo-1519494026892-80bbd2d6fd0d"),
    tagline: "World-class treatment abroad, made simple",
    text: "Complete medical tourism support, from choosing the right hospital and doctor to medical visa, travel, stay and care until recovery.",
    services: ["Treatment planning", "Hospital & doctor booking", "Medical visa support", "Patient support abroad"],
  },
  {
    id: "rupkatha",
    name: "Rupkatha Tours BD",
    short: "RT",
    url: "https://rupkathatoursbd.com/",
    domain: "rupkathatoursbd.com",
    category: "Tours & Travel",
    subtitle: "Sister Concern",
    color: "#f58a3c",
    logo: Rupkatha,
    img: u("photo-1469854523086-cc02fe5d8800"),
    tagline: "Explore the beauty of Bangladesh",
    text: "Guided tours and group trips to the most beautiful places in Bangladesh and beyond, planned with care so you can just enjoy the journey.",
    services: ["Group tours", "Domestic trips", "Corporate tours", "Guided travel"],
  },
  {
    // Website nai, tai url: null
    id: "eduworld",
    name: "Rupkatha EduWorld",
    short: "RE",
    url: null,
    domain: null,
    category: "Student Consultation",
    subtitle: "Sister Concern",
    color: "#2563a8",
    logo: rupkothaedu,
    img: u("photo-1523240795612-9a054b0db644"),
    tagline: "Your pathway to the right university",
    text: "Friendly, honest student consultation for study abroad, from choosing a country and course to applications, documents and visa preparation.",
    services: ["Study abroad counselling", "Course & university selection", "Application support", "Visa preparation"],
  },
  {
    id: "global",
    name: "AGS-Akashbari Global Services",
    short: "AG",
    url: "https://www.akashbariglobalservice.com/",
    domain: "akashbariglobalservice.com",
    category: "Student Counseling",
    subtitle: "Sister Concern",
    color: "#2f7f8f",
    logo: AGS,
    img: u("photo-1523050854058-8df90110c9f1"),
    tagline: "Your trusted guide to studying abroad",
    text: "Expert guidance for students who dream of studying abroad, from choosing the right country and university to admission, scholarships and student visa.",
    services: ["University admission", "Student visa", "Scholarship guidance", "IELTS & test prep"],
  },
  {
    id: "cholojai",
    name: "Cholojai",
    short: "CJ",
    url: "https://cholojai.co/",
    domain: "cholojai.co",
    category: "Online Travel",
    subtitle: "Sister Concern",
    color: "#7a5cc7",
    logo: cholojai,
    img: u("photo-1488646953014-85cb44e25828"),
    tagline: "Let's go, anywhere, anytime",
    text: "An easy online platform to plan and book your next trip. Search, compare and book travel in just a few clicks.",
    services: ["Online booking", "Flights", "Hotels", "Travel deals"],
  },
];

/* Orbit: majhkhane Akashbari Holidays (Group Head), chare pashe baki company */
const CENTER_ID = "holidays";
const center = concerns.find((c) => c.id === CENTER_ID);
const orbitList = concerns.filter((c) => c.id !== CENTER_ID);

const stats = [
  { value: concerns.length, suffix: "", label: "Companies in the group" },
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
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
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
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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

// Company r role (GROUP HEAD / INDEPENDENT COMPANY / SISTER CONCERN)
const Role = ({ c }) => (c.subtitle ? <span className="sc-role">{c.subtitle}</span> : null);

// Website link: nijer site hole <Link>, onno site hole notun tab e
const SiteLink = ({ c, className, children, label }) =>
  c.internal ? (
    <Link to={c.url} className={className} aria-label={label}>
      {children}
    </Link>
  ) : (
    <a href={c.url} target="_blank" rel="noopener noreferrer" className={className} aria-label={label}>
      {children}
    </a>
  );

// Logo thakle image, na thakle initials badge
const Logo = ({ c, size = "md" }) => (
  <span className={`sc-logo sc-logo--${size}`} style={{ "--c": c.color }}>
    {c.logo ? <img src={c.logo} alt="" /> : c.short}
  </span>
);

/* ---------------------------- PAGE ---------------------------- */
const SisterConcern = () => {
  const [hover, setHover] = useState(null);

  // Orbit er node (click korle niche oi company te jay)
  const nodeProps = (c) => ({
    className: `sc-orbit-node ${hover === c.id ? "is-hover" : ""}`,
    onMouseEnter: () => setHover(c.id),
    onMouseLeave: () => setHover(null),
    onFocus: () => setHover(c.id),
    onBlur: () => setHover(null),
  });

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
              Akashbari Medical is part of a growing family of companies in healthcare, travel, education, and
              hospitality. Together, we take care of your journey from start to finish.
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

          {/* Orbit: center = Akashbari Holidays, around = Akashbari Medical + sister concerns */}
          <div className="sc-orbit sc-in" style={{ "--d": "0.25s", "--n": orbitList.length }} aria-label="Akashbari group of companies">
            <div className="sc-orbit-ring sc-orbit-ring--1" aria-hidden="true" />
            <div className="sc-orbit-ring sc-orbit-ring--2" aria-hidden="true" />
            <div className="sc-orbit-center">
              <span className="sc-orbit-pulse" aria-hidden="true" />
              <img src={center.logo} alt={center.name} className="sc-orbit-logo" />
            </div>
            <ul className="sc-orbit-track">
              {orbitList.map((c, i) => (
                <li key={c.id} className="sc-orbit-item" style={{ "--i": i }}>
                  <a href={`#sc-${c.id}`} {...nodeProps(c)}>
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
                  <Role c={c} />
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
            {concerns.map((c, i) => {
              const browserInner = (
                <>
                  <div className="sc-browser-bar" aria-hidden="true">
                    <span className="sc-dots"><i /><i /><i /></span>
                    {c.url ? (
                      <span className="sc-url">
                        <Icon name="lock" size={12} /> {c.domain}
                      </span>
                    ) : (
                      <span className="sc-url sc-url--soon">
                        <Icon name="clock" size={12} /> Website coming soon
                      </span>
                    )}
                  </div>
                  <div className="sc-browser-body">
                    <Pic src={c.img} alt="" className="sc-browser-pic" />
                    <span className="sc-browser-overlay">
                      {c.url ? (
                        <span>Visit website <Icon name={c.internal ? "arrow" : "external"} size={16} /></span>
                      ) : (
                        <span>Website coming soon</span>
                      )}
                    </span>
                  </div>
                </>
              );

              return (
                <article key={c.id} id={`sc-${c.id}`} className={`sc-company ${i % 2 ? "sc-company--flip" : ""}`} style={{ "--c": c.color }}>
                  {/* Browser-window mockup */}
                  <Reveal direction={i % 2 ? "right" : "left"} className="sc-browser-wrap">
                    {c.url ? (
                      <SiteLink
                        c={c}
                        className="sc-browser"
                        label={c.internal ? `Go to ${c.name} home page` : `Visit ${c.name} website (opens in a new tab)`}
                      >
                        {browserInner}
                      </SiteLink>
                    ) : (
                      <div className="sc-browser sc-browser--static">{browserInner}</div>
                    )}
                    <span className="sc-number" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
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
                    {c.url ? (
                      <SiteLink c={c} className="sc-visit">
                        Visit {c.domain} <Icon name={c.internal ? "arrow" : "external"} size={16} />
                        {!c.internal && <span className="sc-sr"> (opens in a new tab)</span>}
                      </SiteLink>
                    ) : (
                      <Link to="/contact" className="sc-visit sc-visit--contact">
                        <Icon name="phone" size={16} /> Contact us for details
                      </Link>
                    )}
                  </Reveal>
                </article>
              );
            })}
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
              Whether you are a patient, a traveller, a student, or a guest at our resort, you will feel the same
              care and trust that the Akashbari name stands for.
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
    </main>
  );
};

export default SisterConcern;
