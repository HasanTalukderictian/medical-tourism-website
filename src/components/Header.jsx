// import { useState, useEffect, useRef } from "react";
// import { Link, NavLink, useLocation } from "react-router-dom";
// import "../Css/Header.css";
// import logo from "../assets/Image/AKBH MEDICAL-01.png";

// const slugify = (text) =>
//   text.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// /* ---------------------------- DATA ----------------------------
//    Menu, contact info ekhane bodlao
// ---------------------------------------------------------------- */
// const CONTACT = {
//   phone: "+880 1234-567890",
//   phoneLink: "tel:+8801234567890",
//   email: "info@akashbarimedical.com",
//   whatsapp: "https://wa.me/8801234567890",
// };

// // Mobile drawer kon width e chalu hobe (CSS er @media er sathe mil rakho)
// const MOBILE_BP = 1150;

// const services = [
//   { to: "/services/medical-consultation", label: "Medical Consultation", icon: "stetho" },
//   { to: "/services/tele-consultation", label: "Tele Consultation", icon: "video" },
//   { to: "/services/doctor-appointment", label: "Doctor Appointment", icon: "calendar" },
//   { to: "/services/medical-visa-assistance", label: "Medical Visa Assistance", icon: "doc" },
//   { to: "/services/air-ticket", label: "Air Ticket", icon: "plane" },
//   { to: "/services/medical-accommodation", label: "Medical Accommodation", icon: "home" },
//   { to: "/services/patient-support-service", label: "Patient Support Service", icon: "heart" },
//   { to: "/services/air-ambulance-service", label: "Air Ambulance Service", icon: "cross" },
//   { to: "/services/transport", label: "Transport", icon: "car" },

// ];

// const hospitals = {
//   India: ["Apollo Hospitals", "Fortis Healthcare", "Max Healthcare"],
//   Thailand: ["Bumrungrad Hospital", "Bangkok Hospital"],
//   Malaysia: ["Prince Court Medical Centre", "Gleneagles Kuala Lumpur"],
//   China: ["Beijing United Family Hospital", "Shanghai East Hospital"],
// };
// const flags = { India: "🇮🇳", Thailand: "🇹🇭", Malaysia: "🇲🇾", China: "🇨🇳" };

// const packages = [
//   { to: "/packages", label: "All Packages", icon: "grid" },
//   { to: "/packages/health-checkup", label: "Health Checkup", icon: "pulse" },
//   { to: "/packages/cardiac-care", label: "Cardiac Care", icon: "heart" },
//   { to: "/packages/cancer-treatment", label: "Cancer Treatment", icon: "ribbon" },
// ];

// const more = [
//   { to: "/about", label: "About Us", icon: "info" },
//   { to: "/doctors", label: "Doctors", icon: "stetho" },
//   { to: "/team", label: "Our Team", icon: "users" },
//   // { to: "/partners", label: "Partners", icon: "handshake" },
//   { to: "/blog", label: "Blog", icon: "doc" },
//   { to: "/events", label: "Events", icon: "calendar" },
// ];

// /* ---------------------------- ICONS ---------------------------- */
// const base = {
//   viewBox: "0 0 24 24",
//   fill: "none",
//   stroke: "currentColor",
//   strokeWidth: 1.8,
//   strokeLinecap: "round",
//   strokeLinejoin: "round",
//   "aria-hidden": true,
// };

// const paths = {
//   stetho: <><path d="M6 3v6a4 4 0 0 0 8 0V3" /><path d="M10 13v2a5 5 0 0 0 10 0v-2" /><circle cx="20" cy="11" r="2" /></>,
//   video: <><rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10l5-3v10l-5-3" /></>,
//   calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
//   doc: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
//   plane: <path d="M10.5 13.5L3 11l1.5-1.5 8 .5 4-4.5a2 2 0 0 1 3 3L15.5 13l.5 8L14.5 22.5 12 15" />,
//   home: <><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10M10 20v-5h4v5" /></>,
//   heart: <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />,
//   cross: <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" />,
//   car: <><path d="M5 16V11l2-5h10l2 5v5" /><path d="M3 16h18v3h-3M6 19H3v-3" /><circle cx="7.5" cy="16" r="1.5" /><circle cx="16.5" cy="16" r="1.5" /></>,
//   cap: <><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c2 2 10 2 12 0v-5" /></>,
//   grid: <><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></>,
//   pulse: <path d="M3 12h4l2.5-6 4 12 2.5-6H21" />,
//   ribbon: <><path d="M12 3a4 4 0 0 0-4 4c0 3 4 7 4 7s4-4 4-7a4 4 0 0 0-4-4z" /><path d="M10 13l-4 8 3-1 1.5 2.5L13 15M14 13l4 8-3-1-1.5 2.5L11 15" /></>,
//   info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8v.01" /></>,
//   users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c.6-3.4 3-5 6-5s5.4 1.6 6 5" /><circle cx="17" cy="9" r="2.4" /><path d="M16.5 14.2c2.4.2 4 1.7 4.5 4.3" /></>,
//   handshake: <><path d="M3 11l4-4 4 2 3-2 7 5" /><path d="M7 7v6l5 5 2-2M11 13l3 3M13 11l3 3" /></>,
//   hospital: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M12 7v6M9 10h6M9 21v-4h6v4" /></>,
//   phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />,
//   mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
//   clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
//   chevron: <path d="M6 9l6 6 6-6" />,
//   right: <path d="M9 6l6 6-6 6" />,
//   arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
// };

