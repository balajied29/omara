"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const CARDS = [
  {
    title: "Events",
    note: "Ways to gather, from long lunches to late evenings",
    src: "/images/table-light.jpg",
    href: "/location#reserve",
  },
  {
    title: "Gallery",
    note: "Where atmosphere is built through wood and lamplight",
    src: "/images/lamp-door.jpg",
    href: "/gallery",
  },
  {
    title: "Menu",
    note: "A warmth that moves through the plate",
    src: "/images/chef-cooking.jpg",
    href: "/menu",
  },
  {
    title: "Chef's table",
    note: "A seat at the pass, meant to be shared",
    src: "/images/chef-grill.jpg",
    href: "/about#chef",
  },
  {
    title: "Private dining",
    note: "The long table, yours for the evening",
    src: "/images/room-desk.jpg",
    href: "/location#reserve",
  },
];

export default function CardSlider() {
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0.2);

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? Math.max(0.2, el.scrollLeft / max) : 1);
  };

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector(".slider-card") as HTMLElement | null;
    const amount = card ? card.offsetWidth * 1.4 : 400;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className="slider">
      <div className="slider__track" ref={track} onScroll={onScroll}>
        {CARDS.map((card) => (
          <a key={card.title} href={card.href} className="slider-card">
            <Image
              src={card.src}
              alt={card.title}
              fill
              sizes="(max-width: 860px) 60vw, 22vw"
            />
            <span className="slider-card__title">{card.title}</span>
            <div className="slider-card__bottom">
              <span className="slider-card__note">{card.note}</span>
              <span className="arrow-link">
                Explore more <span className="arrow-link__icon" />
              </span>
            </div>
          </a>
        ))}
      </div>
      <div className="slider__controls">
        <button
          className="slider__btn"
          onClick={() => step(-1)}
          aria-label="Previous"
        >
          ←
        </button>
        <div className="slider__progress">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
        <button
          className="slider__btn"
          onClick={() => step(1)}
          aria-label="Next"
        >
          →
        </button>
      </div>
    </div>
  );
}
