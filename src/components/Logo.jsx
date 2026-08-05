import { Link } from 'react-router-dom';
import './Logo.css';

/**
 * Wordmark. The mark is a stylised "vertex" — two strokes meeting at a point —
 * filled with the Gemini gradient. The gradient id is suffixed so several
 * instances (navbar, sidebar, footer) can coexist without colliding.
 */
function Logo({ to = '/', size = 'md', showText = true, id = 'nav' }) {
  const gradientId = `logo-gradient-${id}`;

  const mark = (
    <svg
      className="logo__mark"
      viewBox="0 0 32 32"
      role="img"
      aria-label={showText ? undefined : 'Vertex Learn AI'}
      aria-hidden={showText ? true : undefined}
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4285f4" />
          <stop offset="50%" stopColor="#9b72cb" />
          <stop offset="100%" stopColor="#d96570" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill={`url(#${gradientId})`} />
      <path
        d="M9 10.5 16 22l7-11.5"
        fill="none"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const content = (
    <>
      {mark}
      {showText ? (
        <span className="logo__text">
          Vertex<span className="logo__accent"> Learn AI</span>
        </span>
      ) : null}
    </>
  );

  if (!to) {
    return <span className={`logo logo--${size}`}>{content}</span>;
  }

  return (
    <Link className={`logo logo--${size}`} to={to} aria-label="Vertex Learn AI — home">
      {content}
    </Link>
  );
}

export default Logo;
