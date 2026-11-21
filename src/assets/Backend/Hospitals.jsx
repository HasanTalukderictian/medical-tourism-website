import { useEffect, useMemo, useRef, useState } from "react";
import "../Backend/Css/Hospitals.css";
import { apiRequest, listOf } from "../../components/api";

/* =====================================================
   ADMIN > HOSPITALS ("hsp-" class)
   Rakhbe: src/assets/Backend/Hospitals.jsx   (/admin/hospitals)

   - Hospital list (card), search, desh + status filter
   - Notun hospital / edit (chobi upload shoho), active toggle, delete
   - Backend route na thakle (404) DEMO data dekhay, change save hoy na.

   Laravel e lagbe:
   GET    /api/admin/hospitals
   POST   /api/admin/hospitals          (form-data, image file shoho)
   PUT    /api/admin/hospitals/{id}     (POST + _method=PUT)
   DELETE /api/admin/hospitals/{id}
   ===================================================== */

export const hospitalsApi = {
  list: () => apiRequest("/admin/hospitals"),
  create: (fd) => apiRequest("/admin/hospitals", { method: "POST", body: fd }),
  update: (id, fd) => apiRequest(`/admin/hospitals/${id}`, { method: "PUT", body: fd }),
  remove: (id) => apiRequest(`/admin/hospitals/${id}`, { method: "DELETE" }),
};

/* Website e je desh gula ache */
const COUNTRIES = [
  { code: "india", name: "India" },
  { code: "thailand", name: "Thailand" },
  { code: "malaysia", name: "Malaysia" },
  { code: "singapore", name: "Singapore" },
  { code: "china", name: "China" },
];

const SPECIALTIES = [
  "Cardiology",
  "Oncology",
  "Orthopedics",
  "Neurology",
  "Nephrology",
  "Gastroenterology",
  "Fertility & IVF",
  "Eye Care",
  "Transplant",
  "Pediatrics",
];

const ACCREDITATIONS = ["JCI", "NABH", "MSQH", "ISO 9001"];

/* ---------------------------- DEMO DATA ---------------------------- */
const DEMO = [
  { id: 1, name: "Apollo Hospitals", country: "india", city: "Chennai", beds: 1000, rating: 4.7, accreditations: ["JCI", "NABH"], specialties: ["Cardiology", "Oncology", "Transplant"], image: "", active: true, featured: true },
  { id: 2, name: "Bumrungrad International", country: "thailand", city: "Bangkok", beds: 580, rating: 4.8, accreditations: ["JCI"], specialties: ["Cardiology", "Orthopedics", "Neurology"], image: "", active: true, featured: true },
  { id: 3, name: "Prince Court Medical Centre", country: "malaysia", city: "Kuala Lumpur", beds: 277, rating: 4.6, accreditations: ["MSQH"], specialties: ["Fertility & IVF", "Oncology"], image: "", active: true, featured: false },
  { id: 4, name: "Mount Elizabeth Hospital", country: "singapore", city: "Singapore", beds: 345, rating: 4.7, accreditations: ["JCI"], specialties: ["Neurology", "Cardiology"], image: "", active: false, featured: false },
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
  hospital: <><path d="M4 21V7l8-4 8 4v14" /><path d="M10 10h4M12 8v4M9 21v-5h6v5M2 21h20" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></>,
  edit: <><path d="M4 20h4L19 9l-4-4L4 16z" /><path d="M13.5 6.5l4 4" /></>,
  trash: <><path d="M4 7h16M10 11v6M14 11v6" /><path d="M6 7l1 13h10l1-13M9 7V4h6v3" /></>,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  pin: <><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></>,
  bed: <><path d="M3 18V6M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" /><circle cx="7" cy="11" r="2" /></>,
  star: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />,
  award: <><circle cx="12" cy="9" r="6" /><path d="M8.5 14L7 22l5-3 5 3-1.5-8" /></>,
  image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="M21 16l-5-5-9 9" /></>,
  upload: <><path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 20h16" /></>,
  alert: <><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16v.01" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8v.01" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z" /></>,
};

