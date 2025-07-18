import React from 'react';
import styles from './Navbar.module.css';
import logo from '../assets/dracaryx-logo.svg';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="Dracaryx Logo" />
      </Link>
      <div className={styles.links}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/shop" className={styles.link}>Shop</Link>
        <Link to="/custom-case" className={styles.link}>Custom Case</Link>
        <Link to="/repair" className={styles.link}>Repair</Link>
        <Link to="/contact-us" className={styles.link}>Contact us</Link>
      </div>
    </nav>
  );
} 