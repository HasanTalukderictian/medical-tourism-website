import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/Telemedicine.css";

/* ---------------------------- IMAGES ----------------------------
   Image gula import kora hoyeche, tai path vul hole build er somoy-i error dekhabe.
   Folder: Image/telemedicine/  (tomar agey kora import path ei rakhlam)
------------------------------------------------------------------- */
import imgHero from "../Image/telemedicine/online telemedicine.jpg";
import imgHe from "../Image/telemedicine/dr-he-zhifeng.jpg";
import imgChen from "../Image/telemedicine/dr-chen-lifang.jpg";
import imgGuo from "../Image/telemedicine/dr-guo-yawen.jpg";
import imgYuan from "../Image/telemedicine/dr-yuan-shijie.jpg";
import imgDeng from "../Image/telemedicine/dr-deng-ruihua.jpg.jpg";
import imgWritten from "../Image/telemedicine/option-written.jpg";
import imgVideo from "../Image/telemedicine/option-video.jpg";
import imgMdt from "../Image/telemedicine/option-mdt.jpg";
import imgStep1 from "../Image/telemedicine/step-1.jpg";
import imgStep2 from "../Image/telemedicine/online-consultation-doctor-B4ejjnK1.jpg";
import imgStep3 from "../Image/telemedicine/telemedicine-process-china-access-Bu2wCtqR_1.jpg";
// step-2 theke step-5 er image pele ekhane import kore niche steps array te boshao

/* ---------------------------- DATA ---------------------------- */
const highlights = [
  { no: "01", title: "Top Chinese Doctors", text: "Specialists are matched based on your condition." },
  { no: "02", title: "Medical Records First", text: "Reports, scans, pathology, labs, and history come first." },
  { no: "03", title: "Multilingual Coordination", text: "We organize, translate, and summarize your case." },
  { no: "04", title: "Travel Optional", text: "Start online. Travel only if it fits your care." },
];

const specialties = [
  "Oncology",
  "Cardiology",
  "Neurology",
  "Orthopaedics",
  "Reproductive medicine",
  "Aesthetic surgery",
  "Stem cell therapy",
  "Dentistry",
  "Pediatrics",
  "Urology",
  "Endocrinology",
  "Ophthalmology",
];
const VISIBLE_CHIPS = 5;

const doctors = [
  {
    id: 1,
    name: "Dr. He Zhifeng",
    specialty: "Reproductive medicine",
    hospital: "Shanghai assisted reproductive medicine collaboration center",
    experience: "15+ years clinical experience",
    focus: "IVF protocol and stimulation review",
    level: "Tertiary hospital specialist",
    tags: ["Written review", "Video consult", "English support"],
    text: "Reviews hormone, AMH, ultrasound findings, previous stimulation cycles, and embryo records to help explain whether an IVF plan should be adjusted.",
    image: imgHe,
  },
  {
    id: 2,
    name: "Dr. Chen Lifang",
    specialty: "Reproductive medicine",
    hospital: "Beijing reproductive consultation remote consultation network",
    experience: "10+ years clinical experience",
    focus: "Ovarian reserve and reduced implantation",
    level: "Tertiary hospital specialist",
    tags: ["Written review", "Video consult", "English support"],
    text: "Focuses on diminished ovarian reserve, recurrent implantation failure, and advanced maternal age cases, turning records into practical next-step questions.",
    image: imgChen,
    badge: "Selected match",
  },
  {
    id: 3,
    name: "Dr. Guo Yawen",
    specialty: "Reproductive medicine",
    hospital: "Guangzhou obstetrics, gynecology, and reproductive medicine network",
    experience: "8+ years clinical experience",
    focus: "PCOS and ovulation disorder management",
    level: "Tertiary hospital specialist",
    tags: ["Written review", "Video consult", "English support"],
    text: "Helps patients with irregular cycles, PCOS, ovulation disorders, or prolonged time trying to conceive organize key tests and treatment pathways.",
    image: imgGuo,
  },
  {
    id: 4,
    name: "Dr. Yuan Shijie",
    specialty: "Reproductive medicine",
    hospital: "Reproductive medicine collaboration center",
    experience: "8+ years clinical experience",
    focus: "Male factor infertility and sperm evaluation",
    level: "Tertiary hospital specialist",
    tags: ["Written review", "Video consult", "English support"],
    text: "Reviews semen analysis, hormone results, and treatment history to explain male-factor findings and possible assisted reproduction routes.",
    image: imgYuan,
  },
  {
    id: 5,
    name: "Dr. Deng Ruihua",
    specialty: "Reproductive medicine",
    hospital: "Reproductive medicine consultation network",
    experience: "10+ years clinical experience",
    focus: "Recurrent pregnancy loss evaluation",
    level: "Tertiary hospital specialist",
    tags: ["Written review", "Video consult", "English support"],
    text: "Supports patients with repeated pregnancy loss by organizing prior results and highlighting what to discuss with the treating team.",
    image: imgDeng,
  },
];

