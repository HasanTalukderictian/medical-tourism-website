import  { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/PickDrop.css";

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
   import heroImg from "../Image/pickdrop/hero.jpg";  ...  hero: heroImg
   Image load na hole sundor placeholder dekhabe.
------------------------------------------------------------------- */
const u = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const IMG = {
  hero: u("photo-1436491865332-7a61a109cc05", 1400),
  car: u("photo-1449965408869-eaa3f722e40d"),
  care: u("photo-1584515933487-779824d29309"),
};

/* ---------------------------- DATA ---------------------------- */
const tripTypes = [
  { id: "pickup", label: "Airport Pickup", icon: "landing" },
  { id: "drop", label: "Airport Drop", icon: "takeoff" },
  { id: "round", label: "Round Trip", icon: "swap" },
];

const cities = [
  { city: "Chennai", country: "India", airport: "MAA", hospitals: "Apollo, MGM, Kauvery" },
  { city: "Delhi NCR", country: "India", airport: "DEL", hospitals: "Fortis, Max, Medanta" },
  { city: "Kolkata", country: "India", airport: "CCU", hospitals: "Apollo, AMRI, Tata Medical" },
  { city: "Mumbai", country: "India", airport: "BOM", hospitals: "Kokilaben, Lilavati" },
  { city: "Bangkok", country: "Thailand", airport: "BKK", hospitals: "Bumrungrad, Bangkok Hospital" },
  { city: "Kuala Lumpur", country: "Malaysia", airport: "KUL", hospitals: "Prince Court, Gleneagles" },
];

const steps = [
  { icon: "doc", title: "Share flight details", text: "Send your flight number, arrival time and where you are going." },
  { icon: "radar", title: "We track your flight", text: "Our team watches your flight live, so delays never leave you waiting." },
  { icon: "sign", title: "Meet & greet", text: "Your driver waits at arrivals holding a board with your name." },
  { icon: "hospital", title: "Safe drop-off", text: "We take you straight to your hospital, hotel or guest house." },
];

const services = [
  { icon: "landing", title: "Airport Pickup", text: "Comfortable ride from the airport to your hospital or hotel on arrival." },
  { icon: "takeoff", title: "Airport Drop", text: "On-time drop to the airport after discharge, with luggage help." },
  { icon: "hospital", title: "Hospital Visits", text: "Daily rides between your stay and the hospital for check-ups and tests." },
  { icon: "wheelchair", title: "Wheelchair Support", text: "Wheelchair at the gate and accessible vehicles for limited mobility." },
  { icon: "sign", title: "Name Board Welcome", text: "A friendly face waiting at arrivals, so you never feel lost." },
  { icon: "bag", title: "Luggage Help", text: "Drivers help load and carry your bags and medical documents." },
];

const vehicles = [
  { name: "Sedan", seats: "Up to 3 passengers", bags: "2 large bags", price: 25, icon: "car", best: "Patient + 1 companion" },
  { name: "SUV / Family Car", seats: "Up to 6 passengers", bags: "4 large bags", price: 40, icon: "suv", best: "Family travelling together", popular: true },
  { name: "Wheelchair Van", seats: "Patient + 2 companions", bags: "3 large bags", price: 60, icon: "wheelchair", best: "Limited mobility patients" },
];

const features = [
  "Flight tracking with free waiting time",
  "Trained, polite and verified drivers",
  "Clean, air-conditioned vehicles",
  "Fixed price, no hidden charges",
  "24/7 support on phone and WhatsApp",
  "Help with local SIM and currency on arrival",
];

const faqs = [
  { q: "What happens if my flight is delayed?", a: "We track every flight. Your driver will adjust to the new arrival time, and waiting time for delays is free." },
  { q: "How will I find my driver at the airport?", a: "Your driver waits at the arrival gate with a board showing your name. You also get the driver's name and phone number on WhatsApp before you land." },
  { q: "Can you arrange a wheelchair at the airport?", a: "Yes. Tell us when booking. We can arrange a wheelchair at the gate and a wheelchair-accessible vehicle for the ride." },
  { q: "How early should I book?", a: "Booking at least 24 hours before your flight is best. For urgent trips, call or WhatsApp us and we will try our best to arrange a car." },
  { q: "Is the price per car or per person?", a: "Prices are per car for a one-way trip. Prices shown are sample starting rates and may change by city and distance." },
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
  landing: <><path d="M3 20h18" /><path d="M4.5 9.5l1.8-.6 2.6 2.4 3.8-1.2-3.3-5.8 2.1-.7 6 5 3.1-1a1.6 1.6 0 0 1 1 3L6.6 15.3 3 11z" /></>,
  takeoff: <><path d="M3 20h18" /><path d="M3.5 13.5l1.7-.8 2.5 1.4 3.6-1.8-4-4.8 2-.9 6.2 3.6 3-1.4a1.6 1.6 0 0 1 1.4 2.9L7 17.4z" /></>,
  swap: <><path d="M7 4L3 8l4 4" /><path d="M3 8h14" /><path d="M17 20l4-4-4-4" /><path d="M21 16H7" /></>,
  doc: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
  radar: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><path d="M12 12l6-6" /><circle cx="12" cy="12" r="1" /></>,
  sign: <><rect x="3" y="5" width="18" height="10" rx="2" /><path d="M8 15v5M16 15v5M7 9h10M7 12h6" /></>,
  hospital: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M12 7v6M9 10h6M9 21v-4h6v4" /></>,
  wheelchair: <><circle cx="10" cy="4.5" r="1.8" /><path d="M10 7v6h6l2 5" /><path d="M10 10h5" /><path d="M7 11.5a5 5 0 1 0 7.5 5.5" /></>,
  bag: <><rect x="4" y="7" width="16" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M9 11v5M15 11v5" /></>,
  car: <><path d="M5 16V11l2-5h10l2 5v5" /><path d="M3 16h18v3h-3M6 19H3v-3" /><circle cx="7.5" cy="16" r="1.5" /><circle cx="16.5" cy="16" r="1.5" /></>,
  suv: <><path d="M3 16v-5l2-5h12l4 5v5" /><path d="M3 11h18M10 6v5" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></>,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c.6-3.4 3-5 6-5s5.4 1.6 6 5" /><circle cx="17" cy="9" r="2.4" /><path d="M16.5 14.2c2.4.2 4 1.7 4.5 4.3" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  pin: <><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  shield: <><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  star: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />,
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
      { threshold: 0.12 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`pkd-reveal ${shown ? "is-shown" : ""} ${className}`} style={{ "--d": `${delay}s` }}>
      {children}
    </Tag>
  );
};

