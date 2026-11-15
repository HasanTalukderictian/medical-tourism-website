import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/AirAmbulance.css";

import Air from "../Image/Medicalvisa/Air.jpeg";

/* ---------------------------- DATA ---------------------------- */
// Shob text SAMPLE. Tomar asol service onujayi edit koro
const HOTLINE = "+880 1XXX-XXXXXX"; // <-- tomar emergency number dao
const HOTLINE_LINK = "tel:+8801XXXXXXXXX";

const heroPoints = ["Available 24 hours, 7 days a week", "Doctor and nurse on every flight", "Hospital-to-hospital transfer"];

const services = [
  {
    id: "International Air Ambulance",
    icon: "plane",
    title: "International Transfer",
    text: "A fully equipped aircraft takes you from your home country to the hospital abroad.",
    features: ["Bangladesh to India, Thailand & more", "ICU-level equipment", "Immigration help included"],
  },
  {
    id: "Domestic Air Ambulance",
    icon: "pin",
    title: "Domestic Transfer",
    text: "Fast transfer between cities inside the country, such as from a district hospital to Dhaka.",
    features: ["City-to-city flights", "Ambulance at both ends", "Quick arrangement"],
  },
  {
    id: "Commercial Stretcher",
    icon: "bed",
    title: "Stretcher on Airline",
    text: "A lower-cost option for stable patients, using a stretcher on a scheduled commercial flight.",
    features: ["For stable patients", "Medical escort", "More affordable"],
  },
  {
    id: "Medical Escort",
    icon: "pulse",
    title: "Medical Escort",
    text: "A doctor or nurse travels with the patient on a regular flight to give care on the way.",
    features: ["Doctor or nurse", "Oxygen & medicines", "Door-to-door help"],
  },
];

const features = [
  { icon: "clock", title: "Fast Response", text: "We start arranging your flight as soon as you contact us, day or night." },
  { icon: "pulse", title: "Trained Medical Crew", text: "Experienced doctors and nurses look after the patient throughout the flight." },
  { icon: "plane", title: "Fully Equipped Aircraft", text: "Ventilator, monitors, oxygen, and emergency medicines on board." },
  { icon: "doc", title: "Paperwork Handled", text: "We help with permits, medical reports, and hospital acceptance letters." },
  { icon: "wallet", title: "Clear Pricing", text: "You get a full quote before you confirm. No hidden charges." },
  { icon: "users", title: "Family Can Travel", text: "Where space allows, a family member can fly with the patient." },
];

const steps = [
  { title: "Contact Us", text: "Share the patient's condition, location, and destination hospital." },
  { title: "Get a Plan & Quote", text: "Our medical team reviews the case and sends a flight plan with the cost." },
  { title: "Fly Safely", text: "We pick up the patient, fly, and hand over to the hospital team." },
];

const faqs = [
  {
    q: "How fast can you arrange an air ambulance?",
    a: "In an emergency we start immediately. Timing depends on aircraft availability, permits, and the route, and our team will give you a clear estimate as soon as we review the case.",
  },
  {
    q: "Can a family member travel with the patient?",
    a: "In most cases, yes. One or two companions can usually fly with the patient, depending on the aircraft and the patient's medical needs. Tell us in your request.",
  },
  {
    q: "How much does it cost?",
    a: "The cost depends on distance, aircraft type, and medical equipment needed. Send us your request and we will give you a clear quote before you confirm anything.",
  },
  {
    q: "Which patients can use a commercial flight instead?",
    a: "Stable patients may be able to fly on a scheduled flight with a medical escort or stretcher. Our doctors will review the reports and advise the safest option.",
  },
];

