import React from 'react';
import type { CloudVibeService } from '../data/cloudvibeData';

interface ServicePreviewGraphicProps {
  service: CloudVibeService;
}

export const ServicePreviewGraphic: React.FC<ServicePreviewGraphicProps> = ({ service }) => {
  const { iconKey, accent } = service;

  return (
    <div
      className="cv-card-preview"
      style={{ '--card-accent': accent } as React.CSSProperties}
      aria-hidden="true"
    >
      <div className="cv-preview-grid-bg" />
      <div className="cv-preview-topbar">
        <span className="cv-preview-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="cv-preview-status">
          <span className="cv-live-dot" style={{ background: accent }} />
          AKTIV · {service.tags[0]}
        </span>
      </div>

      <div className="cv-preview-canvas">
        {(iconKey === 'ti' || iconKey === 'arztpraxis' || iconKey === 'apotheke') && (
          <svg viewBox="0 0 280 96" className="cv-preview-svg">
            <rect x="14" y="28" width="54" height="40" rx="8" className="cv-svg-node" />
            <rect x="112" y="20" width="58" height="56" rx="10" className="cv-svg-node-accent" stroke={accent} />
            <rect x="212" y="28" width="54" height="40" rx="8" className="cv-svg-node" />
            <path d="M68 48 H112 M170 48 H212" stroke={accent} strokeWidth="2" strokeDasharray="4 4" className="cv-dash-flow" />
            <circle cx="90" cy="48" r="3.5" fill={accent} className="cv-pulse-node" />
            <circle cx="191" cy="48" r="3.5" fill={accent} className="cv-pulse-node" />
            <text x="41" y="52" textAnchor="middle" className="cv-svg-label">
              {iconKey === 'apotheke' ? 'E-RX' : 'PVS'}
            </text>
            <text x="141" y="45" textAnchor="middle" className="cv-svg-label-strong" fill={accent}>
              TI-GW
            </text>
            <text x="141" y="60" textAnchor="middle" className="cv-svg-sublabel">
              KIM · TLS
            </text>
            <text x="239" y="52" textAnchor="middle" className="cv-svg-label">
              GEMATIK
            </text>
          </svg>
        )}

        {(iconKey === 'healthcare' || iconKey === 'pflege') && (
          <svg viewBox="0 0 280 96" className="cv-preview-svg">
            <path
              d="M16 56 H68 L82 28 L98 74 L114 42 L126 56 H178 L192 34 L206 66 L220 56 H264"
              fill="none"
              stroke={accent}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="cv-ecg-line"
            />
            <rect x="18" y="14" width="84" height="18" rx="4" className="cv-svg-node" />
            <text x="60" y="26" textAnchor="middle" className="cv-svg-sublabel">
              SLA 99.9% UP
            </text>
            <rect x="196" y="70" width="66" height="16" rx="4" className="cv-svg-node" />
            <text x="229" y="81" textAnchor="middle" className="cv-svg-sublabel">
              DSGVO SAFE
            </text>
          </svg>
        )}

        {(iconKey === 'datev' || iconKey === 'selectline') && (
          <svg viewBox="0 0 280 96" className="cv-preview-svg">
            <rect x="18" y="16" width="110" height="64" rx="8" className="cv-svg-node" />
            <rect x="30" y="28" width="54" height="6" rx="3" fill={accent} opacity="0.85" />
            <rect x="30" y="42" width="82" height="5" rx="2.5" className="cv-svg-bar" />
            <rect x="30" y="53" width="66" height="5" rx="2.5" className="cv-svg-bar" />
            <rect x="30" y="64" width="76" height="5" rx="2.5" className="cv-svg-bar" />
            <g transform="translate(148, 16)">
              <rect x="0" y="0" width="114" height="64" rx="8" className="cv-svg-node-accent" stroke={accent} />
              <rect x="14" y="38" width="14" height="16" rx="3" fill={accent} opacity="0.45" />
              <rect x="34" y="28" width="14" height="26" rx="3" fill={accent} opacity="0.65" />
              <rect x="54" y="20" width="14" height="34" rx="3" fill={accent} opacity="0.85" />
              <rect x="74" y="12" width="14" height="42" rx="3" fill={accent} />
              <text x="14" y="16" className="cv-svg-sublabel">
                {iconKey === 'datev' ? 'UPDATE OK' : 'ERP SYNC'}
              </text>
            </g>
          </svg>
        )}

        {(iconKey === 'infrastructure' || iconKey === 'server') && (
          <svg viewBox="0 0 280 96" className="cv-preview-svg">
            {[0, 1, 2].map((row) => (
              <g key={row} transform={`translate(24, ${14 + row * 24})`}>
                <rect x="0" y="0" width="232" height="18" rx="5" className="cv-svg-node" />
                <circle cx="14" cy="9" r="3" fill={accent} className="cv-pulse-node" />
                <rect x="28" y="6" width={92 - row * 12} height="6" rx="3" className="cv-svg-bar" />
                <rect x="172" y="6" width="46" height="6" rx="3" fill={accent} opacity={0.9 - row * 0.2} />
              </g>
            ))}
          </svg>
        )}

        {iconKey === 'backup' && (
          <svg viewBox="0 0 280 96" className="cv-preview-svg">
            <circle cx="84" cy="48" r="28" fill="none" stroke="var(--line-strong)" strokeWidth="6" />
            <circle
              cx="84"
              cy="48"
              r="28"
              fill="none"
              stroke={accent}
              strokeWidth="6"
              strokeDasharray="142 40"
              strokeLinecap="round"
              className="cv-spin-slow"
              style={{ transformOrigin: '84px 48px' }}
            />
            <text x="84" y="52" textAnchor="middle" className="cv-svg-label-strong" fill={accent}>
              100%
            </text>
            <rect x="136" y="20" width="124" height="22" rx="6" className="cv-svg-node" />
            <text x="198" y="34" textAnchor="middle" className="cv-svg-sublabel">
              DE-RZ VERSCHLÜSSELT
            </text>
            <rect x="136" y="52" width="124" height="22" rx="6" className="cv-svg-node" />
            <text x="198" y="66" textAnchor="middle" className="cv-svg-sublabel">
              IMMUTABLE SNAPSHOT
            </text>
          </svg>
        )}

        {(iconKey === 'firewall' || iconKey === 'security') && (
          <svg viewBox="0 0 280 96" className="cv-preview-svg">
            <circle cx="140" cy="48" r="36" fill="none" stroke={accent} strokeOpacity="0.22" strokeDasharray="3 4" />
            <circle cx="140" cy="48" r="24" fill="none" stroke={accent} strokeOpacity="0.45" />
            <path
              d="M140 24 L158 32 V49 C158 60 150 68 140 72 C130 68 122 60 122 49 V32 Z"
              fill={accent}
              fillOpacity="0.18"
              stroke={accent}
              strokeWidth="2"
            />
            <path d="M133 48 L138 53 L148 42" fill="none" stroke={accent} strokeWidth="2.4" strokeLinecap="round" />
            <rect x="18" y="38" width="66" height="20" rx="5" className="cv-svg-node" />
            <text x="51" y="51" textAnchor="middle" className="cv-svg-sublabel">
              VPN · TLS
            </text>
            <rect x="196" y="38" width="66" height="20" rx="5" className="cv-svg-node" />
            <text x="229" y="51" textAnchor="middle" className="cv-svg-sublabel">
              0 THREATS
            </text>
          </svg>
        )}

        {iconKey === 'phone' && (
          <svg viewBox="0 0 280 96" className="cv-preview-svg">
            {[16, 28, 44, 24, 52, 36, 48, 22, 38, 28, 44, 18].map((h, i) => (
              <rect
                key={i}
                x={32 + i * 18}
                y={48 - h / 2}
                width="9"
                height={h}
                rx="4.5"
                fill={accent}
                opacity={0.45 + (i % 3) * 0.22}
                className="cv-wave-bar"
                style={{ animationDelay: `${i * 110}ms` }}
              />
            ))}
          </svg>
        )}
      </div>
    </div>
  );
};