const Icon = ({ name, size = 18 }) => (
  <svg {...base} width={size} height={size}>
    {paths[name]}
  </svg>
);

/* ---------------------------- HELPERS ---------------------------- */
const countryName = (code) => {
  const c = COUNTRIES.find((x) => x.code === code);
  return c ? c.name : code || "-";
};

const isOn = (v) => v === true || v === 1 || v === "1";

/* Laravel theke array kokhono JSON string hoye ashe */
const toArray = (v) => {
  if (Array.isArray(v)) return v;
  if (typeof v === "string" && v.trim().startsWith("[")) {
    try {
      return JSON.parse(v);
    } catch {
      return [];
    }
  }
  return [];
};

const normalize = (h) => ({
  ...h,
  specialties: toArray(h.specialties),
  accreditations: toArray(h.accreditations),
  active: isOn(h.active),
  featured: isOn(h.featured),
  image: h.image_url || h.image || "",
});

/* Chobi na thakle / load na hole sundor placeholder */
const Thumb = ({ src, alt }) => {
  const [failed, setFailed] = useState(!src);
  useEffect(() => setFailed(!src), [src]);
  return (
    <div className={`hsp-thumb ${failed ? "is-empty" : ""}`}>
      {failed ? <Icon name="hospital" size={34} /> : <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />}
    </div>
  );
};

/* =====================================================
   PAGE
   ===================================================== */
