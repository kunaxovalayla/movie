import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { FaPlay, FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp } from "react-icons/fi";

import { VikingsData } from "../data/VikingsData";
import { moviesCardData } from "../data/MovieCardData";
import { VikingsCard } from "../components/Vikingscom/VikingsCard";
import styles from "./EpisodeDetails.module.css";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { NotFound } from "../404/NotFound";

const SERIES_NAME = "Vikings";
const SEASON_SIZE = 5;
const SEASON_COUNT = 5;
const MAIN_COUNT = SEASON_SIZE * SEASON_COUNT;



const pad = (n) => String(n).padStart(2, "0");


const parseSeria = (seria = "") => {
  const m = String(seria).match(/S(\d+)\s*E(\d+)/i);
  return m
    ? { season: Number(m[1]), episode: Number(m[2]) }
    : { season: 1, episode: 0 };
};

const getEmbedUrl = (url) => {
  if (!url) return "";
  const match = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

const getDescription = (m) =>
  m.description ?? m.overview ?? m.about ?? m.plot ?? m.desc ?? "";

const getVideo = (m) =>
  m.VideoVk ??
  m.videoVk ??
  m.trailer ??
  m.video ??
  m.videoUrl ??
  m.trailerUrl ??
  m.youtube ??
  "";

const getTags = (m) => {
  const t =
    m.tags ?? m.tagsVk ?? ["Brother", "Brother Relationship", "King", "Vikings"];
  return Array.isArray(t) ? t : String(t).split(",").map((x) => x.trim());
};

const episodes = VikingsData.map((e, i) => {
  if (i < MAIN_COUNT) {
    const season = Math.floor(i / SEASON_SIZE) + 1;
    const episodeNo = (i % SEASON_SIZE) + 1;
    return {
      ...e,
      season,
      episodeNo,
      seria: `S${pad(season)}E${pad(episodeNo)}`,
      extra: false,
    };
  }

  const { season, episode } = parseSeria(e.seria);
  return {
    ...e,
    season,
    episodeNo: episode,
    seria: `S${pad(season)}E${pad(episode)}`,
    extra: true,
  };
});

const seasons = Array.from({ length: SEASON_COUNT }, (_, i) => i + 1);



export const EpisodeDetails = () => {
  const { id } = useParams();

  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const seasonsRef = useRef(null);

  const item = episodes.find((v) => String(v.vkId) === String(id));

  const currentSeason = item ? item.season : 1;
  const [activeSeason, setActiveSeason] = useState(currentSeason);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setPlaying(false);
    setLiked(false);
    setExpanded(false);
    setActiveSeason(currentSeason);
  }, [id, currentSeason]);

 
  const seasonEpisodes = useMemo(
    () => episodes.filter((e) => e.season === activeSeason && !e.extra),
    [activeSeason]
  );

  if (!item) return <NotFound />;

  const index = episodes.findIndex((e) => String(e.vkId) === String(id));
  const prev = index > 0 ? episodes[index - 1] : null;
  const next = index < episodes.length - 1 ? episodes[index + 1] : null;

  const embedUrl = getEmbedUrl(getVideo(item));
  const description = getDescription(item);
  const tags = getTags(item);

  const recommended = moviesCardData.slice(0, 5);

  const fullTitle = `${SERIES_NAME} - ${item.seria} - ${item.titleVk}`;

  
  const genreName = item.genre ?? "Drama";
  const firstEpisode = episodes[0];

  const scrollToSeasons = (e) => {
    e.preventDefault();
    setActiveSeason(currentSeason);
    seasonsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSeriesClick = (e) => {
    if (String(firstEpisode.vkId) === String(item.vkId)) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <Header />

      <div className={styles.page}>
       
        <section className={styles.top}>
          <div className={styles.container}>
           
            <div className={styles.breadcrumb}>
              <Link to="/">Home</Link>
              <FiChevronRight className={styles.dot} />

              <Link to={`/movies?genre=${encodeURIComponent(genreName)}`}>
                {genreName}
              </Link>
              <FiChevronRight className={styles.dot} />

              <Link to={`/episode/${firstEpisode.vkId}`} onClick={handleSeriesClick}>
                {SERIES_NAME}
              </Link>
              <FiChevronRight className={styles.dot} />

              <a href="#seasons" onClick={scrollToSeasons}>
                Season {currentSeason}
              </a>
              <FiChevronRight className={styles.dot} />

              <Link
                to={`/episode/${item.vkId}`}
                className={styles.current}
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                {item.titleVk}
              </Link>
            </div>

            <div className={styles.playerRow}>
              {prev ? (
                <Link to={`/episode/${prev.vkId}`} className={styles.sideNav}>
                  <FiChevronLeft size={64} strokeWidth={1} />
                  <span>
                    Previous
                    <br />
                    Episode
                  </span>
                </Link>
              ) : (
                <span className={`${styles.sideNav} ${styles.sideNavOff}`}>
                  <FiChevronLeft size={64} strokeWidth={1} />
                  <span>
                    Previous
                    <br />
                    Episode
                  </span>
                </span>
              )}

              <div className={styles.player}>
                {embedUrl && playing ? (
                  <iframe
                    src={`${embedUrl}?autoplay=1`}
                    title={fullTitle}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <button
                    type="button"
                    className={styles.playerCover}
                    onClick={() => embedUrl && setPlaying(true)}
                    aria-label="Play"
                    style={{ backgroundImage: `url(${item.photoVk})` }}
                  >
                    <span className={styles.playBtn}>
                      <FaPlay />
                    </span>
                  </button>
                )}
              </div>

              {next ? (
                <Link
                  to={`/episode/${next.vkId}`}
                  className={`${styles.sideNav} ${styles.sideNavRight}`}
                >
                  <span>
                    Next
                    <br />
                    Episode
                  </span>
                  <FiChevronRight size={64} strokeWidth={1} />
                </Link>
              ) : (
                <span
                  className={`${styles.sideNav} ${styles.sideNavRight} ${styles.sideNavOff}`}
                >
                  <span>
                    Next
                    <br />
                    Episode
                  </span>
                  <FiChevronRight size={64} strokeWidth={1} />
                </span>
              )}
            </div>

            {/* MOBILE PREV / NEXT */}
            <div className={styles.mobileNav}>
              {prev ? (
                <Link to={`/episode/${prev.vkId}`}>
                  <FiChevronLeft /> Previous Episode
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link to={`/episode/${next.vkId}`}>
                  Next Episode <FiChevronRight />
                </Link>
              ) : (
                <span />
              )}
            </div>

            {/* TITLE */}
            <h1 className={styles.title}>{fullTitle}</h1>

            <div className={styles.metaLine}>
              <span>{item.duration ?? "20min"}</span>
              <i />
              <span>Added: {item.added ?? item.date ?? "06.12.2017"}</span>
            </div>

            <button
              type="button"
              className={`${styles.likeBtn} ${liked ? styles.likeActive : ""}`}
              onClick={() => setLiked(!liked)}
            >
              {liked ? <FaThumbsUp /> : <FaRegThumbsUp />}
              <span>+{(item.likes ?? 15) + (liked ? 1 : 0)}</span>
            </button>

            {/* DESCRIPTION + TAGS */}
            <div className={styles.descRow}>
              <div className={styles.descCol}>
                <p
                  className={`${styles.desc} ${
                    expanded ? styles.descOpen : ""
                  }`}
                >
                  {description ||
                    "Praesent iaculis, purus ac vehicula mattis, arcu lorem blandit nisl, non laoreet dui mi eget elit. Donec porttitor ex vel augue maximus luctus. Vivamus finibus nibh eu nunc volutpat suscipit."}
                </p>
                <button
                  type="button"
                  className={styles.readMore}
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? "Show Less" : "Read More"}
                  {expanded ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              </div>

              <div className={styles.tagsCol}>
                <span className={styles.tagsLabel}>Tags: </span>
                {tags.map((t, i) => (
                  <React.Fragment key={t}>
                    <Link to="/movies" className={styles.tag}>
                      {t}
                    </Link>
                    {i < tags.length - 1 && ", "}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- SEASONS ---------- */}
        <section className={styles.seasons} ref={seasonsRef} id="seasons">
          <div className={styles.container}>
            <div className={styles.seasonTabs}>
              {seasons.map((s, i) => (
                <React.Fragment key={s}>
                  <button
                    type="button"
                    className={activeSeason === s ? styles.seasonActive : ""}
                    onClick={() => setActiveSeason(s)}
                  >
                    Season {s}
                  </button>
                  {i < seasons.length - 1 && (
                    <span className={styles.seasonSep}>/</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <Swiper
              key={activeSeason}
              className={styles.epSlider}
              spaceBetween={16}
              slidesPerView={2}
              grabCursor={true}
              breakpoints={{
                700: { slidesPerView: 3 },
                1025: { slidesPerView: 5 },
              }}
            >
              {seasonEpisodes.map((e) => (
                <SwiperSlide
                  key={e.vkId}
                  className={`${styles.epSlide} ${
                    String(e.vkId) === String(id) ? styles.epSlideCurrent : ""
                  }`}
                >
                  <VikingsCard item={e} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        
        <section className={styles.recommend}>
          <div className={styles.container}>
            <h2 className={styles.recTitle}>
              You may also like after: {SERIES_NAME}
            </h2>

            <div className={styles.recGrid}>
              {recommended.map((m) => (
                <Link key={m.id} to={`/movie/${m.id}`} className={styles.recCard}>
                  <div className={styles.recImg}>
                    <img src={m.poster} alt={m.title} />
                    {m.isFeatured && (
                      <span className={styles.featured}>Featured</span>
                    )}
                  </div>
                  <small>
                    {m.genre}, {m.year}
                  </small>
                  <strong>{m.title ?? m.name}</strong>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};