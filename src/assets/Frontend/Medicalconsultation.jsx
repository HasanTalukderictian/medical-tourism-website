import  { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/MedicalConsultation.css";

/* ---------------------------- IMAGES ----------------------------
   Image pele import kore null er jaygay boshao. Jemon:
   import overviewImg from "../Image/consultation/overview.jpg";
   Image na thakle sundor placeholder dekhabe.
------------------------------------------------------------------- */
const overviewImg = null;

/* ---------------------------- DATA ---------------------------- */
// Shob likha SAMPLE. Tomar asol service onujayi edit koro
const trustPoints = ["Experienced specialists", "Partner hospitals in 5 countries", "Transparent cost estimate"];

const specialtyOptions = [
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
  "Other / Not sure",
];

const highlights = [
  { icon: "doctor", title: "Right Specialist", text: "We match your condition with doctors who have the right experience." },
  { icon: "hospital", title: "Trusted Hospitals", text: "Choose from carefully selected partner hospitals across Asia." },
  { icon: "wallet", title: "Clear Cost", text: "Get a transparent estimate before you decide to travel." },
  { icon: "support", title: "Personal Support", text: "A dedicated coordinator stays with you from start to finish." },
];

const offers = [
  { icon: "file", title: "Case Review", text: "Our team studies your reports and history so your case is clear before the consultation." },
  { icon: "doctor", title: "Specialist Matching", text: "We suggest the most suitable doctors and hospitals for your diagnosis and budget." },
  { icon: "calendar", title: "Appointment Booking", text: "We schedule your consultation at a time that works for you, in person or online." },
  { icon: "wallet", title: "Treatment Plan & Cost", text: "Receive a clear treatment direction with an estimated cost and stay duration." },
  { icon: "language", title: "Interpreter & Coordinator", text: "Language support and a guide who helps you at every visit." },
  { icon: "heart", title: "Follow-up Care", text: "We help with follow-up visits and reports after your treatment is done." },
];

const steps = [
  { title: "Share Your Case", text: "Tell us about your condition and send your medical reports." },
  { title: "Expert Review", text: "Our team reviews your records and suggests suitable options." },
  { title: "Choose Doctor & Hospital", text: "Compare options and pick the one that fits you best." },
  { title: "Book Consultation", text: "We confirm your appointment, visa, travel, and stay." },
  { title: "Consult & Follow-up", text: "Meet your doctor with our support, then continue care after treatment." },
];

const whyPoints = [
  "Guidance in your own language",
  "No hidden charges, clear estimates",
  "Visa, travel, and stay arranged for you",
  "Your information stays private and safe",
];

const faqs = [
  {
    q: "Do I need to travel for a consultation?",
    a: "Not always. You can start with an online review or video consultation, and travel only if the doctor recommends treatment abroad.",
  },
  {
    q: "What reports should I bring or send?",
    a: "Your diagnosis reports, lab tests, imaging (X-ray, CT, MRI), previous prescriptions, and treatment history. Our team will tell you if more is needed.",
  },
  {
    q: "How soon can I get an appointment?",
    a: "It depends on the doctor and hospital. After reviewing your case, we confirm the earliest suitable date for you.",
  },
  {
    q: "Is there a fee for guidance?",
    a: "You can contact us to discuss your case first. We explain clearly if any service fee applies before you decide to continue.",
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

const Icon = ({ name, size = 26 }) => {
  const p = { ...base, width: size, height: size };
  switch (name) {
    case "doctor":
      return (
        <svg {...p}>
          <circle cx="12" cy="7" r="3.5" />
          <path d="M5 21c0-4 3-6.5 7-6.5s7 2.5 7 6.5" />
          <path d="M12 14.5v3M10.5 16h3" />
        </svg>
      );
    case "hospital":
      return (
        <svg {...p}>
          <rect x="4" y="4" width="16" height="17" rx="2" />
          <path d="M12 8v6M9 11h6M10 21v-4h4v4" />
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
    case "file":
      return (
        <svg {...p}>
          <path d="M7 3h7l5 5v13H7z" />
          <path d="M14 3v5h5M10 13h6M10 17h6" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...p}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M8 3v4M16 3v4M3 10h18" />
        </svg>
      );
    case "language":
      return (
        <svg {...p}>
          <path d="M4 5h9M8.5 3v2M6 5c.5 4 3 7 6 8M11 5c-.5 3-3 6-6.5 8" />
          <path d="M13 21l4-10 4 10M14.5 18h5" />
        </svg>
      );
    default:
      return (
        <svg {...p}>
          <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
        </svg>
      );
  }
};

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

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
  <svg {...base} width="40" height="40" strokeWidth="1.6">
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
      className={`mc-reveal mc-reveal--${direction} ${shown ? "is-shown" : ""} ${className}`}
      style={{ "--d": `${delay}s` }}
    >
      {children}
    </div>
  );
};

const Pic = ({ src, alt, className = "" }) => {
  const [failed, setFailed] = useState(!src);
  return (
    <div className={`mc-pic ${failed ? "mc-pic--empty" : ""} ${className}`}>
      {failed ? <ImageIcon /> : <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />}
    </div>
  );
};

/* ---------------------------- PAGE ---------------------------- */
const emptyForm = { name: "", phone: "", specialty: "" };

const MedicalConsultation = () => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success
  const [openFaq, setOpenFaq] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = "Please enter your name";
    if (!/^[+\d][\d\s-]{6,}$/.test(form.phone.trim())) er.phone = "Enter a valid phone number";
    if (!form.specialty) er.specialty = "Please select a specialty";
    setErrors(er);
    if (Object.keys(er).length) return;

    setStatus("sending");
    /* EKHANE tomar backend / API call boshao. Ekhon shudhu demo. Jemon:
       await fetch("/api/consultation", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(form) }); */
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
    setForm(emptyForm);
  };

  return (
    <main className="mc-page">
      {/* ================= HERO ================= */}
      <section className="mc-hero">
        <div className="mc-blob mc-blob--one" aria-hidden="true" />
        <div className="mc-blob mc-blob--two" aria-hidden="true" />

        <div className="mc-container mc-hero-grid">
          <div className="mc-hero-text">
            <span className="mc-badge mc-in" style={{ "--d": "0s" }}>Medical Consultation</span>
            <h1 className="mc-hero-title mc-in" style={{ "--d": "0.1s" }}>
              Consult the right specialist, <em>with expert guidance</em>
            </h1>
            <p className="mc-hero-desc mc-in" style={{ "--d": "0.2s" }}>
              We help you understand your condition, choose the best doctor and hospital, and book your
              consultation, so you can decide about treatment with confidence.
            </p>

            <ul className="mc-trust mc-in" style={{ "--d": "0.3s" }}>
              {trustPoints.map((t) => (
                <li key={t}>
                  <span className="mc-tick"><CheckIcon /></span>
                  {t}
                </li>
              ))}
            </ul>

            <div className="mc-hero-actions mc-in" style={{ "--d": "0.4s" }}>
              <Link to="/services/doctor-appointment" className="mc-btn">
                Book Appointment <ArrowIcon />
              </Link>
              <Link to="/services/tele-consultation" className="mc-btn mc-btn--ghost">
                Try Online Consultation
              </Link>
            </div>
          </div>

          {/* ---- Quick request form ---- */}
          <div className="mc-form-card mc-in" style={{ "--d": "0.3s" }}>
            {status === "success" ? (
              <div className="mc-success" role="status">
                <span className="mc-success-icon"><CheckIcon /></span>
                <h3>Request received!</h3>
                <p>Thank you. Our team will call you very soon to discuss your case.</p>
                <button type="button" className="mc-btn mc-btn--block" onClick={() => setStatus("idle")}>
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h2>Request a free consultation</h2>
                <p className="mc-form-sub">Share a few details and we will call you back.</p>

                <div className={`mc-field ${errors.name ? "has-error" : ""}`}>
                  <label htmlFor="mc-name">Full Name</label>
                  <input
                    id="mc-name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                  />
                  {errors.name && <span className="mc-error">{errors.name}</span>}
                </div>

                <div className={`mc-field ${errors.phone ? "has-error" : ""}`}>
                  <label htmlFor="mc-phone">Phone Number</label>
                  <input
                    id="mc-phone"
                    name="phone"
                    type="tel"
                    placeholder="+880 1XXX-XXXXXX"
                    value={form.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <span className="mc-error">{errors.phone}</span>}
                </div>

                <div className={`mc-field ${errors.specialty ? "has-error" : ""}`}>
                  <label htmlFor="mc-specialty">Specialty Needed</label>
                  <select id="mc-specialty" name="specialty" value={form.specialty} onChange={handleChange}>
                    <option value="">Select a specialty</option>
                    {specialtyOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.specialty && <span className="mc-error">{errors.specialty}</span>}
                </div>

                <button type="submit" className="mc-btn mc-btn--block" disabled={status === "sending"}>
                  {status === "sending" ? (
                    <>
                      <span className="mc-spinner" aria-hidden="true" /> Sending...
                    </>
                  ) : (
                    <>
                      Request Call Back <ArrowIcon />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ================= HIGHLIGHTS ================= */}
      <section className="mc-highlights">
        <div className="mc-container">
          <div className="mc-highlights-grid">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.1} className="mc-highlight">
                <span className="mc-ico"><Icon name={h.icon} size={24} /></span>
                <div>
                  <h3>{h.title}</h3>
                  <p>{h.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHAT WE OFFER ================= */}
      <section className="mc-section">
        <div className="mc-container">
          <Reveal className="mc-head">
            <span className="mc-label">What We Offer</span>
            <h2 className="mc-title">Everything you need before and after your consultation</h2>
            <p className="mc-sub">
              From understanding your reports to follow-up care, our team supports you at every step.
            </p>
          </Reveal>

          <div className="mc-offers">
            {offers.map((o, i) => (
              <Reveal key={o.title} delay={(i % 3) * 0.1} className="mc-offer">
                <span className="mc-offer-icon"><Icon name={o.icon} /></span>
                <h3>{o.title}</h3>
                <p>{o.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="mc-section mc-section--soft">
        <div className="mc-container">
          <Reveal className="mc-head">
            <span className="mc-label">How It Works</span>
            <h2 className="mc-title">Your consultation in 5 simple steps</h2>
          </Reveal>

          <ol className="mc-steps">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1} className="mc-step">
                <span className="mc-step-no">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="mc-section">
        <div className="mc-container mc-why">
          <Reveal direction="left" className="mc-why-media">
            <Pic src={overviewImg} alt="Doctor consultation" className="mc-why-pic" />
            <div className="mc-why-card">
              <strong>One team</strong>
              <span>from first call to follow-up</span>
            </div>
          </Reveal>

          <Reveal direction="right" className="mc-why-text">
            <span className="mc-label">Why Choose Us</span>
            <h2 className="mc-title">A simple, caring path to the right treatment</h2>
            <p>
              Finding the right doctor can feel confusing and stressful. We take that burden off you with
              clear advice, honest costs, and a team that stays with you.
            </p>
            <ul className="mc-points">
              {whyPoints.map((p) => (
                <li key={p}>
                  <span className="mc-tick"><CheckIcon /></span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="mc-section mc-section--soft">
        <div className="mc-container mc-container--narrow">
          <Reveal className="mc-head">
            <span className="mc-label">FAQ</span>
            <h2 className="mc-title">Common questions</h2>
          </Reveal>

          <div className="mc-faq">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={f.q} delay={i * 0.06} className={`mc-faq-item ${open ? "is-open" : ""}`}>
                  <h3>
                    <button
                      type="button"
                      className="mc-faq-q"
                      aria-expanded={open}
                      aria-controls={`mc-faq-a-${i}`}
                      onClick={() => setOpenFaq(open ? null : i)}
                    >
                      <span>{f.q}</span>
                      <span className="mc-chevron"><ChevronIcon /></span>
                    </button>
                  </h3>
                  <div className="mc-faq-a" id={`mc-faq-a-${i}`} role="region">
                    <div className="mc-faq-inner">
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
      <section className="mc-cta-wrap">
        <div className="mc-container">
          <Reveal className="mc-cta">
            <div>
              <h2>Ready to talk to a specialist?</h2>
              <p>Book your consultation today and take the first step toward the right treatment.</p>
            </div>
            <div className="mc-cta-actions">
              <Link to="/services/doctor-appointment" className="mc-btn mc-btn--white">
                Book Appointment <ArrowIcon />
              </Link>
              <Link to="/contact" className="mc-btn mc-btn--outline-white">
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default MedicalConsultation;