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
  /** Pans the footage under the pointer, and under a finger-drag on touch. */
  parallax = false,
}: {
  name: string;
  alt: string;
  defer?: boolean;
  parallax?: boolean;
}) {
  const [variant, setVariant] = useState<Variant | null>(null);
  const [stillOnly, setStillOnly] = useState(false);
  const [near, setNear] = useState(!defer);
  const [playing, setPlaying] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);
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

  /**
   * Pointer-driven pan.
   *
   * The layer is scaled slightly larger than the frame so there is footage to
   * move into. Position and damping live in a ref and are written straight to
   * the element inside a rAF loop — routing per-frame values through React
   * state would re-render the tree on every mouse move.
   */
  useEffect(() => {
    if (!parallax) return;
    const box = wrap.current;
    const el = layer.current;
    if (!box || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const MAX_X = 38;
    const MAX_Y = 22;
    const state = { x: 0, y: 0, tx: 0, ty: 0, dragging: false, px: 0, py: 0 };
    let raf = 0;

    const aim = (nx: number, ny: number) => {
      state.tx = Math.max(-1, Math.min(1, nx)) * -MAX_X;
      state.ty = Math.max(-1, Math.min(1, ny)) * -MAX_Y;
    };

    const onMove = (e: PointerEvent) => {
      const r = box.getBoundingClientRect();
      if (state.dragging) {
        // Finger drag: accumulate, so touch users can pan without a cursor.
        state.tx = Math.max(-MAX_X, Math.min(MAX_X, state.tx + (e.clientX - state.px) * 0.6));
        state.ty = Math.max(-MAX_Y, Math.min(MAX_Y, state.ty + (e.clientY - state.py) * 0.6));
        state.px = e.clientX;
        state.py = e.clientY;
      } else {
        aim(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
      }
    };
    const onDown = (e: PointerEvent) => {
      state.dragging = true;
      state.px = e.clientX;
      state.py = e.clientY;
    };
    const onUp = () => {
      state.dragging = false;
    };
    const onLeave = () => {
      state.dragging = false;
      state.tx = 0;
      state.ty = 0;
    };

    const tick = () => {
      state.x += (state.tx - state.x) * 0.08;
      state.y += (state.ty - state.y) * 0.08;
      el.style.transform = `translate3d(${state.x.toFixed(2)}px, ${state.y.toFixed(2)}px, 0) scale(1.14)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    box.addEventListener("pointermove", onMove);
    box.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    box.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      box.removeEventListener("pointermove", onMove);
      box.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      box.removeEventListener("pointerleave", onLeave);
    };
  }, [parallax, near, variant]);

  return (
    <div
      ref={wrap}
      className={`hero-video ${parallax ? "hero-video--parallax" : ""}`}
      style={
        {
          "--poster-wide": `url("/images/${name}-wide.jpg")`,
          "--poster-tall": `url("/images/${name}-tall.jpg")`,
        } as React.CSSProperties
      }
    >
      <div ref={layer} className="hero-video__layer">
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
    </div>
  );
}
