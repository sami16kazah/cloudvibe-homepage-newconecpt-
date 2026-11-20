export type ServiceCategory = 'gesundheitswesen' | 'managed' | 'software';

export interface CloudVibeService {
  id: string;
  index: string;
  name: string;
  shortName: string;
  category: ServiceCategory;
  categoryLabel: string;
  tagline: string;
  description: string;
  secondaryText: string;
  accent: string;
  accentSoft: string;
  iconKey:
    | 'ti'
    | 'healthcare'
    | 'arztpraxis'
    | 'apotheke'
    | 'pflege'
    | 'datev'
    | 'selectline'
    | 'infrastructure'
    | 'server'
    | 'backup'
    | 'firewall'
    | 'security'
    | 'phone';
  tags: string[];
  highlights: string[];
  featuredInOrbit?: boolean;
  featuredInFooter?: boolean;
}

export const CLOUDVIBE_CONTACT = {
  company: 'cloudvibe GmbH',
  slogan: 'Your IT. Our business.',
  street: 'Von-Monschaw-Str. 12a',
  city: '47574 Goch',
  region: 'Niederrhein · Vor Ort & deutschlandweit per Fernwartung',
  supportPhone: '+49 2823 8901434-00',
  supportPhoneHref: 'tel:+492823890143400',
  salesPhone: '+49 2823 8901434-60',
  salesPhoneHref: 'tel:+492823890143460',
  email: 'weenable@cloudvibe.de',
  careerEmail: 'hire@cloudvibe.de',
  website: 'https://cloudvibe.de',
  avgResponseTime: '< 7 Min.',
  teamSize: '7 IT-Profis',
};

