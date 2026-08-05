import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import AuthLayout from '../components/AuthLayout';
import { Alert, Button, Field, IconButton, Input } from '../components/ui';

const MIN_PASSWORD_LENGTH = 6;

function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSignup(event) {
    event.preventDefault();
    setError('');

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }

    setIsSubmitting(true);

    // Create the auth user
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });

    if (signUpError) {
      setError(signUpError.message);
      setIsSubmitting(false);
      return;
    }

    // Mirror the profile row so the app has a name and role to work with
    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').insert([
        {
          user_id: data.user.id,
          full_name: fullName,
          email,
          role: 'Student',
        },
      ]);

      if (profileError) {
        console.error('Profile Error:', profileError);
        setError(profileError.message);
        setIsSubmitting(false);
        return;
      }
    }

    setIsSubmitting(false);
    setIsDone(true);
  }

  return (
    <AuthLayout
      title={isDone ? 'Check your inbox' : 'Create your account'}
      subtitle={
        isDone
          ? 'Your account is ready. Confirm your email address if we sent you a link, then log in.'
          : 'Start learning in under a minute. No card required.'
      }
      footer={
        isDone ? (
          <>
            Ready to go? <Link to="/login">Log in</Link>
          </>
        ) : (
          <>
            Already have an account? <Link to="/login">Log in</Link>
          </>
        )
      }
    >
      {isDone ? (
        <div className="auth-form">
          <Alert variant="success" title="Account created">
            Welcome to Vertex Learn AI, {fullName || 'friend'}.
          </Alert>
          <Button as={Link} to="/login" size="lg" fullWidth iconRight="arrowRight">
            Continue to log in
          </Button>
        </div>
      ) : (
        <form className="auth-form" onSubmit={handleSignup} noValidate>
          {error ? (
            <Alert variant="danger" title="Couldn't create your account">
              {error}
            </Alert>
          ) : null}

          <Field id="signup-name" label="Full name" required>
            {(props) => (
              <Input
                {...props}
                type="text"
                icon="user"
                autoComplete="name"
                placeholder="Ada Lovelace"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            )}
          </Field>

          <Field id="signup-email" label="Email" required>
            {(props) => (
              <Input
                {...props}
                type="email"
                icon="mail"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
          </Field>

          <Field
            id="signup-password"
            label="Password"
            hint={`At least ${MIN_PASSWORD_LENGTH} characters.`}
            required
          >
            {(props) => (
              <Input
                {...props}
                type={showPassword ? 'text' : 'password'}
                icon="lock"
                autoComplete="new-password"
                placeholder="Create a password"
                minLength={MIN_PASSWORD_LENGTH}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                adornment={
                  <IconButton
                    icon={showPassword ? 'eyeOff' : 'eye'}
                    label={showPassword ? 'Hide password' : 'Show password'}
                    size="sm"
                    onClick={() => setShowPassword((current) => !current)}
                    tabIndex={-1}
                  />
                }
              />
            )}
          </Field>

          <Button type="submit" size="lg" fullWidth loading={isSubmitting}>
            {isSubmitting ? 'Creating account…' : 'Create account'}
          </Button>

          <p className="auth-form__terms">
            By creating an account you agree to our terms of service and privacy policy.
          </p>
        </form>
      )}
    </AuthLayout>
  );
}

export default Signup;
