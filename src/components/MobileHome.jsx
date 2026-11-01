import React, { useState, useEffect } from 'react';
import {
  TrendingUp, RefreshCw, ShieldCheck, Warehouse,
  Bot, CloudSun, Bell, ChevronRight,
  ArrowUpRight, ArrowDownRight, Leaf, Truck, Wallet,
  IndianRupee, Clock, AlertTriangle
} from 'lucide-react';

const TOP_RATES = [
  { crop: 'कांदा', cropEn: 'Onion (Red)', emoji: '🧅', price: '₹1,950', change: '+4.2%', up: true, mandi: 'Lasalgaon' },
  { crop: 'द्राक्षे', cropEn: 'Grapes', emoji: '🍇', price: '₹4,350', change: '+2.8%', up: true, mandi: 'Pimpalgaon' },
  { crop: 'डाळिंब', cropEn: 'Pomegranate', emoji: '🍎', price: '₹6,200', change: '+3.5%', up: true, mandi: 'Pimpalgaon' },
  { crop: 'टोमॅटो', cropEn: 'Tomato', emoji: '🍅', price: '₹1,680', change: '+7.2%', up: true, mandi: 'Nashik' },
  { crop: 'कांदा पांढरा', cropEn: 'Onion (White)', emoji: '🧅', price: '₹2,750', change: '+6.1%', up: true, mandi: 'Lasalgaon' },
  { crop: 'मका', cropEn: 'Maize', emoji: '🌽', price: '₹2,120', change: '+1.4%', up: true, mandi: 'Chandwad' },
];

const TIPS_MR = [
  { mr: 'कांद्याचा भाव पुढच्या आठवड्यात वाढू शकतो — घाई करू नका.', en: "Onion prices may rise next week at Lasalgaon — don't rush to sell.", hi: 'लासलगाव में प्याज का भाव अगले हफ्ते बढ़ सकता है — बेचने में जल्दी न करें।' },
  { mr: 'द्राक्षे कोल्ड स्टोरेजमध्ये ठेवा — EU निर्यातीचा हंगाम येत आहे.', en: 'Store grapes in CA storage — EU export season is approaching.', hi: 'अंगूर को CA स्टोरेज में रखें — EU निर्यात का सीज़न आ रहा है।' },
  { mr: 'गुणवत्ता तपासणी करून ग्रेड A+ मिळवा — अतिरिक्त ₹234/क्विंटल मिळेल!', en: 'Get Grade A+ quality certification — earn ₹234 extra per quintal!', hi: 'ग्रेड A+ गुणवत्ता प्रमाण प्राप्त करें — ₹234/क्विंटल अतिरिक्त कमाएं!' },
  { mr: 'चांदवड APMC मध्ये मका MSP वर विकला जात आहे.', en: 'Maize at Chandwad APMC is selling at MSP support price.', hi: 'चांदवड APMC में मक्का MSP पर बिक रहा है।' },
];

