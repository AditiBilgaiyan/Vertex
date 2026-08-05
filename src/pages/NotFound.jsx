import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import ThemeToggle from '../components/ThemeToggle';
import { Button } from '../components/ui';
import '../styles/NotFound.css';

function NotFound() {
  return (
    <div className="app-page notfound">
      <div className="app-glow" />

      <header className="notfound__bar container">
        <Logo id="notfound" />
        <ThemeToggle />
      </header>

      <main className="notfound__main container">
        <p className="notfound__code">404</p>
        <h1 className="notfound__title">We couldn&apos;t find that page</h1>
        <p className="notfound__text">
          The link may be broken, or the page may have moved. Let&apos;s get you back to something
          useful.
        </p>

        <div className="notfound__actions">
          <Button as={Link} to="/" variant="primary" size="lg" icon="home">
            Back to home
          </Button>
          <Button as={Link} to="/dashboard" variant="outline" size="lg" iconRight="arrowRight">
            Go to dashboard
          </Button>
        </div>
      </main>
    </div>
  );
}

export default NotFound;
