import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/Hotel.css";

/* ---------------------------- CONTACT ----------------------------
   Asol number boshao
------------------------------------------------------------------- */
const CONTACT = {
  phone: "+880 1234-567890",
  phoneLink: "tel:+8801234567890",
  whatsapp: "https://wa.me/8801234567890",
};

/* ---------------------------- IMAGES ----------------------------
   Unsplash er free demo photo. Nijer image dite chaile import kore bodlao:
   import roomImg from "../Image/hotel/room.jpg";  ...  room1: roomImg
   Image load na hole sundor placeholder dekhabe.
------------------------------------------------------------------- */
const u = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const IMG = {
  hero1: u("photo-1566073771259-6a8506099945", 1000),
  hero2: u("photo-1582719478250-c89cae4dc85b", 700),
  hero3: u("photo-1590490360182-c33d57733427", 700),
  h1: u("photo-1551882547-ff40c63fe5fa"),
  h2: u("photo-1611892440504-42a792e24d32"),
  h3: u("photo-1631049307264-da0ec9d70304"),
  h4: u("photo-1542314831-068cd1dbfeeb"),
  h5: u("photo-1520250497591-112f2f40a3f4"),
  h6: u("photo-1582719478250-c89cae4dc85b"),
};

/* ---------------------------- DATA ----------------------------
   Hotel gulo DEMO (kalponik naam). Tomar partner hotel diye replace koro.
   price = per night (USD), distance = hospital theke koto dur
------------------------------------------------------------------- */
const cities = ["All Cities", "Chennai", "Delhi NCR", "Kolkata", "Bangkok", "Kuala Lumpur"];

const hotels = [
  { id: 1, name: "Green Leaf Residency", city: "Chennai", type: "Hotel", rating: 4.6, stars: 4, price: 38, hospital: "Apollo Hospitals, Greams Road", distance: 0.4, image: IMG.h1, amenities: ["wifi", "food", "wheelchair", "shuttle"], tag: "Best value" },
  { id: 2, name: "Care Suites Service Apartment", city: "Chennai", type: "Serviced Apartment", rating: 4.5, stars: 3, price: 30, hospital: "MGM Healthcare, Aminjikarai", distance: 0.8, image: IMG.h2, amenities: ["wifi", "kitchen", "family", "shuttle"] },
  { id: 3, name: "Medi Stay Inn", city: "Delhi NCR", type: "Hotel", rating: 4.4, stars: 3, price: 42, hospital: "Fortis Memorial, Gurugram", distance: 0.6, image: IMG.h3, amenities: ["wifi", "food", "wheelchair"] },
  { id: 4, name: "Comfort Homes Guest House", city: "Kolkata", type: "Guest House", rating: 4.3, stars: 2, price: 22, hospital: "Tata Medical Center, New Town", distance: 1.1, image: IMG.h4, amenities: ["wifi", "kitchen", "food"], tag: "Budget pick" },
  { id: 5, name: "Riverside Healing Hotel", city: "Bangkok", type: "Hotel", rating: 4.8, stars: 4, price: 65, hospital: "Bumrungrad International", distance: 0.3, image: IMG.h5, amenities: ["wifi", "food", "wheelchair", "shuttle", "family"], tag: "Top rated" },
  { id: 6, name: "City Garden Residences", city: "Kuala Lumpur", type: "Serviced Apartment", rating: 4.6, stars: 4, price: 55, hospital: "Prince Court Medical Centre", distance: 0.5, image: IMG.h6, amenities: ["wifi", "kitchen", "family", "wheelchair"] },
];

const stayTypes = [
  { icon: "building", title: "Hotels", range: "$35 – $80 / night", text: "Daily cleaning, restaurant and front desk support. Best for short stays and check-ups." },
  { icon: "apartment", title: "Serviced Apartments", range: "$30 – $60 / night", text: "Kitchen, living space and laundry. Ideal for long treatment and families.", popular: true },
  { icon: "home", title: "Guest Houses", range: "$18 – $35 / night", text: "Simple, clean and homely rooms close to the hospital at a budget price." },
];

