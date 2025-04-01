import { createContext, useContext, useEffect, useState } from "react";
import { saveToken, removeToken, decodeToken, getToken } from "./authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Körs när appen laddas – kolla om det finns en giltig token
  useEffect(() => {
    const token = getToken();
    if (token) {
      const payload = decodeToken();
      if (payload) {
        setUser(payload.sub); // t.ex. användarnamn eller id från JWT
      }
    }
  }, []);

  // Logga in: spara token och uppdatera user
  const login = (token) => {
    saveToken(token);
    const payload = decodeToken();
    setUser(payload?.sub || null);
  };

  // Logga ut: ta bort token och nollställ user
  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);