import './App.css';
import { Routes, Route, useParams } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Home from './assets/Home';
import Telemedicine from './assets/Frontend/Telemedicine';
import About from './assets/Frontend/About';
import Contact from './assets/Frontend/Contact';
import Blog from './assets/Frontend/Blog';
import Gallery from './assets/Frontend/Gallery';
import ScrollToTop from './components/ScrollToTop';
import Events from './assets/Frontend/Events';
import MedicalConsultation from './assets/Frontend/MedicalConsultation';
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
import Partners from './assets/Frontend/Partners';

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

function App() {
    return (
        <>
            <ScrollToTop />

            <Routes>
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
                    <Route path="services/training-development" element={<Training />} />

                    {/* Hospitals */}

                    <Route path="/hospitals" element={<Hospital />} />
                    <Route path="/hospitals/:country" element={<Hospital />} />
                    <Route path="/hospitals/:country/:hospital" element={<HospitalDetails />} />

                    <Route path="/sister-concern" element={<SisterConcern />} />


                    {/* Packages */}

                      

                    <Route path="packages/:slug" element={<ServicePage title="Package Details" />} />

                    {/* More */}

                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                     <Route path="partners" element={<Partners />} />
                    <Route path="blog" element={<Blog />} />
                    <Route path="events" element={<Events />} />
                    <Route path="gallery" element={<Gallery />} />
                    <Route path="partner" element={<ServicePage title="Become A Partner" />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;