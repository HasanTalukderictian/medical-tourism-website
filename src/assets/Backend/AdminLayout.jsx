import { useCallback, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Menu from "./Menu";
import Header from "./Header";
import Footer from "./Footer";
import { adminLogout, getUser } from "../../components/api";
import { roleLabel } from "./permissions";

/* =====================================================
   ADMIN LAYOUT: Header + Menu + Footer ekshathe
   Admin er shob page eitar bhitore <Outlet /> e dekhabe.
   Layout er CSS AdminMenu.css e ache (.adl- class).
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
  const [loggingOut, setLoggingOut] = useState(false);

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

  /* LOGOUT
     1. POST /api/admin/logout (Bearer token shoho) -> server e token muche
     2. Browser theke token ar user muche
     3. Login page e pathay
     Server e error holeo browser theke logout hoye jabe. */
  const logout = async () => {
    if (loggingOut) return; // duibar click korle duibar call hobe na
    setLoggingOut(true);
    await adminLogout();
    navigate("/admin/login", { replace: true });
  };

  // Login er shomoy API theke asha user
  const saved = getUser() || {};
  const user = {
    name: saved.name || "Admin",
    role: saved.role ? saved.role.charAt(0).toUpperCase() + saved.role.slice(1) : "Admin",
    photo: saved.photo || null,
  };

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