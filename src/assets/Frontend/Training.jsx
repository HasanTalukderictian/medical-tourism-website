import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/Training.css";

/* ---------------------------- IMAGES ----------------------------
   Ekhon online (Unsplash) image use kora hocche.
   Chaile download kore tomar Image folder e rekhe import koro, jemon:
   import HeroImg from "../Image/Training/hero.jpg";
   Image load na hole automatically placeholder dekhabe.
------------------------------------------------------------------ */
const IMG = {
  hero1: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=900&q=80",
  hero2: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=700&q=80",
  hero3: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=700&q=80",
  about: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1000&q=80",
  p1: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80",
  p2: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=800&q=80",
  p3: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80",
  p4: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
  p5: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80",
  p6: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
};

/* ---------------------------- DATA ---------------------------- */
// Shob text SAMPLE. Tomar asol program onujayi edit koro
const PHONE = "+880 1XXX-XXXXXX";
const PHONE_LINK = "tel:+8801XXXXXXXXX";

const topics = [
  "Clinical Observership", "Fellowship", "CME Workshops", "Nursing Skills", "BLS & ACLS", "Robotic Surgery",
  "Cardiology", "Oncology", "IVF & Fertility", "Hospital Management", "Patient Safety", "Medical English",
];

const stats = [
  { value: 40, suffix: "+", label: "Partner hospitals abroad" },
  { value: 1500, suffix: "+", label: "Doctors & nurses trained" },
  { value: 6, suffix: "", label: "Countries" },
  { value: 98, suffix: "%", label: "Visa success rate" },
];

const categories = ["All", "Doctors", "Nurses", "Emergency", "Management"];

const programs = [
  { id: "observership", cat: "Doctors", img: IMG.p1, title: "Clinical Observership", text: "Observe senior consultants in OPD, wards, and operation theatres at top JCI-accredited hospitals.", duration: "2 – 12 weeks", level: "MBBS / Specialist", place: "India, Thailand" },
  { id: "fellowship", cat: "Doctors", img: IMG.p2, title: "Specialty Fellowship", text: "Hands-on fellowships in cardiology, oncology, orthopaedics, IVF, laparoscopic and robotic surgery.", duration: "3 – 12 months", level: "Post-graduate", place: "India, Malaysia" },
  { id: "cme", cat: "Doctors", img: IMG.p3, title: "CME & Surgical Workshops", text: "Short courses with live surgery demos and simulation labs. Earn CME credits with a certificate.", duration: "2 – 5 days", level: "All doctors", place: "India, Singapore" },
  { id: "nursing", cat: "Nurses", img: IMG.p4, title: "Advanced Nursing Training", text: "ICU, CCU, OT, dialysis, and infection-control skills, taught by senior nurse educators.", duration: "4 – 8 weeks", level: "Diploma / BSc nurses", place: "India, Thailand" },
  { id: "bls", cat: "Emergency", img: IMG.p5, title: "BLS, ACLS & PALS Certification", text: "AHA-standard life-support courses with practical mannequin sessions and an international certificate.", duration: "1 – 3 days", level: "Doctors & nurses", place: "India, Dhaka" },
  { id: "hm", cat: "Management", img: IMG.p6, title: "Hospital Management & Quality", text: "Learn hospital operations, patient safety, and accreditation (JCI / NABH) from leading hospital teams.", duration: "1 – 4 weeks", level: "Admins & managers", place: "India, Thailand" },
];

const formats = [
  { icon: "hospital", title: "Top Partner Hospitals", text: "Train at JCI and NABH accredited hospitals in India, Thailand, Malaysia and Singapore." },
  { icon: "doc", title: "Visa & Documents", text: "We prepare the invitation letter, medical / training visa file, and all paperwork." },
  { icon: "home", title: "Stay & Transport", text: "Safe accommodation near the hospital, airport pickup, and daily transport." },
  { icon: "award", title: "Recognised Certificate", text: "Receive a certificate from the host hospital, plus CME credits where available." },
];

const process = [
  { title: "Apply & Share Your CV", text: "Tell us your profession, specialty, and the program you want." },
  { title: "Hospital Matching", text: "We find the right hospital and get your acceptance letter." },
  { title: "Visa, Stay & Travel", text: "We handle the visa file, accommodation, ticket, and airport pickup." },
  { title: "Train & Get Certified", text: "Learn on site with our local support team, and return with a certificate." },
];

