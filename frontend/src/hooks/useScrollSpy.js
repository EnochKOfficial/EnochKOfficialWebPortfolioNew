import React from "react";

export default function useScrollSpy(ids = [], options = {}) {
  const [active, setActive] = React.useState(ids[0] || null);
  const opts = React.useMemo(
    () => ({
      root: null,
      rootMargin: options.rootMargin || "-30% 0px -60% 0px",
      threshold: options.threshold || [0, 0.1, 0.25, 0.5, 0.75, 1],
    }),
    [options.rootMargin, options.threshold]
  );

  React.useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      // Pick the entry with highest intersectionRatio that is intersecting
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) setActive(visible.target.id);
    }, opts);

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids.join("|"), opts]);

  return active;
}