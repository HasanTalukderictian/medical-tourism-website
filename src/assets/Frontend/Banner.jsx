import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Css/Banner.css';

// Nijer image gulo ekhane import korun (minimum 2ta, joto khushi)
import bg1 from '../Image/Banner/imagebanner1.jpg.jpg';
import bg2 from '../Image/Banner//banner2.jpg.jpg';
import bg3 from '../Image/Banner/banner3.jpg.jpg';

const slides = [bg1, bg2, bg3];
const SLIDE_TIME = 2000; // 2 second

const Banner = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, SLIDE_TIME);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="banner">
            {/* Background slideshow */}
            <div className="banner-slides">
                {slides.map((img, i) => (
                    <div
                        key={i}
                        className={`banner-slide ${i === current ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${img})` }}
                    />
                ))}
            </div>
            <div className="banner-overlay" />

            {/* Main content */}
            <div className="banner-container">
                <div className="banner-content">
                    <span className="banner-tag">Akashbari Medical Tourism</span>

                    <h1 className="banner-title">
                        SAVING LIVES BY
                        <br />
                        <span className="highlight">
                            EMPOWERING PEOPLE<span className="cursor" />
                        </span>
                    </h1>

                    <p className="banner-text">
                        We create a shared space for patients, doctors, and hospitals — providing
                        quality, accessible, and affordable medical care across the globe.
                    </p>

                    <div className="banner-buttons">
                        <Link to="/packages" className="btn btn-green">Explore Packages</Link>
                        <Link to="/contact" className="btn btn-outline">Contact Us</Link>
                    </div>
                </div>

                {/* Info cards */}
                <div className="info-cards ">
                    <div className="info-card green ">
                        <div className="info-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
                                <circle cx="12" cy="10" r="2.5" />
                            </svg>
                        </div>
                        <div>
                            <h3>Our Location</h3>
                            <p>House 43, Road 7, Block G, Banani Dhaka 1213</p>
                        </div>
                    </div>

                    <div className="info-card orange">
                        <div className="info-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="5" width="18" height="14" rx="2" />
                                <path d="M3 7l9 6 9-6" />
                            </svg>
                        </div>
                        <div>
                            <h3>Any Inquiries?</h3>
                            <p>medicalservice.akbh@gmail.com</p>
                        </div>
                    </div>

                    <div className="info-card white">
                        <div className="info-icon outline">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                            </svg>
                        </div>
                        <div>
                            <h3>Emergency Call</h3>
                            <p>+8801335-075563</p>
                            <p>+8801335-146058</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;