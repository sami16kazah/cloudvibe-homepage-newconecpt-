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
  PanelLeftClose,
  PanelLeftOpen,
  ShieldCheck,
  Sun,
  X,
} from 'lucide-react';
import { NAV_SECTIONS } from '../data/cloudvibeData';
import { CloudVibeLogo } from './CloudVibeLogo';

interface SidebarProps {
  activeSection: string;
  scrollProgress: number;
  expanded: boolean;
  mobileOpen: boolean;
  theme: 'dark' | 'light';
  onToggleExpand: () => void;
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

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  scrollProgress,
  expanded,
  mobileOpen,
  theme,
  onToggleExpand,
  onCloseMobile,
  onToggleTheme,
  onNavigate,
  onOpenBooking,
  onOpenRemote,
}) => {
  return (
    <>
      {/* Backdrop for mobile drawer */}
      <div
        className={`cv-sidebar-backdrop ${mobileOpen ? 'is-visible' : ''}`}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      <aside
        id="cv-sidebar-nav"
        className={`cv-sidebar ${expanded ? 'is-expanded' : ''} ${mobileOpen ? 'is-mobile-open' : ''}`}
        aria-label="Seitenleiste Navigation"
        role={mobileOpen ? 'dialog' : undefined}
        aria-modal={mobileOpen ? true : undefined}
      >
        {/* Scroll Progress Accent Rail */}
        <div className="cv-sidebar-progress-track" aria-hidden="true">
          <div
            className="cv-sidebar-progress-fill"
            style={{ height: `${Math.min(100, Math.max(4, scrollProgress * 100))}%` }}
          />
        </div>

        {/* Header: CloudVibe Mark + Expand Toggle */}
        <div className="cv-sidebar-head">
          <a
            href="#hero"
            className="cv-sidebar-brand"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('hero');
              onCloseMobile();
            }}
            aria-label="cloudvibe Startseite"
          >
            <CloudVibeLogo variant="mark" className="cv-sidebar-mark" />
            <span className="cv-sidebar-brand-text">
              <strong>cloudvibe</strong>
              <small>Goch · IT &amp; TI</small>
            </span>
          </a>

          <button
            type="button"
            className="cv-sidebar-collapse-btn desktop-only"
            onClick={onToggleExpand}
            aria-label={expanded ? 'Seitenleiste einklappen' : 'Seitenleiste ausklappen'}
            title={expanded ? 'Einklappen' : 'Ausklappen'}
          >
            {expanded ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
          </button>

          <button
            type="button"
            className="cv-sidebar-collapse-btn mobile-only"
            onClick={onCloseMobile}
            aria-label="Menü schließen"
          >
            <X size={18} />
          </button>
        </div>

        {/* Section Navigation */}
        <nav className="cv-sidebar-nav" aria-label="Abschnitte">
          {NAV_SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                className={`cv-sidebar-item ${isActive ? 'is-active' : ''}`}
                onClick={() => {
                  onNavigate(sec.id);
                  onCloseMobile();
                }}
                aria-current={isActive ? 'location' : undefined}
                title={sec.label}
              >
                <span className="cv-sidebar-icon">{SECTION_ICONS[sec.id]}</span>
                <span className="cv-sidebar-item-text">
                  <span>{sec.label}</span>
                </span>
                {isActive && <span className="cv-sidebar-active-pip" aria-hidden="true" />}
              </button>
            );
          })}
        </nav>

        {/* Bottom Utility Actions */}
        <div className="cv-sidebar-foot">
          <button
            type="button"
            className="cv-sidebar-action"
            onClick={() => {
              onOpenRemote();
              onCloseMobile();
            }}
            title="Fernwartung starten"
          >
            <span className="cv-sidebar-icon">
              <Headphones size={17} />
            </span>
            <span className="cv-sidebar-label">Fernwartung</span>
          </button>

          <button
            type="button"
            className="cv-sidebar-action"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Helles Design aktivieren' : 'Dunkles Design aktivieren'}
            title={theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
          >
            <span className="cv-sidebar-icon">
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </span>
            <span className="cv-sidebar-label">
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>

          <button
            type="button"
            className="cv-sidebar-cta"
            onClick={() => {
              onOpenBooking();
              onCloseMobile();
            }}
            title="Beratung vereinbaren"
          >
            <span className="cv-sidebar-icon">
              <Calendar size={17} />
            </span>
            <span className="cv-sidebar-label">Termin buchen</span>
          </button>
        </div>
      </aside>
    </>
  );
};
