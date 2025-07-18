import React, { useState } from 'react';
import styles from './Navbar.module.css';
import logo from '../assets/dracaryx-logo.svg';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = window.innerWidth <= 600;

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="Dracaryx Logo" />
      </Link>
      {isMobile ? (
        <>
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Open menu"
          >
            <span className={styles.hamburgerIcon}>☰</span>
          </button>
          {menuOpen && (
            <div className={styles.mobileMenuOverlay} onClick={() => setMenuOpen(false)}>
              <div className={styles.mobileMenu} onClick={e => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={() => setMenuOpen(false)} aria-label="Close menu">×</button>
                <Link to="/" className={styles.link} onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/shop" className={styles.link} onClick={() => setMenuOpen(false)}>Shop</Link>
                <Link to="/custom-case" className={styles.link} onClick={() => setMenuOpen(false)}>Custom Case</Link>
                <Link to="/repair" className={styles.link} onClick={() => setMenuOpen(false)}>Repair</Link>
                <Link to="/contact-us" className={styles.link} onClick={() => setMenuOpen(false)}>Contact us</Link>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className={styles.links}>
          <Link to="/" className={styles.link}>Home</Link>
          <Link to="/shop" className={styles.link}>Shop</Link>
          <Link to="/custom-case" className={styles.link}>Custom Case</Link>
          <Link to="/repair" className={styles.link}>Repair</Link>
          <Link to="/contact-us" className={styles.link}>Contact us</Link>
        </div>
      )}
    </nav>
  );
} 