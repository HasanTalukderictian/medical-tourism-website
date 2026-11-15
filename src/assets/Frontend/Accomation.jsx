import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/Accomation.css";

import bed from "../Image/Medicalvisa/better.jpg";

/* ---------------------------- DATA ---------------------------- */
// Shob likha SAMPLE. Tomar asol service onujayi edit koro
const heroPoints = ["Stays close to partner hospitals", "Comfortable for patients & families", "Options for every budget"];

const stays = [
  {
    id: "Hospital Guest House",
    icon: "bed",
    title: "Hospital Guest House",
    text: "Simple, affordable rooms very close to the hospital, ideal for short or long treatment stays.",
    features: ["Very close to hospital", "Budget friendly", "Basic meals nearby"],
  },
  {
    id: "Serviced Apartment",
    icon: "home",
    title: "Serviced Apartment",
    text: "A home-like space with a kitchen and extra room, great for longer treatment and recovery.",
    features: ["Kitchen facilities", "More space & privacy", "Good for long stays"],
  },
  {
    id: "Hotel Room",
    icon: "hotel",
    title: "Hotel Room",
    text: "Comfortable hotel stays with daily housekeeping and easy access to transport.",
    features: ["Daily housekeeping", "Easy transport", "Flexible duration"],
  },
  {
    id: "Family Suite",
    icon: "users",
    title: "Family Suite",
    text: "A larger room or suite so the patient and family members can stay together comfortably.",
    features: ["Space for companions", "Comfortable seating", "Peaceful setting"],
  },
];

const features = [
  { icon: "pin", title: "Near the Hospital", text: "We choose stays close to your hospital to save travel time and effort." },
  { icon: "shield", title: "Clean & Safe", text: "Hygienic, safe places that suit patients who are recovering." },
  { icon: "wheelchair", title: "Accessible Options", text: "Ground-floor rooms and lift access where available for easy movement." },
  { icon: "car", title: "Easy Transport", text: "Pair your stay with airport pick-up and hospital transfers." },
  { icon: "wallet", title: "Clear Pricing", text: "You know the cost per night before you confirm. No hidden charges." },
  { icon: "support", title: "Local Support", text: "Our team helps you check in and is available if you need anything." },
];

const steps = [
  { title: "Tell Us Your Needs", text: "Share your dates, hospital, and who is traveling." },
  { title: "Get Stay Options", text: "We send suitable places with clear pricing." },
  { title: "Confirm Your Booking", text: "Choose one and we confirm it for you." },
];

