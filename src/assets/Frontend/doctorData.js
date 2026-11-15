/* =====================================================================
   DOCTOR DATA (Doctors.jsx ar DoctorsProfile.jsx duijon-i eta use kore)
   ---------------------------------------------------------------------
   !! SHOB DOCTOR DEMO / FICTIONAL !!
   - Nam, degree, fee, review shob bananu. Asol hospital er nam use kora
     hoyeche, tai PUBLISH korar age obosshoi asol doctor er info
     (doctor/hospital er onumoti niye) diye replace koro.
   - hospital: hospitalData.js er hospital (country slug + hospital slug).
   - photo: doctor er chobi import kore dao. Na thakle initials dekhabe.
   ===================================================================== */

export const slugify = (text) =>
    text.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const HOTLINE = "+880 1XXX-XXXXXX"; // <-- tomar number dao
export const HOTLINE_LINK = "tel:+8801XXXXXXXXX";

const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&h=700&q=80`;

const raw = [{
        name: "Dr. Arjun Mehta",
        gender: "Male",
        degrees: "MBBS, MD, DM (Cardiology)",
        specialty: "Cardiology",
        designation: "Senior Consultant, Interventional Cardiology",
        hospital: { country: "india", slug: "apollo-hospitals" },
        experience: 22,
        rating: 4.9,
        reviews: 312,
        patients: 9000,
        procedures: "4,500+ angioplasties",
        languages: ["English", "Hindi", "Bangla"],
        fee: 40,
        teleFee: 30,
        video: true,
        days: [1, 2, 3, 4, 6], // 0 = Sunday ... 6 = Saturday
        photo: u("photo-1612349317150-e413f6a5b16d"),
        about: "Dr. Mehta is an interventional cardiologist with more than two decades of experience in complex angioplasty, heart failure care, and preventive cardiology. He is known for explaining treatment options clearly and patiently to international patients and their families.",
        expertise: ["Angioplasty & stenting", "Heart failure", "Chest pain evaluation", "Pacemaker implantation", "Preventive cardiology"],
        education: [
            { year: "2004", title: "DM, Cardiology", place: "Premier medical institute, India" },
            { year: "2000", title: "MD, Internal Medicine", place: "Government medical college, India" },
            { year: "1996", title: "MBBS", place: "Government medical college, India" },
        ],
        career: [
            { year: "2012 – Now", title: "Senior Consultant, Cardiology", place: "Apollo Hospitals" },
            { year: "2005 – 2012", title: "Consultant Cardiologist", place: "Multi-specialty hospital, Delhi" },
        ],
        awards: ["Best Cardiologist Award (demo)", "Fellow of a cardiology society (demo)"],
    },
    {
        name: "Dr. Priya Raman",
        gender: "Female",
        degrees: "MBBS, MS, MCh (Surgical Oncology)",
        specialty: "Oncology",
        designation: "Director, Surgical Oncology",
        hospital: { country: "india", slug: "max-healthcare" },
        experience: 18,
        rating: 4.9,
        reviews: 245,
        patients: 6000,
        procedures: "3,000+ cancer surgeries",
        languages: ["English", "Hindi", "Tamil"],
        fee: 45,
        teleFee: 35,
        video: true,
        days: [1, 2, 4, 5],
        photo: u("photo-1559839734-2b71ea197ec2"),
        about: "Dr. Raman is a cancer surgeon focused on breast, gastrointestinal, and head & neck cancers. She works closely with the tumour board to plan surgery, chemotherapy, and radiation for each patient.",
        expertise: ["Breast cancer surgery", "GI cancer surgery", "Head & neck cancer", "Minimally invasive surgery", "Tumour board planning"],
        education: [
            { year: "2008", title: "MCh, Surgical Oncology", place: "National cancer institute, India" },
            { year: "2004", title: "MS, General Surgery", place: "Medical university, India" },
            { year: "2000", title: "MBBS", place: "Medical college, India" },
        ],
        career: [
            { year: "2016 – Now", title: "Director, Surgical Oncology", place: "Max Healthcare" },
            { year: "2009 – 2016", title: "Consultant, Oncosurgery", place: "Cancer centre, Mumbai" },
        ],
        awards: ["Excellence in Oncology (demo)"],
    },
    {
        name: "Dr. Somchai Wattana",
        gender: "Male",
        degrees: "MD, Board Certified Orthopedics",
        specialty: "Orthopedics",
        designation: "Consultant, Joint Replacement",
        hospital: { country: "thailand", slug: "bumrungrad-hospital" },
        experience: 16,
        rating: 4.8,
        reviews: 198,
        patients: 5200,
        procedures: "2,000+ joint replacements",
        languages: ["English", "Thai"],
        fee: 60,
        teleFee: 45,
        video: true,
        days: [1, 3, 5, 6],
        photo: u("photo-1622253692010-333f2da6031d"),
        about: "Dr. Wattana specialises in knee and hip replacement, including robotic-assisted surgery, and sports injuries. His goal is to get patients walking safely and quickly after surgery.",
        expertise: ["Knee replacement", "Hip replacement", "Robotic joint surgery", "Sports injuries", "Arthroscopy"],
        education: [
            { year: "2008", title: "Fellowship, Joint Replacement", place: "International fellowship (demo)" },
            { year: "2006", title: "Board Certification, Orthopedics", place: "Medical council, Thailand" },
            { year: "2000", title: "MD", place: "Medical university, Bangkok" },
        ],
        career: [
            { year: "2012 – Now", title: "Consultant, Joint Replacement", place: "Bumrungrad Hospital" },
            { year: "2008 – 2012", title: "Orthopedic Surgeon", place: "University hospital, Bangkok" },
        ],
        awards: ["Robotic Surgery Excellence (demo)"],
    },
    {
        name: "Dr. Nurul Aisyah",
        gender: "Female",
        degrees: "MBBS, MRCOG, Fellowship in Reproductive Medicine",
        specialty: "IVF & Fertility",
        designation: "Consultant, Fertility & IVF",
        hospital: { country: "malaysia", slug: "prince-court-medical-centre" },
        experience: 14,
        rating: 4.9,
        reviews: 176,
        patients: 3800,
        procedures: "2,500+ IVF cycles",
        languages: ["English", "Malay"],
        fee: 55,
        teleFee: 40,
        video: true,
        days: [0, 1, 2, 3, 4],
        photo: u("photo-1594824476967-48c8b964273f"),
        about: "Dr. Aisyah helps couples with infertility through IVF, ICSI, and fertility preservation. She is known for her caring approach and clear communication throughout every treatment cycle.",
        expertise: ["IVF & ICSI", "Recurrent pregnancy loss", "PCOS management", "Egg freezing", "Male infertility work-up"],
        education: [
            { year: "2012", title: "Fellowship, Reproductive Medicine", place: "International fertility centre (demo)" },
            { year: "2009", title: "MRCOG", place: "Royal college (demo)" },
            { year: "2003", title: "MBBS", place: "Medical university, Malaysia" },
        ],
        career: [
            { year: "2015 – Now", title: "Consultant, Fertility & IVF", place: "Prince Court Medical Centre" },
            { year: "2010 – 2015", title: "Specialist, O&G", place: "General hospital, Kuala Lumpur" },
        ],
        awards: ["Women's Health Award (demo)"],
    },
    {
        name: "Dr. Rakesh Kapoor",
        gender: "Male",
        degrees: "MBBS, MS, MCh (Neurosurgery)",
        specialty: "Neurology",
        designation: "Head, Neurosurgery",
        hospital: { country: "india", slug: "fortis-healthcare" },
        experience: 25,
        rating: 4.8,
        reviews: 221,
        patients: 7000,
        procedures: "3,500+ brain & spine surgeries",
        languages: ["English", "Hindi"],
        fee: 50,
        teleFee: 35,
        video: false,
        days: [1, 2, 3, 4, 5],
        photo: u("photo-1537368910025-700350fe46c7"),
        about: "Dr. Kapoor leads a busy neurosurgery team treating brain tumours, spine problems, and stroke. He has special interest in minimally invasive spine surgery for faster recovery.",
        expertise: ["Brain tumour surgery", "Spine surgery", "Minimally invasive spine", "Stroke surgery", "Epilepsy surgery"],
        education: [
            { year: "1999", title: "MCh, Neurosurgery", place: "Premier medical institute, India" },
            { year: "1995", title: "MS, General Surgery", place: "Medical college, India" },
            { year: "1991", title: "MBBS", place: "Medical college, India" },
        ],
        career: [
            { year: "2010 – Now", title: "Head, Neurosurgery", place: "Fortis Healthcare" },
            { year: "2000 – 2010", title: "Senior Neurosurgeon", place: "Neuro centre, Delhi" },
        ],
        awards: ["Lifetime Achievement in Neurosurgery (demo)"],
    },
    {
        name: "Dr. Kanya Srisuk",
        gender: "Female",
        degrees: "MD, Board Certified Internal Medicine",
        specialty: "Health Check-up",
        designation: "Physician, Health Screening Centre",
        hospital: { country: "thailand", slug: "bangkok-hospital" },
        experience: 12,
        rating: 4.8,
        reviews: 260,
        patients: 11000,
        procedures: "10,000+ health check-ups",
        languages: ["English", "Thai"],
        fee: 35,
        teleFee: 25,
        video: true,
        days: [0, 1, 2, 3, 4, 5, 6],
        photo: u("photo-1651008376811-b90baee60c1f"),
        about: "Dr. Srisuk reviews executive health check-ups and explains results in simple words. She focuses on early detection of heart disease, diabetes, and cancer, and on practical lifestyle advice.",
        expertise: ["Executive check-ups", "Diabetes & blood pressure", "Preventive medicine", "Lifestyle counselling", "Report review"],
        education: [
            { year: "2012", title: "Board Certification, Internal Medicine", place: "Medical council, Thailand" },
            { year: "2008", title: "MD", place: "Medical university, Bangkok" },
        ],
        career: [
            { year: "2014 – Now", title: "Physician, Health Screening", place: "Bangkok Hospital" },
            { year: "2010 – 2014", title: "Resident Physician", place: "University hospital, Bangkok" },
        ],
        awards: [],
    },
    {
        name: "Dr. Vikram Iyer",
        gender: "Male",
        degrees: "MBBS, MD, DNB (Nephrology)",
        specialty: "Organ Transplant",
        designation: "Senior Consultant, Kidney Transplant",
        hospital: { country: "india", slug: "apollo-hospitals" },
        experience: 20,
        rating: 4.9,
        reviews: 154,
        patients: 4200,
        procedures: "1,200+ kidney transplants",
        languages: ["English", "Hindi", "Tamil"],
        fee: 45,
        teleFee: 30,
        video: true,
        days: [2, 3, 4, 6],
        photo: u("photo-1582750433449-648ed127bb54"),
        about: "Dr. Iyer is a transplant nephrologist who guides patients and donors through evaluation, transplant, and long-term follow-up, with a strong focus on safety and clear communication.",
        expertise: ["Kidney transplant", "Donor evaluation", "Dialysis care", "Chronic kidney disease", "Post-transplant follow-up"],
        education: [
            { year: "2006", title: "DNB, Nephrology", place: "National board, India" },
            { year: "2002", title: "MD, Medicine", place: "Medical college, India" },
            { year: "1998", title: "MBBS", place: "Medical college, India" },
        ],
        career: [
            { year: "2011 – Now", title: "Senior Consultant, Transplant", place: "Apollo Hospitals" },
            { year: "2006 – 2011", title: "Consultant Nephrologist", place: "Kidney centre, Chennai" },
        ],
        awards: ["Transplant Excellence (demo)"],
    },
    {
        name: "Dr. Lim Wei Ling",
        gender: "Female",
        degrees: "MBBS, MRCP, Fellowship in Gastroenterology",
        specialty: "Gastroenterology",
        designation: "Consultant Gastroenterologist",
        hospital: { country: "malaysia", slug: "gleneagles-kuala-lumpur" },
        experience: 15,
        rating: 4.7,
        reviews: 132,
        patients: 4500,
        procedures: "6,000+ endoscopies",
        languages: ["English", "Malay", "Mandarin"],
        fee: 50,
        teleFee: 35,
        video: true,
        days: [1, 2, 3, 5],
        photo: u("photo-1638202993928-7267aad84c31"),
        about: "Dr. Lim treats stomach, liver, and bowel conditions and performs advanced endoscopy. She has a special interest in early detection of stomach and colon cancer.",
        expertise: ["Endoscopy & colonoscopy", "Liver disease", "Acid reflux & ulcers", "IBS", "Early GI cancer screening"],
        education: [
            { year: "2011", title: "Fellowship, Gastroenterology", place: "International fellowship (demo)" },
            { year: "2008", title: "MRCP", place: "Royal college (demo)" },
            { year: "2004", title: "MBBS", place: "Medical university, Malaysia" },
        ],
        career: [
            { year: "2013 – Now", title: "Consultant Gastroenterologist", place: "Gleneagles Kuala Lumpur" },
            { year: "2009 – 2013", title: "Specialist, Gastroenterology", place: "General hospital, Penang" },
        ],
        awards: [],
    },
];

// Notun slot hisab, slug, ar hospital info add kora
export const doctors = raw.map((d) => ({...d, slug: slugify(d.name.replace(/^Dr\.?\s*/i, "")) }));

export const getDoctor = (slug) => doctors.find((d) => d.slug === slug);
export const doctorLink = (d) => `/doctors/${d.slug}`;
export const allDocSpecialties = [...new Set(doctors.map((d) => d.specialty))].sort();
export const initials = (name) =>
    name.replace(/^Dr\.?\s*/i, "").split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

// Sample time slots (backend thakle sekhan theke ashbe)
export const slotTimes = {
    Morning: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"],
    Afternoon: ["14:00", "14:30", "15:00", "15:30", "16:00"],
    Evening: ["18:00", "18:30", "19:00"],
};

// Sample reviews (asol review backend theke ashbe)
export const sampleReviews = [
    { name: "Rahim U.", from: "Dhaka", rating: 5, date: "2 weeks ago", text: "Very kind and patient. Explained everything in simple words and my treatment went smoothly." },
    { name: "Nasima K.", from: "Chattogram", rating: 5, date: "1 month ago", text: "The video consultation before travel helped us plan everything. Highly recommended." },
    { name: "Tanvir A.", from: "Sylhet", rating: 4, date: "2 months ago", text: "Excellent doctor. Waiting time was a little long but care was worth it." },
];