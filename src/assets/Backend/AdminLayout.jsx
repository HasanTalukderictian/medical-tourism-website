import  { useCallback, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Menu from "./Menu";
import Header from "./Header";
import Footer from "./Footer";


/* =====================================================
   ADMIN LAYOUT: Header + Menu + Footer ekshathe
   Admin er shob page eitar bhitore <Outlet /> e dekhabe.
   Layout er CSS AdminMenu.css e ache (.adl- class).

   App.jsx e:
   <Route path="/admin" element={<AdminLayout />}>
     <Route path="dashboard" element={<Dashboard />} />
     ...
   </Route>
   ===================================================== */

const MOBILE_BP = 1024; // AdminMenu.css er @media (max-width: 1024px) er shathe mil rakho

const readCollapsed = () => {
  try {
    return localStorage.getItem("adminMenuCollapsed") === "1";
  } catch {
    return false;
  }
};

const AdminLayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(readCollapsed);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = () => {
    if (window.innerWidth <= MOBILE_BP) {
      setMobileOpen((v) => !v);
      return;
    }
    setCollapsed((v) => {
      try {
        localStorage.setItem("adminMenuCollapsed", v ? "0" : "1");
      } catch {
        /* storage na thakleo cholbe */
      }
      return !v;
    });
  };

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const logout = () => {
    /* EKHANE tomar logout API / token muchar kaj koro */
    navigate("/admin/login");
  };

  // DEMO user. Login er por asol user er tottho dao.
  const user = { name: "Admin User", role: "Super Admin", photo: null };

  return (
    <div className={`adl ${collapsed ? "is-collapsed" : ""}`}>
      <Menu collapsed={collapsed} mobileOpen={mobileOpen} onClose={closeMobile} onLogout={logout} />
      <div className="adl-main">
        <Header onToggleMenu={toggleMenu} user={user} onLogout={logout} />
        <main className="adl-content">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
