import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/MedicalVisaAssistance.css";

import image from "../Image/Medicalvisa/medicalvisa.jpg";

/* ---------------------------- DATA ---------------------------- */
// Shob likha SAMPLE. Tomar asol service onujayi edit koro
const heroPoints = ["Complete document guidance", "Hospital invitation letter support", "Companion visa assistance"];

const services = [
  { icon: "list", title: "Document Checklist", text: "A clear list of every paper you need, so nothing is missed or delayed." },
  { icon: "mail", title: "Hospital Invitation Letter", text: "We coordinate with the hospital to get your appointment and invitation letter." },
  { icon: "form", title: "Application Support", text: "Help filling out visa forms correctly and preparing your file." },
  { icon: "calendar", title: "Visa Appointment", text: "We guide you on booking your visa center or embassy appointment." },
  { icon: "users", title: "Companion Visa", text: "Support for a family member or attendant to travel with the patient." },
  { icon: "refresh", title: "Follow-up & Extension", text: "Guidance if you need to extend your stay or return for follow-up care." },
];

const steps = [
  { title: "Share Your Case", text: "Tell us your condition and where you plan to get treatment." },
  { title: "Get Your Checklist", text: "We send the exact documents needed for your destination." },
  { title: "Hospital Letter", text: "We help arrange your appointment and the hospital invitation letter." },
  { title: "Apply for Visa", text: "We review your file and guide you through the application." },
  { title: "Travel with Confidence", text: "Get ready for travel, stay, and your hospital arrival." },
];

const patientDocs = [
  "Valid passport (6+ months validity)",
  "Passport-size photographs",
  "Completed visa application form",
  "Proof of funds or bank statement",
  "Travel and accommodation details",
];

const medicalDocs = [
  "Medical reports and test results",
  "Doctor's referral or prescription",
  "Hospital appointment confirmation",
  "Hospital invitation letter",
  "Companion's passport and details",
];

const countries = [
  { name: "India", hospitals: "Apollo Hospitals, Fortis Healthcare, Max Healthcare" },
  { name: "Thailand", hospitals: "Bumrungrad Hospital, Bangkok Hospital" },
  { name: "Malaysia", hospitals: "Prince Court Medical Centre, Gleneagles Kuala Lumpur" },
  { name: "China", hospitals: "Beijing United Family Hospital, Shanghai East Hospital" },
];

