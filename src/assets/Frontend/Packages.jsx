import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/Packages.css";

// Nijer image path onujayi change korben
import imgCardiology from "../Image/Offer/image9.jpeg";
import imgOncology from "../Image/Offer/image10.jpeg";
import imgOrtho from "../Image/Offer/image11.jpeg";
import imgNeurology from "../Image/Offer/image12.jpeg";
import imgOphthalmology from "../Image/Offer/image13.jpeg";
import imgFertility from "../Image/Offer/image14.jpeg";

/* ---------------------------- DATA ----------------------------
   link: details page thakle sei page, na thakle quote page e jabe
---------------------------------------------------------------- */
const QUOTE_LINK = "/services/medical-consultation";

const packages = [
  {
    id: "cardiology",
    title: "Cardiology",
    icon: "heart",
    image: imgCardiology,
    items: ["Bypass Surgery", "Angioplasty", "Valve Replacement", "ECG & Echo"],
    cost: "৳30,000 – ৳5 Lakhs",
    link: "/packages/cardiac-care",
    popular: true,
  },
  {
    id: "oncology",
    title: "Oncology",
    icon: "ribbon",
    image: imgOncology,
    items: ["Chemotherapy", "Radiation Therapy", "Bone Marrow Transplant", "Tumor Surgery"],
    cost: "৳3 Lakhs – ৳36 Lakhs",
    link: "/packages/cancer-treatment",
  },
  {
    id: "orthopaedics",
    title: "Orthopaedics",
    icon: "bone",
    image: imgOrtho,
    items: ["Knee Replacement", "Hip Replacement", "Spine Surgery", "Sports Injury"],
    cost: "৳3 Lakhs – ৳8 Lakhs",
    link: "/packages/knee-replacement",
  },
  {
    id: "neurology",
    title: "Neurology",
    icon: "brain",
    image: imgNeurology,
    items: ["Brain Tumour Surgery", "Epilepsy Treatment", "Stroke Rehab", "Parkinson's Care"],
    cost: "৳3 Lakhs – ৳25 Lakhs",
    link: null,
  },
  {
    id: "ophthalmology",
    title: "Ophthalmology",
    icon: "eye",
    image: imgOphthalmology,
    items: ["LASIK Surgery", "Cataract Surgery", "Retina Treatment", "Glaucoma Care"],
    cost: "৳30,000 – ৳1 Lakh",
    link: null,
  },
  {
    id: "fertility",
    title: "Fertility & IVF",
    icon: "female",
    image: imgFertility,
    items: ["IVF Treatment", "IUI", "Egg Freezing", "Surrogacy Support"],
    cost: "৳2.5 Lakhs – ৳4 Lakhs",
    link: "/packages/ivf-fertility",
  },
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
  heart: <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />,
  ribbon: <><path d="M12 3a4 4 0 0 0-4 4c0 3 4 7 4 7s4-4 4-7a4 4 0 0 0-4-4z" /><path d="M10 13l-4 8 3-1 1.5 2.5L13 15M14 13l4 8-3-1-1.5 2.5L11 15" /></>,
  bone: <path d="M7 4a2.5 2.5 0 0 0-2.4 3.2A2.5 2.5 0 1 0 7.8 10L14 16.2a2.5 2.5 0 1 0 2.8 3.2A2.5 2.5 0 1 0 20 16.6 2.5 2.5 0 1 0 16.2 14L10 7.8A2.5 2.5 0 0 0 7 4z" />,
  brain: <><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a2 2 0 0 0-3-1z" /><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1" /></>,
  eye: <><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  female: <><circle cx="12" cy="9" r="5" /><path d="M12 14v7M9 18h6" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  wallet: <><rect x="3" y="6" width="18" height="13" rx="3" /><path d="M3 10h18" /><circle cx="16.5" cy="14.5" r="1" fill="currentColor" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8v.01" /></>,
  image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.8" /><path d="M21 16l-5-5-8 8" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
};

const Icon = ({ name, size = 20 }) => (
  <svg {...base} width={size} height={size}>
    {paths[name] || paths.check}
  </svg>
);

/* ------------------- Scroll reveal ------------------- */
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
      { threshold: 0.12 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`hpk-reveal ${shown ? "is-shown" : ""} ${className}`} style={{ "--d": `${delay}s` }}>
      {children}
    </Tag>
  );
};

/* Image load na hole placeholder */
const Pic = ({ src, alt }) => {
  const [failed, setFailed] = useState(!src);
  return failed ? (
    <div className="hpk-img-empty"><Icon name="image" size={38} /></div>
  ) : (
    <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
  );
};

/* ---------------------------- SECTION ---------------------------- */
const Packages = () => {
  return (
    <section className="hpk">
      <div className="hpk-wrap">
        {/* Heading */}
        <Reveal className="hpk-head">
          <span className="hpk-label">Medical Packages</span>
          <h2 className="hpk-title">
            Our <span>Treatment Packages</span>
          </h2>
          <p className="hpk-sub">
            Compare our treatment packages and pricing, structured to match your medical needs and budget.
          </p>
        </Reveal>

        {/* Cards */}
        <div className="hpk-grid">
          {packages.map((p, i) => {
            const to = p.link || QUOTE_LINK;
            return (
              <Reveal as="article" key={p.id} delay={(i % 3) * 0.1} className={`hpk-card ${p.popular ? "is-popular" : ""}`}>
                <Link to={to} className="hpk-media" tabIndex={-1} aria-hidden="true">
                  <Pic src={p.image} alt="" />
                  {p.popular && <span className="hpk-badge">Most Popular</span>}
                </Link>

                <div className="hpk-body">
                  <div className="hpk-card-head">
                    <span className="hpk-icon"><Icon name={p.icon} size={24} /></span>
                    <div>
                      <h3>
                        <Link to={to}>{p.title}</Link>
                      </h3>
                      <small>{p.items.length} treatments included</small>
                    </div>
                  </div>

                  <ul className="hpk-list">
                    {p.items.map((item) => (
                      <li key={item}>
                        <span><Icon name="check" size={12} /></span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="hpk-cost">
                    <span className="hpk-cost-icon"><Icon name="wallet" size={18} /></span>
                    <div>
                      <small>Estimated cost (BDT)</small>
                      <strong>{p.cost}</strong>
                    </div>
                  </div>

                  <div className="hpk-actions">
                    <Link to={to} className="hpk-btn">
                      {p.link ? "View Details" : "Get Quote"} <Icon name="arrow" size={16} />
                    </Link>
                    <Link to={QUOTE_LINK} className="hpk-btn hpk-btn--soft">
                      Free Quote
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom */}
        <Reveal className="hpk-foot">
          <p className="hpk-note">
            <Icon name="info" size={16} /> Costs are estimates. The final price depends on your medical reports and
            the hospital you choose.
          </p>
          <Link to="/packages" className="hpk-btn hpk-btn--lg">
            View All Packages <Icon name="arrow" size={17} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default Packages;
