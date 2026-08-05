import { useNavigate } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { Badge, Button, Card, Icon, Progress } from '../components/ui';
import '../styles/Dashboard.css';

const courses = [
  { title: 'React Fundamentals', progress: 20, lessons: 18, completed: false },
  { title: 'JavaScript Basics', progress: 45, lessons: 24, completed: false },
  { title: 'HTML & CSS', progress: 100, lessons: 16, completed: true },
];

const activities = [
  { id: 1, icon: 'checkCircle', tone: 'success', text: 'Completed HTML & CSS', time: '2 days ago' },
  { id: 2, icon: 'book', tone: 'primary', text: 'JavaScript Basics — 45% complete', time: 'Yesterday' },
  { id: 3, icon: 'zap', tone: 'warning', text: 'Started React Fundamentals', time: '4 hours ago' },
];

const quickActions = [
  {
    id: 1,
    icon: 'play',
    title: 'Continue learning',
    text: 'Jump back into React Fundamentals',
    to: '/dashboard',
  },
  {
    id: 2,
    icon: 'sparkles',
    title: 'Ask AI Tutor',
    text: 'Get unstuck on any concept',
    to: '/#ai-tutor',
  },
  {
    id: 3,
    icon: 'user',
    title: 'Edit profile',
    text: 'Update your details and goals',
    to: '/profile',
  },
];

function Dashboard() {
  const navigate = useNavigate();

  const averageProgress = Math.round(
    courses.reduce((total, course) => total + course.progress, 0) / courses.length
  );

  const completedCount = courses.filter((course) => course.completed).length;
  const inProgress = courses.find((course) => !course.completed);

  const stats = [
    {
      icon: 'book',
      label: 'Enrolled courses',
      value: courses.length,
      meta: `${completedCount} completed`,
      tone: 'primary',
    },
    {
      icon: 'trending',
      label: 'Average progress',
      value: `${averageProgress}%`,
      meta: '+18% this week',
      tone: 'success',
    },
    {
      icon: 'flame',
      label: 'Current streak',
      value: '6 days',
      meta: 'Personal best: 11',
      tone: 'warning',
    },
    {
      icon: 'sparkles',
      label: 'AI Tutor',
      value: 'Available',
      meta: 'Ready to answer',
      tone: 'gemini',
    },
  ];

  return (
    <AppShell
      title="Dashboard"
      subtitle="Your learning at a glance"
      actions={
        <Button variant="outline" size="sm" icon="plus" onClick={() => navigate('/#courses')}>
          Add course
        </Button>
      }
    >
      {/* Welcome banner */}
      <section className="welcome">
        <div className="welcome__text">
          <Badge variant="primary" icon="sparkles">
            You&apos;re on a 6-day streak
          </Badge>
          <h2 className="welcome__title">Welcome back 👋</h2>
          <p className="welcome__sub">
            {inProgress
              ? `You're ${inProgress.progress}% through ${inProgress.title}. Fifteen minutes today keeps the streak alive.`
              : 'Every course is complete. Time to pick up something new.'}
          </p>
        </div>

        <div className="welcome__actions">
          <Button variant="primary" size="lg" iconRight="arrowRight" onClick={() => navigate('/#courses')}>
            Continue learning
          </Button>
        </div>
      </section>

      {/* Stats */}
      <section className="stats" aria-label="Summary">
        {stats.map((stat) => (
          <Card className="stat" key={stat.label}>
            <span className={`stat__icon stat__icon--${stat.tone}`}>
              <Icon name={stat.icon} size={20} />
            </span>
            <p className="stat__label">{stat.label}</p>
            <p className="stat__value">{stat.value}</p>
            <p className="stat__meta">{stat.meta}</p>
          </Card>
        ))}
      </section>

      {/* Courses + activity */}
      <div className="dash-grid">
        <section className="dash-panel" aria-labelledby="continue-heading">
          <header className="dash-panel__head">
            <h2 className="dash-panel__title" id="continue-heading">
              Continue learning
            </h2>
            <Button variant="ghost" size="sm" iconRight="chevronRight" onClick={() => navigate('/#courses')}>
              View all
            </Button>
          </header>

          <ul className="course-list">
            {courses.map((course) => (
              <li key={course.title}>
                <Card className="course-row">
                  <div className="course-row__main">
                    <div className="course-row__top">
                      <h3 className="course-row__title">{course.title}</h3>
                      {course.completed ? (
                        <Badge variant="success" icon="check">
                          Completed
                        </Badge>
                      ) : (
                        <Badge variant="neutral">{course.lessons} lessons</Badge>
                      )}
                    </div>

                    <Progress
                      value={course.progress}
                      variant={course.completed ? 'success' : 'primary'}
                      label={`${course.progress}% complete`}
                      showValue={false}
                    />
                  </div>

                  <Button
                    variant={course.completed ? 'outline' : 'primary'}
                    icon={course.completed ? 'refresh' : 'play'}
                    className="course-row__cta"
                  >
                    {course.completed ? 'Review' : 'Continue'}
                  </Button>
                </Card>
              </li>
            ))}
          </ul>
        </section>

        <section className="dash-panel" aria-labelledby="activity-heading">
          <header className="dash-panel__head">
            <h2 className="dash-panel__title" id="activity-heading">
              Recent activity
            </h2>
          </header>

          <Card className="activity" padded={false}>
            <ul className="activity__list">
              {activities.map((activity) => (
                <li className="activity__item" key={activity.id}>
                  <span className={`activity__icon activity__icon--${activity.tone}`}>
                    <Icon name={activity.icon} size={16} />
                  </span>
                  <div className="activity__body">
                    <p className="activity__text">{activity.text}</p>
                    <p className="activity__time">{activity.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </section>
      </div>

      {/* Quick actions */}
      <section className="dash-panel" aria-labelledby="actions-heading">
        <header className="dash-panel__head">
          <h2 className="dash-panel__title" id="actions-heading">
            Quick actions
          </h2>
        </header>

        <ul className="actions">
          {quickActions.map((action) => (
            <li key={action.id}>
              <Card
                as="button"
                interactive
                className="action"
                type="button"
                onClick={() => navigate(action.to)}
              >
                <span className="action__icon">
                  <Icon name={action.icon} size={20} />
                </span>
                <span className="action__body">
                  <span className="action__title">{action.title}</span>
                  <span className="action__text">{action.text}</span>
                </span>
                <Icon name="chevronRight" size={18} className="action__chevron" />
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </AppShell>
  );
}

export default Dashboard;
