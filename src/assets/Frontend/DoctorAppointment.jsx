import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/DoctorAppointment.css";

/* ---------------------------- DATA ---------------------------- */
// Shob list SAMPLE. Tomar asol specialty, desh ar time slot onujayi edit koro
const appointmentTypes = [
  { id: "in-person", title: "In-person Visit", text: "Meet the doctor at a partner hospital", icon: "hospital" },
  { id: "online", title: "Online Video Call", text: "Consult from home, no travel needed", icon: "video" },
];

const specialties = [
  "Cardiology",
  "Oncology",
  "Orthopedics",
  "Neurology",
  "Nephrology & Urology",
  "Gastroenterology",
  "Fertility & IVF",
  "Eye Care",
  "Dental",
  "Cosmetic Surgery",
  "General Medicine",
  "Not sure",
];

const countries = ["Bangladesh", "India", "Thailand", "Malaysia", "China", "Any, suggest for me"];

const timeSlots = [
  { group: "Morning", times: ["9:00 AM", "10:00 AM", "11:00 AM"] },
  { group: "Afternoon", times: ["2:00 PM", "3:00 PM", "4:00 PM"] },
  { group: "Evening", times: ["6:00 PM", "7:00 PM"] },
];

const stepLabels = ["Appointment", "Date & Time", "Your Details"];

const howItWorks = [
  { no: "1", title: "Fill the booking form", text: "Choose your specialty, preferred date, and share a few details." },
  { no: "2", title: "We confirm with you", text: "Our team calls you to confirm the doctor, time, and any documents." },
  { no: "3", title: "Meet your doctor", text: "Attend your appointment with our coordinator supporting you." },
];

const bringList = [
  "Previous medical reports and test results",
  "Imaging such as X-ray, CT, or MRI",
  "Current medicines or prescriptions",
  "Passport or ID (for hospital visits abroad)",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/* ---------------------------- HELPERS ---------------------------- */
// Kal theke porer 14 din
const buildDates = () => {
  const list = [];
  const today = new Date();
  for (let i = 1; i <= 14; i += 1) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    list.push({ key, day: DAYS[d.getDay()], date: d.getDate(), month: MONTHS[d.getMonth()], full: d });
  }
  return list;
};

