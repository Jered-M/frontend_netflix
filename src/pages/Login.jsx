import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await authService.login(formData);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la connexion');
    }
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

          <button type="submit" className="login__button">
            Se connecter
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
