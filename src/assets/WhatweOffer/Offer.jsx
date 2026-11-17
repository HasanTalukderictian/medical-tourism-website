import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/Offer.css";

// Nijer image path onujayi change korben
import imgConsultation from "../Image/Offer/image1.jpeg";
import imgTourism from "../Image/Offer/image2.jpeg";
import imgAmbulance from "../Image/Offer/image3.jpeg";
import imgAccommodation from "../Image/Offer/image4.jpeg";
import imgSupport from "../Image/Offer/image5.jpeg";
import imgInterpreter from "../Image/Offer/image6.jpeg";
import imgTele from "../Image/Offer/image7.jpeg";
import imgTransport from "../Image/Offer/image8.jpeg";
import pickdrop from "../Image/Offer/car.jfif";
import hotel from "../Image/Offer/Hotel.jfif";
import Appointment from "../Image/Offer/Appoint.jfif";
import guide from "../Image/Offer/guide.png";

/* ---------------------------- DATA ----------------------------
   link: card er "Learn More" kon page e jabe
---------------------------------------------------------------- */
const offers = [
  {
    id: "consultation",
    title: "Medical Consultation",
    icon: "stetho",
    image: imgConsultation,
    link: "/services/medical-consultation",
    text: "Connect with leading international specialists for expert second opinions, diagnostic reviews, and comprehensive treatment planning tailored to your condition.",
  },
  {
    id: "tourism",
    title: "Medical Tourism",
    icon: "globe",
    image: imgTourism,
    link: "/hospitals",
    text: "Along with international treatment assistance, we also provide support for visa assistance, Air Ticket Reservation, pick-up and drop-off, and other travel-related services for patients & their attendants.",
  },
  {
    id: "ambulance",
    title: "Air Ambulance Service",
    icon: "plane",
    image: imgAmbulance,
    link: "/services/air-ambulance-service",
    text: "Emergency air ambulance flight coordination equipped with advanced ICU setups and qualified medical crew for critical patient transfers across borders.",
  },
  {
    id: "accommodation",
    title: "Medical Accommodation",
    icon: "home",
    image: imgAccommodation,
    link: "/services/medical-accommodation",
    text: "Comfortable, sanitised and budget-friendly living options located close to partner hospitals for patients and their attendants during treatment.",
  },
  {
    id: "support",
    title: "Patient Support Service",
    icon: "heart",
    image: imgSupport,
    link: "/services/patient-support-service",
    text: "We provide dedicated patient support with guidance, coordination, and compassionate care to ensure a smooth and stress-free treatment journey.",
  },
  {
    id: "interpreter",
    title: "Interpreter Service",
    icon: "language",
    image: imgInterpreter,
    link: "/services/interpreter",
    text: "We provide language interpretation services for patients in any country, as well as tour guide services. This helps patients communicate clearly with doctors and hospital staff.",
  },
  {
    id: "tele",
    title: "Tele Consultation",
    icon: "video",
    image: imgTele,
    link: "/services/tele-consultation",
    text: "Convenient video consultations with specialist doctors abroad from the comfort of your home, allowing you to access expert advice without travelling.",
  },
  {
    id: "transport",
    title: "Transport",
    icon: "car",
    image: imgTransport,
    link: "/services/transport",
    text: "We provide safe, reliable, and comfortable transportation services to ensure patients reach their medical appointments and hospitals on time.",
  },

  {
    id: "localguide",
    title: "Local Guide",
    icon: "car",
    image: guide,
    link: "/services/local-guide",
    text: "We provide safe, reliable, and comfortable transportation services to ensure patients reach their medical appointments and hospitals on time.",
  },
   {
    id: "pick&drop",
    title: "Pick & Drop",
    icon: "car",
    image: pickdrop,
    link: "/services/pick-and-drop",
    text: "We provide safe, reliable, and comfortable transportation services to ensure patients reach their medical appointments and hospitals on time.",
  },
    {
    id: "hotel",
    title: "Hotel",
    icon: "car",
    image: hotel,
    link: "/services/hotel",
    text: "We provide safe, reliable, and comfortable transportation services to ensure patients reach their medical appointments and hospitals on time.",
  },
     {
    id: "appointment",
    title: "Doctor Appointment",
    icon: "car",
    image: Appointment,
    link: "/services/doctor-appointment",
    text: "We provide safe, reliable, and comfortable transportation services to ensure patients reach their medical appointments and hospitals on time.",
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
  stetho: <><path d="M6 3v6a4 4 0 0 0 8 0V3" /><path d="M10 13v2a5 5 0 0 0 10 0v-2" /><circle cx="20" cy="11" r="2" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z" /></>,
  plane: <path d="M10.5 13.5L3 11l1.5-1.5 8 .5 4-4.5a2 2 0 0 1 3 3L15.5 13l.5 8L14.5 22.5 12 15" />,
  home: <><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10M10 20v-5h4v5" /></>,
  heart: <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />,
  language: <><path d="M4 5h9M8.5 3v2M6 5c.5 4 3 7 6 8M11 5c-.5 3-3 6-6.5 8" /><path d="M13 21l4-10 4 10M14.5 18h5" /></>,
  video: <><rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10l5-3v10l-5-3" /></>,
  car: <><path d="M5 16V11l2-5h10l2 5v5" /><path d="M3 16h18v3h-3M6 19H3v-3" /><circle cx="7.5" cy="16" r="1.5" /><circle cx="16.5" cy="16" r="1.5" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  chevron: <path d="M6 9l6 6 6-6" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  chat: <><path d="M4 5h16v11H9l-5 4z" /><path d="M8 9h8M8 12h5" /></>,
  image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.8" /><path d="M21 16l-5-5-8 8" /></>,
};

const Icon = ({ name, size = 20 }) => (
  <svg {...base} width={size} height={size}>
    {paths[name]}
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
    <Tag ref={ref} className={`ofr-reveal ${shown ? "is-shown" : ""} ${className}`} style={{ "--d": `${delay}s` }}>
      {children}
    </Tag>
  );
};

