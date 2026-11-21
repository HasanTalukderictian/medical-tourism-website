import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import "../Backend/Css/AdminMenu.css";
// Logo er path tomar folder onujayi bodlao
import logo from "../Image/logo/AKBH MEDICAL-01.png";
import { can, firstAllowedPath } from "./permissions";

/* =====================================================
   ADMIN SIDEBAR MENU ("adm-" class)
   - Menu item ekhane add / bodlao.
   - `badge` = notun koyta ache (API theke ashle oikhane boshao).
   - `children` thakle sub-menu hoy.
   - `perm` = permissions.js er key. Login kora user er role e oi key
     na thakle menu ta dekhabe na. Kono section e kichu na thakle
     section er title o lukay.
   ===================================================== */
const MENU = [
  {
    title: "Main",
    items: [{ to: "/admin/dashboard", perm: "dashboard", label: "Dashboard", icon: "grid" }],
  },

  /* ---------- Website er page gula (frontend) ---------- */
  {
    title: "Website Pages",
    items: [
      {
        id: "home",
        perm: "home",
        label: "Home Page",
        icon: "home",
        children: [
          { to: "/admin/home/banner", label: "Banner Slider" },
          { to: "/admin/home/offer", label: "Offer" },
          { to: "/admin/home/packages", label: "Home Packages" },
          { to: "/admin/home/achievements", label: "Achievements" },
          { to: "/admin/home/how-we-work", label: "How We Work" },
          { to: "/admin/home/testimonials", label: "Testimonials" },
        ],
      },
      {
        id: "medical",
        perm: "medical_services",
        label: "Medical Services",
        icon: "heart",
        children: [
          { to: "/admin/medical-services/medical-consultation", label: "Medical Consultation" },
          { to: "/admin/medical-services/tele-consultation", label: "Tele Consultation" },
          { to: "/admin/medical-services/doctor-appointment", label: "Doctor Appointment" },
          { to: "/admin/medical-services/medical-accommodation", label: "Medical Accommodation" },
          { to: "/admin/medical-services/air-ambulance", label: "Air Ambulance" },
          { to: "/admin/medical-services/medicine", label: "Medicine" },
          { to: "/admin/medical-services/training-development", label: "Training & Development" },
        ],
      },
      {
        id: "nonmedical",
        perm: "non_medical_services",
        label: "Non Medical Services",
        icon: "hand",
        children: [
          { to: "/admin/non-medical-services/patient-support", label: "Patient Support" },
          { to: "/admin/non-medical-services/pick-and-drop", label: "Pick & Drop" },
          { to: "/admin/non-medical-services/transport", label: "Transport" },
          { to: "/admin/non-medical-services/interpreter", label: "Interpreter" },
          { to: "/admin/non-medical-services/local-guide", label: "Local Guide" },
          { to: "/admin/non-medical-services/medical-visa", label: "Medical Visa" },
          { to: "/admin/non-medical-services/air-ticket", label: "Air Ticket" },
          { to: "/admin/non-medical-services/hotel", label: "Hotel" },
        ],
      },
      { to: "/admin/hospitals", perm: "hospitals", label: "Hospitals", icon: "hospital" },
      { to: "/admin/doctors", perm: "doctors", label: "Doctors", icon: "doctor" },
      { to: "/admin/packages", perm: "packages", label: "Packages", icon: "box" },
      { to: "/admin/plan-setup", perm: "plan_setup", label: "Treatment Plan Setup", icon: "route" },
      {
        id: "company",
        perm: "company",
        label: "Company",
        icon: "building",
        children: [
          { to: "/admin/company/about", label: "About Us" },
          { to: "/admin/company/team", label: "Team" },
          { to: "/admin/company/sister-concern", label: "Sister Concern" },
          { to: "/admin/company/partners", label: "Partners" },
        ],
      },
      {
        id: "media",
        perm: "media",
        label: "Media",
        icon: "image",
        children: [
          { to: "/admin/media/blog", label: "Blog Posts" },
          { to: "/admin/media/events", label: "Events" },
          { to: "/admin/media/gallery", label: "Gallery" },
        ],
      },
      { to: "/admin/career", perm: "career", label: "Career / Jobs", icon: "briefcase" },
      { to: "/admin/contact-page", perm: "contact_page", label: "Contact Page", icon: "phone" },
    ],
  },

  /* ---------- Website theke asha request / form ---------- */
  {
    title: "Requests",
    items: [
      { to: "/admin/queries", perm: "queries", label: "Patient Queries", icon: "inbox", badge: 12 },
      { to: "/admin/treatment-plans", perm: "treatment_plans", label: "Treatment Plans", icon: "plan", badge: 5 },
      { to: "/admin/appointments", perm: "appointments", label: "Appointments", icon: "calendar" },
      { to: "/admin/consultations", perm: "consultations", label: "Consultations", icon: "video" },
      { to: "/admin/medicine-requests", perm: "medicine_requests", label: "Medicine Requests", icon: "pill", badge: 3 },
      {
        id: "bookings",
        perm: "bookings",
        label: "Service Bookings",
        icon: "ticket",
        children: [
          { to: "/admin/bookings/hotels", label: "Hotels" },
          { to: "/admin/bookings/pick-drop", label: "Pick & Drop" },
          { to: "/admin/bookings/transport", label: "Transport" },
          { to: "/admin/bookings/interpreters", label: "Interpreters" },
          { to: "/admin/bookings/local-guides", label: "Local Guides" },
          { to: "/admin/bookings/air-tickets", label: "Air Tickets" },
          { to: "/admin/bookings/air-ambulance", label: "Air Ambulance" },
        ],
      },
      { to: "/admin/visa", perm: "visa", label: "Visa Processing", icon: "doc" },
      { to: "/admin/job-applications", perm: "job_applications", label: "Job Applications", icon: "users" },
      { to: "/admin/messages", perm: "messages", label: "Contact Messages", icon: "mail" },
    ],
  },

  {
    title: "System",
    items: [
      { to: "/admin/reports", perm: "reports", label: "Reports", icon: "chart" },
      { to: "/admin/users", perm: "users", label: "Users & Roles", icon: "shield" },
      { to: "/admin/settings", perm: "settings", label: "Settings", icon: "settings" },
    ],
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
  grid: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></>,
  inbox: <><path d="M3 13l2.5-8h13L21 13v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" /><path d="M3 13h5l1.5 2.5h5L16 13h5" /></>,
  plan: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12l2 2 4-4" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  video: <><rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10l5-3v10l-5-3" /></>,
  pill: <><rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-45 12 12)" /><path d="M9.5 9.5l5 5" /></>,
  ticket: <><path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4z" /><path d="M14 6v12" strokeDasharray="2 2" /></>,
  doc: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
  edit: <><path d="M4 20h4L19 9l-4-4L4 16z" /><path d="M13.5 6.5l4 4" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" /></>,
  chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c.6-3.4 3-5 6-5s5.4 1.6 6 5" /><circle cx="17" cy="9" r="2.4" /><path d="M16.5 14.2c2.4.2 4 1.7 4.5 4.3" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></>,
  home: <><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10M10 20v-6h4v6" /></>,
  heart: <><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /><path d="M8.5 12h2l1-2 1.5 4 1-2h1.5" /></>,
  hand: <><path d="M3 14h3l3.5 3H15a2 2 0 0 0 0-4h-3" /><path d="M6 14l3.5-3H13l5-2.5a1.5 1.5 0 0 1 2 2L15 13" /><path d="M3 20h4" /></>,
  hospital: <><path d="M4 21V7l8-4 8 4v14" /><path d="M10 10h4M12 8v4M9 21v-5h6v5M2 21h20" /></>,
  doctor: <><path d="M6 3v5a4 4 0 0 0 8 0V3" /><path d="M10 12v3a5 5 0 0 0 10 0v-1" /><circle cx="20" cy="12" r="2" /></>,
  box: <><path d="M3 7.5L12 3l9 4.5v9L12 21l-9-4.5z" /><path d="M3 7.5l9 4.5 9-4.5M12 12v9" /></>,
  route: <><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="6" r="2.5" /><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5" /></>,
  building: <><rect x="4" y="3" width="16" height="18" rx="1.5" /><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3" /></>,
  image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="M21 16l-5-5-9 9" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  shield: <><path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z" /><path d="M9 12l2 2 4-4" /></>,
  chevron: <path d="M6 9l6 6 6-6" />,
  logout: <><path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" /><path d="M10 17l-5-5 5-5M5 12h11" /></>,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 0 1 4.9.8c0 1.7-2.4 2.2-2.4 3.7M12 17v.01" /></>,
  close: <path d="M6 6l12 12M18 6L6 18" />,
};

