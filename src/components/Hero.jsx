import { Link } from 'react-router-dom';
import { Badge, Button, Icon } from './ui';
import './Hero.css';

const stats = [
  { value: '120+', label: 'Guided lessons' },
  { value: '24/7', label: 'Tutor availability' },
  { value: '4.9', label: 'Average rating' },
];

function Hero() {
  return (
    <section className="hero">
      <div className="app-glow" />

      <div className="hero__inner container">
        <div className="hero__copy">
          <Badge variant="primary" icon="sparkles" className="hero__badge">
            Now with step-by-step explanations
          </Badge>

          <h1 className="hero__title">
            Learn smarter with an <span className="hero__gradient">AI tutor</span> that adapts to you
          </h1>

          <p className="hero__lede">
            Vertex Learn AI pairs structured courses with a tutor that answers in your own words,
            at your own pace. Ask anything, get worked examples, and track every bit of progress.
          </p>

          <div className="hero__cta">
            <Button as={Link} to="/signup" variant="primary" size="lg" iconRight="arrowRight">
              Start learning free
            </Button>
            <Button as={Link} to="/#ai-tutor" variant="outline" size="lg" icon="play">
              Try the tutor
            </Button>
          </div>

          <p className="hero__note">
            <Icon name="checkCircle" size={16} />
            No credit card required — your first course is on us.
          </p>

          <dl className="hero__stats">
            {stats.map((stat) => (
              <div className="hero__stat" key={stat.label}>
                <dt className="hero__stat-label">{stat.label}</dt>
                <dd className="hero__stat-value">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Decorative product preview — hidden from assistive tech, since the
            copy above already says everything it shows. */}
        <div className="hero__preview" aria-hidden="true">
          <div className="hero__window">
            <div className="hero__window-bar">
              <span className="hero__dot" />
              <span className="hero__dot" />
              <span className="hero__dot" />
              <span className="hero__window-title">AI Tutor</span>
            </div>

            <div className="hero__window-body">
              <div className="hero__msg hero__msg--user">
                Why does useEffect run twice in development?
              </div>

              <div className="hero__msg hero__msg--ai">
                <span className="hero__msg-avatar">
                  <Icon name="sparkles" size={14} />
                </span>
                <div>
                  <p>
                    That&apos;s React&apos;s <strong>StrictMode</strong> double-invoking effects on
                    purpose, so unsafe cleanup shows up early.
                  </p>
                  <p className="hero__msg-sub">It only happens in development builds.</p>
                </div>
              </div>

              <div className="hero__typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>

          <div className="hero__chip hero__chip--one">
            <Icon name="trending" size={16} />
            Progress +18% this week
          </div>

          <div className="hero__chip hero__chip--two">
            <Icon name="cap" size={16} />
            3 courses in flight
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
