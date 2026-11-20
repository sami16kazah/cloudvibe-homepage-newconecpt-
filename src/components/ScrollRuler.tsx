import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { NAV_SECTIONS } from '../data/cloudvibeData';

interface SectionMetric {
  id: string;
  index: string;
  label: string;
  anchor: number;
  bottom: number;
  pct: number;
}

const EDGE_PAD = 14;
const TOP_OFFSET = 54;
const RAIL_W = 54;

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const RULER_LABELS: Record<string, string> = {
  hero: 'CLOUDVIBE',
  ueberblick: 'ÜBERBLICK',
  loesungen: 'LÖSUNGEN',
  architektur: 'ARCHITEKTUR',
  vorteile: 'VORTEILE',
  referenzen: 'TEAM & PRAXIS',
  kontakt: 'KONTAKT',
};

// Proportional character width weights (relative to 1em) for crisp Archivo kerning
const charAdvance = (ch: string): number => {
  if (ch === ' ') return 0.36;
  if (ch === 'I' || ch === 'l' || ch === '1') return 0.42;
  if (ch === 'J' || ch === 'L' || ch === 'T' || ch === 'F') return 0.64;
  if (ch === 'M' || ch === 'W') return 0.96;
  if (ch === '&') return 0.84;
  return 0.74;
};

const buildCumulativePositions = (word: string, unitPx: number): number[] => {
  const chars = word.split('');
  const widths = chars.map((ch) => charAdvance(ch) * unitPx);
  const total = widths.reduce((sum, w) => sum + w, 0);
  // Distance from right edge for each character's center
  const offsets: number[] = [];
  let cursor = 0;
  for (let i = 0; i < chars.length; i++) {
    const centerFromLeft = cursor + widths[i] * 0.5;
    offsets.push(total - centerFromLeft);
    cursor += widths[i];
  }
  return offsets;
};

