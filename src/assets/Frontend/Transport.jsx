import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/Transport.css";

/* ---------------------------- IMAGES ----------------------------
   Ekhon online (Unsplash) image use kora hocche.
   Chaile download kore tomar Image folder e rekhe import koro, jemon:
   import HeroImg from "../Image/Transport/hero.jpg";
   Image load na hole automatically ekta placeholder dekhabe.
------------------------------------------------------------------ */
const IMG = {
  hero: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1600&q=80",
  airport: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1000&q=80",
  hospital: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80",
  wheelchair: "https://images.unsplash.com/photo-1580281657527-47e2d4e3c5a5?auto=format&fit=crop&w=1000&q=80",
  ambulance: "https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1000&q=80",
  city: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
  sedan: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=900&q=80",
  suv: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80",
  van: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=900&q=80",
};

/* ---------------------------- DATA ---------------------------- */
// Shob text SAMPLE. Tomar asol service onujayi edit koro
const HOTLINE = "+880 1XXX-XXXXXX"; // <-- tomar number dao
const HOTLINE_LINK = "tel:+8801XXXXXXXXX";

const stats = [
  { value: "24/7", label: "Pickup support" },
  { value: "15+", label: "Partner cities" },
  { value: "100%", label: "Verified drivers" },
  { value: "0", label: "Hidden charges" },
];

const services = [
  {
    id: "airport",
    icon: "plane",
    tab: "Airport Pickup",
    title: "Airport pickup & drop",
    text: "Our driver waits at arrivals with your name board, helps with luggage, and takes you straight to your hotel or hospital.",
    img: IMG.airport,
    points: ["Flight tracking, no extra wait charge", "Name board at arrival gate", "Help with luggage & SIM card"],
  },
  {
    id: "hospital",
    icon: "hospital",
    tab: "Hospital Shuttle",
    title: "Daily hospital shuttle",
    text: "Regular rides between your hotel and the hospital for check-ups, tests, and treatment sessions. On time, every time.",
    img: IMG.hospital,
    points: ["Fixed daily schedule", "Driver knows hospital entrances", "Waits during short visits"],
  },
  {
    id: "wheelchair",
    icon: "wheelchair",
    tab: "Wheelchair Van",
    title: "Wheelchair-friendly van",
    text: "Vans with a ramp or lift so patients can travel comfortably without leaving their wheelchair.",
    img: IMG.wheelchair,
    points: ["Ramp / lift access", "Secure wheelchair belts", "Trained, patient drivers"],
  },
  {
    id: "ambulance",
    icon: "cross",
    tab: "Ambulance",
    title: "Road ambulance",
    text: "For patients who need to lie down or need medical support on the way, with oxygen and a trained attendant.",
    img: IMG.ambulance,
    points: ["Oxygen & stretcher", "Paramedic on request", "Hospital-to-hospital transfer"],
  },
  {
    id: "city",
    icon: "map",
    tab: "City & Hotel",
    title: "City rides & hotel transfer",
    text: "Need to go shopping, visit the embassy, or change hotel? Book a car with a local driver for any trip.",
    img: IMG.city,
    points: ["Hourly or full-day booking", "Local, English-speaking drivers", "Family-size cars available"],
  },
];

const journey = [
  { icon: "plane", title: "Land", text: "Driver meets you at the airport arrival gate." },
  { icon: "hotel", title: "Check in", text: "We drop you at your hotel or guest house." },
  { icon: "hospital", title: "Treatment", text: "Daily rides to the hospital and back." },
  { icon: "map", title: "Explore", text: "Optional city rides on rest days." },
  { icon: "home", title: "Fly home", text: "Drop to the airport, on time and stress-free." },
];

const fleet = [
  { id: "sedan", name: "Comfort Sedan", img: IMG.sedan, seats: "3 passengers", bags: "2 bags", tag: "Most booked", extra: "Best for solo patient + 1 companion" },
  { id: "suv", name: "Family SUV", img: IMG.suv, seats: "5 passengers", bags: "4 bags", tag: "Extra space", extra: "Best for families and more luggage" },
  { id: "van", name: "Accessible Van", img: IMG.van, seats: "6 passengers", bags: "Wheelchair", tag: "Ramp access", extra: "Best for wheelchair users and groups" },
];

