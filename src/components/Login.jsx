import  { useState } from "react";
import { Link } from "react-router-dom";
import "../Css/Login.css";

// Logo: tomar project er path (SisterConcern e je path use korecho)
import logo from "../assets/Image/logo/AKBH MEDICAL-01.png";

/* =====================================================
   ADMIN PORTAL LOGIN
   - Shudhu staff/admin der jonno. Register / Google login nai.
   - Asol password check SERVER e korte hobe. Frontend e kono
     password ba "admin/admin" likhe rakhbe na.
   ===================================================== */

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
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></>,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  eyeOff: <><path d="M3 3l18 18" /><path d="M10.6 5.1A10.7 10.7 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.6 6.6A17 17 0 0 0 2 12s3.5 7 10 7a9.7 9.7 0 0 0 5.4-1.6" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  left: <path d="M19 12H5M11 6l-6 6 6 6" />,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c.6-3.4 3-5 6-5s5.4 1.6 6 5" /><circle cx="17" cy="9" r="2.4" /><path d="M16.5 14.2c2.4.2 4 1.7 4.5 4.3" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  edit: <><path d="M4 20h4L19 9l-4-4L4 16z" /><path d="M13.5 6.5l4 4" /></>,
  chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
  shield: <><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  alert: <><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16v.01" /></>,
  key: <><circle cx="8" cy="15" r="4" /><path d="M11 12l9-9M17 6l3 3M14 9l2 2" /></>,
};

const Icon = ({ name, size = 20 }) => (
  <svg {...base} width={size} height={size}>
    {paths[name]}
  </svg>
);

const features = [
  { icon: "users", title: "Patients & queries", text: "Treatment plans, consultation requests and reports." },
  { icon: "calendar", title: "Bookings", text: "Appointments, hotels, pick & drop and interpreters." },
  { icon: "edit", title: "Website content", text: "Packages, hospitals, doctors, blog and career posts." },
  { icon: "chart", title: "Reports", text: "Daily leads, bookings and team performance." },
];

const MAX_TRIES = 5;

