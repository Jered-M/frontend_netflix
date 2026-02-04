import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import MovieCard from '../components/MovieCard/MovieCard';
import { mediaService } from '../services/api';
import './Search.css';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = searchParams.get('q');

  useEffect(() => {
    if (query) {
      searchMedia();
    }
  }, [query]);

  const searchMedia = async () => {
    try {
      setLoading(true);
      const response = await mediaService.search(query);
      setResults(response.data.results);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search">
      <Header />
      <div className="search__content">
        <h1 className="search__title">
          Résultats pour "{query}"
        </h1>
        
        {loading ? (
          <div className="loading">Recherche en cours...</div>
        ) : results.length > 0 ? (
          <div className="search__results">
            {results.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="search__no-results">
            Aucun résultat trouvé pour "{query}"
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
