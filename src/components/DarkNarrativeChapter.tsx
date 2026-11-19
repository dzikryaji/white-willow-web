'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useReducedMotion } from 'motion/react';

// Scroll distances, in viewport heights, measured from the top of the chapter.
const WARNING_PIN_VH = 50; // extra scroll the warning stays pinned
const WARNING_FADE_SCROLL_VH = 40; // warning fades out right after the pin
const DARKEN_COMPLETE_SCROLL_VH = 50; // light -> dark finishes across the pin

// Empty dark beat between the warning being fully gone and the game over image
// starting to fade in. This is the real gap the visitor feels.
const EMPTY_AFTER_WARNING_VH = 25;

// Scroll position where the image track pins and its fade in begins.
// Everything after the warning (image, secret, return to light) is derived from this.
const IMAGE_TRACK_START_VH = WARNING_PIN_VH + WARNING_FADE_SCROLL_VH + EMPTY_AFTER_WARNING_VH;

// The warning block is WARNING_PIN_VH + 100 tall, and its last part only scrolls an invisible
// warning off screen. The image track is pulled up by the difference so that dead tail does not
// add to the gap. The image is transparent until it pins, so the overlap is never visible.
const IMAGE_TRACK_PULL_UP_VH = WARNING_PIN_VH + 100 - IMAGE_TRACK_START_VH;

const IMAGE_REVEAL_VH = 80;
const IMAGE_HOLD_VH = 100;
const IMAGE_EXIT_VH = 80;
const IMAGE_TRANSPARENT_HOLD_VH = 30;
const IMAGE_TRACK_VH = IMAGE_REVEAL_VH + IMAGE_HOLD_VH + IMAGE_EXIT_VH + IMAGE_TRANSPARENT_HOLD_VH + 100;

const SECRET_PIN_VH = 50; // extra scroll the reveal stays pinned
const RETURN_LIGHT_SCROLL_VH = 100; // dark -> light
const SECRET_TAIL_VH = 100;

// The background crossfades through mid grey, where a text color blended between the two
// palette ends would drop to about 1:1. Text instead ramps to pure black before the
// background turns dark and snaps to pure white once it is dark. The swap sits at the
// background luminance where black and white reach the same contrast (about 4.58:1), so
// both sides of the switch stay above AA. Pure black and white are only transient here;
// the palette values still sit at both ends of the scroll.
const TEXT_SWAP = 0.558;
const TEXT_RAMP = 0.3;

type Channels = string;

const BLACK: Channels = '0 0 0';
const WHITE: Channels = '255 255 255';

const LIGHT = {
  bg: '251 247 239',
  fg: '32 27 23',
  heading: '61 46 34',
  muted: '138 118 100',
  subtle: '123 98 75',
  accent: '90 58 40',
  line: '61 46 34',
  halo: '251 247 239',
};

const DARK = {
  bg: '16 14 13',
  fg: '231 223 210',
  heading: '248 244 236',
  muted: '196 184 170',
  subtle: '212 178 148',
  accent: '214 170 140',
  line: '248 244 236',
  halo: '16 14 13',
};

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

function parseChannels(value: Channels): [number, number, number] {
  const [r, g, b] = value.split(' ').map(Number);
  return [r, g, b];
}

function mixChannels(from: Channels, to: Channels, t: number): Channels {
  const a = parseChannels(from);
  const b = parseChannels(to);
  return `${Math.round(lerp(a[0], b[0], t))} ${Math.round(lerp(a[1], b[1], t))} ${Math.round(lerp(a[2], b[2], t))}`;
}

// Contrast-safe text color for a given background progress: ramp to black, snap to white,
// then ease to the dark-end palette color.
function pageColor(lightCh: Channels, darkCh: Channels, dv: number): Channels {
  if (dv <= 0) return lightCh;
  if (dv >= 1) return darkCh;
  if (dv < TEXT_SWAP) {
    return mixChannels(lightCh, BLACK, clamp01(dv / TEXT_RAMP));
  }
  return mixChannels(WHITE, darkCh, clamp01((dv - TEXT_SWAP) / TEXT_RAMP));
}

