import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/Banner.css";

// Nijer image gulo ekhane import korun (minimum 2ta, joto khushi)
import bg1 from "../Image/Banner/imagebanner1.jpg.jpg";
import bg2 from "../Image/Banner/banner2.jpg.jpg";
import bg3 from "../Image/Banner/banner3.jpg.jpg";

/* ---------------------------- DATA ---------------------------- */
const slides = [bg1, bg2, bg3];
const SLIDE_TIME = 5000; // 5 second (2 second e lekha porar somoy thake na)

// Typing effect e ei lekha gulo ek ek kore ashbe
const typedWords = ["EMPOWERING PEOPLE", "CONNECTING HOSPITALS", "CARING ACROSS BORDERS"];

// SAMPLE number, tomader asol number diye bodlao
const stats = [
  { value: "40+", label: "Partner hospitals" },
  { value: "6", label: "Countries" },
  { value: "24/7", label: "Patient support" },
];

const trustPoints = ["Free medical opinion", "Visa & travel support", "Bangla-speaking team"];

const contact = {
  address: "House 43, Road 7, Block G, Banani Dhaka 1213",
  mapLink: "https://maps.google.com/?q=House+43,+Road+7,+Block+G,+Banani,+Dhaka+1213",
  email: "medicalservice.akbh@gmail.com",
  phones: ["+8801335-075563", "+8801335-146058"],
};

/* ---------------------------- ICONS ---------------------------- */
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const Icon = ({ name, size = 20 }) => {
  const p = { ...base, width: size, height: size };
  switch (name) {
    case "pin":
      return <svg {...p}><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>;
    case "mail":
      return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>;
    case "phone":
      return <svg {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>;
    case "arrow":
      return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case "left":
      return <svg {...p}><path d="M15 6l-6 6 6 6" /></svg>;
    case "right":
      return <svg {...p}><path d="M9 6l6 6-6 6" /></svg>;
    case "cross":
      return <svg {...p}><path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" /></svg>;
    default:
      return <svg {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>;
  }
};

/* ------------------- Typing effect ------------------- */
const Typewriter = ({ words }) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    // Reduced motion hole shudhu prothom word, typing chara
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setText(words[0]);
      return;
    }
    const word = words[index % words.length];
    let delay = deleting ? 45 : 90;
    if (!deleting && text === word) delay = 1800; // puro lekha hole ektu thame
    if (deleting && text === "") delay = 300;

    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, words]);

  return (
    <span className="bn-typed">
      {/* Screen reader puro lekha pore */}
      <span className="bn-sr">{words[0]}</span>
      <span aria-hidden="true">{text}</span>
      <span className="bn-cursor" aria-hidden="true" />
    </span>
  );
};

/* ---------------------------- BANNER ---------------------------- */
const Banner = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((i) => setCurrent((i + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), SLIDE_TIME);
    return () => clearInterval(timer);
  }, [paused, current]);

  return (
    <section
      className="bn"
      aria-label="Akashbari Medical Tourism"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ===== Background slideshow ===== */}
      <div className="bn-slides" aria-hidden="true">
        {slides.map((img, i) => (
          <div
            key={i}
            className={`bn-slide ${i === current ? "is-active" : ""}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>
      <div className="bn-overlay" aria-hidden="true" />

      {/* ===== Content ===== */}
      <div className="bn-wrap bn-main">
        <div className="bn-content">
          <span className="bn-tag bn-in" style={{ "--d": "0s" }}>
            <Icon name="cross" size={14} /> Akashbari Medical Tourism
          </span>

          <h1 className="bn-title bn-in" style={{ "--d": "0.1s" }}>
            Saving lives by
            <br />
            <Typewriter words={typedWords} />
          </h1>

          <p className="bn-text bn-in" style={{ "--d": "0.2s" }}>
            We create a shared space for patients, doctors, and hospitals, providing quality, accessible, and
            affordable medical care across the globe.
          </p>

          <ul className="bn-trust bn-in" style={{ "--d": "0.3s" }}>
            {trustPoints.map((t) => (
              <li key={t}>
                <span><Icon name="check" size={12} /></span> {t}
              </li>
            ))}
          </ul>

          <div className="bn-buttons bn-in" style={{ "--d": "0.4s" }}>
            <Link to="/packages" className="bn-btn bn-btn--green">
              Explore Packages <Icon name="arrow" size={17} />
            </Link>
            <Link to="/plan/treatment" className="bn-btn bn-btn--green">
              Plan Your Treatment <Icon name="arrow" size={17} />
            </Link>
            <Link to="/contact" className="bn-btn bn-btn--glass">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Stats + slider controls (dan pashe) */}
        <div className="bn-side bn-in" style={{ "--d": "0.5s" }}>
          <ul className="bn-stats">
            {stats.map((s) => (
              <li key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>

          {slides.length > 1 && (
            <div className="bn-controls">
              <button type="button" className="bn-arrow" aria-label="Previous slide" onClick={() => go(current - 1)}>
                <Icon name="left" size={18} />
              </button>
              <div className="bn-dots" role="group" aria-label="Choose slide">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Slide ${i + 1}`}
                    aria-current={i === current}
                    className={`bn-dot ${i === current ? "is-active" : ""} ${paused ? "is-paused" : ""}`}
                    style={{ "--t": `${SLIDE_TIME}ms` }}
                    onClick={() => go(i)}
                  >
                    <i />
                  </button>
                ))}
              </div>
              <button type="button" className="bn-arrow" aria-label="Next slide" onClick={() => go(current + 1)}>
                <Icon name="right" size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ===== Info cards ===== */}
      <div className="bn-wrap">
        <div className="bn-cards">
          <a href={contact.mapLink} target="_blank" rel="noopener noreferrer" className="bn-card bn-card--green">
            <span className="bn-card-icon"><Icon name="pin" size={22} /></span>
            <span className="bn-card-body">
              <small>Our Location</small>
              <strong>{contact.address}</strong>
            </span>
            <span className="bn-card-go" aria-hidden="true"><Icon name="arrow" size={16} /></span>
          </a>

          <a href={`mailto:${contact.email}`} className="bn-card bn-card--orange">
            <span className="bn-card-icon"><Icon name="mail" size={22} /></span>
            <span className="bn-card-body">
              <small>Any Inquiries?</small>
              {/* @ er por line bhangte pare, majhkhane na */}
              <strong className="bn-email">
                {contact.email.split("@")[0]}@<wbr />
                {contact.email.split("@")[1]}
              </strong>
            </span>
            <span className="bn-card-go" aria-hidden="true"><Icon name="arrow" size={16} /></span>
          </a>

          <div className="bn-card bn-card--white">
            <span className="bn-card-icon"><Icon name="phone" size={22} /></span>
            <span className="bn-card-body">
              <small>
                <span className="bn-live" aria-hidden="true" /> Emergency Call (24/7)
              </small>
              {contact.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/[^\d+]/g, "")}`}>{p}</a>
              ))}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