const perks = [
  { icon: "pin", title: "Near the hospital", text: "Most stays within 1 km, walking or a short ride." },
  { icon: "wheelchair", title: "Wheelchair access", text: "Lifts, ramps and accessible bathrooms on request." },
  { icon: "kitchen", title: "Kitchen & halal food", text: "Cook your own meals or get halal food nearby." },
  { icon: "family", title: "Family rooms", text: "Space for the patient and attendants together." },
  { icon: "tag", title: "Long-stay discount", text: "Lower rates for stays of 2 weeks or more." },
  { icon: "car", title: "Hospital shuttle", text: "Rides to the hospital for check-ups and tests." },
  { icon: "doc", title: "Visa-ready letter", text: "Booking confirmation for your visa application." },
  { icon: "headset", title: "24/7 local support", text: "Our team is one call away during your stay." },
];

const faqs = [
  { q: "Can I book a stay for the whole treatment period?", a: "Yes. Tell us your expected treatment length and we will find a stay with a long-stay discount. Dates can be extended if your doctor asks you to stay longer." },
  { q: "Do I need to pay in advance?", a: "No payment is needed to send a request. We confirm availability and the final price first. Some hotels ask for a small deposit to hold the room." },
  { q: "Can family members stay with the patient?", a: "Yes. Family rooms and serviced apartments are perfect for patients travelling with one or more attendants." },
  { q: "Will I get a booking letter for my medical visa?", a: "Yes. Once your stay is confirmed, we send a booking confirmation you can attach to your visa application." },
];

const amenityLabel = {
  wifi: "Free Wi-Fi",
  food: "Halal food",
  kitchen: "Kitchen",
  wheelchair: "Wheelchair access",
  shuttle: "Hospital shuttle",
  family: "Family rooms",
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

const paths = {
  building: <><rect x="4" y="3" width="16" height="18" rx="1.5" /><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3" /></>,
  apartment: <><path d="M3 21V8l6-4v17M9 21h12V10l-6-3" /><path d="M13 12h2M13 16h2M5.5 10h1M5.5 14h1" /></>,
  home: <><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10M10 20v-5h4v5" /></>,
  bed: <><path d="M3 18V6M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" /><circle cx="7" cy="11" r="2" /></>,
  pin: <><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c.6-3.4 3-5 6-5s5.4 1.6 6 5" /><circle cx="17" cy="9" r="2.4" /><path d="M16.5 14.2c2.4.2 4 1.7 4.5 4.3" /></>,
  family: <><circle cx="8" cy="6" r="2.5" /><circle cx="16" cy="6" r="2.5" /><circle cx="12" cy="12" r="1.8" /><path d="M4 20v-5a4 4 0 0 1 4-4M20 20v-5a4 4 0 0 0-4-4M9.5 20v-2.5a2.5 2.5 0 0 1 5 0V20" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></>,
  wifi: <><path d="M2 8.8a15 15 0 0 1 20 0M5 12.4a10.5 10.5 0 0 1 14 0M8.5 15.8a5.5 5.5 0 0 1 7 0" /><circle cx="12" cy="19" r="1" /></>,
  food: <><path d="M4 3v8a2 2 0 0 0 2 2h1v8M7 3v6M10 3v8a2 2 0 0 1-2 2" /><path d="M17 21V3c-2 1-3.5 3.5-3.5 7 0 2 1.5 3 3.5 3" /></>,
  kitchen: <><path d="M3 11h18v3a7 7 0 0 1-7 7h-4a7 7 0 0 1-7-7z" /><path d="M8 8c0-1.5 1-1.5 1-3M12 8c0-1.5 1-1.5 1-3M16 8c0-1.5 1-1.5 1-3" /></>,
  wheelchair: <><circle cx="10" cy="4.5" r="1.8" /><path d="M10 7v6h6l2 5" /><path d="M10 10h5" /><path d="M7 11.5a5 5 0 1 0 7.5 5.5" /></>,
  shuttle: <><rect x="3" y="5" width="18" height="12" rx="2" /><path d="M3 11h18M8 5v6M16 5v6" /><circle cx="7.5" cy="19" r="1.5" /><circle cx="16.5" cy="19" r="1.5" /></>,
  car: <><path d="M5 16V11l2-5h10l2 5v5" /><path d="M3 16h18v3h-3M6 19H3v-3" /><circle cx="7.5" cy="16" r="1.5" /><circle cx="16.5" cy="16" r="1.5" /></>,
  tag: <><path d="M3 12V4h8l10 10-8 8z" /><circle cx="7.5" cy="8.5" r="1.5" /></>,
  doc: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
  headset: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /><path d="M19 20a3 3 0 0 1-3 2h-3" /></>,
  hospital: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M12 7v6M9 10h6M9 21v-4h6v4" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  sort: <path d="M7 4v16M7 20l-3-3M7 20l3-3M17 20V4M17 4l-3 3M17 4l3 3" />,
};

const Icon = ({ name, size = 20 }) => (
  <svg {...base} width={size} height={size}>
    {paths[name]}
  </svg>
);

const Star = ({ size = 14 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path fill="currentColor" d="M12 2.5l2.94 6.1 6.56.9-4.8 4.6 1.2 6.6L12 17.5l-5.9 3.2 1.2-6.6-4.8-4.6 6.56-.9L12 2.5z" />
  </svg>
);

const WhatsAppIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm4.5 12.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 1.9 2.9 4.6 4 1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" />
  </svg>
);

/* ------------------- Scroll e ashle animation ------------------- */
const Reveal = ({ children, className = "", delay = 0, as: Tag = "div" }) => {
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
    <Tag ref={ref} className={`htl-reveal ${shown ? "is-shown" : ""} ${className}`} style={{ "--d": `${delay}s` }}>
      {children}
    </Tag>
  );
};

