/* =====================================================
   PLAN YOUR TREATMENT: DATA
   Shob dam (USD), rating, doctor er naam DEMO.
   Asol tottho diye replace koro.

   Cost hishab:
   department.cost x country.factor x hospital.factor x package.factor
   ===================================================== */

/* ---------- 1. Needs (department) ---------- */
export const departments = [
    { id: "cardiology", name: "Cardiology", sub: "Heart", icon: "heart", cost: [4000, 9000], examples: ["Bypass surgery", "Angioplasty", "Valve replacement"] },
    { id: "neurology", name: "Neurology", sub: "Brain & Spine", icon: "brain", cost: [3500, 10000], examples: ["Brain tumour", "Spine surgery", "Stroke care"] },
    { id: "oncology", name: "Oncology", sub: "Cancer", icon: "ribbon", cost: [5000, 20000], examples: ["Chemotherapy", "Radiation", "Cancer surgery"] },
    { id: "orthopedics", name: "Orthopedics", sub: "Bone & Joint", icon: "bone", cost: [4000, 8000], examples: ["Knee replacement", "Hip replacement", "Sports injury"] },
    { id: "nephrology", name: "Nephrology", sub: "Kidney", icon: "kidney", cost: [6000, 15000], examples: ["Kidney transplant", "Dialysis", "Kidney stone"] },
    { id: "gastro", name: "Gastroenterology", sub: "Liver & Stomach", icon: "stomach", cost: [3000, 12000], examples: ["Liver care", "Endoscopy", "Gallbladder surgery"] },
    { id: "fertility", name: "Fertility & IVF", sub: "Women's Health", icon: "baby", cost: [2500, 5000], examples: ["IVF", "IUI", "Infertility tests"] },
    { id: "eye", name: "Ophthalmology", sub: "Eye", icon: "eye", cost: [800, 2500], examples: ["Cataract", "LASIK", "Retina care"] },
    { id: "ent", name: "ENT", sub: "Ear, Nose & Throat", icon: "ear", cost: [1000, 3000], examples: ["Sinus surgery", "Hearing loss", "Tonsils"] },
    { id: "checkup", name: "Health Checkup", sub: "Full Body", icon: "pulse", cost: [150, 600], examples: ["Executive checkup", "Heart screening", "Cancer screening"] },
    { id: "others", name: "Others", sub: "Tell us your need", icon: "plus", cost: null, examples: ["Any other treatment"] },
];

/* ---------- 2. Countries ---------- */
export const countries = [
    { id: "india", name: "India", flag: "🇮🇳", factor: 1, flight: "1-3 hrs", visa: "5-7 days", note: "Most affordable, Bangla-friendly" },
    { id: "thailand", name: "Thailand", flag: "🇹🇭", factor: 1.8, flight: "2.5 hrs", visa: "7-10 days", note: "World-class private hospitals" },
    { id: "malaysia", name: "Malaysia", flag: "🇲🇾", factor: 1.5, flight: "4 hrs", visa: "5-7 days", note: "Quality care, halal friendly" },
    { id: "china", name: "China", flag: "🇨🇳", factor: 1.6, flight: "5-6 hrs", visa: "7-14 days", note: "Advanced cancer & transplant care" },
];

/* ---------- 3. Hospitals ----------
   depts = kon kon department ache. factor = dam beshi/kom
   image = hospital er chhoto chhobi (Unsplash demo).
   Nijer image dite chaile import kore bodlao:
   import apolloImg from "../Image/hospital/apollo.jpg";  ...  image: apolloImg */
