"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Ambient hero video.
 *
 * Safari is the constraining browser here, so the rules it imposes shape the
 * whole component:
 *
 *  - `playsInline` or iOS hijacks the video into its fullscreen player;
 *  - `muted` or autoplay is refused outright;
 *  - autoplay is refused *anyway* in Low Power Mode, so play() is treated as
 *    something that can fail and the poster has to stand on its own;
 *  - the MP4s are encoded yuv420p with the moov atom up front (see the encode
 *    commands) because Safari will not stream otherwise.
 *
 * The orientation variant is chosen after mount rather than with <source
 * media="...">, which browsers handle inconsistently for <video> — picking in
 * JS guarantees exactly one file is ever fetched.
 */

type Variant = "wide" | "tall";

export default function HeroVideo({
  poster,
  alt,
}: {
  poster: string;
  alt: string;
}) {
  const [variant, setVariant] = useState<Variant | null>(null);
  const [stillOnly, setStillOnly] = useState(false);
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData === true;
    if (reduce || saveData) {
      setStillOnly(true);
      return;
    }
    // Portrait crop for portrait viewports, landscape crop otherwise.
    const q = window.matchMedia("(max-width: 860px)");
    const pick = () => setVariant(q.matches ? "tall" : "wide");
    pick();
    q.addEventListener("change", pick);
    return () => q.removeEventListener("change", pick);
  }, []);

  // Don't decode video that isn't on screen — it costs battery for nothing.
  useEffect(() => {
    const el = ref.current;
    if (!el || !variant) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void el.play().catch(() => {
            /* Low Power Mode and friends: the poster stays up. */
          });
        } else {
          el.pause();
        }
      },
      { rootMargin: "80px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [variant]);

  return (
    <>
      {/* Decorative, so it is a CSS background rather than <picture>: the
          preload scanner fetches an <img>'s src before it evaluates <source>
          media rules, which had phones pulling the landscape poster as well as
          the portrait one. A background image is only fetched when its own
          media query matches, so exactly one is ever requested. */}
      <div
        className={`hero-video__poster ${playing ? "is-hidden" : ""}`}
        role="img"
        aria-label={alt}
      />

      {!stillOnly && variant && (
        <video
          ref={ref}
          className={`hero-video__el ${playing ? "is-ready" : ""}`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          onPlaying={() => setPlaying(true)}
          onError={() => setPlaying(false)}
        >
          {/* H.264 only, deliberately. VP9 saved just 7–14% here, and it is
              the codec Safari and iOS are least consistent about — where it
              plays at all it may decode in software, which costs battery and
              stutters. H.264 is hardware-decoded essentially everywhere, and
              for a looping background that matters far more than 40–80KB. */}
          <source src={`/video/hero-${variant}.mp4`} type="video/mp4" />
        </video>
      )}
    </>
  );
}
