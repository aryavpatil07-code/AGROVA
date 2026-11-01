import React, { useState } from 'react';
import { Sprout, ShoppingBag, Phone, Shield, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function RoleSelectionScreen({ onLogin }) {
  const [step, setStep] = useState('role'); // 'role' | 'login'
  const [selectedRole, setSelectedRole] = useState(null);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [name, setName] = useState('');

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setStep('login');
  };

  const handleSendOtp = () => {
    if (phone.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setOtp('1234'); // Pre-fill for demo
      setLoading(false);
    }, 1200);
  };

  const handleVerifyLogin = () => {
    if (!otp || otp.length < 4 || !name.trim()) return;
    setLoading(true);
    setTimeout(() => {
      onLogin({
        role: selectedRole,
        name: name.trim(),
        phone: phone,
      });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="role-screen-overlay">
      {/* Animated Background */}
      <div className="role-bg-pattern">
        <div className="role-bg-circle c1"></div>
        <div className="role-bg-circle c2"></div>
        <div className="role-bg-circle c3"></div>
      </div>

      <div className="role-screen-content">
        {/* Branding */}
        <div className="role-brand">
          <div className="role-brand-icon">🌾</div>
          <h1 className="role-brand-title">AGROVA</h1>
          <p className="role-brand-sub">नाशिक कृषी बाजार प्लॅटफॉर्म</p>
          <p className="role-brand-sub-en">Nashik AgriTech Market Platform</p>
        </div>

        {step === 'role' && (
          <div className="role-cards-section">
            <h2 className="role-prompt">तुम्ही कोण आहात? / Who are you?</h2>
            <p className="role-prompt-sub">सुरू करण्यासाठी निवडा / Select to continue</p>
            
            <div className="role-cards-grid">
              {/* Farmer Card */}
              <button className="role-card farmer-role-card" onClick={() => handleRoleSelect('farmer')}>
                <div className="role-card-glow farmer-glow"></div>
                <div className="role-card-icon-wrap">
                  <Sprout size={40} />
                </div>
                <h3 className="role-card-title">🌾 शेतकरी</h3>
                <p className="role-card-title-en">Farmer / FPO</p>
                <ul className="role-card-features">
                  <li>📊 मंडी भाव पहा</li>
                  <li>📈 AI किंमत अंदाज</li>
                  <li>🚛 वाहतूक बुक करा</li>
                  <li>💰 पेमेंट ट्रॅक करा</li>
                </ul>
                <div className="role-card-cta">
                  <span>शेतकरी म्हणून सुरू करा</span>
                  <ArrowRight size={18} />
                </div>
              </button>

              {/* Buyer Card */}
              <button className="role-card buyer-role-card" onClick={() => handleRoleSelect('buyer')}>
                <div className="role-card-glow buyer-glow"></div>
                <div className="role-card-icon-wrap buyer-icon">
                  <ShoppingBag size={40} />
                </div>
                <h3 className="role-card-title">🏪 व्यापारी</h3>
                <p className="role-card-title-en">Buyer / Trader / Miller</p>
                <ul className="role-card-features">
                  <li>🛒 थोक खरेदी करा</li>
                  <li>⚖️ गुणवत्ता तपासा</li>
                  <li>📦 शेतमाल शोधा</li>
                  <li>🤝 शेतकऱ्यांशी जोडा</li>
                </ul>
                <div className="role-card-cta">
                  <span>व्यापारी म्हणून सुरू करा</span>
                  <ArrowRight size={18} />
                </div>
              </button>
            </div>

            <div className="role-footer-info">
              <Shield size={14} />
              <span>महाराष्ट्र राज्य नवोपक्रम सोसायटी | Govt. of Maharashtra Initiative</span>
            </div>
          </div>
        )}

        {step === 'login' && (
          <div className="login-section">
            <button className="login-back-btn" onClick={() => { setStep('role'); setOtpSent(false); setPhone(''); setOtp(''); setName(''); }}>
              ← भूमिका बदला / Change Role
            </button>

            <div className="login-card">
              <div className="login-role-badge">
                {selectedRole === 'farmer' ? '🌾 शेतकरी / Farmer' : '🏪 व्यापारी / Buyer'}
              </div>
              
              <h2 className="login-title">लॉगिन / Register</h2>
              <p className="login-subtitle">तुमचा मोबाईल नंबर टाका / Enter your mobile number</p>

              <div className="login-form">
                <div className="login-field">
                  <label>तुमचे नाव / Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="उदा. राजेश पाटील"
                    className="login-input"
                  />
                </div>

                <div className="login-field">
                  <label>मोबाईल नंबर / Mobile Number</label>
                  <div className="login-phone-row">
                    <span className="login-country-code">+91</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="98XXXXXXXX"
                      className="login-input"
                      maxLength={10}
                    />
                  </div>
                </div>

                {!otpSent ? (
                  <button
                    className="login-btn primary-login-btn"
                    onClick={handleSendOtp}
                    disabled={phone.length < 10 || loading}
                  >
                    {loading ? <><Loader2 size={18} className="spin-icon" /> पाठवत आहे...</> : <><Phone size={18} /> OTP पाठवा / Send OTP</>}
                  </button>
                ) : (
                  <>
                    <div className="login-field">
                      <label>OTP टाका / Enter OTP</label>
                      <div className="login-otp-row">
                        <input
                          type={showOtp ? "text" : "password"}
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          placeholder="● ● ● ●"
                          className="login-input otp-input"
                          maxLength={6}
                        />
                        <button className="otp-eye-btn" onClick={() => setShowOtp(!showOtp)}>
                          {showOtp ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      <p className="login-otp-hint">डेमो OTP: 1234 (Demo OTP: 1234)</p>
                    </div>

                    <button
                      className="login-btn primary-login-btn"
                      onClick={handleVerifyLogin}
                      disabled={!otp || otp.length < 4 || !name.trim() || loading}
                    >
                      {loading ? <><Loader2 size={18} className="spin-icon" /> तपासत आहे...</> : <><Shield size={18} /> लॉगिन करा / Login</>}
                    </button>
                  </>
                )}
              </div>
            </div>

            <p className="login-demo-note">
              ⓘ हे डेमो लॉगिन आहे. कोणताही नंबर आणि OTP 1234 वापरा.<br/>
              This is a demo login. Use any number and OTP 1234.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