const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=300&h=300&q=75`;
const ALL = departments.filter((d) => d.id !== "others").map((d) => d.id);

export const hospitals = [
    { id: "apollo-chennai", name: "Apollo Hospitals", city: "Chennai", country: "india", rating: 4.8, beds: "1000+", factor: 1.15, image: img("photo-1519494026892-80bbd2d6fd0d"), depts: ALL },
    { id: "fortis-gurugram", name: "Fortis Memorial Research Institute", city: "Gurugram", country: "india", rating: 4.7, beds: "1000+", factor: 1.2, image: img("photo-1586773860418-d37222d8fce3"), depts: ["cardiology", "neurology", "oncology", "orthopedics", "nephrology", "gastro", "checkup"] },
    { id: "max-delhi", name: "Max Super Speciality Hospital", city: "New Delhi", country: "india", rating: 4.6, beds: "500+", factor: 1.1, image: img("photo-1587351021759-3e566b6af7cc"), depts: ["cardiology", "oncology", "orthopedics", "nephrology", "fertility", "eye", "checkup"] },
    { id: "tata-kolkata", name: "Tata Medical Center", city: "Kolkata", country: "india", rating: 4.7, beds: "400+", factor: 0.9, image: img("photo-1538108149393-fbbd81895907"), depts: ["oncology", "checkup"] },
    { id: "bumrungrad", name: "Bumrungrad International", city: "Bangkok", country: "thailand", rating: 4.9, beds: "580", factor: 1.25, image: img("photo-1551190822-a9333d879b1f"), depts: ALL },
    { id: "bangkok-hospital", name: "Bangkok Hospital", city: "Bangkok", country: "thailand", rating: 4.7, beds: "500+", factor: 1.1, image: img("photo-1516549655169-df83a0774514"), depts: ["cardiology", "neurology", "oncology", "orthopedics", "eye", "ent", "checkup"] },
    { id: "prince-court", name: "Prince Court Medical Centre", city: "Kuala Lumpur", country: "malaysia", rating: 4.7, beds: "270+", factor: 1.15, image: img("photo-1631217868264-e5b90bb7e133"), depts: ["cardiology", "oncology", "orthopedics", "fertility", "eye", "ent", "checkup"] },
    { id: "gleneagles-kl", name: "Gleneagles Kuala Lumpur", city: "Kuala Lumpur", country: "malaysia", rating: 4.6, beds: "380+", factor: 1.05, image: img("photo-1530497610245-94d3c16cda28"), depts: ["cardiology", "neurology", "gastro", "nephrology", "orthopedics", "checkup"] },
    { id: "beijing-united", name: "Beijing United Family Hospital", city: "Beijing", country: "china", rating: 4.6, beds: "200+", factor: 1.2, image: img("photo-1579684385127-1ef15d508118"), depts: ["oncology", "fertility", "gastro", "orthopedics", "checkup"] },
    { id: "shanghai-east", name: "Shanghai East Hospital", city: "Shanghai", country: "china", rating: 4.5, beds: "2000+", factor: 1, image: img("photo-1584515933487-779824d29309"), depts: ["cardiology", "oncology", "nephrology", "neurology", "checkup"] },
];

/* ---------- 4. Doctors ----------
   DEMO: kalponik naam. Prottek hospital + department e 2 jon nije thekei banano hoy.
   Asol doctor list pele `getDoctors` function ta bodle dao. */
const namePool = {
    india: ["Dr. Arvind Rao", "Dr. Meera Iyer", "Dr. Sanjay Kapoor", "Dr. Priya Nair", "Dr. Rakesh Menon", "Dr. Kavita Shah"],
    thailand: ["Dr. Somchai Wong", "Dr. Nattaya Srisuk", "Dr. Prasert Chai", "Dr. Kanya Lert"],
    malaysia: ["Dr. Ahmad Faiz", "Dr. Lim Mei Ling", "Dr. Ravi Kumar", "Dr. Nurul Huda"],
    china: ["Dr. Wang Lei", "Dr. Chen Yu", "Dr. Li Na", "Dr. Zhang Wei"],
};

const titles = ["Senior Consultant", "Head of Department", "Consultant"];

export const getDoctors = (hospital, dept) => {
    if (!hospital || !dept) return [];
    const pool = namePool[hospital.country];
    const seed = (hospital.id.length + dept.id.length) % pool.length;
    return [0, 1].map((k) => ({
        id: `${hospital.id}-${dept.id}-${k}`,
        name: pool[(seed + k * 2) % pool.length],
        title: `${titles[(seed + k) % titles.length]}, ${dept.name}`,
        experience: 12 + ((seed + k * 7) % 15),
        languages: hospital.country === "india" ? ["English", "Hindi"] : ["English"],
        fee: Math.round((30 + ((seed + k) % 4) * 10) * (hospital.factor || 1)),
    }));
};

/* ---------- 5. Packages ---------- */
export const packages = [{
        id: "essential",
        name: "Essential",
        factor: 1,
        tag: "Budget friendly",
        items: ["Treatment & doctor fees", "Standard hospital room", "Medical visa support", "Airport pickup"],
    },
    {
        id: "standard",
        name: "Standard",
        factor: 1.25,
        tag: "Most chosen",
        popular: true,
        items: ["Everything in Essential", "Private room", "Hotel stay for 7 nights", "Interpreter support", "Local transport"],
    },
    {
        id: "premium",
        name: "Premium",
        factor: 1.6,
        tag: "All inclusive",
        items: ["Everything in Standard", "Deluxe room / suite", "Hotel stay for 14 nights", "Dedicated coordinator", "Air tickets for 2"],
    },
];

/* Cost range ber kore (USD) */
export const estimate = ({ dept, country, hospital, pkg }) => {
    if (!dept || !dept.cost) return null;
    const f = ((country && country.factor) || 1) * ((hospital && hospital.factor) || 1) * ((pkg && pkg.factor) || 1);
    const round = (n) => Math.round(n / 50) * 50;
    return [round(dept.cost[0] * f), round(dept.cost[1] * f)];
};

export const money = (n) => `$${n.toLocaleString("en-US")}`;