import React, { useState, useRef, useEffect } from 'react';
import {
  Volume2, VolumeX, Bot, Sparkles, Mic, X,
  Send, CheckCircle2, Loader2, MessageSquare
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

// Canned Q&A pairs
const QA_BANK = {
  en: [
    { id: 1, q: "🌾 Today's onion price in Lasalgaon?",         a: "Today's Red Onion rate in Lasalgaon APMC is ₹1,950/Quintal (+4.2% rise). AI recommends holding 15–30 days in cold storage — prices expected to reach ₹2,650 (+₹700 extra/quintal)." },
    { id: 2, q: "📦 Nearest cold storage in Nashik?",            a: "MSAMB Cold Storage is 3.2 km from Lasalgaon APMC. Rate: ₹3.5/quintal/day, 2,400 MT available. WDRA certified — bank pledge loans available!" },
    { id: 3, q: "⚖️ Grade A+ onion bonus?",                      a: "Grade A+ onions earn ~+12% premium at Lasalgaon APMC — that's ₹234 extra per quintal compared to standard grade!" },
    { id: 4, q: "📈 Sell grapes today or wait 10 days?",         a: "Thompson Seedless Grapes: ₹4,350/qtl today (+2.8%). AI projects ₹4,580 in 7 days and ₹5,100 in 30 days. Store in CA storage at Pimpalgaon!" },
    { id: 5, q: "💰 What is MSP for onions this season?",        a: "There is currently no official MSP for onions set by the government. However, NAFED intervenes when prices fall below ₹800/quintal through buffer stock purchases." },
    { id: 6, q: "🚛 Transport cost from Dindori to Lasalgaon?", a: "Distance: ~35 km. Estimated freight: ₹1,200–₹1,800 for a mini-truck (1.5 MT). Use the Transport tab to book directly with GPS-tracked drivers." },
  ],
  hi: [
    { id: 1, q: "🌾 लासलगाव में आज प्याज का भाव?",              a: "लासलगाव APMC में आज नाशिक लाल प्याज ₹1,950/क्विंटल (+4.2%)। AI सलाह: 15–30 दिन कोल्ड स्टोरेज में रखें, भाव ₹2,650 तक जाएगा।" },
    { id: 2, q: "📦 नाशिक में नज़दीकी कोल्ड स्टोरेज?",         a: "MSAMB कोल्ड स्टोरेज लासलगाव APMC से 3.2 किमी। किराया ₹3.5/क्विंटल/दिन, 2,400 MT उपलब्ध। WDRA प्रमाणित — बैंक लोन मिलेगा!" },
    { id: 3, q: "⚖️ ग्रेड A+ पर कितना बोनस मिलेगा?",           a: "ग्रेड A+ प्याज पर ~+12% प्रीमियम मिलता है — यानी ₹234/क्विंटल अतिरिक्त!" },
    { id: 4, q: "📈 अंगूर आज बेचूं या 10 दिन रुकूं?",          a: "थॉम्पसन अंगूर आज ₹4,350/क्विंटल (+2.8%)। 7 दिन में ₹4,580 और 30 दिन में ₹5,100 का अनुमान। पिंपळगाव CA स्टोरेज में रखें!" },
    { id: 5, q: "💰 इस सीज़न प्याज का MSP क्या है?",            a: "प्याज के लिए सरकारी MSP नहीं है। लेकिन NAFED ₹800/क्विंटल से नीचे जाने पर बफर स्टॉक खरीद करती है।" },
    { id: 6, q: "🚛 दिंडोरी से लासलगाव माल भाड़ा?",           a: "दूरी: ~35 किमी। मिनी-ट्रक का भाड़ा ₹1,200–₹1,800 (1.5 MT)। Transport टैब से GPS ड्राइवर बुक करें।" },
  ],
  mr: [
    { id: 1, q: "🌾 लासलगावला आज कांद्याचा भाव?",              a: "लासलगाव APMC मध्ये आज नाशिक लाल कांदा ₹1,950/क्विंटल (+4.2% वाढ). AI शिफारस: 15–30 दिवस कोल्ड स्टोरेजमध्ये ठेवा, भाव ₹2,650 पर्यंत जाण्याची शक्यता." },
    { id: 2, q: "📦 नाशिकमध्ये जवळचे कोल्ड स्टोरेज?",          a: "MSAMB कोल्ड स्टोरेज लासलगाव APMC पासून 3.2 किमी. भाडे ₹3.5/क्विंटल/दिवस, 2,400 MT उपलब्ध. WDRA प्रमाणित — बँक कर्ज मिळते!" },
    { id: 3, q: "⚖️ ग्रेड A+ कांद्यावर किती बोनस?",            a: "ग्रेड A+ कांद्यावर ~+12% प्रीमियम मिळतो — म्हणजे ₹234/क्विंटल अतिरिक्त!" },
    { id: 4, q: "📈 द्राक्षे आज विकावी की 10 दिवस थांबावे?",  a: "थॉम्पसन द्राक्षे आज ₹4,350/क्विंटल (+2.8%). 7 दिवसांत ₹4,580 आणि 30 दिवसांत ₹5,100 अंदाज. पिंपळगाव CA स्टोरेजमध्ये ठेवा!" },
    { id: 5, q: "💰 या हंगामात कांद्याचा MSP काय आहे?",        a: "कांद्यासाठी सरकारी MSP नाही. मात्र NAFED ₹800/क्विंटलपेक्षा खाली गेल्यास बफर स्टॉक खरेदी करते." },
    { id: 6, q: "🚛 दिंडोरी ते लासलगाव माल वाहतूक खर्च?",     a: "अंतर: ~35 किमी. मिनी-ट्रक भाडे ₹1,200–₹1,800 (1.5 MT). Transport टॅबमधून GPS ड्रायव्हर बुक करा." },
  ],
};

export default function KisanMitraModal({ isOpen, onClose, lang = 'mr' }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.mr;
  const qa = QA_BANK[lang] || QA_BANK.mr;

  const [messages, setMessages] = useState([
    { id: 0, role: 'bot', text: lang === 'mr'
      ? 'नमस्कार! 🙏 मी शेतकरी मित्र AI आहे. खाली दिलेल्या प्रश्नांवर क्लिक करा किंवा तुमचा प्रश्न टाइप करा!'
      : lang === 'hi'
      ? 'नमस्ते! 🙏 मैं किसान मित्र AI हूं। नीचे दिए प्रश्नों पर क्लिक करें या अपना प्रश्न टाइप करें!'
      : 'Hello! 🙏 I\'m Kisan Mitra AI. Tap a quick question below or type your own!' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [activeSpeakId, setActiveSpeakId] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const addBotReply = (text) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(m => [...m, { id: Date.now(), role: 'bot', text }]);
      setIsTyping(false);
    }, 700 + Math.random() * 400);
  };

  const handleQuickQ = (item) => {
    setMessages(m => [...m, { id: Date.now(), role: 'user', text: item.q }]);
    addBotReply(item.a);
  };

  const handleSend = () => {
    const val = inputVal.trim();
    if (!val) return;
    setMessages(m => [...m, { id: Date.now(), role: 'user', text: val }]);
    setInputVal('');
    // Simple keyword matching
    const lower = val.toLowerCase();
    const match = qa.find(q =>
      q.q.toLowerCase().split(' ').some(w => w.length > 3 && lower.includes(w))
    );
    addBotReply(match?.a ||
      (lang === 'mr'
        ? 'हा प्रश्न माझ्याकडे नाही. कृपया मंडी भाव, गोदाम, वाहतूक किंवा गुणवत्ता याबद्दल विचारा!'
        : lang === 'hi'
        ? 'यह प्रश्न मेरे पास नहीं है। कृपया मंडी भाव, गोदाम, वाहन या गुणवत्ता के बारे में पूछें!'
        : "I don't have an answer for that yet. Try asking about mandi prices, warehouses, transport, or quality grading!")
    );
  };

  const handleSpeak = (text, id) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (activeSpeakId === id) { setActiveSpeakId(null); setIsSpeaking(false); return; }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-US';
    u.rate = 0.88;
    u.onend = () => { setIsSpeaking(false); setActiveSpeakId(null); };
    u.onerror = () => { setIsSpeaking(false); setActiveSpeakId(null); };
    setIsSpeaking(true);
    setActiveSpeakId(id);
    window.speechSynthesis.speak(u);
  };

  const handleClose = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setActiveSpeakId(null);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="km2-modal" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="km2-header">
          <div className="km2-header-left">
            <div className="km2-bot-avatar">
              <Bot size={22}/>
              <span className="km2-online-dot"/>
            </div>
            <div>
              <h2 className="km2-title">{t.kisanMitraTitle}</h2>
              <p className="km2-subtitle">{t.kisanMitraSubtitle}</p>
            </div>
          </div>
          <button className="km2-close" onClick={handleClose}><X size={18}/></button>
        </div>

        {/* Chat Area */}
        <div className="km2-chat">
          {messages.map(msg => (
            <div key={msg.id} className={`km2-msg km2-msg-${msg.role}`}>
              {msg.role === 'bot' && (
                <div className="km2-bot-bubble-wrap">
                  <div className="km2-bot-dot"><Sparkles size={12}/></div>
                  <div className="km2-bubble km2-bubble-bot">
                    <p>{msg.text}</p>
                    <button
                      className={`km2-speak-btn ${activeSpeakId === msg.id ? 'active' : ''}`}
                      onClick={() => handleSpeak(msg.text, msg.id)}
                      title={activeSpeakId === msg.id ? 'Stop' : 'Listen'}
                    >
                      {activeSpeakId === msg.id
                        ? <><VolumeX size={12}/> {lang === 'mr' ? 'थांबवा' : lang === 'hi' ? 'रोकें' : 'Stop'}</>
                        : <><Volume2 size={12}/> {lang === 'mr' ? 'ऐका' : lang === 'hi' ? 'सुनें' : 'Listen'}</>}
                      {activeSpeakId === msg.id && <span className="km2-wave"/>}
                    </button>
                  </div>
                </div>
              )}
              {msg.role === 'user' && (
                <div className="km2-bubble km2-bubble-user">{msg.text}</div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="km2-msg km2-msg-bot">
              <div className="km2-bot-bubble-wrap">
                <div className="km2-bot-dot"><Sparkles size={12}/></div>
                <div className="km2-bubble km2-bubble-bot km2-typing">
                  <span/><span/><span/>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef}/>
        </div>

        {/* Quick Questions */}
        <div className="km2-quick-section">
          <p className="km2-quick-label">
            <Mic size={12}/> {lang === 'mr' ? 'झटपट प्रश्न' : lang === 'hi' ? 'जल्दी सवाल' : 'Quick Questions'}
          </p>
          <div className="km2-quick-grid">
            {qa.map(item => (
              <button key={item.id} className="km2-quick-btn" onClick={() => handleQuickQ(item)}>
                {item.q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="km2-input-bar">
          <input
            type="text"
            className="km2-input"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={lang === 'mr' ? 'तुमचा प्रश्न टाइप करा...' : lang === 'hi' ? 'अपना सवाल लिखें...' : 'Type your question...'}
          />
          <button className="km2-send-btn" onClick={handleSend} disabled={!inputVal.trim()}>
            <Send size={16}/>
          </button>
        </div>

        <div className="km2-footer-note">
          <CheckCircle2 size={12} style={{ color: '#10b981' }}/>
          {lang === 'mr' ? 'सत्यापित APMC मंडी डेटावर आधारित' : lang === 'hi' ? 'सत्यापित APMC मंडी डेटा पर आधारित' : 'Based on verified APMC Mandi data'}
        </div>
      </div>
    </div>
  );
}
