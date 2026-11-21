
import { NON_MEDICAL_SECTIONS } from "./sections";
import SectionShell from "./SectionShell";

/* =====================================================
   NON MEDICAL SERVICES > TRANSPORT   (/admin/non-medical-services/transport)
   Rakhbe: src/assets/Backend/NonMedicalServices/Transport.jsx

   Ei page er form / list <SectionShell> er bhitore banao.
   Kichu na dile "This section is not built yet" dekhay.
   ===================================================== */
const TransportAdmin = () => {
  return (
    <SectionShell
      section="transport"
      sections={NON_MEDICAL_SECTIONS}
      folder="NonMedicalServices"
      // actions={<button type="button" className="hma-btn">Add new</button>}
    >
      {/* EKHANE Transport er content (form / table) boshao */}
    </SectionShell>
  );
};

export default TransportAdmin;
