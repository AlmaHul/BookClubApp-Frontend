// src/auth/useAuth.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);  // Initial state som null för att indikera "laddar"
const [user, setUser] = useState(null);

useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('access_token');  // Hämta token från localStorage
    if (!token) {
        setIsLoggedIn(false);  // Om ingen token finns, sätt isLoggedIn till false
        setUser(null);          // Ingen användare
        return;
    }

    try {
        const res = await axios.get('/api/user', {
        headers: {
            Authorization: `Bearer ${token}`,  // Skicka JWT-token i headern
        }
        });

        if (res.data.name) {  // Om vi får ett användarnamn från backend
          setUser(res.data);  // Sätt användaren
          setIsLoggedIn(true); // Sätt isLoggedIn till true
        }
    } catch (err) {
        setIsLoggedIn(false);  // Om något går fel (t.ex. ogiltig token), sätt isLoggedIn till false
        setUser(null);          // Sätt användaren till null
    }
    };

    fetchUser();  // Kör fetchUser när komponenten laddas
  }, []);  // Tom array som dependency gör att useEffect körs endast en gång när komponenten mountas

return { isLoggedIn, user };
};

