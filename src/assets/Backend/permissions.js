/* =====================================================
   PERMISSIONS (role-based access)
   Rakhbe: src/services/permissions.js

   - Admin menu er proti ta item er ekta "key" ache.
   - Role e je key gula thakbe, shei menu / page dekhte parbe.
   - Backend (Laravel) eki key gula save korbe, jemon:
     role "Manager" -> ["dashboard", "queries", "appointments"]
   - Notun menu banale ekhane ekta key add koro, ar Menu.jsx e
     shei item e `perm: "key"` dao.
   ===================================================== */
import { getUser } from "../../components/api";

export const PERMISSION_GROUPS = [{
        title: "Main",
        items: [{ key: "dashboard", label: "Dashboard", path: "/admin/dashboard" }],
    },
    {
        title: "Website Pages",
        items: [
            { key: "home", label: "Home Page", path: "/admin/home/banner" },
            { key: "medical_services", label: "Medical Services", path: "/admin/services/medical-consultation" },
            { key: "non_medical_services", label: "Non Medical Services", path: "/admin/services/patient-support" },
            { key: "hospitals", label: "Hospitals", path: "/admin/hospitals" },
            { key: "doctors", label: "Doctors", path: "/admin/doctors" },
            { key: "packages", label: "Packages", path: "/admin/packages" },
            { key: "plan_setup", label: "Treatment Plan Setup", path: "/admin/plan-setup" },
            { key: "company", label: "Company", path: "/admin/company/about" },
            { key: "media", label: "Media", path: "/admin/media/blog" },
            { key: "career", label: "Career / Jobs", path: "/admin/career" },
            { key: "contact_page", label: "Contact Page", path: "/admin/contact-page" },
        ],
    },
    {
        title: "Requests",
        items: [
            { key: "queries", label: "Patient Queries", path: "/admin/queries" },
            { key: "treatment_plans", label: "Treatment Plans", path: "/admin/treatment-plans" },
            { key: "appointments", label: "Appointments", path: "/admin/appointments" },
            { key: "consultations", label: "Consultations", path: "/admin/consultations" },
            { key: "medicine_requests", label: "Medicine Requests", path: "/admin/medicine-requests" },
            { key: "bookings", label: "Service Bookings", path: "/admin/bookings/hotels" },
            { key: "visa", label: "Visa Processing", path: "/admin/visa" },
            { key: "job_applications", label: "Job Applications", path: "/admin/job-applications" },
            { key: "messages", label: "Contact Messages", path: "/admin/messages" },
        ],
    },
    {
        title: "System",
        items: [
            { key: "reports", label: "Reports", path: "/admin/reports" },
            { key: "users", label: "Users & Roles", path: "/admin/users" },
            { key: "settings", label: "Settings", path: "/admin/settings" },
        ],
    },
];

export const ALL_PERMISSIONS = PERMISSION_GROUPS.reduce((all, g) => all.concat(g.items.map((i) => i.key)), []);

// Ei role gula shob kichu pabe (permission list lagbe na)
export const FULL_ACCESS_ROLES = ["super_admin", "admin"];

/* role kokhono string ("admin"), kokhono object ({ slug: "admin" }) ashte pare */
export const roleSlug = (role) => {
    if (!role) return "";
    if (typeof role === "string") return role.toLowerCase();
    return String(role.slug || role.name || "").toLowerCase().replace(/\s+/g, "_");
};

export const roleLabel = (role) => {
    if (!role) return "No role";
    const name = typeof role === "string" ? role : role.name || role.slug || "";
    return name
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
};

/* Login kora user er permission list */
export const userPermissions = (user) => {
    const u = user || getUser();
    if (!u) return [];
    if (FULL_ACCESS_ROLES.includes(roleSlug(u.role))) return ALL_PERMISSIONS;
    if (Array.isArray(u.permissions)) return u.permissions;
    if (u.role && Array.isArray(u.role.permissions)) return u.role.permissions;
    return [];
};

/* can("users") -> true / false */
export const can = (key, user) => {
    if (!key) return true;
    return userPermissions(user).includes(key);
};

/* Login er por prothom je page e dhukte pare (dashboard na thakle porer ta) */
export const firstAllowedPath = (user) => {
    const perms = userPermissions(user);
    for (const g of PERMISSION_GROUPS) {
        for (const item of g.items) {
            if (perms.includes(item.key)) return item.path;
        }
    }
    return "/admin/no-access";
};

/* URL dekhe kon permission lagbe (Coming soon page ar notun page er jonno).
   Lomba prefix age rakho. */
const PATH_PERMS = [
    ["/admin/dashboard", "dashboard"],
    ["/admin/home", "home"],
    ["/admin/services/medical-consultation", "medical_services"],
    ["/admin/services/tele-consultation", "medical_services"],
    ["/admin/services/doctor-appointment", "medical_services"],
    ["/admin/services/medical-accommodation", "medical_services"],
    ["/admin/services/air-ambulance", "medical_services"],
    ["/admin/services/medicine", "medical_services"],
    ["/admin/services/training-development", "medical_services"],
    ["/admin/services", "non_medical_services"],
    ["/admin/hospitals", "hospitals"],
    ["/admin/doctors", "doctors"],
    ["/admin/packages", "packages"],
    ["/admin/plan-setup", "plan_setup"],
    ["/admin/company", "company"],
    ["/admin/media", "media"],
    ["/admin/career", "career"],
    ["/admin/contact-page", "contact_page"],
    ["/admin/queries", "queries"],
    ["/admin/treatment-plans", "treatment_plans"],
    ["/admin/appointments", "appointments"],
    ["/admin/consultations", "consultations"],
    ["/admin/medicine-requests", "medicine_requests"],
    ["/admin/bookings", "bookings"],
    ["/admin/visa", "visa"],
    ["/admin/job-applications", "job_applications"],
    ["/admin/messages", "messages"],
    ["/admin/reports", "reports"],
    ["/admin/users", "users"],
    ["/admin/settings", "settings"],
];

export const permForPath = (pathname) => {
    const hit = PATH_PERMS.find(([prefix]) => pathname === prefix || pathname.startsWith(prefix + "/"));
    return hit ? hit[1] : null;
};