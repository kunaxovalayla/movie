import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import styles from "./Hero.module.css";

import { moviesData } from "../dataswiper/moviesdata";

export const Hero = () => {
    const [activeMovie, setActiveMovie] = useState(moviesData[0]);

    return (
        <>
        <div 
          className={styles.hero}
          style={{backgroundImage: `url(${activeMovie.bgImage})`}}
        >

            <div className={styles.heroContent}>
                <h1>{activeMovie.title}</h1>
                <p>{activeMovie.year} | {activeMovie.genre} | {activeMovie.duration}</p>
                <div className={styles.heroButtons}>
                    <button className={styles.watchBtn}>WATCH NOW</button>
                    <button className={styles.playlistBtn}>+ PLAYLIST</button>
                </div>
            </div>
           
           <div className={styles.recomendationContainer}>
           <Swiper
          spaceBetween={15}
          slidesPerView={2}
          breakpoints={{
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },  
            1024: { slidesPerView: 3 },
          }}
        >

            {moviesData.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div 
                className={styles.thumbnail}
                onClick={() => setActiveMovie(movie)}
                style={{ cursor: "pointer" }}
              >
                <img src={movie.bgImage} alt={movie.title} />
              </div>
            </SwiperSlide>
          ))}

        </Swiper>
           </div>
        </div>
        </>
    )
};