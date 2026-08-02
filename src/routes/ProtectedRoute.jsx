import { Navigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const checkSession = async () => {
    const { data } = await supabase.auth.getSession();


    setSession(data.session);

    setLoading(false);

  };
    checkSession();

  }, []);

  if (loading) {
  return <h2>Loading...</h2>;
  }

  if (!session) {
  return <Navigate to="/login" />;
  }

  return children;

}

export default ProtectedRoute;