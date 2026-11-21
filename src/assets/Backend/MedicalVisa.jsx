
import { NON_MEDICAL_SECTIONS } from "./sections";
import SectionShell from "./SectionShell";

/* =====================================================
   NON MEDICAL SERVICES > MEDICAL VISA   (/admin/non-medical-services/medical-visa)
   Rakhbe: src/assets/Backend/NonMedicalServices/MedicalVisa.jsx

   Ei page er form / list <SectionShell> er bhitore banao.
   Kichu na dile "This section is not built yet" dekhay.
   ===================================================== */
const MedicalVisaAdmin = () => {
  return (
    <SectionShell
      section="medical-visa"
      sections={NON_MEDICAL_SECTIONS}
      folder="NonMedicalServices"
      // actions={<button type="button" className="hma-btn">Add new</button>}
    >
      {/* EKHANE Medical Visa er content (form / table) boshao */}
    </SectionShell>
  );
};

export default MedicalVisaAdmin;
