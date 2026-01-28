import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import "../styles/login.css";  // För att hålla stilen konsistent

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isLoggedIn, login } = useAuth();

  useEffect(() => {
    console.log("🟢 useEffect körs - isLoggedIn:", isLoggedIn);
    if (isLoggedIn) {
      console.log("✅ isLoggedIn är true! Navigerar till /");
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token); // ✅ Uppdaterar auth state
      } else {
        const data = await response.json();
        setError(data?.message || 'Något gick fel. Försök igen.');
      }
    } catch (error) {
      console.error('Ett fel uppstod:', error);
      setError('Ett fel uppstod. Försök igen.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>Logga in</h1>
        {error && <p className="error">{error}</p>}
        <label htmlFor="username">Användarnamn:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Lösenord:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Logga in</button>
      </form>
    </div>
  );
};

export default LoginPage;
