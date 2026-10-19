import React, { useState } from "react";
import { Link } from "react-router-dom";
import { moviesCardData } from "../../data/MovieCardData";
import styles from "./Top.module.css";

export const Top = () => {
  const [sidebarTab, setSidebarTab] = useState("movies");
  const [filterTab, setFilterTab] = useState("today");

  const topNineMovies = moviesCardData.slice(0, 9);
  const featuredMovie = moviesCardData[9] || moviesCardData[0];
  const rightColumnLeftList = moviesCardData.slice(10, 13);
  const rightColumnRightList = moviesCardData.slice(13, 16);

  if (!featuredMovie) {
    return (
      <section className={styles.sectionContainer}>
        Film tapılmadı.
      </section>
    );
  }

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.mainGrid}>
        
        {/* SOL TƏRƏF: Top 9 this Week */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h2 className={styles.sidebarTitle}>Top 9 this Week</h2>

            <div className={styles.sidebarTabs}>
              <Link
                to="/movies"
                className={`${styles.tabLink} ${
                  sidebarTab === "movies" ? styles.activeTab : ""
                }`}
                onClick={() => setSidebarTab("movies")}
              >
                Movies
              </Link>
              <span className={styles.tabSlash}>/</span>
              <Link
                to="/movies"
                className={`${styles.tabLink} ${
                  sidebarTab === "series" ? styles.activeTab : ""
                }`}
                onClick={() => setSidebarTab("series")}
              >
                TV Series
              </Link>
            </div>
          </div>

          <div className={styles.topList}>
            {topNineMovies.map((movie, index) => (
              <div key={movie.id ?? index} className={styles.topItem}>
                <span className={styles.rankNumber}>{index + 1}</span>

                <div className={styles.itemMeta}>
                  <span className={styles.itemYear}>{movie.year}</span>
                  <h4 className={styles.itemTitle}>
                    <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                  </h4>
                  <span className={styles.itemGenre}>
                    <Link to="/movies" className={styles.genreLink}>
                      {movie.genre}
                    </Link>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* SAĞ TƏRƏF: Newest Movies */}
        <main className={styles.contentArea}>
          <div className={styles.contentHeader}>
            <h2 className={styles.contentTitle}>Newest Movies</h2>

            <div className={styles.filterTabs}>
              <button
                type="button"
                className={`${styles.filterItem} ${
                  filterTab === "today" ? styles.activeFilter : ""
                }`}
                onClick={() => setFilterTab("today")}
              >
                Today
              </button>

              <button
                type="button"
                className={`${styles.filterItem} ${
                  filterTab === "week" ? styles.activeFilter : ""
                }`}
                onClick={() => setFilterTab("week")}
              >
                This week
              </button>

              <button
                type="button"
                className={`${styles.filterItem} ${
                  filterTab === "month" ? styles.activeFilter : ""
                }`}
                onClick={() => setFilterTab("month")}
              >
                Last 30 days
              </button>
            </div>
          </div>

          {/* ƏSAS FİLM (Hero) */}
          <div className={styles.featuredHero}>
            <div className={styles.heroPosterWrapper}>
              <img src={featuredMovie.poster} alt={featuredMovie.title} />
            </div>

            <div className={styles.heroDetails}>
              <span className={styles.heroYear}>{featuredMovie.year}</span>
              <h3 className={styles.heroTitle}>{featuredMovie.title}</h3>
              <p className={styles.heroDescription}>
                {featuredMovie.description || "Film haqqında məlumat."}
              </p>

              <div className={styles.heroActions}>
                <Link to={`/movie/${featuredMovie.id}`} className={styles.btnWatchNow}>
                  WATCH NOW
                </Link>
                <button type="button" className={styles.btnPlaylist}>
                  + PLAYLIST
                </button>
              </div>
            </div>
          </div>

          {/* İKİ SÜTUNLU KARTLAR */}
          <div className={styles.cardsTwoColumnGrid}>
            <div className={styles.columnGroup}>
              {rightColumnLeftList.map((movie, index) => (
                <div key={movie.id ?? index} className={styles.horizontalCard}>
                  <div className={styles.cardPoster}>
                    <img src={movie.poster} alt={movie.title} />
                  </div>
                  <div className={styles.cardInfo}>
                    <span className={styles.cardYear}>{movie.year}</span>
                    <h4 className={styles.cardTitle}>
                      <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                    </h4>
                    <span className={styles.cardGenre}>
                      <Link to="/movies" className={styles.genreLink}>
                        {movie.genre}
                      </Link>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.columnGroup}>
              {rightColumnRightList.map((movie, index) => (
                <div key={movie.id ?? index} className={styles.horizontalCard}>
                  <div className={styles.cardPoster}>
                    <img src={movie.poster} alt={movie.title} />
                  </div>
                  <div className={styles.cardInfo}>
                    <span className={styles.cardYear}>{movie.year}</span>
                    <h4 className={styles.cardTitle}>
                      <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                    </h4>
                    <span className={styles.cardGenre}>
                      <Link to="/movies" className={styles.genreLink}>
                        {movie.genre}
                      </Link>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

      </div>
    </section>
  );
};