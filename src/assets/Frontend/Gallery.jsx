import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/Gallery.css";

import image from "../Image/Banner/banner2.jpg.jpg";
import image1 from "../Image/Banner/imagebanner1.jpg.jpg";
import image2 from "../Image/Banner/banner3.jpg.jpg";
import image3 from "../Image/team/Team.jfif";
import image4 from "../Image/Offer/image10.jpeg";
import image5 from "../Image/Offer/image1.jpeg";
import image6 from "../Image/Offer/image11.jpeg";
import image7 from "../Image/Offer/image12.jpeg";




/* ---------------------------- DATA ---------------------------- */
/* Notun photo add korte: upore import koro, tarpor ekhane ekta object add koro.
   `category` ta `categories` array er ekta hote hobe. Title ar category tomar moto edit koro. */
const categories = ["All", "Hospitals", "Patient Care", "Events"];

const photos = [
  {
    id: 1,
    src: image,
    title: "World-class medical facilities",
    category: "Hospitals",
  },
  {
    id: 2,
    src: image1,
    title: "Guided care at every step",
    category: "Patient Care",
  },
  {
    id: 3,
    src: image2,
    title: "Our team in action",
    category: "Events",
  },
   {
    id: 4,
    src: image3,
    title: "Our team in action",
    category: "Events",
  },
  {
    id: 5,
    src: image4,
    title: "Our team in action",
    category: "Events",
  },
  {
    id: 6,
    src: image5,
    title: "Our team in action",
    category: "Events",
  },
  {
    id: 6,
    src: image5,
    title: "Our team in action",
    category: "Events",
  },
  {
    id: 7,
    src: image6,
    title: "Our team in action",
    category: "Events",
  },
  {
    id: 8,
    src: image7,
    title: "Our team in action",
    category: "Events",
  },
];

/* ---------------------------- ICONS ---------------------------- */
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const ZoomIcon = () => (
  <svg {...base} width="20" height="20">
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5M11 8v6M8 11h6" />
  </svg>
);

const CloseIcon = () => (
  <svg {...base} width="22" height="22">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

const PrevIcon = () => (
  <svg {...base} width="22" height="22">
    <path d="M15 5l-7 7 7 7" />
  </svg>
);

const NextIcon = () => (
  <svg {...base} width="22" height="22">
    <path d="M9 5l7 7-7 7" />
  </svg>
);

const ArrowIcon = () => (
  <svg {...base} width="14" height="14">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

/* ------------------- Scroll reveal ------------------- */
const Reveal = ({ children, className = "", delay = 0 }) => {
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
      className={`gl-reveal ${shown ? "is-shown" : ""} ${className}`}
      style={{ "--d": `${delay}s` }}
    >
      {children}
    </div>
  );
};

/* ---------------------------- PAGE ---------------------------- */
const Gallery = () => {
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState(null); // lightbox e kon photo khola (index)
  const closeBtnRef = useRef(null);
  const touchStartX = useRef(null);

  const filtered = category === "All" ? photos : photos.filter((p) => p.category === category);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length)),
    [filtered.length]
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % filtered.length)),
    [filtered.length]
  );

  // Keyboard: Esc, Left, Right
  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, prev, next]);

  // Lightbox khola thakle background scroll bondho + close button e focus
  useEffect(() => {
    if (active === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) (diff > 0 ? prev : next)();
    touchStartX.current = null;
  };

  const current = active !== null ? filtered[active] : null;

  return (
    <main className="gl-page">
      {/* ================= HERO ================= */}
      <section className="gl-hero">
        <div className="gl-blob gl-blob--one" aria-hidden="true" />
        <div className="gl-blob gl-blob--two" aria-hidden="true" />

        <div className="gl-container gl-hero-inner">
          <span className="gl-badge gl-in" style={{ "--d": "0s" }}>Gallery</span>
          <h1 className="gl-hero-title gl-in" style={{ "--d": "0.1s" }}>
            Moments of <em>care &amp; trust</em>
          </h1>
          <p className="gl-hero-desc gl-in" style={{ "--d": "0.2s" }}>
            A look at our work, our partner hospitals, and the patient journeys we are proud to support.
          </p>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="gl-section">
        <div className="gl-container">
          <div className="gl-chips" role="tablist" aria-label="Gallery categories">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={category === c}
                className={`gl-chip ${category === c ? "is-active" : ""}`}
                onClick={() => {
                  setCategory(c);
                  setActive(null);
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="gl-grid" key={category}>
              {filtered.map((photo, i) => (
                <Reveal key={photo.id} delay={Math.min(i, 5) * 0.08} className="gl-item">
                  <button
                    type="button"
                    className="gl-tile"
                    onClick={() => setActive(i)}
                    aria-label={`Open photo: ${photo.title}`}
                  >
                    <img src={photo.src} alt={photo.title} loading="lazy" />
                    <span className="gl-overlay">
                      <span className="gl-zoom"><ZoomIcon /></span>
                      <span className="gl-caption">
                        <small>{photo.category}</small>
                        <strong>{photo.title}</strong>
                      </span>
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="gl-empty">No photos in this category yet.</p>
          )}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="gl-cta-wrap">
        <div className="gl-container">
          <Reveal className="gl-cta">
            <div>
              <h2>Ready to start your treatment journey?</h2>
              <p>Talk to our team and get clear guidance on hospitals, cost, and next steps.</p>
            </div>
            <Link to="/contact" className="gl-btn">
              Contact Us <ArrowIcon />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ================= LIGHTBOX ================= */}
      {current && (
        <div
          className="gl-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          onClick={close}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            ref={closeBtnRef}
            type="button"
            className="gl-lb-btn gl-lb-close"
            aria-label="Close"
            onClick={close}
          >
            <CloseIcon />
          </button>

          {filtered.length > 1 && (
            <>
              <button
                type="button"
                className="gl-lb-btn gl-lb-prev"
                aria-label="Previous photo"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
              >
                <PrevIcon />
              </button>
              <button
                type="button"
                className="gl-lb-btn gl-lb-next"
                aria-label="Next photo"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
              >
                <NextIcon />
              </button>
            </>
          )}

          <figure className="gl-lb-figure" onClick={(e) => e.stopPropagation()}>
            <img key={current.id} src={current.src} alt={current.title} />
            <figcaption>
              <span>{current.title}</span>
              <em>
                {active + 1} / {filtered.length}
              </em>
            </figcaption>
          </figure>
        </div>
      )}
    </main>
  );
};

export default Gallery;
