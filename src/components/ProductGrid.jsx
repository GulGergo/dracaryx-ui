import React, { useState, useEffect } from 'react';
import styles from './ProductGrid.module.css';
import ProductCard from './ProductCard';
import dracaryxVanta from '../assets/dracaryx-vanta.png';
import dracaryxAzura from '../assets/dracaryx-azura.png';
import dracaryxIgnis from '../assets/dracaryx-ignis.png';
import dracaryxUmbra from '../assets/dracaryx-umbra.png';
import dracaryxNoxveil from '../assets/dracaryx-noxveil.png';
import dracaryxSolstrix from '../assets/dracaryx-solstrix.png';
import dracaryxAetherion from '../assets/dracaryx-aetherion.png';
import dracaryxPyros from '../assets/dracaryx-pyros.png';

const phoneProducts = [
  {
    name: 'Dracaryx Vanta',
    price: '$1,499',
    image: dracaryxVanta,
    details: {
      subtitle: '🔥 The Shadowborn Flagship',
      description: 'Dracaryx Vanta is a performance monster clad in black-red armor. Every element draws from the darkness, accepting no compromise. Powered by the world\'s first ShadowCoreX architecture - brutal speed and ultra-low power consumption.',
      specs: [
        { label: 'Display', value: '6.8" WQHD+ AMOLED, 144Hz, HDR10+' },
        { label: 'Processor', value: 'Dragonbyte X9 QuantumCore (5nm)' },
        { label: 'RAM', value: '18GB LPDDR6X' },
        { label: 'Storage', value: '1TB UFS 4.0' },
        { label: 'Rear Camera', value: '108MP main (f/1.6, OIS), 16MP ultra-wide (125°), 12MP periscope zoom (5x optical)' },
        { label: 'Front Camera', value: '24MP (hidden under display)' },
        { label: 'Battery', value: '6000 mAh, 120W fast charging, 50W wireless' },
        { label: 'Audio', value: 'Quad Sonic Reactor speakers, Dolby Atmos' },
        { label: 'OS', value: 'DracOS 2.0 (Vaultify skin, based on Android 14)' },
        { label: 'Other', value: 'IP68, Gorilla Armor Glass, active cooling, RGB strip' },
      ],
    },
  },
  {
    name: 'Dracaryx Azura',
    price: '$899',
    image: dracaryxAzura,
    details: {
      subtitle: '🔵 The Skytech Pioneer',
      description: 'Blue-tinged elegance and precision. Dracaryx Azura is a future-oriented model that embodies the balance of speed, energy efficiency, and aesthetics. Minimalist yet refined tech in your hand.',
      specs: [
        { label: 'Display', value: '6.6" FHD+ AMOLED, 120Hz, Always-On' },
        { label: 'Processor', value: 'CryoWave 8 FusionChip (6nm)' },
        { label: 'RAM', value: '12GB LPDDR6' },
        { label: 'Storage', value: '512GB UFS 3.2' },
        { label: 'Rear Camera', value: '64MP main (f/1.8, EIS), 13MP ultra-wide' },
        { label: 'Front Camera', value: '32MP punch-hole' },
        { label: 'Battery', value: '4800 mAh, 66W fast charging' },
        { label: 'Audio', value: 'Hi-Res Dual stereo speakers' },
        { label: 'OS', value: 'DracOS 2.0 Lite' },
        { label: 'Other', value: 'IP67, light-sensitive illumination strip, biometric side sensor' },
      ],
    },
  },
  {
    name: 'Dracaryx Noxveil',
    price: '$1,599',
    image: dracaryxNoxveil,
    details: {
      subtitle: 'The Phantom Flame of Precision',
      description: 'Dracaryx Noxveil is an elegant, dark technological gem. The dragon shape on the back is not just decoration – it is a symbol of the device\'s power. This phone combines encrypted security, AI-driven features, and ultra-modern design.',
      specs: [
        { label: 'Display', value: '6.9" AMOLED FlexEdge, 144Hz' },
        { label: 'Processor', value: 'Dracaryx V-Core 9nm Octa 3.6GHz' },
        { label: 'RAM', value: '24GB LPDDR6X' },
        { label: 'Storage', value: '1TB UFS 4.0' },
        { label: 'Front Camera', value: '24MP AI cam' },
        { label: 'Rear Camera', value: 'Triple Cam System (108MP wide + 48MP ultra-wide + 12MP depth)' },
        { label: 'Battery', value: '6000 mAh, HyperCharge 150W' },
        { label: 'OS', value: 'Dracaryx OS 5.1' },
      ],
    },
  },
];

