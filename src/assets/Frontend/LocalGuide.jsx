import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/LocalGuide.css";

/* ---------------------------- CONTACT ----------------------------
   Asol number boshao
------------------------------------------------------------------- */
const CONTACT = {
  phone: "+880 1234-567890",
  phoneLink: "tel:+8801234567890",
  whatsapp: "https://wa.me/8801234567890",
};

/* ---------------------------- IMAGES ----------------------------
   Unsplash er free demo photo. Nijer image dite chaile import kore bodlao:
   import heroImg from "../Image/guide/hero.jpg";  ...  hero: heroImg
   Image load na hole sundor placeholder dekhabe.
------------------------------------------------------------------- */
const u = (id, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const IMG = {
  hero: u("photo-1519494026892-80bbd2d6fd0d"),
  city: u("photo-1488646953014-85cb44e25828", 800),
};

/* ---------------------------- DATA ----------------------------
   Guide gulo DEMO (kalponik naam). Tomar asol guide diye replace koro.
------------------------------------------------------------------- */
const cities = ["All", "Chennai", "Delhi NCR", "Kolkata", "Bangkok", "Kuala Lumpur"];

const guides = [
  { id: 1, name: "Rafiq Ahmed", city: "Chennai", languages: ["Bangla", "English", "Tamil"], years: 7, rating: 4.9, trips: 640, focus: "Apollo & MGM hospital area" },
  { id: 2, name: "Sumaiya Khan", city: "Kolkata", languages: ["Bangla", "Hindi", "English"], years: 5, rating: 4.8, trips: 410, focus: "Tata Medical & AMRI area", female: true },
  { id: 3, name: "Arjun Mehta", city: "Delhi NCR", languages: ["Hindi", "English", "Bangla"], years: 6, rating: 4.8, trips: 520, focus: "Fortis, Max & Medanta area" },
  { id: 4, name: "Nita Somchai", city: "Bangkok", languages: ["Thai", "English"], years: 8, rating: 4.9, trips: 700, focus: "Bumrungrad & Sukhumvit area", female: true },
  { id: 5, name: "Hafiz Rahman", city: "Kuala Lumpur", languages: ["Malay", "English", "Bangla"], years: 4, rating: 4.7, trips: 300, focus: "Prince Court & KLCC area" },
  { id: 6, name: "Tanvir Hasan", city: "Chennai", languages: ["Bangla", "English", "Hindi"], years: 3, rating: 4.7, trips: 220, focus: "Kauvery & Vadapalani area" },
];

const helps = [
  { icon: "hospital", title: "Hospital navigation", text: "Finds the right desk, floor and doctor's room so you never get lost." },
  { icon: "doc", title: "Registration & billing", text: "Helps with forms, payments, insurance papers and getting reports." },
  { icon: "pill", title: "Pharmacy & tests", text: "Takes you to the pharmacy, lab and scan centre on time." },
  { icon: "sim", title: "SIM card & currency", text: "Helps you buy a local SIM and change money at fair rates." },
  { icon: "food", title: "Food & daily needs", text: "Shows you halal restaurants, grocery shops and markets nearby." },
  { icon: "map", title: "City tour on rest days", text: "Light sightseeing and shopping when your doctor says it is okay." },
];

const day = [
  { time: "08:00", title: "Pick-up from your stay", text: "Your guide meets you at the hotel lobby with the day's plan." },
  { time: "09:00", title: "Hospital registration", text: "Help at the international patient desk and with forms." },
  { time: "10:30", title: "Doctor consultation", text: "Guide waits with you, helps with directions and next steps." },
  { time: "13:00", title: "Lunch & pharmacy", text: "A clean halal meal, then medicines from the pharmacy." },
  { time: "15:00", title: "Tests & reports", text: "Lab or scan visits, and collecting reports on time." },
  { time: "18:00", title: "Back to your stay", text: "Drop-off and a quick plan for tomorrow." },
];

const plans = [
  { name: "Half Day", price: 15, unit: "/ 4 hours", items: ["One hospital visit", "Registration help", "Pharmacy run"], icon: "clock" },
  { name: "Full Day", price: 25, unit: "/ 8 hours", items: ["Hospital visit + tests", "Lunch & shopping help", "SIM & currency help", "WhatsApp support"], icon: "sun", popular: true },
  { name: "Full Stay", price: 140, unit: "/ week", items: ["Daily guide support", "All hospital visits", "City tour on a rest day", "24/7 phone support"], icon: "calendar" },
];

const faqs = [
  { q: "Is a local guide the same as an interpreter?", a: "A local guide helps you move around the hospital and city and handle daily tasks. Many guides speak Bangla, but for detailed medical talks with doctors we recommend a trained medical interpreter." },
  { q: "Can I ask for a female guide?", a: "Yes. Tell us when you book and we will try to arrange a female guide in your city." },
  { q: "Do guides travel with us in the car?", a: "Yes, your guide can ride with you. Transport is booked separately through our Pick & Drop or local transport service." },
  { q: "How do I pay?", a: "We confirm the price before your trip. You can pay in advance or on arrival, depending on the plan." },
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
  hospital: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M12 7v6M9 10h6M9 21v-4h6v4" /></>,
  doc: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
  pill: <><rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-45 12 12)" /><path d="M9.5 9.5l5 5" /></>,
  sim: <><path d="M7 3h7l4 4v14H7z" /><rect x="9.5" y="11" width="6" height="6" rx="1" /></>,
  food: <><path d="M4 3v8a2 2 0 0 0 2 2h1v8M7 3v6M10 3v8a2 2 0 0 1-2 2" /><path d="M17 21V3c-2 1-3.5 3.5-3.5 7 0 2 1.5 3 3.5 3" /></>,
  map: <><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" /><path d="M9 4v14M15 6v14" /></>,
  pin: <><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></>,
  lang: <><path d="M4 5h9M8.5 3v2M6 5c.6 3 2.6 5.6 5 7M11 5c-.8 3.6-3.4 6.5-7 8" /><path d="M13 21l4-9 4 9M14.5 18h5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  shield: <><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  heart: <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c.6-3.4 3-5 6-5s5.4 1.6 6 5" /><circle cx="17" cy="9" r="2.4" /><path d="M16.5 14.2c2.4.2 4 1.7 4.5 4.3" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  compass: <><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5z" /></>,
};

