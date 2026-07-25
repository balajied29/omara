"use client";

import Image from "next/image";
import { useState } from "react";

type Photo = { src: string; alt: string; cat: string };

const CATEGORIES = ["All", "Spaces", "Kitchen", "Food & Bar", "Details"];

const PHOTOS: Photo[] = [
  { src: "/images/hero-rattan.jpg", alt: "Sculpted rattan forms in the dining room", cat: "Spaces" },
  { src: "/images/flame-torch.jpg", alt: "A dish finished with open flame", cat: "Kitchen" },
  { src: "/images/dining-chairs.jpg", alt: "The dining room set for evening", cat: "Spaces" },
  { src: "/images/dessert-pour.jpg", alt: "Chocolate poured over a plated dessert", cat: "Food & Bar" },
  { src: "/images/lamp-door.jpg", alt: "Lamplight at the entrance", cat: "Spaces" },
  { src: "/images/chef-plating.jpg", alt: "Chef Vicky Ratnani plating at the pass", cat: "Kitchen" },
  { src: "/images/cocktail.jpg", alt: "A negroni at the bar", cat: "Food & Bar" },
  { src: "/images/bowls-close.jpg", alt: "Hand-worn wooden bowls", cat: "Details" },
  { src: "/images/rattan-tall.jpg", alt: "Rattan sculpture detail", cat: "Details" },
  { src: "/images/chef-grill.jpg", alt: "The brigade at the grill", cat: "Kitchen" },
  { src: "/images/serving-hands.jpg", alt: "A shared plate, served at the table", cat: "Food & Bar" },
  { src: "/images/mirror-glow.jpg", alt: "A backlit mirror in warm light", cat: "Spaces" },
  { src: "/images/table-light.jpg", alt: "Morning light across the table", cat: "Food & Bar" },
  { src: "/images/brigade.jpg", alt: "The kitchen at service", cat: "Kitchen" },
  { src: "/images/doorway.jpg", alt: "Sunlight through a doorway", cat: "Spaces" },
  { src: "/images/band-bowls.jpg", alt: "Stacked clay and wood", cat: "Details" },
  { src: "/images/lamp-corner.jpg", alt: "A quiet corner in lamplight", cat: "Spaces" },
  { src: "/images/kitchen-pan.jpg", alt: "A pan finished in the kitchen", cat: "Kitchen" },
  { src: "/images/room-desk.jpg", alt: "A guest room writing desk", cat: "Spaces" },
  { src: "/images/chef-cooking.jpg", alt: "At work over the flame", cat: "Kitchen" },
  { src: "/images/bowls-stack.jpg", alt: "Bowls worn by use", cat: "Details" },
  { src: "/images/chef-team.jpg", alt: "Chef Vicky with the team", cat: "Kitchen" },
];

export default function GalleryGrid() {
  const [active, setActive] = useState("All");
  const shown =
    active === "All" ? PHOTOS : PHOTOS.filter((p) => p.cat === active);

  return (
    <>
      <div className="filters">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={cat === active ? "is-active" : ""}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="masonry">
        {shown.map((photo) => (
          <figure key={photo.src}>
            <Image
              src={photo.src}
              alt={photo.alt}
              width={800}
              height={1066}
              sizes="(max-width: 620px) 100vw, (max-width: 980px) 50vw, 33vw"
              style={{ height: "auto" }}
            />
          </figure>
        ))}
      </div>
    </>
  );
}
