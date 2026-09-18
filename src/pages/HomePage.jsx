// الصفحة الرئيسية
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import { getVerseOfDay, getAyah } from '../services/quranApi';
import PrayerIcon from '../components/common/PrayerIcon';

export default function HomePage() {
  const { nextPrayer, nextPrayerName, nextPrayerTime12, countdown, location, hijriDate, loading, prayersList } = usePrayerTimes();
  const [verse, setVerse] = useState(null);
  const [verseLoading, setVerseLoading] = useState(true);
  const [isPlayingVerse, setIsPlayingVerse] = useState(false);
  const [tasbihCount, setTasbihCount] = useState(0);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  const fetchVerse = (verseNum = null) => {
    setVerseLoading(true);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlayingVerse(false);

    if (verseNum) {
      getAyah(verseNum)
        .then(setVerse)
        .catch(console.error)
        .finally(() => setVerseLoading(false));
    } else {
      getVerseOfDay()
        .then(setVerse)
        .catch(console.error)
        .finally(() => setVerseLoading(false));
    }
  };

  const handleNextRandomVerse = () => {
    const randomAyahNum = Math.floor(Math.random() * 6236) + 1;
    fetchVerse(randomAyahNum);
  };

  useEffect(() => {
    fetchVerse();
  }, []);

  const handleVersePlay = () => {
    if (!verse) return;
    const url = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${verse.number}.mp3`;
    if (audioRef.current) {
      if (isPlayingVerse) {
        audioRef.current.pause();
        setIsPlayingVerse(false);
      } else {
        audioRef.current.src = url;
        audioRef.current.play().catch(console.error);
        setIsPlayingVerse(true);
      }
    }
  };

  const handleQuickTasbih = () => {
    setTasbihCount(prev => (prev < 99 ? prev + 1 : 0));
  };

  const hijriStr = hijriDate
    ? `${hijriDate.day} ${hijriDate.month.ar} ${hijriDate.year} هـ`
    : '';

  return (
    <div className="animate-fade-up">
      <audio ref={audioRef} onEnded={() => setIsPlayingVerse(false)} />

      {/* ── Hero Banner ── */}
      <div className="web-hero-card">
        <div className="hero-info-side">
          <div className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <PrayerIcon name={nextPrayer?.name || 'Fajr'} size={18} color="var(--gold)" />
            <span>الصلاة القادمة</span>
          </div>

          <div className="hero-prayer-title">
            {loading ? 'جارٍ تحميل المواقيت…' : `صلاة ${nextPrayerName || 'الفجر'}`}
          </div>

          <div className="hero-prayer-time" dir="ltr">
            {loading ? '--:--' : nextPrayerTime12}
          </div>

          <div className="hero-actions">
            <button className="btn btn-outline" onClick={() => navigate('/quran')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <i className="bx bxs-book-open" style={{ fontSize: '18px' }}></i>
              <span>المصحف الشريف</span>
            </button>
          </div>
        </div>

        <div className="hero-countdown-box">
          <div className="countdown-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <i className="bx bx-time-five" style={{ fontSize: '18px', color: 'var(--gold)' }}></i>
            <span>الوقت المتبقي للأذان</span>
          </div>
          <div className="countdown-digits" dir="ltr">{countdown || '00:00:00'}</div>
          <div style={{ marginTop: '12px', fontSize: '13px', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <i className="bx bx-map-pin"></i>
            <span>{location?.city || 'جارٍ تحديد الموقع...'}</span>
            {hijriStr && (
              <>
                <span>•</span>
                <span>{hijriStr}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── 2-Column Grid ── */}
      <div className="home-desktop-grid">
        {/* ═══ Main Column ═══ */}
        <div>
          {/* Prayer Times */}
          <div className="section-header">
            <div className="section-title">
              <i className="bx bx-time-five icon" style={{ fontSize: '20px', color: 'var(--gold)' }}></i>
              <span>مواقيت الصلاة اليوم</span>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              بتوقيت {location?.city || 'جارٍ التحميل'}
            </span>
          </div>

          <div className="prayer-cards-grid">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="web-prayer-card" style={{ opacity: 0.5 }}>
                    <div style={{ height: '70px', background: 'var(--bg-elevated)', borderRadius: '10px', animation: 'pulse 1.5s infinite' }} />
                  </div>
                ))
              : prayersList.map(p => (
                  <div key={p.key} className={`web-prayer-card ${p.isActive ? 'active' : ''}`}>
                    <div className="web-prayer-name">{p.name}</div>
                    <div className="web-prayer-icon" style={{ display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
                      <PrayerIcon name={p.key} size={28} color={p.isActive ? "var(--gold-light)" : "var(--gold)"} />
                    </div>
                    <div className="web-prayer-time" dir="ltr">{p.time}</div>
                  </div>
                ))
            }
          </div>

          {/* Verse of the Day */}
          <div className="section-header">
            <div className="section-title">
              <i className="bx bxs-book-open icon" style={{ fontSize: '20px', color: 'var(--gold)' }}></i>
              <span>آية اليوم والتأمل</span>
              {verse && (
                <span style={{ fontSize: '12px', color: 'var(--gold)', fontWeight: 400 }}>
                  (سورة {verse.surah?.name} ● آية {verse.numberInSurah})
                </span>
              )}
            </div>
            
            <button
              onClick={handleNextRandomVerse}
              style={{
                background: 'var(--gold-muted)', border: '1px solid var(--border-gold)',
                color: 'var(--gold)', padding: '5px 12px', borderRadius: 'var(--radius-full)',
                fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: '6px'
              }}
              title="تغيير الآية والحصول على آية جديدة"
            >
              <i className="bx bx-refresh" style={{ fontSize: '16px' }}></i>
              <span>آية أخرى</span>
            </button>
          </div>

          <div className="web-verse-card">
            {verseLoading ? (
              <div className="loading-container" style={{ padding: '32px' }}>
                <div className="spinner" />
              </div>
            ) : verse ? (
              <>
                <div className="verse-text-large">﴿ {verse.text} ﴾</div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', borderTop: '1px solid var(--border)', paddingTop: '18px', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '14px', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <i className="bx bx-microphone" style={{ color: 'var(--gold)' }}></i>
                      <span>الشيخ مشاري راشد العفاسي</span>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>تلاوة مباركة هادئة</div>
                  </div>
                  <button className="btn btn-gold" onClick={handleVersePlay} style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <i className={isPlayingVerse ? "bx bx-pause" : "bx bx-play"} style={{ fontSize: '20px' }}></i>
                    <span>{isPlayingVerse ? 'إيقاف' : 'استمع للآية'}</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="loading-container">
                <i className="bx bx-error" style={{ fontSize: '32px', color: 'var(--gold)' }}></i>
                <span>تعذّر تحميل الآية</span>
              </div>
            )}
          </div>

          {/* Quick Access */}
          <div className="section-header">
            <div className="section-title">
              <i className="bx bx-zap icon" style={{ fontSize: '20px', color: 'var(--gold)' }}></i>
              <span>الوصول السريع</span>
            </div>
          </div>

          <div className="web-quick-grid">
            <Link to="/adhkar?tab=morning" className="web-quick-card">
              <div className="web-quick-icon">
                <i className="bx bx-sun"></i>
              </div>
              <div>
                <div className="web-quick-title">أذكار الصباح</div>
                <div className="web-quick-sub">حصنك اليومي المأثور</div>
              </div>
            </Link>

            <Link to="/adhkar?tab=evening" className="web-quick-card">
              <div className="web-quick-icon">
                <i className="bx bx-moon"></i>
              </div>
              <div>
                <div className="web-quick-title">أذكار المساء</div>
                <div className="web-quick-sub">سكينة وطمأنينة النفس</div>
              </div>
            </Link>

            <Link to="/quran" className="web-quick-card">
              <div className="web-quick-icon">
                <i className="bx bx-book-content"></i>
              </div>
              <div>
                <div className="web-quick-title">فهرس السور</div>
                <div className="web-quick-sub">١١٤ سورة بأصوات كبار القراء</div>
              </div>
            </Link>

            <Link to="/tasbih" className="web-quick-card">
              <div className="web-quick-icon">
                <i className="bx bx-disc"></i>
              </div>
              <div>
                <div className="web-quick-title">السبحة الرقمية</div>
                <div className="web-quick-sub">عداد الاستغفار والتسبيح</div>
              </div>
            </Link>
          </div>
        </div>

        {/* ═══ Side Column ═══ */}
        <div>
          {/* Quick Tasbih Card */}
          <div className="web-side-card" style={{ textAlign: 'center' }}>
            <div className="section-header" style={{ justifyContent: 'center', marginBottom: '4px' }}>
              <div className="section-title" style={{ fontSize: '15px' }}>
                <i className="bx bx-disc icon" style={{ fontSize: '18px', color: 'var(--gold)' }}></i>
                <span>عداد التسبيح السريع</span>
              </div>
            </div>

            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '18px', fontFamily: 'var(--font-quran)' }}>
              سُبْحَانَ اللّهِ وَبِحَمْدِهِ
            </div>

            <div className="tasbih-quick-circle" onClick={handleQuickTasbih}>
              <div style={{ fontSize: '40px', fontWeight: 900, color: 'var(--gold)', fontFamily: 'var(--font-ui)', lineHeight: 1 }}>
                {tasbihCount}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
                اضغط للعد
              </div>
            </div>

            <Link to="/tasbih" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <i className="bx bx-planet" style={{ fontSize: '18px' }}></i>
              <span>السبحة الكاملة</span>
            </Link>
          </div>

          {/* Daily Hadith Card */}
          <div className="web-side-card" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.06), var(--bg-card))' }}>
            <div style={{ textAlign: 'center' }}>
              <i className="bx bxs-quote-right" style={{ fontSize: '28px', color: 'var(--gold)', marginBottom: '8px', display: 'block' }}></i>
              <div style={{ fontFamily: 'var(--font-quran)', fontSize: '15px', color: 'var(--text-primary)', lineHeight: 2, marginBottom: '10px' }}>
                «أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ»
              </div>
              <div style={{ fontSize: '11px', color: 'var(--gold)' }}>سورة الرعد ● آية ٢٨</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
