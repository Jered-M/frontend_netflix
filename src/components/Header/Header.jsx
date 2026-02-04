import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBell, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">
        <div className="header__left">
          <Link to="/" className="header__logo">
            NETFLIX
          </Link>
          <nav className="header__nav">
            <Link to="/" className="header__nav-link">Accueil</Link>
            <Link to="/series" className="header__nav-link">Séries</Link>
            <Link to="/films" className="header__nav-link">Films</Link>
            <Link to="/my-list" className="header__nav-link">Ma liste</Link>
          </nav>
        </div>

        <div className="header__right">
          <form onSubmit={handleSearch} className="header__search">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="header__search-input"
            />
            <button type="submit" className="header__search-btn">
              <FaSearch />
            </button>
          </form>
          
          <FaBell className="header__icon" />
          
          <div 
            className="header__profile"
            onClick={() => setShowUserMenu(!showUserMenu)}
            onMouseLeave={() => setShowUserMenu(false)}
          >
            <FaUser className="header__icon" />
            {showUserMenu && (
              <div className="header__user-menu">
                <div className="header__user-info">
                  <FaUser className="header__user-avatar" />
                  <span className="header__user-name">{user?.name || 'Utilisateur'}</span>
                </div>
                <button className="header__logout-btn" onClick={handleLogout}>
                  <FaSignOutAlt /> Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