export const SERVICES: CloudVibeService[] = [
  {
    id: 'telematikinfrastruktur',
    index: '01',
    name: 'Telematikinfrastruktur',
    shortName: 'TI-Anbindung',
    category: 'gesundheitswesen',
    categoryLabel: 'GESUNDHEITSWESEN',
    tagline: 'Konnektor, TI-Gateway, KIM & Kartenlesegeräte aus einer Hand.',
    description:
      'TI-Anbindung mit KIM, Kartenlesegeräten und Konnektor oder TI-Gateway – gesetzeskonform, verständlich erklärt und zuverlässig umgesetzt.',
    secondaryText:
      'Für Arztpraxen, Apotheken und Pflegeeinrichtungen, die sicher digital vernetzt sein wollen.',
    accent: '#2eb329',
    accentSoft: 'rgba(46, 179, 41, 0.16)',
    iconKey: 'ti',
    tags: ['TELEKONNEKT-PARTNER', 'TI-GATEWAY', 'KIM', 'GEMATIK'],
    highlights: [
      'Lieferung & Einrichtung von TI-Gateways, Konnektoren und eHealth-Kartenterminals',
      'Einrichtung & Betrieb sicherer KIM-Adressen für eArztbrief, eAU und E-Rezept',
      'Persönliche Begleitung bei Wechsel, Zertifikatstausch und Wartung im laufenden Betrieb',
    ],
    featuredInOrbit: true,
    featuredInFooter: true,
  },
  {
    id: 'healthcare',
    index: '02',
    name: 'Healthcare IT',
    shortName: 'Healthcare',
    category: 'gesundheitswesen',
    categoryLabel: 'GESUNDHEITSWESEN',
    tagline: 'Ausfallsicherheit, Datenschutz und maximale Verfügbarkeit.',
    description:
      'Spezialisierte IT-Dienstleistungen für medizinische Einrichtungen – mit Fokus auf Ausfallsicherheit, Datenschutz und Verfügbarkeit.',
    secondaryText:
      'Damit du dich voll und ganz auf deine Patientinnen und Patienten konzentrieren kannst.',
    accent: '#0ea5e9',
    accentSoft: 'rgba(14, 165, 233, 0.16)',
    iconKey: 'healthcare',
    tags: ['DSGVO', 'HOCHVERFÜGBAR', 'SLA', 'PRAXIS-IT'],
    highlights: [
      'Nahtloses Zusammenspiel aus Praxisverwaltung, Telefonie, Netzwerk und TI',
      'Datenschutzkonforme Segmentierung sensibler Patientendaten',
      'Individuelle Reaktions- und Servicezeiten gemäß klarem SLA',
    ],
    featuredInOrbit: true,
    featuredInFooter: false,
  },
  {
    id: 'arztpraxen',
    index: '03',
    name: 'IT für Arztpraxen',
    shortName: 'Arztpraxen',
    category: 'gesundheitswesen',
    categoryLabel: 'GESUNDHEITSWESEN',
    tagline: 'Rundum-IT & TI-Anbindung für Arzt- und Zahnarztpraxen.',
    description:
      'IT-Betreuung und TI-Anbindung für Arzt- und Zahnarztpraxen aus einer Hand.',
    secondaryText:
      'Von Netzwerk, Arbeitsplätzen und Backup bis zur Anbindung deiner Praxissoftware.',
    accent: '#185098',
    accentSoft: 'rgba(24, 80, 152, 0.2)',
    iconKey: 'arztpraxis',
    tags: ['ARZTPRAXEN', 'ZAHNARZTPRAXEN', 'PVS', 'MANAGED'],
    highlights: [
      'Komplette Betreuung von Empfangs-, Behandlungs- und Server-Systemen',
      'Zuverlässige Anbindung an Praxisverwaltungssoftware & Röntgen-/Medizingeräte',
      'Direkter Kontakt zum Technikteam in Goch – ohne Callcenter-Warteschleife',
    ],
    featuredInOrbit: true,
    featuredInFooter: true,
  },
  {
    id: 'apotheken',
    index: '04',
    name: 'TI für Apotheken',
    shortName: 'Apotheken',
    category: 'gesundheitswesen',
    categoryLabel: 'GESUNDHEITSWESEN',
    tagline: 'E-Rezept, KIM und stabiler IT-Betrieb für jeden Tag.',
    description:
      'Telematikinfrastruktur, KIM und zuverlässiger IT-Betrieb speziell für Apotheken.',
    secondaryText:
      'Damit E-Rezept, Warenwirtschaft und der tägliche Kundenbetrieb störungsfrei laufen.',
    accent: '#ef4444',
    accentSoft: 'rgba(239, 68, 68, 0.16)',
    iconKey: 'apotheke',
    tags: ['E-REZEPT', 'KIM', 'APOTHEKEN-IT', 'TI'],
    highlights: [
      'Unterbrechungsfreie E-Rezept-Anbindung über Konnektor oder modernes TI-Gateway',
      'Proaktives Monitoring aller Kassen- und Backoffice-Komponenten',
      'Schnelle Fernwartung mit durchschnittlich unter 7 Minuten Antwortzeit',
    ],
    featuredInOrbit: true,
    featuredInFooter: false,
  },
  {
    id: 'pflegeeinrichtungen',
    index: '05',
    name: 'TI für Pflegeeinrichtungen',
    shortName: 'Pflege',
    category: 'gesundheitswesen',
    categoryLabel: 'GESUNDHEITSWESEN',
    tagline: 'Verständlich umgesetzt für ambulante & stationäre Pflege.',
    description:
      'TI-Anbindung für ambulante und stationäre Pflegeeinrichtungen.',
    secondaryText:
      'Verständlich umgesetzt, rechtssicher dokumentiert und passend zur vorhandenen Pflegesoftware.',
    accent: '#ec4899',
    accentSoft: 'rgba(236, 72, 153, 0.16)',
    iconKey: 'pflege',
    tags: ['AMBULANT', 'STATIONÄR', 'KIM', 'PFLEGESOFTWARE'],
    highlights: [
      'Begleitung von der Beantragung (SMC-B / HBA) bis zur fertigen TI-Inbetriebnahme',
      'Integration in bestehende Pflegedokumentations- und Abrechnungssysteme',
      'Praxisnahe Einweisung für Teams ohne technisches Fachchinesisch',
    ],
    featuredInOrbit: true,
    featuredInFooter: false,
  },
  {
    id: 'datev-support',
    index: '06',
    name: 'DATEV Support',
    shortName: 'DATEV',
    category: 'software',
    categoryLabel: 'BRANCHENSOFTWARE',
    tagline: 'Updates, Wartung & laufender Betrieb deiner DATEV-Welt.',
    description:
      'Deine DATEV-Anwendungen müssen laufen, sicher sein und regelmäßig aktualisiert werden – aber du willst dich nicht selbst darum kümmern?',
    secondaryText:
      'Wir übernehmen Updates, Wartung, Performance-Tuning und direkten Support deiner DATEV Software.',
    accent: '#16a34a',
    accentSoft: 'rgba(22, 163, 74, 0.16)',
    iconKey: 'datev',
    tags: ['STEUERKANZLEIEN', 'UPDATES', 'SERVER', 'SUPPORT'],
    highlights: [
      'Planbare DATEV-Updates außerhalb deiner Stoßzeiten für maximale Produktivität',
      'Stabile Terminalserver-, Arbeitsplatz- und Cloud-Umgebungen für Kanzleien',
      'Direkter Ansprechpartner bei Störungen, Schnittstellen oder neuen Mandanten-Workflows',
    ],
    featuredInOrbit: true,
    featuredInFooter: true,
  },
  {
    id: 'selectline',
    index: '07',
    name: 'SelectLine Software',
    shortName: 'SelectLine',
    category: 'software',
    categoryLabel: 'BRANCHENSOFTWARE',
    tagline: 'ERP für Lager, Finanzen & Produktion – flexibel skalierbar.',
    description:
      'Mit SelectLine steuerst du Lager, Finanzen und Produktionsprozesse effizient und sicher. Die Software ist individuell anpassbar und wächst mit deinem Unternehmen mit.',
    secondaryText:
      'cloudvibe begleitet dich bei Auswahl, Einführung, Schulung und laufendem Support.',
    accent: '#ff8c42',
    accentSoft: 'rgba(255, 140, 66, 0.18)',
    iconKey: 'selectline',
    tags: ['ERP', 'WARENWIRTSCHAFT', 'EINFÜHRUNG', 'SCHULUNG'],
    highlights: [
      'Bedarfsanalyse, Lizenzberatung und maßgeschneiderte Einrichtung für KMU',
      'Anbindung an Finanzbuchhaltung, Lagerprozesse und Produktionssteuerung',
      'Praxisnahe Mitarbeiterschulungen und langfristige Update-Betreuung',
    ],
    featuredInOrbit: true,
    featuredInFooter: true,
  },
  {
    id: 'managed-infrastructure',
    index: '08',
    name: 'Managed Infrastructure',
    shortName: 'Infrastructure',
    category: 'managed',
    categoryLabel: 'MANAGED SERVICES',
    tagline: 'Netzwerke, Cloud & Firewalls professionell gemanagt.',
    description:
      'Deine komplette IT-Infrastruktur – von Netzwerken über Cloud-Dienste bis zu Firewalls – professionell verwaltet, gewartet und abgesichert.',
    secondaryText:
      'Für Unternehmen, die Effizienz und Ausfallsicherheit wollen – ganz ohne internes IT-Team.',
    accent: '#3b82f6',
    accentSoft: 'rgba(59, 130, 246, 0.16)',
    iconKey: 'infrastructure',
    tags: ['NETZWERK', 'CLOUD', 'MONITORING', 'FULL-SERVICE'],
    highlights: [
      '24/7 Zustandsüberwachung von Switches, WLAN, Gateways und Cloud-Diensten',
      'Saubere Dokumentation, Patch-Management und transparente IT-Roadmap',
      'Planbare monatliche Pauschalen statt unvorhersehbarer Ausfallkosten',
    ],
    featuredInOrbit: true,
    featuredInFooter: false,
  },
  {
    id: 'managed-server',
    index: '09',
    name: 'Managed Server',
    shortName: 'Server',
    category: 'managed',
    categoryLabel: 'MANAGED SERVICES',
    tagline: 'Betreuter Serverbetrieb – on-premises oder im Rechenzentrum.',
    description:
      'Technisch betreuter Serverbetrieb (on-premises oder im deutschen Rechenzentrum) – ohne eigenen IT-Aufwand.',
    secondaryText:
      'Für IT-Verantwortliche und Praxen, die auf Stabilität, Performance und volle Transparenz setzen.',
    accent: '#6366f1',
    accentSoft: 'rgba(99, 102, 241, 0.16)',
    iconKey: 'server',
    tags: ['ON-PREMISES', 'DEUTSCHES RZ', 'PATCHING', 'SLA'],
    highlights: [
      'Automatisiertes Update- & Sicherheits-Management für Windows- und Linux-Server',
      'Proaktive Kapazitäts- und Hardware-Überwachung vor dem Ernstfall',
      'Klare Betriebsverantwortung und schnelle Wiederanlaufzeiten',
    ],
    featuredInOrbit: true,
    featuredInFooter: false,
  },
  {
    id: 'managed-backup',
    index: '10',
    name: 'Managed Backup',
    shortName: 'Backup',
    category: 'managed',
    categoryLabel: 'MANAGED SERVICES',
    tagline: 'Automatisierte, DSGVO-konforme Datensicherung in DE.',
    description:
      'Automatisierte, sichere Datensicherung mit schneller Wiederherstellung – lokal oder in deutschen Rechenzentren.',
    secondaryText:
      'Für Unternehmen und Praxen, die ihre Daten rechtssicher und ausfallsicher schützen wollen.',
    accent: '#14b8a6',
    accentSoft: 'rgba(20, 184, 166, 0.16)',
    iconKey: 'backup',
    tags: ['DSGVO-KONFORM', 'DE-CLOUD', 'RANSOMWARE-SAFE', 'RECOVERY'],
    highlights: [
      'Verschlüsselte Backups in zertifizierten deutschen Rechenzentren',
      'Regelmäßige Wiederherstellungstests und sofortige Alarmierung bei Abweichungen',
      'Unveränderbare Sicherungen zum Schutz vor Ransomware-Verschlüsselung',
    ],
    featuredInOrbit: true,
    featuredInFooter: true,
  },
  {
    id: 'managed-firewall',
    index: '11',
    name: 'Managed Firewall',
    shortName: 'Firewall',
    category: 'managed',
    categoryLabel: 'MANAGED SERVICES',
    tagline: 'Vollständig betreuter Netzwerkschutz mit SLA & Updates.',
    description:
      'Netzwerkschutz mit vollständig betreuter Firewall-Lösung – inklusive Überwachung gemäß vereinbartem SLA und regelmäßigen Updates.',
    secondaryText:
      'Für KMU und Praxen, die echte IT-Sicherheit ohne eigenen Administrationsaufwand suchen.',
    accent: '#f97316',
    accentSoft: 'rgba(249, 115, 22, 0.16)',
    iconKey: 'firewall',
    tags: ['UTM-FIREWALL', 'VPN', 'SLA-MONITORING', 'ZERO-TRUST'],
    highlights: [
      'Sichere Standortvernetzung und verschlüsselte Homeoffice-VPN-Zugänge',
      'Laufende Firmware-Updates, Intrusion Prevention und Web-Filterung',
      'Trennung von Praxis-, Gäste- und Verwaltungsnetzen',
    ],
    featuredInOrbit: true,
    featuredInFooter: true,
  },
  {
    id: 'managed-security',
    index: '12',
    name: 'Managed Security',
    shortName: 'Security',
    category: 'managed',
    categoryLabel: 'MANAGED SERVICES',
    tagline: 'Frühwarnsystem gegen Cyberangriffe & Datenverlust.',
    description:
      'Laufender Schutz deiner Systeme vor Cyberangriffen, Datenverlust und Sicherheitslücken – DSGVO-konform und mit aktivem Frühwarnsystem.',
    secondaryText:
      'Ideal für Unternehmen mit sensiblen Daten oder hohen gesetzlichen Sicherheitsanforderungen.',
    accent: '#a855f7',
    accentSoft: 'rgba(168, 85, 247, 0.16)',
    iconKey: 'security',
    tags: ['EDR', 'FRÜHWARNSYSTEM', 'CYBERABWEHR', 'DSGVO'],
    highlights: [
      'Zentrale Endpoint-Protection und verdachtsbasierte Angriffserkennung',
      'Kontinuierliches Schwachstellen- und Patch-Management',
      'Dokumentierte Nachweise für Datenschutz- und Branchenanforderungen',
    ],
    featuredInOrbit: false,
    featuredInFooter: false,
  },
  {
    id: 'managed-phone',
    index: '13',
    name: 'Managed Phone Service',
    shortName: 'Teams Phone',
    category: 'managed',
    categoryLabel: 'MANAGED SERVICES',
    tagline: 'Cloud-Telefonie mit Microsoft Teams & Homeoffice-Power.',
    description:
      'Cloud-basierte Business-Telefonie mit Microsoft Teams Integration, Homeoffice-Funktionalität und maximaler Flexibilität.',
    secondaryText:
      'Für Praxen und Unternehmen, die ortsunabhängige Erreichbarkeit mit smarter Technologie verbinden möchten.',
    accent: '#06b6d4',
    accentSoft: 'rgba(6, 182, 212, 0.16)',
    iconKey: 'phone',
    tags: ['MS TEAMS', 'CLOUD-PBX', 'HOMEOFFICE', 'VOIP'],
    highlights: [
      'Professionelle Warteschleifen, Zeitsteuerungen und Ansagen für Praxen & Teams',
      'Nahtlose Telefonie über Tischtelefon, Smartphone-App oder Microsoft Teams',
      'Skalierbar pro Nebenstelle ohne starre Hardware-Telefonanlage',
    ],
    featuredInOrbit: true,
    featuredInFooter: true,
  },
];

