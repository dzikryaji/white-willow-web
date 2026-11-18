'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useReducedMotion } from 'motion/react';

// Scroll distances, in viewport heights.
const WARNING_PIN_VH = 50; // extra scroll the warning stays pinned
const WARNING_FADE_SCROLL_VH = 40; // warning fades out after the pin
const DARKEN_COMPLETE_SCROLL_VH = 50; // light -> dark finishes across the pin

const FIRST_EMPTY_DARK_VH = 150;

const IMAGE_REVEAL_VH = 80;
const IMAGE_HOLD_VH = 100;
const IMAGE_EXIT_VH = 80;
const IMAGE_TRANSPARENT_HOLD_VH = 30;
const IMAGE_TRACK_VH = IMAGE_REVEAL_VH + IMAGE_HOLD_VH + IMAGE_EXIT_VH + IMAGE_TRANSPARENT_HOLD_VH + 100;

const SECRET_PIN_VH = 50; // extra scroll the reveal stays pinned
const RETURN_LIGHT_SCROLL_VH = 100; // dark -> light
const SECRET_TAIL_VH = 100;

function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(t: number) {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

function mixRgb(from: [number, number, number], to: [number, number, number], t: number) {
  const r = Math.round(lerp(from[0], to[0], t));
  const g = Math.round(lerp(from[1], to[1], t));
  const b = Math.round(lerp(from[2], to[2], t));
  return `rgb(${r}, ${g}, ${b})`;
}

export default function DarkNarrativeChapter() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  const bgColor = useMotionValue('rgb(251, 247, 239)');
  const warningHeadingColor = useMotionValue('rgb(61, 46, 34)');
  const warningTextColor = useMotionValue('rgb(231, 223, 210)');
  const warningMutedColor = useMotionValue('rgb(123, 98, 75)');
  const warningOpacity = useMotionValue(1);
  const warningVisibility = useMotionValue<'visible' | 'hidden'>('visible');
  const imageOpacity = useMotionValue(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      const scrolled = -root.getBoundingClientRect().top;

      const warningOuterPx = (WARNING_PIN_VH / 100) * vh + vh;
      const warningHoldPx = (WARNING_PIN_VH / 100) * vh;
      const warningFadePx = (WARNING_FADE_SCROLL_VH / 100) * vh;
      const darkCompletePx = (DARKEN_COMPLETE_SCROLL_VH / 100) * vh;
      const empty1Px = (FIRST_EMPTY_DARK_VH / 100) * vh;
      const trackPx = (IMAGE_TRACK_VH / 100) * vh;
      const returnPx = (RETURN_LIGHT_SCROLL_VH / 100) * vh;

      const trackStart = warningOuterPx + empty1Px;
      const trackEnd = trackStart + trackPx;
      const secretStart = trackEnd;
      const returnStart = secretStart;
      const returnEnd = returnStart + returnPx;

      let darkValue = smoothstep(scrolled / Math.max(darkCompletePx, 1));
      if (scrolled >= warningOuterPx && scrolled < returnStart) darkValue = 1;
      if (scrolled >= returnStart) {
        darkValue = 1 - smoothstep((scrolled - returnStart) / Math.max(returnPx, 1));
      }
      if (scrolled <= 0 || scrolled >= returnEnd) darkValue = 0;
      darkValue = clamp01(darkValue);

      let warningValue = 1;
      if (scrolled > warningHoldPx) {
        warningValue = 1 - smoothstep((scrolled - warningHoldPx) / Math.max(warningFadePx, 1));
      }
      warningValue = clamp01(warningValue);

      const pinnedPx = trackPx - vh;
      const revealPx = (IMAGE_REVEAL_VH / 100) * vh;
      const holdPx = (IMAGE_HOLD_VH / 100) * vh;
      const exitPx = (IMAGE_EXIT_VH / 100) * vh;
      const imageProgressPx = clamp01((scrolled - trackStart) / Math.max(pinnedPx, 1)) * pinnedPx;

      let imageValue = 0;
      if (scrolled <= trackStart) {
        imageValue = 0;
      } else if (imageProgressPx < revealPx) {
        imageValue = smoothstep(imageProgressPx / Math.max(revealPx, 1));
      } else if (imageProgressPx < revealPx + holdPx) {
        imageValue = 1;
      } else if (imageProgressPx < revealPx + holdPx + exitPx) {
        imageValue = 1 - smoothstep((imageProgressPx - revealPx - holdPx) / Math.max(exitPx, 1));
      } else {
        imageValue = 0;
      }
      imageValue = clamp01(imageValue);

      if (reducedMotion) {
        warningValue = scrolled < warningHoldPx ? 1 : 0;
        if (scrolled >= darkCompletePx * 0.5 && scrolled < returnStart + returnPx * 0.5) darkValue = 1;
        else darkValue = 0;
        if (scrolled <= 0) darkValue = 0;
        if (scrolled <= trackStart || imageProgressPx >= revealPx + holdPx + exitPx) imageValue = 0;
        else imageValue = 1;
      }

      bgColor.set(mixRgb([251, 247, 239], [16, 14, 13], darkValue));
      warningHeadingColor.set(mixRgb([61, 46, 34], [248, 244, 236], darkValue));
      warningTextColor.set(mixRgb([32, 27, 23], [236, 231, 223], darkValue));
      warningMutedColor.set(mixRgb([123, 98, 75], [212, 178, 148], darkValue));
      warningOpacity.set(warningValue);
      warningVisibility.set(warningValue <= 0.01 ? 'hidden' : 'visible');
      imageOpacity.set(imageValue);
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const ro = new ResizeObserver(onScroll);
    ro.observe(root);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      ro.disconnect();
    };
  }, [
    bgColor,
    warningHeadingColor,
    warningTextColor,
    warningMutedColor,
    warningOpacity,
    warningVisibility,
    imageOpacity,
    reducedMotion,
  ]);

  return (
    <div ref={rootRef} className="relative">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-[5]"
        style={{ backgroundColor: bgColor }}
      />

      <div style={{ height: `${WARNING_PIN_VH + 100}svh` }}>
        <section
          className="sticky top-0 flex h-[100svh] items-center justify-center px-3 sm:px-5 lg:px-6"
          aria-label="Beware the Witch Hunter"
        >
          <motion.div
            className="mx-auto max-w-5xl text-center"
            style={{
              opacity: warningOpacity,
              visibility: warningVisibility,
              color: warningTextColor,
            }}
          >
            <motion.h2
              className="mt-6 font-display text-5xl leading-[0.92] sm:text-6xl md:text-7xl lg:text-8xl"
              style={{ color: warningHeadingColor }}
            >
              BEWARE THE WITCH HUNTER
            </motion.h2>
            <motion.p
              className="mx-auto mt-8 max-w-2xl text-base leading-8 sm:text-lg sm:leading-9"
              style={{ color: warningMutedColor }}
            >
              Every remedy you offer and every kindness at the counter carries a risk. In Brairwick, suspicion can turn
              gratitude into fear, and a healer&apos;s secret can become a sentence.
            </motion.p>
          </motion.div>
        </section>
      </div>

      <div aria-hidden="true" style={{ height: `${FIRST_EMPTY_DARK_VH}svh` }} />

      <section aria-label="Game over image" className="relative" style={{ height: `${IMAGE_TRACK_VH}svh` }}>
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          <motion.img
            src="/images/gameover-witch-burned.jpg"
            alt="A tragic game over scene showing the consequence of being discovered as a witch"
            className="absolute inset-0 h-full w-full object-cover object-center"
            style={{ opacity: imageOpacity }}
            draggable={false}
          />
        </div>
      </section>

      <div style={{ height: `${SECRET_PIN_VH + 100}svh` }}>
        <section
          className="sticky top-0 flex h-[100svh] items-center px-3 sm:px-5 lg:px-6"
          aria-label="A Secret Revealed. A Life Lost."
        >
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={reducedMotion ? false : { opacity: 0, y: 32 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            animate={reducedMotion ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <h2 className="font-display text-4xl leading-tight text-[#f8f4ec] sm:text-5xl lg:text-6xl">
              A Secret Revealed. A Life Lost.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#e7dfd2] sm:text-lg sm:leading-9">
              You have spent your days helping the villagers while keeping your magic hidden. But the witch hunter&apos;s
              suspicion has closed in, and the memory spell failed. Your journey ends in flames.
            </p>
          </motion.div>
        </section>
      </div>

      <div aria-hidden="true" style={{ height: `${SECRET_TAIL_VH}svh` }} />
    </div>
  );
}
