import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useParams, useSearchParams } from "react-router-dom";
import "../../Css/Hospital.css";

import { hospitals, countries, getCountry, hospitalLink, allSpecialties, HOTLINE, HOTLINE_LINK } from "./hospitalData";
import { Icon, Star, Pic, Reveal, specialtyIcon } from "./HospitalUi";

/* Route gula (App.jsx e):
   <Route path="/hospitals" element={<Hospital />} />
   <Route path="/hospitals/:country" element={<Hospital />} />
   <Route path="/hospitals/:country/:hospital" element={<HospitalDetails />} />
*/

const steps = [
  { icon: "doc", title: "Send your reports", text: "Share medical reports on WhatsApp or through our form." },
  { icon: "hospital", title: "Get hospital options", text: "We send opinions and cost estimates from 2–3 hospitals." },
  { icon: "plane", title: "We plan the trip", text: "Visa, ticket, stay, and airport pickup, all arranged." },
  { icon: "heart", title: "Treatment & care", text: "Our team supports you until you return home." },
];

const sorts = {
  rating: { label: "Top rated", fn: (a, b) => b.rating - a.rating },
  beds: { label: "Largest", fn: (a, b) => b.beds - a.beds },
  name: { label: "Name A–Z", fn: (a, b) => a.name.localeCompare(b.name) },
};

