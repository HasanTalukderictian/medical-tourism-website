
import { MEDICAL_SECTIONS } from "./sections";
import SectionShell from "./SectionShell";

/* =====================================================
   MEDICAL SERVICES > DOCTOR APPOINTMENT   (/admin/medical-services/doctor-appointment)
   Rakhbe: src/assets/Backend/MedicalServices/DoctorAppointment.jsx

   Ei page er form / list <SectionShell> er bhitore banao.
   Kichu na dile "This section is not built yet" dekhay.
   ===================================================== */
const DoctorAppointmentAdmin = () => {
  return (
    <SectionShell
      section="doctor-appointment"
      sections={MEDICAL_SECTIONS}
      folder="MedicalServices"
      // actions={<button type="button" className="hma-btn">Add new</button>}
    >
      {/* EKHANE Doctor Appointment er content (form / table) boshao */}
    </SectionShell>
  );
};

export default DoctorAppointmentAdmin;
