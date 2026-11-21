import { useEffect, useRef } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "../Backend/Css/HomeAdmin.css";
import { NON_MEDICAL_SECTIONS } from "./sections";
import { HomeIcon } from "./SectionShell";


/* =====================================================
   ADMIN > NON MEDICAL SERVICES (layout) - "hma-" class (Home Page er CSS)
   Rakhbe: src/assets/Backend/AdminNonMedicalServices.jsx

   /admin/non-medical-services                       -> prothom page e chole jay (App.jsx e)
   /admin/non-medical-services/patient-support -> NonMedicalServices/PatientSupport.jsx
   /admin/non-medical-services/hotel           -> NonMedicalServices/Hotel.jsx ... ityadi
   ===================================================== */
const AdminNonMedicalServices = () => {
  const { pathname } = useLocation();
  const tabsRef = useRef(null);

  // Khola tab ta lukano thakle (onek tab hole) scroll kore chokher shamne ane
  useEffect(() => {
    const el = tabsRef.current ? tabsRef.current.querySelector(".hma-tab.active") : null;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [pathname]);
  const current = NON_MEDICAL_SECTIONS.find((s) => pathname.startsWith(`/admin/non-medical-services/${s.path}`));

  return (
    <div className="hma">
      {/* ---------- Header ---------- */}
      <section className="hma-head">
        <div className="hma-head-text">
          <span className="hma-kicker">
            <HomeIcon name="support" size={15} /> Website Pages
          </span>
          <h2>Non Medical Services</h2>
          <p>Manage the content of each support service page (travel, stay, visa and more). Pick a service below to edit it.</p>
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
      <nav className="hma-tabs" aria-label="Non medical services" ref={tabsRef}>
        {NON_MEDICAL_SECTIONS.map((s, i) => (
          <NavLink key={s.path} to={`/admin/non-medical-services/${s.path}`} className="hma-tab">
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

export default AdminNonMedicalServices;
