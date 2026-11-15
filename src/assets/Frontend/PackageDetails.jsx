import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../Css/PackageDetails.css";

import {
  packages,
  categories,
  getPackage,
  packageLink,
  commonSupport,
  commonExcluded,
  usd,
  HOTLINE,
  HOTLINE_LINK,
  WHATSAPP_LINK,
} from "./packageData";
import { getHospital, hospitalLink } from "./hospitalData";
import { Icon, Star, Pic, Reveal } from "./HospitalUi";

const initial = { name: "", phone: "", hospital: "", month: "", companions: 1, notes: "" };

const PackageDetails = () => {
  const { slug } = useParams();
  const p = getPackage(slug);

  const defaultTier = p ? Math.max(0, p.tiers.findIndex((t) => t.best)) : 0;
  const [tier, setTier] = useState(defaultTier);
  const [openGroup, setOpenGroup] = useState(0);
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  // Notun package e gele shob reset + upore scroll
  useEffect(() => {
    setTier(defaultTier);
    setOpenGroup(0);
    setForm(initial);
    setErrors({});
    setStatus("idle");
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (!p) {
    return (
      <main className="pd-page">
        <div className="pd-container pd-notfound">
          <span><Icon name="search" size={38} /></span>
          <h1>Package not found</h1>
          <p>This package may have been renamed or removed. Please see all our treatment packages.</p>
          <Link to="/packages" className="pd-btn">
            View all packages <Icon name="arrow" size={16} />
          </Link>
        </div>
      </main>
    );
  }

  const cat = categories.find((c) => c.id === p.category);
  const hospitals = p.hospitals.map((h) => getHospital(h.country, h.slug)).filter(Boolean);
  const countries = [...new Set(hospitals.map((h) => h.country))];
  const t = p.tiers[tier];
  const related = packages.filter((x) => x.slug !== p.slug).slice(0, 3);

  const toBook = (e) => {
    e?.preventDefault();
    document.getElementById("pd-book")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const chooseTier = (i) => {
    setTier(i);
    toBook();
  };

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
    setErrors(er);
    if (Object.keys(er).length) return;
    setStatus("sending");
    /* EKHANE tomar backend / API call boshao. Jemon:
       await fetch("/api/package-booking", { method: "POST", headers: {"Content-Type":"application/json"},
         body: JSON.stringify({ ...form, package: p.title, option: t.name, price: t.price }) }); */
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
  };

  const err = (n) => errors[n] && <span className="pd-error">{errors[n]}</span>;

  return (
    <main className="pd-page" style={{ "--c": p.color }}>
      {/* ================= HERO ================= */}
      <section className="pd-hero">
        <div className="pd-container">
          <nav className="pd-crumbs hx-in" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <Icon name="right" size={13} />
            <Link to="/packages">Packages</Link>
            <Icon name="right" size={13} />
            <span aria-current="page">{p.title}</span>
          </nav>

          <div className="pd-hero-grid">
            <div className="pd-hero-text">
              <div className="pd-tags hx-in" style={{ "--d": "0.05s" }}>
                <span className="pd-tag"><Icon name={cat?.icon || p.icon} size={15} /> {cat?.label}</span>
                {p.popular && <span className="pd-tag pd-tag--hot">Most Popular</span>}
              </div>
              <h1 className="hx-in" style={{ "--d": "0.1s" }}>{p.title}</h1>
              <div className="pd-rating hx-in" style={{ "--d": "0.15s" }}>
                <span className="pd-stars" aria-hidden="true">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} size={15} />
                  ))}
                </span>
                <b>{p.rating}</b> <small>from {p.reviews} patients</small>
              </div>
              <p className="hx-in" style={{ "--d": "0.2s" }}>{p.short}</p>

              <ul className="pd-facts hx-in" style={{ "--d": "0.25s" }}>
                <li>
                  <span><Icon name="calendar" size={20} /></span>
                  <div><small>Trip length</small><strong>{p.days} days</strong></div>
                </li>
                <li>
                  <span><Icon name="bed" size={20} /></span>
                  <div><small>Hospital stay</small><strong>{p.hospitalStay}</strong></div>
                </li>
                <li>
                  <span><Icon name="globe" size={20} /></span>
                  <div><small>Countries</small><strong>{countries.join(", ")}</strong></div>
                </li>
              </ul>

              <div className="pd-hero-actions hx-in" style={{ "--d": "0.3s" }}>
                <div className="pd-from">
                  <small>Starting from</small>
                  <strong>{usd(p.price)}</strong>
                </div>
                <a href="#pd-book" className="pd-btn" onClick={toBook}>
                  Book This Package <Icon name="arrow" size={16} />
                </a>
              </div>
            </div>

            <div className="pd-hero-media hx-in" style={{ "--d": "0.2s" }}>
              <Pic src={p.img} alt={p.title} className="pd-hero-pic" />
              <div className="pd-hero-float">
                <span><Icon name="shield" size={20} /></span>
                <div>
                  <strong>{hospitals.length} accredited hospitals</strong>
                  <small>Choose the one you prefer</small>
                </div>
              </div>
              <span className="pd-hero-icon" aria-hidden="true"><Icon name={p.icon} size={30} /></span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BODY ================= */}
      <div className="pd-container pd-layout">
        <div className="pd-main">
          {/* About */}
          <Reveal as="section" className="pd-block">
            <span className="pd-label">About the package</span>
            <h2 className="pd-title">What this package is for</h2>
            <p className="pd-para">{p.about}</p>
          </Reveal>

          {/* Options / tiers */}
          <section className="pd-block">
            <Reveal>
              <span className="pd-label">Package options</span>
              <h2 className="pd-title">Choose the option that fits you</h2>
            </Reveal>
            <div className="pd-tiers" role="radiogroup" aria-label="Package options">
              {p.tiers.map((x, i) => (
                <Reveal key={x.name} delay={i * 0.08} className={`pd-tier ${tier === i ? "is-on" : ""} ${x.best ? "is-best" : ""}`}>
                  {x.best && <span className="pd-tier-best">Recommended</span>}
                  <h3>{x.name}</h3>
                  <small>{x.note}</small>
                  <strong className="pd-tier-price">{usd(x.price)}</strong>
                  <ul>
                    {x.features.map((f) => (
                      <li key={f}><Icon name="check" size={14} /> {f}</li>
                    ))}
                  </ul>
                  <button type="button" role="radio" aria-checked={tier === i} className="pd-tier-btn" onClick={() => chooseTier(i)}>
                    {tier === i ? "Selected" : "Select"}
                  </button>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Includes (accordion) */}
          <section className="pd-block">
            <Reveal>
              <span className="pd-label">What's included</span>
              <h2 className="pd-title">Tests, treatment & care</h2>
            </Reveal>
            <div className="pd-groups">
              {p.includes.map((g, i) => {
                const open = openGroup === i;
                return (
                  <Reveal key={g.group} delay={i * 0.05} className={`pd-group ${open ? "is-open" : ""}`}>
                    <h3>
                      <button type="button" aria-expanded={open} aria-controls={`pd-g-${i}`} onClick={() => setOpenGroup(open ? null : i)}>
                        <span className="pd-group-no">{String(i + 1).padStart(2, "0")}</span>
                        <span className="pd-group-name">{g.group}</span>
                        <span className="pd-group-count">{g.items.length} items</span>
                        <span className="pd-group-icon" aria-hidden="true"><Icon name="right" size={16} /></span>
                      </button>
                    </h3>
                    <div className="pd-group-body" id={`pd-g-${i}`} role="region">
                      <div>
                        <ul>
                          {g.items.map((it) => (
                            <li key={it}><Icon name="check" size={14} /> {it}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </section>

          {/* Itinerary */}
          <section className="pd-block">
            <Reveal>
              <span className="pd-label">Your plan</span>
              <h2 className="pd-title">Day-by-day itinerary</h2>
            </Reveal>
            <ol className="pd-timeline">
              {p.itinerary.map((s, i) => (
                <Reveal as="li" key={s.day} delay={i * 0.08}>
                  <span className="pd-tl-dot" aria-hidden="true">{i + 1}</span>
                  <div className="pd-tl-card">
                    <span className="pd-tl-day">{s.day}</span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </section>

          {/* Hospitals */}
          {hospitals.length > 0 && (
            <section className="pd-block">
              <Reveal>
                <span className="pd-label">Where you can get it</span>
                <h2 className="pd-title">Partner hospitals for this package</h2>
              </Reveal>
              <div className="pd-hospitals">
                {hospitals.map((h, i) => (
                  <Reveal key={h.slug} delay={i * 0.08}>
                    <Link to={hospitalLink(h)} className="pd-hospital">
                      <Pic src={h.cover} alt="" className="pd-hospital-pic" />
                      <div>
                        <h3>{h.name}</h3>
                        <p><Icon name="pin" size={13} /> {h.city}, {h.country}</p>
                        <span className="pd-hospital-meta">
                          <span><Star size={12} /> {h.rating}</span>
                          <span>{h.accreditations.join(" · ")}</span>
                        </span>
                      </div>
                      <span className="pd-hospital-go" aria-hidden="true"><Icon name="arrow" size={16} /></span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {/* Included vs not */}
          <section className="pd-block">
            <Reveal className="pd-compare">
              <div className="pd-yes">
                <h3><Icon name="check" size={18} /> Our support (free)</h3>
                <ul>
                  {commonSupport.map((s) => (
                    <li key={s}><Icon name="check" size={14} /> {s}</li>
                  ))}
                </ul>
              </div>
              <div className="pd-no">
                <h3><Icon name="close" size={18} /> Not included</h3>
                <ul>
                  {commonExcluded.map((s) => (
                    <li key={s}><Icon name="close" size={14} /> {s}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </section>
        </div>

        {/* ================= SIDEBAR BOOKING ================= */}
        <aside className="pd-side">
          <div className="pd-book" id="pd-book">
            <div className="pd-book-head">
              <small>Selected option</small>
              <div className="pd-book-tier">
                <strong>{t.name}</strong>
                <span>{usd(t.price)}</span>
              </div>
              <div className="pd-book-switch" role="group" aria-label="Change option">
                {p.tiers.map((x, i) => (
                  <button key={x.name} type="button" aria-pressed={tier === i} className={tier === i ? "is-on" : ""} onClick={() => setTier(i)}>
                    {x.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="pd-book-body">
              {status === "success" ? (
                <div className="pd-success" role="status">
                  <span><Icon name="check" size={30} /></span>
                  <h3>Booking request sent!</h3>
                  <p>
                    Thank you, {form.name.split(" ")[0]}. Our coordinator will call you about the <b>{t.name}</b> option of
                    the {p.title}.
                  </p>
                  <button type="button" className="pd-btn pd-btn--block" onClick={() => { setForm(initial); setStatus("idle"); }}>
                    New request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className={`pd-field ${errors.name ? "has-error" : ""}`}>
                    <label htmlFor="pd-name">Patient name *</label>
                    <input id="pd-name" name="name" placeholder="Full name" value={form.name} onChange={handleInput} />
                    {err("name")}
                  </div>
                  <div className={`pd-field ${errors.phone ? "has-error" : ""}`}>
                    <label htmlFor="pd-phone">Phone / WhatsApp *</label>
                    <input id="pd-phone" name="phone" type="tel" placeholder="+880 1XXX-XXXXXX" value={form.phone} onChange={handleInput} />
                    {err("phone")}
                  </div>
                  <div className="pd-row">
                    <div className="pd-field">
                      <label htmlFor="pd-hosp">Hospital</label>
                      <select id="pd-hosp" name="hospital" value={form.hospital} onChange={handleInput}>
                        <option value="">Any / advise me</option>
                        {hospitals.map((h) => (
                          <option key={h.slug} value={h.name}>{h.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="pd-field">
                      <label htmlFor="pd-month">Travel month</label>
                      <input id="pd-month" name="month" type="month" value={form.month} onChange={handleInput} />
                    </div>
                  </div>
                  <div className="pd-field">
                    <span className="pd-field-label" id="pd-comp-label">Companions</span>
                    <div className="pd-stepper" role="group" aria-labelledby="pd-comp-label">
                      <button type="button" aria-label="Fewer companions" disabled={form.companions <= 0} onClick={() => setForm((f) => ({ ...f, companions: f.companions - 1 }))}>
                        −
                      </button>
                      <output aria-live="polite">{form.companions}</output>
                      <button type="button" aria-label="More companions" disabled={form.companions >= 4} onClick={() => setForm((f) => ({ ...f, companions: f.companions + 1 }))}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="pd-field">
                    <label htmlFor="pd-notes">Medical notes (optional)</label>
                    <textarea id="pd-notes" name="notes" rows="2" placeholder="Diagnosis, age, current reports" value={form.notes} onChange={handleInput} />
                  </div>
                  <button type="submit" className="pd-btn pd-btn--block" disabled={status === "sending"}>
                    {status === "sending" ? (
                      <>
                        <span className="pd-spinner" aria-hidden="true" /> Sending...
                      </>
                    ) : (
                      <>
                        Request Booking <Icon name="arrow" size={16} />
                      </>
                    )}
                  </button>
                  <p className="pd-book-note">No payment now. We confirm the final price first.</p>
                </form>
              )}
            </div>
          </div>

          <div className="pd-help">
            <a href={HOTLINE_LINK}>
              <Icon name="phone" size={18} />
              <span><small>Call us</small>{HOTLINE}</span>
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
              <Icon name="chat" size={18} />
              <span><small>Chat on</small>WhatsApp</span>
            </a>
          </div>
        </aside>
      </div>

      {/* ================= RELATED ================= */}
      <section className="pd-related">
        <div className="pd-container">
          <div className="pd-related-head">
            <div>
              <span className="pd-label">More packages</span>
              <h2 className="pd-title">You may also be interested in</h2>
            </div>
            <Link to="/packages" className="pd-btn pd-btn--line">
              All packages <Icon name="arrow" size={16} />
            </Link>
          </div>
          <div className="pd-related-grid">
            {related.map((r) => (
              <Link key={r.slug} to={packageLink(r)} className="pd-rel" style={{ "--rc": r.color }}>
                <span className="pd-rel-icon"><Icon name={r.icon} size={24} /></span>
                <h3>{r.title}</h3>
                <p>{r.short}</p>
                <span className="pd-rel-foot">
                  <span>
                    <small>From</small> <strong>{usd(r.price)}</strong>
                  </span>
                  <span className="pd-rel-go" aria-hidden="true"><Icon name="arrow" size={16} /></span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MOBILE BAR ================= */}
      <div className="pd-mobile-bar">
        <div>
          <small>{t.name}</small>
          <strong>{usd(t.price)}</strong>
        </div>
        <a href="#pd-book" className="pd-btn" onClick={toBook}>
          Book Now <Icon name="arrow" size={16} />
        </a>
      </div>
    </main>
  );
};

export default PackageDetails;
