import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import RouteLoader from '../components/RouteLoader';

function ProtectedRoute({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!active) return;

      setSession(data.session);
      setLoading(false);
    };

    checkSession();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <RouteLoader />;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