/* ---------------------------- PAGE ---------------------------- */
const Login = () => {
  const [form, setForm] = useState({ username: "", password: "", remember: false });
  const [showPass, setShowPass] = useState(false);
  const [capsOn, setCapsOn] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { type: "error" | "success", text }
  const [tries, setTries] = useState(0);

  const locked = tries >= MAX_TRIES;

  const setField = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((er) => ({ ...er, [key]: "" }));
    setMessage(null);
  };

  // Caps Lock on thakle password e shotorko kore
  const checkCaps = (e) => {
    if (e.getModifierState) setCapsOn(e.getModifierState("CapsLock"));
  };

  const validate = () => {
    const er = {};
    if (form.username.trim().length < 3) er.username = "Please enter your email or staff ID.";
    if (!form.password) er.password = "Please enter your password.";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (locked || loading || !validate()) return;
    setLoading(true);
    setMessage(null);

    /* EKHANE tomar admin login API call boshao. Jemon:
       const res = await fetch("/api/admin/login", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         credentials: "include",
         body: JSON.stringify({ username: form.username, password: form.password, remember: form.remember }),
       });
       if (!res.ok) {
         setTries((t) => t + 1);
         setMessage({ type: "error", text: "Wrong email/staff ID or password." });
         setLoading(false);
         return;
       }
       navigate("/admin/dashboard");

       Ekhon shudhu DEMO: 1 second por success dekhay. */
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setMessage({ type: "success", text: "Login successful! Opening the admin dashboard..." });
  };

  return (
    <main className="lgn-page lgn-page--admin">
      <div className="lgn-shell">
        {/* ================= BRAND PANEL ================= */}
        <aside className="lgn-brand">
          <div className="lgn-brand-bg" aria-hidden="true" />
          <Link to="/" className="lgn-logo">
            <img src={logo} alt="Akashbari Medical" />
          </Link>

          <div className="lgn-brand-body">
            <span className="lgn-brand-badge">
              <Icon name="shield" size={16} /> Admin Portal
            </span>
            <h2>
              Manage everything <em>in one place</em>
            </h2>
            <p>Sign in to the Akashbari Medical control panel to manage patients, bookings and website content.</p>

            <ul className="lgn-features lgn-features--grid">
              {features.map((f) => (
                <li key={f.title}>
                  <span>
                    <Icon name={f.icon} size={20} />
                  </span>
                  <div>
                    <strong>{f.title}</strong>
                    <small>{f.text}</small>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lgn-secure">
            <span>
              <Icon name="lock" size={20} />
            </span>
            <div>
              <strong>Authorised staff only</strong>
              <small>All sign-ins and actions are logged for security.</small>
            </div>
          </div>
        </aside>

        {/* ================= FORM ================= */}
        <section className="lgn-main">
          <div className="lgn-top">
            <Link to="/" className="lgn-back">
              <Icon name="left" size={16} /> Back to website
            </Link>
            <Link to="/" className="lgn-logo lgn-logo--mobile">
              <img src={logo} alt="Akashbari Medical" />
            </Link>
          </div>

          <div className="lgn-card">
            <span className="lgn-role">
              <Icon name="key" size={15} /> Admin &amp; Staff Login
            </span>
            <h1>Sign in to the dashboard</h1>
            <p className="lgn-sub">Use the account given to you by your administrator.</p>

            {message && (
              <div className={`lgn-alert lgn-alert--${message.type}`} role={message.type === "error" ? "alert" : "status"}>
                <Icon name={message.type === "error" ? "alert" : "check"} size={18} />
                {message.text}
              </div>
            )}

            {locked && (
              <div className="lgn-alert lgn-alert--error" role="alert">
                <Icon name="lock" size={18} />
                Too many failed attempts. Please contact the super admin to unlock your account.
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="lgn-form">
              <label className={`lgn-field ${errors.username ? "has-error" : ""}`}>
                <span>Email or Staff ID</span>
                <div className="lgn-input">
                  <Icon name="user" size={18} />
                  <input
                    type="text"
                    value={form.username}
                    onChange={setField("username")}
                    placeholder="admin@akashbarimedical.com"
                    autoComplete="username"
                    disabled={locked}
                  />
                </div>
                {errors.username && <em>{errors.username}</em>}
              </label>

              <label className={`lgn-field ${errors.password ? "has-error" : ""}`}>
                <span>Password</span>
                <div className="lgn-input">
                  <Icon name="lock" size={18} />
                  <input
                    type={showPass ? "text" : "password"}
                    value={form.password}
                    onChange={setField("password")}
                    onKeyUp={checkCaps}
                    onKeyDown={checkCaps}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={locked}
                  />
                  <button
                    type="button"
                    className="lgn-eye"
                    onClick={() => setShowPass((v) => !v)}
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    <Icon name={showPass ? "eyeOff" : "eye"} size={18} />
                  </button>
                </div>
                {errors.password && <em>{errors.password}</em>}
                {capsOn && (
                  <small className="lgn-caps">
                    <Icon name="alert" size={14} /> Caps Lock is on
                  </small>
                )}
              </label>

              <div className="lgn-row">
                <label className="lgn-check">
                  <input type="checkbox" checked={form.remember} onChange={setField("remember")} />
                  <span className="lgn-check-box" aria-hidden="true">
                    <Icon name="check" size={13} />
                  </span>
                  Keep me signed in
                </label>
                <span className="lgn-forgot-text">Forgot password? Ask your super admin.</span>
              </div>

              <button type="submit" className="lgn-btn" disabled={loading || locked}>
                {loading ? (
                  <>
                    <span className="lgn-spinner" aria-hidden="true" /> Signing in...
                  </>
                ) : (
                  <>
                    Sign In <Icon name="arrow" size={18} />
                  </>
                )}
              </button>
            </form>

            <p className="lgn-note">
              <Icon name="shield" size={16} />
              Do not use the "Keep me signed in" option on shared or public computers.
            </p>
          </div>

          <p className="lgn-legal">
            © {new Date().getFullYear()} Akashbari Medical · Admin Portal
          </p>
        </section>
      </div>
    </main>
  );
};

export default Login;
