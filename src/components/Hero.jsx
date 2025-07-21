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

export function ContactUs() {
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