const cities = ["Dhaka", "Chittagong", "Sylhet", "Delhi", "Chennai", "Kolkata", "Mumbai", "Bangkok", "Kuala Lumpur", "Singapore"];

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
    case "plane":
      return (
        <svg {...p}>
          <path d="M10.5 13.5L3 11l1.5-1.5 8 .5 4-4.5a2 2 0 0 1 3 3L15.5 13l.5 8L14.5 22.5 12 15" />
        </svg>
      );
    case "pin":
      return (
        <svg {...p}>
          <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "bed":
      return (
        <svg {...p}>
          <path d="M3 18V6M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" />
          <circle cx="7" cy="11" r="1.8" />
        </svg>
      );
    case "pulse":
      return (
        <svg {...p}>
          <path d="M3 12h4l2.5-6 4 12 2.5-6H21" />
        </svg>
      );
    case "clock":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 2" />
        </svg>
      );
    case "doc":
      return (
        <svg {...p}>
          <path d="M6 3h8l4 4v14H6z" />
          <path d="M14 3v4h4M9 12h6M9 16h6" />
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
    case "users":
      return (
        <svg {...p}>
          <circle cx="9" cy="8" r="3.2" />
          <path d="M3 20c.6-3.4 3-5 6-5s5.4 1.6 6 5" />
          <circle cx="17" cy="9" r="2.4" />
          <path d="M16.5 14.2c2.4.2 4 1.7 4.5 4.3" />
        </svg>
      );
    case "phone":
      return (
        <svg {...p}>
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
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
      className={`aa-reveal aa-reveal--${direction} ${shown ? "is-shown" : ""} ${className}`}
      style={{ "--d": `${delay}s` }}
    >
      {children}
    </div>
  );
};

const Pic = ({ src, alt, className = "" }) => {
  const [failed, setFailed] = useState(!src);
  return (
    <div className={`aa-pic ${failed ? "aa-pic--empty" : ""} ${className}`}>
      {failed ? <ImageIcon /> : <img src={src} alt={alt} onError={() => setFailed(true)} />}
    </div>
  );
};

/* ---------------------------- PAGE ---------------------------- */
const initial = {
  name: "",
  phone: "",
  from: "",
  to: "",
  service: "",
  urgency: "emergency",
  notes: "",
};

