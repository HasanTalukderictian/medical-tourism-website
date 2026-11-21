
import { NON_MEDICAL_SECTIONS } from "./sections";
import SectionShell from "./SectionShell";

/* =====================================================
   NON MEDICAL SERVICES > HOTEL   (/admin/non-medical-services/hotel)
   Rakhbe: src/assets/Backend/NonMedicalServices/Hotel.jsx

   Ei page er form / list <SectionShell> er bhitore banao.
   Kichu na dile "This section is not built yet" dekhay.
   ===================================================== */
const HotelAdmin = () => {
  return (
    <SectionShell
      section="hotel"
      sections={NON_MEDICAL_SECTIONS}
      folder="NonMedicalServices"
      // actions={<button type="button" className="hma-btn">Add new</button>}
    >
      {/* EKHANE Hotel er content (form / table) boshao */}
    </SectionShell>
  );
};

export default HotelAdmin;
