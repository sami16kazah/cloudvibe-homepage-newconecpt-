import React, { useState } from 'react';
import { ArrowUpRight, Calendar, Mail, MapPin, ShieldCheck } from 'lucide-react';
import {
  CLOUDVIBE_CONTACT,
  SERVICES,
  type CloudVibeService,
} from '../data/cloudvibeData';
import { ServiceIcon } from './ServiceIcon';
import { SectionHeader } from './SectionHeader';

interface ServiceOverviewProps {
  onSelectService: (service: CloudVibeService) => void;
  onOpenBooking: () => void;
}

export const ServiceOverview: React.FC<ServiceOverviewProps> = ({
  onSelectService,
  onOpenBooking,
}) => {
  const [spotlight, setSpotlight] = useState<CloudVibeService>(SERVICES[0]);

  return (
    <section id="ueberblick" className="cv-section cv-reveal">
      <div className="cv-container">
        <SectionHeader
          code="01 / ÜBERBLICK"
          meta="13 LÖSUNGEN · 7 IT-PROFIS · GOCH & DEUTSCHLANDWEIT"
        />

        <div className="cv-overview-grid">
          {/* Left editorial column with authentic Goch company photo */}
          <div className="cv-overview-copy">
            <h2 className="cv-display-heading">
              Dreizehn Lösungen.
              <br />
              Ein <span className="cv-accent-green">Partner.</span>
            </h2>

            <p className="cv-lead-paragraph">
              Im Gesundheitswesen muss die IT einfach funktionieren: Praxisverwaltung, Telefon,
              Netzwerk und die Anbindung an die Telematikinfrastruktur greifen ineinander. Als{' '}
              <strong>Telekonnekt-Partner</strong> liefern und richten wir Konnektoren,
              TI-Gateways, Kartenlesegeräte und KIM-Adressen ein und betreuen die gesamte Praxis-IT
              als Managed Service.
            </p>

            <p className="cv-body-paragraph">
              Neben Arztpraxen, Apotheken und Pflegeeinrichtungen unterstützen wir mittelständische
              Unternehmen und Kanzleien mit Managed Services, Cloud-Infrastruktur sowie{' '}
              <strong>DATEV</strong> und <strong>SelectLine</strong>. Vor Ort am Niederrhein und per
              Fernwartung in ganz Deutschland.
            </p>

            <div className="cv-overview-actions">
              <button type="button" className="cv-btn cv-btn-primary" onClick={onOpenBooking}>
                <Calendar size={15} />
                <span>ERSTBERATUNG BUCHEN</span>
              </button>
              <a href={`mailto:${CLOUDVIBE_CONTACT.email}`} className="cv-btn cv-btn-outline">
                <Mail size={15} />
                <span>ANFRAGE PER MAIL</span>
              </a>
            </div>

            <div className="cv-overview-stats">
              <div className="cv-stat-cell">
                <span className="cv-stat-value">&lt; 7 Min.</span>
                <span className="cv-stat-label">Antwortzeit im Schnitt</span>
              </div>
              <div className="cv-stat-cell">
                <span className="cv-stat-value">7 Techs</span>
                <span className="cv-stat-label">Direktes Team aus Goch</span>
              </div>
              <div className="cv-stat-cell">
                <span className="cv-stat-value">100 %</span>
                <span className="cv-stat-label">DSGVO &amp; DE-Rechenzentren</span>
              </div>
            </div>

            {/* Real cloudvibe Goch Team Meeting Photo */}
            <figure className="cv-editorial-photo cv-overview-photo">
              <img
                src="./photos/nn_cloudvibe-7.webp"
                alt="Teammeeting bei cloudvibe in Goch vor der IT-Architektur-Planung"
                loading="lazy"
              />
              <figcaption>
                <span>CLOUDVIBE GOCH</span>
                <span>Persönliche IT- &amp; TI-Planung direkt im Team</span>
              </figcaption>
            </figure>
          </div>

          {/* Right interactive 13-icon mosaic + live inspector card */}
          <div className="cv-overview-mosaic-col">
            <div className="cv-mosaic-header">
              <span>INTERAKTIVE LÖSUNGS-MATRIX</span>
              <span>HOVER ODER KLICK FÜR DETAILS</span>
            </div>

            <div className="cv-icon-mosaic" role="list">
              {SERVICES.map((service) => {
                const isSelected = spotlight.id === service.id;
                return (
                  <button
                    key={service.id}
                    type="button"
                    role="listitem"
                    className={`cv-mosaic-tile ${isSelected ? 'is-selected' : ''}`}
                    style={{ '--tile-accent': service.accent } as React.CSSProperties}
                    onMouseEnter={() => setSpotlight(service)}
                    onFocus={() => setSpotlight(service)}
                    onClick={() => onSelectService(service)}
                  >
                    <span className="cv-mosaic-badge">
                      <ServiceIcon iconKey={service.iconKey} size={22} />
                    </span>
                    <span className="cv-mosaic-name">{service.shortName}</span>
                  </button>
                );
              })}
            </div>

            {/* Live Spotlight Inspector */}
            <div
              className="cv-mosaic-inspector"
              style={{ '--inspect-accent': spotlight.accent } as React.CSSProperties}
            >
              <div className="cv-inspector-top">
                <span className="cv-inspector-pill">
                  <ShieldCheck size={13} />
                  <span>
                    {spotlight.index} · {spotlight.categoryLabel}
                  </span>
                </span>
                <span className="cv-inspector-loc">
                  <MapPin size={12} /> Goch &amp; Remote DE
                </span>
              </div>
              <h3>{spotlight.name}</h3>
              <p>{spotlight.description}</p>
              <div className="cv-inspector-bottom">
                <div className="cv-tag-row">
                  {spotlight.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="cv-micro-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className="cv-text-cta"
                  onClick={() => onSelectService(spotlight)}
                >
                  <span>DETAILS ÖFFNEN</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
