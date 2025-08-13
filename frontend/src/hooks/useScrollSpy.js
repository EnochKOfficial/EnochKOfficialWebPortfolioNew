import React from "react";

export default function useScrollSpy(ids = [], options = {}) {
  const [active, setActive] = React.useState(ids[0] || null);
  const [manual, setManual] = React.useState({ id: null, until: 0 });
  // Bias the active section toward the region below the sticky navbar.
  const rootMargin = options.rootMargin || "-35% 0px -50% 0px";
  const threshold = options.threshold || [0, 0.1, 0.25, 0.5, 0.75, 1];

  const isManual = () => manual.until > Date.now();

  const startManual = (id, ms = 1400) => {
    setManual({ id, until: Date.now() + ms });
    setActive(id);
  };

  React.useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      // Skip observer updates during manual highlight window
      if (isManual()) return;
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) setActive(visible.target.id);
    }, { root: null, rootMargin, threshold });

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids.join("|"), rootMargin, JSON.stringify(threshold)]);

  // Expose currently effective active id
  const effectiveActive = isManual() ? manual.id : active;

  return { active: effectiveActive, startManual };
}