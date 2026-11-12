import React, { useEffect, useRef, useState } from "react";
import "../../Css/Contact.css";

/* ---------------------------- DATA ---------------------------- */
// Ei tothyo gulo tomar asol tothyo diye replace koro
const contactInfo = {
  phone: "+880 1700-000000",
  whatsapp: "8801700000000", // country code soho, + ar space chara
  email: "info@akashbarimedical.com",
  address: "House 00, Road 00, Dhaka, Bangladesh",
  hours: "Sat - Thu: 9:00 AM - 8:00 PM",
};

const services = [
  "Health Card",
  "Medical Consultation",
  "Tele Consultation",
  "Doctor Appointment",
  "Medical Visa Assistance",
  "Air Ticket",
  "Medical Accommodation",
  "Patient Support Service",
  "Air Ambulance Service",
  "Transport",
  "Training & Development",
  "Other",
];

const perks = [
  { title: "Quick Response", text: "We reply to every message as soon as possible." },
  { title: "Free Guidance", text: "Get clear advice on hospitals, cost, and next steps." },
  { title: "Fully Confidential", text: "Your medical information stays private and safe." },
];

/* ---------------------------- ICONS ---------------------------- */
const base = {
  viewBox: "0 0 24 24",
  width: 20,
  height: 20,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const Icon = ({ name, size }) => {
  const props = size ? { ...base, width: size, height: size } : base;
  switch (name) {
    case "phone":
      return (
        <svg {...props}>
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      );
    case "pin":
      return (
        <svg {...props}>
          <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "clock":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "send":
      return (
        <svg {...props}>
          <path d="M21 3L10 14" />
          <path d="M21 3l-7 18-4-7-7-4 18-7z" />
        </svg>
      );
    case "chat":
      return (
        <svg {...props}>
          <path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1z" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      );
  }
};

/* ------------------- Scroll reveal ------------------- */
const Reveal = ({ children, className = "", direction = "up", delay = 0 }) => {
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
      className={`ct-reveal ct-reveal--${direction} ${shown ? "is-shown" : ""} ${className}`}
      style={{ "--d": `${delay}s` }}
    >
      {children}
    </div>
  );
};

/* ---------------------------- PAGE ---------------------------- */
const emptyForm = { name: "", phone: "", email: "", service: "", message: "" };

const Contact = () => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Please enter your name";
    if (!/^[+\d][\d\s-]{6,}$/.test(form.phone.trim())) er.phone = "Please enter a valid phone number";
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) er.email = "Please enter a valid email";
    if (form.message.trim().length < 10) er.message = "Please write at least 10 characters";
    return er;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;

    setStatus("sending");
    try {
      /* ------------------------------------------------------------
         EKHANE tomar backend / API call boshao. Jemon:
         await fetch("/api/contact", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify(form),
         });
         Ekhon shudhu demo, tai 1 second por success dekhay.
      ------------------------------------------------------------ */
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setForm(emptyForm);
    } catch (err) {
      setStatus("error");
    }
  };

  const whatsappLink = `https://wa.me/${contactInfo.whatsapp}`;

  return (
    <main className="ct-page">
      {/* ================= HERO ================= */}
      <section className="ct-hero">
        <div className="ct-blob ct-blob--one" aria-hidden="true" />
        <div className="ct-blob ct-blob--two" aria-hidden="true" />

        <div className="ct-container ct-hero-inner">
          <span className="ct-badge ct-in" style={{ "--d": "0s" }}>Contact Us</span>
          <h1 className="ct-hero-title ct-in" style={{ "--d": "0.1s" }}>
            We&apos;re here to help you <em>get the right care</em>
          </h1>
          <p className="ct-hero-desc ct-in" style={{ "--d": "0.2s" }}>
            Have a question about treatment, hospitals, visa, or travel? Send us a message and our team will
            guide you.
          </p>
        </div>
      </section>

      {/* ================= MAIN CARD ================= */}
      <section className="ct-main">
        <div className="ct-container">
          <div className="ct-card">
            {/* ---- Info panel ---- */}
            <Reveal direction="left" className="ct-info">
              <h2>Get in touch</h2>
              <p>Reach us directly or fill in the form. We will get back to you shortly.</p>

              <ul className="ct-info-list">
                <li>
                  <span className="ct-ico"><Icon name="phone" /></span>
                  <div>
                    <small>Phone</small>
                    <a href={`tel:${contactInfo.phone.replace(/[^\d+]/g, "")}`}>{contactInfo.phone}</a>
                  </div>
                </li>
                <li>
                  <span className="ct-ico"><Icon name="mail" /></span>
                  <div>
                    <small>Email</small>
                    <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                  </div>
                </li>
                <li>
                  <span className="ct-ico"><Icon name="pin" /></span>
                  <div>
                    <small>Address</small>
                    <span>{contactInfo.address}</span>
                  </div>
                </li>
                <li>
                  <span className="ct-ico"><Icon name="clock" /></span>
                  <div>
                    <small>Working Hours</small>
                    <span>{contactInfo.hours}</span>
                  </div>
                </li>
              </ul>

              <a href={whatsappLink} target="_blank" rel="noreferrer" className="ct-wa">
                <Icon name="chat" /> Chat on WhatsApp
              </a>

              <span className="ct-ring ct-ring--one" aria-hidden="true" />
              <span className="ct-ring ct-ring--two" aria-hidden="true" />
            </Reveal>

            {/* ---- Form ---- */}
            <Reveal direction="right" className="ct-form-wrap">
              {status === "success" ? (
                <div className="ct-success" role="status">
                  <span className="ct-success-icon"><Icon name="check" size={34} /></span>
                  <h3>Message sent!</h3>
                  <p>Thank you for contacting us. Our team will reach out to you very soon.</p>
                  <button type="button" className="ct-btn" onClick={() => setStatus("idle")}>
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h2>Send us a message</h2>
                  <p className="ct-form-sub">Fields marked with * are required.</p>

                  <div className="ct-row">
                    <div className={`ct-field ${errors.name ? "has-error" : ""}`}>
                      <label htmlFor="ct-name">Full Name *</label>
                      <input
                        id="ct-name"
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleChange}
                      />
                      {errors.name && <span className="ct-error">{errors.name}</span>}
                    </div>

                    <div className={`ct-field ${errors.phone ? "has-error" : ""}`}>
                      <label htmlFor="ct-phone">Phone *</label>
                      <input
                        id="ct-phone"
                        name="phone"
                        type="tel"
                        placeholder="+880 1XXX-XXXXXX"
                        value={form.phone}
                        onChange={handleChange}
                      />
                      {errors.phone && <span className="ct-error">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="ct-row">
                    <div className={`ct-field ${errors.email ? "has-error" : ""}`}>
                      <label htmlFor="ct-email">Email</label>
                      <input
                        id="ct-email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                      />
                      {errors.email && <span className="ct-error">{errors.email}</span>}
                    </div>

                    <div className="ct-field">
                      <label htmlFor="ct-service">Service</label>
                      <select id="ct-service" name="service" value={form.service} onChange={handleChange}>
                        <option value="">Select a service</option>
                        {services.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className={`ct-field ${errors.message ? "has-error" : ""}`}>
                    <label htmlFor="ct-message">Message *</label>
                    <textarea
                      id="ct-message"
                      name="message"
                      rows="5"
                      placeholder="Tell us about your condition or what you need help with"
                      value={form.message}
                      onChange={handleChange}
                    />
                    {errors.message && <span className="ct-error">{errors.message}</span>}
                  </div>

                  {status === "error" && (
                    <p className="ct-alert" role="alert">
                      Something went wrong. Please try again or call us directly.
                    </p>
                  )}

                  <button type="submit" className="ct-btn ct-btn--block" disabled={status === "sending"}>
                    {status === "sending" ? (
                      <>
                        <span className="ct-spinner" aria-hidden="true" /> Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Icon name="send" size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= PERKS ================= */}
      <section className="ct-perks">
        <div className="ct-container ct-perks-grid">
          {perks.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1} className="ct-perk">
              <span className="ct-perk-tick"><Icon name="check" size={16} /></span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Contact;