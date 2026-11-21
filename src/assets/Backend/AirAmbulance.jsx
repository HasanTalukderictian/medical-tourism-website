
import { MEDICAL_SECTIONS } from "./sections";
import SectionShell from "./SectionShell";

/* =====================================================
   MEDICAL SERVICES > AIR AMBULANCE   (/admin/medical-services/air-ambulance)
   Rakhbe: src/assets/Backend/MedicalServices/AirAmbulance.jsx

   Ei page er form / list <SectionShell> er bhitore banao.
   Kichu na dile "This section is not built yet" dekhay.
   ===================================================== */
const AirAmbulanceAdmin = () => {
  return (
    <SectionShell
      section="air-ambulance"
      sections={MEDICAL_SECTIONS}
      folder="MedicalServices"
      // actions={<button type="button" className="hma-btn">Add new</button>}
    >
      {/* EKHANE Air Ambulance er content (form / table) boshao */}
    </SectionShell>
  );
};

export default AirAmbulanceAdmin;
