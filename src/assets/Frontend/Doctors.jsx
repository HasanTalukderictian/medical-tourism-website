import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../../Css/Doctors.css";

import { doctors, doctorLink, allDocSpecialties, initials, HOTLINE, HOTLINE_LINK } from "./doctorData";
import { getHospital } from "./hospitalData";
import { Icon, Star, Reveal, specialtyIcon } from "./HospitalUi";

/* Route (App.jsx e):
   <Route path="doctors" element={<Doctors />} />
   <Route path="doctors/:slug" element={<DoctorsProfile />} />
*/

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const expOptions = [
  { id: 0, label: "Any" },
  { id: 10, label: "10+ yrs" },
  { id: 15, label: "15+ yrs" },
  { id: 20, label: "20+ yrs" },
];

const sorts = {
  rating: { label: "Top rated", fn: (a, b) => b.rating - a.rating || b.reviews - a.reviews },
  exp: { label: "Most experienced", fn: (a, b) => b.experience - a.experience },
  feeLow: { label: "Fee: low to high", fn: (a, b) => a.fee - b.fee },
  name: { label: "Name A–Z", fn: (a, b) => a.name.localeCompare(b.name) },
};

// Doctor er sathe hospital info jog
const list0 = doctors.map((d) => ({ ...d, h: getHospital(d.hospital.country, d.hospital.slug) }));
const countries = [...new Set(list0.map((d) => d.h?.country).filter(Boolean))];

// Photo, na thakle initials
const Avatar =({ d, className = "" }) => {
  const [failed, setFailed] = useState(!d.photo);
  return (
    <span className={`dc-avatar ${className}`}>
      {failed ? <b>{initials(d.name)}</b> : <img src={d.photo} alt="" loading="lazy" onError={() => setFailed(true)} />}
    </span>
  );
};

