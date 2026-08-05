import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { Avatar, Button, Icon, IconButton, Skeleton } from './ui';
import './AppShell.css';

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: 'dashboard', end: true },
  { label: 'Courses', to: '/#courses', icon: 'book' },
  { label: 'AI Tutor', to: '/#ai-tutor', icon: 'sparkles' },
  { label: 'Profile', to: '/profile', icon: 'user' },
];

/**
 * Signed-in chrome: persistent rail on desktop, off-canvas drawer below 1024px.
 * Pages supply their own title/actions and render into the content slot.
 */
function AppShell({ title, subtitle, actions, children }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const navigate = useNavigate();
  const drawerRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      setUser(data?.user ?? null);
      setIsLoadingUser(false);
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!isNavOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsNavOpen(false);
    };

    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    drawerRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      // preventScroll so restoring focus doesn't fight a hash scroll in flight
      trigger?.focus({ preventScroll: true });
    };
  }, [isNavOpen]);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/login');
  }

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Learner';
  const closeNav = () => setIsNavOpen(false);

  // Rendered twice (persistent rail + drawer). `variant` keeps the SVG gradient
  // ids unique, since both copies live in the DOM at the same time.
  const renderSidebar = (variant) => (
    <>
      <div className="shell__brand">
        <Logo id={`shell-${variant}`} />
      </div>

      <nav className="shell__nav" aria-label="Application">
        <ul>
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                end={item.end}
                onClick={closeNav}
                className={({ isActive }) =>
                  `shell__nav-link ${isActive && item.end ? 'is-active' : ''}`
                }
              >
                <Icon name={item.icon} size={20} />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="shell__upsell">
        <span className="shell__upsell-icon">
          <Icon name="sparkles" size={18} />
        </span>
        <p className="shell__upsell-title">Keep the streak going</p>
        <p className="shell__upsell-text">One lesson a day beats five on a Sunday.</p>
        <Button as={Link} to="/#courses" variant="tonal" size="sm" fullWidth onClick={closeNav}>
          Browse courses
        </Button>
      </div>

      <div className="shell__user">
        {isLoadingUser ? (
          <div className="shell__user-row">
            <Skeleton width="36px" height="36px" radius="var(--r-full)" />
            <div className="shell__user-meta">
              <Skeleton width="90px" height="12px" />
              <Skeleton width="130px" height="10px" style={{ marginTop: '6px' }} />
            </div>
          </div>
        ) : (
          <div className="shell__user-row">
            <Avatar name={displayName} size={36} />
            <div className="shell__user-meta">
              <p className="shell__user-name">{displayName}</p>
              <p className="shell__user-email">{user?.email ?? 'Not signed in'}</p>
            </div>
          </div>
        )}

        <Button variant="ghost" size="sm" icon="logout" fullWidth onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </>
  );

  return (
    <div className="shell">
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <aside className="shell__sidebar">{renderSidebar('rail')}</aside>

      <div
        className={`shell__scrim ${isNavOpen ? 'is-open' : ''}`}
        onClick={closeNav}
        aria-hidden="true"
      />

      <aside
        className={`shell__drawer ${isNavOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        aria-hidden={!isNavOpen}
        tabIndex={-1}
        ref={drawerRef}
      >
        <div className="shell__drawer-close">
          <IconButton icon="close" label="Close navigation" onClick={closeNav} />
        </div>
        {renderSidebar('drawer')}
      </aside>

      <div className="shell__body">
        <header className="shell__topbar">
          <IconButton
            ref={triggerRef}
            className="shell__menu-btn"
            icon="menu"
            label="Open navigation"
            variant="outline"
            onClick={() => setIsNavOpen(true)}
            aria-expanded={isNavOpen}
          />

          <div className="shell__titles">
            <h1 className="shell__title">{title}</h1>
            {subtitle ? <p className="shell__subtitle">{subtitle}</p> : null}
          </div>

          <div className="shell__topbar-actions">
            {actions}
            <ThemeToggle />
            <Avatar name={displayName} size={36} className="shell__topbar-avatar" />
          </div>
        </header>

        <main className="shell__main" id="main">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppShell;
