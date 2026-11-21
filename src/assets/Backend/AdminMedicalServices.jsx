import { useEffect, useRef } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "../Backend/Css/HomeAdmin.css";
import { MEDICAL_SECTIONS } from "./sections";
import { HomeIcon } from "./SectionShell";


/* =====================================================
   ADMIN > MEDICAL SERVICES (layout) - "hma-" class (Home Page er CSS)
   Rakhbe: src/assets/Backend/AdminMedicalServices.jsx

   /admin/medical-services                       -> prothom page e chole jay (App.jsx e)
   /admin/medical-services/medical-consultation  -> MedicalServices/MedicalConsultation.jsx
   /admin/medical-services/medicine              -> MedicalServices/Medicine.jsx ... ityadi
   ===================================================== */
const AdminMedicalServices = () => {
  const { pathname } = useLocation();
  const tabsRef = useRef(null);

  // Khola tab ta lukano thakle (onek tab hole) scroll kore chokher shamne ane
  useEffect(() => {
    const el = tabsRef.current ? tabsRef.current.querySelector(".hma-tab.active") : null;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [pathname]);
  const current = MEDICAL_SECTIONS.find((s) => pathname.startsWith(`/admin/medical-services/${s.path}`));

  return (
    <div className="hma">
      {/* ---------- Header ---------- */}
      <section className="hma-head">
        <div className="hma-head-text">
          <span className="hma-kicker">
            <HomeIcon name="heart" size={15} /> Website Pages
          </span>
          <h2>Medical Services</h2>
          <p>Manage the content of each medical service page. Pick a service below to edit it.</p>
        </div>
        <a
          href={current ? current.site : "/"}
          target="_blank"
          rel="noopener noreferrer"
          className="hma-btn hma-btn--ghost"
        >
          <HomeIcon name="globe" size={17} /> View on website
        </a>
      </section>

      {/* ---------- Service tabs ---------- */}
      <nav className="hma-tabs" aria-label="Medical services" ref={tabsRef}>
        {MEDICAL_SECTIONS.map((s, i) => (
          <NavLink key={s.path} to={`/admin/medical-services/${s.path}`} className="hma-tab">
            <span className="hma-tab-no">{i + 1}</span>
            <HomeIcon name={s.icon} size={17} />
            <span>{s.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* ---------- Je page khola ---------- */}
      <div className="hma-body" key={current ? current.path : "none"}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminMedicalServices;