export const ADVANTAGES = [
  {
    id: 'response',
    number: '01',
    metric: '< 7 Min.',
    title: 'Antwortzeit im Schnitt',
    description:
      'Wenn es hakt, wartest du nicht tagelang auf ein Ticket. Unsere durchschnittliche erste Reaktionszeit liegt unter sieben Minuten.',
    tag: 'SCHNELL & DIREKT',
  },
  {
    id: 'personal',
    number: '02',
    metric: '0 %',
    title: 'Kein Callcenter – echte Techs',
    description:
      'Du sprichst direkt mit deinem persönlichen Ansprechpartner aus unserem siebenköpfigen Team in Goch – ohne Skripte und ohne Fachchinesisch.',
    tag: 'PERSÖNLICH',
  },
  {
    id: 'telekonnekt',
    number: '03',
    metric: 'TI + KIM',
    title: 'Telekonnekt-Partner',
    description:
      'Spezialisiert auf das Gesundheitswesen: Konnektoren, TI-Gateways, Kartenlesegeräte und KIM rechtssicher aus einer Hand umgesetzt.',
    tag: 'GESUNDHEITSWESEN',
  },
  {
    id: 'all-in-one',
    number: '04',
    metric: '360°',
    title: 'Alles aus einer Hand',
    description:
      'Keine Schnittstellenprobleme zwischen Netzwerk, Praxissoftware, DATEV, Telefonie, Backup und Firewall – wir verantworten das Gesamtbild.',
    tag: 'KEINE SILOS',
  },
  {
    id: 'predictable',
    number: '05',
    metric: 'SLA',
    title: 'Planbare IT-Kosten',
    description:
      'Klare monatliche Managed-Service-Pakete mit individuell vereinbarten Service- und Reaktionszeiten – volle Transparenz ohne Überraschungen.',
    tag: 'TRANSPARENT',
  },
  {
    id: 'longterm',
    number: '06',
    metric: 'DE-WEIT',
    title: 'Langfristige Betreuung',
    description:
      'Vor Ort in Goch und am Niederrhein sowie per sicherer Fernwartung deutschlandweit – nachhaltige Systeme, die mit dir mitwachsen.',
    tag: 'NACHHALTIG',
  },
];

