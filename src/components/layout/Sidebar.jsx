import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { usePrayerTimes } from '../../hooks/usePrayerTimes';
import PrayerIcon from '../common/PrayerIcon';
import logoImg from '../../../images/Logo.jpg';

export default function Sidebar({ isOpen, onClose }) {
  const { nextPrayer, nextPrayerName, countdown } = usePrayerTimes();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('sidebar-open-no-scroll');
      document.documentElement.classList.add('sidebar-open-no-scroll');
    } else {
      document.body.classList.remove('sidebar-open-no-scroll');
      document.documentElement.classList.remove('sidebar-open-no-scroll');
    }

    return () => {
      document.body.classList.remove('sidebar-open-no-scroll');
      document.documentElement.classList.remove('sidebar-open-no-scroll');
    };
  }, [isOpen]);

  const navItems = [
    { path: '/', label: 'الرئيسية', iconClass: 'bx bxs-home' },
    { path: '/quran', label: 'القرآن الكريم', iconClass: 'bx bxs-book-open' },
    { path: '/adhkar', label: 'الأذكار والأدعية', iconClass: 'bx bxs-book-heart' },
    { path: '/tasbih', label: 'السبحة الرقمية', iconClass: 'bx bx-disc' },
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onClose}
          onTouchMove={(e) => e.preventDefault()}
        />
      )}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Sidebar Header / Logo */}
        <div className="sidebar-brand">
          <div className="brand-logo-icon" style={{ overflow: 'hidden', padding: 0, border: 'none', background: 'transparent' }}>
            <img src={logoImg} alt="الفرقان" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gold)' }} />
          </div>
          <div className="brand-text">
            <span className="brand-name">الفرقان</span>
            <span className="brand-sub">البوابة الإسلامية الشاملة</span>
          </div>
          <button className="sidebar-close-btn" onClick={onClose} aria-label="إغلاق">
            <i className="bx bx-x" style={{ fontSize: '20px' }}></i>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <div className="nav-group-label">القائمة الرئيسية</div>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <span className="sidebar-link-icon">
                <i className={item.iconClass} style={{ fontSize: '20px' }}></i>
              </span>
              <span className="sidebar-link-text">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Widget: Next Prayer Summary */}
        <div className="sidebar-widget">
          <div className="widget-title">
            <PrayerIcon name={nextPrayer?.name || 'Fajr'} size={18} color="var(--gold)" />
            <span>الصلاة القادمة</span>
          </div>
          <div className="widget-prayer-name">{nextPrayerName || 'الفجر'}</div>
          <div className="widget-countdown">
            <span>متبقي</span>
            <span className="time">{countdown || '00:00:00'}</span>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <div className="footer-ayah">
            «أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ»
          </div>
          <div className="footer-copy">© 1447 هـ - جميع الحقوق محفوظة</div>
        </div>
      </aside>
    </>
  );
}
