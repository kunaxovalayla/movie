import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { VikingsData } from "../../data/VikingsData";
import styles from "./Featured.module.css";
import { VikingsCard } from "../../components/Vikingscom/VikingsCard";

export const Featured = () => {
  const filteredVikings = VikingsData.filter(
    (item) => item.vkId > 25
  );

  return (
    <section className={styles.vkMainSection}>
      <div className={styles.vkOuterContainer}>
        <div className={styles.vkNavTabsWrapper}>
          <div className={styles.vkTabsList}>
            <span
              className={`${styles.vkTabTitle} ${styles.vkTabActive}`}
            >
              Today
            </span>

            <span className={styles.vkTabSlash}>/</span>

            <span className={styles.vkTabTitle}>
              This week
            </span>

            <span className={styles.vkTabSlash}>/</span>

            <span className={styles.vkTabTitle}>
              Last 30 days
            </span>
          </div>
        </div>

        <div className={styles.vkContentArea}>
          <div className={styles.vkSliderHolder}>
            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={4}
              navigation={{
                prevEl: ".vkCustomPrev",
                nextEl: ".vkCustomNext",
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 12,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 16,
                },
              }}
              className={styles.vkSwiperInstance}
            >
              {filteredVikings.map((item) => (
                <SwiperSlide key={item.vkId}>
                  <VikingsCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className={styles.vkSidebarPanel}>
            <h2 className={styles.vkSidebarTitle}>
              Featured TV Episode <br /> Premieres
            </h2>

            <div className={styles.vkSidebarFooter}>
              <div className={styles.vkArrowControls}>
                <button
                  className={`vkCustomPrev ${styles.vkArrowControlBtn}`}
                  aria-label="Previous"
                >
                  &lt;
                </button>

                <button
                  className={`vkCustomNext ${styles.vkArrowControlBtn}`}
                  aria-label="Next"
                >
                  &gt;
                </button>
              </div>

              <Link
                to="/movies"
                className={styles.vkViewAllLink}
              >
                VIEW ALL &gt;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};