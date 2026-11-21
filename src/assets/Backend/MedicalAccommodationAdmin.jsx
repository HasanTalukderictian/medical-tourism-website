
import { MEDICAL_SECTIONS } from "./sections";
import SectionShell from "./SectionShell";

/* =====================================================
   MEDICAL SERVICES > MEDICAL ACCOMMODATION   (/admin/medical-services/medical-accommodation)
   Rakhbe: src/assets/Backend/MedicalServices/MedicalAccommodation.jsx

   Ei page er form / list <SectionShell> er bhitore banao.
   Kichu na dile "This section is not built yet" dekhay.
   ===================================================== */
const MedicalAccommodationAdmin = () => {
  return (
    <SectionShell
      section="medical-accommodation"
      sections={MEDICAL_SECTIONS}
      folder="MedicalServices"
      // actions={<button type="button" className="hma-btn">Add new</button>}
    >
      {/* EKHANE Medical Accommodation er content (form / table) boshao */}
    </SectionShell>
  );
};

export default MedicalAccommodationAdmin;
