import { useEffect, useRef, useState } from 'react';
import '../../Css/Achievements.css';

/* ---------- Icons (red line icons) ---------- */
const iconProps = {
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
};

const GlobeIcon = () => (
    <svg {...iconProps}>
        <circle cx="24" cy="24" r="20" />
        <ellipse cx="24" cy="24" rx="9" ry="20" />
        <path d="M4 24h40M7 14h34M7 34h34" />
    </svg>
);

const CaduceusIcon = () => (
    <svg {...iconProps}>
        <path d="M24 9v35" />
        <circle cx="24" cy="6" r="3" />
        <path d="M21 14C16 10 10 11 3 14c4 1 6 3 7 5-3 0-5 1-6 3 4 0 8 1 11 3" />
        <path d="M27 14c5-4 11-3 18 0-4 1-6 3-7 5 3 0 5 1 6 3-4 0-8 1-11 3" />
        <path d="M24 22c-7 2-7 7 0 9s7 7 0 9" />
        <path d="M24 22c7 2 7 7 0 9" />
    </svg>
);

const HospitalIcon = () => (
    <svg {...iconProps}>
        <path d="M10 44V10h28v34M4 44h40" />
        <path d="M24 13v8M20 17h8" />
        <path d="M20 44V35h8v9" />
        <rect x="14" y="25" width="3" height="3" />
        <rect x="31" y="25" width="3" height="3" />
        <rect x="14" y="31" width="3" height="3" />
        <rect x="31" y="31" width="3" height="3" />
    </svg>
);

const DoctorIcon = () => (
    <svg {...iconProps}>
        <circle cx="24" cy="12" r="7" />
        <path d="M6 44v-8c0-5 4-9 9-10l9 9 9-9c5 1 9 5 9 10v8" />
        <path d="M17 30v5a4 4 0 0 0 8 0" />
    </svg>
);

const PeopleIcon = () => (
    <svg {...iconProps}>
        <circle cx="18" cy="14" r="7" />
        <path d="M4 44c0-9 6-15 14-15s14 6 14 15" />
        <circle cx="34" cy="16" r="6" />
        <path d="M34 28c7 0 12 6 12 14" />
    </svg>
);

/* ---------- Data ---------- */
const stats = [
    { id: 'countries', icon: <GlobeIcon />, value: 10, label: 'Countries' },
    { id: 'cities', icon: <CaduceusIcon />, value: 20, label: 'Cities' },
    { id: 'hospitals', icon: <HospitalIcon />, value: 75, label: 'Hospitals' },
    { id: 'doctors', icon: <DoctorIcon />, value: 1000, label: 'Specialist Doctor' },
    { id: 'stories', icon: <PeopleIcon />, value: 500, label: 'Success Stories' },
];

/* ---------- Count up ---------- */
function useCountUp(end, active, duration = 2000) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!active) return;

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) {
            setCount(end);
            return;
        }

        let raf;
        let startTime;
        const tick = (now) => {
            if (!startTime) startTime = now;
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            setCount(Math.round(eased * end));
            if (progress < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(raf);
    }, [end, active, duration]);

    return count;
}

function StatCard({ icon, value, label, active }) {
    const count = useCountUp(value, active);

    return (
        <div className="ach-card">
            <div className="ach-card__icon">{icon}</div>
            <div className="ach-card__info">
                <div className="ach-card__num" aria-label={`${value.toLocaleString('en-US')}+ ${label}`}>
                    <span aria-hidden="true">{count.toLocaleString('en-US')}</span>
                    <sup aria-hidden="true">+</sup>
                </div>
                <div className="ach-card__label">{label}</div>
            </div>
        </div>
    );
}

/* ---------- Section ---------- */
const Achievements = () => {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    // Section screen e ashle ekbar count shuru hobe
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        if (!('IntersectionObserver' in window)) {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="ach-section" ref={sectionRef}>
            {/* Background decoration */}
            <svg className="ach-bg ach-bg--heart" viewBox="0 0 400 360" aria-hidden="true">
                <path
                    d="M200 340C90 250 20 190 20 110 20 60 60 20 110 20c40 0 70 22 90 55 20-33 50-55 90-55 50 0 90 40 90 90 0 80-70 140-180 230z"
                    fill="#cfe3f7"
                />
                <polyline
                    points="30,200 130,200 160,100 200,300 235,170 265,200 380,200"
                    fill="none"
                    stroke="#eef5fd"
                    strokeWidth="9"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                />
            </svg>
            <span className="ach-bg ach-bg--ring" aria-hidden="true"></span>

            <div className="ach-container">
                <p className="ach-eyebrow">Our</p>
                <h2 className="ach-heading">Achievements</h2>

                <div className="ach-grid">
                    {stats.map((s) => (
                        <StatCard key={s.id} {...s} active={visible} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;