const Hospital = () => {
  const { country: countrySlug } = useParams();
  const country = countrySlug ? getCountry(countrySlug) : null;
  const badCountry = Boolean(countrySlug && !country);

  const [query, setQuery] = useState("");
  const [searchParams] = useSearchParams();
  const [specialty, setSpecialty] = useState(searchParams.get("specialty") || "");

  // URL e ?specialty=Cardiology thakle shei filter on hobe
  useEffect(() => {
    const sp = searchParams.get("specialty");
    if (sp && allSpecialties.includes(sp)) setSpecialty(sp);
  }, [searchParams]);
  const [sort, setSort] = useState("rating");
  const [view, setView] = useState("grid");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return hospitals
      .filter((h) => !country || h.countrySlug === country.slug)
      .filter((h) => !specialty || h.specialties.includes(specialty))
      .filter(
        (h) =>
          !q ||
          h.name.toLowerCase().includes(q) ||
          h.city.toLowerCase().includes(q) ||
          h.specialties.some((s) => s.toLowerCase().includes(q))
      )
      .sort(sorts[sort].fn);
  }, [country, specialty, query, sort]);

  const countOf = (slug) => hospitals.filter((h) => h.countrySlug === slug).length;
  const clear = () => {
    setQuery("");
    setSpecialty("");
  };

  return (
    <main className="hp-page">
      {/* ================= HERO ================= */}
      <section className="hp-hero">
        <div className="hp-hero-shape" aria-hidden="true" />
        <div className="hp-container">
          

          <div className="hp-hero-grid">
            <div className="hp-hero-text">
              <span className="hp-eyebrow hx-in" style={{ "--d": "0.05s" }}>
                {country ? (
                  <>
                    <span className="hp-flag" aria-hidden="true">{country.flag}</span> {country.name}
                  </>
                ) : (
                  <>
                    <Icon name="globe" size={16} /> Partner Hospitals
                  </>
                )}
              </span>
              <h1 className="hx-in" style={{ "--d": "0.1s" }}>
                {country ? (
                  <>
                    Top hospitals in <em>{country.name}</em>
                  </>
                ) : (
                  <>
                    Find the <em>right hospital</em> for your treatment
                  </>
                )}
              </h1>
              <p className="hx-in" style={{ "--d": "0.2s" }}>
                {country
                  ? country.tagline
                  : "We work with internationally accredited hospitals in India, Thailand, Malaysia and China, and help you choose the best one for your condition and budget."}
              </p>

              {/* Search */}
              <form className="hp-search hx-in" style={{ "--d": "0.3s" }} role="search" onSubmit={(e) => e.preventDefault()}>
                <Icon name="search" size={20} />
                <label htmlFor="hp-q" className="hp-sr">Search hospitals</label>
                <input
                  id="hp-q"
                  type="search"
                  placeholder="Search hospital, city or treatment..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="hp-btn">Search</button>
              </form>
            </div>

            <div className="hp-hero-stats hx-in" style={{ "--d": "0.3s" }}>
              <div className="hp-hstat">
                <strong>{country ? countOf(country.slug) : hospitals.length}+</strong>
                <span>Partner hospitals</span>
              </div>
              <div className="hp-hstat">
                <strong>{country ? 1 : countries.length}</strong>
                <span>{country ? "Country" : "Countries"}</span>
              </div>
              <div className="hp-hstat">
                <strong>100%</strong>
                <span>Accredited</span>
              </div>
              <div className="hp-hstat">
                <strong>24/7</strong>
                <span>Patient support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COUNTRY TABS ================= */}
      <div className="hp-container">
        <nav className="hp-countries" aria-label="Filter by country">
          <NavLink to="/hospitals" end className="hp-country">
            <span className="hp-country-flag" aria-hidden="true"><Icon name="globe" size={22} /></span>
            <span>
              <strong>All Countries</strong>
              <small>{hospitals.length} hospitals</small>
            </span>
          </NavLink>
          {countries.map((c) => (
            <NavLink key={c.slug} to={`/hospitals/${c.slug}`} className="hp-country">
              <span className="hp-country-flag" aria-hidden="true">{c.flag}</span>
              <span>
                <strong>{c.name}</strong>
                <small>{countOf(c.slug)} hospitals</small>
              </span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* ================= LIST ================= */}
      <section className="hp-section">
        <div className="hp-container">
          {badCountry && (
            <p className="hp-notice" role="status">
              We could not find that country, so we are showing all partner hospitals.
            </p>
          )}

          {country && (
            <Reveal className="hp-why-country">
              <h2>Why choose {country.name}?</h2>
              <ul>
                {country.points.map((p) => (
                  <li key={p}>
                    <span><Icon name="check" size={13} /></span> {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {/* Toolbar */}
          <div className="hp-toolbar">
            <div className="hp-chips" role="group" aria-label="Filter by specialty">
              <button type="button" aria-pressed={!specialty} className={!specialty ? "is-on" : ""} onClick={() => setSpecialty("")}>
                All specialties
              </button>
              {allSpecialties.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={specialty === s}
                  className={specialty === s ? "is-on" : ""}
                  onClick={() => setSpecialty(specialty === s ? "" : s)}
                >
                  <Icon name={specialtyIcon(s)} size={15} /> {s}
                </button>
              ))}
            </div>

            <div className="hp-toolbar-row">
              <p className="hp-count" aria-live="polite">
                <strong>{list.length}</strong> {list.length === 1 ? "hospital" : "hospitals"} found
              </p>
              <div className="hp-toolbar-right">
                <label className="hp-sort">
                  <span>Sort by</span>
                  <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    {Object.entries(sorts).map(([k, v]) => (
                      <option key={k} value={k}>{v.label}</option>
                    ))}
                  </select>
                </label>
                <div className="hp-view" role="group" aria-label="Layout">
                  <button type="button" aria-label="Grid view" aria-pressed={view === "grid"} className={view === "grid" ? "is-on" : ""} onClick={() => setView("grid")}>
                    <Icon name="grid" size={18} />
                  </button>
                  <button type="button" aria-label="List view" aria-pressed={view === "list"} className={view === "list" ? "is-on" : ""} onClick={() => setView("list")}>
                    <Icon name="list" size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Cards */}
          {list.length ? (
            <div className={`hp-grid hp-grid--${view}`}>
              {list.map((h, i) => (
                <article key={h.slug} className="hp-card" style={{ "--i": i }}>
                  <Link to={hospitalLink(h)} className="hp-card-media" tabIndex={-1} aria-hidden="true">
                    <Pic src={h.cover} alt="" className="hp-card-pic" />
                    <span className="hp-card-country">
                      {countries.find((c) => c.name === h.country)?.flag} {h.country}
                    </span>
                    <span className="hp-card-rating">
                      <Star /> {h.rating}
                    </span>
                  </Link>

                  <div className="hp-card-body">
                    <div className="hp-card-acc">
                      {h.accreditations.map((a) => (
                        <span key={a}><Icon name="shield" size={13} /> {a}</span>
                      ))}
                    </div>
                    <h3>
                      <Link to={hospitalLink(h)}>{h.name}</Link>
                    </h3>
                    <p className="hp-card-loc">
                      <Icon name="pin" size={15} /> {h.city}, {h.country}
                    </p>
                    <p className="hp-card-text">{h.short}</p>

                    <div className="hp-card-facts">
                      <span><Icon name="bed" size={16} /> {h.beds.toLocaleString()}+ beds</span>
                      <span><Icon name="calendar" size={16} /> Since {h.founded}</span>
                    </div>

                    <ul className="hp-card-spec" aria-label="Main specialties">
                      {h.specialties.slice(0, 3).map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                      {h.specialties.length > 3 && <li className="hp-more">+{h.specialties.length - 3}</li>}
                    </ul>

                    <div className="hp-card-actions">
                      <Link to={hospitalLink(h)} className="hp-btn hp-btn--sm">
                        View Details <Icon name="arrow" size={15} />
                      </Link>
                      <Link to={`${hospitalLink(h)}#quote`} className="hp-btn hp-btn--sm hp-btn--soft">
                        Free Quote
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="hp-empty" role="status">
              <span><Icon name="search" size={34} /></span>
              <h3>No hospital matches your search</h3>
              <p>Try a different name or specialty, or ask our team to suggest one.</p>
              <button type="button" className="hp-btn" onClick={clear}>Clear filters</button>
            </div>
          )}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="hp-section hp-section--soft">
        <div className="hp-container">
          <Reveal className="hp-head">
            <span className="hp-label">How It Works</span>
            <h2 className="hp-title">Not sure which hospital to choose?</h2>
            <p>Send us your reports. We compare hospitals for you, for free.</p>
          </Reveal>

          <ol className="hp-steps">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.1} className="hp-step">
                <span className="hp-step-icon">
                  <Icon name={s.icon} size={26} />
                  <b>{i + 1}</b>
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="hp-cta-wrap">
        <div className="hp-container">
          <Reveal className="hp-cta">
            <div className="hp-cta-pulse" aria-hidden="true"><Icon name="pulse" size={160} /></div>
            <div>
              <h2>Get a free hospital opinion in 48 hours</h2>
              <p>Our medical team will review your reports and suggest the best hospitals and costs.</p>
            </div>
            <div className="hp-cta-actions">
              <Link to="/services/medical-consultation" className="hp-btn hp-btn--white">
                Get Free Opinion <Icon name="arrow" size={16} />
              </Link>
              <a href={HOTLINE_LINK} className="hp-btn hp-btn--outline-white">
                <Icon name="phone" size={16} /> {HOTLINE}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default Hospital;
