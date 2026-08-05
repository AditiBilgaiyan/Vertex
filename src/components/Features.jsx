import { Card, Icon, SectionHeading } from './ui';
import './Features.css';

const features = [
  {
    icon: 'sparkles',
    title: 'Explanations that adapt',
    text: 'Ask in your own words and get an answer pitched at your level — with worked examples, not just definitions.',
  },
  {
    icon: 'cap',
    title: 'Structured tracks',
    text: 'Every course is a short, ordered path. You always know what comes next and why it matters.',
  },
  {
    icon: 'trending',
    title: 'Progress you can see',
    text: 'Lesson-level tracking rolls up into a single view, so you can tell momentum from wishful thinking.',
  },
  {
    icon: 'zap',
    title: 'Practice on demand',
    text: 'Generate practice problems for any topic and check your reasoning step by step.',
  },
  {
    icon: 'clock',
    title: 'Available any hour',
    text: 'The tutor does not keep office hours. Study at 6am or midnight — same quality of answer.',
  },
  {
    icon: 'target',
    title: 'Built around your goal',
    text: 'Tell it what you are working toward and it keeps that context across every course you take.',
  },
];

function Features() {
  return (
    <section className="features section" id="features">
      <div className="container">
        <SectionHeading
          eyebrow="Why Vertex"
          title="Everything you need to actually finish"
          description="Most learning tools stop at content. Vertex Learn AI adds the part people usually get stuck without — someone to ask."
          align="center"
        />

        <ul className="features__grid">
          {features.map((feature) => (
            <li key={feature.title}>
              <Card className="feature">
                <span className="feature__icon">
                  <Icon name={feature.icon} size={20} />
                </span>
                <h3 className="feature__title">{feature.title}</h3>
                <p className="feature__text">{feature.text}</p>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Features;
