import  { useState } from "react";
import { Link } from "react-router-dom";
import "../Backend/Css/Dashboard.css";

/* =====================================================
   ADMIN DASHBOARD ("dsh-" class)
   Shob sonkha DEMO. API theke asol data ene niche boshao.
   ===================================================== */

const KPIS = [
  { label: "New Queries", value: "128", change: 12, note: "vs last month", icon: "inbox", to: "/admin/queries" },
  { label: "Active Patients", value: "342", change: 6, note: "currently in treatment", icon: "users", to: "/admin/patients" },
  { label: "Bookings", value: "86", change: -4, note: "this month", icon: "ticket", to: "/admin/bookings/hotels" },
  { label: "Revenue", value: "৳48.6L", change: 18, note: "this month", icon: "wallet", to: "/admin/reports" },
];

// Mashik patient query (shesh 12 mash)
const MONTHLY = [
  { m: "Dec", v: 64 }, { m: "Jan", v: 72 }, { m: "Feb", v: 58 }, { m: "Mar", v: 81 },
  { m: "Apr", v: 77 }, { m: "May", v: 93 }, { m: "Jun", v: 88 }, { m: "Jul", v: 102 },
  { m: "Aug", v: 97 }, { m: "Sep", v: 110 }, { m: "Oct", v: 114 }, { m: "Nov", v: 128 },
];

const BY_TREATMENT = [
  { name: "Cardiology", v: 34 },
  { name: "Oncology", v: 27 },
  { name: "Orthopedics", v: 21 },
  { name: "Health Checkup", v: 18 },
  { name: "Neurology", v: 15 },
  { name: "Others", v: 13 },
];

const RECENT = [
  { id: "TP-482913", name: "Rahim Uddin", treatment: "Cardiology", country: "India", date: "19 Nov", status: "new" },
  { id: "TP-482877", name: "Salma Begum", treatment: "Oncology", country: "Thailand", date: "19 Nov", status: "progress" },
  { id: "TP-482810", name: "Karim Ahmed", treatment: "Orthopedics", country: "India", date: "18 Nov", status: "confirmed" },
  { id: "TP-482754", name: "Nusrat Jahan", treatment: "Fertility & IVF", country: "Malaysia", date: "18 Nov", status: "progress" },
  { id: "TP-482701", name: "Abdul Hakim", treatment: "Health Checkup", country: "India", date: "17 Nov", status: "closed" },
];

const STATUS = {
  new: { label: "New", icon: "dot" },
  progress: { label: "In progress", icon: "clock" },
  confirmed: { label: "Confirmed", icon: "check" },
  closed: { label: "Closed", icon: "minus" },
};

const APPOINTMENTS = [
  { time: "10:30", ampm: "AM", patient: "Karim Ahmed", doctor: "Dr. Meera Iyer", place: "Apollo, Chennai", mode: "In person" },
  { time: "12:00", ampm: "PM", patient: "Salma Begum", doctor: "Dr. Somchai Wong", place: "Video call", mode: "Online" },
  { time: "03:15", ampm: "PM", patient: "Nusrat Jahan", doctor: "Dr. Lim Mei Ling", place: "Prince Court, KL", mode: "In person" },
  { time: "05:00", ampm: "PM", patient: "Rahim Uddin", doctor: "Dr. Arvind Rao", place: "Video call", mode: "Online" },
];

const BOOKINGS = [
  { label: "Hotels", value: 24, icon: "bed", to: "/admin/bookings/hotels" },
  { label: "Pick & Drop", value: 31, icon: "car", to: "/admin/bookings/pick-drop" },
  { label: "Interpreters", value: 12, icon: "lang", to: "/admin/bookings/interpreters" },
  { label: "Medicine", value: 19, icon: "pill", to: "/admin/medicine-requests" },
];

const COUNTRIES = [
  { flag: "🇮🇳", name: "India", v: 58 },
  { flag: "🇹🇭", name: "Thailand", v: 21 },
  { flag: "🇲🇾", name: "Malaysia", v: 14 },
  { flag: "🇨🇳", name: "China", v: 7 },
];

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
  inbox: <><path d="M3 13l2.5-8h13L21 13v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" /><path d="M3 13h5l1.5 2.5h5L16 13h5" /></>,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c.6-3.4 3-5 6-5s5.4 1.6 6 5" /><circle cx="17" cy="9" r="2.4" /><path d="M16.5 14.2c2.4.2 4 1.7 4.5 4.3" /></>,
  ticket: <><path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4z" /></>,
  wallet: <><rect x="3" y="6" width="18" height="14" rx="2" /><path d="M3 10h18M16 15h2" /></>,
  up: <path d="M7 14l5-5 5 5" />,
  down: <path d="M7 10l5 5 5-5" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z" /></>,
  download: <><path d="M12 4v11M7 10l5 5 5-5" /><path d="M4 20h16" /></>,
  bed: <><path d="M3 18V6M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" /><circle cx="7" cy="11" r="2" /></>,
  car: <><path d="M5 16V11l2-5h10l2 5v5" /><path d="M3 16h18v3h-3M6 19H3v-3" /><circle cx="7.5" cy="16" r="1.5" /><circle cx="16.5" cy="16" r="1.5" /></>,
  lang: <><path d="M4 5h9M8.5 3v2M6 5c.6 3 2.6 5.6 5 7M11 5c-.8 3.6-3.4 6.5-7 8" /><path d="M13 21l4-9 4 9M14.5 18h5" /></>,
  pill: <><rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-45 12 12)" /><path d="M9.5 9.5l5 5" /></>,
  video: <><rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10l5-3v10l-5-3" /></>,
  pin: <><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  minus: <path d="M6 12h12" />,
  dot: <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />,
};

