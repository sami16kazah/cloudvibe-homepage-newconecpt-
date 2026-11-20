import React, { useEffect, useState } from 'react';

interface CloudVibeLogoProps {
  variant?: 'full' | 'nav' | 'nav-animated' | 'compact' | 'mark';
  animateBinary?: boolean;
  expanded?: boolean;
  className?: string;
}

/**
 * Official cloudvibe.de logo geometry calibrated to Comfortaa at fontSize 126 in 600x280:
 * - Stem of 'l' sits at x = 88
 * - Stem of 'd' sits at x = 334
 * - Blue cloud arc starts dead-aligned on 'l' (x = 88) and ends dead-aligned on 'd' (x = 334)
 * - Green binary digits sit strictly inside the l..d pocket (x = 113..309) with zero stem overlap
 */
export const OFFICIAL_BINARY: { x: number; y: number; value: string }[] = [
  // Row 1 (right peak)
  { x: 256, y: 60, value: '1' },
  // Row 2
  { x: 169, y: 83, value: '1' },
  { x: 227, y: 83, value: '0' },
  { x: 256, y: 83, value: '0' },
  { x: 285, y: 83, value: '1' },
  // Row 3
  { x: 113, y: 106, value: '0' },
  { x: 141, y: 106, value: '1' },
  { x: 169, y: 106, value: '0' },
  { x: 198, y: 106, value: '0' },
  { x: 227, y: 106, value: '1' },
  { x: 256, y: 106, value: '1' },
  { x: 285, y: 106, value: '0' },
  { x: 310, y: 106, value: '0' },
  // Row 4 (cleanly inside l..d pocket above o & u)
  { x: 113, y: 129, value: '1' },
  { x: 141, y: 129, value: '0' },
  { x: 169, y: 129, value: '1' },
  { x: 198, y: 129, value: '1' },
  { x: 227, y: 129, value: '0' },
  { x: 256, y: 129, value: '0' },
  { x: 285, y: 129, value: '0' },
  { x: 310, y: 129, value: '1' },
];

// Official cloud arc path strictly spanning x = 88 (l stem) to x = 334 (d stem)
export const OFFICIAL_CLOUD_PATH =
  'M88 108 C88 76, 106 56, 131 52 C139 21, 169 8, 198 12 C218 15, 231 25, 239 36 C261 25, 293 36, 299 65 C321 70, 334 87, 334 108';

