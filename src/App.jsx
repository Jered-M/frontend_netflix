import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Films from './pages/Films';
import Series from './pages/Series';
import Search from './pages/Search';
import Player from './pages/Player';
import Login from './pages/Login';
import Register from './pages/Register';
import MyList from './pages/MyList';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/films" element={<ProtectedRoute><Films /></ProtectedRoute>} />
          <Route path="/series" element={<ProtectedRoute><Series /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
          <Route path="/watch/:id" element={<ProtectedRoute><Player /></ProtectedRoute>} />
          <Route path="/my-list" element={<ProtectedRoute><MyList /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
