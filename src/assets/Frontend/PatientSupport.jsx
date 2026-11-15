import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/PatientSupport.css";

import patient from "../Image/Medicalvisa/patientcare.jpg";

/* ---------------------------- DATA ---------------------------- */
// Shob text SAMPLE. Tomar asol service onujayi edit koro
const heroPoints = ["Help from arrival to departure", "Language support at every step", "A caring team for patients & families"];

const services = [
  {
    id: "Interpreter",
    icon: "chat",
    title: "Medical Interpreter",
    text: "A trained interpreter helps you talk clearly with doctors, nurses, and hospital staff.",
    features: ["Bangla, Hindi & English", "Present at consultations", "Simple report explanation"],
  },
  {
    id: "Appointments",
    icon: "calendar",
    title: "Appointment Help",
    text: "We book and manage your doctor visits, tests, and follow-ups so nothing is missed.",
    features: ["Doctor scheduling", "Test & scan booking", "Reminders for visits"],
  },
  {
    id: "Hospital Assistance",
    icon: "clipboard",
    title: "Hospital Assistance",
    text: "A coordinator guides you through registration, admission, billing, and discharge.",
    features: ["Registration & admission", "Billing guidance", "Discharge paperwork"],
  },
  {
    id: "Family Care",
    icon: "heart",
    title: "Family & Companion Care",
    text: "Support for the family too: updates, local guidance, and help with daily needs.",
    features: ["Regular updates", "Local guidance", "Help with daily needs"],
  },
];

const features = [
  { icon: "user", title: "Personal Coordinator", text: "One dedicated person who knows your case and stays in touch with you." },
  { icon: "chat", title: "Clear Communication", text: "We explain medical terms in simple language you can understand." },
  { icon: "clock", title: "Quick Response", text: "Message us any time and our team replies as fast as possible." },
  { icon: "shield", title: "Safe & Private", text: "Your reports and personal details are handled with care and kept private." },
  { icon: "wallet", title: "Clear Costs", text: "You know the service charges up front. No hidden fees." },
  { icon: "support", title: "Support After Treatment", text: "We stay with you for follow-ups, reports, and return travel planning." },
];

const steps = [
  { title: "Tell Us Your Needs", text: "Share your treatment, hospital, and the help you need." },
  { title: "Get a Support Plan", text: "We send a clear plan with a named coordinator." },
  { title: "Start Your Care", text: "Your coordinator meets you and supports you on the ground." },
];

const faqs = [
  {
    q: "Will someone meet me when I arrive?",
    a: "Yes. Your coordinator can meet you at the airport or at the hospital and help you through the first steps. Tell us your arrival details and we will plan it with you.",
  },
  {
    q: "Which languages does your team speak?",
    a: "Our team supports Bangla, Hindi, and English. If you need another language, tell us in your request and we will do our best to arrange it.",
  },
  {
    q: "Can I get support for only some services?",
    a: "Of course. You can choose just an interpreter, or full support from arrival to departure. We will suggest what fits your case.",
  },
  {
    q: "Can my family get updates about my treatment?",
    a: "Yes, with your permission. We can share regular updates with family members back home so they stay informed and at ease.",
  },
];

