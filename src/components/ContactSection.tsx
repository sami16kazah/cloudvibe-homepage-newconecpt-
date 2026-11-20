import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { CLOUDVIBE_CONTACT } from '../data/cloudvibeData';
import { SectionHeader } from './SectionHeader';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [org, setOrg] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Telematikinfrastruktur & Praxis-IT');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section id="kontakt" className="cv-section cv-reveal">
      <div className="cv-container">
        <SectionHeader
          code="06 / KONTAKT & BERATUNG"
          meta="PERSÖNLICH VOR ORT IN GOCH ODER REMOTE DE-WEIT"
        />

        <div className="cv-contact-grid">
          {/* Left direct channels */}
          <div className="cv-contact-info">
            <h2 className="cv-display-heading">
              Jetzt beraten <span className="cv-accent-green">lassen.</span>
            </h2>
            <p className="cv-lead-paragraph">
              Du möchtest deine IT zukunftssicher aufstellen, absichern oder einfach sorgenfrei
              betreiben lassen? Sprich direkt mit uns – unkompliziert und auf Augenhöhe.
            </p>

            <div className="cv-contact-cards">
              <a href={CLOUDVIBE_CONTACT.supportPhoneHref} className="cv-contact-tile">
                <span className="cv-contact-tile-icon is-green">
                  <Phone size={18} />
                </span>
                <div>
                  <span className="cv-mono-tiny">SUPPORT HOTLINE</span>
                  <strong>{CLOUDVIBE_CONTACT.supportPhone}</strong>
                </div>
              </a>

              <a href={CLOUDVIBE_CONTACT.salesPhoneHref} className="cv-contact-tile">
                <span className="cv-contact-tile-icon is-blue">
                  <Phone size={18} />
                </span>
                <div>
                  <span className="cv-mono-tiny">SALES &amp; BERATUNG</span>
                  <strong>{CLOUDVIBE_CONTACT.salesPhone}</strong>
                </div>
              </a>

              <a href={`mailto:${CLOUDVIBE_CONTACT.email}`} className="cv-contact-tile">
                <span className="cv-contact-tile-icon is-orange">
                  <Mail size={18} />
                </span>
                <div>
                  <span className="cv-mono-tiny">ANFRAGEN &amp; BERATUNG</span>
                  <strong>{CLOUDVIBE_CONTACT.email}</strong>
                </div>
              </a>

              <div className="cv-contact-tile">
                <span className="cv-contact-tile-icon">
                  <MapPin size={18} />
                </span>
                <div>
                  <span className="cv-mono-tiny">STANDORT</span>
                  <strong>
                    {CLOUDVIBE_CONTACT.street}, {CLOUDVIBE_CONTACT.city}
                  </strong>
                </div>
              </div>
            </div>

            <div className="cv-sla-banner">
              <Clock size={16} />
              <span>
                Durchschnittliche Reaktionszeit im Support: <strong>unter 7 Minuten</strong> ·
                Individuelle SLA-Vereinbarungen
              </span>
            </div>

            <figure className="cv-editorial-photo cv-contact-photo">
              <img
                src="./photos/nn_cloudvibe-35.webp"
                alt="Deine persönlichen Ansprechpartner bei cloudvibe in Goch"
                loading="lazy"
              />
              <figcaption>
                <span>VON-MONSCHAW-STR. 12A · GOCH</span>
                <span>Direkter Draht zu deinem IT-Team</span>
              </figcaption>
            </figure>
          </div>

          {/* Right Interactive Inquiry Form */}
          <div className="cv-contact-form-panel">
            {submitted ? (
              <div className="cv-form-success" role="status">
                <div className="cv-success-icon">
                  <CheckCircle2 size={32} />
                </div>
                <h3>Anfrage vorgemerkt!</h3>
                <p>
                  Vielen Dank, <strong>{name}</strong>. Deine Anfrage zum Thema{' '}
                  <strong>„{topic}“</strong> wurde erfolgreich vorbereitet. Du kannst sie auch
                  direkt an <strong>{CLOUDVIBE_CONTACT.email}</strong> senden oder uns unter{' '}
                  <strong>{CLOUDVIBE_CONTACT.salesPhone}</strong> erreichen.
                </p>
                <div className="cv-success-actions">
                  <a
                    href={`mailto:${CLOUDVIBE_CONTACT.email}?subject=${encodeURIComponent(
                      `Anfrage: ${topic} (${org || name})`,
                    )}&body=${encodeURIComponent(
                      `Name: ${name}\nPraxis / Unternehmen: ${org}\nE-Mail: ${email}\nThema: ${topic}\n\n${message}`,
                    )}`}
                    className="cv-btn cv-btn-primary"
                  >
                    <Mail size={15} />
                    <span>IM MAIL-CLIENT ÖFFNEN</span>
                  </a>
                  <button
                    type="button"
                    className="cv-btn cv-btn-outline"
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                  >
                    NEUE ANFRAGE
                  </button>
                </div>
              </div>
            ) : (
              <form className="cv-form" onSubmit={handleSubmit}>
                <div className="cv-form-head">
                  <span className="cv-mono-tiny">DIREKTKONTAKT · UNVERBINDLICH</span>
                  <h3>Erstberatung anfragen</h3>
                </div>

                <div className="cv-form-row">
                  <label className="cv-field">
                    <span>Dein Name *</span>
                    <input
                      type="text"
                      required
                      placeholder="Dr. Anna Beispiel"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                  <label className="cv-field">
                    <span>Praxis / Unternehmen</span>
                    <input
                      type="text"
                      placeholder="Praxis, Apotheke oder Kanzlei"
                      value={org}
                      onChange={(e) => setOrg(e.target.value)}
                    />
                  </label>
                </div>

                <div className="cv-form-row">
                  <label className="cv-field">
                    <span>E-Mail-Adresse *</span>
                    <input
                      type="email"
                      required
                      placeholder="name@praxis.de"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>

                  <label className="cv-field">
                    <span>Themenbereich</span>
                    <select value={topic} onChange={(e) => setTopic(e.target.value)}>
                      <option>Telematikinfrastruktur &amp; Praxis-IT</option>
                      <option>TI für Apotheken &amp; Pflege</option>
                      <option>Managed Services (Firewall, Server, Backup)</option>
                      <option>DATEV Support</option>
                      <option>SelectLine Software / ERP</option>
                      <option>Managed Phone Service (MS Teams)</option>
                    </select>
                  </label>
                </div>

                <label className="cv-field">
                  <span>Wie können wir dir helfen?</span>
                  <textarea
                    rows={4}
                    placeholder="Erzähl uns kurz von deiner IT-Umgebung oder deinem Wunschtermin..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </label>

                <div className="cv-form-foot">
                  <span className="cv-form-note">
                    Antwort direkt von unserem Team in Goch – kein Callcenter.
                  </span>
                  <button type="submit" className="cv-btn cv-btn-primary">
                    <Send size={15} />
                    <span>ANFRAGE ABSENDEN</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
