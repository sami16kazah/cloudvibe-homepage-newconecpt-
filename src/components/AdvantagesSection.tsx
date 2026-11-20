import React from 'react';
import {
  Clock,
  Cpu,
  HeartPulse,
  Layers,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { ADVANTAGES } from '../data/cloudvibeData';
import { SectionHeader } from './SectionHeader';

const ADVANTAGE_ICONS: Record<string, React.ReactNode> = {
  response: <Clock size={18} />,
  personal: <Users size={18} />,
  telekonnekt: <HeartPulse size={18} />,
  'all-in-one': <Layers size={18} />,
  predictable: <ShieldCheck size={18} />,
  longterm: <Cpu size={18} />,
};

export const AdvantagesSection: React.FC = () => {
  return (
    <section id="vorteile" className="cv-section cv-reveal">
      <div className="cv-container">
        <SectionHeader
          code="04 / PRINZIPIEN & VORTEILE"
          meta="GEBAUT FÜR AUSFALLSICHERHEIT"
        />

        <div className="cv-advantages-intro">
          <div className="cv-section-head-stack">
            <h2 className="cv-display-heading">
              Deine Vorteile mit <span className="cv-accent-green">cloudvibe.</span>
            </h2>
            <p className="cv-lead-paragraph">
              Bei uns arbeitest du mit echten Techs statt Callcenter-Skripten. Kurze Wege, klar
              vereinbarte Reaktionszeiten und Systeme, auf die du dich jeden Tag verlassen kannst.
            </p>
          </div>

          <figure className="cv-editorial-photo cv-advantages-photo">
            <img
              src="./photos/nn_cloudvibe-10.webp"
              alt="Schneller IT-Support und Fernwartung am Arbeitsplatz bei cloudvibe"
              loading="lazy"
            />
            <figcaption>
              <span>DIREKT-SUPPORT</span>
              <span>Ø unter 7 Minuten erste Reaktionszeit</span>
            </figcaption>
          </figure>
        </div>

        {/* 6-cell hairline architectural grid with cursor spotlight */}
        <div className="cv-principles-grid">
          {ADVANTAGES.map((adv) => (
            <div
              key={adv.id}
              className="cv-principle-cell"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
              }}
            >
              <div className="cv-principle-top">
                <span className="cv-principle-icon">{ADVANTAGE_ICONS[adv.id]}</span>
                <span className="cv-principle-num">{adv.number}</span>
              </div>

              <div className="cv-principle-metric">{adv.metric}</div>
              <h3>{adv.title}</h3>
              <p>{adv.description}</p>
              <span className="cv-principle-tag">{adv.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
