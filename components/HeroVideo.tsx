"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Ambient background video.
 *
 * Safari is the constraining browser here, so its rules shape the component:
 *
 *  - `playsInline`, or iOS hijacks it into the fullscreen player;
 *  - `muted`, or autoplay is refused outright;
 *  - autoplay is refused *anyway* in Low Power Mode, so play() is treated as
 *    fallible and the poster has to be able to stand on its own;
 *  - the MP4s are H.264 High / yuv420p with the moov atom up front, because
 *    Safari will not stream otherwise.
 *
 * Orientation is chosen after mount rather than with <source media="…">,
 * which browsers handle inconsistently for <video>, so exactly one file is
 * ever fetched.
 *
 * Expects, for a given `name`:
 *   /video/{name}-wide.mp4   /video/{name}-tall.mp4
 *   /images/{name}-wide.jpg  /images/{name}-tall.jpg
 */

type Variant = "wide" | "tall";

export default function HeroVideo({
  name,
  alt,
  /** Below-the-fold instances stay unfetched until the reader nears them. */
  defer = false,
}: {
  name: string;
  alt: string;
  defer?: boolean;
}) {
  const [variant, setVariant] = useState<Variant | null>(null);
  const [stillOnly, setStillOnly] = useState(false);
  const [near, setNear] = useState(!defer);
  const [playing, setPlaying] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData === true;
    if (reduce || saveData) {
      setStillOnly(true);
      return;
    }
    const q = window.matchMedia("(max-width: 860px)");
    const pick = () => setVariant(q.matches ? "tall" : "wide");
    pick();
    q.addEventListener("change", pick);
    return () => q.removeEventListener("change", pick);
  }, []);

  // Deferred instances don't even request the file until nearly on screen, so
  // the initial load only pays for the hero.
  useEffect(() => {
    if (!defer) return;
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      // Negative bottom margin, not a positive one. This section's top sits
      // exactly at the fold, and IntersectionObserver counts touching edges as
      // intersecting — so 0px (let alone 400px) fired at scroll zero and the
      // deferral did nothing. Requiring 120px of real overlap means the file
      // is only requested once the reader is actually heading into it.
      { rootMargin: "0px 0px -120px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [defer]);

  // Don't decode video that isn't on screen — it costs battery for nothing.
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void el.play().catch(() => {
            /* Low Power Mode and friends: the poster simply stays up. */
          });
        } else {
          el.pause();
        }
      },
      { rootMargin: "80px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [variant, near]);

  return (
    <div
      ref={wrap}
      className="hero-video"
      style={
        {
          "--poster-wide": `url("/images/${name}-wide.jpg")`,
          "--poster-tall": `url("/images/${name}-tall.jpg")`,
        } as React.CSSProperties
      }
    >
      {/* Decorative, so a CSS background rather than <picture>: the preload
          scanner fetches an <img>'s src before evaluating <source> media
          rules, which had phones pulling the landscape still as well as the
          portrait one. A background only loads when its media query matches. */}
      <div
        className={`hero-video__poster ${playing ? "is-hidden" : ""}`}
        role="img"
        aria-label={alt}
      />

      {!stillOnly && variant && near && (
        <video
          ref={video}
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
              the codec Safari and iOS handle least consistently — where it
              plays at all it may decode in software, costing battery and
              stuttering. H.264 is hardware-decoded essentially everywhere. */}
          <source src={`/video/${name}-${variant}.mp4`} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
