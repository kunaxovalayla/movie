import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

import logoImg from "../assets/images/image.jpg";

import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const closeAll = () => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    setIsMobileMenuOpen(false);
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

              {/* Movies — Artıq tək və sadə linkdir, dropdown yoxdur */}
              <li>
                <Link to="/movies" onClick={closeAll}>
                  Movies
                </Link>
              </li>

              <li>
                <Link to="/blog" onClick={closeAll}>
                  Blog
                </Link>
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
            <div className="mobile-search-box">
              <FiSearch className="mobile-search-icon" />
              <input
                type="search"
                placeholder="Search movies..."
                className="mobile-search-input"
                aria-label="Search movies"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Escape") closeAll();
                }}
              />
            </div>
          </div>
        )}
      </header>
    </>
  );
};