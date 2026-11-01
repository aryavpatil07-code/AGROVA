import React, { useState } from 'react';
import { MANDI_RATES } from '../data/mandiRates';
import {
  ShieldCheck, Award, Sliders, CheckCircle2, Download,
  AlertTriangle, Droplets, Trash2, Wheat, Maximize2,
  TrendingUp, TrendingDown, Minus, RefreshCw
} from 'lucide-react';

const GRADE_META = {
  'Grade A+': { color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.35)', icon: '🥇', ring: '#10b981' },
  'Grade A':  { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.35)',  icon: '🥈', ring: '#3b82f6' },
  'Grade B':  { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.35)',  icon: '🥉', ring: '#f59e0b' },
  'Grade C':  { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.35)',   icon: '⚠️', ring: '#ef4444' },
};

function SliderField({ icon, label, hint, value, min, max, step, onChange, getStatus }) {
  const { text, color } = getStatus(value);
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="qg-slider-card">
      <div className="qg-slider-top">
        <div className="qg-slider-label">
          <span className="qg-slider-icon">{icon}</span>
          <span>{label}</span>
        </div>
        <span className="qg-slider-value" style={{ color }}>
          <strong>{value}%</strong>
          <span className="qg-slider-status">{text}</span>
        </span>
      </div>
      <div className="qg-slider-track-wrap">
        <input
          type="range"
          min={min} max={max} step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="qg-range"
          style={{ '--pct': `${pct}%`, '--accent': color }}
        />
        <div className="qg-track-labels">
          <span>{min}%</span>
          {hint && <span className="qg-track-ideal">{hint}</span>}
          <span>{max}%</span>
        </div>
      </div>
    </div>
  );
}

function ScoreRing({ score, grade }) {
  const meta = GRADE_META[grade] || GRADE_META['Grade B'];
  const r = 44;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;

  return (
    <div className="qg-score-ring-wrap">
      <svg viewBox="0 0 100 100" width="120" height="120">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
        <circle
          cx="50" cy="50" r={r} fill="none"
          stroke={meta.ring} strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          style={{ transition: 'stroke-dasharray 0.6s ease' }}
        />
        <text x="50" y="46" textAnchor="middle" fontSize="18" fontWeight="800" fill={meta.ring}>{score}</text>
        <text x="50" y="60" textAnchor="middle" fontSize="8" fill="#9ca3af">/100</text>
      </svg>
    </div>
  );
}

