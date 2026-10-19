import React, { useState } from "react";
import styles from "./VideoBg.module.css";
import { moviesData } from "../dataswiper/moviesdata";
import bgImage from "../../assets/images/videobg.jpg"
export const VideoBg = () => {
    const initialMovie = moviesData && moviesData.length > 0 ? moviesData[0] : null;
    const [activeMovie] = useState(initialMovie);
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
        <>
            <div className={styles.mainContainer}>
                
               <img 
               src={bgImage}
               className={styles.bgVideo}
               />

                
                <div className={styles.playOverlay} onClick={() => setIsVideoOpen(true)}>
                    <div className={styles.playButtonCircle}>
                        <span className={styles.playIcon}>▶</span>
                    </div>
                </div>

               
                <div className={styles.contentArea}>
                    <div className={styles.logoText}>Revive the CROWN</div>
                    <h1>Delta Bravo</h1>
                    <p>strange black entity from another world bonds with Peter Parker and causes inner turmoil as he contends with new villains, temptations, and revenge.</p>
                    <div className={styles.actionButtons}>
                        <button className={styles.watchNowBtn} onClick={() => setIsVideoOpen(true)}>
                            WATCH NOW
                        </button>
                        <button className={styles.playlistBtn}>
                            + PLAYLIST
                        </button>
                    </div>
                </div>
            </div>

           
            {isVideoOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeBtn} onClick={() => setIsVideoOpen(false)}>×</button>
                        <div className={styles.videoWrapper}>
                            <iframe 
                                src={activeMovie?.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"} 
                                title="Delta Bravo"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};