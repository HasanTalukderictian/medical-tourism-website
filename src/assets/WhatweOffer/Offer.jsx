import { useState } from 'react';
import '../../Css/Offer.css';

// Nijer image path onujayi change korben
import imgConsultation from '../Image/Offer/image1.jpeg';
import imgTourism from '../Image/Offer/image2.jpeg';
import imgAmbulance from '../Image/Offer/image3.jpeg';
import imgAccommodation from '../Image/Offer/image4.jpeg';
import imgSupport from '../Image/Offer/image5.jpeg';
import imgInterpreter from '../Image/Offer/image6.jpeg';
import imgTele from '../Image/Offer/image7.jpeg';
import imgTransport from '../Image/Offer/image8.jpeg';

const offers = [
    {
        id: 'consultation',
        title: 'Medical Consultation',
        image: imgConsultation,
        text: 'Connect with leading international specialists for expert second opinions, diagnostic reviews, and comprehensive treatment planning tailored to your condition.',
    },
    {
        id: 'tourism',
        title: 'Medical Tourism',
        image: imgTourism,
        text: 'Along with international treatment assistance, we also provide support for visa assistance, Air Ticket Reservation, pick-up and drop-off, and other travel-related services for patients & their attendants.',
    },
    {
        id: 'ambulance',
        title: 'Air Ambulance Service',
        image: imgAmbulance,
        text: 'Emergency air ambulance flight coordination equipped with advanced ICU setups and qualified medical crew for critical patient transfers across borders.',
    },
    {
        id: 'accommodation',
        title: 'Medical Accommodation',
        image: imgAccommodation,
        text: 'Comfortable, sanitised and budget-friendly living options located close to partner hospitals for patients and their attendants during treatment.',
    },
    {
        id: 'support',
        title: 'Patient Support Service',
        image: imgSupport,
        text: 'We provide dedicated patient support with guidance, coordination, and compassionate care to ensure a smooth and stress-free treatment journey.',
    },
    {
        id: 'interpreter',
        title: 'Interpreter Service',
        image: imgInterpreter,
        text: 'We provide language interpretation services for patients in any country, as well as tour guide services. This helps patients communicate clearly with doctors and hospital staff.',
    },
    {
        id: 'tele',
        title: 'Tele Consultation',
        image: imgTele,
        text: 'Convenient video consultations with specialist doctors abroad from the comfort of your home, allowing you to access expert advice without travelling.',
    },
    {
        id: 'transport',
        title: 'Transport',
        image: imgTransport,
        text: 'We provide safe, reliable, and comfortable transportation services to ensure patients reach their medical appointments and hospitals on time.',
    },
];

function OfferCard({ item }) {
    const [expanded, setExpanded] = useState(false);
    const textId = `offer-text-${item.id}`;

    return (
        <article className="offer-card">
            <div className="offer-card__img">
                <img src={item.image} alt={item.title} loading="lazy" />
            </div>

            <div className="offer-card__body">
                <h3 className="offer-card__title">{item.title}</h3>
                <p
                    id={textId}
                    className={`offer-card__text ${expanded ? 'expanded' : ''}`}
                >
                    {item.text}
                </p>
                <button
                    type="button"
                    className="offer-card__more"
                    aria-expanded={expanded}
                    aria-controls={textId}
                    onClick={() => setExpanded((v) => !v)}
                >
                    {expanded ? 'See Less' : 'See More'}
                </button>
            </div>
        </article>
    );
}

const Offer = () => {
    return (
        <section className="offer-section">
            <div className="offer-container">
                <div className="offer-head">
                    <span className="offer-badge">Our Services</span>
                    <h2 className="offer-heading">What We Offer</h2>
                    <span className="offer-line" aria-hidden="true"></span>
                </div>

                <div className="offer-grid">
                    {offers.map((item) => (
                        <OfferCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Offer;