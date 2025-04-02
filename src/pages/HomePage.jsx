import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthProvider';
import "../styles/HomePage.css";

const HomePage = () => {
  const { isLoggedIn, user } = useAuth();

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
        <h2>Ask about book tips</h2>
        <form onSubmit={handleSubmit} className="chat-form">
          <input
            type="text"
            placeholder="..."
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