/* Image na thakle / load na hole placeholder */
const Pic = ({ src, alt, className = "" }) => {
  const [failed, setFailed] = useState(!src);
  return (
    <div className={`pkd-pic ${failed ? "pkd-pic--empty" : ""} ${className}`}>
      {failed ? <Icon name="car" size={54} /> : <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />}
    </div>
  );
};

const SectionHead = ({ eyebrow, title, text, center = true }) => (
  <Reveal className={`pkd-head ${center ? "pkd-head--center" : ""}`}>
    <span className="pkd-eyebrow">{eyebrow}</span>
    <h2>{title}</h2>
    {text && <p>{text}</p>}
  </Reveal>
);

/* ---------------------------- BOOKING FORM ---------------------------- */
const emptyForm = {
  name: "",
  phone: "",
  city: "",
  flight: "",
  date: "",
  time: "",
  passengers: "1",
  vehicle: "Sedan",
  place: "",
  wheelchair: false,
};

const BookingForm = () => {
  const [trip, setTrip] = useState("pickup");
  const [form, setForm] = useState(emptyForm);
  const [sent, setSent] = useState(false);

  const set = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({
      ...f,
      [key]: value,
      // Wheelchair dorkar hole automatic wheelchair van
      ...(key === "wheelchair" && value ? { vehicle: "Wheelchair Van" } : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /* EKHANE tomar API call boshao. Ekhon shudhu demo. Data: { trip, ...form } */
    setSent(true);
  };

  if (sent) {
    return (
      <div className="pkd-form pkd-form--done" role="status">
        <span className="pkd-done-icon">
          <Icon name="check" size={34} />
        </span>
        <h3>Request received!</h3>
        <p>
          Thank you{form.name ? `, ${form.name.split(" ")[0]}` : ""}. Our team will confirm your{" "}
          {tripTypes.find((t) => t.id === trip).label.toLowerCase()} on WhatsApp shortly.
        </p>
        <button
          type="button"
          className="pkd-btn pkd-btn--ghost"
          onClick={() => {
            setForm(emptyForm);
            setSent(false);
          }}
        >
          Book another ride
        </button>
      </div>
    );
  }

  const placeLabel = trip === "drop" ? "Pickup from (hospital / hotel)" : "Drop at (hospital / hotel)";

  return (
    <form className="pkd-form" onSubmit={handleSubmit}>
      <div className="pkd-form-top">
        <h3>Book your ride</h3>
        <span>Free waiting on delays</span>
      </div>

      <div className="pkd-trips" role="radiogroup" aria-label="Trip type">
        {tripTypes.map((t) => (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={trip === t.id}
            className={`pkd-trip ${trip === t.id ? "is-active" : ""}`}
            onClick={() => setTrip(t.id)}
          >
            <Icon name={t.icon} size={18} />
            {t.label}
          </button>
        ))}
      </div>

      <div className="pkd-fields">
        <label className="pkd-field">
          <span>Patient name</span>
          <input type="text" value={form.name} onChange={set("name")} placeholder="Full name" required />
        </label>
        <label className="pkd-field">
          <span>Phone / WhatsApp</span>
          <input type="tel" value={form.phone} onChange={set("phone")} placeholder="+880 1XXX-XXXXXX" required />
        </label>
        <label className="pkd-field">
          <span>City / Airport</span>
          <select value={form.city} onChange={set("city")} required>
            <option value="" disabled>
              Select city
            </option>
            {cities.map((c) => (
              <option key={c.airport} value={`${c.city} (${c.airport})`}>
                {c.city} ({c.airport}), {c.country}
              </option>
            ))}
          </select>
        </label>
        <label className="pkd-field">
          <span>Flight number</span>
          <input type="text" value={form.flight} onChange={set("flight")} placeholder="e.g. BG 0393" />
        </label>
        <label className="pkd-field">
          <span>{trip === "drop" ? "Flight date" : "Arrival date"}</span>
          <input type="date" value={form.date} onChange={set("date")} required />
        </label>
        <label className="pkd-field">
          <span>{trip === "drop" ? "Flight time" : "Arrival time"}</span>
          <input type="time" value={form.time} onChange={set("time")} required />
        </label>
        <label className="pkd-field pkd-field--full">
          <span>{placeLabel}</span>
          <input type="text" value={form.place} onChange={set("place")} placeholder="e.g. Apollo Hospital, Greams Road" />
        </label>
        <label className="pkd-field">
          <span>Passengers</span>
          <select value={form.passengers} onChange={set("passengers")}>
            {["1", "2", "3", "4", "5", "6"].map((n) => (
              <option key={n} value={n}>
                {n} {n === "1" ? "person" : "people"}
              </option>
            ))}
          </select>
        </label>
        <label className="pkd-field">
          <span>Vehicle</span>
          <select value={form.vehicle} onChange={set("vehicle")}>
            {vehicles.map((v) => (
              <option key={v.name} value={v.name}>
                {v.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="pkd-check">
        <input type="checkbox" checked={form.wheelchair} onChange={set("wheelchair")} />
        <span className="pkd-check-box" aria-hidden="true">
          <Icon name="check" size={14} />
        </span>
        Patient needs wheelchair support
      </label>

      <button type="submit" className="pkd-btn pkd-btn--full">
        Request Pick &amp; Drop <Icon name="arrow" size={18} />
      </button>
      <p className="pkd-form-note">No payment now. We confirm the price before your trip.</p>
    </form>
  );
};

/* ---------------------------- PAGE ---------------------------- */
const PickDrop = () => {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="pkd-page">
      {/* ================= HERO ================= */}
      <section className="pkd-hero">
        <div className="pkd-hero-bg" aria-hidden="true">
          <Pic src={IMG.hero} alt="" />
        </div>

        <div className="pkd-container pkd-hero-grid">
          <div className="pkd-hero-text">
            <nav className="pkd-crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>Services</span>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Pick &amp; Drop</span>
            </nav>

            <span className="pkd-badge">
              <Icon name="landing" size={16} /> Patient Airport Transfer
            </span>
            <h1>
              Land stress-free. <em>We&apos;ll be waiting</em> at the airport.
            </h1>
            <p>
              Safe and comfortable airport pick &amp; drop for patients and families travelling abroad for
              treatment. A friendly driver, a clean car, and a direct ride to your hospital or hotel.
            </p>

            <ul className="pkd-hero-points">
              <li>
                <Icon name="radar" size={18} /> Live flight tracking
              </li>
              <li>
                <Icon name="sign" size={18} /> Name board welcome
              </li>
              <li>
                <Icon name="wheelchair" size={18} /> Wheelchair friendly
              </li>
            </ul>

            <div className="pkd-hero-actions">
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="pkd-btn pkd-btn--wa">
                <WhatsAppIcon /> Book on WhatsApp
              </a>
              <a href={CONTACT.phoneLink} className="pkd-hero-call">
                <span>
                  <Icon name="phone" size={18} />
                </span>
                <div>
                  <small>24/7 helpline</small>
                  {CONTACT.phone}
                </div>
              </a>
            </div>
          </div>

          <div className="pkd-hero-form" id="book">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="pkd-stats-wrap">
        <div className="pkd-container">
          <div className="pkd-stats">
            {[
              { n: "5,000+", l: "Airport transfers", icon: "car" },
              { n: "6", l: "Cities covered", icon: "pin" },
              { n: "24/7", l: "Support team", icon: "clock" },
              { n: "4.9", l: "Average rating", icon: "star" },
            ].map((s, i) => (
              <Reveal key={s.l} className="pkd-stat" delay={i * 0.08}>
                <span className="pkd-stat-icon">
                  <Icon name={s.icon} size={22} />
                </span>
                <div>
                  <strong>{s.n}</strong>
                  <span>{s.l}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="pkd-section">
        <div className="pkd-container">
          <SectionHead
            eyebrow="How it works"
            title="From the plane to your hospital in 4 easy steps"
            text="We plan every detail so you can focus on your treatment, not on finding a taxi."
          />
          <ol className="pkd-steps">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} className="pkd-step" delay={i * 0.1}>
                <span className="pkd-step-no">{String(i + 1).padStart(2, "0")}</span>
                <span className="pkd-step-icon">
                  <Icon name={s.icon} size={26} />
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="pkd-section pkd-section--soft">
        <div className="pkd-container">
          <SectionHead
            eyebrow="What we offer"
            title="Transfers made for patients"
            text="Every ride is planned around the patient's comfort, health and hospital schedule."
          />
          <div className="pkd-services">
            {services.map((s, i) => (
              <Reveal key={s.title} className="pkd-service" delay={(i % 3) * 0.08}>
                <span className="pkd-service-icon">
                  <Icon name={s.icon} size={26} />
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VEHICLES ================= */}
      <section className="pkd-section">
        <div className="pkd-container">
          <SectionHead
            eyebrow="Choose your ride"
            title="Comfortable vehicles for every need"
            text="Sample starting prices for a one-way airport transfer. Final price depends on city and distance."
          />
          <div className="pkd-vehicles">
            {vehicles.map((v, i) => (
              <Reveal key={v.name} className={`pkd-vehicle ${v.popular ? "is-popular" : ""}`} delay={i * 0.1}>
                {v.popular && <span className="pkd-popular">Most popular</span>}
                <span className="pkd-vehicle-icon">
                  <Icon name={v.icon} size={36} />
                </span>
                <h3>{v.name}</h3>
                <p className="pkd-vehicle-best">{v.best}</p>
                <ul>
                  <li>
                    <Icon name="users" size={17} /> {v.seats}
                  </li>
                  <li>
                    <Icon name="bag" size={17} /> {v.bags}
                  </li>
                  <li>
                    <Icon name="shield" size={17} /> AC, verified driver
                  </li>
                </ul>
                <div className="pkd-price">
                  <small>Starting from</small>
                  <strong>
                    ${v.price}
                    <span>/ trip</span>
                  </strong>
                </div>
                <a href="#book" className={`pkd-btn pkd-btn--full ${v.popular ? "" : "pkd-btn--ghost"}`}>
                  Book {v.name.split(" ")[0]}
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="pkd-section pkd-section--soft">
        <div className="pkd-container pkd-why">
          <Reveal className="pkd-why-media">
            <Pic src={IMG.car} alt="Comfortable car for airport transfer" className="pkd-why-img" />
            <Pic src={IMG.care} alt="Patient care support" className="pkd-why-img pkd-why-img--small" />
            <div className="pkd-why-badge">
              <Icon name="shield" size={24} />
              <div>
                <strong>100% safe</strong>
                <span>Verified drivers</span>
              </div>
            </div>
          </Reveal>

          <div className="pkd-why-text">
            <SectionHead
              center={false}
              eyebrow="Why choose us"
              title="Peace of mind from the moment you land"
              text="Arriving in a new country for treatment can feel stressful. Our team makes the first and last step of your journey simple and safe."
            />
            <ul className="pkd-features">
              {features.map((f, i) => (
                <Reveal as="li" key={f} delay={i * 0.06}>
                  <span>
                    <Icon name="check" size={15} />
                  </span>
                  {f}
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= CITIES ================= */}
      <section className="pkd-section">
        <div className="pkd-container">
          <SectionHead
            eyebrow="Where we serve"
            title="Airports we cover"
            text="Pick & drop in the top medical tourism cities, with drivers who know the hospitals well."
          />
          <div className="pkd-cities">
            {cities.map((c, i) => (
              <Reveal key={c.airport} className="pkd-city" delay={(i % 3) * 0.08}>
                <span className="pkd-code">{c.airport}</span>
                <div>
                  <h3>{c.city}</h3>
                  <small>{c.country}</small>
                  <p>
                    <Icon name="hospital" size={15} /> {c.hospitals}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="pkd-section pkd-section--soft">
        <div className="pkd-container pkd-faq-wrap">
          <SectionHead eyebrow="FAQ" title="Questions patients often ask" />
          <div className="pkd-faqs">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className={`pkd-faq ${open ? "is-open" : ""}`}>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`pkd-faq-${i}`}
                    onClick={() => setOpenFaq(open ? -1 : i)}
                  >
                    {f.q}
                    <span className="pkd-faq-icon">
                      <Icon name="plus" size={18} />
                    </span>
                  </button>
                  <div className="pkd-faq-body" id={`pkd-faq-${i}`}>
                    <div>
                      <p>{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="pkd-cta-wrap">
        <div className="pkd-container">
          <Reveal className="pkd-cta">
            <div>
              <h2>Flying for treatment soon?</h2>
              <p>Share your flight details and we will take care of the ride. Need a car for the whole stay?</p>
            </div>
            <div className="pkd-cta-actions">
              <a href="#book" className="pkd-btn pkd-btn--white">
                Book Pick &amp; Drop <Icon name="arrow" size={18} />
              </a>
              <Link to="/services/transport" className="pkd-cta-link">
                See local transport <Icon name="arrow" size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default PickDrop;
