import  { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/Medicine.css";

/* =====================================================
   OVERSEAS PHARMACY SUPPORT (Thailand -> Bangladesh)
   Lekha, shomoy, sonkha DEMO. Asol tottho diye bodlao.
   ===================================================== */

const CONTACT = {
  phone: "+880 1234-567890",
  phoneLink: "tel:+8801234567890",
  whatsapp: "https://wa.me/8801234567890",
};

/* 4 ta main promise (tomar business concept) */
const pillars = [
  {
    icon: "shield",
    title: "100% Authentic & Verified Sourcing",
    text: "Directly procured from licensed pharmacies and hospital networks in Thailand. No grey market, no substitutes.",
  },
  {
    icon: "rx",
    title: "Complete Prescription Verification",
    text: "Every order is checked by a pharmacist against a valid prescription before anything is purchased.",
  },
  {
    icon: "snow",
    title: "Cold-Chain Handling",
    text: "Temperature-sensitive medicines travel in insulated packs at 2–8°C, with a temperature log.",
  },
  {
    icon: "stamp",
    title: "Regulatory Clearance",
    text: "We prepare the import paperwork and handle customs clearance, so your medicine arrives without trouble.",
  },
];

const steps = [
  { icon: "upload", title: "Upload prescription", text: "Send your doctor's prescription and the medicine names." },
  { icon: "rx", title: "Verification & quote", text: "Our pharmacist checks it and sends you price and delivery time." },
  { icon: "store", title: "Sourced in Thailand", text: "We buy from a licensed pharmacy or hospital network." },
  { icon: "snow", title: "Packed & cleared", text: "Cold-chain packing, shipping and customs clearance." },
  { icon: "home", title: "Delivered to you", text: "Doorstep delivery anywhere in Bangladesh." },
];

const categories = [
  { icon: "ribbon", title: "Cancer medicines", text: "Targeted therapy & oral chemotherapy" },
  { icon: "kidney", title: "Transplant care", text: "Immunosuppressants after transplant" },
  { icon: "syringe", title: "Biologics & injectables", text: "Cold-chain medicines & vaccines" },
  { icon: "dna", title: "Rare diseases", text: "Specialised & hard-to-find medicines" },
  { icon: "heart", title: "Heart & blood", text: "Cardiac and specialised blood medicines" },
  { icon: "brain", title: "Neurology", text: "Epilepsy, MS & specialist neuro care" },
  { icon: "baby", title: "Fertility", text: "IVF and hormone medicines" },
  { icon: "liver", title: "Liver & hepatitis", text: "Antiviral & liver disease medicines" },
];

const coldPoints = [
  { value: "2–8°C", label: "Controlled temperature" },
  { value: "48 hrs", label: "Insulated pack life" },
  { value: "24/7", label: "Temperature logging" },
];

const faqs = [
  { q: "Do I need a prescription?", a: "Yes. We only source prescription medicines against a valid prescription from a registered doctor. Our pharmacist verifies every prescription before we buy anything." },
  { q: "How long does delivery take?", a: "Most orders reach Bangladesh in about 7 to 14 days after you approve the quote. Urgent orders can be faster, depending on stock and customs. We share the timeline before you pay." },
  { q: "How do I know the medicine is genuine?", a: "We buy only from licensed pharmacies and hospital networks in Thailand. You receive the original sealed pack along with the purchase invoice, batch number and expiry date." },
  { q: "Which medicines can you not supply?", a: "We do not supply narcotics, controlled substances, or any medicine that is not allowed to be imported into Bangladesh. If a medicine cannot be imported, we will tell you before you pay." },
  { q: "How is the price calculated?", a: "Your quote includes the medicine price, cold-chain packing (if needed), shipping, and customs clearance. There are no hidden charges after you approve the quote." },
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
  shield: <><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  rx: <><path d="M6 4h5a3 3 0 0 1 0 6H6V4zM6 10v10M10 10l8 10M18 13l-6 7" /></>,
  snow: <><path d="M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11" /><path d="M9.5 3.5L12 6l2.5-2.5M9.5 20.5L12 18l2.5 2.5" /></>,
  stamp: <><path d="M9 3h6l-1 7h4a2 2 0 0 1 2 2v2H4v-2a2 2 0 0 1 2-2h4z" /><path d="M5 18h14M7 21h10" /></>,
  upload: <><path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /></>,
  store: <><path d="M4 9l1.5-5h13L20 9" /><path d="M4 9h16v2a3 3 0 0 1-5.3 2 3 3 0 0 1-5.4 0A3 3 0 0 1 4 11z" /><path d="M5 13v8h14v-8M10 21v-5h4v5" /></>,
  home: <><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10M10 20v-5h4v5" /></>,
  ribbon: <><path d="M12 3a4 4 0 0 0-4 4c0 3 4 7 4 7s4-4 4-7a4 4 0 0 0-4-4z" /><path d="M10 13l-4 8 3-1 1.5 2.5L13 15M14 13l4 8-3-1-1.5 2.5L11 15" /></>,
  kidney: <><path d="M9 4C5.5 4 4 7 4 11s1.5 8 5 8c2 0 3-1.5 3-3.5 0-1.5-1-2.5-1-4.5s1-3 1-4.5C12 5 11 4 9 4z" /><path d="M15 4c3.5 0 5 3 5 7s-1.5 8-5 8" /></>,
  syringe: <><path d="M18 2l4 4M20 4l-9.5 9.5M14 4l6 6M8.5 11.5l4 4M11 9l-7 7v4h4l7-7" /></>,
  dna: <><path d="M7 3c0 6 10 6 10 12s-10 3-10 6M17 3c0 6-10 6-10 12" /><path d="M8 7h8M8 17h8" /></>,
  heart: <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />,
  brain: <><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 3 3h1V4z" /><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-3 3h-1V4z" /></>,
  baby: <><circle cx="12" cy="8" r="4" /><path d="M6 21c0-3.3 2.7-6 6-6s6 2.7 6 6" /></>,
  liver: <path d="M3 9c0-3 3-5 8-5s10 1 10 5c0 5-6 11-10 11-2 0-2-3-4-4S3 13 3 9z" />,
  pill: <><rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-45 12 12)" /><path d="M9.5 9.5l5 5" /></>,
  plane: <path d="M10.5 13.5L3 11l1.5-1.5 8 .5 4-4.5a2 2 0 0 1 3 3L15.5 13l.5 8L14.5 22.5 12 15" />,
  thermo: <><path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z" /><path d="M12 9v7" /></>,
  file: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  alert: <><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16v.01" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
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
    <Tag ref={ref} className={`md-reveal ${shown ? "is-shown" : ""} ${className}`} style={{ "--d": `${delay}s` }}>
      {children}
    </Tag>
  );
};

