"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const DESKTOP = "(min-width: 861px) and (prefers-reduced-motion: no-preference)";
const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export default function PageEffects() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    // ---- All screen sizes: cheap, transform-only entrances -------------
    mm.add(MOTION_OK, () => {
      gsap.from("main", { opacity: 0, duration: 0.5, ease: "power1.out" });

      let alive = true;
      const splits: SplitText[] = [];

      document.fonts.ready.then(() => {
        if (!alive) return;

        document
          .querySelectorAll<HTMLElement>(
            ".hero__title, .page-hero__content .title-xl"
          )
          .forEach((el) => {
            const split = SplitText.create(el, { type: "lines", mask: "lines" });
            splits.push(split);
            gsap.from(split.lines, {
              yPercent: 115,
              duration: 1.1,
              ease: "power4.out",
              stagger: 0.1,
              delay: 0.15,
            });
          });

        gsap.from(".page-hero__content .eyebrow", {
          opacity: 0,
          y: 16,
          duration: 0.85,
          ease: "power3.out",
          delay: 0.5,
        });
      });

      return () => {
        alive = false;
        splits.forEach((s) => s.revert());
      };
    });

    // ---- Desktop only: scrubbed parallax ------------------------------
    // Scrub work is per-frame and compounds on low-power devices, so phones
    // get the static composition instead.
    mm.add(DESKTOP, () => {
      gsap.from(".hero__media img, .page-hero__media img", {
        scale: 1.12,
        duration: 1.6,
        ease: "power2.out",
      });

      document
        .querySelectorAll<HTMLElement>(".hero__media, .page-hero__media")
        .forEach((media) => {
          const img = media.querySelector("img");
          if (!img) return;
          gsap.to(img, {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: media,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        });

      document
        .querySelectorAll<HTMLElement>(
          ".feature__media, .interlude, .band__media, .quote-block__figure, .menu-split__figure"
        )
        .forEach((wrap) => {
          const img = wrap.querySelector("img");
          if (!img) return;
          gsap.fromTo(
            img,
            { yPercent: -6, scale: 1.1 },
            {
              yPercent: 6,
              scale: 1.1,
              ease: "none",
              scrollTrigger: {
                trigger: wrap,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });

      gsap.from(".footer__wordmark text", {
        yPercent: 105,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".footer__wordmark", start: "top 96%" },
      });
    });

    return () => mm.revert();
  }, []);

  return null;
}
