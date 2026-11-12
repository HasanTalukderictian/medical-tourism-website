import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/About.css";

/* ---------------------------- IMAGES ----------------------------
   heroImg  -> Hero section er dan er image
   storyImg -> Our Story section er bam er image
------------------------------------------------------------------- */
import heroImg from "../Image/team/Team.jfif";
import storyImg from "../Image/team/team1.jfif";

/* ---------------------------- DATA ---------------------------- */
// Stat er sonkha gulo tomar asol tothyo diye replace koro
const stats = [
  { value: 5000, suffix: "+", label: "Patients Assisted" },
  { value: 50, suffix: "+", label: "Partner Hospitals" },
  { value: 5, suffix: "", label: "Countries Covered" },
  { value: 10, suffix: "+", label: "Medical Services" },
];

const storyPoints = [
  "Transparent and affordable treatment plans",
  "Fully guided journey from consultation to follow-up",
  "Visa, travel, stay, and hospital coordination in one place",
  "Dedicated support in your own language",
];

const reasons = [
  {
    icon: "shield",
    title: "Trusted Hospitals",
    text: "We work with carefully selected hospitals and specialists across Asia, so you can choose with confidence.",
  },
  {
    icon: "wallet",
    title: "Transparent Pricing",
    text: "Clear cost estimates before you travel. No hidden charges, and no surprises along the way.",
  },
  {
    icon: "route",
    title: "End-to-End Guidance",
    text: "From the first consultation and visa to travel, stay, and follow-up, we handle every step with you.",
  },
  {
    icon: "heart",
    title: "Patient-First Care",
    text: "Every patient is treated with empathy, dignity, and respect, whatever their financial background.",
  },
];

