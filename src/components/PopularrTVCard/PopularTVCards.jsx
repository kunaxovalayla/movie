import React from "react";
import { Link } from "react-router-dom";
import styles from "./PopularTVCard.module.css";

export const PopularTVCard = ({ show }) => {
  return (
    <div className={styles.popularTvMediaCard}>
      <Link to={`/movie/${show.idtv}`} className={styles.popularTvPosterHolder}>
        <img src={show.phototv} alt={show.titletv} />
      </Link>
      <div className={styles.popularTvInfoArea}>
        <span className={styles.popularTvMetaLabel}>{show.genretv}</span>
        <h3 className={styles.popularTVCardTitle}>
          <Link to={`/movie/${show.idtv}`}>{show.titletv}</Link>
        </h3>
      </div>
    </div>
  );
};