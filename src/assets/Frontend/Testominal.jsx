import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/Testominal.css";

// Image gula tomar project er path diye replace koro
import img1 from "../Image/Client/Maleena-Gomez-150x150.jpg";
import img2 from "../Image/Client/Dr.-Muhib-Ahmed-Shahin-150x150.jpg";
import img3 from "../Image/Client/Anwar-Hossain-Pahari-150x150.jpg";
import img4 from "../Image/Client/Zulia-Akhter-150x150.jpg";

/* ---------------------------- DATA ---------------------------- */
const testimonials = [
  {
    id: 1,
    name: "Maleena Gomez",
    location: "Dhaka, Bangladesh",
    image: img1,
    rating: 5,
    tag: "Check-up & surgery",
    text: "Akashbari Medical has not only guided me and my family during my check up and post-operative period but also monitored each & every steps of my treatment like an extended family. Due to their guidance we could save at least 15-20% treatment cost.",
  },
  {
    id: 2,
    name: "Dr. Muhib Ahmed Shahin",
    location: "Dhaka, Bangladesh",
    image: img2,
    rating: 5,
    tag: "Diagnosis & treatment",
    text: "I found out about Akashbari Medical Healthcare through a family friend. I was kindly advised and also guided with choosing the right doctor for diagnosis and also the whole process. I really appreciate the service and kind help Akashbari Medical Healthcare provide during the treatment period.",
  },
  {
    id: 3,
    name: "Anwar Hossain Pahari",
    location: "Dhaka, Bangladesh",
    image: img3,
    rating: 5,
    tag: "Medical visa",
    text: "Akashbari Medical helped me getting the medical visa. They actually organized all the papers regarding the visa. They arranged meeting With the doctor and provided me the best facility. They called and asked me about my health and other problems as if I Were their full responsibility.",
  },
  {
    id: 4,
    name: "Zulia Akhter",
    location: "Dhaka, Bangladesh",
    image: img4,
    rating: 5,
    tag: "Health check-up",
    text: "It was great experience with Akashbari Medical. I was kindly advised & also guided with choosing the right doctor. I really appreciate the service & kind help they provided during the check-up, tests & getting the reports on time. It all went very smoothly for me.",
  },
];

const AUTO_TIME = 6000; // 6 second por por porer review

// Gor rating data theke hishab
const avgRating = testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length;

/* ---------------------------- ICONS ---------------------------- */
const StarIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path fill="currentColor" d="M12 2.5l2.94 6.1 6.56.9-4.8 4.6 1.2 6.6L12 17.5l-5.9 3.2 1.2-6.6-4.8-4.6 6.56-.9L12 2.5z" />
  </svg>
);

const QuoteIcon = () => (
  <svg className="tst-quote" viewBox="0 0 84 58" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M0 8a8 8 0 0 1 8-8h22a8 8 0 0 1 8 8v26c0 13-8 21-22 24l-3-7c8-2 12-6 12-12H8a8 8 0 0 1-8-8V8zm46 0a8 8 0 0 1 8-8h22a8 8 0 0 1 8 8v26c0 13-8 21-22 24l-3-7c8-2 12-6 12-12H54a8 8 0 0 1-8-8V8z"
    />
  </svg>
);

const Arrow = ({ dir = "right" }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {dir === "right" ? <path d="M5 12h14M13 6l6 6-6 6" /> : <path d="M19 12H5M11 6l-6 6 6 6" />}
  </svg>
);

/* Chobi load na hole initials */
const Avatar = ({ t, className = "" }) => {
  const [failed, setFailed] = useState(!t.image);
  const initials = t.name.replace(/^Dr\.?\s*/i, "").split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <span className={`tst-avatar ${className}`}>
      {failed ? <b>{initials}</b> : <img src={t.image} alt="" loading="lazy" onError={() => setFailed(true)} />}
    </span>
  );
};

const Stars = ({ n, size }) => (
  <span className="tst-stars" role="img" aria-label={`${n} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < n ? "on" : ""}>
        <StarIcon size={size} />
      </span>
    ))}
  </span>
);

/* ---------------------------- SECTION ---------------------------- */
const Testominal = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((i) => setActive((i + testimonials.length) % testimonials.length), []);

  // Section screen e ashle animation
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Auto slide (hover / focus e theme thake, screen e na thakle chole na)
  useEffect(() => {
    if (!visible || paused) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => go(active + 1), AUTO_TIME);
    return () => clearTimeout(t);
  }, [visible, paused, active, go]);

  const t = testimonials[active];

  return (
    <section ref={sectionRef} className={`tst ${visible ? "is-visible" : ""}`} aria-labelledby="tst-title">
      <div className="tst-wrap">
        {/* ===== Left: heading + rating ===== */}
        <div className="tst-left">
          <span className="tst-label">Testimonials</span>
          <h2 className="tst-title" id="tst-title">
            What our <span>patients say</span> about us
          </h2>
          <p className="tst-sub">Making patient&apos;s life easier with our services. Real stories from families we helped.</p>

          <div className="tst-score">
            <strong>{avgRating.toFixed(1)}</strong>
            <div>
              <Stars n={Math.round(avgRating)} size={18} />
              <small>Average rating from {testimonials.length} patient reviews</small>
            </div>
          </div>

          <div className="tst-faces" aria-hidden="true">
            {testimonials.map((x) => (
              <Avatar key={x.id} t={x} className="tst-face" />
            ))}
            <span className="tst-face-more">+</span>
          </div>

          <Link to="/contact" className="tst-btn">
            Share Your Experience <Arrow />
          </Link>
        </div>

        {/* ===== Right: slider ===== */}
        <div
          className="tst-right"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="tst-card-stack">
            <span className="tst-card-back" aria-hidden="true" />
            <article className="tst-card" key={t.id} aria-live="polite">
              <QuoteIcon />
              <span className="tst-tag">{t.tag}</span>
              <Stars n={t.rating} size={18} />
              <blockquote className="tst-text">“{t.text}”</blockquote>

              <div className="tst-author">
                <Avatar t={t} className="tst-author-img" />
                <div>
                  <h3>{t.name}</h3>
                  <span>{t.location}</span>
                </div>
              </div>
            </article>
          </div>

          <div className="tst-nav">
            <div className="tst-thumbs" role="group" aria-label="Choose a review">
              {testimonials.map((x, i) => (
                <button
                  key={x.id}
                  type="button"
                  className={`tst-thumb ${i === active ? "is-active" : ""}`}
                  aria-label={`Review by ${x.name}`}
                  aria-current={i === active}
                  onClick={() => go(i)}
                >
                  <Avatar t={x} />
                </button>
              ))}
            </div>
            <div className="tst-arrows">
              <button type="button" aria-label="Previous review" onClick={() => go(active - 1)}>
                <Arrow dir="left" />
              </button>
              <button type="button" aria-label="Next review" onClick={() => go(active + 1)}>
                <Arrow />
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="tst-progress" aria-hidden="true">
            <i key={`${active}-${paused}`} className={paused || !visible ? "is-paused" : ""} style={{ "--t": `${AUTO_TIME}ms` }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testominal;
