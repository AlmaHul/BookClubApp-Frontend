import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/api/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setMessage(res.data.message);
      navigate("/home");
    } catch (err) {
      setMessage("Login failed: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <div className="login-container sparkle-bg">
      <h2 className="login-title">✨ Welcome to the Book Club ✨</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          placeholder="📚 Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="🔒 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p className="message">{message}</p>
      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        Not a member yet? <Link to="/register">Register here 💫</Link>
      </p>
    </div>
  );
}

export default LoginPage;