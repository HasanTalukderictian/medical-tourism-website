/* Hospital.jsx ar HospitalDetails.jsx er shared choto component (Icon, Pic, Reveal, Stars) */
import { useEffect, useRef, useState } from "react";

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
  pin: <><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  bed: <><path d="M3 18V6M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" /><circle cx="7" cy="11" r="1.8" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  award: <><circle cx="12" cy="9" r="5.5" /><path d="M8.5 13.5L7 21l5-2.5 5 2.5-1.5-7.5" /></>,
  shield: <><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  heart: <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />,
  pulse: <path d="M3 12h4l2.5-6 4 12 2.5-6H21" />,
  brain: <><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a2 2 0 0 0-3-1z" /><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1" /></>,
  bone: <path d="M7 4a2.5 2.5 0 0 0-2.4 3.2A2.5 2.5 0 1 0 7.8 10L14 16.2a2.5 2.5 0 1 0 2.8 3.2A2.5 2.5 0 1 0 20 16.6 2.5 2.5 0 1 0 16.2 14L10 7.8A2.5 2.5 0 0 0 7 4z" />,
  ribbon: <><path d="M12 3a4 4 0 0 0-4 4c0 3 4 7 4 7s4-4 4-7a4 4 0 0 0-4-4z" /><path d="M10 13l-4 8 3-1 1.5 2.5L13 15M14 13l4 8-3-1-1.5 2.5L11 15" /></>,
  kidney: <><path d="M9 4C5 4 4 8 4 12s1 8 5 8c2.5 0 3-2 3-4s-2-2-2-4 2-2 2-4-1-4-3-4z" /><path d="M15 4c4 0 5 4 5 8s-1 8-5 8" /></>,
  baby: <><circle cx="12" cy="8" r="4" /><path d="M6 21c0-3.3 2.7-6 6-6s6 2.7 6 6M10.5 8h.01M13.5 8h.01" /></>,
  drop: <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />,
  stomach: <path d="M9 3v4c0 2-3 2-3 6a7 7 0 0 0 7 7c3 0 5-2 5-5s-2-4-4-4-3-1-3-3V3" />,
  cross: <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" />,
  female: <><circle cx="12" cy="9" r="5" /><path d="M12 14v7M9 18h6" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></>,
  grid: <><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></>,
  list: <><rect x="4" y="4" width="16" height="6" rx="1.5" /><rect x="4" y="14" width="16" height="6" rx="1.5" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  left: <path d="M15 6l-6 6 6 6" />,
  right: <path d="M9 6l6 6-6 6" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  chat: <><path d="M4 5h16v11H9l-5 4z" /><path d="M8 9h8M8 12h5" /></>,
  doc: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
  plane: <path d="M10.5 13.5L3 11l1.5-1.5 8 .5 4-4.5a2 2 0 0 1 3 3L15.5 13l.5 8L14.5 22.5 12 15" />,
  home: <><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10M10 20v-5h4v5" /></>,
  car: <><path d="M5 16V11l2-5h10l2 5v5" /><path d="M3 16h18v3h-3M6 19H3v-3" /><circle cx="7.5" cy="16" r="1.5" /><circle cx="16.5" cy="16" r="1.5" /></>,
  stetho: <><path d="M6 3v6a4 4 0 0 0 8 0V3" /><path d="M10 13v2a5 5 0 0 0 10 0v-2" /><circle cx="20" cy="11" r="2" /></>,
  hospital: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M12 7v6M9 10h6M9 21v-4h6v4" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c.6-3.4 3-5 6-5s5.4 1.6 6 5" /><circle cx="17" cy="9" r="2.4" /><path d="M16.5 14.2c2.4.2 4 1.7 4.5 4.3" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z" /></>,
  wallet: <><rect x="3" y="6" width="18" height="13" rx="3" /><path d="M3 10h18" /><circle cx="16.5" cy="14.5" r="1" fill="currentColor" /></>,
  zoom: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5M11 8v6M8 11h6" /></>,
  image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.8" /><path d="M21 16l-5-5-8 8" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  // Doctor page er jonno
  video: <><rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10l5-3v10l-5-3" /></>,
  filter: <><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0" /><circle cx="16" cy="6" r="2" /><circle cx="10" cy="12" r="2" /><circle cx="18" cy="18" r="2" /></>,
  cap: <><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v5" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18" /></>,
  language: <><path d="M4 5h9M8.5 3v2M6 5c0 4 3 7 6 8M11 5c0 4-3 7-6 8" /><path d="M13 21l4-9 4 9M14.5 18h5" /></>,
  thumb: <path d="M7 11v9H4v-9zM7 11l4-7a2 2 0 0 1 3 2l-1 4h6a2 2 0 0 1 2 2.3l-1.3 6A2 2 0 0 1 17.7 20H7" />,
};

export const Icon = ({ name, size = 24 }) => (
  <svg {...base} width={size} height={size}>
    {paths[name] || paths.check}
  </svg>
);

export const Star = ({ size = 14 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />
  </svg>
);

// Specialty name onujayi icon
const specialtyMap = {
  Cardiology: "heart",
  Oncology: "ribbon",
  Neurology: "brain",
  Orthopedics: "bone",
  "Organ Transplant": "kidney",
  Nephrology: "drop",
  Gastroenterology: "stomach",
  Urology: "drop",
  Pediatrics: "baby",
  "IVF & Fertility": "female",
  "Obstetrics & Gynecology": "female",
  "Emergency & Trauma": "cross",
  "Health Check-up": "pulse",
};
export const specialtyIcon = (name) => specialtyMap[name] || "stetho";

/* ------------------- Scroll reveal ------------------- */
export const Reveal = ({ children, className = "", delay = 0, as: Tag = "div", ...rest }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`hx-reveal ${shown ? "is-shown" : ""} ${className}`} style={{ "--d": `${delay}s` }} {...rest}>
      {children}
    </Tag>
  );
};

/* ------------------- Image with fallback ------------------- */
export const Pic = ({ src, alt, className = "" }) => {
  const [failed, setFailed] = useState(!src);
  useEffect(() => setFailed(!src), [src]);
  return (
    <div className={`hx-pic ${failed ? "hx-pic--empty" : ""} ${className}`}>
      {failed ? <Icon name="hospital" size={40} /> : <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />}
    </div>
  );
};
