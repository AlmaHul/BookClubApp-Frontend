import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import BooksPage from './pages/BooksPage';
import ProfilePage from './pages/ProfilePage';
import ReviewsPage from './pages/ReviewsPage';

// Importera din CSS-fil
import './styles/styles.css';

function App() {
  return (
<box>
    <Navbar />
<Routes>
<Route path="/" element={<HomePage />} />
<Route path="/books" element={<BooksPage />} />
<Route path="/profile" element={<ProfilePage />} />
<Route path="/review" element={<ReviewsPage />} />


    </Routes>

    </box>
    );

}
export default App;