export const CloudVibeLogo: React.FC<CloudVibeLogoProps> = ({
  variant = 'full',
  animateBinary = true,
  expanded = false,
  className = '',
}) => {
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    if (!animateBinary) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const interval = window.setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % OFFICIAL_BINARY.length);
    }, 620);
    return () => window.clearInterval(interval);
  }, [animateBinary]);

  if (variant === 'mark') {
    return (
      <svg
        viewBox="76 4 270 134"
        className={`cv-logo-mark ${className}`}
        aria-label="cloudvibe Logo"
        role="img"
      >
        <path
          d={OFFICIAL_CLOUD_PATH}
          fill="none"
          stroke="var(--cv-cloud-blue)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {OFFICIAL_BINARY.map((bit, i) => {
          const isActive =
            animateBinary &&
            (i === pulseIndex || i === (pulseIndex + 7) % OFFICIAL_BINARY.length);
          return (
            <text
              key={`${bit.x}-${bit.y}`}
              x={bit.x}
              y={bit.y}
              textAnchor="middle"
              fontFamily="'Geist Mono', monospace"
              fontWeight="700"
              fontSize="19"
              fill={isActive ? 'var(--cv-green-bright)' : 'var(--cv-green)'}
              style={{
                transition: 'fill 300ms ease, opacity 300ms ease',
                opacity: isActive ? 1 : 0.9,
              }}
            >
              {bit.value}
            </text>
          );
        })}
      </svg>
    );
  }

  if (variant === 'nav-animated') {
    return (
      <span
        className={`cv-logo-nav-anim ${expanded ? 'is-expanded' : ''} ${className}`}
        role="img"
        aria-label="cloudvibe — Your IT. Our business."
      >
        <svg viewBox="0 0 600 280" className="cv-logo-nav-anim-svg" aria-hidden="true">
          {/* Same official cloud & binary group: centered & enlarged in hero, glides cleanly into exact l..d slot on scroll */}
          <g className="cv-nav-anim-cloud-group">
            <path
              d={OFFICIAL_CLOUD_PATH}
              fill="none"
              stroke="var(--cv-cloud-blue)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {OFFICIAL_BINARY.map((bit) => (
              <text
                key={`${bit.x}-${bit.y}`}
                x={bit.x}
                y={bit.y}
                textAnchor="middle"
                fontFamily="'Geist Mono', monospace"
                fontWeight="700"
                fontSize="18.5"
                fill="var(--cv-green)"
              >
                {bit.value}
              </text>
            ))}
          </g>

          {/* Official monochrome "cloudvibe" + gray slogan wiping smoothly out to the right */}
          <g className="cv-nav-anim-text-group">
            <text
              x="4"
              y="216"
              textLength="588"
              lengthAdjust="spacing"
              fontFamily="'Comfortaa', 'Archivo', system-ui, sans-serif"
              fontWeight="600"
              fontSize="126"
              fill="var(--ink-strong)"
            >
              cloudvibe
            </text>
            <text
              x="592"
              y="264"
              textAnchor="end"
              fontFamily="'Comfortaa', 'Inter', system-ui, sans-serif"
              fontWeight="400"
              fontSize="38"
              letterSpacing="0.5"
              fill="var(--ink-muted)"
            >
              Your IT. Our business.
            </text>
          </g>
        </svg>
      </span>
    );
  }

  if (variant === 'nav') {
    return (
      <span
        className={`cv-logo-nav ${className}`}
        role="img"
        aria-label="cloudvibe — Your IT. Our business."
      >
        <svg viewBox="0 0 600 280" className="cv-logo-nav-svg" aria-hidden="true">
          <path
            d={OFFICIAL_CLOUD_PATH}
            fill="none"
            stroke="var(--cv-cloud-blue)"
            strokeWidth="11.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {OFFICIAL_BINARY.map((bit) => (
            <text
              key={`${bit.x}-${bit.y}`}
              x={bit.x}
              y={bit.y}
              textAnchor="middle"
              fontFamily="'Geist Mono', monospace"
              fontWeight="700"
              fontSize="18.5"
              fill="var(--cv-green)"
            >
              {bit.value}
            </text>
          ))}
          <text
            x="4"
            y="216"
            textLength="588"
            lengthAdjust="spacing"
            fontFamily="'Comfortaa', 'Archivo', system-ui, sans-serif"
            fontWeight="600"
            fontSize="126"
            fill="var(--ink-strong)"
          >
            cloudvibe
          </text>
          <text
            x="592"
            y="264"
            textAnchor="end"
            fontFamily="'Comfortaa', 'Inter', system-ui, sans-serif"
            fontWeight="400"
            fontSize="38"
            letterSpacing="0.5"
            fill="var(--ink-muted)"
          >
            Your IT. Our business.
          </text>
        </svg>
      </span>
    );
  }

  if (variant === 'compact') {
    return (
      <span className={`cv-logo-compact ${className}`}>
        <CloudVibeLogo variant="mark" animateBinary={animateBinary} className="cv-logo-compact-mark" />
        <span className="cv-logo-compact-text">cloudvibe</span>
      </span>
    );
  }

  return (
    <div
      className={`cv-logo-full ${className}`}
      role="img"
      aria-label="cloudvibe — Your IT. Our business."
    >
      <svg viewBox="0 0 600 280" className="cv-logo-full-svg" aria-hidden="true">
        <defs>
          <filter id="cv-green-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Official Blue Cloud Arc strictly from 'l' (x=88) to 'd' (x=334) */}
        <path
          d={OFFICIAL_CLOUD_PATH}
          pathLength={100}
          fill="none"
          stroke="var(--cv-cloud-blue)"
          strokeWidth="10.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="cv-cloud-stroke"
        />

        {/* Authentic Binary Matrix strictly inside l..d */}
        {OFFICIAL_BINARY.map((bit, i) => {
          const isActive =
            animateBinary &&
            (i === pulseIndex ||
              i === (pulseIndex + 5) % OFFICIAL_BINARY.length ||
              i === (pulseIndex + 11) % OFFICIAL_BINARY.length);
          return (
            <text
              key={`${bit.x}-${bit.y}`}
              x={bit.x}
              y={bit.y}
              textAnchor="middle"
              fontFamily="'Geist Mono', monospace"
              fontWeight="700"
              fontSize="18"
              fill={isActive ? 'var(--cv-green-bright)' : 'var(--cv-green)'}
              filter={isActive ? 'url(#cv-green-glow)' : undefined}
              style={{
                transition: 'fill 260ms ease, opacity 260ms ease',
                opacity: isActive ? 1 : 0.88,
              }}
            >
              {bit.value}
            </text>
          );
        })}

        {/* Lowercase rounded geometric "cloudvibe" wordmark locked to l=71, d=318 */}
        <text
          x="4"
          y="216"
          textLength="588"
          lengthAdjust="spacing"
          fontFamily="'Comfortaa', 'Archivo', system-ui, sans-serif"
          fontWeight="600"
          fontSize="126"
          fill="var(--ink-strong)"
          className="cv-wordmark-text"
        >
          cloudvibe
        </text>

        {/* Official Right-Aligned Gray Slogan */}
        <text
          x="592"
          y="264"
          textAnchor="end"
          fontFamily="'Comfortaa', 'Inter', system-ui, sans-serif"
          fontWeight="400"
          fontSize="37"
          letterSpacing="0.5"
          fill="var(--ink-muted)"
        >
          Your IT. Our business.
        </text>
      </svg>
    </div>
  );
};
