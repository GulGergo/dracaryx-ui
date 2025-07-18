import React, { useState } from 'react';
import styles from './ProductGrid.module.css';
import {
  phoneProducts,
  tabletProducts,
  laptopProducts,
} from './ProductGrid';
import ProductCard from './ProductCard';

const categories = [
  { key: 'phones', label: 'Phones', products: phoneProducts },
  { key: 'tablets', label: 'Tablets', products: tabletProducts },
  { key: 'laptops', label: 'Laptops', products: laptopProducts },
];

export default function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('phones');
  const [search, setSearch] = useState('');
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleCardClick = (product) => {
    if (product.details) {
      setSelectedProduct(product);
      setDetailsOpen(true);
    }
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setTimeout(() => setSelectedProduct(null), 400); // match animation duration
  };

  let filteredProducts;
  if (search.trim() === '') {
    const currentCategory = categories.find(c => c.key === selectedCategory);
    filteredProducts = currentCategory.products;
  } else {
    const query = search.trim().toLowerCase();
    filteredProducts = categories.flatMap(c => c.products).filter(product => {
      const name = product.name?.toLowerCase() || '';
      const desc = product.details?.description?.toLowerCase() || '';
      return query.length > 0 && (name.indexOf(query) !== -1 || desc.indexOf(query) !== -1);
    });
  }

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'flex-start', background: 'none', position: 'relative' }}>
      {/* Kategória blokk abszolút pozícióban a logó alatt */}
      <div className="shop-categories-block" style={{
        position: 'absolute',
        left: -600,
        top: 150,
        zIndex: 10,
        width: 220,
        background: 'none',
      }}>
        <h2 style={{ fontSize: 24, marginBottom: 24, textAlign: 'center' }}>Categories</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: 32 }}>
          {categories.map(cat => (
            <li key={cat.key} style={{ margin: 0 }}>
              <button
                style={{
                  width: '100%',
                  padding: '12px 0',
                  margin: 0,
                  background: selectedCategory === cat.key ? 'var(--color-accent-1)' : 'rgba(255,255,255,0.08)',
                  color: selectedCategory === cat.key ? '#222' : '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 18,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onClick={() => setSelectedCategory(cat.key)}
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="shop-search-block" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', width: '100%', marginTop: 32 }}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 8,
              border: '1px solid #ccc',
              fontSize: 16,
              background: '#222',
              color: '#fff',
            }}
          />
        </div>
      </div>
      {/* Fő tartalom: Shop felirat és termékek gridje */}
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: -100, flex: 20, alignItems: 'flex-start' }}>
        <div className="shop-products-block" style={{ marginTop: 130 }}>
          <div className={styles.grid} style={{ justifyContent: 'flex-start' }}>
            {filteredProducts.map(product => (
              <ProductCard key={product.name} {...product} onClick={() => handleCardClick(product)} />
            ))}
          </div>
        </div>
      </div>
      {/* Product Details Panel (slide-in) */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: detailsOpen && selectedProduct ? 600 : 0,
          background: 'linear-gradient(120deg, #181828 80%, #23233a 100%)',
          boxShadow: detailsOpen && selectedProduct ? '-8px 0 32px 0 rgba(0,0,0,0.25)' : 'none',
          color: '#fff',
          zIndex: 2000,
          overflow: 'hidden',
          transition: 'width 0.5s cubic-bezier(.77,0,.18,1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        {selectedProduct && (
          <div style={{ opacity: detailsOpen ? 1 : 0, transition: 'opacity 0.3s 0.2s', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <button
              onClick={handleCloseDetails}
              style={{ position: 'absolute', top: 24, right: 32, background: 'none', border: 'none', color: '#fff', fontSize: 32, cursor: 'pointer', fontWeight: 700, lineHeight: 1, zIndex: 10 }}
            >
              &times;
            </button>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', height: '100%', padding: '64px 40px 40px 40px', gap: 40 }}>
              <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: 260, height: 'auto', borderRadius: 16, objectFit: 'contain', boxShadow: '0 4px 32px 0 rgba(0,0,0,0.25)', background: 'none', padding: 0, margin: 0, display: 'block' }} />
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <h2 style={{ margin: 0, fontSize: 32, fontWeight: 700, letterSpacing: 1 }}>{selectedProduct.name}</h2>
                {selectedProduct.details?.subtitle && <div style={{ fontStyle: 'italic', color: '#ffb347', marginBottom: 12, fontSize: 18 }}>{selectedProduct.details.subtitle}</div>}
                {selectedProduct.details?.description && <div style={{ marginBottom: 20, fontSize: 16, lineHeight: 1.6 }}>{selectedProduct.details.description}</div>}
                {selectedProduct.details?.specs && (
                  <ul style={{ paddingLeft: 18, margin: 0, fontSize: 15, lineHeight: 1.7 }}>
                    {selectedProduct.details.specs.map((spec, i) => (
                      <li key={i}><b>{spec.label}:</b> {spec.value}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 