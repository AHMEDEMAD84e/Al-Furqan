import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAdhkarByCategory, ADHKAR_CATEGORIES } from '../services/adhkarApi';

export default function AdhkarPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('tab') || 'morning');
  const [adhkarData, setAdhkarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedIdx, setCopiedIdx] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await getAdhkarByCategory(activeCategory);
        setAdhkarData(data?.array || []);
        setCounts({});
      } catch (err) {
        console.error(err);
        setAdhkarData([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [activeCategory]);

  const handleTabChange = (catId) => {
    setActiveCategory(catId);
    setSearchParams({ tab: catId });
    setSearchQuery('');
  };

  const filteredAdhkar = adhkarData.filter(item =>
    (item.zekr || '').includes(searchQuery) ||
    (item.reference || '').includes(searchQuery)
  );

  const totalItems = adhkarData.length;
  const completedCount = Object.values(counts).filter(v => v === true).length;
  const pct = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  const handleCount = (idx, repeat) => {
    setCounts(prev => {
      const current = prev[idx] || 0;
      if (current === true) return prev;
      const next = (typeof current === 'number' ? current : 0) + 1;
      return { ...prev, [idx]: next >= repeat ? true : next };
    });
  };

  const isDone = (idx) => counts[idx] === true;

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleResetCategory = () => {
    setCounts({});
  };

  return (
    <div className="animate-fade-up">
      {/* ── Category Bar & Progress ── */}
      <div className="quran-header-bar" style={{ marginBottom: '20px' }}>
        <div className="quran-tabs-desktop" style={{ flexWrap: 'wrap' }}>
          {ADHKAR_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`quran-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => handleTabChange(cat.id)}
            >
              <i className={cat.icon} style={{ fontSize: '18px' }}></i>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: '14px',
          background: 'var(--bg-card)', padding: '8px 18px',
          borderRadius: 'var(--radius-full)', border: '1px solid var(--border)',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>نسبة الإنجاز</span>
            <div style={{ width: '90px', height: '6px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
              <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, var(--gold-dark), var(--gold))', transition: 'width 0.4s ease' }} />
            </div>
            <span style={{ fontWeight: 800, color: 'var(--gold)', fontSize: '14px' }}>{pct}%</span>
          </div>

          <button
            onClick={handleResetCategory}
            style={{
              background: 'none', border: 'none', color: 'var(--text-muted)',
              fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'
            }}
            title="تصفير العداد"
          >
            <i className="bx bx-refresh" style={{ fontSize: '16px' }}></i>
            <span>تصفير</span>
          </button>
        </div>
      </div>

      {/* ── Search Bar ── */}
      <div style={{ marginBottom: '24px' }}>
        <div className="header-search-box" style={{ maxWidth: '100%', padding: '10px 20px' }}>
          <i className="bx bx-search search-icon" style={{ fontSize: '18px', color: 'var(--gold)' }}></i>
          <input
            type="text"
            placeholder="ابحث في الأذكار أو المراجع…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ fontSize: '14px' }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '18px' }}
            >
              <i className="bx bx-x"></i>
            </button>
          )}
        </div>
      </div>

      {/* ── Adhkar Cards Grid ── */}
      {loading ? (
        <div className="loading-container">
          <div className="spinner" />
          <span>جارٍ تحميل الأذكار المباركة…</span>
        </div>
      ) : filteredAdhkar.length === 0 ? (
        <div className="loading-container">
          <i className="bx bx-book-heart" style={{ fontSize: '48px', color: 'var(--gold)' }}></i>
          <span>لا توجد أذكار مطابقة لنتائج البحث</span>
        </div>
      ) : (
        <div className="adhkar-desktop-grid">
          {filteredAdhkar.map((item, idx) => {
            const currentDone = typeof counts[idx] === 'number' ? counts[idx] : 0;
            const repeatNum = parseInt(item.count) || 1;

            return (
              <div
                key={idx}
                className={`web-adhkar-card ${isDone(idx) ? 'done' : ''}`}
              >
                {/* Card Top */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      background: isDone(idx) ? 'var(--gold)' : 'var(--bg-elevated)',
                      border: '1px solid var(--border-gold)',
                      color: isDone(idx) ? '#000' : 'var(--gold)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: 800,
                    }}>
                      {isDone(idx) ? <i className="bx bx-check" style={{ fontSize: '16px' }}></i> : idx + 1}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      التكرار المطلوب: {item.count}
                    </span>
                  </div>

                  {/* Actions: Copy */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      className="btn-icon"
                      style={{ width: '32px', height: '32px', fontSize: '14px' }}
                      onClick={() => handleCopy(item.zekr, idx)}
                      title="نسخ الذكر"
                    >
                      <i className={copiedIdx === idx ? "bx bx-check" : "bx bx-copy"} style={{ color: copiedIdx === idx ? 'var(--gold)' : 'inherit' }}></i>
                    </button>
                  </div>
                </div>

                {/* Dhikr Text */}
                <div className="web-adhkar-text">
                  {item.zekr}
                </div>

                {/* Reference */}
                {item.reference && (
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <i className="bx bx-book-bookmark" style={{ color: 'var(--gold)' }}></i>
                    <span>{item.reference}</span>
                  </div>
                )}

                {/* Counter Button */}
                <button
                  className={`adhkar-web-counter-btn ${isDone(idx) ? 'done' : ''}`}
                  onClick={() => !isDone(idx) && handleCount(idx, repeatNum)}
                >
                  <i className={isDone(idx) ? "bx bx-check-circle" : "bx bx-pointer"} style={{ fontSize: '16px' }}></i>
                  <span>
                    {isDone(idx)
                      ? 'تمت القراءة كاملة'
                      : `اضغط للعد (${currentDone} / ${repeatNum})`}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Completion Celebration Banner */}
      {pct === 100 && (
        <div style={{
          marginTop: '32px',
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))',
          border: '1px solid var(--border-gold)',
          borderRadius: 'var(--radius-lg)',
          textAlign: 'center',
          animation: 'fadeUp 0.5s ease-out'
        }}>
          <i className="bx bxs-star" style={{ fontSize: '48px', color: 'var(--gold)', marginBottom: '10px', display: 'block' }}></i>
          <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--gold)', marginBottom: '6px' }}>
            أحسنت! أتممت جميع أذكار هذه القائمة
          </div>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            «أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ»
          </div>
        </div>
      )}
    </div>
  );
}
