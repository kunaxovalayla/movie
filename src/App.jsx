import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './home/Homepage';
import {Movies} from './MoviePage/Movies';
import {NotFound} from './404/NotFound';
import { MovieDetails } from './MovieDetails/MovieDetails';
import './App.css';

function App() {
  return (
    <Router>  {/* Tək və yeganə Router burada qalır */}
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
           <Route path="/movie/:id" element={<MovieDetails />} />
           <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

