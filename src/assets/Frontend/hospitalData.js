/* =====================================================================
   HOSPITAL DATA (Hospital.jsx ar HospitalDetails.jsx duijon-i eta use kore)
   ---------------------------------------------------------------------
   - Shob text / number SAMPLE. Publish korar age hospital er official
     info (beds, founded, accreditation) check kore update koro.
   - Notun hospital add korte shudhu `hospitals` array te ekta object dao.
   - Image: online (Unsplash) link. Chaile local image import kore dao.
   ===================================================================== */

// Header.jsx er slugify er SAME hote hobe, na hole link milbe na
export const slugify = (text) =>
    text.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const HOTLINE = "+880 1XXX-XXXXXX"; // <-- tomar number dao
export const HOTLINE_LINK = "tel:+8801XXXXXXXXX";
export const WHATSAPP_LINK = "https://wa.me/8801XXXXXXXXX";

const u = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const IMG = {
    building1: u("photo-1586773860418-d37222d8fce3"),
    building2: u("photo-1587351021759-3e566b6af7cc"),
    building3: u("photo-1519494026892-80bbd2d6fd0d"),
    room: u("photo-1538108149393-fbbd81895907"),
    ot: u("photo-1551190822-a9333d879b1f"),
    doctors: u("photo-1579684385127-1ef15d508118"),
    lab: u("photo-1576091160550-2173dba999ef"),
    icu: u("photo-1516549655169-df83a0774514"),
    reception: u("photo-1504439468489-c8920d796a29"),
    nurse: u("photo-1584515933487-779824d29309"),
    scan: u("photo-1530497610245-94d3c16cda28"),
    team: u("photo-1631217868264-e5b90bb7e133"),
};

const galleryPool = [IMG.room, IMG.ot, IMG.icu, IMG.lab, IMG.reception, IMG.scan, IMG.doctors, IMG.nurse, IMG.team];
const covers = [IMG.building1, IMG.building2, IMG.building3];

/* ---------------------------- COUNTRIES ---------------------------- */
export const countries = [{
        name: "India",
        flag: "🇮🇳",
        tagline: "World-class care at an affordable cost, just a short flight from Dhaka.",
        points: ["Short flight from Bangladesh", "Many Bangla-speaking staff", "Very affordable treatment"],
    },
    {
        name: "Thailand",
        flag: "🇹🇭",
        tagline: "Hotel-style hospitals with international standards and fast service.",
        points: ["Premium patient experience", "Short waiting times", "Interpreters available"],
    },
    {
        name: "Malaysia",
        flag: "🇲🇾",
        tagline: "Modern hospitals, Muslim-friendly environment, and strong quality control.",
        points: ["Muslim-friendly care", "Government-regulated prices", "Easy visa process"],
    },
    {
        name: "China",
        flag: "🇨🇳",
        tagline: "Advanced technology and research-led treatment in leading city hospitals.",
        points: ["Advanced technology", "Research-led treatment", "International wings"],
    },
].map((c) => ({...c, slug: slugify(c.name) }));

/* ---------------------------- COMMON ---------------------------- */
// Shob hospital e common thakle ekhane, alada hole hospital object e override koro
const commonFacilities = [
    "24/7 emergency & trauma care",
    "Modern ICU, CCU & NICU",
    "Advanced imaging (MRI, CT, PET-CT)",
    "Modular operation theatres",
    "In-house pharmacy & laboratory",
    "Private & deluxe patient rooms",
    "Halal food on request",
    "Free Wi-Fi for patients & family",
];

// Tomader company je support dey (Header er service page er link)
export const ourSupport = [
    { icon: "doc", title: "Medical Visa", text: "Invitation letter and full visa file.", to: "/services/medical-visa-assistance" },
    { icon: "plane", title: "Air Ticket", text: "Best fares for patient and family.", to: "/services/air-ticket" },
    { icon: "home", title: "Accommodation", text: "Safe stay near the hospital.", to: "/services/medical-accommodation" },
    { icon: "car", title: "Transport", text: "Airport pickup and daily rides.", to: "/services/transport" },
    { icon: "chat", title: "Interpreter", text: "Bangla-speaking support on site.", to: "/services/patient-support-service" },
    { icon: "stetho", title: "Doctor Appointment", text: "We book the right specialist.", to: "/services/doctor-appointment" },
];

