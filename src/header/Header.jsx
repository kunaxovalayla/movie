
import React, { useState } from "react";
import "./Header.css";

import logoImg from "../assets/images/image.jpg";

import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

export const Header = () => {
  const [isMovieOpen, setIsMovieOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Bütün menyuları bağla
  const closeAll = () => {
    setIsMobileMenuOpen(false);
    setIsMovieOpen(false);
    setIsBlogOpen(false);
  };

  // Hamburger menyu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setIsSearchOpen(false);
    setIsMovieOpen(false);
    setIsBlogOpen(false);
  };

  // Movies alt menyusu
  const toggleMovie = () => {
    setIsMovieOpen((prev) => !prev);
    setIsBlogOpen(false);
  };


  const toggleBlog = () => {
    setIsBlogOpen((prev) => !prev);
    setIsMovieOpen(false);
  };


  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    setIsMobileMenuOpen(false);
    setIsMovieOpen(false);
    setIsBlogOpen(false);
  };

  return (
    <>
     
      {isMobileMenuOpen && (
        <div
          className="menu-overlay"
          onClick={closeAll}
          aria-hidden="true"
        />
      )}

      <header
        className={`header-container ${
          isMobileMenuOpen ? "menu-open" : ""
        }`}
      >
        <div className="navbar">

          
          <div className="nav-left-group">
            <button
              type="button"
              className="hamburger"
              onClick={toggleMobileMenu}
              aria-label={
                isMobileMenuOpen ? "Close menu" : "Open menu"
              }
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <FiX className="hamburgerIcon" />
              ) : (
                <FiMenu className="hamburgerIcon" />
              )}
            </button>

            <div className="navleft">
              <img src={logoImg} alt="Vodi Logo" />
            </div>
          </div>

          
          <nav
            className={`navcenter ${
              isMobileMenuOpen ? "active" : ""
            }`}
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
              {/* Home */}
              <li>
                <a href="#" onClick={closeAll}>
                  Home
                </a>
              </li>

              {/* Movies */}
              <li
                className={`movieClick ${
                  isMovieOpen ? "open" : ""
                }`}
              >
                <button
                  type="button"
                  className="menu-title"
                  onClick={toggleMovie}
                  aria-expanded={isMovieOpen}
                >
                  <span>Movies</span>
                  <span className="toggle-icon">
                    {isMovieOpen ? "▲" : "▼"}
                  </span>
                </button>

                {isMovieOpen && (
                  <ul className="dropdown-menu">
                    <li>
                      <a href="#" onClick={closeAll}>
                        Movie
                      </a>
                    </li>
                  </ul>
                )}
              </li>

              {/* Blogs */}
              <li
                className={`blogclick ${
                  isBlogOpen ? "open" : ""
                }`}
              >
                <button
                  type="button"
                  className="menu-title"
                  onClick={toggleBlog}
                  aria-expanded={isBlogOpen}
                >
                  <span>Blogs</span>
                  <span className="toggle-icon">
                    {isBlogOpen ? "▲" : "▼"}
                  </span>
                </button>

                {isBlogOpen && (
                  <ul className="dropdown-menu">
                    <li>
                      <a href="#" onClick={closeAll}>
                        Blog
                      </a>
                    </li>
                  </ul>
                )}
              </li>

              {/* Contact */}
              <li>
                <a href="#" onClick={closeAll}>
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Sağ tərəf */}
          <div className="navRight">

            {/* Desktop axtarış */}
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
              {isSearchOpen ? (
                <FiX className="mobileSearchIcon" />
              ) : (
                <FiSearch className="mobileSearchIcon" />
              )}
            </button>

            {/* Upload */}
            <button
              type="button"
              className="uploadContainer desktop-upload"
            >
              <AiOutlineCloudUpload className="uploadIcon" />
              <span>Upload</span>
            </button>

            {/* Profil */}
            <button
              type="button"
              className="user"
              aria-label="User profile"
            >
              <FaUserCircle className="userIcon" />
            </button>
          </div>
        </div>

        {/* Mobil axtarış paneli */}
        {isSearchOpen && (
          <div className="mobile-search-dropdown">
            <div className="mobile-search-box">
              <input
                type="search"
                placeholder="Search..."
                className="mobile-search-input"
                aria-label="Search movies"
              />

              <FiSearch className="mobile-search-btn-icon" />
            </div>
          </div>
        )}
      </header>
    </>
  );
};
