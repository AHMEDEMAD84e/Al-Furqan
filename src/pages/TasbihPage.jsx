import React, { useState, useEffect, useCallback } from 'react';

const DHIKR_OPTIONS = [
  { id: 'subhan',   text: 'سُبْحَانَ اللّهِ',          short: 'سبحان الله',      praise: 'سبحان الله وبحمده ● سبحان الله العظيم' },
  { id: 'hamd',     text: 'الْحَمْدُ لِلّهِ',          short: 'الحمد لله',        praise: 'الحمد لله رب العالمين' },
  { id: 'la-ilaha', text: 'لَا إِلَهَ إِلَّا اللّهُ', short: 'لا إله إلا الله', praise: 'لا إله إلا الله وحده لا شريك له' },
  { id: 'allahu',   text: 'اللَّهُ أَكْبَرُ',          short: 'الله أكبر',        praise: 'الله أكبر كبيراً والحمد لله كثيراً' },
];

const TARGETS = [33, 99, 100, 0];

const getTodayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const getTasbihHistory = () => {
  try {
    const raw = localStorage.getItem('quran_tasbih_history');
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
};

const saveTasbihIncrement = () => {
  const history = getTasbihHistory();
  const today = getTodayKey();
  history[today] = (history[today] || 0) + 1;
  try {
    localStorage.setItem('quran_tasbih_history', JSON.stringify(history));
  } catch (e) {
    console.error('Error saving tasbih:', e);
  }
  return history;
};

const calculateStats = (history) => {
  const todayKey = getTodayKey();
  const todayTotal = history[todayKey] || 0;

  // Calculate past 7 days
  let weekTotal = 0;
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    weekTotal += (history[key] || 0);
  }

  return { todayTotal, weekTotal };
};

