import React, { useEffect, useRef, useState } from 'react';

interface SectionHeaderProps {
  code: string;
  meta: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ code, meta }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el || !('IntersectionObserver' in window)) {
      setEntered(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setEntered(true);
          io.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: '60px 0px 40px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={barRef}
      className={`cv-section-bar cv-section-bar-kinetic ${entered ? 'is-entered' : ''}`}
    >
      <span className="cv-section-code" aria-label={code}>
        {code.split('').map((ch, idx) => (
          <span
            key={idx}
            className="cv-code-char"
            aria-hidden="true"
            style={{ transitionDelay: `${idx * 22}ms` }}
          >
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        ))}
      </span>
      <span className="cv-section-meta">{meta}</span>
      <span className="cv-section-rule-draw" aria-hidden="true" />
    </div>
  );
};
