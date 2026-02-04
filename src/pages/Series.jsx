import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import MovieRow from '../components/MovieRow/MovieRow';
import { mediaService } from '../services/api';
import './Series.css';

const Series = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSeries();
  }, []);

  const loadSeries = async () => {
    try {
      const queries = ['Drama', 'Comedy', 'Action', 'Crime', 'Sci-Fi'];
      const requests = queries.map(query => mediaService.getSeries(query));
      const responses = await Promise.all(requests);
      
      setSeries(responses.map((res, idx) => ({
        title: queries[idx],
        movies: res.data.series
      })));
    } catch (error) {
      console.error('Erreur lors du chargement des séries:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="series">
      <Header />
      <div className="series__content">
        <h1 className="series__title">Séries</h1>
        {series.map((category, idx) => (
          <MovieRow key={idx} title={category.title} movies={category.movies} />
        ))}
      </div>
    </div>
  );
};

export default Series;
