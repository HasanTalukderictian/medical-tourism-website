import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/Team.css";

/* =====================================================================
   TEAM DATA (DEMO)
   ---------------------------------------------------------------------
   - Nam, padobi, bio shob demo. Tomar asol team er info diye bodlao.
   - photo: member er chobi import kore dao (jemon: photo: RahimPhoto).
     Na thakle initials dekhabe.
   - email / linkedin / phone na thakle faka rakho, icon dekhabe na.
   ===================================================================== */
const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&h=700&q=80`;

const leaders = [
  {
    name: "Md. Kamal Hossain",
    role: "Founder & Managing Director",
    photo: u("photo-1560250097-0b93528c311a"),
    bio: "Started Akashbari Medical with one simple goal: no patient from Bangladesh should feel alone when they go abroad for treatment. Leads partnerships and company strategy.",
    quote: "Every patient is family. We stay with them from the first call until they are home.",
    email: "md@example.com",
    linkedin: "#",
  },
  {
    name: "Dr. Farhana Rahman",
    role: "Medical Director",
    photo: u("photo-1594824476967-48c8b964273f"),
    bio: "A physician with years of clinical experience. Reviews patient reports, guides treatment choices, and works with partner hospitals on care quality.",
    quote: "The right hospital and the right doctor make all the difference.",
    email: "medical@example.com",
    linkedin: "#",
  },
  {
    name: "Tanvir Ahmed",
    role: "Head of Operations",
    photo: u("photo-1507003211169-0a1dd7228f2d"),
    bio: "Runs visa, travel, accommodation, and on-ground support so every trip goes smoothly. Manages our teams in Bangladesh and abroad.",
    quote: "Good planning means patients can focus only on getting better.",
    email: "ops@example.com",
    linkedin: "#",
  },
];

const departments = [
  { id: "all", label: "Everyone" },
  { id: "care", label: "Patient Care" },
  { id: "medical", label: "Medical Team" },
  { id: "travel", label: "Visa & Travel" },
  { id: "abroad", label: "International Desk" },
  { id: "support", label: "Support & Admin" },
];

const members = [
  { name: "Nusrat Jahan", role: "Senior Patient Coordinator", dept: "care", city: "Dhaka", photo: u("photo-1573496359142-b8d87734a5a2"), langs: ["Bangla", "English", "Hindi"], email: "#", linkedin: "#" },
  { name: "Arif Hasan", role: "Patient Coordinator", dept: "care", city: "Chattogram", photo: u("photo-1500648767791-00dcc994a43e"), langs: ["Bangla", "English"], email: "#", linkedin: "#" },
  { name: "Sadia Islam", role: "Patient Relations Executive", dept: "care", city: "Dhaka", photo: u("photo-1438761681033-6461ffad8d80"), langs: ["Bangla", "English"], email: "#" },
  { name: "Dr. Mahmudul Hasan", role: "Medical Officer", dept: "medical", city: "Dhaka", photo: u("photo-1612349317150-e413f6a5b16d"), langs: ["Bangla", "English"], email: "#", linkedin: "#" },
  { name: "Dr. Shirin Akter", role: "Medical Report Reviewer", dept: "medical", city: "Dhaka", photo: u("photo-1559839734-2b71ea197ec2"), langs: ["Bangla", "English"], email: "#" },
  { name: "Rakib Chowdhury", role: "Visa Specialist", dept: "travel", city: "Dhaka", photo: u("photo-1472099645785-5658abf4ff4e"), langs: ["Bangla", "English"], email: "#", linkedin: "#" },
  { name: "Mitu Sultana", role: "Ticketing & Travel Executive", dept: "travel", city: "Sylhet", photo: u("photo-1544005313-94ddf0286df2"), langs: ["Bangla", "English"], email: "#" },
  { name: "Sourav Das", role: "International Coordinator", dept: "abroad", city: "Kolkata, India", photo: u("photo-1506794778202-cad84cf45f1d"), langs: ["Bangla", "Hindi", "English"], email: "#", linkedin: "#" },
  { name: "Priya Nair", role: "Hospital Liaison", dept: "abroad", city: "Chennai, India", photo: u("photo-1580489944761-15a19d654956"), langs: ["Tamil", "Hindi", "English"], email: "#" },
  { name: "Anan Chaiyaporn", role: "Patient Assistant", dept: "abroad", city: "Bangkok, Thailand", photo: u("photo-1519085360753-af0119f7cbe7"), langs: ["Thai", "English"], email: "#" },
  { name: "Habibur Rahman", role: "Accounts & Admin", dept: "support", city: "Dhaka", photo: u("photo-1463453091185-61582044d556"), langs: ["Bangla", "English"], email: "#" },
  { name: "Farzana Yasmin", role: "Customer Support Lead", dept: "support", city: "Dhaka", photo: u("photo-1487412720507-e7ab37603c6f"), langs: ["Bangla", "English"], email: "#", linkedin: "#" },
];

const offices = [
  { city: "Dhaka", country: "Bangladesh", flag: "🇧🇩", type: "Head Office", team: 18 },
  { city: "Chattogram", country: "Bangladesh", flag: "🇧🇩", type: "Branch Office", team: 5 },
  { city: "Kolkata", country: "India", flag: "🇮🇳", type: "Patient Help Desk", team: 4 },
  { city: "Chennai", country: "India", flag: "🇮🇳", type: "Patient Help Desk", team: 3 },
  { city: "Bangkok", country: "Thailand", flag: "🇹🇭", type: "Liaison Office", team: 2 },
];

const values = [
  { icon: "heart", title: "Care like family", text: "We treat every patient the way we would want our own parents treated." },
  { icon: "shield", title: "Honest advice", text: "Clear costs and real options. We never push a hospital for profit." },
  { icon: "clock", title: "Always available", text: "Someone from our team is reachable 24/7, wherever you are." },
  { icon: "globe", title: "With you abroad", text: "Our people on the ground help you at the airport, hotel, and hospital." },
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
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c.6-3.4 3-5 6-5s5.4 1.6 6 5" /><circle cx="17" cy="9" r="2.4" /><path d="M16.5 14.2c2.4.2 4 1.7 4.5 4.3" /></>,
  heart: <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />,
  shield: <><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  linkedin: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  language: <><path d="M4 5h9M8.5 3v2M6 5c0 4 3 7 6 8M11 5c0 4-3 7-6 8" /><path d="M13 21l4-9 4 9M14.5 18h5" /></>,
  quote: <path d="M4 18v-5.5C4 8.4 6.2 6 10 5.5V8c-2 .5-3 1.7-3 4h3v6zm10 0v-5.5c0-4.1 2.2-6.5 6-7V8c-2 .5-3 1.7-3 4h3v6z" fill="currentColor" stroke="none" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18" /></>,
  building: <><rect x="4" y="3" width="16" height="18" rx="1.5" /><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
};

const Icon = ({ name, size = 22 }) => (
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

const Reveal = ({ children, className = "", delay = 0, as: Tag = "div", style, ...rest }) => {
  const [ref, shown] = useInView();
  return (
    <Tag ref={ref} className={`tm-reveal ${shown ? "is-shown" : ""} ${className}`} style={{ "--d": `${delay}s`, ...style }} {...rest}>
      {children}
    </Tag>
  );
};

const initialsOf = (name) =>
  name.replace(/^(Dr\.|Md\.)\s*/gi, "").split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

// Photo, na thakle initials
const Photo = ({ p, className = "" }) => {
  const [failed, setFailed] = useState(!p.photo);
  return (
    <span className={`tm-photo ${className}`}>
      {failed ? <b>{initialsOf(p.name)}</b> : <img src={p.photo} alt="" loading="lazy" onError={() => setFailed(true)} />}
    </span>
  );
};

const Socials = ({ p }) => (
  <span className="tm-socials">
    {p.email && (
      <a href={p.email === "#" ? "#" : `mailto:${p.email}`} aria-label={`Email ${p.name}`}>
        <Icon name="mail" size={16} />
      </a>
    )}
    {p.linkedin && (
      <a href={p.linkedin} target="_blank" rel="noreferrer" aria-label={`${p.name} on LinkedIn`}>
        <Icon name="linkedin" size={16} />
      </a>
    )}
  </span>
);

/* ---------------------------- PAGE ---------------------------- */
const Team = () => {
  const [dept, setDept] = useState("all");
  const [active, setActive] = useState(0); // leader spotlight

  const list = useMemo(() => (dept === "all" ? members : members.filter((m) => m.dept === dept)), [dept]);
  const countOf = (id) => (id === "all" ? members.length : members.filter((m) => m.dept === id).length);
  const total = leaders.length + members.length;
  const L = leaders[active];
  const stack = [...leaders, ...members].slice(0, 5);

  return (
    <main className="tm-page">
      {/* ================= HERO ================= */}
      <section className="tm-hero">
        <div className="tm-container tm-hero-grid">
          <div className="tm-hero-text">
            <span className="tm-chip tm-in" style={{ "--d": "0s" }}>
              <Icon name="users" size={16} /> Our Team
            </span>
            <h1 className="tm-in" style={{ "--d": "0.1s" }}>
              The people who <span>walk with you</span> on every step
            </h1>
            <p className="tm-in" style={{ "--d": "0.2s" }}>
              Coordinators, doctors, visa experts, and on-ground helpers in Bangladesh and abroad, all working
              together so you can focus on getting better.
            </p>
            <div className="tm-hero-stats tm-in" style={{ "--d": "0.3s" }}>
              <div>
                <strong>{total}+</strong>
                <span>Team members</span>
              </div>
              <div>
                <strong>{offices.length}</strong>
                <span>Offices & desks</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>Support</span>
              </div>
            </div>
          </div>

          {/* Avatar mosaic */}
          <div className="tm-mosaic tm-in" style={{ "--d": "0.25s" }} aria-hidden="true">
            {stack.map((p, i) => (
              <Photo key={p.name} p={p} className={`tm-mosaic-${i}`} />
            ))}
            <span className="tm-mosaic-badge">
              <Icon name="heart" size={18} /> Caring for patients like family
            </span>
          </div>
        </div>
      </section>

      {/* ================= LEADERSHIP SPOTLIGHT ================= */}
      <section className="tm-section">
        <div className="tm-container">
          <Reveal className="tm-head">
            <span className="tm-label">Leadership</span>
            <h2 className="tm-title">Meet the people leading the way</h2>
          </Reveal>

          <Reveal className="tm-lead">
            <div className="tm-lead-tabs" role="tablist" aria-label="Leadership team">
              {leaders.map((p, i) => (
                <button
                  key={p.name}
                  type="button"
                  role="tab"
                  id={`tm-lt-${i}`}
                  aria-selected={active === i}
                  aria-controls="tm-lead-panel"
                  className={active === i ? "is-on" : ""}
                  onClick={() => setActive(i)}
                >
                  <Photo p={p} className="tm-lead-thumb" />
                  <span>
                    <strong>{p.name}</strong>
                    <small>{p.role}</small>
                  </span>
                </button>
              ))}
            </div>

            <div className="tm-lead-panel" role="tabpanel" id="tm-lead-panel" aria-labelledby={`tm-lt-${active}`} key={active}>
              <Photo p={L} className="tm-lead-photo" />
              <div className="tm-lead-body">
                <span className="tm-lead-quote-icon"><Icon name="quote" size={40} /></span>
                <blockquote>{L.quote}</blockquote>
                <h3>{L.name}</h3>
                <p className="tm-lead-role">{L.role}</p>
                <p className="tm-lead-bio">{L.bio}</p>
                <Socials p={L} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= TEAM GRID ================= */}
      <section className="tm-section tm-section--soft">
        <div className="tm-container">
          <Reveal className="tm-head">
            <span className="tm-label">Our People</span>
            <h2 className="tm-title">The team behind every journey</h2>
            <p>Hover or focus a card to see languages and contact details.</p>
          </Reveal>

          <div className="tm-depts" role="group" aria-label="Filter by department">
            {departments.map((d) => (
              <button key={d.id} type="button" aria-pressed={dept === d.id} className={dept === d.id ? "is-on" : ""} onClick={() => setDept(d.id)}>
                {d.label} <b>{countOf(d.id)}</b>
              </button>
            ))}
          </div>

          <div className="tm-grid">
            {list.map((m, i) => (
              <article key={`${dept}-${m.name}`} className="tm-card" style={{ "--i": i }} tabIndex={0}>
                <div className="tm-card-media">
                  <Photo p={m} className="tm-card-photo" />
                  <div className="tm-card-hover">
                    <span className="tm-card-langs">
                      <Icon name="language" size={15} /> {m.langs.join(" · ")}
                    </span>
                    <Socials p={m} />
                  </div>
                </div>
                <div className="tm-card-body">
                  <h3>{m.name}</h3>
                  <p>{m.role}</p>
                  <small><Icon name="pin" size={13} /> {m.city}</small>
                </div>
                <span className="tm-card-dept">{departments.find((d) => d.id === m.dept)?.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="tm-section">
        <div className="tm-container tm-values-wrap">
          <Reveal className="tm-values-intro">
            <span className="tm-label">How We Work</span>
            <h2 className="tm-title">What every team member promises</h2>
            <p>Different roles, one shared promise: patients first, always.</p>
          </Reveal>
          <ol className="tm-values">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.08} className="tm-value">
                <span className="tm-value-no">0{i + 1}</span>
                <span className="tm-value-icon"><Icon name={v.icon} size={24} /></span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

     
     
      
    </main>
  );
};

export default Team;
