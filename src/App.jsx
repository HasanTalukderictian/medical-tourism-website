import './App.css';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Home from './assets/Home';
import Telemedicine from './assets/Frontend/Telemedicine';
import About from './assets/Frontend/About';
import Contact from './assets/Frontend/Contact';
import Blog from './assets/Frontend/Blog';
import Gallery from './assets/Frontend/Gallery';
import ScrollToTop from './components/ScrollToTop';
import Events from './assets/Frontend/Events';
import DoctorAppointment from './assets/Frontend/DoctorAppointment';
import MedicalVisaAssistance from './assets/Frontend/MedicalVisaAssistance';
import AirTicket from './assets/Frontend/AirTicket';
import Accomation from './assets/Frontend/Accomation';
import PatientSupport from './assets/Frontend/PatientSupport';
import AirAmbulance from './assets/Frontend/AirAmbulance';
import Transport from './assets/Frontend/Transport';
import Training from './assets/Frontend/Training';
import Hospital from './assets/Frontend/Hospital';
import HospitalDetails from './assets/Frontend/HospitalDetails';
import SisterConcern from './assets/Frontend/SisterConcern';
import Package from './assets/Frontend/Package';
import PackageDetails from './assets/Frontend/PackageDetails';
import Doctors from './assets/Frontend/Doctors';
import DoctorsProfile from './assets/Frontend/DoctorsProfile';
import Team from './assets/Frontend/Team';
import BlogDetails from './assets/Frontend/BlogDetails';
import PickDrop from './assets/Frontend/PickDrop';
import Hotel from './assets/Frontend/Hotel';
import LocalGuide from './assets/Frontend/LocalGuide';
import Career from './assets/Frontend/Career';
import PlanTreatment from './assets/Frontend/PlanTreatment';
import Interpreter from './assets/Frontend/Interpreter';
import Login from './components/Login';
import Medicine from './assets/Frontend/Medicine';
import MedicalConsultation from './assets/Frontend/MedicalConsulation';

// Admin
import AdminLayout from './assets/Backend/AdminLayout';
import Dashboard from './assets/Backend/Dashboard';
import UsersRoles from './assets/Backend/UsersRoles';
import { firstAllowedPath } from './assets/Backend/permissions';
import AdminGuard, { NoAccess } from './assets/Backend/AdminGuard';

// Admin > Home Page (proti section alada page)
import AdminHome from './assets/Backend/AdminHome';
import BannerAdmin from './assets/Backend/Banner';
import OfferAdmin from './assets/Backend/Offer';
import HomePackagesAdmin from './assets/Backend/HomePackages';
import AchievementsAdmin from './assets/Backend/Achievements';
import HowWeWorkAdmin from './assets/Backend/HowWeWork';
import TestimonialsAdmin from './assets/Backend/Testimonials';

// Admin > Medical Services (proti service alada page)


import AdminMedicalServices from './assets/Backend/AdminMedicalServices';
import MedicalConsultationAdmin from './assets/Backend/MedicalConsultation';
import TeleConsultationAdmin from './assets/Backend/TeleConsultation';
import DoctorAppointmentAdmin from './assets/Backend/DoctorAppointment';
import MedicalAccommodationAdmin from './assets/Backend/MedicalAccommodationAdmin';
import AirAmbulanceAdmin from './assets/Backend/AirAmbulance';
import MedicineAdmin from './assets/Backend/Medicine';
import TrainingDevelopmentAdmin from './assets/Backend/TrainingDevelopment';
import AdminNonMedicalServices from './assets/Backend/AdminNonMedicalServices';
import PatientSupportAdmin from './assets/Backend/PatientSupport';
import PickDropAdmin from './assets/Backend/PickDrop';
import TransportAdmin from './assets/Backend/Transport';
import LocalGuideAdmin from './assets/Backend/LocalGuide';
import MedicalVisaAdmin from './assets/Backend/MedicalVisa';
import AirTicketAdmin from './assets/Backend/AirTicket';
import HotelAdmin from './assets/Backend/Hotel';
import InterpreterAdmin from './assets/Backend/InterpreterAdmin';

function Services() {
    return <h2>Services Page</h2>;
}

function HealthCard() {
    return <h2>Health Card</h2>;
}

function ServicePage({ title }) {
    return <h2>{title}</h2>;
}

function HospitalPage() {
    const { country, slug } = useParams();
    return <h2>{slug ? `${slug} (${country})` : `Hospitals in ${country}`}</h2>;
}

/* Je admin page ekhono banano hoy nai, sheta te eta dekhabe */
function AdminComingSoon() {
    return (
        <div style={{ padding: '40px 0', textAlign: 'center', color: '#5b6470' }}>
            <h2 style={{ margin: '0 0 6px', color: '#1f2937' }}>Coming soon</h2>
            <p style={{ margin: 0 }}>Ei page ekhono banano hoy nai.</p>
        </div>
    );
}

/* /admin e gele role er prothom page e jabe (Dashboard er access na thakleo)
   (Naam AdminIndex, karon AdminHome naame Home Page er admin page ache) */
function AdminIndex() {
    return <Navigate to={firstAllowedPath()} replace />;
}

