import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDownRight, Calendar, Grid2x2, Mail, Phone } from 'lucide-react';
import {
  CLOUDVIBE_CONTACT,
  SERVICES,
  type CloudVibeService,
} from '../data/cloudvibeData';
import { CloudVibeLogo } from './CloudVibeLogo';
import { ServiceIcon } from './ServiceIcon';

interface OrbitalHeroProps {
  onSelectService: (service: CloudVibeService) => void;
  onNavigate: (id: string) => void;
  onOpenBooking: () => void;
}

interface OrbitItem {
  service: CloudVibeService;
  ring: 0 | 1 | 2;
  baseAngle: number;
  speed: number;
  depth: number;
}

export const OrbitalHero: React.FC<OrbitalHeroProps> = ({
  onSelectService,
  onNavigate,
  onOpenBooking,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  const [stageSize, setStageSize] = useState({ width: 1280, height: 760 });
  const pointerTarget = useRef({ x: 0, y: 0 });
  const pointerSmooth = useRef({ x: 0, y: 0 });
  const pausedRef = useRef(false);

  const orbitItems: OrbitItem[] = useMemo(() => {
    const featured = SERVICES.filter((s) => s.featuredInOrbit).slice(0, 12);
    return featured.map((service, i) => {
      const ring = (i % 3) as 0 | 1 | 2;
      const indexInRing = Math.floor(i / 3);
      const countInRing = 4;
      const angleOffset = ring * 0.52 + 0.35;
      const baseAngle = (indexInRing / countInRing) * Math.PI * 2 + angleOffset;
      const speed = ring === 0 ? 0.00016 : ring === 1 ? -0.00012 : 0.000095;
      const depth = ring === 0 ? 1.0 : ring === 1 ? 0.92 : 0.85;
      return { service, ring, baseAngle, speed, depth };
    });
  }, []);

  useEffect(() => {
    pausedRef.current = hoveredId !== null;
  }, [hoveredId]);

  useEffect(() => {
    const updateSize = () => {
      if (!stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      setStageSize({ width: rect.width, height: rect.height });
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let rafId = 0;
    let lastTime = performance.now();
    let elapsed = 0;

    const frame = (now: number) => {
      const dt = Math.min(48, now - lastTime);
      lastTime = now;
      if (!pausedRef.current) {
        elapsed += dt;
      } else {
        elapsed += dt * 0.14;
      }
      pointerSmooth.current.x += (pointerTarget.current.x - pointerSmooth.current.x) * 0.06;
      pointerSmooth.current.y += (pointerTarget.current.y - pointerSmooth.current.y) * 0.06;
      setTick(elapsed);
      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    pointerTarget.current = { x: nx, y: ny };
  };

  const handlePointerLeave = () => {
    pointerTarget.current = { x: 0, y: 0 };
  };

  const isCompact = stageSize.width < 720;
  const cx = stageSize.width / 2;
  const cy = stageSize.height / 2;
  const minDim = Math.min(stageSize.width, stageSize.height);

  // Orbit radii tuned so icons form a clean, generous perimeter around the center logo & text
  const rings = isCompact
    ? [
        { rx: Math.max(176, stageSize.width * 0.49), ry: Math.max(305, stageSize.height * 0.42) },
        { rx: Math.max(212, stageSize.width * 0.59), ry: Math.max(350, stageSize.height * 0.48) },
        { rx: Math.max(248, stageSize.width * 0.69), ry: Math.max(395, stageSize.height * 0.54) },
      ]
    : [
        { rx: Math.max(410, Math.min(510, stageSize.width * 0.365)), ry: Math.max(310, minDim * 0.415) },
        { rx: Math.max(495, Math.min(625, stageSize.width * 0.44)), ry: Math.max(360, minDim * 0.485) },
        { rx: Math.max(585, Math.min(735, stageSize.width * 0.515)), ry: Math.max(415, minDim * 0.555) },
      ];

  const hoveredService = hoveredId
    ? SERVICES.find((s) => s.id === hoveredId) ?? null
    : null;

  const tickerItems = [
    'TELEKONNEKT-PARTNER',
    'TI-GATEWAY & KONNEKTOR',
    'KIM KOMMUNIKATION',
    'ARZTPRAXEN · APOTHEKEN · PFLEGE',
    'DATEV SUPPORT',
    'SELECTLINE ERP',
    'MANAGED FIREWALL & SECURITY',
    'DSGVO-KONFORMES DE-BACKUP',
    'Ø < 7 MIN. ANTWORTZEIT',
    'GOCH & DEUTSCHLANDWEIT',
  ];

  return (
    <section id="hero" className="cv-hero-section">
      <div
        ref={stageRef}
        className="cv-hero-stage"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {/* Ambient CloudVibe radial mesh aura */}
        <div className="cv-hero-aurora" aria-hidden="true" />

        {/* Architectural Concentric Orbital Rings with Precision Ticks (ArtCraft signature) */}
        <svg
          className="cv-orbit-svg"
          width={stageSize.width}
          height={stageSize.height}
          viewBox={`0 0 ${stageSize.width} ${stageSize.height}`}
          aria-hidden="true"
        >
          <g
            transform={`translate(${pointerSmooth.current.x * 12}, ${pointerSmooth.current.y * 8})`}
          >
            {/* Outer architectural reference rings */}
            {rings.map((r, idx) => {
              const rot = (tick * (idx % 2 === 0 ? 0.004 : -0.0032)) % 360;
              return (
                <g key={idx}>
                  <ellipse
                    cx={cx}
                    cy={cy}
                    rx={r.rx}
                    ry={r.ry}
                    fill="none"
                    className={`cv-orbit-ring cv-orbit-ring-${idx}`}
                  />
                  {/* Rotating luminous arc segment */}
                  <ellipse
                    cx={cx}
                    cy={cy}
                    rx={r.rx}
                    ry={r.ry}
                    fill="none"
                    stroke={idx === 0 ? 'var(--cv-green)' : idx === 1 ? 'var(--cv-cloud-blue)' : 'var(--cv-orange)'}
                    strokeOpacity="0.4"
                    strokeWidth="1.4"
                    strokeDasharray="68 920"
                    strokeDashoffset={-rot * 6}
                  />
                  {/* Calibrated hairline tick marks around ring */}
                  {Array.from({ length: 24 }).map((_, tIdx) => {
                    const a = (tIdx / 24) * Math.PI * 2 + (idx * 0.25);
                    const x1 = cx + Math.cos(a) * (r.rx - 4);
                    const y1 = cy + Math.sin(a) * (r.ry - 4);
                    const x2 = cx + Math.cos(a) * (r.rx + 4);
                    const y2 = cy + Math.sin(a) * (r.ry + 4);
                    return (
                      <line
                        key={tIdx}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        className="cv-orbit-tick"
                      />
                    );
                  })}
                </g>
              );
            })}

            {/* Subtle crosshair coordinate lines */}
            <line x1={cx} y1={24} x2={cx} y2={stageSize.height - 24} className="cv-orbit-axis" />
            <line x1={24} y1={cy} x2={stageSize.width - 24} y2={cy} className="cv-orbit-axis" />
          </g>
        </svg>

        {/* Orbiting Colorful Rounded-Square Service Icons (ArtCraft Hero Signature!) */}
        <div className="cv-orbit-icons-layer" aria-label="Interaktive cloudvibe Lösungen">
          {orbitItems.map((item) => {
            const r = rings[item.ring];
            const angle = item.baseAngle + tick * item.speed;
            const parallaxFactor = (3 - item.ring) * 8;
            const x =
              cx +
              Math.cos(angle) * r.rx +
              pointerSmooth.current.x * parallaxFactor;
            const y =
              cy +
              Math.sin(angle) * r.ry +
              pointerSmooth.current.y * parallaxFactor * 0.75;
            const isHovered = hoveredId === item.service.id;
            const scale = isHovered ? 1.18 : item.depth;
            const isHiddenOnTiny = isCompact && item.ring === 2;

            // Gentle soft veil if an icon passes near the center copy column on smaller screens
            const dxNorm = Math.abs(x - cx) / (isCompact ? 155 : 335);
            const dyNorm = Math.abs(y - cy) / (isCompact ? 230 : 250);
            const inTextZone = dxNorm < 1 && dyNorm < 1;
            const tileOpacity = isHovered ? 1 : inTextZone ? 0.22 : 1;

            if (isHiddenOnTiny) return null;

            return (
              <button
                key={item.service.id}
                type="button"
                className={`cv-orbit-tile ${isHovered ? 'is-hovered' : ''}`}
                style={{
                  transform: `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`,
                  opacity: tileOpacity,
                  '--tile-accent': item.service.accent,
                } as React.CSSProperties}
                onMouseEnter={() => setHoveredId(item.service.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(item.service.id)}
                onBlur={() => setHoveredId(null)}
                onClick={() => onSelectService(item.service)}
                aria-label={`${item.service.name}: ${item.service.tagline}`}
              >
                <span className="cv-orbit-tile-inner">
                  <ServiceIcon iconKey={item.service.iconKey} size={isCompact ? 20 : 25} />
                </span>
                <span className="cv-orbit-tile-code">{item.service.index}</span>
              </button>
            );
          })}
        </div>

        {/* ArtCraft-style floating HUD Label on Orbit Hover */}
        <div
          className={`cv-orbit-hud ${hoveredService ? 'is-visible' : ''}`}
          role="status"
          aria-live="polite"
        >
          {hoveredService && (
            <>
              <span
                className="cv-orbit-hud-dot"
                style={{ background: hoveredService.accent }}
              />
              <span className="cv-orbit-hud-index">{hoveredService.index}</span>
              <strong>{hoveredService.name}</strong>
              <span className="cv-orbit-hud-sep">·</span>
              <span className="cv-orbit-hud-hint">Klicken für Details</span>
            </>
          )}
        </div>

        {/* Center Focal Content with Radial Backdrop Blur Mask */}
        <div className="cv-hero-center">
          <div className="cv-hero-mask" aria-hidden="true" />

          <CloudVibeLogo variant="full" className="cv-hero-logo" />

          <h1 className="cv-hero-title">
            IT-Betreuung für Arztpraxen, Apotheken{' '}
            <span className="cv-brand-highlight">&amp; Pflegeeinrichtungen.</span>
          </h1>

          <p className="cv-hero-subtitle">
            Managed Services, Telematikinfrastruktur (TI-Gateway, Konnektor, KIM), DATEV &amp;
            SelectLine – betreut von unserem siebenköpfigen Team aus Goch. Direkt, persönlich und
            ohne Warteschleife.
          </p>

          <div className="cv-hero-actions">
            <button type="button" className="cv-btn cv-btn-primary" onClick={onOpenBooking}>
              <Calendar size={16} />
              <span>BERATUNG VEREINBAREN</span>
            </button>
            <button
              type="button"
              className="cv-btn cv-btn-outline"
              onClick={() => onNavigate('loesungen')}
            >
              <Grid2x2 size={16} />
              <span>ALLE 13 LÖSUNGEN</span>
            </button>
          </div>

          <div className="cv-hero-direct-links">
            <a href={`mailto:${CLOUDVIBE_CONTACT.email}`} className="cv-inline-link">
              <Mail size={13} />
              <span>Anfrage per Mail</span>
            </a>
            <span className="cv-dot-sep" aria-hidden="true">
              ·
            </span>
            <a href={CLOUDVIBE_CONTACT.supportPhoneHref} className="cv-inline-link">
              <Phone size={13} />
              <span>Ruf uns an ({CLOUDVIBE_CONTACT.supportPhone})</span>
            </a>
            <span className="cv-dot-sep" aria-hidden="true">
              ·
            </span>
            <button
              type="button"
              className="cv-inline-link"
              onClick={() => onNavigate('architektur')}
            >
              <span>Live-Architektur ansehen</span>
              <ArrowDownRight size={13} />
            </button>
          </div>

          <div className="cv-hero-meta-strip">
            <span>TELEKONNEKT-PARTNER</span>
            <span>Ø &lt; 7 MIN. ANTWORTZEIT</span>
            <span>KEIN CALLCENTER</span>
            <span>DEUTSCHE RECHENZENTREN</span>
          </div>
        </div>
      </div>

      {/* Kinetic Partner & Capability Marquee */}
      <div className="cv-marquee" aria-label="Leistungsspektrum">
        <div className="cv-marquee-track">
          {[...tickerItems, ...tickerItems].map((label, idx) => (
            <span key={idx} className="cv-marquee-item">
              <span className="cv-marquee-diamond" aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
