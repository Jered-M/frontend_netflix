import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import MovieRow from '../components/MovieRow/MovieRow';
import { mediaService } from '../services/api';
import './Films.css';

const Films = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFilms();
  }, []);

  const loadFilms = async () => {
    try {
      const queries = ['Action', 'Comedy', 'Drama', 'Thriller', 'Horror'];
      const requests = queries.map(query => mediaService.getFilms(query));
      const responses = await Promise.all(requests);
      
      setFilms(responses.map((res, idx) => ({
        title: queries[idx],
        movies: res.data.films
      })));
    } catch (error) {
      console.error('Erreur lors du chargement des films:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="films">
      <Header />
      <div className="films__content">
        <h1 className="films__title">Films</h1>
        {films.map((category, idx) => (
          <MovieRow key={idx} title={category.title} movies={category.movies} />
        ))}
      </div>
    </div>
  );
};

export default Films;