const tabletProducts = [
  {
    name: 'Dracaryx Ignis',
    price: '$1,199',
    image: dracaryxIgnis,
    details: {
      subtitle: '🔥🦾 Born from Flame. Built for Creation.',
      description: 'Dracaryx Ignis is a tech beast dipped in red. Designed for creative work, multitasking, or gaming sessions – the glowing dragon emblem on the back only enhances the experience.',
      specs: [
        { label: 'Display', value: '12.4" 2.8K AMOLED, 144Hz, HDR10+' },
        { label: 'Processor', value: 'Dragonbyte X8 OctaCore' },
        { label: 'RAM', value: '16GB LPDDR6' },
        { label: 'Storage', value: '1TB + microSD expansion' },
        { label: 'Rear Camera', value: 'Dual - 48MP + 12MP wide' },
        { label: 'Front Camera', value: '16MP center-aligned' },
        { label: 'Battery', value: '11000 mAh, 80W fast charging, 30W wireless' },
        { label: 'Audio', value: '6x Spatial Sonic Speaker' },
        { label: 'OS', value: 'DracTab OS 4.1 (Android based)' },
        { label: 'Extra', value: 'Stylus support, magnetic keyboard connector, glowing dragon logo' },
      ],
    },
  },
  {
    name: 'Dracaryx Aetherion',
    price: '$1,399',
    image: dracaryxAetherion,
    details: {
      subtitle: '🜂 Enlighten the Arcane. Command the Future.',
      description: 'Dracaryx Aetherion is a high-performance, futuristic tablet designed for creators, tech leaders, and future-oriented users. The legendary purple dragon pattern glows on the sleek grey body, symbolizing creativity and power.',
      specs: [
        { label: 'Display', value: '12.3" AMOLED HDR10+, 144Hz, 4K resolution' },
        { label: 'Processor', value: 'Dracaryx CoreX9 Octa 3.4GHz' },
        { label: 'RAM', value: '16GB LPDDR6' },
        { label: 'Storage', value: '1TB NVMe SSD' },
        { label: 'Rear Camera', value: '20MP AI Dual' },
        { label: 'Front Camera', value: '10MP' },
        { label: 'Battery', value: '12,000 mAh, fast charging (120W)' },
        { label: 'OS', value: 'Dracaryx OS 5.1' },
        { label: 'Special', value: 'DragonGlyph AI Pen support' },
      ],
    },
  },
];

