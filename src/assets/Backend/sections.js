/* =====================================================
   HOME PAGE er section list (admin)
   Rakhbe: src/assets/Backend/Home/sections.js

   Notun section add korte:
   1. Ekhane ekta line add koro
   2. Home folder e notun page file banao (Banner.jsx copy kore)
   3. App.jsx e "home" route er bhitore route add koro
   4. Menu.jsx e "Home Page" er children e link add koro
   ===================================================== */
export const HOME_SECTIONS = [
    { path: "banner", file: "Banner.jsx", label: "Banner Slider", icon: "image", text: "Main slider at the top of the home page." },
    { path: "offer", file: "Offer.jsx", label: "Offer", icon: "tag", text: "Special offer strip and its button." },
    { path: "packages", file: "HomePackages.jsx", label: "Home Packages", icon: "box", text: "Packages shown on the home page." },
    { path: "achievements", file: "Achievements.jsx", label: "Achievements", icon: "award", text: "Numbers like patients helped and partner hospitals." },
    { path: "how-we-work", file: "HowWeWork.jsx", label: "How We Work", icon: "route", text: "The step by step process section." },
    { path: "testimonials", file: "Testimonials.jsx", label: "Testimonials", icon: "quote", text: "Patient reviews and stories." },
];

export const MEDICAL_SECTIONS = [
    { path: "medical-consultation", site: "/services/medical-consultation", file: "MedicalConsultation.jsx", label: "Medical Consultation", icon: "stethoscope", text: "Specialist consultation page content." },
    { path: "tele-consultation", site: "/services/tele-consultation", file: "TeleConsultation.jsx", label: "Tele Consultation", icon: "video", text: "Online video consultation page content." },
    { path: "doctor-appointment", site: "/services/doctor-appointment", file: "DoctorAppointment.jsx", label: "Doctor Appointment", icon: "calendar", text: "Doctor appointment booking page content." },
    { path: "medical-accommodation", site: "/services/medical-accommodation", file: "MedicalAccommodation.jsx", label: "Medical Accommodation", icon: "bed", text: "Stay options near partner hospitals." },
    { path: "air-ambulance", site: "/services/air-ambulance-service", file: "AirAmbulance.jsx", label: "Air Ambulance", icon: "plane", text: "Air ambulance service page content." },
    { path: "medicine", site: "/services/medicine", file: "Medicine.jsx", label: "Medicine", icon: "pill", text: "Overseas pharmacy and medicine request page." },
    { path: "training-development", site: "/services/training-development", file: "TrainingDevelopment.jsx", label: "Training & Development", icon: "cap", text: "Training programs page content." },
];


export const NON_MEDICAL_SECTIONS = [
    { path: "patient-support", site: "/services/patient-support-service", file: "PatientSupport.jsx", label: "Patient Support", icon: "support", text: "Patient support service page content." },
    { path: "pick-and-drop", site: "/services/pick-and-drop", file: "PickDrop.jsx", label: "Pick & Drop", icon: "car", text: "Airport pick up and drop service page." },
    { path: "transport", site: "/services/transport", file: "Transport.jsx", label: "Transport", icon: "bus", text: "Local transport service page content." },
    { path: "interpreter", site: "/services/interpreter", file: "Interpreter.jsx", label: "Interpreter", icon: "lang", text: "Interpreter service page content." },
    { path: "local-guide", site: "/services/local-guide", file: "LocalGuide.jsx", label: "Local Guide", icon: "map", text: "Local guide service page content." },
    { path: "medical-visa", site: "/services/medical-visa-assistance", file: "MedicalVisa.jsx", label: "Medical Visa", icon: "passport", text: "Medical visa assistance page content." },
    { path: "air-ticket", site: "/services/air-ticket", file: "AirTicket.jsx", label: "Air Ticket", icon: "plane", text: "Air ticket booking page content." },
    { path: "hotel", site: "/services/hotel", file: "Hotel.jsx", label: "Hotel", icon: "bed", text: "Hotel booking page content." },
];