import React from 'react';
import styles from './ProductCard.module.css';

export default function ProductCard({ image, name, price, onClick, showPrice = true }) {
  return (
    <div className={styles.card} onClick={onClick} style={{ cursor: 'pointer' }}>
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        {showPrice && <div className={styles.price}>{price}</div>}
      </div>
    </div>
  );
} 