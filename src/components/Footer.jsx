import "../Css/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-col footer-brand">
          <div className="footer-logo">
            <span className="logo-icon">✚</span>
            <h2>Akashbari Medical</h2>
          </div>
          <p>
            Providing trusted healthcare services and medical supplies with
            compassion and care for a healthier tomorrow.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Twitter">𝕏</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="LinkedIn">in</a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Doctors</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-col">
          <h3>Our Services</h3>
          <ul>
            <li><a href="#">General Checkup</a></li>
            <li><a href="#">Lab Tests</a></li>
            <li><a href="#">Pharmacy</a></li>
            <li><a href="#">Emergency Care</a></li>
            <li><a href="#">Home Visit</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h3>Contact Us</h3>
          <ul className="footer-contact">
            <li>📍 Akashbari, Bangladesh</li>
            <li>📞 +880 1234-567890</li>
            <li>✉️ info@akashbarimedical.com</li>
            <li>🕒 Sat – Thu: 8AM – 10PM</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Akashbari Medical. All Rights Reserved.</p>
        <p>
          <a href="#">Privacy Policy</a> · <a href="#">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;