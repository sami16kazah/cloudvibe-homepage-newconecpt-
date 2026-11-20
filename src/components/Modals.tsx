import React, { useEffect, useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Headphones,
  Mail,
  Phone,
  ShieldCheck,
  X,
} from 'lucide-react';
import { CLOUDVIBE_CONTACT, type CloudVibeService } from '../data/cloudvibeData';
import type { LegalTopic } from './AdobeFooter';
import { ServiceIcon } from './ServiceIcon';

interface ModalShellProps {
  title: string;
  eyebrow: string;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalShell: React.FC<ModalShellProps> = ({ title, eyebrow, onClose, children }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="cv-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="cv-modal-panel">
        <div className="cv-modal-header">
          <div>
            <span className="cv-mono-tiny">{eyebrow}</span>
            <h3>{title}</h3>
          </div>
          <button
            type="button"
            className="cv-modal-close"
            onClick={onClose}
            aria-label="Fenster schließen"
          >
            <X size={18} />
          </button>
        </div>
        <div className="cv-modal-body">{children}</div>
      </div>
    </div>
  );
};

export const ServiceDetailModal: React.FC<{
  service: CloudVibeService;
  onClose: () => void;
  onOpenBooking: () => void;
}> = ({ service, onClose, onOpenBooking }) => (
  <ModalShell
    eyebrow={`${service.index} · ${service.categoryLabel}`}
    title={service.name}
    onClose={onClose}
  >
    <div
      className="cv-modal-service-hero"
      style={{ '--modal-accent': service.accent } as React.CSSProperties}
    >
      <span className="cv-modal-service-icon">
        <ServiceIcon iconKey={service.iconKey} size={26} />
      </span>
      <div>
        <strong>{service.tagline}</strong>
        <div className="cv-tag-row">
          {service.tags.map((t) => (
            <span key={t} className="cv-micro-tag">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>

    <p className="cv-modal-p">{service.description}</p>
    <p className="cv-modal-p is-muted">{service.secondaryText}</p>

    <div className="cv-modal-highlights">
      <span className="cv-mono-tiny">WAS BEI CLOUDVIBE ENTHALTEN IST</span>
      <ul>
        {service.highlights.map((h) => (
          <li key={h}>
            <CheckCircle2 size={15} style={{ color: service.accent, flexShrink: 0 }} />
            <span>{h}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="cv-modal-actions">
      <button
        type="button"
        className="cv-btn cv-btn-primary"
        onClick={() => {
          onClose();
          onOpenBooking();
        }}
      >
        <Calendar size={15} />
        <span>BERATUNG ZU {service.shortName.toUpperCase()} BUCHEN</span>
      </button>
      <a href={CLOUDVIBE_CONTACT.salesPhoneHref} className="cv-btn cv-btn-outline">
        <Phone size={15} />
        <span>{CLOUDVIBE_CONTACT.salesPhone}</span>
      </a>
    </div>
  </ModalShell>
);

export const BookingModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [slot, setSlot] = useState('Vormittags (09:00 – 12:00)');
  const [contact, setContact] = useState('');
  const [done, setDone] = useState(false);

  return (
    <ModalShell
      eyebrow="ERSTBERATUNG · KOSTENLOS & UNVERBINDLICH"
      title="Beratungstermin vereinbaren"
      onClose={onClose}
    >
      {done ? (
        <div className="cv-modal-done">
          <CheckCircle2 size={32} className="cv-accent-green" />
          <h4>Terminwunsch gespeichert</h4>
          <p>
            Wir melden uns schnellstmöglich unter <strong>{contact}</strong> für deinen Wunschslot (
            <strong>{slot}</strong>) – oder ruf direkt im Sales-Team an:{' '}
            <strong>{CLOUDVIBE_CONTACT.salesPhone}</strong>.
          </p>
          <button type="button" className="cv-btn cv-btn-primary" onClick={onClose}>
            ZURÜCK ZUR SEITE
          </button>
        </div>
      ) : (
        <form
          className="cv-modal-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (!contact.trim()) return;
            setDone(true);
          }}
        >
          <p className="cv-modal-p">
            Sprich direkt mit einem unserer 7 IT-Profis aus Goch über deine Praxis-IT, TI-Anbindung,
            DATEV oder Managed Services.
          </p>

          <div className="cv-slot-grid">
            {[
              'Vormittags (09:00 – 12:00)',
              'Nachmittags (13:30 – 17:00)',
              'Schnellstmöglicher Rückruf',
            ].map((item) => (
              <button
                key={item}
                type="button"
                className={`cv-slot-btn ${slot === item ? 'is-active' : ''}`}
                onClick={() => setSlot(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <label className="cv-field">
            <span>Telefonnummer oder E-Mail *</span>
            <input
              type="text"
              required
              placeholder="+49 ... oder name@praxis.de"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </label>

          <div className="cv-modal-actions">
            <button type="submit" className="cv-btn cv-btn-primary">
              <Calendar size={15} />
              <span>RÜCKRUF ANFORDERN</span>
            </button>
            <a href={`mailto:${CLOUDVIBE_CONTACT.email}`} className="cv-btn cv-btn-outline">
              <Mail size={15} />
              <span>{CLOUDVIBE_CONTACT.email}</span>
            </a>
          </div>
        </form>
      )}
    </ModalShell>
  );
};

export const RemoteSupportModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <ModalShell
    eyebrow="DIREKT-SUPPORT · Ø < 7 MIN. REAKTIONSZEIT"
    title="cloudvibe Fernwartung"
    onClose={onClose}
  >
    <div className="cv-remote-card">
      <Headphones size={26} className="cv-accent-green" />
      <div>
        <strong>Schnelle Hilfe ohne Anfahrt</strong>
        <p>
          Unser Team in Goch schaltet sich nach deiner Freigabe verschlüsselt auf deinen Arbeitsplatz
          oder Server – deutschlandweit und DSGVO-konform.
        </p>
      </div>
    </div>

    <ol className="cv-remote-steps">
      <li>
        <strong>1. Support anrufen:</strong> {CLOUDVIBE_CONTACT.supportPhone} (direkt zu unseren
        Technikern, kein Callcenter).
      </li>
      <li>
        <strong>2. Sitzungs-ID erhalten:</strong> Dein Ansprechpartner nennt dir den persönlichen
        Verbindungscode.
      </li>
      <li>
        <strong>3. Live zusehen:</strong> Du behältst jederzeit die volle Kontrolle und kannst die
        Sitzung mit einem Klick beenden.
      </li>
    </ol>

    <div className="cv-modal-actions">
      <a href={CLOUDVIBE_CONTACT.supportPhoneHref} className="cv-btn cv-btn-primary">
        <Phone size={15} />
        <span>SUPPORT ANRUFEN</span>
      </a>
      <a
        href="https://cloudvibe.de"
        target="_blank"
        rel="noreferrer"
        className="cv-btn cv-btn-outline"
      >
        <ShieldCheck size={15} />
        <span>CLOUDVIBE.DE ÖFFNEN</span>
      </a>
    </div>
  </ModalShell>
);

export const LegalModal: React.FC<{ topic: LegalTopic; onClose: () => void }> = ({
  topic,
  onClose,
}) => {
  const titles: Record<LegalTopic, string> = {
    impressum: 'Impressum',
    datenschutz: 'Datenschutz & DSGVO',
    agb: 'Allgemeine Geschäftsbedingungen (AGB)',
    cookies: 'Cookie-Einstellungen',
  };

  return (
    <ModalShell eyebrow="RECHTLICHE HINWEISE" title={titles[topic]} onClose={onClose}>
      <p className="cv-modal-p">
        <strong>{CLOUDVIBE_CONTACT.company}</strong>
        <br />
        {CLOUDVIBE_CONTACT.street}
        <br />
        {CLOUDVIBE_CONTACT.city}, Deutschland
      </p>
      <p className="cv-modal-p is-muted">
        Support: {CLOUDVIBE_CONTACT.supportPhone} · Sales: {CLOUDVIBE_CONTACT.salesPhone} · E-Mail:{' '}
        {CLOUDVIBE_CONTACT.email}
      </p>
      {topic === 'cookies' ? (
        <p className="cv-modal-p is-muted">
          Diese Landingpage speichert ausschließlich deine gewählte Darstellungsoption (Dark / Light
          Theme) lokal in deinem Browser. Es werden keine Tracking- oder Werbe-Cookies gesetzt.
        </p>
      ) : (
        <p className="cv-modal-p is-muted">
          Die vollständigen, tagesaktuellen Rechtstexte findest du jederzeit auf der offiziellen
          Website unter <strong>cloudvibe.de</strong>.
        </p>
      )}
      <div className="cv-modal-actions">
        <button type="button" className="cv-btn cv-btn-primary" onClick={onClose}>
          VERSTANDEN
        </button>
      </div>
    </ModalShell>
  );
};