export default function MobileHome({ lang, setActiveTab, onOpenKisanMitra, user }) {
  const isMr = lang === 'mr';
  const isHi = lang === 'hi';
  const hour = new Date().getHours();
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTipIndex(i => (i + 1) % TIPS_MR.length), 5000);
    return () => clearInterval(t);
  }, []);

  const greeting = hour < 12
    ? (isMr ? 'सुप्रभात 🌅' : isHi ? 'सुप्रभात 🌅' : 'Good Morning 🌅')
    : hour < 17
    ? (isMr ? 'नमस्कार 🙏' : isHi ? 'नमस्ते 🙏' : 'Good Afternoon 🙏')
    : (isMr ? 'शुभ संध्याकाळ 🌙' : isHi ? 'शुभ संध्या 🌙' : 'Good Evening 🌙');

  const dayStr = new Date().toLocaleDateString(isMr ? 'mr-IN' : isHi ? 'hi-IN' : 'en-IN', {
    weekday: 'long', day: 'numeric', month: 'long'
  });

  const userName = user?.name || (isMr ? 'शेतकरी बंधू' : isHi ? 'किसान भाई' : 'Kisan Bhai');

  const quickActions = [
    {
      id: 'mandi',
      icon: <TrendingUp size={26} />,
      label: isMr ? 'मंडी भाव' : isHi ? 'मंडी भाव' : 'Mandi Rates',
      sublabel: isMr ? 'आजचे ताजे भाव' : isHi ? 'आज के ताजे दाम' : 'Live prices today',
      color: '#10b981', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)',
    },
    {
      id: 'prediction',
      icon: <RefreshCw size={26} />,
      label: isMr ? 'किंमत अंदाज' : isHi ? 'भाव अनुमान' : 'AI Forecast',
      sublabel: isMr ? 'AI 7 दिवस अंदाज' : isHi ? 'AI मूल्य पूर्वानुमान' : '7-day prediction',
      color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)',
    },
    {
      id: 'transport',
      icon: <Truck size={26} />,
      label: isMr ? 'वाहतूक बुक करा' : isHi ? 'वाहन बुक करें' : 'Book Transport',
      sublabel: isMr ? 'शेतापासून मंडीपर्यंत' : isHi ? 'खेत से मंडी तक' : 'Farm to market',
      color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)',
    },
    {
      id: 'payments',
      icon: <Wallet size={26} />,
      label: isMr ? 'पेमेंट खाता' : isHi ? 'पेमेंट खाता' : 'Payment Khaata',
      sublabel: isMr ? 'विक्री व पेमेंट ट्रॅक' : isHi ? 'बिक्री व भुगतान' : 'Track sales & payments',
      color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.3)',
    },
    {
      id: 'quality',
      icon: <ShieldCheck size={26} />,
      label: isMr ? 'गुणवत्ता तपासणी' : isHi ? 'गुणवत्ता जांच' : 'Quality Check',
      sublabel: isMr ? 'पीक श्रेणी तपासा' : isHi ? 'फसल श्रेणी जांचें' : 'Grade your produce',
      color: '#ec4899', bg: 'rgba(236,72,153,0.12)', border: 'rgba(236,72,153,0.3)',
    },
    {
      id: 'warehouse',
      icon: <Warehouse size={26} />,
      label: isMr ? 'गोदाम शोधा' : isHi ? 'गोदाम खोजें' : 'Find Storage',
      sublabel: isMr ? 'जवळचे कोल्ड स्टोरेज' : isHi ? 'नजदीकी गोदाम' : 'Nearby warehouses',
      color: '#06b6d4', bg: 'rgba(6,182,212,0.12)', border: 'rgba(6,182,212,0.3)',
    },
  ];

  return (
    <div className="mobile-home-screen">

      {/* ── Greeting Card ── */}
      <div className="mh-greeting-card">
        <div className="mh-greeting-top">
          <div>
            <p className="mh-greeting-text">{greeting}</p>
            <h2 className="mh-farmer-name">
              {userName} 👋
            </h2>
            <p className="mh-date">{dayStr}</p>
          </div>
          <div className="mh-weather-pill">
            <CloudSun size={28} className="weather-icon-anim" />
            <div>
              <span className="mh-temp">31°C</span>
              <span className="mh-weather-label">{isMr ? 'ऊन' : isHi ? 'धूप' : 'Sunny'}</span>
            </div>
          </div>
        </div>
        <div className="mh-tip-bar">
          <Leaf size={14} className="tip-icon" />
          <span className="mh-tip-text">
            {isMr ? TIPS_MR[tipIndex].mr : isHi ? TIPS_MR[tipIndex].hi : TIPS_MR[tipIndex].en}
          </span>
        </div>
      </div>

      {/* ── Glanceable Stat Cards ── */}
      <div className="mh-glance-row">
        <div className="mh-glance-card glance-price" onClick={() => setActiveTab('mandi')}>
          <span className="mh-glance-emoji">🧅</span>
          <div>
            <p className="mh-glance-label">{isMr ? 'लासलगाव कांदा' : isHi ? 'लासलगाव प्याज' : 'Lasalgaon Onion'}</p>
            <h3 className="mh-glance-value">₹1,950</h3>
            <span className="mh-glance-change up"><ArrowUpRight size={11} />+4.2%</span>
          </div>
        </div>
        <div className="mh-glance-card glance-payment" onClick={() => setActiveTab('payments')}>
          <span className="mh-glance-emoji"><Clock size={20} /></span>
          <div>
            <p className="mh-glance-label">{isMr ? 'प्रलंबित पेमेंट' : isHi ? 'बाकी भुगतान' : 'Pending Payments'}</p>
            <h3 className="mh-glance-value">₹4,60,944</h3>
            <span className="mh-glance-sub">{isMr ? '2 व्यवहार' : '2 transactions'}</span>
          </div>
        </div>
        <div className="mh-glance-card glance-storage" onClick={() => setActiveTab('warehouse')}>
          <span className="mh-glance-emoji"><Warehouse size={20} /></span>
          <div>
            <p className="mh-glance-label">{isMr ? 'जवळचे कोल्ड स्टोरेज' : isHi ? 'नजदीकी कोल्ड स्टोरेज' : 'Nearest Cold Storage'}</p>
            <h3 className="mh-glance-value">3.2 km</h3>
            <span className="mh-glance-sub">MSAMB Lasalgaon</span>
          </div>
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div className="mh-section-header">
        <h3 className="mh-section-title">{isMr ? 'लवकर पोहोचा' : isHi ? 'जल्दी पहुँचें' : 'Quick Actions'}</h3>
      </div>
      <div className="mh-quick-grid">
        {quickActions.map(action => (
          <button
            key={action.id}
            className="mh-quick-tile"
            style={{ '--tile-color': action.color, '--tile-bg': action.bg, '--tile-border': action.border }}
            onClick={() => setActiveTab(action.id)}
          >
            <div className="mh-tile-icon-wrap">{action.icon}</div>
            <span className="mh-tile-label">{action.label}</span>
            <span className="mh-tile-sub">{action.sublabel}</span>
          </button>
        ))}
      </div>

      {/* ── Kisan Mitra Banner ── */}
      <button className="mh-mitra-banner" onClick={onOpenKisanMitra}>
        <div className="mh-mitra-left">
          <div className="mh-mitra-icon"><Bot size={22} /></div>
          <div>
            <p className="mh-mitra-title">{isMr ? '🤖 शेतकरी मित्र AI' : isHi ? '🤖 किसान मित्र AI' : '🤖 Kisan Mitra AI'}</p>
            <p className="mh-mitra-sub">{isMr ? 'आवाजाने विचारा — तुमच्या भाषेत' : isHi ? 'आवाज़ से पूछें — अपनी भाषा में' : 'Ask by voice — in your language'}</p>
          </div>
        </div>
        <ChevronRight size={20} className="mh-mitra-arrow" />
      </button>

      {/* ── Today's Top Rates ── */}
      <div className="mh-section-header" style={{ marginTop: '1.5rem' }}>
        <h3 className="mh-section-title">{isMr ? '📊 आज नाशिक मंडी टॉप भाव' : isHi ? "📊 आज नाशिक मंडी टॉप भाव" : "📊 Today's Nashik Top Rates"}</h3>
        <button className="mh-see-all" onClick={() => setActiveTab('mandi')}>
          {isMr ? 'सर्व पहा' : isHi ? 'सभी देखें' : 'See all'} →
        </button>
      </div>
      <div className="mh-rates-scroll">
        {TOP_RATES.map((r, i) => (
          <div key={i} className={`mh-rate-chip ${r.up ? 'chip-up' : 'chip-down'}`}>
            <span className="mh-chip-emoji">{r.emoji}</span>
            <div className="mh-chip-body">
              <span className="mh-chip-crop">{isMr ? r.crop : r.cropEn}</span>
              <span className="mh-chip-mandi">{r.mandi}</span>
            </div>
            <div className="mh-chip-right">
              <span className="mh-chip-price">{r.price}</span>
              <span className={`mh-chip-change ${r.up ? 'up' : 'down'}`}>
                {r.up ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                {r.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Market Alert ── */}
      <div className="mh-alert-strip">
        <Bell size={14} />
        <span>
          {isMr
            ? 'लासलगावला कांद्याचा भाव 4.2% वाढला — निर्यात मागणी वाढत आहे!'
            : isHi
            ? 'लासलगाव में प्याज 4.2% बढ़ा — निर्यात मांग बढ़ रही है!'
            : 'Lasalgaon onion surged 4.2% — export demand rising!'}
        </span>
      </div>

    </div>
  );
}