const Doctors = () => {
  const [params] = useSearchParams();
  const [query, setQuery] = useState("");
  const [specs, setSpecs] = useState(() => (params.get("specialty") ? [params.get("specialty")] : []));
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [minExp, setMinExp] = useState(0);
  const [videoOnly, setVideoOnly] = useState(false);
  const [sort, setSort] = useState("rating");
  const [drawer, setDrawer] = useState(false);

  // Mobile filter drawer khola thakle page scroll bondho
  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setDrawer(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [drawer]);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return list0
      .filter((d) => !specs.length || specs.includes(d.specialty))
      .filter((d) => !country || d.h?.country === country)
      .filter((d) => !gender || d.gender === gender)
      .filter((d) => d.experience >= minExp)
      .filter((d) => !videoOnly || d.video)
      .filter(
        (d) =>
          !q ||
          `${d.name} ${d.specialty} ${d.designation} ${d.h?.name || ""} ${d.expertise.join(" ")}`.toLowerCase().includes(q)
      )
      .sort(sorts[sort].fn);
  }, [query, specs, country, gender, minExp, videoOnly, sort]);

  const toggleSpec = (s) => setSpecs((arr) => (arr.includes(s) ? arr.filter((x) => x !== s) : [...arr, s]));
  const activeCount = specs.length + (country ? 1 : 0) + (gender ? 1 : 0) + (minExp ? 1 : 0) + (videoOnly ? 1 : 0);
  const clearAll = () => {
    setSpecs([]);
    setCountry("");
    setGender("");
    setMinExp(0);
    setVideoOnly(false);
    setQuery("");
  };

  const filters = (
    <>
      <div className="dc-fgroup">
        <h3>Specialty</h3>
        <ul>
          {allDocSpecialties.map((s) => (
            <li key={s}>
              <label className="dc-check">
                <input type="checkbox" checked={specs.includes(s)} onChange={() => toggleSpec(s)} />
                <span className="dc-box" aria-hidden="true"><Icon name="check" size={12} /></span>
                <Icon name={specialtyIcon(s)} size={16} />
                {s}
                <small>{list0.filter((d) => d.specialty === s).length}</small>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="dc-fgroup">
        <h3>Country</h3>
        <div className="dc-pills">
          <button type="button" aria-pressed={!country} className={!country ? "is-on" : ""} onClick={() => setCountry("")}>All</button>
          {countries.map((c) => (
            <button key={c} type="button" aria-pressed={country === c} className={country === c ? "is-on" : ""} onClick={() => setCountry(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>

    
    </>
  );

  return (
    <main className="dc-page">
      {/* ================= HERO ================= */}
      <section className="dc-hero">
        <div className="dc-container dc-hero-inner">
          <span className="dc-chip hx-in" style={{ "--d": "0s" }}>
            <Icon name="stetho" size={16} /> Find a Doctor
          </span>
          <h1 className="hx-in" style={{ "--d": "0.1s" }}>
            Consult top specialists <span>before you travel</span>
          </h1>
          <p className="hx-in" style={{ "--d": "0.2s" }}>
            Search experienced doctors at our partner hospitals. Book an in-person visit or a video consultation,
            and we handle the rest.
          </p>

          <form className="dc-search hx-in" style={{ "--d": "0.3s" }} role="search" onSubmit={(e) => e.preventDefault()}>
            <Icon name="search" size={20} />
            <label htmlFor="dc-q" className="dc-sr">Search doctors</label>
            <input
              id="dc-q"
              type="search"
              placeholder="Doctor name, specialty, or treatment..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="dc-btn">Search</button>
          </form>

          <div className="dc-quick hx-in" style={{ "--d": "0.4s" }} aria-label="Popular specialties">
            {allDocSpecialties.slice(0, 6).map((s) => (
              <button key={s} type="button" className={specs.includes(s) ? "is-on" : ""} aria-pressed={specs.includes(s)} onClick={() => toggleSpec(s)}>
                <Icon name={specialtyIcon(s)} size={16} /> {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BODY ================= */}
      <section className="dc-body">
        <div className="dc-container dc-layout">
          {/* Sidebar filters (desktop) */}
          <aside className="dc-filters" aria-label="Filters">
            <div className="dc-filters-head">
              <h2><Icon name="filter" size={18} /> Filters</h2>
              {activeCount > 0 && (
                <button type="button" onClick={clearAll}>Clear all</button>
              )}
            </div>
            {filters}
          </aside>

          <div className="dc-results">
            <div className="dc-toolbar">
              <p aria-live="polite">
                <strong>{list.length}</strong> {list.length === 1 ? "doctor" : "doctors"} found
              </p>
              <div className="dc-toolbar-right">
                <button type="button" className="dc-filter-btn" onClick={() => setDrawer(true)} aria-haspopup="dialog">
                  <Icon name="filter" size={17} /> Filters {activeCount > 0 && <b>{activeCount}</b>}
                </button>
                <label className="dc-sort">
                  <span>Sort</span>
                  <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    {Object.entries(sorts).map(([k, v]) => (
                      <option key={k} value={k}>{v.label}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            {list.length ? (
              <div className="dc-list">
                {list.map((d, i) => (
                  <article key={d.slug} className="dc-card" style={{ "--i": i }}>
                    <Link to={doctorLink(d)} className="dc-card-photo" tabIndex={-1} aria-hidden="true">
                      <Avatar d={d} />
                      {d.video && (
                        <span className="dc-video-badge"><Icon name="video" size={14} /> Video</span>
                      )}
                    </Link>

                    <div className="dc-card-info">
                      <span className="dc-spec">
                        <Icon name={specialtyIcon(d.specialty)} size={14} /> {d.specialty}
                      </span>
                      <h3>
                        <Link to={doctorLink(d)}>{d.name}</Link>
                      </h3>
                      <p className="dc-deg">{d.degrees}</p>
                      <p className="dc-desig">{d.designation}</p>

                      <ul className="dc-meta">
                        <li><Icon name="hospital" size={15} /> {d.h?.name}</li>
                        <li><Icon name="pin" size={15} /> {d.h?.city}, {d.h?.country}</li>
                        <li><Icon name="briefcase" size={15} /> {d.experience} years</li>
                        <li><Icon name="language" size={15} /> {d.languages.join(", ")}</li>
                      </ul>

                      <div className="dc-days" aria-label="Available days">
                        {dayNames.map((n, di) => (
                          <span key={n} className={d.days.includes(di) ? "on" : ""} aria-hidden={!d.days.includes(di)}>
                            {n}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="dc-card-side">
                      <div className="dc-rating">
                        <span><Star size={15} /> {d.rating}</span>
                        <small>{d.reviews} reviews</small>
                      </div>
                      <div className="dc-fee">
                        <small>Consultation</small>
                        <strong>${d.fee}</strong>
                        {d.video && <small className="dc-tele">Video: ${d.teleFee}</small>}
                      </div>
                      <Link to={`${doctorLink(d)}#book`} className="dc-btn dc-btn--block">
                        Book Appointment
                      </Link>
                      <Link to={doctorLink(d)} className="dc-btn dc-btn--line dc-btn--block">
                        View Profile
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="dc-empty" role="status">
                <span><Icon name="search" size={30} /></span>
                <h3>No doctor matches your filters</h3>
                <p>Try removing some filters, or ask our team to find the right specialist for you.</p>
                <button type="button" className="dc-btn" onClick={clearAll}>Clear all filters</button>
              </div>
            )}

            {/* Help strip */}
            <Reveal className="dc-help">
              <span className="dc-help-icon"><Icon name="chat" size={26} /></span>
              <div>
                <h3>Not sure which doctor to choose?</h3>
                <p>Share your reports. Our medical team will suggest the right specialist for free.</p>
              </div>
              <div className="dc-help-actions">
                <Link to="/services/medical-consultation" className="dc-btn">
                  Get Free Advice <Icon name="arrow" size={16} />
                </Link>
                <a href={HOTLINE_LINK} className="dc-help-call">
                  <Icon name="phone" size={16} /> {HOTLINE}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= MOBILE FILTER DRAWER ================= */}
      {drawer && (
        <div className="dc-drawer" role="dialog" aria-modal="true" aria-label="Filters" onClick={() => setDrawer(false)}>
          <div className="dc-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="dc-drawer-head">
              <h2><Icon name="filter" size={18} /> Filters</h2>
              <button type="button" aria-label="Close filters" onClick={() => setDrawer(false)}>
                <Icon name="close" size={20} />
              </button>
            </div>
            <div className="dc-drawer-body">{filters}</div>
            <div className="dc-drawer-foot">
              <button type="button" className="dc-btn dc-btn--line" onClick={clearAll}>Clear</button>
              <button type="button" className="dc-btn" onClick={() => setDrawer(false)}>
                Show {list.length} doctors
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Doctors;