/* ---------------------------- HOSPITALS ---------------------------- */
const raw = [{
        name: "Apollo Hospitals",
        country: "India",
        city: "Chennai",
        founded: 1983,
        beds: 1000,
        rating: 4.8,
        reviews: 1240,
        accreditations: ["JCI", "NABH"],
        specialties: ["Cardiology", "Oncology", "Organ Transplant", "Neurology", "Orthopedics", "Nephrology"],
        short: "One of Asia's largest private hospital groups, known for heart surgery and organ transplants.",
        about: [
            "Apollo Hospitals is one of the most trusted names in Indian healthcare. The group runs a large network of hospitals, and its Chennai flagship receives patients from many countries every year.",
            "The hospital is well known for cardiac surgery, cancer care, and liver and kidney transplants, with experienced specialists and modern technology under one roof.",
        ],
        highlights: ["Robotic surgery", "Proton therapy", "Liver & kidney transplant", "International patient lounge"],
        treatments: [
            { name: "Heart bypass (CABG)", stay: "7 – 10 days" },
            { name: "Knee replacement", stay: "5 – 7 days" },
            { name: "Kidney transplant", stay: "3 – 4 weeks" },
            { name: "Cancer chemotherapy", stay: "Day care / per cycle" },
            { name: "Full body health check-up", stay: "1 day" },
        ],
    },
    {
        name: "Fortis Healthcare",
        country: "India",
        city: "Gurugram",
        founded: 1996,
        beds: 1000,
        rating: 4.7,
        reviews: 980,
        accreditations: ["JCI", "NABH"],
        specialties: ["Cardiology", "Neurology", "Orthopedics", "Oncology", "Gastroenterology", "Urology"],
        short: "A leading multi-specialty hospital chain with advanced neuro and heart care.",
        about: [
            "Fortis Healthcare runs a large network of hospitals across India. Its flagship hospital in Gurugram near Delhi is a popular choice for international patients.",
            "The hospital offers advanced neurosciences, heart care, joint replacement and cancer treatment, supported by a dedicated international patient team.",
        ],
        highlights: ["Advanced neuro surgery", "Robotic joint replacement", "Bone marrow transplant", "Dedicated international desk"],
        treatments: [
            { name: "Brain tumour surgery", stay: "7 – 12 days" },
            { name: "Hip replacement", stay: "5 – 7 days" },
            { name: "Angioplasty", stay: "2 – 3 days" },
            { name: "Spine surgery", stay: "5 – 8 days" },
            { name: "Bone marrow transplant", stay: "4 – 6 weeks" },
        ],
    },
    {
        name: "Max Healthcare",
        country: "India",
        city: "New Delhi",
        founded: 2000,
        beds: 500,
        rating: 4.7,
        reviews: 860,
        accreditations: ["NABH", "NABL"],
        specialties: ["Oncology", "Cardiology", "Organ Transplant", "Orthopedics", "Neurology", "IVF & Fertility"],
        short: "Top Delhi hospital known for cancer care, liver transplant, and cardiac sciences.",
        about: [
            "Max Healthcare is one of India's leading hospital groups, with its Saket hospital in New Delhi serving thousands of international patients.",
            "It is especially known for cancer treatment, liver transplant and cardiac care, with modern operation theatres and a strong team of specialists.",
        ],
        highlights: ["Comprehensive cancer centre", "Liver transplant unit", "Cyberknife radiosurgery", "IVF centre"],
        treatments: [
            { name: "Liver transplant", stay: "3 – 4 weeks" },
            { name: "Radiation therapy", stay: "Per session" },
            { name: "Heart valve replacement", stay: "8 – 10 days" },
            { name: "IVF cycle", stay: "2 – 3 weeks" },
            { name: "Knee replacement", stay: "5 – 7 days" },
        ],
    },
    {
        name: "Bumrungrad Hospital",
        country: "Thailand",
        city: "Bangkok",
        founded: 1980,
        beds: 580,
        rating: 4.9,
        reviews: 1530,
        accreditations: ["JCI"],
        specialties: ["Cardiology", "Orthopedics", "Oncology", "Neurology", "Gastroenterology", "Health Check-up"],
        short: "A world-famous international hospital in Bangkok with hotel-like comfort.",
        about: [
            "Bumrungrad International Hospital in Bangkok is one of the best-known hospitals for medical travellers in the world, serving patients from many countries every year.",
            "It offers a premium, hotel-like experience with fast appointments, interpreters, and a wide range of specialist centres in one place.",
        ],
        highlights: ["Hotel-style rooms", "Fast appointments", "Interpreters in many languages", "Large check-up centre"],
        treatments: [
            { name: "Executive health check-up", stay: "1 day" },
            { name: "Heart bypass (CABG)", stay: "7 – 10 days" },
            { name: "Spine surgery", stay: "5 – 7 days" },
            { name: "Colonoscopy & endoscopy", stay: "Day care" },
            { name: "Cancer treatment", stay: "Per plan" },
        ],
    },
    {
        name: "Bangkok Hospital",
        country: "Thailand",
        city: "Bangkok",
        founded: 1972,
        beds: 450,
        rating: 4.8,
        reviews: 1100,
        accreditations: ["JCI"],
        specialties: ["Cardiology", "Neurology", "Oncology", "Orthopedics", "Emergency & Trauma", "Health Check-up"],
        short: "Flagship of Thailand's largest hospital network, with dedicated heart and brain centres.",
        about: [
            "Bangkok Hospital is the flagship of one of Southeast Asia's largest private hospital networks, with specialised heart, brain, cancer and orthopaedic centres.",
            "The hospital also runs its own air and road ambulance network, making it a strong choice for complex and emergency cases.",
        ],
        highlights: ["Dedicated heart hospital", "Stroke & brain centre", "Air ambulance network", "International coordination team"],
        treatments: [
            { name: "Angioplasty", stay: "2 – 3 days" },
            { name: "Stroke treatment", stay: "Per case" },
            { name: "Knee replacement", stay: "5 – 7 days" },
            { name: "Cancer surgery", stay: "Per plan" },
            { name: "Health check-up", stay: "1 day" },
        ],
    },
    {
        name: "Prince Court Medical Centre",
        country: "Malaysia",
        city: "Kuala Lumpur",
        founded: 2008,
        beds: 280,
        rating: 4.8,
        reviews: 720,
        accreditations: ["MSQH", "JCI"],
        specialties: ["Cardiology", "Orthopedics", "IVF & Fertility", "Oncology", "Pediatrics", "Health Check-up"],
        short: "A premium, award-winning hospital in the heart of Kuala Lumpur.",
        about: [
            "Prince Court Medical Centre is a modern private hospital in Kuala Lumpur, known for its premium patient experience and high quality standards.",
            "The hospital offers heart care, orthopaedics, fertility treatment and children's care in a calm, Muslim-friendly environment.",
        ],
        highlights: ["Premium patient suites", "Fertility centre", "Muslim-friendly care", "City-centre location"],
        treatments: [
            { name: "IVF cycle", stay: "2 – 3 weeks" },
            { name: "Heart check & angiogram", stay: "1 – 2 days" },
            { name: "Shoulder & knee arthroscopy", stay: "2 – 3 days" },
            { name: "Child surgery", stay: "Per case" },
            { name: "Health check-up", stay: "1 day" },
        ],
    },
    {
        name: "Gleneagles Kuala Lumpur",
        country: "Malaysia",
        city: "Kuala Lumpur",
        founded: 1996,
        beds: 380,
        rating: 4.7,
        reviews: 650,
        accreditations: ["MSQH", "JCI"],
        specialties: ["Cardiology", "Oncology", "Neurology", "Orthopedics", "Gastroenterology", "Urology"],
        short: "Part of a leading Asian hospital group, with strong cardiac and cancer services.",
        about: [
            "Gleneagles Kuala Lumpur is a well-established private hospital and part of a major Asian healthcare group.",
            "It offers a broad range of specialties including heart, cancer, brain and digestive care, with an international patient centre to help foreign patients.",
        ],
        highlights: ["Cardiac centre", "Cancer centre", "International patient centre", "Easy access from KLIA"],
        treatments: [
            { name: "Heart bypass (CABG)", stay: "7 – 10 days" },
            { name: "Cancer chemotherapy", stay: "Per cycle" },
            { name: "Gallbladder surgery", stay: "2 – 3 days" },
            { name: "Prostate treatment", stay: "3 – 5 days" },
            { name: "Health check-up", stay: "1 day" },
        ],
    },
    {
        name: "Beijing United Family Hospital",
        country: "China",
        city: "Beijing",
        founded: 1997,
        beds: 150,
        rating: 4.6,
        reviews: 410,
        accreditations: ["JCI"],
        specialties: ["Pediatrics", "Obstetrics & Gynecology", "Orthopedics", "Cardiology", "Oncology", "Health Check-up"],
        short: "An international-standard hospital in Beijing with English-speaking doctors.",
        about: [
            "Beijing United Family Hospital is a private international hospital that serves expatriates and international patients in Beijing.",
            "It is known for family medicine, women and children's care, and English-speaking medical teams.",
        ],
        highlights: ["English-speaking doctors", "Women & children's care", "International insurance support", "Family-friendly rooms"],
        treatments: [
            { name: "Maternity & delivery", stay: "2 – 4 days" },
            { name: "Child health care", stay: "Per case" },
            { name: "Joint surgery", stay: "5 – 7 days" },
            { name: "Cardiac check-up", stay: "1 day" },
            { name: "Health check-up", stay: "1 day" },
        ],
    },
    {
        name: "Shanghai East Hospital",
        country: "China",
        city: "Shanghai",
        founded: 1920,
        beds: 2000,
        rating: 4.6,
        reviews: 380,
        accreditations: ["JCI"],
        specialties: ["Cardiology", "Oncology", "Neurology", "Organ Transplant", "Emergency & Trauma", "Orthopedics"],
        short: "A large university-affiliated hospital in Shanghai with advanced research units.",
        about: [
            "Shanghai East Hospital is a large university-affiliated hospital in Shanghai's Pudong area, with a long history in medical care and research.",
            "The hospital provides advanced heart, cancer, neurology and emergency care, along with an international medical department for foreign patients.",
        ],
        highlights: ["University-affiliated", "Research-led treatment", "Large emergency centre", "International department"],
        treatments: [
            { name: "Cardiac surgery", stay: "7 – 10 days" },
            { name: "Cancer treatment", stay: "Per plan" },
            { name: "Neuro surgery", stay: "7 – 12 days" },
            { name: "Stem cell therapy consult", stay: "Per case" },
            { name: "Health check-up", stay: "1 day" },
        ],
    },
];

export const hospitals = raw.map((h, i) => ({
    facilities: commonFacilities,
    cover: covers[i % covers.length],
    gallery: Array.from({ length: 6 }, (_, k) => galleryPool[(i + k) % galleryPool.length]),
    ...h,
    slug: slugify(h.name),
    countrySlug: slugify(h.country),
}));

/* ---------------------------- HELPERS ---------------------------- */
export const getCountry = (slug) => countries.find((c) => c.slug === slug);

export const getHospital = (countrySlug, hospitalSlug) =>
    hospitals.find((h) => h.countrySlug === countrySlug && h.slug === hospitalSlug);

export const hospitalLink = (h) => `/hospitals/${h.countrySlug}/${h.slug}`;

export const allSpecialties = [...new Set(hospitals.flatMap((h) => h.specialties))].sort();