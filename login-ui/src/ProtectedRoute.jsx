import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return;
    const checkSession = async () => {
      try {
        const res = await fetch(`${apiUrl}/session/get-session`, {
          method: "GET",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_API_KEY
          }
        });
        const data = await res.json();
        // console.log("Session data:", data);

        if (data?.loggedIn) {
          sessionStorage.setItem("userInfo", JSON.stringify(data));
          setLoggedIn(true);
        }
        if (!data?.loggedIn){
          setLoggedIn(false);
          navigate('/', { replace: true }); // replace ensures no back button
        }
      } catch (err) {
        // console.error("Session check failed:", err);
        setLoggedIn(false);
        navigate('/', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    checkSession();
    effectRan.current = true;
  }, [navigate]);

  if (loading) return <div>Checking session...</div>;
  if (!loggedIn) return null; // don’t render children if not logged in

  return children;
}
