import { Header } from "../header/header";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export const NotFound = () => {
  return (
    <>
    <Header/>
    <section className={styles.notFoundSection}>
      <div className={styles.notFoundContainer}>
        
      
        <h1 className={styles.errorCode}>404!</h1>

      
        <p className={styles.errorDescription}>
          Nothing was found at this location. Try searching, or check out the links below.
        </p>

      
        <Link to="/" className={styles.homeButton}>
          BACK TO HOMEPAGE
        </Link>

      </div>
    </section>
    </>
  );
};