// Quran API & Verified MP3 Quran Reciter Servers

const BASE = 'https://api.alquran.cloud/v1';

export const getAllSurahs = async () => {
  const res = await fetch(`${BASE}/surah`);
  if (!res.ok) throw new Error('Failed to fetch surahs');
  const data = await res.json();
  return data.data;
};

export const getSurah = async (number) => {
  const res = await fetch(`${BASE}/surah/${number}/quran-uthmani`);
  if (!res.ok) throw new Error('Failed to fetch surah');
  const data = await res.json();
  return data.data;
};

export const getAyah = async (reference) => {
  const res = await fetch(`${BASE}/ayah/${reference}/quran-uthmani`);
  if (!res.ok) throw new Error('Failed to fetch ayah');
  const data = await res.json();
  return data.data;
};

export const getVerseOfDay = async () => {
  const dayOfYear = Math.floor(
    (new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000
  );
  const ayahNumber = (dayOfYear % 6236) + 1;
  return getAyah(ayahNumber);
};

// Verified 100% Working Quran Reciters with High-Quality CDNs
export const POPULAR_RECITERS = [
  { id: 'afs', name: 'مشاري راشد العفاسي', nameEn: 'Mishary Rashid Alafasy', server: 'https://server8.mp3quran.net/afs/' },
  { id: 'basit', name: 'عبد الباسط عبد الصمد (مرتل)', nameEn: 'Abdulbasit (Murattal)', server: 'https://server7.mp3quran.net/basit/' },
  { id: 'minsh', name: 'محمد صديق المنشاوي (مرتل)', nameEn: 'Al-Minshawi (Murattal)', server: 'https://server10.mp3quran.net/minsh/' },
  { id: 'sds', name: 'عبد الرحمن السديس', nameEn: 'Abdul Rahman Al-Sudais', server: 'https://server11.mp3quran.net/sds/' },
  { id: 'shur', name: 'سعود الشريم', nameEn: 'Saoud Al-Shuraim', server: 'https://server7.mp3quran.net/shur/' },
  { id: 's_gmd', name: 'سعد الغامدي', nameEn: 'Saad Al-Ghamdi', server: 'https://server7.mp3quran.net/s_gmd/' },
  { id: 'ajm', name: 'أحمد بن علي العجمي', nameEn: 'Ahmed Al-Ajmi', server: 'https://server10.mp3quran.net/ajm/' },
  { id: 'maher', name: 'ماهر المعيقلي', nameEn: 'Maher Al-Muaiqly', server: 'https://server12.mp3quran.net/maher/' },
  { id: 'yasser', name: 'ياسر الدوسري', nameEn: 'Yasser Al-Dosari', server: 'https://server11.mp3quran.net/yasser/' },
  { id: 'abkr', name: 'إدريس أبكر', nameEn: 'Idrees Abkar', server: 'https://server6.mp3quran.net/abkr/' },
  { id: 'qtm', name: 'ناصر القطامي', nameEn: 'Nasser Al-Qatami', server: 'https://server6.mp3quran.net/qtm/' },
  { id: 'hthfi', name: 'علي بن عبد الرحمن الحذيفي', nameEn: 'Ali Al-Hudhaify', server: 'https://server9.mp3quran.net/hthfi/' },
  { id: 'bna', name: 'محمود علي البنا', nameEn: 'Mahmoud Ali Al-Banna', server: 'https://server8.mp3quran.net/bna/' },
];

export const getSurahAudioUrl = (surahNumber, reciterIdOrObj = 'afs') => {
  const pad = String(surahNumber).padStart(3, '0');
  let reciter = POPULAR_RECITERS.find(r => r.id === reciterIdOrObj);
  if (!reciter && typeof reciterIdOrObj === 'object' && reciterIdOrObj?.server) {
    reciter = reciterIdOrObj;
  }
  const server = reciter?.server || 'https://server8.mp3quran.net/afs/';
  return `${server}${pad}.mp3`;
};
