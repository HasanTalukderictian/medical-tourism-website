/* =====================================================
   SECTION SHELL: proti ta home section page er kathamo
   Rakhbe: src/assets/Backend/Home/SectionShell.jsx

   <SectionShell section="banner" actions={<button>...</button>}>
     ... ei section er form / list ekhane ...
   </SectionShell>

   children na dile "ekhono banano hoy nai" lekha dekhay.
   ===================================================== */
import { HOME_SECTIONS } from "./sections";

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
  home: <><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10M10 20v-6h4v6" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z" /></>,
  image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="M21 16l-5-5-9 9" /></>,
  tag: <><path d="M3 12V4h8l10 10-8 8z" /><circle cx="7.5" cy="8.5" r="1.5" /></>,
  box: <><path d="M3 7.5L12 3l9 4.5v9L12 21l-9-4.5z" /><path d="M3 7.5l9 4.5 9-4.5M12 12v9" /></>,
  award: <><circle cx="12" cy="9" r="6" /><path d="M8.5 14L7 22l5-3 5 3-1.5-8" /></>,
  route: <><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="6" r="2.5" /><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5" /></>,
  quote: <><path d="M4 18v-5a5 5 0 0 1 5-5" /><path d="M4 13h5v5H4zM14 18v-5a5 5 0 0 1 5-5M14 13h5v5h-5z" /></>,
  tools: <><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z" /></>,
};

export const HomeIcon = ({ name, size = 20 }) => (
  <svg {...base} width={size} height={size}>
    {paths[name]}
  </svg>
);

const SectionShell = ({ section, actions, children }) => {
  const info = HOME_SECTIONS.find((s) => s.path === section) || { label: section, text: "", icon: "home" };

  return (
    <section className="hma-card">
      <header className="hma-card-head">
        <span className="hma-card-icon">
          <HomeIcon name={info.icon} size={22} />
        </span>
        <div className="hma-card-title">
          <h3>{info.label}</h3>
          {info.text && <p>{info.text}</p>}
        </div>
        {actions && <div className="hma-card-actions">{actions}</div>}
      </header>

      <div className="hma-card-body">
        {children || (
          <div className="hma-empty">
            <span>
              <HomeIcon name="tools" size={26} />
            </span>
            <strong>This section is not built yet</strong>
            <p>
              Open <code>{`src/assets/Backend/Home/${info.file || "..."}`}</code> and add the form or list for{" "}
              {info.label.toLowerCase()} here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SectionShell;
