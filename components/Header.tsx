"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/location", label: "Location" },
];

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`header ${solid && !open ? "header--solid" : ""}`}>
        <a href="/location#reserve" className="header__book">
          Book now
        </a>
        <a href="/" className="header__brand">
          Omara
        </a>
        <button
          className={`header__toggle ${open ? "is-open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          <span />
        </button>
      </header>

      <nav className={`nav-overlay ${open ? "is-open" : ""}`}>
        <ul>
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
