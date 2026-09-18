// Prayer Times API - aladhan.com with auto method & reverse geocoding
export const EGYPTIAN_CITIES = {
  'المنصورة': { lat: 31.0409, lon: 31.3785, city: 'Mansoura', country: 'EG' },
  'القاهرة': { lat: 30.0444, lon: 31.2357, city: 'Cairo', country: 'EG' },
  'الإسكندرية': { lat: 31.2001, lon: 29.9187, city: 'Alexandria', country: 'EG' },
  'طنطا': { lat: 30.7865, lon: 31.0004, city: 'Tanta', country: 'EG' },
  'زفتى': { lat: 30.7126, lon: 31.2483, city: 'Zifta', country: 'EG' },
  'الزقازيق': { lat: 30.5877, lon: 31.5020, city: 'Zagazig', country: 'EG' },
  'الجيزة': { lat: 30.0131, lon: 31.2089, city: 'Giza', country: 'EG' },
  'أسيوط': { lat: 27.1783, lon: 31.1859, city: 'Asyut', country: 'EG' },
  'مكة المكرمة': { lat: 21.3891, lon: 39.8579, city: 'Mecca', country: 'SA' },
  'المدينة المنورة': { lat: 24.5247, lon: 39.5692, city: 'Medina', country: 'SA' },
  'الرياض': { lat: 24.7136, lon: 46.6753, city: 'Riyadh', country: 'SA' },
};

export const getPrayerTimesByCoords = async (lat, lon, method = null) => {
  if (!method) {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('Cairo') || tz.includes('Africa/')) {
      method = 5; // Egyptian General Authority of Survey
    } else if (tz.includes('Riyadh') || tz.includes('Saudi')) {
      method = 4; // Umm Al-Qura
    } else if (tz.includes('Dubai') || tz.includes('Muscat') || tz.includes('Kuwait') || tz.includes('Qatar')) {
      method = 8; // Gulf Region
    } else {
      method = 5;
    }
  }

  const today = new Date();
  const date = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  
  const res = await fetch(
    `https://api.aladhan.com/v1/timings/${date}?latitude=${lat}&longitude=${lon}&method=${method}`
  );
  if (!res.ok) throw new Error('Failed to fetch prayer times');
  const data = await res.json();
  return data.data;
};

export const getPrayerTimes = async (city = 'Cairo', country = 'EG', method = 5) => {
  const today = new Date();
  const date = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  const res = await fetch(
    `https://api.aladhan.com/v1/timingsByCity/${date}?city=${city}&country=${country}&method=${method}`
  );
  if (!res.ok) throw new Error('Failed to fetch prayer times');
  const data = await res.json();
  return data.data;
};

export const reverseGeocodeArabic = async (lat, lon) => {
  // If coordinates are close to Mansoura (Daqahlia region)
  if (lat >= 30.95 && lat <= 31.15 && lon >= 31.25 && lon <= 31.50) {
    return 'المنصورة';
  }

  try {
    // OpenStreetMap Nominatim reverse geocoding in Arabic
    const nomRes = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=12&accept-language=ar`
    );
    if (nomRes.ok) {
      const nomData = await nomRes.json();
      const addr = nomData.address;
      if (addr) {
        const rawCity = addr.city || addr.town || addr.municipality || addr.city_district || addr.state_district || addr.county || addr.state;
        if (rawCity) {
          if (rawCity.includes('المنصورة')) return 'المنصورة';
          return rawCity.replace(/^(مركز|محافظة|مدينة)\s+/, '');
        }
      }
    }
  } catch (e) {
    console.warn('Nominatim reverse geocode failed:', e);
  }

  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=ar`
    );
    if (res.ok) {
      const data = await res.json();
      const city = data.city || data.locality || data.principalSubdivision || data.countryName;
      if (city) {
        if (city.includes('المنصورة')) return 'المنصورة';
        return city;
      }
    }
  } catch (e) {
    console.warn('BigDataCloud reverse geocode failed:', e);
  }
  return null;
};

export const getIPLocation = async () => {
  try {
    const res = await fetch('https://ipapi.co/json/');
    if (res.ok) {
      const data = await res.json();
      if (data.latitude && data.longitude) {
        let city = data.city || 'موقعك';
        if (city.toLowerCase().includes('mansoura') || (data.latitude >= 30.95 && data.latitude <= 31.15 && data.longitude >= 31.25 && data.longitude <= 31.50)) {
          city = 'المنصورة';
        }
        return {
          lat: data.latitude,
          lon: data.longitude,
          city: city,
          country: data.country_name || ''
        };
      }
    }
  } catch (e) {
    console.warn('IP location fetch failed:', e);
  }
  return null;
};

export const getHijriDate = async () => {
  const today = new Date();
  const date = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  const res = await fetch(`https://api.aladhan.com/v1/gToH/${date}`);
  if (!res.ok) throw new Error('Failed to fetch Hijri date');
  const data = await res.json();
  return data.data.hijri;
};
