import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

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
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">Logga in</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Användarnamn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md font-semibold transition duration-300"
          >
            Logga in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