const laptopProducts = [
  {
    name: 'Dracaryx Umbra',
    price: '$3,299',
    image: dracaryxUmbra,
    details: {
      subtitle: '⚙️ The Techno-Beast from the Shadows',
      description: 'A laptop you do not just look at, but fear. Dracaryx Umbra is a gamer and workstation hybrid, with a blue-glowing dragon on the back. Uncompromising performance - tuned to the max.',
      specs: [
        { label: 'Display', value: '17.3" 4K OLED, 240Hz, G-Sync, HDR1000' },
        { label: 'Processor', value: 'VaultiCore i9-XQ Extreme (16 cores - 5.6 GHz Turbo)' },
        { label: 'GPU', value: 'Nebula RTX 5090Ti Mobile Edition (32GB GDDR7)' },
        { label: 'RAM', value: '64GB DDR6 (expandable up to 128GB)' },
        { label: 'Storage', value: '2TB NVMe Gen5 SSD (RAID0)' },
        { label: 'Cooling', value: 'LiquidEdge Vapor Chamber Cooling' },
        { label: 'Keyboard', value: 'RGB mechanical, hot-swappable switches' },
        { label: 'Audio', value: '8.1 Dracaryx Spatial Sound' },
        { label: 'Battery', value: '99Wh, 180W USB-C PD charging' },
        { label: 'Extra', value: 'Glowing dragon emblem, AI adaptive performance control, AR headset support' },
      ],
    },
  },
  {
    name: 'Dracaryx Solstrix',
    price: '$2,799',
    image: dracaryxSolstrix,
    details: {
      subtitle: '⚡ Born from Stars, Forged for Power',
      description: 'Dracaryx Solstrix is a precisely crafted high-tech laptop, the perfect fusion of technological power and aesthetic elegance. The orange dragon pattern on the back almost pulses with energy – a true weapon in the digital arena.',
      specs: [
        { label: 'Display', value: '17.3" QLED, 240Hz, 4K UHD' },
        { label: 'Processor', value: 'Dracaryx Quantum i13X 5.0GHz' },
        { label: 'GPU', value: 'DragonFire RTX 5090' },
        { label: 'RAM', value: '64GB DDR6' },
        { label: 'Storage', value: '2TB NVMe Gen5 SSD' },
        { label: 'Battery', value: '100Wh, 240W fast charging' },
        { label: 'Cooling', value: 'CryoScale 3-phase intelligent cooling system' },
        { label: 'OS', value: 'Dracaryx OS 5.1' },
      ],
    },
  },
  {
    name: 'Dracaryx Pyros',
    price: '$3,699',
    image: dracaryxPyros,
    details: {
      subtitle: '🔴 🐉 Forged in Fire. Designed to Dominate.',
      limited: 'Limited Edition',
      description: 'The Dracaryx Pyros is a high-tech war machine wrapped in molten orange and accented with mystical turquoise hues. Built for creators, power users, and next-gen gamers, its glowing crimson dragon sigil on the back is more than design—it\'s a statement.',
      specs: [
        { label: 'Display', value: '16.5" 4K AMOLED, 240Hz, HDR10+' },
        { label: 'Processor', value: 'DracoFire i12X Hybrid Core' },
        { label: 'GPU', value: 'Dracaryx VX9800M (20GB GDDR7)' },
        { label: 'RAM', value: '64GB LPDDR6X' },
        { label: 'Storage', value: '2TB NVMe Gen5 SSD + Expansion Slot' },
        { label: 'Cooling', value: 'Dual CryoCore LiquidTech with AI thermal mapping' },
        { label: 'Keyboard', value: 'RGB mechanical (orange-turquoise), magnetic switch' },
        { label: 'Audio', value: '8x FlameForce Surround Speakers' },
        { label: 'Battery', value: '99Wh, 150W fast charge' },
        { label: 'Ports', value: '3x USB4, 2x Thunderbolt 5, 1x HDMI 2.2, microSD, 3.5mm jack' },
        { label: 'OS', value: 'DracOS Ultra 6.2 (Linux-based)' },
        { label: 'Extras', value: 'Backlit dragon emblem, DragonConnect cloud sync, biometric dragon-scale touchpad' },
      ],
    },
  },
];

function ProductModal({ product, onClose }) {
  if (!product) return null;
  const isMobile = window.innerWidth <= 600;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }} onClick={onClose}>
      <div style={{
        background: 'linear-gradient(135deg, #181828 80%, #23233a 100%)',
        borderRadius: 24,
        padding: isMobile ? '18px 8px' : '40px 48px',
        minWidth: isMobile ? 'unset' : 350,
        maxWidth: isMobile ? '98vw' : 800,
        width: isMobile ? '98vw' : 'auto',
        maxHeight: isMobile ? '98vh' : 'none',
        color: 'white',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 18 : 40,
        boxShadow: '0 12px 48px 0 rgba(0,0,0,0.55)',
        position: 'relative',
        alignItems: isMobile ? 'center' : 'flex-start',
        overflowY: isMobile ? 'auto' : 'unset',
      }} onClick={e => e.stopPropagation()}>
        <img src={product.image} alt={product.name} style={{
          width: isMobile ? 180 : 260,
          height: 'auto',
          borderRadius: 16,
          objectFit: 'contain',
          boxShadow: '0 4px 32px 0 rgba(0,0,0,0.25)',
          background: 'none',
          padding: 0,
          margin: 0,
          display: 'block',
        }} />
        <div style={{ flex: 1, minWidth: 0, width: isMobile ? '100%' : 'auto' }}>
          <h2 style={{ margin: 0, fontSize: isMobile ? 22 : 32, fontWeight: 700, letterSpacing: 1 }}>{product.name}</h2>
          {product.details?.subtitle && <div style={{ fontStyle: 'italic', color: '#ffb347', marginBottom: 12, fontSize: isMobile ? 15 : 18 }}>{product.details.subtitle}</div>}
          {product.details?.limited && (
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(90deg, #181828 70%, #23233a 100%)',
              color: '#F3F6FB',
              fontWeight: 800,
              fontSize: isMobile ? 13 : 16,
              borderRadius: 14,
              padding: isMobile ? '4px 12px' : '5px 22px',
              marginBottom: 14,
              marginLeft: 0,
              marginTop: 0,
              letterSpacing: 2,
              boxShadow: '0 2px 16px 0 #00BFFF33',
              border: '2px solid #00BFFF',
              textShadow: '0 1px 8px #00BFFF44',
              textTransform: 'uppercase',
              width: 'fit-content',
              letterSpacing: '0.15em',
            }}>{product.details.limited}</div>
          )}
          {product.details?.description && <div style={{ marginBottom: isMobile ? 12 : 20, fontSize: isMobile ? 14 : 16, lineHeight: 1.6 }}>{product.details.description}</div>}
          {product.details?.specs && (
            <ul style={{ paddingLeft: 18, margin: 0, fontSize: isMobile ? 13 : 15, lineHeight: 1.7 }}>
              {product.details.specs.map((spec, i) => (
                <li key={i}><b>{spec.label}:</b> {spec.value}</li>
              ))}
            </ul>
          )}
        </div>
        <button onClick={onClose} style={{ position: 'absolute', top: isMobile ? 10 : 24, right: isMobile ? 16 : 32, background: 'none', border: 'none', color: '#fff', fontSize: isMobile ? 26 : 32, cursor: 'pointer', fontWeight: 700, lineHeight: 1 }}>&times;</button>
      </div>
    </div>
  );
}

