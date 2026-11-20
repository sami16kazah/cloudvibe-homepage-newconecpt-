import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { NAV_SECTIONS } from '../data/cloudvibeData';

interface SectionAnchor {
  id: string;
  index: string;
  label: string;
  pct: number;
}

const EDGE_PAD = 14;
const TOP_OFFSET = 54; // matches --topbar-h

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export const ScrollRuler: React.FC = () => {
  const railRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragMovedRef = useRef(0);

  const [enabled, setEnabled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [viewportRatio, setViewportRatio] = useState(0.15);
  const [viewportTopRatio, setViewportTopRatio] = useState(0);
  const [vh, setVh] = useState(900);
  const [anchors, setAnchors] = useState<SectionAnchor[]>([]);
  const [hovering, setHovering] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [ghostPct, setGhostPct] = useState<number | null>(null);

  // Enable precision ruler scrollbar on desktop viewports (>= 1024px)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => {
      const on = mq.matches;
      setEnabled(on);
      document.documentElement.setAttribute('data-ruler', on ? 'on' : 'off');
    };
    sync();
    mq.addEventListener('change', sync);
    return () => {
      mq.removeEventListener('change', sync);
      document.documentElement.removeAttribute('data-ruler');
    };
  }, []);

  // Measure document height, viewport height, and section anchor percentages
  const measureGeometry = useCallback(() => {
    const docH = Math.max(1, document.documentElement.scrollHeight);
    const winH = window.innerHeight || 900;
    const maxScroll = Math.max(1, docH - winH);
    const scrollY = window.scrollY;

    setVh(winH);
    setScrollPct(clamp01(scrollY / maxScroll));
    setViewportRatio(Math.min(1, winH / docH));
    setViewportTopRatio(clamp01(scrollY / docH));

    const nextAnchors: SectionAnchor[] = [];
    for (const sec of NAV_SECTIONS) {
      const el = document.getElementById(sec.id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top + scrollY;
      nextAnchors.push({
        id: sec.id,
        index: sec.index,
        label: sec.label.toUpperCase(),
        pct: clamp01(top / maxScroll),
      });
    }
    setAnchors(nextAnchors);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    measureGeometry();

    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const docH = Math.max(1, document.documentElement.scrollHeight);
        const winH = window.innerHeight || 900;
        const maxScroll = Math.max(1, docH - winH);
        const scrollY = window.scrollY;
        setScrollPct(clamp01(scrollY / maxScroll));
        setViewportRatio(Math.min(1, winH / docH));
        setViewportTopRatio(clamp01(scrollY / docH));
      });
    };

    const ro = new ResizeObserver(measureGeometry);
    ro.observe(document.body);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measureGeometry, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measureGeometry);
    };
  }, [enabled, measureGeometry]);

  const base = TOP_OFFSET + EDGE_PAD;
  const span = Math.max(1, vh - TOP_OFFSET - EDGE_PAD * 2);

  const clientYToPct = useCallback(
    (clientY: number) => clamp01((clientY - base) / span),
    [base, span],
  );

  const scrollToPct = useCallback((pct: number, smooth: boolean) => {
    const docH = Math.max(1, document.documentElement.scrollHeight);
    const maxScroll = Math.max(1, docH - window.innerHeight);
    window.scrollTo({
      top: clamp01(pct) * maxScroll,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, []);

  // Global pointerup/move while dragging the ruler scrubber
  useEffect(() => {
    if (!enabled) return;

    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      dragMovedRef.current = Math.max(
        dragMovedRef.current,
        Math.abs(e.clientY - dragStartYRef.current),
      );
      const pct = clientYToPct(e.clientY);
      setGhostPct(pct);
      scrollToPct(pct, false);
    };

    const onPointerUp = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      setDragging(false);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [enabled, clientYToPct, scrollToPct]);

  // Calibrated ruler ticks (every 2%, major labels every 10%)
  const ticks = useMemo(() => {
    const list: { pct: number; major: boolean; mid: boolean }[] = [];
    for (let p = 0; p <= 100; p += 2) {
      list.push({
        pct: p / 100,
        major: p % 10 === 0,
        mid: p % 10 === 5 || p % 10 === 4,
      });
    }
    return list;
  }, []);

  if (!enabled) return null;

  const pctRounded = Math.round(scrollPct * 100);
  const digits = String(pctRounded).padStart(3, '0');
  const needleY = base + scrollPct * span;
  const readoutAbove = needleY > vh - 34;

  // Determine hovered section name for ghost crosshair preview
  const activeGhostSection =
    ghostPct !== null
      ? anchors.reduce<SectionAnchor | null>((acc, item) => {
          if (item.pct <= ghostPct + 0.02) return item;
          return acc;
        }, anchors[0] ?? null)
      : null;

  const bracketTop = base + viewportTopRatio * span;
  const bracketHeight = Math.max(26, viewportRatio * span);
  const isZoomed = hovering || dragging;

  return (
    <div
      ref={railRef}
      role="scrollbar"
      aria-controls="main-content"
      aria-orientation="vertical"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pctRounded}
      aria-label="Seitenposition"
      tabIndex={0}
      className={`cv-scroll-ruler ${isZoomed ? 'is-active' : ''} ${dragging ? 'is-dragging' : ''}`}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => {
        setHovering(false);
        if (!draggingRef.current) setGhostPct(null);
      }}
      onPointerMove={(e) => {
        setGhostPct(clientYToPct(e.clientY));
      }}
      onPointerDown={(e) => {
        e.preventDefault();
        draggingRef.current = true;
        dragStartYRef.current = e.clientY;
        dragMovedRef.current = 0;
        setDragging(true);
        const pct = clientYToPct(e.clientY);
        setGhostPct(pct);
        scrollToPct(pct, false);
      }}
      onClick={(e) => {
        if (dragMovedRef.current > 4) return;
        scrollToPct(clientYToPct(e.clientY), true);
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          scrollToPct(scrollPct + 0.08, true);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          scrollToPct(scrollPct - 0.08, true);
        } else if (e.key === 'Home') {
          e.preventDefault();
          scrollToPct(0, true);
        } else if (e.key === 'End') {
          e.preventDefault();
          scrollToPct(1, true);
        }
      }}
    >
      {/* Subtle hairline spine */}
      <div className="cv-ruler-spine" aria-hidden="true" />

      {/* Calibrated Tick Marks (ArtCraft precision instrument aesthetic) */}
      <div className="cv-ruler-ticks" aria-hidden="true">
        {ticks.map((t) => {
          const y = base + t.pct * span;
          return (
            <div
              key={t.pct}
              className={`cv-ruler-tick ${t.major ? 'is-major' : ''}`}
              style={{ transform: `translate3d(0, ${y}px, 0)` }}
            >
              <span className="cv-ruler-tick-line" />
              {t.major && (
                <span className="cv-ruler-tick-num">{Math.round(t.pct * 100)}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Section Anchor Markers */}
      <div className="cv-ruler-anchors" aria-hidden="true">
        {anchors.map((a) => {
          const y = base + a.pct * span;
          const isPassed = scrollPct >= a.pct - 0.02;
          return (
            <div
              key={a.id}
              className={`cv-ruler-anchor ${isPassed ? 'is-passed' : ''}`}
              style={{ transform: `translate3d(0, ${y}px, 0)` }}
            >
              <span className="cv-ruler-anchor-dot" />
              <span className="cv-ruler-anchor-label">{a.index}</span>
            </div>
          );
        })}
      </div>

      {/* Viewport Window Bracket (illuminates on hover/drag) */}
      <div
        className="cv-ruler-viewport-bracket"
        aria-hidden="true"
        style={{
          transform: `translate3d(0, ${bracketTop}px, 0)`,
          height: `${bracketHeight}px`,
        }}
      />

      {/* Pointer Ghost Crosshair & Section Preview Tooltip */}
      {ghostPct !== null && (
        <div
          className="cv-ruler-ghost"
          aria-hidden="true"
          style={{ transform: `translate3d(0, ${base + ghostPct * span}px, 0)` }}
        >
          <span className="cv-ruler-ghost-line" />
          {activeGhostSection && (
            <span className="cv-ruler-ghost-tip">
              <em>{activeGhostSection.index}</em>
              <strong>{activeGhostSection.label}</strong>
              <span>{Math.round(ghostPct * 100)}%</span>
            </span>
          )}
        </div>
      )}

      {/* Live Glowing Needle + Mechanical Rolling Odometer Digits */}
      <div
        className={`cv-ruler-needle ${readoutAbove ? 'is-above' : ''}`}
        aria-hidden="true"
        style={{ transform: `translate3d(0, ${needleY}px, 0)` }}
      >
        <span className="cv-ruler-needle-line" />
        <span className="cv-ruler-readout">
          <span className="cv-ruler-digits">
            {[0, 1, 2].map((colIdx) => {
              const digit = Number(digits[colIdx]);
              return (
                <span
                  key={colIdx}
                  className="cv-ruler-digit-col"
                  style={{ transform: `translateY(${-digit}em)` }}
                >
                  {'0123456789'.split('').map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </span>
              );
            })}
          </span>
          <span className="cv-ruler-pct-sign">%</span>
        </span>
      </div>
    </div>
  );
};
