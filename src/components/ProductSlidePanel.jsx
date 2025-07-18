import React from 'react';

export default function ProductSlidePanel({ product, onClose }) {
  return (
    <>
      {/* Sötétített háttér */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: product ? 'rgba(10,12,24,0.55)' : 'transparent',
          zIndex: 1000,
          transition: 'background 0.3s',
          pointerEvents: product ? 'auto' : 'none',
        }}
        onClick={onClose}
      />
      {/* Slide-in panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: 540,
          maxWidth: '100vw',
          background: 'linear-gradient(135deg, #181828 80%, #23233a 100%)',
          boxShadow: '-8px 0 32px 0 rgba(0,0,0,0.25)',
          zIndex: 1100,
          transform: product ? 'translateX(0)' : 'translateX(110%)',
          transition: 'transform 0.45s cubic-bezier(.77,0,.18,1)',
          display: 'flex',
          flexDirection: 'column',
          padding: '48px 40px 40px 40px',
          color: 'white',
          overflowY: 'auto',
        }}
        tabIndex={-1}
        aria-modal="true"
        role="dialog"
        onClick={e => e.stopPropagation()}
      >
        {product && (
          <>
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: 24,
                right: 32,
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: 32,
                cursor: 'pointer',
                fontWeight: 700,
                lineHeight: 1,
                zIndex: 1200,
              }}
              aria-label="Close"
            >
              &times;
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: 220,
                  height: 'auto',
                  borderRadius: 16,
                  objectFit: 'contain',
                  boxShadow: '0 4px 32px 0 rgba(0,0,0,0.25)',
                  marginBottom: 24,
                  background: 'none',
                }}
              />
              <h2 style={{ margin: 0, fontSize: 30, fontWeight: 700, letterSpacing: 1, textAlign: 'center' }}>{product.name}</h2>
              {product.details?.subtitle && (
                <div style={{ fontStyle: 'italic', color: '#ffb347', marginBottom: 12, fontSize: 18, textAlign: 'center' }}>{product.details.subtitle}</div>
              )}
            </div>
            {product.details?.description && (
              <div style={{ marginBottom: 20, fontSize: 16, lineHeight: 1.6 }}>{product.details.description}</div>
            )}
            {product.details?.specs && (
              <ul style={{ paddingLeft: 18, margin: 0, fontSize: 15, lineHeight: 1.7 }}>
                {product.details.specs.map((spec, i) => (
                  <li key={i}><b>{spec.label}:</b> {spec.value}</li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </>
  );
} 