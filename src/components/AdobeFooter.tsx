import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUp,
  ArrowUpRight,
  ChevronDown,
  Globe,
  Headphones,
  Mail,
  Phone,
  ShoppingBag,
} from 'lucide-react';
import {
  CLOUDVIBE_CONTACT,
  SERVICES,
  type CloudVibeService,
  type ServiceCategory,
} from '../data/cloudvibeData';
import { ServiceIcon } from './ServiceIcon';

export type LegalTopic = 'impressum' | 'datenschutz' | 'agb' | 'cookies';

interface AdobeFooterProps {
  onSelectService: (service: CloudVibeService) => void;
  onSelectCategory: (cat: ServiceCategory) => void;
  onNavigate: (id: string) => void;
  onOpenBooking: () => void;
  onOpenRemote: () => void;
  onOpenLegal: (topic: LegalTopic) => void;
}

const FOOTER_BINARY: { x: number; y: number; v: string }[] = [
  { x: 246, y: 42, v: '1' },
  { x: 184, y: 65, v: '1' },
  { x: 226, y: 65, v: '0' },
  { x: 246, y: 65, v: '0' },
  { x: 266, y: 65, v: '1' },
  { x: 142, y: 88, v: '0' },
  { x: 163, y: 88, v: '1' },
  { x: 184, y: 88, v: '0' },
  { x: 205, y: 88, v: '0' },
  { x: 226, y: 88, v: '1' },
  { x: 246, y: 88, v: '1' },
  { x: 266, y: 88, v: '0' },
  { x: 287, y: 88, v: '0' },
  { x: 142, y: 111, v: '1' },
  { x: 163, y: 111, v: '0' },
  { x: 184, y: 111, v: '1' },
  { x: 205, y: 111, v: '1' },
  { x: 226, y: 111, v: '0' },
  { x: 246, y: 111, v: '0' },
  { x: 266, y: 111, v: '0' },
  { x: 287, y: 111, v: '1' },
];

