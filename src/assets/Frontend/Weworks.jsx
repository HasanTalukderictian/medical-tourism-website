import { useEffect, useRef, useState } from 'react';
import '../../Css/Weworks.css';

// Nijer image path onujayi change korben (circle er moddhe jei illustration dekhabe)
import step1 from '../Image/works/process-icon-1.jpg';
import step2 from '../Image/works/process-icon-2.jpg';
import step3 from '../Image/works/process-icon-3.jpg';
import step4 from '../Image/works/process-icon-4.jpg';
import step5 from '../Image/works/process-icon-5.jpg';
import step6 from '../Image/works/process-icon-6.jpg';
import step7 from '../Image/works/process-icon-7.jpg';
import step8 from '../Image/works/process-icon-8.jpg';

/*
  Desktop stage er coordinate system: 1010 x 600
  c     = circle er center
  dot   = chhoto dot
  badge = number badge
  t     = text block er [left, top]
*/
const W = 1010;
const H = 600;

const steps = [
    { no: 1, title: 'Previous Report', text: 'Submit your previous medical history and checkup reports to us.', img: step1, c: [152, 392], dot: [153, 475], badge: [153, 544], t: [16, 508] },
    { no: 2, title: 'Report Analysis', text: 'We will analyze your submitted report with a team doctors.', img: step2, c: [252, 485], dot: [252, 403], badge: [252, 186], t: [280, 156] },
    { no: 3, title: 'Treatment Plan', text: "The doctor's team will suggest a suitable treatment plan for you.", img: step3, c: [352, 310], dot: [355, 393], badge: [353, 546], t: [381, 516] },
    { no: 4, title: 'Book Appointment', text: 'We will book an appointment for you with the best doctor.', img: step4, c: [452, 413], dot: [454, 330], badge: [454, 115], t: [482, 85] },
    { no: 5, title: 'Visa Assistance', text: 'We will assist you to get an offer letter & the medical visa.', img: step5, c: [552, 238], dot: [554, 321], badge: [554, 472], t: [582, 442] },
    { no: 6, title: 'Personal Attendant', text: 'After getting the visa we will appoint a full-time attendant for you.', img: step6, c: [652, 328], dot: [654, 249], badge: [654, 32], t: [682, 2] },
    { no: 7, title: 'Transportation', text: 'We will arrange air tickets and local transportation on arrival.', img: step7, c: [752, 155], dot: [755, 240], badge: [755, 391], t: [783, 361] },
    { no: 8, title: 'Treatment', text: 'The ultimate goal will be fulfilled in this step and will assist you.', img: step8, c: [852, 251], dot: [853, 172], badge: [853, 103], t: [881, 73] },
];

// Rasta er path (circle gulor center ghure ghure jay)
const ROAD_PATH =
    'M0 443 H55 C85 443 102 425 102 392 ' +
    'A50 50 0 0 1 202 392 V485 A50 50 0 0 0 302 485 ' +
    'V310 A50 50 0 0 1 402 310 V413 A50 50 0 0 0 502 413 ' +
    'V238 A50 50 0 0 1 602 238 V328 A50 50 0 0 0 702 328 ' +
    'V155 A50 50 0 0 1 802 155 V251 A50 50 0 0 0 902 251 ' +
    'C902 215 930 185 965 185 H1010';

const px = (x) => `${(x / W) * 100}%`;
const py = (y) => `${(y / H) * 100}%`;

/* Screen e ashle ekbar true hoy */
function useInView(threshold = 0.25) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
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
            { threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return [ref, visible];
}

/* ---------- Mobile / tablet: vertical timeline ---------- */
function MobileStep({ step }) {
    const [ref, visible] = useInView(0.2);
    return (
        <li ref={ref} className={`wk-item ${visible ? 'is-visible' : ''}`}>
            <div className="wk-m-circle">
                <img src={step.img} alt="" loading="lazy" />
                <span className="wk-m-badge">{step.no}</span>
            </div>
            <div className="wk-m-text">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
            </div>
        </li>
    );
}

