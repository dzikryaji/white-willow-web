'use client';

import { useCallback, useEffect, useRef, type CSSProperties, type HTMLAttributes } from 'react';

import './ScrollExpand.css';

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

interface ScrollExpandProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  src?: string;
  mediaType?: 'image' | 'video';
  alt?: string;
  poster?: string;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  fromOpacity?: number;
  toOpacity?: number;
  useWindowScroll?: boolean;
  enabled?: boolean;
  className?: string;
  mediaClassName?: string;
  style?: CSSProperties;
}

const ScrollExpand = ({
  src = '',
  mediaType = 'image',
  alt = '',
  poster = '',
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  fromOpacity = 0,
  toOpacity = 1,
  useWindowScroll = true,
  enabled = true,
  className = '',
  mediaClassName = '',
  style,
  ...rest
}: ScrollExpandProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement | null>(null);

  const propsRef = useRef({
    scrollDistance,
    holdDistance,
    smoothing,
    fromOpacity,
    toOpacity,
    useWindowScroll,
    enabled,
  });

  useEffect(() => {
    propsRef.current = {
      scrollDistance,
      holdDistance,
      smoothing,
      fromOpacity,
      toOpacity,
      useWindowScroll,
      enabled,
    };
  });

  const applyProgress = useCallback((p: number) => {
    const media = mediaRef.current;
    if (!media) return;
    const c = propsRef.current;
    const e = smoothstep(0, 1, p);
    const opacity = c.fromOpacity + (c.toOpacity - c.fromOpacity) * e;
    media.style.opacity = `${opacity}`;
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let current = 0;
    let target = 0;
    let stageH = 0;
    let running = false;

    const measure = () => {
      const c = propsRef.current;
      stageH = c.useWindowScroll ? window.innerHeight : root.clientHeight;
      if (stageH <= 0) return;
      stage.style.height = `${stageH}px`;
      track.style.height = `${stageH * (1 + Math.max(0, c.scrollDistance) + Math.max(0, c.holdDistance))}px`;
    };

    const readProgress = () => {
      const c = propsRef.current;
      if (!c.enabled) return 1;
      if (reduceMotion) return 1;
      const span = stageH * Math.max(0.01, c.scrollDistance);
      if (c.useWindowScroll) {
        const top = track.getBoundingClientRect().top;
        return clamp(-top / span, 0, 1);
      }
      return clamp(root.scrollTop / span, 0, 1);
    };

    const tick = () => {
      const c = propsRef.current;
      const k = c.smoothing <= 0 || reduceMotion ? 1 : 1 - Math.exp(-1 / (60 * c.smoothing));
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }
      applyProgress(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) return;
      running = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      if (propsRef.current.smoothing <= 0 || reduceMotion) {
        current = target;
        applyProgress(current);
        return;
      }
      kick();
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    measure();
    target = readProgress();
    current = target;
    applyProgress(current);

    const scroller: Window | HTMLElement = useWindowScroll ? window : root;
    scroller.addEventListener('scroll', onScroll, { passive: true } as AddEventListenerOptions);
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(root);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, [applyProgress, useWindowScroll]);

  const media =
    mediaType === 'video' ? (
      <video
        ref={mediaRef as React.RefObject<HTMLVideoElement>}
        className={`scroll-expand__media ${mediaClassName}`.trim()}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
      />
    ) : (
      // eslint-disable-next-line @next/next/no-img-element -- ScrollExpand keeps original image dimensions and direct scroll-driven opacity control.
      <img
        ref={mediaRef as React.RefObject<HTMLImageElement>}
        className={`scroll-expand__media ${mediaClassName}`.trim()}
        src={src}
        alt={alt}
        draggable={false}
      />
    );

  return (
    <div
      ref={rootRef}
      className={`scroll-expand ${useWindowScroll ? '' : 'scroll-expand--scroller'} ${className}`.trim()}
      style={style}
      {...rest}
    >
      <div ref={trackRef} className="scroll-expand__track">
        <div ref={stageRef} className="scroll-expand__stage">
          <div className="scroll-expand__frame">{media}</div>
        </div>
      </div>
    </div>
  );
};

export default ScrollExpand;
