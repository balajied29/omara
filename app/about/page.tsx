import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About — Omara",
  description:
    "The story of Omara at Hotel Palacio — a modern Indian dining room built on fire, craft and memory, in collaboration with Chef Vicky Ratnani.",
};

export default function AboutPage() {
  return (
    <main>
      <Header />

      <section className="page-hero">
        <div className="page-hero__media">
          <Image
            src="/images/about-hero.jpg"
            alt="The Omara kitchen brigade at service"
            fill
            priority
            sizes="100vw"
            quality={75}
          />
        </div>
        <div className="page-hero__content">
          <p className="eyebrow">About</p>
          <h1 className="title-xl">A table built on warmth</h1>
        </div>
      </section>

      <section className="about-story">
        <p className="eyebrow">The story</p>
        <Reveal className="about-story__body">
          <h2 className="title-l">A kitchen that moves as one</h2>
          <p className="small muted">
            Omara is the dining room of Hotel Palacio — a modern Indian
            kitchen built around charcoal, clay and the recipes people carry
            with them. The room is shaped by hand: rattan and wood, brass and
            lamplight, made to hold long evenings.
          </p>
          <p className="small muted">
            The kitchen is led in collaboration with Chef Vicky Ratnani, and
            run by a brigade that treats service as one continuous motion —
            from the tandoor to the pass to the table. [Hotel Palacio story
            and founding details to come.]
          </p>
        </Reveal>
      </section>

      <section className="quote-block" id="chef">
        <Reveal className="quote-block__figure">
          <Image
            src="/images/chef-team.jpg"
            alt="Chef Vicky Ratnani with the Omara team"
            fill
            sizes="(max-width: 860px) 100vw, 55vw"
          />
        </Reveal>
        <div className="quote-block__body">
          <p className="quote-block__quote">
            “A plate can carry you home. That is the whole ambition — cook
            with memory, serve with warmth, and let the table do the rest.”
          </p>
          <p className="quote-block__attr">
            Chef Vicky Ratnani · Culinary Director
          </p>
          <p className="small" style={{ color: "rgba(241,236,223,0.6)" }}>
            [Draft quote — to be approved or replaced by the chef.]
          </p>
        </div>
      </section>

      <section className="contact">
        <Reveal className="contact__intro">
          <p className="eyebrow" style={{ color: "var(--terracotta)" }}>
            Get in touch
          </p>
          <h2 className="title-l">More than a restaurant, an evening</h2>
          <p className="small muted">
            For collaborations, events and everything else — we would love to
            hear from you.
          </p>
          <a href="/location#reserve" className="arrow-link">
            Write to us <span className="arrow-link__icon" />
          </a>
        </Reveal>
        <Reveal className="contact__figure">
          <Image
            src="/images/serving-hands.jpg"
            alt="A shared plate served at the Omara table"
            fill
            sizes="(max-width: 860px) 100vw, 55vw"
          />
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
