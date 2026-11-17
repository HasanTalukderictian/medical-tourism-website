import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/PlanTreatment.css";
import { departments, countries, hospitals, getDoctors, packages, estimate, money } from "./treatmentPlanData";

/* ---------------------------- CONTACT ----------------------------
   Asol number boshao
------------------------------------------------------------------- */
const CONTACT = {
  phone: "+880 1234-567890",
  phoneLink: "tel:+8801234567890",
  whatsapp: "https://wa.me/8801234567890",
};

/* Step gulo (chhobir moto) */
const STEPS = [
  { id: "needs", label: "Your Needs", short: "Needs" },
  { id: "country", label: "Country", short: "Country" },
  { id: "hospital", label: "Hospital", short: "Hospital" },
  { id: "doctor", label: "Doctor & Department", short: "Doctor" },
  { id: "plan", label: "Package / Custom Plan", short: "Plan" },
  { id: "query", label: "Send Query", short: "Query" },
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
  heart: <><path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" /><path d="M7 11.5h2.5l1.5-2.5 2 5 1.5-2.5H17" /></>,
  brain: <><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 3 3h1V4z" /><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-3 3h-1V4z" /></>,
  ribbon: <><path d="M12 3a4 4 0 0 0-4 4c0 3 4 7 4 7s4-4 4-7a4 4 0 0 0-4-4z" /><path d="M10 13l-4 8 3-1 1.5 2.5L13 15M14 13l4 8-3-1-1.5 2.5L11 15" /></>,
  bone: <path d="M7 4.5a2.5 2.5 0 0 0-2.4 3.2A2.5 2.5 0 0 0 5.8 12L12 18.2a2.5 2.5 0 0 0 4.3 1.2 2.5 2.5 0 0 0 3.2-2.4 2.5 2.5 0 0 0-1.2-4.3L12 6.4A2.5 2.5 0 0 0 7 4.5z" />,
  kidney: <><path d="M9 4C5.5 4 4 7 4 11s1.5 8 5 8c2 0 3-1.5 3-3.5 0-1.5-1-2.5-1-4.5s1-3 1-4.5C12 5 11 4 9 4z" /><path d="M15 4c3.5 0 5 3 5 7s-1.5 8-5 8" /><path d="M12 11h3" /></>,
  stomach: <><path d="M9 3v4a3 3 0 0 1-3 3 3 3 0 0 0-3 3v1a7 7 0 0 0 7 7h2a7 7 0 0 0 7-7v-3a4 4 0 0 0-4-4h-1a2 2 0 0 1-2-2V3" /></>,
  baby: <><circle cx="12" cy="8" r="4" /><path d="M10.5 8h.01M13.5 8h.01M10.5 10c.8.6 2.2.6 3 0" /><path d="M6 21c0-3.3 2.7-6 6-6s6 2.7 6 6" /></>,
  eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  ear: <><path d="M6 9a6 6 0 0 1 12 0c0 3-2 4-3 5.5S14 18 12 19.5a3 3 0 0 1-4.5-1.5" /><path d="M9 9a3 3 0 0 1 6 0c0 1.5-1.5 2-1.5 3" /></>,
  pulse: <path d="M3 12h4l2.5-6 4 12 2.5-6H21" />,
  plus: <path d="M12 5v14M5 12h14" />,
  hospital: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M12 7v6M9 10h6M9 21v-4h6v4" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z" /></>,
  doctor: <><circle cx="12" cy="7" r="4" /><path d="M5 21c0-4 3-6.5 7-6.5s7 2.5 7 6.5" /><path d="M9.5 15.5v2.5a2.5 2.5 0 0 0 5 0" /></>,
  box: <><path d="M3 7l9-4 9 4-9 4z" /><path d="M3 7v10l9 4 9-4V7M12 11v10" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  send: <><path d="M21 3L10 14" /><path d="M21 3l-7 18-4-7-7-4 18-7z" /></>,
  plane: <path d="M10.5 13.5L3 11l1.5-1.5 8 .5 4-4.5a2 2 0 0 1 3 3L15.5 13l.5 8L14.5 22.5 12 15" />,
  doc: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
  pin: <><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></>,
  bed: <><path d="M3 18V6M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" /><circle cx="7" cy="11" r="2" /></>,
  upload: <><path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  left: <path d="M19 12H5M11 6l-6 6 6 6" />,
  right: <path d="M5 12h14M13 6l6 6-6 6" />,
  shield: <><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  sparkle: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c.6-3.4 3-5 6-5s5.4 1.6 6 5" /><circle cx="17" cy="9" r="2.4" /><path d="M16.5 14.2c2.4.2 4 1.7 4.5 4.3" /></>,
};