const perks = [
  { icon: "shield", title: "Verified drivers", text: "Every driver is background-checked and trained to help patients." },
  { icon: "chat", title: "Language help", text: "Drivers who speak English, and Bangla support on our hotline." },
  { icon: "clock", title: "Always on time", text: "We track your flight and your appointment times." },
  { icon: "snow", title: "Clean, AC cars", text: "Cars are cleaned and sanitised before every patient ride." },
  { icon: "wallet", title: "Fixed prices", text: "Get your fare before you book. No meter, no surprises." },
  { icon: "phone", title: "Live support", text: "Call or WhatsApp us any time during your trip." },
];

const faqs = [
  {
    q: "What if my flight is delayed?",
    a: "We track your flight number, so the driver adjusts the pickup time automatically. There is no extra waiting charge for flight delays.",
  },
  {
    q: "Can I book a car for my whole treatment stay?",
    a: "Yes. Many patients book a daily hospital shuttle or a full package for their stay. Tell us your dates and we will make a simple plan.",
  },
  {
    q: "Is a wheelchair van available on short notice?",
    a: "Usually, yes. For the best chance, book at least 24 hours ahead. In an emergency, call our hotline and we will do our best.",
  },
  {
    q: "How do I pay?",
    a: "You get a fixed price before you confirm. You can pay in advance online or pay the driver in local currency, whichever is easier.",
  },
];

const cities = ["Dhaka Airport", "Delhi Airport", "Chennai Airport", "Kolkata Airport", "Mumbai Airport", "Bangkok Airport", "Kuala Lumpur Airport", "Singapore Changi"];

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

