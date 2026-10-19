import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { FaThumbsUp, FaRegThumbsUp, FaHeart, FaRegHeart } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { PopularTVData } from "../data/PopularTV";
import { VikingsData } from "../data/VikingsData";
import styles from "./TVDetails.module.css";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { NotFound } from "../404/NotFound";

const SEASON_COUNT = 2;
const EPISODES_PER_SEASON = 5;


const pad = (n) => String(n).padStart(2, "0");

const parseMeta = (str = "") => {
  const parts = str.split(",").map((s) => s.trim()).filter(Boolean);
  const i = parts.findIndex((p) => /^\d{4}/.test(p));
  return i === -1
    ? { genres: parts, years: "" }
    : { genres: parts.slice(0, i), years: parts.slice(i).join(", ") };
};

const getTags = (show) => {
  const t =
    show.tags ?? ["Brother", "Brother Relationship", "King", "Vikings"];
  return Array.isArray(t) ? t : String(t).split(",").map((x) => x.trim());
};

const buildEpisodes = (show) => {
  if (Array.isArray(show.episodes)) return show.episodes;

  const list = [];
  for (let s = 1; s <= SEASON_COUNT; s++) {
    for (let e = 1; e <= EPISODES_PER_SEASON; e++) {
      const source =
        VikingsData[(show.idtv + (s - 1) * 5 + e) % VikingsData.length];

      list.push({
        id: `${show.idtv}-${s}-${e}`,
        vkId: source.vkId,
        season: s,
        seria: `S${pad(s)}E${pad(e)}`,
        title: `Episode ${e}`,
        photo: source.photoVk,
      });
    }
  }
  return list;
};


