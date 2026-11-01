import React, { useState, useMemo } from 'react';
import { WAREHOUSES } from '../data/warehouses';
import {
  MapPin, ShieldCheck, Thermometer, Phone,
  Star, CheckCircle2, Zap, X
} from 'lucide-react';

// Storage type accent colors & icons
const TYPE_META = {
  'Multi-Commodity Cold Storage':        { color: '#06b6d4', bg: 'rgba(6,182,212,0.12)',  icon: '❄️', label: 'Cold Storage'      },
  'Controlled Atmosphere (CA) Storage':  { color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', icon: '🧪', label: 'CA Storage'        },
  'Specialized Grape Cold Storage':      { color: '#a855f7', bg: 'rgba(168,85,247,0.12)', icon: '🍇', label: 'Grape CA Store'     },
  'Onion Storage & Dehydration':         { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', icon: '🧅', label: 'Onion + Dehy'      },
  'Dry Agricultural Warehouse':          { color: '#10b981', bg: 'rgba(16,185,129,0.12)', icon: '🌾', label: 'Dry Godown'        },
  'Government Certified Warehouse':      { color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', icon: '🏛️', label: 'Govt. Certified'   },
  'Hi-Tech Controlled Atmosphere (CA) Store': { color: '#f43f5e', bg: 'rgba(244,63,94,0.12)', icon: '🔬', label: 'Hi-Tech CA'  },
};

const DEFAULT_META = { color: '#10b981', bg: 'rgba(16,185,129,0.12)', icon: '🏬', label: 'Storage' };

function StarRating({ rating }) {
  return (
    <span className="whl-stars">
      {[1,2,3,4,5].map(i => (
        <Star
          key={i}
          size={12}
          fill={i <= Math.round(rating) ? '#f59e0b' : 'none'}
          color={i <= Math.round(rating) ? '#f59e0b' : '#4b5563'}
        />
      ))}
      <span className="whl-rating-num">{rating}</span>
    </span>
  );
}

function CapacityBar({ available, total }) {
  const pct = Math.round((available / total) * 100);
  const color = pct > 40 ? '#10b981' : pct > 15 ? '#f59e0b' : '#ef4444';
  return (
    <div className="whl-cap-wrap">
      <div className="whl-cap-bar">
        <div className="whl-cap-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="whl-cap-label" style={{ color }}>{pct}% free</span>
    </div>
  );
}

export default function WarehouseLocator({ lang = 'mr' }) {
  const isMr = lang === 'mr';
  const isHi = lang === 'hi';
  const t = (mr, hi, en) => isMr ? mr : isHi ? hi : en;

  const [stateFilter, setStateFilter] = useState('All');
  const [tempFilter, setTempFilter]   = useState('All');
  const [storedQtl, setStoredQtl]     = useState(100);
  const [storedDays, setStoredDays]   = useState(30);
  const [bookingWh, setBookingWh]     = useState(null);
  const [bookingDone, setBookingDone] = useState(false);
  const [expandedWh, setExpandedWh]   = useState(null);

  const STATES = ['All', 'Maharashtra', 'Madhya Pradesh', 'Haryana', 'Gujarat', 'Uttar Pradesh'];

  const filtered = useMemo(() =>
    WAREHOUSES.filter(wh => {
      const ms = stateFilter === 'All' || wh.state === stateFilter;
      const mt = tempFilter === 'All'
        || (tempFilter === 'cold' && wh.temperatureControlled)
        || (tempFilter === 'dry'  && !wh.temperatureControlled);
      return ms && mt;
    }),
    [stateFilter, tempFilter]
  );

  const handleBook = (wh) => {
    setBookingWh({ ...wh, estCost: Math.round(wh.dailyRatePerQuintal * storedQtl * storedDays) });
    setBookingDone(false);
  };

  const handleConfirm = () => {
    setBookingDone(true);
    setTimeout(() => { setBookingWh(null); setBookingDone(false); }, 2500);
  };

  return (
    <div className="whl-root">

      {/* Hero */}
      <div className="whl-hero">
        <div className="whl-hero-left">
          <span className="whl-hero-pill">🏬 {t('स्मार्ट गोदाम शोधक', 'स्मार्ट गोदाम खोजक', 'Smart Warehouse Finder')}</span>
          <h1 className="whl-hero-title">
            {t('शेतमाल सुरक्षित ठेवा, नुकसान टाळा', 'फसल सुरक्षित रखें, नुकसान से बचें', 'Store Safe. Sell Smart.')}
          </h1>
          <p className="whl-hero-sub">
            {t(
              'WDRA-प्रमाणित गोदामे शोधा, भाडे तुलना करा आणि बँक कर्जासाठी अर्ज करा.',
              'WDRA-प्रमाणित गोदाम खोजें, किराया तुलना करें और बैंक ऋण के लिए आवेदन करें।',
              'Find WDRA-certified facilities, compare rates & unlock pledge loans.'
            )}
          </p>
        </div>
        <div className="whl-hero-stats">
          <div className="whl-hstat">
            <span className="whl-hstat-val">9</span>
            <span className="whl-hstat-lbl">{t('गोदामे', 'गोदाम', 'Warehouses')}</span>
          </div>
          <div className="whl-hstat accent">
            <span className="whl-hstat-val">75%</span>
            <span className="whl-hstat-lbl">{t('बँक कर्ज', 'बैंक ऋण', 'Pledge Loan')}</span>
          </div>
          <div className="whl-hstat">
            <span className="whl-hstat-val">WDRA</span>
            <span className="whl-hstat-lbl">{t('प्रमाणित', 'प्रमाणित', 'Certified')}</span>
          </div>
        </div>
      </div>

      {/* Filter + Estimator Bar */}
      <div className="whl-filter-bar">
        <div className="whl-filter-section">
          <span className="whl-filter-label"><MapPin size={13}/> {t('क्षेत्र', 'क्षेत्र', 'Region')}</span>
          <div className="whl-pills">
            {STATES.map(s => (
              <button
                key={s}
                className={`whl-pill ${stateFilter === s ? 'active' : ''}`}
                onClick={() => setStateFilter(s)}
              >
                {s === 'All' ? t('सर्व', 'सभी', 'All') : s}
              </button>
            ))}
          </div>
        </div>

        <div className="whl-filter-section">
          <span className="whl-filter-label"><Thermometer size={13}/> {t('प्रकार', 'प्रकार', 'Type')}</span>
          <div className="whl-pills">
            {[
              ['All',  t('सर्व', 'सभी', 'All')],
              ['cold', '❄️ ' + t('कोल्ड', 'कोल्ड', 'Cold')],
              ['dry',  '🌾 ' + t('कोरडे', 'सूखा', 'Dry')],
            ].map(([val, lbl]) => (
              <button
                key={val}
                className={`whl-pill ${tempFilter === val ? 'active' : ''}`}
                onClick={() => setTempFilter(val)}
              >{lbl}</button>
            ))}
          </div>
        </div>

        <div className="whl-estimator">
          <span className="whl-filter-label"><Zap size={13}/> {t('खर्च अंदाज', 'लागत अनुमान', 'Quick Estimate')}</span>
          <div className="whl-est-inputs">
            <div className="whl-est-field">
              <label>{t('क्विंटल', 'क्विंटल', 'Quintals')}</label>
              <input type="number" value={storedQtl} min={1} onChange={e => setStoredQtl(+e.target.value)} className="whl-num-input"/>
            </div>
            <span className="whl-est-x">×</span>
            <div className="whl-est-field">
              <label>{t('दिवस', 'दिन', 'Days')}</label>
              <input type="number" value={storedDays} min={1} onChange={e => setStoredDays(+e.target.value)} className="whl-num-input"/>
            </div>
          </div>
        </div>
      </div>

      {/* Card Grid */}
      <div className="whl-grid">
        {filtered.map(wh => {
          const meta = TYPE_META[wh.type] || DEFAULT_META;
          const estCost = Math.round(wh.dailyRatePerQuintal * storedQtl * storedDays);
          const isExpanded = expandedWh === wh.id;

          return (
            <div key={wh.id} className="whl-card" style={{ '--whl-accent': meta.color, '--whl-bg': meta.bg }}>

              {/* Top Color Band */}
              <div className="whl-card-band" style={{ background: `linear-gradient(135deg, ${meta.color}22 0%, ${meta.color}08 100%)`, borderBottom: `1px solid ${meta.color}33` }}>
                <div className="whl-band-left">
                  <span className="whl-type-icon">{meta.icon}</span>
                  <div>
                    <span className="whl-type-badge" style={{ color: meta.color, background: meta.bg, borderColor: `${meta.color}44` }}>
                      {meta.label}
                    </span>
                    {wh.temperatureControlled && (
                      <span className="whl-temp-range">{wh.tempRange}</span>
                    )}
                  </div>
                </div>
                <div className="whl-band-right">
                  {wh.wdraCertified && (
                    <span className="whl-wdra-badge">
                      <ShieldCheck size={11}/> WDRA
                    </span>
                  )}
                  <span className="whl-dist-badge">
                    <MapPin size={11}/> {wh.distanceKm} km
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="whl-card-body">
                <h3 className="whl-card-name">{isMr ? wh.nameMr : wh.name}</h3>
                <p className="whl-card-location"><MapPin size={12}/> {wh.location}</p>

                <div className="whl-card-meta">
                  <StarRating rating={wh.rating} />
                  <span className="whl-review-count">({wh.reviewsCount} {t('रिव्ह्यू', 'समीक्षा', 'reviews')})</span>
                </div>

                {/* Stats Blocks */}
                <div className="whl-stats-row">
                  <div className="whl-stat-block">
                    <span className="whl-stat-lbl">{t('दैनिक दर', 'दैनिक दर', 'Daily Rate')}</span>
                    <strong className="whl-stat-val" style={{ color: meta.color }}>₹{wh.dailyRatePerQuintal}<span>/qtl</span></strong>
                  </div>
                  <div className="whl-stat-block">
                    <span className="whl-stat-lbl">{t('मासिक दर', 'मासिक दर', 'Monthly')}</span>
                    <strong className="whl-stat-val">₹{wh.monthlyRatePerQuintal}<span>/qtl</span></strong>
                  </div>
                  <div className="whl-stat-block">
                    <span className="whl-stat-lbl">{t('एकूण क्षमता', 'कुल क्षमता', 'Total Cap.')}</span>
                    <strong className="whl-stat-val">{wh.totalCapacityMT.toLocaleString()}<span> MT</span></strong>
                  </div>
                </div>

                {/* Capacity Bar */}
                <div className="whl-cap-section">
                  <div className="whl-cap-header">
                    <span className="whl-cap-title">{t('उपलब्ध जागा', 'उपलब्ध स्थान', 'Available Space')}</span>
                    <span className="whl-cap-avail">{wh.availableCapacityMT.toLocaleString()} MT {t('मुक्त', 'खाली', 'free')}</span>
                  </div>
                  <CapacityBar available={wh.availableCapacityMT} total={wh.totalCapacityMT} />
                </div>

                {/* Supported Crops */}
                <div className="whl-crops">
                  {wh.supportedCrops.slice(0, 4).map(c => (
                    <span key={c} className="whl-crop-chip">{c}</span>
                  ))}
                  {wh.supportedCrops.length > 4 && (
                    <span className="whl-crop-chip more">+{wh.supportedCrops.length - 4}</span>
                  )}
                </div>

                {/* Expandable Features */}
                {isExpanded && (
                  <div className="whl-features">
                    {wh.features.map(f => (
                      <div key={f} className="whl-feature-row">
                        <CheckCircle2 size={13} style={{ color: meta.color, flexShrink: 0 }}/>
                        <span>{f}</span>
                      </div>
                    ))}
                    {wh.wdraCertified && (
                      <div className="whl-pledge-info">
                        <Zap size={14} style={{ color: '#f59e0b' }}/>
                        <span>{t('₹75% बँक कर्ज पात्र (e-NWR)', '₹75% बैंक ऋण पात्र (e-NWR)', '75% bank pledge loan eligible via e-NWR')}</span>
                      </div>
                    )}
                  </div>
                )}

                <button className="whl-expand-btn" onClick={() => setExpandedWh(isExpanded ? null : wh.id)}>
                  {isExpanded
                    ? t('कमी दाखवा ↑', 'कम दिखाएं ↑', 'Show less ↑')
                    : t(`${wh.features.length} सुविधा पहा ↓`, `${wh.features.length} सुविधाएं ↓`, `See ${wh.features.length} features ↓`)}
                </button>
              </div>

              {/* Cost + CTA Footer */}
              <div className="whl-card-footer">
                <div className="whl-footer-cost">
                  <span className="whl-fc-label">{storedQtl} qtl × {storedDays}d</span>
                  <strong className="whl-fc-amount" style={{ color: meta.color }}>
                    ₹{estCost.toLocaleString('en-IN')}
                  </strong>
                </div>
                <div className="whl-footer-actions">
                  <a href={`tel:${wh.contactNumber.replace(/\s+/g, '')}`} className="whl-btn-outline">
                    <Phone size={13}/> {t('कॉल', 'कॉल', 'Call')}
                  </a>
                  <button className="whl-btn-primary" style={{ background: meta.color }} onClick={() => handleBook(wh)}>
                    {t('स्लॉट बुक करा', 'स्लॉट बुक करें', 'Reserve Slot')} →
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Booking Modal */}
      {bookingWh && (
        <div className="modal-overlay" onClick={() => !bookingDone && setBookingWh(null)}>
          <div className="modal-content whl-modal" onClick={e => e.stopPropagation()}>
            {bookingDone ? (
              <div className="whl-success-screen">
                <div className="whl-success-icon">✅</div>
                <h2>{t('बुकिंग यशस्वी!', 'बुकिंग सफल!', 'Slot Reserved!')}</h2>
                <p>{t('गोदाम व्यवस्थापक लवकरच संपर्क करतील.', 'गोदाम प्रबंधक जल्द संपर्क करेंगे।', 'The warehouse manager will contact you shortly.')}</p>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <div>
                    <h2>{t('स्टोरेज स्लॉट बुक करा', 'स्टोरेज स्लॉट बुक करें', 'Reserve Storage Slot')}</h2>
                    <p>{isMr ? bookingWh.nameMr : bookingWh.name}</p>
                  </div>
                  <button className="close-btn" onClick={() => setBookingWh(null)}><X size={18}/></button>
                </div>

                <div className="modal-body">
                  <div className="whl-modal-summary">
                    {[
                      [t('प्रकार', 'प्रकार', 'Type'), bookingWh.type],
                      [t('स्थान', 'स्थान', 'Location'), bookingWh.location],
                      [t('दर', 'दर', 'Rate'), `₹${bookingWh.dailyRatePerQuintal} / qtl / day`],
                      [t('अंदाजे खर्च', 'अनुमानित लागत', 'Est. Cost'), `₹${bookingWh.estCost.toLocaleString('en-IN')} (${storedQtl} qtl × ${storedDays}d)`],
                    ].map(([lbl, val]) => (
                      <div key={lbl} className="whl-modal-row">
                        <span>{lbl}</span><strong>{val}</strong>
                      </div>
                    ))}
                    {bookingWh.wdraCertified && (
                      <div className="whl-modal-pledge">
                        <ShieldCheck size={14} style={{ color: '#10b981' }}/>
                        {t('बँक कर्जासाठी पात्र — e-NWR द्वारे 75% पर्यंत', 'बैंक ऋण के लिए पात्र — e-NWR द्वारा 75% तक', 'Bank pledge loan eligible — up to 75% via e-NWR')}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="input-label">{t('शेतकरी नाव', 'किसान नाम', 'Farmer Name')}</label>
                    <input type="text" className="custom-input" defaultValue={t('राजेश पाटील', 'राजेश कुमार', 'Rajesh Patil')} />
                  </div>
                  <div className="form-group">
                    <label className="input-label">{t('मोबाइल नंबर', 'मोबाइल नंबर', 'Mobile Number')}</label>
                    <input type="text" className="custom-input" defaultValue="+91 98220 11223" />
                  </div>
                </div>

                <div className="modal-footer">
                  <button className="btn-outline" onClick={() => setBookingWh(null)}>{t('रद्द करा', 'रद्द करें', 'Cancel')}</button>
                  <button className="btn-primary" onClick={handleConfirm}>
                    <CheckCircle2 size={16}/> {t('बुकिंग निश्चित करा', 'बुकिंग कन्फर्म करें', 'Confirm Booking')}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
