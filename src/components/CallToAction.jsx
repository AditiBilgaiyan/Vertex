import { Link } from 'react-router-dom';
import { Button, Icon } from './ui';
import './CallToAction.css';

function CallToAction() {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta__panel">
          <span className="cta__icon">
            <Icon name="cap" size={24} />
          </span>

          <h2 className="cta__title">Start your first course today</h2>

          <p className="cta__text">
            Free to begin, no card needed. Pick a track, ask your first question, and see how far you
            get in an afternoon.
          </p>

          <div className="cta__actions">
            <Button as={Link} to="/signup" variant="primary" size="lg" iconRight="arrowRight">
              Create free account
            </Button>
            <Button as={Link} to="/login" variant="outline" size="lg">
              I already have one
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