export default function DarkNarrativeChapter() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  // A 100svh element. Its measured height is the unit for every "vh" above, so the scroll math
  // matches the svh based layout even when window.innerHeight changes (mobile browser toolbars).
  const unitRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  const warningOpacity = useMotionValue(1);
  const warningVisibility = useMotionValue<'visible' | 'hidden'>('visible');
  const imageOpacity = useMotionValue(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const docStyle = document.documentElement.style;
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = unitRef.current?.offsetHeight || window.innerHeight || 1;
      const scrolled = -root.getBoundingClientRect().top;

      const warningOuterPx = (WARNING_PIN_VH / 100) * vh + vh;
      const warningHoldPx = (WARNING_PIN_VH / 100) * vh;
      const warningFadePx = (WARNING_FADE_SCROLL_VH / 100) * vh;
      const darkCompletePx = (DARKEN_COMPLETE_SCROLL_VH / 100) * vh;
      const trackPx = (IMAGE_TRACK_VH / 100) * vh;
      const returnPx = (RETURN_LIGHT_SCROLL_VH / 100) * vh;

      const trackStart = (IMAGE_TRACK_START_VH / 100) * vh;
      const trackEnd = trackStart + trackPx;
      const secretStart = trackEnd;
      // Light returns across the secret section. A return placed after the section would
      // need a ~200vh empty gap, otherwise the next section's translucent body text sits
      // on the half-lit background during the fade. Text switches to black before the
      // background gets light, so this range stays above AA.
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

      // One scroll-linked source for every color on the home page.
      docStyle.setProperty('--page-bg', mixChannels(LIGHT.bg, DARK.bg, darkValue));
      docStyle.setProperty('--page-fg', pageColor(LIGHT.fg, DARK.fg, darkValue));
      docStyle.setProperty('--page-heading', pageColor(LIGHT.heading, DARK.heading, darkValue));
      docStyle.setProperty('--page-muted', pageColor(LIGHT.muted, DARK.muted, darkValue));
      docStyle.setProperty('--page-subtle', pageColor(LIGHT.subtle, DARK.subtle, darkValue));
      docStyle.setProperty('--page-accent', pageColor(LIGHT.accent, DARK.accent, darkValue));
      docStyle.setProperty('--page-line', pageColor(LIGHT.line, DARK.line, darkValue));
      docStyle.setProperty('--page-halo', mixChannels(LIGHT.halo, DARK.halo, darkValue));

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
      for (const key of [
        '--page-bg',
        '--page-fg',
        '--page-heading',
        '--page-muted',
        '--page-subtle',
        '--page-accent',
        '--page-line',
        '--page-halo',
      ]) {
        docStyle.removeProperty(key);
      }
    };
  }, [reducedMotion, warningOpacity, warningVisibility, imageOpacity]);

  return (
    <div ref={rootRef} className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-[5]"
        style={{ backgroundColor: 'rgb(var(--page-bg))' }}
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
            }}
          >
            <motion.h2 className="mt-6 font-display text-5xl leading-[0.92] text-[rgb(var(--page-heading))] sm:text-6xl md:text-7xl lg:text-8xl">
              BEWARE THE WITCH HUNTER
            </motion.h2>
            <motion.p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[rgb(var(--page-subtle))] sm:text-lg sm:leading-9">
              Every remedy you offer and every kindness at the counter carries a risk. In Brairwick, suspicion can turn
              gratitude into fear, and a healer&apos;s secret can become a sentence.
            </motion.p>
          </motion.div>
        </section>
      </div>

      <section
        aria-label="Game over image"
        className="relative"
        style={{ height: `${IMAGE_TRACK_VH}svh`, marginTop: `${-IMAGE_TRACK_PULL_UP_VH}svh` }}
      >
        <div ref={unitRef} className="sticky top-0 h-[100svh] w-full overflow-hidden">
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
            <h2 className="font-display text-4xl leading-tight text-[rgb(var(--page-heading))] sm:text-5xl lg:text-6xl">
              A Secret Revealed. A Life Lost.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[rgb(var(--page-fg))] sm:text-lg sm:leading-9">
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