// const Icon = ({ name, size = 18 }) => (
//   <svg {...base} width={size} height={size}>
//     {paths[name]}
//   </svg>
// );

// const WhatsAppIcon = ({ size = 16 }) => (
//   <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
//     <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm4.5 12.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 1.9 2.9 4.6 4 1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" />
//   </svg>
// );

// /* ---------------------------- DROPDOWN ---------------------------- */
// function Dropdown({ id, label, active, openId, setOpenId, wide, children }) {
//   const isOpen = openId === id;
//   return (
//     <li className={`nv-item nv-dd ${isOpen ? "is-open" : ""} ${active ? "is-active" : ""}`}>
//       <button
//         type="button"
//         className="nv-link nv-dd-btn"
//         aria-expanded={isOpen}
//         aria-controls={`nv-menu-${id}`}
//         onClick={() => setOpenId(isOpen ? null : id)}
//       >
//         {label}
//         <span className="nv-caret"><Icon name="chevron" size={15} /></span>
//       </button>
//       <div className={`nv-menu ${wide ? "nv-menu--wide" : ""}`} id={`nv-menu-${id}`}>
//         {children}
//       </div>
//     </li>
//   );
// }

// const MenuLinks = ({ items, cols }) => (
//   <ul className={`nv-list ${cols ? "nv-list--2" : ""}`}>
//     {items.map((item) => (
//       <li key={item.to}>
//         <NavLink to={item.to} end className="nv-mlink">
//           <span className="nv-micon"><Icon name={item.icon} size={17} /></span>
//           {item.label}
//         </NavLink>
//       </li>
//     ))}
//   </ul>
// );

// /* ---------------------------- HEADER ---------------------------- */
// function Header() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [openId, setOpenId] = useState(null);
//   const [openCountry, setOpenCountry] = useState(null);
//   const [scrolled, setScrolled] = useState(false);
//   const location = useLocation();
//   const navRef = useRef(null);
//   const path = location.pathname;

//   // Page bodlale shob bondho
//   useEffect(() => {
//     setMenuOpen(false);
//     setOpenId(null);
//     setOpenCountry(null);
//   }, [path]);

//   // Mobile menu khola thakle page scroll bondho
//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [menuOpen]);

//   // Boro screen e gele mobile menu bondho
//   useEffect(() => {
//     const onResize = () => {
//       if (window.innerWidth > MOBILE_BP) setMenuOpen(false);
//     };
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   // Scroll korle header chhoto + shadow
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 10);
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   // Escape ba bahire click korle dropdown/menu bondho
//   useEffect(() => {
//     const onKey = (e) => {
//       if (e.key === "Escape") {
//         setOpenId(null);
//         setMenuOpen(false);
//       }
//     };
//     const onClick = (e) => {
//       if (navRef.current && !navRef.current.contains(e.target)) setOpenId(null);
//     };
//     document.addEventListener("keydown", onKey);
//     document.addEventListener("mousedown", onClick);
//     return () => {
//       document.removeEventListener("keydown", onKey);
//       document.removeEventListener("mousedown", onClick);
//     };
//   }, []);

//   const ddProps = { openId, setOpenId };
//   const isIn = (list) => list.some((i) => path === i.to);

//   return (
//     <header className={`nv ${scrolled ? "is-scrolled" : ""}`}>
     

