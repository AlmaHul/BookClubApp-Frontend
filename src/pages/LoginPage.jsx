import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../auth/authService';

const LoginPage = () => {
  // States för användarnamn, lösenord och eventuella felmeddelanden
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Navigation-hanterare för att byta sida

  const handleLogin = async (e) => {
    e.preventDefault(); // Förhindrar standard formulärbeteende

    try {
      const response = await fetch('http://127.0.0.1:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }), // Skickar användarnamn och lösenord
      });

      if (response.ok) {
        const data = await response.json();
        saveToken(data.token); // 🔐 Spara den mottagna token i localStorage
        navigate('/');         // ✅ Om inloggningen lyckas, navigera till startsidan
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Inloggning misslyckades'); // Visar felmeddelande om login misslyckas
      }
    } catch (err) {
      setError('Något gick fel. Försök igen.'); // Hanterar eventuella andra fel
    }
  };

  return (
    // 1. Bakgrund med gradient, anpassad padding
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-900 via-indigo-900 to-blue-950 px-4">
      {/* 2. Centrerad vit box med rundade hörn, skuggning och bakgrundseffekt */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-violet-200">
        
        {/* 3. Harry Potter-citat */}
        <h1 className="text-xl text-center text-gray-600 italic mb-4">“Books turn Muggles into magic.”</h1>
        
        {/* 4. Stora rubriken */}
        <h2 className="text-3xl font-bold text-violet-700 mb-6 text-center">Welcome to the Book Club ✨</h2>

        {/* 5. Formulär för inloggning */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          
          {/* 6. Användarnamn fält */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Uppdaterar användarnamn
            required
            className="border border-violet-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          
          {/* 7. Lösenord fält */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Uppdaterar lösenord
            required
            className="border border-violet-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          
          {/* 8. Felmeddelande */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* 9. Logga in-knapp */}
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-yellow-400 hover:from-pink-600 hover:to-yellow-500 text-white py-3 rounded-lg font-semibold shadow-md transition duration-300"
          >
            Log In
          </button>
        </form>

        {/* 10. Länk till register-sidan */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account? <a href="/register" className="text-violet-500 hover:underline">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;