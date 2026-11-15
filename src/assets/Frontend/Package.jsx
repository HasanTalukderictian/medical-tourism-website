import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/Package.css";

import { packages, categories, commonSupport, packageLink, usd, HOTLINE, HOTLINE_LINK } from "./packageData";
import { hospitals as allHospitals } from "./hospitalData";
import { Icon, Star, Pic, Reveal } from "./HospitalUi";

/* Route (App.jsx e):
   <Route path="packages" element={<Package />} />
   <Route path="packages/:slug" element={<PackageDetails />} />
*/

const budgets = [
  { id: "any", label: "Any budget", min: 0, max: Infinity },
  { id: "low", label: "Under $1,000", min: 0, max: 999 },
  { id: "mid", label: "$1,000 – $5,000", min: 1000, max: 5000 },
  { id: "high", label: "Above $5,000", min: 5001, max: Infinity },
];

const sorts = {
  popular: { label: "Most popular", fn: (a, b) => Number(b.popular) - Number(a.popular) || b.reviews - a.reviews },
  low: { label: "Price: low to high", fn: (a, b) => a.price - b.price },
  high: { label: "Price: high to low", fn: (a, b) => b.price - a.price },
  rating: { label: "Top rated", fn: (a, b) => b.rating - a.rating },
};

const faqs = [
  { q: "Is the package price final?", a: "The price shown is a starting estimate. After our doctors review your reports, the hospital sends a clear final quote before you travel, so there are no surprises." },
  { q: "Can I customise a package?", a: "Yes. You can choose the hospital, country, room type, and add extra tests or a companion's stay. Tell us your needs and we will build a plan for you." },
  { q: "Are flights and hotel included?", a: "Hospital treatment and our support services are included. Flights and hotel are not included by default, but we can book them for you at good rates." },
  { q: "How do I pay?", a: "Most payments are made directly to the hospital. A small advance may be needed to confirm your appointment. We will explain every step clearly." },
];

const countryOf = (pkg) =>
  [...new Set(pkg.hospitals.map((h) => allHospitals.find((x) => x.slug === h.slug)?.country).filter(Boolean))];

const allCountries = [...new Set(packages.flatMap(countryOf))];

