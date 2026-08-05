import { useEffect, useState } from 'react';

/**
 * Scroll-spy: returns the id of the section currently under the reading line,
 * so anchor navigation can show which tab you're actually on.
 *
 * `ids` must be a stable reference (define it at module scope) — it is an
 * effect dependency.
 */
export default function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0) return undefined;

    const visible = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });

        // Resolve ties in document order so overlapping sections are stable
        setActiveId(ids.find((id) => visible.has(id)) ?? null);
      },
      // Only count a section once it reaches the upper-middle of the viewport
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
