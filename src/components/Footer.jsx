import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Icon } from './ui';
import './Footer.css';

// Every entry points at a section or route that actually exists — no dead links.
const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Why Vertex', href: '/#features' },
      { label: 'Courses', href: '/#courses' },
      { label: 'AI Tutor', href: '/#ai-tutor' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Log in', href: '/login' },
      { label: 'Create account', href: '/signup' },
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Profile', href: '/profile' },
    ],
  },
];

const socials = [
  { icon: 'github', label: 'GitHub', href: 'https://github.com' },
  { icon: 'x', label: 'X', href: 'https://x.com' },
  { icon: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com' },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo id="footer" />
            <p className="footer__tagline">
              Structured courses and a personal AI tutor, so you always have somewhere to start and
              someone to ask.
            </p>

            <ul className="footer__socials">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    className="footer__social"
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                  >
                    <Icon name={social.icon} size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className="footer__columns" aria-label="Footer">
            {columns.map((column) => (
              <div className="footer__column" key={column.title}>
                <h2 className="footer__column-title">{column.title}</h2>
                <ul className="footer__column-links">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link className="footer__link" to={link.href}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Vertex Learn AI. All rights reserved.</p>
          <p className="footer__built">
            <Icon name="sparkles" size={14} />
            Built for learners
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