const faqs = [
  {
    q: "How long does a medical visa take?",
    a: "Processing time depends on the country and the embassy or visa center. We guide you on the expected time and help you apply early so there is no last-minute rush.",
  },
  {
    q: "Can my family member travel with me?",
    a: "In most cases a companion or attendant can travel with the patient. The rules differ by country, and we will guide you on what is needed for them.",
  },
  {
    q: "Do you guarantee visa approval?",
    a: "No one can guarantee approval, because the final decision always belongs to the embassy or immigration authority. We help you prepare a complete and correct application to give you the best chance.",
  },
  {
    q: "What if my visa is rejected?",
    a: "We review the reason with you and guide you on the next steps, such as correcting the documents or re-applying.",
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

const Icon = ({ name, size = 26 }) => {
  const p = { ...base, width: size, height: size };
  switch (name) {
    case "list":
      return (
        <svg {...p}>
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M9 8h6M9 12h6M9 16h4" />
        </svg>
      );
    case "mail":
      return (
        <svg {...p}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      );
    case "form":
      return (
        <svg {...p}>
          <path d="M7 3h7l5 5v13H7z" />
          <path d="M14 3v5h5M10 13h6M10 17h4" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...p}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M8 3v4M16 3v4M3 10h18" />
        </svg>
      );
    case "users":
      return (
        <svg {...p}>
          <circle cx="9" cy="8" r="3.2" />
          <path d="M3 20c.6-3.4 3-5 6-5s5.4 1.6 6 5" />
          <circle cx="17" cy="9" r="2.4" />
          <path d="M16.5 14.2c2.4.2 4 1.7 4.5 4.3" />
        </svg>
      );
    case "refresh":
      return (
        <svg {...p}>
          <path d="M20 12a8 8 0 1 1-2.4-5.7" />
          <path d="M20 4v5h-5" />
        </svg>
      );
    case "shield":
      return (
        <svg {...p}>
          <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "info":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v5M12 8h.01" />
        </svg>
      );
    default:
      return (
        <svg {...p}>
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      );
  }
};

const ArrowIcon = () => (
  <svg {...base} width="14" height="14" strokeWidth="2">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

const ChevronIcon = () => (
  <svg {...base} width="18" height="18" strokeWidth="2">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const ImageIcon = () => (
  <svg {...base} width="44" height="44" strokeWidth="1.6">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="9" cy="10" r="1.8" />
    <path d="M21 16l-5-5-8 8" />
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
      { threshold: 0.12 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`vs-reveal ${shown ? "is-shown" : ""} ${className}`}
      style={{ "--d": `${delay}s` }}
    >
      {children}
    </div>
  );
};

const Pic = ({ src, alt, className = "" }) => {
  const [failed, setFailed] = useState(!src);
  return (
    <div className={`vs-pic ${failed ? "vs-pic--empty" : ""} ${className}`}>
      {failed ? <ImageIcon /> : <img src={src} alt={alt} onError={() => setFailed(true)} />}
    </div>
  );
};

/* ---------------------------- PAGE ---------------------------- */
const MedicalVisaAssistance = () => {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="vs-page">
      {/* ================= HERO ================= */}
      <section className="vs-hero">
        <div className="vs-blob vs-blob--one" aria-hidden="true" />
        <div className="vs-blob vs-blob--two" aria-hidden="true" />

        <div className="vs-container vs-hero-grid">
          <div className="vs-hero-text">
            <span className="vs-badge vs-in" style={{ "--d": "0s" }}>Medical Visa Assistance</span>
            <h1 className="vs-hero-title vs-in" style={{ "--d": "0.1s" }}>
              Your medical visa, <em>made simple</em>
            </h1>
            <p className="vs-hero-desc vs-in" style={{ "--d": "0.2s" }}>
              From the document checklist to the hospital invitation letter, we guide you through every step of
              the medical visa process so you can focus on your health.
            </p>

            <ul className="vs-points vs-in" style={{ "--d": "0.3s" }}>
              {heroPoints.map((p) => (
                <li key={p}>
                  <span className="vs-tick"><Icon name="check" size={13} /></span>
                  {p}
                </li>
              ))}
            </ul>

            <div className="vs-hero-actions vs-in" style={{ "--d": "0.4s" }}>
              <Link to="/contact" className="vs-btn">
                Get Visa Help <ArrowIcon />
              </Link>
              <Link to="/services/doctor-appointment" className="vs-btn vs-btn--ghost">
                Book Appointment
              </Link>
            </div>
          </div>

          <div className="vs-hero-media vs-in" style={{ "--d": "0.25s" }}>
            <Pic src={image} alt="Medical visa assistance" className="vs-hero-pic" />
            <div className="vs-float">
              <span className="vs-float-icon"><Icon name="shield" size={22} /></span>
              <div>
                <strong>Guided Step by Step</strong>
                <small>From documents to arrival</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="vs-section">
        <div className="vs-container">
          <Reveal className="vs-head">
            <span className="vs-label">How We Help</span>
            <h2 className="vs-title">Complete support for your visa journey</h2>
            <p className="vs-sub">Our team handles the paperwork guidance so you do not have to worry.</p>
          </Reveal>

          <div className="vs-services">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 0.1} className="vs-service">
                <span className="vs-service-icon"><Icon name={s.icon} /></span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="vs-section vs-section--soft">
        <div className="vs-container">
          <Reveal className="vs-head">
            <span className="vs-label">Our Process</span>
            <h2 className="vs-title">5 simple steps to your visa</h2>
          </Reveal>

          <ol className="vs-steps">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1} className="vs-step">
                <span className="vs-step-no">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= DOCUMENTS ================= */}
      <section className="vs-section">
        <div className="vs-container">
          <Reveal className="vs-head">
            <span className="vs-label">Documents</span>
            <h2 className="vs-title">What you usually need</h2>
            <p className="vs-sub">
              This is a general guide. We send you the exact list for your destination country.
            </p>
          </Reveal>

          <div className="vs-docs">
            <Reveal className="vs-doc-card">
              <h3>Personal Documents</h3>
              <ul>
                {patientDocs.map((d) => (
                  <li key={d}>
                    <span className="vs-tick"><Icon name="check" size={13} /></span>
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="vs-doc-card vs-doc-card--accent">
              <h3>Medical Documents</h3>
              <ul>
                {medicalDocs.map((d) => (
                  <li key={d}>
                    <span className="vs-tick"><Icon name="check" size={13} /></span>
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= COUNTRIES ================= */}
      <section className="vs-section vs-section--soft">
        <div className="vs-container">
          <Reveal className="vs-head">
            <span className="vs-label">Destinations</span>
            <h2 className="vs-title">Countries we support</h2>
            <p className="vs-sub">Visa help for treatment at our partner hospitals in these countries.</p>
          </Reveal>

          <div className="vs-countries">
            {countries.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.1} className="vs-country">
                <span className="vs-country-badge">{c.name.charAt(0)}</span>
                <h3>{c.name}</h3>
                <p>{c.hospitals}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="vs-note">
            <span className="vs-note-icon"><Icon name="info" size={22} /></span>
            <p>
              <strong>Please note:</strong> Visa rules and requirements differ by country and can change at any
              time. The final decision is always made by the embassy or immigration authority. We guide you to
              prepare a complete application.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="vs-section">
        <div className="vs-container vs-container--narrow">
          <Reveal className="vs-head">
            <span className="vs-label">FAQ</span>
            <h2 className="vs-title">Common visa questions</h2>
          </Reveal>

          <div className="vs-faq">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={f.q} delay={i * 0.06} className={`vs-faq-item ${open ? "is-open" : ""}`}>
                  <h3>
                    <button
                      type="button"
                      className="vs-faq-q"
                      aria-expanded={open}
                      aria-controls={`vs-faq-a-${i}`}
                      onClick={() => setOpenFaq(open ? null : i)}
                    >
                      <span>{f.q}</span>
                      <span className="vs-chevron"><ChevronIcon /></span>
                    </button>
                  </h3>
                  <div className="vs-faq-a" id={`vs-faq-a-${i}`} role="region">
                    <div className="vs-faq-inner">
                      <p>{f.a}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="vs-cta-wrap">
        <div className="vs-container">
          <Reveal className="vs-cta">
            <div>
              <h2>Need help with your medical visa?</h2>
              <p>Talk to our team today and get a clear checklist for your treatment destination.</p>
            </div>
            <div className="vs-cta-actions">
              <Link to="/contact" className="vs-btn vs-btn--white">
                Contact Us <ArrowIcon />
              </Link>
              <Link to="/services/doctor-appointment" className="vs-btn vs-btn--outline-white">
                Book Appointment
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default MedicalVisaAssistance;