const options = [
  {
    id: "written",
    badge: "Essential",
    price: "$99",
    title: "Written Review",
    tags: ["Written Report", "Record Review", "48-72 Hours"],
    cta: "Book",
    image: imgWritten,
  },
  {
    id: "video",
    badge: "Most Popular",
    price: "$399",
    title: "Video Consultation",
    tags: ["Video Call", "Written Summary", "Doctor Q&A"],
    cta: "Book",
    popular: true,
    image: imgVideo,
  },
  {
    id: "mdt",
    badge: "Advanced Review",
    price: "$1,299",
    title: "Multidisciplinary Review",
    tags: ["Multiple Specialists", "Complex Cases", "Advanced Summary"],
    cta: "Request",
    image: imgMdt,
  },
];

const steps = [
  {
    no: "01",
    title: "Submit Your Medical Records",
    text: "Upload diagnosis reports, imaging, pathology, lab results, treatment plans, and medication history.",
    image: imgStep1,
  },
  {
    no: "02",
    title: "Case Intake & Medical Summary",
    text: "Our team organizes your documents, translates key information if needed, and prepares a structured case summary.",
    image: imgStep2, // step-2 image pele import kore ekhane boshao
  },
  {
    no: "03",
    title: "Specialist Review or Consultation",
    text: "Your case is reviewed by a specialist, discussed in a video consultation, or evaluated by a multidisciplinary oncology team.",
    image: imgStep3, // step-3 image pele import kore ekhane boshao
  },
  {
    no: "04",
    title: "Receive Your Second Opinion",
    text: "You receive a written summary with key observations, treatment considerations, and suggested next steps.",
    image: imgStep1, // step-4 image pele import kore ekhane boshao
  },
  {
    no: "05",
    title: "Explore China Treatment Access, If Suitable",
    text: "If your case may benefit from treatment in China, we can help with hospital matching, cost estimates, appointments, and travel support.",
    image: imgStep2, // step-5 image pele import kore ekhane boshao
  },
];

const notices = [
  {
    no: "01",
    title: "Not Emergency Care",
    text: "For urgent symptoms or emergencies, contact local emergency services immediately.",
  },
  {
    no: "02",
    title: "Records-Based Review",
    text: "The review depends on the quality and completeness of the medical records provided.",
  },
  {
    no: "03",
    title: "Discuss With Your Local Doctor",
    text: "Use the second opinion as an additional perspective for discussion with your treating physician.",
  },
];

const faqs = [
  {
    q: "Is this an online diagnosis?",
    a: "No. It is a second opinion based on the records you provide. It does not replace an in-person examination or your local physician's care.",
  },
  {
    q: "Which option should I choose?",
    a: "A written review suits clear, record-based questions. A video consultation is better if you want to speak with the specialist. Complex cases may need a multidisciplinary review.",
  },
  {
    q: "Can I start with a written review and upgrade later?",
    a: "Yes. You can begin with a written review and move to a video consultation or a multidisciplinary review if you need more discussion.",
  },
  {
    q: "What records do I need?",
    a: "Diagnosis reports, imaging, pathology, lab results, current treatment plans, and a list of medications. Our team will tell you if anything else is needed.",
  },
  {
    q: "How long does it take?",
    a: "Written reviews are usually returned within 48-72 hours after your records are complete. Video consultations are scheduled based on specialist availability.",
  },
  {
    q: "Do I have to travel to China?",
    a: "No. Everything can be done remotely. Travel is only an option if your case may benefit from treatment in China.",
  },
];

/* ---------------------------- ICONS ---------------------------- */
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
    <path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const iconProps = {
  viewBox: "0 0 24 24",
  width: 13,
  height: 13,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const ClockIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const UserIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c1.5-4 5-5 8-5s6.5 1 8 5" />
  </svg>
);

const HospitalIcon = () => (
  <svg {...iconProps}>
    <path d="M5 3v6a5 5 0 0 0 10 0V3" />
    <path d="M10 14v2a4 4 0 0 0 8 0v-1" />
    <circle cx="18" cy="13" r="2" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ------------------- Scroll reveal wrapper ------------------- */
const Reveal = ({ children, className = "", direction = "up", delay = 0 }) => {
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
      className={`tm-reveal tm-reveal--${direction} ${shown ? "is-shown" : ""} ${className}`}
      style={{ "--d": `${delay}s` }}
    >
      {children}
    </div>
  );
};

