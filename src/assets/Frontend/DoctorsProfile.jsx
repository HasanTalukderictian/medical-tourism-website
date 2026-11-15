import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "../../Css/DoctorsProfile.css";

import { doctors, getDoctor, doctorLink, initials, slotTimes, sampleReviews, HOTLINE, HOTLINE_LINK } from "./doctorData";
import { getHospital, hospitalLink } from "./hospitalData";
import { Icon, Star, Reveal, specialtyIcon } from "./HospitalUi";

const tabs = [
  { id: "about", label: "About" },
  { id: "experience", label: "Education & Experience" },
  { id: "reviews", label: "Reviews" },
];

const dayShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Porer 14 din
const nextDays = (n = 14) => {
  const out = [];
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  for (let i = 0; i < n; i++) {
    const d = new Date(t);
    d.setDate(t.getDate() + i);
    out.push(d);
  }
  return out;
};

// Demo: kichu slot "booked" dekhanor jonno (backend thakle sekhan theke ashbe)
const isBooked = (date, time, seed) => (date.getDate() * 7 + time.charCodeAt(1) * 3 + Number(time.slice(0, 2)) + seed) % 5 === 0;

const Avatar = ({ d, className = "" }) => {
  const [failed, setFailed] = useState(!d.photo);
  useEffect(() => setFailed(!d.photo), [d.photo]);
  return (
    <span className={`dp-avatar ${className}`}>
      {failed ? <b>{initials(d.name)}</b> : <img src={d.photo} alt={d.name} onError={() => setFailed(true)} />}
    </span>
  );
};

const initialForm = { name: "", phone: "", note: "" };