export const REFERENCES = [
  {
    type: 'Palliativ-Netzwerk',
    location: 'Goch',
    services: ['Managed Services', 'Netzwerk & Support'],
    accent: '#2eb329',
  },
  {
    type: 'Zahnarztpraxis',
    location: 'Kleve',
    services: ['Managed Services', 'TI-Anbindung'],
    accent: '#185098',
  },
  {
    type: 'Zahnarztpraxis',
    location: 'Duisburg',
    services: ['Managed Services', 'TI-Anbindung'],
    accent: '#0ea5e9',
  },
  {
    type: 'Orthopädiepraxis',
    location: 'Kamen',
    services: ['Managed Services', 'Server & Backup'],
    accent: '#ff8c42',
  },
  {
    type: 'Zahnarztpraxis',
    location: 'Grefrath',
    services: ['Managed Services', 'TI-Anbindung'],
    accent: '#14b8a6',
  },
  {
    type: 'Hausarztpraxis',
    location: 'Goch',
    services: ['Managed Services', 'Managed Phone Service'],
    accent: '#6366f1',
  },
];

export interface ArchitectureScenario {
  id: string;
  label: string;
  badge: string;
  headline: string;
  summary: string;
  sla: string;
  nodes: {
    left: { title: string; subtitle: string; tag: string };
    center: { title: string; subtitle: string; tag: string };
    topRight: { title: string; subtitle: string; tag: string };
    bottomRight: { title: string; subtitle: string; tag: string };
  };
  metrics: { label: string; value: string }[];
}

