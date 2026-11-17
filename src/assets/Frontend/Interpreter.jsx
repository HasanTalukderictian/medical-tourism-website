import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/Interpreter.css";

/* ---------------------------- CONTACT ----------------------------
   Asol number boshao
------------------------------------------------------------------- */
const CONTACT = {
  phone: "+880 1234-567890",
  phoneLink: "tel:+8801234567890",
  whatsapp: "https://wa.me/8801234567890",
};

/* ---------------------------- DATA ----------------------------
   Dam, sonkha DEMO. Asol tottho diye bodlao.
------------------------------------------------------------------- */
const languages = [
  { name: "Bangla", native: "বাংলা", main: true },
  { name: "English", native: "English" },
  { name: "Hindi", native: "हिन्दी" },
  { name: "Tamil", native: "தமிழ்" },
  { name: "Telugu", native: "తెలుగు" },
  { name: "Thai", native: "ไทย" },
  { name: "Malay", native: "Bahasa Melayu" },
  { name: "Chinese", native: "中文" },
  { name: "Arabic", native: "العربية" },
];

const targetLanguages = languages.filter((l) => !l.main).map((l) => l.name);

const helps = [
  { icon: "stetho", title: "Doctor consultations", text: "Understand your diagnosis, options and every question you ask, word by word." },
  { icon: "doc", title: "Consent & discharge", text: "Know exactly what you sign before surgery and what to do after going home." },
  { icon: "lab", title: "Tests & reports", text: "Clear instructions for fasting, scans and lab tests, and help reading results." },
  { icon: "pill", title: "Medicines & pharmacy", text: "Dose, timing and side effects explained in your own language." },
  { icon: "bill", title: "Billing & insurance", text: "Help at the billing desk so you understand every charge." },
  { icon: "siren", title: "Emergency support", text: "Urgent phone or video interpreting, 24 hours a day." },
];

const modes = [
  {
    id: "person",
    icon: "users",
    title: "In-person",
    text: "Your interpreter sits with you at the hospital for consultations, tests and procedures.",
    price: 30,
    unit: "/ half day",
    points: ["Best for surgery & long visits", "Available in 5 cities", "Book 24 hours ahead"],
    popular: true,
  },
  {
    id: "video",
    icon: "video",
    title: "Video call",
    text: "Join your doctor's appointment over video, from anywhere.",
    price: 12,
    unit: "/ 30 minutes",
    points: ["Online consultations", "Follow-ups from home", "Book same day"],
  },
  {
    id: "phone",
    icon: "phone",
    title: "Phone",
    text: "A quick call for short questions at the pharmacy, desk or ward.",
    price: 6,
    unit: "/ 15 minutes",
    points: ["Short conversations", "Pharmacy & reception", "24/7 emergency line"],
  },
];

const cities = ["Chennai", "Vellore", "Kolkata", "Delhi NCR", "Mumbai", "Bangalore", "Hyderabad", "Bangkok", "Kuala Lumpur", "Online (video / phone)"];

const promises = [
  { value: "60+", label: "Trained interpreters" },
  { value: "9", label: "Languages" },
  { value: "24/7", label: "Emergency line" },
  { value: "100%", label: "Confidential" },
];

const faqs = [
  { q: "Why not use a family member or a translation app?", a: "Medical words are hard to translate correctly, and a small mistake can change a treatment decision. Our interpreters are trained in medical terms, stay neutral, and keep everything private, so the patient and family can just focus on care." },
  { q: "Are the interpreters trained in medical language?", a: "Yes. Every interpreter is trained in common medical terms, hospital procedures and patient privacy before working with patients." },
  { q: "Can the same interpreter stay with me for the whole treatment?", a: "Yes. For in-person bookings we try to keep the same interpreter for all your visits, so you feel comfortable and do not have to repeat your story." },
  { q: "Is my medical information kept private?", a: "Always. Our interpreters follow strict confidentiality rules and never share your information with anyone outside your care team." },
  { q: "Can I get a female interpreter?", a: "Yes. Tell us when booking and we will arrange a female interpreter wherever possible." },
];