const Icon = ({ name, size = 20 }) => (
  <svg {...base} width={size} height={size}>
    {paths[name]}
  </svg>
);

const Star = ({ size = 14 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path fill="currentColor" d="M12 2.5l2.94 6.1 6.56.9-4.8 4.6 1.2 6.6L12 17.5l-5.9 3.2 1.2-6.6-4.8-4.6 6.56-.9L12 2.5z" />
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
    <Tag ref={ref} className={`lg-reveal ${shown ? "is-shown" : ""} ${className}`} style={{ "--d": `${delay}s` }}>
      {children}
    </Tag>
  );
};

/* Image na thakle / load na hole placeholder */
const Pic = ({ src, alt, className = "" }) => {
  const [failed, setFailed] = useState(!src);
  return (
    <div className={`lg-pic ${failed ? "lg-pic--empty" : ""} ${className}`}>
      {failed ? <Icon name="compass" size={50} /> : <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />}
    </div>
  );
};

const SectionHead = ({ eyebrow, title, text, light = false }) => (
  <Reveal className={`lg-head ${light ? "lg-head--light" : ""}`}>
    <span className="lg-eyebrow">{eyebrow}</span>
    <h2>{title}</h2>
    {text && <p>{text}</p>}
  </Reveal>
);

/* Naam theke 2 ta letter (photo er bodole) */
const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

const today = () => new Date().toISOString().slice(0, 10);