export const ScrollRuler: React.FC = () => {
  const railRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragMovedRef = useRef(0);

  // Refs for smooth 60fps per-letter curved-arc transforms without React re-render jank
  const letterRefs = useRef<(HTMLSpanElement | null)[][]>([]);
  const wordButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const metricsRef = useRef<SectionMetric[]>([]);
  const geomRef = useRef({ docH: 1, vh: 900 });

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [viewportRatio, setViewportRatio] = useState(0.12);
  const [viewportTopRatio, setViewportTopRatio] = useState(0);
  const [vh, setVh] = useState(900);
  const [anchors, setAnchors] = useState<SectionMetric[]>([]);
  const [hovering, setHovering] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [ghostPct, setGhostPct] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const sections = useMemo(
    () =>
      NAV_SECTIONS.map((s) => ({
        ...s,
        display: RULER_LABELS[s.id] ?? s.label.toUpperCase(),
      })),
    [],
  );

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

  const measureGeometry = useCallback(() => {
    const docH = Math.max(1, document.documentElement.scrollHeight);
    const winH = window.innerHeight || 900;
    const maxScroll = Math.max(1, docH - winH);
    const scrollY = window.scrollY;

    geomRef.current = { docH, vh: winH };
    setVh(winH);

    const next: SectionMetric[] = [];
    for (const sec of sections) {
      const el = document.getElementById(sec.id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const anchor = rect.top + scrollY;
      next.push({
        id: sec.id,
        index: sec.index,
        label: sec.display,
        anchor,
        bottom: rect.bottom + scrollY,
        pct: clamp01(anchor / maxScroll),
      });
    }
    metricsRef.current = next;
    setAnchors(next);
  }, [sections]);

  // Compute per-letter curved-arc positions (ArtCraft kinetic bottom-queue -> vertical rail -> top-active -> top-pile)
  const updateKineticLabels = useCallback(() => {
    const list = metricsRef.current;
    const { docH, vh: winH } = geomRef.current;
    if (!list.length || !winH) return;

    const scrollY = window.scrollY;
    const maxScroll = Math.max(1, docH - winH);
    const p = clamp01(scrollY / maxScroll);

    // Reveal the ruler ONLY after scrolling down past the initial hero top
    const shouldShow = scrollY > 110 || p > 0.014;
    setVisible(shouldShow);
    setScrollPct(p);
    setViewportRatio(Math.min(1, winH / docH));
    setViewportTopRatio(clamp01(scrollY / docH));

    // Layout constants for the kinetic typography column right next to the tick rail
    const rightEdge = RAIL_W + 14; // px from right viewport edge
    const flipLineY = TOP_OFFSET + winH * 0.13;
    const flipZone = 220;
    const detachZone = 260;
    const topPileStart = TOP_OFFSET + 20;
    const slotGap = 20;
    const currentGap = 24;
    const queueBottomPad = 28;
    const staggerFrac = 0.16;
    const arcBow = 30;

    // Determine active section index (latest section whose anchor crossed the flip line)
    let curIdx = 0;
    for (let i = 0; i < list.length; i++) {
      const relY = list[i].anchor - scrollY;
      if (relY <= flipLineY + flipZone * 0.35) {
        curIdx = i;
      }
    }
    setActiveIndex(curIdx);

    // Count queued items below current to compute clean bottom-stack slots
    const total = list.length;

    for (let sIdx = 0; sIdx < total; sIdx++) {
      const sec = list[sIdx];
      const letters = letterRefs.current[sIdx];
      const btn = wordButtonRefs.current[sIdx];
      if (!letters || !letters.length) continue;

      const chars = sec.label.split('');
      const n = chars.length;

      // Section vertical coordinate relative to viewport
      const secViewY = sec.anchor - scrollY;

      // Bottom queue resting Y for this section (counted from bottom up)
      const queueOrderFromBottom = total - 1 - sIdx;
      const queueY = winH - queueBottomPad - queueOrderFromBottom * slotGap;

      // Top pile / active heading Y for this section
      const isPassed = sIdx < curIdx;
      const isCurrent = sIdx === curIdx;
      const topY = isCurrent
        ? topPileStart + curIdx * slotGap + currentGap
        : topPileStart + sIdx * slotGap;

      // Compute transitions:
      // 1) detachT: 0 (sitting horizontally in bottom queue) -> 1 (riding vertically on rail)
      // 2) flipT: 0 (riding vertically on rail) -> 1 (horizontal in top active / pile)
      let detachT = 0;
      let flipT = 0;

      if (sIdx === 0) {
        // First section starts already settled at the top once scrolled
        detachT = 1;
        flipT = 1;
      } else {
        const detachStart = queueY + detachZone * 0.55;
        const detachEnd = queueY - detachZone * 0.45;
        detachT = clamp01((detachStart - secViewY) / Math.max(1, detachStart - detachEnd));

        const flipStart = flipLineY + flipZone;
        const flipEnd = flipLineY;
        flipT = clamp01((flipStart - secViewY) / Math.max(1, flipStart - flipEnd));
      }

      // Proportional character offsets for razor-even Archivo kerning
      const queueOffsets = buildCumulativePositions(sec.label, 12.2);
      const topOffsets = buildCumulativePositions(sec.label, isCurrent ? 19.6 : 11.4);
      const rideOffsets = buildCumulativePositions(sec.label, 15.2);
      const rideTotal = rideOffsets.length ? rideOffsets[0] + 6 : 0;
      const rideYBase = Math.max(
        flipLineY + 24,
        Math.min(queueY - 24, secViewY),
      );

      // Update button hit-area roughly to match resting horizontal state for click navigation
      if (btn) {
        const targetBtnY = flipT > 0.5 ? topY : detachT < 0.5 ? queueY : rideYBase;
        btn.style.transform = `translate3d(0, ${targetBtnY - 10}px, 0)`;
        btn.dataset.state = isCurrent
          ? 'current'
          : isPassed
            ? 'passed'
            : detachT > 0.05 && flipT < 0.95
              ? 'riding'
              : 'queued';
      }

      const spanWindow = Math.max(0.25, 1 - staggerFrac * Math.max(1, n - 1) * 0.35);

      for (let c = 0; c < n; c++) {
        const el = letters[c];
        if (!el) continue;

        // Per-letter staggered progress
        const letterDelay = n > 1 ? (c / (n - 1)) * (1 - spanWindow) : 0;

        // Horizontal right-aligned coordinate in bottom queue (distance from right edge)
        const queueRightX = rightEdge + queueOffsets[c];

        // Vertical riding coordinate along the tick rail (rotated -90deg)
        const rideRightX = rightEdge + 2;
        const rideY = rideYBase + rideOffsets[c] - rideTotal * 0.5;

        // Horizontal right-aligned coordinate in top active / top pile
        const topRightX = rightEdge + topOffsets[c];

        let xFromRight = queueRightX;
        let y = queueY;
        let rot = 0;
        let scale = 0.88;
        let opacity = 0.38;

        if (flipT > 0) {
          // Morph from vertical rail (-90deg) -> horizontal top slot (0deg) along curved inward arc
          const raw = clamp01((flipT - letterDelay) / spanWindow);
          const t = easeInOutCubic(raw);
          const arc = Math.sin(t * Math.PI) * arcBow;

          xFromRight = rideRightX + (topRightX - rideRightX) * t + arc;
          y = rideY + (topY - rideY) * t;
          rot = -90 * (1 - t);
          const targetScale = isCurrent ? 1.38 : 0.78;
          scale = 1.02 + (targetScale - 1.02) * t;
          const targetOpacity = isCurrent ? 1 : 0.42;
          opacity = 0.62 + (targetOpacity - 0.62) * t;
        } else if (detachT > 0) {
          // Morph from horizontal bottom queue (0deg) -> vertical rail (-90deg) along curved inward arc
          const raw = clamp01((detachT - letterDelay) / spanWindow);
          const t = easeInOutCubic(raw);
          const arc = Math.sin(t * Math.PI) * arcBow;

          xFromRight = queueRightX + (rideRightX - queueRightX) * t + arc;
          y = queueY + (rideY - queueY) * t;
          rot = -90 * t;
          scale = 0.88 + (1.02 - 0.88) * t;
          opacity = 0.38 + (0.64 - 0.38) * t;
        }

        el.style.transform = `translate3d(${-xFromRight}px, ${y}px, 0) rotate(${rot}deg) scale(${scale})`;
        el.style.opacity = String(opacity);
      }
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    measureGeometry();
    updateKineticLabels();

    let rafId = 0;
    const schedule = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        updateKineticLabels();
      });
    };

    const onResize = () => {
      measureGeometry();
      schedule();
    };

    const ro = new ResizeObserver(() => {
      measureGeometry();
      schedule();
    });
    ro.observe(document.body);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', onResize);
    };
  }, [enabled, measureGeometry, updateKineticLabels]);

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

  const jumpToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // Global pointer drag scrubbing
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

  const ticks = useMemo(() => {
    const list: { pct: number; major: boolean }[] = [];
    for (let p = 0; p <= 100; p += 2) {
      list.push({ pct: p / 100, major: p % 10 === 0 });
    }
    return list;
  }, []);

  if (!enabled) return null;

  const pctRounded = Math.round(scrollPct * 100);
  const digits = String(pctRounded).padStart(3, '0');
  const needleY = base + scrollPct * span;
  const readoutAbove = needleY > vh - 34;

  const activeGhostSection =
    ghostPct !== null
      ? anchors.reduce<SectionMetric | null>((acc, item) => {
          if (item.pct <= ghostPct + 0.02) return item;
          return acc;
        }, anchors[0] ?? null)
      : null;

  const bracketTop = base + viewportTopRatio * span;
  const bracketHeight = Math.max(26, viewportRatio * span);
  const isZoomed = hovering || dragging;

  return (
    <div className={`cv-ruler-shell ${visible ? 'is-visible' : ''}`}>
      {/* Soft feathered backdrop pools behind top & bottom kinetic section names */}
      <div className="cv-ruler-pool-top" aria-hidden="true" />
      <div className="cv-ruler-pool-bottom" aria-hidden="true" />

      {/* ArtCraft Kinetic Per-Letter Curved-Arc Section Names */}
      <div className="cv-ruler-words-layer" aria-label="Abschnitts-Navigation am Seitenrand">
        {sections.map((sec, sIdx) => {
          if (!letterRefs.current[sIdx]) letterRefs.current[sIdx] = [];
          const isCurrent = sIdx === activeIndex;
          return (
            <React.Fragment key={sec.id}>
              {/* Clickable transparent hit bar for jumping to this section */}
              <button
                ref={(el) => {
                  wordButtonRefs.current[sIdx] = el;
                }}
                type="button"
                className="cv-ruler-word-hit"
                onClick={() => jumpToSection(sec.id)}
                aria-label={`Zu Abschnitt ${sec.display} springen`}
                title={`${sec.index} · ${sec.display}`}
              />

              {/* Individual animated letters that bow inward along a Bézier arc */}
              {sec.display.split('').map((ch, cIdx) => (
                <span
                  key={`${sec.id}-${cIdx}`}
                  ref={(el) => {
                    letterRefs.current[sIdx][cIdx] = el;
                  }}
                  aria-hidden="true"
                  className={`cv-ruler-letter ${isCurrent ? 'is-current' : ''}`}
                >
                  {ch === ' ' ? '\u00A0' : ch}
                </span>
              ))}
            </React.Fragment>
          );
        })}
      </div>

      {/* Right-Edge Precision Tick Rail & Scrubber */}
      <div
        ref={railRef}
        role="scrollbar"
        aria-controls="main-content"
        aria-orientation="vertical"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pctRounded}
        aria-label="Seitenposition"
        tabIndex={visible ? 0 : -1}
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
        {/* Calibrated Tick Marks */}
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

        {/* Section Anchor Dots */}
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
              </div>
            );
          })}
        </div>

        {/* Viewport Window Minimap Bracket */}
        <div
          className="cv-ruler-viewport-bracket"
          aria-hidden="true"
          style={{
            transform: `translate3d(0, ${bracketTop}px, 0)`,
            height: `${bracketHeight}px`,
          }}
        />

        {/* Pointer Crosshair Ghost + Section Preview Tooltip */}
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
    </div>
  );
};
