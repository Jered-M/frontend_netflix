import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaPlus, FaChevronDown } from 'react-icons/fa';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const handlePlay = (e) => {
    e.stopPropagation();
    navigate(`/watch/${movie.imdbID}`);
  };

  const poster = movie.Poster !== 'N/A' ? movie.Poster : movie.poster;

  return (
    <div 
      className="movie-card"
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      <img 
        src={poster || 'https://via.placeholder.com/300x450'} 
        alt={movie.Title || movie.title}
        className="movie-card__poster"
      />
      
      {showDetails && (
        <div className="movie-card__details">
          <div className="movie-card__buttons">
            <button 
              className="movie-card__button movie-card__button--play"
              onClick={handlePlay}
            >
              <FaPlay />
            </button>
            <button className="movie-card__button movie-card__button--add">
              <FaPlus />
            </button>
            <button className="movie-card__button movie-card__button--info">
              <FaChevronDown />
            </button>
          </div>
          
          <div className="movie-card__info">
            <h3 className="movie-card__title">{movie.Title || movie.title}</h3>
            <div className="movie-card__metadata">
              <span className="movie-card__year">{movie.Year || movie.year}</span>
              <span className="movie-card__type">{movie.Type || movie.type}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
