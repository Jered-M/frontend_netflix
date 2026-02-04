const { useState, useEffect } = React;

// Configuration API
const API_BASE_URL = 'https://backends-netflix.onrender.com/api';

// Composant Header
function Header({ currentPage, setCurrentPage }) {
  return (
    <header className="header">
      <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }} className="header__logo">NETFLIX</a>
      <nav className="header__nav">
        <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>Accueil</a>
        <a href="#series" onClick={(e) => { e.preventDefault(); setCurrentPage('series'); }}>Séries</a>
        <a href="#films" onClick={(e) => { e.preventDefault(); setCurrentPage('films'); }}>Films</a>
      </nav>
      <div className="header__search">
        <input type="text" placeholder="Rechercher..." />
      </div>
    </header>
  );
}

// Composant Hero
function Hero({ media }) {
  if (!media) return null;

  const poster = media.poster || media.Poster;
  const title = media.title || media.Title;
  const plot = media.plot || media.Plot;

  return (
    <div 
      className="hero"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(20,20,20,1)), 
                          url(${poster && poster !== 'N/A' ? poster : 'https://via.placeholder.com/1920x1080'})`,
      }}
    >
      <div className="hero__content">
        <h1 className="hero__title">{title || 'Film à découvrir'}</h1>
        <p className="hero__plot">{plot || 'Découvrez ce film incroyable...'}</p>
        <div className="hero__buttons">
          <button className="hero__button">▶ Lecture</button>
          <button className="hero__button" style={{backgroundColor: 'rgba(109, 109, 110, 0.7)', color: '#fff'}}>
            ℹ Plus d'infos
          </button>
        </div>
      </div>
    </div>
  );
}

// Composant MovieCard
function MovieCard({ movie, onClick }) {
  const poster = movie.Poster || movie.poster;
  const title = movie.Title || movie.title;
  const year = movie.Year || movie.year;

  return (
    <div className="movie-card" onClick={() => onClick && onClick(movie)}>
      <img 
        src={poster && poster !== 'N/A' ? poster : 'https://via.placeholder.com/300x450'} 
        alt={title || 'Film'}
      />
      <div className="movie-card__info">
        <h3 style={{fontSize: '14px', marginBottom: '5px'}}>{title || 'Titre inconnu'}</h3>
        <span style={{fontSize: '12px', color: '#b3b3b3'}}>{year || ''}</span>
      </div>
    </div>
  );
}

// Composant MovieRow
function MovieRow({ title, movies, onMovieClick }) {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="movie-row">
      <h2 className="movie-row__title">{title}</h2>
      <div className="movie-row__movies">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} onClick={onMovieClick} />
        ))}
      </div>
    </div>
  );
}

// Page d'accueil
function HomePage({ trending, heroMedia, loading, onMovieClick }) {
  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <>
      <Hero media={heroMedia} />
      <MovieRow title="Films populaires" movies={trending.films} onMovieClick={onMovieClick} />
      <MovieRow title="Séries tendances" movies={trending.series} onMovieClick={onMovieClick} />
    </>
  );
}

// Page Séries
function SeriesPage() {
  const [seriesData, setSeriesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSeries();
  }, []);

  const loadSeries = async () => {
    try {
      const queries = ['Drama', 'Comedy', 'Action', 'Crime', 'Sci-Fi'];
      const requests = queries.map(query => 
        axios.get(`${API_BASE_URL}/series?query=${query}`)
      );
      const responses = await Promise.all(requests);
      
      const series = responses.map((res, idx) => ({
        title: queries[idx],
        movies: res.data.series || []
      }));
      
      setSeriesData(series);
    } catch (error) {
      console.error('Erreur lors du chargement des séries:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Chargement des séries...</div>;
  }

  return (
    <div style={{ paddingTop: '80px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 700, padding: '0 60px', marginBottom: '30px' }}>
        Séries
      </h1>
      {seriesData.map((category, idx) => (
        <MovieRow key={idx} title={category.title} movies={category.movies} onMovieClick={(movie) => {
          window.dispatchEvent(new CustomEvent('openMovie', { detail: movie }));
        }} />
      ))}
    </div>
  );
}

// Page Films
function FilmsPage() {
  const [filmsData, setFilmsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFilms();
  }, []);

  const loadFilms = async () => {
    try {
      const queries = ['Action', 'Comedy', 'Drama', 'Thriller', 'Horror'];
      const requests = queries.map(query => 
        axios.get(`${API_BASE_URL}/films?query=${query}`)
      );
      const responses = await Promise.all(requests);
      
      const films = responses.map((res, idx) => ({
        title: queries[idx],
        movies: res.data.films || []
      }));
      
      setFilmsData(films);
    } catch (error) {
      console.error('Erreur lors du chargement des films:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Chargement des films...</div>;
  }

  return (
    <div style={{ paddingTop: '80px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 700, padding: '0 60px', marginBottom: '30px' }}>
        Films
      </h1>
      {filmsData.map((category, idx) => (
        <MovieRow key={idx} title={category.title} movies={category.movies} onMovieClick={(movie) => {
          window.dispatchEvent(new CustomEvent('openMovie', { detail: movie }));
        }} />
      ))}
    </div>
  );
}

// Page de détails du film
function MovieDetailsPage({ movie, onBack }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDetails();
  }, [movie]);

  const loadDetails = async () => {
    try {
      const movieId = movie.imdbID || movie.imdbId;
      if (movieId) {
        const response = await axios.get(`${API_BASE_URL}/media/${movieId}`);
        setDetails(response.data);
      } else {
        setDetails(movie);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des détails:', error);
      setDetails(movie);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  const poster = details.poster || details.Poster;
  const title = details.title || details.Title;
  const plot = details.plot || details.Plot;
  const year = details.year || details.Year;
  const rating = details.rating || details.imdbRating;
  const runtime = details.runtime || details.Runtime;
  const genre = details.genre || details.Genre;
  const director = details.director || details.Director;
  const actors = details.actors || details.Actors;

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <button 
        onClick={onBack}
        style={{
          margin: '20px 60px',
          padding: '12px 24px',
          backgroundColor: 'rgba(51, 51, 51, 0.8)',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        ← Retour
      </button>

      <div 
        style={{
          height: '80vh',
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(20,20,20,1)), 
                            url(${poster && poster !== 'N/A' ? poster : 'https://via.placeholder.com/1920x1080'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          padding: '0 60px'
        }}
      >
        <div style={{ maxWidth: '600px' }}>
          <h1 style={{ fontSize: '60px', fontWeight: 700, marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
            {title}
          </h1>
          
          <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', fontSize: '16px' }}>
            {rating && <span style={{ color: '#46d369', fontWeight: 600 }}>★ {rating}</span>}
            {year && <span style={{ color: '#46d369', fontWeight: 600 }}>{year}</span>}
            {runtime && <span style={{ color: '#46d369', fontWeight: 600 }}>{runtime}</span>}
          </div>

          <p style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '30px', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)' }}>
            {plot || 'Aucune description disponible.'}
          </p>

          <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
            <button style={{
              padding: '15px 30px',
              border: 'none',
              borderRadius: '4px',
              fontSize: '18px',
              fontWeight: 600,
              cursor: 'pointer',
              backgroundColor: '#fff',
              color: '#000'
            }}>
              ▶ Lecture
            </button>
            <button style={{
              padding: '15px 30px',
              border: 'none',
              borderRadius: '4px',
              fontSize: '18px',
              fontWeight: 600,
              cursor: 'pointer',
              backgroundColor: 'rgba(109, 109, 110, 0.7)',
              color: '#fff'
            }}>
              ℹ Plus d'infos
            </button>
          </div>
        </div>
      </div>

      <div style={{ padding: '40px 60px' }}>
        {genre && (
          <p style={{ fontSize: '16px', marginBottom: '10px' }}>
            <strong>Genre:</strong> {genre}
          </p>
        )}
        {director && (
          <p style={{ fontSize: '16px', marginBottom: '10px' }}>
            <strong>Réalisateur:</strong> {director}
          </p>
        )}
        {actors && (
          <p style={{ fontSize: '16px', marginBottom: '10px' }}>
            <strong>Acteurs:</strong> {actors}
          </p>
        )}
      </div>
    </div>
  );
}

// Composant principal App
function App() {
  const [trending, setTrending] = useState({ films: [], series: [] });
  const [heroMedia, setHeroMedia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    loadTrending();
    
    // Gérer la navigation par hash
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash === 'series') {
        setCurrentPage('series');
      } else if (hash === 'films') {
        setCurrentPage('films');
      } else {
        setCurrentPage('home');
      }
      setSelectedMovie(null);
    };
    
    // Écouter les événements de clic sur les films
    const handleOpenMovie = (event) => {
      setSelectedMovie(event.detail);
      setCurrentPage('movie-details');
    };
    
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('openMovie', handleOpenMovie);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('openMovie', handleOpenMovie);
    };
  }, []);

  const loadTrending = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/trending`);
      console.log('Données reçues:', response.data);
      setTrending(response.data);
      
      if (response.data.films && response.data.films.length > 0) {
        const firstFilm = response.data.films[0];
        const filmId = firstFilm.imdbID || firstFilm.imdbId;
        
        if (filmId) {
          try {
            const details = await axios.get(`${API_BASE_URL}/media/${filmId}`);
            console.log('Détails du film:', details.data);
            setHeroMedia(details.data);
          } catch (err) {
            console.error('Erreur détails:', err);
            // Utiliser le premier film même sans détails
            setHeroMedia(firstFilm);
          }
        } else {
          setHeroMedia(firstFilm);
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      // Afficher un message d'erreur plus explicite
      alert('Erreur: Assurez-vous que le backend est lancé sur http://localhost:5000');
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setCurrentPage('movie-details');
  };

  const handleBackFromDetails = () => {
    setSelectedMovie(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    if (currentPage === 'movie-details' && selectedMovie) {
      return <MovieDetailsPage movie={selectedMovie} onBack={handleBackFromDetails} />;
    }
    
    switch(currentPage) {
      case 'series':
        return <SeriesPage />;
      case 'films':
        return <FilmsPage />;
      case 'home':
      default:
        return <HomePage trending={trending} heroMedia={heroMedia} loading={loading} onMovieClick={handleMovieClick} />;
    }
  };

  return (
    <div>
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

// Rendu de l'application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