const Icon = ({ name, size = 20 }) => (
  <svg {...base} width={size} height={size}>
    {paths[name]}
  </svg>
);

/* ---------------------------- CHART: mashik query (column) ---------------------------- */
const MonthlyChart = ({ data }) => {
  const [hover, setHover] = useState(null);
  const W = 640;
  const H = 240;
  const pad = { top: 16, right: 8, bottom: 28, left: 36 };
  const innerW = W - pad.left - pad.right;
  const innerH = H - pad.top - pad.bottom;
  const max = 140; // y axis er upor shima
  const ticks = [0, 35, 70, 105, 140];
  const slot = innerW / data.length;
  const barW = Math.min(26, slot - 10);
  const y = (v) => pad.top + innerH - (v / max) * innerH;

  // upore 4px gol, niche shoja
  const barPath = (x, top, w, bottom) => {
    const r = Math.min(4, w / 2, bottom - top);
    return `M${x},${bottom} V${top + r} Q${x},${top} ${x + r},${top} H${x + w - r} Q${x + w},${top} ${x + w},${top + r} V${bottom} Z`;
  };

  return (
    <div className="dsh-chart" onMouseLeave={() => setHover(null)}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Patient queries per month for the last 12 months">
        {/* grid */}
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.left} x2={W - pad.right} y1={y(t)} y2={y(t)} className="dsh-grid" />
            <text x={pad.left - 8} y={y(t) + 4} className="dsh-axis" textAnchor="end">
              {t}
            </text>
          </g>
        ))}
        {data.map((d, i) => {
          const x = pad.left + i * slot + (slot - barW) / 2;
          const isLast = i === data.length - 1;
          return (
            <g key={d.m}>
              <path
                d={barPath(x, y(d.v), barW, y(0))}
                className={`dsh-bar ${isLast ? "is-current" : ""} ${hover === i ? "is-hover" : ""}`}
              />
              <text x={x + barW / 2} y={H - 8} className="dsh-axis" textAnchor="middle">
                {d.m}
              </text>
              {/* boro hover er jayga */}
              <rect
                x={pad.left + i * slot}
                y={pad.top}
                width={slot}
                height={innerH}
                fill="transparent"
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                tabIndex={0}
                aria-label={`${d.m}: ${d.v} queries`}
              />
            </g>
          );
        })}
        {/* shudhu shesh mash er label */}
        <text
          x={pad.left + (data.length - 1) * slot + slot / 2}
          y={y(data[data.length - 1].v) - 8}
          className="dsh-bar-label"
          textAnchor="middle"
        >
          {data[data.length - 1].v}
        </text>
      </svg>

      {hover !== null && (
        <div
          className={`dsh-tip ${hover >= data.length - 2 ? "is-right" : ""}`}
          style={{
            left: `${((pad.left + hover * slot + slot / 2) / W) * 100}%`,
            top: `${(y(data[hover].v) / H) * 100}%`,
          }}
          role="status"
        >
          <strong>{data[hover].v}</strong> queries
          <small>{data[hover].m}</small>
        </div>
      )}
    </div>
  );
};

