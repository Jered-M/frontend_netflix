import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { mediaService } from '../services/api';
import './Player.css';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMedia();
  }, [id]);

  const loadMedia = async () => {
    try {
      const response = await mediaService.getMediaDetails(id);
      setMedia(response.data);
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
        <div className="player__placeholder">
          <h2>Lecteur vidéo</h2>
          <p>{media?.title}</p>
          <p className="player__note">
            Note: Ceci est une démo. L'intégration d'une vraie source vidéo 
            nécessiterait un service de streaming.
          </p>
        </div>
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
