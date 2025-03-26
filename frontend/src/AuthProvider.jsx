import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

//håll användaren inloggad efter page reload
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Kan vara username

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // Dekoda JWT
      setUser(payload.sub); // sub är användarnamnet vi satte i backend
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const payload = JSON.parse(atob(token.split('.')[1]));
    setUser(payload.sub);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);