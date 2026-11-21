import { NavLink, Outlet, useLocation } from "react-router-dom";
import "../Backend/Css/HomeAdmin.css";
import { HOME_SECTIONS } from "../Backend/sections";
import { HomeIcon } from "./SectionShell";
import { useEffect, useRef } from "react";



/* =====================================================
   ADMIN HOME PAGE (layout) - "hma-" class
   Rakhbe: src/assets/Backend/AdminHome.jsx

   /admin/home            -> /admin/home/banner e chole jay (App.jsx e)
   /admin/home/banner     -> Home/Banner.jsx
   /admin/home/offer      -> Home/Offer.jsx  ... ityadi

   Upore Home Page er header + section er tab thake,
   niche <Outlet /> e je section khola sheta dekhay.
   ===================================================== */
const AdminHome = () => {
  const { pathname } = useLocation();
  const tabsRef = useRef(null);

  // Khola tab ta lukano thakle (onek tab hole) scroll kore chokher shamne ane
  useEffect(() => {
    const el = tabsRef.current ? tabsRef.current.querySelector(".hma-tab.active") : null;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [pathname]);
  const current = HOME_SECTIONS.find((s) => pathname.startsWith(`/admin/home/${s.path}`));

  return (
    <div className="hma">
      {/* ---------- Header ---------- */}
      <section className="hma-head">
        <div className="hma-head-text">
          <span className="hma-kicker">
            <HomeIcon name="home" size={15} /> Website Pages
          </span>
          <h2>Home Page</h2>
          <p>Manage every section of the website home page. Pick a section below to edit it.</p>
        </div>
        <a href="/" target="_blank" rel="noopener noreferrer" className="hma-btn hma-btn--ghost">
          <HomeIcon name="globe" size={17} /> View home page
        </a>
      </section>

      {/* ---------- Section tabs ---------- */}
      <nav className="hma-tabs" aria-label="Home page sections" ref={tabsRef}>
        {HOME_SECTIONS.map((s, i) => (
          <NavLink key={s.path} to={`/admin/home/${s.path}`} className="hma-tab">
            <span className="hma-tab-no">{i + 1}</span>
            <HomeIcon name={s.icon} size={17} />
            <span>{s.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* ---------- Je section khola ---------- */}
      <div className="hma-body" key={current ? current.path : "none"}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminHome;