/* Hero er kotha (doctor → interpreter → patient) */
const chat = [
  { who: "doctor", name: "Doctor", lang: "English", text: "Your scan looks good. We can do the knee surgery next Monday." },
  { who: "interpreter", name: "Interpreter", lang: "বাংলা", text: "আপনার স্ক্যান রিপোর্ট ভালো। আগামী সোমবার হাঁটুর অপারেশন করা যাবে।" },
  { who: "patient", name: "Patient", lang: "বাংলা", text: "অপারেশনের পর কতদিন হাসপাতালে থাকতে হবে?" },
  { who: "interpreter", name: "Interpreter", lang: "English", text: "How many days will I need to stay in the hospital after surgery?" },
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
  lang: <><path d="M4 5h9M8.5 3v2M6 5c.6 3 2.6 5.6 5 7M11 5c-.8 3.6-3.4 6.5-7 8" /><path d="M13 21l4-9 4 9M14.5 18h5" /></>,
  stetho: <><path d="M6 3v6a4 4 0 0 0 8 0V3" /><path d="M10 13v2a5 5 0 0 0 10 0v-2" /><circle cx="20" cy="11" r="2" /></>,
  doc: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
  lab: <><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3" /><path d="M7.5 15h9" /></>,
  pill: <><rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-45 12 12)" /><path d="M9.5 9.5l5 5" /></>,
  bill: <><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" /><path d="M9 8h6M9 12h6M9 16h3" /></>,
  siren: <><path d="M7 17v-5a5 5 0 0 1 10 0v5" /><path d="M4 21h16v-4H4zM12 3v2M4.5 6.5l1.4 1.4M19.5 6.5l-1.4 1.4" /></>,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c.6-3.4 3-5 6-5s5.4 1.6 6 5" /><circle cx="17" cy="9" r="2.4" /><path d="M16.5 14.2c2.4.2 4 1.7 4.5 4.3" /></>,
  video: <><rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10l5-3v10l-5-3" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  shield: <><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  swap: <><path d="M7 4L3 8l4 4" /><path d="M3 8h14" /><path d="M17 20l4-4-4-4" /><path d="M21 16H7" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  compass: <><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5z" /></>,
  car: <><path d="M5 16V11l2-5h10l2 5v5" /><path d="M3 16h18v3h-3M6 19H3v-3" /><circle cx="7.5" cy="16" r="1.5" /><circle cx="16.5" cy="16" r="1.5" /></>,
};

const Icon = ({ name, size = 20 }) => (
  <svg {...base} width={size} height={size}>
    {paths[name]}
  </svg>
);

const WhatsAppIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm4.5 12.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 1.9 2.9 4.6 4 1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" />
  </svg>
);

/* ------------------- Scroll e ashle animation ------------------- */
const Reveal = ({ children, className = "", delay = 0, as: Tag = "div" }) => {
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
    <Tag ref={ref} className={`ip-reveal ${shown ? "is-shown" : ""} ${className}`} style={{ "--d": `${delay}s` }}>
      {children}
    </Tag>
  );
};

const SectionHead = ({ eyebrow, title, text }) => (
  <Reveal className="ip-head">
    <span className="ip-eyebrow">{eyebrow}</span>
    <h2>{title}</h2>
    {text && <p>{text}</p>}
  </Reveal>
);

const today = () => new Date().toISOString().slice(0, 10);

/* ---------------------------- PAGE ---------------------------- */
const emptyForm = {
  name: "",
  phone: "",
  from: "Bangla",
  to: "Hindi",
  mode: "person",
  city: "",
  hospital: "",
  date: "",
  duration: "Half day (4 hours)",
  female: false,
  notes: "",
};

