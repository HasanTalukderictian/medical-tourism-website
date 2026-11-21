
import { MEDICAL_SECTIONS } from "./sections";
import SectionShell from "./SectionShell";


/* =====================================================
   MEDICAL SERVICES > MEDICINE   (/admin/medical-services/medicine)
   Rakhbe: src/assets/Backend/MedicalServices/Medicine.jsx

   Ei page er form / list <SectionShell> er bhitore banao.
   Kichu na dile "This section is not built yet" dekhay.
   ===================================================== */
const MedicineAdmin = () => {
  return (
    <SectionShell
      section="medicine"
      sections={MEDICAL_SECTIONS}
      folder="MedicalServices"
      // actions={<button type="button" className="hma-btn">Add new</button>}
    >
      {/* EKHANE Medicine er content (form / table) boshao */}
    </SectionShell>
  );
};

export default MedicineAdmin;