//       {/* ===== Main bar ===== */}
//       <nav className="nv-bar" ref={navRef} aria-label="Main">
//         <div className="nv-wrap nv-bar-in">
//           <Link to="/" className="nv-logo">
//             <img src={logo} alt="Akashbari Medical" />
//           </Link>

//           <button
//             type="button"
//             className={`nv-burger ${menuOpen ? "is-open" : ""}`}
//             aria-label={menuOpen ? "Close menu" : "Open menu"}
//             aria-expanded={menuOpen}
//             aria-controls="nv-panel"
//             onClick={() => setMenuOpen((v) => !v)}
//           >
//             <span />
//             <span />
//             <span />
//           </button>

//           {/* Mobile overlay */}
//           <div className={`nv-overlay ${menuOpen ? "is-open" : ""}`} onClick={() => setMenuOpen(false)} aria-hidden="true" />

//           <div className={`nv-panel ${menuOpen ? "is-open" : ""}`} id="nv-panel">
//             <ul className="nv-menu-bar">
//               <li className="nv-item">
//                 <NavLink to="/" end className="nv-link">Home</NavLink>
//               </li>

//               <Dropdown id="services" label="Services" active={path.startsWith("/services")} wide {...ddProps}>
//                 <div className="nv-menu-head">
//                   <strong>Our Services</strong>
//                   <small>Everything for your medical journey</small>
//                 </div>
//                 <MenuLinks items={services} cols />
//               </Dropdown>

//               {/* Hospitals: country -> hospitals */}
//               <Dropdown id="hospitals" label="Hospitals" active={path.startsWith("/hospitals")} {...ddProps}>
//                 <ul className="nv-list nv-countries">
//                   {Object.entries(hospitals).map(([country, list]) => {
//                     const open = openCountry === country;
//                     return (
//                       <li key={country} className={`nv-has-sub ${open ? "is-open" : ""}`}>
//                         <div className="nv-sub-row">
//                           <NavLink to={`/hospitals/${slugify(country)}`} end className="nv-mlink">
//                             <span className="nv-flag" aria-hidden="true">{flags[country]}</span>
//                             {country}
//                             <span className="nv-right"><Icon name="right" size={14} /></span>
//                           </NavLink>
//                           <button
//                             type="button"
//                             className="nv-sub-toggle"
//                             aria-label={`Show ${country} hospitals`}
//                             aria-expanded={open}
//                             onClick={() => setOpenCountry(open ? null : country)}
//                           >
//                             <Icon name="chevron" size={15} />
//                           </button>
//                         </div>
//                         <ul className="nv-sub">
//                           <li className="nv-sub-title">{country} hospitals</li>
//                           {list.map((h) => (
//                             <li key={h}>
//                               <NavLink to={`/hospitals/${slugify(country)}/${slugify(h)}`} className="nv-slink">
//                                 <Icon name="hospital" size={15} /> {h}
//                               </NavLink>
//                             </li>
//                           ))}
//                         </ul>
//                       </li>
//                     );
//                   })}
//                   <li className="nv-all">
//                     <Link to="/hospitals">
//                       View all hospitals <Icon name="arrow" size={14} />
//                     </Link>
//                   </li>
//                 </ul>
//               </Dropdown>

//               <Dropdown id="packages" label="Packages" active={path.startsWith("/packages")} {...ddProps}>
//                 <MenuLinks items={packages} />
//               </Dropdown>

//               <Dropdown id="more" label="More" active={isIn(more)} {...ddProps}>
//                 <MenuLinks items={more} />
//               </Dropdown>

//               <li className="nv-item">
//                 <NavLink to="/gallery" end className="nv-link">Gallery</NavLink>
//               </li>
//               <li className="nv-item">
//                 <NavLink to="/sister-concern" end className="nv-link">Sister Concern</NavLink>
//               </li>
//               <li className="nv-item">
//                 <NavLink to="/contact" end className="nv-link">Contact</NavLink>
//               </li>
//             </ul>

//             <div className="nv-actions">
            
//               <Link to="/services/doctor-appointment" className="nv-cta">
//                 Book Appointment <Icon name="arrow" size={16} />
//               </Link>
//             </div>

//             {/* Mobile drawer er niche contact */}
//             <div className="nv-panel-foot">
//               <a href={`mailto:${CONTACT.email}`}><Icon name="mail" size={16} /> {CONTACT.email}</a>
//               <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={16} /> Chat on WhatsApp</a>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// }

// export default Header;



import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "../Css/Header.css";
import logo from "../assets/Image/AKBH MEDICAL-01.png";

