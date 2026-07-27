import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroVideo from "@/components/HeroVideo";
import Reveal from "@/components/Reveal";
import CardSlider from "@/components/CardSlider";

export default function Home() {
  return (
    <main id="top">
      <Header />

      {/* Hero */}
      <section className="hero">
        <div className="hero__media hero__media--video">
          <HeroVideo
            name="hero"
            alt="A table set for dinner in the Omara dining room"
          />
        </div>
        <div className="hero__content">
          <h1 className="hero__title title-xl">
            Rooted in fire. Raised in warmth
          </h1>
        </div>
      </section>

      {/* Full-bleed feature with overlaid text */}
      <section className="feature" id="about">
        <div className="feature__media feature__media--video">
          {/* Below the fold, so it is not fetched until the reader nears it. */}
          <HeroVideo
            name="feature"
            alt="A pan finished over open flame in the Omara kitchen"
            defer
          />
        </div>
        <Reveal className="feature__head">
          <p className="eyebrow">Fire and memory</p>
          <h2 className="feature__title title-l">
            Omara, where the table brings us home
          </h2>
        </Reveal>
        <Reveal className="feature__foot">
          <p className="small">
            Guided by season, smoke and craft. A modern Indian kitchen rooted
            in memory, led by warmth, and made to be shared.
          </p>
          <a href="/about" className="arrow-link">
            Explore more <span className="arrow-link__icon" />
          </a>
        </Reveal>
      </section>

      {/* Menu split: photo + terracotta panel */}
      <section className="menu-split" id="menu">
        <div className="menu-split__figure">
          <Image
            src="/images/dessert-pour.jpg"
            alt="Warm chocolate poured over a plated dessert"
            fill
            sizes="(max-width: 860px) 100vw, 50vw"
          />
        </div>
        <div className="menu-split__panel">
          <Reveal className="menu-split__head">
            <p className="eyebrow">Menu</p>
            <h2 className="title-l">Flavours that stay with you</h2>
          </Reveal>
          <Reveal className="menu-split__foot">
            <p className="small">
              Charcoal and tandoor, spices ground in-house, recipes carried
              across generations and reworked with a modern hand. Familiar at
              first taste, new at the second.
            </p>
            <a href="/menu" className="arrow-link">
              View full menu <span className="arrow-link__icon" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* Full-bleed interlude */}
      <section className="interlude">
        <Image
          src="/images/band-bowls.jpg"
          alt="Hand-worn wooden bowls stacked in the Omara kitchen"
          fill
          sizes="100vw"
            quality={60}
        />
      </section>

      {/* Retreat: big title + card slider */}
      <section className="retreat" id="gallery">
        <div className="retreat__head">
          <p className="eyebrow">The space</p>
          <Reveal className="retreat__body">
            <h2 className="title-l">
              Where the kitchen moves with the evening. Discover our room at
              Hotel Palacio
            </h2>
            <p className="small muted">
              Around the table, Omara comes to life. Good company, shared
              plates, and moments that linger.
            </p>
            <a href="/gallery" className="arrow-link arrow-link--ink">
              Explore gallery <span className="arrow-link__icon" />
            </a>
          </Reveal>
        </div>
        <CardSlider />
      </section>

      {/* About */}
      <section className="about" id="chef">
        <p className="eyebrow">About</p>
        <Reveal className="about__figure">
          <Image
            src="/images/chef-team.jpg"
            alt="Chef Vicky Ratnani with the Omara kitchen brigade"
            fill
            sizes="(max-width: 860px) 100vw, 30vw"
          />
        </Reveal>
        <Reveal className="about__body">
          <h2 className="title-l">Hospitality that feels like home</h2>
          <p className="small muted">
            With decades spent cooking across oceans and continents, Chef
            Vicky Ratnani brings a traveller&apos;s curiosity home to Indian
            ingredients. At Omara, the kitchen works the line between
            nostalgia and reinvention — every plate a quiet conversation
            between the two.
          </p>
          <p className="small muted">
            The room follows the same instinct: wood, clay and brass, shaped
            by hand, warmed by lamplight, built for evenings that move at
            their own pace.
          </p>
          <a href="/about" className="arrow-link">
            Meet the kitchen <span className="arrow-link__icon" />
          </a>
        </Reveal>
      </section>

      {/* Sage band over property image */}
      <section className="band">
        <div className="band__media band__media--video">
          {/* Far below the fold, so deferred like the feature section. */}
          <HeroVideo
            name="band"
            alt="A saxophonist playing in the Omara room after dark"
            defer
          />
        </div>
        <Reveal className="band__panel">
          <p className="eyebrow">Reservations</p>
          <h2 className="title-m">
            Clay, smoke and memory — served warm. Join us for the evening
          </h2>
          <a href="/location#reserve" className="arrow-link arrow-link--light">
            Reserve a table <span className="arrow-link__icon" />
          </a>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