export const TVDetails = () => {
  const { id } = useParams();

  const [liked, setLiked] = useState(false);
  const [inPlaylist, setInPlaylist] = useState(false);
  const [activeSeason, setActiveSeason] = useState(1);
  const [tab, setTab] = useState("description");
  const [recSwiper, setRecSwiper] = useState(null);
  const [recStart, setRecStart] = useState(true);
  const [recEnd, setRecEnd] = useState(false);

  const show = PopularTVData.find((s) => String(s.idtv) === String(id));

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setLiked(false);
    setInPlaylist(false);
    setActiveSeason(1);
    setTab("description");
  }, [id]);

  const episodes = useMemo(() => (show ? buildEpisodes(show) : []), [show]);

  const seasons = useMemo(
    () => [...new Set(episodes.map((e) => e.season))],
    [episodes]
  );

  const seasonEpisodes = useMemo(
    () => episodes.filter((e) => e.season === activeSeason),
    [episodes, activeSeason]
  );

  if (!show) return <NotFound />;

  const { genres, years } = parseMeta(show.genretv);
  const tags = getTags(show);
  const description =
    show.description ??
    "An emotional thrill ride through the day-to-day chaos of the city's most explosive hospital and the courageous team of doctors who hold it together.";

  const recommended = PopularTVData.filter(
    (s) => String(s.idtv) !== String(show.idtv)
  );

  return (
    <>
      <Header />

      <div className={styles.page}>
        
        <div
          className={styles.hero}
          style={{ backgroundImage: `url(${show.phototv})` }}
        />

        <section className={styles.info}>
          <div className={styles.container}>
            <div className={styles.titleRow}>
              <div>
                <h1 className={styles.title}>{show.titletv}</h1>

                <div className={styles.metaLine}>
                  {genres.map((g, i) => (
                    <React.Fragment key={g}>
                      <Link to={`/movies?genre=${encodeURIComponent(g)}`}>
                        {g}
                      </Link>
                      {i < genres.length - 1 && ", "}
                    </React.Fragment>
                  ))}
                  {years && (
                    <>
                      <i />
                      <span>{years}</span>
                    </>
                  )}
                </div>
              </div>

              <button
                type="button"
                className={`${styles.playlistBtn} ${
                  inPlaylist ? styles.playlistActive : ""
                }`}
                onClick={() => setInPlaylist(!inPlaylist)}
              >
                {inPlaylist ? <FaHeart /> : <FaRegHeart />}
                <span>{inPlaylist ? "Added" : "+ Playlist"}</span>
              </button>
            </div>

            <button
              type="button"
              className={`${styles.likeBtn} ${liked ? styles.likeActive : ""}`}
              onClick={() => setLiked(!liked)}
            >
              {liked ? <FaThumbsUp /> : <FaRegThumbsUp />}
              <span>+{(show.likes ?? 56) + (liked ? 1 : 0)}</span>
            </button>

            <div className={styles.descRow}>
              <p className={styles.desc}>{description}</p>

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

        <section className={styles.seasons}>
          <div className={styles.container}>
            <div className={styles.seasonTabs}>
              {seasons.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={activeSeason === s ? styles.seasonActive : ""}
                  onClick={() => setActiveSeason(s)}
                >
                  Season {s}
                </button>
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
                <SwiperSlide key={e.id} className={styles.epSlide}>
                  {e.vkId ? (
                    <Link to={`/episode/${e.vkId}`} className={styles.epCard}>
                      <img src={e.photo} alt={e.title} />
                      <small>{e.seria}</small>
                      <strong>{e.title}</strong>
                    </Link>
                  ) : (
                    <div className={styles.epCard}>
                      <img src={e.photo} alt={e.title} />
                      <small>{e.seria}</small>
                      <strong>{e.title}</strong>
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* ---------- RECOMMENDED ---------- */}
        <section className={styles.recommend}>
          <div className={styles.container}>
            <h2 className={styles.recTitle}>
              You may also like after: {show.titletv}
            </h2>

            <div className={styles.recWrap}>
              <Swiper
                className={styles.recSlider}
                spaceBetween={14}
                slidesPerView={2}
                grabCursor={true}
                onSwiper={setRecSwiper}
                onSlideChange={(sw) => {
                  setRecStart(sw.isBeginning);
                  setRecEnd(sw.isEnd);
                }}
                breakpoints={{
                  700: { slidesPerView: 3 },
                  1025: { slidesPerView: 5 },
                }}
              >
                {recommended.map((s, i) => {
                  const meta = parseMeta(s.genretv);
                  const featured = s.isFeatured ?? i % 2 === 0;

                  return (
                    <SwiperSlide key={s.idtv}>
                      <Link to={`/tv/${s.idtv}`} className={styles.recCard}>
                        <div className={styles.recImg}>
                          <img src={s.phototv} alt={s.titletv} />
                          {featured && (
                            <span className={styles.featured}>Featured</span>
                          )}
                        </div>
                        <small>
                          {meta.genres.join(", ")}
                          {meta.years && (
                            <>
                              <i />
                              {meta.years}
                            </>
                          )}
                        </small>
                        <strong>{s.titletv}</strong>
                      </Link>
                    </SwiperSlide>
                  );
                })}
              </Swiper>

              {!recStart && (
                <button
                  type="button"
                  className={`${styles.arrow} ${styles.arrowLeft}`}
                  onClick={() => recSwiper?.slidePrev()}
                  aria-label="Previous"
                >
                  <FiChevronLeft />
                </button>
              )}

              {!recEnd && (
                <button
                  type="button"
                  className={`${styles.arrow} ${styles.arrowRight}`}
                  onClick={() => recSwiper?.slideNext()}
                  aria-label="Next"
                >
                  <FiChevronRight />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ---------- TABS ---------- */}
        <section className={styles.tabsSection}>
          <div className={styles.container}>
            <div className={styles.tabs}>
              <button
                type="button"
                className={tab === "description" ? styles.tabActive : ""}
                onClick={() => setTab("description")}
              >
                Description
              </button>
              <span className={styles.tabSep}>/</span>
              <button
                type="button"
                className={tab === "review" ? styles.tabActive : ""}
                onClick={() => setTab("review")}
              >
                Review
              </button>
            </div>

            <div className={styles.tabContent}>
              {tab === "description" ? (
                <p className={styles.longDesc}>
                  {show.fullDescription ?? description}
                </p>
              ) : (
                <>
                  <h3 className={styles.reviewTitle}>
                    <span>Be the first to review “{show.titletv}”</span>
                  </h3>
                  <p className={styles.reviewText}>
                    You must be{" "}
                    <button type="button" className={styles.loginLink}>
                      logged in
                    </button>{" "}
                    to post a review.
                  </p>
                  <p className={styles.reviewText}>There are no reviews yet.</p>
                </>
              )}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};