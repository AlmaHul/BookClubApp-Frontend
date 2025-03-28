import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      {/* Vänster: Titel */}
      <div className="header-left">📚 BOOK CLUB</div>

      {/* Höger: Navigation */}
      <nav className="navbar">
        <ul>
          {isLoggedIn ? (
            <>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? 'nav-button active' : 'nav-button'
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/books"
                  className={({ isActive }) =>
                    isActive ? 'nav-button active' : 'nav-button'
                  }
                >
                  Books
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive ? 'nav-button active' : 'nav-button'
                  }
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/reviews"
                  className={({ isActive }) =>
                    isActive ? 'nav-button active' : 'nav-button'
                  }
                >
                  Reviews
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="nav-button logout-button"
                >
                  Logga ut
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? 'nav-button active' : 'nav-button'
                  }
                >
                  Logga in
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? 'nav-button active' : 'nav-button'
                  }
                >
                  Registrera
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;