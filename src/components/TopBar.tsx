import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  ChevronDown,
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
  mobileMenuOpen: boolean;
  onToggleTheme: () => void;
  onOpenMobileMenu: () => void;
  onNavigate: (id: string) => void;
  onSelectCategory: (cat: ServiceCategory) => void;
  onSelectService: (service: CloudVibeService) => void;
  onOpenBooking: () => void;
}

type DropdownKey = 'gesundheitswesen' | 'managed' | 'software' | null;

export const TopBar: React.FC<TopBarProps> = ({
  theme,
  mobileMenuOpen,
  onToggleTheme,
  onOpenMobileMenu,
  onNavigate,
  onSelectCategory,
  onSelectService,
  onOpenBooking,
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
    <header className="cv-topbar" ref={navRef}>
      <div className="cv-topbar-inner">
        {/* Left: Mobile Brand + Desktop ArtCraft-Style Hairline Nav */}
        <div className="cv-topbar-left">
          <button
            type="button"
            className="cv-icon-btn mobile-only"
            onClick={onOpenMobileMenu}
            aria-label="Open main menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="cv-sidebar-nav"
            aria-haspopup="menu"
            title="Menü öffnen"
          >
            <Menu size={19} />
          </button>

          <a
            href="#hero"
            className="cv-topbar-brand mobile-only"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('hero');
            }}
          >
            <CloudVibeLogo variant="compact" animateBinary={false} />
          </a>

          <nav className="cv-topbar-nav desktop-only" aria-label="Hauptnavigation">
            <button
              type="button"
              className="cv-nav-pill is-home"
              onClick={() => {
                setOpenMenu(null);
                onNavigate('hero');
              }}
            >
              START
            </button>

            {menuGroups.map((group) => {
              const isOpen = openMenu === group.key;
              const items = SERVICES.filter((s) => s.category === group.key);
              return (
                <div key={group.key} className="cv-dropdown-wrap">
                  <button
                    type="button"
                    className={`cv-nav-trigger ${isOpen ? 'is-open' : ''}`}
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
              className="cv-nav-trigger"
              onClick={() => {
                setOpenMenu(null);
                onNavigate('vorteile');
              }}
            >
              VORTEILE
            </button>
            <button
              type="button"
              className="cv-nav-trigger"
              onClick={() => {
                setOpenMenu(null);
                onNavigate('referenzen');
              }}
            >
              REFERENZEN
            </button>
            <button
              type="button"
              className="cv-nav-trigger"
              onClick={() => {
                setOpenMenu(null);
                onNavigate('kontakt');
              }}
            >
              KONTAKT
            </button>
          </nav>
        </div>

        {/* Right: Support Phone + Theme Toggle + Primary CTA */}
        <div className="cv-topbar-right">
          <a
            href={CLOUDVIBE_CONTACT.supportPhoneHref}
            className="cv-phone-chip desktop-wide-only"
            title="Support-Hotline anrufen"
          >
            <Phone size={13} />
            <span>{CLOUDVIBE_CONTACT.supportPhone}</span>
          </a>

          <button
            type="button"
            className="cv-theme-toggle"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Zu hellem Design wechseln' : 'Zu dunklem Design wechseln'}
            title={theme === 'dark' ? 'Helles Design' : 'Dunkles Design'}
          >
            <span className="cv-theme-toggle-track">
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </span>
            <span className="cv-theme-toggle-label">
              {theme === 'dark' ? 'LIGHT' : 'DARK'}
            </span>
          </button>

          <button type="button" className="cv-topbar-cta" onClick={onOpenBooking}>
            <span>BERATUNG BUCHEN</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </header>
  );
};
