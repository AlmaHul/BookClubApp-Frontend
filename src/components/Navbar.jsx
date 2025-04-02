import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { Menu, X } from 'lucide-react'; // Ikoner – kräver att du har lucide-react installerat

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
    <header className="bg-pink-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Vänster: Titel */}
          <div className="text-white font-bold text-xl flex items-center">
            📚 BOOK CLUB
          </div>

          {/* Menyknapp (mobil och tablet) */}
          {/*
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
          */}
          {/* Desktopmeny */}
          <nav className="hidden md:flex space-x-6 items-center">
            {isLoggedIn ? (
              <>
                <NavLink to="/" className={navLinkClass}>Home</NavLink>
                <NavLink to="/books" className={navLinkClass}>Books</NavLink>
                <NavLink to="/profile" className={navLinkClass}>Profile</NavLink>
                <NavLink to="/reviews" className={navLinkClass}>Reviews</NavLink>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-pink-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={navLinkClass}>Login</NavLink>
                <NavLink to="/register" className={navLinkClass}>Register</NavLink>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Mobilmeny */}
      {/* 
      {menuOpen && (
        <div className="md:hidden bg-pink-400 px-4 py-3 space-y-2">
          {isLoggedIn ? (
            <>
              <NavLink to="/" onClick={() => setMenuOpen(false)} className={navLinkClass}>Home</NavLink>
              <NavLink to="/books" onClick={() => setMenuOpen(false)} className={navLinkClass}>Books</NavLink>
              <NavLink to="/profile" onClick={() => setMenuOpen(false)} className={navLinkClass}>Profile</NavLink>
              <NavLink to="/reviews" onClick={() => setMenuOpen(false)} className={navLinkClass}>Reviews</NavLink>
              <button
                onClick={handleLogout}
                className="text-white hover:text-pink-200 block"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setMenuOpen(false)} className={navLinkClass}>Login</NavLink>
              <NavLink to="/register" onClick={() => setMenuOpen(false)} className={navLinkClass}>Register</NavLink>
            </>
          )}
        </div>
      )}*/}
    </header>
  );
};

export default Navbar;