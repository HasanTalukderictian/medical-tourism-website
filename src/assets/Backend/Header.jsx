import  { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Backend/Css/AdminHeader.css";

/* =====================================================
   ADMIN HEADER ("adh-" class)
   Bam e: menu button + page er naam + chhoto path
   Dan e: website link + notification + profile
   (Logo sidebar e ache, tai header e abar dewa hoy nai)
   ===================================================== */

// DEMO notification. Asol data API theke ano.
const NOTIFICATIONS = [
  { id: 1, title: "New patient query", text: "Rahim Uddin · Cardiology", time: "2 min ago", unread: true },
  { id: 2, title: "Treatment plan request", text: "Oncology · Apollo Hospitals", time: "18 min ago", unread: true },
  { id: 3, title: "Appointment confirmed", text: "Dr. Meera Iyer · 24 Nov, 10:30 AM", time: "Yesterday", unread: false },
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
  menu: <path d="M4 6h16M4 12h16M4 18h10" />,
  bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z" /></>,
  chevron: <path d="M6 9l6 6 6-6" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></>,
  logout: <><path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" /><path d="M10 17l-5-5 5-5M5 12h11" /></>,
};

const Icon = ({ name, size = 20 }) => (
  <svg {...base} width={size} height={size}>
    {paths[name]}
  </svg>
);

/* URL theke page er naam (jemon /admin/patient-queries -> "Patient Queries") */
const toTitle = (slug) =>
  slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

/* Bahire click / Escape korle dropdown bondho */
const useDropdown = () => {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return [ref, open, setOpen];
};

/* ---------------------------- HEADER ----------------------------
   Props (AdminLayout theke ashe):
   onToggleMenu = menu button e click
   user         = { name, role, photo }
   onLogout     = logout function
------------------------------------------------------------------- */
const Header = ({
  onToggleMenu = () => {},
  user = { name: "Admin User", role: "Super Admin", photo: null },
  onLogout = () => {},
}) => {
  const { pathname } = useLocation();
  const [notes, setNotes] = useState(NOTIFICATIONS);
  const [bellRef, bellOpen, setBellOpen] = useDropdown();
  const [userRef, userOpen, setUserOpen] = useDropdown();

  const unread = notes.filter((n) => n.unread).length;

  // Page er naam (URL er shesh ongsho)
  const parts = pathname.replace(/^\/admin\/?/, "").split("/").filter(Boolean);
  const title = parts.length ? toTitle(parts[parts.length - 1]) : "Dashboard";
  const crumbs = ["Admin"].concat(parts.map(toTitle));

  // Page bodlale dropdown bondho
  useEffect(() => {
    setBellOpen(false);
    setUserOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const initials = user.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="adh">
      {/* Bam: menu button + page er naam */}
      <div className="adh-left">
        <button type="button" className="adh-icon-btn" onClick={onToggleMenu} aria-label="Toggle menu">
          <Icon name="menu" size={22} />
        </button>
        <div className="adh-heading">
          <h1 className="adh-title">{title}</h1>
         
        </div>
      </div>

      {/* Dan: website + notification + profile */}
      <div className="adh-right">
        <a href="/" target="_blank" rel="noopener noreferrer" className="adh-icon-btn adh-site" aria-label="View website" title="View website">
          <Icon name="globe" />
        </a>

        <div className="adh-dd" ref={bellRef}>
          <button
            type="button"
            className="adh-icon-btn"
            aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}
            aria-expanded={bellOpen}
            onClick={() => setBellOpen((v) => !v)}
          >
            <Icon name="bell" />
            {unread > 0 && <span className="adh-dot">{unread}</span>}
          </button>
          {bellOpen && (
            <div className="adh-menu adh-menu--notes">
              <div className="adh-notes-head">
                <strong>Notifications</strong>
                {unread > 0 && (
                  <button type="button" onClick={() => setNotes((list) => list.map((n) => ({ ...n, unread: false })))}>
                    Mark all read
                  </button>
                )}
              </div>
              <ul className="adh-notes">
                {notes.map((n) => (
                  <li key={n.id} className={n.unread ? "is-unread" : ""}>
                    <strong>{n.title}</strong>
                    <p>{n.text}</p>
                    <small>{n.time}</small>
                  </li>
                ))}
              </ul>
              <Link to="/admin/notifications" className="adh-notes-all">
                View all notifications
              </Link>
            </div>
          )}
        </div>

        <span className="adh-sep" aria-hidden="true" />

        <div className="adh-dd" ref={userRef}>
          <button
            type="button"
            className="adh-user"
            aria-expanded={userOpen}
            aria-haspopup="menu"
            onClick={() => setUserOpen((v) => !v)}
          >
            <span className="adh-avatar">{user.photo ? <img src={user.photo} alt="" /> : initials}</span>
            <span className="adh-user-text">
              <strong>{user.name}</strong>
              <small>{user.role}</small>
            </span>
            <span className="adh-user-caret">
              <Icon name="chevron" size={16} />
            </span>
          </button>
          {userOpen && (
            <div className="adh-menu adh-menu--user" role="menu">
              <div className="adh-menu-head">
                <strong>{user.name}</strong>
                <small>{user.role}</small>
              </div>
              <Link to="/admin/profile" className="adh-menu-item" role="menuitem">
                <Icon name="user" size={17} /> My Profile
              </Link>
              <Link to="/admin/settings" className="adh-menu-item" role="menuitem">
                <Icon name="settings" size={17} /> Settings
              </Link>
              <button type="button" className="adh-menu-item adh-menu-item--danger" role="menuitem" onClick={onLogout}>
                <Icon name="logout" size={17} /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
