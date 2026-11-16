import React, { useEffect, useMemo, useRef, useState } from "react";
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
// step-4, step-5 er alada image pele ekhane import kore niche steps array te boshao

/* ---------------------------- DATA ---------------------------- */
// Shob likha SAMPLE. Tomar asol service onujayi edit koro
const BRAND = "Akashbari Medical";

const heroPoints = ["Records reviewed by senior specialists", "English & Bangla coordination", "No obligation to travel"];

const highlights = [
  { icon: "doctor", title: "Top Chinese Doctors", text: "Specialists are matched based on your condition." },
  { icon: "file", title: "Medical Records First", text: "Reports, scans, pathology, labs, and history come first." },
  { icon: "language", title: "Multilingual Coordination", text: "We organize, translate, and summarize your case." },
  { icon: "plane", title: "Travel Optional", text: "Start online. Travel only if it fits your care." },
];

const specialties = [
  "Reproductive medicine",
  "Oncology",
  "Cardiology",
  "Neurology",
  "Orthopaedics",
  "Aesthetic surgery",
  "Stem cell therapy",
  "Dentistry",
  "Pediatrics",
  "Urology",
  "Endocrinology",
  "Ophthalmology",
];
const VISIBLE_CHIPS = 6;

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
    desc: "A specialist studies your records and sends a clear written opinion.",
    features: ["Full record review", "Written report with next steps", "Delivered in 48-72 hours"],
    cta: "Book Written Review",
    image: imgWritten,
  },
  {
    id: "video",
    badge: "Most Popular",
    price: "$399",
    title: "Video Consultation",
    desc: "Talk face to face with the specialist and ask all your questions.",
    features: ["Live video call with specialist", "Interpreter on the call", "Written summary after the call"],
    cta: "Book Video Consult",
    popular: true,
    image: imgVideo,
  },
  {
    id: "mdt",
    badge: "Advanced Review",
    price: "$1,299",
    title: "Multidisciplinary Review",
    desc: "A team of specialists reviews complex cases together.",
    features: ["Multiple specialists together", "For complex & cancer cases", "Detailed combined report"],
    cta: "Request MDT Review",
    image: imgMdt,
  },
];

// Compare table: true = ache, false = nai, string = text
const compareRows = [
  { label: "Specialist reviews your records", values: [true, true, true] },
  { label: "Written report with next steps", values: [true, true, true] },
  { label: "Live video call with the doctor", values: [false, true, "Optional"] },
  { label: "Interpreter & case summary", values: [true, true, true] },
  { label: "Multiple specialists", values: [false, false, true] },
  { label: "Best for", values: ["Clear questions", "Discussing options", "Complex cases"] },
  { label: "Typical timeline", values: ["48-72 hours", "By appointment", "Case-based"] },
];

const steps = [
  {
    title: "Submit Your Medical Records",
    text: "Upload diagnosis reports, imaging, pathology, lab results, treatment plans, and medication history.",
    image: imgStep1,
  },
  {
    title: "Case Intake & Medical Summary",
    text: "Our team organizes your documents, translates key information if needed, and prepares a structured case summary.",
    image: imgStep2,
  },
  {
    title: "Specialist Review or Consultation",
    text: "Your case is reviewed by a specialist, discussed in a video consultation, or evaluated by a multidisciplinary team.",
    image: imgStep3,
  },
  {
    title: "Receive Your Second Opinion",
    text: "You receive a written summary with key observations, treatment considerations, and suggested next steps.",
    image: imgStep1, // step-4 er image pele bodlao
  },
  {
    title: "Explore Treatment in China, If Suitable",
    text: "If your case may benefit from treatment in China, we help with hospital matching, cost estimates, appointments, and travel.",
    image: imgStep2, // step-5 er image pele bodlao
  },
];

