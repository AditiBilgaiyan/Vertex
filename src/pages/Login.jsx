import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import AuthLayout from '../components/AuthLayout';
import { Alert, Button, Field, IconButton, Input } from '../components/ui';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError(signInError.message);
      setIsSubmitting(false);
      return;
    }

    navigate('/dashboard');
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to pick up where you left off."
      footer={
        <>
          Don&apos;t have an account? <Link to="/signup">Create one free</Link>
        </>
      }
    >
      <form className="auth-form" onSubmit={handleLogin} noValidate>
        {error ? (
          <Alert variant="danger" title="Couldn't sign you in">
            {error}
          </Alert>
        ) : null}

        <Field id="login-email" label="Email" required>
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

        <Field id="login-password" label="Password" required>
          {(props) => (
            <Input
              {...props}
              type={showPassword ? 'text' : 'password'}
              icon="lock"
              autoComplete="current-password"
              placeholder="Enter your password"
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

        <div className="auth-form__row">
          <span />
          <Link className="auth-form__link" to="/signup">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" size="lg" fullWidth loading={isSubmitting}>
          {isSubmitting ? 'Signing in…' : 'Log in'}
        </Button>
      </form>
    </AuthLayout>
  );
}

export default Login;
