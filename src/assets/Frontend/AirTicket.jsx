import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/AirTicket.css";

import airticket from "../Image/Medicalvisa/airticket.jpg";

/* ---------------------------- DATA ---------------------------- */
// Shob likha SAMPLE. Tomar asol service onujayi edit koro
const heroPoints = ["Best available fare options", "Support for patients & companions", "Wheelchair & special assistance"];

const offers = [
  { icon: "tag", title: "Best Fare Options", text: "We compare airlines and routes to find a suitable fare for your travel dates and budget." },
  { icon: "refresh", title: "Flexible Planning", text: "Treatment dates can change. We guide you on flexible and changeable ticket options." },
  { icon: "wheelchair", title: "Special Assistance", text: "Wheelchair, early boarding, and other assistance arranged with the airline when needed." },
  { icon: "users", title: "Companion & Family", text: "Book tickets for the patient and attendants together, seated close to each other." },
  { icon: "car", title: "Airport Pick-up & Drop", text: "Pair your ticket with airport transfer so your arrival is smooth and stress-free." },
  { icon: "support", title: "Dedicated Support", text: "One team to help with changes, delays, and any questions before and during travel." },
];

const routes = [
  { to: "Delhi", country: "India" },
  { to: "Chennai", country: "India" },
  { to: "Kolkata", country: "India" },
  { to: "Bangkok", country: "Thailand" },
  { to: "Kuala Lumpur", country: "Malaysia" },
  { to: "Beijing", country: "China" },
];

const steps = [
  { title: "Send Your Request", text: "Share your route, dates, and number of travelers." },
  { title: "Receive Options", text: "We send suitable flight options and clear pricing." },
  { title: "Confirm & Pay", text: "Choose your flight and complete the payment." },
  { title: "Get Your Ticket", text: "Receive your e-ticket and travel guidance." },
];

const faqs = [
  {
    q: "Can I change my ticket if my treatment date changes?",
    a: "It depends on the airline and the fare type. We guide you towards flexible fare options when your dates may change, and we help you with the change process.",
  },
  {
    q: "Can you arrange a wheelchair or special assistance?",
    a: "Yes. Please tell us your needs when you request a ticket, and we will arrange assistance with the airline. For patients who cannot travel on a normal flight, we also offer an air ambulance service.",
  },
  {
    q: "Can my family member travel with me?",
    a: "Yes. You can book tickets for the patient and companions together, so you can travel and sit together.",
  },
  {
    q: "How soon will I get flight options?",
    a: "Our team responds as soon as possible after your request. For urgent travel, please contact us directly so we can prioritize.",
  },
];

