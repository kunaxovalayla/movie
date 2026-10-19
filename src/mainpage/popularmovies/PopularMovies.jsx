import React from "react";
import { Link } from "react-router-dom";
import { moviesCardData } from "../../data/MovieCardData";
import { MovieCard } from "../../components/Moviecard/MovieCard";
import styles from "./PopularMovies.module.css";

export const PopularMovies = () => {
  const topMovies = moviesCardData.slice(0, 5);
  const bottomMovies = moviesCardData.slice(5, 12);

  return (
    <section className={styles.popularSection}>
      <div className={styles.container}>
        <div className={styles.headerBlock}>
          <div className={styles.titleLine}></div>

          <h2 className={styles.mainTitle}>
            Popular Movies
            <br />
            to Watch Now
          </h2>

          <p className={styles.subtitle}>
            Most watched movies by days
          </p>

          <Link to="/movies" className={styles.viewAllLink}>
            VIEW ALL <span>›</span>
          </Link>
        </div>

        <div className={styles.gridContainer}>
          <div className={styles.moviesGridRow}>
            {topMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <div className={styles.moviesGridRowBottom}>
            {bottomMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <Link to="/movies" className={styles.viewMoreBtn}>
          + View more
        </Link>
      </div>
    </section>
  );
};