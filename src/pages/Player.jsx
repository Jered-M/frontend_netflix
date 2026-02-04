import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlay, FaPause, FaExpand, FaVolumeUp } from 'react-icons/fa';
import { mediaService } from '../services/api';
import './Player.css';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    loadMedia();
  }, [id]);

  const loadMedia = async () => {
    try {
      const response = await mediaService.getMediaDetails(id);
      const mediaData = response.data;
      setMedia(mediaData);
      
      // Base de films GRATUITS et LÉGAUX (Internet Archive + Domaine Public)
      const freeMovies = {
        // Films classiques du domaine public
        'tt0051554': 'https://archive.org/embed/night_of_the_living_dead', // Night of Living Dead
        'tt0055630': 'https://archive.org/embed/Charade_Cary_Grant', // Charade
        'tt0017136': 'https://archive.org/embed/nosferatu_eine_symphonie_des_grauens', // Nosferatu
        'tt0033467': 'https://archive.org/embed/TheCatAndTheCanary1939', // The Cat and the Canary
        
        // Si pas de film spécifique, utiliser des films de démo
        'default': [
          'https://archive.org/embed/night_of_the_living_dead',
          'https://archive.org/embed/Charade_Cary_Grant',
          'https://archive.org/embed/ThePhantomoftheOpera1925',
          'https://archive.org/embed/TheCatAndTheCanary1939',
          'https://archive.org/embed/His_Girl_Friday_1940'
        ]
      };
      
      let videoUrl = freeMovies[id];
      
      // Si pas de film spécifique, prendre un film aléatoire
      if (!videoUrl) {
        const defaults = freeMovies.default;
        videoUrl = defaults[Math.floor(Math.random() * defaults.length)];
      }
      
      setVideoUrl(videoUrl);
      
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      // Fallback vers un film de démo
      setVideoUrl('https://archive.org/embed/night_of_the_living_dead');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="player">
      <button className="player__back" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Retour
      </button>

      <div className="player__video">
        {videoUrl ? (
          <iframe
            className="player__iframe"
            src={videoUrl}
            title={media?.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="player__placeholder">
            <FaPlay className="player__play-icon" />
            <h2>Vidéo non disponible</h2>
            <p>{media?.title}</p>
          </div>
        )}
      </div>

      <div className="player__info">
        <h1 className="player__title">{media?.title}</h1>
        <div className="player__metadata">
          <span className="player__year">{media?.year}</span>
          <span className="player__rating">★ {media?.rating}</span>
          <span className="player__runtime">{media?.runtime}</span>
        </div>
        <p className="player__plot">{media?.plot}</p>
        <div className="player__details">
          <p><strong>Genre:</strong> {media?.genre}</p>
          <p><strong>Réalisateur:</strong> {media?.director}</p>
          <p><strong>Acteurs:</strong> {media?.actors}</p>
        </div>
      </div>
    </div>
  );
};

export default Player;
