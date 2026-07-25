import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="footer" id="visit">
      <div className="footer__grid">
        <div>
          <h4>Visit us</h4>
          <ul>
            <li>Omara, Hotel Palacio</li>
            <li>[Street address]</li>
            <li>[City, PIN]</li>
          </ul>
        </div>
        <div>
          <h4>Hours</h4>
          <ul>
            <li>Lunch — 12:00 to 15:30</li>
            <li>Dinner — 19:00 to 23:00</li>
            <li>Open all week</li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>
              <a href="tel:+910000000000">[+91 00000 00000]</a>
            </li>
            <li>
              <a href="mailto:reservations@omara.example">[reservations@…]</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Follow</h4>
          <ul>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__base">
        <p>© 2026 Omara at Hotel Palacio. All rights reserved.</p>
        <p>In collaboration with Chef Vicky Ratnani</p>
      </div>
      <div className="footer__wordmark">
        <Logo uid="footer" />
      </div>
    </footer>
  );
}
