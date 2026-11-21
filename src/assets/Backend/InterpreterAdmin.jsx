
import { NON_MEDICAL_SECTIONS } from "./sections";
import SectionShell from "./SectionShell";

/* =====================================================
   NON MEDICAL SERVICES > LOCAL GUIDE   (/admin/non-medical-services/local-guide)
   Rakhbe: src/assets/Backend/NonMedicalServices/LocalGuide.jsx

   Ei page er form / list <SectionShell> er bhitore banao.
   Kichu na dile "This section is not built yet" dekhay.
   ===================================================== */
const InterpreterAdmin = () => {
  return (
    <SectionShell
      section="interpreter"
      sections={NON_MEDICAL_SECTIONS}
      folder="NonMedicalServices"
      // actions={<button type="button" className="hma-btn">Add new</button>}
    >
      {/* EKHANE Interpreter er content (form / table) boshao */}
    </SectionShell>
  );
};

export default InterpreterAdmin;