/* ---------- Main ---------- */
const Weworks = () => {
    const [stageRef, stageVisible] = useInView(0.25);
    const [listRef, listVisible] = useInView(0.05);

    return (
        <section className="wk-section">
            <div className="wk-container">
                <div className="wk-head">
                    <h2 className="wk-heading">How  Does We Work?</h2>
                    <span className="wk-underline" aria-hidden="true"></span>
                </div>

                {/* ===== Desktop: winding road ===== */}
                <div className="wk-stage-wrap">
                    <div ref={stageRef} className={`wk-stage ${stageVisible ? 'in-view' : ''}`}>
                        {/* Decoration */}
                        <svg className="wk-deco wk-deco--heart" viewBox="0 0 140 120" aria-hidden="true">
                            <path
                                d="M70 112 C20 70 8 45 8 30 C8 14 21 6 35 6 C50 6 62 15 70 28 C78 15 90 6 105 6 C119 6 132 14 132 30 C132 45 120 70 70 112Z"
                                fill="none"
                                stroke="#f6cfd0"
                                strokeWidth="7"
                                strokeLinejoin="round"
                            />
                            <path d="M0 55 H30" stroke="#d6d6d6" strokeWidth="5" strokeLinecap="round" />
                        </svg>
                        <svg className="wk-deco wk-deco--shield" viewBox="0 0 200 190" aria-hidden="true">
                            <path
                                d="M100 8 L170 30 V90 C170 135 140 165 100 182 C60 165 30 135 30 90 V30 Z"
                                fill="#e6f0fb"
                                stroke="#d3dbe6"
                                strokeWidth="4"
                            />
                            <path d="M100 55 V125 M65 90 H135" stroke="#fff" strokeWidth="22" strokeLinecap="butt" />
                            <path d="M100 55 V125 M65 90 H135" stroke="#cfdcec" strokeWidth="2" opacity="0" />
                        </svg>

                        {/* Road */}
                        <svg className="wk-road" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
                            <defs>
                                <mask id="wk-road-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
                                    <path className="wk-mask-path" d={ROAD_PATH} pathLength="1" fill="none" stroke="#fff" strokeWidth="70" />
                                </mask>
                            </defs>
                            <g mask="url(#wk-road-mask)" fill="none">
                                <path d={ROAD_PATH} stroke="#b9b9b9" strokeWidth="37" />
                                <path d={ROAD_PATH} stroke="#fff" strokeWidth="35" />
                                <path d={ROAD_PATH} stroke="#4b4b4b" strokeWidth="31" />
                                <path d={ROAD_PATH} stroke="#fff" strokeWidth="2" strokeDasharray="9 8" />
                            </g>
                        </svg>

                        {/* Steps */}
                        {steps.map((s, i) => {
                            const lineTop = Math.min(s.dot[1], s.badge[1]);
                            const lineH = Math.abs(s.badge[1] - s.dot[1]);
                            return (
                                <div className="wk-step" key={s.no} style={{ '--i': i }}>
                                    <div
                                        className="wk-circle wk-anim wk-anim--pop"
                                        style={{ left: px(s.c[0]), top: py(s.c[1]) }}
                                    >
                                        <img src={s.img} alt="" loading="lazy" />
                                    </div>

                                    <span
                                        className="wk-line wk-anim wk-anim--fade"
                                        style={{ left: px(s.dot[0]), top: py(lineTop), height: `${(lineH / H) * 100}%` }}
                                    />
                                    <span className="wk-dot wk-anim wk-anim--fade" style={{ left: px(s.dot[0]), top: py(s.dot[1]) }} />
                                    <span className="wk-badge wk-anim wk-anim--fade" style={{ left: px(s.badge[0]), top: py(s.badge[1]) }}>
                                        {s.no}
                                    </span>

                                    <div
                                        className={`wk-text wk-anim wk-anim--slide ${s.no === 1 ? 'from-left' : ''}`}
                                        style={{ left: px(s.t[0]), top: py(s.t[1]) }}
                                    >
                                        <h3>{s.title}</h3>
                                        <p>{s.text}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ===== Mobile / Tablet: vertical list ===== */}
                <ol ref={listRef} className={`wk-list ${listVisible ? 'in-view' : ''}`}>
                    <div className="wk-m-road" aria-hidden="true"></div>
                    {steps.map((s) => (
                        <MobileStep key={s.no} step={s} />
                    ))}
                </ol>
            </div>
        </section>
    );
};

export default Weworks;