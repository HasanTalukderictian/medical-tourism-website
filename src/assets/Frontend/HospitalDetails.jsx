import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "../../Css/HospitalDetails.css";

import {
  hospitals,
  countries,
  getHospital,
  hospitalLink,
  ourSupport,
  HOTLINE,
  HOTLINE_LINK,
  WHATSAPP_LINK,
} from "./hospitalData";
import { Icon, Star, Pic, Reveal, specialtyIcon } from "./HospitalUi";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "specialties", label: "Specialties" },
  { id: "treatments", label: "Treatments" },
  { id: "facilities", label: "Facilities" },
  { id: "gallery", label: "Gallery" },
  { id: "support", label: "Our Support" },
];

const initial = { name: "", phone: "", email: "", specialty: "", message: "" };

/* ---------------------------- QUOTE FORM ---------------------------- */
const QuoteForm = ({ hospital }) => {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success

  // Onno hospital e gele form reset
  useEffect(() => {
    setForm(initial);
    setErrors({});
    setStatus("idle");
  }, [hospital.slug]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = "Please enter patient name";
    if (!/^[+\d][\d\s-]{6,}$/.test(form.phone.trim())) er.phone = "Enter a valid phone number";
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) er.email = "Enter a valid email";
    setErrors(er);
    if (Object.keys(er).length) return;

    setStatus("sending");
    /* EKHANE tomar backend / API call boshao. Jemon:
       await fetch("/api/hospital-quote", { method: "POST", headers: {"Content-Type":"application/json"},
         body: JSON.stringify({ ...form, hospital: hospital.name }) }); */
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="hd-success" role="status">
        <span><Icon name="check" size={30} /></span>
        <h3>Request sent!</h3>
        <p>
          Thank you, {form.name.split(" ")[0]}. Our team will contact you with a free opinion and cost estimate from{" "}
          {hospital.name}.
        </p>
        <button type="button" className="hd-btn hd-btn--block" onClick={() => { setForm(initial); setStatus("idle"); }}>
          Send another request
        </button>
      </div>
    );
  }

  const err = (n) => errors[n] && <span className="hd-error">{errors[n]}</span>;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={`hd-field ${errors.name ? "has-error" : ""}`}>
        <label htmlFor="hd-name">Patient name *</label>
        <input id="hd-name" name="name" placeholder="Full name" value={form.name} onChange={handleInput} />
        {err("name")}
      </div>
      <div className={`hd-field ${errors.phone ? "has-error" : ""}`}>
        <label htmlFor="hd-phone">Phone / WhatsApp *</label>
        <input id="hd-phone" name="phone" type="tel" placeholder="+880 1XXX-XXXXXX" value={form.phone} onChange={handleInput} />
        {err("phone")}
      </div>
      <div className={`hd-field ${errors.email ? "has-error" : ""}`}>
        <label htmlFor="hd-email">Email (optional)</label>
        <input id="hd-email" name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleInput} />
        {err("email")}
      </div>
      <div className="hd-field">
        <label htmlFor="hd-spec">Treatment needed</label>
        <select id="hd-spec" name="specialty" value={form.specialty} onChange={handleInput}>
          <option value="">Not sure</option>
          {hospital.specialties.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="hd-field">
        <label htmlFor="hd-msg">Short note (optional)</label>
        <textarea id="hd-msg" name="message" rows="3" placeholder="Diagnosis, age, when you want to travel" value={form.message} onChange={handleInput} />
      </div>
      <button type="submit" className="hd-btn hd-btn--block" disabled={status === "sending"}>
        {status === "sending" ? (
          <>
            <span className="hd-spinner" aria-hidden="true" /> Sending...
          </>
        ) : (
          <>
            Get Free Quote <Icon name="arrow" size={16} />
          </>
        )}
      </button>
      <p className="hd-form-note"><Icon name="shield" size={14} /> Your reports stay private and secure.</p>
    </form>
  );
};

