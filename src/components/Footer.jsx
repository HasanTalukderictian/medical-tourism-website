import { Link } from "react-router-dom";
import "../Css/Footer.css";
import logo from "../assets/Image/AKBH MEDICAL-01.png";

/* ---------------------------- DATA ----------------------------
   Contact info, social link ar menu ekhane bodlao.
---------------------------------------------------------------- */
const CONTACT = {
  phone: "+880 1234-567890",
  phoneLink: "tel:+8801234567890",
  whatsapp: "https://wa.me/8801234567890",
  email: "info@akashbarimedical.com",
  address: "Akashbari, Bangladesh",
  hours: "Sat – Thu: 8AM – 10PM",
};

const socials = [
  { name: "Facebook", href: "#", icon: "facebook" },
  { name: "Instagram", href: "#", icon: "instagram" },
  { name: "LinkedIn", href: "#", icon: "linkedin" },
  { name: "YouTube", href: "#", icon: "youtube" },
  { name: "WhatsApp", href: CONTACT.whatsapp, icon: "whatsapp" },
];

const services = [
  { to: "/services/medical-consultation", label: "Medical Consultation" },
  { to: "/services/tele-consultation", label: "Tele Consultation" },
  { to: "/services/doctor-appointment", label: "Doctor Appointment" },
  { to: "/services/medical-visa-assistance", label: "Medical Visa" },
  { to: "/services/air-ticket", label: "Air Ticket" },
  { to: "/services/medical-accommodation", label: "Accommodation" },
  { to: "/services/transport", label: "Patient Transport" },
  { to: "/services/air-ambulance-service", label: "Air Ambulance" },
];

const quickLinks = [
  { to: "/about", label: "About Us" },
  { to: "/doctors", label: "Our Doctors" },
  { to: "/hospitals", label: "Hospitals" },
  { to: "/packages", label: "Packages" },
  { to: "/partners", label: "Partners" },
  { to: "/sister-concern", label: "Sister Concern" },
  { to: "/events", label: "Events" },
  { to: "/blog", label: "Blog" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

const countries = [
  { to: "/hospitals/india", label: "India", flag: "🇮🇳" },
  { to: "/hospitals/thailand", label: "Thailand", flag: "🇹🇭" },
  { to: "/hospitals/malaysia", label: "Malaysia", flag: "🇲🇾" },
  { to: "/hospitals/china", label: "China", flag: "🇨🇳" },
];

/* ---------------------------- ICONS ---------------------------- */
const line = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const Icon = ({ name, size = 18 }) => {
  const p = { ...line, width: size, height: size };
  switch (name) {
    case "pin":
      return <svg {...p}><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>;
    case "phone":
      return <svg {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>;
    case "mail":
      return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>;
    case "clock":
      return <svg {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>;
    case "arrow":
      return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case "up":
      return <svg {...p}><path d="M12 19V5M6 11l6-6 6 6" /></svg>;
    case "stetho":
      return <svg {...p}><path d="M6 3v6a4 4 0 0 0 8 0V3" /><path d="M10 13v2a5 5 0 0 0 10 0v-2" /><circle cx="20" cy="11" r="2" /></svg>;
    case "chevron":
      return <svg {...p}><path d="M9 6l6 6-6 6" /></svg>;
    // Social (solid)
    case "facebook":
      return <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true"><path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9h3l.5-4h-3.5V9c0-.6.4-1 1-1z" /></svg>;
    case "instagram":
      return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
    case "linkedin":
      return <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true"><path d="M4 9h4v12H4zM6 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z" /></svg>;
    case "youtube":
      return <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true"><path d="M22 8.2c-.2-1.6-1-2.7-2.6-2.9C16.8 5 12 5 12 5s-4.8 0-7.4.3C3 5.5 2.2 6.6 2 8.2 1.8 9.6 1.8 12 1.8 12s0 2.4.2 3.8c.2 1.6 1 2.7 2.6 2.9C7.2 19 12 19 12 19s4.8 0 7.4-.3c1.6-.2 2.4-1.3 2.6-2.9.2-1.4.2-3.8.2-3.8s0-2.4-.2-3.8zM10 15V9l5.2 3z" /></svg>;
    case "whatsapp":
      return <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 1.9 2.9 4.6 4 1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" /></svg>;
    default:
      return null;
  }
};

/* ---------------------------- FOOTER ---------------------------- */
function Footer() {
  const year = new Date().getFullYear();

  const toTop = () => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className="ft">


      {/* ===== Main ===== */}
      <div className="ft-wrap ft-main">
        {/* Brand */}
        <div className="ft-col ft-brand">
          <Link to="/" className="ft-logo" aria-label="Akashbari Medical home">
            <img src={logo} alt="Akashbari Medical" />
          </Link>
          <p>
            Your trusted partner for medical treatment abroad. We connect patients with top hospitals and handle
            visa, travel, stay, and care, from the first call to the journey home.
          </p>

          <div className="ft-socials" aria-label="Social media">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                aria-label={s.name}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <Icon name={s.icon} size={17} />
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <nav className="ft-col" aria-label="Our services">
          <h3>Our Services</h3>
          <ul className="ft-links">
            {services.map((l) => (
              <li key={l.to}>
                <Link to={l.to}><Icon name="chevron" size={14} /> {l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Quick links */}
        <nav className="ft-col" aria-label="Quick links">
          <h3>Quick Links</h3>
          <ul className="ft-links ft-links--2">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to}><Icon name="chevron" size={14} /> {l.label}</Link>
              </li>
            ))}
          </ul>

         
        </nav>

        {/* Contact */}
        <div className="ft-col">
          <h3>Contact Us</h3>
          <ul className="ft-contact">
            <li>
              <span className="ft-ci"><Icon name="pin" /></span>
              <div>
                <small>Office</small>
                {CONTACT.address}
              </div>
            </li>
            <li>
              <span className="ft-ci"><Icon name="phone" /></span>
              <div>
                <small>Call us (24/7)</small>
                <a href={CONTACT.phoneLink}>{CONTACT.phone}</a>
              </div>
            </li>
            <li>
              <span className="ft-ci"><Icon name="mail" /></span>
              <div>
                <small>Email</small>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </div>
            </li>
            <li>
              <span className="ft-ci"><Icon name="clock" /></span>
              <div>
                <small>Office hours</small>
                {CONTACT.hours}
              </div>
            </li>
          </ul>

          
        </div>
      </div>

      {/* ===== Bottom ===== */}
      <div className="ft-bottom">
        <div className="ft-wrap ft-bottom-in">
          <p>© {year} Akashbari Medical. All rights reserved.</p>
          <p className="ft-legal">
            <a
              href="https://hasan-portfilo.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Developed by Hasan Talukder
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
