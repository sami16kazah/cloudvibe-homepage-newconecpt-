import React from 'react';
import {
  Award,
  Calendar,
  Compass,
  Cpu,
  Grid2x2,
  Headphones,
  Home,
  Mail,
  Moon,
  ShieldCheck,
  Sun,
  X,
} from 'lucide-react';
import { NAV_SECTIONS } from '../data/cloudvibeData';
import { CloudVibeLogo } from './CloudVibeLogo';

interface SidebarProps {
  activeSection: string;
  mobileOpen: boolean;
  theme: 'dark' | 'light';
  onCloseMobile: () => void;
  onToggleTheme: () => void;
  onNavigate: (id: string) => void;
  onOpenBooking: () => void;
  onOpenRemote: () => void;
}

const SECTION_ICONS: Record<string, React.ReactNode> = {
  hero: <Home size={18} />,
  ueberblick: <Compass size={18} />,
  loesungen: <Grid2x2 size={18} />,
  architektur: <Cpu size={18} />,
  vorteile: <ShieldCheck size={18} />,
  referenzen: <Award size={18} />,
  kontakt: <Mail size={18} />,
};

/* Mobile & Tablet Slide-Over Navigation Drawer (hidden on desktop where fixed TopBar + ScrollRuler handle navigation cleanly) */
export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  mobileOpen,
  theme,
  onCloseMobile,
  onToggleTheme,
  onNavigate,
  onOpenBooking,
  onOpenRemote,
}) => {
  return (
    <>
      <div
        className={`cv-sidebar-backdrop ${mobileOpen ? 'is-visible' : ''}`}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      <aside
        id="cv-sidebar-nav"
        className={`cv-mobile-drawer ${mobileOpen ? 'is-mobile-open' : ''}`}
        aria-label="Mobile Navigation"
        role={mobileOpen ? 'dialog' : undefined}
        aria-modal={mobileOpen ? true : undefined}
      >
        <div className="cv-drawer-head">
          <a
            href="#hero"
            className="cv-drawer-brand"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('hero');
              onCloseMobile();
            }}
            aria-label="cloudvibe Startseite"
          >
            <CloudVibeLogo variant="mark" className="cv-sidebar-mark" />
            <span className="cv-drawer-brand-text">
              <strong>cloudvibe</strong>
              <small>Goch · IT &amp; TI</small>
            </span>
          </a>

          <button
            type="button"
            className="cv-sidebar-collapse-btn"
            onClick={onCloseMobile}
            aria-label="Menü schließen"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="cv-drawer-nav" aria-label="Abschnitte">
          {NAV_SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                className={`cv-drawer-item ${isActive ? 'is-active' : ''}`}
                onClick={() => {
                  onNavigate(sec.id);
                  onCloseMobile();
                }}
                aria-current={isActive ? 'location' : undefined}
              >
                <span className="cv-sidebar-icon">{SECTION_ICONS[sec.id]}</span>
                <span>{sec.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="cv-drawer-foot">
          <button
            type="button"
            className="cv-drawer-action"
            onClick={() => {
              onOpenRemote();
              onCloseMobile();
            }}
          >
            <Headphones size={17} />
            <span>Fernwartung</span>
          </button>

          <button
            type="button"
            className="cv-drawer-action"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Helles Design aktivieren' : 'Dunkles Design aktivieren'}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          <button
            type="button"
            className="cv-drawer-cta"
            onClick={() => {
              onOpenBooking();
              onCloseMobile();
            }}
          >
            <Calendar size={17} />
            <span>Termin buchen</span>
          </button>
        </div>
      </aside>
    </>
  );
};