const SectionHead = ({ eyebrow, title, text, light = false }) => (
  <Reveal className={`md-head ${light ? "md-head--light" : ""}`}>
    <span className="md-eyebrow">{eyebrow}</span>
    <h2>{title}</h2>
    {text && <p>{text}</p>}
  </Reveal>
);

/* ---------------------------- FORM ---------------------------- */
const MAX_MB = 10;
const newItem = () => ({ id: Date.now() + Math.random(), name: "", qty: "" });

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  district: "",
  doctor: "",
  urgency: "Regular",
  notes: "",
  agree: false,
};

const districts = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh", "Other"];

/* ---------------------------- PAGE ---------------------------- */
const Medicine = () => {
  const [form, setForm] = useState(emptyForm);
  const [items, setItems] = useState([newItem()]);
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState("");
  const [errors, setErrors] = useState({});
  const [sentRef, setSentRef] = useState("");
  const [openFaq, setOpenFaq] = useState(0);
  const formRef = useRef(null);

  const setField = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((er) => ({ ...er, [key]: "" }));
  };

  const goToForm = () => {
    if (formRef.current) formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* Medicine list (add / remove row) */
  const setItem = (id, key, value) => {
    setItems((list) => list.map((it) => (it.id === id ? { ...it, [key]: value } : it)));
    setErrors((er) => ({ ...er, items: "" }));
  };
  const addItem = () => setItems((list) => (list.length < 10 ? [...list, newItem()] : list));
  const removeItem = (id) => setItems((list) => (list.length > 1 ? list.filter((it) => it.id !== id) : list));

  /* Prescription upload */
  const pickFiles = (list) => {
    const all = Array.from(list);
    const ok = all.filter((f) => /\.(pdf|jpe?g|png)$/i.test(f.name) && f.size <= MAX_MB * 1024 * 1024);
    if (ok.length < all.length) setFileError(`Only PDF, JPG or PNG files up to ${MAX_MB} MB are allowed.`);
    else setFileError("");
    setFiles((prev) => [...prev, ...ok].slice(0, 5));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = "Please enter the patient's name.";
    if (form.phone.replace(/\D/g, "").length < 10) er.phone = "Please enter a valid phone number.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Please enter a valid email.";
    if (!form.district) er.district = "Please select your district.";
    if (!items.some((it) => it.name.trim())) er.items = "Please add at least one medicine name.";
    if (!form.agree) er.agree = "Please confirm to continue.";
    setErrors(er);
    if (!files.length) setFileError("Please upload a valid prescription.");
    if (Object.keys(er).length || !files.length) return;

    /* EKHANE tomar API call boshao. Jemon:
       const data = new FormData();
       Object.entries(form).forEach(([k, v]) => data.append(k, v));
       data.append("medicines", JSON.stringify(items.filter((it) => it.name.trim())));
       files.forEach((f) => data.append("prescriptions", f));
       await fetch("/api/medicine-request", { method: "POST", body: data });
       Ekhon shudhu demo. */
    setSentRef(`MED-${Date.now().toString().slice(-6)}`);
  };

  const reset = () => {
    setForm(emptyForm);
    setItems([newItem()]);
    setFiles([]);
    setFileError("");
    setErrors({});
    setSentRef("");
  };

  return (
    <main className="md-page">
      {/* ================= HERO ================= */}
      <section className="md-hero">
        <div className="md-container md-hero-grid">
          <div className="md-hero-text">
            <span className="md-badge">
              <Icon name="pill" size={16} /> Overseas Pharmacy Support
            </span>
            <h1>
              Authentic prescribed medicines, <em>delivered to Bangladesh</em>
            </h1>
            <p>
              Access life-saving, specialised and international prescription medicines from verified and licensed
              pharmacies in Thailand, with complete prescription verification, cold-chain handling and regulatory
              clearance.
            </p>

            <ul className="md-hero-points">
              <li>
                <Icon name="shield" size={18} /> 100% authentic
              </li>
              <li>
                <Icon name="rx" size={18} /> Prescription verified
              </li>
              <li>
                <Icon name="snow" size={18} /> Cold-chain safe
              </li>
              <li>
                <Icon name="stamp" size={18} /> Customs cleared
              </li>
            </ul>

            <div className="md-hero-actions">
              <button type="button" className="md-btn" onClick={goToForm}>
                <Icon name="upload" size={18} /> Upload Prescription
              </button>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="md-btn md-btn--wa">
                <WhatsAppIcon /> Ask a Pharmacist
              </a>
            </div>
          </div>

          {/* Order tracking card */}
          <div className="md-track" aria-label="Example medicine order">
            <div className="md-track-head">
              <div>
                <small>Order</small>
                <strong>MED-204518</strong>
              </div>
              <span className="md-temp">
                <Icon name="thermo" size={16} /> 4.2°C
              </span>
            </div>

            <div className="md-route">
              <div className="md-route-end">
                <span className="md-flag" aria-hidden="true">
                  🇹🇭
                </span>
                <div>
                  <strong>Bangkok</strong>
                  <small>Licensed pharmacy</small>
                </div>
              </div>
              <div className="md-route-line" aria-hidden="true">
                <span className="md-route-plane">
                  <Icon name="plane" size={18} />
                </span>
              </div>
              <div className="md-route-end md-route-end--to">
                <span className="md-flag" aria-hidden="true">
                  🇧🇩
                </span>
                <div>
                  <strong>Dhaka</strong>
                  <small>Your doorstep</small>
                </div>
              </div>
            </div>

            <ol className="md-track-steps">
              {[
                { t: "Prescription verified", s: "done" },
                { t: "Sourced from licensed pharmacy", s: "done" },
                { t: "Cold-chain packed (2–8°C)", s: "done" },
                { t: "Customs clearance", s: "now" },
                { t: "Out for delivery", s: "todo" },
              ].map((x, i) => (
                <li key={x.t} className={`is-${x.s}`} style={{ "--i": i }}>
                  <span className="md-step-dot">{x.s === "done" ? <Icon name="check" size={12} /> : null}</span>
                  {x.t}
                  {x.s === "now" && <em>In progress</em>}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ================= 4 PILLARS ================= */}
      <section className="md-section">
        <div className="md-container">
          <SectionHead
            eyebrow="Why trust us"
            title="Safe, genuine and fully cleared"
            text="Four promises behind every medicine we deliver from Thailand to Bangladesh."
          />
          <div className="md-pillars">
            {pillars.map((p, i) => (
              <Reveal key={p.title} className="md-pillar" delay={i * 0.08}>
                <span className="md-pillar-no">{String(i + 1).padStart(2, "0")}</span>
                <span className="md-pillar-icon">
                  <Icon name={p.icon} size={28} />
                </span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="md-section md-section--soft">
        <div className="md-container">
          <SectionHead
            eyebrow="How it works"
            title="From prescription to your doorstep"
            text="A simple, transparent process. You approve the price before we buy anything."
          />
          <ol className="md-steps">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} className="md-step" delay={i * 0.08}>
                <span className="md-step-icon">
                  <Icon name={s.icon} size={24} />
                  <b>{i + 1}</b>
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="md-section">
        <div className="md-container">
          <SectionHead
            eyebrow="What we can source"
            title="Specialised medicines, on valid prescription"
            text="We focus on medicines that are hard to find or not available in Bangladesh."
          />
          <div className="md-cats">
            {categories.map((c, i) => (
              <Reveal key={c.title} className="md-cat" delay={(i % 4) * 0.06}>
                <span className="md-cat-icon">
                  <Icon name={c.icon} size={24} />
                </span>
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="md-cats-note">
            <Icon name="alert" size={16} /> Can&apos;t find your medicine here? Upload your prescription and our pharmacist will check
            availability for you.
          </p>
        </div>
      </section>

      {/* ================= COLD CHAIN ================= */}
      <section className="md-cold">
        <div className="md-container md-cold-grid">
          <div>
            <SectionHead
              light
              eyebrow="Cold-chain handling"
              title="Temperature-sensitive medicines stay safe, all the way"
              text="Insulin, biologics, vaccines and many cancer medicines lose strength if they get warm. We pack them in validated insulated boxes with ice packs and a temperature logger, from the pharmacy to your hand."
            />
            <div className="md-cold-stats">
              {coldPoints.map((c) => (
                <div key={c.label}>
                  <strong>{c.value}</strong>
                  <span>{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          <Reveal className="md-thermo-card">
            <div className="md-thermo">
              <span className="md-thermo-fill" />
              <span className="md-thermo-bulb" />
            </div>
            <div className="md-thermo-text">
              <small>Live temperature</small>
              <strong>4.2°C</strong>
              <span className="md-safe">
                <Icon name="check" size={14} /> Within safe range (2–8°C)
              </span>
              <ul>
                <li>
                  <Icon name="check" size={14} /> Insulated, sealed packaging
                </li>
                <li>
                  <Icon name="check" size={14} /> Temperature logger in every box
                </li>
                <li>
                  <Icon name="check" size={14} /> Fast customs handling
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= REQUEST FORM ================= */}
      <section className="md-section md-form-wrap" ref={formRef} id="request">
        <div className="md-container md-request">
          <aside className="md-request-info">
            <span className="md-eyebrow">Request a medicine</span>
            <h2>Upload your prescription, get a quote</h2>
            <p>Our pharmacist will verify your prescription and send you the price, availability and delivery time, usually within 24 hours.</p>

            <ul className="md-request-points">
              <li>
                <span>
                  <Icon name="rx" size={18} />
                </span>
                Valid prescription required
              </li>
              <li>
                <span>
                  <Icon name="clock" size={18} />
                </span>
                Quote within 24 hours
              </li>
              <li>
                <span>
                  <Icon name="shield" size={18} />
                </span>
                No payment until you approve
              </li>
            </ul>

            <a href={CONTACT.phoneLink} className="md-call">
              <span>
                <Icon name="phone" size={18} />
              </span>
              <div>
                <small>Talk to a pharmacist</small>
                {CONTACT.phone}
              </div>
            </a>
          </aside>

          {sentRef ? (
            <div className="md-form md-form--done" role="status">
              <span className="md-done-icon">
                <Icon name="check" size={34} />
              </span>
              <h3>Request received!</h3>
              <p>
                Thank you, {form.name.split(" ")[0]}. Our pharmacist will verify your prescription and send you a quote on
                WhatsApp within 24 hours.
              </p>
              <span className="md-ref">
                Reference: <b>{sentRef}</b>
              </span>
              <button type="button" className="md-btn md-btn--ghost" onClick={reset}>
                Request another medicine
              </button>
            </div>
          ) : (
            <form className="md-form" onSubmit={handleSubmit} noValidate>
              <div className="md-fields">
                <label className={`md-field ${errors.name ? "has-error" : ""}`}>
                  <span>
                    Patient name <i>*</i>
                  </span>
                  <input type="text" value={form.name} onChange={setField("name")} placeholder="Full name" autoComplete="name" />
                  {errors.name && <em>{errors.name}</em>}
                </label>
                <label className={`md-field ${errors.phone ? "has-error" : ""}`}>
                  <span>
                    Phone / WhatsApp <i>*</i>
                  </span>
                  <input type="tel" value={form.phone} onChange={setField("phone")} placeholder="+880 1XXX-XXXXXX" autoComplete="tel" />
                  {errors.phone && <em>{errors.phone}</em>}
                </label>
                <label className={`md-field ${errors.email ? "has-error" : ""}`}>
                  <span>Email</span>
                  <input type="email" value={form.email} onChange={setField("email")} placeholder="you@example.com" autoComplete="email" />
                  {errors.email && <em>{errors.email}</em>}
                </label>
                <label className={`md-field ${errors.district ? "has-error" : ""}`}>
                  <span>
                    Delivery district <i>*</i>
                  </span>
                  <select value={form.district} onChange={setField("district")}>
                    <option value="">Select district</option>
                    {districts.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                  {errors.district && <em>{errors.district}</em>}
                </label>
              </div>

              {/* Medicine list */}
              <div className={`md-items ${errors.items ? "has-error" : ""}`}>
                <div className="md-items-head">
                  <span>
                    Medicines <i>*</i>
                  </span>
                  <small>Name, strength &amp; quantity</small>
                </div>
                {items.map((it, i) => (
                  <div key={it.id} className="md-item">
                    <span className="md-item-no">{i + 1}</span>
                    <input
                      type="text"
                      value={it.name}
                      onChange={(e) => setItem(it.id, "name", e.target.value)}
                      placeholder="Medicine name & strength, e.g. Brand 150 mg"
                      aria-label={`Medicine ${i + 1} name`}
                    />
                    <input
                      type="text"
                      className="md-item-qty"
                      value={it.qty}
                      onChange={(e) => setItem(it.id, "qty", e.target.value)}
                      placeholder="Qty"
                      aria-label={`Medicine ${i + 1} quantity`}
                    />
                    <button
                      type="button"
                      className="md-item-remove"
                      onClick={() => removeItem(it.id)}
                      disabled={items.length === 1}
                      aria-label={`Remove medicine ${i + 1}`}
                    >
                      <Icon name="x" size={16} />
                    </button>
                  </div>
                ))}
                <button type="button" className="md-add" onClick={addItem} disabled={items.length >= 10}>
                  <Icon name="plus" size={16} /> Add another medicine
                </button>
                {errors.items && <em>{errors.items}</em>}
              </div>

              {/* Prescription upload */}
              <div className={`md-field md-field--full ${fileError ? "has-error" : ""}`}>
                <span>
                  Prescription <i>*</i>
                </span>
                <label className="md-upload">
                  <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => pickFiles(e.target.files)} />
                  <span className="md-upload-icon">
                    <Icon name="upload" size={24} />
                  </span>
                  <strong>
                    Upload prescription <u>browse</u>
                  </strong>
                  <small>PDF, JPG or PNG · up to 5 files, {MAX_MB} MB each</small>
                </label>
                {files.length > 0 && (
                  <ul className="md-files">
                    {files.map((f, i) => (
                      <li key={`${f.name}-${i}`}>
                        <Icon name="file" size={15} />
                        <span>{f.name}</span>
                        <button
                          type="button"
                          aria-label={`Remove ${f.name}`}
                          onClick={() => setFiles((list) => list.filter((_, k) => k !== i))}
                        >
                          <Icon name="x" size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {fileError && <em>{fileError}</em>}
              </div>

              <div className="md-fields">
                <label className="md-field">
                  <span>Prescribing doctor / hospital</span>
                  <input type="text" value={form.doctor} onChange={setField("doctor")} placeholder="e.g. Dr. Name, Hospital" />
                </label>
                <div className="md-field">
                  <span>How soon do you need it?</span>
                  <div className="md-radios" role="radiogroup" aria-label="How soon do you need it?">
                    {["Regular", "Urgent"].map((u) => (
                      <button
                        key={u}
                        type="button"
                        role="radio"
                        aria-checked={form.urgency === u}
                        className={form.urgency === u ? "is-on" : ""}
                        onClick={() => setForm((f) => ({ ...f, urgency: u }))}
                      >
                        {u === "Urgent" && <Icon name="clock" size={15} />} {u}
                      </button>
                    ))}
                  </div>
                </div>
                <label className="md-field md-field--full">
                  <span>Notes (optional)</span>
                  <textarea rows="3" value={form.notes} onChange={setField("notes")} placeholder="Anything we should know, e.g. needs cold storage, last purchase details" />
                </label>
              </div>

              <label className={`md-check ${errors.agree ? "has-error" : ""}`}>
                <input type="checkbox" checked={form.agree} onChange={setField("agree")} />
                <span className="md-check-box" aria-hidden="true">
                  <Icon name="check" size={13} />
                </span>
                I confirm this is a valid prescription from a registered doctor and the medicine is for the named patient.
              </label>
              {errors.agree && <em className="md-check-error">{errors.agree}</em>}

              <button type="submit" className="md-btn md-btn--full">
                Request a Quote <Icon name="arrow" size={18} />
              </button>
              <p className="md-form-note">No payment now. We confirm price and delivery time first.</p>
            </form>
          )}
        </div>
      </section>

      {/* ================= NOTICE ================= */}
      <section className="md-notice-wrap">
        <div className="md-container">
          <Reveal className="md-notice">
            <span className="md-notice-icon">
              <Icon name="alert" size={24} />
            </span>
            <div>
              <h3>Important to know</h3>
              <ul>
                <li>We supply prescription medicines only against a valid prescription from a registered doctor.</li>
                <li>We do not supply narcotics, controlled substances, or medicines that cannot be legally imported into Bangladesh.</li>
                <li>We do not give medical advice. Please follow your doctor&apos;s instructions on how to use any medicine.</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="md-section">
        <div className="md-container md-faq-wrap">
          <SectionHead eyebrow="FAQ" title="Questions about medicine delivery" />
          <div className="md-faqs">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className={`md-faq ${open ? "is-open" : ""}`}>
                  <button type="button" aria-expanded={open} aria-controls={`md-faq-${i}`} onClick={() => setOpenFaq(open ? -1 : i)}>
                    {f.q}
                    <span className="md-faq-icon">
                      <Icon name="plus" size={18} />
                    </span>
                  </button>
                  <div className="md-faq-body" id={`md-faq-${i}`}>
                    <div>
                      <p>{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Reveal className="md-cta">
            <div>
              <h2>Need a medicine that&apos;s hard to find?</h2>
              <p>Send your prescription today. Our pharmacist will check availability for free.</p>
            </div>
            <div className="md-cta-actions">
              <button type="button" className="md-btn md-btn--white" onClick={goToForm}>
                <Icon name="upload" size={18} /> Upload Prescription
              </button>
              <Link to="/services/medical-consultation" className="md-cta-link">
                Need a doctor first? <Icon name="arrow" size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default Medicine;
