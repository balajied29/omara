import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery — Omara",
  description:
    "The Omara room in pictures: wood, clay, lamplight and the kitchen at work.",
};

export default function GalleryPage() {
  return (
    <main>
      <Header />

      <section className="page-hero">
        <div className="page-hero__media">
          <Image
            src="/images/gallery-hero.jpg"
            alt="The Omara dining room set for the evening"
            fill
            priority
            sizes="100vw"
            quality={75}
          />
        </div>
        <div className="page-hero__content">
          <p className="eyebrow">Gallery</p>
          <h1 className="title-xl">A room that glows after dark</h1>
        </div>
      </section>

      <section className="gallery-page">
        <div className="gallery-page__intro">
          <p className="small muted">
            A tribute to the essential — wood, clay, fire and the people
            around them. Simple, warm, unhurried.
          </p>
        </div>
        <GalleryGrid />
      </section>

      <Footer />
    </main>
  );
}
