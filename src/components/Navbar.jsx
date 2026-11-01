import React from 'react';
import { Sprout, TrendingUp, ShieldCheck, Warehouse, ShoppingBag, BookOpen, RefreshCw, Bot, Sun, Moon, Download, Smartphone, Home, Truck, Wallet, LogOut, User, Handshake } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  userRole, 
  setUserRole, 
  onOpenGuide,
  onOpenKisanMitra,
  isDarkMode,
  setIsDarkMode,
  lang,
  setLang,
  deferredPrompt,
  onInstallPwa,
  user,
  onLogout
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const pwaBuilderUrl = "https://www.pwabuilder.com/reportcard?site=https://34de04797cace8.lhr.life";

  const farmerMobileTabs = [
    { id: 'home',       icon: <Home size={20} />,        label: lang === 'mr' ? 'होम' : lang === 'hi' ? 'होम' : 'Home' },
    { id: 'mandi',      icon: <TrendingUp size={20} />,  label: lang === 'mr' ? 'मंडी' : lang === 'hi' ? 'मंडी' : 'Rates' },
    { id: 'transport',  icon: <Truck size={20} />,       label: lang === 'mr' ? 'वाहतूक' : lang === 'hi' ? 'वाहन' : 'Transport' },
    { id: 'warehouse',  icon: <Warehouse size={20} />,   label: lang === 'mr' ? 'गोदाम' : lang === 'hi' ? 'गोदाम' : 'Storage' },
    { id: 'provider',   icon: <Handshake size={20} />,   label: lang === 'mr' ? 'नोंदणी' : lang === 'hi' ? 'पंजीकरण' : 'Register' },
  ];

  const buyerMobileTabs = [
    { id: 'home',       icon: <Home size={20} />,        label: lang === 'mr' ? 'होम' : lang === 'hi' ? 'होम' : 'Home' },
    { id: 'buyer',      icon: <ShoppingBag size={20} />, label: lang === 'mr' ? 'खरेदी' : lang === 'hi' ? 'खरीद' : 'Buy' },
    { id: 'mandi',      icon: <TrendingUp size={20} />,  label: lang === 'mr' ? 'मंडी' : lang === 'hi' ? 'मंडी' : 'Rates' },
    { id: 'warehouse',  icon: <Warehouse size={20} />,   label: lang === 'mr' ? 'गोदाम' : lang === 'hi' ? 'गोदाम' : 'Storage' },
    { id: 'payments',   icon: <Wallet size={20} />,      label: lang === 'mr' ? 'पेमेंट' : lang === 'hi' ? 'पेमेंट' : 'Payments' },
  ];

  const mobileTabs = userRole === 'buyer' ? buyerMobileTabs : farmerMobileTabs;

  return (
    <>
      <header className="navbar-header">
        <div className="navbar-container">
          <div className="brand-logo" onClick={() => setActiveTab(window.innerWidth < 769 ? 'home' : 'mandi')}>
            <div className="logo-icon-wrapper logo-img-wrapper">
              <img src="/agrova-logo.jpg" alt="Agrova" className="brand-logo-img" onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '🌾'; e.target.parentElement.style.fontSize = '28px'; e.target.parentElement.style.display = 'flex'; e.target.parentElement.style.alignItems = 'center'; e.target.parentElement.style.justifyContent = 'center'; }} />
            </div>
            <div className="brand-text">
              <span className="brand-name">{t.brandName}</span>
              <span className="brand-tagline">{t.brandTagline}</span>
            </div>
          </div>

          <nav className="nav-menu desktop-only">
            <button className={`nav-btn ${activeTab === 'mandi' ? 'active' : ''}`} onClick={() => setActiveTab('mandi')}><TrendingUp size={18} /><span>{t.liveMandiRates}</span></button>
            <button className={`nav-btn ${activeTab === 'prediction' ? 'active' : ''}`} onClick={() => setActiveTab('prediction')}><RefreshCw size={18} /><span>{t.priceForecast}</span></button>
            <button className={`nav-btn ${activeTab === 'quality' ? 'active' : ''}`} onClick={() => setActiveTab('quality')}><ShieldCheck size={18} /><span>{t.qualityGrading}</span></button>
            <button className={`nav-btn ${activeTab === 'warehouse' ? 'active' : ''}`} onClick={() => setActiveTab('warehouse')}><Warehouse size={18} /><span>{t.warehouseLocator}</span></button>
            <button className={`nav-btn ${activeTab === 'transport' ? 'active' : ''}`} onClick={() => setActiveTab('transport')}><Truck size={18} /><span>{t.transportLogistics}</span></button>
            <button className={`nav-btn ${activeTab === 'payments' ? 'active' : ''}`} onClick={() => setActiveTab('payments')}><Wallet size={18} /><span>{t.paymentKhaata}</span></button>
            {userRole === 'buyer' && (
              <button className={`nav-btn ${activeTab === 'buyer' ? 'active' : ''}`} onClick={() => setActiveTab('buyer')}><ShoppingBag size={18} /><span>{t.buyerMarketplace}</span></button>
            )}
            <button className={`nav-btn provider-nav-btn ${activeTab === 'provider' ? 'active' : ''}`} onClick={() => setActiveTab('provider')}><Handshake size={18} /><span>{lang === 'mr' ? 'सेवा नोंदणी' : lang === 'hi' ? 'सेवा पंजीकरण' : 'Register Service'}</span></button>
          </nav>

          <div className="nav-actions">
            {/* User Badge */}
            {user && (
              <div className="user-badge-wrap desktop-only">
                <div className="user-badge">
                  <User size={14} />
                  <span className="user-badge-name">{user.name}</span>
                  <span className="user-badge-role">{userRole === 'farmer' ? '🌾' : '🏪'}</span>
                </div>
              </div>
            )}

            {deferredPrompt && (
              <button className="install-pwa-btn" onClick={onInstallPwa}>
                <Download size={15} /><span>{lang === 'mr' ? 'अॅप इन्स्टॉल करा' : lang === 'hi' ? 'ऐप इन्स्टॉल करें' : 'Install App'}</span>
              </button>
            )}
            <div className="lang-switcher">
              <button className={`lang-btn ${lang === 'mr' ? 'active' : ''}`} onClick={() => setLang('mr')}>मराठी</button>
              <button className={`lang-btn ${lang === 'hi' ? 'active' : ''}`} onClick={() => setLang('hi')}>हिंदी</button>
              <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>ENG</button>
            </div>
            <button className="kisan-mitra-btn" onClick={onOpenKisanMitra}>
              <Bot size={16} /><span className="desktop-only">{t.kisanMitra}</span>
            </button>
            <button className="theme-toggle-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {/* Logout */}
            {user && (
              <button className="logout-btn" onClick={onLogout} title={t.logout}>
                <LogOut size={16} />
                <span className="desktop-only">{t.logout}</span>
              </button>
            )}
          </div>
        </div>

        <div className="mandi-ticker-bar">
          <div className="ticker-label">
            <span className="live-indicator">● {lang === 'mr' ? 'ताजे मंडी भाव टिकर' : lang === 'hi' ? 'ताजा मंडी भाव टिकर' : 'LIVE MANDI TICKER'}</span>
          </div>
          <div className="ticker-scroll">
            <div className="ticker-content">
              <span className="ticker-item">🧅 {lang === 'mr' ? 'कांदा (लासलगाव):' : lang === 'hi' ? 'प्याज (लासलगाव):' : 'Onion (Lasalgaon):'} <strong>₹1,950</strong> <span className="txt-up">+4.2% ↑</span></span>
              <span className="ticker-item">🍇 {lang === 'mr' ? 'द्राक्षे (पिंपळगाव):' : lang === 'hi' ? 'अंगूर (पिंपळगाव):' : 'Grapes (Pimpalgaon):'} <strong>₹4,350</strong> <span className="txt-up">+2.8% ↑</span></span>
              <span className="ticker-item">🍎 {lang === 'mr' ? 'डाळिंब (पिंपळगाव):' : lang === 'hi' ? 'अनार (पिंपळगाव):' : 'Pomegranate (Pimpalgaon):'} <strong>₹6,200</strong> <span className="txt-up">+3.5% ↑</span></span>
              <span className="ticker-item">🍅 {lang === 'mr' ? 'टोमॅटो (नाशिक):' : lang === 'hi' ? 'टमाटर (नाशिक):' : 'Tomato (Nashik):'} <strong>₹1,680</strong> <span className="txt-up">+7.2% ↑</span></span>
              <span className="ticker-item">🧅 {lang === 'mr' ? 'कांदा पांढरा (लासलगाव):' : lang === 'hi' ? 'प्याज सफेद (लासलगाव):' : 'White Onion (Lasalgaon):'} <strong>₹2,750</strong> <span className="txt-up">+6.1% ↑</span></span>
              <span className="ticker-item">🌽 {lang === 'mr' ? 'मका (चांदवड):' : lang === 'hi' ? 'मक्का (चांदवड):' : 'Maize (Chandwad):'} <strong>₹2,120</strong> <span className="txt-up">+1.4% ↑</span></span>
              <span className="ticker-item">🫑 {lang === 'mr' ? 'शिमला मिरची (नाशिक):' : lang === 'hi' ? 'शिमला मिर्च (नाशिक):' : 'Capsicum (Nashik):'} <strong>₹3,100</strong> <span className="txt-down">-1.8% ↓</span></span>
              {/* Repeat for seamless scroll */}
              <span className="ticker-item">🧅 {lang === 'mr' ? 'कांदा (लासलगाव):' : lang === 'hi' ? 'प्याज (लासलगाव):' : 'Onion (Lasalgaon):'} <strong>₹1,950</strong> <span className="txt-up">+4.2% ↑</span></span>
              <span className="ticker-item">🍇 {lang === 'mr' ? 'द्राक्षे (पिंपळगाव):' : lang === 'hi' ? 'अंगूर (पिंपळगाव):' : 'Grapes (Pimpalgaon):'} <strong>₹4,350</strong> <span className="txt-up">+2.8% ↑</span></span>
              <span className="ticker-item">🍎 {lang === 'mr' ? 'डाळिंब (पिंपळगाव):' : lang === 'hi' ? 'अनार (पिंपळगाव):' : 'Pomegranate (Pimpalgaon):'} <strong>₹6,200</strong> <span className="txt-up">+3.5% ↑</span></span>
            </div>
          </div>
        </div>
      </header>

      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        {mobileTabs.map(tab => (
          <button
            key={tab.id}
            className={`mobile-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            <span className="mobile-tab-icon">{tab.icon}</span>
            <span className="mobile-tab-label">{tab.label}</span>
            {activeTab === tab.id && <span className="mobile-tab-pill" />}
          </button>
        ))}
      </nav>
    </>
  );
}
