import React from 'react';
import {
  Activity,
  Building2,
  Calculator,
  CloudCog,
  Flame,
  HardDriveDownload,
  HeartHandshake,
  Layers,
  Network,
  PhoneCall,
  Pill,
  Server,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';
import type { CloudVibeService } from '../data/cloudvibeData';

interface ServiceIconProps {
  iconKey: CloudVibeService['iconKey'];
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({
  iconKey,
  size = 22,
  strokeWidth = 1.9,
  className = '',
}) => {
  const props = { size, strokeWidth, className, 'aria-hidden': true as const };

  switch (iconKey) {
    case 'ti':
      return <Network {...props} />;
    case 'healthcare':
      return <Activity {...props} />;
    case 'arztpraxis':
      return <Stethoscope {...props} />;
    case 'apotheke':
      return <Pill {...props} />;
    case 'pflege':
      return <HeartHandshake {...props} />;
    case 'datev':
      return <Calculator {...props} />;
    case 'selectline':
      return <Layers {...props} />;
    case 'infrastructure':
      return <CloudCog {...props} />;
    case 'server':
      return <Server {...props} />;
    case 'backup':
      return <HardDriveDownload {...props} />;
    case 'firewall':
      return <Flame {...props} />;
    case 'security':
      return <ShieldCheck {...props} />;
    case 'phone':
      return <PhoneCall {...props} />;
    default:
      return <Building2 {...props} />;
  }
};