const Interpreter = () => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const formRef = useRef(null);

  const setField = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((er) => ({ ...er, [key]: "" }));
  };

  const goToForm = (patch = {}) => {
    setForm((f) => ({ ...f, ...patch }));
    setSent(false);
    if (formRef.current) formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const swapLang = () => {
    // Bangla shob shomoy ekdike thakbe (amader rogi Bangla bhashi)
    setForm((f) => ({ ...f, from: f.to, to: f.from }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = "Please enter the patient's name.";
    if (form.phone.replace(/\D/g, "").length < 10) er.phone = "Please enter a valid phone number.";
    if (!form.city) er.city = "Please select a city.";
    if (!form.date) er.date = "Please select a date.";
    if (form.from === form.to) er.to = "Please choose two different languages.";
    setErrors(er);
    if (Object.keys(er).length) return;
    /* EKHANE tomar API call boshao. Ekhon shudhu demo. Data: form */
    setSent(true);
  };

  const mode = modes.find((m) => m.id === form.mode);
  const langOptions = languages.map((l) => l.name);

  return (
    <main className="ip-page">
      {/* ================= HERO ================= */}
      <section className="ip-hero">
        <div className="ip-container ip-hero-grid">
          <div className="ip-hero-text">
            <nav className="ip-crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>Patient Support</span>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Interpreter</span>
            </nav>
            <span className="ip-badge">
              <Icon name="lang" size={16} /> Medical Interpreter Service
            </span>
            <h1>
              Understand every word <em>your doctor says</em>
            </h1>
            <p>
              Trained medical interpreters who speak Bangla and the local language, so you can talk to your
              doctor clearly, ask every question and make the right decisions with confidence.
            </p>

            <div className="ip-hero-langs" aria-label="Languages">
              {languages.slice(0, 6).map((l) => (
                <span key={l.name} className={l.main ? "is-main" : ""} lang={l.name === "Bangla" ? "bn" : undefined}>
                  {l.native}
                </span>
              ))}
              <span className="is-more">+{languages.length - 6} more</span>
            </div>

            <div className="ip-hero-actions">
              <button type="button" className="ip-btn" onClick={() => goToForm()}>
                Book an Interpreter <Icon name="arrow" size={18} />
              </button>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="ip-btn ip-btn--wa">
                <WhatsAppIcon /> WhatsApp
              </a>
            </div>
          </div>

          {/* Kotha bolar card */}
          <div className="ip-chat" aria-label="Example conversation with an interpreter">
            <div className="ip-chat-top">
              <span className="ip-chat-live" aria-hidden="true" />
              <strong>Consultation · Orthopedics</strong>
              <span className="ip-chat-pair">
                EN <Icon name="swap" size={14} /> বাং
              </span>
            </div>
            <ul className="ip-chat-list">
              {chat.map((m, i) => (
                <li key={i} className={`ip-msg ip-msg--${m.who}`} style={{ "--i": i }}>
                  <span className="ip-msg-meta">
                    {m.name} · {m.lang}
                  </span>
                  <p lang={m.lang === "বাংলা" ? "bn" : "en"}>{m.text}</p>
                </li>
              ))}
            </ul>
            <div className="ip-chat-typing" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROMISE STRIP ================= */}
      <div className="ip-container">
        <Reveal className="ip-promise">
          {promises.map((p) => (
            <div key={p.label}>
              <strong>{p.value}</strong>
              <span>{p.label}</span>
            </div>
          ))}
        </Reveal>
      </div>

      {/* ================= WHERE THEY HELP ================= */}
      <section className="ip-section">
        <div className="ip-container">
          <SectionHead
            eyebrow="Where we help"
            title="An interpreter by your side, at every step"
            text="From the first consultation to the day you go home, nothing gets lost in translation."
          />
          <div className="ip-helps">
            {helps.map((h, i) => (
              <Reveal key={h.title} className="ip-help" delay={(i % 3) * 0.08}>
                <span className="ip-help-icon">
                  <Icon name={h.icon} size={26} />
                </span>
                <h3>{h.title}</h3>
                <p>{h.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LANGUAGES ================= */}
      <section className="ip-section ip-section--soft">
        <div className="ip-container ip-lang-wrap">
          <div className="ip-lang-text">
            <SectionHead
              eyebrow="Languages"
              title="We speak your language, and your doctor's"
              text="Every interpreter speaks Bangla, plus the language of the hospital, so the conversation flows naturally."
            />
            <ul className="ip-lang-points">
              <li>
                <Icon name="check" size={16} /> Native Bangla speakers
              </li>
              <li>
                <Icon name="check" size={16} /> Trained in medical terms
              </li>
              <li>
                <Icon name="check" size={16} /> Female interpreters on request
              </li>
            </ul>
          </div>

          <div className="ip-langs">
            {languages.map((l, i) => (
              <Reveal key={l.name} className={`ip-lang ${l.main ? "is-main" : ""}`} delay={(i % 3) * 0.06}>
                <strong lang={l.name === "Bangla" ? "bn" : undefined}>{l.native}</strong>
                <span>{l.name}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MODES ================= */}
      <section className="ip-section">
        <div className="ip-container">
          <SectionHead
            eyebrow="How you can book"
            title="In person, on video or by phone"
            text="Sample starting prices in USD. Final price depends on city, language and hours."
          />
          <div className="ip-modes">
            {modes.map((m, i) => (
              <Reveal key={m.id} className={`ip-mode ${m.popular ? "is-popular" : ""}`} delay={i * 0.1}>
                {m.popular && <span className="ip-popular">Most booked</span>}
                <span className="ip-mode-icon">
                  <Icon name={m.icon} size={28} />
                </span>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
                <div className="ip-mode-price">
                  <small>From</small>
                  <strong>${m.price}</strong>
                  <span>{m.unit}</span>
                </div>
                <ul>
                  {m.points.map((pt) => (
                    <li key={pt}>
                      <Icon name="check" size={15} /> {pt}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={`ip-btn ip-btn--full ${m.popular ? "" : "ip-btn--ghost"}`}
                  onClick={() => goToForm({ mode: m.id, city: m.id === "person" ? form.city : "Online (video / phone)" })}
                >
                  Book {m.title}
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BOOKING ================= */}
      <section className="ip-section ip-book-wrap" ref={formRef} id="book">
        <div className="ip-container ip-book">
          <div className="ip-book-info">
            <span className="ip-eyebrow ip-eyebrow--light">Book an interpreter</span>
            <h2>Tell us when you need help</h2>
            <p>We confirm your interpreter on WhatsApp, with their name and phone number, before your appointment.</p>

            <div className="ip-book-summary">
              <span className="ip-book-icon">
                <Icon name={mode.icon} size={24} />
              </span>
              <div>
                <small>Your booking</small>
                <strong>
                  {form.from} <Icon name="swap" size={14} /> {form.to}
                </strong>
                <span>
                  {mode.title} · from ${mode.price} {mode.unit}
                </span>
              </div>
            </div>

            <ul className="ip-book-points">
              <li>
                <Icon name="shield" size={18} /> Strict patient confidentiality
              </li>
              <li>
                <Icon name="users" size={18} /> Same interpreter for all your visits
              </li>
              <li>
                <Icon name="siren" size={18} /> 24/7 emergency phone line
              </li>
            </ul>

            <a href={CONTACT.phoneLink} className="ip-book-call">
              <Icon name="phone" size={18} /> {CONTACT.phone}
            </a>
          </div>

          {sent ? (
            <div className="ip-form ip-form--done" role="status">
              <span className="ip-done-icon">
                <Icon name="check" size={34} />
              </span>
              <h3>Booking request sent!</h3>
              <p>
                Thank you, {form.name.split(" ")[0]}. We will confirm your {form.from}–{form.to} interpreter for{" "}
                {form.date} on WhatsApp soon.
              </p>
              <button type="button" className="ip-btn ip-btn--ghost" onClick={() => setSent(false)}>
                Make another booking
              </button>
            </div>
          ) : (
            <form className="ip-form" onSubmit={handleSubmit} noValidate>
              {/* Language pair */}
              <div className={`ip-pair ${errors.to ? "has-error" : ""}`}>
                <label className="ip-field">
                  <span>Patient speaks</span>
                  <select value={form.from} onChange={setField("from")}>
                    {langOptions.map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                </label>
                <button type="button" className="ip-swap" onClick={swapLang} aria-label="Swap languages">
                  <Icon name="swap" size={18} />
                </button>
                <label className="ip-field">
                  <span>Doctor speaks</span>
                  <select value={form.to} onChange={setField("to")}>
                    {langOptions.map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                </label>
              </div>
              {errors.to && <em className="ip-pair-error">{errors.to}</em>}

              {/* Mode */}
              <div className="ip-field ip-field--full">
                <span>Type of interpreting</span>
                <div className="ip-mode-pick" role="radiogroup" aria-label="Type of interpreting">
                  {modes.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      role="radio"
                      aria-checked={form.mode === m.id}
                      className={form.mode === m.id ? "is-on" : ""}
                      onClick={() => setForm((f) => ({ ...f, mode: m.id }))}
                    >
                      <Icon name={m.icon} size={17} /> {m.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="ip-fields">
                <label className={`ip-field ${errors.name ? "has-error" : ""}`}>
                  <span>
                    Patient name <i>*</i>
                  </span>
                  <input type="text" value={form.name} onChange={setField("name")} placeholder="Full name" autoComplete="name" />
                  {errors.name && <em>{errors.name}</em>}
                </label>
                <label className={`ip-field ${errors.phone ? "has-error" : ""}`}>
                  <span>
                    Phone / WhatsApp <i>*</i>
                  </span>
                  <input type="tel" value={form.phone} onChange={setField("phone")} placeholder="+880 1XXX-XXXXXX" autoComplete="tel" />
                  {errors.phone && <em>{errors.phone}</em>}
                </label>
                <label className={`ip-field ${errors.city ? "has-error" : ""}`}>
                  <span>
                    City <i>*</i>
                  </span>
                  <select value={form.city} onChange={setField("city")}>
                    <option value="">Select city</option>
                    {cities.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  {errors.city && <em>{errors.city}</em>}
                </label>
                <label className="ip-field">
                  <span>Hospital (optional)</span>
                  <input type="text" value={form.hospital} onChange={setField("hospital")} placeholder="e.g. Apollo Hospitals" />
                </label>
                <label className={`ip-field ${errors.date ? "has-error" : ""}`}>
                  <span>
                    Date <i>*</i>
                  </span>
                  <input type="date" min={today()} value={form.date} onChange={setField("date")} />
                  {errors.date && <em>{errors.date}</em>}
                </label>
                <label className="ip-field">
                  <span>How long?</span>
                  <select value={form.duration} onChange={setField("duration")}>
                    <option>30 minutes</option>
                    <option>1-2 hours</option>
                    <option>Half day (4 hours)</option>
                    <option>Full day (8 hours)</option>
                    <option>Several days</option>
                  </select>
                </label>
                <label className="ip-field ip-field--full">
                  <span>Anything we should know? (optional)</span>
                  <textarea
                    rows="3"
                    value={form.notes}
                    onChange={setField("notes")}
                    placeholder="e.g. appointment time, department, type of treatment"
                  />
                </label>
              </div>

              <label className="ip-check">
                <input type="checkbox" checked={form.female} onChange={setField("female")} />
                <span className="ip-check-box" aria-hidden="true">
                  <Icon name="check" size={14} />
                </span>
                I would prefer a female interpreter
              </label>

              <button type="submit" className="ip-btn ip-btn--full">
                Request Interpreter <Icon name="arrow" size={18} />
              </button>
              <p className="ip-form-note">No payment now. We confirm the interpreter and price first.</p>
            </form>
          )}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="ip-section">
        <div className="ip-container ip-faq-wrap">
          <SectionHead eyebrow="FAQ" title="Questions about interpreting" />
          <div className="ip-faqs">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className={`ip-faq ${open ? "is-open" : ""}`}>
                  <button type="button" aria-expanded={open} aria-controls={`ip-faq-${i}`} onClick={() => setOpenFaq(open ? -1 : i)}>
                    {f.q}
                    <span className="ip-faq-icon">
                      <Icon name="plus" size={18} />
                    </span>
                  </button>
                  <div className="ip-faq-body" id={`ip-faq-${i}`}>
                    <div>
                      <p>{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="ip-related">
            <Link to="/services/local-guide" className="ip-rel">
              <span className="ip-rel-icon">
                <Icon name="compass" size={22} />
              </span>
              <div>
                <strong>Local Guide</strong>
                <small>Help around the city & hospital</small>
              </div>
              <Icon name="arrow" size={18} />
            </Link>
            <Link to="/services/pick-and-drop" className="ip-rel">
              <span className="ip-rel-icon">
                <Icon name="car" size={22} />
              </span>
              <div>
                <strong>Airport Pick &amp; Drop</strong>
                <small>A ride from the airport</small>
              </div>
              <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Interpreter;
