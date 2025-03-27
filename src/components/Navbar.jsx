import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
       <header className="header">
      {/* Vänstra delen: Logotyp eller titel */}
      <div className="header-left">
        BOOK CLUB
      </div>
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className="nav-button">Home</Link>
        </li>
        <li>
          <Link to="/books" className="nav-button">Books</Link>
        </li>
        <li>
          <Link to="/profile" className="nav-button">Profile</Link>
        </li>
        <li>
          <Link to="/review" className="nav-button">Reviews</Link>
        </li>
      </ul>
    </nav>
    </header>
  );
};

export default Navbar;
