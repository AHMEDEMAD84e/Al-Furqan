import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const HomeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9 21 9 15 12 15C15 15 15 21 15 21M9 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const QuranIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AdhkarIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M7 8H17M7 12H11M21 15C21 18.3137 18.3137 21 15 21C12.7614 21 10.8056 19.7818 9.73244 18H4C3.44772 18 3 17.5523 3 17V4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TasbihIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C12 2 12 2 12 2C14.2091 2 16 3.79086 16 6C16 8.20914 14.2091 10 12 10C9.79086 10 8 8.20914 8 6C8 3.79086 9.79086 2 12 2Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 10V22M8 22H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M6 16C6 16 7 14 12 14C17 14 18 16 18 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/tasbih" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <span className="nav-icon"><TasbihIcon /></span>
        <span>السبحة</span>
      </NavLink>
      <NavLink to="/adhkar" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <span className="nav-icon"><AdhkarIcon /></span>
        <span>الذاكر</span>
      </NavLink>
      <NavLink to="/quran" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <span className="nav-icon"><QuranIcon /></span>
        <span>القرآن</span>
      </NavLink>
      <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <span className="nav-icon"><HomeIcon /></span>
        <span>الرئيسية</span>
      </NavLink>
    </nav>
  );
}
