import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BooksPage from './pages/BooksPage';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ReviewsPage from './pages/ReviewsPage';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import { saveToken, getToken, removeToken } from './auth/authService';
import CreateReview from './pages/CreateReview';
import MyReviewsPage from './pages/myReviews';
import UpdateReviewPage from './pages/UpdateReviewPage';


function App() {
  const [token, setToken] = useState(getToken());

  // Uppdatera token när det ändras i localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(getToken());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Funktion för att logga in och spara token
  const login = (token) => {
    saveToken(token);
    setToken(token); // Uppdatera state direkt
  };

  // Funktion för att logga ut
  const logout = () => {
    removeToken();
    setToken(null);
  };

   return (
    <>
      {/* Kolla om användaren är på login eller register-sidan, i så fall rendera inte Navbar */}
      {token && location.pathname !== '/login' && location.pathname !== '/register' && <Navbar logout={logout} />}

      <Routes>
        <Route path="/login" element={<LoginPage login={login} />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/books" element={<ProtectedRoute><BooksPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/reviews" element={<ProtectedRoute><ReviewsPage /></ProtectedRoute>} />
        <Route path="/create-review" element={<ProtectedRoute><CreateReview /></ProtectedRoute>} />
        <Route path="/my-reviews" element={<ProtectedRoute><MyReviewsPage /></ProtectedRoute>} />
        <Route path="/update-review/:reviewId" element={<ProtectedRoute><UpdateReviewPage /></ProtectedRoute>} />
      </Routes>
        <Footer />
    </>
  );
}

export default App;

