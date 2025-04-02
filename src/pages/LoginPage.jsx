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
      const response = await fetch('http://127.0.0.1:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token); // ✅ Uppdaterar auth state
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Inloggning misslyckades');
      }
    } catch (err) {
      setError('Något gick fel. Försök igen.');
    }
  };

  return (
    <div className="main-content">
      <div className="login-box">
        <h2 className="log-in">Logga in</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Användarnamn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="text-box"
          />
          <input
            type="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="text-box"
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="login-button"
          >
            Logga in
          </button>
          <p>
  Har du inget konto? <a href="/register" className="register-link">Registrera dig här</a>
</p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

