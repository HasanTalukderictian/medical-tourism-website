import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/Events.css";

/* ---------------------------- IMAGES ----------------------------
   Event er image pele import kore `image` field e boshao. Jemon:
   import campImg from "../Image/events/camp.jpg";   ->   image: campImg
   Image na thakle sundor placeholder dekhabe.
------------------------------------------------------------------- */

/* ---------------------------- DATA ---------------------------- */
/* Ei event gulo SAMPLE. Tomar asol event diye replace koro.
   `date` format: "YYYY-MM-DDTHH:mm:ss". Date dekhe nijei Upcoming ba Past e chole jabe. */
const types = ["All", "Health Camp", "Seminar", "Webinar", "Hospital Visit"];

const events = [
  {
    id: 1,
    title: "Free Health Screening Camp",
    type: "Health Camp",
    date: "2026-12-12T10:00:00",
    time: "10:00 AM - 4:00 PM",
    location: "Dhaka, Bangladesh",
    mode: "In-person",
    desc: "Meet our team, get a basic health check, and learn how to plan treatment at partner hospitals.",
    image: null,
  },
  {
    id: 2,
    title: "Medical Tourism Info Session",
    type: "Webinar",
    date: "2026-12-05T17:00:00",
    time: "5:00 PM - 6:30 PM",
    location: "Live on Zoom",
    mode: "Online",
    desc: "Learn how treatment abroad works: hospitals, visa, cost estimates, and what support you get.",
    image: null,
  },
  {
    id: 3,
    title: "Partner Hospital Visit Program",
    type: "Hospital Visit",
    date: "2027-01-18T09:00:00",
    time: "9:00 AM - 5:00 PM",
    location: "India",
    mode: "In-person",
    desc: "A guided visit to our partner hospitals to see the facilities and meet the specialists.",
    image: null,
  },
  {
    id: 4,
    title: "Patient & Family Support Workshop",
    type: "Seminar",
    date: "2027-01-25T15:00:00",
    time: "3:00 PM - 5:00 PM",
    location: "Dhaka, Bangladesh",
    mode: "In-person",
    desc: "Practical guidance for patients and families on preparing documents, travel, and recovery.",
    image: null,
  },
  {
    id: 5,
    title: "Cancer Awareness Seminar",
    type: "Seminar",
    date: "2026-10-20T14:00:00",
    time: "2:00 PM - 5:00 PM",
    location: "Dhaka, Bangladesh",
    mode: "In-person",
    desc: "Specialists shared early signs, screening, and treatment options in an open Q&A session.",
    image: null,
  },
  {
    id: 6,
    title: "Meet the Specialist Webinar",
    type: "Webinar",
    date: "2026-09-30T18:00:00",
    time: "6:00 PM - 7:00 PM",
    location: "Live on Zoom",
    mode: "Online",
    desc: "An online session where patients asked questions directly to partner hospital doctors.",
    image: null,
  },
  {
    id: 7,
    title: "Community Health Camp",
    type: "Health Camp",
    date: "2026-08-15T10:00:00",
    time: "10:00 AM - 3:00 PM",
    location: "Chattogram, Bangladesh",
    mode: "In-person",
    desc: "Free check-ups and guidance for families, together with local doctors and volunteers.",
    image: null,
  },
];

/* ---------------------------- HELPERS ---------------------------- */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const formatLong = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "long", year: "numeric" });

const getParts = (ms) => {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
};

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

const CalendarIcon = () => (
  <svg {...base} width="16" height="16">
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M8 3v4M16 3v4M3 10h18" />
  </svg>
);