/* Image na thakle / load na hole placeholder */
const Pic = ({ src, alt, className = "" }) => {
  const [failed, setFailed] = useState(!src);
  return (
    <div className={`htl-pic ${failed ? "htl-pic--empty" : ""} ${className}`}>
      {failed ? <Icon name="bed" size={46} /> : <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />}
    </div>
  );
};

const SectionHead = ({ eyebrow, title, text }) => (
  <Reveal className="htl-head">
    <span className="htl-eyebrow">{eyebrow}</span>
    <h2>{title}</h2>
    {text && <p>{text}</p>}
  </Reveal>
);

/* Date helper */
const nightsBetween = (a, b) => {
  if (!a || !b) return 0;
  const diff = (new Date(b) - new Date(a)) / 86400000;
  return diff > 0 ? Math.round(diff) : 0;
};

const today = () => new Date().toISOString().slice(0, 10);

/* ---------------------------- PAGE ---------------------------- */
const Hotel = () => {
  // Search bar
  const [search, setSearch] = useState({ city: "All Cities", checkIn: "", checkOut: "", guests: "2" });
  // List filter
  const [city, setCity] = useState("All Cities");
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("distance");
  // Booking form
  const [form, setForm] = useState({ hotelId: "", name: "", phone: "", checkIn: "", checkOut: "", guests: "2", room: "Double room", wheelchair: false, notes: "" });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const listRef = useRef(null);
  const formRef = useRef(null);

  const list = useMemo(() => {
    const filtered = hotels.filter(
      (h) => (city === "All Cities" || h.city === city) && (type === "All" || h.type === type)
    );
    const sorters = {
      distance: (a, b) => a.distance - b.distance,
      priceLow: (a, b) => a.price - b.price,
      rating: (a, b) => b.rating - a.rating,
    };
    return [...filtered].sort(sorters[sort]);
  }, [city, type, sort]);

  const selected = hotels.find((h) => String(h.id) === String(form.hotelId));
  const nights = nightsBetween(form.checkIn, form.checkOut);
  const total = selected && nights ? selected.price * nights : 0;

  const setSearchField = (key) => (e) => setSearch((s) => ({ ...s, [key]: e.target.value }));
  const setField = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  // Search: list filter + form e date boshay
  const handleSearch = (e) => {
    e.preventDefault();
    setCity(search.city);
    setForm((f) => ({
      ...f,
      checkIn: search.checkIn || f.checkIn,
      checkOut: search.checkOut || f.checkOut,
      guests: search.guests,
    }));
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Card er "Request" e click korle form e hotel select hoy
  const chooseHotel = (id) => {
    setForm((f) => ({ ...f, hotelId: String(id) }));
    setSent(false);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /* EKHANE tomar API call boshao. Ekhon shudhu demo. Data: form */
    setSent(true);
  };

  const searchNights = nightsBetween(search.checkIn, search.checkOut);

  return (
    <main className="htl-page">
      {/* ================= HERO ================= */}
      <section className="htl-hero">
        <div className="htl-container htl-hero-grid">
          <div className="htl-hero-text">
          
            <span className="htl-badge">
              <Icon name="bed" size={16} /> Patient &amp; Family Stay
            </span>
            <h1>
              A comfortable stay, <em>close to your hospital</em>
            </h1>
            <p>
              Hand-picked hotels, serviced apartments and guest houses near top hospitals, chosen for patients and
              their families. Rest well, recover better.
            </p>
            <ul className="htl-hero-points">
              <li>
                <Icon name="check" size={16} /> Within 1 km of hospitals
              </li>
              <li>
                <Icon name="check" size={16} /> Special patient rates
              </li>
              <li>
                <Icon name="check" size={16} /> Free cancellation on most stays
              </li>
            </ul>
          </div>

          <div className="htl-hero-media" aria-hidden="true">
            <Pic src={IMG.hero1} alt="" className="htl-hm htl-hm--main" />
            <Pic src={IMG.hero2} alt="" className="htl-hm htl-hm--top" />
            <Pic src={IMG.hero3} alt="" className="htl-hm htl-hm--bottom" />
            <div className="htl-hero-chip htl-hero-chip--rating">
              <span className="htl-chip-stars">
                <Star /> <Star /> <Star /> <Star /> <Star />
              </span>
              <strong>4.7/5</strong>
              <small>Rated by patients</small>
            </div>
            <div className="htl-hero-chip htl-hero-chip--near">
              <span className="htl-chip-icon">
                <Icon name="hospital" size={20} />
              </span>
              <div>
                <strong>0.4 km</strong>
                <small>to the hospital</small>
              </div>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="htl-container">
          <form className="htl-search" onSubmit={handleSearch}>
            <label className="htl-sfield">
              <span className="htl-sicon">
                <Icon name="pin" size={20} />
              </span>
              <div>
                <small>City</small>
                <select value={search.city} onChange={setSearchField("city")} aria-label="City">
                  {cities.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </label>
            <label className="htl-sfield">
              <span className="htl-sicon">
                <Icon name="calendar" size={20} />
              </span>
              <div>
                <small>Check-in</small>
                <input type="date" min={today()} value={search.checkIn} onChange={setSearchField("checkIn")} aria-label="Check-in date" />
              </div>
            </label>
            <label className="htl-sfield">
              <span className="htl-sicon">
                <Icon name="calendar" size={20} />
              </span>
              <div>
                <small>Check-out {searchNights > 0 && <b>· {searchNights} nights</b>}</small>
                <input
                  type="date"
                  min={search.checkIn || today()}
                  value={search.checkOut}
                  onChange={setSearchField("checkOut")}
                  aria-label="Check-out date"
                />
              </div>
            </label>
            <label className="htl-sfield">
              <span className="htl-sicon">
                <Icon name="users" size={20} />
              </span>
              <div>
                <small>Guests</small>
                <select value={search.guests} onChange={setSearchField("guests")} aria-label="Guests">
                  {["1", "2", "3", "4", "5", "6"].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === "1" ? "guest" : "guests"}
                    </option>
                  ))}
                </select>
              </div>
            </label>
            <button type="submit" className="htl-btn htl-search-btn">
              <Icon name="search" size={18} /> Search
            </button>
          </form>
        </div>
      </section>

      {/* ================= HOTELS ================= */}
      <section className="htl-section" ref={listRef} id="stays">
        <div className="htl-container">
          <div className="htl-list-top">
            <SectionHead
              eyebrow="Recommended stays"
              title="Stays near top hospitals"
              text="Demo listings. Rates are per night and may change by season."
            />
            <label className="htl-sort">
              <Icon name="sort" size={16} />
              <span className="htl-sr">Sort by</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort by">
                <option value="distance">Nearest to hospital</option>
                <option value="priceLow">Price: low to high</option>
                <option value="rating">Top rated</option>
              </select>
            </label>
          </div>

          <div className="htl-filters">
            <div className="htl-chips" role="group" aria-label="Filter by city">
              {cities.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`htl-chip ${city === c ? "is-active" : ""}`}
                  aria-pressed={city === c}
                  onClick={() => setCity(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="htl-types" role="group" aria-label="Filter by stay type">
              {["All", "Hotel", "Serviced Apartment", "Guest House"].map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`htl-type ${type === t ? "is-active" : ""}`}
                  aria-pressed={type === t}
                  onClick={() => setType(t)}
                >
                  {t === "All" ? "All types" : t}
                </button>
              ))}
            </div>
          </div>

          {list.length > 0 ? (
            <div className="htl-grid" key={`${city}-${type}-${sort}`}>
              {list.map((h, i) => (
                <Reveal as="article" key={h.id} className="htl-card" delay={(i % 3) * 0.08}>
                  <div className="htl-card-media">
                    <Pic src={h.image} alt={h.name} />
                    <span className="htl-card-type">{h.type}</span>
                    {h.tag && <span className="htl-card-tag">{h.tag}</span>}
                    <span className="htl-card-rating">
                      <Star size={13} /> {h.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="htl-card-body">
                    <div className="htl-card-head">
                      <h3>{h.name}</h3>
                      <span className="htl-stars" aria-label={`${h.stars} star`}>
                        {Array.from({ length: h.stars }).map((_, k) => (
                          <Star key={k} size={12} />
                        ))}
                      </span>
                    </div>
                    <p className="htl-card-city">
                      <Icon name="pin" size={15} /> {h.city}
                    </p>
                    <p className="htl-card-near">
                      <Icon name="hospital" size={15} />
                      <span>
                        <b>{h.distance} km</b> from {h.hospital}
                      </span>
                    </p>
                    <ul className="htl-amen">
                      {h.amenities.map((a) => (
                        <li key={a} title={amenityLabel[a]}>
                          <Icon name={a} size={16} />
                          <span>{amenityLabel[a]}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="htl-card-foot">
                      <div className="htl-card-price">
                        <small>from</small>
                        <strong>${h.price}</strong>
                        <span>/ night</span>
                      </div>
                      <button type="button" className="htl-btn htl-btn--sm" onClick={() => chooseHotel(h.id)}>
                        Request <Icon name="arrow" size={16} />
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="htl-empty">
              <Icon name="bed" size={40} />
              <h3>No stays found</h3>
              <p>Try another city or stay type, or ask us and we will find one for you.</p>
              <button
                type="button"
                className="htl-btn htl-btn--ghost"
                onClick={() => {
                  setCity("All Cities");
                  setType("All");
                }}
              >
                Show all stays
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ================= STAY TYPES ================= */}
      <section className="htl-section htl-section--soft">
        <div className="htl-container">
          <SectionHead
            eyebrow="Choose your stay"
            title="The right stay for every treatment"
            text="Short check-up or a long recovery, we will match you with a place that fits your plan and budget."
          />
          <div className="htl-types-grid">
            {stayTypes.map((s, i) => (
              <Reveal key={s.title} className={`htl-stay ${s.popular ? "is-popular" : ""}`} delay={i * 0.1}>
                {s.popular && <span className="htl-popular">Best for long stays</span>}
                <span className="htl-stay-icon">
                  <Icon name={s.icon} size={30} />
                </span>
                <h3>{s.title}</h3>
                <strong className="htl-stay-range">{s.range}</strong>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PERKS ================= */}
      <section className="htl-section">
        <div className="htl-container">
          <SectionHead
            eyebrow="Patient friendly"
            title="Everything a patient's family needs"
            text="We check every stay for the things that matter most during treatment."
          />
          <div className="htl-perks">
            {perks.map((p, i) => (
              <Reveal key={p.title} className="htl-perk" delay={(i % 4) * 0.07}>
                <span className="htl-perk-icon">
                  <Icon name={p.icon} size={24} />
                </span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BOOKING ================= */}
      <section className="htl-section htl-book-wrap" ref={formRef} id="book">
        <div className="htl-container htl-book">
          <div className="htl-book-info">
            <span className="htl-eyebrow htl-eyebrow--light">Book your stay</span>
            <h2>Send a booking request</h2>
            <p>Tell us your dates and needs. We check availability, confirm the best rate and send you the details on WhatsApp.</p>

            {/* Selected hotel summary */}
            <div className="htl-summary">
              {selected ? (
                <>
                  <Pic src={selected.image} alt={selected.name} className="htl-summary-img" />
                  <div>
                    <small>Selected stay</small>
                    <strong>{selected.name}</strong>
                    <span>
                      {selected.city} · ${selected.price} / night
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <span className="htl-summary-icon">
                    <Icon name="bed" size={26} />
                  </span>
                  <div>
                    <small>No stay selected</small>
                    <strong>We will suggest the best one</strong>
                    <span>Or pick a stay from the list above</span>
                  </div>
                </>
              )}
            </div>

            {selected && nights > 0 && (
              <div className="htl-estimate">
                <span>
                  ${selected.price} × {nights} {nights === 1 ? "night" : "nights"}
                </span>
                <strong>${total}</strong>
                <small>Estimated total, before any long-stay discount</small>
              </div>
            )}

            <div className="htl-book-contact">
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="htl-btn htl-btn--wa">
                <WhatsAppIcon /> WhatsApp us
              </a>
              <a href={CONTACT.phoneLink} className="htl-book-call">
                <Icon name="phone" size={18} /> {CONTACT.phone}
              </a>
            </div>
          </div>

          {sent ? (
            <div className="htl-form htl-form--done" role="status">
              <span className="htl-done-icon">
                <Icon name="check" size={34} />
              </span>
              <h3>Request sent!</h3>
              <p>
                Thank you{form.name ? `, ${form.name.split(" ")[0]}` : ""}. We will confirm availability
                {selected ? ` at ${selected.name}` : ""} on WhatsApp soon.
              </p>
              <button type="button" className="htl-btn htl-btn--ghost" onClick={() => setSent(false)}>
                Send another request
              </button>
            </div>
          ) : (
            <form className="htl-form" onSubmit={handleSubmit}>
              <div className="htl-fields">
                <label className="htl-field htl-field--full">
                  <span>Preferred stay</span>
                  <select value={form.hotelId} onChange={setField("hotelId")}>
                    <option value="">Suggest the best stay for me</option>
                    {hotels.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name} ({h.city})
                      </option>
                    ))}
                  </select>
                </label>
                <label className="htl-field">
                  <span>Patient name</span>
                  <input type="text" value={form.name} onChange={setField("name")} placeholder="Full name" required />
                </label>
                <label className="htl-field">
                  <span>Phone / WhatsApp</span>
                  <input type="tel" value={form.phone} onChange={setField("phone")} placeholder="+880 1XXX-XXXXXX" required />
                </label>
                <label className="htl-field">
                  <span>Check-in</span>
                  <input type="date" min={today()} value={form.checkIn} onChange={setField("checkIn")} required />
                </label>
                <label className="htl-field">
                  <span>Check-out</span>
                  <input type="date" min={form.checkIn || today()} value={form.checkOut} onChange={setField("checkOut")} required />
                </label>
                <label className="htl-field">
                  <span>Guests</span>
                  <select value={form.guests} onChange={setField("guests")}>
                    {["1", "2", "3", "4", "5", "6"].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === "1" ? "guest" : "guests"}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="htl-field">
                  <span>Room type</span>
                  <select value={form.room} onChange={setField("room")}>
                    <option>Single room</option>
                    <option>Double room</option>
                    <option>Family room</option>
                    <option>Apartment (with kitchen)</option>
                  </select>
                </label>
                <label className="htl-field htl-field--full">
                  <span>Special needs (optional)</span>
                  <textarea
                    rows="3"
                    value={form.notes}
                    onChange={setField("notes")}
                    placeholder="e.g. ground floor room, halal food, near Apollo Hospital"
                  />
                </label>
              </div>
              <label className="htl-check">
                <input type="checkbox" checked={form.wheelchair} onChange={setField("wheelchair")} />
                <span className="htl-check-box" aria-hidden="true">
                  <Icon name="check" size={14} />
                </span>
                Patient needs a wheelchair-accessible room
              </label>
              <button type="submit" className="htl-btn htl-btn--full">
                Send Booking Request <Icon name="arrow" size={18} />
              </button>
              <p className="htl-form-note">No payment now. We confirm the price before booking.</p>
            </form>
          )}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="htl-section">
        <div className="htl-container htl-faq-wrap">
          <SectionHead eyebrow="FAQ" title="Questions about your stay" />
          <div className="htl-faqs">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className={`htl-faq ${open ? "is-open" : ""}`}>
                  <button type="button" aria-expanded={open} aria-controls={`htl-faq-${i}`} onClick={() => setOpenFaq(open ? -1 : i)}>
                    {f.q}
                    <span className="htl-faq-icon">
                      <Icon name="plus" size={18} />
                    </span>
                  </button>
                  <div className="htl-faq-body" id={`htl-faq-${i}`}>
                    <div>
                      <p>{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Reveal className="htl-related">
            <span>Also need a ride from the airport?</span>
            <Link to="/services/pick-and-drop">
              Airport Pick &amp; Drop <Icon name="arrow" size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default Hotel;
