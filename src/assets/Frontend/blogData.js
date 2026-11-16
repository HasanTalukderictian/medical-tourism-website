/* =====================================================
   BLOG DATA (Blog.jsx + BlogDetails.jsx dujon-i ekhan theke nibe)
   Ei post gulo SAMPLE. Tomar asol blog post diye replace koro.

   Image: niche IMG object e ache (demo photo).

   content block type:
   { type: "p",     text: "..." }            -> paragraph
   { type: "h2",    text: "..." }            -> section heading (Table of contents e ashbe)
   { type: "list",  items: ["...", "..."] }  -> bullet list
   { type: "steps", items: ["...", "..."] }  -> number list
   { type: "tip",   title: "...", text: "..." } -> shobuj highlight box
   { type: "quote", text: "...", by: "..." } -> quote
   ===================================================== */

/* ---------------------------- DEMO IMAGES ----------------------------
   Unsplash er free demo photo (internet theke load hoy).
   Nijer image dite chaile import kore niche bodlao. Jemon:
   import hospitalImg from "../Image/blog/hospital.jpg";
   ... hospital: hospitalImg,
   Kono link load na hole automatic placeholder dekhabe.
------------------------------------------------------------------------ */
const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

const IMG = {
    hospital: u("photo-1519494026892-80bbd2d6fd0d"),
    visa: u("photo-1436491865332-7a61a109cc05"),
    secondOpinion: u("photo-1576091160550-2173dba999ef"),
    checklist: u("photo-1488646953014-85cb44e25828"),
    specialist: u("photo-1582750433449-648ed127bb54"),
    cost: u("photo-1554224155-6726b3ff858f"),
    patientJourney: u("photo-1584515933487-779824d29309"),
    healthyHabits: u("photo-1490645935967-10de6ba17061"),
};

export const categories = ["All", "Treatment Guide", "Visa & Travel", "Hospitals", "Health Tips", "Patient Stories"];

