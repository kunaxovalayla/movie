import React, { useState, useEffect, useRef } from "react";
import { moviesCardData } from "../data/MovieCardData";
import { MovieCard } from "../components/Moviecard/MovieCard";
import styles from "./Movies.module.css";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { Link } from "react-router-dom";
import {
  BsGrid3X3GapFill,
  BsGrid3X3,
  BsListUl,
  BsList,
  BsSliders
} from "react-icons/bs";

/* ---------- helpers ---------- */

const splitGenres = (movie) =>
  movie.genre ? movie.genre.split(",").map((g) => g.trim()) : [];

const getPoster = (m) =>
  m.image ?? m.poster ?? m.img ?? m.poster_path ?? m.cover ?? m.thumbnail ?? "";

const getDescription = (m) =>
  m.description ?? m.overview ?? m.about ?? m.plot ?? m.desc ?? "";

const getVotes = (m) => m.votes ?? m.vote_count ?? m.voteCount ?? 1;

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    setMatches(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);

  return matches;
};



const IconGridDense = () => <BsGrid3X3GapFill size={18} />;

const IconGrid3 = () => <BsGrid3X3 size={18} />;

const IconList3 = () => <BsListUl size={18} />;

const IconList4 = () => <BsList size={18} />;

const IconLines = () => <BsList size={18} />;

const IconFilters = () => <BsSliders size={22} />;

const viewModes = [
  { id: "grid6", type: "grid", title: "6 columns", Icon: IconGridDense },
  { id: "grid5", type: "grid", title: "5 columns", Icon: IconGrid3 },
  { id: "listLarge", type: "list", title: "List", Icon: IconList3 },
  { id: "listSmall", type: "list", title: "Compact list", Icon: IconList4 },
  { id: "listTwo", type: "list", title: "Two column list", Icon: IconLines },
];

const sortOptions = [
  { value: "latest", label: "Latest" },
  { value: "rating", label: "Top rated" },
  { value: "name", label: "A - Z" },
];

/* ---------- sort dropdown ---------- */

const SortDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const current = sortOptions.find((o) => o.value === value);

  return (
    <div className={styles.sortBox} ref={ref}>
      <button
        type="button"
        className={styles.sortTrigger}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={styles.sortIcon}>⇅</span>
        <span className={styles.sortLabel}>{current.label}</span>
        <svg
          className={`${styles.sortChevron} ${open ? styles.sortChevronOpen : ""}`}
          viewBox="0 0 10 6"
          width="12"
          height="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <ul className={styles.sortMenu} role="listbox">
          {sortOptions.map((opt) => (
            <li key={opt.value} role="option" aria-selected={opt.value === value}>
              <button
                type="button"
                className={`${styles.sortOption} ${
                  opt.value === value ? styles.sortOptionActive : ""
                }`}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                <span>{opt.label}</span>
                {opt.value === value && (
                  <span className={styles.sortCheck}>✓</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/* ---------- list item ---------- */

const MovieListItem = ({ movie, rating }) => {
  const title = movie.title ?? movie.name;
  const votes = getVotes(movie);
  const poster = getPoster(movie);

  return (
    <div className={styles.listItem}>
      {poster ? (
        <img className={styles.listPoster} src={poster} alt={title} />
      ) : (
        <div className={styles.listPoster} />
      )}

      <div className={styles.listInfo}>
        <span className={styles.listMeta}>
          {movie.year}, {splitGenres(movie).join(", ")}
        </span>
        <strong className={styles.listTitle}>{title}</strong>
        <p className={styles.listDesc}>{getDescription(movie)}</p>

        <div className={styles.listActions}>
          <button type="button" className={styles.watchBtn}>
            WATCH NOW
          </button>
          <button type="button" className={styles.playlistBtn}>
            + PLAYLIST
          </button>
        </div>
      </div>

      <div className={styles.listRating}>
        <div className={styles.ratingStar}>
          ★<span>{rating.toFixed(1)}</span>
        </div>
        <div className={styles.votes}>
          <b>{votes}</b>
          <small>{votes === 1 ? "Vote" : "Votes"}</small>
        </div>
      </div>
    </div>
  );
};

/* ---------- page ---------- */

export const Movies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedTopMovie, setSelectedTopMovie] = useState(null);
  const [sortBy, setSortBy] = useState("latest");
  const [viewMode, setViewMode] = useState("grid6");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width: 700px)");
  const isTablet = useMediaQuery("(min-width: 701px) and (max-width: 1024px)");
  const isResponsive = isMobile || isTablet;

  const itemsPerPage = 24;

  // telefon: 3 sütunlu şəbəkə | planşet: hər sətirdə 1 kart | masaüstü: seçilmiş rejim
  const effectiveMode = isMobile
    ? "gridMobile"
    : isTablet
    ? "listLarge"
    : viewMode;

  const isList = !isMobile && (isTablet || effectiveMode.startsWith("list"));

  /* drawer: ESC, scroll lock, resize */
  useEffect(() => {
    if (!isResponsive) setFiltersOpen(false);
  }, [isResponsive]);

  useEffect(() => {
    document.body.style.overflow = filtersOpen && isResponsive ? "hidden" : "";
    const onKey = (e) => {
      if (e.key === "Escape") setFiltersOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [filtersOpen, isResponsive]);

  const categories = [
    ...new Set(moviesCardData.flatMap((movie) => splitGenres(movie))),
  ].sort();

  const years = [
    ...new Set(
      moviesCardData
        .map((movie) => Number(movie.year))
        .filter((year) => Number.isFinite(year) && year > 0)
    ),
  ].sort((a, b) => b - a);

  const getRating = (movie) => {
    const value = movie.rating ?? movie.vote_average ?? movie.imdbRating ?? 0;
    const rating = Number.parseFloat(value);
    return Number.isFinite(rating) ? rating : 0;
  };

  const top5List = [...moviesCardData]
    .sort((a, b) => getRating(b) - getRating(a))
    .slice(0, 5);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
    setSelectedTopMovie(null);
  };

  const filteredMovies = moviesCardData
    .filter((movie) => {
      const movieGenres = splitGenres(movie);

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some((c) => movieGenres.includes(c));

      const matchesYear =
        selectedYear === null || Number(movie.year) === selectedYear;

      const matchesRating =
        selectedRating === null || getRating(movie) >= selectedRating;

      const matchesTopMovie =
        selectedTopMovie === null || movie === selectedTopMovie;

      return (
        matchesCategory && matchesYear && matchesRating && matchesTopMovie
      );
    })
    .sort((a, b) => {
      if (sortBy === "rating") return getRating(b) - getRating(a);
      if (sortBy === "name")
        return String(a.title ?? a.name ?? "").localeCompare(
          String(b.title ?? b.name ?? "")
        );
      return Number(b.year) - Number(a.year); // latest
    });

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedYear, selectedRating, selectedTopMovie, sortBy]);

  const totalResults = filteredMovies.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const displayedMovies = filteredMovies.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getRatingCount = (rating) =>
    moviesCardData.filter((movie) => {
      const movieGenres = splitGenres(movie);
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some((c) => movieGenres.includes(c));
      const matchesYear =
        selectedYear === null || Number(movie.year) === selectedYear;
      return matchesCategory && matchesYear && getRating(movie) >= rating;
    }).length;

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedYear(null);
    setSelectedRating(null);
    setSelectedTopMovie(null);
  };

  const renderStars = (filled) =>
    Array.from({ length: 10 }, (_, i) => (
      <span key={i} className={i < filled ? styles.starOn : styles.starOff}>
        ★
      </span>
    ));

  return (
    <>
      <Header />

      <section className={styles.section}>
        <div className={styles.container}>
          
         <div className={styles.breadcrumb}>
  <Link to="/" className={styles.breadcrumbLink}>
    Home
  </Link>

  <span className={styles.dot}>•</span>

  <span className={styles.current}>Movies</span>
</div>

          <div
            className={`${styles.overlay} ${
              filtersOpen ? styles.overlayOpen : ""
            }`}
            onClick={() => setFiltersOpen(false)}
          />

          <div className={styles.moviesLayout}>
            {/* SIDEBAR / DRAWER */}
            <aside
              className={`${styles.sidebar} ${
                filtersOpen ? styles.sidebarOpen : ""
              }`}
            >
              <div className={styles.drawerHeader}>
                <span className={styles.drawerTitle}>
                  <IconFilters /> Filters
                </span>
                <button
                  type="button"
                  className={styles.drawerClose}
                  onClick={() => setFiltersOpen(false)}
                  aria-label="Close filters"
                >
                  ✕
                </button>
              </div>

              {/* CATEGORIES */}
              <div className={styles.panel}>
                <h3 className={styles.panelTitle}>Categories</h3>

                <div className={styles.categoriesGrid}>
                  {categories.map((category) => (
                    <label key={category} className={styles.categoryItem}>
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* YEAR */}
              <div className={styles.panel}>
                <h3 className={styles.panelTitle}>Movies by Year</h3>

                <div className={styles.yearGrid}>
                  {years.map((year) => (
                    <button
                      key={year}
                      type="button"
                      className={`${styles.yearButton} ${
                        selectedYear === year ? styles.yearActive : ""
                      }`}
                      onClick={() => {
                        setSelectedYear(selectedYear === year ? null : year);
                        setSelectedTopMovie(null);
                      }}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              {/* RATING */}
              <div className={styles.panel}>
                <h3 className={styles.panelTitle}>Filter by Rating</h3>

                <div className={styles.ratingList}>
                  {[10, 9, 8, 7, 6].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      className={`${styles.ratingRow} ${
                        selectedRating === rating ? styles.ratingActive : ""
                      }`}
                      onClick={() => {
                        setSelectedRating(
                          selectedRating === rating ? null : rating
                        );
                        setSelectedTopMovie(null);
                      }}
                    >
                      <span className={styles.stars}>{renderStars(rating)}</span>
                      <span className={styles.ratingCount}>
                        ({getRatingCount(rating)})
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* TOP 5 */}
              <div className={styles.panel}>
                <h3 className={styles.panelTitle}>Top 5 List</h3>

                <div className={styles.top5List}>
                  {top5List.map((movie, index) => {
                    const isSelected = selectedTopMovie === movie;
                    return (
                      <button
                        key={movie.id ?? movie._id ?? movie.title ?? index}
                        type="button"
                        className={`${styles.top5Item} ${
                          isSelected ? styles.top5Active : ""
                        }`}
                        onClick={() => {
                          setSelectedTopMovie(isSelected ? null : movie);
                          setSelectedCategories([]);
                          setSelectedYear(null);
                          setSelectedRating(null);
                        }}
                      >
                        <span className={styles.top5Number}>{index + 1}</span>
                        <span className={styles.top5Info}>
                          <small className={styles.top5Year}>{movie.year}</small>
                          <strong className={styles.top5Name}>
                            {movie.title ?? movie.name}
                          </strong>
                          <small className={styles.top5Genre}>
                            {splitGenres(movie).join(", ")}
                          </small>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                className={styles.resetButton}
                onClick={resetFilters}
              >
                Reset filters
              </button>
            </aside>

            {/* CONTENT */}
            <main className={styles.moviesContent}>
              <h2 className={styles.pageTitle}>Movies</h2>

              <div className={styles.toolbar}>
                <button
                  type="button"
                  className={styles.filtersBtn}
                  onClick={() => setFiltersOpen(true)}
                >
                  <IconFilters />
                  <span>Filters</span>
                </button>

                <div className={styles.toolbarRight}>
                  <div className={styles.viewIcons}>
                    {viewModes.map(({ id, title, Icon }) => (
                      <button
                        key={id}
                        type="button"
                        title={title}
                        className={viewMode === id ? styles.viewActive : ""}
                        onClick={() => setViewMode(id)}
                      >
                        <Icon />
                      </button>
                    ))}
                  </div>

                  <SortDropdown value={sortBy} onChange={setSortBy} />
                </div>
              </div>

              {displayedMovies.length > 0 ? (
                isList ? (
                  <div className={`${styles.listWrap} ${styles[effectiveMode]}`}>
                    {displayedMovies.map((movie, index) => (
                      <MovieListItem
                        key={movie.id ?? movie._id ?? movie.title ?? index}
                        movie={movie}
                        rating={getRating(movie)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className={`${styles.moviesGrid} ${styles[effectiveMode]}`}>
                    {displayedMovies.map((movie, index) => (
                      <MovieCard
                        key={movie.id ?? movie._id ?? movie.title ?? index}
                        movie={movie}
                      />
                    ))}
                  </div>
                )
              ) : (
                <p className={styles.noResults}>No movies found.</p>
              )}

              {/* BOTTOM BAR */}
              <div className={styles.bottomBar}>
                <span className={styles.resultsInfo}>
                  Showing {totalResults === 0 ? 0 : startIndex + 1}-
                  {Math.min(startIndex + itemsPerPage, totalResults)} of{" "}
                  {totalResults} results
                </span>

                {totalPages > 1 && (
                  <div className={styles.pagination}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          type="button"
                          key={page}
                          className={
                            currentPage === page ? styles.activePage : ""
                          }
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      )
                    )}

                    <button
                      type="button"
                      className={styles.nextBtn}
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                    >
                      Next Page <span>→</span>
                    </button>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};