const benefits = [
  { icon: "chart", title: "Global exposure", text: "See modern techniques and international standards of patient care." },
  { icon: "users", title: "Learn from experts", text: "Work beside senior consultants with thousands of procedures behind them." },
  { icon: "award", title: "Career growth", text: "Strengthen your CV for jobs, promotions, and post-graduate seats." },
  { icon: "heart", title: "Full support", text: "Our team is with you from application until you return home." },
];

const testimonials = [
  { quote: "My cardiology observership in Chennai was a life-changing experience. They handled my visa and hotel, so I could focus fully on learning.", name: "Dr. Rahman", company: "Cardiologist, Dhaka" },
  { quote: "The ICU nursing course gave me real hands-on skills. I now train junior nurses in my own hospital.", name: "Nasrin A.", company: "Senior Staff Nurse" },
  { quote: "Everything was organised: acceptance letter, visa, stay, transport. I only had to pack my bags.", name: "Dr. Hasan", company: "Orthopaedic Surgeon" },
];

const faqs = [
  { q: "Who can apply for these programs?", a: "Doctors (MBBS and specialists), nurses, medical students in final year, and hospital administrators. Each program has its own eligibility, and we will guide you to the right one." },
  { q: "Will I get hands-on experience?", a: "Observerships are mainly observation-based due to local licensing rules. Fellowships, nursing courses, and workshops include supervised hands-on practice and simulation labs." },
  { q: "Do you help with the visa?", a: "Yes. We arrange the hospital invitation letter and prepare your complete visa file. Our visa success rate is very high when documents are complete." },
  { q: "What does the program fee include?", a: "It depends on the package. Usually it includes the hospital training fee, certificate, accommodation, and airport transfer. You get a clear cost sheet before you confirm." },
];