const HospitalsAdmin = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [demo, setDemo] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [q, setQ] = useState("");
  const [country, setCountry] = useState("all");
  const [status, setStatus] = useState("all");
  const [editing, setEditing] = useState(null); // null | "new" | hospital
  const [deleting, setDeleting] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const [toast, setToast] = useState(null);

  const notify = (text, type = "success") => setToast({ text, type, id: Date.now() });

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const load = async () => {
    setLoading(true);
    setLoadError("");
    try {
      const res = await hospitalsApi.list();
      setList(listOf(res).map(normalize));
      setDemo(false);
    } catch (err) {
      if (err.status === 404) {
        setList(DEMO.map(normalize));
        setDemo(true);
      } else {
        setLoadError(err.message);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const shown = useMemo(() => {
    const term = q.trim().toLowerCase();
    return list.filter((h) => {
      if (country !== "all" && h.country !== country) return false;
      if (status === "active" && !h.active) return false;
      if (status === "inactive" && h.active) return false;
      if (!term) return true;
      return `${h.name} ${h.city} ${h.specialties.join(" ")}`.toLowerCase().includes(term);
    });
  }, [list, q, country, status]);

  const stats = useMemo(
    () => ({
      total: list.length,
      active: list.filter((h) => h.active).length,
      countries: new Set(list.map((h) => h.country)).size,
      featured: list.filter((h) => h.featured).length,
    }),
    [list]
  );

  const toggleActive = async (h) => {
    const next = !h.active;
    setBusyId(h.id);
    try {
      if (!demo) {
        const fd = new FormData();
        fd.append("active", next ? "1" : "0");
        await hospitalsApi.update(h.id, fd);
      }
      setList((l) => l.map((x) => (x.id === h.id ? { ...x, active: next } : x)));
      notify(`${h.name} is now ${next ? "visible on the website" : "hidden from the website"}.`);
    } catch (err) {
      notify(err.message, "error");
    }
    setBusyId(null);
  };

  const confirmDelete = async () => {
    const h = deleting;
    setBusyId(h.id);
    try {
      if (!demo) await hospitalsApi.remove(h.id);
      setList((l) => l.filter((x) => x.id !== h.id));
      notify(`${h.name} was deleted.`);
      setDeleting(null);
    } catch (err) {
      notify(err.message, "error");
    }
    setBusyId(null);
  };

  const onSaved = (saved, isNew) => {
    const h = normalize(saved);
    setList((l) => (isNew ? [h].concat(l) : l.map((x) => (x.id === h.id ? h : x))));
    notify(isNew ? `${h.name} was added.` : `${h.name} was updated.`);
    setEditing(null);
  };

  return (
    <div className="hsp">
      {/* ---------- Header ---------- */}
      <section className="hsp-head">
        <div>
          <span className="hsp-kicker">
            <Icon name="hospital" size={15} /> Website Pages
          </span>
          <h2>Hospitals</h2>
          <p>Add and manage the partner hospitals shown on the website.</p>
        </div>
        <div className="hsp-head-actions">
          <a href="/hospitals" target="_blank" rel="noopener noreferrer" className="hsp-btn hsp-btn--glass">
            <Icon name="globe" size={17} /> View on website
          </a>
          <button type="button" className="hsp-btn hsp-btn--red" onClick={() => setEditing("new")}>
            <Icon name="plus" size={17} /> Add Hospital
          </button>
        </div>
      </section>

      {/* ---------- Stats ---------- */}
      <section className="hsp-stats">
        {[
          { label: "Total hospitals", value: stats.total, icon: "hospital" },
          { label: "Shown on website", value: stats.active, icon: "check" },
          { label: "Countries", value: stats.countries, icon: "globe" },
          { label: "Featured", value: stats.featured, icon: "star" },
        ].map((s) => (
          <div key={s.label} className="hsp-stat">
            <span>
              <Icon name={s.icon} size={20} />
            </span>
            <div>
              <strong>{s.value}</strong>
              <small>{s.label}</small>
            </div>
          </div>
        ))}
      </section>

      {demo && (
        <div className="hsp-banner">
          <Icon name="info" />
          <span>
            <strong>Demo data.</strong> The backend route <code>/api/admin/hospitals</code> is not ready yet, so changes
            here are not saved.
          </span>
        </div>
      )}

      {loadError && (
        <div className="hsp-banner hsp-banner--error" role="alert">
          <Icon name="alert" />
          <span>{loadError}</span>
          <button type="button" onClick={load}>
            Try again
          </button>
        </div>
      )}

      {/* ---------- Toolbar ---------- */}
      <div className="hsp-toolbar">
        <label className="hsp-search">
          <Icon name="search" />
          <input type="search" placeholder="Search hospital, city or specialty" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search hospitals" />
        </label>
        <div className="hsp-chips" role="group" aria-label="Filter by country">
          <button type="button" className={country === "all" ? "is-on" : ""} onClick={() => setCountry("all")}>
            All
          </button>
          {COUNTRIES.map((c) => (
            <button key={c.code} type="button" className={country === c.code ? "is-on" : ""} onClick={() => setCountry(c.code)}>
              {c.name}
            </button>
          ))}
        </div>
        <select className="hsp-select" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status">
          <option value="all">All status</option>
          <option value="active">Shown</option>
          <option value="inactive">Hidden</option>
        </select>
      </div>

      {/* ---------- Grid ---------- */}
      {loading ? (
        <div className="hsp-empty">
          <span className="hsp-spinner" aria-hidden="true" /> Loading hospitals...
        </div>
      ) : shown.length === 0 ? (
        <div className="hsp-empty">
          <Icon name="hospital" size={30} />
          <strong>{list.length ? "No hospital matches your filter" : "No hospitals yet"}</strong>
          {!list.length && (
            <button type="button" className="hsp-btn" onClick={() => setEditing("new")}>
              <Icon name="plus" size={17} /> Add your first hospital
            </button>
          )}
        </div>
      ) : (
        <div className="hsp-grid">
          {shown.map((h) => (
            <article key={h.id} className={`hsp-card ${h.active ? "" : "is-off"}`}>
              <div className="hsp-card-media">
                <Thumb src={h.image} alt={h.name} />
                {h.featured && (
                  <span className="hsp-featured">
                    <Icon name="star" size={13} /> Featured
                  </span>
                )}
                <span className={`hsp-status ${h.active ? "is-on" : ""}`}>
                  <i aria-hidden="true" />
                  {h.active ? "Shown" : "Hidden"}
                </span>
              </div>

              <div className="hsp-card-body">
                <h3>{h.name}</h3>
                <p className="hsp-loc">
                  <Icon name="pin" size={15} /> {h.city ? `${h.city}, ` : ""}
                  {countryName(h.country)}
                </p>

                <div className="hsp-meta">
                  {h.beds ? (
                    <span>
                      <Icon name="bed" size={15} /> {h.beds} beds
                    </span>
                  ) : null}
                  {h.rating ? (
                    <span>
                      <Icon name="star" size={15} /> {Number(h.rating).toFixed(1)}
                    </span>
                  ) : null}
                  {h.accreditations.length ? (
                    <span>
                      <Icon name="award" size={15} /> {h.accreditations.join(", ")}
                    </span>
                  ) : null}
                </div>

                {h.specialties.length > 0 && (
                  <ul className="hsp-tags">
                    {h.specialties.slice(0, 3).map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                    {h.specialties.length > 3 && <li className="is-more">+{h.specialties.length - 3}</li>}
                  </ul>
                )}
              </div>

              <div className="hsp-card-foot">
                <label className="hsp-switch" title={h.active ? "Hide from website" : "Show on website"}>
                  <input type="checkbox" checked={h.active} disabled={busyId === h.id} onChange={() => toggleActive(h)} />
                  <span aria-hidden="true" />
                  <small>{h.active ? "Visible" : "Hidden"}</small>
                </label>
                <div className="hsp-actions">
                  <button type="button" onClick={() => setEditing(h)} aria-label={`Edit ${h.name}`} title="Edit">
                    <Icon name="edit" />
                  </button>
                  <button type="button" className="is-danger" onClick={() => setDeleting(h)} aria-label={`Delete ${h.name}`} title="Delete">
                    <Icon name="trash" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {editing && <HospitalModal hospital={editing === "new" ? null : editing} demo={demo} onClose={() => setEditing(null)} onSaved={onSaved} />}

      {deleting && (
        <Modal title="Delete this hospital?" onClose={() => setDeleting(null)}>
          <div className="hsp-confirm">
            <span>
              <Icon name="trash" size={24} />
            </span>
            <p>
              <strong>{deleting.name}</strong> will be removed from the website. This cannot be undone.
            </p>
            <div className="hsp-modal-foot">
              <button type="button" className="hsp-btn hsp-btn--ghost" onClick={() => setDeleting(null)}>
                Cancel
              </button>
              <button type="button" className="hsp-btn hsp-btn--red" onClick={confirmDelete} disabled={busyId === deleting.id}>
                {busyId === deleting.id ? <span className="hsp-spinner" aria-hidden="true" /> : <Icon name="trash" />}
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      {toast && (
        <div key={toast.id} className={`hsp-toast hsp-toast--${toast.type}`} role="status">
          <Icon name={toast.type === "error" ? "alert" : "check"} />
          {toast.text}
        </div>
      )}
    </div>
  );
};

/* =====================================================
   ADD / EDIT HOSPITAL
   ===================================================== */
const MAX_IMAGE_MB = 2;

const HospitalModal = ({ hospital, demo, onClose, onSaved }) => {
  const isNew = !hospital;
  const fileRef = useRef(null);
  const [form, setForm] = useState({
    name: hospital ? hospital.name : "",
    country: hospital ? hospital.country : "",
    city: hospital ? hospital.city || "" : "",
    address: hospital ? hospital.address || "" : "",
    beds: hospital && hospital.beds ? String(hospital.beds) : "",
    rating: hospital && hospital.rating ? String(hospital.rating) : "",
    description: hospital ? hospital.description || "" : "",
    specialties: hospital ? hospital.specialties : [],
    accreditations: hospital ? hospital.accreditations : [],
    featured: hospital ? hospital.featured : false,
    active: hospital ? hospital.active : true,
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(hospital ? hospital.image : "");
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState("");

  // Notun chobi select korle preview, bondho hole memory free
  useEffect(() => {
    if (!file) return undefined;
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const set = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((er) => ({ ...er, [k]: "" }));
  };

  const toggleIn = (k, value) =>
    setForm((f) => ({ ...f, [k]: f[k].includes(value) ? f[k].filter((x) => x !== value) : f[k].concat(value) }));

  const pickFile = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (!/^image\/(jpe?g|png|webp)$/.test(f.type)) {
      setErrors((er) => ({ ...er, image: "Use a JPG, PNG or WEBP image." }));
      return;
    }
    if (f.size > MAX_IMAGE_MB * 1024 * 1024) {
      setErrors((er) => ({ ...er, image: `Image must be smaller than ${MAX_IMAGE_MB} MB.` }));
      return;
    }
    setErrors((er) => ({ ...er, image: "" }));
    setFile(f);
  };

  const validate = () => {
    const er = {};
    if (form.name.trim().length < 2) er.name = "Enter the hospital name.";
    if (!form.country) er.country = "Choose a country.";
    if (!form.city.trim()) er.city = "Enter the city.";
    if (form.beds && (!/^\d+$/.test(form.beds) || Number(form.beds) > 10000)) er.beds = "Enter a whole number.";
    if (form.rating && !(Number(form.rating) >= 0 && Number(form.rating) <= 5)) er.rating = "Rating is between 0 and 5.";
    if (!form.specialties.length) er.specialties = "Pick at least one specialty.";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (saving || !validate()) return;
    setSaving(true);
    setServerError("");

    const fd = new FormData();
    fd.append("name", form.name.trim());
    fd.append("country", form.country);
    fd.append("city", form.city.trim());
    fd.append("address", form.address.trim());
    fd.append("beds", form.beds);
    fd.append("rating", form.rating);
    fd.append("description", form.description.trim());
    form.specialties.forEach((s) => fd.append("specialties[]", s));
    form.accreditations.forEach((a) => fd.append("accreditations[]", a));
    fd.append("featured", form.featured ? "1" : "0");
    fd.append("active", form.active ? "1" : "0");
    if (file) fd.append("image", file);

    try {
      let saved;
      if (demo) {
        saved = {
          ...(hospital || {}),
          ...form,
          id: hospital ? hospital.id : Date.now(),
          beds: form.beds ? Number(form.beds) : null,
          rating: form.rating ? Number(form.rating) : null,
          image: preview && preview.startsWith("blob:") ? "" : preview, // demo te blob URL rakhi na
        };
      } else {
        const res = isNew ? await hospitalsApi.create(fd) : await hospitalsApi.update(hospital.id, fd);
        saved = (res && (res.hospital || res.data)) || { ...hospital, ...form };
      }
      onSaved(saved, isNew);
    } catch (err) {
      if (err.data && err.data.errors) {
        const er = {};
        Object.keys(err.data.errors).forEach((k) => {
          er[k.split(".")[0]] = err.data.errors[k][0];
        });
        setErrors(er);
      }
      setServerError(err.message);
      setSaving(false);
    }
  };

  return (
    <Modal title={isNew ? "Add hospital" : `Edit ${hospital.name}`} onClose={onClose} wide>
      <form onSubmit={submit} noValidate className="hsp-form">
        {serverError && (
          <div className="hsp-banner hsp-banner--error" role="alert">
            <Icon name="alert" /> <span>{serverError}</span>
          </div>
        )}

        <div className="hsp-form-grid">
          {/* Bam: chobi */}
          <div className={`hsp-upload ${errors.image ? "has-error" : ""}`}>
            <span className="hsp-label">Photo</span>
            <button type="button" className="hsp-drop" onClick={() => fileRef.current && fileRef.current.click()}>
              {preview ? (
                <img src={preview} alt="" />
              ) : (
                <span className="hsp-drop-empty">
                  <Icon name="upload" size={26} />
                  <strong>Upload photo</strong>
                  <small>JPG, PNG or WEBP, up to {MAX_IMAGE_MB} MB</small>
                </span>
              )}
            </button>
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={pickFile} hidden />
            {preview && (
              <button type="button" className="hsp-link" onClick={() => fileRef.current && fileRef.current.click()}>
                Change photo
              </button>
            )}
            {errors.image && <em>{errors.image}</em>}
          </div>

          {/* Dan: tottho */}
          <div className="hsp-fields">
            <Field label="Hospital name" error={errors.name}>
              <input value={form.name} onChange={set("name")} placeholder="e.g. Apollo Hospitals" />
            </Field>
            <div className="hsp-row">
              <Field label="Country" error={errors.country}>
                <select value={form.country} onChange={set("country")}>
                  <option value="">Select country</option>
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="City" error={errors.city}>
                <input value={form.city} onChange={set("city")} placeholder="e.g. Chennai" />
              </Field>
            </div>
            <Field label="Address" optional>
              <input value={form.address} onChange={set("address")} placeholder="Street, area" />
            </Field>
            <div className="hsp-row">
              <Field label="Beds" optional error={errors.beds}>
                <input inputMode="numeric" value={form.beds} onChange={set("beds")} placeholder="e.g. 500" />
              </Field>
              <Field label="Rating (0 to 5)" optional error={errors.rating}>
                <input inputMode="decimal" value={form.rating} onChange={set("rating")} placeholder="e.g. 4.7" />
              </Field>
            </div>
          </div>
        </div>

        <fieldset className={`hsp-pick ${errors.specialties ? "has-error" : ""}`}>
          <legend>Specialties</legend>
          <div>
            {SPECIALTIES.map((s) => (
              <label key={s} className={form.specialties.includes(s) ? "is-on" : ""}>
                <input type="checkbox" checked={form.specialties.includes(s)} onChange={() => {
                  toggleIn("specialties", s);
                  setErrors((er) => ({ ...er, specialties: "" }));
                }} />
                {s}
              </label>
            ))}
          </div>
          {errors.specialties && <em>{errors.specialties}</em>}
        </fieldset>

        <fieldset className="hsp-pick">
          <legend>
            Accreditations <span className="hsp-optional">(optional)</span>
          </legend>
          <div>
            {ACCREDITATIONS.map((a) => (
              <label key={a} className={form.accreditations.includes(a) ? "is-on" : ""}>
                <input type="checkbox" checked={form.accreditations.includes(a)} onChange={() => toggleIn("accreditations", a)} />
                {a}
              </label>
            ))}
          </div>
        </fieldset>

        <Field label="Short description" optional>
          <textarea rows="3" value={form.description} onChange={set("description")} placeholder="What is this hospital known for?" />
        </Field>

        <div className="hsp-toggles">
          <label className="hsp-switch">
            <input type="checkbox" checked={form.active} onChange={set("active")} />
            <span aria-hidden="true" />
            <div>
              <strong>Show on website</strong>
              <small>Hidden hospitals stay saved here.</small>
            </div>
          </label>
          <label className="hsp-switch">
            <input type="checkbox" checked={form.featured} onChange={set("featured")} />
            <span aria-hidden="true" />
            <div>
              <strong>Featured</strong>
              <small>Shown first on the hospitals page.</small>
            </div>
          </label>
        </div>

        <div className="hsp-modal-foot">
          <button type="button" className="hsp-btn hsp-btn--ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="hsp-btn" disabled={saving}>
            {saving ? <span className="hsp-spinner" aria-hidden="true" /> : <Icon name="check" />}
            {isNew ? "Add hospital" : "Save changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

/* =====================================================
   SMALL PARTS
   ===================================================== */
const Field = ({ label, optional, error, children }) => (
  <div className={`hsp-field ${error ? "has-error" : ""}`}>
    <label>
      <span className="hsp-label">
        {label} {optional && <span className="hsp-optional">(optional)</span>}
      </span>
      {children}
    </label>
    {error && <em>{error}</em>}
  </div>
);

const Modal = ({ title, onClose, wide, children }) => {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeRef.current();
    };
    document.addEventListener("keydown", onKey);
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = old;
    };
  }, []);

  return (
    <div className="hsp-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`hsp-modal ${wide ? "is-wide" : ""}`} role="dialog" aria-modal="true" aria-label={title}>
        <div className="hsp-modal-head">
          <h3>{title}</h3>
          <button type="button" onClick={onClose} aria-label="Close">
            <Icon name="close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default HospitalsAdmin;
