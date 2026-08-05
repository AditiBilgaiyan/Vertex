import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useActiveSection from '../hooks/useActiveSection';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { Button, IconButton } from './ui';
import './Navbar.css';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Courses', to: '/#courses', section: 'courses' },
  { label: 'AI Tutor', to: '/#ai-tutor', section: 'ai-tutor' },
];

// Module scope keeps the reference stable for the scroll-spy effect
const sectionIds = ['courses', 'ai-tutor'];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const drawerRef = useRef(null);
  const triggerRef = useRef(null);

  const { pathname } = useLocation();
  const activeSection = useActiveSection(sectionIds);

  // Swap in the elevated/blurred treatment once the page leaves the top.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // While the drawer is open: lock the page, close on Escape, and return focus
  // to the trigger so keyboard users don't lose their place.
  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    drawerRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      // preventScroll matters here: without it, restoring focus to the trigger
      // in the sticky navbar would fight the scroll we just triggered.
      trigger?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  // The scroll position decides which tab is lit, so the nav tracks the page
  // even when you scroll there by hand.
  const isActive = (link) => {
    if (pathname !== '/') return false;
    return link.section ? activeSection === link.section : activeSection === null;
  };

  const close = () => setIsOpen(false);

  return (
    <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <Logo id="nav" />

        <nav className="navbar__nav" aria-label="Main">
          <ul className="navbar__links">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className={`navbar__link ${isActive(link) ? 'is-active' : ''}`}
                  aria-current={isActive(link) ? 'true' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar__actions">
          <ThemeToggle />
          <Button as={Link} to="/login" variant="ghost" size="md" className="navbar__login">
            Log in
          </Button>
          <Button as={Link} to="/signup" variant="primary" size="md">
            Get started
          </Button>
        </div>

        <div className="navbar__mobile-actions">
          <ThemeToggle />
          <IconButton
            ref={triggerRef}
            icon="menu"
            label="Open menu"
            variant="outline"
            onClick={() => setIsOpen(true)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          />
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`navbar__scrim ${isOpen ? 'is-open' : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      <div
        id="mobile-menu"
        className={`navbar__drawer ${isOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!isOpen}
        tabIndex={-1}
        ref={drawerRef}
      >
        <div className="navbar__drawer-head">
          <Logo id="drawer" size="sm" />
          <IconButton icon="close" label="Close menu" variant="ghost" onClick={close} />
        </div>

        <ul className="navbar__drawer-links">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                className={`navbar__drawer-link ${isActive(link) ? 'is-active' : ''}`}
                to={link.to}
                onClick={close}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar__drawer-actions">
          <Button as={Link} to="/login" variant="outline" size="lg" fullWidth onClick={close}>
            Log in
          </Button>
          <Button as={Link} to="/signup" variant="primary" size="lg" fullWidth onClick={close}>
            Get started
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