const cities = ["Delhi", "Chennai", "Kolkata", "Mumbai", "Bangkok", "Kuala Lumpur", "Singapore", "Beijing", "Shanghai", "Dhaka"];

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
    case "chat":
      return (
        <svg {...p}>
          <path d="M4 5h16v11H9l-5 4z" />
          <path d="M8 9.5h8M8 12.5h5" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...p}>
          <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
          <path d="M3.5 10h17M8 3v4M16 3v4" />
          <path d="M9 14.5l2 2 4-4" />
        </svg>
      );
    case "clipboard":
      return (
        <svg {...p}>
          <rect x="5" y="4" width="14" height="17" rx="2.5" />
          <path d="M9 4.5h6v2.5H9zM9 12h6M9 16h4" />
        </svg>
      );
    case "heart":
      return (
        <svg {...p}>
          <path d="M12 20s-8-4.9-8-10.6A4.4 4.4 0 0 1 12 7a4.4 4.4 0 0 1 8 2.4C20 15.1 12 20 12 20z" />
        </svg>
      );
    case "user":
      return (
        <svg {...p}>
          <circle cx="12" cy="8" r="3.6" />
          <path d="M5 20c.7-3.8 3.4-5.8 7-5.8s6.3 2 7 5.8" />
        </svg>
      );
    case "clock":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 2" />
        </svg>
      );
    case "shield":
      return (
        <svg {...p}>
          <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "wallet":
      return (
        <svg {...p}>
          <rect x="3" y="6" width="18" height="13" rx="3" />
          <path d="M3 10h18" />
          <circle cx="16.5" cy="14.5" r="1" fill="currentColor" />
        </svg>
      );
    case "support":
      return (
        <svg {...p}>
          <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
          <rect x="3" y="13" width="4" height="6" rx="1.5" />
          <rect x="17" y="13" width="4" height="6" rx="1.5" />
          <path d="M19 19c0 1.5-2 2-5 2" />
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
const Reveal = ({ children, className = "", delay = 0, direction = "up" }) => {
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
      className={`ps-reveal ps-reveal--${direction} ${shown ? "is-shown" : ""} ${className}`}
      style={{ "--d": `${delay}s` }}
    >
      {children}
    </div>
  );
};

const Pic = ({ src, alt, className = "" }) => {
  const [failed, setFailed] = useState(!src);
  return (
    <div className={`ps-pic ${failed ? "ps-pic--empty" : ""} ${className}`}>
      {failed ? <ImageIcon /> : <img src={src} alt={alt} onError={() => setFailed(true)} />}
    </div>
  );
};

/* ---------------------------- PAGE ---------------------------- */
const initial = {
  name: "",
  phone: "",
  city: "",
  service: "",
  arrival: "",
  people: "1",
  notes: "",
};

const todayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const PatientSupport = () => {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success
  const [openFaq, setOpenFaq] = useState(0);
  const formRef = useRef(null);

  const today = todayStr();

  const set = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const handleInput = (e) => set(e.target.name, e.target.value);

  // Service card e click korle service select hoye form e niye jabe
  const pickService = (id) => {
    set("service", id);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Please enter your name";
    if (!/^[+\d][\d\s-]{6,}$/.test(form.phone.trim())) er.phone = "Enter a valid phone number";
    if (!form.city.trim()) er.city = "Enter city or hospital";
    if (!form.arrival) er.arrival = "Pick a date";
    return er;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;

    setStatus("sending");
    /* EKHANE tomar backend / API call boshao. Ekhon shudhu demo. Jemon:
       await fetch("/api/patient-support", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(form) }); */
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
  };

  const reset = () => {
    setForm(initial);
    setErrors({});
    setStatus("idle");
  };

  const err = (name) => errors[name] && <span className="ps-error">{errors[name]}</span>;

  return (
    <main className="ps-page">
      {/* ================= HERO ================= */}
      <section className="ps-hero">
        <div className="ps-blob ps-blob--one" aria-hidden="true" />
        <div className="ps-blob ps-blob--two" aria-hidden="true" />

        <div className="ps-container ps-hero-grid">
          <div className="ps-hero-text">
            <span className="ps-badge ps-in" style={{ "--d": "0s" }}>Patient Support</span>
            <h1 className="ps-hero-title ps-in" style={{ "--d": "0.1s" }}>
              Care and guidance <em>every step of the way</em>
            </h1>
            <p className="ps-hero-desc ps-in" style={{ "--d": "0.2s" }}>
              Treatment in a new country can feel overwhelming. Our team stays by your side with language help,
              hospital coordination, and friendly support for you and your family.
            </p>

            <ul className="ps-points ps-in" style={{ "--d": "0.3s" }}>
              {heroPoints.map((p) => (
                <li key={p}>
                  <span className="ps-tick"><Icon name="check" size={13} /></span>
                  {p}
                </li>
              ))}
            </ul>

            <div className="ps-hero-actions ps-in" style={{ "--d": "0.4s" }}>
              <a href="#ps-request" className="ps-btn">
                Request Support <ArrowIcon />
              </a>
              <Link to="/contact" className="ps-btn ps-btn--ghost">
                Talk to Us
              </Link>
            </div>
          </div>

          <div className="ps-hero-media ps-in" style={{ "--d": "0.25s" }}>
            <Pic src={patient} alt="Caring support for patients" className="ps-hero-pic" />
            <div className="ps-float">
              <span className="ps-float-icon"><Icon name="heart" size={22} /></span>
              <div>
                <strong>You are not alone</strong>
                <small>We are with you</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="ps-section">
        <div className="ps-container">
          <Reveal className="ps-head">
            <span className="ps-label">Our Support</span>
            <h2 className="ps-title">Help for every part of your treatment</h2>
            <p className="ps-sub">Tap a service to start your request. We will build a plan around your needs.</p>
          </Reveal>

          <div className="ps-services">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={(i % 4) * 0.08} className="ps-service-wrap">
                <article className="ps-service">
                  <span className="ps-service-icon"><Icon name={s.icon} /></span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <ul>
                    {s.features.map((f) => (
                      <li key={f}>
                        <span className="ps-tick ps-tick--sm"><Icon name="check" size={10} /></span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button type="button" className="ps-service-btn" onClick={() => pickService(s.id)}>
                    Request this support <ArrowIcon />
                  </button>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="ps-section ps-section--soft">
        <div className="ps-container">
          <Reveal className="ps-head">
            <span className="ps-label">Why Choose Us</span>
            <h2 className="ps-title">Support you can rely on</h2>
          </Reveal>

          <div className="ps-features">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.1} className="ps-feature">
                <span className="ps-feature-icon"><Icon name={f.icon} /></span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= REQUEST FORM ================= */}
      <section className="ps-section" id="ps-request">
        <div className="ps-container ps-request" ref={formRef}>
          <Reveal direction="left" className="ps-request-info">
            <span className="ps-label">Request Support</span>
            <h2 className="ps-title">Tell us how we can help you</h2>
            <p>Share a few details and our team will contact you with a clear support plan.</p>

            <ol className="ps-steps">
              {steps.map((s, i) => (
                <li key={s.title}>
                  <span className="ps-step-no">{i + 1}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal direction="right" className="ps-form-card">
            {status === "success" ? (
              <div className="ps-success" role="status">
                <span className="ps-success-icon"><Icon name="check" size={34} /></span>
                <h3>Request received!</h3>
                <p>
                  Thank you, {form.name.split(" ")[0] || "dear guest"}. Our team will contact you soon to
                  plan your support.
                </p>
                <button type="button" className="ps-btn" onClick={reset}>New request</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 className="ps-form-title">Patient support request</h3>

                <div className="ps-row">
                  <div className={`ps-field ${errors.name ? "has-error" : ""}`}>
                    <label htmlFor="ps-name">Full Name *</label>
                    <input id="ps-name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleInput} />
                    {err("name")}
                  </div>
                  <div className={`ps-field ${errors.phone ? "has-error" : ""}`}>
                    <label htmlFor="ps-phone">Phone *</label>
                    <input id="ps-phone" name="phone" type="tel" placeholder="+880 1XXX-XXXXXX" value={form.phone} onChange={handleInput} />
                    {err("phone")}
                  </div>
                </div>

                <div className="ps-row">
                  <div className={`ps-field ${errors.city ? "has-error" : ""}`}>
                    <label htmlFor="ps-city">City or Hospital *</label>
                    <input id="ps-city" name="city" list="ps-cities" placeholder="e.g. Chennai" value={form.city} onChange={handleInput} />
                    {err("city")}
                  </div>
                  <div className="ps-field">
                    <label htmlFor="ps-service">Support Needed</label>
                    <select id="ps-service" name="service" value={form.service} onChange={handleInput}>
                      <option value="">Full support, suggest for me</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <datalist id="ps-cities">
                  {cities.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>

                <div className="ps-row">
                  <div className={`ps-field ${errors.arrival ? "has-error" : ""}`}>
                    <label htmlFor="ps-arrival">Arrival Date *</label>
                    <input id="ps-arrival" name="arrival" type="date" min={today} value={form.arrival} onChange={handleInput} />
                    {err("arrival")}
                  </div>
                  <div className="ps-field">
                    <label htmlFor="ps-people">Travelers</label>
                    <select id="ps-people" name="people" value={form.people} onChange={handleInput}>
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? "person" : "people"}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="ps-field">
                  <label htmlFor="ps-notes">Treatment or special needs (optional)</label>
                  <textarea
                    id="ps-notes"
                    name="notes"
                    rows="3"
                    placeholder="e.g. heart surgery, wheelchair help, Bangla interpreter"
                    value={form.notes}
                    onChange={handleInput}
                  />
                </div>

                <button type="submit" className="ps-btn ps-btn--block" disabled={status === "sending"}>
                  {status === "sending" ? (
                    <>
                      <span className="ps-spinner" aria-hidden="true" /> Sending...
                    </>
                  ) : (
                    <>
                      Get Support Plan <ArrowIcon />
                    </>
                  )}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="ps-section ps-section--soft">
        <div className="ps-container ps-container--narrow">
          <Reveal className="ps-head">
            <span className="ps-label">FAQ</span>
            <h2 className="ps-title">Common questions</h2>
          </Reveal>

          <div className="ps-faq">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={f.q} delay={i * 0.06} className={`ps-faq-item ${open ? "is-open" : ""}`}>
                  <h3>
                    <button
                      type="button"
                      className="ps-faq-q"
                      aria-expanded={open}
                      aria-controls={`ps-faq-a-${i}`}
                      onClick={() => setOpenFaq(open ? null : i)}
                    >
                      <span>{f.q}</span>
                      <span className="ps-chevron"><ChevronIcon /></span>
                    </button>
                  </h3>
                  <div className="ps-faq-a" id={`ps-faq-a-${i}`} role="region">
                    <div className="ps-faq-inner">
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
      <section className="ps-cta-wrap">
        <div className="ps-container">
          <Reveal className="ps-cta">
            <div>
              <h2>Need someone to guide you during treatment?</h2>
              <p>Let us handle the details, so you and your family can focus on getting better.</p>
            </div>
            <div className="ps-cta-actions">
              <Link to="/contact" className="ps-btn ps-btn--white">
                Contact Us <ArrowIcon />
              </Link>
              <Link to="/services/accommodation" className="ps-btn ps-btn--outline-white">
                Accommodation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default PatientSupport;