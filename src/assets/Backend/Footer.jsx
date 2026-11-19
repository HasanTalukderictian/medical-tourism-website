import React from "react";
import "../Backend/Css/AdminFooter.css";

/* =====================================================
   ADMIN FOOTER (normal, simple) - "adf-" class
   Naam ar link gula ekhane bodlao
   ===================================================== */
const DEVELOPER = { name: "Hasan Talukder", url: "#" };

const SOCIAL = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/hasan.talukder.Ict",
    color: "#1f2937",
    path: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/js-hasan-talukder/",
    color: "#1f2937",
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@busycoder8650",
    color: "#ff0000",
    path: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z",
  },
];

const Footer = () => (
  <footer className="adf">
    <p>
      © {new Date().getFullYear()} Admin Dashboard. Design &amp; Developed by{" "}
      <a href={DEVELOPER.url} target="_blank" rel="noopener noreferrer">
        {DEVELOPER.name}
      </a>
    </p>

    <div className="adf-social">
      {SOCIAL.map((s) => (
        <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name} style={{ color: s.color }}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d={s.path} />
          </svg>
        </a>
      ))}
    </div>
  </footer>
);

export default Footer;
