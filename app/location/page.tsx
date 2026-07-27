import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Location & Reservations — Omara",
  description:
    "Find Omara at Hotel Palacio: hours, directions and reservations.",
};

export default function LocationPage() {
  return (
    <main>
      <Header />

      <section className="page-hero">
        <div className="page-hero__media">
          <Image
            src="/images/hero-rattan.jpg"
            alt="The entrance to the Omara dining room"
            fill
            priority
            sizes="100vw"
            quality={75}
          />
        </div>
        <div className="page-hero__content">
          <p className="eyebrow">Location</p>
          <h1 className="title-xl">Where to find us</h1>
        </div>
      </section>

      <section className="location-info">
        <p className="eyebrow">Visit</p>
        <Reveal className="location-info__block">
          <h2 className="title-m">Hours</h2>
          <ul className="hours-list">
            <li>
              <span>Monday — Friday</span>
              <span>12:00 – 15:30 · 19:00 – 23:00</span>
            </li>
            <li>
              <span>Saturday — Sunday</span>
              <span>12:00 – 23:00</span>
            </li>
          </ul>
          <p className="small muted">
            Hours are provisional — final service times to be confirmed.
          </p>
        </Reveal>
        <Reveal className="location-info__block">
          <h2 className="title-m">Address</h2>
          <p className="small">
            Omara, Hotel Palacio
            <br />
            4th floor, Paltan Bazaar
            <br />
            HP Brahmachari Road
            <br />
            Guwahati 781008, Assam
          </p>
          <p className="small muted">
            <a href="tel:+919127000120">+91 91270 00120</a>
            <br />
            <a href="mailto:reservations@omara.example">[reservations@…]</a>
          </p>
        </Reveal>
      </section>

      <a
        className="map-panel"
        href="https://www.google.com/maps/search/?api=1&query=Hotel+Palacio%2C+Paltan+Bazaar%2C+HP+Brahmachari+Road%2C+Guwahati+781008"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src="/images/location-band.jpg"
          alt=""
          fill
          sizes="100vw"
            quality={75}
        />
        <span className="map-panel__label">
          <span className="eyebrow">Directions</span>
          <span className="title-m">Open in Google Maps</span>
          <span className="arrow-link arrow-link--light">
            Get directions <span className="arrow-link__icon" />
          </span>
        </span>
      </a>

      <section className="contact" id="reserve">
        <Reveal className="contact__intro">
          <p className="eyebrow" style={{ color: "var(--terracotta)" }}>
            Reservations & enquiries
          </p>
          <h2 className="title-l">Join us for the evening</h2>
          <p className="small muted">
            For tables of six or more, private dining and events, write to us
            and the team will come back within a day.
          </p>
        </Reveal>
        <Reveal>
          <ContactForm />
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
