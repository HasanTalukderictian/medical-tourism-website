import '../../Css/Packages.css';

// Nijer image path onujayi change korben
import imgCardiology from '../Image/Offer/image9.jpeg';
import imgOncology from '../Image/Offer/image10.jpeg';
import imgOrtho from '../Image/Offer/image11.jpeg';
import imgNeurology from '../Image/Offer/image12.jpeg';
import imgOphthalmology from '../Image/Offer/image13.jpeg';
import imgFertility from '../Image/Offer/image14.jpeg';

const packages = [
    {
        id: 'cardiology',
        title: 'Cardiology',
        image: imgCardiology,
        items: ['Bypass Surgery', 'Angioplasty', 'Valve Replacement', 'ECG & Echo'],
        cost: '৳30,000 – ৳5 Lakhs BDT',
    },
    {
        id: 'oncology',
        title: 'Oncology',
        image: imgOncology,
        items: ['Chemotherapy', 'Radiation Therapy', 'Bone Marrow Transplant', 'Tumor Surgery'],
        cost: '৳3 Lakhs – ৳36 Lakhs BDT',
    },
    {
        id: 'orthopaedics',
        title: 'Orthopaedics',
        image: imgOrtho,
        items: ['Knee Replacement', 'Hip Replacement', 'Spine Surgery', 'Sports Injury'],
        cost: '৳3 Lakhs – ৳8 Lakhs BDT',
    },
    {
        id: 'neurology',
        title: 'Neurology',
        image: imgNeurology,
        items: ['Brain Tumour Surgery', 'Epilepsy Treatment', 'Stroke Rehab', "Parkinson's Care"],
        cost: '৳3 Lakhs – ৳25 Lakhs BDT',
    },
    {
        id: 'ophthalmology',
        title: 'Ophthalmology',
        image: imgOphthalmology,
        items: ['LASIK Surgery', 'Cataract Surgery', 'Retina Treatment', 'Glaucoma Care'],
        cost: '৳30,000 – ৳1 Lakh BDT',
    },
    {
        id: 'fertility',
        title: 'Fertility & IVF',
        image: imgFertility,
        items: ['IVF Treatment', 'IUI', 'Egg Freezing', 'Surrogacy Support'],
        cost: '৳2.5 Lakhs – ৳4 Lakhs BDT',
    },
];

const Packages = () => {
    return (
        <section className="pkg-section">
            <div className="pkg-container">
                <div className="pkg-head">
                    <span className="pkg-badge">Medical-Packages</span>
                    <h2 className="pkg-heading">Our Packages</h2>
                    <span className="pkg-line" aria-hidden="true"></span>
                    <p className="pkg-sub">
                        Compare our premium treatment packages and pricing structured to match your requirements.
                    </p>
                </div>

                <div className="pkg-grid">
                    {packages.map((p) => (
                        <article className="pkg-card" key={p.id}>
                            <div className="pkg-card__img">
                                <img src={p.image} alt={p.title} loading="lazy" />
                                <h3 className="pkg-card__title">{p.title}</h3>
                            </div>

                            <div className="pkg-card__body">
                                <ul className="pkg-list">
                                    {p.items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>

                                <div className="pkg-cost-wrap">
                                    <span className="pkg-cost">Estimated Cost: {p.cost}</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Packages;
