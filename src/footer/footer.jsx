import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css"; 

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
     
        <div className={styles.footerTop}>
          <div className={styles.logo}>
            <Link to="/">vodi</Link>
          </div>
          <div className={styles.socialLinks}>
            <a href="#facebook" className={styles.socialItem}>Facebook</a>
            <a href="#twitter" className={styles.socialItem}>Twitter</a>
            <a href="#google" className={styles.socialItem}>Google+</a>
            <a href="#vimeo" className={styles.socialItem}>Vimeo</a>
            <a href="#rss" className={styles.socialItem}>RSS</a>
          </div>
        </div>

        <div className={styles.divider}></div>

      
        <div className={styles.footerLinksGrid}>
          
          
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Movie Categories</h3>
            <ul className={styles.linkList}>
              <li><Link to="/movies">Action</Link></li>
              <li><Link to="/movies">Adventure</Link></li>
              <li><Link to="/movies">Animation</Link></li>
              <li><Link to="/movies">Comedy</Link></li>
              <li><Link to="/movies">Crime</Link></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle} style={{ visibility: "hidden" }}>Categories</h3>
            <ul className={styles.linkList}>
              <li><Link to="/movies">Drama</Link></li>
              <li><Link to="/movies">Fantasy</Link></li>
              <li><Link to="/movies">Horror</Link></li>
              <li><Link to="/movies">Mystery</Link></li>
              <li><Link to="/movies">Romance</Link></li>
            </ul>
          </div>

          
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>TV Series</h3>
            <ul className={styles.linkList}>
              <li><Link to="/movies">Valentine Day</Link></li>
              <li><Link to="/movies">Underrated Comedies</Link></li>
              <li><Link to="/movies">Scary TV Series</Link></li>
              <li><Link to="/movies">Best 2018 Documentaries</Link></li>
              <li><Link to="/movies">Classic Shows</Link></li>
            </ul>
          </div>

  
          <div className={styles.column}>
            <h3 className={styles.columnTitle} style={{ visibility: "hidden" }}>TV Series</h3>
            <ul className={styles.linkList}>
              <li><Link to="/movies">Big TV Premieres</Link></li>
              <li><Link to="/movies">Reality TV Shows</Link></li>
              <li><Link to="/movies">Original Shows</Link></li>
              <li><Link to="/movies">Suprise of the Year Shows</Link></li>
            </ul>
          </div>

      
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Support</h3>
            <ul className={styles.linkList}>
              <li><Link to="/movies">My Account</Link></li>
              <li><Link to="/movies">FAQ</Link></li>
              <li><Link to="/movies">Watch on TV</Link></li>
              <li><Link to="/movies">Help Center</Link></li>
              <li><Link to="/movies">Contact</Link></li>
            </ul>
          </div>

        </div>

        <div className={styles.divider}></div>

   
        <div className={styles.footerBottom}>
          <p>© 2019, Vodi. All Rights Reserved</p>
          <Link to="/movies" className={styles.privacyLink}>Privacy Policy</Link>
        </div>

      </div>
    </footer>
  );
};