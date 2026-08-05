import Logo from './Logo';
import { Spinner } from './ui';
import './RouteLoader.css';

/** Full-screen splash shown while a guarded route resolves the session. */
function RouteLoader({ message = 'Checking your session…' }) {
  return (
    <div className="route-loader" role="status" aria-live="polite">
      <div className="app-glow" />
      <Logo id="loader" to={null} size="lg" />
      <div className="route-loader__status">
        <Spinner size={16} />
        <span>{message}</span>
      </div>
    </div>
  );
}

export default RouteLoader;
