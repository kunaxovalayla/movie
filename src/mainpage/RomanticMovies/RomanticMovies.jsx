import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { moviesCardData } from "../../data/MovieCardData";
import styles from "./RomanticMovies.module.css";
import cardStyles from "../../components/Moviecard/MovieCard.module.css";

export const RomanticMovies = () => {
    const romanticMovies = moviesCardData.slice(0, 7);

    return (
        <section className={styles.section}>
            <div className={styles.container}>

               
                <div className={styles.tabsContainer}>
                    <div className={styles.tabs}>
                        <span className={`${styles.tabItem} ${styles.active}`}>Today</span>
                        <span className={styles.tabDivider}>/</span>
                        <span className={styles.tabItem}>This week</span>
                        <span className={styles.tabDivider}>/</span>
                        <span className={styles.tabItem}>Last 30 days</span>
                    </div>
                </div>

                
                <div className={styles.contentWrapper}>
                    <div className={styles.swiperWrapperContainer}>
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={16}
                            slidesPerView={6} 
                            navigation={{
                                prevEl: ".prevBtn",
                                nextEl: ".nextBtn",
                            }}
                            breakpoints={{
                                0: { slidesPerView: 2, spaceBetween: 10 },   
                                768: { slidesPerView: 3, spaceBetween: 12 },  
                                1024: { slidesPerView: 6, spaceBetween: 16 }, 
                            }}
                            className={styles.swiperContainer}
                        >
                            {romanticMovies.map((movie) => (
                                <SwiperSlide key={movie.id}>
                                    <div className={cardStyles.card}>
                                        <Link
                                            to={`/movie/${movie.id}`}
                                            className={cardStyles.imageWrapper}
                                        >
                                            <img src={movie.poster} alt={movie.title} />

                                            {movie.isFeatured && (
                                                <span className={cardStyles.featuredBadge}>
                                                    Featured
                                                </span>
                                            )}
                                        </Link>

                                        <div className={cardStyles.cardInfo}>
                                            <span className={cardStyles.meta}>
                                                {movie.year}, {movie.genre}
                                            </span>

                                            <h3 className={cardStyles.title}>
                                                <Link to={`/movie/${movie.id}`}>
                                                    {movie.title}
                                                </Link>
                                            </h3>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>


                    <div className={styles.rightBanner}>
                        <h2 className={styles.bannerTitle}>
                            Romantic for <br /> Valentines Day
                        </h2>
                        <div className={styles.bannerBottom}>
                            <div className={styles.arrowButtons}>
                                <button className={`prevBtn ${styles.arrowBtn}`} aria-label="Previous">
                                    &lt;
                                </button>
                                <button className={`nextBtn ${styles.arrowBtn}`} aria-label="Next">
                                    &gt;
                                </button>
                            </div>
                            <Link to="/movies" className={styles.viewAll}>
                                VIEW ALL &gt;
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};