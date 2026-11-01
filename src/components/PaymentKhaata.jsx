import React, { useState, useMemo } from 'react';
import {
  Wallet, IndianRupee, Clock, CheckCircle2, AlertTriangle, XCircle,
  Plus, Filter, Download, Send, FileText, Search, Eye, ChevronDown,
  Calendar, TrendingUp, ArrowUpRight, Receipt
} from 'lucide-react';
import { PAYMENT_RECORDS, PAYMENT_SUMMARY } from '../data/paymentData';

export default function PaymentKhaata({ lang = 'mr' }) {
  const isMr = lang === 'mr';
  const isHi = lang === 'hi';
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSale, setNewSale] = useState({
    commodity: '', buyer: '', weight: '', rate: '', commission: '2.5', agent: ''
  });

  const filteredRecords = useMemo(() => {
    return PAYMENT_RECORDS.filter(r => {
      const matchesStatus = filterStatus === 'all' || r.status === filterStatus;
      const matchesSearch = r.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.mandi.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [filterStatus, searchTerm]);

  const statusConfig = {
    paid: { label: isMr ? '✅ भुगतान झाले' : isHi ? '✅ भुगतान हो गया' : '✅ Paid', color: '#10b981', bg: 'rgba(16,185,129,0.12)', icon: <CheckCircle2 size={14} /> },
    pending: { label: isMr ? '⏳ प्रलंबित' : isHi ? '⏳ बाकी' : '⏳ Pending', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', icon: <Clock size={14} /> },
    overdue: { label: isMr ? '🔴 थकबाकी' : isHi ? '🔴 बकाया' : '🔴 Overdue', color: '#ef4444', bg: 'rgba(239,68,68,0.12)', icon: <AlertTriangle size={14} /> },
  };

  const filterTabs = [
    { value: 'all', label: isMr ? 'सर्व' : isHi ? 'सभी' : 'All' },
    { value: 'paid', label: isMr ? 'भुगतान झाले' : isHi ? 'भुगतान' : 'Paid' },
    { value: 'pending', label: isMr ? 'प्रलंबित' : isHi ? 'बाकी' : 'Pending' },
    { value: 'overdue', label: isMr ? 'थकबाकी' : isHi ? 'बकाया' : 'Overdue' },
  ];

  const handleAddSale = () => {
    alert(isMr ? '✅ नवीन व्यवहार यशस्वीरित्या नोंदवला!' : '✅ New transaction recorded successfully!');
    setShowAddForm(false);
    setNewSale({ commodity: '', buyer: '', weight: '', rate: '', commission: '2.5', agent: '' });
  };

  return (
    <div className="khaata-container">
      {/* Hero */}
      <div className="section-hero khaata-hero">
        <div className="hero-content">
          <span className="hero-pill">💰 {isMr ? 'डिजिटल खाता' : isHi ? 'डिजिटल खाता' : 'Digital Khaata'}</span>
          <h1>{isMr ? 'पेमेंट ट्रॅकर आणि डिजिटल पावती' : isHi ? 'पेमेंट ट्रैकर और डिजिटल रसीद' : 'Payment Tracker & Digital Receipts'}</h1>
          <p>{isMr ? 'तुमच्या सर्व विक्रीचे, कमिशनचे आणि पेमेंटचे हिशेब एकाच ठिकाणी.' : isHi ? 'सभी बिक्री, कमीशन और भुगतान का हिसाब एक जगह.' : 'Track all your sales, commissions, and payments in one place.'}</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="khaata-summary-grid">
        <div className="khaata-stat-card stat-total">
          <div className="khaata-stat-icon"><IndianRupee size={22} /></div>
          <div>
            <p className="khaata-stat-label">{isMr ? 'एकूण कमाई' : isHi ? 'कुल कमाई' : 'Total Earned'}</p>
            <h2 className="khaata-stat-value">₹{PAYMENT_SUMMARY.totalEarned.toLocaleString('en-IN')}</h2>
          </div>
        </div>
        <div className="khaata-stat-card stat-paid">
          <div className="khaata-stat-icon paid-icon"><CheckCircle2 size={22} /></div>
          <div>
            <p className="khaata-stat-label">{isMr ? 'मिळालेले' : isHi ? 'प्राप्त' : 'Received'}</p>
            <h2 className="khaata-stat-value">₹{PAYMENT_SUMMARY.totalPaid.toLocaleString('en-IN')}</h2>
          </div>
        </div>
        <div className="khaata-stat-card stat-pending">
          <div className="khaata-stat-icon pending-icon"><Clock size={22} /></div>
          <div>
            <p className="khaata-stat-label">{isMr ? 'प्रलंबित' : isHi ? 'बाकी' : 'Pending'}</p>
            <h2 className="khaata-stat-value">₹{PAYMENT_SUMMARY.totalPending.toLocaleString('en-IN')}</h2>
          </div>
        </div>
        <div className="khaata-stat-card stat-overdue">
          <div className="khaata-stat-icon overdue-icon"><AlertTriangle size={22} /></div>
          <div>
            <p className="khaata-stat-label">{isMr ? 'थकबाकी' : isHi ? 'बकाया' : 'Overdue'}</p>
            <h2 className="khaata-stat-value">₹{PAYMENT_SUMMARY.totalOverdue.toLocaleString('en-IN')}</h2>
          </div>
        </div>
      </div>

      {/* Filters + Add */}
      <div className="khaata-toolbar">
        <div className="khaata-filter-tabs">
          {filterTabs.map(tab => (
            <button
              key={tab.value}
              className={`khaata-filter-btn ${filterStatus === tab.value ? 'active' : ''}`}
              onClick={() => setFilterStatus(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="khaata-toolbar-right">
          <div className="khaata-search-wrap">
            <Search size={15} />
            <input
              type="text"
              placeholder={isMr ? 'शोधा...' : isHi ? 'खोजें...' : 'Search...'}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="khaata-search-input"
            />
          </div>
          <button className="khaata-add-btn" onClick={() => setShowAddForm(true)}>
            <Plus size={16} /> {isMr ? 'नवीन विक्री' : isHi ? 'नई बिक्री' : 'Add Sale'}
          </button>
        </div>
      </div>

      {/* Transaction Records */}
      <div className="khaata-records">
        {filteredRecords.map(txn => {
          const sc = statusConfig[txn.status];
          return (
            <div key={txn.id} className="khaata-txn-card" onClick={() => setSelectedTxn(txn)}>
              <div className="khaata-txn-top">
                <div className="khaata-txn-left">
                  <h3 className="khaata-txn-commodity">{isMr ? txn.commodityMr : txn.commodity}</h3>
                  <p className="khaata-txn-buyer">{isMr ? txn.buyerMr : txn.buyer}</p>
                  <p className="khaata-txn-meta">
                    <Calendar size={12} /> {txn.date} • {txn.mandi}
                  </p>
                </div>
                <div className="khaata-txn-right">
                  <span className="khaata-txn-amount">₹{txn.netReceivable.toLocaleString('en-IN')}</span>
                  <span className="khaata-status-pill" style={{ color: sc.color, background: sc.bg }}>
                    {sc.icon} {sc.label}
                  </span>
                </div>
              </div>
              <div className="khaata-txn-bottom">
                <span>{txn.weightQuintals} {isMr ? 'क्विंटल' : 'Qtl'} × ₹{txn.ratePerQuintal}</span>
                <span>{isMr ? 'कमिशन' : 'Comm.'}: {txn.commissionPercent}%</span>
                <span>{isMr ? 'एजंट' : 'Agent'}: {isMr ? txn.agentNameMr : txn.agentName}</span>
              </div>
              {txn.status === 'overdue' && (
                <div className="khaata-overdue-strip">
                  <AlertTriangle size={13} />
                  <span>{isMr ? 'पेमेंट थकबाकी! व्यापाऱ्याला स्मरणपत्र पाठवा.' : isHi ? 'भुगतान बकाया! व्यापारी को रिमाइंडर भेजें.' : 'Payment overdue! Send reminder to trader.'}</span>
                  <button className="reminder-btn" onClick={(e) => { e.stopPropagation(); alert(isMr ? '✅ स्मरणपत्र पाठवले!' : '✅ Reminder sent!'); }}>
                    <Send size={13} /> {isMr ? 'स्मरणपत्र' : 'Remind'}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Transaction Detail / Receipt Modal */}
      {selectedTxn && (
        <div className="modal-overlay" onClick={() => setSelectedTxn(null)}>
          <div className="modal-content khaata-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2><Receipt size={20} /> {isMr ? 'डिजिटल पावती' : isHi ? 'डिजिटल रसीद' : 'Digital Receipt'}</h2>
                <p>#{selectedTxn.id}</p>
              </div>
              <button className="close-btn" onClick={() => setSelectedTxn(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="receipt-card">
                <div className="receipt-header">
                  <h3>🌾 AGROVA — {isMr ? 'विक्री पावती' : 'Sale Receipt'}</h3>
                  <p>{selectedTxn.mandi} • {selectedTxn.date}</p>
                </div>
                <div className="receipt-details">
                  <div className="receipt-row"><span>{isMr ? 'शेतमाल' : 'Commodity'}</span><strong>{isMr ? selectedTxn.commodityMr : selectedTxn.commodity}</strong></div>
                  <div className="receipt-row"><span>{isMr ? 'खरेदीदार' : 'Buyer'}</span><strong>{isMr ? selectedTxn.buyerMr : selectedTxn.buyer}</strong></div>
                  <div className="receipt-row"><span>{isMr ? 'खरेदीदार ID' : 'Buyer ID'}</span><strong>{selectedTxn.buyerId}</strong></div>
                  <div className="receipt-row"><span>{isMr ? 'वजन' : 'Weight'}</span><strong>{selectedTxn.weightQuintals} {isMr ? 'क्विंटल' : 'Quintals'}</strong></div>
                  <div className="receipt-row"><span>{isMr ? 'दर/क्विंटल' : 'Rate/Qtl'}</span><strong>₹{selectedTxn.ratePerQuintal}</strong></div>
                  <hr className="receipt-divider" />
                  <div className="receipt-row"><span>{isMr ? 'एकूण रक्कम' : 'Gross Amount'}</span><strong>₹{selectedTxn.grossAmount.toLocaleString('en-IN')}</strong></div>
                  <div className="receipt-row deduct"><span>{isMr ? 'कमिशन' : 'Commission'} ({selectedTxn.commissionPercent}%)</span><strong>- ₹{selectedTxn.commissionAmount.toLocaleString('en-IN')}</strong></div>
                  <div className="receipt-row deduct"><span>{isMr ? 'मार्केट सेस' : 'Market Cess'}</span><strong>- ₹{selectedTxn.marketCess.toLocaleString('en-IN')}</strong></div>
                  <hr className="receipt-divider" />
                  <div className="receipt-row total"><span>{isMr ? 'निव्वळ देय' : 'Net Receivable'}</span><strong>₹{selectedTxn.netReceivable.toLocaleString('en-IN')}</strong></div>
                  <div className="receipt-row"><span>{isMr ? 'कमिशन एजंट' : 'Agent'}</span><strong>{isMr ? selectedTxn.agentNameMr : selectedTxn.agentName}</strong></div>
                  <div className="receipt-row"><span>{isMr ? 'पेमेंट माध्यम' : 'Payment Mode'}</span><strong>{selectedTxn.paymentMode}</strong></div>
                  {selectedTxn.upiRef && <div className="receipt-row"><span>Ref.</span><strong>{selectedTxn.upiRef}</strong></div>}
                </div>
                <div className="receipt-status-bar" style={{ background: statusConfig[selectedTxn.status].bg, color: statusConfig[selectedTxn.status].color }}>
                  {statusConfig[selectedTxn.status].icon} {statusConfig[selectedTxn.status].label}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-outline" onClick={() => setSelectedTxn(null)}>{isMr ? 'बंद करा' : 'Close'}</button>
              <button className="btn-primary" onClick={() => alert(isMr ? '📱 पावती WhatsApp वर पाठवली!' : '📱 Receipt shared via WhatsApp!')}>
                <Send size={16} /> {isMr ? 'WhatsApp वर पाठवा' : 'Share on WhatsApp'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Sale Modal */}
      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-content khaata-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2><Plus size={20} /> {isMr ? 'नवीन विक्री नोंदवा' : isHi ? 'नई बिक्री दर्ज करें' : 'Record New Sale'}</h2>
              </div>
              <button className="close-btn" onClick={() => setShowAddForm(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>{isMr ? 'शेतमाल' : 'Commodity'}</label>
                <input type="text" className="custom-input" placeholder={isMr ? 'उदा. कांदा (लाल)' : 'e.g. Onion (Red)'}
                  value={newSale.commodity} onChange={e => setNewSale({ ...newSale, commodity: e.target.value })} />
              </div>
              <div className="form-group">
                <label>{isMr ? 'खरेदीदार नाव' : 'Buyer Name'}</label>
                <input type="text" className="custom-input" placeholder={isMr ? 'उदा. श्री गणेश ट्रेडिंग' : 'e.g. Ganesh Trading'}
                  value={newSale.buyer} onChange={e => setNewSale({ ...newSale, buyer: e.target.value })} />
              </div>
              <div className="form-group">
                <label>{isMr ? 'वजन (क्विंटल)' : 'Weight (Quintals)'}</label>
                <input type="number" className="custom-input"
                  value={newSale.weight} onChange={e => setNewSale({ ...newSale, weight: e.target.value })} />
              </div>
              <div className="form-group">
                <label>{isMr ? 'दर प्रति क्विंटल (₹)' : 'Rate per Quintal (₹)'}</label>
                <input type="number" className="custom-input"
                  value={newSale.rate} onChange={e => setNewSale({ ...newSale, rate: e.target.value })} />
              </div>
              <div className="form-group">
                <label>{isMr ? 'कमिशन (%)' : 'Commission (%)'}</label>
                <input type="number" className="custom-input" step="0.5"
                  value={newSale.commission} onChange={e => setNewSale({ ...newSale, commission: e.target.value })} />
              </div>
              <div className="form-group">
                <label>{isMr ? 'कमिशन एजंट' : 'Commission Agent'}</label>
                <input type="text" className="custom-input" placeholder={isMr ? 'उदा. रमेश कुलकर्णी' : 'e.g. Ramesh Kulkarni'}
                  value={newSale.agent} onChange={e => setNewSale({ ...newSale, agent: e.target.value })} />
              </div>
              {newSale.weight && newSale.rate && (
                <div className="total-bid-value">
                  <span>{isMr ? 'अंदाजे एकूण:' : 'Estimated Total:'}</span>
                  <h3>₹{(parseFloat(newSale.weight || 0) * parseFloat(newSale.rate || 0)).toLocaleString('en-IN')}</h3>
                  <p className="calc-breakdown">
                    {isMr ? 'कमिशन वजावटीनंतर' : 'After commission'}: ₹{Math.round((parseFloat(newSale.weight || 0) * parseFloat(newSale.rate || 0)) * (1 - parseFloat(newSale.commission || 0) / 100)).toLocaleString('en-IN')}
                  </p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn-outline" onClick={() => setShowAddForm(false)}>{isMr ? 'रद्द करा' : 'Cancel'}</button>
              <button className="btn-primary" onClick={handleAddSale}>
                <CheckCircle2 size={16} /> {isMr ? 'विक्री नोंदवा' : 'Record Sale'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
