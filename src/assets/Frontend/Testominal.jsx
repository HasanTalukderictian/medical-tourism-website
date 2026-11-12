import React, { useEffect, useRef, useState } from "react";
import "../../Css/Testominal.css";

// Image gula tomar project er path diye replace koro
import img1 from "../Image/Client/Maleena-Gomez-150x150.jpg";
import img2 from "../Image/Client/Dr.-Muhib-Ahmed-Shahin-150x150.jpg";
import img3 from "../Image/Client/Anwar-Hossain-Pahari-150x150.jpg";
import img4 from "../Image/Client/Zulia-Akhter-150x150.jpg";

const testimonials = [
  {
    id: 1,
    name: "Maleena Gomez",
    location: "Dhaka, Bangladesh",
    image: img1,
    rating: 5,
    direction: "left",
    text: "Akashbari Medical has not only guided me and my family during my check up and post-operative period but also monitored each & every steps of my treatment like an extended family. Due to their guidance we could save at least 15-20% treatment cost.",
  },
  {
    id: 2,
    name: "Dr. Muhib Ahmed Shahin",
    location: "Dhaka, Bangladesh",
    image: img2,
    rating: 5,
    direction: "right",
    text: "I found out about Akashbari Medical Healthcare through a family friend. I was kindly advised and also guided with choosing the right doctor for diagnosis and also the whole process. I really appreciate the service and kind help Akashbari Medical Healthcare provide during the treatment period.",
  },
  {
    id: 3,
    name: "Anwar Hossain Pahari",
    location: "Dhaka, Bangladesh",
    image: img3,
    rating: 5,
    direction: "left",
    text: "Akashbari Medical helped me getting the medical visa. They actually organized all the papers regarding the visa. They arranged meeting With the doctor and provided me the best facility. They called and asked me about my health and other problems as if I Were their full responsibility.",
  },
  {
    id: 4,
    name: "Zulia Akhter",
    location: "Dhaka, Bangladesh",
    image: img4,
    rating: 5,
    direction: "right",
    text: "It was great experience with Akashbari Medical. I was kindly advised & also guided with choosing the right doctor. I really appreciate the service & kind help they provided during the check-up, tests & getting the reports on time. It all went very smoothly for me.",
  },
];

const StarIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2.5l2.94 6.1 6.56.9-4.8 4.6 1.2 6.6L12 17.5l-5.9 3.2 1.2-6.6-4.8-4.6 6.56-.9L12 2.5z"
    />
  </svg>
);

const QuoteIcon = () => (
  <svg
    className="testi-quote"
    viewBox="0 0 84 58"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="currentColor"
      d="M0 8a8 8 0 0 1 8-8h22a8 8 0 0 1 8 8v26c0 13-8 21-22 24l-3-7c8-2 12-6 12-12H8a8 8 0 0 1-8-8V8zm46 0a8 8 0 0 1 8-8h22a8 8 0 0 1 8 8v26c0 13-8 21-22 24l-3-7c8-2 12-6 12-12H54a8 8 0 0 1-8-8V8z"
    />
  </svg>
);

const Testominal = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Section screen e ashle ekbar animation trigger hobe, tarpor card fixed thakbe
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
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
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`testi-section ${visible ? "is-visible" : ""}`}
    >
      <div className="testi-container">
        <div className="testi-header">
          <p className="testi-subtitle">
            Making patient&apos;s life easier with our services
          </p>
          <h2 className="testi-title">Client Says About Us!</h2>
        </div>

        <div className="testi-grid">
          {testimonials.map((item, index) => (
            <article
              key={item.id}
              className={`testi-card from-${item.direction}`}
              style={{ "--delay": `${index * 0.12}s` }}
            >
              <QuoteIcon />

              <p className="testi-text">{item.text}</p>

              <div className="testi-author">
                <img
                  className="testi-avatar"
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                />
                <div className="testi-info">
                  <h3 className="testi-name">{item.name}</h3>
                  <span className="testi-location">{item.location}</span>
                  <div
                    className="testi-stars"
                    role="img"
                    aria-label={`${item.rating} out of 5 stars`}
                  >
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testominal;