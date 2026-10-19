
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

import logoImg from "../assets/images/image.jpg";

import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMovieOpen, setIsMovieOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const closeAll = () => {
    setIsMobileMenuOpen(false);
    setIsMovieOpen(false);
    setIsBlogOpen(false);
    setIsSearchOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setIsMovieOpen(false);
    setIsBlogOpen(false);
    setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    setIsMobileMenuOpen(false);
    setIsMovieOpen(false);
    setIsBlogOpen(false);
  };

  const toggleMovie = () => {
    setIsMovieOpen((prev) => !prev);
    setIsBlogOpen(false);
  };

  const toggleBlog = () => {
    setIsBlogOpen((prev) => !prev);
    setIsMovieOpen(false);
  };

  return (
    <>
      {isMobileMenuOpen && (
        <div className="menu-overlay" onClick={closeAll} />
      )}

      <header className="header-container">
        <div className="navbar">

          {/* Sol tərəf: hamburger və logo */}
          <div className="nav-left-group">
            <button
              type="button"
              className="hamburger"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>

            <Link to="/" className="navleft" onClick={closeAll}>
              <img src={logoImg} alt="Vodi Logo" />
            </Link>
          </div>

          {/* Əsas menyu */}
          <nav
            className={`navcenter ${isMobileMenuOpen ? "active" : ""}`}
            aria-label="Main navigation"
          >
            <div className="sidebar-header">
              <span className="sidebar-title">Menu</span>
              <button
                type="button"
                className="sidebar-close"
                onClick={closeAll}
                aria-label="Close menu"
              >
                <FiX />
              </button>
            </div>

            <ul className="main-menu">
              <li>
                <Link to="/" onClick={closeAll}>
                  Home
                </Link>
              </li>

              {/* Movies */}
              <li
                className={`movieClick ${isMovieOpen ? "open" : ""}`}
                onMouseEnter={() => {
                  if (window.innerWidth >= 1024) {
                    setIsMovieOpen(true);
                    setIsBlogOpen(false);
                  }
                }}
                onMouseLeave={() => {
                  if (window.innerWidth >= 1024) {
                    setIsMovieOpen(false);
                  }
                }}
              >
                <div className="menu-heading">
                  <Link to="/movies" onClick={closeAll}>
                    Movies
                  </Link>

                  <button
                    type="button"
                    className="submenu-toggle"
                    onClick={toggleMovie}
                    aria-label="Open Movies submenu"
                    aria-expanded={isMovieOpen}
                  >
                    {isMovieOpen ? "▲" : "▼"}
                  </button>
                </div>

                <ul className="dropdown-menu">
                  <li>
                    <Link to="/movies" onClick={closeAll}>
                      Movie
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Blogs */}
              <li
                className={`blogclick ${isBlogOpen ? "open" : ""}`}
                onMouseEnter={() => {
                  if (window.innerWidth >= 1024) {
                    setIsBlogOpen(true);
                    setIsMovieOpen(false);
                  }
                }}
                onMouseLeave={() => {
                  if (window.innerWidth >= 1024) {
                    setIsBlogOpen(false);
                  }
                }}
              >
                <div className="menu-heading">
                  <Link to="/blogs" onClick={closeAll}>
                    Blogs
                  </Link>

                  <button
                    type="button"
                    className="submenu-toggle"
                    onClick={toggleBlog}
                    aria-label="Open Blogs submenu"
                    aria-expanded={isBlogOpen}
                  >
                    {isBlogOpen ? "▲" : "▼"}
                  </button>
                </div>

                <ul className="dropdown-menu">
                  <li>
                    <Link to="/blogs" onClick={closeAll}>
                      Blog
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link to="/contact" onClick={closeAll}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Sağ tərəf */}
          <div className="navRight">
            <div className="searchContainer desktop-search">
              <input
                type="search"
                placeholder="Search..."
                className="searchInput"
                aria-label="Search"
              />
              <FiSearch className="searchIcon" />
            </div>

            <button
              type="button"
              className="mobile-search-toggle"
              onClick={toggleSearch}
              aria-label="Toggle search"
              aria-expanded={isSearchOpen}
            >
              {isSearchOpen ? <FiX /> : <FiSearch />}
            </button>

            <button
              type="button"
              className="uploadContainer desktop-upload"
            >
              <AiOutlineCloudUpload className="uploadIcon" />
              <span>Upload</span>
            </button>

            <button
              type="button"
              className="user"
              aria-label="User profile"
            >
              <FaUserCircle className="userIcon" />
            </button>
          </div>
        </div>

        {/* Mobil axtarış */}
        {isSearchOpen && (
          <div className="mobile-search-dropdown">
            <input
              type="search"
              placeholder="Search..."
              className="mobile-search-input"
              aria-label="Search movies"
            />
          </div>
        )}
      </header>
    </>
  );
};
