import React from 'react';
import { ArrowRight, ArrowUpRight, Briefcase, Calendar, Check, MapPin } from 'lucide-react';
import { CLOUDVIBE_CONTACT, REFERENCES } from '../data/cloudvibeData';
import { SectionHeader } from './SectionHeader';

interface ReferencesAndTeamProps {
  onOpenBooking: () => void;
}

const TEAM_PHOTOS = [
  {
    src: './photos/nn_cloudvibe-32.webp',
    alt: 'Das cloudvibe IT-Team im Konferenzraum in Goch',
    kicker: 'DEIN TEAM IN GOCH',
    caption: 'Sieben IT-Profis für Systemintegration, Cloud-Architektur, Netzwerk & Support.',
    wide: true,
  },
  {
    src: './photos/nn_cloudvibe-35.webp',
    alt: 'cloudvibe Teamfoto im Flur am Standort Goch',
    kicker: 'PERSÖNLICH & DIREKT',
    caption: 'Keine anonyme IT-Hotline – du kennst deine Ansprechpartner persönlich.',
    wide: false,
  },
  {
    src: './photos/nn_cloudvibe-9.webp',
    alt: 'Robert Peerenboom und Maurice Hau im Konferenzraum bei der Beratung',
    kicker: 'BERATUNG AUF AUGENHÖHE',
    caption: 'Robert Peerenboom & Maurice Hau bei der gemeinsamen Projektplanung.',
    wide: false,
  },
  {
    src: './photos/nn_cloudvibe-3.webp',
    alt: 'Technik-Abstimmung im cloudvibe Team',
    kicker: 'PRAXIS- & TI-EXPERTISE',
    caption: 'Saubere Konzepte ohne Fachchinesisch für Praxen, Apotheken & KMU.',
    wide: false,
  },
];

export const ReferencesAndTeam: React.FC<ReferencesAndTeamProps> = ({ onOpenBooking }) => {
  return (
    <section id="referenzen" className="cv-section cv-reveal">
      <div className="cv-container">
        <SectionHeader
          code="05 / ÜBER UNS, TEAM & REFERENZEN"
          meta="AUS GOCH · AM NIEDERRHEIN & DEUTSCHLANDWEIT"
        />

        {/* Authentic Company & Team Photo Showcase */}
        <div className="cv-team-showcase">
          <div className="cv-team-intro">
            <div>
              <span className="cv-eyebrow-mono cv-accent-green">WER WIR SIND · GOCH</span>
              <h2 className="cv-display-heading">
                Echte Menschen. <span className="cv-accent-green">Echte Techs.</span>
              </h2>
            </div>
            <p className="cv-body-paragraph">
              Wir sind keine gesichtslose IT-Firma – bei uns zählen Persönlichkeit, Kompetenz und
              die Freude an durchdachten Lösungen. Unser siebenköpfiges Team aus Goch betreut dich
              vor Ort am Niederrhein und per Fernwartung deutschlandweit.
            </p>
          </div>

          <div className="cv-team-gallery">
            {TEAM_PHOTOS.map((photo) => (
              <figure
                key={photo.src}
                className={`cv-team-photo-card ${photo.wide ? 'is-wide' : ''}`}
              >
                <div className="cv-team-photo-media">
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                </div>
                <figcaption>
                  <span className="cv-mono-tiny cv-accent-green">{photo.kicker}</span>
                  <p>{photo.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Healthcare References Grid */}
        <div className="cv-ref-header">
          <div>
            <h3 className="cv-display-heading-sm">
              Vertrauen im <span className="cv-accent-blue">Praxisalltag.</span>
            </h3>
            <p className="cv-body-paragraph">
              Wir betreuen Zahnarzt- und Hausarztpraxen, Orthopädie, Palliativnetzwerke,
              Steuerkanzleien und mittelständische Betriebe. Aus Diskretion nennen wir online keine
              Klarnamen – im persönlichen Gespräch teilen wir gerne Details.
            </p>
          </div>
          <div className="cv-region-meta">
            <MapPin size={15} />
            <span>
              <strong>Standort Goch</strong> · Niederrhein &amp; Remote deutschlandweit
            </span>
          </div>
        </div>

        <div className="cv-ref-grid">
          {REFERENCES.map((ref, idx) => (
            <div
              key={`${ref.type}-${ref.location}-${idx}`}
              className="cv-ref-card"
              style={{ '--ref-accent': ref.accent } as React.CSSProperties}
            >
              <div className="cv-ref-card-top">
                <span className="cv-ref-index">0{idx + 1}</span>
                <span className="cv-ref-city">
                  <MapPin size={12} />
                  {ref.location}
                </span>
              </div>
              <h4>{ref.type}</h4>
              <ul className="cv-ref-services">
                {ref.services.map((srv) => (
                  <li key={srv}>
                    <Check size={13} />
                    <span>{srv}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mission & Career Split with Real Team Sofa Photo */}
        <div className="cv-mission-career-grid">
          <div className="cv-mission-panel">
            <span className="cv-eyebrow-mono">FOKUS AUF DEIN KERNGESCHÄFT · UNSERE MISSION</span>
            <h3>
              Wir schaffen Freiräume für{' '}
              <span className="cv-serif-italic">dein Kerngeschäft.</span>
            </h3>
            <p>
              Mit durchdachten Prozessen, smarter Infrastruktur und einer nachhaltigen IT-Strategie,
              die mit deinem Unternehmen oder deiner Praxis mitwächst. Unser siebenköpfiges Team
              vereint Cloud-Architektur, IT-Sicherheit, Netzwerkmanagement und direkten Support.
            </p>
            <div className="cv-mission-actions">
              <button type="button" className="cv-btn cv-btn-primary" onClick={onOpenBooking}>
                <Calendar size={15} />
                <span>KENNENLERNGESPRÄCH BUCHEN</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="cv-career-panel">
            <div className="cv-career-photo">
              <img
                src="./photos/nn_cloudvibe-36.webp"
                alt="Das cloudvibe Team gemeinsam auf dem Sofa in Goch"
                loading="lazy"
              />
            </div>
            <span className="cv-eyebrow-mono">KOMM INS TEAM · GOCH</span>
            <h3>
              Karriere bei <span className="cv-accent-green">cloudvibe.</span>
            </h3>
            <p>
              Du willst Teil eines wachsenden IT-Teams werden, Verantwortung übernehmen und eigene
              Ideen einbringen? Bei uns zählen Persönlichkeit, Kompetenz und Freude an modernen
              Lösungen.
            </p>
            <div className="cv-career-box">
              <div>
                <span className="cv-mono-tiny">JETZT BEWERBEN</span>
                <strong>{CLOUDVIBE_CONTACT.careerEmail}</strong>
              </div>
              <a
                href={`mailto:${CLOUDVIBE_CONTACT.careerEmail}?subject=Bewerbung%20bei%20cloudvibe`}
                className="cv-btn cv-btn-outline"
              >
                <Briefcase size={15} />
                <span>BEWERBUNG SENDEN</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
