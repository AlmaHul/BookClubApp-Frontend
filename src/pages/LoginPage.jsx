import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../auth/authService';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        saveToken(data.token); // 🧠 Spara token i localStorage
        navigate('/');         // 🔁 Redirect till startsidan
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Inloggning misslyckades');
      }
    } catch (err) {
      setError('Något gick fel. Försök igen.');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Logga in</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="E-post"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 rounded"
        />
        {error && <p className="text-red-600">{error}</p>}
        <button type="submit" className="bg-pink-500 text-white py-2 rounded hover:bg-pink-600">
          Logga in
        </button>
      </form>
    </div>
  );
};

export default LoginPage;