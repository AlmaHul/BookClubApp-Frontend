import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";  // För att hålla stilen konsistent

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8080/api/auth/register", {
        username,
        password,
      });
      setMessage("🎉 " + res.data.message);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setMessage("❌ Registration failed: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  return (
<div className="main-content">
      <div className="register-box">
        <h2 className="register-text">💫 Join the Book Club </h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="📚 Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="text-box"
          />
          <input
            type="password"
            placeholder="🔒 Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="text-box"
          />
          <button
            type="submit"
            className="register-button"
          >
            Register
          </button>
        </form>
        {message && (
          <p className="mt-4 text-sm text-gray-700">{message}</p>
        )}
        <p className="mt-6 text-sm">
          Already a member?{" "}
          <Link to="/login" className="link-back">
            Login here ✨
          </Link>
        </p>
      </div>
      </div>

  );
}

export default RegisterPage;