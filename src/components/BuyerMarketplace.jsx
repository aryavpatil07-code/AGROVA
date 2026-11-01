import React, { useState } from 'react';
import { MANDI_RATES } from '../data/mandiRates';
import {
  ShoppingBag, ShieldCheck, Phone, CheckCircle2, Send,
  Star, AlertTriangle, MessageSquare, FileText, Filter,
  Search, Package, BadgeCheck, Scale
} from 'lucide-react';

export default function BuyerMarketplace({ lang = 'mr' }) {
  const isMr = lang === 'mr';
  const isHi = lang === 'hi';

  const [biddingCrop, setBiddingCrop] = useState(null);
  const [bidPrice, setBidPrice] = useState('');
  const [bidQuantity, setBidQuantity] = useState('200');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDispute, setShowDispute] = useState(false);
  const [disputeForm, setDisputeForm] = useState({ txnId: '', issue: '', details: '' });
  const [disputeSubmitted, setDisputeSubmitted] = useState(false);

  // Active bids (mock)
  const [activeBids] = useState([
    { id: 'bid-1', crop: 'Onion (Nashik Red)', mandi: 'Lasalgaon APMC', bidPrice: 2000, quantity: 500, status: 'Accepted', date: '2026-09-12' },
    { id: 'bid-2', crop: 'Grapes (Thompson)', mandi: 'Pimpalgaon APMC', bidPrice: 4500, quantity: 200, status: 'Counter-offered', counterPrice: 4650, date: '2026-09-11' },
    { id: 'bid-3', crop: 'Tomato (Hybrid)', mandi: 'Nashik City APMC', bidPrice: 1750, quantity: 100, status: 'Expired', date: '2026-09-08' },
  ]);

  const filteredCrops = MANDI_RATES.filter(crop =>
    crop.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crop.mandi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDisputeSubmit = () => {
    setDisputeSubmitted(true);
    setTimeout(() => {
      setDisputeSubmitted(false);
      setShowDispute(false);
      setDisputeForm({ txnId: '', issue: '', details: '' });
    }, 2500);
  };

  const bidStatusConfig = {
    'Accepted': { color: '#10b981', bg: 'rgba(16,185,129,0.12)', icon: '✅' },
    'Counter-offered': { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', icon: '🔄' },
    'Expired': { color: '#6b7280', bg: 'rgba(107,114,128,0.12)', icon: '⏰' },
    'Pending': { color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', icon: '⏳' },
  };

  return (
    <div className="buyer-marketplace-container">
      {/* Hero Banner */}
      <div className="section-hero buyer-hero">
        <div className="hero-content">
          <span className="hero-pill">🏪 {isMr ? 'ठोक खरेदीदार आणि व्यापारी पोर्टल' : isHi ? 'थोक खरीदार और व्यापारी पोर्टल' : 'Wholesale Buyer & Trader Portal'}</span>
          <h1>{isMr ? 'नाशिक APMC — थेट शेतमाल खरेदी आणि बिडिंग' : isHi ? 'नाशिक APMC — सीधी कृषि खरीद और बिडिंग' : 'Nashik APMC — Direct Agri Sourcing & Bidding'}</h1>
          <p>{isMr ? 'गुणवत्ता-प्रमाणित पिके थेट शेतकऱ्यांकडून खरेदी करा, गुणवत्ता तपासा आणि मंडीत स्पर्धात्मक बोली लावा.' : isHi ? 'गुणवत्ता-प्रमाणित फसलें सीधे किसानों से खरीदें, गुणवत्ता जांचें और मंडी में स्पर्धात्मक बोली लगाएं.' : 'Source quality-certified crops directly from farmers, inspect grades, and place competitive bids on live APMC arrivals.'}</p>
        </div>
      </div>

      {/* Buyer Profile Card */}
      <div className="buyer-profile-card">
        <div className="buyer-profile-left">
          <div className="buyer-avatar">🏪</div>
          <div>
            <h3>{isMr ? 'श्री गणेश ट्रेडिंग कंपनी' : 'Shri Ganesh Trading Co.'}</h3>
            <p className="buyer-license">APMC License: LSLG-2024-4521 <BadgeCheck size={14} className="verified-icon" /></p>
            <p className="buyer-meta"><Star size={12} /> 4.8 (342 {isMr ? 'व्यवहार' : 'transactions'}) • {isMr ? 'लासलगाव APMC' : 'Lasalgaon APMC'}</p>
          </div>
        </div>
        <button className="dispute-trigger-btn" onClick={() => setShowDispute(true)}>
          <AlertTriangle size={14} /> {isMr ? 'तक्रार नोंदवा' : isHi ? 'शिकायत दर्ज करें' : 'File Dispute'}
        </button>
      </div>

      {/* Active Bids Section */}
      <div className="buyer-bids-section">
        <h2 className="buyer-section-title">
          <Scale size={18} /> {isMr ? 'माझ्या सक्रिय बोली' : isHi ? 'मेरी सक्रिय बोलियां' : 'My Active Bids'}
        </h2>
        <div className="buyer-bids-grid">
          {activeBids.map(bid => {
            const sc = bidStatusConfig[bid.status];
            return (
              <div key={bid.id} className="buyer-bid-card">
                <div className="bid-card-top">
                  <div>
                    <h4>{bid.crop}</h4>
                    <p className="bid-card-mandi">{bid.mandi} • {bid.date}</p>
                  </div>
                  <span className="bid-status-pill" style={{ color: sc.color, background: sc.bg }}>
                    {sc.icon} {bid.status}
                  </span>
                </div>
                <div className="bid-card-details">
                  <span>{isMr ? 'बोली' : 'Bid'}: ₹{bid.bidPrice}/Qtl</span>
                  <span>{isMr ? 'प्रमाण' : 'Qty'}: {bid.quantity} Qtl</span>
                  <span>{isMr ? 'एकूण' : 'Total'}: ₹{(bid.bidPrice * bid.quantity).toLocaleString('en-IN')}</span>
                </div>
                {bid.status === 'Counter-offered' && (
                  <div className="bid-counter-strip">
                    <span>🔄 {isMr ? 'शेतकऱ्याची प्रतिबोली' : 'Farmer counter-offer'}: <strong>₹{bid.counterPrice}/Qtl</strong></span>
                    <div className="bid-counter-actions">
                      <button className="btn-small accept" onClick={() => alert(isMr ? '✅ प्रतिबोली स्वीकारली!' : '✅ Counter accepted!')}>✅ {isMr ? 'स्वीकारा' : 'Accept'}</button>
                      <button className="btn-small reject" onClick={() => alert(isMr ? '❌ प्रतिबोली नाकारली!' : '❌ Counter rejected!')}>❌ {isMr ? 'नाकारा' : 'Reject'}</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Available Lots */}
      <div className="buyer-lots-section">
        <div className="buyer-lots-header">
          <h2 className="buyer-section-title">
            <Package size={18} /> {isMr ? 'उपलब्ध शेतमाल — बोली लावा' : isHi ? 'उपलब्ध फसल — बोली लगाएं' : 'Available Lots — Place Bid'}
          </h2>
          <div className="buyer-search-wrap">
            <Search size={15} />
            <input type="text" placeholder={isMr ? 'पीक किंवा मंडी शोधा...' : 'Search crop or market...'} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="buyer-search-input" />
          </div>
        </div>

        <div className="buyer-grid">
          {filteredCrops.map(crop => (
            <div key={crop.id} className="buyer-card">
              <div className="card-header">
                <div>
                  <span className="verified-badge">
                    <ShieldCheck size={14} /> {isMr ? 'गुणवत्ता प्रमाणित' : 'Quality Verified'}
                  </span>
                  <h3>{crop.crop}</h3>
                  <p className="sub-txt">{crop.mandi} • {crop.state}</p>
                </div>
                <div className="grade-pill">{crop.qualityGrade}</div>
              </div>

              <div className="procurement-details">
                <div className="detail-item">
                  <span>{isMr ? 'उपलब्ध प्रमाण:' : isHi ? 'उपलब्ध मात्रा:' : 'Available Volume:'}</span>
                  <strong>{crop.arrivalQty}</strong>
                </div>
                <div className="detail-item">
                  <span>{isMr ? 'मंडी बेंचमार्क:' : 'Mandi Benchmark:'}</span>
                  <strong className="modal-txt">₹{crop.modalPrice} / {isMr ? 'क्विंटल' : 'Quintal'}</strong>
                </div>
              </div>

              <div className="card-actions">
                <button 
                  className="btn-outline"
                  onClick={() => alert(isMr ? `${crop.mandi} मंडी अधिकाऱ्याशी संपर्क: +91 98000 12345` : `Direct connection with ${crop.mandi} officer: +91 98000 12345`)}
                >
                  <Phone size={15} /> {isMr ? 'शेतकऱ्याला कॉल करा' : isHi ? 'किसान को कॉल करें' : 'Contact Farmer'}
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => {
                    setBiddingCrop(crop);
                    setBidPrice(crop.modalPrice + 50);
                  }}
                >
                  {isMr ? 'बोली लावा →' : isHi ? 'बोली लगाएं →' : 'Place Bid →'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bidding Modal */}
      {biddingCrop && (
        <div className="modal-overlay" onClick={() => setBiddingCrop(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>{isMr ? `${biddingCrop.crop} साठी बोली लावा` : `Place Bid for ${biddingCrop.crop}`}</h2>
                <p>{biddingCrop.mandi}</p>
              </div>
              <button className="close-btn" onClick={() => setBiddingCrop(null)}>×</button>
            </div>

            <div className="modal-body">
              <div className="bid-summary-box">
                <div>
                  <span>{isMr ? 'सध्याचा मंडी भाव:' : 'Current Mandi Price:'}</span>
                  <strong>₹{biddingCrop.modalPrice} / {isMr ? 'क्विंटल' : 'Quintal'}</strong>
                </div>
                <div>
                  <span>{isMr ? 'गुणवत्ता श्रेणी:' : 'Quality Grade:'}</span>
                  <strong className="txt-success">{biddingCrop.qualityGrade}</strong>
                </div>
              </div>

              <div className="form-group">
                <label className="input-label">{isMr ? 'तुमची बोली दर प्रति क्विंटल (₹):' : 'Your Bid Price per Quintal (₹):'}</label>
                <input 
                  type="number" 
                  value={bidPrice} 
                  onChange={(e) => setBidPrice(e.target.value)}
                  className="custom-input large-input"
                />
              </div>

              <div className="form-group">
                <label className="input-label">{isMr ? 'अपेक्षित प्रमाण (क्विंटल):' : 'Desired Quantity (Quintals):'}</label>
                <input 
                  type="number" 
                  value={bidQuantity} 
                  onChange={(e) => setBidQuantity(e.target.value)}
                  className="custom-input"
                />
              </div>

              <div className="total-bid-value">
                <span>{isMr ? 'अंदाजे एकूण खरेदी रक्कम:' : 'Estimated Total Procurement Value:'}</span>
                <h3>₹{((Number(bidPrice) || 0) * (Number(bidQuantity) || 0)).toLocaleString('en-IN')}</h3>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-outline" onClick={() => setBiddingCrop(null)}>{isMr ? 'रद्द करा' : 'Cancel'}</button>
              <button 
                className="btn-primary"
                onClick={() => {
                  alert(isMr ? `₹${bidPrice}/क्विंटल × ${bidQuantity} क्विंटल बोली सादर! Agrova टीम सत्यापित करून संपर्क करेल.` : `Bid of ₹${bidPrice}/Quintal for ${bidQuantity} Quintals submitted! Agrova team will verify and connect.`);
                  setBiddingCrop(null);
                }}
              >
                <Send size={16} /> {isMr ? 'बोली सादर करा' : 'Submit Bid'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dispute/Grievance Modal */}
      {showDispute && (
        <div className="modal-overlay" onClick={() => { setShowDispute(false); setDisputeSubmitted(false); }}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {disputeSubmitted ? (
              <div className="booking-success-screen">
                <CheckCircle2 size={56} className="success-icon" />
                <h2>{isMr ? '✅ तक्रार नोंदवली!' : '✅ Dispute Filed!'}</h2>
                <p>{isMr ? 'संदर्भ क्रमांक: AGRV-DSP-2026-0042. आमची टीम 48 तासांत संपर्क करेल.' : 'Reference: AGRV-DSP-2026-0042. Our team will respond within 48 hours.'}</p>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <div>
                    <h2><AlertTriangle size={20} /> {isMr ? 'तक्रार / विवाद नोंदवा' : 'File Dispute / Grievance'}</h2>
                  </div>
                  <button className="close-btn" onClick={() => setShowDispute(false)}>×</button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label>{isMr ? 'व्यवहार ID (असल्यास)' : 'Transaction ID (if any)'}</label>
                    <input type="text" className="custom-input" placeholder="e.g. txn-001"
                      value={disputeForm.txnId} onChange={e => setDisputeForm({ ...disputeForm, txnId: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>{isMr ? 'समस्येचा प्रकार' : 'Issue Type'}</label>
                    <select className="custom-input" value={disputeForm.issue} onChange={e => setDisputeForm({ ...disputeForm, issue: e.target.value })}>
                      <option value="">{isMr ? '— निवडा —' : '— Select —'}</option>
                      <option value="payment">{isMr ? 'पेमेंट थकबाकी / विलंब' : 'Payment Delay / Default'}</option>
                      <option value="quality">{isMr ? 'गुणवत्ता विसंगती' : 'Quality Mismatch'}</option>
                      <option value="weight">{isMr ? 'वजन विवाद' : 'Weight Dispute'}</option>
                      <option value="delivery">{isMr ? 'वाहतूक / डिलिव्हरी समस्या' : 'Transport / Delivery Issue'}</option>
                      <option value="other">{isMr ? 'इतर' : 'Other'}</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>{isMr ? 'तपशील लिहा' : 'Describe the issue'}</label>
                    <textarea className="custom-input custom-textarea" rows={4} placeholder={isMr ? 'तुमची समस्या सविस्तर लिहा...' : 'Describe your issue in detail...'}
                      value={disputeForm.details} onChange={e => setDisputeForm({ ...disputeForm, details: e.target.value })} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn-outline" onClick={() => setShowDispute(false)}>{isMr ? 'रद्द करा' : 'Cancel'}</button>
                  <button className="btn-primary" onClick={handleDisputeSubmit} disabled={!disputeForm.issue || !disputeForm.details}>
                    <Send size={16} /> {isMr ? 'तक्रार नोंदवा' : 'Submit Dispute'}
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
