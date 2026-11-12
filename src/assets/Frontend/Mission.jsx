import React, { useEffect, useRef, useState } from "react";
import "../../Css/Mission.css";

const TargetIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
    </g>
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </g>
  </svg>
);

const cards = [
  {
    id: "mission",
    direction: "from-left",
    icon: <TargetIcon />,
    title: "Our Mission",
    paragraphs: [
      "Our mission is to bridge the gap between patients in Bangladesh and world-class medical facilities across the globe. We are committed to providing transparent, affordable, and fully guided medical tourism services — ensuring every patient receives the best possible care regardless of their financial background.",
      "We aim to be the most trusted partner in the medical journey — from the first consultation to the final follow-up, with empathy and excellence at every step.",
    ],
  },
  {
    id: "vision",
    direction: "from-right",
    icon: <EyeIcon />,
    title: "Our Vision",
    paragraphs: [
      "Our vision is to become South Asia's leading medical tourism facilitator — building a healthcare ecosystem where patients, doctors, and hospitals can connect seamlessly across borders to deliver transformative, life-saving medical care.",
      "We envision a world where geography is no barrier to quality healthcare, and every person has access to the treatment they deserve — with dignity, comfort, and expert guidance.",
    ],
  },
];

const Mission = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Section screen e ashle ekbar animation chalu hobe
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
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`mv-section ${visible ? "is-visible" : ""}`}
    >
      <div className="mv-container">
        <header className="mv-header">
          <span className="mv-badge">Who We Are</span>
          <h2 className="mv-heading">Our Mission &amp; Vision</h2>
          <span className="mv-line" aria-hidden="true" />
        </header>

        <div className="mv-grid">
          {cards.map((card, index) => (
            <article
              key={card.id}
              className={`mv-card mv-card--${card.id} ${card.direction}`}
              style={{ "--delay": `${0.3 + index * 0.15}s` }}
            >
              <div className="mv-icon">{card.icon}</div>

              <h3 className="mv-title">{card.title}</h3>
              <span className="mv-title-line" aria-hidden="true" />

              {card.paragraphs.map((text, i) => (
                <p className="mv-text" key={i}>
                  {text}
                </p>
              ))}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;