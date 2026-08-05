import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Alert, Badge, Button, Card, Icon, SectionHeading, Skeleton } from './ui';
import './Courses.css';

/* Cycles through the accent set so a grid of cards doesn't read as one block */
const accents = ['blue', 'purple', 'rose', 'green'];

function CourseSkeleton() {
  return (
    <Card className="course">
      <Skeleton width="44px" height="44px" radius="var(--r-md)" />
      <Skeleton width="70%" height="20px" style={{ marginTop: 'var(--s-4)' }} />
      <Skeleton width="100%" height="14px" style={{ marginTop: 'var(--s-3)' }} />
      <Skeleton width="85%" height="14px" style={{ marginTop: 'var(--s-2)' }} />
      <Skeleton width="120px" height="40px" radius="var(--r-full)" style={{ marginTop: 'var(--s-6)' }} />
    </Card>
  );
}

/** Pure fetch — no state, so the effect below stays free of sync setState. */
async function fetchCourses() {
  const { data, error } = await supabase.from('courses').select('*');
  if (error) throw error;
  return data ?? [];
}

function Courses() {
  const [courseData, setCourseData] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;

    fetchCourses()
      .then((rows) => {
        if (!active) return;
        setCourseData(rows);
        setStatus('ready');
      })
      .catch((error) => {
        if (!active) return;
        console.error(error);
        setStatus('error');
      });

    return () => {
      active = false;
    };
  }, [reloadKey]);

  function handleRetry() {
    setStatus('loading');
    setReloadKey((key) => key + 1);
  }

  function handleEnroll(courseId) {
    setEnrolledCourses((current) =>
      current.includes(courseId) ? current.filter((id) => id !== courseId) : [...current, courseId]
    );
  }

  return (
    <section className="courses section" id="courses">
      <div className="container">
        <SectionHeading
          eyebrow="Catalogue"
          title="Explore our courses"
          description="Short, focused tracks that build on each other. Enroll in as many as you like — your AI tutor keeps the context across all of them."
          action={
            status === 'ready' && courseData.length > 0 ? (
              <Badge variant="outline">{courseData.length} available</Badge>
            ) : null
          }
        />

        {status === 'loading' && (
          <div className="courses__grid">
            {Array.from({ length: 3 }, (_, index) => (
              <CourseSkeleton key={index} />
            ))}
          </div>
        )}

        {status === 'error' && (
          <div className="courses__notice">
            <Alert variant="danger" title="Couldn't load the catalogue">
              Something went wrong reaching the course service. Check your connection and try again.
            </Alert>
            <Button variant="outline" icon="refresh" onClick={handleRetry}>
              Retry
            </Button>
          </div>
        )}

        {status === 'ready' && courseData.length === 0 && (
          <div className="courses__notice">
            <Alert variant="info" title="No courses published yet">
              The catalogue is empty right now. New tracks are added every week — check back soon.
            </Alert>
          </div>
        )}

        {status === 'ready' && courseData.length > 0 && (
          <ul className="courses__grid">
            {courseData.map((course, index) => {
              const isEnrolled = enrolledCourses.includes(course.id);
              const accent = accents[index % accents.length];

              return (
                <li key={course.id}>
                  <Card className={`course course--${accent}`}>
                    <span className="course__icon">
                      <Icon name="book" size={22} />
                    </span>

                    <h3 className="course__title">{course.title}</h3>

                    {course.description ? (
                      <p className="course__desc">{course.description}</p>
                    ) : null}

                    {(course.level || course.duration) && (
                      <div className="course__meta">
                        {course.level ? (
                          <span className="course__meta-item">
                            <Icon name="target" size={14} />
                            {course.level}
                          </span>
                        ) : null}
                        {course.duration ? (
                          <span className="course__meta-item">
                            <Icon name="clock" size={14} />
                            {course.duration}
                          </span>
                        ) : null}
                      </div>
                    )}

                    <div className="course__footer">
                      <Button
                        variant={isEnrolled ? 'tonal' : 'primary'}
                        icon={isEnrolled ? 'check' : undefined}
                        iconRight={isEnrolled ? undefined : 'arrowRight'}
                        onClick={() => handleEnroll(course.id)}
                        aria-pressed={isEnrolled}
                      >
                        {isEnrolled ? 'Enrolled' : 'Enroll now'}
                      </Button>
                    </div>
                  </Card>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

export default Courses;