function PhoneCarousel({ products, onCardClick }) {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1: right, -1: left

  useEffect(() => {
    const timer = setTimeout(() => {
      setPrevIndex(index);
      setDirection(1);
      setIndex((prev) => (prev + 1) % products.length);
    }, 15000); // 15 másodperc
    return () => clearTimeout(timer);
  }, [index, products.length]);

  // For slide animation
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 420, position: 'relative' }}>
      <div style={{ position: 'relative', width: '100%', minHeight: 420, height: 'auto' }}>
        {products.map((product, i) => {
          let translateX = 0;
          if (i === index) translateX = 0;
          else if (i === prevIndex && index !== prevIndex) translateX = direction === 1 ? -100 : 100;
          else translateX = direction === 1 ? 100 : -100;
          return (
            <div
              key={product.name}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transition: 'transform 0.7s cubic-bezier(.77,0,.18,1), opacity 0.7s',
                transform: `translateX(${i === index ? 0 : (i === prevIndex ? (direction === 1 ? -100 : 100) : (direction === 1 ? 100 : -100))}%)`,
                opacity: i === index ? 1 : 0,
                zIndex: i === index ? 2 : 1,
                pointerEvents: i === index ? 'auto' : 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <ProductCard {...product} onClick={() => {
                setPrevIndex(index);
                setDirection(i > index ? 1 : -1);
                setIndex(i);
                if (onCardClick) onCardClick(product);
              }} />
            </div>
          );
        })}
      </div>
      {/* Navigation dots */}
      <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
        {products.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to ${products[i].name}`}
            aria-current={i === index ? 'true' : undefined}
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: i === index ? 'linear-gradient(90deg, #00BFFF 40%, #C6FF00 100%)' : '#b0b8c6',
              boxShadow: i === index ? '0 2px 8px 0 #00BFFF44' : 'none',
              transition: 'background 0.3s, box-shadow 0.3s',
              cursor: 'pointer',
              border: '2px solid #fff',
              outline: 'none',
              padding: 0,
            }}
            onClick={() => {
              setPrevIndex(index);
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
          />
        ))}
      </div>
    </div>
  );
}

function TabletCarousel({ products, onCardClick }) {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPrevIndex(index);
      setDirection(1);
      setIndex((prev) => (prev + 1) % products.length);
    }, 15000);
    return () => clearTimeout(timer);
  }, [index, products.length]);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 420, position: 'relative' }}>
      <div style={{ position: 'relative', width: '100%', minHeight: 420, height: 'auto' }}>
        {products.map((product, i) => {
          let translateX = 0;
          if (i === index) translateX = 0;
          else if (i === prevIndex && index !== prevIndex) translateX = direction === 1 ? -100 : 100;
          else translateX = direction === 1 ? 100 : -100;
          return (
            <div
              key={product.name}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transition: 'transform 0.7s cubic-bezier(.77,0,.18,1), opacity 0.7s',
                transform: `translateX(${i === index ? 0 : (i === prevIndex ? (direction === 1 ? -100 : 100) : (direction === 1 ? 100 : -100))}%)`,
                opacity: i === index ? 1 : 0,
                zIndex: i === index ? 2 : 1,
                pointerEvents: i === index ? 'auto' : 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <ProductCard {...product} onClick={() => {
                setPrevIndex(index);
                setDirection(i > index ? 1 : -1);
                setIndex(i);
                if (onCardClick) onCardClick(product);
              }} />
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
        {products.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to ${products[i].name}`}
            aria-current={i === index ? 'true' : undefined}
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: i === index ? 'linear-gradient(90deg, #00BFFF 40%, #C6FF00 100%)' : '#b0b8c6',
              boxShadow: i === index ? '0 2px 8px 0 #00BFFF44' : 'none',
              transition: 'background 0.3s, box-shadow 0.3s',
              cursor: 'pointer',
              border: '2px solid #fff',
              outline: 'none',
              padding: 0,
            }}
            onClick={() => {
              setPrevIndex(index);
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
          />
        ))}
      </div>
    </div>
  );
}