const formatFull = (d) =>
  d.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

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
    case "hospital":
      return (
        <svg {...p}>
          <rect x="4" y="4" width="16" height="17" rx="2" />
          <path d="M12 8v6M9 11h6M10 21v-4h4v4" />
        </svg>
      );
    case "video":
      return (
        <svg {...p}>
          <rect x="3" y="6" width="13" height="12" rx="2" />
          <path d="M16 10l5-3v10l-5-3" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...p}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M8 3v4M16 3v4M3 10h18" />
        </svg>
      );
    case "clock":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "doctor":
      return (
        <svg {...p}>
          <circle cx="12" cy="7" r="3.5" />
          <path d="M5 21c0-4 3-6.5 7-6.5s7 2.5 7 6.5" />
          <path d="M12 14.5v3M10.5 16h3" />
        </svg>
      );
    case "pin":
      return (
        <svg {...p}>
          <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "user":
      return (
        <svg {...p}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c1.5-4 5-5 8-5s6.5 1 8 5" />
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

const ArrowIcon = ({ dir = "right" }) => (
  <svg {...base} width="15" height="15" strokeWidth="2">
    {dir === "right" ? <path d="M5 12h14M13 6l6 6-6 6" /> : <path d="M19 12H5M11 6l-6 6 6 6" />}
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
      className={`da-reveal ${shown ? "is-shown" : ""} ${className}`}
      style={{ "--d": `${delay}s` }}
    >
      {children}
    </div>
  );
};

/* ---------------------------- PAGE ---------------------------- */
const initial = {
  type: "in-person",
  specialty: "",
  country: "",
  dateKey: "",
  time: "",
  name: "",
  age: "",
  phone: "",
  email: "",
  notes: "",
};

const DoctorAppointment = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success
  const [refId, setRefId] = useState("");
  const formRef = useRef(null);

  const dates = useMemo(buildDates, []);
  const selectedDate = dates.find((d) => d.key === data.dateKey);
  const selectedType = appointmentTypes.find((t) => t.id === data.type);

  const set = (name, value) => {
    setData((d) => ({ ...d, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const handleInput = (e) => set(e.target.name, e.target.value);

  const validate = (s) => {
    const er = {};
    if (s === 0) {
      if (!data.specialty) er.specialty = "Please select a specialty";
      if (data.type === "in-person" && !data.country) er.country = "Please select a preferred country";
    }
    if (s === 1) {
      if (!data.dateKey) er.dateKey = "Please pick a date";
      if (!data.time) er.time = "Please pick a time";
    }
    if (s === 2) {
      if (!data.name.trim()) er.name = "Please enter your name";
      if (!/^[+\d][\d\s-]{6,}$/.test(data.phone.trim())) er.phone = "Enter a valid phone number";
      if (data.email.trim() && !/^\S+@\S+\.\S+$/.test(data.email.trim())) er.email = "Enter a valid email";
    }
    return er;
  };

  const scrollToForm = () => {
    // Step bodlale form er upore niye jabe (mobile e dorkar)
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goNext = () => {
    const er = validate(step);
    setErrors(er);
    if (Object.keys(er).length) return;
    setStep((s) => s + 1);
    scrollToForm();
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
    scrollToForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const er = validate(2);
    setErrors(er);
    if (Object.keys(er).length) return;

    setStatus("sending");
    /* EKHANE tomar backend / API call boshao. Ekhon shudhu demo. Jemon:
       await fetch("/api/appointments", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(data) }); */
    await new Promise((r) => setTimeout(r, 1000));
    setRefId(`AMC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
    setStatus("success");
    scrollToForm();
  };

  const reset = () => {
    setData(initial);
    setErrors({});
    setStep(0);
    setStatus("idle");
  };

  const progress = status === "success" ? 100 : ((step + 1) / stepLabels.length) * 100;

  /* ---- Summary rows (live update) ---- */
  const summary = [
    { icon: selectedType?.icon || "hospital", label: "Type", value: selectedType?.title },
    { icon: "doctor", label: "Specialty", value: data.specialty },
    data.type === "in-person" && { icon: "pin", label: "Country", value: data.country },
    { icon: "calendar", label: "Date", value: selectedDate ? formatFull(selectedDate.full) : "" },
    { icon: "clock", label: "Time", value: data.time },
    { icon: "user", label: "Patient", value: data.name },
  ].filter(Boolean);

  return (
    <main className="da-page">
      {/* ================= HERO ================= */}
      <section className="da-hero">
        <div className="da-blob da-blob--one" aria-hidden="true" />
        <div className="da-blob da-blob--two" aria-hidden="true" />

        <div className="da-container da-hero-inner">
          <span className="da-badge da-in" style={{ "--d": "0s" }}>Doctor Appointment</span>
          <h1 className="da-hero-title da-in" style={{ "--d": "0.1s" }}>
            Book your appointment <em>in 3 easy steps</em>
          </h1>
          <p className="da-hero-desc da-in" style={{ "--d": "0.2s" }}>
            Choose a specialty, pick a time that suits you, and our team will confirm your doctor and guide you
            before the visit.
          </p>
        </div>
      </section>

      {/* ================= BOOKING ================= */}
      <section className="da-booking">
        <div className="da-container da-layout">
          {/* ---- Wizard ---- */}
          <div className="da-card da-in" style={{ "--d": "0.25s" }} ref={formRef}>
            {/* Progress */}
            <div className="da-progress" aria-hidden="true">
              <span style={{ width: `${progress}%` }} />
            </div>

            {status === "success" ? (
              <div className="da-success" role="status">
                <span className="da-success-icon"><Icon name="check" size={34} /></span>
                <h2>Appointment request sent!</h2>
                <p>
                  Thank you, {data.name.split(" ")[0] || "dear patient"}. Our team will call you soon to confirm
                  your doctor and time.
                </p>
                <div className="da-ref">
                  Reference ID <strong>{refId}</strong>
                </div>
                <div className="da-success-actions">
                  <button type="button" className="da-btn" onClick={reset}>
                    Book another appointment
                  </button>
                  <Link to="/" className="da-btn da-btn--ghost">Back to Home</Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Step indicator */}
                <ol className="da-steps" aria-label="Booking progress">
                  {stepLabels.map((label, i) => (
                    <li
                      key={label}
                      className={`${i === step ? "is-current" : ""} ${i < step ? "is-done" : ""}`}
                      aria-current={i === step ? "step" : undefined}
                    >
                      <span className="da-step-dot">{i < step ? <Icon name="check" size={14} /> : i + 1}</span>
                      <span className="da-step-label">{label}</span>
                    </li>
                  ))}
                </ol>

                {/* ===== STEP 1 ===== */}
                {step === 0 && (
                  <div className="da-panel" key="s0">
                    <h2>What kind of appointment do you need?</h2>

                    <div className="da-types" role="radiogroup" aria-label="Appointment type">
                      {appointmentTypes.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          role="radio"
                          aria-checked={data.type === t.id}
                          className={`da-type ${data.type === t.id ? "is-active" : ""}`}
                          onClick={() => set("type", t.id)}
                        >
                          <span className="da-type-icon"><Icon name={t.icon} /></span>
                          <span>
                            <strong>{t.title}</strong>
                            <small>{t.text}</small>
                          </span>
                        </button>
                      ))}
                    </div>

                    <p className="da-group-title">Select a specialty</p>
                    <div className="da-chips" role="radiogroup" aria-label="Specialty">
                      {specialties.map((s) => (
                        <button
                          key={s}
                          type="button"
                          role="radio"
                          aria-checked={data.specialty === s}
                          className={`da-chip ${data.specialty === s ? "is-active" : ""}`}
                          onClick={() => set("specialty", s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    {errors.specialty && <span className="da-error">{errors.specialty}</span>}

                    {data.type === "in-person" && (
                      <div className={`da-field ${errors.country ? "has-error" : ""}`}>
                        <label htmlFor="da-country">Preferred country</label>
                        <select id="da-country" name="country" value={data.country} onChange={handleInput}>
                          <option value="">Select a country</option>
                          {countries.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        {errors.country && <span className="da-error">{errors.country}</span>}
                      </div>
                    )}
                  </div>
                )}

                {/* ===== STEP 2 ===== */}
                {step === 1 && (
                  <div className="da-panel" key="s1">
                    <h2>Pick a date and time</h2>

                    <p className="da-group-title">Available dates</p>
                    <div className="da-dates" role="radiogroup" aria-label="Date">
                      {dates.map((d) => (
                        <button
                          key={d.key}
                          type="button"
                          role="radio"
                          aria-checked={data.dateKey === d.key}
                          className={`da-date ${data.dateKey === d.key ? "is-active" : ""}`}
                          onClick={() => set("dateKey", d.key)}
                        >
                          <small>{d.day}</small>
                          <strong>{d.date}</strong>
                          <span>{d.month}</span>
                        </button>
                      ))}
                    </div>
                    {errors.dateKey && <span className="da-error">{errors.dateKey}</span>}

                    <p className="da-group-title">Preferred time</p>
                    {timeSlots.map((g) => (
                      <div className="da-slot-group" key={g.group}>
                        <span className="da-slot-name">{g.group}</span>
                        <div className="da-slots" role="radiogroup" aria-label={`${g.group} time`}>
                          {g.times.map((t) => (
                            <button
                              key={t}
                              type="button"
                              role="radio"
                              aria-checked={data.time === t}
                              className={`da-slot ${data.time === t ? "is-active" : ""}`}
                              onClick={() => set("time", t)}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                    {errors.time && <span className="da-error">{errors.time}</span>}
                    <p className="da-note">Final time is confirmed by our team after we check doctor availability.</p>
                  </div>
                )}

                {/* ===== STEP 3 ===== */}
                {step === 2 && (
                  <div className="da-panel" key="s2">
                    <h2>Tell us about the patient</h2>

                    <div className="da-row">
                      <div className={`da-field ${errors.name ? "has-error" : ""}`}>
                        <label htmlFor="da-name">Full Name *</label>
                        <input id="da-name" name="name" type="text" placeholder="Patient's full name" value={data.name} onChange={handleInput} />
                        {errors.name && <span className="da-error">{errors.name}</span>}
                      </div>
                      <div className="da-field">
                        <label htmlFor="da-age">Age</label>
                        <input id="da-age" name="age" type="number" min="0" max="120" placeholder="Age" value={data.age} onChange={handleInput} />
                      </div>
                    </div>

                    <div className="da-row">
                      <div className={`da-field ${errors.phone ? "has-error" : ""}`}>
                        <label htmlFor="da-phone">Phone *</label>
                        <input id="da-phone" name="phone" type="tel" placeholder="+880 1XXX-XXXXXX" value={data.phone} onChange={handleInput} />
                        {errors.phone && <span className="da-error">{errors.phone}</span>}
                      </div>
                      <div className={`da-field ${errors.email ? "has-error" : ""}`}>
                        <label htmlFor="da-email">Email</label>
                        <input id="da-email" name="email" type="email" placeholder="you@example.com" value={data.email} onChange={handleInput} />
                        {errors.email && <span className="da-error">{errors.email}</span>}
                      </div>
                    </div>

                    <div className="da-field">
                      <label htmlFor="da-notes">Health concern (optional)</label>
                      <textarea id="da-notes" name="notes" rows="4" placeholder="Briefly describe the problem or what you want to discuss" value={data.notes} onChange={handleInput} />
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="da-actions">
                  {step > 0 ? (
                    <button type="button" className="da-btn da-btn--ghost" onClick={goBack}>
                      <ArrowIcon dir="left" /> Back
                    </button>
                  ) : (
                    <span />
                  )}

                  {step < stepLabels.length - 1 ? (
                    <button type="button" className="da-btn" onClick={goNext}>
                      Continue <ArrowIcon />
                    </button>
                  ) : (
                    <button type="submit" className="da-btn" disabled={status === "sending"}>
                      {status === "sending" ? (
                        <>
                          <span className="da-spinner" aria-hidden="true" /> Sending...
                        </>
                      ) : (
                        <>
                          Confirm Request <Icon name="check" size={16} />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* ---- Summary ---- */}
          <aside className="da-side da-in" style={{ "--d": "0.4s" }}>
            <div className="da-summary">
              <h3>Your appointment</h3>
              <ul>
                {summary.map((row) => (
                  <li key={row.label} className={row.value ? "is-filled" : ""}>
                    <span className="da-sum-icon"><Icon name={row.icon} size={18} /></span>
                    <div>
                      <small>{row.label}</small>
                      <strong>{row.value || "Not selected yet"}</strong>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="da-help">
              <h3>Need help booking?</h3>
              <p>Our team is happy to book it for you over the phone.</p>
              <Link to="/contact" className="da-btn da-btn--white da-btn--block">
                Contact Us
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="da-section">
        <div className="da-container">
          <Reveal className="da-head">
            <span className="da-label">How It Works</span>
            <h2 className="da-title">From booking to your visit</h2>
          </Reveal>

          <div className="da-how">
            {howItWorks.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.1} className="da-how-item">
                <span className="da-how-no">{h.no}</span>
                <h3>{h.title}</h3>
                <p>{h.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BRING ================= */}
      <section className="da-section da-section--soft">
        <div className="da-container da-bring">
          <Reveal className="da-bring-text">
            <span className="da-label">Be Prepared</span>
            <h2 className="da-title">What to bring to your appointment</h2>
            <p>
              Having your records ready helps the doctor understand your condition quickly and give you better
              advice.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="da-bring-list">
            <ul>
              {bringList.map((b) => (
                <li key={b}>
                  <span className="da-tick"><Icon name="check" size={13} /></span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default DoctorAppointment;