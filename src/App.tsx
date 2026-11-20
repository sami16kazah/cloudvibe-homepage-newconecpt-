import React, { useEffect, useState } from 'react';
import { AdobeFooter, type LegalTopic } from './components/AdobeFooter';
import { AdvantagesSection } from './components/AdvantagesSection';
import { ArchitectureShowcase } from './components/ArchitectureShowcase';
import { ContactSection } from './components/ContactSection';
import {
  BookingModal,
  LegalModal,
  RemoteSupportModal,
  ServiceDetailModal,
} from './components/Modals';
import { OrbitalHero } from './components/OrbitalHero';
import { ReferencesAndTeam } from './components/ReferencesAndTeam';
import { ScrollRuler } from './components/ScrollRuler';
import { ServiceGrid } from './components/ServiceGrid';
import { ServiceOverview } from './components/ServiceOverview';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import {
  NAV_SECTIONS,
  type CloudVibeService,
  type ServiceCategory,
} from './data/cloudvibeData';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const param = new URLSearchParams(window.location.search).get('theme');
      if (param === 'light' || param === 'dark') return param;
    }
    if (typeof document !== 'undefined') {
      const attr = document.documentElement.getAttribute('data-theme');
      if (attr === 'light' || attr === 'dark') return attr;
    }
    return 'dark';
  });

  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCategory, setActiveCategory] = useState<'all' | ServiceCategory>('all');

  // Interactive modals
  const [selectedService, setSelectedService] = useState<CloudVibeService | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [remoteOpen, setRemoteOpen] = useState(false);
  const [legalTopic, setLegalTopic] = useState<LegalTopic | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    try {
      localStorage.setItem('cloudvibe-theme', theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  // Scroll spy & vertical scroll progress
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollY / docHeight : 0);

      const offset = 180;
      let current = NAV_SECTIONS[0].id;
      for (const sec of NAV_SECTIONS) {
        const el = document.getElementById(sec.id);
        if (el && el.offsetTop - offset <= scrollY) {
          current = sec.id;
        }
      }
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-reveal observer for sections
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.cv-reveal'));
    const revealVisible = () => {
      const vh = window.innerHeight || 900;
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh + 120) {
          el.classList.add('is-revealed');
        }
      });
    };

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    revealVisible();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: '140px 0px 140px 0px' },
    );

    els.forEach((el) => {
      if (!el.classList.contains('is-revealed')) {
        io.observe(el);
      }
    });
    return () => io.disconnect();
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const navigateTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      className={`cv-app-shell ${sidebarExpanded ? 'has-sidebar-expanded' : ''}`}
    >
      {/* Top Scroll Progress Line */}
      <div className="cv-top-progress" aria-hidden="true">
        <div
          className="cv-top-progress-bar"
          style={{ transform: `scaleX(${Math.min(1, Math.max(0, scrollProgress))})` }}
        />
      </div>

      {/* Collapsible ArtCraft + Adobe Creative Left Sidebar */}
      <Sidebar
        activeSection={activeSection}
        scrollProgress={scrollProgress}
        expanded={sidebarExpanded}
        mobileOpen={mobileMenuOpen}
        theme={theme}
        onToggleExpand={() => setSidebarExpanded((prev) => !prev)}
        onCloseMobile={() => setMobileMenuOpen(false)}
        onToggleTheme={toggleTheme}
        onNavigate={navigateTo}
        onOpenBooking={() => setBookingOpen(true)}
        onOpenRemote={() => setRemoteOpen(true)}
      />

      {/* Main Content Stage */}
      <div className="cv-main-frame">
        <TopBar
          theme={theme}
          mobileMenuOpen={mobileMenuOpen}
          onToggleTheme={toggleTheme}
          onOpenMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
          onNavigate={navigateTo}
          onSelectCategory={(cat) => setActiveCategory(cat)}
          onSelectService={(srv) => setSelectedService(srv)}
          onOpenBooking={() => setBookingOpen(true)}
        />

        <main id="main-content">
          <OrbitalHero
            onSelectService={(srv) => setSelectedService(srv)}
            onNavigate={navigateTo}
            onOpenBooking={() => setBookingOpen(true)}
          />

          <ServiceOverview
            onSelectService={(srv) => setSelectedService(srv)}
            onOpenBooking={() => setBookingOpen(true)}
          />

          <ServiceGrid
            activeCategory={activeCategory}
            onChangeCategory={setActiveCategory}
            onSelectService={(srv) => setSelectedService(srv)}
            onOpenBooking={() => setBookingOpen(true)}
          />

          <ArchitectureShowcase />

          <AdvantagesSection />

          <ReferencesAndTeam onOpenBooking={() => setBookingOpen(true)} />

          <ContactSection />
        </main>

        <AdobeFooter
          onSelectService={(srv) => setSelectedService(srv)}
          onSelectCategory={(cat) => setActiveCategory(cat)}
          onNavigate={navigateTo}
          onOpenBooking={() => setBookingOpen(true)}
          onOpenRemote={() => setRemoteOpen(true)}
          onOpenLegal={(topic) => setLegalTopic(topic)}
        />
      </div>

      {/* ArtCraft-inspired Precision Vertical Ruler Side Scroll */}
      <ScrollRuler />

      {/* Modals */}
      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onOpenBooking={() => setBookingOpen(true)}
        />
      )}
      {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}
      {remoteOpen && <RemoteSupportModal onClose={() => setRemoteOpen(false)} />}
      {legalTopic && <LegalModal topic={legalTopic} onClose={() => setLegalTopic(null)} />}
    </div>
  );
};

export default App;
