import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header.jsx';
import Sidebar from './components/layout/Sidebar.jsx';
import BottomNav from './components/layout/BottomNav.jsx';
import Footer from './components/layout/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import QuranPage from './pages/QuranPage.jsx';
import AdhkarPage from './pages/AdhkarPage.jsx';
import TasbihPage from './pages/TasbihPage.jsx';
import { usePrayerTimes } from './hooks/usePrayerTimes.js';

function AppLayout() {
  const location = useLocation();
  const { hijriDate, location: userLocation, changeCity } = usePrayerTimes();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="web-layout">
      {/* Desktop & Mobile Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Header
          pathname={location.pathname}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quran" element={<QuranPage />} />
            <Route path="/adhkar" element={<AdhkarPage />} />
            <Route path="/tasbih" element={<TasbihPage />} />
          </Routes>
        </main>

        {/* Global Application Footer */}
        <Footer />
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
