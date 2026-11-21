import { Link, Navigate, useLocation } from "react-router-dom";
import { getToken, getUser } from "../../components/api";
import { can, firstAllowedPath, permForPath } from "../Backend/permissions";

/* =====================================================
   ADMIN GUARD
   Rakhbe: src/components/AdminGuard.jsx

   1. Login na thakle -> /admin/login
   2. perm dile, oi permission na thakle -> "No access" dekhay
      perm="auto" dile URL dekhe permission thik kore (permissions.js er PATH_PERMS)

   App.jsx e:
   <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
     <Route path="users" element={<AdminGuard perm="users"><UsersRoles /></AdminGuard>} />
   ===================================================== */
const AdminGuard = ({ children, perm }) => {
  const location = useLocation();
  const token = getToken();
  const user = getUser();

  if (!token || !user || user.active === false) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  const need = perm === "auto" ? permForPath(location.pathname) : perm;
  if (need && !can(need, user)) {
    return <NoAccess />;
  }

  return children;
};

/* Permission na thakle ei page dekhabe (admin layout er bhitore) */
export const NoAccess = () => {
  const home = firstAllowedPath();
  return (
    <div
      role="alert"
      style={{
        maxWidth: 460,
        margin: "60px auto",
        padding: "36px 28px",
        borderRadius: 20,
        background: "#fff",
        border: "1px solid #e4ebe7",
        textAlign: "center",
        fontFamily: "Poppins, system-ui, sans-serif",
        color: "#5b6470",
      }}
    >
      <div
        style={{
          display: "grid",
          placeItems: "center",
          width: 64,
          height: 64,
          margin: "0 auto 16px",
          borderRadius: "50%",
          background: "#fdecea",
          color: "#ee3123",
        }}
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
      </div>
      <h2 style={{ margin: "0 0 6px", color: "#1f2937", fontSize: 20 }}>You don&apos;t have access</h2>
      <p style={{ margin: "0 0 20px", fontSize: 14, lineHeight: 1.6 }}>
        Your role does not include this page. Ask your super admin if you need access.
      </p>
      {home !== "/admin/no-access" && (
        <Link
          to={home}
          style={{
            display: "inline-block",
            padding: "11px 22px",
            borderRadius: 12,
            background: "#00924c",
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Go to my first page
        </Link>
      )}
    </div>
  );
};

export default AdminGuard;