const slugify = (text) =>
  text.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/* ---------------------------- DATA ----------------------------
   Menu, contact info ekhane bodlao
---------------------------------------------------------------- */
const CONTACT = {
  phone: "+880 1234-567890",
  phoneLink: "tel:+8801234567890",
  email: "info@akashbarimedical.com",
  whatsapp: "https://wa.me/8801234567890",
};

// Mobile drawer kon width e chalu hobe (CSS er @media er sathe mil rakho)
const MOBILE_BP = 1150;

/* Services: bam e Medical, dane Non Medical.
   `sub` thakle oi item er sub-menu hobe (desktop e pashe khole, mobile e niche) */
const medicalServices = [
  { to: "/services/medical-consultation", label: "Medical Consultation", icon: "stetho" },
  { to: "/services/doctor-appointment", label: "Doctor Appointment", icon: "calendar" },
  { to: "/services/tele-consultation", label: "Tele Consultation", icon: "video" },
  { to: "/services/medical-accommodation", label: "Medical Accommodation", icon: "home" },
  { to: "/services/air-ambulance-service", label: "Air Ambulance Service", icon: "cross" },
];

const nonMedicalServices = [
  {
    to: "/services/patient-support-service",
    label: "Patient Support Service",
    icon: "heart",
    sub: [
      { to: "/services/pick-and-drop", label: "Pick & Drop", icon: "pin" },
      { to: "/services/transport", label: "Transport", icon: "car" },
      { to: "/services/interpreter", label: "Interpreter", icon: "chat" },
      { to: "/services/local-guide", label: "Local Guide", icon: "map" },
    ],
  },
  { to: "/services/medical-visa-assistance", label: "Medical Visa", icon: "doc" },
  { to: "/services/air-ticket", label: "Air Ticket", icon: "plane" },
  { to: "/services/hotel", label: "Hotel", icon: "bed" },
];

const hospitals = {
  India: ["Apollo Hospitals", "Fortis Healthcare", "Max Healthcare"],
  Thailand: ["Bumrungrad Hospital", "Bangkok Hospital"],
  Malaysia: ["Prince Court Medical Centre", "Gleneagles Kuala Lumpur"],
  China: ["Beijing United Family Hospital", "Shanghai East Hospital"],
};
const flags = { India: "🇮🇳", Thailand: "🇹🇭", Malaysia: "🇲🇾", China: "🇨🇳" };

const packages = [
  { to: "/packages", label: "All Packages", icon: "grid" },
  { to: "/packages/health-checkup", label: "Health Checkup", icon: "pulse" },
  { to: "/packages/cardiac-care", label: "Cardiac Care", icon: "heart" },
  { to: "/packages/cancer-treatment", label: "Cancer Treatment", icon: "ribbon" },
];

const more = [
  { to: "/about", label: "About Us", icon: "info" },
  { to: "/doctors", label: "Doctors", icon: "stetho" },
  { to: "/team", label: "Our Team", icon: "users" },
  // { to: "/partners", label: "Partners", icon: "handshake" },
  { to: "/blog", label: "Blog", icon: "doc" },
  { to: "/events", label: "Events", icon: "calendar" },
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
  video: <><rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10l5-3v10l-5-3" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  doc: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
  plane: <path d="M10.5 13.5L3 11l1.5-1.5 8 .5 4-4.5a2 2 0 0 1 3 3L15.5 13l.5 8L14.5 22.5 12 15" />,
  home: <><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10M10 20v-5h4v5" /></>,
  heart: <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />,
  cross: <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" />,
  car: <><path d="M5 16V11l2-5h10l2 5v5" /><path d="M3 16h18v3h-3M6 19H3v-3" /><circle cx="7.5" cy="16" r="1.5" /><circle cx="16.5" cy="16" r="1.5" /></>,
  bed: <><path d="M3 18V6M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" /><circle cx="7" cy="11" r="2" /></>,
  pin: <><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></>,
  chat: <><path d="M4 5h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" /><path d="M19 9h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1v2.5L16 18h-3" /></>,
  map: <><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" /><path d="M9 4v14M15 6v14" /></>,
  cap: <><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c2 2 10 2 12 0v-5" /></>,
  grid: <><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></>,
  pulse: <path d="M3 12h4l2.5-6 4 12 2.5-6H21" />,
  ribbon: <><path d="M12 3a4 4 0 0 0-4 4c0 3 4 7 4 7s4-4 4-7a4 4 0 0 0-4-4z" /><path d="M10 13l-4 8 3-1 1.5 2.5L13 15M14 13l4 8-3-1-1.5 2.5L11 15" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8v.01" /></>,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c.6-3.4 3-5 6-5s5.4 1.6 6 5" /><circle cx="17" cy="9" r="2.4" /><path d="M16.5 14.2c2.4.2 4 1.7 4.5 4.3" /></>,
  handshake: <><path d="M3 11l4-4 4 2 3-2 7 5" /><path d="M7 7v6l5 5 2-2M11 13l3 3M13 11l3 3" /></>,
  hospital: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M12 7v6M9 10h6M9 21v-4h6v4" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  chevron: <path d="M6 9l6 6 6-6" />,
  right: <path d="M9 6l6 6-6 6" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
};