const AirAmbulance = () => {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success
  const [openFaq, setOpenFaq] = useState(0);
  const formRef = useRef(null);

  const set = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const handleInput = (e) => set(e.target.name, e.target.value);

  // Service card e click korle type select hoye form e niye jabe
  const pickService = (id) => {
    set("service", id);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Please enter the patient's name";
    if (!/^[+\d][\d\s-]{6,}$/.test(form.phone.trim())) er.phone = "Enter a valid phone number";
    if (!form.from.trim()) er.from = "Enter pick-up city or hospital";
    if (!form.to.trim()) er.to = "Enter destination city or hospital";
    return er;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;

    setStatus("sending");
    /* EKHANE tomar backend / API call boshao. Ekhon shudhu demo. Jemon:
       await fetch("/api/air-ambulance", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(form) }); */
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
  };

  const reset = () => {
    setForm(initial);
    setErrors({});
    setStatus("idle");
  };

  const err = (name) => errors[name] && <span className="aa-error">{errors[name]}</span>;

  return (
    <main className="aa-page">
      {/* ================= HERO ================= */}
      <section className="aa-hero">
        <div className="aa-blob aa-blob--one" aria-hidden="true" />
        <div className="aa-blob aa-blob--two" aria-hidden="true" />

        <div className="aa-container aa-hero-grid">
          <div className="aa-hero-text">
            <span className="aa-badge aa-in" style={{ "--d": "0s" }}>Air Ambulance</span>
            <h1 className="aa-hero-title aa-in" style={{ "--d": "0.1s" }}>
              Safe medical flights, <em>when every minute counts</em>
            </h1>
            <p className="aa-hero-desc aa-in" style={{ "--d": "0.2s" }}>
              We arrange fast, fully equipped air transfers with a trained medical team, so patients can reach
              the right hospital safely and quickly.
            </p>

            <ul className="aa-points aa-in" style={{ "--d": "0.3s" }}>
              {heroPoints.map((p) => (
                <li key={p}>
                  <span className="aa-tick"><Icon name="check" size={13} /></span>
                  {p}
                </li>
              ))}
            </ul>

            <div className="aa-hero-actions aa-in" style={{ "--d": "0.4s" }}>
              <a href="#aa-request" className="aa-btn">
                Request Air Ambulance <ArrowIcon />
              </a>
              <a href={HOTLINE_LINK} className="aa-btn aa-btn--ghost">
                <Icon name="phone" size={16} /> Call Now
              </a>
            </div>
          </div>

          <div className="aa-hero-media aa-in" style={{ "--d": "0.25s" }}>
            <Pic src={Air} alt="Air ambulance for medical transfer" className="aa-hero-pic" />
            <div className="aa-float">
              <span className="aa-float-icon"><Icon name="plane" size={22} /></span>
              <div>
                <strong>24/7 Emergency</strong>
                <small>Always ready to fly</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= EMERGENCY STRIP ================= */}
      <div className="aa-container">
        <Reveal className="aa-alert">
          <span className="aa-alert-icon"><Icon name="phone" size={22} /></span>
          <div className="aa-alert-text">
            <strong>In an emergency, call us first</strong>
            <span>Our team answers around the clock and will start your plan right away.</span>
          </div>
          <a href={HOTLINE_LINK} className="aa-alert-call">{HOTLINE}</a>
        </Reveal>
      </div>

      {/* ================= SERVICES ================= */}
      <section className="aa-section">
        <div className="aa-container">
          <Reveal className="aa-head">
            <span className="aa-label">Our Services</span>
            <h2 className="aa-title">Choose the right way to travel</h2>
            <p className="aa-sub">Tap an option to start your request. Our doctors will advise the safest choice for the patient.</p>
          </Reveal>

          <div className="aa-services">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={(i % 4) * 0.08} className="aa-service-wrap">
                <article className="aa-service">
                  <span className="aa-service-icon"><Icon name={s.icon} /></span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <ul>
                    {s.features.map((f) => (
                      <li key={f}>
                        <span className="aa-tick aa-tick--sm"><Icon name="check" size={10} /></span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button type="button" className="aa-service-btn" onClick={() => pickService(s.id)}>
                    Request this service <ArrowIcon />
                  </button>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="aa-section aa-section--soft">
        <div className="aa-container">
          <Reveal className="aa-head">
            <span className="aa-label">Why Choose Us</span>
            <h2 className="aa-title">Care in the air, from start to finish</h2>
          </Reveal>

          <div className="aa-features">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.1} className="aa-feature">
                <span className="aa-feature-icon"><Icon name={f.icon} /></span>
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
      <section className="aa-section" id="aa-request">
        <div className="aa-container aa-request" ref={formRef}>
          <Reveal direction="left" className="aa-request-info">
            <span className="aa-label">Request a Flight</span>
            <h2 className="aa-title">Tell us about the patient</h2>
            <p>Share a few details and our medical team will call you with a flight plan and a clear quote.</p>

            <ol className="aa-steps">
              {steps.map((s, i) => (
                <li key={s.title}>
                  <span className="aa-step-no">{i + 1}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal direction="right" className="aa-form-card">
            {status === "success" ? (
              <div className="aa-success" role="status">
                <span className="aa-success-icon"><Icon name="check" size={34} /></span>
                <h3>Request received!</h3>
                <p>
                  Thank you, {form.name.split(" ")[0] || "dear guest"}. Our team will call you very soon. For
                  an emergency, please also call {HOTLINE}.
                </p>
                <button type="button" className="aa-btn" onClick={reset}>New request</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 className="aa-form-title">Air ambulance request</h3>

                <div className="aa-row">
                  <div className={`aa-field ${errors.name ? "has-error" : ""}`}>
                    <label htmlFor="aa-name">Patient Name *</label>
                    <input id="aa-name" name="name" type="text" placeholder="Patient's name" value={form.name} onChange={handleInput} />
                    {err("name")}
                  </div>
                  <div className={`aa-field ${errors.phone ? "has-error" : ""}`}>
                    <label htmlFor="aa-phone">Contact Phone *</label>
                    <input id="aa-phone" name="phone" type="tel" placeholder="+880 1XXX-XXXXXX" value={form.phone} onChange={handleInput} />
                    {err("phone")}
                  </div>
                </div>

                <div className="aa-row">
                  <div className={`aa-field ${errors.from ? "has-error" : ""}`}>
                    <label htmlFor="aa-from">Pick-up City / Hospital *</label>
                    <input id="aa-from" name="from" list="aa-cities" placeholder="e.g. Dhaka" value={form.from} onChange={handleInput} />
                    {err("from")}
                  </div>
                  <div className={`aa-field ${errors.to ? "has-error" : ""}`}>
                    <label htmlFor="aa-to">Destination *</label>
                    <input id="aa-to" name="to" list="aa-cities" placeholder="e.g. Chennai" value={form.to} onChange={handleInput} />
                    {err("to")}
                  </div>
                </div>

                <datalist id="aa-cities">
                  {cities.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>

                <div className="aa-row">
                  <div className="aa-field">
                    <label htmlFor="aa-service">Service Type</label>
                    <select id="aa-service" name="service" value={form.service} onChange={handleInput}>
                      <option value="">Not sure, advise me</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="aa-field">
                    <label htmlFor="aa-urgency">How urgent?</label>
                    <select id="aa-urgency" name="urgency" value={form.urgency} onChange={handleInput}>
                      <option value="emergency">Emergency, right now</option>
                      <option value="48h">Within 48 hours</option>
                      <option value="planned">Planned, a few days later</option>
                    </select>
                  </div>
                </div>

                <div className="aa-field">
                  <label htmlFor="aa-notes">Patient condition (optional)</label>
                  <textarea
                    id="aa-notes"
                    name="notes"
                    rows="3"
                    placeholder="e.g. diagnosis, oxygen needed, can sit or must lie down, number of companions"
                    value={form.notes}
                    onChange={handleInput}
                  />
                </div>

                <button type="submit" className="aa-btn aa-btn--block" disabled={status === "sending"}>
                  {status === "sending" ? (
                    <>
                      <span className="aa-spinner" aria-hidden="true" /> Sending...
                    </>
                  ) : (
                    <>
                      Get Flight Plan <ArrowIcon />
                    </>
                  )}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="aa-section aa-section--soft">
        <div className="aa-container aa-container--narrow">
          <Reveal className="aa-head">
            <span className="aa-label">FAQ</span>
            <h2 className="aa-title">Common questions</h2>
          </Reveal>

          <div className="aa-faq">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={f.q} delay={i * 0.06} className={`aa-faq-item ${open ? "is-open" : ""}`}>
                  <h3>
                    <button
                      type="button"
                      className="aa-faq-q"
                      aria-expanded={open}
                      aria-controls={`aa-faq-a-${i}`}
                      onClick={() => setOpenFaq(open ? null : i)}
                    >
                      <span>{f.q}</span>
                      <span className="aa-chevron"><ChevronIcon /></span>
                    </button>
                  </h3>
                  <div className="aa-faq-a" id={`aa-faq-a-${i}`} role="region">
                    <div className="aa-faq-inner">
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
      <section className="aa-cta-wrap">
        <div className="aa-container">
          <Reveal className="aa-cta">
            <div>
              <h2>Need a medical flight right now?</h2>
              <p>Call us any time. We will take care of the flight so you can focus on the patient.</p>
            </div>
            <div className="aa-cta-actions">
              <a href={HOTLINE_LINK} className="aa-btn aa-btn--white">
                Call Now <ArrowIcon />
              </a>
              <Link to="/contact" className="aa-btn aa-btn--outline-white">
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default AirAmbulance;