import React from 'react';

const PAGE_TITLES = {
  '/': 'الصفحة الرئيسية - لوحة التحكم',
  '/quran': 'المصحف الشريف والتلاوات',
  '/adhkar': 'الأذكار والأدعية',
  '/tasbih': 'السبحة الرقمية والعداد',
};

export default function Header({ pathname, onToggleSidebar }) {
  const pageTitle = PAGE_TITLES[pathname] || 'البوابة الإسلامية';

  return (
    <header className="web-header">
      <div className="header-right-side" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <button className="mobile-menu-btn" onClick={onToggleSidebar} title="القائمة">
          <i className="bx bx-menu" style={{ fontSize: '22px' }}></i>
        </button>

        <div className="header-page-title-box">
          <h1 className="header-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>{pageTitle}</span>
          </h1>
        </div>
      </div>
    </header>
  );
}
