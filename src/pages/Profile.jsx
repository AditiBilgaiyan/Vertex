import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import AppShell from '../components/AppShell';
import { Alert, Avatar, Badge, Button, Card, Field, Input, Skeleton } from '../components/ui';
import '../styles/Profile.css';

const emptyProfile = { full_name: '', email: '', role: '' };

function Profile() {
  const [profile, setProfile] = useState(emptyProfile);
  const [userId, setUserId] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState(null); // { variant, message }

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;

      if (!active) return;

      if (!user) {
        setStatus('error');
        return;
      }

      setUserId(user.id);

      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, email, role')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!active) return;

      if (error) {
        console.error(error);
        setStatus('error');
        return;
      }

      // Fall back to the auth record when no profile row exists yet
      setProfile({
        full_name: data?.full_name ?? '',
        email: data?.email ?? user.email ?? '',
        role: data?.role ?? 'Student',
      });
      setStatus('ready');
    }

    loadProfile();

    return () => {
      active = false;
    };
  }, []);

  function updateField(key, value) {
    setProfile((current) => ({ ...current, [key]: value }));
    setFeedback(null);
  }

  async function handleSave(event) {
    event.preventDefault();
    if (!userId) return;

    setIsSaving(true);
    setFeedback(null);

    const { error } = await supabase
      .from('profiles')
      .update({ full_name: profile.full_name, role: profile.role })
      .eq('user_id', userId);

    setIsSaving(false);

    if (error) {
      console.error(error);
      setFeedback({ variant: 'danger', message: error.message });
      return;
    }

    setFeedback({ variant: 'success', message: 'Your profile has been updated.' });
  }

  return (
    <AppShell title="Profile" subtitle="Manage how you appear across Vertex Learn AI">
      <div className="profile">
        <Card className="profile__identity">
          {status === 'loading' ? (
            <>
              <Skeleton width="96px" height="96px" radius="var(--r-full)" />
              <Skeleton width="160px" height="20px" style={{ marginTop: 'var(--s-5)' }} />
              <Skeleton width="200px" height="14px" style={{ marginTop: 'var(--s-3)' }} />
            </>
          ) : (
            <>
              <Avatar name={profile.full_name || profile.email} size={96} />
              <h2 className="profile__name">{profile.full_name || 'Unnamed learner'}</h2>
              <p className="profile__email">{profile.email}</p>
              {profile.role ? (
                <Badge variant="primary" icon="cap" className="profile__role">
                  {profile.role}
                </Badge>
              ) : null}

              <dl className="profile__stats">
                <div>
                  <dt>Courses</dt>
                  <dd>3</dd>
                </div>
                <div>
                  <dt>Streak</dt>
                  <dd>6d</dd>
                </div>
                <div>
                  <dt>Progress</dt>
                  <dd>55%</dd>
                </div>
              </dl>
            </>
          )}
        </Card>

        <Card className="profile__form-card">
          <header className="profile__form-head">
            <h2 className="profile__form-title">Account details</h2>
            <p className="profile__form-sub">
              Your email is managed by your login and can&apos;t be changed here.
            </p>
          </header>

          {status === 'error' ? (
            <Alert variant="danger" title="Couldn't load your profile">
              We couldn&apos;t reach the profile service. Refresh the page to try again.
            </Alert>
          ) : (
            <form className="profile__form" onSubmit={handleSave}>
              {feedback ? (
                <Alert variant={feedback.variant}>{feedback.message}</Alert>
              ) : null}

              <Field id="profile-name" label="Full name">
                {(props) => (
                  <Input
                    {...props}
                    type="text"
                    icon="user"
                    autoComplete="name"
                    placeholder="Your name"
                    value={profile.full_name}
                    disabled={status === 'loading'}
                    onChange={(e) => updateField('full_name', e.target.value)}
                  />
                )}
              </Field>

              <Field id="profile-email" label="Email" hint="Managed by your sign-in method.">
                {(props) => (
                  <Input {...props} type="email" icon="mail" value={profile.email} readOnly />
                )}
              </Field>

              <Field id="profile-role" label="Role">
                {(props) => (
                  <Input
                    {...props}
                    type="text"
                    icon="cap"
                    placeholder="Student"
                    value={profile.role}
                    disabled={status === 'loading'}
                    onChange={(e) => updateField('role', e.target.value)}
                  />
                )}
              </Field>

              <div className="profile__form-actions">
                <Button type="submit" size="lg" loading={isSaving} disabled={status !== 'ready'}>
                  {isSaving ? 'Saving…' : 'Save changes'}
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </AppShell>
  );
}

export default Profile;
