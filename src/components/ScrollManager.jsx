import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MAX_FRAMES = 30;

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

/**
 * React Router does not act on hash fragments — it updates `location.hash` and
 * stops there. This restores the behaviour people expect from anchor links:
 *
 *  - `/#courses` scrolls to that section, whether you were already on `/`
 *    or arriving from `/dashboard`
 *  - a plain path navigation returns to the top
 *
 * When arriving from another route the target section isn't mounted yet, so we
 * retry across a few animation frames before giving up. `location.key` is in the
 * dependency list so clicking the same link twice scrolls again.
 *
 * Render once, inside the router.
 */
function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    const behavior = prefersReducedMotion() ? 'auto' : 'smooth';

    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return undefined;
    }

    const id = decodeURIComponent(hash.slice(1));
    let frame = 0;
    let attempts = 0;

    const scrollToTarget = () => {
      const target = document.getElementById(id);

      if (target) {
        // `scroll-padding-top` in base.css keeps this clear of the sticky navbar
        target.scrollIntoView({ behavior, block: 'start' });
        return;
      }

      if (attempts < MAX_FRAMES) {
        attempts += 1;
        frame = requestAnimationFrame(scrollToTarget);
      }
    };

    frame = requestAnimationFrame(scrollToTarget);

    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

  return null;
}

export default ScrollManager;
