
import { NON_MEDICAL_SECTIONS } from "./sections";
import SectionShell from "./SectionShell";

/* =====================================================
   NON MEDICAL SERVICES > AIR TICKET   (/admin/non-medical-services/air-ticket)
   Rakhbe: src/assets/Backend/NonMedicalServices/AirTicket.jsx

   Ei page er form / list <SectionShell> er bhitore banao.
   Kichu na dile "This section is not built yet" dekhay.
   ===================================================== */
const AirTicketAdmin = () => {
  return (
    <SectionShell
      section="air-ticket"
      sections={NON_MEDICAL_SECTIONS}
      folder="NonMedicalServices"
      // actions={<button type="button" className="hma-btn">Add new</button>}
    >
      {/* EKHANE Air Ticket er content (form / table) boshao */}
    </SectionShell>
  );
};

export default AirTicketAdmin;
