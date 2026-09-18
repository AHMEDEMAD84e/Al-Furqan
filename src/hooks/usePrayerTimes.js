import { useState, useEffect } from 'react';
import {
  getPrayerTimesByCoords,
  getPrayerTimes,
  getHijriDate,
  reverseGeocodeArabic,
  getIPLocation,
  EGYPTIAN_CITIES
} from '../services/prayerApi';

export const PRAYER_NAMES = {
  Fajr: 'الفجر',
  Sunrise: 'الشروق',
  Dhuhr: 'الظهر',
  Asr: 'العصر',
  Maghrib: 'المغرب',
  Isha: 'العشاء',
};

export const PRAYER_ICONS = {
  Fajr: 'bx bx-moon',
  Sunrise: 'bx bx-sun',
  Dhuhr: 'bx bxs-sun',
  Asr: 'bx bx-cloud-sun',
  Maghrib: 'bx bx-time-five',
  Isha: 'bx bx-star',
};

const to12Hour = (timeStr) => {
  if (!timeStr) return '--:--';
  const clean = timeStr.split(' ')[0];
  const [h, m] = clean.split(':').map(Number);
  const period = h >= 12 ? 'م' : 'ص';
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
};

const parsePrayerDate = (timeStr, isTomorrow = false) => {
  if (!timeStr) return null;
  const cleanStr = timeStr.split(' ')[0];
  const [h, m] = cleanStr.split(':').map(Number);
  const date = new Date();
  if (isTomorrow) date.setDate(date.getDate() + 1);
  date.setHours(h, m, 0, 0);
  return date;
};

const getNextPrayerInfo = (timings) => {
  if (!timings) return null;
  const prayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  const now = new Date();
  
  for (const prayer of prayers) {
    const pDate = parsePrayerDate(timings[prayer]);
    if (pDate && pDate > now) {
      return { name: prayer, time: timings[prayer], targetDate: pDate };
    }
  }
  
  // Tomorrow Fajr
  const fajrTomorrow = parsePrayerDate(timings['Fajr'], true);
  return { name: 'Fajr', time: timings['Fajr'], targetDate: fajrTomorrow };
};

export const usePrayerTimes = () => {
  const [times, setTimes] = useState(null);
  const [hijriDate, setHijriDate] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [countdown, setCountdown] = useState('00:00:00');
  const [selectedCity, setSelectedCity] = useState(() => {
    return localStorage.getItem('quran_user_city') || null;
  });
  const [location, setLocation] = useState({ city: selectedCity || 'المنصورة', country: 'مصر' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const changeCity = (cityName) => {
    setSelectedCity(cityName);
    if (cityName) {
      localStorage.setItem('quran_user_city', cityName);
    } else {
      localStorage.removeItem('quran_user_city');
    }
  };

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        setLoading(true);
        let data = null;
        let lat = null;
        let lon = null;
        let cityName = selectedCity;

        // If manual city is selected from known list
        if (cityName && EGYPTIAN_CITIES[cityName]) {
          const cInfo = EGYPTIAN_CITIES[cityName];
          lat = cInfo.lat;
          lon = cInfo.lon;
        }

        // 1. Try HTML5 Browser Geolocation if no manual city
        if ((!lat || !lon) && navigator.geolocation) {
          const pos = await new Promise((resolve) =>
            navigator.geolocation.getCurrentPosition(resolve, () => resolve(null), {
              timeout: 5000,
              maximumAge: 60000
            })
          );
          if (pos && pos.coords) {
            lat = pos.coords.latitude;
            lon = pos.coords.longitude;
          }
        }

        // 2. If Geolocation failed or denied, try IP location fallback
        if (!lat || !lon) {
          const ipLoc = await getIPLocation();
          if (ipLoc) {
            lat = ipLoc.lat;
            lon = ipLoc.lon;
            if (!cityName) cityName = ipLoc.city;
          }
        }

        // 3. Fetch prayer times by accurate coordinates
        if (lat && lon) {
          data = await getPrayerTimesByCoords(lat, lon);
          
          if (!cityName) {
            const arCity = await reverseGeocodeArabic(lat, lon);
            if (arCity) {
              cityName = arCity;
            } else {
              cityName = 'المنصورة';
            }
          }
        }

        // 4. Fallback to Mansoura, Egypt
        if (!data) {
          const mansoura = EGYPTIAN_CITIES['المنصورة'];
          data = await getPrayerTimesByCoords(mansoura.lat, mansoura.lon);
          cityName = 'المنصورة';
        }

        if (isMounted) {
          if (data && data.timings) {
            setTimes(data.timings);
            const next = getNextPrayerInfo(data.timings);
            setNextPrayer(next);
          }
          setLocation({ city: cityName, country: '' });

          const hijri = await getHijriDate();
          setHijriDate(hijri);
        }
      } catch (err) {
        console.error('Error fetching prayer times:', err);
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => { isMounted = false; };
  }, [selectedCity]);

  // 1-second ticker for accurate countdown
  useEffect(() => {
    if (!times) return;

    const tick = () => {
      const currentNext = getNextPrayerInfo(times);
      setNextPrayer(currentNext);

      if (!currentNext || !currentNext.targetDate) return;

      const diffMs = currentNext.targetDate.getTime() - Date.now();
      if (diffMs <= 0) {
        setCountdown('00:00:00');
        return;
      }

      const totalSecs = Math.floor(diffMs / 1000);
      const hrs = Math.floor(totalSecs / 3600);
      const mins = Math.floor((totalSecs % 3600) / 60);
      const secs = totalSecs % 60;

      setCountdown(
        `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
      );
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [times]);

  const getPrayersList = () => {
    if (!times) return [];
    return ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map(key => ({
      key,
      name: PRAYER_NAMES[key],
      icon: PRAYER_ICONS[key],
      time: times[key] ? to12Hour(times[key]) : '--:--',
      isActive: nextPrayer?.name === key,
    }));
  };

  return {
    times,
    hijriDate,
    nextPrayer,
    nextPrayerName: nextPrayer ? PRAYER_NAMES[nextPrayer.name] : '',
    nextPrayerTime12: nextPrayer ? to12Hour(nextPrayer.time) : '--:--',
    countdown,
    location,
    selectedCity,
    changeCity,
    loading,
    error,
    prayersList: getPrayersList(),
    PRAYER_NAMES,
    PRAYER_ICONS,
  };
};
