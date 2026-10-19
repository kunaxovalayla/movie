import React from "react";
import { Link } from "react-router-dom";
import styles from "./PopularTVCard.module.css";

export const PopularTVCard = ({ show, titleColor }) => {
  return (
    <div className={styles.popularTvMediaCard}>
      <Link
        to={`/tv/${show.idtv}`}
        className={styles.popularTvPosterHolder}
      >
        <img src={show.phototv} alt={show.titletv} />
      </Link>

      <div className={styles.popularTvInfoArea}>
        <span className={styles.popularTvMetaLabel}>{show.genretv}</span>

        <h3
          className={styles.popularTvCardTitle}
          style={{
            color: titleColor || "#ffffff",
            textShadow: titleColor ? "none" : "0 1px 3px rgba(0, 0, 0, 0.8)",
          }}
        >
          <Link to={`/tv/${show.idtv}`} style={{ color: "inherit" }}>
            {show.titletv}
          </Link>
        </h3>
      </div>
    </div>
  );
};