const DoctorsProfile = () => {
  const { slug } = useParams();
  const { hash } = useLocation();
  const d = getDoctor(slug);
  const h = d ? getHospital(d.hospital.country, d.hospital.slug) : null;

  const [tab, setTab] = useState("about");
  const [mode, setMode] = useState("visit"); // visit | video
  const days = useMemo(() => nextDays(14), []);
  const firstAvail = d ? days.findIndex((x) => d.days.includes(x.getDay())) : 0;
  const [dayIdx, setDayIdx] = useState(firstAvail);
  const [time, setTime] = useState("");
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const tabRefs = useRef({});

  // Doctor bodlale reset
  useEffect(() => {
    setTab("about");
    setMode("visit");
    setDayIdx(firstAvail);
    setTime("");
    setForm(initialForm);
    setErrors({});
    setStatus("idle");
    if (hash === "#book") {
      setTimeout(() => document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    } else {
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (!d) {
    return (
      <main className="dp-page">
        <div className="dp-container dp-notfound">
          <span><Icon name="stetho" size={38} /></span>
          <h1>Doctor not found</h1>
          <p>This profile may have moved. Please search our list of specialists.</p>
          <Link to="/doctors" className="dp-btn">
            View all doctors <Icon name="arrow" size={16} />
          </Link>
        </div>
      </main>
    );
  }

  const day = days[dayIdx];
  const dayOpen = day && d.days.includes(day.getDay());
  const fee = mode === "video" ? d.teleFee : d.fee;
  const similar = doctors.filter((x) => x.slug !== d.slug && (x.specialty === d.specialty || x.hospital.country === d.hospital.country)).slice(0, 3);
  const dist = [78, 15, 4, 2, 1]; // demo rating distribution (5★ -> 1★)

  // Tab keyboard navigation (left/right arrow)
  const onTabKey = (e, i) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length].id;
    setTab(next);
    tabRefs.current[next]?.focus();
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!time) er.time = "Please choose a time slot";
    if (!form.name.trim()) er.name = "Please enter patient name";
    if (!/^[+\d][\d\s-]{6,}$/.test(form.phone.trim())) er.phone = "Enter a valid phone number";
    setErrors(er);
    if (Object.keys(er).length) return;
    setStatus("sending");
    /* EKHANE tomar backend / API call boshao. Jemon:
       await fetch("/api/appointments", { method: "POST", headers: {"Content-Type":"application/json"},
         body: JSON.stringify({ doctor: d.slug, mode, date: day.toISOString().slice(0,10), time, ...form }) }); */
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
  };

  const dateLabel = day ? `${dayShort[day.getDay()]}, ${day.getDate()} ${monShort[day.getMonth()]}` : "";

  return (
    <main className="dp-page">
      {/* ================= HEADER ================= */}
      <section className="dp-top">
        <div className="dp-container">
         

          <div className="dp-head hx-in">
            <div className="dp-photo-wrap">
              <Avatar d={d} className="dp-photo" />
              <span className="dp-verified"><Icon name="shield" size={14} /> Verified</span>
            </div>

            <div className="dp-head-info">
              <span className="dp-spec"><Icon name={specialtyIcon(d.specialty)} size={15} /> {d.specialty}</span>
              <h1>{d.name}</h1>
              <p className="dp-deg">{d.degrees}</p>
              <p className="dp-desig">{d.designation}</p>

              {h && (
                <Link to={hospitalLink(h)} className="dp-hosp">
                  <span><Icon name="hospital" size={18} /></span>
                  <span>
                    <strong>{h.name}</strong>
                    <small>{h.city}, {h.country} · {h.accreditations.join(", ")}</small>
                  </span>
                  <Icon name="arrow" size={16} />
                </Link>
              )}

              <ul className="dp-langs" aria-label="Languages">
                <li><Icon name="language" size={15} /></li>
                {d.languages.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>

            <ul className="dp-stats">
              <li>
                <strong>{d.experience}+</strong>
                <span>Years exp.</span>
              </li>
              <li>
                <strong>{(d.patients / 1000).toFixed(d.patients % 1000 ? 1 : 0)}K+</strong>
                <span>Patients</span>
              </li>
              <li>
                <strong className="dp-star"><Star size={18} /> {d.rating}</strong>
                <span>{d.reviews} reviews</span>
              </li>
              <li>
                <strong>${d.fee}</strong>
                <span>Visit fee</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= BODY ================= */}
      <div className="dp-container dp-layout">
        <div className="dp-main">
          {/* Tabs */}
          <div className="dp-tabs" role="tablist" aria-label="Doctor details">
            {tabs.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => (tabRefs.current[t.id] = el)}
                type="button"
                role="tab"
                id={`dp-tab-${t.id}`}
                aria-selected={tab === t.id}
                aria-controls={`dp-panel-${t.id}`}
                tabIndex={tab === t.id ? 0 : -1}
                className={tab === t.id ? "is-on" : ""}
                onClick={() => setTab(t.id)}
                onKeyDown={(e) => onTabKey(e, i)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* About */}
          {tab === "about" && (
            <div className="dp-panel" role="tabpanel" id="dp-panel-about" aria-labelledby="dp-tab-about">
              <h2 className="dp-title">About {d.name.split(" ").slice(0, 2).join(" ")}</h2>
              <p className="dp-para">{d.about}</p>

              <div className="dp-highlight">
                <span><Icon name="award" size={22} /></span>
                <div>
                  <small>Experience highlight</small>
                  <strong>{d.procedures}</strong>
                </div>
              </div>

              <h3 className="dp-sub">Areas of expertise</h3>
              <ul className="dp-expertise">
                {d.expertise.map((x) => (
                  <li key={x}><Icon name="check" size={14} /> {x}</li>
                ))}
              </ul>

              <h3 className="dp-sub">Consultation options</h3>
              <div className="dp-options">
                <div className="dp-option">
                  <span><Icon name="hospital" size={22} /></span>
                  <div>
                    <strong>In-person visit</strong>
                    <small>At {h?.name}</small>
                  </div>
                  <b>${d.fee}</b>
                </div>
                <div className={`dp-option ${d.video ? "" : "is-off"}`}>
                  <span><Icon name="video" size={22} /></span>
                  <div>
                    <strong>Video consultation</strong>
                    <small>{d.video ? "From home, before you travel" : "Not available"}</small>
                  </div>
                  <b>{d.video ? `$${d.teleFee}` : "—"}</b>
                </div>
              </div>
            </div>
          )}

          {/* Experience */}
          {tab === "experience" && (
            <div className="dp-panel" role="tabpanel" id="dp-panel-experience" aria-labelledby="dp-tab-experience">
              <div className="dp-two">
                <div>
                  <h2 className="dp-title dp-title--icon"><Icon name="cap" size={22} /> Education</h2>
                  <ol className="dp-tl">
                    {d.education.map((e) => (
                      <li key={e.title}>
                        <span className="dp-tl-year">{e.year}</span>
                        <strong>{e.title}</strong>
                        <small>{e.place}</small>
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h2 className="dp-title dp-title--icon"><Icon name="briefcase" size={22} /> Work experience</h2>
                  <ol className="dp-tl dp-tl--alt">
                    {d.career.map((e) => (
                      <li key={e.title}>
                        <span className="dp-tl-year">{e.year}</span>
                        <strong>{e.title}</strong>
                        <small>{e.place}</small>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {d.awards.length > 0 && (
                <>
                  <h3 className="dp-sub">Awards & memberships</h3>
                  <ul className="dp-awards">
                    {d.awards.map((a) => (
                      <li key={a}><Icon name="award" size={18} /> {a}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          {/* Reviews */}
          {tab === "reviews" && (
            <div className="dp-panel" role="tabpanel" id="dp-panel-reviews" aria-labelledby="dp-tab-reviews">
              <div className="dp-score">
                <div className="dp-score-big">
                  <strong>{d.rating}</strong>
                  <span className="dp-stars" aria-hidden="true">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} size={16} />
                    ))}
                  </span>
                  <small>{d.reviews} reviews</small>
                </div>
                <ul className="dp-dist">
                  {dist.map((pct, i) => (
                    <li key={i}>
                      <span>{5 - i} <Star size={11} /></span>
                      <span className="dp-dist-bar"><i style={{ width: `${pct}%` }} /></span>
                      <small>{pct}%</small>
                    </li>
                  ))}
                </ul>
              </div>

              <ul className="dp-reviews">
                {sampleReviews.map((r) => (
                  <li key={r.name}>
                    <div className="dp-review-head">
                      <span className="dp-review-av">{r.name[0]}</span>
                      <div>
                        <strong>{r.name}</strong>
                        <small>{r.from} · {r.date}</small>
                      </div>
                      <span className="dp-review-stars" aria-label={`${r.rating} out of 5`}>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <span key={n} className={n <= r.rating ? "on" : ""}><Star size={13} /></span>
                        ))}
                      </span>
                    </div>
                    <p>{r.text}</p>
                  </li>
                ))}
              </ul>
              <p className="dp-review-note">Reviews shown here are demo text.</p>
            </div>
          )}
        </div>

        {/* ================= BOOKING ================= */}
        <aside className="dp-side">
          <div className="dp-book" id="book">
            <div className="dp-book-head">
              <h2>Book an appointment</h2>
              
            </div>

            {status === "success" ? (
              <div className="dp-success" role="status">
                <span><Icon name="check" size={30} /></span>
                <h3>Appointment requested!</h3>
                <p>
                  {mode === "video" ? "Video consultation" : "Hospital visit"} with {d.name} on <b>{dateLabel}</b> at <b>{time}</b>.
                  Our team will confirm by phone or WhatsApp.
                </p>
                <button type="button" className="dp-btn dp-btn--block" onClick={() => { setStatus("idle"); setTime(""); setForm(initialForm); }}>
                  Book another slot
                </button>
              </div>
            ) : (
              <form className="dp-book-body" onSubmit={handleSubmit} noValidate>
                {/* Dates */}
                <div className="dp-step-label">
                  <span>1</span> Choose a date
                </div>
                <div className="dp-dates" role="radiogroup" aria-label="Date">
                  {days.map((x, i) => {
                    const open = d.days.includes(x.getDay());
                    return (
                      <button
                        key={i}
                        type="button"
                        role="radio"
                        aria-checked={dayIdx === i}
                        aria-label={`${dayShort[x.getDay()]} ${x.getDate()} ${monShort[x.getMonth()]}${open ? "" : ", not available"}`}
                        disabled={!open}
                        className={dayIdx === i ? "is-on" : ""}
                        onClick={() => {
                          setDayIdx(i);
                          setTime("");
                        }}
                      >
                        <small>{i === 0 ? "Today" : dayShort[x.getDay()]}</small>
                        <strong>{x.getDate()}</strong>
                        <small>{monShort[x.getMonth()]}</small>
                      </button>
                    );
                  })}
                </div>

                {/* Times */}
                <div className="dp-step-label">
                  <span>2</span> Choose a time {mode === "video" && <em>(Bangladesh time)</em>}
                </div>
                {dayOpen ? (
                  Object.entries(slotTimes).map(([part, times]) => (
                    <div key={part} className="dp-slots-group">
                      <small>{part}</small>
                      <div className="dp-slots" role="radiogroup" aria-label={`${part} slots`}>
                        {times.map((tm) => {
                          const booked = isBooked(day, tm, d.experience);
                          return (
                            <button
                              key={tm}
                              type="button"
                              role="radio"
                              aria-checked={time === tm}
                              disabled={booked}
                              className={time === tm ? "is-on" : ""}
                              onClick={() => {
                                setTime(tm);
                                if (errors.time) setErrors((er) => ({ ...er, time: "" }));
                              }}
                            >
                              {tm}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="dp-closed">Doctor is not available on this day.</p>
                )}
                {errors.time && <span className="dp-error">{errors.time}</span>}

                {/* Details */}
                <div className="dp-step-label">
                  <span>3</span> Patient details
                </div>
                <div className={`dp-field ${errors.name ? "has-error" : ""}`}>
                  <label htmlFor="dp-name">Patient name *</label>
                  <input id="dp-name" name="name" placeholder="Full name" value={form.name} onChange={handleInput} />
                  {errors.name && <span className="dp-error">{errors.name}</span>}
                </div>
                <div className={`dp-field ${errors.phone ? "has-error" : ""}`}>
                  <label htmlFor="dp-phone">Phone / WhatsApp *</label>
                  <input id="dp-phone" name="phone" type="tel" placeholder="+880 1XXX-XXXXXX" value={form.phone} onChange={handleInput} />
                  {errors.phone && <span className="dp-error">{errors.phone}</span>}
                </div>
                <div className="dp-field">
                  <label htmlFor="dp-note">Reason for visit (optional)</label>
                  <textarea id="dp-note" name="note" rows="2" placeholder="Short description of the problem" value={form.note} onChange={handleInput} />
                </div>

                <div className="dp-summary">
                  <span>
                    <small>{mode === "video" ? "Video call" : "Hospital visit"}</small>
                    {dateLabel}{time && `, ${time}`}
                  </span>
                  <strong>${fee}</strong>
                </div>

                <button type="submit" className="dp-btn dp-btn--block" disabled={status === "sending"}>
                  {status === "sending" ? (
                    <>
                      <span className="dp-spinner" aria-hidden="true" /> Sending...
                    </>
                  ) : (
                    <>
                      Request Appointment <Icon name="arrow" size={16} />
                    </>
                  )}
                </button>
                <p className="dp-book-note">No payment now. We confirm the slot first.</p>
              </form>
            )}
          </div>

          <a href={HOTLINE_LINK} className="dp-call">
            <span><Icon name="phone" size={20} /></span>
            <span>
              <small>Need help booking?</small>
              <strong>{HOTLINE}</strong>
            </span>
          </a>
        </aside>
      </div>

      {/* ================= SIMILAR ================= */}
      {similar.length > 0 && (
        <section className="dp-similar">
          <div className="dp-container">
            <div className="dp-similar-head">
              <h2 className="dp-title">Similar doctors</h2>
              <Link to="/doctors" className="dp-link">
                All doctors <Icon name="arrow" size={16} />
              </Link>
            </div>
            <div className="dp-similar-grid">
              {similar.map((s, i) => {
                const sh = getHospital(s.hospital.country, s.hospital.slug);
                return (
                  <Reveal key={s.slug} delay={i * 0.08}>
                    <Link to={doctorLink(s)} className="dp-sim">
                      <Avatar d={s} className="dp-sim-photo" />
                      <div>
                        <span className="dp-sim-spec">{s.specialty}</span>
                        <h3>{s.name}</h3>
                        <p>{sh?.name}, {sh?.country}</p>
                        <span className="dp-sim-meta">
                          <span><Star size={12} /> {s.rating}</span>
                          <span>{s.experience} yrs</span>
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ================= MOBILE BAR ================= */}
      <div className="dp-mobile-bar">
        <div>
          <small>Consultation</small>
          <strong>${d.fee}</strong>
        </div>
        <a
          href="#book"
          className="dp-btn"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          Book Appointment
        </a>
      </div>
    </main>
  );
};

export default DoctorsProfile;
