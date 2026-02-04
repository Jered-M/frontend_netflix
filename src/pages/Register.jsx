import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated, error: authError } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
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
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);
    const result = await register(formData);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || authError);
    }
    
    setLoading(false);
  };

  return (
    <div className="register">
      <div className="register__header">
        <h1 className="register__logo">NETFLIX</h1>
      </div>

      <div className="register__content">
        <form className="register__form" onSubmit={handleSubmit}>
          <h2 className="register__title">S'inscrire</h2>

          {error && <div className="register__error">{error}</div>}

          <input
            type="text"
            name="name"
            placeholder="Nom complet"
            value={formData.name}
            onChange={handleChange}
            className="register__input"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="register__input"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Mot de passe (min. 6 caractères)"
            value={formData.password}
            onChange={handleChange}
            className="register__input"
            required
          />

          <button type="submit" className="register__button" disabled={loading}>
            {loading ? 'Inscription...' : 'S\'inscrire'}
          </button>

          <div className="register__login">
            Déjà membre? <Link to="/login">Connectez-vous</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
