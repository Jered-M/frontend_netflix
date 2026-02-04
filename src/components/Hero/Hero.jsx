import React, { useState, useEffect } from 'react';
import { FaPlay, FaPlus, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = ({ media }) => {
  const navigate = useNavigate();
  const [truncatedPlot, setTruncatedPlot] = useState('');

  useEffect(() => {
    if (media?.plot) {
      const maxLength = 200;
      setTruncatedPlot(
        media.plot.length > maxLength 
          ? media.plot.substring(0, maxLength) + '...' 
          : media.plot
      );
    }
  }, [media]);

  if (!media) return null;

  const handlePlay = () => {
    navigate(`/watch/${media.imdbID}`);
  };

  return (
    <div 
      className="hero"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(20,20,20,1)), 
                          url(${media.poster !== 'N/A' ? media.poster : 'https://via.placeholder.com/1920x1080'})`,
      }}
    >
      <div className="hero__content">
        <h1 className="hero__title">{media.title || media.Title}</h1>
        
        <div className="hero__info">
          {media.rating && <span className="hero__rating">★ {media.rating}</span>}
          {media.year && <span className="hero__year">{media.year || media.Year}</span>}
          {media.runtime && <span className="hero__runtime">{media.runtime}</span>}
        </div>

        <p className="hero__plot">
          {truncatedPlot || media.Plot}
        </p>

        <div className="hero__buttons">
          <button className="hero__button hero__button--play" onClick={handlePlay}>
            <FaPlay /> Lecture
          </button>
          <button className="hero__button hero__button--info">
            <FaInfoCircle /> Plus d'infos
          </button>
          <button className="hero__button hero__button--add">
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
