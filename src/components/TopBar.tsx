import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  ChevronDown,
  Headphones,
  Menu,
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
import { CloudVibeLogo } from './CloudVibeLogo';
import { ServiceIcon } from './ServiceIcon';

interface TopBarProps {
  theme: 'dark' | 'light';
  activeSection: string;
  scrolled: boolean;
  pastHero: boolean;
  mobileMenuOpen: boolean;
  onToggleTheme: () => void;
  onOpenMobileMenu: () => void;
  onNavigate: (id: string) => void;
  onSelectCategory: (cat: ServiceCategory) => void;
  onSelectService: (service: CloudVibeService) => void;
  onOpenBooking: () => void;
  onOpenRemote: () => void;
}

type DropdownKey = 'gesundheitswesen' | 'managed' | 'software' | null;

export const TopBar: React.FC<TopBarProps> = ({
  theme,
  activeSection,
  scrolled,
  pastHero,
  mobileMenuOpen,
  onToggleTheme,
  onOpenMobileMenu,
  onNavigate,
  onSelectCategory,
  onSelectService,
  onOpenBooking,
  onOpenRemote,
}) => {
  const [openMenu, setOpenMenu] = useState<DropdownKey>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMenu(null);
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  const menuGroups: { key: Exclude<DropdownKey, null>; label: string }[] = [
    { key: 'gesundheitswesen', label: 'GESUNDHEITSWESEN' },
    { key: 'managed', label: 'LÖSUNGEN' },
    { key: 'software', label: 'SOFTWARE' },
  ];

  return (
    <header
      className={`cv-topbar ${scrolled ? 'is-scrolled' : ''}`}
      ref={navRef}
    >
      <div className="cv-topbar-inner">
        {/* Left: Scroll-Reactive Brand Cell (Cloud Only in Hero -> Smooth Reveal to Right on Scroll) */}
        <div className="cv-topbar-left">
          <a
            href="#hero"
            className={`cv-topbar-brand-cell ${pastHero ? 'is-expanded' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setOpenMenu(null);
              onNavigate('hero');
            }}
            aria-label="cloudvibe — Your IT. Our business."
          >
            <CloudVibeLogo variant="mark" animateBinary={false} className="cv-topbar-cloud-only" />
            <span className="cv-topbar-logo-reveal" aria-hidden={!pastHero}>
              <span className="cv-topbar-logo-reveal-inner">
                <span className="cv-topbar-wordmark">cloudvibe</span>
                <span className="cv-topbar-slogan">Your IT. Our business.</span>
              </span>
            </span>
          </a>

          <nav className="cv-topbar-nav desktop-only" aria-label="Hauptnavigation">

            {menuGroups.map((group) => {
              const isOpen = openMenu === group.key;
              const items = SERVICES.filter((s) => s.category === group.key);
              return (
                <div key={group.key} className="cv-dropdown-wrap">
                  <button
                    type="button"
                    className={`cv-nav-trigger ${isOpen ? 'is-open' : ''} ${
                      activeSection === 'loesungen' && group.key === 'managed' ? 'is-active' : ''
                    }`}
                    aria-expanded={isOpen}
                    onClick={() => setOpenMenu(isOpen ? null : group.key)}
                  >
                    <span>{group.label}</span>
                    <ChevronDown size={13} className="cv-chevron" />
                  </button>

                  {isOpen && (
                    <div className="cv-dropdown-panel" role="menu">
                      <div className="cv-dropdown-header">
                        <span>{group.label}</span>
                        <button
                          type="button"
                          className="cv-dropdown-all"
                          onClick={() => {
                            onSelectCategory(group.key);
                            onNavigate('loesungen');
                            setOpenMenu(null);
                          }}
                        >
                          ALLE ANSEHEN <ArrowUpRight size={12} />
                        </button>
                      </div>
                      <div className="cv-dropdown-list">
                        {items.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            role="menuitem"
                            className="cv-dropdown-item"
                            onClick={() => {
                              onSelectService(item);
                              setOpenMenu(null);
                            }}
                          >
                            <span
                              className="cv-dropdown-badge"
                              style={{ background: item.accentSoft, color: item.accent }}
                            >
                              <ServiceIcon iconKey={item.iconKey} size={15} />
                            </span>
                            <span className="cv-dropdown-item-copy">
                              <strong>{item.name}</strong>
                              <small>{item.tagline}</small>
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <button
              type="button"
              className={`cv-nav-trigger ${activeSection === 'architektur' ? 'is-active' : ''}`}
              onClick={() => {
                setOpenMenu(null);
                onNavigate('architektur');
              }}
            >
              ARCHITEKTUR
            </button>

            <button
              type="button"
              className={`cv-nav-trigger ${activeSection === 'vorteile' ? 'is-active' : ''}`}
              onClick={() => {
                setOpenMenu(null);
                onNavigate('vorteile');
              }}
            >
              VORTEILE
            </button>

            <button
              type="button"
              className={`cv-nav-trigger ${activeSection === 'referenzen' ? 'is-active' : ''}`}
              onClick={() => {
                setOpenMenu(null);
                onNavigate('referenzen');
              }}
            >
              TEAM
            </button>

            <button
              type="button"
              className={`cv-nav-trigger ${activeSection === 'kontakt' ? 'is-active' : ''}`}
              onClick={() => {
                setOpenMenu(null);
                onNavigate('kontakt');
              }}
            >
              KONTAKT
            </button>
          </nav>
        </div>

        {/* Right: ArtCraft-Style Hairline Utility Cells + Full-Height CTA */}
        <div className="cv-topbar-right">
          <a
            href={CLOUDVIBE_CONTACT.supportPhoneHref}
            className="cv-topbar-cell cv-topbar-phone desktop-wide-only"
            title="Support-Hotline anrufen"
          >
            <Phone size={13} />
            <span>{CLOUDVIBE_CONTACT.supportPhone}</span>
          </a>

          <button
            type="button"
            className="cv-topbar-cell desktop-only"
            onClick={onOpenRemote}
            title="Fernwartung starten"
          >
            <Headphones size={14} />
            <span>FERNWARTUNG</span>
          </button>

          <button
            type="button"
            className="cv-topbar-cell cv-topbar-theme-cell"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Zu hellem Design wechseln' : 'Zu dunklem Design wechseln'}
            title={theme === 'dark' ? 'Helles Design' : 'Dunkles Design'}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <button
            type="button"
            className="cv-topbar-cell cv-topbar-menu-btn mobile-only"
            onClick={onOpenMobileMenu}
            aria-label="Open main menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="cv-sidebar-nav"
            aria-haspopup="menu"
            title="Menü öffnen"
          >
            <Menu size={19} />
          </button>

          <button type="button" className="cv-topbar-cta-flush" onClick={onOpenBooking}>
            <span>BERATUNG BUCHEN</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </header>
  );
};