export default function QualityGrading({ lang = 'mr' }) {
  const isMr = lang === 'mr';
  const isHi = lang === 'hi';
  const t = (mr, hi, en) => isMr ? mr : isHi ? hi : en;

  const [selectedCropId, setSelectedCropId] = useState(MANDI_RATES[0].id);
  const [moisture, setMoisture] = useState(11.5);
  const [foreign, setForeign] = useState(0.8);
  const [damage, setDamage] = useState(1.2);
  const [grainSize, setGrainSize] = useState('Large / Uniform');
  const [farmerName, setFarmerName] = useState(t('राजेश पाटील', 'राजेश कुमार', 'Rajesh Kumar'));
  const [downloaded, setDownloaded] = useState(false);

  const currentCrop = MANDI_RATES.find(c => c.id === selectedCropId) || MANDI_RATES[0];

  const calculateScore = () => {
    let score = 100;
    if (moisture > 14) score -= (moisture - 14) * 8;
    else if (moisture > 12) score -= (moisture - 12) * 3;
    if (foreign > 2) score -= (foreign - 2) * 10;
    else if (foreign > 1) score -= (foreign - 1) * 4;
    if (damage > 3) score -= (damage - 3) * 7;
    return Math.max(0, Math.round(score));
  };

  const calculateGrade = (score) => {
    if (score >= 90) return { grade: 'Grade A+', premiumPercent: +8.0, label: t('निर्यात गुणवत्ता प्रीमियम', 'निर्यात गुणवत्ता प्रीमियम', 'Export Quality Premium') };
    if (score >= 78) return { grade: 'Grade A',  premiumPercent: +4.0, label: t('उत्कृष्ट मंडी मानक', 'उत्कृष्ट मंडी मानक', 'Superior Mandi Standard') };
    if (score >= 65) return { grade: 'Grade B',  premiumPercent: 0.0,  label: t('मानक उचित किंमत', 'मानक उचित मूल्य', 'Standard Fair Price') };
    return               { grade: 'Grade C',  premiumPercent: -6.5, label: t('आर्द्रता दंड', 'नमी दंड', 'High Moisture Penalty') };
  };

  const score = calculateScore();
  const result = calculateGrade(score);
  const meta = GRADE_META[result.grade];
  const estimatedPrice = Math.round(currentCrop.modalPrice * (1 + result.premiumPercent / 100));

  const moistureStatus = v => v <= 12 ? { text: t('आदर्श', 'आदर्श', 'Ideal ✓'), color: '#10b981' }
    : v <= 14 ? { text: t('स्वीकार्य', 'स्वीकार्य', 'Acceptable'), color: '#f59e0b' }
    : { text: t('जास्त — दंड', 'ज़्यादा — दंड', 'High — Penalty'), color: '#ef4444' };

  const foreignStatus = v => v <= 1 ? { text: t('स्वच्छ', 'साफ', 'Clean ✓'), color: '#10b981' }
    : v <= 2 ? { text: t('स्वीकार्य', 'स्वीकार्य', 'Acceptable'), color: '#f59e0b' }
    : { text: t('जास्त — दंड', 'ज़्यादा — दंड', 'High — Penalty'), color: '#ef4444' };

  const damageStatus = v => v <= 1.5 ? { text: t('उत्कृष्ट', 'उत्कृष्ट', 'Excellent ✓'), color: '#10b981' }
    : v <= 3 ? { text: t('स्वीकार्य', 'स्वीकार्य', 'Acceptable'), color: '#f59e0b' }
    : { text: t('जास्त — दंड', 'ज़्यादा — दंड', 'High — Penalty'), color: '#ef4444' };

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const handleReset = () => {
    setMoisture(11.5); setForeign(0.8); setDamage(1.2);
    setGrainSize('Large / Uniform');
  };

  return (
    <div className="qg-root">

      {/* Hero */}
      <div className="qg-hero">
        <span className="qg-hero-pill">🔬 {t('पीक गुणवत्ता तपासणी', 'फसल गुणवत्ता जांच', 'Crop Quality Assessment')}</span>
        <h1 className="qg-hero-title">{t('आपल्या पिकाचा दर्जा तपासा, अधिक किंमत मिळवा', 'अपनी फसल की गुणवत्ता जांचें, बेहतर दाम पाएं', 'Test Quality. Earn Better Price.')}</h1>
        <p className="qg-hero-sub">{t('आर्द्रता, अशुद्धता आणि नुकसान मोजा — AI तुमचा दर्जा ठरवेल आणि किंमत बोनस दाखवेल.', 'नमी, अशुद्धि और नुकसान मापें — AI आपका ग्रेड और बोनस बताएगा।', 'Measure moisture, impurities & damage — get your AI grade & price bonus instantly.')}</p>
      </div>

      <div className="qg-layout">

        {/* ── Left: Inputs ── */}
        <div className="qg-inputs-panel">

          {/* Crop + Farmer */}
          <div className="qg-input-group">
            <div className="qg-field">
              <label className="qg-field-label">🌾 {t('पीक निवडा', 'फसल चुनें', 'Select Crop')}</label>
              <select value={selectedCropId} onChange={e => setSelectedCropId(e.target.value)} className="qg-select">
                {MANDI_RATES.map(c => (
                  <option key={c.id} value={c.id}>{c.crop} ({c.mandi})</option>
                ))}
              </select>
            </div>
            <div className="qg-field">
              <label className="qg-field-label">👤 {t('शेतकऱ्याचे नाव', 'किसान का नाम', 'Farmer Name')}</label>
              <input
                type="text"
                value={farmerName}
                onChange={e => setFarmerName(e.target.value)}
                className="qg-input"
                placeholder={t('नाव टाका...', 'नाम दर्ज करें...', 'Enter name...')}
              />
            </div>
          </div>

          {/* Sliders */}
          <SliderField
            icon="💧"
            label={t('आर्द्रता प्रमाण (%)', 'नमी प्रतिशत (%)', 'Moisture Content (%)')}
            hint={t('≤12% आदर्श', '≤12% आदर्श', '≤12% Ideal')}
            value={moisture} min={8} max={20} step={0.5}
            onChange={setMoisture} getStatus={moistureStatus}
          />
          <SliderField
            icon="🧹"
            label={t('परकीय घटक / अशुद्धता (%)', 'अशुद्धि / कचरा (%)', 'Foreign Matter / Impurities (%)')}
            hint={t('≤1% उत्तम', '≤1% उत्तम', '≤1% Clean')}
            value={foreign} min={0.1} max={5} step={0.1}
            onChange={setForeign} getStatus={foreignStatus}
          />
          <SliderField
            icon="🌾"
            label={t('खराब / तुटलेले दाणे (%)', 'दागदार / टूटे दाने (%)', 'Damaged / Broken Grains (%)')}
            hint={t('≤1.5% उत्कृष्ट', '≤1.5% उत्कृष्ट', '≤1.5% Excellent')}
            value={damage} min={0} max={8} step={0.2}
            onChange={setDamage} getStatus={damageStatus}
          />

          {/* Grain Size Pills */}
          <div className="qg-grain-section">
            <label className="qg-field-label">📏 {t('दाण्याचा आकार व रूप', 'दाने का आकार', 'Grain Size & Appearance')}</label>
            <div className="qg-grain-pills">
              {[
                ['Large / Uniform',  t('मोठे / एकसमान', 'बड़े / एकसमान', 'Large / Uniform'),  '🟢'],
                ['Medium Grade',     t('मध्यम दर्जा', 'मध्यम ग्रेड', 'Medium Grade'),         '🟡'],
                ['Small / Mixed',    t('लहान / मिश्र', 'छोटे / मिश्रित', 'Small / Mixed'),     '🔴'],
              ].map(([val, lbl, dot]) => (
                <button
                  key={val}
                  className={`qg-grain-pill ${grainSize === val ? 'active' : ''}`}
                  onClick={() => setGrainSize(val)}
                >
                  <span>{dot}</span> {lbl}
                </button>
              ))}
            </div>
          </div>

          <button className="qg-reset-btn" onClick={handleReset}>
            <RefreshCw size={14}/> {t('रीसेट करा', 'रीसेट करें', 'Reset to Defaults')}
          </button>
        </div>

        {/* ── Right: Certificate ── */}
        <div className="qg-cert-panel">

          {/* Grade Score Ring */}
          <div className="qg-grade-hero" style={{ background: meta.bg, borderColor: meta.border }}>
            <ScoreRing score={score} grade={result.grade} />
            <div className="qg-grade-info">
              <span className="qg-grade-icon">{meta.icon}</span>
              <h2 className="qg-grade-title" style={{ color: meta.color }}>{result.grade}</h2>
              <p className="qg-grade-label">{result.label}</p>
            </div>
            <div className="qg-premium-pill" style={{ background: meta.color }}>
              {result.premiumPercent >= 0
                ? `+${result.premiumPercent}% ${t('बोनस', 'बोनस', 'Bonus')}`
                : `${result.premiumPercent}% ${t('दंड', 'दंड', 'Penalty')}`}
            </div>
          </div>

          {/* Certificate Card */}
          <div className="qg-cert-card">
            {/* Cert Header */}
            <div className="qg-cert-header">
              <div className="qg-cert-brand">
                <ShieldCheck size={20} style={{ color: '#10b981' }}/>
                <div>
                  <strong>AGROVA {t('प्रमाणित गुणवत्ता कार्ड', 'प्रमाणित गुणवत्ता कार्ड', 'VERIFIED QUALITY CARD')}</strong>
                  <span className="qg-cert-id">CERT ID: #AGR-2026-{Math.floor(8000 + score * 10)}</span>
                </div>
              </div>
              <span className="qg-cert-stamp" style={{ color: meta.color, borderColor: meta.color }}>
                {result.grade}
              </span>
            </div>

            {/* Details Grid */}
            <div className="qg-cert-details">
              {[
                [t('शेतकरी', 'किसान', 'Farmer'), farmerName || t('अज्ञात', 'अज्ञात', 'Unknown')],
                [t('पीक', 'फसल', 'Crop'), currentCrop.crop],
                [t('आधार मंडी भाव', 'आधार मंडी दाम', 'Base Mandi Rate'), `₹${currentCrop.modalPrice}/Qtl`],
                [t('मंडी', 'मंडी', 'APMC'), currentCrop.mandi],
              ].map(([lbl, val]) => (
                <div key={lbl} className="qg-cert-row">
                  <span className="qg-cert-lbl">{lbl}</span>
                  <strong className="qg-cert-val">{val}</strong>
                </div>
              ))}
            </div>

            {/* Metric Blocks */}
            <div className="qg-metric-grid">
              {[
                { icon: '💧', label: t('आर्द्रता', 'नमी', 'Moisture'), val: `${moisture}%`, color: moistureStatus(moisture).color },
                { icon: '🧹', label: t('अशुद्धता', 'अशुद्धि', 'Impurities'), val: `${foreign}%`, color: foreignStatus(foreign).color },
                { icon: '🌾', label: t('खराब दाणे', 'दागदार', 'Damaged'), val: `${damage}%`, color: damageStatus(damage).color },
                { icon: '📏', label: t('दाण्याचा आकार', 'दाने का आकार', 'Grain Size'), val: grainSize.split(' / ')[0], color: '#9ca3af' },
              ].map(m => (
                <div key={m.label} className="qg-metric-block">
                  <span className="qg-metric-icon">{m.icon}</span>
                  <span className="qg-metric-lbl">{m.label}</span>
                  <strong className="qg-metric-val" style={{ color: m.color }}>{m.val}</strong>
                </div>
              ))}
            </div>

            {/* Price Banner */}
            <div className="qg-price-banner" style={{ background: meta.bg, borderColor: meta.border }}>
              <div>
                <span className="qg-price-lbl">{t('गुणवत्तेनुसार अंदाजे भाव', 'गुणवत्ता अनुसार अनुमानित दाम', 'Assessed Grade Payout')}</span>
                <div className="qg-price-amount" style={{ color: meta.color }}>
                  ₹{estimatedPrice.toLocaleString('en-IN')}
                  <span className="qg-price-unit"> / {t('क्विंटल', 'क्विंटल', 'Quintal')}</span>
                </div>
                <p className="qg-price-diff">
                  {result.premiumPercent >= 0 ? (
                    <><TrendingUp size={13} style={{ color: '#10b981' }}/> +₹{(estimatedPrice - currentCrop.modalPrice).toLocaleString('en-IN')} {t('अतिरिक्त', 'अतिरिक्त', 'extra per Qtl')}</>
                  ) : (
                    <><TrendingDown size={13} style={{ color: '#ef4444' }}/> ₹{(estimatedPrice - currentCrop.modalPrice).toLocaleString('en-IN')} {t('कमी', 'कम', 'less per Qtl')}</>
                  )}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="qg-cert-footer">
              <span className="qg-cert-note">
                <CheckCircle2 size={13} style={{ color: '#10b981' }}/>
                {t('APMC आणि E-NAM मानकांशी सुसंगत', 'APMC और E-NAM मानकों के अनुसार', 'Compatible with APMC & E-NAM standards')}
              </span>
              <button className="qg-download-btn" onClick={handleDownload} disabled={downloaded}>
                {downloaded
                  ? <><CheckCircle2 size={15}/> {t('डाउनलोड झाले!', 'डाउनलोड हुआ!', 'Downloaded!')}</>
                  : <><Download size={15}/> {t('प्रमाणपत्र डाउनलोड करा', 'प्रमाण पत्र डाउनलोड करें', 'Download Certificate PDF')}</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
