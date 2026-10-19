import React from "react";
import { Link } from "react-router-dom";
import styles from "./MovieCard.module.css";

export const MovieCard = ({ movie }) => {
  return (
    <div className={styles.card}>
      <Link
        to={`/movie/${movie.id}`}
        className={styles.imageWrapper}
      >
        <img src={movie.poster} alt={movie.title} />

        {movie.isFeatured && (
          <span className={styles.featuredBadge}>
            Featured
          </span>
        )}
      </Link>

      <div className={styles.cardInfo}>
        <span className={styles.meta}>
          {movie.year}, {movie.genre}
        </span>

        <h3 className={styles.title}>
          <Link to={`/movie/${movie.id}`}>
            {movie.title}
          </Link>
        </h3>
      </div>
    </div>
  );
};