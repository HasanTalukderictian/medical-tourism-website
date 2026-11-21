
import { MEDICAL_SECTIONS } from "./sections";
import SectionShell from "./SectionShell";

/* =====================================================
   MEDICAL SERVICES > TRAINING & DEVELOPMENT   (/admin/medical-services/training-development)
   Rakhbe: src/assets/Backend/MedicalServices/TrainingDevelopment.jsx

   Ei page er form / list <SectionShell> er bhitore banao.
   Kichu na dile "This section is not built yet" dekhay.
   ===================================================== */
const TrainingDevelopmentAdmin = () => {
  return (
    <SectionShell
      section="training-development"
      sections={MEDICAL_SECTIONS}
      folder="MedicalServices"
      // actions={<button type="button" className="hma-btn">Add new</button>}
    >
      {/* EKHANE Training & Development er content (form / table) boshao */}
    </SectionShell>
  );
};

export default TrainingDevelopmentAdmin;
