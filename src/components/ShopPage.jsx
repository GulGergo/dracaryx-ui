import React, { useState, useRef, useEffect } from 'react';
import styles from './ProductGrid.module.css';
import {
  phoneProducts,
  tabletProducts,
  laptopProducts,
  ProductModal,
  // ProductCard is külön importálandó
} from './ProductGrid';
import ProductCard from './ProductCard';
import ProductSlidePanel from './ProductSlidePanel';
import TierSelector from './TierSelector';
import { useNavigate } from 'react-router-dom';

const categories = [
  { key: 'phones', label: 'Phones', products: phoneProducts },
  { key: 'tablets', label: 'Tablets', products: tabletProducts },
  { key: 'laptops', label: 'Laptops', products: laptopProducts },
];

// Warranty opciók
const WARRANTY_OPTIONS = [
  { key: 'standard', label: 'Standard 1 year (included)', price: 0 },
  { key: 'plus1', label: '+1 year (total 2 years)', price: 99 },
  { key: 'plus2', label: '+2 years (total 3 years)', price: 169 },
];

// Shipping opciók
const SHIPPING_OPTIONS = [
  { key: 'regular', label: 'Regular (free, 5–8 days)', price: 0 },
  { key: 'express', label: 'Express ($19, 1–3 days, door-to-door)', price: 19 },
];

