import { Link } from 'react-router-dom';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { Icon } from './ui';
import './AuthLayout.css';

const highlights = [
  'A tutor that explains, not just answers',
  'Structured tracks with real progress tracking',
  'Free to start — no card required',
];

/**
 * Split-screen shell for /login and /signup.
 *
 * The left panel is marketing and collapses away below 900px so small screens
 * get a single, focused column with nothing competing with the form.
 */
function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="auth">
      <aside className="auth__aside">
        <div className="app-glow" />

        <div className="auth__aside-inner">
          <Logo id="auth" />

          <div className="auth__pitch">
            <h2 className="auth__pitch-title">
              Learn smarter with an AI tutor that adapts to you
            </h2>

            <ul className="auth__highlights">
              {highlights.map((highlight) => (
                <li className="auth__highlight" key={highlight}>
                  <span className="auth__check">
                    <Icon name="check" size={14} />
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <figure className="auth__quote">
            <blockquote>
              “I finally finished a course instead of abandoning it in week two. Being able to just
              ask when I got stuck made all the difference.”
            </blockquote>
            <figcaption>Priya R. — front-end track</figcaption>
          </figure>
        </div>
      </aside>

      <main className="auth__main">
        <div className="auth__topbar">
          <Link className="auth__back" to="/">
            <Icon name="arrowLeft" size={16} />
            Back to home
          </Link>
          <ThemeToggle />
        </div>

        <div className="auth__panel">
          <div className="auth__mobile-logo">
            <Logo id="auth-mobile" />
          </div>

          <header className="auth__header">
            <h1 className="auth__title">{title}</h1>
            {subtitle ? <p className="auth__subtitle">{subtitle}</p> : null}
          </header>

          {children}

          {footer ? <div className="auth__footer">{footer}</div> : null}
        </div>
      </main>
    </div>
  );
}

export default AuthLayout;
