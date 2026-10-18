import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PopularTVData } from "../../data/PopularTV";
import styles from "./PopularSeries.module.css";

export const PopularSeries = () => {
  const [activeTab, setActiveTab] = useState("Today");


  const topShows = PopularTVData.slice(0, 4);
  const bottomShows = PopularTVData.slice(4, 10);

  return (
    <section className={styles.popularSeriesSection}>
      <div className={styles.popularSeriesContainer}>
        
       
        <div className={styles.popularSeriesHeaderBlock}>
          <div className={styles.popularSeriesTitleLine}></div>
          <h2 className={styles.popularSeriesMainTitle}>
            Popular TV Series
            <br />
            Right Now
          </h2>
        </div>

       
        <div className={styles.popularSeriesRightContent}>
          <div className={styles.popularSeriesTabFilter}>
            <span
              className={activeTab === "Today" ? styles.activeTab : ""}
              onClick={() => setActiveTab("Today")}
            >
              Today
            </span>
            <span className={styles.tabDivider}>/</span>
            <span
              className={activeTab === "This week" ? styles.activeTab : ""}
              onClick={() => setActiveTab("This week")}
            >
              This week
            </span>
            <span className={styles.tabDivider}>/</span>
            <span
              className={activeTab === "Last 30 days" ? styles.activeTab : ""}
              onClick={() => setActiveTab("Last 30 days")}
            >
              Last 30 days
            </span>
          </div>

        
          <div className={styles.popularSeriesRowTop}>
            {topShows.map((show, index) => (
              <div key={`${show.idtv}-${index}`} className={styles.popularSeriesCardItem}>
                <Link to={`/movie/${show.idtv}`} className={styles.popularSeriesPosterHolder}>
                  <img src={show.phototv} alt={show.titletv} />
                </Link>
                <div className={styles.popularSeriesInfoArea}>
                  <span className={styles.popularSeriesMetaLabel}>{show.genretv}</span>
                  <h3 className={styles.popularSeriesCardTitle}>
                    <Link to={`/movie/${show.idtv}`}>{show.titletv}</Link>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.popularSeriesRowBottom}>
          {bottomShows.map((show, index) => (
            <div key={`${show.idtv}-${index}`} className={styles.popularSeriesCardItem}>
              <Link to={`/movie/${show.idtv}`} className={styles.popularSeriesPosterHolder}>
                <img src={show.phototv} alt={show.titletv} />
              </Link>
              <div className={styles.popularSeriesInfoArea}>
                <span className={styles.popularSeriesMetaLabel}>{show.genretv}</span>
                <h3 className={styles.popularSeriesCardTitle}>
                  <Link to={`/movie/${show.idtv}`}>{show.titletv}</Link>
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};