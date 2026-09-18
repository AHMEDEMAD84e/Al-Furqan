import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllSurahs, getSurah, getSurahAudioUrl, POPULAR_RECITERS } from '../services/quranApi';

export default function QuranPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'surahs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReciter, setSelectedReciter] = useState(() => {
    try {
      const saved = localStorage.getItem('quran_selected_reciter');
      if (saved) {
        const parsed = JSON.parse(saved);
        const match = POPULAR_RECITERS.find(r => r.id === parsed.id);
        if (match) return match;
      }
    } catch {}
    return POPULAR_RECITERS[0];
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSurah, setCurrentSurah] = useState(null);

  // Bookmark / Reading Stop Position State (Saved in localStorage)
  const [bookmark, setBookmark] = useState(() => {
    try {
      const saved = localStorage.getItem('quran_reading_bookmark');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Dedicated Mushaf Tab Reading State
  const [mushafSurahNumber, setMushafSurahNumber] = useState(() => {
    const querySurah = searchParams.get('surah');
    if (querySurah) return parseInt(querySurah, 10);
    try {
      const saved = localStorage.getItem('quran_reading_bookmark');
      return saved ? JSON.parse(saved).surahNumber : 18;
    } catch {
      return 18;
    }
  });
  const [mushafSurahData, setMushafSurahData] = useState(null);
  const [mushafLoading, setMushafLoading] = useState(false);
  const [isSurahDropdownOpen, setIsSurahDropdownOpen] = useState(false);
  
  // Audio state
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsSurahDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    getAllSurahs()
      .then(data => {
        setSurahs(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    const surahParam = searchParams.get('surah');
    if (tabParam === 'mushaf' || surahParam) {
      setActiveTab('mushaf');
      if (surahParam) setMushafSurahNumber(parseInt(surahParam, 10));
    }
  }, [searchParams]);

  // Load Uthmani Surah text whenever mushafSurahNumber or activeTab === 'mushaf' changes
  useEffect(() => {
    if (activeTab === 'mushaf' && mushafSurahNumber) {
      setMushafLoading(true);
      getSurah(mushafSurahNumber)
        .then(setMushafSurahData)
        .catch(console.error)
        .finally(() => setMushafLoading(false));
    }
  }, [activeTab, mushafSurahNumber]);

  const handleSaveBookmark = (surahObj, ayahNumber = 1) => {
    if (!surahObj) return;
    // Toggle: if clicking on the same surah + ayah, clear the bookmark
    if (bookmark?.surahNumber === surahObj.number && bookmark?.ayahNumber === ayahNumber) {
      setBookmark(null);
      try {
        localStorage.removeItem('quran_reading_bookmark');
      } catch (e) {
        console.error(e);
      }
      return;
    }
    const newBm = {
      surahNumber: surahObj.number,
      surahName: surahObj.name,
      ayahNumber: ayahNumber,
      juz: Math.ceil(surahObj.number / 4) || 1,
      date: new Date().toLocaleDateString('ar-EG'),
    };
    setBookmark(newBm);
    try {
      localStorage.setItem('quran_reading_bookmark', JSON.stringify(newBm));
    } catch (e) {
      console.error(e);
    }
  };

  const handleClearBookmark = () => {
    setBookmark(null);
    try {
      localStorage.removeItem('quran_reading_bookmark');
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenReaderTab = (surahObj) => {
    setMushafSurahNumber(surahObj.number);
    setActiveTab('mushaf');
    setSearchParams({ tab: 'mushaf', surah: surahObj.number });
  };

  const filtered = surahs.filter(s =>
    s.name.includes(searchQuery) ||
    s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    String(s.number).includes(searchQuery)
  );

  const handlePlay = (surah, reciterOverride = null) => {
    if (!surah) return;
    const activeReciter = reciterOverride || selectedReciter;
    const url = getSurahAudioUrl(surah.number, activeReciter);
    if (audioRef.current) {
      if (isPlaying && currentSurah?.number === surah.number && !reciterOverride) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setCurrentSurah(surah);
        audioRef.current.src = url;
        audioRef.current.play().catch(console.error);
        setIsPlaying(true);
      }
    }
  };

  const handleReciterChange = (reciter) => {
    setSelectedReciter(reciter);
    try {
      localStorage.setItem('quran_selected_reciter', JSON.stringify(reciter));
    } catch (e) {
      console.error(e);
    }
    if (currentSurah) {
      handlePlay(currentSurah, reciter);
    }
  };

  const handleNextSurah = () => {
    if (!currentSurah || surahs.length === 0) return;
    const idx = surahs.findIndex(s => s.number === currentSurah.number);
    if (idx !== -1 && idx < surahs.length - 1) {
      handlePlay(surahs[idx + 1]);
    }
  };

  const handlePrevSurah = () => {
    if (!currentSurah || surahs.length === 0) return;
    const idx = surahs.findIndex(s => s.number === currentSurah.number);
    if (idx > 0) {
      handlePlay(surahs[idx - 1]);
    }
  };

  const handleSeek = (e) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = Math.floor(secs % 60);
    if (h > 0) {
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const formatSurahName = (name) => {
    if (!name) return '';
    return name.startsWith('سُورَةُ') ? name : `سورة ${name}`;
  };

  const waveBars = Array.from({ length: 18 }, (_, i) => ({
    height: Math.random() * 12 + 4,
    delay: i * 0.05,
  }));

  return (
    <div className="animate-fade-up">
      <audio
        ref={audioRef}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={handleNextSurah}
      />

      {/* ── Top Controls ── */}
      <div className="quran-header-bar">
        <div className="quran-tabs-desktop">
          {[
            { id: 'surahs', label: 'فهرس السور والتلاوات', iconClass: 'bx bxs-book-open' },
            { id: 'mushaf', label: 'المصحف الشريف والقراءة', iconClass: 'bx bxs-book-bookmark' },
            { id: 'reciters', label: `القراء الكرام (${POPULAR_RECITERS.length} قارئ)`, iconClass: 'bx bx-microphone' },
          ].map(t => (
            <button
              key={t.id}
              className={`quran-tab-btn ${activeTab === t.id ? 'active' : ''}`}      
              onClick={() => {
                setActiveTab(t.id);
                setSearchParams({ tab: t.id });
              }}
            >
              <i className={t.iconClass} style={{ fontSize: '18px' }}></i>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Search ── */}
      <div style={{ marginBottom: '20px' }}>
        <div className="header-search-box" style={{ maxWidth: '100%', padding: '10px 20px' }}>
          <i className="bx bx-search search-icon" style={{ fontSize: '18px', color: 'var(--gold)' }}></i>
          <input
            type="text"
            placeholder="ابحث برقم السورة أو اسمها أو بالإنجليزية…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ fontSize: '14px' }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '18px' }}
              title="مسح البحث"
            >
              <i className="bx bx-x"></i>
            </button>
          )}
        </div>
      </div>

      {/* ── Surahs Tab ── */}
      {activeTab === 'surahs' && (
        <>
          <div className="section-header">
            <div className="section-title">
              <i className="bx bxs-book-content icon" style={{ fontSize: '20px', color: 'var(--gold)' }}></i>
              <span>سور القرآن الكريم</span>
              <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--text-muted)' }}>
                ({filtered.length} سورة)
              </span>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--gold)', fontWeight: 700 }}>
              🎙 القارئ الحالي: {selectedReciter.name}
            </span>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="spinner" />
              <span>جارٍ تحميل فهرس القرآن الكريم…</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="loading-container">
              <i className="bx bx-search-alt" style={{ fontSize: '48px', color: 'var(--gold)' }}></i>
              <span>لا توجد نتائج للبحث</span>
            </div>
          ) : (
            <div className="surahs-desktop-grid">
              {filtered.map((surah) => {
                const isCurrentSelected = currentSurah?.number === surah.number;
                const isCurrentPlaying = isCurrentSelected && isPlaying;
                return (
                  <div
                    key={surah.number}
                    className={`surah-card-web ${isCurrentSelected ? 'active-card' : ''}`}
                    onClick={() => handlePlay(surah)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                        <div className="surah-badge-num">{surah.number}</div>
                        <div style={{ minWidth: 0 }}>
                          <div className="surah-web-name">
                            <span>{surah.name}</span>
                          </div>
                          <div className="surah-web-meta" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <i className={surah.revelationType === 'Meccan' ? "bx bxs-building-house" : "bx bxs-institution"} style={{ color: 'var(--gold)' }}></i>
                            <span>{surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}</span>
                            <span>●</span>
                            <span>{surah.numberOfAyahs} آية</span>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          className="btn-icon"
                          style={{ width: '34px', height: '34px', fontSize: '15px' }}
                          onClick={e => { e.stopPropagation(); handleOpenReaderTab(surah); }}
                          title="قراءة المصحف الشريف"
                        >
                          <i className="bx bxs-book-open" style={{ color: 'var(--gold)' }}></i>
                        </button>

                        <button
                          className="btn-icon"
                          style={isCurrentPlaying ? { background: 'var(--gold)', color: '#000', border: 'none', width: '34px', height: '34px' } : { width: '34px', height: '34px' }}
                          onClick={e => { e.stopPropagation(); handlePlay(surah); }}
                          aria-label="تشغيل السورة"
                          title="استمع للتلاوة"
                        >
                          <i className={isCurrentPlaying ? "bx bx-pause" : "bx bx-play"} style={{ fontSize: '18px' }}></i>
                        </button>
                      </div>
                    </div>

                    {/* ── Inline Sleek Player & Counter Inside Card ── */}
                    {isCurrentSelected && (
                      <div className="inline-surah-player" onClick={e => e.stopPropagation()}>
                        <div className="inline-player-top">
                          <span className="player-time-digits">{formatTime(currentTime)}</span>
                          <div className="inline-seekbar-box">
                            <input
                              type="range"
                              className="audio-seekbar"
                              min={0}
                              max={duration || 100}
                              step={0.1}
                              value={currentTime}
                              onChange={handleSeek}
                              style={{
                                background: `linear-gradient(to left, var(--gold) ${(currentTime / (duration || 1)) * 100}%, var(--bg-elevated) ${(currentTime / (duration || 1)) * 100}%)`
                              }}
                            />
                          </div>
                          <span className="player-time-digits">{formatTime(duration)}</span>
                        </div>

                        <div className="inline-player-meta">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div className="waveform-bars">
                              {Array.from({ length: 7 }).map((_, i) => (
                                <div
                                  key={i}
                                  className={`waveform-bar ${isPlaying ? 'active' : ''}`}
                                  style={{ animationDelay: `${i * 0.1}s`, height: isPlaying ? '12px' : '4px' }}
                                />
                              ))}
                            </div>
                            <span style={{ fontSize: '11px', color: 'var(--gold)', fontWeight: 700 }}>
                              🎙 {selectedReciter.name}
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <button
                              className="btn-icon"
                              style={{ width: '26px', height: '26px', border: 'none', background: 'none' }}
                              onClick={toggleMute}
                              title="كتم/تشغيل الصوت"
                            >
                              <i className={isMuted || volume === 0 ? "bx bx-volume-mute" : volume < 0.5 ? "bx bx-volume-low" : "bx bx-volume-full"} style={{ color: 'var(--gold)', fontSize: '16px' }}></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* ── Dedicated Mushaf Reading Tab (المصحف الشريف والقراءة) ── */}
      {activeTab === 'mushaf' && (
        <div className="mushaf-reader-tab-view animate-fade-up">
          {/* Mushaf Header Toolbar */}
          <div className="web-hero-card" style={{ padding: '20px 28px', marginBottom: '20px', position: 'relative', zIndex: 100, overflow: 'visible' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <i className="bx bxs-book-bookmark" style={{ fontSize: '32px', color: 'var(--gold)' }}></i>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)', fontFamily: 'var(--font-quran)' }}>
                    {mushafSurahData?.name || 'المصحف الشريف بالرسم العثماني'}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--gold)', marginTop: '2px' }}>
                    {mushafSurahData?.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} ● {mushafSurahData?.numberOfAyahs || 0} آية
                  </div>
                </div>
              </div>

              {/* Selector & Nav */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  className="btn-icon"
                  style={{ width: '36px', height: '36px' }}
                  onClick={() => mushafSurahNumber > 1 && setMushafSurahNumber(mushafSurahNumber - 1)}
                  disabled={mushafSurahNumber <= 1}
                  title="السورة السابقة"
                >
                  <i className="bx bx-chevron-right" style={{ fontSize: '22px' }}></i>
                </button>

                <div className="custom-surah-dropdown" ref={dropdownRef}>
                  <button
                    type="button"
                    className={`custom-select-trigger ${isSurahDropdownOpen ? 'open' : ''}`}
                    onClick={() => setIsSurahDropdownOpen(!isSurahDropdownOpen)}
                  >
                    <span>
                      {surahs.find(s => s.number === mushafSurahNumber)?.number || mushafSurahNumber}. {surahs.find(s => s.number === mushafSurahNumber)?.name || 'اختر السورة'}
                    </span>
                    <i className={`bx bx-chevron-down arrow-icon ${isSurahDropdownOpen ? 'rotate' : ''}`}></i>
                  </button>

                  {isSurahDropdownOpen && (
                    <div className="custom-select-options">
                      <div className="dropdown-options-list">
                        {surahs.map(s => (
                          <div
                            key={s.number}
                            className={`custom-option-item ${s.number === mushafSurahNumber ? 'selected' : ''}`}
                            onClick={() => {
                              setMushafSurahNumber(s.number);
                              setIsSurahDropdownOpen(false);
                            }}
                          >
                            <span className="option-num">{s.number}.</span>
                            <span className="option-name">{s.name}</span>
                            <span className="option-ayahs">({s.numberOfAyahs} آية)</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  className="btn-icon"
                  style={{ width: '36px', height: '36px' }}
                  onClick={() => mushafSurahNumber < 114 && setMushafSurahNumber(mushafSurahNumber + 1)}
                  disabled={mushafSurahNumber >= 114}
                  title="السورة التالية"
                >
                  <i className="bx bx-chevron-left" style={{ fontSize: '22px' }}></i>
                </button>

                {bookmark?.surahNumber === mushafSurahNumber ? (
                  <button
                    className="btn btn-outline"
                    style={{ fontSize: '13px', padding: '8px 18px' }}
                    onClick={handleClearBookmark}
                  >
                    <i className="bx bxs-bookmark-minus"></i>
                    <span>إزالة الفاصل ❌</span>
                  </button>
                ) : (
                  <button
                    className="btn btn-gold"
                    style={{ fontSize: '13px', padding: '8px 18px' }}
                    onClick={() => handleSaveBookmark(mushafSurahData || { number: mushafSurahNumber, name: `سورة رقم ${mushafSurahNumber}` }, 1)}
                  >
                    <i className="bx bxs-bookmark-star"></i>
                    <span>حفظ الفاصل (علامة التوقف) 📌</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Mushaf Uthmani Ayahs Container */}
          <div className="web-verse-card" style={{ padding: '36px 42px' }}>
            {mushafLoading ? (
              <div className="loading-container" style={{ padding: '60px' }}>
                <div className="spinner" />
                <span>جارٍ تحميل النص القرآني بالرسم العثماني الشريف…</span>
              </div>
            ) : mushafSurahData ? (
              <div className="quran-text-uthmani-view">
                {/* Bismillah for surahs other than Al-Tawbah (9) and Al-Fatiha (1) */}
                {mushafSurahData.number !== 1 && mushafSurahData.number !== 9 && (
                  <div className="bismillah-header-text">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </div>
                )}

                <div className="ayahs-paragraph-flow">
                  {(mushafSurahData.ayahs || []).map((ayah) => {
                    const isBookmarkedAyah =
                      bookmark?.surahNumber === mushafSurahData.number &&
                      bookmark?.ayahNumber === ayah.numberInSurah;

                    return (
                      <span
                        key={ayah.numberInSurah}
                        className={`ayah-span-item ${isBookmarkedAyah ? 'bookmarked-ayah' : ''}`}
                        onClick={() => handleSaveBookmark(mushafSurahData, ayah.numberInSurah)}
                        title="اضغط لوضع علامة التوقف عند هذه الآية 📌"
                      >
                        <span className="ayah-text-content">{ayah.text}</span>
                        <span className="ayah-number-badge">
                          ﴿{ayah.numberInSurah}﴾
                        </span>
                        {isBookmarkedAyah && (
                          <span className="bookmark-stop-flag">📌 فاصل التوقف المحفوظ</span>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="loading-container">
                <i className="bx bx-error" style={{ fontSize: '32px', color: 'var(--gold)' }}></i>
                <span>تعذّر تحميل السورة الشريفة</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Reciters Tab (القراء الكرام) ── */}
      {activeTab === 'reciters' && (
        <div className="animate-fade-up">
          <div className="section-header">
            <div className="section-title">
              <i className="bx bx-microphone icon" style={{ fontSize: '20px', color: 'var(--gold)' }}></i>
              <span>القراء الكرام</span>
              <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--text-muted)' }}>
                ({POPULAR_RECITERS.length} قارئ)
              </span>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--gold)', fontWeight: 700 }}>
              🎙 القارئ الحالي: {selectedReciter.name}
            </span>
          </div>

          <div className="surahs-desktop-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))' }}>
            {POPULAR_RECITERS.map((reciter) => {
              const isSelected = selectedReciter.id === reciter.id;
              return (
                <div
                  key={reciter.id}
                  className={`surah-card-web ${isSelected ? 'active-card' : ''}`}
                  onClick={() => handleReciterChange(reciter)}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
                      <div style={{
                        width: '48px', height: '48px', borderRadius: '50%',
                        background: isSelected
                          ? 'linear-gradient(135deg, var(--gold-dark), var(--gold))'
                          : 'var(--bg-elevated)',
                        border: isSelected ? '2px solid var(--gold)' : '1px solid var(--border-gold)',
                        color: isSelected ? '#000' : 'var(--gold)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '22px', flexShrink: 0,
                        transition: 'all 0.25s ease',
                        boxShadow: isSelected ? '0 4px 16px rgba(212,175,55,0.3)' : 'none'
                      }}>
                        <i className={isSelected ? "bx bxs-microphone" : "bx bx-microphone"}></i>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: '16px', fontWeight: 800, color: isSelected ? 'var(--gold-light)' : 'var(--text-primary)' }}>
                          {reciter.name}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {reciter.nameEn}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {isSelected && (
                        <span style={{
                          fontSize: '10px', background: 'var(--gold)', color: '#000',
                          padding: '3px 10px', borderRadius: 'var(--radius-full)', fontWeight: 800,
                          display: 'inline-flex', alignItems: 'center', gap: '4px'
                        }}>
                          <i className="bx bx-check"></i>
                          مختار
                        </span>
                      )}
                      <button
                        className="btn-icon"
                        style={isSelected
                          ? { background: 'var(--gold)', color: '#000', border: 'none', width: '36px', height: '36px' }
                          : { width: '36px', height: '36px' }
                        }
                        onClick={e => { e.stopPropagation(); handleReciterChange(reciter); }}
                        title="اختيار القارئ"
                      >
                        <i className={isSelected ? "bx bx-check-circle" : "bx bx-right-arrow-circle"} style={{ fontSize: '18px' }}></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}