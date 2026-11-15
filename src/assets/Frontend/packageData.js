/* =====================================================================
   PACKAGE DATA (Package.jsx ar PackageDetails.jsx duijon-i eta use kore)
   ---------------------------------------------------------------------
   - Shob price, duration, test list SAMPLE / DEMO. Hospital theke asol
     quote niye update koro. Price USD te, "starting from" hisebe.
   - Header er link: /packages/health-checkup, /packages/cardiac-care,
     /packages/cancer-treatment  -> slug gula ekhane same rakhte hobe.
   - hospitals: hospitalData.js er hospital (country slug + hospital slug).
   ===================================================================== */

export const HOTLINE = "+880 1XXX-XXXXXX"; // <-- tomar number dao
export const HOTLINE_LINK = "tel:+8801XXXXXXXXX";
export const WHATSAPP_LINK = "https://wa.me/8801XXXXXXXXX";

const u = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const categories = [
    { id: "all", label: "All Packages", icon: "grid" },
    { id: "checkup", label: "Health Check-up", icon: "pulse" },
    { id: "heart", label: "Heart", icon: "heart" },
    { id: "cancer", label: "Cancer", icon: "ribbon" },
    { id: "ortho", label: "Bone & Joint", icon: "bone" },
    { id: "fertility", label: "Fertility", icon: "female" },
    { id: "transplant", label: "Transplant", icon: "kidney" },
];

// Shob package e common
const commonSupport = [
    "Free medical opinion before travel",
    "Hospital appointment booking",
    "Medical visa invitation letter",
    "Airport pickup & drop",
    "Bangla-speaking coordinator",
    "24/7 phone & WhatsApp support",
];

const commonExcluded = [
    "Air tickets (we can book at best fares)",
    "Visa fee",
    "Extra tests or procedures advised by the doctor",
    "Food & personal expenses",
];