const Package = () => {
  const [cat, setCat] = useState("all");
  const [country, setCountry] = useState("");
  const [budget, setBudget] = useState("any");
  const [sort, setSort] = useState("popular");
  const [openFaq, setOpenFaq] = useState(0);

  const list = useMemo(() => {
    const b = budgets.find((x) => x.id === budget);
    return packages
      .filter((p) => cat === "all" || p.category === cat)
      .filter((p) => !country || countryOf(p).includes(country))
      .filter((p) => p.price >= b.min && p.price <= b.max)
      .sort(sorts[sort].fn);
  }, [cat, country, budget, sort]);

  const reset = () => {
    setCat("all");
    setCountry("");
    setBudget("any");
  };

  const goList = (e) => {
    e.preventDefault();
    document.getElementById("pk-list")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="pk-page">
      {/* ================= HERO + FINDER ================= */}
      <section className="pk-hero">
        <div className="pk-container pk-hero-grid">
          <div className="pk-hero-text">
            <span className="pk-chip hx-in" style={{ "--d": "0s" }}>
              <Icon name="award" size={16} /> Treatment Packages
            </span>
            <h1 className="hx-in" style={{ "--d": "0.1s" }}>
              All-in-one medical packages, <span>clear prices.</span>
            </h1>
            <p className="hx-in" style={{ "--d": "0.2s" }}>
              Choose a ready-made package for your treatment at top accredited hospitals. Every package comes
              with our full support, from the first medical opinion to your flight home.
            </p>
            <ul className="pk-hero-points hx-in" style={{ "--d": "0.3s" }}>
              <li><Icon name="check" size={15} /> No hidden charges</li>
              <li><Icon name="check" size={15} /> Free medical opinion</li>
              <li><Icon name="check" size={15} /> Visa & travel support</li>
            </ul>
          </div>

          {/* Package finder */}
          <form className="pk-finder hx-in" style={{ "--d": "0.25s" }} onSubmit={goList} aria-labelledby="pk-finder-title">
            <h2 id="pk-finder-title">
              <Icon name="search" size={20} /> Find your package
            </h2>

            <div className="pk-fl">
              <label htmlFor="pk-f-cat">Treatment</label>
              <select id="pk-f-cat" value={cat} onChange={(e) => setCat(e.target.value)}>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.id === "all" ? "All treatments" : c.label}</option>
                ))}
              </select>
            </div>
            <div className="pk-fl">
              <label htmlFor="pk-f-country">Country</label>
              <select id="pk-f-country" value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="">Any country</option>
                {allCountries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="pk-fl">
              <label htmlFor="pk-f-budget">Budget</label>
              <select id="pk-f-budget" value={budget} onChange={(e) => setBudget(e.target.value)}>
                {budgets.map((b) => (
                  <option key={b.id} value={b.id}>{b.label}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="pk-btn pk-btn--block">
              Show {list.length} {list.length === 1 ? "package" : "packages"} <Icon name="arrow" size={16} />
            </button>
          </form>
        </div>
      </section>

      {/* ================= LIST ================= */}
      <section className="pk-section" id="pk-list">
        <div className="pk-container">
          <div className="pk-cats" role="group" aria-label="Filter by treatment">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={cat === c.id}
                className={cat === c.id ? "is-on" : ""}
                onClick={() => setCat(c.id)}
              >
                <span><Icon name={c.icon} size={20} /></span>
                {c.label}
              </button>
            ))}
          </div>

          <div className="pk-bar">
            <p aria-live="polite">
              Showing <strong>{list.length}</strong> of {packages.length} packages
              {(country || budget !== "any") && (
                <button type="button" className="pk-clear" onClick={reset}>Clear filters</button>
              )}
            </p>
            <label className="pk-sort">
              <span>Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {Object.entries(sorts).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </label>
          </div>

          {list.length ? (
            <div className="pk-grid">
              {list.map((p, i) => (
                <article key={p.slug} className="pk-card" style={{ "--c": p.color, "--i": i }}>
                  <Link to={packageLink(p)} className="pk-card-media" tabIndex={-1} aria-hidden="true">
                    <Pic src={p.img} alt="" className="pk-card-pic" />
                    {p.popular && <span className="pk-badge">Popular</span>}
                    <span className="pk-card-icon"><Icon name={p.icon} size={24} /></span>
                  </Link>

                  <div className="pk-card-body">
                    <div className="pk-card-top">
                      <span className="pk-cat-tag">{categories.find((c) => c.id === p.category)?.label}</span>
                      <span className="pk-rate"><Star size={13} /> {p.rating} <small>({p.reviews})</small></span>
                    </div>
                    <h3>
                      <Link to={packageLink(p)}>{p.title}</Link>
                    </h3>
                    <p className="pk-card-text">{p.short}</p>

                    <ul className="pk-card-meta">
                      <li><Icon name="calendar" size={15} /> {p.days} days trip</li>
                      <li><Icon name="bed" size={15} /> {p.hospitalStay}</li>
                      <li><Icon name="pin" size={15} /> {countryOf(p).join(", ")}</li>
                    </ul>

                    <div className="pk-card-foot">
                      <div className="pk-price">
                        <small>Starting from</small>
                        <strong>{usd(p.price)}</strong>
                      </div>
                      <Link to={packageLink(p)} className="pk-btn pk-btn--sm">
                        View Package <Icon name="arrow" size={15} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="pk-empty" role="status">
              <Icon name="search" size={32} />
              <h3>No package matches these filters</h3>
              <p>Try another country or budget, or ask us for a custom package.</p>
              <button type="button" className="pk-btn" onClick={reset}>Show all packages</button>
            </div>
          )}

          <p className="pk-disclaimer">
            <Icon name="shield" size={15} /> Prices are approximate starting prices. The final cost depends on your
            medical condition and is confirmed by the hospital before you travel.
          </p>
        </div>
      </section>

      {/* ================= EVERY PACKAGE INCLUDES ================= */}
      <section className="pk-included">
        <div className="pk-container pk-included-grid">
          <Reveal className="pk-included-head">
            <span className="pk-label pk-label--light">Always Included</span>
            <h2>Every package comes with our full support</h2>
            <p>No matter which package you choose, our team takes care of these for you, free of charge.</p>
          </Reveal>
          <ul className="pk-included-list">
            {commonSupport.map((s, i) => (
              <Reveal as="li" key={s} delay={i * 0.06}>
                <span><Icon name="check" size={16} /></span>
                {s}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= CUSTOM + FAQ ================= */}
      <section className="pk-section">
        <div className="pk-container pk-bottom">
          <Reveal className="pk-custom">
            <span className="pk-custom-icon"><Icon name="stetho" size={30} /></span>
            <h2>Need a custom package?</h2>
            <p>
              Don't see your treatment here? Send us your medical reports and we will create a package with the
              best hospitals and prices for your case.
            </p>
            <Link to="/services/medical-consultation" className="pk-btn pk-btn--white">
              Get a Custom Quote <Icon name="arrow" size={16} />
            </Link>
            <a href={HOTLINE_LINK} className="pk-custom-call">
              <Icon name="phone" size={18} /> {HOTLINE}
            </a>
          </Reveal>

          <div className="pk-faq">
            <Reveal>
              <span className="pk-label">FAQ</span>
              <h2 className="pk-title">Questions about packages</h2>
            </Reveal>
            <div className="pk-faq-list">
              {faqs.map((f, i) => {
                const open = openFaq === i;
                return (
                  <Reveal key={f.q} delay={i * 0.06} className={`pk-faq-item ${open ? "is-open" : ""}`}>
                    <h3>
                      <button
                        type="button"
                        aria-expanded={open}
                        aria-controls={`pk-faq-${i}`}
                        onClick={() => setOpenFaq(open ? null : i)}
                      >
                        {f.q}
                        <span className="pk-faq-icon" aria-hidden="true"><Icon name="right" size={16} /></span>
                      </button>
                    </h3>
                    <div className="pk-faq-a" id={`pk-faq-${i}`} role="region">
                      <div><p>{f.a}</p></div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Package;