export default function TasbihPage() {
  const [activeDhikr, setActiveDhikr] = useState(DHIKR_OPTIONS[0]);
  const [target, setTarget]           = useState(33);
  const [count, setCount]             = useState(0);
  const [round, setRound]             = useState(1);
  const [vibrationOn, setVibrationOn] = useState(true);
  const [flashRing, setFlashRing]     = useState(false);

  // Dynamic stats state from localStorage
  const [stats, setStats] = useState(() => calculateStats(getTasbihHistory()));

  const handleTap = useCallback(() => {
    if (vibrationOn && navigator.vibrate) {
      try { navigator.vibrate(25); } catch (e) {}
    }

    // Save to localStorage dynamically
    const updatedHistory = saveTasbihIncrement();
    setStats(calculateStats(updatedHistory));

    setCount(prev => {
      const next = prev + 1;
      if (target && next >= target) {
        setFlashRing(true);
        setTimeout(() => {
          setFlashRing(false);
          setCount(0);
          setRound(r => r + 1);
          if (navigator.vibrate) {
            try { navigator.vibrate([40, 20, 40]); } catch (e) {}
          }
        }, 400);
      }
      return next;
    });
  }, [vibrationOn, target]);

  // Keyboard controls (Space / Enter)
  useEffect(() => {
    const handler = (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleTap();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleTap]);

  const handleReset = () => {
    setCount(0);
    setRound(1);
  };

  const handleDhikrChange = (d) => {
    setActiveDhikr(d);
    setCount(0);
    setRound(1);
  };

  // SVG Ring calculation
  const r               = 100;
  const circ            = 2 * Math.PI * r;
  const effectiveTarget = target || 100;
  const pct             = Math.min(count / effectiveTarget, 1);
  const offset          = circ * (1 - pct);

  return (
    <div className="animate-fade-up">
      <div className="tasbih-desktop-layout">

        {/* ═══ Left: Counter Ring ═══ */}
        <div className="tasbih-counter-box">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '6px', fontSize: '13px', color: 'var(--gold)', fontWeight: 700 }}>
            <i className="bx bx-disc" style={{ fontSize: '18px' }}></i>
            <span>السبحة الرقمية التفاعلية</span>
          </div>

          <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)', fontFamily: 'var(--font-quran)', marginBottom: '4px' }}>
            {activeDhikr.text}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-quran)', marginBottom: '24px' }}>
            {activeDhikr.praise}
          </div>

          {/* Interactive Ring */}
          <div
            className="tasbih-ring-interactive"
            onClick={handleTap}
            role="button"
            tabIndex={0}
            aria-label="اضغط للتسبيح"
            style={flashRing ? { filter: 'drop-shadow(0 0 24px var(--gold))', transform: 'scale(1.02)' } : {}}
          >
            <svg width="240" height="240" viewBox="0 0 240 240">
              <circle cx="120" cy="120" r={r} strokeWidth="10" stroke="rgba(212,175,55,0.1)" fill="none" />
              
              {/* Dots on ring */}
              {Array.from({ length: 33 }, (_, i) => {
                const angle = (i / 33) * 2 * Math.PI - Math.PI / 2;
                const x = 120 + (r + 14) * Math.cos(angle);
                const y = 120 + (r + 14) * Math.sin(angle);
                return (
                  <circle
                    key={i} cx={x} cy={y} r="2.5"
                    fill={i < (count % 33 || (count > 0 && count % 33 === 0 ? 33 : 0)) ? 'var(--gold)' : 'rgba(212,175,55,0.2)'}
                    style={{ transition: 'fill 0.2s' }}
                  />
                );
              })}

              {/* Arc */}
              <circle
                cx="120" cy="120" r={r}
                strokeWidth="10"
                stroke="url(#goldGrad)"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={offset}
                style={{
                  transition: 'stroke-dashoffset 0.25s ease',
                  transform: 'rotate(-90deg)',
                  transformOrigin: '120px 120px',
                }}
              />
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#aa841e" />
                  <stop offset="100%" stopColor="#f3e5ab" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center Count */}
            <div style={{ position: 'absolute', textAlign: 'center', pointerEvents: 'none' }}>
              <div style={{
                fontSize: '62px', fontWeight: 900, color: 'var(--gold)',
                fontFamily: 'var(--font-ui)', lineHeight: 1,
                textShadow: '0 0 20px rgba(212,175,55,0.4)',
              }}>
                {count}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                {target ? `/ ${target}` : 'مفتوح ∞'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '13px', color: 'var(--gold)', marginBottom: '6px' }}>
            <i className="bx bx-reset"></i>
            <span>الدورة رقم {round}</span>
          </div>

          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '20px' }}>
            <i className="bx bx-info-circle" style={{ marginLeft: '4px' }}></i>
            اضغط على الدائرة أو زر المسافة (Space) للتسبيح
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button className="btn btn-outline" onClick={handleReset} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <i className="bx bx-refresh" style={{ fontSize: '18px' }}></i>
              <span>تصفير</span>
            </button>
            <button
              className="btn btn-outline"
              onClick={() => setVibrationOn(!vibrationOn)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                color: vibrationOn ? 'var(--gold)' : 'var(--text-muted)',
                borderColor: vibrationOn ? 'var(--gold)' : 'var(--border)'
              }}
            >
              <i className={vibrationOn ? "bx bx-mobile-vibration" : "bx bx-mobile-vibration"} style={{ fontSize: '18px' }}></i>
              <span>{vibrationOn ? 'الاهتزاز مفعل' : 'الاهتزاز معطل'}</span>
            </button>
          </div>
        </div>

        {/* ═══ Right: Options & Dynamic Stats ═══ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Dhikr Selector */}
          <div className="web-side-card" style={{ marginBottom: 0 }}>
            <div className="section-header">
              <div className="section-title">
                <i className="bx bx-select-multiple icon" style={{ fontSize: '20px', color: 'var(--gold)' }}></i>
                <span>اختر صيغة الذكر</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              {DHIKR_OPTIONS.map(d => (
                <button
                  key={d.id}
                  className={`dhikr-option-btn ${activeDhikr.id === d.id ? 'active' : ''}`}
                  onClick={() => handleDhikrChange(d)}
                >
                  {d.short}
                </button>
              ))}
            </div>

            <div className="section-header" style={{ marginBottom: '10px' }}>
              <div className="section-title" style={{ fontSize: '14px' }}>
                <i className="bx bx-target-lock icon" style={{ fontSize: '18px', color: 'var(--gold)' }}></i>
                <span>هدف الدورة الواحدة</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {TARGETS.map(t => (
                <button
                  key={t}
                  className={`target-chip-btn ${target === t ? 'active' : ''}`}
                  onClick={() => setTarget(t)}
                >
                  {t === 0 ? '∞' : t}
                </button>
              ))}
            </div>
          </div>

          {/* Virtues Banner */}
          <div className="web-side-card" style={{
            marginBottom: 0,
            background: 'linear-gradient(135deg, rgba(212,175,55,0.08), var(--bg-card))',
            borderColor: 'var(--border-gold)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <i className="bx bxs-quote-right" style={{ fontSize: '32px', color: 'var(--gold)', marginBottom: '8px', display: 'block' }}></i>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gold)', marginBottom: '8px' }}>
                فضل التسبيح العظيم
              </div>
              <div style={{ fontFamily: 'var(--font-quran)', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 2 }}>
                «كلمتان خفيفتان على اللسان، ثقيلتان في الميزان، حبيبتان إلى الرحمن: سبحان الله وبحمده، سبحان الله العظيم»
              </div>
              <div style={{ fontSize: '11px', color: 'var(--gold)', marginTop: '8px' }}>
                رواه البخاري ومسلم
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