export default function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('phones');
  const [search, setSearch] = useState('');
  const [animating, setAnimating] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutAnimating, setCheckoutAnimating] = useState(false);
  const [selectedWarranty, setSelectedWarranty] = useState('standard');
  const [selectedShipping, setSelectedShipping] = useState('regular');
  const listRef = useRef();
  const detailsRef = useRef();
  const checkoutRef = useRef();
  const navigate = useNavigate();
  const textContentRef = useRef(null);
  const [imageHeight, setImageHeight] = useState(null);
  // Manuális kép pozíció állítás
  const imageMarginLeft = 0; // px-ben állítható
  const imageMarginRight = 0; // px-ben állítható

  useEffect(() => {
    if (detailsOpen && textContentRef.current) {
      setTimeout(() => {
        setImageHeight(textContentRef.current.offsetHeight);
      }, 50);
    }
  }, [detailsOpen, selectedProduct]);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setDetailsOpen(true);
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
    }, 700);
  };

  const handleBack = () => {
    setAnimating(true);
    setTimeout(() => {
      setDetailsOpen(false);
      setSelectedProduct(null);
      setAnimating(false);
    }, 700);
  };

  const handleCheckoutBack = () => {
    setCheckoutAnimating(true);
    setTimeout(() => {
      setCheckoutOpen(false);
      setCheckoutAnimating(false);
    }, 700);
  };

  const handleBuyNow = () => {
    setCheckoutOpen(true);
    setCheckoutAnimating(true);
    setTimeout(() => {
      setCheckoutAnimating(false);
    }, 700);
  };

  let filteredProducts;
  if (search.trim() === '') {
    // Nincs keresés, csak a kiválasztott kategória termékei
    const currentCategory = categories.find(c => c.key === selectedCategory);
    filteredProducts = currentCategory.products;
  } else {
    // Keresés: minden kategória termékei között keresünk
    const query = search.trim().toLowerCase();
    filteredProducts = categories.flatMap(c => c.products).filter(product => {
      const name = product.name?.toLowerCase() || '';
      const desc = product.details?.description?.toLowerCase() || '';
      return query.length > 0 && (name.indexOf(query) !== -1 || desc.indexOf(query) !== -1);
    });
  }

  // Warranty ár lekérdezése
  const getWarrantyPrice = () => {
    const found = WARRANTY_OPTIONS.find(w => w.key === selectedWarranty);
    return found ? found.price : 0;
  };

  // Shipping ár lekérdezése
  const getShippingPrice = () => {
    const found = SHIPPING_OPTIONS.find(s => s.key === selectedShipping);
    return found ? found.price : 0;
  };

  // Termék ár számítása (számként)
  const getProductPrice = () => {
    if (!selectedProduct?.price) return 0;
    // Pl. "$1,499" -> 1499
    return Number(selectedProduct.price.replace(/[^\d.]/g, '').replace(/,/g, ''));
  };

  // Összesített ár
  const totalPrice = getProductPrice() + getWarrantyPrice() + getShippingPrice();

  const isMobile = window.innerWidth <= 600;
  const isTablet = window.innerWidth > 600 && window.innerWidth <= 900;

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'stretch' : 'flex-start',
      background: 'none',
      position: 'relative',
    }}>
      {/* Categories blokk desktopon bal oldalon, mobilon felül */}
      {(!detailsOpen && !checkoutOpen && (!isMobile && (isTablet || !isTablet))) && (
        <div
          className="shop-categories-block"
          style={{
            position: 'fixed',
            left: 32,
            top: '66%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: isTablet ? 140 : 220,
            background: 'none',
            marginLeft: isTablet ? 24 : 80,
            marginRight: isTablet ? 12 : 32,
            minHeight: '100vh',
            height: '100vh',
            alignSelf: 'flex-start',
          }}
        >
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
                maxWidth: '100%',
                boxSizing: 'border-box',
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
      )}
      {/* Mobilon a Categories blokk a fő tartalom előtt */}
      {(!detailsOpen && !checkoutOpen && isMobile) && (
        <div
          className="shop-categories-block"
          style={{
            position: 'static',
            width: '100%',
            left: 0,
            top: 0,
            zIndex: 10,
            background: 'none',
            marginBottom: 16,
            margin: '0 auto',
            padding: 0,
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontSize: 24, marginBottom: 24, textAlign: 'left' }}>Categories</h2>
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
                maxWidth: '100%',
                boxSizing: 'border-box',
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
      )}
      {/* Terméklista animációval */}
      <div
        ref={listRef}
        style={{
          flex: 1,
          minWidth: 0,
          width: '100%',
          overflow: 'hidden',
          marginLeft: !isMobile && !isTablet ? 220 : 0,
          marginTop: isTablet ? 300 : 0,
        }}
      >
        <div className="shop-products-block" style={{ marginTop: isMobile ? 16 : 130, width: '100%' }}>
          <div className={styles.grid} style={{ width: '100%' }}>
            {filteredProducts.map(product => (
              <ProductCard key={product.name} {...product} onClick={() => handleCardClick(product)} />
            ))}
          </div>
        </div>
      </div>
      {/* Termék részletek animációval - csak ha nincs checkoutOpen */}
      {!checkoutOpen && (
        <div
          ref={detailsRef}
          style={{
            position: !detailsOpen ? 'absolute' : 'relative',
            right: 0,
            top: 0,
            width: '100%',
            opacity: animating && detailsOpen ? 0 : detailsOpen ? 1 : 0,
            transform: animating && detailsOpen ? 'translateX(160px)' : detailsOpen ? 'translateX(0)' : 'translateX(160px)',
            pointerEvents: detailsOpen ? 'auto' : 'none',
            transition: 'opacity 0.7s cubic-bezier(.77,0,.18,1), transform 0.7s cubic-bezier(.77,0,.18,1)',
            zIndex: detailsOpen ? 2 : 1,
            minHeight: 600,
            display: detailsOpen ? 'block' : 'none',
            background: 'none',
          }}
        >
          {detailsOpen && selectedProduct && (
            <>
              <button onClick={handleBack} style={{ position: 'absolute', left: 0, top: 0, background: 'none', color: '#00BFFF', border: 'none', fontSize: 18, fontWeight: 700, cursor: 'pointer', padding: 0, margin: 0, zIndex: 10 }}>&larr; Back</button>
              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'center' : 'stretch',
                justifyContent: 'center',
                gap: isMobile ? 16 : 48,
                margin: isMobile ? '32px 0 16px 0' : '80px auto 32px auto',
                maxWidth: isMobile ? '98vw' : 1100,
                width: '100%',
                flexWrap: 'wrap',
              }}>
                {/* Bal oldal: kép */}
                <div style={{
                  minWidth: 0,
                  maxWidth: isMobile ? '90vw' : isTablet ? 'calc(100vw - 48px)' : 900,
                  flex: isMobile ? 'unset' : '1 1 320px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginLeft: isTablet ? 24 : isMobile ? 0 : `-100px`,
                  marginRight: isTablet ? 24 : isMobile ? 0 : `200px`,
                }}>
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    style={{
                      width: isMobile ? '90vw' : '800px',
                      maxWidth: isMobile ? '90vw' : '800px',
                      height: isMobile ? 'auto' : '800px',
                      maxHeight: isMobile ? 220 : '800px',
                      objectFit: 'contain',
                      borderRadius: 20,
                      background: 'none',
                    }}
                  />
                </div>
                {/* Jobb oldal: szöveges tartalom */}
                <div ref={textContentRef} style={{ flex: '2 1 400px', minWidth: 320, maxWidth: 700, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ width: '100%' }}>
                    <h2 style={{ margin: 0, fontSize: 38, fontWeight: 800, letterSpacing: 1, color: '#fff', textAlign: 'left' }}>{selectedProduct.name}</h2>
                    {selectedProduct.details?.subtitle && (
                      <div style={{ fontStyle: 'italic', color: '#ffb347', marginBottom: 18, fontSize: 22, textAlign: 'left' }}>{selectedProduct.details.subtitle}</div>
                    )}
                    {selectedProduct.details?.description && (
                      <div style={{
                        marginBottom: 32,
                        fontSize: 20,
                        lineHeight: 1.7,
                        color: '#e3e8f0',
                        fontWeight: 500,
                        letterSpacing: 0.1,
                        textAlign: 'left',
                        maxWidth: 700,
                        borderRadius: 0,
                        background: 'none',
                        boxShadow: 'none',
                        padding: 0,
                      }}>{selectedProduct.details.description}</div>
                    )}
                    {selectedProduct.details?.specs && (
                      <ul style={{ paddingLeft: 18, margin: 0, fontSize: 16, lineHeight: 1.7, color: '#fff', maxWidth: 600, textAlign: 'left' }}>
                        {selectedProduct.details.specs.map((spec, i) => (
                          <li key={i}><b>{spec.label}:</b> {spec.value}</li>
                        ))}
                      </ul>
                    )}
                    {/* ÁR megjelenítése a specifikációk alatt */}
                    {selectedProduct.price && (
                      <div style={{
                        margin: '32px 0 0 0',
                        fontSize: 28,
                        fontWeight: 800,
                        color: '#C6FF00',
                        letterSpacing: 1,
                        textAlign: 'left',
                        textShadow: '0 2px 12px #222, 0 1px 0 #fff',
                        maxWidth: 600,
                      }}>
                        {selectedProduct.price}
                      </div>
                    )}
                  </div>
                  {/* Gombok alul */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    gap: 32,
                    marginTop: 40,
                    marginBottom: 24,
                  }}>
                    <button
                      style={{
                        background: 'linear-gradient(90deg, #00BFFF 40%, #C6FF00 100%)',
                        color: '#181828',
                        fontWeight: 800,
                        fontSize: 20,
                        border: 'none',
                        borderRadius: 12,
                        padding: '16px 36px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 16px 0 #00BFFF44',
                        transition: 'background 0.2s',
                      }}
                      onClick={handleBuyNow}
                    >
                      Buy now
                    </button>
                    <button
                      style={{
                        background: 'linear-gradient(90deg, #23233a 40%, #181828 100%)',
                        color: '#C6FF00',
                        fontWeight: 800,
                        fontSize: 20,
                        border: '2px solid #C6FF00',
                        borderRadius: 12,
                        padding: '16px 36px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 16px 0 #C6FF0044',
                        transition: 'background 0.2s',
                      }}
                      onClick={() => navigate('/custom-case')}
                    >
                      Customize Case
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      {/* CHECKOUT PANEL - ugyanaz a flow, animáció, stílus mint a részletező panelnél */}
      {checkoutOpen && (
        <div
          ref={checkoutRef}
          style={{
            position: 'relative',
            right: 0,
            top: 0,
            width: '100%',
            opacity: checkoutAnimating && checkoutOpen ? 0 : checkoutOpen ? 1 : 0,
            transform: checkoutAnimating && checkoutOpen ? 'translateX(160px)' : checkoutOpen ? 'translateX(0)' : 'translateX(160px)',
            pointerEvents: checkoutOpen ? 'auto' : 'none',
            transition: 'opacity 0.7s cubic-bezier(.77,0,.18,1), transform 0.7s cubic-bezier(.77,0,.18,1)',
            zIndex: checkoutOpen ? 2 : 1,
            minHeight: 600,
            display: checkoutOpen ? 'block' : 'none',
            background: 'none',
          }}
        >
          <button onClick={handleCheckoutBack} style={{ position: 'absolute', left: 0, top: 0, background: 'none', color: '#00BFFF', border: 'none', fontSize: 18, fontWeight: 700, cursor: 'pointer', padding: 0, margin: 0, zIndex: 10 }}>&larr; Back</button>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32, marginTop: 40 }}>
            <h2 style={{ margin: 0, fontSize: 42, fontWeight: 800, letterSpacing: 1, textAlign: 'center', color: '#fff' }}>Checkout</h2>
            <div style={{ margin: '18px 0 0 0', fontSize: 28, color: '#C6FF00', fontWeight: 800, textAlign: 'center', letterSpacing: 1 }}>{selectedProduct?.name}</div>
          </div>
          {/* Fő tartalom: kép + árak egymás mellett */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'center',
            alignItems: isMobile ? 'center' : 'flex-start',
            gap: isMobile ? 16 : 40,
            maxWidth: isMobile ? '98vw' : 900,
            margin: isMobile ? '0 auto 24px auto' : '0 auto 36px auto',
            width: '100%',
          }}>
            {/* Bal oldal: termék kép */}
            <div style={{ minWidth: 0, maxWidth: isMobile ? '90vw' : 320, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {selectedProduct?.image && (
                <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: isMobile ? '90vw' : 260, height: isMobile ? 'auto' : 'auto', maxHeight: isMobile ? 180 : 'none', borderRadius: 16, objectFit: 'contain', background: 'none', marginBottom: 0 }} />
              )}
            </div>
            {/* Jobb oldal: árak, warranty, total */}
            <div style={{ flex: 1, minWidth: 260, background: 'rgba(30,40,80,0.10)', borderRadius: 16, padding: 32, color: '#fff', fontWeight: 600, fontSize: 20, boxShadow: '0 2px 12px 0 #00BFFF22', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontWeight: 700 }}>Product price</span>
                <span style={{ fontWeight: 700 }}>{selectedProduct?.price}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontWeight: 700 }}>Warranty ({
                  WARRANTY_OPTIONS.find(w => w.key === selectedWarranty)?.label.match(/\d+/)?.[0] || '1'
                } yrs)</span>
                <span style={{ color: '#C6FF00', fontWeight: 700 }}>+{getWarrantyPrice()}</span>
              </div>
              <div style={{ color: '#C6FF00', fontWeight: 800, fontSize: 18, marginBottom: 6 }}>
                {WARRANTY_OPTIONS.find(w => w.key === selectedWarranty)?.label}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontWeight: 700 }}>Shipping</span>
                <span style={{ color: getShippingPrice() > 0 ? '#C6FF00' : '#fff', fontWeight: 700 }}>{getShippingPrice() > 0 ? `+$${getShippingPrice()}` : 'Free'}</span>
              </div>
              <div style={{ borderTop: '1px solid #444', margin: '16px 0 10px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 28, fontWeight: 900, color: '#C6FF00', marginTop: 8 }}>
                <span>Total:</span>
                <span>${totalPrice}</span>
              </div>
            </div>
          </div>
          {/* Warranty opciók */}
          <div style={{ maxWidth: 500, margin: '0 auto 32px auto', width: '100%' }}>
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 10, color: '#C6FF00' }}>Warranty Options</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {WARRANTY_OPTIONS.map(opt => (
                <label key={opt.key} style={{ display: 'flex', alignItems: 'center', fontSize: 17, fontWeight: 600, color: '#fff', background: selectedWarranty === opt.key ? 'rgba(198,255,0,0.10)' : 'none', borderRadius: 8, padding: '8px 12px', cursor: 'pointer', border: selectedWarranty === opt.key ? '2px solid #C6FF00' : '2px solid transparent', transition: 'border 0.2s' }}>
                  <input
                    type="radio"
                    name="warranty"
                    value={opt.key}
                    checked={selectedWarranty === opt.key}
                    onChange={() => setSelectedWarranty(opt.key)}
                    style={{ marginRight: 12 }}
                  />
                  {opt.label}
                  {opt.price > 0 && <span style={{ color: '#C6FF00', marginLeft: 8 }}>+${opt.price}</span>}
                </label>
              ))}
            </div>
          </div>
          {/* Shipping opciók */}
          <div style={{ marginTop: 18, maxWidth: 500, marginLeft: 'auto', marginRight: 'auto', marginBottom: 32 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Shipping options:</div>
            {SHIPPING_OPTIONS.map(opt => (
              <label key={opt.key} style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#fff', background: selectedShipping === opt.key ? 'rgba(0,191,255,0.10)' : 'none', borderRadius: 8, padding: '8px 12px', cursor: 'pointer', border: selectedShipping === opt.key ? '2px solid #00BFFF' : '2px solid transparent', transition: 'border 0.2s' }}>
                <input
                  type="radio"
                  name="shipping"
                  value={opt.key}
                  checked={selectedShipping === opt.key}
                  onChange={() => setSelectedShipping(opt.key)}
                  style={{ marginRight: 12 }}
                />
                {opt.label}
                {opt.price > 0 && <span style={{ color: '#C6FF00', marginLeft: 8 }}>+${opt.price}</span>}
              </label>
            ))}
          </div>
          {/* Order details form (vázlat) */}
          <form style={{ maxWidth: 500, margin: '0 auto 32px auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <input type="text" placeholder="Full name" style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} />
            <input type="email" placeholder="Email address" style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} />
            <input type="text" placeholder="Shipping address" style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} />
            {/* Fizetési mód választó (vázlat) */}
            <select style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}>
              <option value="card">Credit/Debit Card</option>
              <option value="cod">Cash on Delivery</option>
            </select>
            {/* Biztonsági infók */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18, margin: '10px 0 0 0', color: '#b0b8c6', fontSize: 15, fontWeight: 600, letterSpacing: 0.2, opacity: 0.85 }}>
              <span>SSI encrypted</span>
              <span style={{ fontSize: 18, fontWeight: 900, color: '#C6FF00' }}>·</span>
              <span>Secured payment</span>
              <span style={{ fontSize: 18, fontWeight: 900, color: '#C6FF00' }}>·</span>
              <span>Privacy protected</span>
            </div>
            <button type="submit" style={{ marginTop: 18, background: 'linear-gradient(90deg, #00BFFF 40%, #C6FF00 100%)', color: '#181828', fontWeight: 800, fontSize: 20, border: 'none', borderRadius: 12, padding: '16px 36px', cursor: 'pointer', boxShadow: '0 2px 16px 0 #00BFFF44', transition: 'background 0.2s' }}>
              Place Order
            </button>
          </form>
        </div>
      )}
    </div>
  );
} 