export const posts = [{
        id: 1,
        slug: "how-to-choose-the-right-hospital-abroad",
        title: "How to Choose the Right Hospital for Treatment Abroad",
        excerpt: "Accreditation, specialist experience, language support, and aftercare all matter. Here is a simple checklist to compare hospitals before you decide.",
        category: "Hospitals",
        author: "Akashbari Medical Team",
        date: "Nov 10, 2026",
        readTime: 6,
        featured: true,
        image: IMG.hospital,
        tags: ["Hospitals", "Accreditation", "Planning"],
        content: [
            { type: "p", text: "Choosing a hospital in another country is one of the biggest decisions in your treatment journey. A good choice gives you peace of mind, while a rushed one can add stress, cost, and delays. This guide walks you through the points that matter most." },
            { type: "h2", text: "Check accreditation first" },
            { type: "p", text: "International accreditation shows that a hospital follows recognised standards for safety, hygiene, and patient care. Look for well-known accreditations and national quality certificates, and ask the hospital to confirm they are current." },
            { type: "h2", text: "Look at the specialist, not only the hospital" },
            { type: "p", text: "A famous hospital is not always the best place for every condition. What matters most is the experience of the department and the doctor who will treat you." },
            { type: "list", items: ["How many similar cases does the department handle each year?", "What are the doctor's qualifications and years of experience?", "Is a multidisciplinary team involved in planning your treatment?"] },
            { type: "h2", text: "Ask about language and patient support" },
            { type: "p", text: "Clear communication reduces mistakes and worry. Many hospitals that receive international patients have coordinators and interpreters, and some offer help with airport pickup and accommodation." },
            { type: "tip", title: "Quick tip", text: "Ask for a written treatment plan and cost estimate before you travel. It makes comparing hospitals much easier." },
            { type: "h2", text: "Plan your aftercare" },
            { type: "p", text: "Recovery does not end at discharge. Ask how follow-up will work once you are home, whether online check-ups are possible, and how reports will be shared with your local doctor." },
            { type: "quote", text: "The right hospital is the one that fits your condition, your budget, and your comfort, not only the one with the biggest name.", by: "Akashbari Medical Team" },
        ],
    },
    {
        id: 2,
        slug: "medical-visa-guide-for-patients",
        title: "Medical Visa Guide: Documents You Need Before You Travel",
        excerpt: "A clear walkthrough of the papers, invitation letters, and records usually needed when applying for a medical visa.",
        category: "Visa & Travel",
        author: "Akashbari Medical Team",
        date: "Nov 4, 2026",
        readTime: 5,
        image: IMG.visa,
        tags: ["Visa", "Documents", "Travel"],
        content: [
            { type: "p", text: "A medical visa lets you travel to another country for treatment. Requirements change from country to country and over time, so always check the latest rules with the embassy. Below are the documents most often asked for." },
            { type: "h2", text: "Common documents" },
            { type: "list", items: ["A passport valid for at least six months", "Recent passport-size photos", "An invitation or appointment letter from the hospital", "Your recent medical reports and the doctor's referral", "Proof of funds, such as a bank statement", "Companion details if a family member travels with you"] },
            { type: "h2", text: "The application steps" },
            { type: "steps", items: ["Share your reports with the hospital and get a treatment plan", "Receive the official invitation letter", "Fill in the visa application form and book an appointment", "Submit your documents and pay the visa fee", "Track your application and collect your passport"] },
            { type: "tip", title: "Good to know", text: "Apply early. Processing times can be longer during holidays and peak travel seasons." },
            { type: "h2", text: "How we can help" },
            { type: "p", text: "Our team helps you collect the hospital invitation letter, checks your documents, and guides you through each step so your application is complete the first time." },
        ],
    },
    {
        id: 3,
        slug: "what-to-expect-from-a-second-opinion",
        title: "What to Expect From an Online Second Opinion",
        excerpt: "How a written review or video consultation works, what records to prepare, and how to use the advice with your local doctor.",
        category: "Treatment Guide",
        author: "Akashbari Medical Team",
        date: "Oct 28, 2026",
        readTime: 4,
        image: IMG.secondOpinion,
        tags: ["Second Opinion", "Telemedicine"],
        content: [
            { type: "p", text: "An online second opinion lets a specialist review your diagnosis and treatment plan without you having to travel. It can confirm your current plan or show you other options worth discussing." },
            { type: "h2", text: "Written review or video call?" },
            { type: "p", text: "A written review is a detailed report from the specialist after studying your records. A video consultation lets you talk directly and ask questions. Many patients start with a written review and add a call if needed." },
            { type: "h2", text: "Records to prepare" },
            { type: "list", items: ["Latest test results and scan reports", "Scan images (CDs or digital files) where possible", "Discharge summaries and prescriptions", "A short list of your questions"] },
            { type: "tip", title: "Quick tip", text: "Clear, complete records lead to a more useful opinion. Scan your papers in good light and name files by date." },
            { type: "h2", text: "Using the advice at home" },
            { type: "p", text: "Share the second opinion with your local doctor. An online review supports your care decisions but does not replace an in-person examination." },
        ],
    },
    {
        id: 4,
        slug: "preparing-for-treatment-abroad-checklist",
        title: "Preparing for Treatment Abroad: A Practical Checklist",
        excerpt: "From medical reports and medicines to travel insurance and a family companion, plan every step so nothing is missed.",
        category: "Visa & Travel",
        author: "Akashbari Medical Team",
        date: "Oct 20, 2026",
        readTime: 7,
        image: IMG.checklist,
        tags: ["Checklist", "Travel", "Planning"],
        content: [
            { type: "p", text: "Good preparation turns a stressful trip into a manageable one. Use this checklist in the weeks before you travel." },
            { type: "h2", text: "Medical papers" },
            { type: "list", items: ["All recent reports, in order by date", "A list of current medicines and doses", "Allergy details and past surgeries", "Your local doctor's contact details"] },
            { type: "h2", text: "Travel and stay" },
            { type: "list", items: ["Passport, visa, and printed copies", "Flight tickets with flexible dates if possible", "Accommodation close to the hospital", "Travel insurance that covers your stay"] },
            { type: "h2", text: "Money and communication" },
            { type: "list", items: ["Some local currency and an international card", "A local SIM or roaming plan", "Emergency contacts saved on your phone"] },
            { type: "tip", title: "Bring a companion", text: "A family member or friend can help with paperwork, meals, and moral support, especially after a procedure." },
            { type: "h2", text: "Before you fly" },
            { type: "p", text: "Confirm your appointment date, ask the hospital what to bring on the first day, and check whether you need to fast or stop any medicine before tests." },
        ],
    },
    {
        id: 5,
        slug: "questions-to-ask-your-specialist",
        title: "10 Questions to Ask Your Specialist Before Treatment",
        excerpt: "Understand your diagnosis, options, risks, and recovery plan by asking the right questions at your first consultation.",
        category: "Health Tips",
        author: "Akashbari Medical Team",
        date: "Oct 12, 2026",
        readTime: 5,
        image: IMG.specialist,
        tags: ["Consultation", "Health Tips"],
        content: [
            { type: "p", text: "Your first meeting with a specialist goes quickly. Writing your questions down beforehand helps you leave with a clear understanding of your plan." },
            { type: "h2", text: "Questions worth asking" },
            { type: "steps", items: ["What exactly is my diagnosis?", "What treatment options do I have?", "Why do you recommend this option for me?", "What are the possible risks and side effects?", "How long will the treatment take?", "How long will I need to stay in the country?", "What will recovery look like?", "What is the total estimated cost?", "What happens if there is a complication?", "How will follow-up work after I go home?"] },
            { type: "tip", title: "Quick tip", text: "Ask if you can record the conversation or bring someone to take notes. It is easy to forget details later." },
            { type: "h2", text: "Do not be afraid to ask again" },
            { type: "p", text: "If something is unclear, ask the doctor to explain it in simpler words. A good specialist will be happy to make sure you understand." },
        ],
    },
    {
        id: 6,
        slug: "understanding-treatment-cost-estimates",
        title: "Understanding Treatment Cost Estimates and Hidden Charges",
        excerpt: "What is usually included in a package, what may cost extra, and how to ask for a clear and transparent estimate.",
        category: "Treatment Guide",
        author: "Akashbari Medical Team",
        date: "Oct 5, 2026",
        readTime: 6,
        image: IMG.cost,
        tags: ["Cost", "Packages"],
        content: [
            { type: "p", text: "A cost estimate helps you plan, but two estimates can look very different depending on what they include. Knowing what to look for avoids surprises." },
            { type: "h2", text: "Usually included" },
            { type: "list", items: ["Surgeon and doctor fees", "Hospital room for a set number of days", "Standard tests before the procedure", "Routine medicines during the stay"] },
            { type: "h2", text: "Often extra" },
            { type: "list", items: ["Extra days in hospital or ICU", "Special implants or devices", "Additional tests if something new is found", "Accommodation and travel for companions"] },
            { type: "tip", title: "Ask for it in writing", text: "Request an itemised estimate that clearly lists what is and is not included." },
            { type: "h2", text: "Comparing estimates fairly" },
            { type: "p", text: "Put estimates side by side and compare the same items. A lower number may simply leave out costs that another hospital includes." },
        ],
    },
    {
        id: 7,
        slug: "a-patient-journey-from-dhaka",
        title: "A Patient Journey: From First Call to Recovery",
        excerpt: "A family shares how guided support made a stressful treatment journey simpler, from planning to follow-up care.",
        category: "Patient Stories",
        author: "Akashbari Medical Team",
        date: "Sep 27, 2026",
        readTime: 4,
        image: IMG.patientJourney,
        tags: ["Patient Story"],
        content: [
            { type: "p", text: "Every patient journey is different. This sample story shows how planning and support can make the process easier for a family travelling for treatment." },
            { type: "h2", text: "The first call" },
            { type: "p", text: "The family shared their reports and concerns. Within a few days, they received opinions from two hospitals along with cost estimates to compare." },
            { type: "h2", text: "Travel and treatment" },
            { type: "p", text: "After choosing a hospital, the team helped with the invitation letter, visa, flights, and a stay close to the hospital. A coordinator met them at the airport." },
            { type: "quote", text: "We never felt alone. Someone was always there to explain the next step.", by: "Patient's family (sample)" },
            { type: "h2", text: "Back home" },
            { type: "p", text: "Follow-up check-ups were arranged online, and reports were shared with the family's local doctor to continue care at home." },
        ],
    },
    {
        id: 8,
        slug: "healthy-habits-after-treatment",
        title: "Healthy Habits That Support Recovery After Treatment",
        excerpt: "Simple routines around rest, food, movement, and follow-up visits that can help you recover with confidence.",
        category: "Health Tips",
        author: "Akashbari Medical Team",
        date: "Sep 18, 2026",
        readTime: 5,
        image: IMG.healthyHabits,
        tags: ["Recovery", "Health Tips"],
        content: [
            { type: "p", text: "Recovery takes time. Small daily habits can support your body while it heals. Always follow the specific advice your doctor gives you." },
            { type: "h2", text: "Rest well" },
            { type: "p", text: "Sleep and rest give your body the energy to heal. Keep a regular sleep time and avoid heavy work until your doctor says it is safe." },
            { type: "h2", text: "Eat simple, balanced food" },
            { type: "list", items: ["Fresh fruits and vegetables", "Enough protein, such as fish, eggs, or lentils", "Plenty of water unless told otherwise", "Less fried and very salty food"] },
            { type: "h2", text: "Move gently" },
            { type: "p", text: "Short walks improve blood flow and mood. Increase activity slowly and stop if you feel pain or discomfort." },
            { type: "tip", title: "Do not skip follow-ups", text: "Follow-up visits catch small problems early. Keep a calendar of appointments and medicine times." },
        ],
    },
];

/* Heading text theke id banay (Table of contents er jonno) */
export const toId = (text) =>
    text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");