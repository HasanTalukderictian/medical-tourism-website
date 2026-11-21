
import { MEDICAL_SECTIONS } from "./sections";
import SectionShell from "./SectionShell";

/* =====================================================
   MEDICAL SERVICES > MEDICAL CONSULTATION   (/admin/medical-services/medical-consultation)
   Rakhbe: src/assets/Backend/MedicalServices/MedicalConsultation.jsx

   Ei page er form / list <SectionShell> er bhitore banao.
   Kichu na dile "This section is not built yet" dekhay.
   ===================================================== */
const MedicalConsultationAdmin = () => {
  return (
    <SectionShell
      section="medical-consultation"
      sections={MEDICAL_SECTIONS}
      folder="MedicalServices"
      // actions={<button type="button" className="hma-btn">Add new</button>}
    >
      {/* EKHANE Medical Consultation er content (form / table) boshao */}
    </SectionShell>
  );
};

export default MedicalConsultationAdmin;
