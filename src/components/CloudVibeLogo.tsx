import React, { useEffect, useState } from 'react';

interface CloudVibeLogoProps {
  variant?: 'full' | 'nav' | 'compact' | 'mark';
  animateBinary?: boolean;
  className?: string;
}

const BINARY_GRID: { x: number; y: number; value: string; delay: number }[] = [
  // Row 1 (peak)
  { x: 112, y: 40, value: '1', delay: 0 },
  // Row 2
  { x: 64, y: 58, value: '1', delay: 2 },
  { x: 96, y: 58, value: '0', delay: 4 },
  { x: 112, y: 58, value: '0', delay: 1 },
  { x: 128, y: 58, value: '1', delay: 5 },
  // Row 3
  { x: 32, y: 76, value: '0', delay: 3 },
  { x: 48, y: 76, value: '1', delay: 6 },
  { x: 64, y: 76, value: '0', delay: 1 },
  { x: 80, y: 76, value: '0', delay: 4 },
  { x: 96, y: 76, value: '1', delay: 0 },
  { x: 112, y: 76, value: '1', delay: 5 },
  { x: 128, y: 76, value: '0', delay: 2 },
  { x: 144, y: 76, value: '0', delay: 7 },
  // Row 4
  { x: 32, y: 94, value: '1', delay: 5 },
  { x: 48, y: 94, value: '0', delay: 2 },
  { x: 64, y: 94, value: '1', delay: 7 },
  { x: 80, y: 94, value: '1', delay: 3 },
  { x: 96, y: 94, value: '0', delay: 6 },
  { x: 112, y: 94, value: '0', delay: 1 },
  { x: 128, y: 94, value: '0', delay: 4 },
  { x: 144, y: 94, value: '1', delay: 0 },
];

export const CloudVibeLogo: React.FC<CloudVibeLogoProps> = ({
  variant = 'full',
  animateBinary = true,
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
      setPulseIndex((prev) => (prev + 1) % BINARY_GRID.length);
    }, 650);
    return () => window.clearInterval(interval);
  }, [animateBinary]);

  if (variant === 'mark') {
    return (
      <svg
        viewBox="0 0 176 112"
        className={`cv-logo-mark ${className}`}
        aria-label="cloudvibe Logo"
        role="img"
      >
        <path
          d="M20 82 C19 60, 32 45, 50 42 C56 20, 76 10, 96 14 C109 16, 118 23, 123 31 C138 24, 157 35, 159 54 C169 59, 172 72, 166 84"
          fill="none"
          stroke="var(--cv-cloud-blue)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="cv-cloud-stroke"
        />
        {BINARY_GRID.map((bit, i) => {
          const isActive =
            animateBinary && (i === pulseIndex || i === (pulseIndex + 7) % BINARY_GRID.length);
          return (
            <text
              key={`${bit.x}-${bit.y}`}
              x={bit.x}
              y={bit.y}
              textAnchor="middle"
              fontFamily="'Geist Mono', monospace"
              fontWeight="700"
              fontSize="14.5"
              fill={isActive ? 'var(--cv-green-bright)' : 'var(--cv-green)'}
              style={{
                transition: 'fill 320ms ease, opacity 320ms ease',
                opacity: isActive ? 1 : 0.86,
              }}
            >
              {bit.value}
            </text>
          );
        })}
      </svg>
    );
  }

  if (variant === 'nav') {
    return (
      <span
        className={`cv-logo-nav ${className}`}
        role="img"
        aria-label="cloudvibe — Your IT. Our business."
      >
        <svg viewBox="0 0 430 218" className="cv-logo-nav-svg" aria-hidden="true">
          <g transform="translate(36, 4) scale(1.12)">
            <path
              d="M16 74 C16 52, 30 37, 49 34 C56 12, 78 3, 98 8 C110 11, 118 18, 123 26 C138 19, 158 30, 160 49 C170 54, 174 67, 168 77"
              fill="none"
              stroke="var(--cv-cloud-blue)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {BINARY_GRID.map((bit) => (
              <text
                key={`${bit.x}-${bit.y}`}
                x={bit.x}
                y={bit.y - 6}
                textAnchor="middle"
                fontFamily="'Geist Mono', monospace"
                fontWeight="700"
                fontSize="14.5"
                fill="var(--cv-green)"
              >
                {bit.value}
              </text>
            ))}
          </g>
          <text
            x="215"
            y="168"
            textAnchor="middle"
            fontFamily="'Comfortaa', 'Archivo', system-ui, sans-serif"
            fontWeight="700"
            fontSize="76"
            letterSpacing="-1.5"
            fill="var(--ink-strong)"
          >
            cloudvibe
          </text>
          <text
            x="396"
            y="206"
            textAnchor="end"
            fontFamily="'Comfortaa', 'Inter', system-ui, sans-serif"
            fontWeight="500"
            fontSize="24"
            letterSpacing="0.4"
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
        <span className="cv-logo-compact-text">
          cloud<span className="cv-logo-accent">vibe</span>
        </span>
      </span>
    );
  }

  return (
    <div className={`cv-logo-full ${className}`} role="img" aria-label="cloudvibe — Your IT. Our business.">
      <svg viewBox="0 0 430 218" className="cv-logo-full-svg" aria-hidden="true">
        <defs>
          <filter id="cv-green-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Cloud Arc positioned cleanly above "cloud" */}
        <g transform="translate(36, 4) scale(1.12)">
          <path
            d="M16 74 C16 52, 30 37, 49 34 C56 12, 78 3, 98 8 C110 11, 118 18, 123 26 C138 19, 158 30, 160 49 C170 54, 174 67, 168 77"
            fill="none"
            stroke="var(--cv-cloud-blue)"
            strokeWidth="8.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="cv-cloud-stroke"
          />

          {/* Authentic CloudVibe Binary Matrix */}
          {BINARY_GRID.map((bit, i) => {
            const isActive =
              animateBinary &&
              (i === pulseIndex ||
                i === (pulseIndex + 5) % BINARY_GRID.length ||
                i === (pulseIndex + 11) % BINARY_GRID.length);
            return (
              <text
                key={`${bit.x}-${bit.y}`}
                x={bit.x}
                y={bit.y - 6}
                textAnchor="middle"
                fontFamily="'Geist Mono', monospace"
                fontWeight="700"
                fontSize="13.5"
                fill={isActive ? 'var(--cv-green-bright)' : 'var(--cv-green)'}
                filter={isActive ? 'url(#cv-green-glow)' : undefined}
                style={{
                  transition: 'fill 260ms ease, opacity 260ms ease',
                  opacity: isActive ? 1 : 0.85,
                }}
              >
                {bit.value}
              </text>
            );
          })}
        </g>

        {/* Lowercase rounded geometric "cloudvibe" wordmark with crisp breathing room */}
        <text
          x="215"
          y="168"
          textAnchor="middle"
          fontFamily="'Comfortaa', 'Archivo', system-ui, sans-serif"
          fontWeight="600"
          fontSize="74"
          letterSpacing="-1.5"
          fill="var(--ink-strong)"
          className="cv-wordmark-text"
        >
          cloudvibe
        </text>

        {/* Right-aligned tagline */}
        <text
          x="396"
          y="204"
          textAnchor="end"
          fontFamily="'Comfortaa', 'Inter', system-ui, sans-serif"
          fontWeight="400"
          fontSize="22"
          letterSpacing="0.4"
          fill="var(--ink-muted)"
        >
          Your IT. Our business.
        </text>
      </svg>
    </div>
  );
};
