import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Menu — Omara",
  description:
    "The Omara menu: charcoal, tandoor and season. A modern Indian kitchen at Hotel Palacio, in collaboration with Chef Vicky Ratnani.",
};

type Dish = { name: string; portion?: string; desc: string; tags?: string };

const MENU: { category: string; dishes: Dish[] }[] = [
  {
    category: "To begin",
    dishes: [
      {
        name: "Palak patta chaat",
        desc: "Crisp spinach, tamarind, yoghurt, pomegranate",
        tags: "V",
      },
      {
        name: "Gunpowder prawns",
        desc: "Podi spice, curry leaf, lime",
        tags: "S",
      },
      {
        name: "Beetroot galouti",
        desc: "Slow-cooked beetroot, rose, warm ulta tawa paratha",
        tags: "V",
      },
      {
        name: "Amritsari fish pakora",
        desc: "Ajwain batter, kasundi tartare",
      },
    ],
  },
  {
    category: "From the tandoor",
    dishes: [
      {
        name: "Smoked malai broccoli",
        desc: "Cream cheese, cardamom, toasted almond",
        tags: "V · GF",
      },
      {
        name: "Kasoori chicken tikka",
        desc: "Fenugreek, charred lime, mint chutney",
        tags: "GF",
      },
      {
        name: "Lamb seekh",
        desc: "Hand-pounded spice, ghee, pickled onion",
        tags: "GF · S",
      },
      {
        name: "Tandoori pomfret",
        desc: "Green chilli, coriander stem, coastal masala",
        tags: "GF · S",
      },
    ],
  },
  {
    category: "The main table",
    dishes: [
      {
        name: "Dal Omara",
        desc: "Black lentils, overnight on the coals, white butter",
        tags: "V",
      },
      {
        name: "Butter chicken, old Delhi style",
        desc: "Tomato, fenugreek, a patient reduction",
        tags: "GF",
      },
      {
        name: "Slow lamb nihari",
        desc: "Shank, saffron, mace — spooned at the table",
      },
      {
        name: "Kokum curry with the day's catch",
        desc: "Coconut, kokum, curry leaf",
        tags: "GF · S",
      },
    ],
  },
  {
    category: "Breads & rice",
    dishes: [
      {
        name: "Breads from the tandoor",
        desc: "Naan, roomali, laccha paratha — plain or with garlic and ghee",
        tags: "V",
      },
      {
        name: "Subz biryani",
        desc: "Seasonal vegetables, saffron, sealed and steamed",
        tags: "V",
      },
    ],
  },
  {
    category: "Sweet endings",
    dishes: [
      {
        name: "Chocolate & jaggery",
        portion: "for two",
        desc: "Warm chocolate poured at the table, salted jaggery ice cream",
        tags: "V",
      },
      {
        name: "Kesar phirni",
        desc: "Saffron rice cream, rose, pistachio",
        tags: "V · GF",
      },
    ],
  },
  {
    category: "From the bar",
    dishes: [
      {
        name: "Omara negroni",
        desc: "Gin, bitter, sweet vermouth, orange coin",
      },
      {
        name: "Smoked jaggery old fashioned",
        desc: "Whisky, jaggery, clove smoke",
      },
      {
        name: "Tamarind margarita",
        desc: "Tequila, tamarind, chaat masala rim",
        tags: "S",
      },
      {
        name: "Garden spritz",
        desc: "Coriander, cucumber, tonic — with or without spirit",
        tags: "V",
      },
    ],
  },
];

export default function MenuPage() {
  return (
    <main>
      <Header />

      <section className="page-hero">
        <div className="page-hero__media">
          <Image
            src="/images/menu-hero.jpg"
            alt="Warm chocolate poured over a plated dessert at Omara"
            fill
            priority
            sizes="100vw"
            quality={75}
          />
        </div>
        <div className="page-hero__content">
          <p className="eyebrow">Menu</p>
          <h1 className="title-xl">Flavours that stay with you</h1>
        </div>
      </section>

      <section className="menu-page">
        <div className="menu-page__note">
          <p className="eyebrow" style={{ color: "var(--terracotta)" }}>
            Dinner — 19:00 to 23:00
          </p>
          <p className="small muted">
            V vegetarian · GF gluten-free · S carries heat. A sample menu —
            dishes follow the season and the market.
          </p>
        </div>

        {MENU.map((cat) => (
          <Reveal key={cat.category} className="menu-cat">
            <h2 className="title-m menu-cat__title">{cat.category}</h2>
            <ul className="menu-cat__list">
              {cat.dishes.map((dish) => (
                <li key={dish.name} className="dish">
                  <div className="dish__row">
                    <span className="dish__name">
                      {dish.name}
                      {dish.portion ? ` · ${dish.portion}` : ""}
                    </span>
                    {dish.tags ? (
                      <span className="dish__tags">{dish.tags}</span>
                    ) : null}
                  </div>
                  <p className="dish__desc">{dish.desc}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </section>

      <Footer />
    </main>
  );
}