const Icon = ({ name, size = 18 }) => (
  <svg {...base} width={size} height={size}>
    {paths[name]}
  </svg>
);

const WhatsAppIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm4.5 12.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 1.9 2.9 4.6 4 1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" />
  </svg>
);

/* ---------------------------- DROPDOWN ---------------------------- */
function Dropdown({ id, label, active, openId, setOpenId, wide, children }) {
  const isOpen = openId === id;
  return (
    <li className={`nv-item nv-dd ${isOpen ? "is-open" : ""} ${active ? "is-active" : ""}`}>
      <button
        type="button"
        className="nv-link nv-dd-btn"
        aria-expanded={isOpen}
        aria-controls={`nv-menu-${id}`}
        onClick={() => setOpenId(isOpen ? null : id)}
      >
        {label}
        <span className="nv-caret"><Icon name="chevron" size={15} /></span>
      </button>
      <div className={`nv-menu ${wide ? "nv-menu--wide" : ""}`} id={`nv-menu-${id}`}>
        {children}
      </div>
    </li>
  );
}

const MenuLinks = ({ items, cols }) => (
  <ul className={`nv-list ${cols ? "nv-list--2" : ""}`}>
    {items.map((item) => (
      <li key={item.to}>
        <NavLink to={item.to} end className="nv-mlink">
          <span className="nv-micon"><Icon name={item.icon} size={17} /></span>
          {item.label}
        </NavLink>
      </li>
    ))}
  </ul>
);

