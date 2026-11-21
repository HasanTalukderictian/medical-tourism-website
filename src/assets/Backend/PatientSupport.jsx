
import { NON_MEDICAL_SECTIONS } from "./sections";
import SectionShell from "./SectionShell";

/* =====================================================
   NON MEDICAL SERVICES > PATIENT SUPPORT   (/admin/non-medical-services/patient-support)
   Rakhbe: src/assets/Backend/NonMedicalServices/PatientSupport.jsx

   Ei page er form / list <SectionShell> er bhitore banao.
   Kichu na dile "This section is not built yet" dekhay.
   ===================================================== */
const PatientSupportAdmin = () => {
  return (
    <SectionShell
      section="patient-support"
      sections={NON_MEDICAL_SECTIONS}
      folder="NonMedicalServices"
      // actions={<button type="button" className="hma-btn">Add new</button>}
    >
      {/* EKHANE Patient Support er content (form / table) boshao */}
    </SectionShell>
  );
};

export default PatientSupportAdmin;
