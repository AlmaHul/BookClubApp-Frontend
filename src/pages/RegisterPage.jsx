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
      setMessage("🎉 " + res.data.message);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setMessage("❌ Registration failed: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl text-center sparkle-bg">
        <h2 className="text-3xl font-bold text-pink-600 mb-6">💫 Join the Book Club 💫</h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="📚 Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="password"
            placeholder="🔒 Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md font-semibold transition duration-300"
          >
            Register
          </button>
        </form>
        {message && (
          <p className="mt-4 text-sm text-gray-700">{message}</p>
        )}
        <p className="mt-6 text-sm">
          Already a member?{" "}
          <Link to="/login" className="text-pink-600 hover:underline">
            Login here ✨
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;