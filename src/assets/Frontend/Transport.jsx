import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/Transport.css";

/* ---------------------------- IMAGES ----------------------------
   Ekhon online (Unsplash) DEMO image use kora hocche.
   Chaile download kore tomar Image folder e rekhe import koro, jemon:
   import HeroImg from "../Image/Transport/hero.jpg";   ->   hero: HeroImg,
   Image load na hole automatically ekta placeholder dekhabe.
------------------------------------------------------------------ */
const u = (id, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const IMG = {
  hero: u("photo-1449965408869-eaa3f722e40d", 1600),
  airport: u("photo-1436491865332-7a61a109cc05"),
  hospital: u("photo-1519494026892-80bbd2d6fd0d"),
  wheelchair: u("photo-1580281657527-47e2d4e3c5a5"),
  ambulance: u("photo-1587745416684-47953f16f02f"),
  escort: u("photo-1584515933487-779824d29309"),
  discharge: u("photo-1530521954074-e64f6810b32d"),
  sedan: u("photo-1494976388531-d1058494cdd8", 900),
  suv: u("photo-1519641471654-76ce0107ad1b", 900),
  van: u("photo-1570125909232-eb263c188f7e", 900),
  amb: u("photo-1612538498456-e861df91d4d0", 900),
};

/* ---------------------------- DATA ---------------------------- */
// Shob text SAMPLE. Tomar asol service onujayi edit koro
const HOTLINE = "+880 1XXX-XXXXXX"; // <-- tomar number dao
const HOTLINE_LINK = "tel:+8801XXXXXXXXX";

const stats = [
  { value: "24/7", label: "Patient pickup" },
  { value: "5+", label: "Treatment cities" },
  { value: "3", label: "Mobility options" },
  { value: "বাংলা", label: "Speaking support" },
];

const services = [
  {
    id: "airport",
    icon: "plane",
    tab: "Airport Pickup",
    title: "Patient pickup from the airport",
    text: "Our driver meets the patient at the arrival gate with a name board. If needed, we arrange a wheelchair from the aircraft door with the airline, so the patient never has to walk long distances after a tiring flight.",
    img: IMG.airport,
    points: ["Wheelchair from aircraft door (on request)", "Flight tracking, no extra wait charge", "Help with luggage, SIM card & currency"],
  },
  {
    id: "hospital",
    icon: "hospital",
    tab: "Hospital Visits",
    title: "Hotel ↔ hospital, matched to your appointments",
    text: "We get your doctor appointment, test, and therapy times from the hospital and plan every ride around them. Ideal for patients going daily for dialysis, chemotherapy, physiotherapy, or follow-ups.",
    img: IMG.hospital,
    points: ["Rides timed with appointments", "Driver knows OPD & emergency entrances", "Waits during short visits and tests"],
  },
  {
    id: "wheelchair",
    icon: "wheelchair",
    tab: "Wheelchair Support",
    title: "Wheelchair & mobility support",
    text: "Vans with a ramp or lift for patients who cannot walk easily, elderly patients, and patients recovering from joint or spine surgery. The patient stays in the wheelchair for the whole ride.",
    img: IMG.wheelchair,
    points: ["Ramp / lift van", "Secure wheelchair belts", "Driver helps from door to door"],
  },
  {
    id: "stretcher",
    icon: "cross",
    tab: "Stretcher & Ambulance",
    title: "Non-emergency stretcher transfer",
    text: "For bed-bound or post-surgery patients who need to lie down, with oxygen and a trained attendant. Also used for hospital-to-hospital transfers. For critical patients we arrange an air ambulance.",
    img: IMG.ambulance,
    points: ["Stretcher & oxygen on board", "Nurse or paramedic on request", "Hospital-to-hospital transfer"],
  },
  {
    id: "escort",
    icon: "chat",
    tab: "Escort & Interpreter",
    title: "Coordinator rides with you",
    text: "On the first hospital visit, our Bangla-speaking coordinator travels with the patient, helps with registration and payment desks, and translates during the doctor consultation.",
    img: IMG.escort,
    points: ["Bangla-speaking coordinator", "Help with hospital registration", "Interpreter during consultation"],
  },
  {
    id: "discharge",
    icon: "home",
    tab: "Discharge & Fly Home",
    title: "Gentle ride home after treatment",
    text: "After discharge, we take the patient from the hospital to the hotel or straight to the airport, driving gently and carefully. We also help with the fit-to-fly letter and airline wheelchair booking.",
    img: IMG.discharge,
    points: ["Hospital to airport drop", "Fit-to-fly paperwork help", "Airline wheelchair arranged"],
  },
];

const journey = [
  { icon: "plane", title: "Arrive", text: "Pickup at the airport, with wheelchair if needed." },
  { icon: "hotel", title: "Stay near hospital", text: "Drop at a hotel or guest house close to your hospital." },
  { icon: "stetho", title: "Consult & tests", text: "Rides to the first doctor visit and all tests." },
  { icon: "hospital", title: "Treatment", text: "Admission day, surgery, or daily therapy sessions." },
  { icon: "calendar", title: "Follow-ups", text: "Rides for review visits, dressings, and reports." },
  { icon: "home", title: "Fly home", text: "Discharge, airport drop, and airline assistance." },
];

// Je shohor gulote chikitsha hoy. hospitals er nam tomader partner list theke
const treatmentCities = [
  { city: "Chennai", country: "India", flag: "🇮🇳", airport: "Chennai Airport (MAA)", hospitals: ["Apollo Hospitals"], link: "/hospitals/india" },
  { city: "Delhi NCR", country: "India", flag: "🇮🇳", airport: "Delhi Airport (DEL)", hospitals: ["Fortis Healthcare", "Max Healthcare"], link: "/hospitals/india" },
  { city: "Kolkata", country: "India", flag: "🇮🇳", airport: "Kolkata Airport (CCU)", hospitals: ["Partner hospitals"], link: "/hospitals/india" },
  { city: "Bangkok", country: "Thailand", flag: "🇹🇭", airport: "Suvarnabhumi (BKK)", hospitals: ["Bumrungrad Hospital", "Bangkok Hospital"], link: "/hospitals/thailand" },
  { city: "Kuala Lumpur", country: "Malaysia", flag: "🇲🇾", airport: "KLIA (KUL)", hospitals: ["Prince Court Medical Centre", "Gleneagles Kuala Lumpur"], link: "/hospitals/malaysia" },
];

const fleet = [
  { id: "sedan", name: "Comfort Sedan", img: IMG.sedan, seats: "Patient + 2", bags: "2 bags", tag: "Most booked", extra: "For patients who can walk. Reclining seat, smooth ride.", icon: "car" },
  { id: "suv", name: "Family SUV", img: IMG.suv, seats: "Patient + 4", bags: "4 bags", tag: "For families", extra: "When the patient travels with family and more luggage.", icon: "car" },
  { id: "van", name: "Wheelchair Van", img: IMG.van, seats: "Patient + 3", bags: "Ramp / lift", tag: "Wheelchair", extra: "Patient stays in the wheelchair. Ramp or lift access.", icon: "wheelchair" },
  { id: "ambulance", name: "Patient Ambulance", img: IMG.amb, seats: "Patient + 1", bags: "Stretcher", tag: "Non-emergency", extra: "Stretcher, oxygen, and trained attendant on board.", icon: "cross" },
];

const mobilityOptions = [
  { id: "walk", label: "Can walk", hint: "Normal car", icon: "users", vehicle: "sedan" },
  { id: "wheelchair", label: "Wheelchair", hint: "Ramp van", icon: "wheelchair", vehicle: "van" },
  { id: "stretcher", label: "Needs stretcher", hint: "Ambulance", icon: "cross", vehicle: "ambulance" },
];

const tripTypes = [
  ["airport", "Airport pickup"],
  ["hospital", "Hospital visits"],
  ["discharge", "Discharge & airport"],
  ["other", "Other ride"],
];

const perks = [
  { icon: "shield", title: "Patient-aware drivers", text: "First-aid trained drivers who drive gently, especially after surgery." },
  { icon: "calendar", title: "Synced with appointments", text: "We plan rides around your doctor, test, and therapy times." },
  { icon: "chat", title: "Bangla-speaking support", text: "A coordinator who speaks your language, on the phone and on site." },
  { icon: "wheelchair", title: "Wheelchair & stretcher ready", text: "The right vehicle for the patient's condition, every time." },
  { icon: "wallet", title: "Fixed prices", text: "Know the fare before you travel. No meter, no surprises." },
  { icon: "phone", title: "24/7 emergency line", text: "Call or WhatsApp us any time during your treatment stay." },
];

const relatedServices = [
  { icon: "plane", title: "Air Ticket", text: "Patient-friendly flights", to: "/services/air-ticket" },
  { icon: "shield", title: "Medical Visa", text: "Invitation letter & file", to: "/services/medical-visa-assistance" },
  { icon: "hotel", title: "Accommodation", text: "Stay near the hospital", to: "/services/medical-accommodation" },
  { icon: "cross", title: "Air Ambulance", text: "For critical patients", to: "/services/air-ambulance-service" },
];

const faqs = [
  {
    q: "Can you pick up a patient who cannot walk?",
    a: "Yes. Tell us the patient's condition when booking. We send a wheelchair van or a stretcher ambulance, and we can request a wheelchair from the airline at the aircraft door.",
  },
  {
    q: "Do your drivers know the hospitals?",
    a: "Yes. Our drivers regularly take patients to our partner hospitals, so they know the OPD, emergency, and international patient entrances.",
  },
  {
    q: "What if my appointment time changes?",
    a: "Just message our coordinator. We keep in touch with the hospital and change the pickup time for you. There is no charge for normal schedule changes.",
  },
  {
    q: "Can a nurse travel with the patient?",
    a: "Yes. For patients who need care on the way, we can arrange a nurse or paramedic in the ambulance. Please mention it in your booking notes.",
  },
  {
    q: "How do I pay?",
    a: "You get a fixed price before you confirm. You can pay in advance or pay locally. For a full treatment stay we can make one simple package price.",
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
    case "pin":
      return <svg {...p}><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>;
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
    case "calendar":
      return <svg {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>;
    case "stetho":
      return <svg {...p}><path d="M6 3v6a4 4 0 0 0 8 0V3" /><path d="M10 13v2a5 5 0 0 0 10 0v-2" /><circle cx="20" cy="11" r="2" /></svg>;
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
const Reveal = ({ children, className = "", delay = 0, direction = "up", as: Tag = "div", style, ...rest }) => {
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
      style={{ "--d": `${delay}s`, ...style }}
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
  trip: "airport",
  patient: "",
  phone: "",
  city: "",
  hospital: "",
  pickup: "",
  drop: "",
  date: "",
  time: "",
  flight: "",
  mobility: "walk",
  vehicle: "sedan",
  companions: 1,
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
    const { name, value } = e.target;
    set(name, value);
  };

  // Patient er condition bachle shathe shathe thik gari suggest hobe
  const chooseMobility = (m) => {
    const opt = mobilityOptions.find((o) => o.id === m);
    setForm((f) => ({ ...f, mobility: m, vehicle: opt.vehicle }));
  };

  const goToForm = (patch = {}) => {
    setForm((f) => ({ ...f, ...patch }));
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Service tab theke booking e gele trip type, mobility, vehicle mile jabe
  const bookService = (id) => {
    const map = {
      airport: { trip: "airport" },
      hospital: { trip: "hospital" },
      wheelchair: { mobility: "wheelchair", vehicle: "van" },
      stretcher: { mobility: "stretcher", vehicle: "ambulance" },
      escort: { trip: "hospital" },
      discharge: { trip: "discharge" },
    };
    goToForm(map[id] || {});
  };

  const changeCompanions = (n) => set("companions", Math.min(6, Math.max(0, form.companions + n)));

  const validate = () => {
    const er = {};
    if (!form.patient.trim()) er.patient = "Please enter patient name";
    if (!/^[+\d][\d\s-]{6,}$/.test(form.phone.trim())) er.phone = "Enter a valid phone / WhatsApp";
    if (!form.city) er.city = "Choose treatment city";
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

  const pickupPh = form.trip === "airport" ? "e.g. Chennai Airport" : form.trip === "discharge" ? "Hospital name" : "Hotel or address";
  const dropPh = form.trip === "airport" ? "Hotel or hospital" : form.trip === "discharge" ? "Airport or hotel" : "Hospital name";

  return (
    <main className="tr-page">
      {/* ================= HERO (full image background) ================= */}
      <section className="tr-hero">
        <Pic src={IMG.hero} alt="" className="tr-hero-bg" />
        <div className="tr-hero-overlay" aria-hidden="true" />

        <div className="tr-container tr-hero-grid">
          <div className="tr-hero-text">
            <span className="tr-chip tr-in" style={{ "--d": "0s" }}>
              <Icon name="cross" size={16} /> Medical Travel Transport
            </span>
            <h1 className="tr-in" style={{ "--d": "0.1s" }}>
              Safe rides for patients, <span>from airport to hospital and home.</span>
            </h1>
            <p className="tr-in" style={{ "--d": "0.2s" }}>
              Going abroad for treatment? We take care of every ride during your medical trip in India, Thailand,
              and Malaysia: airport pickup, daily hospital visits, wheelchair and stretcher support, and a
              gentle ride home after discharge.
            </p>
            <div className="tr-hero-actions tr-in" style={{ "--d": "0.3s" }}>
              <a href="#tr-book" className="tr-btn">
                Book Patient Transport <Icon name="arrow" size={16} />
              </a>
              <a href={HOTLINE_LINK} className="tr-btn tr-btn--glass">
                <Icon name="phone" size={16} /> {HOTLINE}
              </a>
            </div>
          </div>

          {/* Route card: patient er ekta sample din */}
          <div className="tr-route tr-in" style={{ "--d": "0.35s" }} aria-label="Sample patient ride plan">
            <div className="tr-route-head">
              <span className="tr-live" /> Patient ride plan · Day 1
            </div>
            <ol className="tr-route-list">
              <li>
                <span className="tr-route-dot"><Icon name="plane" size={18} /></span>
                <div>
                  <strong>Airport arrival</strong>
                  <small>Wheelchair ready at the gate</small>
                </div>
                <em>10:30</em>
              </li>
              <li>
                <span className="tr-route-dot"><Icon name="hotel" size={18} /></span>
                <div>
                  <strong>Hotel near hospital</strong>
                  <small>Rest & freshen up</small>
                </div>
                <em>11:30</em>
              </li>
              <li>
                <span className="tr-route-dot tr-route-dot--end"><Icon name="stetho" size={18} /></span>
                <div>
                  <strong>Doctor consultation</strong>
                  <small>Coordinator joins you</small>
                </div>
                <em>14:00</em>
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
            <span className="tr-label">Patient Transport Services</span>
            <h2 className="tr-title">The right ride for every stage of your treatment</h2>
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
                  <button type="button" className="tr-btn" onClick={() => bookService(current.id)}>
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
            <span className="tr-label">Your Treatment Journey</span>
            <h2 className="tr-title">We drive you through every step of your medical trip</h2>
          </Reveal>

          <ol className="tr-journey">
            {journey.map((j, i) => (
              <Reveal as="li" key={j.title} delay={i * 0.08} className="tr-journey-step">
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

      {/* ================= TREATMENT CITIES ================= */}
      <section className="tr-section">
        <div className="tr-container">
          <Reveal className="tr-head">
            <span className="tr-label">Where We Drive</span>
            <h2 className="tr-title">Transport in top medical cities</h2>
            <p className="tr-sub">Our drivers know the airports and partner hospitals in each city.</p>
          </Reveal>

          <div className="tr-cities">
            {treatmentCities.map((c, i) => (
              <Reveal key={c.city} delay={i * 0.07} className="tr-city">
                <div className="tr-city-top">
                  <span className="tr-city-flag" aria-hidden="true">{c.flag}</span>
                  <div>
                    <h3>{c.city}</h3>
                    <small>{c.country}</small>
                  </div>
                </div>
                <p className="tr-city-row"><Icon name="plane" size={15} /> {c.airport}</p>
                <ul className="tr-city-hosp">
                  {c.hospitals.map((h) => (
                    <li key={h}><Icon name="hospital" size={14} /> {h}</li>
                  ))}
                </ul>
                <div className="tr-city-actions">
                  <button type="button" className="tr-city-btn" onClick={() => goToForm({ city: c.city })}>
                    Book a ride <Icon name="arrow" size={15} />
                  </button>
                  <Link to={c.link} className="tr-city-link">Hospitals</Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FLEET ================= */}
      <section className="tr-section tr-section--soft">
        <div className="tr-container">
          <Reveal className="tr-head tr-head--row">
            <div>
              <span className="tr-label">Our Vehicles</span>
              <h2 className="tr-title">A vehicle for every patient's condition</h2>
            </div>
            <p className="tr-sub">All vehicles are clean, air-conditioned, and sanitised before every patient ride.</p>
          </Reveal>

          <div className="tr-fleet">
            {fleet.map((f, i) => (
              <Reveal key={f.id} delay={i * 0.08} className="tr-car">
                <div className="tr-car-media">
                  <Pic src={f.img} alt={f.name} className="tr-car-pic" />
                  <span className="tr-car-tag">{f.tag}</span>
                </div>
                <div className="tr-car-body">
                  <h3>{f.name}</h3>
                  <p>{f.extra}</p>
                  <div className="tr-car-specs">
                    <span><Icon name="users" size={16} /> {f.seats}</span>
                    <span><Icon name={f.icon === "car" ? "bag" : f.icon} size={16} /> {f.bags}</span>
                    <span><Icon name="snow" size={16} /> AC</span>
                  </div>
                  <button
                    type="button"
                    className="tr-car-btn"
                    onClick={() =>
                      goToForm({
                        vehicle: f.id,
                        mobility: f.id === "van" ? "wheelchair" : f.id === "ambulance" ? "stretcher" : "walk",
                      })
                    }
                  >
                    Choose this vehicle <Icon name="arrow" size={16} />
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
            <span className="tr-label tr-label--light">Why Patients Trust Us</span>
            <h2 className="tr-title tr-title--light">Transport made for patients, not just passengers</h2>
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
              <span className="tr-label tr-label--light">Book Patient Transport</span>
              <h2>Tell us about the patient and the ride</h2>
              <p>
                Share the treatment city, hospital, and the patient's condition. Our coordinator will confirm the
                right vehicle and a fixed fare.
              </p>
              <ul>
                <li><Icon name="check" size={16} /> Rides matched to hospital appointments</li>
                <li><Icon name="check" size={16} /> Wheelchair & stretcher on request</li>
                <li><Icon name="check" size={16} /> Driver details sent by WhatsApp</li>
                <li><Icon name="check" size={16} /> Free change if appointment moves</li>
              </ul>
              <a href={HOTLINE_LINK} className="tr-book-call">
                <Icon name="phone" size={18} />
                <span>
                  <small>Urgent or need help?</small>
                  {HOTLINE}
                </span>
              </a>
            </aside>

            <div className="tr-book-form">
              {status === "success" ? (
                <div className="tr-success" role="status">
                  <span className="tr-success-icon"><Icon name="check" size={34} /></span>
                  <h3>Request received!</h3>
                  <p>
                    Thank you. Our coordinator will contact you on WhatsApp to confirm the ride for{" "}
                    <b>{form.patient}</b> in <b>{form.city}</b>, from <b>{form.pickup}</b> to <b>{form.drop}</b>.
                  </p>
                  <button type="button" className="tr-btn" onClick={reset}>Book another ride</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Trip type */}
                  <div className="tr-toggle" role="radiogroup" aria-label="Ride type">
                    {tripTypes.map(([val, label]) => (
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
                    <div className={`tr-field ${errors.patient ? "has-error" : ""}`}>
                      <label htmlFor="tr-patient">Patient name *</label>
                      <input id="tr-patient" name="patient" placeholder="Patient's full name" value={form.patient} onChange={handleInput} />
                      {err("patient")}
                    </div>
                    <div className={`tr-field ${errors.phone ? "has-error" : ""}`}>
                      <label htmlFor="tr-phone">Phone / WhatsApp *</label>
                      <input id="tr-phone" name="phone" type="tel" placeholder="+880 1XXX-XXXXXX" value={form.phone} onChange={handleInput} />
                      {err("phone")}
                    </div>
                  </div>

                  <div className="tr-row">
                    <div className={`tr-field ${errors.city ? "has-error" : ""}`}>
                      <label htmlFor="tr-city">Treatment city *</label>
                      <select id="tr-city" name="city" value={form.city} onChange={handleInput}>
                        <option value="">Select city</option>
                        {treatmentCities.map((c) => (
                          <option key={c.city} value={c.city}>{c.city}, {c.country}</option>
                        ))}
                        <option value="Other">Other city</option>
                      </select>
                      {err("city")}
                    </div>
                    <div className="tr-field">
                      <label htmlFor="tr-hospital">Hospital name</label>
                      <input id="tr-hospital" name="hospital" placeholder="e.g. Apollo Hospitals" value={form.hospital} onChange={handleInput} />
                    </div>
                  </div>

                  <div className="tr-row tr-row--route">
                    <div className={`tr-field ${errors.pickup ? "has-error" : ""}`}>
                      <label htmlFor="tr-pickup">Pick-up *</label>
                      <input id="tr-pickup" name="pickup" placeholder={pickupPh} value={form.pickup} onChange={handleInput} />
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
                      <input id="tr-drop" name="drop" placeholder={dropPh} value={form.drop} onChange={handleInput} />
                      {err("drop")}
                    </div>
                  </div>

                  <div className="tr-row tr-row--3">
                    <div className={`tr-field ${errors.date ? "has-error" : ""}`}>
                      <label htmlFor="tr-date">{form.trip === "airport" ? "Arrival date *" : "Date *"}</label>
                      <input id="tr-date" name="date" type="date" min={today} value={form.date} onChange={handleInput} />
                      {err("date")}
                    </div>
                    <div className="tr-field">
                      <label htmlFor="tr-time">{form.trip === "hospital" ? "Appointment time" : "Time"}</label>
                      <input id="tr-time" name="time" type="time" value={form.time} onChange={handleInput} />
                    </div>
                    {form.trip === "airport" || form.trip === "discharge" ? (
                      <div className="tr-field">
                        <label htmlFor="tr-flight">Flight no. (optional)</label>
                        <input id="tr-flight" name="flight" placeholder="e.g. BG 097" value={form.flight} onChange={handleInput} />
                      </div>
                    ) : (
                      <div className="tr-field">
                        <span className="tr-field-label" id="tr-comp-label">Companions</span>
                        <div className="tr-stepper" role="group" aria-labelledby="tr-comp-label">
                          <button type="button" aria-label="Fewer companions" onClick={() => changeCompanions(-1)} disabled={form.companions <= 0}>
                            <Icon name="minus" size={16} />
                          </button>
                          <output aria-live="polite">{form.companions}</output>
                          <button type="button" aria-label="More companions" onClick={() => changeCompanions(1)} disabled={form.companions >= 6}>
                            <Icon name="plus" size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Patient mobility */}
                  <fieldset className="tr-vehicles">
                    <legend>Patient's condition</legend>
                    <div className="tr-vehicle-grid">
                      {mobilityOptions.map((m) => (
                        <label key={m.id} className={`tr-vehicle ${form.mobility === m.id ? "is-on" : ""}`}>
                          <input type="radio" name="mobility" value={m.id} checked={form.mobility === m.id} onChange={() => chooseMobility(m.id)} />
                          <Icon name={m.icon} size={22} />
                          <strong>{m.label}</strong>
                          <small>{m.hint}</small>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  {/* Vehicle */}
                  <fieldset className="tr-vehicles">
                    <legend>Vehicle <span className="tr-legend-hint">(suggested from patient's condition)</span></legend>
                    <div className="tr-vehicle-grid tr-vehicle-grid--4">
                      {fleet.map((f) => (
                        <label key={f.id} className={`tr-vehicle ${form.vehicle === f.id ? "is-on" : ""}`}>
                          <input type="radio" name="vehicle" value={f.id} checked={form.vehicle === f.id} onChange={handleInput} />
                          <Icon name={f.icon} size={22} />
                          <strong>{f.name}</strong>
                          <small>{f.seats}</small>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="tr-field">
                    <label htmlFor="tr-notes">Medical notes (optional)</label>
                    <textarea
                      id="tr-notes"
                      name="notes"
                      rows="3"
                      placeholder="e.g. after knee surgery, needs oxygen, nurse needed, number of bags"
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
                        Request Patient Transport <Icon name="arrow" size={16} />
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
            <h2 className="tr-title">Questions about patient transport?</h2>
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

      {/* ================= RELATED SERVICES ================= */}
      <section className="tr-section tr-section--tight">
        <div className="tr-container">
          <Reveal className="tr-head">
            <span className="tr-label">Plan the Whole Trip</span>
            <h2 className="tr-title">Transport is one part of your medical journey</h2>
          </Reveal>
          <div className="tr-related">
            {relatedServices.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.07}>
                <Link to={r.to} className="tr-rel">
                  <span className="tr-rel-icon"><Icon name={r.icon} size={22} /></span>
                  <span className="tr-rel-text">
                    <strong>{r.title}</strong>
                    <small>{r.text}</small>
                  </span>
                  <Icon name="arrow" size={16} />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="tr-cta-wrap">
        <div className="tr-container">
          <Reveal className="tr-cta">
            <div className="tr-cta-road" aria-hidden="true" />
            <div className="tr-cta-text">
              <h2>Flying abroad for treatment soon?</h2>
              <p>Send us your flight and hospital details. Your driver will be waiting at the gate.</p>
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