function App() {
    return (
        <>
            <ScrollToTop />

            <Routes>
                {/* ================= WEBSITE (website er Header + Footer shoho) ================= */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />

                    {/* Services */}
                    <Route path="services/medical-consultation" element={<MedicalConsultation />} />
                    <Route path="services/tele-consultation" element={<Telemedicine />} />
                    <Route path="services/doctor-appointment" element={<DoctorAppointment />} />
                    <Route path="services/medical-visa-assistance" element={<MedicalVisaAssistance />} />
                    <Route path="services/air-ticket" element={<AirTicket />} />
                    <Route path="services/medical-accommodation" element={<Accomation />} />
                    <Route path="services/patient-support-service" element={<PatientSupport />} />
                    <Route path="services/air-ambulance-service" element={<AirAmbulance />} />
                    <Route path="services/transport" element={<Transport />} />
                    <Route path="services/medicine" element={<Medicine />} />
                    <Route path="services/training-development" element={<Training />} />
                    <Route path="services/pick-and-drop" element={<PickDrop />} />
                    <Route path="services/hotel" element={<Hotel />} />
                    <Route path="services/local-guide" element={<LocalGuide />} />
                    <Route path="services/interpreter" element={<Interpreter />} />

                    {/* Hospitals */}
                    <Route path="hospitals" element={<Hospital />} />
                    <Route path="hospitals/:country" element={<Hospital />} />
                    <Route path="hospitals/:country/:hospital" element={<HospitalDetails />} />

                    <Route path="sister-concern" element={<SisterConcern />} />

                    {/* Packages */}
                    <Route path="packages" element={<Package />} />
                    <Route path="packages/:slug" element={<PackageDetails />} />

                    {/* More */}
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    {/* <Route path="partners" element={<Partners />} /> */}
                    <Route path="blog" element={<Blog />} />
                    <Route path="blog/:slug" element={<BlogDetails />} />
                    <Route path="team" element={<Team />} />
                    <Route path="events" element={<Events />} />
                    <Route path="plan/treatment" element={<PlanTreatment />} />
                    <Route path="plan-your-treatment" element={<PlanTreatment />} />
                    <Route path="doctors" element={<Doctors />} />
                    <Route path="doctors/:slug" element={<DoctorsProfile />} />
                    <Route path="career" element={<Career />} />
                    <Route path="gallery" element={<Gallery />} />
                </Route>

                {/* ================= ADMIN (website er Header / Footer NAI) ================= */}

                {/* Admin login: guard er BAHIRE, tai login chhara-o khola jay */}
                <Route path="/login" element={<Login />} />
                <Route path="/admin/login" element={<Login />} />

                {/* Login na thakle AdminGuard login page e pathay */}
                <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
                    <Route index element={<AdminIndex />} />

                    {/* perm = permissions.js er key. Role e oi key na thakle "No access" dekhabe */}
                    <Route path="dashboard" element={<AdminGuard perm="dashboard"><Dashboard /></AdminGuard>} />
                    <Route path="users" element={<AdminGuard perm="users"><UsersRoles /></AdminGuard>} />
                    <Route path="no-access" element={<NoAccess />} />

                    {/* Home Page: /admin/home -> /admin/home/banner. Proti section alada page */}
                    <Route path="home" element={<AdminGuard perm="home"><AdminHome /></AdminGuard>}>
                        <Route index element={<Navigate to="banner" replace />} />
                        <Route path="banner" element={<BannerAdmin />} />
                        <Route path="offer" element={<OfferAdmin />} />
                        <Route path="packages" element={<HomePackagesAdmin />} />
                        <Route path="achievements" element={<AchievementsAdmin />} />
                        <Route path="how-we-work" element={<HowWeWorkAdmin />} />
                        <Route path="testimonials" element={<TestimonialsAdmin />} />
                    </Route>

                    {/* Medical Services: /admin/medical-services -> prothom page. Proti service alada page */}
                    <Route path="medical-services" element={<AdminGuard perm="medical_services"><AdminMedicalServices /></AdminGuard>}>
                        <Route index element={<Navigate to="medical-consultation" replace />} />
                        <Route path="medical-consultation" element={<MedicalConsultationAdmin />} />
                        <Route path="tele-consultation" element={<TeleConsultationAdmin />} />
                        <Route path="doctor-appointment" element={<DoctorAppointmentAdmin />} />
                        <Route path="medical-accommodation" element={<MedicalAccommodationAdmin />} />
                        <Route path="air-ambulance" element={<AirAmbulanceAdmin />} />
                        <Route path="medicine" element={<MedicineAdmin />} />
                        <Route path="training-development" element={<TrainingDevelopmentAdmin />} />
                    </Route>

                    {/* Non Medical Services: /admin/non-medical-services -> prothom page. Proti service alada page */}
                    <Route path="non-medical-services" element={<AdminGuard perm="non_medical_services"><AdminNonMedicalServices /></AdminGuard>}>
                        <Route index element={<Navigate to="patient-support" replace />} />
                        <Route path="patient-support" element={<PatientSupportAdmin />} />
                        <Route path="pick-and-drop" element={<PickDropAdmin />} />
                        <Route path="transport" element={<TransportAdmin />} />
                        <Route path="interpreter" element={<InterpreterAdmin />} />
                        <Route path="local-guide" element={<LocalGuideAdmin />} />
                        <Route path="medical-visa" element={<MedicalVisaAdmin />} />
                        <Route path="air-ticket" element={<AirTicketAdmin />} />
                        <Route path="hotel" element={<HotelAdmin />} />
                    </Route>



                    {/* baki admin page ekhane add koro, jemon:
                        <Route path="queries" element={<AdminGuard perm="queries"><PatientQueries /></AdminGuard>} /> */}

                    {/* Menu er je page ekhono nai, sheta "Coming soon" dekhabe.
                        perm="auto" = URL dekhe permission check kore */}
                    <Route path="*" element={<AdminGuard perm="auto"><AdminComingSoon /></AdminGuard>} />
                </Route>
            </Routes>
        </>
    );
}

export default App;