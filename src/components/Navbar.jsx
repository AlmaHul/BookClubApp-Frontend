import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { Menu, X } from 'lucide-react'; // Ikoner – kräver att du har lucide-react installerat
import "../styles/navbar.css";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-pink-200 underline'
      : 'text-white hover:text-pink-200';

  return (
    <header className="nav-header">
  <div className="nav-content">

      {/* Vänster: Titel */}
      <div className="logo">
        📚 BOOK CLUB
      </div>

      {/* Höger: Menyknapp (mobil) */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger-menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Menylänkar för Desktop - centrerade */}
     <nav className="menu-links">
  {isLoggedIn ? (
    <>
      <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>Home</NavLink>
      <NavLink to="/books" className={({ isActive }) => isActive ? 'active-link' : ''}>Books</NavLink>
      <NavLink to="/profile" className={({ isActive }) => isActive ? 'active-link' : ''}>Profile</NavLink>
      <NavLink to="/reviews" className={({ isActive }) => isActive ? 'active-link' : ''}>Reviews</NavLink>
    </>
  ) : (
    <>
      <NavLink to="/login" className={({ isActive }) => isActive ? 'active-link' : ''}>Logga in</NavLink>
      <NavLink to="/register" className={({ isActive }) => isActive ? 'active-link' : ''}>Registrera</NavLink>
    </>
  )}
</nav>


      {/* Logga ut-knapp längst till höger */}
      <button
        onClick={handleLogout}
        className="log-out"
      >
        Logga ut
      </button>
    </div>


  {/* Mobilmeny */}
  {menuOpen && (
    <div className="mobile-menu">
      {isLoggedIn ? (
        <>
          <NavLink to="/" onClick={() => setMenuOpen(false)} className={navLinkClass}>Home</NavLink>
          <NavLink to="/books" onClick={() => setMenuOpen(false)} className={navLinkClass}>Books</NavLink>
          <NavLink to="/profile" onClick={() => setMenuOpen(false)} className={navLinkClass}>Profile</NavLink>
          <NavLink to="/reviews" onClick={() => setMenuOpen(false)} className={navLinkClass}>Reviews</NavLink>
          <button
            onClick={handleLogout}
            className="mobile-log-out"
          >
            Logga ut
          </button>
        </>
      ) : (
        <>
          <NavLink to="/login" onClick={() => setMenuOpen(false)} className={navLinkClass}>Logga in</NavLink>
          <NavLink to="/register" onClick={() => setMenuOpen(false)} className={navLinkClass}>Registrera</NavLink>
        </>
      )}
    </div>
  )}
</header>

  );
};

export default Navbar;