const Icon = ({ name, size = 24 }) => {
  const p = { ...base, width: size, height: size };
  switch (name) {
    case "plane":
      return <svg {...p}><path d="M10.5 13.5L3 11l1.5-1.5 8 .5 4-4.5a2 2 0 0 1 3 3L15.5 13l.5 8L14.5 22.5 12 15" /></svg>;
    case "hospital":
      return <svg {...p}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M12 7v6M9 10h6M9 21v-4h6v4" /></svg>;
    case "hotel":
      return <svg {...p}><path d="M3 21V8l9-5 9 5v13" /><path d="M9 21v-5h6v5M8 11h.01M12 11h.01M16 11h.01" /></svg>;
    case "home":
      return <svg {...p}><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10M10 20v-5h4v5" /></svg>;
    case "wheelchair":
      return <svg {...p}><circle cx="11" cy="4" r="1.8" /><path d="M11 7v6h5l2 5h2" /><path d="M8.5 10.5a5 5 0 1 0 7 6.3" /></svg>;
    case "cross":
      return <svg {...p}><path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" /></svg>;
    case "map":
      return <svg {...p}><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z" /><path d="M9 4v14M15 6v14" /></svg>;
    case "car":
      return <svg {...p}><path d="M5 16V11l2-5h10l2 5v5" /><path d="M3 16h18v3h-3M6 19H3v-3" /><circle cx="7.5" cy="16" r="1.5" /><circle cx="16.5" cy="16" r="1.5" /></svg>;
    case "users":
      return <svg {...p}><circle cx="9" cy="8" r="3.2" /><path d="M3 20c.6-3.4 3-5 6-5s5.4 1.6 6 5" /><circle cx="17" cy="9" r="2.4" /><path d="M16.5 14.2c2.4.2 4 1.7 4.5 4.3" /></svg>;
    case "bag":
      return <svg {...p}><rect x="4" y="7" width="16" height="13" rx="2" /><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>;
    case "shield":
      return <svg {...p}><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></svg>;
    case "chat":
      return <svg {...p}><path d="M4 5h16v11H9l-5 4z" /><path d="M8 9h8M8 12h5" /></svg>;
    case "clock":
      return <svg {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>;
    case "snow":
      return <svg {...p}><path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9.5 4.5L12 6l2.5-1.5M9.5 19.5L12 18l2.5 1.5" /></svg>;
    case "wallet":
      return <svg {...p}><rect x="3" y="6" width="18" height="13" rx="3" /><path d="M3 10h18" /><circle cx="16.5" cy="14.5" r="1" fill="currentColor" /></svg>;
    case "phone":
      return <svg {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>;
    case "arrow":
      return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case "chevron":
      return <svg {...p}><path d="M6 9l6 6 6-6" /></svg>;
    case "minus":
      return <svg {...p}><path d="M5 12h14" /></svg>;
    case "plus":
      return <svg {...p}><path d="M12 5v14M5 12h14" /></svg>;
    case "image":
      return <svg {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.8" /><path d="M21 16l-5-5-8 8" /></svg>;
    default:
      return <svg {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>;
  }
};

/* ------------------- Scroll reveal ------------------- */
const Reveal = ({ children, className = "", delay = 0, direction = "up", as: Tag = "div", ...rest }) => {
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
      className={`tr-reveal tr-reveal--${direction} ${shown ? "is-shown" : ""} ${className}`}
      style={{ "--d": `${delay}s` }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

const Pic = ({ src, alt, className = "" }) => {
  const [failed, setFailed] = useState(!src);
  useEffect(() => setFailed(!src), [src]);
  return (
    <div className={`tr-pic ${failed ? "tr-pic--empty" : ""} ${className}`}>
      {failed ? <Icon name="image" size={44} /> : <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />}
    </div>
  );
};

/* ---------------------------- PAGE ---------------------------- */
const initial = {
  name: "",
  phone: "",
  pickup: "",
  drop: "",
  date: "",
  time: "",
  trip: "oneway",
  vehicle: "sedan",
  passengers: 1,
  wheelchair: false,
  notes: "",
};

const Transport = () => {
  const [active, setActive] = useState(services[0].id);
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success
  const [openFaq, setOpenFaq] = useState(0);
  const formRef = useRef(null);

  const current = services.find((s) => s.id === active);
  const today = new Date().toISOString().split("T")[0];

  const set = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    set(name, type === "checkbox" ? checked : value);
  };

  const goToForm = (patch = {}) => {
    setForm((f) => ({ ...f, ...patch }));
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const changePassengers = (n) => set("passengers", Math.min(12, Math.max(1, form.passengers + n)));

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Please enter your name";
    if (!/^[+\d][\d\s-]{6,}$/.test(form.phone.trim())) er.phone = "Enter a valid phone number";
    if (!form.pickup.trim()) er.pickup = "Enter pick-up location";
    if (!form.drop.trim()) er.drop = "Enter drop location";
    if (!form.date) er.date = "Choose a date";
    return er;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;

    setStatus("sending");
    /* EKHANE tomar backend / API call boshao. Ekhon shudhu demo. Jemon:
       await fetch("/api/transport", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(form) }); */
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
  };

  const reset = () => {
    setForm(initial);
    setErrors({});
    setStatus("idle");
  };

  const err = (name) => errors[name] && <span className="tr-error">{errors[name]}</span>;

  return (
    <main className="tr-page">
      {/* ================= HERO (full image background) ================= */}
      <section className="tr-hero">
        <Pic src={IMG.hero} alt="" className="tr-hero-bg" />
        <div className="tr-hero-overlay" aria-hidden="true" />

        <div className="tr-container tr-hero-grid">
          <div className="tr-hero-text">
            <span className="tr-chip tr-in" style={{ "--d": "0s" }}>
              <Icon name="car" size={16} /> Patient Transport
            </span>
            <h1 className="tr-in" style={{ "--d": "0.1s" }}>
              From the airport to your hospital, <span>we drive you there.</span>
            </h1>
            <p className="tr-in" style={{ "--d": "0.2s" }}>
              Safe, comfortable rides for patients and families during medical travel. Airport pickup, daily
              hospital shuttle, wheelchair vans and more, all in one place.
            </p>
            <div className="tr-hero-actions tr-in" style={{ "--d": "0.3s" }}>
              <a href="#tr-book" className="tr-btn">
                Book a Ride <Icon name="arrow" size={16} />
              </a>
              <a href={HOTLINE_LINK} className="tr-btn tr-btn--glass">
                <Icon name="phone" size={16} /> {HOTLINE}
              </a>
            </div>
          </div>

          {/* Route card: animated airport -> hotel -> hospital */}
          <div className="tr-route tr-in" style={{ "--d": "0.35s" }} aria-label="Sample route">
            <div className="tr-route-head">
              <span className="tr-live" /> Your ride today
            </div>
            <ol className="tr-route-list">
              <li>
                <span className="tr-route-dot"><Icon name="plane" size={18} /></span>
                <div>
                  <strong>Airport arrival</strong>
                  <small>Driver waiting at Gate 2</small>
                </div>
                <em>10:30</em>
              </li>
              <li>
                <span className="tr-route-dot"><Icon name="hotel" size={18} /></span>
                <div>
                  <strong>Hotel check-in</strong>
                  <small>Luggage drop</small>
                </div>
                <em>11:20</em>
              </li>
              <li>
                <span className="tr-route-dot tr-route-dot--end"><Icon name="hospital" size={18} /></span>
                <div>
                  <strong>Hospital visit</strong>
                  <small>First consultation</small>
                </div>
                <em>12:00</em>
              </li>
            </ol>
            <div className="tr-route-car" aria-hidden="true"><Icon name="car" size={16} /></div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <div className="tr-container">
        <Reveal className="tr-stats">
          {stats.map((s) => (
            <div key={s.label} className="tr-stat">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </Reveal>
      </div>

      {/* ================= SERVICES (tabs) ================= */}
      <section className="tr-section">
        <div className="tr-container">
          <Reveal className="tr-head">
            <span className="tr-label">What We Offer</span>
            <h2 className="tr-title">A ride for every step of your treatment</h2>
          </Reveal>

          <div className="tr-tabs">
            <Reveal direction="left" className="tr-tab-list" role="tablist" aria-label="Transport services">
              {services.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  id={`tr-tab-${s.id}`}
                  aria-selected={active === s.id}
                  aria-controls="tr-tab-panel"
                  className={`tr-tab ${active === s.id ? "is-active" : ""}`}
                  onClick={() => setActive(s.id)}
                >
                  <span className="tr-tab-icon"><Icon name={s.icon} size={20} /></span>
                  {s.tab}
                  <span className="tr-tab-arrow"><Icon name="arrow" size={16} /></span>
                </button>
              ))}
            </Reveal>

            <Reveal direction="right" className="tr-panel-wrap">
              <div key={current.id} className="tr-panel" role="tabpanel" id="tr-tab-panel" aria-labelledby={`tr-tab-${current.id}`}>
                <Pic src={current.img} alt={current.title} className="tr-panel-pic" />
                <div className="tr-panel-body">
                  <h3>{current.title}</h3>
                  <p>{current.text}</p>
                  <ul>
                    {current.points.map((pt) => (
                      <li key={pt}>
                        <span className="tr-tick"><Icon name="check" size={12} /></span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="tr-btn"
                    onClick={() => goToForm(current.id === "wheelchair" ? { vehicle: "van", wheelchair: true } : {})}
                  >
                    Book {current.tab} <Icon name="arrow" size={16} />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= JOURNEY TIMELINE ================= */}
      <section className="tr-section tr-section--soft">
        <div className="tr-container">
          <Reveal className="tr-head">
            <span className="tr-label">Your Journey</span>
            <h2 className="tr-title">We are with you from landing to flying home</h2>
          </Reveal>

          <ol className="tr-journey">
            {journey.map((j, i) => (
              <Reveal as="li" key={j.title} delay={i * 0.1} className="tr-journey-step">
                <span className="tr-journey-icon">
                  <Icon name={j.icon} size={24} />
                  <b>{i + 1}</b>
                </span>
                <h3>{j.title}</h3>
                <p>{j.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= FLEET ================= */}
      <section className="tr-section">
        <div className="tr-container">
          <Reveal className="tr-head tr-head--row">
            <div>
              <span className="tr-label">Our Fleet</span>
              <h2 className="tr-title">Pick the car that fits you</h2>
            </div>
            <p className="tr-sub">All cars are air-conditioned, clean, and driven by trained, friendly drivers.</p>
          </Reveal>

          <div className="tr-fleet">
            {fleet.map((f, i) => (
              <Reveal key={f.id} delay={i * 0.1} className="tr-car">
                <div className="tr-car-media">
                  <Pic src={f.img} alt={f.name} className="tr-car-pic" />
                  <span className="tr-car-tag">{f.tag}</span>
                </div>
                <div className="tr-car-body">
                  <h3>{f.name}</h3>
                  <p>{f.extra}</p>
                  <div className="tr-car-specs">
                    <span><Icon name="users" size={16} /> {f.seats}</span>
                    <span><Icon name={f.id === "van" ? "wheelchair" : "bag"} size={16} /> {f.bags}</span>
                    <span><Icon name="snow" size={16} /> AC</span>
                  </div>
                  <button type="button" className="tr-car-btn" onClick={() => goToForm({ vehicle: f.id })}>
                    Choose this car <Icon name="arrow" size={16} />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PERKS (dark band) ================= */}
      <section className="tr-dark">
        <div className="tr-container">
          <Reveal className="tr-head">
            <span className="tr-label tr-label--light">Why Travel With Us</span>
            <h2 className="tr-title tr-title--light">Small things that make a big difference</h2>
          </Reveal>

          <div className="tr-perks">
            {perks.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 0.1} className="tr-perk">
                <span className="tr-perk-icon"><Icon name={p.icon} size={22} /></span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BOOKING FORM ================= */}
      <section className="tr-section" id="tr-book">
        <div className="tr-container" ref={formRef}>
          <Reveal className="tr-book">
            <aside className="tr-book-side">
              <span className="tr-label tr-label--light">Book a Ride</span>
              <h2>Tell us where you need to go</h2>
              <p>Send your trip details and we will confirm your driver and fixed fare within a short time.</p>
              <ul>
                <li><Icon name="check" size={16} /> Free cancellation up to 12 hours</li>
                <li><Icon name="check" size={16} /> Driver details sent by SMS / WhatsApp</li>
                <li><Icon name="check" size={16} /> Child seat & wheelchair on request</li>
              </ul>
              <a href={HOTLINE_LINK} className="tr-book-call">
                <Icon name="phone" size={18} />
                <span>
                  <small>Prefer to call?</small>
                  {HOTLINE}
                </span>
              </a>
            </aside>

            <div className="tr-book-form">
              {status === "success" ? (
                <div className="tr-success" role="status">
                  <span className="tr-success-icon"><Icon name="check" size={34} /></span>
                  <h3>Booking request sent!</h3>
                  <p>
                    Thank you, {form.name.split(" ")[0] || "dear guest"}. We will confirm your ride from{" "}
                    <b>{form.pickup}</b> to <b>{form.drop}</b> very soon.
                  </p>
                  <button type="button" className="tr-btn" onClick={reset}>Book another ride</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Trip toggle */}
                  <div className="tr-toggle" role="radiogroup" aria-label="Trip type">
                    {[
                      ["oneway", "One way"],
                      ["round", "Round trip"],
                      ["daily", "Daily shuttle"],
                    ].map(([val, label]) => (
                      <button
                        key={val}
                        type="button"
                        role="radio"
                        aria-checked={form.trip === val}
                        className={form.trip === val ? "is-on" : ""}
                        onClick={() => set("trip", val)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  <div className="tr-row">
                    <div className={`tr-field ${errors.name ? "has-error" : ""}`}>
                      <label htmlFor="tr-name">Full Name *</label>
                      <input id="tr-name" name="name" placeholder="Your name" value={form.name} onChange={handleInput} />
                      {err("name")}
                    </div>
                    <div className={`tr-field ${errors.phone ? "has-error" : ""}`}>
                      <label htmlFor="tr-phone">Phone / WhatsApp *</label>
                      <input id="tr-phone" name="phone" type="tel" placeholder="+880 1XXX-XXXXXX" value={form.phone} onChange={handleInput} />
                      {err("phone")}
                    </div>
                  </div>

                  <div className="tr-row tr-row--route">
                    <div className={`tr-field ${errors.pickup ? "has-error" : ""}`}>
                      <label htmlFor="tr-pickup">Pick-up *</label>
                      <input id="tr-pickup" name="pickup" list="tr-places" placeholder="Airport, hotel or address" value={form.pickup} onChange={handleInput} />
                      {err("pickup")}
                    </div>
                    <button
                      type="button"
                      className="tr-swap"
                      aria-label="Swap pick-up and drop"
                      onClick={() => setForm((f) => ({ ...f, pickup: f.drop, drop: f.pickup }))}
                    >
                      <Icon name="arrow" size={16} />
                    </button>
                    <div className={`tr-field ${errors.drop ? "has-error" : ""}`}>
                      <label htmlFor="tr-drop">Drop *</label>
                      <input id="tr-drop" name="drop" list="tr-places" placeholder="Hospital or hotel" value={form.drop} onChange={handleInput} />
                      {err("drop")}
                    </div>
                  </div>

                  <datalist id="tr-places">
                    {cities.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>

                  <div className="tr-row tr-row--3">
                    <div className={`tr-field ${errors.date ? "has-error" : ""}`}>
                      <label htmlFor="tr-date">Date *</label>
                      <input id="tr-date" name="date" type="date" min={today} value={form.date} onChange={handleInput} />
                      {err("date")}
                    </div>
                    <div className="tr-field">
                      <label htmlFor="tr-time">Time</label>
                      <input id="tr-time" name="time" type="time" value={form.time} onChange={handleInput} />
                    </div>
                    <div className="tr-field">
                      <span className="tr-field-label" id="tr-pass-label">Passengers</span>
                      <div className="tr-stepper" role="group" aria-labelledby="tr-pass-label">
                        <button type="button" aria-label="Fewer passengers" onClick={() => changePassengers(-1)} disabled={form.passengers <= 1}>
                          <Icon name="minus" size={16} />
                        </button>
                        <output aria-live="polite">{form.passengers}</output>
                        <button type="button" aria-label="More passengers" onClick={() => changePassengers(1)} disabled={form.passengers >= 12}>
                          <Icon name="plus" size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle radio cards */}
                  <fieldset className="tr-vehicles">
                    <legend>Vehicle</legend>
                    <div className="tr-vehicle-grid">
                      {fleet.map((f) => (
                        <label key={f.id} className={`tr-vehicle ${form.vehicle === f.id ? "is-on" : ""}`}>
                          <input type="radio" name="vehicle" value={f.id} checked={form.vehicle === f.id} onChange={handleInput} />
                          <Icon name={f.id === "van" ? "wheelchair" : "car"} size={22} />
                          <strong>{f.name}</strong>
                          <small>{f.seats}</small>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <label className="tr-check">
                    <input type="checkbox" name="wheelchair" checked={form.wheelchair} onChange={handleInput} />
                    <span className="tr-check-box"><Icon name="check" size={12} /></span>
                    Patient needs wheelchair support
                  </label>

                  <div className="tr-field">
                    <label htmlFor="tr-notes">Notes (optional)</label>
                    <textarea
                      id="tr-notes"
                      name="notes"
                      rows="3"
                      placeholder="e.g. flight number, hospital name, number of bags"
                      value={form.notes}
                      onChange={handleInput}
                    />
                  </div>

                  <button type="submit" className="tr-btn tr-btn--block" disabled={status === "sending"}>
                    {status === "sending" ? (
                      <>
                        <span className="tr-spinner" aria-hidden="true" /> Sending...
                      </>
                    ) : (
                      <>
                        Request Booking <Icon name="arrow" size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="tr-section tr-section--soft">
        <div className="tr-container tr-faq-grid">
          <Reveal direction="left" className="tr-faq-intro">
            <span className="tr-label">FAQ</span>
            <h2 className="tr-title">Questions about your ride?</h2>
            <p>Can't find your answer? Our team is happy to help any time.</p>
            <Link to="/contact" className="tr-btn tr-btn--ghost">
              Ask a question <Icon name="arrow" size={16} />
            </Link>
          </Reveal>

          <div className="tr-faq">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={f.q} delay={i * 0.06} className={`tr-faq-item ${open ? "is-open" : ""}`}>
                  <h3>
                    <button
                      type="button"
                      className="tr-faq-q"
                      aria-expanded={open}
                      aria-controls={`tr-faq-a-${i}`}
                      onClick={() => setOpenFaq(open ? null : i)}
                    >
                      <span className="tr-faq-no">{String(i + 1).padStart(2, "0")}</span>
                      <span className="tr-faq-text">{f.q}</span>
                      <span className="tr-chevron"><Icon name="chevron" size={18} /></span>
                    </button>
                  </h3>
                  <div className="tr-faq-a" id={`tr-faq-a-${i}`} role="region">
                    <div className="tr-faq-inner">
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
      <section className="tr-cta-wrap">
        <div className="tr-container">
          <Reveal className="tr-cta">
            <div className="tr-cta-road" aria-hidden="true" />
            <div className="tr-cta-text">
              <h2>Landing soon? Let us pick you up.</h2>
              <p>Share your flight details and relax. Your driver will be waiting.</p>
            </div>
            <div className="tr-cta-actions">
              <a href="#tr-book" className="tr-btn tr-btn--white">
                Book Airport Pickup <Icon name="arrow" size={16} />
              </a>
              <Link to="/contact" className="tr-btn tr-btn--outline-white">
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default Transport;
