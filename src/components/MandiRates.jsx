import React, { useState, useMemo } from 'react';
import {
  Search, ArrowUpRight, ArrowDownRight, MapPin,
  TrendingUp, Info, Volume2, VolumeX, Zap, BarChart3,
  Clock, SlidersHorizontal, X
} from 'lucide-react';
import { MANDI_RATES, CROP_CATEGORIES, STATES_LIST } from '../data/mandiRates';
import { TRANSLATIONS } from '../data/translations';

const CATEGORY_COLORS = {
  'Vegetable': { color: '#10b981', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)' },
  'Fruit':     { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)' },
  'Grain':     { color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)' },
  'Spice':     { color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.3)' },
  'Oilseed':   { color: '#f43f5e', bg: 'rgba(244,63,94,0.12)',  border: 'rgba(244,63,94,0.3)' },
};

const SORT_OPTIONS = [
  { val: 'modalPriceHigh', en: 'Price: High → Low', mr: 'भाव: जास्त → कमी', hi: 'दाम: ज़्यादा → कम' },
  { val: 'modalPriceLow',  en: 'Price: Low → High', mr: 'भाव: कमी → जास्त', hi: 'दाम: कम → ज़्यादा' },
  { val: 'dailyChange',    en: 'Top Gainers First', mr: 'सर्वाधिक वाढ', hi: 'सबसे ज़्यादा तेजी' },
];

