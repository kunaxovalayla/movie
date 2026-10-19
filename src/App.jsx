import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './home/Homepage';
import {Movies} from './MoviePage/Movies';
import {NotFound} from './404/NotFound';
import { MovieDetails } from './MovieDetails/MovieDetails';
import { EpisodeDetails } from './EpisodeDetails/EpisodeDetails';
import { TVDetails } from './TVDetails/TVDetails';
import { Contact } from './contact/Contact';
import { Blog } from './blog/Blog';
import './App.css';

function App() {
  return (
    <Router>  {/* Tək və yeganə Router burada qalır */}
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
           <Route path="/movie/:id" element={<MovieDetails />} />
           <Route path="/episode/:id" element={<EpisodeDetails />} />
           <Route path="/tv/:id" element={<TVDetails />} />
           <Route path="/blog" element={<Blog />} />
           <Route path="/contact" element={<Contact />} />
           
           <Route path="*" element={<NotFound />} />
           
        </Routes>
      </div>
    </Router>
  );
}

export default App;

