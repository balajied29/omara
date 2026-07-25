"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/location", label: "Location" },
];

const listVariants = {
  open: { transition: { staggerChildren: 0.07, delayChildren: 0.28 } },
  closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
  closed: {
    y: 34,
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" as const },
  },
};

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
        <a href="/" className="header__brand" aria-label="Omara — home">
          <Logo uid="header" />
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
        <motion.ul
          initial="closed"
          animate={open ? "open" : "closed"}
          variants={listVariants}
        >
          {LINKS.map((link) => (
            <motion.li key={link.href} variants={itemVariants}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </nav>
    </>
  );
}
