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
        password
      });
      setMessage(res.data.message);
      // Direkt vidare till login-sidan efter lyckad registrering
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setMessage("Registration failed: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
      <p>
        Already have an account? <Link to="/">Login here</Link>
      </p>
    </div>
  );
}

export default RegisterPage;