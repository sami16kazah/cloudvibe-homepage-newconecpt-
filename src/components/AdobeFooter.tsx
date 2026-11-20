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
import { CloudVibeLogo } from './CloudVibeLogo';
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
      { threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
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
      {/* Adobe-inspired Animated Aurora Gradient Ribbon CTA Banner */}
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

      {/* Adobe-style "Ausgewählte Lösungen" Interactive Featured Product Strip */}
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

      {/* Structured Adobe 5-Column Sitemap (Accordion on Mobile) */}
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
                    Referenzen Gesundheitswesen
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

      {/* Adobe-style Bottom Utility Bar: Region, Legal Links & Magnetic Back-to-Top */}
      <div className="cv-footer-utility">
        <div className="cv-container cv-footer-utility-inner">
          <div className="cv-utility-left">
            <span className="cv-region-pill">
              <Globe size={14} />
              <span>Deutschland · Deutsch</span>
            </span>
            <span className="cv-copyright">
              © {new Date().getFullYear()} {CLOUDVIBE_CONTACT.company}
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

      {/* Giant Kinetic CloudVibe Signature Horizon */}
      <div className="cv-footer-kinetic-horizon" aria-hidden="true">
        <div className="cv-horizon-glow" />
        <div className="cv-horizon-binary-stream">
          <span>01001100 10110001 · YOUR IT. OUR BUSINESS. · 01001100 10110001 · GOCH · TELEMATIKINFRASTRUKTUR · MANAGED SERVICES · </span>
          <span>01001100 10110001 · YOUR IT. OUR BUSINESS. · 01001100 10110001 · GOCH · TELEMATIKINFRASTRUKTUR · MANAGED SERVICES · </span>
        </div>
        <div className="cv-container cv-horizon-wordmark-row">
          <CloudVibeLogo variant="compact" className="cv-horizon-brand" />
          <span className="cv-horizon-giant-text">cloudvibe.de</span>
        </div>
      </div>
    </footer>
  );
};