/* ---------------------------- ICONS ---------------------------- */
const svgBase = {
  viewBox: "0 0 24 24",
  width: 26,
  height: 26,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const Icon = ({ name }) => {
  switch (name) {
    case "shield":
      return (
        <svg {...svgBase}>
          <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "wallet":
      return (
        <svg {...svgBase}>
          <rect x="3" y="6" width="18" height="13" rx="3" />
          <path d="M3 10h18" />
          <circle cx="16.5" cy="14.5" r="1" fill="currentColor" />
        </svg>
      );
    case "route":
      return (
        <svg {...svgBase}>
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="18" cy="18" r="2.5" />
          <path d="M8.5 6H15a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h6.5" />
        </svg>
      );
    default:
      return (
        <svg {...svgBase}>
          <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
        </svg>
      );
  }
};

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

/* ------------------- Helpers ------------------- */
// Element screen e ashle ekbar true hoy
const useInView = (threshold = 0.15) => {
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
      { threshold }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, shown];
};

const Reveal = ({ children, className = "", direction = "up", delay = 0 }) => {
  const [ref, shown] = useInView(0.12);
  return (
    <div
      ref={ref}
      className={`ab-reveal ab-reveal--${direction} ${shown ? "is-shown" : ""} ${className}`}
      style={{ "--d": `${delay}s` }}
    >
      {children}
    </div>
  );
};

// 0 theke target porjonto ginte thakbe
const CountUp = ({ value, suffix = "" }) => {
  const [ref, shown] = useInView(0.4);
  const [num, setNum] = useState(0);

  useEffect(() => {
    if (!shown) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setNum(value);
      return;
    }
    const duration = 1600;
    let start = null;
    let frame;

    const tick = (t) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setNum(Math.round(value * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [shown, value]);

  return (
    <span ref={ref}>
      {num.toLocaleString()}
      {suffix}
    </span>
  );
};

const Pic = ({ src, alt, className = "" }) => {
  const [failed, setFailed] = useState(!src);
  return (
    <div className={`ab-pic ${failed ? "ab-pic--empty" : ""} ${className}`}>
      {failed ? (
        <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="9" cy="10" r="1.8" />
          <path d="M21 16l-5-5-8 8" />
        </svg>
      ) : (
        <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
      )}
    </div>
  );
};

/* ---------------------------- PAGE ---------------------------- */
const About = () => {
  return (
    <main className="ab-page">
      {/* ================= HERO ================= */}
      <section className="ab-hero">
        <div className="ab-blob ab-blob--one" aria-hidden="true" />
        <div className="ab-blob ab-blob--two" aria-hidden="true" />

        <div className="ab-container ab-hero-grid">
          <div className="ab-hero-text">
            <span className="ab-badge ab-in" style={{ "--d": "0s" }}>About Us</span>
            <h1 className="ab-hero-title ab-in" style={{ "--d": "0.1s" }}>
              Your trusted partner in every step of the <em>medical journey</em>
            </h1>
            <p className="ab-hero-desc ab-in" style={{ "--d": "0.2s" }}>
              Akashbari Medical bridges the gap between patients in Bangladesh and world-class medical
              facilities across the globe, with transparent, affordable, and fully guided care.
            </p>
            <div className="ab-hero-actions ab-in" style={{ "--d": "0.3s" }}>
              <Link to="/contact" className="ab-btn">
                Contact Us <ArrowIcon />
              </Link>
              <Link to="/services" className="ab-btn ab-btn--ghost">
                Our Services
              </Link>
            </div>
          </div>

          <div className="ab-hero-media ab-in" style={{ "--d": "0.25s" }}>
            <Pic src={heroImg} alt="Akashbari Medical team" className="ab-hero-pic" />
            <div className="ab-float-card">
              <span className="ab-float-icon"><Icon name="shield" /></span>
              <div>
                <strong>Trusted Care</strong>
                <small>Guided at every step</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="ab-stats">
        <div className="ab-container">
          <div className="ab-stats-grid">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1} className="ab-stat">
                <strong>
                  <CountUp value={s.value} suffix={s.suffix} />
                </strong>
                <span>{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STORY ================= */}
      <section className="ab-section">
        <div className="ab-container ab-story">
          <Reveal direction="left" className="ab-story-media">
            <Pic src={storyImg} alt="Our story" className="ab-story-pic" />
            <span className="ab-story-dot" aria-hidden="true" />
          </Reveal>

          <Reveal direction="right" className="ab-story-text">
            <span className="ab-label">Our Story</span>
            <h2 className="ab-title">Care without borders, built on trust</h2>
            <p>
              We started with a simple belief: where you live should never decide the quality of care you
              receive. Many families struggle to find the right hospital, understand the cost, and manage
              travel for treatment abroad.
            </p>
            <p>
              Akashbari Medical exists to make that journey simple. We connect patients, doctors, and
              hospitals, and guide every patient with empathy and excellence, from the first consultation to
              the final follow-up.
            </p>

            <ul className="ab-points">
              {storyPoints.map((p) => (
                <li key={p}>
                  <span className="ab-tick"><CheckIcon /></span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="ab-section ab-section--soft">
        <div className="ab-container">
          <Reveal className="ab-head">
            <span className="ab-label">Why Choose Us</span>
            <h2 className="ab-title">What makes us different</h2>
            <p className="ab-sub">
              We combine medical expertise with personal care, so patients and their families feel supported
              from the very first call.
            </p>
          </Reveal>

          <div className="ab-reasons">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.1} className="ab-reason">
                <span className="ab-reason-icon"><Icon name={r.icon} /></span>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="ab-section ab-cta-wrap">
        <div className="ab-container">
          <Reveal className="ab-cta">
            <div>
              <h2>Ready to take the next step in your treatment?</h2>
              <p>Talk to our team today and get clear guidance, a cost estimate, and the right specialist.</p>
            </div>
            <div className="ab-cta-actions">
              <Link to="/services/doctor-appointment" className="ab-btn ab-btn--white">
                Book Appointment <ArrowIcon />
              </Link>
              <Link to="/contact" className="ab-btn ab-btn--outline-white">
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default About;