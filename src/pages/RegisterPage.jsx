import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/api/auth/register", {
        username,
        password,
      });
      setMessage(res.data.message);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setMessage("Registration failed: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <div className="login-container sparkle-bg">
      <h2 className="login-title">💫 Join the Book Club 💫</h2>
      <form onSubmit={handleRegister} className="login-form">
        <input
          placeholder="📚 Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="🔒 Choose a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      <p className="message">{message}</p>
      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        Already a member? <Link to="/">Login here ✨</Link>
      </p>
    </div>
  );
}

export default RegisterPage;