const faqs = [
  {
    q: "Can my family stay with the patient?",
    a: "Yes. We can arrange rooms, suites, or apartments that comfortably fit the patient and family members or attendants.",
  },
  {
    q: "How far will the stay be from the hospital?",
    a: "We aim to arrange places close to your hospital. The exact distance depends on the city and the options available, and we will tell you before you confirm.",
  },
  {
    q: "Can I stay for a long time at a lower cost?",
    a: "Longer stays often have better rates, especially in serviced apartments. Tell us how long you plan to stay and we will suggest suitable options.",
  },
  {
    q: "What if my treatment takes longer than planned?",
    a: "Let us know as early as possible. We will help you extend your stay or move to a more suitable option.",
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
    case "bed":
      return (
        <svg {...p}>
          <path d="M3 18V6M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" />
          <circle cx="7" cy="11" r="1.8" />
        </svg>
      );
    case "home":
      return (
        <svg {...p}>
          <path d="M4 11l8-7 8 7v9H4z" />
          <path d="M10 20v-5h4v5" />
        </svg>
      );
    case "hotel":
      return (
        <svg {...p}>
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M9 7h2M13 7h2M9 11h2M13 11h2M10 21v-4h4v4" />
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
    case "pin":
      return (
        <svg {...p}>
          <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "shield":
      return (
        <svg {...p}>
          <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
          <path d="M9 12l2 2 4-4" />
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
    case "car":
      return (
        <svg {...p}>
          <path d="M5 16V11l2-5h10l2 5v5" />
          <path d="M3 16h18v3H3zM7 11h10" />
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
      className={`ac-reveal ac-reveal--${direction} ${shown ? "is-shown" : ""} ${className}`}
      style={{ "--d": `${delay}s` }}
    >
      {children}
    </div>
  );
};

const Pic = ({ src, alt, className = "" }) => {
  const [failed, setFailed] = useState(!src);
  return (
    <div className={`ac-pic ${failed ? "ac-pic--empty" : ""} ${className}`}>
      {failed ? <ImageIcon /> : <img src={src} alt={alt} onError={() => setFailed(true)} />}
    </div>
  );
};

/* ---------------------------- PAGE ---------------------------- */
const initial = {
  name: "",
  phone: "",
  city: "",
  stayType: "",
  checkIn: "",
  checkOut: "",
  guests: "2",
  notes: "",
};

const todayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const Accomation = () => {
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

  // Stay card e click korle type select hoye form e niye jabe
  const pickStay = (id) => {
    set("stayType", id);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Please enter your name";
    if (!/^[+\d][\d\s-]{6,}$/.test(form.phone.trim())) er.phone = "Enter a valid phone number";
    if (!form.city.trim()) er.city = "Enter city or hospital";
    if (!form.checkIn) er.checkIn = "Pick a date";
    if (!form.checkOut) er.checkOut = "Pick a date";
    else if (form.checkIn && form.checkOut <= form.checkIn) er.checkOut = "Must be after check-in";
    return er;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;

    setStatus("sending");
    /* EKHANE tomar backend / API call boshao. Ekhon shudhu demo. Jemon:
       await fetch("/api/accommodation", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(form) }); */
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
  };

  const reset = () => {
    setForm(initial);
    setErrors({});
    setStatus("idle");
  };

  const err = (name) => errors[name] && <span className="ac-error">{errors[name]}</span>;

  return (
    <main className="ac-page">
      {/* ================= HERO ================= */}
      <section className="ac-hero">
        <div className="ac-blob ac-blob--one" aria-hidden="true" />
        <div className="ac-blob ac-blob--two" aria-hidden="true" />

        <div className="ac-container ac-hero-grid">
          <div className="ac-hero-text">
            <span className="ac-badge ac-in" style={{ "--d": "0s" }}>Medical Accommodation</span>
            <h1 className="ac-hero-title ac-in" style={{ "--d": "0.1s" }}>
              A comfortable stay <em>near your hospital</em>
            </h1>
            <p className="ac-hero-desc ac-in" style={{ "--d": "0.2s" }}>
              Recovering far from home should feel safe and easy. We arrange clean, comfortable, and affordable
              places to stay for patients and their families during treatment.
            </p>

            <ul className="ac-points ac-in" style={{ "--d": "0.3s" }}>
              {heroPoints.map((p) => (
                <li key={p}>
                  <span className="ac-tick"><Icon name="check" size={13} /></span>
                  {p}
                </li>
              ))}
            </ul>

            <div className="ac-hero-actions ac-in" style={{ "--d": "0.4s" }}>
              <a href="#ac-request" className="ac-btn">
                Request a Stay <ArrowIcon />
              </a>
              <Link to="/contact" className="ac-btn ac-btn--ghost">
                Talk to Us
              </Link>
            </div>
          </div>

          <div className="ac-hero-media ac-in" style={{ "--d": "0.25s" }}>
            <Pic src={bed} alt="Comfortable accommodation for patients" className="ac-hero-pic" />
            <div className="ac-float">
              <span className="ac-float-icon"><Icon name="bed" size={22} /></span>
              <div>
                <strong>Rest & Recover</strong>
                <small>Close to your hospital</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STAY OPTIONS ================= */}
      <section className="ac-section">
        <div className="ac-container">
          <Reveal className="ac-head">
            <span className="ac-label">Stay Options</span>
            <h2 className="ac-title">Choose a stay that fits your needs</h2>
            <p className="ac-sub">Tap an option to start your request. We will send you the best places available.</p>
          </Reveal>

          <div className="ac-stays">
            {stays.map((s, i) => (
              <Reveal key={s.id} delay={(i % 4) * 0.08} className="ac-stay-wrap">
                <article className="ac-stay">
                  <span className="ac-stay-icon"><Icon name={s.icon} /></span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <ul>
                    {s.features.map((f) => (
                      <li key={f}>
                        <span className="ac-tick ac-tick--sm"><Icon name="check" size={10} /></span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button type="button" className="ac-stay-btn" onClick={() => pickStay(s.id)}>
                    Request this stay <ArrowIcon />
                  </button>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="ac-section ac-section--soft">
        <div className="ac-container">
          <Reveal className="ac-head">
            <span className="ac-label">Why Stay With Us</span>
            <h2 className="ac-title">Designed for patients and families</h2>
          </Reveal>

          <div className="ac-features">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.1} className="ac-feature">
                <span className="ac-feature-icon"><Icon name={f.icon} /></span>
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
      <section className="ac-section" id="ac-request">
        <div className="ac-container ac-request" ref={formRef}>
          <Reveal direction="left" className="ac-request-info">
            <span className="ac-label">Request Accommodation</span>
            <h2 className="ac-title">Tell us when and where you need a stay</h2>
            <p>Share a few details and our team will send you suitable options with clear pricing.</p>

            <ol className="ac-steps">
              {steps.map((s, i) => (
                <li key={s.title}>
                  <span className="ac-step-no">{i + 1}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal direction="right" className="ac-form-card">
            {status === "success" ? (
              <div className="ac-success" role="status">
                <span className="ac-success-icon"><Icon name="check" size={34} /></span>
                <h3>Request received!</h3>
                <p>
                  Thank you, {form.name.split(" ")[0] || "dear guest"}. Our team will contact you soon with
                  suitable stay options.
                </p>
                <button type="button" className="ac-btn" onClick={reset}>New request</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 className="ac-form-title">Accommodation request</h3>

                <div className="ac-row">
                  <div className={`ac-field ${errors.name ? "has-error" : ""}`}>
                    <label htmlFor="ac-name">Full Name *</label>
                    <input id="ac-name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleInput} />
                    {err("name")}
                  </div>
                  <div className={`ac-field ${errors.phone ? "has-error" : ""}`}>
                    <label htmlFor="ac-phone">Phone *</label>
                    <input id="ac-phone" name="phone" type="tel" placeholder="+880 1XXX-XXXXXX" value={form.phone} onChange={handleInput} />
                    {err("phone")}
                  </div>
                </div>

                <div className="ac-row">
                  <div className={`ac-field ${errors.city ? "has-error" : ""}`}>
                    <label htmlFor="ac-city">City or Hospital *</label>
                    <input id="ac-city" name="city" list="ac-cities" placeholder="e.g. Chennai" value={form.city} onChange={handleInput} />
                    {err("city")}
                  </div>
                  <div className="ac-field">
                    <label htmlFor="ac-type">Stay Type</label>
                    <select id="ac-type" name="stayType" value={form.stayType} onChange={handleInput}>
                      <option value="">Any, suggest for me</option>
                      {stays.map((s) => (
                        <option key={s.id} value={s.id}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <datalist id="ac-cities">
                  {cities.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>

                <div className="ac-row ac-row--3">
                  <div className={`ac-field ${errors.checkIn ? "has-error" : ""}`}>
                    <label htmlFor="ac-in">Check-in *</label>
                    <input id="ac-in" name="checkIn" type="date" min={today} value={form.checkIn} onChange={handleInput} />
                    {err("checkIn")}
                  </div>
                  <div className={`ac-field ${errors.checkOut ? "has-error" : ""}`}>
                    <label htmlFor="ac-out">Check-out *</label>
                    <input id="ac-out" name="checkOut" type="date" min={form.checkIn || today} value={form.checkOut} onChange={handleInput} />
                    {err("checkOut")}
                  </div>
                  <div className="ac-field">
                    <label htmlFor="ac-guests">Guests</label>
                    <select id="ac-guests" name="guests" value={form.guests} onChange={handleInput}>
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? "person" : "people"}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="ac-field">
                  <label htmlFor="ac-notes">Special needs (optional)</label>
                  <textarea
                    id="ac-notes"
                    name="notes"
                    rows="3"
                    placeholder="e.g. wheelchair access, ground floor, kitchen, budget"
                    value={form.notes}
                    onChange={handleInput}
                  />
                </div>

                <button type="submit" className="ac-btn ac-btn--block" disabled={status === "sending"}>
                  {status === "sending" ? (
                    <>
                      <span className="ac-spinner" aria-hidden="true" /> Sending...
                    </>
                  ) : (
                    <>
                      Get Stay Options <ArrowIcon />
                    </>
                  )}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="ac-section ac-section--soft">
        <div className="ac-container ac-container--narrow">
          <Reveal className="ac-head">
            <span className="ac-label">FAQ</span>
            <h2 className="ac-title">Common questions</h2>
          </Reveal>

          <div className="ac-faq">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={f.q} delay={i * 0.06} className={`ac-faq-item ${open ? "is-open" : ""}`}>
                  <h3>
                    <button
                      type="button"
                      className="ac-faq-q"
                      aria-expanded={open}
                      aria-controls={`ac-faq-a-${i}`}
                      onClick={() => setOpenFaq(open ? null : i)}
                    >
                      <span>{f.q}</span>
                      <span className="ac-chevron"><ChevronIcon /></span>
                    </button>
                  </h3>
                  <div className="ac-faq-a" id={`ac-faq-a-${i}`} role="region">
                    <div className="ac-faq-inner">
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
      <section className="ac-cta-wrap">
        <div className="ac-container">
          <Reveal className="ac-cta">
            <div>
              <h2>Need a place to stay during treatment?</h2>
              <p>Let us handle your stay, so you and your family can focus on recovery.</p>
            </div>
            <div className="ac-cta-actions">
              <Link to="/contact" className="ac-btn ac-btn--white">
                Contact Us <ArrowIcon />
              </Link>
              <Link to="/services/transport" className="ac-btn ac-btn--outline-white">
                Transport Service
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default Accomation;
