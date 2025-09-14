import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(`${apiUrl}/session/get-session`, {
          method: "GET",
          credentials: 'include',
        });
        const data = await res.json();
        console.log("Session data:", data);

        if (data?.loggedIn) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
          navigate('/', { replace: true }); // replace ensures no back button
        }
      } catch (err) {
        console.error("Session check failed:", err);
        setLoggedIn(false);
        navigate('/', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [navigate]);

  if (loading) return <div>Checking session...</div>;
  if (!loggedIn) return null; // don’t render children if not logged in

  return children;
}
