import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/Career.css";

/* ---------------------------- CONTACT ----------------------------
   Asol HR email boshao
------------------------------------------------------------------- */
const HR_EMAIL = "career@akashbarimedical.com";

/* ---------------------------- JOBS ----------------------------
   Ei job gulo DEMO. Tomar asol job post diye replace koro.
   Notun job dite shudhu ei list e ekta object add koro.
------------------------------------------------------------------- */
const jobs = [
  {
    id: "mt-coordinator",
    title: "Medical Tourism Coordinator",
    department: "Operations",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    experience: "2-4 years",
    salary: "BDT 35,000 - 50,000",
    posted: "Nov 12, 2026",
    deadline: "Dec 15, 2026",
    urgent: true,
    summary: "Plan and manage the full treatment journey of patients travelling abroad, from first enquiry to safe return.",
    responsibilities: [
      "Collect patient reports and share them with partner hospitals",
      "Prepare treatment plans and cost estimates for patients",
      "Coordinate visa, tickets, hotel and airport pickup with other teams",
      "Stay in touch with patients and families during treatment",
    ],
    requirements: [
      "Bachelor's degree in any subject (health or business is a plus)",
      "2+ years in medical tourism, travel or hospital front desk",
      "Good spoken and written English and Bangla",
      "Calm, caring and well organised",
    ],
  },
  {
    id: "patient-relation",
    title: "Patient Relationship Executive",
    department: "Patient Care",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    experience: "1-3 years",
    salary: "BDT 25,000 - 35,000",
    posted: "Nov 10, 2026",
    deadline: "Dec 10, 2026",
    summary: "Be the friendly first contact for patients, answer their questions and guide them to the right service.",
    responsibilities: [
      "Answer calls, WhatsApp and walk-in patient enquiries",
      "Explain services, packages and next steps clearly",
      "Book doctor appointments and online consultations",
      "Follow up with patients and keep records updated",
    ],
    requirements: [
      "Graduate in any subject",
      "1+ year in customer service or healthcare",
      "Warm communication skills in Bangla and English",
      "Basic computer skills (MS Office, Google Sheets)",
    ],
  },
  {
    id: "visa-officer",
    title: "Medical Visa Processing Officer",
    department: "Visa & Travel",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    experience: "2+ years",
    salary: "BDT 30,000 - 45,000",
    posted: "Nov 8, 2026",
    deadline: "Dec 5, 2026",
    summary: "Prepare and check medical visa files for India, Thailand and Malaysia, making sure every document is correct.",
    responsibilities: [
      "Check patient documents and hospital invitation letters",
      "Fill online visa forms and book embassy appointments",
      "Track applications and update patients",
      "Keep up to date with changing visa rules",
    ],
    requirements: [
      "2+ years of visa processing experience",
      "Strong attention to detail",
      "Knowledge of Indian medical visa process is a must",
      "Good English writing skills",
    ],
  },
  {
    id: "intl-coordinator-chennai",
    title: "International Patient Coordinator",
    department: "Operations",
    location: "Chennai, India",
    type: "Full-time",
    experience: "2-5 years",
    salary: "Negotiable",
    posted: "Nov 6, 2026",
    deadline: "Dec 20, 2026",
    summary: "Support our Bangladeshi patients on the ground in Chennai, at the hospital and during their stay.",
    responsibilities: [
      "Meet patients on arrival and help with hospital registration",
      "Go with patients to appointments, tests and reports",
      "Help with local stay, food, SIM cards and transport",
      "Send daily updates to the Dhaka team",
    ],
    requirements: [
      "Must be able to speak Bangla; Tamil or Hindi is a plus",
      "Experience in a hospital or patient support role",
      "Willing to work flexible hours",
      "Must be living in or ready to move to Chennai",
    ],
  },
  {
    id: "medical-interpreter",
    title: "Medical Interpreter (Bangla - Hindi)",
    department: "Patient Care",
    location: "Kolkata, India",
    type: "Part-time",
    experience: "1+ years",
    salary: "Per visit / hourly",
    posted: "Nov 3, 2026",
    deadline: "Dec 31, 2026",
    summary: "Help patients and doctors understand each other clearly during consultations and treatment.",
    responsibilities: [
      "Interpret between patients and doctors during visits",
      "Explain prescriptions and care instructions simply",
      "Keep all patient information private",
    ],
    requirements: [
      "Fluent in Bangla, Hindi and basic English",
      "Basic knowledge of medical words",
      "Friendly and patient personality",
    ],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Executive",
    department: "Marketing",
    location: "Remote / Hybrid",
    type: "Remote",
    experience: "1-3 years",
    salary: "BDT 25,000 - 40,000",
    posted: "Nov 1, 2026",
    deadline: "Nov 30, 2026",
    summary: "Grow our online presence with helpful content, social media and ads that reach patients who need us.",
    responsibilities: [
      "Plan and post content on Facebook, Instagram and YouTube",
      "Run and track Facebook and Google ad campaigns",
      "Write simple blog posts and patient stories",
      "Report monthly results and ideas to improve",
    ],
    requirements: [
      "1+ year in social media or digital marketing",
      "Basic design skills (Canva or similar)",
      "Good Bangla and English writing",
      "Healthcare marketing experience is a plus",
    ],
  },
  {
    id: "support-night",
    title: "Customer Support Executive (Night Shift)",
    department: "Customer Support",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    experience: "0-2 years",
    salary: "BDT 20,000 - 28,000",
    posted: "Oct 30, 2026",
    deadline: "Dec 1, 2026",
    summary: "Keep our 24/7 helpline running at night and help patients who are already abroad for treatment.",
    responsibilities: [
      "Answer night-time calls and messages from patients",
      "Pass urgent issues to the right team quickly",
      "Log every call in our system",
    ],
    requirements: [
      "HSC or graduate",
      "Freshers are welcome to apply",
      "Comfortable working night shifts",
      "Clear and polite phone voice",
    ],
  },
];