const ClockIcon = () => (
  <svg {...base} width="16" height="16">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const PinIcon = () => (
  <svg {...base} width="16" height="16">
    <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const VideoIcon = () => (
  <svg {...base} width="16" height="16">
    <rect x="3" y="6" width="13" height="12" rx="2" />
    <path d="M16 10l5-3v10l-5-3" />
  </svg>
);

const ArrowIcon = () => (
  <svg {...base} width="14" height="14" strokeWidth="2">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

const CrossIcon = () => (
  <svg {...base} width="40" height="40" strokeWidth="1.6">
    <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3z" />
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
      { threshold: 0.1 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`ev-reveal ev-reveal--${direction} ${shown ? "is-shown" : ""} ${className}`}
      style={{ "--d": `${delay}s` }}
    >
      {children}
    </div>
  );
};

/* ------------------- Countdown ------------------- */
const Countdown = ({ target }) => {
  const [left, setLeft] = useState(() => new Date(target).getTime() - Date.now());

  useEffect(() => {
    const id = setInterval(() => setLeft(new Date(target).getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);

  const { days, hours, minutes, seconds } = getParts(left);
  const items = [
    ["Days", days],
    ["Hours", hours],
    ["Minutes", minutes],
    ["Seconds", seconds],
  ];

  return (
    <div className="ev-count" role="timer" aria-label="Time left until the event">
      {items.map(([label, value]) => (
        <div className="ev-count-box" key={label}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};

/* Image na thakle placeholder */
const Cover = ({ src, alt, className = "" }) => {
  const [failed, setFailed] = useState(!src);
  return (
    <div className={`ev-cover ${failed ? "ev-cover--empty" : ""} ${className}`}>
      {failed ? <CrossIcon /> : <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />}
    </div>
  );
};

const DateBadge = ({ iso, past }) => {
  const d = new Date(iso);
  return (
    <div className={`ev-date ${past ? "is-past" : ""}`} aria-hidden="true">
      <strong>{d.getDate()}</strong>
      <span>{MONTHS[d.getMonth()]}</span>
    </div>
  );
};

/* ---------------------------- PAGE ---------------------------- */
const Events = () => {
  const [tab, setTab] = useState("upcoming");
  const [type, setType] = useState("All");

  // Render er somoy ekbar "ekhon" dhore upcoming/past bhag kora hobe
  const now = useMemo(() => Date.now(), []);

  const upcoming = useMemo(
    () => events.filter((e) => new Date(e.date).getTime() >= now).sort((a, b) => new Date(a.date) - new Date(b.date)),
    [now]
  );
  const past = useMemo(
    () => events.filter((e) => new Date(e.date).getTime() < now).sort((a, b) => new Date(b.date) - new Date(a.date)),
    [now]
  );

  const isUpcomingTab = tab === "upcoming";
  const source = isUpcomingTab ? upcoming : past;
  const byType = type === "All" ? source : source.filter((e) => e.type === type);

  // Nearest upcoming event ta boro featured card e dekhabe (shudhu Upcoming + All e)
  const featured = isUpcomingTab && type === "All" ? upcoming[0] : null;
  const list = featured ? byType.filter((e) => e.id !== featured.id) : byType;

  return (
    <main className="ev-page">
      {/* ================= HERO ================= */}
      <section className="ev-hero">
        <div className="ev-blob ev-blob--one" aria-hidden="true" />
        <div className="ev-blob ev-blob--two" aria-hidden="true" />

        <div className="ev-container ev-hero-inner">
          <span className="ev-badge ev-in" style={{ "--d": "0s" }}>Events</span>
          <h1 className="ev-hero-title ev-in" style={{ "--d": "0.1s" }}>
            Meet us, learn more, <em>and ask anything</em>
          </h1>
          <p className="ev-hero-desc ev-in" style={{ "--d": "0.2s" }}>
            Join our health camps, seminars, webinars, and hospital visits to understand your treatment
            options and meet the people who will guide you.
          </p>

          <div className="ev-tabs ev-in" style={{ "--d": "0.3s" }} role="tablist" aria-label="Event time">
            <button
              type="button"
              role="tab"
              aria-selected={isUpcomingTab}
              className={`ev-tab ${isUpcomingTab ? "is-active" : ""}`}
              onClick={() => setTab("upcoming")}
            >
              Upcoming <em>{upcoming.length}</em>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={!isUpcomingTab}
              className={`ev-tab ${!isUpcomingTab ? "is-active" : ""}`}
              onClick={() => setTab("past")}
            >
              Past Events <em>{past.length}</em>
            </button>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="ev-section">
        <div className="ev-container">
          {/* Type chips */}
          <div className="ev-chips" role="group" aria-label="Event type">
            {types.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={type === t}
                className={`ev-chip ${type === t ? "is-active" : ""}`}
                onClick={() => setType(t)}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Featured (nearest upcoming) */}
          {featured && (
            <Reveal className="ev-featured-wrap">
              <article className="ev-featured">
                <Cover src={featured.image} alt={featured.title} className="ev-featured-cover" />
                <div className="ev-featured-body">
                  <span className="ev-flag">Next Event</span>
                  <h2>{featured.title}</h2>
                  <p>{featured.desc}</p>

                  <ul className="ev-meta">
                    <li><CalendarIcon /> {formatLong(featured.date)}</li>
                    <li><ClockIcon /> {featured.time}</li>
                    <li>{featured.mode === "Online" ? <VideoIcon /> : <PinIcon />} {featured.location}</li>
                  </ul>

                  <Countdown target={featured.date} />

                  <Link to="/contact" className="ev-btn">
                    Register Now <ArrowIcon />
                  </Link>
                </div>
              </article>
            </Reveal>
          )}

          {/* Grid. key => tab/filter bodlale animation abar chole */}
          {list.length > 0 ? (
            <div className="ev-grid" key={`${tab}-${type}`}>
              {list.map((e, i) => (
                <Reveal key={e.id} delay={Math.min(i, 5) * 0.08} className="ev-card-wrap">
                  <article className={`ev-card ${!isUpcomingTab ? "is-past" : ""}`}>
                    <div className="ev-card-top">
                      <Cover src={e.image} alt={e.title} className="ev-card-cover" />
                      <DateBadge iso={e.date} past={!isUpcomingTab} />
                      <span className="ev-type">{e.type}</span>
                    </div>

                    <div className="ev-card-body">
                      <h3>{e.title}</h3>
                      <p>{e.desc}</p>

                      <ul className="ev-meta ev-meta--sm">
                        <li><ClockIcon /> {e.time}</li>
                        <li>{e.mode === "Online" ? <VideoIcon /> : <PinIcon />} {e.location}</li>
                      </ul>

                      {isUpcomingTab ? (
                        <Link to="/contact" className="ev-more">
                          Register <ArrowIcon />
                        </Link>
                      ) : (
                        <Link to="/gallery" className="ev-more ev-more--muted">
                          View photos <ArrowIcon />
                        </Link>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          ) : (
            !featured && (
              <div className="ev-empty">
                <h3>{isUpcomingTab ? "No upcoming events right now" : "No past events found"}</h3>
                <p>
                  {isUpcomingTab
                    ? "New events are coming soon. Contact us and we will let you know."
                    : "Try a different event type."}
                </p>
                {type !== "All" && (
                  <button type="button" className="ev-btn ev-btn--ghost" onClick={() => setType("All")}>
                    Show all types
                  </button>
                )}
              </div>
            )
          )}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="ev-cta-wrap">
        <div className="ev-container">
          <Reveal className="ev-cta">
            <div>
              <h2>Do not want to miss our next event?</h2>
              <p>Contact us and our team will keep you updated about upcoming camps, seminars, and webinars.</p>
            </div>
            <Link to="/contact" className="ev-btn ev-btn--white">
              Contact Us <ArrowIcon />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default Events;
