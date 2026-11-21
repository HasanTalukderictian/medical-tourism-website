import { Navigate, useLocation } from "react-router-dom";
import { getToken, getUser } from "../services/api";

/* =====================================================
   ADMIN GUARD
   Login na kore /admin/... e dhukle login page e pathay.
   Rakhbe: src/components/AdminGuard.jsx
   ===================================================== */
const AdminGuard = ({ children }) => {
  const location = useLocation();
  const token = getToken();
  const user = getUser();

  if (!token || !user || user.active === false) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default AdminGuard;
