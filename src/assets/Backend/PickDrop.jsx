
import { NON_MEDICAL_SECTIONS } from "./sections";
import SectionShell from "./SectionShell";

/* =====================================================
   NON MEDICAL SERVICES > PICK & DROP   (/admin/non-medical-services/pick-and-drop)
   Rakhbe: src/assets/Backend/NonMedicalServices/PickDrop.jsx

   Ei page er form / list <SectionShell> er bhitore banao.
   Kichu na dile "This section is not built yet" dekhay.
   ===================================================== */
const PickDropAdmin = () => {
  return (
    <SectionShell
      section="pick-and-drop"
      sections={NON_MEDICAL_SECTIONS}
      folder="NonMedicalServices"
      // actions={<button type="button" className="hma-btn">Add new</button>}
    >
      {/* EKHANE Pick & Drop er content (form / table) boshao */}
    </SectionShell>
  );
};

export default PickDropAdmin;
