import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../../images/Logo.jpg';

export default function Footer() {
  return (
    <footer className="main-app-footer">
      <div className="footer-container">

        {/* Brand & Description */}
        <div className="footer-col brand-col">
          {/* Large, prominent logo */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}>
            <img
              src={logoImg}
              alt="شعار الفرقان"
              style={{
                width: '90px',
                height: '90px',
                borderRadius: '20px',
                objectFit: 'cover',
                boxShadow: '0 6px 28px rgba(212,175,55,0.35)',
                border: '2px solid rgba(212,175,55,0.6)',
              }}
            />
            <div className="footer-brand-text">
              <span className="footer-title">تطبيق الفرقان</span>
              <span className="footer-subtitle">البوابة الإسلامية الشاملة</span>
            </div>
          </div>
          <p className="footer-desc">
            موقع وتطبيق إسلامي شامل يوفر لك القرآن الكريم، الأذكار اليومية، مواقيت الصلاة الدقيقة، والسبحة الرقمية.
          </p>
        </div>

        {/* Developer Credits */}
        <div className="footer-col nav-col">
          <h4 className="footer-heading" style={{ marginBottom: '16px' }}>تم التطوير والتصميم بواسطة</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* مصطفى - Flutter Dev */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '46px', height: '46px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #0468d7, #54c5f8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, fontSize: '20px', color: '#fff',
                boxShadow: '0 4px 12px rgba(4,104,215,0.4)'
              }}>
                <i className="bx bxl-flutter"></i>
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gold-light)' }}>م. مصطفى أحمد فوده</div>
                <div style={{
                  fontSize: '11px', color: '#54c5f8', fontWeight: 600,
                  display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '2px'
                }}>
                  <i className="bx bxl-flutter" style={{ fontSize: '12px' }}></i>
                  Flutter Developer
                </div>
              </div>
            </div>

            {/* أحمد عماد - Front-end Dev (React) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '46px', height: '46px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #20232a, #282c34)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, fontSize: '26px', color: '#61dafb',
                boxShadow: '0 4px 14px rgba(97,218,251,0.35)',
                border: '1px solid rgba(97,218,251,0.25)'
              }}>
                <i className="bx bxl-react"></i>
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gold-light)' }}>م. أحمد عماد إبراهيم</div>
                <div style={{
                  fontSize: '11px', color: '#61dafb', fontWeight: 600,
                  display: 'inline-flex', alignItems: 'center', gap: '5px', marginTop: '2px'
                }}>
                  <i className="bx bxl-react" style={{ fontSize: '14px' }}></i>
                  React · Front-end Developer
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* App Download Stores (Google Play & App Store) */}
        <div className="footer-col apps-col">
          <h4 className="footer-heading">حمل التطبيق على هاتفك</h4>
          <p className="apps-subtext">تطبيقات الهواتف الذكية قيد التطوير وستتوفر قريباً جداً على المتاجر:</p>

          <div className="store-buttons-grid">
            {/* Google Play Button */}
            <a
              href="#"
              className="store-btn google-play-btn"
              onClick={(e) => {
                e.preventDefault();
                alert('تطبيق الأندرويد قريباً على متجر Google Play!');
              }}
            >
              <div className="store-btn-content">
                <i className="bx bxl-play-store store-icon"></i>
                <div className="store-btn-labels">
                  <span className="store-small">GET IT ON</span>
                  <span className="store-big">Google Play</span>
                </div>
              </div>
              <span className="coming-soon-tag">قريباً • Coming Soon</span>
            </a>

            {/* Apple App Store Button */}
            <a
              href="#"
              className="store-btn apple-store-btn"
              onClick={(e) => {
                e.preventDefault();
                alert('تطبيق الآيفون قريباً على متجر App Store!');
              }}
            >
              <div className="store-btn-content">
                <i className="bx bxl-apple store-icon"></i>
                <div className="store-btn-labels">
                  <span className="store-small">Download on the</span>
                  <span className="store-big">App Store</span>
                </div>
              </div>
              <span className="coming-soon-tag">قريباً • Coming Soon</span>
            </a>
          </div>
        </div>

      </div>

      <div className="footer-bottom-bar">
        <div className="footer-bottom-content">
          <span>جميع الحقوق محفوظة © {new Date().getFullYear()} هـ - تطبيق الفرقان الإسلامي</span>
          <span className="ayah-quote">«وَقُل رَّبِّ زِدْنِي عِلْمًا»</span>
        </div>
      </div>
    </footer>
  );
}