/* ---------------------------- CARD ---------------------------- */
function OfferCard({ item, index }) {
  const [expanded, setExpanded] = useState(false);
  const [imgFailed, setImgFailed] = useState(!item.image);
  const textId = `ofr-text-${item.id}`;

  return (
    <Reveal as="article" delay={(index % 4) * 0.08} className="ofr-card">
      <div className="ofr-media">
        {imgFailed ? (
          <div className="ofr-img-empty"><Icon name="image" size={34} /></div>
        ) : (
          <img src={item.image} alt={item.title} loading="lazy" onError={() => setImgFailed(true)} />
        )}
        <span className="ofr-no" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      </div>

      <div className="ofr-body">
        <span className="ofr-icon"><Icon name={item.icon} size={24} /></span>

        <h3 className="ofr-title">
          <Link to={item.link}>{item.title}</Link>
        </h3>

        <p id={textId} className={`ofr-text ${expanded ? "is-expanded" : ""}`}>
          {item.text}
        </p>

        <div className="ofr-foot">
          <button
            type="button"
            className="ofr-more"
            aria-expanded={expanded}
            aria-controls={textId}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "See Less" : "See More"}
            <span className="ofr-more-icon"><Icon name="chevron" size={14} /></span>
          </button>

          <Link to={item.link} className="ofr-go" aria-label={`Learn more about ${item.title}`}>
            <Icon name="arrow" size={18} />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------------------------- SECTION ---------------------------- */
const Offer = () => {
  return (
    <section className="ofr">
      <div className="ofr-wrap">
        <Reveal className="ofr-head">
          <span className="ofr-label">Our Services</span>
          <h2 className="ofr-heading">
            What We <span>Offer</span>
          </h2>
          <p className="ofr-sub">
            From the first medical opinion to your journey home, we take care of every step of your treatment
            abroad.
          </p>
        </Reveal>

        <div className="ofr-grid">
          {offers.map((item, i) => (
            <OfferCard key={item.id} item={item} index={i} />
          ))}
        </div>

               {/* Help strip: Treatment plan page e niye jabe */}
        <Reveal className="ofr-help">
          <span className="ofr-help-icon"><Icon name="chat" size={26} /></span>
          <div className="ofr-help-text">
            <h3>Make your treatment plan in 5 easy steps</h3>
            <p>Choose your treatment, country, hospital and doctor, see the estimated cost, and get a free personalised plan.</p>
          </div>
          <div className="ofr-help-actions">
            <Link to="/plan/treatment" className="ofr-btn">
              Plan Your Treatment <Icon name="arrow" size={16} />
            </Link>
            <Link to="/contact" className="ofr-btn ofr-btn--line">
              <Icon name="phone" size={16} /> Contact Us
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Offer;