/* Image: load na hole placeholder dekhabe */
const Pic = ({ src, alt, className = "" }) => {
  const [failed, setFailed] = useState(!src);

  return (
    <div className={`tm-pic ${failed ? "tm-pic--empty" : ""} ${className}`}>
      {failed ? (
        <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true">
          <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="9" cy="10" r="1.8" />
            <path d="M21 16l-5-5-8 8" />
          </g>
        </svg>
      ) : (
        <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
      )}
    </div>
  );
};

/* ---------------------------- PAGE ---------------------------- */
const Telemedicine = () => {
  const [active, setActive] = useState("Reproductive medicine");
  const [showAll, setShowAll] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const chips = showAll ? specialties : specialties.slice(0, VISIBLE_CHIPS);
  const filtered = doctors.filter((d) => d.specialty === active);

  return (
    <main className="tm-page">
      {/* ================= HERO ================= */}
      <section className="tm-hero">
        <Pic src={imgHero} alt="Chinese specialist on a video consultation" className="tm-hero-pic" />
        <div className="tm-hero-fade" aria-hidden="true" />

        <div className="tm-container tm-hero-inner">
          <p className="tm-eyebrow tm-anim-in" style={{ "--d": "0s" }}>
            Online consultation with top Chinese specialists
          </p>
          <h1 className="tm-hero-title tm-anim-in" style={{ "--d": "0.1s" }}>
            Not sure about your diagnosis or treatment plan?
          </h1>
          <p className="tm-hero-text tm-anim-in" style={{ "--d": "0.2s" }}>
            Get a written review, video consultation, or multidisciplinary second opinion from top Chinese
            specialists.
          </p>
          <p className="tm-hero-text tm-hero-text--small tm-anim-in" style={{ "--d": "0.3s" }}>
            Upload your medical records and receive expert guidance before making your next medical decision.
          </p>
          <a href="#options" className="tm-btn tm-anim-in" style={{ "--d": "0.4s" }}>
            Book Online Consultation <ArrowIcon />
          </a>
        </div>
      </section>

      {/* ================= HIGHLIGHTS ================= */}
      <section className="tm-highlights">
        <div className="tm-container tm-highlights-grid">
          {highlights.map((h, i) => (
            <Reveal key={h.no} delay={i * 0.1} className="tm-highlight">
              <span className="tm-no">{h.no}</span>
              <h3>{h.title}</h3>
              <p>{h.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= SPECIALISTS ================= */}
      <section className="tm-section tm-section--soft" id="specialists">
        <div className="tm-container">
          <Reveal className="tm-head">
            <span className="tm-label">Specialist matching</span>
            <h2 className="tm-title">Selected top Chinese specialists</h2>
            <p className="tm-sub">
              Medora matches your case with top Chinese specialists who can support written review, video
              consultation, and treatment direction discussion.
            </p>
          </Reveal>

          <Reveal className="tm-chips" delay={0.1}>
            {chips.map((c) => (
              <button
                key={c}
                type="button"
                className={`tm-chip ${active === c ? "is-active" : ""}`}
                onClick={() => setActive(c)}
              >
                {c}
              </button>
            ))}
            <button type="button" className="tm-chip tm-chip--more" onClick={() => setShowAll((v) => !v)}>
              {showAll ? "Show less" : "Show more"}
            </button>
          </Reveal>

          {/* key={active} → filter change korle animation abar chole */}
          <div className="tm-doctors" key={active}>
            {filtered.map((d, i) => (
              <Reveal
                key={d.id}
                delay={(i % 3) * 0.1}
                className={`tm-doctor ${d.badge ? "is-featured" : ""}`}
              >
                {d.badge && <span className="tm-flag">{d.badge}</span>}

                <div className="tm-doctor-media">
                  <Pic src={d.image} alt={d.name} className="tm-doctor-pic" />
                  <span className="tm-shield">
                    <ShieldIcon />
                  </span>
                </div>

                <div className="tm-doctor-body">
                  <h3>{d.name}</h3>
                  <span className="tm-doctor-spec">{d.specialty}</span>
                  <p className="tm-doctor-hospital">{d.hospital}</p>
                  <ul className="tm-doctor-facts">
                    <li><ClockIcon /> {d.experience}</li>
                    <li><UserIcon /> {d.focus}</li>
                    <li><HospitalIcon /> {d.level}</li>
                  </ul>
                  <div className="tm-mini-tags">
                    {d.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <p className="tm-doctor-text">{d.text}</p>
                  <a href="#options" className={`tm-btn tm-btn--sm tm-btn--block ${d.badge ? "" : "tm-btn--outline"}`}>
                    View specialist
                  </a>
                </div>
              </Reveal>
            ))}

            <Reveal className="tm-doctor tm-doctor--help" delay={(filtered.length % 3) * 0.1}>
              <div className="tm-help-body">
                <h3>Need a different specialist?</h3>
                <p>
                  Tell us your diagnosis, records, preferred specialty, and consultation goal. Medora will
                  suggest a more suitable doctor or specialist team.
                </p>
              </div>
              <Link to="/contact" className="tm-btn tm-btn--block">
                Tell us what you need <ArrowIcon />
              </Link>
            </Reveal>
          </div>

          <Reveal className="tm-match-bar">
            <p>Tell us about your condition and we will suggest a more suitable specialist match.</p>
            <Link to="/contact" className="tm-btn tm-btn--sm">
              Get specialist matching advice <ArrowIcon />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ================= REVIEW OPTIONS ================= */}
      <section className="tm-section" id="options">
        <div className="tm-container">
          <Reveal className="tm-head">
            <span className="tm-label">Review options</span>
            <h2 className="tm-title">Choose your second opinion option</h2>
            <p className="tm-sub">
              Start remotely with a written review, video consultation, or multidisciplinary case review
              before making your next medical decision.
            </p>
          </Reveal>

          <div className="tm-options">
            {options.map((o, i) => (
              <Reveal
                key={o.id}
                delay={i * 0.12}
                direction={i === 0 ? "left" : i === 2 ? "right" : "up"}
                className={`tm-option ${o.popular ? "is-popular" : ""}`}
              >
                <Pic src={o.image} alt={o.title} className="tm-option-pic" />
                <div className="tm-option-body">
                  <div className="tm-option-top">
                    <span className={`tm-pill ${o.popular ? "tm-pill--accent" : ""}`}>{o.badge}</span>
                    <span className="tm-price">
                      <small>From</small> {o.price}
                    </span>
                  </div>
                  <h3>{o.title}</h3>
                  <div className="tm-mini-tags">
                    {o.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <div className="tm-option-actions">
                    <Link to="/contact" className="tm-btn tm-btn--sm">{o.cta}</Link>
                    <a href="#process" className="tm-btn tm-btn--sm tm-btn--soft">View Details</a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="tm-center">
            <a href="#process" className="tm-btn tm-btn--sm tm-btn--soft">Compare review options</a>
          </Reveal>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="tm-section" id="process">
        <div className="tm-container tm-container--narrow">
          <Reveal className="tm-head">
            <span className="tm-label">Process</span>
            <h2 className="tm-title">How the second opinion process works</h2>
          </Reveal>

          <div className="tm-steps">
            {steps.map((s, i) => (
              <Reveal key={s.no} direction={i % 2 === 0 ? "left" : "right"} className="tm-step">
                <Pic src={s.image} alt={s.title} className="tm-step-pic" />
                <span className="tm-step-no">{s.no}</span>
                <div className="tm-step-body">
                  <span className="tm-step-label">Step {i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= NOTICE ================= */}
      <section className="tm-section tm-section--soft">
        <div className="tm-container tm-container--narrow">
          <Reveal className="tm-head">
            <span className="tm-label">Medical notice</span>
            <h2 className="tm-title">Important medical notice</h2>
            <p className="tm-sub">
              Medora&apos;s second opinion service is based on the medical records you provide. It is not
              emergency care and does not replace your local physician. Any treatment decision should be made
              together with your licensed healthcare provider.
            </p>
          </Reveal>

          <div className="tm-notices">
            {notices.map((n, i) => (
              <Reveal key={n.no} delay={i * 0.1} className="tm-notice">
                <span className="tm-no">{n.no}</span>
                <h3>{n.title}</h3>
                <p>{n.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="tm-section">
        <div className="tm-container tm-container--faq">
          <Reveal className="tm-head">
            <span className="tm-label">FAQ</span>
            <h2 className="tm-title">Common questions</h2>
          </Reveal>

          <div className="tm-faq">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={f.q} delay={i * 0.05} className={`tm-faq-item ${open ? "is-open" : ""}`}>
                  <button
                    type="button"
                    className="tm-faq-q"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? null : i)}
                  >
                    <span>{f.q}</span>
                    <ChevronIcon />
                  </button>
                  <div className="tm-faq-a">
                    <p>{f.a}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="tm-section tm-cta-wrap">
        <div className="tm-container tm-container--narrow">
          <Reveal className="tm-cta">
            <div className="tm-cta-text">
              <span className="tm-label tm-label--left">Start remotely</span>
              <h2>Get another expert view before your next medical decision</h2>
              <p>
                Choose a written review, video consultation, or multidisciplinary case review from selected
                Chinese specialists.
              </p>
              <a href="#options" className="tm-btn tm-btn--sm">
                Book Online Consultation <ArrowIcon />
              </a>
              <small>Start remotely. No obligation to travel.</small>
            </div>
            <div className="tm-cta-art" aria-hidden="true">
              <span className="tm-cta-card tm-cta-card--main" />
              <span className="tm-cta-card tm-cta-card--side" />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default Telemedicine;