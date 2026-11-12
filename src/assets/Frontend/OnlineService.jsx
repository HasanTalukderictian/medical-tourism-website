import React from "react";
import "../../Css/Onlineservice.css";

// Doctor image er path tomar project onujayi change koro
import doctorImg from "../../assets/Image/telemedicine/online telemedicine.jpg";

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
    <path
      d="M7 17L17 7M9 7h8v8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const OnlineService = () => {
  return (
    <section className="os-section">
      <h2 className="os-heading">Online Consultation</h2>

      <div className="os-card">
        <div className="os-content">
          <p className="os-eyebrow">Online Consultation</p>

          <h3 className="os-title">
            Not Sure About Your Diagnosis or Treatment Plan?
          </h3>

          <p className="os-desc">
            Get a written review, video consultation, or multidisciplinary
            second opinion from world class Chinese specialists.
          </p>

          <a href="/online-consultation" className="os-btn">
            <span>Book Online Consultation</span>
            <ArrowIcon />
          </a>
        </div>

        <div className="os-media">
          <img
            src={doctorImg}
            alt="Doctor giving an online video consultation"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default OnlineService;