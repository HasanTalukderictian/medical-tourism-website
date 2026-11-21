
import { MEDICAL_SECTIONS } from "./sections";
import SectionShell from "./SectionShell";

/* =====================================================
   MEDICAL SERVICES > TELE CONSULTATION   (/admin/medical-services/tele-consultation)
   Rakhbe: src/assets/Backend/MedicalServices/TeleConsultation.jsx

   Ei page er form / list <SectionShell> er bhitore banao.
   Kichu na dile "This section is not built yet" dekhay.
   ===================================================== */
const TeleConsultationAdmin = () => {
  return (
    <SectionShell
      section="tele-consultation"
      sections={MEDICAL_SECTIONS}
      folder="MedicalServices"
      // actions={<button type="button" className="hma-btn">Add new</button>}
    >
      {/* EKHANE Tele Consultation er content (form / table) boshao */}
    </SectionShell>
  );
};

export default TeleConsultationAdmin;
