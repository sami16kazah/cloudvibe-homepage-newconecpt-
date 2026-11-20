import React, { useState } from 'react';
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  Headphones,
  Moon,
  Phone,
  Sun,
} from 'lucide-react';
import {
  CLOUDVIBE_CONTACT,
  SERVICES,
  type CloudVibeService,
  type ServiceCategory,
} from '../data/cloudvibeData';
import { ServiceIcon } from './ServiceIcon';

interface SidebarProps {
  activeSection: string;
  mobileOpen: boolean;
  theme: 'dark' | 'light';
  onCloseMobile: () => void;
  onToggleTheme: () => void;
  onNavigate: (id: string) => void;
  onSelectService: (service: CloudVibeService) => void;
  onSelectCategory: (cat: ServiceCategory) => void;
  onOpenBooking: () => void;
  onOpenRemote: () => void;
}

const MOBILE_GROUPS: { key: ServiceCategory; label: string }[] = [
  { key: 'gesundheitswesen', label: 'Gesundheitswesen & TI' },
  { key: 'managed', label: 'Managed Services' },
  { key: 'software', label: 'DATEV & SelectLine' },
];

const DIRECT_LINKS = [
  { id: 'ueberblick', label: 'Überblick' },
  { id: 'architektur', label: 'Live-Architektur' },
  { id: 'vorteile', label: 'Deine Vorteile' },
  { id: 'referenzen', label: 'Team & Referenzen' },
  { id: 'kontakt', label: 'Kontakt & Goch' },
];

/* Adobe-Style Full-Width Mobile & Tablet Drop-Down Accordion Menu Sheet */
export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  mobileOpen,
  theme,
  onCloseMobile,
  onToggleTheme,
  onNavigate,
  onSelectService,
  onSelectCategory,
  onOpenBooking,
  onOpenRemote,
}) => {
  const [openGroup, setOpenGroup] = useState<ServiceCategory | null>('gesundheitswesen');

  return (
    <>
      <div
        className={`cv-sidebar-backdrop ${mobileOpen ? 'is-visible' : ''}`}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      <aside
        id="cv-sidebar-nav"
        className={`cv-adobe-mobile-sheet ${mobileOpen ? 'is-mobile-open' : ''}`}
        aria-label="Mobile Navigation"
        role={mobileOpen ? 'dialog' : undefined}
        aria-modal={mobileOpen ? true : undefined}
      >
        <div className="cv-adobe-sheet-scroll">
          {/* Expandable Adobe-Style Service Category Accordions */}
          <div className="cv-adobe-accordions">
            {MOBILE_GROUPS.map((group) => {
              const isOpen = openGroup === group.key;
              const items = SERVICES.filter((s) => s.category === group.key);
              return (
                <div
                  key={group.key}
                  className={`cv-adobe-acc-item ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    type="button"
                    className="cv-adobe-acc-trigger"
                    aria-expanded={isOpen}
                    onClick={() => setOpenGroup(isOpen ? null : group.key)}
                  >
                    <span>{group.label}</span>
                    <ChevronDown size={17} className="cv-adobe-acc-chevron" />
                  </button>

                  {isOpen && (
                    <div className="cv-adobe-acc-body">
                      {items.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          className="cv-adobe-service-row"
                          onClick={() => {
                            onSelectService(item);
                            onCloseMobile();
                          }}
                        >
                          <span
                            className="cv-adobe-service-badge"
                            style={{ background: item.accentSoft, color: item.accent }}
                          >
                            <ServiceIcon iconKey={item.iconKey} size={16} />
                          </span>
                          <span className="cv-adobe-service-text">
                            <strong>{item.name}</strong>
                            <small>{item.tagline}</small>
                          </span>
                        </button>
                      ))}
                      <button
                        type="button"
                        className="cv-adobe-acc-all"
                        onClick={() => {
                          onSelectCategory(group.key);
                          onNavigate('loesungen');
                          onCloseMobile();
                        }}
                      >
                        <span>Alle {group.label} ansehen</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Clean Direct Section Links */}
          <nav className="cv-adobe-direct-links" aria-label="Abschnitte">
            {DIRECT_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                className={`cv-adobe-link-row ${activeSection === link.id ? 'is-active' : ''}`}
                onClick={() => {
                  onNavigate(link.id);
                  onCloseMobile();
                }}
              >
                <span>{link.label}</span>
                <ArrowRight size={15} />
              </button>
            ))}
          </nav>

          {/* Bottom Utility Actions (Hotline, Fernwartung, Theme, Primary Pill CTA) */}
          <div className="cv-adobe-sheet-foot">
            <div className="cv-adobe-quick-grid">
              <a
                href={CLOUDVIBE_CONTACT.supportPhoneHref}
                className="cv-adobe-quick-btn"
              >
                <Phone size={15} />
                <span>Support anrufen</span>
              </a>
              <button
                type="button"
                className="cv-adobe-quick-btn"
                onClick={() => {
                  onOpenRemote();
                  onCloseMobile();
                }}
              >
                <Headphones size={15} />
                <span>Fernwartung</span>
              </button>
            </div>

            <div className="cv-adobe-sheet-actions">
              <button
                type="button"
                className="cv-adobe-theme-pill"
                onClick={onToggleTheme}
                aria-label={theme === 'dark' ? 'Helles Design aktivieren' : 'Dunkles Design aktivieren'}
              >
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>

              <button
                type="button"
                className="cv-adobe-primary-pill"
                onClick={() => {
                  onOpenBooking();
                  onCloseMobile();
                }}
              >
                <Calendar size={15} />
                <span>Beratung vereinbaren</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