const Icon = ({ name, size = 20 }) => (
  <svg {...base} width={size} height={size}>
    {paths[name]}
  </svg>
);

/* ---------------------------- MENU ----------------------------
   Props (AdminLayout theke ashe):
   collapsed   = desktop e shudhu icon dekhabe
   mobileOpen  = mobile e drawer khola
   onClose     = mobile drawer bondho korar function
   onLogout    = logout button (tomar logout function)
------------------------------------------------------------------- */
const Menu = ({ collapsed = false, mobileOpen = false, onClose = () => {}, onLogout = () => {} }) => {
  const { pathname } = useLocation();

  // Je group er bhitore current page ache, ta age thekei khola thakbe
  const groupOf = (path) => {
    for (const sec of MENU) {
      for (const it of sec.items) {
        if (it.children && it.children.some((c) => path.startsWith(c.to))) return it.id;
      }
    }
    return null;
  };
  const [open, setOpen] = useState(() => groupOf(pathname));

  // Role e je menu er permission ache shudhu sheta dekhabe. Faka section lukabe.
  const visibleMenu = MENU.map((sec) => ({ ...sec, items: sec.items.filter((it) => can(it.perm)) })).filter(
    (sec) => sec.items.length > 0
  );

  useEffect(() => {
    const g = groupOf(pathname);
    if (g) setOpen(g);
    onClose(); // mobile e page bodlale drawer bondho
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <div className={`adm-overlay ${mobileOpen ? "is-open" : ""}`} onClick={onClose} aria-hidden="true" />

      <aside
        className={`adm ${collapsed ? "is-collapsed" : ""} ${mobileOpen ? "is-open" : ""}`}
        aria-label="Admin menu"
      >
        {/* Logo */}
        <div className="adm-brand">
          <Link to={firstAllowedPath()} className="adm-logo">
            <img src={logo} alt="Akashbari Medical" />
          </Link>
          <span className="adm-brand-tag">Admin</span>
          <button type="button" className="adm-close" onClick={onClose} aria-label="Close menu">
            <Icon name="close" size={18} />
          </button>
        </div>

        {/* Links */}
        <nav className="adm-nav">
          {visibleMenu.map((sec) => (
            <div key={sec.title} className="adm-section">
              <p className="adm-section-title">
                <span>{sec.title}</span>
              </p>
              <ul>
                {sec.items.map((it) => {
                  if (!it.children) {
                    return (
                      <li key={it.to}>
                        <NavLink to={it.to} className="adm-link" title={collapsed ? it.label : undefined}>
                          <span className="adm-icon">
                            <Icon name={it.icon} />
                          </span>
                          <span className="adm-text">{it.label}</span>
                          {it.badge ? <span className="adm-badge">{it.badge}</span> : null}
                        </NavLink>
                      </li>
                    );
                  }
                  const isOpen = open === it.id;
                  const isActive = it.children.some((c) => pathname.startsWith(c.to));
                  return (
                    <li key={it.id} className={`adm-group ${isOpen ? "is-open" : ""}`}>
                      <button
                        type="button"
                        className={`adm-link ${isActive ? "active" : ""}`}
                        title={collapsed ? it.label : undefined}
                        aria-expanded={isOpen}
                        onClick={() => setOpen(isOpen ? null : it.id)}
                      >
                        <span className="adm-icon">
                          <Icon name={it.icon} />
                        </span>
                        <span className="adm-text">{it.label}</span>
                        <span className="adm-caret">
                          <Icon name="chevron" size={16} />
                        </span>
                      </button>
                      <div className="adm-sub">
                        <ul>
                          {it.children.map((c) => (
                            <li key={c.to}>
                              <NavLink to={c.to} className="adm-sublink">
                                {c.label}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="adm-bottom">
          <div className="adm-help">
            <span className="adm-help-icon">
              <Icon name="help" size={20} />
            </span>
            <div className="adm-text">
              <strong>Need help?</strong>
              <small>Contact the tech team</small>
            </div>
          </div>
          <button type="button" className="adm-link adm-logout" onClick={onLogout} title={collapsed ? "Log out" : undefined}>
            <span className="adm-icon">
              <Icon name="logout" />
            </span>
            <span className="adm-text">Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Menu;
