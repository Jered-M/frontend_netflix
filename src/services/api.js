import axios from 'axios';

const API_BASE_URL = 'https://backends-netflix.onrender.com/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs d'authentification
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Services d'authentification
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: (userId) => api.get(`/auth/profile/${userId}`),
};

// Services média
export const mediaService = {
  getTrending: () => api.get('/trending'),
  getFilms: (query = 'Action', page = 1) => api.get(`/films?query=${query}&page=${page}`),
  getSeries: (query = 'Drama', page = 1) => api.get(`/series?query=${query}&page=${page}`),
  getMediaDetails: (mediaId) => api.get(`/media/${mediaId}`),
  search: (query, type = '') => api.get(`/search?q=${query}&type=${type}`),
  getByGenre: (genre, type = 'movie') => api.get(`/genre?genre=${genre}&type=${type}`),
};

// Services utilisateur
export const userService = {
  getFavorites: (userId) => api.get(`/user/${userId}/favorites`),
  addToFavorites: (userId, mediaId) => api.post(`/user/${userId}/favorites`, { mediaId }),
  removeFromFavorites: (userId, mediaId) => api.delete(`/user/${userId}/favorites`, { data: { mediaId } }),
  getHistory: (userId) => api.get(`/user/${userId}/history`),
  addToHistory: (userId, mediaId) => api.post(`/user/${userId}/history`, { mediaId }),
};
