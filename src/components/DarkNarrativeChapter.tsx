'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollExpand from '@/components/ScrollExpand';
import AnimatedContent from '@/components/AnimatedContent';

gsap.registerPlugin(ScrollTrigger);

function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function mixRgb(from: [number, number, number], to: [number, number, number], t: number) {
  const r = Math.round(lerp(from[0], to[0], t));
  const g = Math.round(lerp(from[1], to[1], t));
  const b = Math.round(lerp(from[2], to[2], t));
  return `rgb(${r}, ${g}, ${b})`;
}

function mixRgba(
  from: [number, number, number, number],
  to: [number, number, number, number],
  t: number,
) {
  const r = Math.round(lerp(from[0], to[0], t));
  const g = Math.round(lerp(from[1], to[1], t));
  const b = Math.round(lerp(from[2], to[2], t));
  const a = lerp(from[3], to[3], t);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export default function DarkNarrativeChapter() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [reduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const update = () => {
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = Math.max(root.offsetHeight - vh, 1);
      const scrolled = clamp01(-rect.top / total);
      let p = 0;
      if (scrolled < 0.18) {
        p = clamp01(scrolled / 0.18);
      } else if (scrolled < 0.82) {
        p = 1;
      } else {
        p = 1 - clamp01((scrolled - 0.82) / 0.18);
      }
      setProgress(reduce ? (scrolled > 0.05 && scrolled < 0.95 ? 1 : 0) : p);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    const st = ScrollTrigger.create({ trigger: root, start: 'top bottom', end: 'bottom top', onUpdate: update });

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      st.kill();
    };
  }, []);

  const p = progress;
  const bg = mixRgb([251, 247, 239], [18, 16, 14], p);
  const fg = mixRgb([32, 27, 23], [245, 241, 232], p);
  const heading = mixRgb([61, 46, 34], [248, 244, 236], p);
  const muted = mixRgb([123, 98, 75], [190, 176, 160], p);
  const accent = mixRgb([90, 58, 40], [214, 168, 132], p);
  const border = mixRgba([90, 70, 52, 0.22], [245, 241, 232, 0.18], p);

  return (
    <div ref={rootRef} className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-[5] transition-opacity duration-0"
        style={{ backgroundColor: bg, opacity: 1 }}
      />
      <div
        style={{
          color: fg,
          ['--ch-fg' as string]: fg,
          ['--ch-heading' as string]: heading,
          ['--ch-muted' as string]: muted,
          ['--ch-accent' as string]: accent,
          ['--ch-border' as string]: border,
        }}
      >
        <section className="px-3 py-24 sm:px-5 sm:py-32 lg:px-6 lg:py-40">
          <div className="mx-auto max-w-5xl text-center">
            <p
              className="text-xs font-semibold uppercase tracking-[0.3em] sm:text-sm"
              style={{ color: accent }}
            >
              A warning carried on the wind
            </p>
            <h2
              className="mt-6 font-display text-5xl leading-[0.92] sm:text-6xl md:text-7xl lg:text-8xl"
              style={{ color: heading }}
            >
              BEWARE THE WITCH HUNTER
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-8 sm:text-lg sm:leading-9" style={{ color: muted }}>
              Every remedy you offer, every kind word at the counter, carries a risk. In Brairwick, suspicion can turn
              gratitude into fear, and a healer&apos;s secret can become a sentence.
            </p>
          </div>
        </section>

        <section className="relative min-h-[100svh]">
          <div className="mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-3 py-16 sm:px-5 lg:px-6">
            <div className="w-full max-w-4xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] sm:text-sm" style={{ color: accent }}>
                If the secret is uncovered
              </p>
              <h3 className="mt-4 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl" style={{ color: heading }}>
                A Secret Revealed. A Life Lost.
              </h3>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 sm:text-lg" style={{ color: muted }}>
                You have spent your days helping the villagers while keeping your magic hidden. But suspicion has finally
                caught up with you. The witch hunter has uncovered your secret, and the village turns against the very
                healer it once welcomed. Your journey ends in flames.
              </p>
            </div>
            <div className="mt-10 w-full">
              <ScrollExpand
                src="/images/approved/gameover-witch-burned.jpg"
                alt="A tragic game over scene showing the consequence of being discovered as a witch"
                useWindowScroll
                scrollDistance={0.9}
                holdDistance={0.25}
                smoothing={reduced ? 0 : 0.12}
                enabled={!reduced}
                className="w-full"
                mediaClassName="max-h-[62svh] w-auto max-w-[min(100%,56rem)]"
              />
            </div>
          </div>
        </section>

        <section className="px-3 py-20 sm:px-5 sm:py-28 lg:px-6 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <AnimatedContent distance={28} duration={0.8} threshold={0.2}>
              <p className="text-base leading-8 sm:text-lg" style={{ color: muted }}>
                But the story does not have to end this way. With care, memory, and courage, you can keep the shop open
                and the secret safe for one more day.
              </p>
            </AnimatedContent>
          </div>
        </section>
      </div>
    </div>
  );
}
