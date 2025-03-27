import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import ProfilePage from './pages/ProfilePage';
import ReviewsPage from './pages/ReviewsPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/review" element={<ReviewsPage />} />
      </Routes>
    </Router>
  );
}

export default App;