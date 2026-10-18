import React from "react";
import { Link } from "react-router-dom";
import styles from "./VikingsCard.module.css";

export const VikingsCard = ({ item }) => {
  return (
    <div className={styles.vikingMediaCard}>
      <Link to={`/movie/${item.vkId}`} className={styles.vikingPosterHolder}>
        <img src={item.photoVk} alt={item.titleVk} />
      </Link>
      <div className={styles.vikingInfoArea}>
        <span className={styles.vikingMetaLabel}>{item.seria}</span>
        <h3 className={styles.vikingCardTitle}>
          <Link to={`/movie/${item.vkId}`}>{item.titleVk}</Link>
        </h3>
      </div>
    </div>
  );
};