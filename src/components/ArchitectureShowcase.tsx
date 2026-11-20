import React, { useState } from 'react';
import {
  CheckCircle2,
  Cloud,
  Cpu,
  Database,
  Lock,
  Shield,
} from 'lucide-react';
import { ARCHITECTURE_SCENARIOS } from '../data/cloudvibeData';
import { SectionHeader } from './SectionHeader';

export const ArchitectureShowcase: React.FC = () => {
  const [selectedId, setSelectedId] = useState(ARCHITECTURE_SCENARIOS[0].id);
  const scenario =
    ARCHITECTURE_SCENARIOS.find((s) => s.id === selectedId) ?? ARCHITECTURE_SCENARIOS[0];

  return (
    <section id="architektur" className="cv-section cv-reveal">
      <div className="cv-container">
        <SectionHeader
          code="03 / LIVE-ARCHITEKTUR"
          meta="IT, DIE EINFACH LÄUFT · TELEMETRIE-VORSCHAU"
        />

        <div className="cv-arch-shell">
          <div className="cv-arch-header">
            <div>
              <span className="cv-eyebrow-mono cv-accent-green">{scenario.badge}</span>
              <h2 className="cv-display-heading-sm">{scenario.headline}</h2>
              <p className="cv-body-paragraph">{scenario.summary}</p>
            </div>

            <div className="cv-arch-switcher" role="tablist" aria-label="Architektur-Szenario">
              {ARCHITECTURE_SCENARIOS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={item.id === scenario.id}
                  className={`cv-arch-tab ${item.id === scenario.id ? 'is-active' : ''}`}
                  onClick={() => setSelectedId(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Animated Topology Canvas */}
          <div className="cv-topology-board">
            <div className="cv-topology-grid-bg" aria-hidden="true" />

            <div className="cv-topology-nodes">
              {/* Left Endpoint Node */}
              <div className="cv-topo-node">
                <div className="cv-topo-node-top">
                  <span className="cv-topo-icon is-blue">
                    <Cpu size={18} />
                  </span>
                  <span className="cv-topo-tag">{scenario.nodes.left.tag}</span>
                </div>
                <strong>{scenario.nodes.left.title}</strong>
                <p>{scenario.nodes.left.subtitle}</p>
              </div>

              {/* Animated Connector 1 */}
              <div className="cv-topo-connector" aria-hidden="true">
                <span className="cv-packet cv-packet-1" />
                <span className="cv-connector-label">TLS 1.3</span>
              </div>

              {/* Center Core Node */}
              <div className="cv-topo-node is-core">
                <div className="cv-topo-node-top">
                  <span className="cv-topo-icon is-green">
                    <Shield size={20} />
                  </span>
                  <span className="cv-topo-tag is-live">
                    <span className="cv-live-dot" />
                    {scenario.nodes.center.tag}
                  </span>
                </div>
                <strong>{scenario.nodes.center.title}</strong>
                <p>{scenario.nodes.center.subtitle}</p>
                <div className="cv-core-sla">
                  <Lock size={12} />
                  <span>{scenario.sla}</span>
                </div>
              </div>

              {/* Animated Connector 2 */}
              <div className="cv-topo-connector" aria-hidden="true">
                <span className="cv-packet cv-packet-2" />
                <span className="cv-connector-label">24/7 MON</span>
              </div>

              {/* Right Dual Nodes */}
              <div className="cv-topo-right-stack">
                <div className="cv-topo-node">
                  <div className="cv-topo-node-top">
                    <span className="cv-topo-icon is-orange">
                      <Cloud size={18} />
                    </span>
                    <span className="cv-topo-tag">{scenario.nodes.topRight.tag}</span>
                  </div>
                  <strong>{scenario.nodes.topRight.title}</strong>
                  <p>{scenario.nodes.topRight.subtitle}</p>
                </div>

                <div className="cv-topo-node">
                  <div className="cv-topo-node-top">
                    <span className="cv-topo-icon is-green">
                      <Database size={18} />
                    </span>
                    <span className="cv-topo-tag">{scenario.nodes.bottomRight.tag}</span>
                  </div>
                  <strong>{scenario.nodes.bottomRight.title}</strong>
                  <p>{scenario.nodes.bottomRight.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Bottom Live Telemetry Metrics */}
            <div className="cv-arch-metrics">
              {scenario.metrics.map((m) => (
                <div key={m.label} className="cv-arch-metric">
                  <CheckCircle2 size={15} className="cv-metric-check" />
                  <div>
                    <span className="cv-arch-metric-label">{m.label}</span>
                    <strong>{m.value}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
