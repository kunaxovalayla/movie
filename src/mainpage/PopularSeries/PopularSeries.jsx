
import React, { useState } from "react";
import { PopularTVData } from "../../data/PopularTV";
import { PopularTVCard } from "../../components/PopularTVCard/PopularTvCards";
import styles from "./PopularSeries.module.css";

export const PopularSeries = () => {
  const [activeTab, setActiveTab] = useState("Today");

  const topShows = PopularTVData.slice(0, 4);
  const bottomShows = PopularTVData.slice(4, 10);

  const renderCards = (shows) =>
    shows.map((show, index) => (
      <div
        className={styles.popularSeriesCardItem}
        key={`${show.idtv ?? show.id ?? index}-${index}`}
      >
        <PopularTVCard show={show} titleColor="#000000" />
      </div>
    ));

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
              className={
                activeTab === "Last 30 days" ? styles.activeTab : ""
              }
              onClick={() => setActiveTab("Last 30 days")}
            >
              Last 30 days
            </span>
          </div>

          <div className={styles.popularSeriesRowTop}>
            {renderCards(topShows)}
          </div>
        </div>

        <div className={styles.popularSeriesRowBottom}>
          {renderCards(bottomShows)}
        </div>
      </div>
    </section>
  );
};
