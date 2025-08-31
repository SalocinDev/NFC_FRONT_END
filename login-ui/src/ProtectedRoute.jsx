import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://${window.location.hostname}:3000/session/get-session`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        console.log("Session data:", data);
        if (data?.loggedIn) {
          setLoggedIn(true);
        } else {
          navigate('/');
        }
      })
      .catch(err => {
        console.error("Session check failed:", err);
        navigate('/');
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) return <div>Checking session...</div>;

  return loggedIn ? children : <div>Not logged in.</div>;
}
