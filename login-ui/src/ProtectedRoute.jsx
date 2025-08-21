import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://${window.location.hostname}:3000/get-session`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        console.log("Session data:", data);
        if (!data || !data.loggedIn) {
          navigate('/');
        }
      })
      .catch(err => {
        console.error(err);
        navigate('/');
      })
      .finally(() => setLoading(false));
  }, [navigate]);
  

  if (loading) return <div>Checking session...</div>;

  return children;
}
