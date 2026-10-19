import React from "react";
import { Link } from "react-router-dom";
import styles from "./Blog.module.css";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { FiSearch } from "react-icons/fi";

import post1 from "../assets/images/post1.jpg"; 
import post2 from "../assets/images/post2.jpg";
import post3 from "../assets/images/post3.jpg";
import post4 from "../assets/images/post4.jpg";   
import post5 from "../assets/images/post5.jpg"; 
import post6 from "../assets/images/post6.jpg"; 
import post7 from "../assets/images/post7.jpg"; 
import post8 from "../assets/images/post8.jpg"; 
import post9 from "../assets/images/post9.jpg"; 
import post10 from "../assets/images/post10.jpg"; 

export const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Wizard Actor Has Another Digital Comics Role – Featured Slideshow Post",
      category: "Hot Rumors",
      date: "February 8, 2019",
      excerpt: "Praesent iaculis, purus ac vehicula mollis, arcu lorem blandit nisl, non laoreet diam integer elit. Donec porttitor ex vel augue maximus luctus. Vivamus finibus nibh eu nunc volutpat suscipit.",
      image: post1,
    },
    {
      id: 2,
      title: "World Starts With Word Peace",
      category: "Trailers, TV Rumors",
      date: "May 7, 2019",
      excerpt: "The process of getting a movie off of the ground is a lengthy endeavor, with casting standing out as one...",
      image: post2,
    },
    {
      id: 3,
      title: "The Long Run",
      category: "Trailers, TV Rumors",
      date: "May 7, 2019",
      excerpt: "The process of getting a movie off of the ground is a lengthy endeavor, with casting standing out as one...",
      image: post3,
    },
    {
      id: 4,
      title: "The 6 Best Hard Movies",
      category: "Trailers, TV Rumors",
      date: "May 7, 2019",
      excerpt: "The process of getting a movie off of the ground is a lengthy endeavor, with casting standing out as one...",
      image: post4,
    },
    {
      id: 5,
      title: "Dark Night",
      category: "Trailers, TV Rumors",
      date: "May 7, 2019",
      excerpt: "The process of getting a movie off of the ground is a lengthy endeavor, with casting standing out as one...",
      image: post5,
    },
    {
      id: 6,
      title: "Martin Absence Affects",
      category: "Trailers, TV Rumors",
      date: "May 7, 2019",
      excerpt: "The process of getting a movie off of the ground is a lengthy endeavor, with casting standing out as one...",
      image: post6,
    },
    {
      id: 7,
      title: "Possible Callback",
      category: "Trailers, TV Rumors",
      date: "May 7, 2019",
      excerpt: "The process of getting a movie off of the ground is a lengthy endeavor, with casting standing out as one...",
      image: post7,
    },
    {
      id: 8,
      title: "Uncharted Creator's Characters",
      category: "Trailers, TV Rumors",
      date: "May 7, 2019",
      excerpt: "The process of getting a movie off of the ground is a lengthy endeavor, with casting standing out as one...",
      image: null,
    },
    {
      id: 9,
      title: "Switch Weekly Recap",
      category: "Trailers, TV Rumors",
      date: "May 7, 2019",
      excerpt: "The process of getting a movie off of the ground is a lengthy endeavor, with casting standing out as one...",
      image: post8,
    },
    {
      id: 10,
      title: "The Couple Was Originally A Direct To Video Release, According To Crew",
      category: "Hot Rumors",
      date: "February 8, 2019",
      excerpt: "Praesent iaculis, purus ac vehicula mollis, arcu lorem blandit nisl, non laoreet diam integer elit. Donec porttitor ex vel augue maximus luctus. Vivamus finibus nibh eu nunc volutpat suscipit.",
      image: post9,
    },
  ];

 
  const whatsHotList = [
    { title: "Saints, Leicester agree Maddison fee", date: "7 Jan, 7 Feb", cat: "Trailers", image: post4 },
    { title: "Sunday's Man Ut. transfer rumours", date: "7 Jan, 7 Feb", cat: "Trailers", image: post5 },
    { title: "Merghani Alonso wins Le Mans 24", date: "7 Jan, 7 Feb", cat: "Trailers", image: post6 },
  ];

  
  const topicsList = [
    { title: "Black Devision 3", image: post7 },
    { title: "Infinity World War", image: post8 },
    { title: "Purge Maze Halloween", image: post9 },
  ];

  const upcomingMovies = [
    "Black Devision 3",
    "Infinity World War",
    "Purge Maze Halloween",
    "Halloween Weekend",
    "One Big Question Monster 3 Needs To Answer",
  ];

  return (
    <>
      <Header />

      <div className={styles.blogPage}>
        {/* BREADCRUMB */}
        <div className={styles.breadcrumbContainer}>
          <div className={styles.breadcrumb}>
            <Link to="/">Home</Link>
            <span>›</span>
            <span className={styles.current}>Blog</span>
          </div>
        </div>

        <div className={styles.mainContainer}>
          
          <div className={styles.leftContent}>
            
           
            <div className={styles.featuredPost}>
              <div className={styles.featuredImageWrapper}>
                <img src={blogPosts[0]?.image || post1} alt="Featured Post" />
                <span className={styles.featuredBadge}>Featured</span>
              </div>
              <div className={styles.featuredMeta}>
                <span className={styles.category}>{blogPosts[0].category}</span> • <span className={styles.date}>{blogPosts[0].date}</span>
              </div>
              <h1 className={styles.featuredTitle}>
                {blogPosts[0].title}
              </h1>
              <p className={styles.featuredExcerpt}>
                {blogPosts[0].excerpt}
              </p>
            </div>

            <div className={styles.postsList}>
              {blogPosts.slice(1).map((post) => (
                <div 
                  key={post.id} 
                  className={`${styles.postCard} ${!post.image ? styles.noImageCard : ""}`}
                >
                  {post.image && (
                    <div className={styles.postCardImage}>
                      <img src={post.image} alt={post.title} />
                    </div>
                  )}
                  <div className={styles.postCardInfo}>
                    <h2>{post.title}</h2>
                    <div className={styles.postCardMeta}>
                      <span>{post.category}</span> • <span>{post.date}</span>
                    </div>
                    <p>{post.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <aside className={styles.sidebar}>
            
            {/* SEARCH */}
            <div className={styles.sidebarSearch}>
              <input type="text" placeholder="Search..." />
              <FiSearch className={styles.searchIcon} />
            </div>

            {/* WHAT'S HOT */}
            <div className={styles.sidebarSection}>
              <div className={styles.sectionHeader}>
                <h3>What's hot</h3>
                <span className={styles.viewAll}>View All</span>
              </div>
              <div className={styles.hotList}>
                {whatsHotList.map((item, index) => (
                  <div key={index} className={styles.hotItem}>
                    <img src={item.image} alt={item.title} />
                    <div>
                      <h4>{item.title}</h4>
                      <span>{item.cat} • {item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* HOT RUMORS */}
            <div className={styles.sidebarSection}>
              <div className={styles.sectionHeader}>
                <h3>Hot Rumors</h3>
                <span className={styles.viewAll}>View All</span>
              </div>
              <div className={styles.rumorCards}>
                <div className={styles.rumorCard}>
                  <img src={post10} alt="Hot Rumors" />
                  <div className={styles.rumorOverlay}>
                    <h4>Wizard Actor Has Another Digital Comics Role...</h4>
                    <span>Hot Rumors • 10 Jan, 8 Feb</span>
                  </div>
                </div>
              </div>
            </div>

            {/* TOPICS / REVIEWS / TRAILER */}
            <div className={styles.sidebarSection}>
              <div className={styles.topicsTabs}>
                <span className={styles.activeTab}>Topics</span>
                <span>Reviews</span>
                <span>Trailer</span>
              </div>
              <div className={styles.topicsList}>
                {topicsList.map((topic, i) => (
                  <div key={i} className={styles.topicItem}>
                    <img src={topic.image} alt={topic.title} />
                    <span>{topic.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* UPCOMING MOVIES */}
            <div className={styles.sidebarSection}>
              <div className={styles.sectionHeader}>
                <h3>Upcoming Movies</h3>
                <span className={styles.viewAll}>View All</span>
              </div>
              <div className={styles.upcomingList}>
                {upcomingMovies.map((movie, index) => (
                  <div key={index} className={styles.upcomingItem}>
                    <span className={styles.numberCircle}>{index + 1}</span>
                    <p>{movie}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RECENT COMMENTS */}
            <div className={styles.sidebarSection}>
              <div className={styles.sectionHeader}>
                <h3>Recent Comments</h3>
              </div>
              <div className={styles.commentsList}>
                <div className={styles.commentItem}>
                  <span className={styles.commentAuthor}>admin on</span>
                  <p>Paradigm Lost</p>
                </div>
                <div className={styles.commentItem}>
                  <span className={styles.commentAuthor}>admin on</span>
                  <p>The Tale</p>
                </div>
                <div className={styles.commentItem}>
                  <span className={styles.commentAuthor}>visitor on</span>
                  <p>How To Talk To Girls At Parties</p>
                </div>
              </div>
            </div>

          </aside>
        </div>
      </div>

      <Footer />
    </>
  );
};