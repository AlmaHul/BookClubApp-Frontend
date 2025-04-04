import { createContext, useContext, useEffect, useState } from "react";
import { saveToken, removeToken, decodeToken, getToken } from "./authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Funktion för att ladda användardata från token
  const loadUserFromToken = () => {
    const token = getToken();
    if (token) {
      const payload = decodeToken(token); // Skicka in token här
      console.log("Decoded token payload:", payload); // Logga payload

      if (payload && payload.sub) {
        if (typeof payload.sub === "object" && payload.sub.id && payload.sub.username) {
          setUser({
            id: payload.sub.id,         // Hämtar user_id
            username: payload.sub.username, // Hämtar användarnamn
          });
        } else if (typeof payload.sub === "string") {
          // Om payload.sub är en sträng, anta att det är ett id och sätt ett standardvärde
          setUser({ id: payload.sub, username: "Unknown" });
        } else {
          setUser(null); // Nollställ user om payload är ogiltigt
        }
      } else {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  // Körs vid sidladdning för att kolla om en giltig token finns
  useEffect(() => {
    loadUserFromToken();

    // Lyssna på ändringar i localStorage (t.ex. utloggning i annan flik)
    const handleStorageChange = () => {
      loadUserFromToken();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Logga in: spara token och uppdatera user
  const login = (token) => {
    saveToken(token);
    loadUserFromToken();
  };

  // Logga ut: ta bort token och nollställ user
  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook för att använda AuthContext
export const useAuth = () => useContext(AuthContext);


