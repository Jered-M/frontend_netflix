import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import MovieRow from '../components/MovieRow/MovieRow';
import { mediaService } from '../services/api';
import './Home.css';

const Home = () => {
  const [trending, setTrending] = useState({ films: [], series: [] });
  const [heroMedia, setHeroMedia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrending();
  }, []);

  const loadTrending = async () => {
    try {
      const response = await mediaService.getTrending();
      setTrending(response.data);
      
      // Utiliser le premier film comme hero
      if (response.data.films.length > 0) {
        const firstFilm = response.data.films[0];
        const details = await mediaService.getMediaDetails(firstFilm.imdbID);
        setHeroMedia(details.data);
      }
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
    <div className="home">
      <Header />
      <Hero media={heroMedia} />
      <MovieRow title="Films populaires" movies={trending.films} />
      <MovieRow title="Séries tendances" movies={trending.series} />
    </div>
  );
};

export default Home;