const cities = [
  "Dhaka",
  "Chattogram",
  "Sylhet",
  "Delhi",
  "Mumbai",
  "Chennai",
  "Kolkata",
  "Bangkok",
  "Kuala Lumpur",
  "Singapore",
  "Beijing",
  "Shanghai",
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
    case "tag":
      return (
        <svg {...p}>
          <path d="M3 12V4h8l10 10-8 8L3 12z" />
          <circle cx="8" cy="8" r="1.4" fill="currentColor" />
        </svg>
      );
    case "refresh":
      return (
        <svg {...p}>
          <path d="M20 12a8 8 0 1 1-2.4-5.7" />
          <path d="M20 4v5h-5" />
        </svg>
      );
    case "wheelchair":
      return (
        <svg {...p}>
          <circle cx="10" cy="4.5" r="1.8" />
          <path d="M10 8v6h5l3 5M10 11h5" />
          <path d="M7 12.5A5 5 0 1 0 14 19" />
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
    case "car":
      return (
        <svg {...p}>
          <path d="M5 16V11l2-5h10l2 5v5" />
          <path d="M3 16h18v3H3zM7 11h10" />
          <circle cx="7.5" cy="16" r="0.6" fill="currentColor" />
          <circle cx="16.5" cy="16" r="0.6" fill="currentColor" />
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
    case "plane":
      return (
        <svg {...p}>
          <path d="M21 4L3 11l7 2.5L12.5 21 21 4z" />
          <path d="M10 13.5L21 4" />
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

const SwapIcon = () => (
  <svg {...base} width="18" height="18" strokeWidth="2">
    <path d="M7 4L3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7" />
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
      className={`at-reveal ${shown ? "is-shown" : ""} ${className}`}
      style={{ "--d": `${delay}s` }}
    >
      {children}
    </div>
  );
};

const Pic = ({ src, alt, className = "" }) => {
  const [failed, setFailed] = useState(!src);
  return (
    <div className={`at-pic ${failed ? "at-pic--empty" : ""} ${className}`}>
      {failed ? <ImageIcon /> : <img src={src} alt={alt} onError={() => setFailed(true)} />}
    </div>
  );
};

/* ---------------------------- PAGE ---------------------------- */
const initial = {
  trip: "round",
  from: "Dhaka",
  to: "",
  depart: "",
  ret: "",
  travelers: "1",
  assist: false,
  name: "",
  phone: "",
};

const todayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const AirTicket = () => {
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

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    set(name, type === "checkbox" ? checked : value);
  };

  const swap = () => setForm((f) => ({ ...f, from: f.to, to: f.from }));

  // Route card e click korle "To" boshe jabe ar form e niye jabe
  const pickRoute = (city) => {
    set("to", city);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const validate = () => {
    const er = {};
    if (!form.from.trim()) er.from = "Enter departure city";
    if (!form.to.trim()) er.to = "Enter destination";
    if (form.from.trim() && form.from.trim().toLowerCase() === form.to.trim().toLowerCase()) {
      er.to = "Destination must be different";
    }
    if (!form.depart) er.depart = "Pick a date";
    if (form.trip === "round") {
      if (!form.ret) er.ret = "Pick a date";
      else if (form.depart && form.ret < form.depart) er.ret = "Must be after departure";
    }
    if (!form.name.trim()) er.name = "Enter your name";
    if (!/^[+\d][\d\s-]{6,}$/.test(form.phone.trim())) er.phone = "Enter a valid phone number";
    return er;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;

    setStatus("sending");
    /* EKHANE tomar backend / API call boshao. Ekhon shudhu demo. Jemon:
       await fetch("/api/air-ticket", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(form) }); */
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
  };

  const reset = () => {
    setForm(initial);
    setErrors({});
    setStatus("idle");
  };

  const err = (name) => errors[name] && <span className="at-error">{errors[name]}</span>;

  return (
    <main className="at-page">
      {/* ================= HERO ================= */}
      <section className="at-hero">
        <div className="at-blob at-blob--one" aria-hidden="true" />
        <div className="at-blob at-blob--two" aria-hidden="true" />

        <div className="at-container at-hero-grid">
          <div className="at-hero-text">
            <span className="at-badge at-in" style={{ "--d": "0s" }}>Air Ticket</span>
            <h1 className="at-hero-title at-in" style={{ "--d": "0.1s" }}>
              Travel for treatment, <em>stress-free</em>
            </h1>
            <p className="at-hero-desc at-in" style={{ "--d": "0.2s" }}>
              We book comfortable and suitable flights for patients and their companions, with support for
              special assistance, so you can focus on your health.
            </p>

            <ul className="at-points at-in" style={{ "--d": "0.3s" }}>
              {heroPoints.map((p) => (
                <li key={p}>
                  <span className="at-tick"><Icon name="check" size={13} /></span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="at-hero-media at-in" style={{ "--d": "0.25s" }}>
            <Pic src={airticket} alt="Air ticket booking for medical travel" className="at-hero-pic" />
            <div className="at-float">
              <span className="at-float-icon"><Icon name="plane" size={22} /></span>
              <div>
                <strong>Fly with Support</strong>
                <small>Assistance at every step</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= REQUEST FORM (flight-search style) ================= */}
      <section className="at-search-wrap">
        <div className="at-container">
          <div className="at-search at-in" style={{ "--d": "0.4s" }} ref={formRef}>
            {status === "success" ? (
              <div className="at-success" role="status">
                <span className="at-success-icon"><Icon name="check" size={30} /></span>
                <div>
                  <h2>Request received!</h2>
                  <p>
                    Thank you, {form.name.split(" ")[0] || "dear traveler"}. We will send you flight options for{" "}
                    <strong>{form.from} to {form.to}</strong> very soon.
                  </p>
                </div>
                <button type="button" className="at-btn" onClick={reset}>New request</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="at-search-top">
                  <h2>Request your flight</h2>
                  <div className="at-trip" role="radiogroup" aria-label="Trip type">
                    {[
                      ["round", "Round trip"],
                      ["oneway", "One way"],
                    ].map(([id, label]) => (
                      <button
                        key={id}
                        type="button"
                        role="radio"
                        aria-checked={form.trip === id}
                        className={`at-trip-btn ${form.trip === id ? "is-active" : ""}`}
                        onClick={() => set("trip", id)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Row 1: route + dates + travelers */}
                <div className={`at-grid at-grid--route ${form.trip === "oneway" ? "is-oneway" : ""}`}>
                  <div className={`at-field ${errors.from ? "has-error" : ""}`}>
                    <label htmlFor="at-from">From</label>
                    <input id="at-from" name="from" list="at-cities" placeholder="Departure city" value={form.from} onChange={handleInput} />
                    {err("from")}
                  </div>

                  <button type="button" className="at-swap" onClick={swap} aria-label="Swap cities">
                    <SwapIcon />
                  </button>

                  <div className={`at-field ${errors.to ? "has-error" : ""}`}>
                    <label htmlFor="at-to">To</label>
                    <input id="at-to" name="to" list="at-cities" placeholder="Destination city" value={form.to} onChange={handleInput} />
                    {err("to")}
                  </div>

                  <div className={`at-field ${errors.depart ? "has-error" : ""}`}>
                    <label htmlFor="at-depart">Departure</label>
                    <input id="at-depart" name="depart" type="date" min={today} value={form.depart} onChange={handleInput} />
                    {err("depart")}
                  </div>

                  {form.trip === "round" && (
                    <div className={`at-field ${errors.ret ? "has-error" : ""}`}>
                      <label htmlFor="at-ret">Return</label>
                      <input id="at-ret" name="ret" type="date" min={form.depart || today} value={form.ret} onChange={handleInput} />
                      {err("ret")}
                    </div>
                  )}

                  <div className="at-field">
                    <label htmlFor="at-travelers">Travelers</label>
                    <select id="at-travelers" name="travelers" value={form.travelers} onChange={handleInput}>
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? "person" : "people"}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <datalist id="at-cities">
                  {cities.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>

                {/* Row 2: contact + submit */}
                <div className="at-grid at-grid--contact">
                  <div className={`at-field ${errors.name ? "has-error" : ""}`}>
                    <label htmlFor="at-name">Your Name</label>
                    <input id="at-name" name="name" type="text" placeholder="Full name" value={form.name} onChange={handleInput} />
                    {err("name")}
                  </div>

                  <div className={`at-field ${errors.phone ? "has-error" : ""}`}>
                    <label htmlFor="at-phone">Phone</label>
                    <input id="at-phone" name="phone" type="tel" placeholder="+880 1XXX-XXXXXX" value={form.phone} onChange={handleInput} />
                    {err("phone")}
                  </div>

                  <label className="at-check">
                    <input type="checkbox" name="assist" checked={form.assist} onChange={handleInput} />
                    <span className="at-check-box"><Icon name="check" size={12} /></span>
                    Need wheelchair / special assistance
                  </label>

                  <button type="submit" className="at-btn at-btn--submit" disabled={status === "sending"}>
                    {status === "sending" ? (
                      <>
                        <span className="at-spinner" aria-hidden="true" /> Sending...
                      </>
                    ) : (
                      <>
                        Get Flight Options <ArrowIcon />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ================= OFFERS ================= */}
      <section className="at-section">
        <div className="at-container">
          <Reveal className="at-head">
            <span className="at-label">What We Offer</span>
            <h2 className="at-title">Flights planned around your treatment</h2>
            <p className="at-sub">More than just a ticket. We think about comfort, flexibility, and support.</p>
          </Reveal>

          <div className="at-offers">
            {offers.map((o, i) => (
              <Reveal key={o.title} delay={(i % 3) * 0.1} className="at-offer">
                <span className="at-offer-icon"><Icon name={o.icon} /></span>
                <h3>{o.title}</h3>
                <p>{o.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= POPULAR ROUTES ================= */}
      <section className="at-section at-section--soft">
        <div className="at-container">
          <Reveal className="at-head">
            <span className="at-label">Popular Routes</span>
            <h2 className="at-title">Flights to our partner hospital cities</h2>
            <p className="at-sub">Tap a destination to start your request. We will send you the best options.</p>
          </Reveal>

          <div className="at-routes">
            {routes.map((r, i) => (
              <Reveal key={r.to} delay={(i % 3) * 0.08} className="at-route-wrap">
                <button type="button" className="at-route" onClick={() => pickRoute(r.to)}>
                  <span className="at-route-icon"><Icon name="plane" size={22} /></span>
                  <span className="at-route-text">
                    <small>Dhaka to</small>
                    <strong>{r.to}</strong>
                    <em>{r.country}</em>
                  </span>
                  <span className="at-route-go"><ArrowIcon /></span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="at-section">
        <div className="at-container">
          <Reveal className="at-head">
            <span className="at-label">How It Works</span>
            <h2 className="at-title">Book your flight in 4 steps</h2>
          </Reveal>

          <ol className="at-steps">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1} className="at-step">
                <span className="at-step-no">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= AMBULANCE NOTE ================= */}
      <section className="at-section at-section--tight">
        <div className="at-container">
          <Reveal className="at-ambulance">
            <div>
              <h3>Cannot travel on a regular flight?</h3>
              <p>
                For patients who need medical care during the journey, we also arrange an air ambulance service
                with trained medical support.
              </p>
            </div>
            <Link to="/services/air-ambulance-service" className="at-btn at-btn--white">
              Air Ambulance Service <ArrowIcon />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="at-section at-section--soft">
        <div className="at-container at-container--narrow">
          <Reveal className="at-head">
            <span className="at-label">FAQ</span>
            <h2 className="at-title">Common questions</h2>
          </Reveal>

          <div className="at-faq">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={f.q} delay={i * 0.06} className={`at-faq-item ${open ? "is-open" : ""}`}>
                  <h3>
                    <button
                      type="button"
                      className="at-faq-q"
                      aria-expanded={open}
                      aria-controls={`at-faq-a-${i}`}
                      onClick={() => setOpenFaq(open ? null : i)}
                    >
                      <span>{f.q}</span>
                      <span className="at-chevron"><ChevronIcon /></span>
                    </button>
                  </h3>
                  <div className="at-faq-a" id={`at-faq-a-${i}`} role="region">
                    <div className="at-faq-inner">
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
      <section className="at-cta-wrap">
        <div className="at-container">
          <Reveal className="at-cta">
            <div>
              <h2>Ready to plan your journey?</h2>
              <p>Tell us where and when you want to travel, and we will take care of the rest.</p>
            </div>
            <div className="at-cta-actions">
              <Link to="/contact" className="at-btn at-btn--white">
                Contact Us <ArrowIcon />
              </Link>
              <Link to="/services/medical-visa-assistance" className="at-btn at-btn--outline-white">
                Visa Assistance
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default AirTicket;