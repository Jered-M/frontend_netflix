import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBell, FaUser } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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
          
          <div className="header__profile">
            <FaUser className="header__icon" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
