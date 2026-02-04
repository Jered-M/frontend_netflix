import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, error: authError } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Effacer l'erreur lors de la saisie
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || authError);
    }
    
    setLoading(false);
  };

  return (
    <div className="login">
      <div className="login__header">
        <h1 className="login__logo">NETFLIX</h1>
      </div>

      <div className="login__content">
        <form className="login__form" onSubmit={handleSubmit}>
          <h2 className="login__title">Se connecter</h2>

          {error && <div className="login__error">{error}</div>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="login__input"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            className="login__input"
            required
          />

          <button type="submit" className="login__button" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>

          <div className="login__signup">
            Nouveau sur Netflix? <Link to="/register">Inscrivez-vous maintenant</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