export const ARCHITECTURE_SCENARIOS: ArchitectureScenario[] = [
  {
    id: 'praxis',
    label: 'Praxis & TI-Gateway',
    badge: 'TELEKONNEKT-PARTNER',
    headline: 'Sichere Telematikinfrastruktur ohne Praxis-Stillstand',
    summary:
      'Empfang, Behandlungszimmer, Kartenterminals und Praxissoftware greifen über eine gemanagte Firewall und das TI-Gateway verschlüsselt auf KIM, eAU und E-Rezept zu.',
    sla: 'Ø < 7 Min. Support · DSGVO-konform',
    nodes: {
      left: {
        title: 'Praxis-Arbeitsplätze & PVS',
        subtitle: 'Empfang · Kartenterminals · KIM',
        tag: 'VOR ORT',
      },
      center: {
        title: 'Managed Firewall & TI-Gateway',
        subtitle: 'Segmentiert · Automatische Updates',
        tag: 'GESICHERT',
      },
      topRight: {
        title: 'Telematikinfrastruktur (TI)',
        subtitle: 'E-Rezept · eAU · eArztbrief',
        tag: 'GEMATIK',
      },
      bottomRight: {
        title: 'DE-Rechenzentrum & Backup',
        subtitle: 'Verschlüsselt · Ransomware-Safe',
        tag: 'DE-CLOUD',
      },
    },
    metrics: [
      { label: 'Reaktionszeit', value: '< 7 Min.' },
      { label: 'Standort Backup', value: 'Deutschland' },
      { label: 'Betreuung', value: 'Vor Ort & Remote' },
    ],
  },
  {
    id: 'datev',
    label: 'Steuerkanzlei & DATEV',
    badge: 'BRANCHENSOFTWARE',
    headline: 'Performante DATEV-Umgebungen mit geplanten Updates',
    summary:
      'Kanzlei-Arbeitsplätze und Homeoffice-Teams greifen per Zero-Trust-VPN auf betreute DATEV-Server zu – mit automatisiertem Patching außerhalb der Arbeitszeit.',
    sla: 'Geplante Wartungsfenster · Direkt-Support',
    nodes: {
      left: {
        title: 'Kanzlei & Homeoffice',
        subtitle: 'Teams Phone · Sicherer VPN-Tunnel',
        tag: 'HYBRID',
      },
      center: {
        title: 'Managed DATEV Server',
        subtitle: 'Updates · Performance · Monitoring',
        tag: 'DATEV',
      },
      topRight: {
        title: 'Managed Security & EDR',
        subtitle: 'Frühwarnsystem · Cyberabwehr',
        tag: '24/7 SCHUTZ',
      },
      bottomRight: {
        title: 'Automatisches Cloud-Backup',
        subtitle: 'GoBD & DSGVO-konform in DE',
        tag: 'VERIFIZIERT',
      },
    },
    metrics: [
      { label: 'Update-Stress', value: '0 Stunden' },
      { label: 'Ansprechpartner', value: 'Direkt in Goch' },
      { label: 'Verfügbarkeit', value: 'SLA-geführt' },
    ],
  },
  {
    id: 'kmu',
    label: 'KMU & SelectLine Cloud',
    badge: 'MANAGED SERVICES',
    headline: 'Vollständige IT-Abteilung als planbarer Managed Service',
    summary:
      'Vom SelectLine ERP über Cloud-Server bis zur Microsoft-Teams-Telefonie: eine durchgängige Infrastruktur, die mit jedem Standort und neuen Mitarbeitenden mitwächst.',
    sla: 'Planbare Kosten · Keine Schnittstellenprobleme',
    nodes: {
      left: {
        title: 'Lager, Büro & Produktion',
        subtitle: 'SelectLine ERP · Arbeitsplätze',
        tag: 'BETRIEB',
      },
      center: {
        title: 'Managed Infrastructure',
        subtitle: 'Netzwerk · Firewall · Cloud-Core',
        tag: 'CENTRAL',
      },
      topRight: {
        title: 'Managed Phone Service',
        subtitle: 'MS Teams · Mobil & Standortfrei',
        tag: 'CLOUD-PBX',
      },
      bottomRight: {
        title: 'cloudvibe Goch Operations',
        subtitle: '7 IT-Profis · Proaktives Monitoring',
        tag: 'SUPPORT',
      },
    },
    metrics: [
      { label: 'Internes IT-Team', value: 'Nicht nötig' },
      { label: 'Kostenmodell', value: 'Planbar / SLA' },
      { label: 'Einsatzgebiet', value: 'Deutschlandweit' },
    ],
  },
];

export const NAV_SECTIONS = [
  { id: 'hero', index: '00', label: 'Start' },
  { id: 'ueberblick', index: '01', label: 'Überblick' },
  { id: 'loesungen', index: '02', label: 'Lösungen' },
  { id: 'architektur', index: '03', label: 'Architektur' },
  { id: 'vorteile', index: '04', label: 'Vorteile' },
  { id: 'referenzen', index: '05', label: 'Referenzen' },
  { id: 'kontakt', index: '06', label: 'Kontakt' },
];
