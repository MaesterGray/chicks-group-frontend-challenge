import './footer.css';
import TrustPilotStars from '../../assets/trust-pilot-stars.svg';
import ChicksLogo from '../../assets/chicks-logo.svg';

import VisaLogo from '../../assets/payment-options/visa-logo.png';
import MasterCardLogo from '../../assets/payment-options/master-card-logo.png';
import AmexLogo from '../../assets/payment-options/american-express-logo.png';
import SkrillLogo from '../../assets/payment-options/skrill-logo.png';
import BitcoinLogo from '../../assets/payment-options/bitcoin-logo.png';
import EthereumLogo from '../../assets/payment-options/ethereum-logo.png';
import LitecoinLogo from '../../assets/payment-options/litecoin-logo.png';

// Import social icons from react-icons
import { FaFacebookF, FaInstagram, FaXTwitter, FaDiscord } from 'react-icons/fa6';

export function Footer() {
  return (
    <footer className="footer">
      <div className="payment-methods-wrapper">
        <div className="payment-methods">
          <div className="conventional-payments">
            <img src={VisaLogo} alt="Visa" />
            <img src={MasterCardLogo} alt="Mastercard" />
            <img src={AmexLogo} alt="American Express" />
            <img src={SkrillLogo} alt="Skrill" />
          </div>
          <div className="crypto-payments">
            <img src={BitcoinLogo} alt="Bitcoin" />
            <img src={EthereumLogo} alt="Ethereum" />
            <img src={LitecoinLogo} alt="Litecoin" />
          </div>
          <span className="more-text">and 50+ more</span>
        </div>
      </div>

      <div className="social-wrapper">
        <div className="footer-socials">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <div className="social-icon-container facebook">
              <FaFacebookF size={24} />
            </div>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <div className="social-icon-container instagram">
              <FaInstagram size={24} />
            </div>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <div className="social-icon-container twitter">
              <FaXTwitter size={24} />
            </div>
          </a>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
            <div className="social-icon-container discord">
              <FaDiscord size={24} />
            </div>
          </a>
        </div>
      </div>

      <div className="footer-links-wrapper">
        <div className="footer-content">
          <div className="footer-section brand">
            <img src={ChicksLogo} alt="Chicks Gold" className="footer-logo" />
            <div className="email-wrapper">
              <a href="mailto:support@chicksgold.com">support@chicksgold.com</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Chicks Gold</h4>
            <ul>
              <li><a href="/games">Games</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/sitemap">Sitemap</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/copyright">Copyright Policy</a></li>
            </ul>
          </div>

          <div className="footer-section trustpilot">
            <a href="https://trustpilot.com" target="_blank" rel="noopener noreferrer">
              <img src={TrustPilotStars} alt="Trustpilot Rating" />
            </a>
            <div className="trustpilot-text">
              <span>Trustpilot Reviews</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="copyright-wrapper">
          <p>© 2017 - 2020 Chicksgold.com. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
