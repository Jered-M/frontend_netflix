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
      
      // Utiliser des vidéos de test HTML5 qui fonctionnent à coup sûr
      // Ces URLs sont des exemples de test publics et légaux
      const demoVideos = [
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
      ];
      
      // Sélectionner une vidéo aléatoire basée sur l'ID du film
      const index = parseInt(id.replace(/\D/g, '')) % demoVideos.length;
      setVideoUrl(demoVideos[index]);
      
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      // Fallback vers Big Buck Bunny
      setVideoUrl('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
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
          <video
            className="player__video-element"
            src={videoUrl}
            controls
            autoPlay
            controlsList="nodownload"
          >
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
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