/* ---------------------------- LIGHTBOX ---------------------------- */
const Lightbox = ({ images, index, onClose, onMove, title }) => {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onMove]);

  return (
    <div className="hd-lightbox" role="dialog" aria-modal="true" aria-label={`${title} photo ${index + 1}`} onClick={onClose}>
      <div className="hd-lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <Pic src={images[index]} alt={`${title} photo ${index + 1}`} className="hd-lightbox-pic" />
        <button ref={closeRef} type="button" className="hd-lb-btn hd-lb-close" aria-label="Close" onClick={onClose}>
          <Icon name="close" size={20} />
        </button>
        <button type="button" className="hd-lb-btn hd-lb-prev" aria-label="Previous photo" onClick={() => onMove(-1)}>
          <Icon name="left" size={22} />
        </button>
        <button type="button" className="hd-lb-btn hd-lb-next" aria-label="Next photo" onClick={() => onMove(1)}>
          <Icon name="right" size={22} />
        </button>
        <span className="hd-lb-count">
          {index + 1} / {images.length}
        </span>
      </div>
    </div>
  );
};

/* ---------------------------- PAGE ---------------------------- */
const HospitalDetails = () => {
  const { country: countrySlug, hospital: hospitalSlug } = useParams();
  const { hash } = useLocation();
  const h = getHospital(countrySlug, hospitalSlug);

  const [activeTab, setActiveTab] = useState("overview");
  const [photo, setPhoto] = useState(null);

  // Notun hospital khulle upore scroll, "#quote" thakle form e
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
        return;
      }
    }
    window.scrollTo(0, 0);
    setActiveTab("overview");
  }, [countrySlug, hospitalSlug, hash]);

  // Scroll korle kon section e achi, sheta tab e highlight
  useEffect(() => {
    if (!h || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveTab(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    tabs.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [h]);

  const movePhoto = useCallback(
    (d) => setPhoto((p) => (p === null || !h ? p : (p + d + h.gallery.length) % h.gallery.length)),
    [h]
  );
  const closePhoto = useCallback(() => setPhoto(null), []);

  /* -------- Not found -------- */
  if (!h) {
    return (
      <main className="hd-page">
        <div className="hd-container hd-notfound">
          <span><Icon name="hospital" size={40} /></span>
          <h1>Hospital not found</h1>
          <p>The hospital you are looking for may have moved. Please browse our partner hospitals.</p>
          <Link to="/hospitals" className="hd-btn">
            View all hospitals <Icon name="arrow" size={16} />
          </Link>
        </div>
      </main>
    );
  }

  const country = countries.find((c) => c.slug === h.countrySlug);
  const related = hospitals.filter((x) => x.slug !== h.slug && x.countrySlug === h.countrySlug);
  const others = (related.length >= 3 ? related : [...related, ...hospitals.filter((x) => x.countrySlug !== h.countrySlug)])
    .filter((x) => x.slug !== h.slug)
    .slice(0, 3);

  const goTo = (id) => (e) => {
    e.preventDefault();
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const facts = [
    { icon: "calendar", label: "Established", value: h.founded },
    { icon: "bed", label: "Hospital beds", value: `${h.beds.toLocaleString()}+` },
    { icon: "stetho", label: "Specialties", value: `${h.specialties.length}+` },
    { icon: "award", label: "Accreditation", value: h.accreditations.join(", ") },
  ];

  return (
    <main className="hd-page">
      {/* ================= HERO ================= */}
      <section className="hd-hero">
        <Pic src={h.cover} alt="" className="hd-hero-bg" />
        <div className="hd-hero-overlay" aria-hidden="true" />

        <div className="hd-container hd-hero-inner">
         

          <div className="hd-hero-main">
            <div className="hd-hero-text">
              <div className="hd-tags hx-in" style={{ "--d": "0.05s" }}>
                <span className="hd-tag">
                  <span aria-hidden="true">{country?.flag}</span> {h.country}
                </span>
                {h.accreditations.map((a) => (
                  <span key={a} className="hd-tag hd-tag--acc">
                    <Icon name="shield" size={14} /> {a} Accredited
                  </span>
                ))}
              </div>

              <h1 className="hx-in" style={{ "--d": "0.1s" }}>{h.name}</h1>

              <div className="hd-hero-meta hx-in" style={{ "--d": "0.2s" }}>
                <span>
                  <Icon name="pin" size={17} /> {h.city}, {h.country}
                </span>
                <span className="hd-rating" aria-label={`Rated ${h.rating} out of 5`}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span key={n} className={n <= Math.round(h.rating) ? "on" : ""}><Star size={15} /></span>
                  ))}
                  <b>{h.rating}</b>
                  <small>({h.reviews.toLocaleString()} reviews)</small>
                </span>
              </div>
            </div>

            <div className="hd-hero-actions hx-in" style={{ "--d": "0.3s" }}>
              <a href="#quote" className="hd-btn" onClick={goTo("quote")}>
                Get Free Quote <Icon name="arrow" size={16} />
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="hd-btn hd-btn--glass">
                <Icon name="chat" size={16} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FACTS BAR ================= */}
      <div className="hd-container">
        <div className="hd-facts">
          {facts.map((f) => (
            <div key={f.label} className="hd-fact">
              <span className="hd-fact-icon"><Icon name={f.icon} size={22} /></span>
              <div>
                <strong>{f.value}</strong>
                <small>{f.label}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= TABS ================= */}
      <nav className="hd-tabs" aria-label="Page sections">
        <div className="hd-container">
          <ul>
            {tabs.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`} className={activeTab === t.id ? "is-on" : ""} aria-current={activeTab === t.id ? "true" : undefined} onClick={goTo(t.id)}>
                  {t.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ================= BODY ================= */}
      <div className="hd-container hd-layout">
        <div className="hd-main">
          {/* Overview */}
          <section id="overview" className="hd-block">
            <Reveal>
              <span className="hd-label">Overview</span>
              <h2 className="hd-title">About {h.name}</h2>
              {h.about.map((p, i) => (
                <p key={i} className="hd-para">{p}</p>
              ))}

              <div className="hd-highlights">
                {h.highlights.map((x, i) => (
                  <div key={x} className={`hd-highlight ${i % 2 ? "hd-highlight--alt" : ""}`}>
                    <span><Icon name="check" size={14} /></span>
                    {x}
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          {/* Specialties */}
          <section id="specialties" className="hd-block">
            <Reveal>
              <span className="hd-label">Specialties</span>
              <h2 className="hd-title">Departments &amp; centres of excellence</h2>
            </Reveal>
            <div className="hd-specs">
              {h.specialties.map((s, i) => (
                <Reveal key={s} delay={i * 0.05} className="hd-spec">
                  <span className="hd-spec-icon"><Icon name={specialtyIcon(s)} size={26} /></span>
                  <h3>{s}</h3>
                  <Link to={`/hospitals?specialty=${encodeURIComponent(s)}`} className="hd-spec-link" aria-label={`Other hospitals for ${s}`}>
                    <Icon name="arrow" size={15} />
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Treatments */}
          <section id="treatments" className="hd-block">
            <Reveal>
              <span className="hd-label">Popular Treatments</span>
              <h2 className="hd-title">Common treatments for international patients</h2>
              <p className="hd-para">Stay time is a general guide. Your doctor will confirm the plan after reviewing your reports.</p>

              <div className="hd-table-wrap">
                <table className="hd-table">
                  <thead>
                    <tr>
                      <th scope="col">Treatment</th>
                      <th scope="col">Approx. hospital stay</th>
                      <th scope="col"><span className="hd-sr">Action</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {h.treatments.map((t) => (
                      <tr key={t.name}>
                        <th scope="row">{t.name}</th>
                        <td>
                          <span className="hd-stay"><Icon name="clock" size={14} /> {t.stay}</span>
                        </td>
                        <td>
                          <a href="#quote" className="hd-table-btn" onClick={goTo("quote")}>
                            Get cost
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </section>

          {/* Facilities */}
          <section id="facilities" className="hd-block">
            <Reveal>
              <span className="hd-label">Facilities</span>
              <h2 className="hd-title">Infrastructure &amp; comfort</h2>
              <ul className="hd-facilities">
                {h.facilities.map((f) => (
                  <li key={f}>
                    <span><Icon name="check" size={13} /></span>
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>

          {/* Gallery */}
          <section id="gallery" className="hd-block">
            <Reveal>
              <span className="hd-label">Gallery</span>
              <h2 className="hd-title">Inside the hospital</h2>
            </Reveal>
            <div className="hd-gallery">
              {h.gallery.map((src, i) => (
                <button key={i} type="button" className={`hd-gal hd-gal--${i}`} aria-label={`Open photo ${i + 1}`} onClick={() => setPhoto(i)}>
                  <Pic src={src} alt="" className="hd-gal-pic" />
                  <span className="hd-gal-zoom" aria-hidden="true"><Icon name="zoom" size={22} /></span>
                </button>
              ))}
            </div>
          </section>

          {/* Our support */}
          <section id="support" className="hd-block">
            <Reveal className="hd-support-box">
              <span className="hd-label hd-label--light">Our Support</span>
              <h2 className="hd-title hd-title--light">We handle everything for your trip to {h.city}</h2>
              <div className="hd-support">
                {ourSupport.map((s) => (
                  <Link key={s.to} to={s.to} className="hd-support-item">
                    <span><Icon name={s.icon} size={22} /></span>
                    <div>
                      <strong>{s.title}</strong>
                      <small>{s.text}</small>
                    </div>
                  </Link>
                ))}
              </div>
            </Reveal>
          </section>
        </div>

        {/* ================= SIDEBAR ================= */}
        <aside className="hd-side">
          <div className="hd-quote" id="quote">
            <div className="hd-quote-head">
              <h2>Free opinion &amp; quote</h2>
              <p>From {h.name}, usually within 48 hours.</p>
            </div>
            <div className="hd-quote-body">
              <QuoteForm hospital={h} />
            </div>
          </div>

          <div className="hd-call">
            <span><Icon name="phone" size={22} /></span>
            <div>
              <small>Talk to a patient advisor</small>
              <a href={HOTLINE_LINK}>{HOTLINE}</a>
            </div>
          </div>
        </aside>
      </div>

      {/* ================= OTHER HOSPITALS ================= */}
      {others.length > 0 && (
        <section className="hd-others">
          <div className="hd-container">
            <div className="hd-others-head">
              <div>
                <span className="hd-label">Compare</span>
                <h2 className="hd-title">{related.length ? `Other hospitals in ${h.country}` : "Other partner hospitals"}</h2>
              </div>
              <Link to={`/hospitals/${h.countrySlug}`} className="hd-btn hd-btn--line">
                View all <Icon name="arrow" size={16} />
              </Link>
            </div>

            <div className="hd-others-grid">
              {others.map((o) => (
                <Link key={o.slug} to={hospitalLink(o)} className="hd-other">
                  <Pic src={o.cover} alt="" className="hd-other-pic" />
                  <div className="hd-other-body">
                    <span className="hd-other-rate"><Star size={13} /> {o.rating}</span>
                    <h3>{o.name}</h3>
                    <p><Icon name="pin" size={14} /> {o.city}, {o.country}</p>
                  </div>
                  <span className="hd-other-arrow" aria-hidden="true"><Icon name="arrow" size={18} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= MOBILE BOTTOM BAR ================= */}
      <div className="hd-mobile-bar">
        <a href={HOTLINE_LINK} className="hd-btn hd-btn--line" aria-label="Call us">
          <Icon name="phone" size={18} />
        </a>
        <a href="#quote" className="hd-btn" onClick={goTo("quote")}>
          Get Free Quote <Icon name="arrow" size={16} />
        </a>
      </div>

      {photo !== null && <Lightbox images={h.gallery} index={photo} onClose={closePhoto} onMove={movePhoto} title={h.name} />}
    </main>
  );
};

export default HospitalDetails;
