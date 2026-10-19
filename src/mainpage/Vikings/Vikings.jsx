import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { VikingsData } from "../../data/VikingsData";
import { VikingsCard } from "../../components/Vikingscom/VikingsCard";
import styles from "./Vikings.module.css";






export const Vikings = () => {
    const seasonLabels = ["Season 1", "Season 2", "Season 3", "Season 4", "Season 5"];
    const [currentSeasonIdx, setCurrentSeasonIdx] = useState(0);


    const currentSeasonItems = VikingsData.slice(currentSeasonIdx * 5, currentSeasonIdx * 5 + 5);

    return (
        <section className={styles.vikingStreamBlock}>
            <div className={styles.vikingWrapper}>


                <div className={styles.vikingHeadingArea}>
                    <h2 className={styles.vikingMainHeader}>Vikings</h2>
                    <p className={styles.vikingSubHeader}>
                        New Season 5 just flow in. <br /> Watch and Debate
                    </p>

                    <div className={styles.vikingTabButtonsRow}>
                        {seasonLabels.map((season, idx) => (
                            <button
                                key={season}
                                className={`${styles.vikingTabBtn} ${currentSeasonIdx === idx ? styles.vikingTabActive : ""
                                    }`}
                                onClick={() => setCurrentSeasonIdx(idx)}
                            >
                                {season}
                            </button>
                        ))}
                    </div>
                </div>


                <div className={styles.vikingMobileGrid}>
                    {currentSeasonItems.map((item, index) => (
                        <div
                            key={`${item.vkId}-${index}`}
                            className={`${styles.vikingCardWrapper} ${index === 0 ? styles.vikingHeroCard : ""}`}
                        >
                            <VikingsCard item={item} />
                        </div>
                    ))}
                </div>


                <div className={styles.vikingDesktopCarousel}>
                    <Swiper
                        spaceBetween={16}
                        slidesPerView={5}
                        slidesPerGroup={1}
                        grabCursor={true}
                        allowTouchMove={true}
                        className={styles.vikingSwiperBox}
                    >
                        {currentSeasonItems.map((item, index) => (
                            <SwiperSlide key={`${item.vkId}-${index}`}>
                                <VikingsCard item={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};