import React, { useState } from 'react';
import styles from './TierSelector.module.css';

export default function TierSelector({ className = '', style = {}, initialTier = 'standard', onTierChange }) {
  const [tier, setTier] = useState(initialTier);
  const tiers = [
    {
      key: 'standard',
      label: 'Standard Case',
      price: '$49.99',
      icon: '🛡️',
      description: (
        <>
          <div className={styles.tierTitle}>
            🛡️ Standard Case – $49.99
          </div>
          <div className={styles.tierSubtitle}>
            Perfect for those who want quality with personal flair.
          </div>
          <ul className={styles.tierList}>
            <li>High-quality shock-absorbing TPU material</li>
            <li>Precision-fit for your Dracaryx phone, tablet, or laptop</li>
            <li>Long-lasting UV print based on your uploaded design</li>
            <li>Matte or glossy finish</li>
            <li>Delivered in eco-friendly packaging</li>
          </ul>
        </>
      ),
    },
    {
      key: 'ultra',
      label: 'Ultra Premium Case',
      price: '$79.99',
      icon: '🔥',
      description: (
        <>
          <div className={styles.tierTitle}>
            🔥 Ultra Premium Case – $79.99
          </div>
          <div className={styles.tierSubtitle}>
            Built for those who demand elite craftsmanship and aesthetics.
          </div>
          <ul className={styles.tierList}>
            <li>Hybrid construction (aluminum frame + TPU interior)</li>
            <li>Ultra-resistant coating with 4K laser-printed design</li>
            <li>Custom metallic Dracaryx emblem included</li>
            <li>Anti-slip, anti-scratch, fingerprint-resistant surface</li>
            <li>Includes soft velvet pouch & certificate of authenticity</li>
          </ul>
        </>
      ),
    },
  ];

  const handleTierChange = (key) => {
    setTier(key);
    if (onTierChange) onTierChange(key);
  };

  return (
    <aside className={`${styles.tierSelector} ${className}`} style={style}>
      <div className={styles.header}>
        <span role="img" aria-label="settings">⚙️</span> Choose Your Tier
      </div>
      <div className={styles.toggleRow}>
        {tiers.map(t => (
          <button
            key={t.key}
            onClick={() => handleTierChange(t.key)}
            className={tier === t.key ? styles.active : ''}
            type="button"
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>
      <div className={styles.tierContent}>
        {tiers.find(t => t.key === tier)?.description}
      </div>
    </aside>
  );
} 