/* ---------------------------- PAGE ---------------------------- */
const Dashboard = () => {
  const total = MONTHLY.reduce((s, d) => s + d.v, 0);
  const maxT = Math.max(...BY_TREATMENT.map((t) => t.v));
  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="dsh">
      {/* ================= WELCOME ================= */}
      <section className="dsh-welcome">
        <div>
          <small>{today}</small>
          <h2>{greet}, Admin 👋</h2>
          <p>Here&apos;s what is happening with your patients and bookings today.</p>
        </div>
        <div className="dsh-welcome-actions">
         
          <button type="button" className="dsh-btn">
            <Icon name="download" size={17} /> Export report
          </button>
        </div>
      </section>

      {/* ================= KPI ================= */}
      <section className="dsh-kpis">
        {KPIS.map((k) => {
          const up = k.change >= 0;
          return (
            <Link key={k.label} to={k.to} className="dsh-kpi">
              <div className="dsh-kpi-top">
                <span className="dsh-kpi-icon">
                  <Icon name={k.icon} size={22} />
                </span>
                <span className={`dsh-change ${up ? "is-up" : "is-down"}`}>
                  <Icon name={up ? "up" : "down"} size={14} />
                  {Math.abs(k.change)}%
                </span>
              </div>
              <strong className="dsh-kpi-value">{k.value}</strong>
              <span className="dsh-kpi-label">{k.label}</span>
              <small className="dsh-kpi-note">
                {up ? "Up" : "Down"} {Math.abs(k.change)}% {k.note}
              </small>
            </Link>
          );
        })}
      </section>

      {/* ================= CHARTS ================= */}
      <section className="dsh-row dsh-row--charts">
        <article className="dsh-card">
          <header className="dsh-card-head">
            <div>
              <h3>Patient queries</h3>
              <p>Last 12 months · {total.toLocaleString("en-US")} total</p>
            </div>
            <Link to="/admin/reports" className="dsh-link">
              Full report <Icon name="arrow" size={15} />
            </Link>
          </header>
          {/* Mobile e chart pashe scroll hoy, jate lekha chhoto na hoy */}
          <div className="dsh-chart-scroll">
            <MonthlyChart data={MONTHLY} />
          </div>
        </article>

        <article className="dsh-card">
          <header className="dsh-card-head">
            <div>
              <h3>Queries by treatment</h3>
              <p>This month</p>
            </div>
          </header>
          <ul className="dsh-hbars">
            {BY_TREATMENT.map((t) => (
              <li key={t.name} title={`${t.name}: ${t.v} queries`}>
                <div className="dsh-hbar-top">
                  <span>{t.name}</span>
                  <strong>{t.v}</strong>
                </div>
                <div className="dsh-hbar-track">
                  <span style={{ width: `${(t.v / maxT) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </article>
      </section>

      {/* ================= TABLE + APPOINTMENTS ================= */}
      <section className="dsh-row dsh-row--table">
        <article className="dsh-card dsh-card--flush">
          <header className="dsh-card-head">
            <div>
              <h3>Recent treatment queries</h3>
              <p>Newest first</p>
            </div>
            <Link to="/admin/queries" className="dsh-link">
              View all <Icon name="arrow" size={15} />
            </Link>
          </header>
          <div className="dsh-table-wrap">
            <table className="dsh-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Treatment</th>
                  <th>Country</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {RECENT.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <div className="dsh-person">
                        <span className="dsh-avatar">
                          {r.name
                            .split(" ")
                            .map((w) => w[0])
                            .slice(0, 2)
                            .join("")}
                        </span>
                        <div>
                          <strong>{r.name}</strong>
                          <small>{r.id}</small>
                        </div>
                      </div>
                    </td>
                    <td>{r.treatment}</td>
                    <td>{r.country}</td>
                    <td>{r.date}</td>
                    <td>
                      <span className={`dsh-status dsh-status--${r.status}`}>
                        <Icon name={STATUS[r.status].icon} size={13} />
                        {STATUS[r.status].label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="dsh-card">
          <header className="dsh-card-head">
            <div>
              <h3>Today&apos;s appointments</h3>
              <p>{APPOINTMENTS.length} scheduled</p>
            </div>
            <Link to="/admin/appointments" className="dsh-link">
              All <Icon name="arrow" size={15} />
            </Link>
          </header>
          <ul className="dsh-appts">
            {APPOINTMENTS.map((a) => (
              <li key={a.time + a.patient}>
                <div className="dsh-appt-time">
                  <strong>{a.time}</strong>
                  <small>{a.ampm}</small>
                </div>
                <div className="dsh-appt-body">
                  <strong>{a.patient}</strong>
                  <span>{a.doctor}</span>
                  <small>
                    <Icon name={a.mode === "Online" ? "video" : "pin"} size={13} /> {a.place}
                  </small>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </section>

      {/* ================= BOOKINGS + COUNTRIES ================= */}
      <section className="dsh-row dsh-row--bottom">
        <article className="dsh-card">
          <header className="dsh-card-head">
            <div>
              <h3>Service bookings</h3>
              <p>This month</p>
            </div>
          </header>
          <div className="dsh-services">
            {BOOKINGS.map((b) => (
              <Link key={b.label} to={b.to} className="dsh-service">
                <span className="dsh-service-icon">
                  <Icon name={b.icon} size={20} />
                </span>
                <strong>{b.value}</strong>
                <span>{b.label}</span>
              </Link>
            ))}
          </div>
        </article>

        <article className="dsh-card">
          <header className="dsh-card-head">
            <div>
              <h3>Patients by country</h3>
              <p>Share of active patients</p>
            </div>
          </header>
          <ul className="dsh-countries">
            {COUNTRIES.map((c) => (
              <li key={c.name}>
                <span className="dsh-flag" aria-hidden="true">
                  {c.flag}
                </span>
                <div className="dsh-country-body">
                  <div className="dsh-hbar-top">
                    <span>{c.name}</span>
                    <strong>{c.v}%</strong>
                  </div>
                  <div className="dsh-hbar-track">
                    <span style={{ width: `${c.v}%` }} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
};

export default Dashboard;
