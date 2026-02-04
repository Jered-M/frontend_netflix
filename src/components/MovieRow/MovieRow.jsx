import React, { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import MovieCard from '../MovieCard/MovieCard';
import './MovieRow.css';

const MovieRow = ({ title, movies = [] }) => {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = direction === 'left' ? -800 : 800;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="movie-row">
      <h2 className="movie-row__title">{title}</h2>
      <div className="movie-row__container">
        <button 
          className="movie-row__arrow movie-row__arrow--left"
          onClick={() => scroll('left')}
        >
          <FaChevronLeft />
        </button>
        
        <div className="movie-row__movies" ref={rowRef}>
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
        
        <button 
          className="movie-row__arrow movie-row__arrow--right"
          onClick={() => scroll('right')}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
