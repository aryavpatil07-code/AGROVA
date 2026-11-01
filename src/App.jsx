import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import RoleSelectionScreen from './components/RoleSelectionScreen';
import MobileHome from './components/MobileHome';
import MandiRates from './components/MandiRates';
import PricePredictor from './components/PricePredictor';
import QualityGrading from './components/QualityGrading';
import WarehouseLocator from './components/WarehouseLocator';
import BuyerMarketplace from './components/BuyerMarketplace';
import TransportLogistics from './components/TransportLogistics';
import PaymentKhaata from './components/PaymentKhaata';
import FrameworkGuide from './components/FrameworkGuide';
import KisanMitraModal from './components/KisanMitraModal';
import ServiceProvider from './components/ServiceProvider';
import './App.css';

export default function App() {
  // ── Auth State ──
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('agrova_user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  // ── App State ──
  const [activeTab, setActiveTab] = useState(() => window.innerWidth < 769 ? 'home' : 'mandi');
  const [lang, setLang] = useState('mr'); // Default to Marathi for Nashik
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isKisanMitraOpen, setIsKisanMitraOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedCropForPrediction, setSelectedCropForPrediction] = useState(null);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // Derive userRole from auth
  const userRole = user?.role || 'farmer';

  // ── Login Handler ──
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('agrova_user', JSON.stringify(userData));
    // Set initial tab based on role
    if (userData.role === 'buyer') {
      setActiveTab('buyer');
    } else {
      setActiveTab(window.innerWidth < 769 ? 'home' : 'mandi');
    }
  };

  // ── Logout Handler ──
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('agrova_user');
  };

  // Capture PWA Install Prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallPwa = () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    });
  };

  // Synchronize body class for Dark/Light theme switching
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkMode]);

  // Navigate to price prediction with selected crop context
  const handleOpenPrediction = (crop) => {
    setSelectedCropForPrediction(crop);
    setActiveTab('prediction');
  };

  // ── If not logged in, show Role Selection Screen ──
  if (!user) {
    return <RoleSelectionScreen onLogin={handleLogin} />;
  }

  return (
    <div className={`app-root ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      {/* Top Navbar & Mobile Navigation */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={() => {}} // Role is now set at login
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenKisanMitra={() => setIsKisanMitraOpen(true)}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        lang={lang}
        setLang={setLang}
        deferredPrompt={deferredPrompt}
        onInstallPwa={handleInstallPwa}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main App Content View Switcher */}
      <main className="main-content-container">
        {activeTab === 'home' && (
          <MobileHome
            lang={lang}
            setActiveTab={setActiveTab}
            onOpenKisanMitra={() => setIsKisanMitraOpen(true)}
            user={user}
          />
        )}

        {activeTab === 'mandi' && (
          <MandiRates 
            onOpenPrediction={handleOpenPrediction}
            lang={lang}
          />
        )}

        {activeTab === 'prediction' && (
          <PricePredictor 
            initialCrop={selectedCropForPrediction}
            onNavigateToWarehouse={(state) => setActiveTab('warehouse')}
            lang={lang}
          />
        )}

        {activeTab === 'quality' && (
          <QualityGrading lang={lang} />
        )}

        {activeTab === 'warehouse' && (
          <WarehouseLocator lang={lang} />
        )}

        {activeTab === 'transport' && (
          <TransportLogistics lang={lang} />
        )}

        {activeTab === 'payments' && (
          <PaymentKhaata lang={lang} />
        )}

        {activeTab === 'buyer' && (
          <BuyerMarketplace lang={lang} />
        )}

        {activeTab === 'provider' && (
          <ServiceProvider lang={lang} />
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <strong>🌾 AGROVA — नाशिक कृषी बाजार प्लॅटफॉर्म</strong>
            <p>{lang === 'mr' ? 'शेतकऱ्यांसाठी आणि व्यापाऱ्यांसाठी भारताचे स्मार्ट मंडी भाव आणि गोदाम नेटवर्क.' : lang === 'hi' ? 'किसानों और व्यापारियों के लिए भारत का स्मार्ट मंडी भाव और गोदाम नेटवर्क।' : 'Empowering Farmers & Buyers with Real-Time Mandi Rates, Price Predictions & Storage.'}</p>
          </div>
          <div className="footer-links">
            <span className="footer-copy">© 2026 Agrova — Maharashtra State Innovation Society</span>
          </div>
        </div>
      </footer>

      {/* Embedded Framework Learning Modal */}
      <FrameworkGuide 
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Kisan Mitra Voice & Smart Assistant Modal */}
      <KisanMitraModal
        isOpen={isKisanMitraOpen}
        onClose={() => setIsKisanMitraOpen(false)}
        lang={lang}
      />
    </div>
  );
}
