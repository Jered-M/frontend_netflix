import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/films" element={<Films />} />
        <Route path="/series" element={<Series />} />
        <Route path="/search" element={<Search />} />
        <Route path="/watch/:id" element={<Player />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-list" element={<MyList />} />
      </Routes>
    </Router>
  );
}

export default App;