export const AdobeFooter: React.FC<AdobeFooterProps> = ({
  onSelectService,
  onSelectCategory,
  onNavigate,
  onOpenBooking,
  onOpenRemote,
  onOpenLegal,
}) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>('gesundheitswesen');
  const [pointerX, setPointerX] = useState(50);
  const [pulseBit, setPulseBit] = useState(0);
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const featuredProducts = SERVICES.filter((s) => s.featuredInFooter);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.06 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const id = window.setInterval(() => {
      setPulseBit((p) => (p + 1) % FOOTER_BINARY.length);
    }, 520);
    return () => window.clearInterval(id);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    setPointerX(Math.max(0, Math.min(100, pct)));
  };

  const toggleCol = (key: string) => {
    setOpenAccordion((prev) => (prev === key ? null : key));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className={`cv-adobe-footer ${isVisible ? 'is-visible' : ''}`}
      onMouseMove={handleMouseMove}
      style={{ '--footer-px': `${pointerX}%` } as React.CSSProperties}
    >
      {/* 1. Flowing CloudVibe Aurora CTA Banner */}
      <div className="cv-footer-aurora-banner">
        <div className="cv-aurora-mesh" aria-hidden="true" />
        <img
          src="./photos/cloudvibe-bg.webp"
          alt=""
          aria-hidden="true"
          className="cv-aurora-photo-layer"
        />
        <div className="cv-container cv-footer-banner-inner">
          <div className="cv-footer-banner-copy">
            <span className="cv-banner-kicker">YOUR IT. OUR BUSINESS.</span>
            <h2>Bereit für IT, die einfach läuft?</h2>
            <p>
              Persönliche Erstberatung für Praxen, Apotheken, Pflegeeinrichtungen, Kanzleien &amp;
              KMU – direkt mit unserem Team aus Goch.
            </p>
          </div>
          <div className="cv-footer-banner-actions">
            <button type="button" className="cv-btn cv-btn-aurora" onClick={onOpenBooking}>
              <span>BERATUNG VEREINBAREN</span>
              <ArrowUpRight size={16} />
            </button>
            <button type="button" className="cv-btn cv-btn-aurora-ghost" onClick={onOpenRemote}>
              <Headphones size={15} />
              <span>FERNWARTUNG</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Adobe-Style Structured 5-Column Sitemap (Accordion on Mobile) */}
      <div className="cv-footer-sitemap">
        <div className="cv-container">
          <div className="cv-sitemap-grid">
            {/* Column 1: Gesundheitswesen */}
            <div
              className={`cv-sitemap-col ${openAccordion === 'gesundheitswesen' ? 'is-open' : ''}`}
            >
              <button
                type="button"
                className="cv-sitemap-heading"
                onClick={() => toggleCol('gesundheitswesen')}
                aria-expanded={openAccordion === 'gesundheitswesen'}
              >
                <span>Gesundheitswesen</span>
                <ChevronDown size={15} className="cv-acc-chevron" />
              </button>
              <ul className="cv-sitemap-list">
                {SERVICES.filter((s) => s.category === 'gesundheitswesen').map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      className="cv-footer-link"
                      onClick={() => onSelectService(s)}
                    >
                      {s.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Managed Services */}
            <div className={`cv-sitemap-col ${openAccordion === 'managed' ? 'is-open' : ''}`}>
              <button
                type="button"
                className="cv-sitemap-heading"
                onClick={() => toggleCol('managed')}
                aria-expanded={openAccordion === 'managed'}
              >
                <span>Managed Services</span>
                <ChevronDown size={15} className="cv-acc-chevron" />
              </button>
              <ul className="cv-sitemap-list">
                {SERVICES.filter((s) => s.category === 'managed').map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      className="cv-footer-link"
                      onClick={() => onSelectService(s)}
                    >
                      {s.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Software & Telekonnekt Shop */}
            <div className={`cv-sitemap-col ${openAccordion === 'software' ? 'is-open' : ''}`}>
              <button
                type="button"
                className="cv-sitemap-heading"
                onClick={() => toggleCol('software')}
                aria-expanded={openAccordion === 'software'}
              >
                <span>Software &amp; Shop</span>
                <ChevronDown size={15} className="cv-acc-chevron" />
              </button>
              <ul className="cv-sitemap-list">
                {SERVICES.filter((s) => s.category === 'software').map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      className="cv-footer-link"
                      onClick={() => onSelectService(s)}
                    >
                      {s.name}
                    </button>
                  </li>
                ))}
                <li className="cv-sitemap-divider" />
                <li>
                  <a
                    href="https://cloudvibe.de"
                    target="_blank"
                    rel="noreferrer"
                    className="cv-footer-link cv-footer-link-shop"
                  >
                    <ShoppingBag size={13} />
                    <span>Telekonnekt Neukunden-Shop</span>
                    <ArrowUpRight size={12} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://cloudvibe.de"
                    target="_blank"
                    rel="noreferrer"
                    className="cv-footer-link cv-footer-link-shop"
                  >
                    <ShoppingBag size={13} />
                    <span>Telekonnekt Wechsler-Shop</span>
                    <ArrowUpRight size={12} />
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Unternehmen */}
            <div className={`cv-sitemap-col ${openAccordion === 'unternehmen' ? 'is-open' : ''}`}>
              <button
                type="button"
                className="cv-sitemap-heading"
                onClick={() => toggleCol('unternehmen')}
                aria-expanded={openAccordion === 'unternehmen'}
              >
                <span>Unternehmen</span>
                <ChevronDown size={15} className="cv-acc-chevron" />
              </button>
              <ul className="cv-sitemap-list">
                <li>
                  <button
                    type="button"
                    className="cv-footer-link"
                    onClick={() => onNavigate('ueberblick')}
                  >
                    Über cloudvibe
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="cv-footer-link"
                    onClick={() => onNavigate('vorteile')}
                  >
                    Deine Vorteile
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="cv-footer-link"
                    onClick={() => onNavigate('referenzen')}
                  >
                    Team &amp; Referenzen
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="cv-footer-link"
                    onClick={() => {
                      onSelectCategory('gesundheitswesen');
                      onNavigate('loesungen');
                    }}
                  >
                    Einsatzgebiet Goch &amp; DE
                  </button>
                </li>
                <li>
                  <a
                    href={`mailto:${CLOUDVIBE_CONTACT.careerEmail}`}
                    className="cv-footer-link"
                  >
                    Karriere ({CLOUDVIBE_CONTACT.careerEmail})
                  </a>
                </li>
                <li>
                  <button type="button" className="cv-footer-link" onClick={onOpenRemote}>
                    Fernwartung
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 5: Direct Contact Block */}
            <div className="cv-sitemap-col is-open cv-sitemap-contact">
              <div className="cv-sitemap-heading is-static">
                <span>cloudvibe GmbH</span>
              </div>
              <address className="cv-footer-address">
                <span>{CLOUDVIBE_CONTACT.street}</span>
                <span>{CLOUDVIBE_CONTACT.city}</span>
              </address>
              <ul className="cv-footer-hotlines">
                <li>
                  <Phone size={13} />
                  <span>Support:</span>
                  <a href={CLOUDVIBE_CONTACT.supportPhoneHref}>{CLOUDVIBE_CONTACT.supportPhone}</a>
                </li>
                <li>
                  <Phone size={13} />
                  <span>Sales:</span>
                  <a href={CLOUDVIBE_CONTACT.salesPhoneHref}>{CLOUDVIBE_CONTACT.salesPhone}</a>
                </li>
                <li>
                  <Mail size={13} />
                  <span>Mail:</span>
                  <a href={`mailto:${CLOUDVIBE_CONTACT.email}`}>{CLOUDVIBE_CONTACT.email}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Adobe-Style Centered "Ausgewählte Lösungen" Product Bar */}
      <div className="cv-footer-featured-strip">
        <div className="cv-container cv-featured-strip-inner">
          <span className="cv-featured-label">Ausgewählte Lösungen</span>
          <div className="cv-featured-products">
            {featuredProducts.map((srv, idx) => (
              <button
                key={srv.id}
                type="button"
                className="cv-featured-chip"
                style={
                  {
                    '--chip-accent': srv.accent,
                    transitionDelay: `${idx * 45}ms`,
                  } as React.CSSProperties
                }
                onClick={() => onSelectService(srv)}
              >
                <span className="cv-featured-chip-icon">
                  <ServiceIcon iconKey={srv.iconKey} size={15} />
                </span>
                <span>{srv.shortName}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Monumental Adobe-Inspired Full-Width Animated CloudVibe Brand Showcase */}
      <div className="cv-footer-monument" aria-label="cloudvibe — Your IT. Our business.">
        <div className="cv-monument-aurora" aria-hidden="true" />
        <div className="cv-monument-waves" aria-hidden="true">
          <svg viewBox="0 0 1440 260" preserveAspectRatio="none" className="cv-monument-wave-svg">
            <path
              d="M0 190 C280 110, 520 250, 820 155 C1080 75, 1280 210, 1440 130"
              fill="none"
              stroke="var(--cv-green)"
              strokeOpacity="0.22"
              strokeWidth="1.4"
              className="cv-wave-stroke-1"
            />
            <path
              d="M0 215 C340 145, 620 265, 930 165 C1180 85, 1320 220, 1440 155"
              fill="none"
              stroke="var(--cv-cloud-blue)"
              strokeOpacity="0.26"
              strokeWidth="1.2"
              className="cv-wave-stroke-2"
            />
            <path
              d="M0 160 C310 230, 560 95, 860 185 C1140 255, 1310 120, 1440 185"
              fill="none"
              stroke="var(--cv-orange)"
              strokeOpacity="0.14"
              strokeWidth="1"
              className="cv-wave-stroke-3"
            />
          </svg>
        </div>

        <div className="cv-container cv-monument-inner">
          <svg
            viewBox="0 0 980 315"
            className="cv-monument-logo-svg"
            role="img"
            aria-label="cloudvibe — Your IT. Our business."
          >
            <defs>
              <linearGradient id="cv-monument-word-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--ink-strong)" />
                <stop offset="48%" stopColor="var(--ink-strong)" />
                <stop offset="76%" stopColor="var(--cv-green)" />
                <stop offset="100%" stopColor="var(--cv-cloud-blue)" />
              </linearGradient>
              <linearGradient id="cv-monument-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--cv-cloud-blue)" stopOpacity="0.15" />
                <stop offset="55%" stopColor="var(--cv-green)" stopOpacity="0.85" />
                <stop offset="100%" stopColor="var(--cv-orange)" stopOpacity="0.7" />
              </linearGradient>
              <filter id="cv-monument-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="2.6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Sculpted Cloud Arc positioned cleanly over "cloud" */}
            <path
              d="M116 105 C115 74, 135 53, 162 49 C172 18, 203 5, 232 12 C250 16, 262 26, 270 38 C291 28, 320 44, 323 71 C338 78, 343 97, 334 111"
              fill="none"
              stroke="var(--cv-cloud-blue)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="cv-monument-cloud-path"
            />

            {/* Live Shimmering CloudVibe Binary Matrix */}
            {FOOTER_BINARY.map((bit, i) => {
              const hot =
                i === pulseBit ||
                i === (pulseBit + 6) % FOOTER_BINARY.length ||
                i === (pulseBit + 13) % FOOTER_BINARY.length;
              return (
                <text
                  key={`${bit.x}-${bit.y}`}
                  x={bit.x}
                  y={bit.y}
                  textAnchor="middle"
                  fontFamily="'Geist Mono', monospace"
                  fontWeight="700"
                  fontSize="19"
                  fill={hot ? 'var(--cv-green-bright)' : 'var(--cv-green)'}
                  filter={hot ? 'url(#cv-monument-glow)' : undefined}
                  style={{ transition: 'fill 260ms ease, opacity 260ms ease', opacity: hot ? 1 : 0.85 }}
                >
                  {bit.v}
                </text>
              );
            })}

            {/* Monumental Edge-to-Edge "cloudvibe" Wordmark */}
            <text
              x="490"
              y="236"
              textAnchor="middle"
              fontFamily="'Comfortaa', 'Archivo', system-ui, sans-serif"
              fontWeight="600"
              fontSize="158"
              letterSpacing="-3.5"
              fill="url(#cv-monument-word-grad)"
              className="cv-monument-wordmark"
            >
              cloudvibe
            </text>

            {/* Subtle Horizontal Architectural Accent Line Leading into Official Slogan */}
            <line
              x1="68"
              y1="286"
              x2="455"
              y2="286"
              stroke="url(#cv-monument-line-grad)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Official Slogan Tucked Directly Beneath "vibe" */}
            <text
              x="912"
              y="298"
              textAnchor="end"
              fontFamily="'Comfortaa', 'Inter', system-ui, sans-serif"
              fontWeight="500"
              fontSize="39"
              letterSpacing="0.8"
              fill="var(--ink-muted)"
            >
              Your IT. Our business.
            </text>
          </svg>
        </div>
      </div>

      {/* 5. Adobe-Style Bottom Utility & Legal Bar */}
      <div className="cv-footer-utility">
        <div className="cv-container cv-footer-utility-inner">
          <div className="cv-utility-left">
            <span className="cv-region-pill">
              <Globe size={14} />
              <span>Deutschland · Deutsch</span>
            </span>
            <span className="cv-copyright">
              © {new Date().getFullYear()} {CLOUDVIBE_CONTACT.company} · Goch
            </span>
          </div>

          <div className="cv-utility-links">
            <button type="button" onClick={() => onOpenLegal('impressum')}>
              Impressum
            </button>
            <button type="button" onClick={() => onOpenLegal('datenschutz')}>
              Datenschutz
            </button>
            <button type="button" onClick={() => onOpenLegal('cookies')}>
              Cookie-Einstellungen
            </button>
            <button type="button" onClick={() => onOpenLegal('agb')}>
              AGB
            </button>
          </div>

          <button
            type="button"
            className="cv-back-top-btn"
            onClick={scrollToTop}
            aria-label="Nach oben scrollen"
          >
            <span>NACH OBEN</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
