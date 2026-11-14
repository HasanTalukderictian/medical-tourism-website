import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import '../Css/Header.css';
import logo from '../assets/Image/AKBH MEDICAL-01.png';

const slugify = (text) =>
    text.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const services = [
    { to: '/healthcard', label: 'Health Card' },
    { to: '/services/medical-consultation', label: 'Medical Consultation' },
    { to: '/services/tele-consultation', label: 'Tele Consultation' },
    { to: '/services/doctor-appointment', label: 'Doctor Appointment' },
    { to: '/services/medical-visa-assistance', label: 'Medical Visa Assistance' },
    { to: '/services/air-ticket', label: 'Air Ticket' },
    { to: '/services/medical-accommodation', label: 'Medical Accommodation' },
    { to: '/services/patient-support-service', label: 'Patient Support Service' },
    { to: '/services/air-ambulance-service', label: 'Air Ambulance Service' },
    { to: '/services/transport', label: 'Transport' },
    { to: '/services/training-development', label: 'Training & Development' },
];

const hospitals = {
    Bangladesh: [
        'Japan Bangladesh Friendship Hospital',
        'Evercare',
        'AMZ Hospital',
        'Uttara Crescent Hospital',
        'Anwer Khan Modern',
        'Farazy',
        'Gulshan Clinic',
        'Prescription Point',
    ],
    India: ['Apollo Hospitals', 'Fortis Healthcare', 'Max Healthcare'],
    Thailand: ['Bumrungrad Hospital', 'Bangkok Hospital'],
    Malaysia: ['Prince Court Medical Centre', 'Gleneagles Kuala Lumpur'],
    China: ['Beijing United Family Hospital', 'Shanghai East Hospital'],
};

const packages = [
    { to: '/packages/health-checkup', label: 'Health Checkup' },
    { to: '/packages/cardiac-care', label: 'Cardiac Care' },
    { to: '/packages/cancer-treatment', label: 'Cancer Treatment' },
];

const more = [
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
    { to: '/blog', label: 'Blog' },
];

function SimpleDropdown({ id, to, label, items, openId, setOpenId }) {
    const isOpen = openId === id;
    return (
        <li className={`dropdown ${isOpen ? 'open' : ''}`}>
            <NavLink to={to}>{label}</NavLink>
            <button
                type="button"
                className="dd-toggle"
                aria-label={`Toggle ${label} menu`}
                aria-expanded={isOpen}
                onClick={() => setOpenId(isOpen ? null : id)}
            >
                ▾
            </button>
            <ul className="dropdown-menu">
                {items.map((item) => (
                    <li key={item.to}>
                        <Link to={item.to}>{item.label}</Link>
                    </li>
                ))}
            </ul>
        </li>
    );
}

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [openId, setOpenId] = useState(null);       // which main dropdown is open (mobile)
    const [openCountry, setOpenCountry] = useState(null); // which country is open (mobile)
    const location = useLocation();

    // Page change hole menu bondho
    useEffect(() => {
        setMenuOpen(false);
        setOpenId(null);
        setOpenCountry(null);
    }, [location.pathname]);

    // Menu khola thakle background scroll lock
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    // Desktop size e gele mobile menu reset
    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth > 992) setMenuOpen(false);
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const dropdownProps = { openId, setOpenId };

    return (
        <header className="site-header">
            <nav className="navbar">
                <Link to="/" className="logo-link">
                    <img src={logo} alt="Akashbari Medical logo" className="logo-img" />
                </Link>

                <button
                    type="button"
                    className={`menu-toggle ${menuOpen ? 'active' : ''}`}
                    aria-label="Toggle navigation"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((v) => !v)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div className={`nav-collapse ${menuOpen ? 'open' : ''}`}>
                    <ul className="nav-menu">
                        <li>
                            <NavLink to="/" end>Home</NavLink>
                        </li>

                        <SimpleDropdown id="services" to="/services" label="Services" items={services} {...dropdownProps} />

                        {/* Hospitals: nested menu */}
                        <li className={`dropdown ${openId === 'hospitals' ? 'open' : ''}`}>
                            <NavLink to="/hospitals" end>Hospitals</NavLink>
                            <button
                                type="button"
                                className="dd-toggle"
                                aria-label="Toggle Hospitals menu"
                                aria-expanded={openId === 'hospitals'}
                                onClick={() => setOpenId(openId === 'hospitals' ? null : 'hospitals')}
                            >
                                ▾
                            </button>
                            <ul className="dropdown-menu country-menu">
                                {Object.entries(hospitals).map(([country, list]) => (
                                    <li
                                        key={country}
                                        className={`has-sub ${openCountry === country ? 'open' : ''}`}
                                    >
                                        <div className="sub-row">
                                            <Link to={`/hospitals/${slugify(country)}`}>
                                                {country} <span className="arrow">▸</span>
                                            </Link>
                                            <button
                                                type="button"
                                                className="sub-toggle"
                                                aria-label={`Toggle ${country} hospitals`}
                                                aria-expanded={openCountry === country}
                                                onClick={() =>
                                                    setOpenCountry(openCountry === country ? null : country)
                                                }
                                            >
                                                ▾
                                            </button>
                                        </div>
                                        <ul className="sub-menu">
                                            {list.map((h) => (
                                                <li key={h}>
                                                    <Link to={`/hospitals/${slugify(country)}/${slugify(h)}`}>
                                                        {h}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <SimpleDropdown id="packages" to="/packages" label="Packages" items={packages} {...dropdownProps} />
                        <SimpleDropdown id="more" to="/more" label="More" items={more} {...dropdownProps} />

                        <li>
                            <NavLink to="/gallery" end>Gallery</NavLink>
                        </li>

                    </ul>

                    <div className="nav-actions">
                        <Link to="/services/doctor-appointment" className="cta-btn">
                            Book Appointment
                        </Link>
                        <Link to="/partner" className="cta-btn">
                            Become A Partner
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;