/* ---------------------------- PAGE ---------------------------- */
const LocalGuide = () => {
  const [city, setCity] = useState("All");
  const [form, setForm] = useState({ name: "", phone: "", city: "", language: "Bangla", plan: "Full Day", date: "", days: "1", hospital: "", female: false, guide: "" });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const formRef = useRef(null);

  const list = useMemo(() => guides.filter((g) => city === "All" || g.city === city), [city]);

  const setField = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  // Card / plan theke form e jay
  const goToForm = (patch) => {
    setForm((f) => ({ ...f, ...patch }));
    setSent(false);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /* EKHANE tomar API call boshao. Ekhon shudhu demo. Data: form */
    setSent(true);
  };

  return (
    <main className="lg-page">
      {/* ================= HERO ================= */}
      <section className="lg-hero">
        <div className="lg-container lg-hero-grid">
          <div className="lg-hero-text">
          
            <span className="lg-badge">
              <Icon name="compass" size={16} /> Local Guide Service
            </span>
            <h1>
              A friendly local by your side, <em>every step of treatment</em>
            </h1>
            <p>
              New city, new language, a big hospital. Our Bangla-speaking local guides help you with hospital
              visits, paperwork, food, SIM cards and everything in between, so your family feels at home.
            </p>

            <div className="lg-hero-actions">
              <button type="button" className="lg-btn" onClick={() => goToForm({})}>
                Book a Guide <Icon name="arrow" size={18} />
              </button>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="lg-btn lg-btn--outline">
                <WhatsAppIcon /> Ask on WhatsApp
              </a>
            </div>

            <ul className="lg-trust">
              <li>
                <strong>40+</strong>
                <span>Trained guides</span>
              </li>
              <li>
                <strong>5</strong>
                <span>Cities</span>
              </li>
              <li>
                <strong>4.8</strong>
                <span>Patient rating</span>
              </li>
            </ul>
          </div>

          <div className="lg-hero-media">
            <Pic src={IMG.hero} alt="Hospital corridor where a guide helps patients" className="lg-hero-img" />
            <div className="lg-float lg-float--guide">
              <span className="lg-avatar lg-avatar--sm">RA</span>
              <div>
                <strong>Rafiq is waiting</strong>
                <small>Your guide in Chennai</small>
              </div>
              <span className="lg-online" aria-hidden="true" />
            </div>
            <div className="lg-float lg-float--lang">
              <Icon name="lang" size={18} />
              <span>Bangla</span>
              <span>English</span>
              <span>Hindi</span>
            </div>
            <div className="lg-float lg-float--route">
              <span className="lg-route-dot" />
              <div>
                <small>Next stop</small>
                <strong>Cardiology, 3rd floor</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW THEY HELP ================= */}
      <section className="lg-section">
        <div className="lg-container">
          <SectionHead
            eyebrow="How a guide helps"
            title="More than directions, real everyday help"
            text="Your guide takes care of the small things, so you can focus on getting better."
          />
          <div className="lg-helps">
            {helps.map((h, i) => (
              <Reveal key={h.title} className="lg-help" delay={(i % 3) * 0.08}>
                <span className="lg-help-no">{String(i + 1).padStart(2, "0")}</span>
                <span className="lg-help-icon">
                  <Icon name={h.icon} size={26} />
                </span>
                <div>
                  <h3>{h.title}</h3>
                  <p>{h.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= A DAY WITH YOUR GUIDE ================= */}
      <section className="lg-section lg-section--dark">
        <div className="lg-container lg-day">
          <div className="lg-day-intro">
            <SectionHead
              light
              eyebrow="A day with your guide"
              title="Here's what a typical hospital day looks like"
              text="Every plan is shaped around your appointments. Your guide keeps the day calm and on time."
            />
            <Reveal className="lg-day-card">
              <Pic src={IMG.city} alt="Planning the day with a city map" className="lg-day-img" />
              <div className="lg-day-note">
                <Icon name="shield" size={22} />
                <span>All guides are verified and trained to support patients.</span>
              </div>
            </Reveal>
          </div>

          <ol className="lg-timeline">
            {day.map((d, i) => (
              <Reveal as="li" key={d.time} className="lg-tl-item" delay={i * 0.08}>
                <span className="lg-tl-time">{d.time}</span>
                <span className="lg-tl-dot" aria-hidden="true" />
                <div className="lg-tl-body">
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= GUIDES ================= */}
      <section className="lg-section lg-section--soft">
        <div className="lg-container">
          <SectionHead
            eyebrow="Meet our guides"
            title="Local experts who speak your language"
            text="Demo profiles. Choose a guide or let us match one to your hospital and city."
          />

          <div className="lg-chips" role="group" aria-label="Filter guides by city">
            {cities.map((c) => (
              <button
                key={c}
                type="button"
                className={`lg-chip ${city === c ? "is-active" : ""}`}
                aria-pressed={city === c}
                onClick={() => setCity(c)}
              >
                {c === "All" ? "All Cities" : c}
              </button>
            ))}
          </div>

          <div className="lg-guides" key={city}>
            {list.map((g, i) => (
              <Reveal as="article" key={g.id} className="lg-guide" delay={(i % 3) * 0.08}>
                <div className="lg-guide-top">
                  <span className={`lg-avatar ${g.female ? "lg-avatar--alt" : ""}`}>{initials(g.name)}</span>
                  <div>
                    <h3>{g.name}</h3>
                    <p>
                      <Icon name="pin" size={14} /> {g.city}
                    </p>
                  </div>
                  <span className="lg-guide-rating">
                    <Star size={13} /> {g.rating}
                  </span>
                </div>

                <p className="lg-guide-focus">
                  <Icon name="hospital" size={15} /> {g.focus}
                </p>

                <div className="lg-langs">
                  {g.languages.map((l) => (
                    <span key={l} className={l === "Bangla" ? "is-bn" : ""}>
                      {l}
                    </span>
                  ))}
                </div>

                <div className="lg-guide-stats">
                  <div>
                    <strong>{g.years} yrs</strong>
                    <small>Experience</small>
                  </div>
                  <div>
                    <strong>{g.trips}+</strong>
                    <small>Patients helped</small>
                  </div>
                </div>

                <button
                  type="button"
                  className="lg-btn lg-btn--ghost lg-btn--full"
                  onClick={() => goToForm({ guide: g.name, city: g.city, female: !!g.female })}
                >
                  Request {g.name.split(" ")[0]}
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PLANS ================= */}
      <section className="lg-section">
        <div className="lg-container">
          <SectionHead
            eyebrow="Simple pricing"
            title="Pick a plan that fits your schedule"
            text="Sample prices in USD. The final price depends on city and hours."
          />
          <div className="lg-plans">
            {plans.map((p, i) => (
              <Reveal key={p.name} className={`lg-plan ${p.popular ? "is-popular" : ""}`} delay={i * 0.1}>
                {p.popular && <span className="lg-popular">Most booked</span>}
                <span className="lg-plan-icon">
                  <Icon name={p.icon} size={26} />
                </span>
                <h3>{p.name}</h3>
                <div className="lg-plan-price">
                  <strong>${p.price}</strong>
                  <span>{p.unit}</span>
                </div>
                <ul>
                  {p.items.map((it) => (
                    <li key={it}>
                      <Icon name="check" size={16} /> {it}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={`lg-btn lg-btn--full ${p.popular ? "" : "lg-btn--ghost"}`}
                  onClick={() => goToForm({ plan: p.name })}
                >
                  Choose {p.name}
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BOOKING ================= */}
      <section className="lg-section lg-section--soft lg-book-wrap" ref={formRef} id="book">
        <div className="lg-container lg-book">
          <div className="lg-book-info">
            <SectionHead
              eyebrow="Book a guide"
              title="Tell us when and where you need help"
              text="We match you with a guide who knows your hospital and speaks your language, then confirm on WhatsApp."
            />
            <ul className="lg-book-points">
              <li>
                <Icon name="users" size={20} /> Matched to your hospital &amp; language
              </li>
              <li>
                <Icon name="heart" size={20} /> Female guide on request
              </li>
              <li>
                <Icon name="shield" size={20} /> Verified &amp; trained guides
              </li>
            </ul>
            <a href={CONTACT.phoneLink} className="lg-book-call">
              <span>
                <Icon name="phone" size={18} />
              </span>
              <div>
                <small>Prefer to talk?</small>
                {CONTACT.phone}
              </div>
            </a>
          </div>

          {sent ? (
            <div className="lg-form lg-form--done" role="status">
              <span className="lg-done-icon">
                <Icon name="check" size={34} />
              </span>
              <h3>Request sent!</h3>
              <p>
                Thank you{form.name ? `, ${form.name.split(" ")[0]}` : ""}. We will match you with
                {form.guide ? ` ${form.guide}` : " the right guide"} and confirm on WhatsApp soon.
              </p>
              <button type="button" className="lg-btn lg-btn--ghost" onClick={() => setSent(false)}>
                Send another request
              </button>
            </div>
          ) : (
            <form className="lg-form" onSubmit={handleSubmit}>
              {form.guide && (
                <div className="lg-picked">
                  <span className="lg-avatar lg-avatar--sm">{initials(form.guide)}</span>
                  <span>
                    Requested guide: <b>{form.guide}</b>
                  </span>
                  <button type="button" onClick={() => setForm((f) => ({ ...f, guide: "" }))} aria-label="Remove requested guide">
                    ×
                  </button>
                </div>
              )}
              <div className="lg-fields">
                <label className="lg-field">
                  <span>Patient name</span>
                  <input type="text" value={form.name} onChange={setField("name")} placeholder="Full name" required />
                </label>
                <label className="lg-field">
                  <span>Phone / WhatsApp</span>
                  <input type="tel" value={form.phone} onChange={setField("phone")} placeholder="+880 1XXX-XXXXXX" required />
                </label>
                <label className="lg-field">
                  <span>City</span>
                  <select value={form.city} onChange={setField("city")} required>
                    <option value="" disabled>
                      Select city
                    </option>
                    {cities.slice(1).map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </label>
                <label className="lg-field">
                  <span>Preferred language</span>
                  <select value={form.language} onChange={setField("language")}>
                    <option>Bangla</option>
                    <option>English</option>
                    <option>Hindi</option>
                  </select>
                </label>
                <label className="lg-field">
                  <span>Start date</span>
                  <input type="date" min={today()} value={form.date} onChange={setField("date")} required />
                </label>
                <label className="lg-field">
                  <span>Number of days</span>
                  <select value={form.days} onChange={setField("days")}>
                    {["1", "2", "3", "5", "7", "14", "21", "30"].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === "1" ? "day" : "days"}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="lg-field">
                  <span>Plan</span>
                  <select value={form.plan} onChange={setField("plan")}>
                    {plans.map((p) => (
                      <option key={p.name}>{p.name}</option>
                    ))}
                  </select>
                </label>
                <label className="lg-field">
                  <span>Hospital (optional)</span>
                  <input type="text" value={form.hospital} onChange={setField("hospital")} placeholder="e.g. Apollo Hospitals" />
                </label>
              </div>
              <label className="lg-check">
                <input type="checkbox" checked={form.female} onChange={setField("female")} />
                <span className="lg-check-box" aria-hidden="true">
                  <Icon name="check" size={14} />
                </span>
                I would prefer a female guide
              </label>
              <button type="submit" className="lg-btn lg-btn--full">
                Request a Local Guide <Icon name="arrow" size={18} />
              </button>
              <p className="lg-form-note">No payment now. We confirm the guide and price first.</p>
            </form>
          )}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="lg-section">
        <div className="lg-container lg-faq-wrap">
          <SectionHead eyebrow="FAQ" title="Good to know" />
          <div className="lg-faqs">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className={`lg-faq ${open ? "is-open" : ""}`}>
                  <button type="button" aria-expanded={open} aria-controls={`lg-faq-${i}`} onClick={() => setOpenFaq(open ? -1 : i)}>
                    {f.q}
                    <span className="lg-faq-icon">
                      <Icon name="plus" size={18} />
                    </span>
                  </button>
                  <div className="lg-faq-body" id={`lg-faq-${i}`}>
                    <div>
                      <p>{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Related services */}
          <div className="lg-related">
            <Link to="/services/interpreter" className="lg-rel">
              <span className="lg-rel-icon">
                <Icon name="lang" size={22} />
              </span>
              <div>
                <strong>Medical Interpreter</strong>
                <small>For detailed talks with doctors</small>
              </div>
              <Icon name="arrow" size={18} />
            </Link>
            <Link to="/services/pick-and-drop" className="lg-rel">
              <span className="lg-rel-icon">
                <Icon name="map" size={22} />
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

export default LocalGuide;
