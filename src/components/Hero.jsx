import React from 'react';
import styles from './Hero.module.css';
import { useNavigate } from 'react-router-dom';

export function HeroText() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.headline}>Crafted by Myth. Perfected by Technology.</h1>
      <div className={styles.subheading}>
        Discover phones, tablets, and laptops forged in fire—customized your way, protected by dragonhide.
      </div>
    </section>
  );
}

export function ShopNowButton() {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '32px 0' }}>
      <button className={styles.cta} onClick={() => navigate('/shop')}>Shop Now</button>
    </div>
  );
} 