function LaptopCarousel({ products, onCardClick }) {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPrevIndex(index);
      setDirection(1);
      setIndex((prev) => (prev + 1) % products.length);
    }, 15000);
    return () => clearTimeout(timer);
  }, [index, products.length]);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 420, position: 'relative' }}>
      <div style={{ position: 'relative', width: '100%', minHeight: 420, height: 'auto' }}>
        {products.map((product, i) => {
          let translateX = 0;
          if (i === index) translateX = 0;
          else if (i === prevIndex && index !== prevIndex) translateX = direction === 1 ? -100 : 100;
          else translateX = direction === 1 ? 100 : -100;
          return (
            <div
              key={product.name}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transition: 'transform 0.7s cubic-bezier(.77,0,.18,1), opacity 0.7s',
                transform: `translateX(${i === index ? 0 : (i === prevIndex ? (direction === 1 ? -100 : 100) : (direction === 1 ? 100 : -100))}%)`,
                opacity: i === index ? 1 : 0,
                zIndex: i === index ? 2 : 1,
                pointerEvents: i === index ? 'auto' : 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <ProductCard {...product} onClick={() => {
                setPrevIndex(index);
                setDirection(i > index ? 1 : -1);
                setIndex(i);
                if (onCardClick) onCardClick(product);
              }} />
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
        {products.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to ${products[i].name}`}
            aria-current={i === index ? 'true' : undefined}
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: i === index ? 'linear-gradient(90deg, #00BFFF 40%, #C6FF00 100%)' : '#b0b8c6',
              boxShadow: i === index ? '0 2px 8px 0 #00BFFF44' : 'none',
              transition: 'background 0.3s, box-shadow 0.3s',
              cursor: 'pointer',
              border: '2px solid #fff',
              outline: 'none',
              padding: 0,
            }}
            onClick={() => {
              setPrevIndex(index);
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProductGrid({ modalProduct: externalModalProduct, onClose: externalOnClose, onProductClick }) {
  const [modalProduct, setModalProduct] = useState(null);
  const handleCardClick = (product) => {
    if (onProductClick) {
      onProductClick(product);
    } else if (product.details) {
      setModalProduct(product);
    }
  };
  const showModal = externalModalProduct !== undefined ? externalModalProduct : modalProduct;
  const handleClose = externalOnClose !== undefined ? externalOnClose : () => setModalProduct(null);
  return (
    <>
      {showModal && <ProductModal product={showModal} onClose={handleClose} />}
      <div className={styles.productGridRow}>
        <div className={styles.productColumn}>
          <h2>Phones</h2>
          <PhoneCarousel products={phoneProducts} onCardClick={handleCardClick} />
        </div>
        <div className={styles.productColumn}>
          <h2>Tablets</h2>
          <TabletCarousel products={tabletProducts} onCardClick={handleCardClick} />
        </div>
        <div className={styles.productColumn}>
          <h2>Laptops</h2>
          <LaptopCarousel products={laptopProducts} onCardClick={handleCardClick} />
        </div>
      </div>
    </>
  );
}

export { phoneProducts, tabletProducts, laptopProducts };
export { ProductModal, PhoneCarousel, TabletCarousel, LaptopCarousel }; 