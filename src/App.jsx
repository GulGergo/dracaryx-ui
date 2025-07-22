import React, { useEffect, useState, useRef } from 'react';
import Navbar from './components/Navbar';
import { HeroText, ShopNowButton } from './components/Hero';
import ProductGrid from './components/ProductGrid';
import UploadForm from './components/UploadForm';
import ShopPage from './components/ShopPage';
import bgBack from './assets/vaultify-back.png';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TierSelector from './components/TierSelector';
import { phoneProducts, tabletProducts, laptopProducts } from './components/ProductGrid';
import ProductCard from './components/ProductCard';
import { ProductModal } from './components/ProductGrid';
import dragonLaptop from './assets/dragon-laptop.svg';
import dragonTablet from './assets/dragon-tablet.svg';
import dragonMobile from './assets/dragon-mobile.svg';

function RepairPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const infoRef = useRef();
  const productListRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [upgradeSelections, setUpgradeSelections] = useState({});
  const [upgradeRepair, setUpgradeRepair] = useState(true);
  const [selectedWarranty, setSelectedWarranty] = useState(null);
  const [shippingModalOpen, setShippingModalOpen] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState('regular');
  const [userInfoModalOpen, setUserInfoModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', phone: '', email: '', address: '', city: '', zip: '' });
  const [warrantyModalOpen, setWarrantyModalOpen] = useState(false);
  const isMobile = window.innerWidth <= 600;
  // Új state: repairOrUpgradeModalOpen
  const [repairOrUpgradeModalOpen, setRepairOrUpgradeModalOpen] = useState(false);

  const products = [
    { key: 'phone', label: 'Phone', icon: <img src={dragonMobile} alt="Phone" style={{ height: 64, width: 'auto', maxWidth: '100%', marginBottom: 4, display: 'block' }} /> },
    { key: 'tablet', label: 'Tablet', icon: <img src={dragonTablet} alt="Tablet" style={{ height: 64, width: 'auto', maxWidth: '100%', marginBottom: 4, display: 'block' }} /> },
    { key: 'laptop', label: 'Laptop', icon: <img src={dragonLaptop} alt="Laptop" style={{ height: 64, width: 'auto', maxWidth: '100%', marginBottom: 4, display: 'block' }} /> },
  ];

  const phoneUpgrades = [
    { key: 'ram', label: 'RAM Boost', icon: '🔼', price: 49.99 },
    { key: 'storage', label: 'Storage Expansion', icon: '💾', price: 59.99 },
    { key: 'os', label: 'OS Refresh', icon: '🌐', price: 29.99 },
    { key: 'battery', label: 'Battery Swap', icon: '🔋', price: 39.99 },
  ];

  const warrantyPlans = [
    { key: 'standard', label: 'Standard Extension', duration: '+12 Months', price: 29.99 },
    { key: 'full', label: 'Full Coverage+', duration: '+24 Months', price: 49.99 },
  ];

  // Map category to product list
  const categoryProducts = {
    phone: phoneProducts,
    tablet: tabletProducts,
    laptop: laptopProducts,
  };

  // Add upgrade options for tablets and laptops (reuse phoneUpgrades for now, or define new arrays if needed)
  const tabletUpgrades = [
    { key: 'ram', label: 'RAM Boost', icon: '🔼', price: 59.99 },
    { key: 'storage', label: 'Storage Expansion', icon: '💾', price: 69.99 },
    { key: 'os', label: 'OS Refresh', icon: '🌐', price: 29.99 },
    { key: 'cooling', label: 'Passive Cooling Add-on', icon: '❄️', price: 44.99 },
  ];
  const laptopUpgrades = [
    { key: 'ram', label: 'RAM Upgrade', icon: '🔼', price: 69.99 },
    { key: 'storage', label: 'SSD / Storage Upgrade', icon: '💾', price: 89.99 },
    { key: 'os', label: 'OS Reinstallation', icon: '🌐', price: 29.99 },
    { key: 'thermal', label: 'Thermal Boost Kit', icon: '❄️', price: 59.99 },
    { key: 'fan', label: 'Fan Replacement / Add', icon: '🔊', price: 49.99 },
  ];

  const shippingOptions = [
    { key: 'regular', label: 'Self-Shipped (Regular)', icon: '📦', price: 0, priceLabel: 'FREE', speed: '5–7 business days' },
    { key: 'fast', label: 'Pick-Up & Return (Fast)', icon: '🚚', price: 19.99, priceLabel: '$19.99', speed: '2–4 business days' },
  ];

  const handleProductTypeClick = (product) => {
    setAnimating(true);
    setTimeout(() => {
      setSelectedCategory(product.key);
      setAnimating(false);
    }, 400); // match CSS transition duration
  };

  const handleBack = () => {
    setAnimating(true);
    setTimeout(() => {
      setSelectedCategory(null);
      setAnimating(false);
    }, 400);
  };

  // In the upgrade modal, use the correct upgrades array and title/icon based on selectedCategory
  const upgrades = selectedCategory === 'phone' ? phoneUpgrades : selectedCategory === 'tablet' ? tabletUpgrades : laptopUpgrades;
  const upgradeTitle = selectedCategory === 'phone' ? 'Phone Upgrades' : selectedCategory === 'tablet' ? 'Tablet Upgrades' : 'Laptop Upgrades';
  const upgradeIcon = selectedCategory === 'phone' ? '📱' : selectedCategory === 'tablet' ? '💊' : '💻';

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 0 64px 0', position: 'relative', minHeight: 600 }}>
      {/* Info and product type selection */}
      <div
        ref={infoRef}
        style={{
          position: selectedCategory ? 'absolute' : 'relative',
          left: 0,
          top: 0,
          width: '100%',
          opacity: animating && !selectedCategory ? 0 : 1,
          transform: animating && !selectedCategory ? 'translateX(-80px)' : 'translateX(0)',
          pointerEvents: selectedCategory ? 'none' : 'auto',
          transition: 'opacity 0.4s, transform 0.4s',
          zIndex: selectedCategory ? 1 : 2,
          display: !animating && selectedCategory ? 'none' : 'block',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: 32, marginBottom: 10, gap: 12 }}>
          Dracaryx Repair – Precision for Every Beast
        </div>
        <div style={{ fontSize: 18, color: '#ccc', marginBottom: 8 }}>
          Even the strongest machines need care.
        </div>
        <div style={{ fontSize: 17, color: '#ccc', marginBottom: 36 }}>
          Choose your device, select your fix — and upgrade while you're at it.
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 12 : 32,
            margin: isMobile ? '24px 0 18px 0' : '40px 0 32px 0',
            justifyContent: 'center',
            alignItems: 'stretch',
            width: '100%',
          }}
        >
          {products.map((product) => (
            <button
              key={product.key}
              onClick={() => handleProductTypeClick(product)}
              style={{
                background: '#181828',
                border: '2px solid #00BFFF',
                borderRadius: 16,
                padding: isMobile ? '20px 0' : '32px 36px',
                color: '#fff',
                fontWeight: 700,
                fontSize: 22,
                cursor: 'pointer',
                boxShadow: '0 2px 16px 0 rgba(0,191,255,0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
                minWidth: isMobile ? 'unset' : 140,
                width: isMobile ? '100%' : 'auto',
                maxWidth: '100%',
                margin: 0,
                transition: 'border 0.2s, box-shadow 0.2s',
              }}
            >
              <span style={{ fontSize: 38 }}>{product.icon}</span>
              {product.label}
            </button>
          ))}
        </div>
        <hr style={{ border: 'none', borderTop: '1px solid #444', margin: '32px 0 32px 0' }} />
        <div style={{ display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: 24, marginBottom: 10, gap: 10 }}>
          Device Repair Pricing
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 18 }}>
          <thead>
            <tr style={{ color: '#fff', fontWeight: 700, fontSize: 17 }}>
              <th style={{ textAlign: 'left', padding: '8px 0' }}>Device Type</th>
              <th style={{ textAlign: 'left', padding: '8px 0' }}>Basic Repair (From)</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderTop: '1px solid #333' }}>
              <td style={{ padding: '8px 0', color: '#4dd0e1', fontSize: 17 }}><img src={dragonMobile} alt="Phone" style={{ height: 24, width: 'auto', verticalAlign: 'middle', marginRight: 8, display: 'inline-block' }} /> Phone</td>
              <td style={{ padding: '8px 0', fontWeight: 700, color: '#fff', fontSize: 17 }}>$49.99</td>
            </tr>
            <tr style={{ borderTop: '1px solid #333' }}>
              <td style={{ padding: '8px 0', color: '#4dd0e1', fontSize: 17 }}><img src={dragonTablet} alt="Tablet" style={{ height: 24, width: 'auto', verticalAlign: 'middle', marginRight: 8, display: 'inline-block' }} /> Tablet</td>
              <td style={{ padding: '8px 0', fontWeight: 700, color: '#fff', fontSize: 17 }}>$69.99</td>
            </tr>
            <tr style={{ borderTop: '1px solid #333' }}>
              <td style={{ padding: '8px 0', color: '#b0bec5', fontSize: 17 }}><img src={dragonLaptop} alt="Laptop" style={{ height: 24, width: 'auto', verticalAlign: 'middle', marginRight: 8, display: 'inline-block' }} /> Laptop</td>
              <td style={{ padding: '8px 0', fontWeight: 700, color: '#fff', fontSize: 17 }}>$89.99</td>
            </tr>
          </tbody>
        </table>
        <div style={{ color: '#ccc', fontSize: 15, borderLeft: '4px solid #444', paddingLeft: 16, marginBottom: 32 }}>
          Final cost depends on issue severity.<br />
          All repairs include free diagnostics & performance testing.
        </div>
        {/* Repair Process Info Section */}
        <div style={{ margin: '32px 0 0 0', background: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: 22, marginBottom: 10, gap: 8 }}>
            Repair Process
          </div>
          <ol style={{ margin: 0, paddingLeft: 24, fontSize: 17, color: '#fff', fontWeight: 500, marginBottom: 24 }}>
            <li style={{ marginBottom: 6 }}>Select your device and issue</li>
            <li style={{ marginBottom: 6 }}>Choose shipping method (free or express pick-up)</li>
            <li style={{ marginBottom: 6 }}>Add optional upgrades or warranty</li>
            <li style={{ marginBottom: 6 }}>Send or schedule pickup</li>
            <li style={{ marginBottom: 0 }}>Device is repaired, tested, and shipped back to you</li>
          </ol>
          <hr style={{ border: 'none', borderTop: '1px solid #222', margin: '24px 0' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ color: '#00FF66', fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span role="img" aria-label="check">✅</span> Trusted Technicians
            </div>
            <div style={{ color: '#00FF66', fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span role="img" aria-label="check">✅</span> Secure Handling
            </div>
            <div style={{ color: '#00FF66', fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span role="img" aria-label="check">✅</span> Guaranteed Parts & Labor
            </div>
          </div>
        </div>
      </div>
      {/* Product list for selected category */}
      <div
        ref={productListRef}
        style={{
          position: !selectedCategory ? 'absolute' : 'relative',
          right: 0,
          top: 0,
          width: '100%',
          opacity: animating && selectedCategory ? 0 : selectedCategory ? 1 : 0,
          transform: animating && selectedCategory ? 'translateX(80px)' : selectedCategory ? 'translateX(0)' : 'translateX(80px)',
          pointerEvents: selectedCategory ? 'auto' : 'none',
          transition: 'opacity 0.4s, transform 0.4s',
          zIndex: selectedCategory ? 2 : 1,
          minHeight: 600,
          display: selectedCategory ? 'block' : 'none',
        }}
      >
        {selectedCategory && (
          <>
            <button onClick={handleBack} style={{ position: 'absolute', left: 0, top: -30, background: 'none', color: '#00BFFF', border: 'none', fontSize: 18, fontWeight: 700, cursor: 'pointer', padding: 0, margin: 0, zIndex: 10 }}>&larr; Back</button>
            <div style={{ fontWeight: 700, fontSize: 28, margin: '0 0 32px 0', textAlign: 'center' }}>
              Select your {products.find(p => p.key === selectedCategory)?.label}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                flexWrap: isMobile ? 'nowrap' : 'wrap',
                gap: isMobile ? 16 : 32,
                justifyContent: 'center',
                alignItems: isMobile ? 'center' : 'flex-start',
                minHeight: 400,
                width: '100%',
              }}
            >
              {categoryProducts[selectedCategory]?.map(product => (
                <div
                  key={product.name}
                  style={{
                    width: isMobile ? '95vw' : 220,
                    maxWidth: '100%',
                    margin: isMobile ? '0 auto' : 0,
                  }}
                >
                  <ProductCard {...product} onClick={() => { setModalProduct(product); setRepairOrUpgradeModalOpen(true); }} showPrice={false} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {/* Modal for repair/upgrade selection */}
      {modalOpen && modalProduct && (
        <ProductModal product={modalProduct} onClose={() => setModalOpen(false)} />
      )}
      {/* Upgrade modal for phone */}
      {upgradeModalOpen && modalProduct && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }} onClick={() => { setUpgradeModalOpen(false); setModalProduct(null); }}>
          <div style={{
            background: 'linear-gradient(135deg, #181828 80%, #23233a 100%)',
            borderRadius: 24,
            padding: window.innerWidth <= 600 ? 16 : '40px 48px',
            minWidth: 300,
            maxWidth: 480,
            color: 'white',
            boxShadow: '0 12px 48px 0 rgba(0,0,0,0.55)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 18,
            maxHeight: window.innerWidth <= 600 ? '98vh' : undefined,
            overflowY: window.innerWidth <= 600 ? 'auto' : undefined,
          }} onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span role="img" aria-label="upgrade">{upgradeIcon}</span> {upgradeTitle}
            </div>
            {window.innerWidth <= 600 ? (
              <div style={{ maxWidth: '100vw', overflowX: 'auto', padding: '0 4px' }}>
                <table style={{ minWidth: 380, width: '100%', borderCollapse: 'collapse', marginBottom: 8 }}>
                  <thead>
                    <tr style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>
                      <th style={{ textAlign: 'left', padding: '6px 0', wordBreak: 'break-word', whiteSpace: 'normal' }}>Upgrade Type</th>
                      <th style={{ textAlign: 'left', padding: '6px 0', wordBreak: 'break-word', whiteSpace: 'normal' }}>Price (From)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upgrades.map(upg => (
                      <tr key={upg.key} style={{ borderTop: '1px solid #333' }}>
                        <td style={{ padding: '8px 0', color: '#fff', fontSize: 16, wordBreak: 'break-word', whiteSpace: 'normal' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            <input
                              type="checkbox"
                              checked={!!upgradeSelections[upg.key]}
                              onChange={e => setUpgradeSelections(s => ({ ...s, [upg.key]: e.target.checked }))}
                              style={{ marginRight: 6, verticalAlign: 'middle', height: 20, width: 20, margin: 0 }}
                            />
                            <span>{upg.icon}</span> {upg.label}
                          </label>
                        </td>
                        <td style={{ padding: '8px 0', color: '#C6FF00', fontWeight: 700, fontSize: 16, wordBreak: 'break-word', whiteSpace: 'normal' }}>
                          <span style={{ whiteSpace: 'nowrap' }}>+${upg.price.toFixed(2)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 8 }}>
                <thead>
                  <tr style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>
                    <th style={{ textAlign: 'left', padding: '6px 0' }}>Upgrade Type</th>
                    <th style={{ textAlign: 'left', padding: '6px 0' }}>Price (From)</th>
                  </tr>
                </thead>
                <tbody>
                  {upgrades.map(upg => (
                    <tr key={upg.key} style={{ borderTop: '1px solid #333' }}>
                      <td style={{ padding: '8px 0', color: '#fff', fontSize: 16 }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          <input
                            type="checkbox"
                            checked={!!upgradeSelections[upg.key]}
                            onChange={e => setUpgradeSelections(s => ({ ...s, [upg.key]: e.target.checked }))}
                            style={{ marginRight: 6, verticalAlign: 'middle', height: 20, width: 20, margin: 0 }}
                          />
                          <span>{upg.icon}</span> {upg.label}
                        </label>
                      </td>
                      <td style={{ padding: '8px 0', color: '#C6FF00', fontWeight: 700, fontSize: 16 }}>
                        <span style={{ whiteSpace: 'nowrap' }}>+${upg.price.toFixed(2)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', margin: '8px 0 0 0' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <input
                  type="checkbox"
                  checked={upgradeRepair}
                  onChange={e => setUpgradeRepair(e.target.checked)}
                  style={{ marginRight: 6, verticalAlign: 'middle', height: 20, width: 20, margin: 0 }}
                />
                Include Repair
              </label>
            </div>
            {/* Warranty Extension Section */}
            <div style={{ width: '100%', margin: '18px 0 0 0' }}>
              <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span role="img" aria-label="shield">🛡️</span> Warranty Extension
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 8 }}>
                <thead>
                  <tr style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>
                    <th style={{ textAlign: 'left', padding: '6px 0' }}>Plan</th>
                    <th style={{ textAlign: 'left', padding: '6px 0' }}>Duration</th>
                    <th style={{ textAlign: 'left', padding: '6px 0' }}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderTop: '1px solid #333' }}>
                    <td style={{ padding: '8px 0', color: '#fff', fontSize: 15 }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', verticalAlign: 'middle' }}>
                        <input
                          type="radio"
                          name="warranty-repair"
                          checked={selectedWarranty === null}
                          onChange={() => setSelectedWarranty(null)}
                          style={{ marginRight: 6, verticalAlign: 'middle', height: 18, width: 18, margin: 0 }}
                        />
                        No warranty extension
                      </label>
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  {warrantyPlans.map(plan => (
                    <tr key={plan.key} style={{ borderTop: '1px solid #333' }}>
                      <td style={{ padding: '8px 0', color: '#fff', fontSize: 15 }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', verticalAlign: 'middle' }}>
                          <input
                            type="radio"
                            name="warranty-repair"
                            checked={selectedWarranty === plan.key}
                            onChange={() => setSelectedWarranty(plan.key)}
                            style={{ marginRight: 6, verticalAlign: 'middle', height: 18, width: 18, margin: 0 }}
                          />
                          {plan.label}
                        </label>
                      </td>
                      <td style={{ padding: '8px 0', color: '#fff', fontSize: 15 }}>{plan.duration}</td>
                      <td style={{ padding: '8px 0', color: '#C6FF00', fontWeight: 700, fontSize: 15 }}>${plan.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ fontStyle: 'italic', color: '#ccc', fontSize: 14, marginTop: 4 }}>
                Applies to devices repaired or upgraded by Dracaryx.
              </div>
            </div>
            <div style={{ fontWeight: 700, fontSize: 18, marginTop: 12, color: '#C6FF00' }}>
              Total: ${(
                (upgradeRepair ? (selectedCategory === 'phone' ? 49.99 : selectedCategory === 'tablet' ? 69.99 : 89.99) : 0) +
                upgrades.reduce((sum, upg) => sum + (upgradeSelections[upg.key] ? upg.price : 0), 0) +
                (selectedWarranty ? warrantyPlans.find(w => w.key === selectedWarranty).price : 0)
              ).toFixed(2)}
            </div>
            <button
              style={{
                background: 'linear-gradient(90deg, #00BFFF 60%, #C6FF00 100%)',
                color: '#222',
                fontWeight: 700,
                fontSize: 18,
                border: 'none',
                borderRadius: 10,
                padding: '14px 32px',
                cursor: 'pointer',
                boxShadow: '0 2px 12px 0 #00BFFF33',
                marginTop: 8,
              }}
              onClick={() => { setUpgradeModalOpen(false); setShippingModalOpen(true); }}
            >
              Confirm
            </button>
            <button
              style={{
                background: 'none',
                color: '#fff',
                border: 'none',
                fontSize: 16,
                marginTop: 8,
                cursor: 'pointer',
                textDecoration: 'underline',
                opacity: 0.7,
              }}
              onClick={() => { setUpgradeModalOpen(false); setModalProduct(null); }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {/* Shipping modal */}
      {shippingModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }} onClick={() => setShippingModalOpen(false)}>
          <div style={{
            background: 'linear-gradient(135deg, #181828 80%, #23233a 100%)',
            borderRadius: 24,
            padding: '40px 48px',
            minWidth: 480,
            maxWidth: 600,
            color: 'white',
            boxShadow: '0 12px 48px 0 rgba(0,0,0,0.55)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 18,
            maxHeight: window.innerWidth <= 600 ? '90vh' : undefined,
            overflowY: window.innerWidth <= 600 ? 'auto' : undefined,
          }} onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span role="img" aria-label="truck">🚚</span> Shipping Options
            </div>
            <table
              style={{
                width: '100%',
                maxWidth: isMobile ? '100vw' : 500,
                tableLayout: isMobile ? 'fixed' : 'auto',
                borderCollapse: 'collapse',
                marginBottom: 18,
                fontSize: isMobile ? 14 : 16,
              }}
            >
              <thead>
                <tr>
                  <th style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>Method</th>
                  <th style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>Price</th>
                  <th style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>Speed</th>
                </tr>
              </thead>
              <tbody>
                {shippingOptions.map(opt => (
                  <tr key={opt.key} style={{ borderTop: '1px solid #333', background: selectedShipping === opt.key ? '#23233a' : 'none' }}>
                    <td style={{ padding: '8px 0', color: '#fff', fontSize: 15 }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 500 }}>
                        <input
                          type="radio"
                          name="shipping"
                          checked={selectedShipping === opt.key}
                          onChange={() => setSelectedShipping(opt.key)}
                          style={{ marginRight: 6 }}
                        />
                        <span>{opt.icon}</span> {opt.label}
                      </label>
                    </td>
                    <td style={{ padding: '8px 0', color: opt.price === 0 ? '#C6FF00' : '#fff', fontWeight: 700, fontSize: 15, textAlign: 'right', paddingRight: 18 }}>
                      <span style={{ whiteSpace: 'nowrap' }}>{opt.priceLabel}</span>
                    </td>
                    <td style={{ padding: '8px 0', color: '#fff', fontSize: 15, textAlign: 'left' }}>{opt.speed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#C6FF00', fontSize: 15, marginTop: 8 }}>
              <span role="img" aria-label="check">✅</span> Tracking included on both methods
            </div>
            <div style={{ width: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontSize: 15, marginTop: 2, fontStyle: 'italic', padding: '0 70px', overflowX: 'auto' }}>
              <span role="img" aria-label="tools">🛠️</span>
              <span style={{ display: 'inline-block', minWidth: 320, wordBreak: 'break-word', whiteSpace: 'normal' }}>Self-shipping requires customer to drop off at a partner location</span>
            </div>
            <button
              style={{
                background: 'linear-gradient(90deg, #00BFFF 60%, #C6FF00 100%)',
                color: '#222',
                fontWeight: 700,
                fontSize: 18,
                border: 'none',
                borderRadius: 10,
                padding: '14px 32px',
                cursor: 'pointer',
                boxShadow: '0 2px 12px 0 #00BFFF33',
                marginTop: 18,
              }}
              onClick={() => { setShippingModalOpen(false); setUserInfoModalOpen(true); }}
            >
              Continue
            </button>
            <button
              style={{
                background: 'none',
                color: '#fff',
                border: 'none',
                fontSize: 16,
                marginTop: 8,
                cursor: 'pointer',
                textDecoration: 'underline',
                opacity: 0.7,
              }}
              onClick={() => setShippingModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {/* User info modal */}
      {userInfoModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }} onClick={() => setUserInfoModalOpen(false)}>
          <div style={{
            background: 'linear-gradient(135deg, #181828 80%, #23233a 100%)',
            borderRadius: 24,
            padding: '40px 48px',
            minWidth: 420,
            maxWidth: 480,
            color: 'white',
            boxShadow: '0 12px 48px 0 rgba(0,0,0,0.55)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 18,
            maxHeight: window.innerWidth <= 600 ? '90vh' : undefined,
            overflowY: window.innerWidth <= 600 ? 'auto' : undefined,
          }} onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8, textAlign: 'center' }}>
              Contact & Shipping Info
            </div>
            <form style={{ width: '95%', display: 'flex', flexDirection: 'column', gap: 14, padding: '0 18px' }} onSubmit={e => { e.preventDefault(); /* handle submit */ }}>
              <input type="text" required placeholder="Full Name" value={userInfo.name} onChange={e => setUserInfo({ ...userInfo, name: e.target.value })} style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} />
              <input type="tel" required placeholder="Phone Number" value={userInfo.phone} onChange={e => setUserInfo({ ...userInfo, phone: e.target.value })} style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} />
              <input type="email" required placeholder="Email Address" value={userInfo.email} onChange={e => setUserInfo({ ...userInfo, email: e.target.value })} style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} />
              <input type="text" required placeholder="Street Address" value={userInfo.address} onChange={e => setUserInfo({ ...userInfo, address: e.target.value })} style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} />
              <input type="text" required placeholder="City" value={userInfo.city} onChange={e => setUserInfo({ ...userInfo, city: e.target.value })} style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} />
              <input type="text" required placeholder="ZIP Code" value={userInfo.zip} onChange={e => setUserInfo({ ...userInfo, zip: e.target.value })} style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} />
              <button type="submit" style={{
                background: 'linear-gradient(90deg, #00BFFF 60%, #C6FF00 100%)',
                color: '#222',
                fontWeight: 700,
                fontSize: 18,
                border: 'none',
                borderRadius: 10,
                padding: '14px 32px',
                cursor: 'pointer',
                boxShadow: '0 2px 12px 0 #00BFFF33',
                marginTop: 8,
              }}>Submit</button>
            </form>
            <button
              style={{
                background: 'none',
                color: '#fff',
                border: 'none',
                fontSize: 16,
                marginTop: 8,
                cursor: 'pointer',
                textDecoration: 'underline',
                opacity: 0.7,
              }}
              onClick={() => setUserInfoModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {/* Warranty modal */}
      {warrantyModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }} onClick={() => setWarrantyModalOpen(false)}>
          <div style={{
            background: 'linear-gradient(135deg, #181828 80%, #23233a 100%)',
            borderRadius: 24,
            padding: '40px 48px',
            minWidth: 420,
            maxWidth: 480,
            color: 'white',
            boxShadow: '0 12px 48px 0 rgba(0,0,0,0.55)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 18,
            maxHeight: window.innerWidth <= 600 ? '90vh' : undefined,
            overflowY: window.innerWidth <= 600 ? 'auto' : undefined,
          }} onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span role="img" aria-label="shield">🛡️</span> Warranty Extension
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 8 }}>
              <thead>
                <tr style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>
                  <th style={{ textAlign: 'left', padding: '6px 0' }}>Plan</th>
                  <th style={{ textAlign: 'left', padding: '6px 0' }}>Duration</th>
                  <th style={{ textAlign: 'left', padding: '6px 0' }}>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderTop: '1px solid #333' }}>
                  <td style={{ padding: '8px 0', color: '#fff', fontSize: 15 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', verticalAlign: 'middle' }}>
                      <input
                        type="radio"
                        name="warranty-repair"
                        checked={selectedWarranty === null}
                        onChange={() => setSelectedWarranty(null)}
                        style={{ marginRight: 6, verticalAlign: 'middle', height: 18, width: 18, margin: 0 }}
                      />
                      No warranty extension
                    </label>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                {warrantyPlans.map(plan => (
                  <tr key={plan.key} style={{ borderTop: '1px solid #333' }}>
                    <td style={{ padding: '8px 0', color: '#fff', fontSize: 15 }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', verticalAlign: 'middle' }}>
                        <input
                          type="radio"
                          name="warranty-repair"
                          checked={selectedWarranty === plan.key}
                          onChange={() => setSelectedWarranty(plan.key)}
                          style={{ marginRight: 6, verticalAlign: 'middle', height: 18, width: 18, margin: 0 }}
                        />
                        {plan.label}
                      </label>
                    </td>
                    <td style={{ padding: '8px 0', color: '#fff', fontSize: 15 }}>{plan.duration}</td>
                    <td style={{ padding: '8px 0', color: '#C6FF00', fontWeight: 700, fontSize: 15 }}>${plan.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ fontStyle: 'italic', color: '#ccc', fontSize: 14, marginTop: 4 }}>
              Applies to devices repaired or upgraded by Dracaryx.
            </div>
            <div style={{ fontWeight: 700, fontSize: 18, marginTop: 12, color: '#C6FF00' }}>
              Total: ${(
                (selectedCategory === 'phone' ? 49.99 : selectedCategory === 'tablet' ? 69.99 : 89.99) +
                (selectedWarranty ? warrantyPlans.find(w => w.key === selectedWarranty).price : 0)
              ).toFixed(2)}
            </div>
            <button
              style={{
                background: 'linear-gradient(90deg, #00BFFF 60%, #C6FF00 100%)',
                color: '#222',
                fontWeight: 700,
                fontSize: 18,
                border: 'none',
                borderRadius: 10,
                padding: '14px 32px',
                cursor: 'pointer',
                boxShadow: '0 2px 12px 0 #00BFFF33',
                marginTop: 8,
              }}
              onClick={() => { setWarrantyModalOpen(false); setShippingModalOpen(true); }}
            >
              Continue
            </button>
            <button
              style={{
                background: 'none',
                color: '#fff',
                border: 'none',
                fontSize: 16,
                marginTop: 8,
                cursor: 'pointer',
                textDecoration: 'underline',
                opacity: 0.7,
              }}
              onClick={() => setWarrantyModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {/* Repair/Upgrade választó modal */}
      {repairOrUpgradeModalOpen && modalProduct && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }} onClick={() => { setRepairOrUpgradeModalOpen(false); setModalProduct(null); }}>
          <div style={{
            background: 'linear-gradient(135deg, #181828 80%, #23233a 100%)',
            borderRadius: 24,
            padding: window.innerWidth <= 600 ? 16 : '40px 48px',
            minWidth: 300,
            maxWidth: 400,
            color: 'white',
            boxShadow: '0 12px 48px 0 rgba(0,0,0,0.55)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 18,
            maxHeight: window.innerWidth <= 600 ? '98vh' : undefined,
            overflowY: window.innerWidth <= 600 ? 'auto' : undefined,
          }} onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8, textAlign: 'center' }}>
              What would you like to do?
            </div>
            <button
              style={{
                background: 'linear-gradient(90deg, #00BFFF 60%, #C6FF00 100%)',
                color: '#222',
                fontWeight: 700,
                fontSize: 18,
                border: 'none',
                borderRadius: 10,
                padding: '14px 32px',
                cursor: 'pointer',
                boxShadow: '0 2px 12px 0 #00BFFF33',
                marginBottom: 8,
                width: '100%',
              }}
              onClick={() => {
                setRepairOrUpgradeModalOpen(false);
                setWarrantyModalOpen(true);
              }}
            >
              Repair only
            </button>
            <button
              style={{
                background: 'linear-gradient(90deg, #23233a 60%, #181828 100%)',
                color: '#C6FF00',
                fontWeight: 700,
                fontSize: 18,
                border: '2px solid #C6FF00',
                borderRadius: 10,
                padding: '14px 32px',
                cursor: 'pointer',
                boxShadow: '0 2px 12px 0 #C6FF0033',
                width: '100%',
              }}
              onClick={() => {
                setRepairOrUpgradeModalOpen(false);
                setUpgradeModalOpen(true);
              }}
            >
              Repair + Upgrade
            </button>
            <button
              style={{
                background: 'none',
                color: '#fff',
                border: 'none',
                fontSize: 16,
                marginTop: 8,
                cursor: 'pointer',
                textDecoration: 'underline',
                opacity: 0.7,
              }}
              onClick={() => { setRepairOrUpgradeModalOpen(false); setModalProduct(null); }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => { e.preventDefault(); alert('Message sent!'); };
  const isMobile = window.innerWidth <= 600;
  return (
    <div style={{ maxWidth: 700, margin: '60px auto 40px auto', background: 'rgba(30,40,80,0.10)', borderRadius: 18, padding: 36, color: '#fff', boxShadow: '0 2px 16px 0 #00BFFF22' }}>
      <div style={{ borderLeft: '4px solid #C6FF00', paddingLeft: 18, marginBottom: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 6 }}>Have a question, request, or dragon to tame?</div>
        <div style={{ fontSize: 16, marginBottom: 10 }}>
          We're here to help—whether it's about your device, a custom case, or an epic repair.<br />
          Reach out to the Dracaryx support team and we'll respond faster than dragonfire.
        </div>
        <div style={{ fontSize: 17, marginBottom: 2 }}>
          Need tech help?
        </div>
        <div style={{ fontSize: 17, marginBottom: 2 }}>
          Want to design your own case?
        </div>
        <div style={{ fontSize: 17, marginBottom: 2 }}>
          Having trouble with your order?
        </div>
        <div style={{ fontWeight: 700, marginTop: 10, fontSize: 16 }}>
          Send us a message. We've got your back (and your device).
        </div>
      </div>
      {/* Email form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 8 : 16 }}>
          <input name="name" type="text" required placeholder="Name" value={form.name} onChange={handleChange} style={{ flex: 1, padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16, width: '100%', marginBottom: isMobile ? 0 : undefined }} />
          <input name="email" type="email" required placeholder="Email" value={form.email} onChange={handleChange} style={{ flex: 1, padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16, width: '100%', marginBottom: isMobile ? 0 : undefined }} />
        </div>
        <textarea name="message" required placeholder="Message" value={form.message} onChange={handleChange} style={{ minHeight: 80, padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} />
        <button type="submit" style={{ background: 'linear-gradient(90deg, #00BFFF 60%, #C6FF00 100%)', color: '#222', fontWeight: 700, fontSize: 18, border: 'none', borderRadius: 10, padding: '14px 32px', cursor: 'pointer', boxShadow: '0 2px 12px 0 #00BFFF33', marginTop: 8 }}>Send Message</button>
      </form>
      {/* Live chat gomb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
        <button style={{ background: 'linear-gradient(90deg, #23233a 40%, #181828 100%)', color: '#C6FF00', fontWeight: 800, fontSize: 18, border: '2px solid #C6FF00', borderRadius: 10, padding: '12px 32px', cursor: 'pointer', boxShadow: '0 2px 12px 0 #C6FF0044', transition: 'background 0.2s' }} onClick={() => alert('Live chat coming soon!')}>
          Live chat
        </button>
      </div>
      {/* Szerviz cím és nyitvatartás */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: 40, flexWrap: 'wrap', marginTop: 18 }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>Service Center</div>
          <div style={{ fontSize: 16, marginBottom: 2 }}>Dragon Plaza 42, 3rd floor</div>
          <div style={{ fontSize: 16, marginBottom: 2 }}>Budapest, 1099</div>
          <div style={{ fontSize: 16, marginBottom: 2 }}>Hungary</div>
        </div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>Opening hours</div>
          <div style={{ fontSize: 16, marginBottom: 2 }}>Monday–Friday: 09:00–18:00</div>
          <div style={{ fontSize: 16, marginBottom: 2, color: '#b0b8c6' }}>Saturday–Sunday: Closed</div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  useEffect(() => {
    document.body.style.background = `url(${bgBack}) center center / cover no-repeat`;
    return () => {
      document.body.style.background = '';
    };
  }, []);

  return (
    <Router>
      <div style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <div style={{
          width: '100%',
          minHeight: 0,
          boxShadow: '0 0 40px 0 rgba(46,26,71,0.08)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
          position: 'relative',
        }}>
          <Navbar />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            minHeight: 'unset',
            maxWidth: 1200,
            margin: '0 auto',
            width: '100%',
            padding: '0 8px 24px 8px',
            boxSizing: 'border-box',
          }}>
            <main style={{width: '100%'}}>
              <Routes>
                <Route path="/" element={
                  <>
                    <HeroText />
                    <ShopNowButton />
                    <div style={{ marginTop: 48 }}>
                      <ProductGrid
                        modalProduct={modalOpen ? modalProduct : null}
                        onClose={() => { setModalOpen(false); setModalProduct(null); }}
                        onProductClick={product => { setModalProduct(product); setModalOpen(true); }}
                      />
                    </div>
                  </>
                } />
                <Route path="/custom-case" element={
                  <>
                    <div style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      zIndex: 10,
                      pointerEvents: 'none',
                      padding: '0 8px',
                      marginTop: 100,
                    }}>
                      <div style={{ textAlign: 'center', pointerEvents: 'auto' }}>
                        <h1 style={{
                          fontSize: '2rem',
                          fontWeight: 800,
                          margin: 0,
                          lineHeight: 1.1,
                          textAlign: 'center',
                          wordBreak: 'break-word',
                        }}>
                          Unleash Your Imagination. Forge Your Own Case.
                        </h1>
                        <p style={{
                          fontSize: '1rem',
                          margin: '12px 0 18px 0',
                          textAlign: 'center',
                          lineHeight: 1.4,
                          wordBreak: 'break-word',
                        }}>
                          Welcome to Dracaryx Custom Case — where your creativity becomes reality.
                        </p>
                      </div>
                    </div>
                    {/* How it Works + TierSelector egymás mellett */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 32,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      maxWidth: 1000,
                      margin: '48px auto 0 auto',
                      width: '100%',
                      boxSizing: 'border-box',
                      flexWrap: 'wrap',
                    }}>
                      <TierSelector />
                      <div style={{
                        flex: 1,
                        minWidth: 260,
                        maxWidth: 420,
                        marginBottom: 28,
                        background: 'none',
                        color: '#fff',
                        textAlign: 'left',
                        borderRadius: 12,
                        padding: 0,
                        marginLeft: 0,
                        alignSelf: 'flex-start',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: 22, marginBottom: 10, gap: 8 }}>
                          How It Works:
                        </div>
                        <ol style={{ margin: 0, paddingLeft: 32, fontSize: 17, color: '#fff', fontWeight: 500 }}>
                          <li style={{ marginBottom: 6 }}><b>Select your device model</b></li>
                          <li style={{ marginBottom: 6 }}><b>Upload your design or image</b></li>
                          <li style={{ marginBottom: 6 }}><b>Adjust position, scale, and rotation directly on the case</b></li>
                          <li style={{ marginBottom: 6 }}><b>Preview your final result</b></li>
                          <li style={{ marginBottom: 0 }}><b>Add to cart & we take care of the rest</b></li>
                        </ol>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', width: '100%' }}>
                      <UploadForm />
                    </div>
                  </>
                } />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/repair" element={<RepairPage />} />
                <Route path="/contact-us" element={<ContactUs />} />
              </Routes>
            </main>
          </div>
        </div>
        <footer style={{
          height: '80px',
          background: 'linear-gradient(90deg, #181828 60%, #23233a 100%)',
          color: '#C6FF00',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 -2px 24px 0 #00BFFF33',
          flexDirection: 'column',
        }}>
          <span className="caption" style={{
            color: '#C6FF00',
            textShadow: '0 2px 8px #181828, 0 1px 0 #fff',
            fontWeight: 600,
            fontSize: 16,
          }}>© 2024. All rights reserved.</span>
          <span style={{
            color: '#b0bec5',
            fontSize: 12,
            marginTop: 4,
            textAlign: 'center',
            maxWidth: 700,
            lineHeight: 1.5,
            display: 'block',
          }}>
            Disclaimer: This website is a personal project created solely for learning, experimentation, and entertainment purposes. All content is fictional and not intended for commercial use.
          </span>
        </footer>
      </div>
    </Router>
  );
} 