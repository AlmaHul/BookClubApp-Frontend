import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../auth/AuthProvider';
import "../styles/login.css"; // För att hålla stilen konsistent

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', { username, password });
      if (res.data?.token) {
        login(res.data.token);
      }
      setMessage("🎉 " + (res.data?.message || "Registrering lyckades!"));
      navigate("/");
    } catch (err) {
      setMessage("❌ Registration failed: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleRegister}>
        <h1>Registrera</h1>
        {message && <p className={message.startsWith("❌") ? "error" : "success"}>{message}</p>}
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
        <button type="submit">Registrera</button>
        <p>Har du redan ett konto? <Link to="/login">Logga in</Link></p>
      </form>
    </div>
  );
}

export default RegisterPage;