const raw = [{
        slug: "health-checkup",
        title: "Executive Health Check-up",
        category: "checkup",
        icon: "pulse",
        color: "#689f38",
        img: u("photo-1579684385127-1ef15d508118"),
        short: "A complete head-to-toe check-up in one day, with specialist review and a full report.",
        about: "Our most popular package. Ideal for adults over 30, busy professionals, and anyone with a family history of heart disease, diabetes or cancer. All tests are done in a single day at a top international hospital, and a senior physician explains your results the same day.",
        days: 3,
        hospitalStay: "Day care",
        rating: 4.9,
        reviews: 640,
        popular: true,
        hospitals: [
            { country: "thailand", slug: "bumrungrad-hospital" },
            { country: "india", slug: "apollo-hospitals" },
            { country: "malaysia", slug: "prince-court-medical-centre" },
        ],
        includes: [
            { group: "Blood tests", items: ["Complete blood count", "Sugar & HbA1c", "Lipid profile", "Liver & kidney function", "Thyroid profile"] },
            { group: "Heart", items: ["ECG", "Echocardiogram", "Treadmill stress test"] },
            { group: "Imaging", items: ["Chest X-ray", "Whole abdomen ultrasound", "Low-dose CT (optional)"] },
            { group: "Consultation", items: ["Physician consultation", "Dietitian advice", "Eye & dental check"] },
        ],
        tiers: [
            { name: "Basic", price: 450, note: "Essential tests", features: ["40+ tests", "Physician review", "Digital report"] },
            { name: "Executive", price: 750, note: "Most chosen", features: ["70+ tests", "Echo & stress test", "Specialist review", "Dietitian session"], best: true },
            { name: "Premium", price: 1200, note: "Full body", features: ["100+ tests", "CT / MRI screening", "Cancer markers", "2 specialist reviews"] },
        ],
        itinerary: [
            { day: "Day 1", title: "Arrival", text: "Airport pickup, hotel check-in, and briefing by our coordinator. Overnight fasting." },
            { day: "Day 2", title: "Check-up day", text: "All tests in the morning, light breakfast, imaging, and doctor review in the afternoon." },
            { day: "Day 3", title: "Report & return", text: "Final report discussion, medicines if needed, and airport drop." },
        ],
    },
    {
        slug: "cardiac-care",
        title: "Cardiac Care Package",
        category: "heart",
        icon: "heart",
        color: "#d1495b",
        img: u("photo-1551190822-a9333d879b1f"),
        short: "Heart evaluation, angiogram, and angioplasty or bypass surgery with expert cardiac teams.",
        about: "From a full heart evaluation to angioplasty (stent) or bypass surgery, this package covers your complete cardiac treatment. Our partner hospitals have experienced heart surgeons, modern cath labs, and dedicated cardiac ICUs.",
        days: 12,
        hospitalStay: "5 – 8 days",
        rating: 4.8,
        reviews: 410,
        popular: true,
        hospitals: [
            { country: "india", slug: "apollo-hospitals" },
            { country: "india", slug: "fortis-healthcare" },
            { country: "thailand", slug: "bangkok-hospital" },
        ],
        includes: [
            { group: "Evaluation", items: ["Cardiologist consultation", "ECG & echocardiogram", "Blood tests", "Coronary angiogram"] },
            { group: "Procedure", items: ["Angioplasty with stent OR bypass surgery", "Surgeon & anaesthesia fees", "Operation theatre / cath lab"] },
            { group: "Hospital stay", items: ["ICU stay as needed", "Private room", "Nursing care", "Standard medicines"] },
            { group: "After care", items: ["Discharge summary", "Follow-up visit", "Cardiac rehab advice"] },
        ],
        tiers: [
            { name: "Angiogram", price: 600, note: "Diagnosis only", features: ["Consultation", "Angiogram", "1 day stay"] },
            { name: "Angioplasty", price: 4500, note: "1 stent", features: ["Angiogram", "1 drug-eluting stent", "2–3 days stay", "Follow-up"], best: true },
            { name: "Bypass (CABG)", price: 7500, note: "Open heart", features: ["Full evaluation", "CABG surgery", "7–10 days stay", "Rehab plan"] },
        ],
        itinerary: [
            { day: "Day 1–2", title: "Arrival & evaluation", text: "Pickup, consultation, ECG, echo and blood tests." },
            { day: "Day 3", title: "Angiogram", text: "Angiogram to find blockages. Doctor explains the treatment plan." },
            { day: "Day 4–10", title: "Treatment & recovery", text: "Angioplasty or bypass surgery, then ICU and room recovery." },
            { day: "Day 11–12", title: "Discharge & return", text: "Fit-to-fly check, discharge summary and airport drop." },
        ],
    },
    {
        slug: "cancer-treatment",
        title: "Cancer Treatment Package",
        category: "cancer",
        icon: "ribbon",
        color: "#7c3a9c",
        img: u("photo-1576091160550-2173dba999ef"),
        short: "Tumour board opinion, PET-CT, surgery, chemotherapy, and radiation at leading cancer centres.",
        about: "Cancer care needs the right plan from the start. This package begins with a tumour board review by a team of oncologists, followed by PET-CT and biopsy if needed. Treatment may include surgery, chemotherapy, radiation or targeted therapy, depending on your case.",
        days: 14,
        hospitalStay: "As per plan",
        rating: 4.8,
        reviews: 290,
        popular: false,
        hospitals: [
            { country: "india", slug: "max-healthcare" },
            { country: "india", slug: "apollo-hospitals" },
            { country: "malaysia", slug: "gleneagles-kuala-lumpur" },
        ],
        includes: [
            { group: "Diagnosis", items: ["Oncologist consultation", "PET-CT scan", "Biopsy & pathology review", "Tumour board opinion"] },
            { group: "Treatment", items: ["Surgery OR chemotherapy cycles", "Radiation therapy (if advised)", "Targeted / immunotherapy options"] },
            { group: "Support", items: ["Nutrition counselling", "Pain & symptom care", "Psychological support"] },
        ],
        tiers: [
            { name: "Diagnosis", price: 1200, note: "Second opinion", features: ["PET-CT", "Biopsy review", "Tumour board"] },
            { name: "Chemotherapy", price: 3500, note: "Per 3 cycles", features: ["3 chemo cycles", "Day care", "Medicines", "Lab monitoring"], best: true },
            { name: "Surgery", price: 6500, note: "Major surgery", features: ["Oncosurgery", "5–8 days stay", "Pathology", "Follow-up"] },
        ],
        itinerary: [
            { day: "Day 1–2", title: "Arrival & consultation", text: "Meet the oncologist and review all reports." },
            { day: "Day 3–5", title: "Tests & tumour board", text: "PET-CT, biopsy if needed, and team decision on the plan." },
            { day: "Day 6–13", title: "Treatment", text: "Surgery, chemotherapy or radiation as advised." },
            { day: "Day 14", title: "Plan & return", text: "Follow-up schedule and home care guidance before you fly." },
        ],
    },
    {
        slug: "knee-replacement",
        title: "Knee Replacement Package",
        category: "ortho",
        icon: "bone",
        color: "#1b6ca8",
        img: u("photo-1530497610245-94d3c16cda28"),
        short: "Total knee replacement with quality implants, robotic options, and physiotherapy.",
        about: "Walk again without pain. This package includes total knee replacement surgery with internationally approved implants, optional robotic-assisted surgery, and daily physiotherapy so you can walk before you fly home.",
        days: 14,
        hospitalStay: "5 – 7 days",
        rating: 4.7,
        reviews: 230,
        popular: false,
        hospitals: [
            { country: "india", slug: "fortis-healthcare" },
            { country: "india", slug: "max-healthcare" },
            { country: "thailand", slug: "bumrungrad-hospital" },
        ],
        includes: [
            { group: "Before surgery", items: ["Orthopaedic consultation", "X-ray & blood tests", "Anaesthesia check"] },
            { group: "Surgery", items: ["Total knee replacement (one knee)", "Standard implant", "Surgeon & OT fees"] },
            { group: "Recovery", items: ["Private room", "Daily physiotherapy", "Walker & knee brace"] },
        ],
        tiers: [
            { name: "One knee", price: 5200, note: "Standard implant", features: ["One knee", "5 days stay", "Physio"], best: true },
            { name: "Both knees", price: 9000, note: "Same session", features: ["Both knees", "7 days stay", "Physio"] },
            { name: "Robotic", price: 7000, note: "Higher precision", features: ["Robotic-assisted", "Premium implant", "Faster recovery"] },
        ],
        itinerary: [
            { day: "Day 1–2", title: "Arrival & tests", text: "Consultation, X-ray, blood tests and fitness check." },
            { day: "Day 3", title: "Surgery", text: "Knee replacement surgery." },
            { day: "Day 4–8", title: "Hospital recovery", text: "Physiotherapy starts the next day; walking with support." },
            { day: "Day 9–14", title: "Rehab & return", text: "Outpatient physio, stitch check, and fit-to-fly." },
        ],
    },
    {
        slug: "ivf-fertility",
        title: "IVF & Fertility Package",
        category: "fertility",
        icon: "female",
        color: "#e07b9a",
        img: u("photo-1584515933487-779824d29309"),
        short: "Fertility tests, IVF / ICSI cycle, and embryo transfer with caring fertility specialists.",
        about: "Start your journey to parenthood with experienced fertility specialists. The package covers fertility evaluation for both partners, one IVF or ICSI cycle, embryo transfer, and counselling throughout.",
        days: 21,
        hospitalStay: "Day care",
        rating: 4.7,
        reviews: 180,
        popular: false,
        hospitals: [
            { country: "malaysia", slug: "prince-court-medical-centre" },
            { country: "india", slug: "max-healthcare" },
        ],
        includes: [
            { group: "Evaluation", items: ["Consultation for couple", "Hormone tests", "Ultrasound scans", "Semen analysis"] },
            { group: "IVF cycle", items: ["Ovarian stimulation", "Egg retrieval", "IVF / ICSI lab", "Embryo transfer"] },
            { group: "Support", items: ["Counselling", "Pregnancy test", "Doctor follow-up"] },
        ],
        tiers: [
            { name: "IUI", price: 900, note: "Simpler option", features: ["Tests", "IUI procedure", "Follow-up"] },
            { name: "IVF / ICSI", price: 3800, note: "1 full cycle", features: ["Stimulation", "Egg retrieval", "ICSI", "Embryo transfer"], best: true },
            { name: "IVF + Freezing", price: 4600, note: "Extra embryos saved", features: ["Full IVF cycle", "Embryo freezing", "1 year storage"] },
        ],
        itinerary: [
            { day: "Day 1–3", title: "Evaluation", text: "Tests for both partners and treatment plan." },
            { day: "Day 4–14", title: "Stimulation", text: "Daily injections and regular scans." },
            { day: "Day 15–16", title: "Egg retrieval & lab", text: "Egg collection and fertilisation in the lab." },
            { day: "Day 17–21", title: "Embryo transfer", text: "Transfer, rest, and return home with care plan." },
        ],
    },
    {
        slug: "kidney-transplant",
        title: "Kidney Transplant Package",
        category: "transplant",
        icon: "kidney",
        color: "#0f8a6c",
        img: u("photo-1516549655169-df83a0774514"),
        short: "Living-donor kidney transplant with donor evaluation, surgery, and close follow-up.",
        about: "A kidney transplant can give you a new life. This package covers evaluation of both the patient and a related living donor, legal committee approval, transplant surgery, and close monitoring until it is safe to travel.",
        days: 35,
        hospitalStay: "2 – 3 weeks",
        rating: 4.8,
        reviews: 120,
        popular: false,
        hospitals: [
            { country: "india", slug: "apollo-hospitals" },
            { country: "india", slug: "max-healthcare" },
        ],
        includes: [
            { group: "Evaluation", items: ["Patient & donor tests", "Tissue matching", "Transplant committee paperwork"] },
            { group: "Surgery", items: ["Donor surgery", "Recipient transplant surgery", "Transplant ICU"] },
            { group: "After care", items: ["Anti-rejection medicines (initial)", "Regular lab monitoring", "Follow-up plan"] },
        ],
        tiers: [
            { name: "Evaluation", price: 1500, note: "Fitness & matching", features: ["Patient & donor tests", "Matching", "Committee file"] },
            { name: "Transplant", price: 14000, note: "Complete", features: ["Evaluation", "Both surgeries", "3 weeks stay", "Initial medicines"], best: true },
            { name: "Transplant Plus", price: 16500, note: "Private suite", features: ["Everything in Transplant", "Private suite", "Extra follow-ups", "Companion meals"] },
        ],
        itinerary: [
            { day: "Week 1", title: "Evaluation", text: "Tests for patient and donor, matching, and documents." },
            { day: "Week 2", title: "Approval", text: "Transplant committee approval and pre-surgery preparation." },
            { day: "Week 3", title: "Surgery", text: "Transplant surgery and ICU monitoring." },
            { day: "Week 4–5", title: "Recovery & return", text: "Regular tests and fit-to-fly before going home." },
        ],
    },
];

// "Starting from" price = shob option er moddhe sobcheye kom, tai list ar details e same dekhabe
export const packages = raw.map((p) => ({...p, price: Math.min(...p.tiers.map((t) => t.price)) }));

export const getPackage = (slug) => packages.find((p) => p.slug === slug);
export const packageLink = (p) => `/packages/${p.slug}`;
export { commonSupport, commonExcluded };

export const usd = (n) => `$${n.toLocaleString("en-US")}`;