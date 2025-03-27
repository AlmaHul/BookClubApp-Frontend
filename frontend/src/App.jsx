import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import ProfilePage from './pages/ProfilePage';
import ReviewsPage from './pages/ReviewsPage';
import CreateReviewPage from './pages/CreateReviewPage';

// Importera din CSS-fil
import './styles/styles.css';

function App() {
  return (
<box>
    <Navbar />
<Routes>
<Route path="/" element={<HomePage />} />
<Route path="/profile" element={<ProfilePage />} />
<Route path="/review" element={<ReviewsPage />} />
<Route path="/create-review" element={<CreateReviewPage />} />


    </Routes>

    </box>
    );

}
export default App;
