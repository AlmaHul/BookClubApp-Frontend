import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthProvider'; // Importera useAuth för att få användardata
import "../styles/HomePage.css";

const HomePage = () => {
  const { isLoggedIn, user } = useAuth(); // Använd useAuth för att hämta om användaren är inloggad och deras data

  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    try {
      const res = await axios.post("http://127.0.0.1:8080/api/ai-chat/chat", {
        message,
      });
      setResponse(res.data.recommendation);
      setMessage("");  // Clear input after submit
    } catch (err) {
      setError("❌ Error: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <div className="home-page">
      <div className="chat-box">
        <h1>Welcome {isLoggedIn ? user.username : "Guest"}!</h1> {/* Här visas användarens namn eller 'Guest' om de inte är inloggade */}
        <h2>Ask AI about book tips</h2>
        <form onSubmit={handleSubmit} className="chat-form">
          <input
            type="text"
            placeholder="Write something..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="ai-text-box"
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {response && (
          <div className="response-box">
            <h3>AI-svar:</h3>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;


