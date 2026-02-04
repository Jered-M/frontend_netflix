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
      setMedia(response.data);
      
      // Générer une URL de trailer YouTube basée sur le titre
      const searchQuery = encodeURIComponent(`${response.data.title} official trailer`);
      
      // URLs de démo populaires pour les films Netflix
      const demoVideos = {
        'movie': 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=1&rel=0',
        'series': 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=1&rel=0'
      };
      
      // Pour une vraie implémentation, utilisez l'API YouTube
      // Pour l'instant, on utilise une vidéo de démo
      setVideoUrl(`https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=1&rel=0&modestbranding=1`);
      
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
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
