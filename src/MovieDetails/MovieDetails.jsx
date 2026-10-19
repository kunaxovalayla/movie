import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { moviesCardData } from "../data/MovieCardData";
import styles from "./MovieDetails.module.css";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { NotFound } from "../404/NotFound";
import { FaPlay, FaStar, FaThumbsUp } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
const splitGenres = (movie) =>
  movie.genre ? movie.genre.split(",").map((g) => g.trim()) : [];

const getRating = (movie) => {
  const value = movie.rating ?? movie.vote_average ?? movie.imdbRating ?? 0;
  const rating = Number.parseFloat(value);
  return Number.isFinite(rating) ? rating : 0;
};

const getDescription = (m) =>
  m.description ?? m.overview ?? m.about ?? m.plot ?? m.desc ?? "";

const getVotes = (m) => m.votes ?? m.vote_count ?? m.voteCount ?? 1;

const getVideo = (m) =>
  m.trailer ?? m.video ?? m.videoUrl ?? m.trailerUrl ?? m.youtube ?? "";

const getEmbedUrl = (url) => {
  if (!url) return "";
  const match = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

/* ---------- icons ---------- */

const StarIcon = () => (
  <FaStar size={34} color="#1ea7fd" />
);

const HeartIcon = ({ filled }) => (
  <FiHeart
    size={24}
    style={{
      color: "#1ea7fd",
      fill: filled ? "#1ea7fd" : "transparent",
      stroke: "#1ea7fd",
      strokeWidth: 1.8,
    }}
  />
);

const ThumbIcon = ({ filled }) => (
  <FaThumbsUp
    size={18}
    color={filled ? "#1ea7fd" : "currentColor"}
    style={{ fill: filled ? "#1ea7fd" : "none" }}
  />
);
const PlayIcon = () => <FaPlay size={30} color="#fff" />;

/* ---------- page ---------- */

export const MovieDetails = () => {
  const { id } = useParams();

  const [tab, setTab] = useState("description");
  const [expanded, setExpanded] = useState(false);
  const [inPlaylist, setInPlaylist] = useState(false);
  const [liked, setLiked] = useState(false);
  const [playing, setPlaying] = useState(false);

  const movie = moviesCardData.find((m) => String(m.id) === String(id));

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setTab("description");
    setExpanded(false);
    setInPlaylist(false);
    setLiked(false);
    setPlaying(false);
  }, [id]);

  if (!movie) return <NotFound />;

  const genres = splitGenres(movie);
  const rating = getRating(movie);
  const votes = getVotes(movie);
  const description = getDescription(movie);
  const embedUrl = getEmbedUrl(getVideo(movie));
  const likeCount = (movie.likes ?? 343) + (liked ? 1 : 0);

  const top5List = [...moviesCardData]
    .sort((a, b) => getRating(b) - getRating(a))
    .slice(0, 5);

  const recommended = moviesCardData
    .filter(
      (m) =>
        String(m.id) !== String(movie.id) &&
        splitGenres(m).some((g) => genres.includes(g))
    )
    .slice(0, 4);

  const metaTitle = movie.title ?? movie.name;

  return (
    <>
      <Header />

      <section className={styles.movieDetailSection}>
        <div className={styles.detailWrapper}>
          {/* BREADCRUMB */}
          <div className={styles.pathNav}>
            <Link to="/">Home</Link>
            <span className={styles.pathSeparator}>•</span>
            <Link to="/movies">{genres[0] ?? "Movies"}</Link>
            <span className={styles.pathSeparator}>•</span>
            <span className={styles.pathActive}>{metaTitle}</span>
          </div>

          <div className={styles.contentGrid}>
            {/* ---------- MAIN ---------- */}
            <div className={styles.primaryColumn}>
              {/* PLAYER */}
              <div className={styles.videoPlayerBox}>
                {embedUrl && playing ? (
                  <iframe
                    src={`${embedUrl}?autoplay=1`}
                    title={metaTitle}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <button
                    type="button"
                    className={styles.posterCoverBtn}
                    onClick={() => embedUrl && setPlaying(true)}
                    aria-label="Play"
                    style={{ backgroundImage: `url(${movie.poster})` }}
                  >
                    <span className={styles.playIconWrapper}>
                      <PlayIcon />
                    </span>
                  </button>
                )}
              </div>

              {/* TITLE ROW */}
              <div className={styles.headingRow}>
                <div className={styles.headingInfo}>
                  <h1 className={styles.mainTitle}>{metaTitle}</h1>

                  <div className={styles.infoLine}>
                    <span>{movie.year}</span>
                    {(movie.duration ?? movie.runtime) && (
                      <>
                        <i />
                        <span className={styles.infoHighlight}>
                          {movie.duration ?? movie.runtime}
                        </span>
                      </>
                    )}
                    {movie.age && (
                      <>
                        <i />
                        <span>{movie.age}</span>
                      </>
                    )}
                    {genres.map((g) => (
                      <React.Fragment key={g}>
                        <i />
                        <Link to="/movies" className={styles.infoHighlight}>
                          {g}
                        </Link>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className={styles.actionButtonsGroup}>
                  <div className={styles.scoreContainer}>
                    <StarIcon />
                    <div>
                      <b>{rating.toFixed(1)}</b>
                      <small>
                        {votes} {votes === 1 ? "Vote" : "Votes"}
                      </small>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`${styles.watchlistToggleBtn} ${
                      inPlaylist ? styles.watchlistActiveState : ""
                    }`}
                    onClick={() => setInPlaylist(!inPlaylist)}
                  >
                    <HeartIcon filled={inPlaylist} />
                    <span>{inPlaylist ? "Added" : "+ Playlist"}</span>
                  </button>
                </div>
              </div>

              {/* LIKE */}
              <button
                type="button"
                className={`${styles.reactionBtn} ${
                  liked ? styles.reactionActiveState : ""
                }`}
                onClick={() => setLiked(!liked)}
              >
                <ThumbIcon filled={liked} />
                <span>+{likeCount}</span>
              </button>

              {/* SHORT DESC */}
              {description && (
                <p className={styles.summaryText}>{description}</p>
              )}

              {/* TABS */}
              <div className={styles.tabNavigation}>
                <button
                  type="button"
                  className={
                    tab === "description" ? styles.tabActiveState : ""
                  }
                  onClick={() => setTab("description")}
                >
                  Description
                </button>
                <span className={styles.tabDivider}>/</span>
                <button
                  type="button"
                  className={tab === "review" ? styles.tabActiveState : ""}
                  onClick={() => setTab("review")}
                >
                  Review
                </button>
              </div>

              <div className={styles.tabBodyContainer}>
                {tab === "description" ? (
                  <>
                    <p
                      className={`${styles.detailedText} ${
                        expanded ? styles.detailedTextExpanded : ""
                      }`}
                    >
                      {movie.fullDescription ?? movie.details ?? description}
                    </p>
                    <button
                      type="button"
                      className={styles.toggleExpandBtn}
                      onClick={() => setExpanded(!expanded)}
                    >
                      {expanded ? "Show Less" : "Read More"}{" "}
                      <span>{expanded ? "⌃" : "⌄"}</span>
                    </button>
                  </>
                ) : (
                  <p className={styles.emptyReviewNotice}>No reviews yet.</p>
                )}
              </div>

              {/* RECOMMEND */}
              {recommended.length > 0 && (
                <div className={styles.recommendationArea}>
                  <h2 className={styles.subSectionHeader}>We Recommend</h2>

                  <div className={styles.suggestionGrid}>
                    {recommended.map((m) => (
                      <Link
                        key={m.id}
                        to={`/movie/${m.id}`}
                        className={styles.suggestionCard}
                        style={{ backgroundImage: `url(${m.poster})` }}
                      >
                        <div className={styles.suggestionOverlay}>
                          <h3>{m.title ?? m.name}</h3>
                          <p>{getDescription(m)}</p>
                          <span className={styles.suggestionActionBtn}>
                            WATCH NOW
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ---------- SIDE ---------- */}
            <aside className={styles.sidebarSection}>
              <img
                className={styles.sidebarPosterImg}
                src={movie.poster}
                alt={metaTitle}
              />

              <div className={styles.rankingBox}>
                <h3 className={styles.rankingTitle}>Top 5 List</h3>

                {top5List.map((m, index) => (
                  <Link
                    key={m.id ?? index}
                    to={`/movie/${m.id}`}
                    className={styles.rankingItem}
                  >
                    <span className={styles.rankingIndexNum}>{index + 1}</span>
                    <span className={styles.rankingDetailsGroup}>
                      <small className={styles.rankingReleaseYear}>
                        {m.year}
                      </small>
                      <strong className={styles.rankingMovieName}>
                        {m.title ?? m.name}
                      </strong>
                      <small className={styles.rankingGenresList}>
                        {splitGenres(m).join(", ")}
                      </small>
                    </span>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};