const notices = [
  { title: "Not Emergency Care", text: "For urgent symptoms or emergencies, contact local emergency services immediately." },
  { title: "Records-Based Review", text: "The review depends on the quality and completeness of the medical records provided." },
  { title: "Discuss With Your Local Doctor", text: "Use the second opinion as an additional perspective for discussion with your treating physician." },
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
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const Icon = ({ name, size = 22 }) => {
  const p = { ...base, width: size, height: size };
  switch (name) {
    case "doctor":
      return <svg {...p}><circle cx="12" cy="7" r="3.5" /><path d="M5 21c0-4 3-6.5 7-6.5s7 2.5 7 6.5" /><path d="M12 14.5v3M10.5 16h3" /></svg>;
    case "file":
      return <svg {...p}><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5M10 13h6M10 17h6" /></svg>;
    case "language":
      return <svg {...p}><path d="M4 5h9M8.5 3v2M6 5c.5 4 3 7 6 8M11 5c-.5 3-3 6-6.5 8" /><path d="M13 21l4-10 4 10M14.5 18h5" /></svg>;
    case "plane":
      return <svg {...p}><path d="M10.5 13.5L3 11l1.5-1.5 8 .5 4-4.5a2 2 0 0 1 3 3L15.5 13l.5 8L14.5 22.5 12 15" /></svg>;
    case "video":
      return <svg {...p}><rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10l5-3v10l-5-3" /></svg>;
    case "clock":
      return <svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
    case "target":
      return <svg {...p}><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" fill="currentColor" /></svg>;
    case "hospital":
      return <svg {...p}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M12 7v6M9 10h6M9 21v-4h6v4" /></svg>;
    case "shield":
      return <svg {...p}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>;
    case "alert":
      return <svg {...p}><path d="M12 3l9.5 17h-19z" /><path d="M12 10v4M12 17v.01" /></svg>;
    case "arrow":
      return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case "chevron":
      return <svg {...p}><path d="M6 9l6 6 6-6" /></svg>;
    case "x":
      return <svg {...p}><path d="M7 7l10 10M17 7L7 17" /></svg>;
    case "image":
      return <svg {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.8" /><path d="M21 16l-5-5-8 8" /></svg>;
    default:
      return <svg {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>;
  }
};

/* ------------------- Scroll reveal ------------------- */
const Reveal = ({ children, className = "", direction = "up", delay = 0, as: Tag = "div", ...rest }) => {
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
    <Tag
      ref={ref}
      className={`te-reveal te-reveal--${direction} ${shown ? "is-shown" : ""} ${className}`}
      style={{ "--d": `${delay}s` }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

/* Image: load na hole placeholder dekhabe */
const Pic = ({ src, alt, className = "" }) => {
  const [failed, setFailed] = useState(!src);
  useEffect(() => setFailed(!src), [src]);
  return (
    <div className={`te-pic ${failed ? "te-pic--empty" : ""} ${className}`}>
      {failed ? <Icon name="image" size={34} /> : <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />}
    </div>
  );
};

const Cell = ({ v }) => {
  if (v === true) return <span className="te-yes" aria-label="Included"><Icon name="check" size={16} /></span>;
  if (v === false) return <span className="te-no-x" aria-label="Not included"><Icon name="x" size={16} /></span>;
  return <span className="te-cell-text">{v}</span>;
};

/* ---------------------------- PAGE ---------------------------- */
const Telemedicine = () => {
  const [active, setActive] = useState(specialties[0]);
  const [showAll, setShowAll] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const counts = useMemo(() => {
    const c = {};
    doctors.forEach((d) => (c[d.specialty] = (c[d.specialty] || 0) + 1));
    return c;
  }, []);

  const chips = showAll ? specialties : specialties.slice(0, VISIBLE_CHIPS);
  const filtered = doctors.filter((d) => d.specialty === active);

  return (
    <main className="te-page">
      {/* ================= HERO ================= */}
      <section className="te-hero">
        <Pic src={imgHero} alt="Specialist doctor on a video consultation" className="te-hero-pic" />
        <div className="te-hero-fade" aria-hidden="true" />

        <div className="te-container te-hero-inner">
          <p className="te-eyebrow te-in" style={{ "--d": "0s" }}>
            <span className="te-live" /> Online consultation with top Chinese specialists
          </p>
          <h1 className="te-hero-title te-in" style={{ "--d": "0.1s" }}>
            Not sure about your diagnosis or <em>treatment plan?</em>
          </h1>
          <p className="te-hero-text te-in" style={{ "--d": "0.2s" }}>
            Get a written review, video consultation, or multidisciplinary second opinion from top Chinese
            specialists. Upload your medical records and receive expert guidance before your next decision.
          </p>

          <ul className="te-hero-points te-in" style={{ "--d": "0.3s" }}>
            {heroPoints.map((p) => (
              <li key={p}>
                <span><Icon name="check" size={12} /></span> {p}
              </li>
            ))}
          </ul>

          <div className="te-hero-actions te-in" style={{ "--d": "0.4s" }}>
            <a href="#options" className="te-btn">
              Book Online Consultation <Icon name="arrow" size={16} />
            </a>
            <a href="#specialists" className="te-btn te-btn--ghost">
              Meet the Specialists
            </a>
          </div>
        </div>

        {/* Floating "video call" card */}
        <div className="te-hero-card te-in" style={{ "--d": "0.5s" }} aria-hidden="true">
          <span className="te-hero-card-icon"><Icon name="video" size={20} /></span>
          <div>
            <strong>Video consultation</strong>
            <small>With interpreter support</small>
          </div>
        </div>
      </section>

      {/* ================= HIGHLIGHTS ================= */}
      <section className="te-highlights">
        <div className="te-container te-highlights-grid">
          {highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.08} className="te-highlight">
              <span className="te-highlight-icon"><Icon name={h.icon} size={22} /></span>
              <div>
                <h3>{h.title}</h3>
                <p>{h.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= SPECIALISTS ================= */}
      <section className="te-section te-section--soft" id="specialists">
        <div className="te-container">
          <Reveal className="te-head">
            <span className="te-label">Specialist matching</span>
            <h2 className="te-title">Selected top Chinese specialists</h2>
            <p className="te-sub">
              {BRAND} matches your case with top Chinese specialists who can support written review, video
              consultation, and treatment direction discussion.
            </p>
          </Reveal>

          <Reveal className="te-chips" delay={0.1} role="group" aria-label="Filter by specialty">
            {chips.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={active === c}
                className={`te-chip ${active === c ? "is-active" : ""}`}
                onClick={() => setActive(c)}
              >
                {c}
                {counts[c] ? <b>{counts[c]}</b> : null}
              </button>
            ))}
            <button type="button" className="te-chip te-chip--more" aria-expanded={showAll} onClick={() => setShowAll((v) => !v)}>
              {showAll ? "Show less" : `+${specialties.length - VISIBLE_CHIPS} more`}
            </button>
          </Reveal>

          {/* key={active} → filter change korle animation abar chole */}
          <div className="te-doctors" key={active}>
            {filtered.map((d, i) => (
              <article key={d.id} className={`te-doctor ${d.badge ? "is-featured" : ""}`} style={{ "--i": i }}>
                {d.badge && <span className="te-flag">{d.badge}</span>}

                <div className="te-doctor-media">
                  <Pic src={d.image} alt={d.name} className="te-doctor-pic" />
                  <span className="te-verified"><Icon name="shield" size={13} /> Verified</span>
                </div>

                <div className="te-doctor-body">
                  <span className="te-doctor-spec">{d.specialty}</span>
                  <h3>{d.name}</h3>
                  <p className="te-doctor-hospital">{d.hospital}</p>

                  <ul className="te-doctor-facts">
                    <li><Icon name="clock" size={15} /> {d.experience}</li>
                    <li><Icon name="target" size={15} /> {d.focus}</li>
                    <li><Icon name="hospital" size={15} /> {d.level}</li>
                  </ul>

                  <p className="te-doctor-text">{d.text}</p>

                  <div className="te-mini-tags">
                    {d.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>

                  <a href="#options" className={`te-btn te-btn--sm te-btn--block ${d.badge ? "" : "te-btn--outline"}`}>
                    Consult this specialist <Icon name="arrow" size={15} />
                  </a>
                </div>
              </article>
            ))}

            <article className="te-doctor te-doctor--help" style={{ "--i": filtered.length }}>
              <span className="te-help-icon"><Icon name="doctor" size={26} /></span>
              <div className="te-help-body">
                <h3>{filtered.length ? "Need a different specialist?" : `${active} specialist`}</h3>
                <p>
                  {filtered.length
                    ? `Tell us your diagnosis, records, and consultation goal. ${BRAND} will suggest a more suitable doctor or specialist team.`
                    : `We have not listed ${active.toLowerCase()} specialists here yet, but our team can match you with one. Share your reports and we will suggest the right doctor.`}
                </p>
              </div>
              <Link to="/contact" className="te-btn te-btn--block">
                Tell us what you need <Icon name="arrow" size={16} />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* ================= REVIEW OPTIONS ================= */}
      <section className="te-section" id="options">
        <div className="te-container">
          <Reveal className="te-head">
            <span className="te-label">Review options</span>
            <h2 className="te-title">Choose your second opinion option</h2>
            <p className="te-sub">
              Start remotely with a written review, video consultation, or multidisciplinary case review before
              making your next medical decision.
            </p>
          </Reveal>

          <div className="te-options">
            {options.map((o, i) => (
              <Reveal key={o.id} delay={i * 0.1} className={`te-option ${o.popular ? "is-popular" : ""}`}>
                <div className="te-option-media">
                  <Pic src={o.image} alt={o.title} className="te-option-pic" />
                  <span className={`te-pill ${o.popular ? "te-pill--accent" : ""}`}>{o.badge}</span>
                </div>
                <div className="te-option-body">
                  <h3>{o.title}</h3>
                  <p className="te-option-desc">{o.desc}</p>
                  <div className="te-price">
                    <small>From</small>
                    <strong>{o.price}</strong>
                  </div>
                  <ul className="te-option-list">
                    {o.features.map((f) => (
                      <li key={f}><span><Icon name="check" size={12} /></span> {f}</li>
                    ))}
                  </ul>
                  <Link to="/contact" className={`te-btn te-btn--block ${o.popular ? "" : "te-btn--outline"}`}>
                    {o.cta} <Icon name="arrow" size={16} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Compare table */}
          <Reveal className="te-compare" id="compare">
            <h3 className="te-compare-title">Compare review options</h3>
            <div className="te-table-wrap">
              <table className="te-table">
                <thead>
                  <tr>
                    <th scope="col"><span className="te-sr">Feature</span></th>
                    {options.map((o) => (
                      <th key={o.id} scope="col" className={o.popular ? "is-popular" : ""}>
                        {o.title}
                        <small>{o.price}</small>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((r) => (
                    <tr key={r.label}>
                      <th scope="row">{r.label}</th>
                      {r.values.map((v, i) => (
                        <td key={i} className={options[i].popular ? "is-popular" : ""}>
                          <Cell v={v} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="te-section te-section--soft" id="process">
        <div className="te-container">
          <Reveal className="te-head">
            <span className="te-label">Process</span>
            <h2 className="te-title">How the second opinion process works</h2>
          </Reveal>

          <ol className="te-steps">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} direction={i % 2 === 0 ? "left" : "right"} className="te-step">
                <Pic src={s.image} alt={s.title} className="te-step-pic" />
                <span className="te-step-no">{String(i + 1).padStart(2, "0")}</span>
                <div className="te-step-body">
                  <span className="te-step-label">Step {i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= NOTICE ================= */}
      <section className="te-section">
        <div className="te-container te-container--narrow">
          <Reveal className="te-notice-box">
            <div className="te-notice-head">
              <span className="te-notice-icon"><Icon name="alert" size={24} /></span>
              <div>
                <h2>Important medical notice</h2>
                <p>
                  {BRAND}&apos;s second opinion service is based on the medical records you provide. It is not
                  emergency care and does not replace your local physician. Any treatment decision should be
                  made together with your licensed healthcare provider.
                </p>
              </div>
            </div>
            <div className="te-notices">
              {notices.map((n, i) => (
                <div key={n.title} className="te-notice">
                  <span className="te-notice-no">0{i + 1}</span>
                  <h3>{n.title}</h3>
                  <p>{n.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="te-section te-section--soft">
        <div className="te-container te-faq-grid">
          <Reveal direction="left" className="te-faq-intro">
            <span className="te-label">FAQ</span>
            <h2 className="te-title">Common questions</h2>
            <p>Can't find your answer? Our coordinators are happy to help you choose the right option.</p>
            <Link to="/contact" className="te-btn te-btn--outline">
              Ask our team <Icon name="arrow" size={16} />
            </Link>
          </Reveal>

          <div className="te-faq">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={f.q} delay={i * 0.05} className={`te-faq-item ${open ? "is-open" : ""}`}>
                  <h3>
                    <button
                      type="button"
                      className="te-faq-q"
                      aria-expanded={open}
                      aria-controls={`te-faq-a-${i}`}
                      onClick={() => setOpenFaq(open ? null : i)}
                    >
                      <span>{f.q}</span>
                      <span className="te-chevron"><Icon name="chevron" size={18} /></span>
                    </button>
                  </h3>
                  <div className="te-faq-a" id={`te-faq-a-${i}`} role="region">
                    <div className="te-faq-inner">
                      <p>{f.a}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="te-cta-wrap">
        <div className="te-container">
          <Reveal className="te-cta">
            <div className="te-cta-text">
              <span className="te-label te-label--light">Start remotely</span>
              <h2>Get another expert view before your next medical decision</h2>
              <p>
                Choose a written review, video consultation, or multidisciplinary case review from selected
                Chinese specialists.
              </p>
              <div className="te-cta-actions">
                <a href="#options" className="te-btn te-btn--white">
                  Book Online Consultation <Icon name="arrow" size={16} />
                </a>
                <Link to="/contact" className="te-btn te-btn--outline-white">
                  Talk to a Coordinator
                </Link>
              </div>
              <small>Start remotely. No obligation to travel.</small>
            </div>
            <div className="te-cta-art" aria-hidden="true">
              <Pic src={imgVideo} alt="" className="te-cta-pic" />
              <div className="te-cta-float">
                <span><Icon name="video" size={18} /></span>
                <div>
                  <strong>Live with specialist</strong>
                  <small>Interpreter included</small>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default Telemedicine;