const countries = ["India", "Thailand", "Malaysia", "Singapore", "Turkey", "Bangladesh (Dhaka)"];

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
      return <svg {...p}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M12 7v6M9 10h6M9 21v-4h6v4" /></svg>;
    case "home":
      return <svg {...p}><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10M10 20v-5h4v5" /></svg>;
    case "pin":
      return <svg {...p}><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>;
    case "stetho":
      return <svg {...p}><path d="M6 3v6a4 4 0 0 0 8 0V3" /><path d="M10 13v2a5 5 0 0 0 10 0v-2" /><circle cx="20" cy="11" r="2" /></svg>;
    case "building":
      return <svg {...p}><rect x="4" y="3" width="16" height="18" rx="1.5" /><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3" /></svg>;
    case "monitor":
      return <svg {...p}><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4M10 8.5l4 1.5-4 1.5z" /></svg>;
    case "users":
      return <svg {...p}><circle cx="9" cy="8" r="3.2" /><path d="M3 20c.6-3.4 3-5 6-5s5.4 1.6 6 5" /><circle cx="17" cy="9" r="2.4" /><path d="M16.5 14.2c2.4.2 4 1.7 4.5 4.3" /></svg>;
    case "target":
      return <svg {...p}><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" fill="currentColor" /></svg>;
    case "chart":
      return <svg {...p}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>;
    case "heart":
      return <svg {...p}><path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" /></svg>;
    case "award":
      return <svg {...p}><circle cx="12" cy="9" r="5.5" /><path d="M8.5 13.5L7 21l5-2.5 5 2.5-1.5-7.5" /></svg>;
    case "doc":
      return <svg {...p}><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></svg>;
    case "clock":
      return <svg {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>;
    case "level":
      return <svg {...p}><path d="M5 20v-5M12 20V10M19 20V4" /></svg>;
    case "cap":
      return <svg {...p}><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v5" /></svg>;
    case "phone":
      return <svg {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>;
    case "quote":
      return <svg {...p} fill="currentColor" stroke="none"><path d="M4 18v-5.5C4 8.4 6.2 6 10 5.5V8c-2 .5-3 1.7-3 4h3v6zm10 0v-5.5c0-4.1 2.2-6.5 6-7V8c-2 .5-3 1.7-3 4h3v6z" /></svg>;
    case "arrow":
      return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case "left":
      return <svg {...p}><path d="M15 6l-6 6 6 6" /></svg>;
    case "right":
      return <svg {...p}><path d="M9 6l6 6-6 6" /></svg>;
    case "plus":
      return <svg {...p}><path d="M12 5v14M5 12h14" /></svg>;
    case "star":
      return <svg {...p} fill="currentColor" stroke="none"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" /></svg>;
    case "image":
      return <svg {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.8" /><path d="M21 16l-5-5-8 8" /></svg>;
    default:
      return <svg {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>;
  }
};

/* ------------------- Hooks & helpers ------------------- */
const useInView = (threshold = 0.15) => {
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
      ([entry]) => {
        if (entry.isIntersecting) {
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

const Reveal = ({ children, className = "", delay = 0, direction = "up", as: Tag = "div", ...rest }) => {
  const [ref, shown] = useInView(0.12);
  return (
    <Tag
      ref={ref}
      className={`td-reveal td-reveal--${direction} ${shown ? "is-shown" : ""} ${className}`}
      style={{ "--d": `${delay}s` }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// Number count-up when visible
const Counter = ({ value, suffix }) => {
  const [ref, inView] = useInView(0.4);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(value);
      return;
    }
    let raf;
    const start = performance.now();
    const dur = 1600;
    const tick = (t) => {
      const k = Math.min(1, (t - start) / dur);
      setN(Math.round(value * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <strong ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </strong>
  );
};

const Pic = ({ src, alt, className = "" }) => {
  const [failed, setFailed] = useState(!src);
  useEffect(() => setFailed(!src), [src]);
  return (
    <div className={`td-pic ${failed ? "td-pic--empty" : ""} ${className}`}>
      {failed ? <Icon name="image" size={40} /> : <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />}
    </div>
  );
};

/* ---------------------------- PAGE ---------------------------- */
const initial = { name: "", profession: "", email: "", phone: "", program: "", country: "", month: "", mode: "doctor", message: "" };

const Training = () => {
  const [cat, setCat] = useState("All");
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success
  const formRef = useRef(null);

  const shown = cat === "All" ? programs : programs.filter((p) => p.cat === cat);

  // Testimonial auto slide
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  const move = (d) => setSlide((s) => (s + d + testimonials.length) % testimonials.length);

  const set = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };
  const handleInput = (e) => set(e.target.name, e.target.value);

  const enquire = (programId) => {
    set("program", programId);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Please enter your name";
    if (!form.profession.trim()) er.profession = "Please enter your specialty / designation";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) er.email = "Enter a valid email";
    if (!/^[+\d][\d\s-]{6,}$/.test(form.phone.trim())) er.phone = "Enter a valid phone number";
    return er;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;
    setStatus("sending");
    /* EKHANE tomar backend / API call boshao. Ekhon shudhu demo. Jemon:
       await fetch("/api/medical-training", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(form) }); */
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
  };

  const reset = () => {
    setForm(initial);
    setErrors({});
    setStatus("idle");
  };

  const err = (name) => errors[name] && <span className="td-error">{errors[name]}</span>;
  const t = testimonials[slide];

  return (
    <main className="td-page">
      {/* ================= HERO ================= */}
      <section className="td-hero">
        <div className="td-hero-grid-bg" aria-hidden="true" />
        <div className="td-container td-hero-grid">
          <div className="td-hero-text">
            <span className="td-pill td-in" style={{ "--d": "0s" }}>
              <span className="td-pill-dot" /> Medical Training &amp; Development
            </span>
            <h1 className="td-in" style={{ "--d": "0.1s" }}>
              Learn at world-class hospitals, <br />
              <span className="td-mark">bring the skills home.</span>
            </h1>
            <p className="td-in" style={{ "--d": "0.2s" }}>
              Observerships, fellowships, CME workshops, and nursing courses for doctors and healthcare
              professionals at top partner hospitals abroad. We handle the hospital, visa, stay, and travel.
            </p>
            <div className="td-hero-actions td-in" style={{ "--d": "0.3s" }}>
              <a href="#td-enquiry" className="td-btn">
                Apply for Training <Icon name="arrow" size={16} />
              </a>
              <a href="#td-programs" className="td-btn td-btn--line">
                Explore Programs
              </a>
            </div>
            <div className="td-hero-trust td-in" style={{ "--d": "0.4s" }}>
              <div className="td-avatars" aria-hidden="true">
                <span>A</span>
                <span>R</span>
                <span>S</span>
                <span>+</span>
              </div>
              <div>
                <div className="td-stars" aria-label="Rated 4.9 out of 5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Icon key={i} name="star" size={14} />
                  ))}
                  <b>4.9</b>
                </div>
                <small>Rated by 1,500+ doctors &amp; nurses</small>
              </div>
            </div>
          </div>

          {/* Image collage */}
          <div className="td-collage td-in" style={{ "--d": "0.25s" }}>
            <Pic src={IMG.hero1} alt="Doctors in a hospital training session" className="td-collage-main" />
            <Pic src={IMG.hero2} alt="Surgical training" className="td-collage-top" />
            <Pic src={IMG.hero3} alt="Medical simulation lab" className="td-collage-bottom" />
            <div className="td-badge td-badge--a">
              <span><Icon name="cap" size={20} /></span>
              <div>
                <strong>40+</strong>
                <small>Partner hospitals</small>
              </div>
            </div>
            <div className="td-badge td-badge--b">
              <span><Icon name="award" size={20} /></span>
              <div>
                <strong>JCI / NABH</strong>
                <small>Accredited hospitals</small>
              </div>
            </div>
            <div className="td-ring" aria-hidden="true" />
          </div>
        </div>
      </section>

      

      {/* ================= ABOUT + STATS ================= */}
      <section className="td-section">
        <div className="td-container td-about">
          <Reveal direction="left" className="td-about-media">
            <Pic src={IMG.about} alt="Senior doctor teaching young doctors" className="td-about-pic" />
            <div className="td-about-exp">
              <strong>10+</strong>
              <span>Years in medical tourism</span>
            </div>
          </Reveal>

          <Reveal direction="right" className="td-about-text">
            <span className="td-label">Why Train Abroad</span>
            <h2 className="td-title">Learn where the latest treatments happen</h2>
            <p>
              Medicine is moving fast: robotic surgery, advanced cardiac care, modern IVF, and new ICU protocols.
              We connect healthcare professionals from Bangladesh with leading hospitals abroad, so they can learn
              these skills first-hand and use them to treat patients back home.
            </p>
            <ul className="td-checks">
              <li><span><Icon name="check" size={13} /></span> Placement at JCI / NABH accredited hospitals</li>
              <li><span><Icon name="check" size={13} /></span> Learn directly from senior consultants</li>
              <li><span><Icon name="check" size={13} /></span> Visa, stay, and transport fully managed</li>
            </ul>
            <div className="td-stats">
              {stats.map((s) => (
                <div key={s.label} className="td-stat">
                  <Counter value={s.value} suffix={s.suffix} />
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= PROGRAMS (filter) ================= */}
      <section className="td-section td-section--soft" id="td-programs">
        <div className="td-container">
          <Reveal className="td-head">
            <span className="td-label">Our Programs</span>
            <h2 className="td-title">Medical training programs</h2>
            <p className="td-sub">Choose a category to see related programs. Duration and hospital can be adjusted to your needs.</p>
          </Reveal>

          <div className="td-filters" role="group" aria-label="Filter programs">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                className={cat === c ? "is-on" : ""}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="td-programs">
            {shown.map((p, i) => (
              <article key={`${cat}-${p.id}`} className="td-program" style={{ "--i": i }}>
                <div className="td-program-media">
                  <Pic src={p.img} alt={p.title} className="td-program-pic" />
                  <span className="td-program-cat">{p.cat}</span>
                </div>
                <div className="td-program-body">
                  <div className="td-program-meta">
                    <span><Icon name="clock" size={15} /> {p.duration}</span>
                    <span><Icon name="stetho" size={15} /> {p.level}</span>
                    <span><Icon name="pin" size={15} /> {p.place}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <button type="button" className="td-program-btn" onClick={() => enquire(p.id)}>
                    Apply now <span><Icon name="arrow" size={15} /></span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FORMATS ================= */}
      <section className="td-section">
        <div className="td-container">
          <Reveal className="td-head td-head--split">
            <div>
              <span className="td-label">All-in-one Support</span>
              <h2 className="td-title">We take care of everything except the learning</h2>
            </div>
            <p className="td-sub">As a medical tourism company, we already know hospitals, visas, and travel. That makes your training trip easy.</p>
          </Reveal>

          <div className="td-formats">
            {formats.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08} className="td-format">
                <span className="td-format-no">0{i + 1}</span>
                <span className="td-format-icon"><Icon name={f.icon} size={26} /></span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROCESS (dark) ================= */}
      <section className="td-process-wrap">
        <div className="td-container td-process">
          <Reveal direction="left" className="td-process-intro">
            <span className="td-label td-label--light">How We Work</span>
            <h2 className="td-title td-title--light">From application to certificate in 4 steps</h2>
            <p>Our team stays with you before, during, and after your training, in your own language.</p>
            <a href="#td-enquiry" className="td-btn">
              Start your application <Icon name="arrow" size={16} />
            </a>
          </Reveal>

          <ol className="td-steps">
            {process.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.1} className="td-step">
                <span className="td-step-no">{i + 1}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= BENEFITS + TESTIMONIAL (bento) ================= */}
      <section className="td-section">
        <div className="td-container">
          <Reveal className="td-head">
            <span className="td-label">The Benefits</span>
            <h2 className="td-title">What you gain from training abroad</h2>
          </Reveal>

          <div className="td-bento">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08} className={`td-benefit td-benefit--${i + 1}`}>
                <span className="td-benefit-icon"><Icon name={b.icon} size={24} /></span>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </Reveal>
            ))}

            <Reveal
              delay={0.2}
              className="td-testi"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
            >
              <span className="td-testi-quote"><Icon name="quote" size={40} /></span>
              <div className="td-testi-body" key={slide} aria-live="polite">
                <p>{t.quote}</p>
                <div className="td-testi-who">
                  <span className="td-testi-avatar">{t.name.charAt(0)}</span>
                  <div>
                    <strong>{t.name}</strong>
                    <small>{t.company}</small>
                  </div>
                </div>
              </div>
              <div className="td-testi-nav">
                <div className="td-dots">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Show testimonial ${i + 1}`}
                      aria-current={slide === i}
                      className={slide === i ? "is-on" : ""}
                      onClick={() => setSlide(i)}
                    />
                  ))}
                </div>
                <div className="td-arrows">
                  <button type="button" aria-label="Previous testimonial" onClick={() => move(-1)}>
                    <Icon name="left" size={18} />
                  </button>
                  <button type="button" aria-label="Next testimonial" onClick={() => move(1)}>
                    <Icon name="right" size={18} />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= ENQUIRY FORM ================= */}
      <section className="td-section td-section--soft" id="td-enquiry">
        <div className="td-container td-enquiry" ref={formRef}>
          <Reveal direction="left" className="td-enquiry-info">
            <span className="td-label">Apply Now</span>
            <h2 className="td-title">Start your training journey</h2>
            <p>Share a few details. Our education coordinator will call you within one working day with suitable hospitals, dates, and a clear cost sheet.</p>

            <div className="td-contact-cards">
              <a href={PHONE_LINK} className="td-contact-card">
                <span><Icon name="phone" size={20} /></span>
                <div>
                  <small>Call us</small>
                  <strong>{PHONE}</strong>
                </div>
              </a>
              <div className="td-contact-card">
                <span><Icon name="clock" size={20} /></span>
                <div>
                  <small>Office hours</small>
                  <strong>Sat – Thu, 9am – 6pm</strong>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" className="td-form-card">
            {status === "success" ? (
              <div className="td-success" role="status">
                <span className="td-success-icon"><Icon name="check" size={34} /></span>
                <h3>Thank you!</h3>
                <p>
                  We have received your application, {form.name.split(" ")[0] || "Doctor"}. Our coordinator will
                  contact you very soon with matching hospitals.
                </p>
                <button type="button" className="td-btn" onClick={reset}>Send another application</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 className="td-form-title">Training application</h3>

                <div className="td-row">
                  <div className={`td-field ${errors.name ? "has-error" : ""}`}>
                    <label htmlFor="td-name">Your Name *</label>
                    <input id="td-name" name="name" placeholder="Full name" value={form.name} onChange={handleInput} />
                    {err("name")}
                  </div>
                  <div className={`td-field ${errors.profession ? "has-error" : ""}`}>
                    <label htmlFor="td-profession">Specialty / Designation *</label>
                    <input id="td-profession" name="profession" placeholder="e.g. Cardiologist, ICU Nurse" value={form.profession} onChange={handleInput} />
                    {err("profession")}
                  </div>
                </div>

                <div className="td-row">
                  <div className={`td-field ${errors.email ? "has-error" : ""}`}>
                    <label htmlFor="td-email">Email *</label>
                    <input id="td-email" name="email" type="email" placeholder="you@company.com" value={form.email} onChange={handleInput} />
                    {err("email")}
                  </div>
                  <div className={`td-field ${errors.phone ? "has-error" : ""}`}>
                    <label htmlFor="td-phone">Phone *</label>
                    <input id="td-phone" name="phone" type="tel" placeholder="+880 1XXX-XXXXXX" value={form.phone} onChange={handleInput} />
                    {err("phone")}
                  </div>
                </div>

                <div className="td-row">
                  <div className="td-field">
                    <label htmlFor="td-program">Program</label>
                    <select id="td-program" name="program" value={form.program} onChange={handleInput}>
                      <option value="">Not sure, please advise</option>
                      {programs.map((p) => (
                        <option key={p.id} value={p.id}>{p.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="td-field">
                    <label htmlFor="td-country">Preferred country</label>
                    <select id="td-country" name="country" value={form.country} onChange={handleInput}>
                      <option value="">Any country</option>
                      {countries.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="td-field">
                  <label htmlFor="td-month">Preferred start month</label>
                  <input id="td-month" name="month" type="month" value={form.month} onChange={handleInput} />
                </div>

                <fieldset className="td-modes">
                  <legend>I am a</legend>
                  <div className="td-mode-grid">
                    {[
                      ["doctor", "Doctor"],
                      ["nurse", "Nurse"],
                      ["other", "Other / Admin"],
                    ].map(([val, label]) => (
                      <label key={val} className={`td-mode ${form.mode === val ? "is-on" : ""}`}>
                        <input type="radio" name="mode" value={val} checked={form.mode === val} onChange={handleInput} />
                        <span className="td-mode-dot" />
                        {label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="td-field">
                  <label htmlFor="td-message">Anything else? (optional)</label>
                  <textarea
                    id="td-message"
                    name="message"
                    rows="3"
                    placeholder="e.g. years of experience, hospital you work at, passport ready or not"
                    value={form.message}
                    onChange={handleInput}
                  />
                </div>

                <button type="submit" className="td-btn td-btn--block" disabled={status === "sending"}>
                  {status === "sending" ? (
                    <>
                      <span className="td-spinner" aria-hidden="true" /> Sending...
                    </>
                  ) : (
                    <>
                      Submit Application <Icon name="arrow" size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="td-section">
        <div className="td-container td-container--narrow">
          <Reveal className="td-head">
            <span className="td-label">FAQ</span>
            <h2 className="td-title">Frequently asked questions</h2>
          </Reveal>

          <div className="td-faq">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={f.q} delay={i * 0.06} className={`td-faq-item ${open ? "is-open" : ""}`}>
                  <h3>
                    <button
                      type="button"
                      className="td-faq-q"
                      aria-expanded={open}
                      aria-controls={`td-faq-a-${i}`}
                      onClick={() => setOpenFaq(open ? null : i)}
                    >
                      <span>{f.q}</span>
                      <span className="td-faq-icon"><Icon name="plus" size={18} /></span>
                    </button>
                  </h3>
                  <div className="td-faq-a" id={`td-faq-a-${i}`} role="region">
                    <div className="td-faq-inner">
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
      <section className="td-cta-wrap">
        <div className="td-container">
          <Reveal className="td-cta">
            <div className="td-cta-shape td-cta-shape--1" aria-hidden="true" />
            <div className="td-cta-shape td-cta-shape--2" aria-hidden="true" />
            <div className="td-cta-text">
              <h2>Ready to learn from the best hospitals?</h2>
              <p>Talk to our coordinator today and find the right program for your career.</p>
            </div>
            <div className="td-cta-actions">
              <a href="#td-enquiry" className="td-btn td-btn--white">
                Apply for Training <Icon name="arrow" size={16} />
              </a>
              <Link to="/contact" className="td-btn td-btn--outline-white">
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default Training;