const departments = ["All", ...Array.from(new Set(jobs.map((j) => j.department)))];
const jobTypes = ["All types", "Full-time", "Part-time", "Remote"];

const perks = [
  { icon: "heart", title: "Meaningful work", text: "Every day you help a patient get the care they need." },
  { icon: "shield", title: "Health coverage", text: "Medical support for you and your family." },
  { icon: "trend", title: "Grow your career", text: "Training, mentoring and clear paths to promotion." },
  { icon: "plane", title: "Travel opportunities", text: "Visit partner hospitals in India, Thailand and Malaysia." },
  { icon: "gift", title: "Festival bonus", text: "Two festival bonuses a year and yearly increments." },
  { icon: "users", title: "Friendly team", text: "A caring, supportive team that feels like family." },
];

const process = [
  { icon: "doc", title: "Apply online", text: "Fill in the form and upload your CV." },
  { icon: "search", title: "CV review", text: "Our HR team reviews your application within 5 working days." },
  { icon: "chat", title: "Interview", text: "A friendly talk with HR and your future team lead." },
  { icon: "award", title: "Welcome aboard", text: "Get your offer letter and start your journey with us." },
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
  heart: <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />,
  shield: <><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  trend: <><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></>,
  plane: <path d="M10.5 13.5L3 11l1.5-1.5 8 .5 4-4.5a2 2 0 0 1 3 3L15.5 13l.5 8L14.5 22.5 12 15" />,
  gift: <><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-5-4-5-1.5S12 8 12 8zM12 8c1.5-3 5-4 5-1.5S12 8 12 8z" /></>,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c.6-3.4 3-5 6-5s5.4 1.6 6 5" /><circle cx="17" cy="9" r="2.4" /><path d="M16.5 14.2c2.4.2 4 1.7 4.5 4.3" /></>,
  doc: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></>,
  chat: <><path d="M4 5h16v11H9l-5 4z" /><path d="M8 9.5h8M8 12.5h5" /></>,
  award: <><circle cx="12" cy="9" r="5.5" /><path d="M8.5 13.5L7 21l5-2.5 5 2.5-1.5-7.5" /></>,
  pin: <><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" /></>,
  money: <><rect x="3" y="6" width="18" height="12" rx="2" /><circle cx="12" cy="12" r="2.5" /><path d="M6 9v.01M18 15v.01" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  upload: <><path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /></>,
  file: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4" /></>,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  chevron: <path d="M6 9l6 6 6-6" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
};

