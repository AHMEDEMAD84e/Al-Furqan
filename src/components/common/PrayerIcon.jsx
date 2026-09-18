import React from 'react';

// Fajr - Dawn crescent moon with rising rays
const FajrIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.5 5.5 0 0 1-7.54-7.54C12.92 3.04 12.46 3 12 3z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="rgba(212, 175, 55, 0.15)"/>
    <path d="M3 21h18" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M12 17v-2M8 18l1-1M16 18l-1-1" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

// Sunrise - Sun rising above horizon
const SunriseIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4v4M4.93 10.93l2.83 2.83M19.07 10.93l-2.83 2.83" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M2 18h20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M6 18a6 6 0 0 1 12 0" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="rgba(212, 175, 55, 0.2)"/>
    <path d="M12 9l-2 2h4l-2-2z" fill={color}/>
  </svg>
);

// Dhuhr - Midday radiant zenith sun
const DhuhrIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="1.8" fill="rgba(212, 175, 55, 0.25)"/>
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

// Asr - Afternoon sun with soft cloud
const AsrIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="4" stroke={color} strokeWidth="1.8" fill="rgba(212, 175, 55, 0.2)"/>
    <path d="M9 2v2M2 9h2M4.05 4.05l1.41 1.41M13.95 4.05l-1.41 1.41" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M7 18a4 4 0 0 1 7.8-1.2A3.5 3.5 0 1 1 19 20H7a3 3 0 0 1 0-6z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="rgba(255, 255, 255, 0.08)"/>
  </svg>
);

// Maghrib - Sunset dipping below horizon
const MaghribIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 18h20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M6 18a6 6 0 0 1 12 0" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 3"/>
    <circle cx="12" cy="14" r="4" stroke={color} strokeWidth="1.8" fill="rgba(212, 175, 55, 0.3)"/>
    <path d="M12 7v4M10 10l2 2 2-2" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Isha - Crescent moon & night stars
const IshaIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="rgba(212, 175, 55, 0.25)"/>
    <path d="M18 4l.5 1.5L20 6l-1.5.5L18 8l-.5-1.5L16 6l1.5-.5L18 4z" fill={color}/>
    <path d="M14 15l.3 1L15 16.3l-1 .3-.3 1-.3-1-1-.3 1-.3.3-1z" fill={color}/>
  </svg>
);

export default function PrayerIcon({ name, size = 26, color = "var(--gold)" }) {
  const normalized = (name || '').toLowerCase();
  
  if (normalized.includes('fajr') || normalized.includes('فجر')) {
    return <FajrIcon size={size} color={color} />;
  }
  if (normalized.includes('sunrise') || normalized.includes('شروق')) {
    return <SunriseIcon size={size} color={color} />;
  }
  if (normalized.includes('dhuhr') || normalized.includes('ظهر')) {
    return <DhuhrIcon size={size} color={color} />;
  }
  if (normalized.includes('asr') || normalized.includes('عصر')) {
    return <AsrIcon size={size} color={color} />;
  }
  if (normalized.includes('maghrib') || normalized.includes('مغرب')) {
    return <MaghribIcon size={size} color={color} />;
  }
  if (normalized.includes('isha') || normalized.includes('عشاء')) {
    return <IshaIcon size={size} color={color} />;
  }

  // Fallback default
  return <DhuhrIcon size={size} color={color} />;
}