const Icon = ({ name, size = 20 }) => (
  <svg {...base} width={size} height={size}>
    {paths[name]}
  </svg>
);

const Star = ({ size = 13 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path fill="currentColor" d="M12 2.5l2.94 6.1 6.56.9-4.8 4.6 1.2 6.6L12 17.5l-5.9 3.2 1.2-6.6-4.8-4.6 6.56-.9L12 2.5z" />
  </svg>
);

const WhatsAppIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm4.5 12.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 1.9 2.9 4.6 4 1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" />
  </svg>
);

/* Hospital er chhoto chhobi (load na hole icon dekhabe) */
const HospitalPic = ({ src, alt }) => {
  const [failed, setFailed] = useState(!src);
  return (
    <span className={`tp-hospital-pic ${failed ? "is-empty" : ""}`}>
      {failed ? <Icon name="hospital" size={26} /> : <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />}
    </span>
  );
};

const initials = (name) =>
  name
    .replace("Dr. ", "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

/* Ekadhik department er khoroch jog kore (Others er dam nai, tai bad) */
const estimateAll = (depts, rest) => {
  const ranges = depts.map((d) => estimate({ dept: d, ...rest })).filter(Boolean);
  if (!ranges.length) return null;
  return ranges.reduce((sum, r) => [sum[0] + r[0], sum[1] + r[1]], [0, 0]);
};

/* Ekta select kora jay emon card (radio er moto) */
const Choice = ({ selected, onClick, className = "", children, label, role = "radio" }) => (
  <button
    type="button"
    role={role}
    aria-checked={selected}
    aria-label={label}
    className={`tp-choice ${selected ? "is-selected" : ""} ${className}`}
    onClick={onClick}
  >
    <span className="tp-tick" aria-hidden="true">
      <Icon name="check" size={13} />
    </span>
    {children}
  </button>
);

const StepHead = ({ no, title, text }) => (
  <div className="tp-step-head">
    <span className="tp-step-no">Step {no}</span>
    <h2>{title}</h2>
    {text && <p>{text}</p>}
  </div>
);

/* ---------------------------- PAGE ---------------------------- */
const emptyForm = { name: "", phone: "", email: "", age: "", travel: "", contactBy: "WhatsApp", message: "" };

const PlanTreatment = () => {
  const [step, setStep] = useState(0);
  const [deptIds, setDeptIds] = useState([]); // ekta ba ekadhik department
  const [otherText, setOtherText] = useState("");
  const [countryId, setCountryId] = useState("");
  const [hospitalId, setHospitalId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [planType, setPlanType] = useState(""); // "package" | "custom"
  const [pkgId, setPkgId] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [sentRef, setSentRef] = useState("");

  const wizardRef = useRef(null);
  const firstRender = useRef(true);

  // Bachai kora department gula (Others chhara)
  const selectedDepts = departments.filter((d) => deptIds.includes(d.id) && d.id !== "others");
  const realIds = selectedDepts.map((d) => d.id);
  const isOther = deptIds.includes("others");
  const onlyOther = isOther && selectedDepts.length === 0;
  const deptNames = [...selectedDepts.map((d) => d.name), ...(isOther ? [otherText.trim() || "Others"] : [])].join(", ");

  const country = countries.find((c) => c.id === countryId);
  const hospital = hospitals.find((h) => h.id === hospitalId);

  // Hospital e bachai kora SHOB department thakte hobe
  const supportsAll = (h, ids) => ids.every((id) => h.depts.includes(id));

  const hospitalList = useMemo(
    () => hospitals.filter((h) => h.country === countryId && supportsAll(h, realIds)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [countryId, realIds.join(",")]
  );

  // Prottek department er doctor ekshathe
  const doctors = useMemo(
    () => selectedDepts.flatMap((d) => getDoctors(hospital, d)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hospital, realIds.join(",")]
  );
  const doctor = doctors.find((d) => d.id === doctorId);
  const pkg = packages.find((p) => p.id === pkgId);

  const cost = estimateAll(selectedDepts, { country, hospital, pkg: planType === "package" ? pkg : null });

  // Step bodlale wizard er upore scroll
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    wizardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  /* ---------- Select korle porer gula reset ---------- */
  // Click korle add / remove (ekta ba ekadhik)
  const chooseDept = (id) => {
    const nextIds = deptIds.includes(id) ? deptIds.filter((x) => x !== id) : [...deptIds, id];
    setDeptIds(nextIds);
    const nextReal = nextIds.filter((x) => x !== "others");
    const h = hospitals.find((x) => x.id === hospitalId);
    if (h && !supportsAll(h, nextReal)) setHospitalId("");
    setDoctorId("");
    // Shudhu "Others" thakle package hoy na, custom plan
    if (nextIds.length > 0 && nextReal.length === 0) {
      setPlanType("custom");
      setPkgId("");
    }
  };

  const chooseCountry = (id) => {
    if (id !== countryId) {
      setHospitalId("");
      setDoctorId("");
    }
    setCountryId(id);
  };

  const chooseHospital = (id) => {
    if (id !== hospitalId) setDoctorId("");
    setHospitalId(id);
  };

  const canNext = [
    deptIds.length > 0 && (!isOther || otherText.trim().length > 2),
    !!countryId,
    !!hospitalId,
    !!doctorId,
    planType === "custom" || (planType === "package" && !!pkgId),
    true,
  ][step];

  const goTo = (i) => {
    // Shudhu ager step gulote / complete step e jawa jabe
    if (i <= step || i <= maxReached) setStep(i);
  };

  const [maxReached, setMaxReached] = useState(0);
  const next = () => {
    if (!canNext) return;
    const n = Math.min(step + 1, STEPS.length - 1);
    setStep(n);
    setMaxReached((m) => Math.max(m, n));
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  /* ---------- Query form ---------- */
  const setField = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: "" }));
  };

  const handleFiles = (list) => {
    const ok = Array.from(list).filter((f) => f.size <= 10 * 1024 * 1024).slice(0, 5);
    setFiles(ok);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = "Please enter the patient's name.";
    if (form.phone.replace(/\D/g, "").length < 10) er.phone = "Please enter a valid phone number.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Please enter a valid email.";
    setErrors(er);
    if (Object.keys(er).length) return;

    /* EKHANE tomar API call boshao. Pathano data:
       {
         needs: deptNames,  // ekta ba ekadhik department
         country: country.name, hospital: hospital.name,
         doctor: doctor.name, plan: planType === "package" ? pkg.name : "Custom plan",
         estimate: cost, ...form, reports: files
       }
       Ekhon shudhu demo. */
    setSentRef(`TP-${Date.now().toString().slice(-6)}`);
  };

  const restart = () => {
    setStep(0);
    setMaxReached(0);
    setDeptIds([]);
    setOtherText("");
    setCountryId("");
    setHospitalId("");
    setDoctorId("");
    setPlanType("");
    setPkgId("");
    setForm(emptyForm);
    setFiles([]);
    setErrors({});
    setSentRef("");
  };

  /* ---------- Summary (sidebar) ---------- */
  const summary = [
    { step: 0, icon: "sparkle", label: "Treatment", value: deptNames },
    { step: 1, icon: "globe", label: "Country", value: country ? `${country.flag} ${country.name}` : "" },
    { step: 2, icon: "hospital", label: "Hospital", value: hospital ? `${hospital.name}, ${hospital.city}` : "" },
    { step: 3, icon: "doctor", label: "Doctor", value: doctorId === "any" ? "Best available doctor" : doctor?.name },
    { step: 4, icon: "box", label: "Plan", value: planType === "custom" ? "Customised plan" : pkg ? `${pkg.name} package` : "" },
  ];

  return (
    <main className="tp-page">
      {/* ================= HERO ================= */}
      <section className="tp-hero">
        <div className="tp-container">
         
          <span className="tp-badge">
            <Icon name="sparkle" size={16} /> Free treatment planning
          </span>
          <h1>
            Plan your treatment <em>in 5 easy steps</em>
          </h1>
          <p>
            Choose your treatment, country, hospital and doctor. See an estimated cost instantly, then send us a
            query and our medical team will prepare a free, personalised plan for you.
          </p>
          <ul className="tp-hero-points">
            <li>
              <Icon name="check" size={16} /> No fees for planning
            </li>
            <li>
              <Icon name="check" size={16} /> Reply within 24 hours
            </li>
            <li>
              <Icon name="check" size={16} /> {hospitals.length}+ partner hospitals
            </li>
          </ul>
        </div>
      </section>

      {/* ================= WIZARD ================= */}
      <section className="tp-wizard-wrap" ref={wizardRef}>
        <div className="tp-container">
          {/* Stepper */}
          <ol className="tp-stepper" aria-label="Progress">
            {STEPS.map((s, i) => {
              const state = sentRef || i < step ? "done" : i === step ? "current" : i <= maxReached ? "open" : "todo";
              return (
                <li key={s.id} className={`tp-stepper-item is-${state}`}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    disabled={state === "todo" || !!sentRef}
                    aria-current={i === step ? "step" : undefined}
                  >
                    <span className="tp-dot">{state === "done" ? <Icon name="check" size={15} /> : i + 1}</span>
                    <span className="tp-stepper-label">
                      <span className="tp-full">{s.label}</span>
                      <span className="tp-short">{s.short}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="tp-layout">
            {/* ---------- MAIN PANEL ---------- */}
            <div className="tp-panel">
              {sentRef ? (
                /* ===== SUCCESS ===== */
                <div className="tp-done" role="status">
                  <span className="tp-done-icon">
                    <Icon name="check" size={36} />
                  </span>
                  <h2>Your query has been sent!</h2>
                  <p>
                    Thank you, {form.name.split(" ")[0]}. Our medical team will review your plan and contact you on{" "}
                    <b>{form.contactBy}</b> within 24 hours.
                  </p>
                  <span className="tp-ref">
                    Reference: <b>{sentRef}</b>
                  </span>
                  <div className="tp-done-actions">
                    <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="tp-btn tp-btn--wa">
                      <WhatsAppIcon /> Chat on WhatsApp
                    </a>
                    <button type="button" className="tp-btn tp-btn--ghost" onClick={restart}>
                      Plan another treatment
                    </button>
                  </div>
                </div>
              ) : (
                <div className="tp-step" key={step}>
                  {/* ===== STEP 1: NEEDS ===== */}
                  {step === 0 && (
                    <>
                      <StepHead
                        no={1}
                        title="Select your needs"
                        text="Which treatment or department are you looking for? You can select one or more."
                      />
                      <div className="tp-grid tp-grid--depts" role="group" aria-label="Treatment">
                        {departments.map((d) => (
                          <Choice
                            key={d.id}
                            role="checkbox"
                            selected={deptIds.includes(d.id)}
                            onClick={() => chooseDept(d.id)}
                            className="tp-dept"
                            label={d.name}
                          >
                            <span className="tp-dept-icon">
                              <Icon name={d.icon} size={26} />
                            </span>
                            <strong>{d.name}</strong>
                            <small>{d.sub}</small>
                          </Choice>
                        ))}
                      </div>

                      {selectedDepts.length > 0 && (
                        <div className="tp-hint">
                          <Icon name="sparkle" size={18} />
                          <span>
                            {selectedDepts.length === 1 ? (
                              <>
                                Common treatments: <b>{selectedDepts[0].examples.join(", ")}</b>. Starting from about{" "}
                                <b>{money(selectedDepts[0].cost[0])}</b> in India.
                              </>
                            ) : (
                              <>
                                <b>{selectedDepts.length} treatments selected:</b> {selectedDepts.map((d) => d.name).join(", ")}.
                                Combined cost starts from about <b>{money(estimateAll(selectedDepts, {})[0])}</b> in India.
                              </>
                            )}
                          </span>
                        </div>
                      )}

                      {isOther && (
                        <label className="tp-field tp-other">
                          <span>Tell us what treatment you need</span>
                          <input
                            type="text"
                            value={otherText}
                            onChange={(e) => setOtherText(e.target.value)}
                            placeholder="e.g. Thyroid surgery, Skin treatment, Dental implant"
                            autoFocus
                          />
                        </label>
                      )}
                    </>
                  )}

                  {/* ===== STEP 2: COUNTRY ===== */}
                  {step === 1 && (
                    <>
                      <StepHead no={2} title="Choose a country" text="Where would you like to get treated?" />
                      <div className="tp-grid tp-grid--2" role="radiogroup" aria-label="Country">
                        {countries.map((c) => {
                          const count = hospitals.filter((h) => h.country === c.id && supportsAll(h, realIds)).length;
                          const range = estimateAll(selectedDepts, { country: c });
                          return (
                            <Choice key={c.id} selected={countryId === c.id} onClick={() => chooseCountry(c.id)} className="tp-country" label={c.name}>
                              <span className="tp-flag" aria-hidden="true">
                                {c.flag}
                              </span>
                              <div className="tp-country-body">
                                <strong>{c.name}</strong>
                                <small>{c.note}</small>
                                <ul>
                                  <li>
                                    <Icon name="hospital" size={14} /> {count} {count === 1 ? "hospital" : "hospitals"}
                                  </li>
                                  <li>
                                    <Icon name="plane" size={14} /> {c.flight}
                                  </li>
                                  <li>
                                    <Icon name="doc" size={14} /> Visa {c.visa}
                                  </li>
                                </ul>
                                {range && (
                                  <span className="tp-from">
                                    From <b>{money(range[0])}</b>
                                  </span>
                                )}
                              </div>
                            </Choice>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {/* ===== STEP 3: HOSPITAL ===== */}
                  {step === 2 && (
                    <>
                      <StepHead
                        no={3}
                        title="Choose a hospital"
                        text={`Hospitals in ${country?.name} for ${onlyOther ? "your treatment" : deptNames}.`}
                      />
                      {hospitalList.length > 0 ? (
                        <div className="tp-grid tp-grid--2" role="radiogroup" aria-label="Hospital">
                          {hospitalList.map((h) => {
                            const range = estimateAll(selectedDepts, { country, hospital: h });
                            return (
                              <Choice key={h.id} selected={hospitalId === h.id} onClick={() => chooseHospital(h.id)} className="tp-hospital" label={h.name}>
                                <HospitalPic src={h.image} alt={h.name} />
                                <div className="tp-hospital-body">
                                  <strong>{h.name}</strong>
                                  <small>
                                    <Icon name="pin" size={13} /> {h.city}, {country?.name}
                                  </small>
                                  <div className="tp-hospital-meta">
                                    <span className="tp-rating">
                                      <Star /> {h.rating}
                                    </span>
                                    <span>
                                      <Icon name="bed" size={14} /> {h.beds} beds
                                    </span>
                                  </div>
                                  {range && (
                                    <span className="tp-from">
                                      Est. <b>{money(range[0])}</b> – <b>{money(range[1])}</b>
                                    </span>
                                  )}
                                </div>
                              </Choice>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="tp-empty">
                          <Icon name="hospital" size={34} />
                          <p>
                            No partner hospital for {deptNames} in {country?.name} yet.
                          </p>
                          <button type="button" className="tp-btn tp-btn--ghost" onClick={() => setStep(1)}>
                            <Icon name="left" size={16} /> Choose another country
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  {/* ===== STEP 4: DOCTOR ===== */}
                  {step === 3 && (
                    <>
                      <StepHead
                        no={4}
                        title="Doctor & department"
                        text={`${onlyOther ? "Your treatment" : deptNames} at ${hospital?.name}. Pick a doctor or let us choose the best one for you.`}
                      />
                      <div className="tp-grid tp-grid--2" role="radiogroup" aria-label="Doctor">
                        {doctors.map((d) => (
                          <Choice key={d.id} selected={doctorId === d.id} onClick={() => setDoctorId(d.id)} className="tp-doctor" label={d.name}>
                            <span className="tp-avatar" aria-hidden="true">
                              {initials(d.name)}
                            </span>
                            <div className="tp-doctor-body">
                              <strong>{d.name}</strong>
                              <small>{d.title}</small>
                              <div className="tp-doctor-meta">
                                <span>{d.experience}+ yrs experience</span>
                                <span>{d.languages.join(", ")}</span>
                              </div>
                              <span className="tp-from">
                                Consultation <b>{money(d.fee)}</b>
                              </span>
                            </div>
                          </Choice>
                        ))}
                        <Choice selected={doctorId === "any"} onClick={() => setDoctorId("any")} className="tp-doctor tp-doctor--any" label="No preference">
                          <span className="tp-avatar tp-avatar--any" aria-hidden="true">
                            <Icon name="users" size={24} />
                          </span>
                          <div className="tp-doctor-body">
                            <strong>No preference</strong>
                            <small>Our medical team will choose the best specialist for your case.</small>
                            <span className="tp-from">Recommended for first-time patients</span>
                          </div>
                        </Choice>
                      </div>
                    </>
                  )}

                  {/* ===== STEP 5: PLAN ===== */}
                  {step === 4 && (
                    <>
                      <StepHead no={5} title="Choose how to continue" text="Pick a ready package, or talk to us for a plan made just for you." />

                      <div className="tp-options" role="radiogroup" aria-label="Plan type">
                        <Choice
                          selected={planType === "package"}
                          onClick={() => !onlyOther && setPlanType("package")}
                          className={`tp-option ${onlyOther ? "is-disabled" : ""}`}
                          label="Select your package"
                        >
                          <span className="tp-option-no">1</span>
                          <span className="tp-option-icon">
                            <Icon name="box" size={26} />
                          </span>
                          <strong>Select your package</strong>
                          <small>{onlyOther ? "Not available for custom treatments" : "Fixed price packages with travel and stay"}</small>
                        </Choice>
                        <Choice
                          selected={planType === "custom"}
                          onClick={() => {
                            setPlanType("custom");
                            setPkgId("");
                          }}
                          className="tp-option tp-option--alt"
                          label="Call for your customised plan"
                        >
                          <span className="tp-option-no">2</span>
                          <span className="tp-option-icon">
                            <Icon name="phone" size={26} />
                          </span>
                          <strong>Call for your customised plan</strong>
                          <small>Talk to our expert for a plan built around your case</small>
                        </Choice>
                      </div>

                      {planType === "package" && (
                        <div className="tp-packages" role="radiogroup" aria-label="Package">
                          {packages.map((p) => {
                            const range = estimateAll(selectedDepts, { country, hospital, pkg: p });
                            return (
                              <Choice
                                key={p.id}
                                selected={pkgId === p.id}
                                onClick={() => setPkgId(p.id)}
                                className={`tp-pkg ${p.popular ? "is-popular" : ""}`}
                                label={`${p.name} package`}
                              >
                                <span className="tp-pkg-tag">{p.tag}</span>
                                <strong>{p.name}</strong>
                                {range && (
                                  <span className="tp-pkg-price">
                                    {money(range[0])}
                                    <small> – {money(range[1])}</small>
                                  </span>
                                )}
                                <ul>
                                  {p.items.map((it) => (
                                    <li key={it}>
                                      <Icon name="check" size={14} /> {it}
                                    </li>
                                  ))}
                                </ul>
                              </Choice>
                            );
                          })}
                        </div>
                      )}

                      {planType === "custom" && (
                        <div className="tp-call">
                          <div>
                            <strong>Talk to a treatment expert</strong>
                            <span>Free call, Saturday to Thursday, 9 AM to 9 PM. Or continue to send your query.</span>
                          </div>
                          <div className="tp-call-actions">
                            <a href={CONTACT.phoneLink} className="tp-btn">
                              <Icon name="phone" size={17} /> {CONTACT.phone}
                            </a>
                            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="tp-btn tp-btn--wa">
                              <WhatsAppIcon /> WhatsApp
                            </a>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* ===== STEP 6: QUERY FORM ===== */}
                  {step === 5 && (
                    <>
                      <StepHead no={6} title="Send your query" text="Share the patient's details. We will send a free treatment plan and final cost." />
                      <form className="tp-form" onSubmit={handleSubmit} noValidate>
                        <div className="tp-fields">
                          <label className={`tp-field ${errors.name ? "has-error" : ""}`}>
                            <span>
                              Patient name <i>*</i>
                            </span>
                            <input type="text" value={form.name} onChange={setField("name")} placeholder="Full name" autoComplete="name" />
                            {errors.name && <em>{errors.name}</em>}
                          </label>
                          <label className={`tp-field ${errors.phone ? "has-error" : ""}`}>
                            <span>
                              Phone / WhatsApp <i>*</i>
                            </span>
                            <input type="tel" value={form.phone} onChange={setField("phone")} placeholder="+880 1XXX-XXXXXX" autoComplete="tel" />
                            {errors.phone && <em>{errors.phone}</em>}
                          </label>
                          <label className={`tp-field ${errors.email ? "has-error" : ""}`}>
                            <span>Email</span>
                            <input type="email" value={form.email} onChange={setField("email")} placeholder="you@example.com" autoComplete="email" />
                            {errors.email && <em>{errors.email}</em>}
                          </label>
                          <label className="tp-field">
                            <span>Patient age</span>
                            <input type="number" min="0" max="120" value={form.age} onChange={setField("age")} placeholder="e.g. 45" />
                          </label>
                          <label className="tp-field">
                            <span>When do you plan to travel?</span>
                            <select value={form.travel} onChange={setField("travel")}>
                              <option value="">Not sure yet</option>
                              <option>As soon as possible</option>
                              <option>Within 2 weeks</option>
                              <option>Within 1 month</option>
                              <option>In 2-3 months</option>
                            </select>
                          </label>
                          <div className="tp-field">
                            <span>Contact me by</span>
                            <div className="tp-radios" role="radiogroup" aria-label="Contact me by">
                              {["WhatsApp", "Phone", "Email"].map((m) => (
                                <button
                                  key={m}
                                  type="button"
                                  role="radio"
                                  aria-checked={form.contactBy === m}
                                  className={form.contactBy === m ? "is-on" : ""}
                                  onClick={() => setForm((f) => ({ ...f, contactBy: m }))}
                                >
                                  {m}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="tp-field tp-field--full">
                            <span>Medical reports (optional)</span>
                            <label className="tp-upload">
                              <input
                                type="file"
                                multiple
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                onChange={(e) => handleFiles(e.target.files)}
                              />
                              <span className="tp-upload-icon">
                                <Icon name="upload" size={22} />
                              </span>
                              <span>
                                {files.length ? (
                                  <b>
                                    {files.length} {files.length === 1 ? "file" : "files"} selected
                                  </b>
                                ) : (
                                  <>
                                    <b>Upload reports</b> (PDF, JPG, PNG · up to 5 files, 10 MB each)
                                  </>
                                )}
                              </span>
                            </label>
                            {files.length > 0 && (
                              <ul className="tp-files">
                                {files.map((f) => (
                                  <li key={f.name}>
                                    <Icon name="doc" size={14} /> {f.name}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <label className="tp-field tp-field--full">
                            <span>Tell us about the patient's condition</span>
                            <textarea
                              rows="4"
                              value={form.message}
                              onChange={setField("message")}
                              placeholder="Diagnosis, current treatment, and any questions you have"
                            />
                          </label>
                        </div>
                        <button type="submit" className="tp-btn tp-btn--full">
                          <Icon name="send" size={18} /> Send Query &amp; Get Free Plan
                        </button>
                        <p className="tp-form-note">
                          <Icon name="shield" size={15} /> Your medical information is kept private and shared only with your chosen hospital.
                        </p>
                      </form>
                    </>
                  )}

                  {/* Nav buttons */}
                  <div className="tp-nav">
                    {step > 0 ? (
                      <button type="button" className="tp-btn tp-btn--ghost" onClick={back}>
                        <Icon name="left" size={17} /> Back
                      </button>
                    ) : (
                      <span />
                    )}
                    {step < STEPS.length - 1 && (
                      <button type="button" className="tp-btn" onClick={next} disabled={!canNext}>
                        {step === 4 ? "Continue to query" : "Next"} <Icon name="right" size={17} />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ---------- SUMMARY SIDEBAR ---------- */}
            <aside className="tp-summary" aria-label="Your treatment plan">
              <div className="tp-summary-card">
                <h3>
                  <Icon name="doc" size={19} /> Your plan
                </h3>
                <ul className="tp-summary-list">
                  {summary.map((s) => (
                    <li key={s.label} className={s.value ? "is-set" : ""}>
                      <span className="tp-sum-icon">
                        <Icon name={s.icon} size={16} />
                      </span>
                      <div>
                        <small>{s.label}</small>
                        <strong>{s.value || "Not selected"}</strong>
                      </div>
                      {s.value && !sentRef && s.step !== step && (
                        <button type="button" onClick={() => setStep(s.step)}>
                          Change
                        </button>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="tp-estimate">
                  <small>Estimated cost</small>
                  {cost ? (
                    <>
                      <strong>
                        {money(cost[0])} – {money(cost[1])}
                      </strong>
                      <span>{planType === "package" && pkg ? `${pkg.name} package` : "Treatment only"} · USD</span>
                    </>
                  ) : (
                    <strong className="tp-estimate-na">{onlyOther ? "We will send a custom quote" : "Select a treatment"}</strong>
                  )}
                </div>
                <p className="tp-summary-note">Estimates are for guidance only. The hospital confirms the final cost after reviewing reports.</p>
              </div>

              <a href={CONTACT.phoneLink} className="tp-help">
                <span>
                  <Icon name="phone" size={18} />
                </span>
                <div>
                  <small>Need help choosing?</small>
                  {CONTACT.phone}
                </div>
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* ================= TRUST ================= */}
      <section className="tp-trust">
        <div className="tp-container tp-trust-grid">
          {[
            { icon: "shield", title: "Trusted hospitals", text: "Only verified partner hospitals" },
            { icon: "clock", title: "Fast reply", text: "Free plan within 24 hours" },
            { icon: "users", title: "Personal support", text: "One coordinator from start to end" },
            { icon: "plane", title: "Travel handled", text: "Visa, tickets, hotel & pickup" },
          ].map((t) => (
            <div key={t.title} className="tp-trust-item">
              <span>
                <Icon name={t.icon} size={22} />
              </span>
              <div>
                <strong>{t.title}</strong>
                <small>{t.text}</small>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default PlanTreatment;