export default function MandiRates({ onOpenPrediction, lang = 'en' }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const isMr = lang === 'mr', isHi = lang === 'hi';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedState, setSelectedState] = useState('All States');
  const [sortBy, setSortBy] = useState('modalPriceHigh');
  const [selectedCropDetail, setSelectedCropDetail] = useState(null);
  const [activeAudioCropId, setActiveAudioCropId] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredCrops = useMemo(() => {
    return MANDI_RATES.filter(crop => {
      const matchSearch =
        crop.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crop.mandi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crop.district.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = selectedCategory === 'All' || crop.category === selectedCategory;
      const matchState = selectedState === 'All States' || crop.state === selectedState;
      return matchSearch && matchCat && matchState;
    }).sort((a, b) => {
      if (sortBy === 'modalPriceHigh') return b.modalPrice - a.modalPrice;
      if (sortBy === 'modalPriceLow')  return a.modalPrice - b.modalPrice;
      if (sortBy === 'dailyChange')    return b.dailyChange - a.dailyChange;
      return 0;
    });
  }, [searchTerm, selectedCategory, selectedState, sortBy]);

  const handleSpeakCrop = (crop) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (activeAudioCropId === crop.id) { setActiveAudioCropId(null); return; }
    const script = isHi
      ? `${crop.mandi} में ${crop.crop} का औसत भाव ${crop.modalPrice} रुपया प्रति क्विंटल। AI सलाह: ${crop.prediction.recommendation}`
      : isMr
      ? `${crop.mandi} मध्ये ${crop.crop} चा सरासरी भाव ${crop.modalPrice} रुपये प्रति क्विंटल. AI सल्ला: ${crop.prediction.recommendation}`
      : `${crop.crop} in ${crop.mandi} is ₹${crop.modalPrice} per quintal. AI says: ${crop.prediction.recommendation}`;
    const u = new SpeechSynthesisUtterance(script);
    u.lang = isHi ? 'hi-IN' : isMr ? 'mr-IN' : 'en-US';
    u.rate = 0.9;
    u.onend = () => setActiveAudioCropId(null);
    u.onerror = () => setActiveAudioCropId(null);
    setActiveAudioCropId(crop.id);
    window.speechSynthesis.speak(u);
  };

  const catColor = (cat) => CATEGORY_COLORS[cat] || { color: '#9ca3af', bg: 'rgba(156,163,175,0.1)', border: 'rgba(156,163,175,0.3)' };
  const activeFilters = [selectedCategory !== 'All', selectedState !== 'All States', !!searchTerm].filter(Boolean).length;

  return (
    <div className="mr2-root">

      {/* ── Hero ── */}
      <div className="mr2-hero">
        <div className="mr2-hero-left">
          <span className="mr2-hero-pill">
            <span className="mr2-live-dot"/>
            {isMr ? 'ताजे मंडी भाव' : isHi ? 'ताज़ा मंडी भाव' : 'Live Mandi Rates'}
          </span>
          <h1 className="mr2-hero-title">{t.heroTitle}</h1>
          <p className="mr2-hero-sub">{t.heroSubtitle}</p>
        </div>
        <div className="mr2-hero-stats">
          {[
            ['54+',   isMr ? 'सक्रिय मंडी' : isHi ? 'सक्रिय मंडी' : 'Active Mandis'],
            ['₹4,600', isMr ? 'बासमती सरासरी' : isHi ? 'बासमती औसत' : 'Avg Basmati'],
            ['+8.5%',  isMr ? 'आजची सर्वाधिक वाढ' : isHi ? 'आज की सबसे ज़्यादा तेजी' : "Top Gain Today"],
            [filteredCrops.length, isMr ? 'फसली दिसत आहेत' : isHi ? 'फसलें दिख रही हैं' : 'Crops Shown'],
          ].map(([val, lbl]) => (
            <div key={lbl} className="mr2-hstat">
              <span className="mr2-hstat-val">{val}</span>
              <span className="mr2-hstat-lbl">{lbl}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Search + Filter Bar ── */}
      <div className="mr2-controls">
        <div className="mr2-search-wrap">
          <Search size={18} className="mr2-search-icon"/>
          <input
            className="mr2-search"
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          {searchTerm && <button className="mr2-clear" onClick={() => setSearchTerm('')}><X size={15}/></button>}
        </div>

        <button className={`mr2-filter-toggle ${showFilters ? 'active' : ''}`} onClick={() => setShowFilters(v => !v)}>
          <SlidersHorizontal size={16}/>
          {isMr ? 'फिल्टर' : isHi ? 'फ़िल्टर' : 'Filter'}
          {activeFilters > 0 && <span className="mr2-filter-badge">{activeFilters}</span>}
        </button>
      </div>

      {/* Category Pills */}
      <div className="mr2-cat-pills">
        {['All', ...CROP_CATEGORIES.filter(c => c !== 'All')].map(cat => {
          const cc = catColor(cat);
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              className={`mr2-cat-pill ${isActive ? 'active' : ''}`}
              style={isActive ? { background: cc.bg, borderColor: cc.color, color: cc.color } : {}}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === 'All' ? (isMr ? 'सर्व पिके' : isHi ? 'सभी फसलें' : 'All Crops') : cat}
            </button>
          );
        })}
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="mr2-expanded-filters">
          <div className="mr2-filter-group">
            <label className="mr2-filter-label"><MapPin size={13}/> {isMr ? 'राज्य' : isHi ? 'राज्य' : 'State'}</label>
            <select className="mr2-select" value={selectedState} onChange={e => setSelectedState(e.target.value)}>
              {STATES_LIST.map(s => <option key={s}>{s === 'All States' ? (isMr ? 'सर्व राज्ये' : isHi ? 'सभी राज्य' : s) : s}</option>)}
            </select>
          </div>
          <div className="mr2-filter-group">
            <label className="mr2-filter-label"><BarChart3 size={13}/> {isMr ? 'क्रम' : isHi ? 'क्रम' : 'Sort by'}</label>
            <select className="mr2-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              {SORT_OPTIONS.map(o => (
                <option key={o.val} value={o.val}>{isMr ? o.mr : isHi ? o.hi : o.en}</option>
              ))}
            </select>
          </div>
          <button className="mr2-reset-filters" onClick={() => { setSelectedCategory('All'); setSelectedState('All States'); setSearchTerm(''); setSortBy('modalPriceHigh'); setShowFilters(false); }}>
            <X size={13}/> {isMr ? 'फिल्टर रीसेट' : isHi ? 'फ़िल्टर रीसेट' : 'Reset All'}
          </button>
        </div>
      )}

      {/* ── Cards Grid ── */}
      <div className="mr2-grid">
        {filteredCrops.length === 0 ? (
          <div className="mr2-empty">
            <span>🌾</span>
            <h3>{isMr ? 'कोणतीही फसल आढळली नाही' : isHi ? 'कोई फसल नहीं मिली' : 'No crops found'}</h3>
            <button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedState('All States'); }}>
              {isMr ? 'फिल्टर साफ करा' : isHi ? 'फ़िल्टर साफ़ करें' : 'Clear Filters'}
            </button>
          </div>
        ) : filteredCrops.map(crop => {
          const cc = catColor(crop.category);
          const isUp = crop.trend === 'up';
          const isDown = crop.trend === 'down';
          return (
            <div key={crop.id} className="mr2-card" style={{ '--mr2-color': cc.color, '--mr2-bg': cc.bg, '--mr2-border': cc.border }}>
              {/* Top band */}
              <div className="mr2-card-band" style={{ background: cc.bg, borderBottom: `1px solid ${cc.border}` }}>
                <span className="mr2-cat-tag" style={{ color: cc.color }}>{crop.category}</span>
                <span className={`mr2-trend ${isUp ? 'up' : isDown ? 'down' : 'stable'}`}>
                  {isUp ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>}
                  {crop.dailyChange > 0 ? `+${crop.dailyChange}%` : `${crop.dailyChange}%`}
                </span>
              </div>

              {/* Card body */}
              <div className="mr2-card-body">
                <div className="mr2-card-top">
                  <h3 className="mr2-crop-name">{crop.crop}</h3>
                  <button
                    className={`mr2-voice-btn ${activeAudioCropId === crop.id ? 'active' : ''}`}
                    onClick={() => handleSpeakCrop(crop)}
                    title={t.listenAudio}
                  >
                    {activeAudioCropId === crop.id ? <VolumeX size={14}/> : <Volume2 size={14}/>}
                  </button>
                </div>

                <div className="mr2-location">
                  <MapPin size={12}/> {crop.mandi}, {crop.district}
                </div>

                {/* Source pills */}
                {crop.dataSources && (
                  <div className="mr2-sources">
                    <span className="mr2-consensus">🛡️ {crop.consensusScore || '98.5%'}</span>
                    {crop.dataSources.slice(0, 2).map((s, i) => <span key={i} className="mr2-src-pill">{s}</span>)}
                  </div>
                )}

                {/* Price 3-column block */}
                <div className="mr2-prices">
                  <div className="mr2-price-col">
                    <span>{isMr ? 'किमान' : isHi ? 'न्यूनतम' : 'Min'}</span>
                    <strong>₹{crop.minPrice.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="mr2-price-col primary" style={{ color: cc.color }}>
                    <span>{isMr ? 'सरासरी' : isHi ? 'औसत' : 'Modal'}</span>
                    <strong className="mr2-modal-price">₹{crop.modalPrice.toLocaleString('en-IN')}</strong>
                    <span className="mr2-per-qtl">/Qtl</span>
                  </div>
                  <div className="mr2-price-col">
                    <span>{isMr ? 'कमाल' : isHi ? 'अधिकतम' : 'Max'}</span>
                    <strong>₹{crop.maxPrice.toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                {/* AI Forecast ribbon */}
                <div className="mr2-ai-ribbon">
                  <div className="mr2-ai-left">
                    <Zap size={13} style={{ color: cc.color }}/>
                    <span className="mr2-ai-label">AI</span>
                    <span className="mr2-ai-rec">{crop.prediction.recommendation}</span>
                  </div>
                  <span className="mr2-ai-gain" style={{ color: cc.color }}>{crop.prediction.expectedGainPercent}</span>
                </div>

                {/* Footer actions */}
                <div className="mr2-actions">
                  <button className="mr2-btn-outline" onClick={() => setSelectedCropDetail(crop)}>
                    <Info size={14}/> {isMr ? 'तपशील' : isHi ? 'विस्तार' : 'Details'}
                  </button>
                  <button className="mr2-btn-primary" style={{ background: cc.color }} onClick={() => onOpenPrediction(crop)}>
                    <TrendingUp size={14}/> {isMr ? 'नफा अंदाज' : isHi ? 'मुनाफा अनुमान' : 'Predict ROI'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Detail Modal ── */}
      {selectedCropDetail && (
        <div className="modal-overlay" onClick={() => setSelectedCropDetail(null)}>
          <div className="mr2-modal" onClick={e => e.stopPropagation()}>
            {(() => {
              const crop = selectedCropDetail;
              const cc = catColor(crop.category);
              return <>
                <div className="mr2-modal-header" style={{ background: cc.bg, borderBottom: `1px solid ${cc.border}` }}>
                  <div>
                    <span className="mr2-cat-tag" style={{ color: cc.color }}>{crop.category}</span>
                    <h2 className="mr2-modal-title">{crop.crop}</h2>
                    <p className="mr2-modal-sub"><MapPin size={13}/> {crop.mandi} • {crop.state}</p>
                  </div>
                  <button className="mr2-modal-close" onClick={() => setSelectedCropDetail(null)}><X size={18}/></button>
                </div>

                <div className="mr2-modal-body">
                  <div className="mr2-modal-grid">
                    <div className="mr2-modal-box">
                      <h4>📦 {isMr ? 'बाजार आगमन व गुणवत्ता' : isHi ? 'बाज़ार आगमन और गुणवत्ता' : 'Market Arrivals & Quality'}</h4>
                      <div className="mr2-modal-rows">
                        <div className="mr2-modal-row"><span>{isMr ? 'दैनिक आगमन' : isHi ? 'दैनिक आगमन' : 'Daily Arrivals'}</span><strong>{crop.arrivalQty}</strong></div>
                        <div className="mr2-modal-row"><span>{isMr ? 'गुणवत्ता श्रेणी' : isHi ? 'गुणवत्ता श्रेणी' : 'Quality Grade'}</span><strong>{crop.qualityGrade}</strong></div>
                        <div className="mr2-modal-row"><span><Clock size={12}/> {isMr ? 'अद्यतनित' : isHi ? 'अपडेट' : 'Updated'}</span><strong>{crop.lastUpdated}</strong></div>
                      </div>
                    </div>
                    <div className="mr2-modal-box accent" style={{ background: cc.bg, borderColor: cc.border }}>
                      <h4 style={{ color: cc.color }}>🤖 AI {isMr ? '7 दिवसांचा अंदाज' : isHi ? '7 दिन का अनुमान' : '7-Day Price Forecast'}</h4>
                      <div className="mr2-modal-rows">
                        <div className="mr2-modal-row"><span>{isMr ? '7 दिवसांनंतर' : isHi ? '7 दिन बाद' : '7-Day Rate'}</span><strong style={{ color: cc.color }}>₹{crop.prediction.forecast7Days}/Qtl</strong></div>
                        <div className="mr2-modal-row"><span>{isMr ? 'AI विश्वासार्हता' : isHi ? 'AI विश्वसनीयता' : 'Confidence'}</span><strong>{crop.prediction.confidence}</strong></div>
                        <div className="mr2-modal-row"><span>{isMr ? 'साठवण सल्ला' : isHi ? 'भंडारण सलाह' : 'Storage Advice'}</span><strong>{crop.prediction.storageDaysAdvice}</strong></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mr2-modal-footer">
                  <button className="mr2-btn-outline" onClick={() => setSelectedCropDetail(null)}>{isMr ? 'बंद करा' : isHi ? 'बंद करें' : 'Close'}</button>
                  <button className="mr2-btn-primary" style={{ background: cc.color }} onClick={() => { setSelectedCropDetail(null); onOpenPrediction(crop); }}>
                    <TrendingUp size={14}/> {isMr ? 'मुनाफा अंदाज पहा →' : isHi ? 'मुनाफा अनुमान देखें →' : 'Open Price Predictor →'}
                  </button>
                </div>
              </>;
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
