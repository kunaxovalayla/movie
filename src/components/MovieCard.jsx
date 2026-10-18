import React from "react";
import { Link } from "react-router-dom";
import styles from "./MovieCard.module.css";

export const MovieCard = ({ movie }) => {
  return (
    <div className={styles.card}>
      <Link to={`/movie/${movie.id}`} className={styles.imageWrapper}>
        
        {movie.isFeatured && <span className={styles.featuredBadge}>Featured</span>}
        <img src={movie.poster} alt={movie.title} />
      </Link>
      
      
      <p className={styles.meta}>
        {movie.year}, {movie.genre}
      </p>
      
     
      <h3 className={styles.title}>{movie.title}</h3>
    </div>
  );
};