/* Service er list (sub-menu thakle pashe / niche khole) */
const ServiceLinks = ({ items, openSub, setOpenSub }) => (
  <ul className="nv-list">
    {items.map((item) => {
      if (!item.sub) {
        return (
          <li key={item.to}>
            <NavLink to={item.to} end className="nv-mlink">
              <span className="nv-micon"><Icon name={item.icon} size={17} /></span>
              {item.label}
            </NavLink>
          </li>
        );
      }
      const open = openSub === item.to;
      return (
        <li key={item.to} className={`nv-has-sub ${open ? "is-open" : ""}`}>
          <div className="nv-sub-row">
            <NavLink to={item.to} end className="nv-mlink">
              <span className="nv-micon"><Icon name={item.icon} size={17} /></span>
              {item.label}
              <span className="nv-right"><Icon name="right" size={14} /></span>
            </NavLink>
            <button
              type="button"
              className="nv-sub-toggle"
              aria-label={`Show ${item.label} options`}
              aria-expanded={open}
              onClick={() => setOpenSub(open ? null : item.to)}
            >
              <Icon name="chevron" size={15} />
            </button>
          </div>
          <ul className="nv-sub nv-sub--service">
            <li className="nv-sub-title">{item.label}</li>
            {item.sub.map((s) => (
              <li key={s.to}>
                <NavLink to={s.to} end className="nv-slink">
                  <Icon name={s.icon} size={15} /> {s.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </li>
      );
    })}
  </ul>
);

/* ---------------------------- HEADER ---------------------------- */
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openId, setOpenId] = useState(null);
  const [openCountry, setOpenCountry] = useState(null);
  const [openSub, setOpenSub] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);
  const path = location.pathname;

  // Page bodlale shob bondho
  useEffect(() => {
    setMenuOpen(false);
    setOpenId(null);
    setOpenCountry(null);
    setOpenSub(null);
  }, [path]);

  // Mobile menu khola thakle page scroll bondho
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Boro screen e gele mobile menu bondho
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > MOBILE_BP) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Scroll korle header chhoto + shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape ba bahire click korle dropdown/menu bondho
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpenId(null);
        setMenuOpen(false);
      }
    };
    const onClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenId(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const ddProps = { openId, setOpenId };
  const isIn = (list) => list.some((i) => path === i.to);

  return (
    <header className={`nv ${scrolled ? "is-scrolled" : ""}`}>
      {/* ===== Main bar ===== */}
      <nav className="nv-bar" ref={navRef} aria-label="Main">
        <div className="nv-wrap nv-bar-in">
          <Link to="/" className="nv-logo">
            <img src={logo} alt="Akashbari Medical" />
          </Link>

          <button
            type="button"
            className={`nv-burger ${menuOpen ? "is-open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="nv-panel"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>

          {/* Mobile overlay */}
          <div className={`nv-overlay ${menuOpen ? "is-open" : ""}`} onClick={() => setMenuOpen(false)} aria-hidden="true" />

          <div className={`nv-panel ${menuOpen ? "is-open" : ""}`} id="nv-panel">
            <ul className="nv-menu-bar">
              <li className="nv-item">
                <NavLink to="/" end className="nv-link">Home</NavLink>
              </li>

              {/* Services: bam e Medical, dane Non Medical */}
              <Dropdown id="services" label="Services" active={path.startsWith("/services")} wide {...ddProps}>
                <div className="nv-mega">
                  <div className="nv-col nv-col--medical">
                    <p className="nv-col-head">
                      <span className="nv-col-dot" aria-hidden="true" /> Medical Services
                    </p>
                    <ServiceLinks items={medicalServices} openSub={openSub} setOpenSub={setOpenSub} />
                  </div>
                  <div className="nv-col nv-col--non">
                    <p className="nv-col-head">
                      <span className="nv-col-dot" aria-hidden="true" /> Non Medical Services
                    </p>
                    <ServiceLinks items={nonMedicalServices} openSub={openSub} setOpenSub={setOpenSub} />
                  </div>
                </div>
              </Dropdown>

              {/* Hospitals: country -> hospitals */}
              <Dropdown id="hospitals" label="Hospitals" active={path.startsWith("/hospitals")} {...ddProps}>
                <ul className="nv-list nv-countries">
                  {Object.entries(hospitals).map(([country, list]) => {
                    const open = openCountry === country;
                    return (
                      <li key={country} className={`nv-has-sub ${open ? "is-open" : ""}`}>
                        <div className="nv-sub-row">
                          <NavLink to={`/hospitals/${slugify(country)}`} end className="nv-mlink">
                            <span className="nv-flag" aria-hidden="true">{flags[country]}</span>
                            {country}
                            <span className="nv-right"><Icon name="right" size={14} /></span>
                          </NavLink>
                          <button
                            type="button"
                            className="nv-sub-toggle"
                            aria-label={`Show ${country} hospitals`}
                            aria-expanded={open}
                            onClick={() => setOpenCountry(open ? null : country)}
                          >
                            <Icon name="chevron" size={15} />
                          </button>
                        </div>
                        <ul className="nv-sub">
                          <li className="nv-sub-title">{country} hospitals</li>
                          {list.map((h) => (
                            <li key={h}>
                              <NavLink to={`/hospitals/${slugify(country)}/${slugify(h)}`} className="nv-slink">
                                <Icon name="hospital" size={15} /> {h}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </li>
                    );
                  })}
                  <li className="nv-all">
                    <Link to="/hospitals">
                      View all hospitals <Icon name="arrow" size={14} />
                    </Link>
                  </li>
                </ul>
              </Dropdown>

              <Dropdown id="packages" label="Packages" active={path.startsWith("/packages")} {...ddProps}>
                <MenuLinks items={packages} />
              </Dropdown>

              <Dropdown id="more" label="More" active={isIn(more)} {...ddProps}>
                <MenuLinks items={more} />
              </Dropdown>

              <li className="nv-item">
                <NavLink to="/gallery" end className="nv-link">Gallery</NavLink>
              </li>
              <li className="nv-item">
                <NavLink to="/sister-concern" end className="nv-link">Sister Concern</NavLink>
              </li>
              <li className="nv-item">
                <NavLink to="/contact" end className="nv-link">Contact</NavLink>
              </li>
            </ul>

            <div className="nv-actions">
              <Link to="/services/doctor-appointment" className="nv-cta">
                Book Appointment <Icon name="arrow" size={16} />
              </Link>
            </div>

            {/* Mobile drawer er niche contact */}
            <div className="nv-panel-foot">
              <a href={`mailto:${CONTACT.email}`}><Icon name="mail" size={16} /> {CONTACT.email}</a>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={16} /> Chat on WhatsApp</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
