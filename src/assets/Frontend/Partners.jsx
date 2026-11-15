import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/Partners.css";

/* =====================================================================
   PARTNERS DEMO DATA
   ---------------------------------------------------------------------
   - Shob data DEMO. Shudhu tomader asol partner der rakhba.
   - Logo thakle import kore `logo` e dao (jemon: logo: ApolloLogo).
     Logo na thakle initials badge dekhabe.
   - Hospital chara baki partner (lab, airline, insurance, hotel) er nam
     fictional; tomader asol partner er nam diye replace koro.
   ===================================================================== */
const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=80`;

const types = [
  { id: "all", label: "All Partners", icon: "grid" },
  { id: "hospital", label: "Hospitals", icon: "hospital" },
  { id: "diagnostic", label: "Diagnostics", icon: "flask" },
  { id: "travel", label: "Air & Travel", icon: "plane" },
  { id: "insurance", label: "Insurance", icon: "shield" },
  { id: "stay", label: "Hotels & Stay", icon: "home" },
];

const partners = [
  // ---------- Hospitals ----------
  { name: "Apollo Hospitals", short: "AP", type: "hospital", country: "India", city: "Chennai", since: 2016, color: "#1b6ca8", tags: ["Cardiology", "Transplant"], acc: "JCI" },
  { name: "Fortis Healthcare", short: "FH", type: "hospital", country: "India", city: "Gurugram", since: 2017, color: "#7c3a9c", tags: ["Neurology", "Orthopedics"], acc: "JCI" },
  { name: "Max Healthcare", short: "MX", type: "hospital", country: "India", city: "New Delhi", since: 2018, color: "#d1343a", tags: ["Oncology", "Liver Transplant"], acc: "NABH" },
  { name: "Medanta", short: "MD", type: "hospital", country: "India", city: "Gurugram", since: 2019, color: "#e07b1a", tags: ["Cardiac", "Robotic Surgery"], acc: "JCI" },
  { name: "Narayana Health", short: "NH", type: "hospital", country: "India", city: "Bengaluru", since: 2018, color: "#0f8a6c", tags: ["Cardiac", "Pediatrics"], acc: "JCI" },
  { name: "Manipal Hospitals", short: "MH", type: "hospital", country: "India", city: "Bengaluru", since: 2020, color: "#2c4a9a", tags: ["Oncology", "Nephrology"], acc: "NABH" },
  { name: "Bumrungrad Hospital", short: "BH", type: "hospital", country: "Thailand", city: "Bangkok", since: 2017, color: "#00796b", tags: ["Check-up", "Cardiology"], acc: "JCI" },
  { name: "Bangkok Hospital", short: "BK", type: "hospital", country: "Thailand", city: "Bangkok", since: 2019, color: "#1e5aa8", tags: ["Heart", "Brain"], acc: "JCI" },
  { name: "Samitivej Hospital", short: "SV", type: "hospital", country: "Thailand", city: "Bangkok", since: 2021, color: "#5b8f2e", tags: ["Women & Child", "Check-up"], acc: "JCI" },
  { name: "Prince Court Medical Centre", short: "PC", type: "hospital", country: "Malaysia", city: "Kuala Lumpur", since: 2020, color: "#8b6b2f", tags: ["IVF", "Cardiology"], acc: "MSQH" },
  { name: "Gleneagles Kuala Lumpur", short: "GL", type: "hospital", country: "Malaysia", city: "Kuala Lumpur", since: 2019, color: "#b0325a", tags: ["Oncology", "Neurology"], acc: "JCI" },
  { name: "Sunway Medical Centre", short: "SM", type: "hospital", country: "Malaysia", city: "Selangor", since: 2022, color: "#e8a317", tags: ["Cancer", "Fertility"], acc: "JCI" },
  { name: "Mount Elizabeth Hospital", short: "ME", type: "hospital", country: "Singapore", city: "Singapore", since: 2021, color: "#5a3d8a", tags: ["Cardiac", "Neuro"], acc: "JCI" },
  { name: "Raffles Hospital", short: "RH", type: "hospital", country: "Singapore", city: "Singapore", since: 2022, color: "#c0392b", tags: ["Check-up", "Orthopedics"], acc: "JCI" },
  { name: "Beijing United Family", short: "BU", type: "hospital", country: "China", city: "Beijing", since: 2023, color: "#2f6f9f", tags: ["Family", "Pediatrics"], acc: "JCI" },
  // ---------- Diagnostics ----------
  { name: "MediScan Diagnostics", short: "MS", type: "diagnostic", country: "Bangladesh", city: "Dhaka", since: 2018, color: "#1f8f8f", tags: ["MRI & CT", "Lab tests"] },
  { name: "PathCare Labs", short: "PL", type: "diagnostic", country: "Bangladesh", city: "Chattogram", since: 2020, color: "#4a7bd1", tags: ["Pathology", "Home sample"] },
  { name: "Genome Plus", short: "GP", type: "diagnostic", country: "India", city: "Delhi", since: 2021, color: "#9c4dcc", tags: ["Genetic tests", "Second opinion"] },
  // ---------- Air & Travel ----------
  { name: "SkyCare Air Ambulance", short: "SC", type: "travel", country: "Regional", city: "Asia", since: 2019, color: "#d35400", tags: ["Air ambulance", "24/7"] },
  { name: "FlyWell Airlines", short: "FW", type: "travel", country: "Regional", city: "Asia", since: 2017, color: "#2c7be5", tags: ["Patient fares", "Wheelchair"] },
  { name: "MediRide Transport", short: "MR", type: "travel", country: "India", city: "Multiple cities", since: 2018, color: "#16a085", tags: ["Airport pickup", "Ambulance"] },
  // ---------- Insurance ----------
  { name: "Global Health Assure", short: "GH", type: "insurance", country: "Regional", city: "Asia", since: 2021, color: "#34495e", tags: ["Travel cover", "Cashless"] },
  { name: "SafeTrip Insurance", short: "ST", type: "insurance", country: "Bangladesh", city: "Dhaka", since: 2022, color: "#27ae60", tags: ["Medical travel", "Family cover"] },
  // ---------- Hotels & Stay ----------
  { name: "Comfort Stay Suites", short: "CS", type: "stay", country: "India", city: "Chennai", since: 2018, color: "#a0522d", tags: ["Near hospital", "Kitchen"] },
  { name: "CareInn Residences", short: "CI", type: "stay", country: "Thailand", city: "Bangkok", since: 2020, color: "#8e44ad", tags: ["Serviced apt.", "Halal food"] },
  { name: "HealHome Guest House", short: "HG", type: "stay", country: "India", city: "Kolkata", since: 2019, color: "#c27c0e", tags: ["Budget", "Family rooms"] },
];

const featured = [
  {
    name: "Apollo Hospitals",
    place: "Chennai, India",
    img: u("photo-1586773860418-d37222d8fce3"),
    quote: "Our partnership has helped hundreds of patients from Bangladesh get timely heart and transplant care with full support from arrival to discharge.",
    person: "International Patient Services",
    stats: [["500+", "Patients referred"], ["8 yrs", "Partnership"], ["4.9", "Patient rating"]],
  },
  {
    name: "Bumrungrad Hospital",
    place: "Bangkok, Thailand",
    img: u("photo-1519494026892-80bbd2d6fd0d"),
    quote: "Patients arrive well prepared, with reports reviewed and travel arranged. That makes treatment faster and smoother for everyone.",
    person: "International Medical Coordination",
    stats: [["300+", "Patients referred"], ["7 yrs", "Partnership"], ["4.8", "Patient rating"]],
  },
  {
    name: "Prince Court Medical Centre",
    place: "Kuala Lumpur, Malaysia",
    img: u("photo-1587351021759-3e566b6af7cc"),
    quote: "A reliable partner that truly cares about patients. Their team stays with families through every step of the journey.",
    person: "Business Development Team",
    stats: [["150+", "Patients referred"], ["4 yrs", "Partnership"], ["4.8", "Patient rating"]],
  },
];

const countryFlags = { India: "🇮🇳", Thailand: "🇹🇭", Malaysia: "🇲🇾", Singapore: "🇸🇬", China: "🇨🇳", Bangladesh: "🇧🇩", Regional: "🌏" };

const benefits = [
  { icon: "wallet", title: "Special patient rates", text: "Partner pricing and transparent cost estimates before you travel." },
  { icon: "clock", title: "Priority appointments", text: "Faster doctor appointments and quicker report reviews." },
  { icon: "chat", title: "Direct coordination", text: "Our team talks directly with each hospital's international desk." },
  { icon: "shield", title: "Verified quality", text: "We only work with accredited, trusted, and well-reviewed partners." },
];

const partnerTypes = ["Hospital / Clinic", "Diagnostic Centre", "Travel / Airline", "Insurance", "Hotel / Accommodation", "Other"];

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
  grid: <><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></>,
  hospital: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M12 7v6M9 10h6M9 21v-4h6v4" /></>,
  flask: <><path d="M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3" /><path d="M7 15h10" /></>,
  plane: <path d="M10.5 13.5L3 11l1.5-1.5 8 .5 4-4.5a2 2 0 0 1 3 3L15.5 13l.5 8L14.5 22.5 12 15" />,
  shield: <><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  home: <><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10M10 20v-5h4v5" /></>,
  wallet: <><rect x="3" y="6" width="18" height="13" rx="3" /><path d="M3 10h18" /><circle cx="16.5" cy="14.5" r="1" fill="currentColor" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  chat: <><path d="M4 5h16v11H9l-5 4z" /><path d="M8 9h8M8 12h5" /></>,
  handshake: <><path d="M3 11l4-4 4 2 3-2 7 5" /><path d="M7 7v6l5 5 2-2M11 13l3 3M13 11l3 3" /><path d="M3 11v4l3 3" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  award: <><circle cx="12" cy="9" r="5.5" /><path d="M8.5 13.5L7 21l5-2.5 5 2.5-1.5-7.5" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  left: <path d="M15 6l-6 6 6 6" />,
  right: <path d="M9 6l6 6-6 6" />,
  quote: <path d="M4 18v-5.5C4 8.4 6.2 6 10 5.5V8c-2 .5-3 1.7-3 4h3v6zm10 0v-5.5c0-4.1 2.2-6.5 6-7V8c-2 .5-3 1.7-3 4h3v6z" fill="currentColor" stroke="none" />,
  rotate: <><path d="M4 12a8 8 0 0 1 14-5.3L20 9" /><path d="M20 4v5h-5M20 12a8 8 0 0 1-14 5.3L4 15" /><path d="M4 20v-5h5" /></>,
  image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.8" /><path d="M21 16l-5-5-8 8" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
};

const Icon = ({ name, size = 24 }) => (
  <svg {...base} width={size} height={size}>
    {paths[name] || paths.check}
  </svg>
);

/* ------------------- Helpers ------------------- */
const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
};

const Reveal = ({ children, className = "", delay = 0, direction = "up", as: Tag = "div", style, ...rest }) => {
  const [ref, shown] = useInView();
  return (
    <Tag
      ref={ref}
      className={`pt-reveal pt-reveal--${direction} ${shown ? "is-shown" : ""} ${className}`}
      style={{ "--d": `${delay}s`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

const Counter = ({ value, suffix = "" }) => {
  const [ref, inView] = useInView(0.4);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      return;
    }
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const k = Math.min(1, (t - start) / 1400);
      setN(Math.round(value * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <strong ref={ref}>
      {n}
      {suffix}
    </strong>
  );
};

const Pic = ({ src, alt, className = "" }) => {
  const [failed, setFailed] = useState(!src);
  useEffect(() => setFailed(!src), [src]);
  return (
    <div className={`pt-pic ${failed ? "pt-pic--empty" : ""} ${className}`}>
      {failed ? <Icon name="image" size={40} /> : <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />}
    </div>
  );
};

// Logo thakle image, na thakle initials
const Logo = ({ p, size = "md" }) => (
  <span className={`pt-logo pt-logo--${size}`} style={{ "--c": p.color }}>
    {p.logo ? <img src={p.logo} alt="" /> : p.short}
  </span>
);

// Marquee er logo pill
const LogoPill = ({ p }) => (
  <span className="pt-pill" style={{ "--c": p.color }}>
    <Logo p={p} size="xs" />
    {p.name}
  </span>
);

/* ---------------------------- PAGE ---------------------------- */
const initialForm = { org: "", type: "", country: "", person: "", email: "", phone: "", message: "" };

const Partners = () => {
  const [type, setType] = useState("all");
  const [query, setQuery] = useState("");
  const [flipped, setFlipped] = useState(null);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const hospitals = partners.filter((p) => p.type === "hospital");
  const countries = [...new Set(hospitals.map((p) => p.country))];
  const rowA = hospitals.slice(0, Math.ceil(hospitals.length / 2));
  const rowB = [...hospitals.slice(Math.ceil(hospitals.length / 2)), ...partners.filter((p) => p.type !== "hospital").slice(0, 4)];

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return partners
      .filter((p) => type === "all" || p.type === type)
      .filter((p) => !q || `${p.name} ${p.country} ${p.city} ${p.tags.join(" ")}`.toLowerCase().includes(q));
  }, [type, query]);

  const countOf = (id) => (id === "all" ? partners.length : partners.filter((p) => p.type === id).length);

  // Country onujayi koyta partner (bar chart)
  const byCountry = useMemo(() => {
    const map = {};
    partners.forEach((p) => {
      map[p.country] = (map[p.country] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, []);
  const maxCount = byCountry[0]?.[1] || 1;

  // Featured auto slide
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % featured.length), 7000);
    return () => clearInterval(id);
  }, [paused]);

  const move = (d) => setSlide((s) => (s + d + featured.length) % featured.length);
  const f = featured[slide];

  /* ----- form ----- */
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((x) => ({ ...x, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!form.org.trim()) er.org = "Enter organisation name";
    if (!form.type) er.type = "Choose partner type";
    if (!form.person.trim()) er.person = "Enter contact person";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) er.email = "Enter a valid email";
    setErrors(er);
    if (Object.keys(er).length) return;
    setStatus("sending");
    /* EKHANE tomar backend / API call boshao. Jemon:
       await fetch("/api/partner", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(form) }); */
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
  };

  const err = (n) => errors[n] && <span className="pt-error">{errors[n]}</span>;

  return (
    <main className="pt-page">
      {/* ================= HERO ================= */}
      <section className="pt-hero">
        <div className="pt-container pt-hero-text">
          <span className="pt-chip pt-in" style={{ "--d": "0s" }}>
            <Icon name="handshake" size={16} /> Our Partners
          </span>
          <h1 className="pt-in" style={{ "--d": "0.1s" }}>
            Trusted by leading <span>hospitals</span> across Asia
          </h1>
          <p className="pt-in" style={{ "--d": "0.2s" }}>
            We work hand-in-hand with accredited hospitals, diagnostic centres, airlines, insurers and hotels, so
            every patient gets safe, smooth, and affordable care abroad.
          </p>
          <div className="pt-hero-actions pt-in" style={{ "--d": "0.3s" }}>
            <a href="#pt-directory" className="pt-btn">
              Explore Partners <Icon name="arrow" size={16} />
            </a>
            <a href="#pt-join" className="pt-btn pt-btn--ghost">
              Become a Partner
            </a>
          </div>
        </div>

        {/* Logo marquee (2 rows, opposite directions) */}
    

      </section>

      {/* ================= STATS ================= */}
      <div className="pt-container">
        <Reveal className="pt-stats">
          <div className="pt-stat">
            <span className="pt-stat-icon"><Icon name="hospital" size={24} /></span>
            <div>
              <Counter value={hospitals.length} suffix="+" />
              <span>Partner hospitals</span>
            </div>
          </div>
          <div className="pt-stat">
            <span className="pt-stat-icon"><Icon name="handshake" size={24} /></span>
            <div>
              <Counter value={partners.length} suffix="+" />
              <span>Total partners</span>
            </div>
          </div>
          <div className="pt-stat">
            <span className="pt-stat-icon"><Icon name="pin" size={24} /></span>
            <div>
              <Counter value={countries.length} />
              <span>Countries</span>
            </div>
          </div>
          <div className="pt-stat">
            <span className="pt-stat-icon"><Icon name="award" size={24} /></span>
            <div>
              <Counter value={100} suffix="%" />
              <span>Accredited hospitals</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ================= FEATURED PARTNER (slider) ================= */}
      <section className="pt-section">
        <div className="pt-container">
          <Reveal className="pt-head">
            <span className="pt-label">Featured Partners</span>
            <h2 className="pt-title">Partnerships that make a difference</h2>
          </Reveal>

          <Reveal
            className="pt-feature"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div className="pt-feature-media">
              <Pic key={f.img} src={f.img} alt={f.name} className="pt-feature-pic" />
              <div className="pt-feature-badge">
                <Icon name="award" size={18} /> Featured Partner
              </div>
            </div>

            <div className="pt-feature-body" key={slide} aria-live="polite">
              <span className="pt-feature-quote"><Icon name="quote" size={44} /></span>
              <h3>{f.name}</h3>
              <p className="pt-feature-place"><Icon name="pin" size={15} /> {f.place}</p>
              <blockquote>{f.quote}</blockquote>
              <small>{f.person}</small>
              <div className="pt-feature-stats">
                {f.stats.map(([v, l]) => (
                  <div key={l}>
                    <strong>{v}</strong>
                    <span>{l}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-feature-nav">
              <div className="pt-dots">
                {featured.map((x, i) => (
                  <button
                    key={x.name}
                    type="button"
                    aria-label={`Show ${x.name}`}
                    aria-current={i === slide}
                    className={i === slide ? "is-on" : ""}
                    onClick={() => setSlide(i)}
                  />
                ))}
              </div>
              <div className="pt-arrows">
                <button type="button" aria-label="Previous partner" onClick={() => move(-1)}>
                  <Icon name="left" size={18} />
                </button>
                <button type="button" aria-label="Next partner" onClick={() => move(1)}>
                  <Icon name="right" size={18} />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= DIRECTORY (filter + flip cards) ================= */}
      <section className="pt-section pt-section--soft" id="pt-directory">
        <div className="pt-container">
          <Reveal className="pt-head">
            <span className="pt-label">Partner Directory</span>
            <h2 className="pt-title">Our complete partner network</h2>
            <p>Hover or tap a card to see more details about each partner.</p>
          </Reveal>

          <div className="pt-filter-bar">
            <div className="pt-types" role="group" aria-label="Filter by partner type">
              {types.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={type === t.id}
                  className={type === t.id ? "is-on" : ""}
                  onClick={() => {
                    setType(t.id);
                    setFlipped(null);
                  }}
                >
                  <Icon name={t.icon} size={17} />
                  {t.label}
                  <b>{countOf(t.id)}</b>
                </button>
              ))}
            </div>
            <label className="pt-search">
              <Icon name="search" size={18} />
              <span className="pt-sr">Search partners</span>
              <input type="search" placeholder="Search by name, country..." value={query} onChange={(e) => setQuery(e.target.value)} />
            </label>
          </div>

          {list.length ? (
            <div className="pt-grid">
              {list.map((p, i) => {
                const isFlipped = flipped === p.name;
                return (
                  <div key={`${type}-${p.name}`} className="pt-card-wrap" style={{ "--i": i }}>
                    <button
                      type="button"
                      className={`pt-card ${isFlipped ? "is-flipped" : ""}`}
                      style={{ "--c": p.color }}
                      aria-pressed={isFlipped}
                      aria-label={`${p.name}, ${p.city}, ${p.country}. Show details`}
                      onClick={() => setFlipped(isFlipped ? null : p.name)}
                    >
                      {/* Front */}
                      <span className="pt-face pt-front">
                        <Logo p={p} size="lg" />
                        <strong>{p.name}</strong>
                        <small>
                          <span aria-hidden="true">{countryFlags[p.country]}</span> {p.country}
                        </small>
                        <span className="pt-flip-hint" aria-hidden="true"><Icon name="rotate" size={14} /></span>
                      </span>

                      {/* Back */}
                      <span className="pt-face pt-back" aria-hidden={!isFlipped}>
                        <span className="pt-back-head">
                          <Logo p={p} size="sm" />
                          <strong>{p.name}</strong>
                        </span>
                        <span className="pt-back-row"><Icon name="pin" size={14} /> {p.city}, {p.country}</span>
                        <span className="pt-back-row"><Icon name="calendar" size={14} /> Partner since {p.since}</span>
                        {p.acc && <span className="pt-back-row"><Icon name="shield" size={14} /> {p.acc} accredited</span>}
                        <span className="pt-back-tags">
                          {p.tags.map((t) => (
                            <em key={t}>{t}</em>
                          ))}
                        </span>
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="pt-empty" role="status">
              <Icon name="search" size={30} />
              <p>No partner found. Try another name or category.</p>
              <button
                type="button"
                className="pt-btn pt-btn--ghost"
                onClick={() => {
                  setQuery("");
                  setType("all");
                }}
              >
                Show all partners
              </button>
            </div>
          )}

          <p className="pt-note">Can't find a hospital? We can arrange treatment at many other hospitals too. <Link to="/contact">Ask us</Link>.</p>
        </div>
      </section>

      {/* ================= WHERE WE WORK + BENEFITS ================= */}
      <section className="pt-section">
        <div className="pt-container pt-split">
          <Reveal direction="left" className="pt-coverage">
            <span className="pt-label">Where We Work</span>
            <h2 className="pt-title">Partners in {byCountry.filter(([c]) => c !== "Regional").length} countries</h2>
            <ul className="pt-bars">
              {byCountry.map(([c, n], i) => (
                <li key={c} style={{ "--w": `${(n / maxCount) * 100}%`, "--i": i }}>
                  <span className="pt-bar-label">
                    <span aria-hidden="true">{countryFlags[c]}</span> {c}
                  </span>
                  <span className="pt-bar"><i /></span>
                  <b>{n}</b>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="pt-benefits">
            <Reveal direction="right">
              <span className="pt-label">Why It Matters</span>
              <h2 className="pt-title">What our partnerships mean for you</h2>
            </Reveal>
            <div className="pt-benefit-grid">
              {benefits.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.08} className="pt-benefit">
                  <span><Icon name={b.icon} size={22} /></span>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= BECOME A PARTNER ================= */}
      <section className="pt-join-wrap" id="pt-join">
        <div className="pt-container">
          <Reveal className="pt-join">
            <div className="pt-join-info">
              <span className="pt-label pt-label--light">Partner With Us</span>
              <h2>Let's grow together</h2>
              <p>
                Are you a hospital, clinic, diagnostic centre, travel company, insurer or hotel? Join our network
                and connect with patients who need your services.
              </p>
              <ul>
                <li><Icon name="check" size={16} /> Steady flow of international patients</li>
                <li><Icon name="check" size={16} /> Dedicated coordination team</li>
                <li><Icon name="check" size={16} /> Joint marketing & events</li>
                <li><Icon name="check" size={16} /> Transparent, long-term relationship</li>
              </ul>
            </div>

            <div className="pt-join-form">
              {status === "success" ? (
                <div className="pt-success" role="status">
                  <span><Icon name="handshake" size={34} /></span>
                  <h3>Thank you for your interest!</h3>
                  <p>Our partnership team will contact {form.org || "you"} within 2 working days.</p>
                  <button
                    type="button"
                    className="pt-btn"
                    onClick={() => {
                      setForm(initialForm);
                      setStatus("idle");
                    }}
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3>Partnership enquiry</h3>
                  <div className="pt-row">
                    <div className={`pt-field ${errors.org ? "has-error" : ""}`}>
                      <label htmlFor="pt-org">Organisation *</label>
                      <input id="pt-org" name="org" placeholder="Hospital / company name" value={form.org} onChange={handleInput} />
                      {err("org")}
                    </div>
                    <div className={`pt-field ${errors.type ? "has-error" : ""}`}>
                      <label htmlFor="pt-type">Partner type *</label>
                      <select id="pt-type" name="type" value={form.type} onChange={handleInput}>
                        <option value="">Select type</option>
                        {partnerTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      {err("type")}
                    </div>
                  </div>
                  <div className="pt-row">
                    <div className={`pt-field ${errors.person ? "has-error" : ""}`}>
                      <label htmlFor="pt-person">Contact person *</label>
                      <input id="pt-person" name="person" placeholder="Full name" value={form.person} onChange={handleInput} />
                      {err("person")}
                    </div>
                    <div className="pt-field">
                      <label htmlFor="pt-country">Country</label>
                      <input id="pt-country" name="country" placeholder="e.g. India" value={form.country} onChange={handleInput} />
                    </div>
                  </div>
                  <div className="pt-row">
                    <div className={`pt-field ${errors.email ? "has-error" : ""}`}>
                      <label htmlFor="pt-email">Email *</label>
                      <input id="pt-email" name="email" type="email" placeholder="name@company.com" value={form.email} onChange={handleInput} />
                      {err("email")}
                    </div>
                    <div className="pt-field">
                      <label htmlFor="pt-phone">Phone</label>
                      <input id="pt-phone" name="phone" type="tel" placeholder="+880 / +91 ..." value={form.phone} onChange={handleInput} />
                    </div>
                  </div>
                  <div className="pt-field">
                    <label htmlFor="pt-msg">Message</label>
                    <textarea id="pt-msg" name="message" rows="3" placeholder="Tell us briefly about your organisation" value={form.message} onChange={handleInput} />
                  </div>
                  <button type="submit" className="pt-btn pt-btn--block" disabled={status === "sending"}>
                    {status === "sending" ? (
                      <>
                        <span className="pt-spinner" aria-hidden="true" /> Sending...
                      </>
                    ) : (
                      <>
                        Send Partnership Request <Icon name="arrow" size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default Partners;
