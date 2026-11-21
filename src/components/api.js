/* =====================================================
   API HELPER (shob API call ekhan theke hobe)
   Rakhbe: src/services/api.js

   Backend er URL .env file e dao (project er root e):
   VITE_API_URL=http://127.0.0.1:8000/api
   .env bodlale "npm run dev" abar chalu korte hobe.
   ===================================================== */

export const API_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

const TOKEN_KEY = "adminToken";
const USER_KEY = "adminUser";

/* ---------------------------- TOKEN ----------------------------
   "Keep me signed in" dile localStorage (browser bondho korleo thake),
   na dile sessionStorage (tab bondho korle chole jay).
------------------------------------------------------------------- */
const safe = (fn, fallback = null) => {
    try {
        return fn();
    } catch {
        return fallback;
    }
};

export const getToken = () =>
    safe(() => localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY));

export const getUser = () =>
    safe(() => {
        const raw = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
        return raw ? JSON.parse(raw) : null;
    });

export const saveAuth = (token, user, remember) =>
    safe(() => {
        clearAuth();
        const store = remember ? localStorage : sessionStorage;
        store.setItem(TOKEN_KEY, token);
        store.setItem(USER_KEY, JSON.stringify(user));
    });

export const clearAuth = () =>
    safe(() => {
        [localStorage, sessionStorage].forEach((s) => {
            s.removeItem(TOKEN_KEY);
            s.removeItem(USER_KEY);
        });
    });

export const isLoggedIn = () => Boolean(getToken());

/* ---------------------------- REQUEST ----------------------------
   apiRequest("/admin/queries")                         -> GET
   apiRequest("/admin/queries", { method: "POST", body: { name: "x" } })
   body object dile FormData hoye jay (Postman er form-data er moto).
   Token thakle nije thekei "Authorization: Bearer ..." boshe.
------------------------------------------------------------------- */
export class ApiError extends Error {
    constructor(message, status, data) {
        super(message);
        this.status = status;
        this.data = data;
    }
}

const toFormData = (obj) => {
    const fd = new FormData();
    Object.keys(obj).forEach((k) => {
        const v = obj[k];
        if (v === undefined || v === null) return;
        if (typeof v === "boolean") fd.append(k, v ? "1" : "0");
        else fd.append(k, v);
    });
    return fd;
};

export const apiRequest = async(path, { method = "GET", body, auth = true } = {}) => {
    const headers = { Accept: "application/json" };
    const token = getToken();
    if (auth && token) headers.Authorization = `Bearer ${token}`;

    let payload;
    if (body instanceof FormData) payload = body;
    else if (body) payload = toFormData(body);

    let res;
    try {
        res = await fetch(`${API_URL}${path}`, { method, headers, body: payload });
    } catch {
        // Server bondho / internet nai / CORS block
        throw new ApiError("Cannot reach the server. Please check your connection and try again.", 0, null);
    }

    let data = null;
    try {
        data = await res.json();
    } catch {
        data = null;
    }

    // Token er meyad shesh / bhul hole login e pathai
    if (res.status === 401 && auth && token) {
        clearAuth();
        if (!window.location.pathname.startsWith("/admin/login")) {
            window.location.href = "/admin/login";
        }
    }

    if (!res.ok || (data && data.status === false)) {
        throw new ApiError(errorText(data, res.status), res.status, data);
    }

    return data;
};

/* Laravel er error theke porar moto lekha ber kore */
const errorText = (data, status) => {
    if (data && data.errors) {
        const first = Object.values(data.errors)[0];
        if (Array.isArray(first) && first[0]) return first[0];
    }
    if (data && data.message) return data.message;
    if (status === 429) return "Too many attempts. Please wait a minute and try again.";
    if (status >= 500) return "Server error. Please try again later.";
    return "Something went wrong. Please try again.";
};

/* ---------------------------- AUTH ---------------------------- */
export const adminLogin = async({ email, password, remember }) => {
    const data = await apiRequest("/admin/login", {
        method: "POST",
        body: { email, password },
        auth: false,
    });
    saveAuth(data.token, data.user, remember);
    return data.user;
};

export const adminLogout = async() => {
    /* Backend e "/admin/logout" route thakle token server theke-o muche jabe.
       Na thakleo shomossha nai, browser theke muche dibo. */
    try {
        await apiRequest("/admin/logout", { method: "POST" });
    } catch {
        /* ignore */
    }
    clearAuth();
};