const Icon = ({ name, size = 20 }) => (
  <svg {...base} width={size} height={size}>
    {paths[name]}
  </svg>
);

/* ------------------- Scroll e ashle animation ------------------- */
const Reveal = ({ children, className = "", delay = 0, as: Tag = "div" }) => {
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
    <Tag ref={ref} className={`cr-reveal ${shown ? "is-shown" : ""} ${className}`} style={{ "--d": `${delay}s` }}>
      {children}
    </Tag>
  );
};

const SectionHead = ({ eyebrow, title, text }) => (
  <Reveal className="cr-head">
    <span className="cr-eyebrow">{eyebrow}</span>
    <h2>{title}</h2>
    {text && <p>{text}</p>}
  </Reveal>
);

/* ---------------------------- JOB CARD ---------------------------- */
const JobCard = ({ job, open, onToggle, onApply }) => (
  <article className={`cr-job ${open ? "is-open" : ""}`}>
    <div className="cr-job-main">
      <div className="cr-job-icon">
        <Icon name="briefcase" size={24} />
      </div>
      <div className="cr-job-info">
        <div className="cr-job-tags">
          <span className="cr-dept">{job.department}</span>
          <span className={`cr-type cr-type--${job.type.toLowerCase().replace(/[^a-z]/g, "")}`}>{job.type}</span>
          {job.urgent && <span className="cr-urgent">Urgent</span>}
        </div>
        <h3>{job.title}</h3>
        <ul className="cr-job-meta">
          <li>
            <Icon name="pin" size={15} /> {job.location}
          </li>
          <li>
            <Icon name="clock" size={15} /> {job.experience}
          </li>
          <li>
            <Icon name="money" size={15} /> {job.salary}
          </li>
        </ul>
      </div>
      <div className="cr-job-side">
        <small>
          Apply by <b>{job.deadline}</b>
        </small>
        <div className="cr-job-btns">
          <button
            type="button"
            className="cr-btn cr-btn--ghost cr-btn--sm"
            aria-expanded={open}
            aria-controls={`cr-job-${job.id}`}
            onClick={onToggle}
          >
            {open ? "Hide" : "Details"}
            <span className="cr-chev">
              <Icon name="chevron" size={16} />
            </span>
          </button>
          <button type="button" className="cr-btn cr-btn--sm" onClick={onApply}>
            Apply Now
          </button>
        </div>
      </div>
    </div>

    {/* Details (accordion) */}
    <div className="cr-job-body" id={`cr-job-${job.id}`}>
      <div>
        <div className="cr-job-details">
          <p className="cr-job-summary">{job.summary}</p>
          <div className="cr-job-cols">
            <div>
              <h4>What you will do</h4>
              <ul>
                {job.responsibilities.map((r) => (
                  <li key={r}>
                    <Icon name="check" size={15} /> {r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>What we are looking for</h4>
              <ul>
                {job.requirements.map((r) => (
                  <li key={r}>
                    <Icon name="check" size={15} /> {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="cr-job-foot">
            <span>
              <Icon name="calendar" size={15} /> Posted {job.posted}
            </span>
            <button type="button" className="cr-btn" onClick={onApply}>
              Apply for this job <Icon name="arrow" size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  </article>
);

/* ---------------------------- FORM ---------------------------- */
const MAX_MB = 5;
const OK_TYPES = [".pdf", ".doc", ".docx"];

const emptyForm = {
  job: "",
  name: "",
  email: "",
  phone: "",
  location: "",
  experience: "",
  salary: "",
  link: "",
  letter: "",
  agree: false,
};

/* ---------------------------- PAGE ---------------------------- */
const Career = () => {
  const [dept, setDept] = useState("All");
  const [type, setType] = useState("All types");
  const [query, setQuery] = useState("");
  const [openJob, setOpenJob] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [cv, setCv] = useState(null);
  const [cvError, setCvError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [errors, setErrors] = useState({});
  const [sentRef, setSentRef] = useState("");

  const formRef = useRef(null);
  const jobsRef = useRef(null);
  const fileRef = useRef(null);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter(
      (j) =>
        (dept === "All" || j.department === dept) &&
        (type === "All types" || j.type === type) &&
        (!q || `${j.title} ${j.department} ${j.location}`.toLowerCase().includes(q))
    );
  }, [dept, type, query]);

  const setField = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((er) => ({ ...er, [key]: "" }));
  };

  // Job card er "Apply" -> form e job select + scroll
  const applyFor = (id) => {
    setForm((f) => ({ ...f, job: id }));
    setSentRef("");
    setErrors((er) => ({ ...er, job: "" }));
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // CV file check
  const pickFile = (file) => {
    if (!file) return;
    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (!OK_TYPES.includes(ext)) {
      setCv(null);
      setCvError("Please upload a PDF or Word file (.pdf, .doc, .docx).");
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setCv(null);
      setCvError(`File is too large. Maximum size is ${MAX_MB} MB.`);
      return;
    }
    setCv(file);
    setCvError("");
  };

  const validate = () => {
    const er = {};
    if (!form.job) er.job = "Please choose a position.";
    if (!form.name.trim()) er.name = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) er.email = "Please enter a valid email.";
    if (form.phone.replace(/\D/g, "").length < 10) er.phone = "Please enter a valid phone number.";
    if (!form.experience) er.experience = "Please select your experience.";
    if (!form.agree) er.agree = "Please accept to continue.";
    setErrors(er);
    if (!cv) setCvError("Please upload your CV.");
    return Object.keys(er).length === 0 && !!cv;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    /* EKHANE tomar API call boshao. Jemon:
       const data = new FormData();
       Object.entries(form).forEach(([k, v]) => data.append(k, v));
       data.append("cv", cv);
       await fetch("/api/career/apply", { method: "POST", body: data });
       Ekhon shudhu demo. */
    setSentRef(`AKBH-${Date.now().toString().slice(-6)}`);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setCv(null);
    setCvError("");
    setErrors({});
    setSentRef("");
  };

  const selectedJob = jobs.find((j) => j.id === form.job);

  return (
    <main className="cr-page">
      {/* ================= HERO ================= */}
     

    
      {/* ================= OPEN POSITIONS ================= */}
      <section className="cr-section cr-section--soft" ref={jobsRef} id="jobs">
        <div className="cr-container">
          <SectionHead
            eyebrow="Open positions"
            title="Find the right role for you"
            text="Click on a job to see the details, then apply in a few minutes."
          />

          <div className="cr-filters">
            <div className="cr-chips" role="group" aria-label="Filter by department">
              {departments.map((d) => (
                <button
                  key={d}
                  type="button"
                  className={`cr-chip ${dept === d ? "is-active" : ""}`}
                  aria-pressed={dept === d}
                  onClick={() => setDept(d)}
                >
                  {d === "All" ? "All Departments" : d}
                  <span>{d === "All" ? jobs.length : jobs.filter((j) => j.department === d).length}</span>
                </button>
              ))}
            </div>
            <label className="cr-select">
              <span className="cr-sr">Job type</span>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                {jobTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
          </div>

          <p className="cr-count" role="status">
            Showing <b>{list.length}</b> {list.length === 1 ? "job" : "jobs"}
            {query && (
              <>
                {" "}
                for “{query}”{" "}
                <button type="button" onClick={() => setQuery("")}>
                  Clear
                </button>
              </>
            )}
          </p>

          {list.length > 0 ? (
            <div className="cr-jobs">
              {list.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  open={openJob === job.id}
                  onToggle={() => setOpenJob(openJob === job.id ? null : job.id)}
                  onApply={() => applyFor(job.id)}
                />
              ))}
            </div>
          ) : (
            <div className="cr-empty">
              <Icon name="search" size={38} />
              <h3>No jobs match your search</h3>
              <p>Try another keyword or department, or send us your CV for future roles.</p>
              <button
                type="button"
                className="cr-btn cr-btn--ghost"
                onClick={() => {
                  setDept("All");
                  setType("All types");
                  setQuery("");
                }}
              >
                Show all jobs
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ================= HIRING PROCESS ================= */}
      <section className="cr-section">
        <div className="cr-container">
          <SectionHead eyebrow="Hiring process" title="Simple, quick and fair" text="Here's what happens after you apply." />
          <ol className="cr-process">
            {process.map((p, i) => (
              <Reveal as="li" key={p.title} className="cr-step" delay={i * 0.1}>
                <span className="cr-step-icon">
                  <Icon name={p.icon} size={26} />
                  <b>{i + 1}</b>
                </span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= APPLY FORM ================= */}
      <section className="cr-section cr-apply-wrap" ref={formRef} id="apply">
        <div className="cr-container cr-apply">
          <aside className="cr-apply-info">
            <span className="cr-eyebrow cr-eyebrow--light">Apply now</span>
            <h2>Send us your application</h2>
            <p>Fill in your details and upload your CV. Our HR team will contact you if your profile matches.</p>

            <div className="cr-apply-job">
              <small>Applying for</small>
              <strong>{selectedJob ? selectedJob.title : form.job === "general" ? "General Application" : "Choose a position"}</strong>
              {selectedJob && (
                <span>
                  {selectedJob.location} · {selectedJob.type}
                </span>
              )}
            </div>

            <ul className="cr-apply-tips">
              <li>
                <Icon name="check" size={16} /> CV in PDF or Word, up to {MAX_MB} MB
              </li>
              <li>
                <Icon name="check" size={16} /> We reply within 5 working days
              </li>
              <li>
                <Icon name="check" size={16} /> Your information is kept private
              </li>
            </ul>

            <a href={`mailto:${HR_EMAIL}`} className="cr-apply-mail">
              <span>
                <Icon name="mail" size={18} />
              </span>
              <div>
                <small>Or email your CV</small>
                {HR_EMAIL}
              </div>
            </a>
          </aside>

          {sentRef ? (
            <div className="cr-form cr-form--done" role="status">
              <span className="cr-done-icon">
                <Icon name="check" size={34} />
              </span>
              <h3>Application received!</h3>
              <p>
                Thank you, {form.name.split(" ")[0]}. We have received your application
                {selectedJob ? ` for ${selectedJob.title}` : ""}. Our HR team will contact you at <b>{form.email}</b>.
              </p>
              <span className="cr-ref">
                Reference: <b>{sentRef}</b>
              </span>
              <button type="button" className="cr-btn cr-btn--ghost" onClick={resetForm}>
                Submit another application
              </button>
            </div>
          ) : (
            <form className="cr-form" onSubmit={handleSubmit} noValidate>
              <div className="cr-fields">
                <label className={`cr-field cr-field--full ${errors.job ? "has-error" : ""}`}>
                  <span>
                    Position <i>*</i>
                  </span>
                  <select value={form.job} onChange={setField("job")}>
                    <option value="">Select a position</option>
                    {jobs.map((j) => (
                      <option key={j.id} value={j.id}>
                        {j.title} ({j.location})
                      </option>
                    ))}
                    <option value="general">General Application (future roles)</option>
                  </select>
                  {errors.job && <em>{errors.job}</em>}
                </label>

                <label className={`cr-field ${errors.name ? "has-error" : ""}`}>
                  <span>
                    Full name <i>*</i>
                  </span>
                  <input type="text" value={form.name} onChange={setField("name")} placeholder="Your full name" autoComplete="name" />
                  {errors.name && <em>{errors.name}</em>}
                </label>
                <label className={`cr-field ${errors.email ? "has-error" : ""}`}>
                  <span>
                    Email <i>*</i>
                  </span>
                  <input type="email" value={form.email} onChange={setField("email")} placeholder="you@example.com" autoComplete="email" />
                  {errors.email && <em>{errors.email}</em>}
                </label>
                <label className={`cr-field ${errors.phone ? "has-error" : ""}`}>
                  <span>
                    Phone <i>*</i>
                  </span>
                  <input type="tel" value={form.phone} onChange={setField("phone")} placeholder="+880 1XXX-XXXXXX" autoComplete="tel" />
                  {errors.phone && <em>{errors.phone}</em>}
                </label>
                <label className="cr-field">
                  <span>Current location</span>
                  <input type="text" value={form.location} onChange={setField("location")} placeholder="e.g. Dhaka" />
                </label>
                <label className={`cr-field ${errors.experience ? "has-error" : ""}`}>
                  <span>
                    Experience <i>*</i>
                  </span>
                  <select value={form.experience} onChange={setField("experience")}>
                    <option value="">Select experience</option>
                    <option>Fresher</option>
                    <option>Less than 1 year</option>
                    <option>1-2 years</option>
                    <option>3-5 years</option>
                    <option>5+ years</option>
                  </select>
                  {errors.experience && <em>{errors.experience}</em>}
                </label>
                <label className="cr-field">
                  <span>Expected salary (BDT)</span>
                  <input type="text" value={form.salary} onChange={setField("salary")} placeholder="e.g. 35,000" />
                </label>
                <label className="cr-field cr-field--full">
                  <span>LinkedIn / Portfolio link</span>
                  <input type="url" value={form.link} onChange={setField("link")} placeholder="https://" />
                </label>

                {/* CV upload */}
                <div className={`cr-field cr-field--full ${cvError ? "has-error" : ""}`}>
                  <span>
                    Upload CV <i>*</i>
                  </span>
                  {cv ? (
                    <div className="cr-file">
                      <span className="cr-file-icon">
                        <Icon name="file" size={22} />
                      </span>
                      <div>
                        <strong>{cv.name}</strong>
                        <small>{(cv.size / 1024 / 1024).toFixed(2)} MB</small>
                      </div>
                      <button
                        type="button"
                        aria-label="Remove file"
                        onClick={() => {
                          setCv(null);
                          if (fileRef.current) fileRef.current.value = "";
                        }}
                      >
                        <Icon name="x" size={18} />
                      </button>
                    </div>
                  ) : (
                    <label
                      className={`cr-drop ${dragOver ? "is-over" : ""}`}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                      }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragOver(false);
                        pickFile(e.dataTransfer.files[0]);
                      }}
                    >
                      <input
                        ref={fileRef}
                        type="file"
                        accept={OK_TYPES.join(",")}
                        onChange={(e) => pickFile(e.target.files[0])}
                      />
                      <span className="cr-drop-icon">
                        <Icon name="upload" size={24} />
                      </span>
                      <strong>
                        Drag &amp; drop your CV here or <u>browse</u>
                      </strong>
                      <small>PDF, DOC or DOCX · Max {MAX_MB} MB</small>
                    </label>
                  )}
                  {cvError && <em>{cvError}</em>}
                </div>

                <label className="cr-field cr-field--full">
                  <span>Why do you want to join us? (optional)</span>
                  <textarea rows="4" value={form.letter} onChange={setField("letter")} placeholder="A few lines about you and why you are a good fit" />
                </label>
              </div>

              <label className={`cr-check ${errors.agree ? "has-error" : ""}`}>
                <input type="checkbox" checked={form.agree} onChange={setField("agree")} />
                <span className="cr-check-box" aria-hidden="true">
                  <Icon name="check" size={14} />
                </span>
                I confirm the information is correct and agree that Akashbari Medical may store my CV for hiring.
              </label>
              {errors.agree && <em className="cr-check-error">{errors.agree}</em>}

              <button type="submit" className="cr-btn cr-btn--full">
                Submit Application <Icon name="arrow" size={18} />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ================= NO MATCH CTA ================= */}
      <section className="cr-cta-wrap">
        <div className="cr-container">
          <Reveal className="cr-cta">
            <div>
              <h2>Don&apos;t see the right role?</h2>
              <p>We are always looking for caring people. Send us your CV and we will keep it for future openings.</p>
            </div>
            <button type="button" className="cr-btn cr-btn--white" onClick={() => applyFor("general")}>
              Send General Application <Icon name="arrow" size={18} />
            </button>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default Career;
