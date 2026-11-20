import React from 'react';
import { ArrowRight } from 'lucide-react';
import {
  SERVICES,
  type CloudVibeService,
  type ServiceCategory,
} from '../data/cloudvibeData';
import { ServiceIcon } from './ServiceIcon';
import { ServicePreviewGraphic } from './ServicePreviewGraphic';
import { SectionHeader } from './SectionHeader';

interface ServiceGridProps {
  activeCategory: 'all' | ServiceCategory;
  onChangeCategory: (cat: 'all' | ServiceCategory) => void;
  onSelectService: (service: CloudVibeService) => void;
  onOpenBooking: () => void;
}

const FILTER_TABS: { id: 'all' | ServiceCategory; label: string; count: number }[] = [
  { id: 'all', label: 'Alle Lösungen', count: SERVICES.length },
  {
    id: 'gesundheitswesen',
    label: 'Gesundheitswesen & TI',
    count: SERVICES.filter((s) => s.category === 'gesundheitswesen').length,
  },
  {
    id: 'managed',
    label: 'Managed Services',
    count: SERVICES.filter((s) => s.category === 'managed').length,
  },
  {
    id: 'software',
    label: 'DATEV & SelectLine',
    count: SERVICES.filter((s) => s.category === 'software').length,
  },
];

export const ServiceGrid: React.FC<ServiceGridProps> = ({
  activeCategory,
  onChangeCategory,
  onSelectService,
  onOpenBooking,
}) => {
  const visibleServices =
    activeCategory === 'all'
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section id="loesungen" className="cv-section cv-reveal">
      <div className="cv-container">
        <SectionHeader
          code="02 / DAS PORTFOLIO"
          meta="LÖSUNGEN, DIE WIRKLICH HELFEN"
        />

        <div className="cv-section-intro-row">
          <div>
            <h2 className="cv-display-heading">
              Was wir für dich <span className="cv-accent-blue">tun.</span>
            </h2>
            <p className="cv-body-paragraph">
              Von der gesetzeskonformen Telematikinfrastruktur über DATEV &amp; SelectLine bis zum
              kompletten Managed-IT-Betrieb – modular kombinierbar und sauber dokumentiert.
            </p>
          </div>

          <div className="cv-filter-tabs" role="tablist" aria-label="Lösungen filtern">
            {FILTER_TABS.map((tab) => {
              const active = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={`cv-filter-tab ${active ? 'is-active' : ''}`}
                  onClick={() => onChangeCategory(tab.id)}
                >
                  <span>{tab.label}</span>
                  <span className="cv-filter-count">{tab.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ArtCraft-inspired Hairline Numbered Lineup Grid */}
        <div className="cv-lineup-grid">
          {visibleServices.map((service) => (
            <article
              key={service.id}
              className="cv-service-card"
              style={{ '--card-accent': service.accent } as React.CSSProperties}
            >
              {/* Card Index Header */}
              <div className="cv-card-head">
                <span className="cv-card-num" style={{ background: service.accent }}>
                  {service.index}
                </span>
                <span className="cv-card-cat">{service.categoryLabel}</span>
              </div>

              {/* Bespoke Animated Visual Preview */}
              <ServicePreviewGraphic service={service} />

              {/* Floating ArtCraft-Style App Icon Badge */}
              <div className="cv-card-body">
                <div className="cv-card-icon-float">
                  <ServiceIcon iconKey={service.iconKey} size={22} />
                </div>

                <h3 className="cv-card-title">{service.name}</h3>
                <p className="cv-card-desc">{service.description}</p>
                <p className="cv-card-subdesc">{service.secondaryText}</p>

                <div className="cv-tag-row">
                  {service.tags.map((tag) => (
                    <span key={tag} className="cv-micro-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  className="cv-card-link"
                  onClick={() => onSelectService(service)}
                >
                  <span>MEHR ERFAHREN</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </article>
          ))}

          {/* Closing consultation card with real cloudvibe Goch desk photo */}
          <article className="cv-service-card cv-service-card-custom">
            <div className="cv-card-head">
              <span className="cv-card-num" style={{ background: 'var(--cv-orange)' }}>
                +
              </span>
              <span className="cv-card-cat">INDIVIDUELLES SLA</span>
            </div>
            <div className="cv-custom-card-split">
              <div className="cv-custom-card-body">
                <h3>Individuelle IT-Landschaft?</h3>
                <p>
                  Mehrere Standorte, spezielle Praxissoftware oder geplanter Kanzlei-Umzug? Wir
                  stellen ein maßgeschneidertes Managed-IT-Konzept mit klaren Reaktionszeiten
                  zusammen.
                </p>
                <button type="button" className="cv-btn cv-btn-primary" onClick={onOpenBooking}>
                  <span>BERATUNG ANFRAGEN</span>
                  <ArrowRight size={15} />
                </button>
              </div>
              <div className="cv-custom-card-photo">
                <img
                  src="./photos/nn_cloudvibe-42.webp"
                  alt="Lukas Kowal und Maurice Hau am Schreibtisch bei cloudvibe"
                  loading="lazy"
                />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
