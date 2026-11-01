import React, { useState, useMemo } from 'react';
import {
  Truck, MapPin, Package, Star, Phone, Navigation, Clock,
  ChevronRight, Search, Filter, CheckCircle2, AlertCircle,
  Route, Calculator, Calendar, Loader2, X
} from 'lucide-react';
import { TRANSPORT_PROVIDERS, POPULAR_ROUTES, VEHICLE_TYPES, MOCK_BOOKINGS } from '../data/transportData';

export default function TransportLogistics({ lang = 'mr' }) {
  const isMr = lang === 'mr';
  const isHi = lang === 'hi';
  const [activeView, setActiveView] = useState('providers'); // providers | routes | bookings
  const [vehicleFilter, setVehicleFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookingModal, setBookingModal] = useState(null);
  const [calcModal, setCalcModal] = useState(null);

  // Freight calculator state
  const [calcDistance, setCalcDistance] = useState('');
  const [calcWeight, setCalcWeight] = useState('');
  const [calcVehicle, setCalcVehicle] = useState(null);

  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    from: '', to: '', date: '', commodity: '', weight: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const filteredProviders = useMemo(() => {
    return TRANSPORT_PROVIDERS.filter(p => {
      const matchesType = vehicleFilter === 'all' || p.vehicleType.includes(vehicleFilter);
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.vehicleType.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [vehicleFilter, searchTerm]);

  const calcFreight = () => {
    if (!calcDistance || !calcWeight || !calcVehicle) return null;
    const d = parseFloat(calcDistance);
    const w = parseFloat(calcWeight);
    const total = calcVehicle.baseFare + (d * w * calcVehicle.ratePerKmPerQuintal);
    return Math.round(total);
  };

  const handleBookSubmit = () => {
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingModal(null);
      setBookingForm({ from: '', to: '', date: '', commodity: '', weight: '' });
    }, 2500);
  };

  const viewTabs = [
    { id: 'providers', label: isMr ? '🚛 वाहतूकदार' : isHi ? '🚛 वाहक' : '🚛 Transporters', icon: <Truck size={16} /> },
    { id: 'routes', label: isMr ? '🗺️ मार्ग' : isHi ? '🗺️ मार्ग' : '🗺️ Routes', icon: <Route size={16} /> },
    { id: 'bookings', label: isMr ? '📋 माझ्या बुकिंग' : isHi ? '📋 मेरी बुकिंग' : '📋 My Bookings', icon: <Package size={16} /> },
  ];

  return (
    <div className="transport-container">
      {/* Hero */}
      <div className="section-hero transport-hero">
        <div className="hero-content">
          <span className="hero-pill">🚛 {isMr ? 'वाहतूक आणि लॉजिस्टिक्स' : isHi ? 'वाहन और लॉजिस्टिक्स' : 'Transport & Logistics'}</span>
          <h1>{isMr ? 'शेतापासून मंडीपर्यंत — वाहतूक बुक करा' : isHi ? 'खेत से मंडी तक — वाहन बुक करें' : 'Farm to Market — Book Transport'}</h1>
          <p>{isMr ? 'जवळचे वाहतूकदार शोधा, भाडे मोजा आणि एका क्लिकवर बुक करा.' : isHi ? 'निकटतम वाहक खोजें, भाड़ा गणना करें और एक क्लिक पर बुक करें.' : 'Find nearby transporters, calculate freight, and book with one click.'}</p>
        </div>
      </div>

      {/* View Tabs */}
      <div className="transport-tabs">
        {viewTabs.map(tab => (
          <button
            key={tab.id}
            className={`transport-tab ${activeView === tab.id ? 'active' : ''}`}
            onClick={() => setActiveView(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
        <button className="transport-tab calc-tab" onClick={() => setCalcModal(true)}>
          <Calculator size={16} /> {isMr ? 'भाडे मोजा' : isHi ? 'भाड़ा गणना' : 'Freight Calc'}
        </button>
      </div>

      {/* ── Providers View ── */}
      {activeView === 'providers' && (
        <div className="transport-section">
          <div className="transport-filters">
            <div className="transport-search-wrap">
              <Search size={16} />
              <input
                type="text"
                placeholder={isMr ? 'वाहतूकदार शोधा...' : isHi ? 'वाहक खोजें...' : 'Search transporter...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="transport-search-input"
              />
            </div>
            <div className="transport-vehicle-pills">
              {VEHICLE_TYPES.map(vt => (
                <button
                  key={vt.value}
                  className={`vehicle-pill ${vehicleFilter === vt.value ? 'active' : ''}`}
                  onClick={() => setVehicleFilter(vt.value)}
                >
                  {isMr ? vt.labelMr : vt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="transport-grid">
            {filteredProviders.map(provider => (
              <div key={provider.id} className={`transport-card ${!provider.available ? 'unavailable' : ''}`}>
                <div className="transport-card-header">
                  <span className="transport-vehicle-emoji">{provider.image}</span>
                  <div className="transport-card-info">
                    <h3>{isMr ? provider.nameMr : provider.name}</h3>
                    <p className="transport-vehicle-type">{isMr ? provider.vehicleTypeMr : provider.vehicleType}</p>
                  </div>
                  <div className={`transport-status-badge ${provider.available ? 'available' : 'busy'}`}>
                    {provider.available
                      ? (isMr ? '✅ उपलब्ध' : isHi ? '✅ उपलब्ध' : '✅ Available')
                      : (isMr ? '❌ व्यस्त' : isHi ? '❌ व्यस्त' : '❌ Busy')}
                  </div>
                </div>

                <div className="transport-card-details">
                  <div className="transport-detail-item">
                    <span>{isMr ? 'क्षमता' : isHi ? 'क्षमता' : 'Capacity'}</span>
                    <strong>{provider.capacity}</strong>
                  </div>
                  <div className="transport-detail-item">
                    <span>{isMr ? 'दर/किमी/क्विंटल' : isHi ? 'दर/किमी/क्विंटल' : 'Rate/km/qtl'}</span>
                    <strong>₹{provider.ratePerKmPerQuintal}</strong>
                  </div>
                  <div className="transport-detail-item">
                    <span>{isMr ? 'बेस भाडे' : isHi ? 'बेस भाड़ा' : 'Base Fare'}</span>
                    <strong>₹{provider.baseFare}</strong>
                  </div>
                  <div className="transport-detail-item">
                    <span>{isMr ? 'रेटिंग' : 'Rating'}</span>
                    <strong><Star size={13} className="star-icon" /> {provider.rating} ({provider.reviewCount})</strong>
                  </div>
                </div>

                <div className="transport-card-driver">
                  <span>🧑‍✈️ {isMr ? provider.driverNameMr : provider.driverName}</span>
                  <span className="transport-vehicle-no">{provider.vehicleNumber}</span>
                  {provider.gpsEnabled && <span className="gps-badge"><Navigation size={11} /> GPS</span>}
                </div>

                <div className="transport-card-actions">
                  <a href={`tel:${provider.contactNumber.replace(/\s+/g, '')}`} className="transport-btn outline">
                    <Phone size={15} /> {isMr ? 'कॉल करा' : isHi ? 'कॉल करें' : 'Call'}
                  </a>
                  <button
                    className="transport-btn primary"
                    disabled={!provider.available}
                    onClick={() => setBookingModal(provider)}
                  >
                    {isMr ? 'बुक करा →' : isHi ? 'बुक करें →' : 'Book Now →'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Routes View ── */}
      {activeView === 'routes' && (
        <div className="transport-section">
          <h2 className="transport-section-title">
            <Route size={20} /> {isMr ? 'लोकप्रिय वाहतूक मार्ग — नाशिक जिल्हा' : isHi ? 'लोकप्रिय मार्ग — नासिक जिला' : 'Popular Routes — Nashik District'}
          </h2>
          <div className="routes-list">
            {POPULAR_ROUTES.map(route => (
              <div key={route.id} className="route-card">
                <div className="route-endpoints">
                  <div className="route-point start">
                    <MapPin size={16} />
                    <span>{isMr ? route.fromMr : route.from}</span>
                  </div>
                  <div className="route-arrow">
                    <div className="route-line"></div>
                    <ChevronRight size={16} />
                  </div>
                  <div className="route-point end">
                    <MapPin size={16} />
                    <span>{isMr ? route.toMr : route.to}</span>
                  </div>
                </div>
                <div className="route-meta">
                  <span><Navigation size={13} /> {route.distanceKm} km</span>
                  <span><Clock size={13} /> {route.estimatedTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Bookings View ── */}
      {activeView === 'bookings' && (
        <div className="transport-section">
          <h2 className="transport-section-title">
            <Package size={20} /> {isMr ? 'माझ्या बुकिंग' : isHi ? 'मेरी बुकिंग' : 'My Bookings'}
          </h2>
          <div className="bookings-list">
            {MOCK_BOOKINGS.map(bk => (
              <div key={bk.id} className="booking-card">
                <div className="booking-header">
                  <div>
                    <h3>{bk.provider}</h3>
                    <p className="booking-vehicle">{bk.vehicleType}</p>
                  </div>
                  <span className={`booking-status-badge status-${bk.status.toLowerCase().replace(' ', '-')}`}>
                    {bk.status === 'Completed' ? '✅' : bk.status === 'In Transit' ? '🚛' : '📅'} {bk.status}
                  </span>
                </div>
                <div className="booking-route-info">
                  <span><MapPin size={13} /> {bk.from} → {bk.to}</span>
                  <span><Calendar size={13} /> {bk.date}</span>
                </div>
                <div className="booking-cargo-info">
                  <span>📦 {bk.commodity} — {bk.weightQuintals} Qtl</span>
                  <strong>₹{bk.totalCost.toLocaleString('en-IN')}</strong>
                </div>
                {bk.status === 'In Transit' && (
                  <div className="booking-tracking">
                    <div className="tracking-bar">
                      <div className="tracking-progress" style={{ width: '62%' }}></div>
                      <div className="tracking-dot" style={{ left: '62%' }}>🚛</div>
                    </div>
                    <p className="tracking-label">{isMr ? '62% पूर्ण — वाहन मार्गावर' : '62% Complete — Vehicle on route'}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Booking Modal ── */}
      {bookingModal && (
        <div className="modal-overlay" onClick={() => { setBookingModal(null); setBookingSuccess(false); }}>
          <div className="modal-content transport-modal" onClick={e => e.stopPropagation()}>
            {bookingSuccess ? (
              <div className="booking-success-screen">
                <CheckCircle2 size={56} className="success-icon" />
                <h2>{isMr ? '✅ बुकिंग यशस्वी!' : isHi ? '✅ बुकिंग सफल!' : '✅ Booking Confirmed!'}</h2>
                <p>{isMr ? 'तुमचा ड्रायव्हर लवकरच संपर्क करेल.' : 'Your driver will contact you shortly.'}</p>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <div>
                    <h2>{isMr ? 'वाहतूक बुक करा' : isHi ? 'वाहन बुक करें' : 'Book Transport'}</h2>
                    <p>{bookingModal.image} {isMr ? bookingModal.nameMr : bookingModal.name}</p>
                  </div>
                  <button className="close-btn" onClick={() => setBookingModal(null)}>×</button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label>{isMr ? 'उचल पत्ता (शेत/गाव)' : isHi ? 'पिकअप पता' : 'Pickup Location'}</label>
                    <input type="text" className="custom-input" placeholder={isMr ? 'उदा. दिंडोरी गाव' : 'e.g. Dindori Village'}
                      value={bookingForm.from} onChange={e => setBookingForm({ ...bookingForm, from: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>{isMr ? 'गंतव्य (मंडी/बाजार)' : isHi ? 'गंतव्य (मंडी)' : 'Destination (Market)'}</label>
                    <input type="text" className="custom-input" placeholder={isMr ? 'उदा. लासलगाव APMC' : 'e.g. Lasalgaon APMC'}
                      value={bookingForm.to} onChange={e => setBookingForm({ ...bookingForm, to: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>{isMr ? 'तारीख' : isHi ? 'तारीख' : 'Date'}</label>
                    <input type="date" className="custom-input"
                      value={bookingForm.date} onChange={e => setBookingForm({ ...bookingForm, date: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>{isMr ? 'शेतमाल प्रकार' : isHi ? 'फसल' : 'Commodity'}</label>
                    <input type="text" className="custom-input" placeholder={isMr ? 'उदा. कांदा' : 'e.g. Onion'}
                      value={bookingForm.commodity} onChange={e => setBookingForm({ ...bookingForm, commodity: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>{isMr ? 'वजन (क्विंटल)' : isHi ? 'वजन (क्विंटल)' : 'Weight (Quintals)'}</label>
                    <input type="number" className="custom-input"
                      value={bookingForm.weight} onChange={e => setBookingForm({ ...bookingForm, weight: e.target.value })} />
                  </div>
                  {bookingForm.weight && (
                    <div className="total-bid-value">
                      <span>{isMr ? 'अंदाजे भाडे:' : isHi ? 'अनुमानित भाड़ा:' : 'Estimated Fare:'}</span>
                      <h3>₹{Math.round(bookingModal.baseFare + (40 * parseFloat(bookingForm.weight || 0) * bookingModal.ratePerKmPerQuintal)).toLocaleString('en-IN')}</h3>
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button className="btn-outline" onClick={() => setBookingModal(null)}>{isMr ? 'रद्द करा' : 'Cancel'}</button>
                  <button className="btn-primary" onClick={handleBookSubmit}>
                    <Truck size={16} /> {isMr ? 'बुक करा' : isHi ? 'बुक करें' : 'Confirm Booking'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Freight Calculator Modal ── */}
      {calcModal && (
        <div className="modal-overlay" onClick={() => setCalcModal(false)}>
          <div className="modal-content transport-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2><Calculator size={20} /> {isMr ? 'भाडे कॅल्क्युलेटर' : isHi ? 'भाड़ा कैलकुलेटर' : 'Freight Calculator'}</h2>
              </div>
              <button className="close-btn" onClick={() => setCalcModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>{isMr ? 'अंतर (किमी)' : 'Distance (km)'}</label>
                <input type="number" className="custom-input" placeholder="e.g. 52"
                  value={calcDistance} onChange={e => setCalcDistance(e.target.value)} />
              </div>
              <div className="form-group">
                <label>{isMr ? 'वजन (क्विंटल)' : 'Weight (Quintals)'}</label>
                <input type="number" className="custom-input" placeholder="e.g. 25"
                  value={calcWeight} onChange={e => setCalcWeight(e.target.value)} />
              </div>
              <div className="form-group">
                <label>{isMr ? 'वाहन प्रकार निवडा' : 'Select Vehicle Type'}</label>
                <div className="calc-vehicle-grid">
                  {TRANSPORT_PROVIDERS.filter(p => p.available).map(p => (
                    <button
                      key={p.id}
                      className={`calc-vehicle-btn ${calcVehicle?.id === p.id ? 'selected' : ''}`}
                      onClick={() => setCalcVehicle(p)}
                    >
                      <span>{p.image}</span>
                      <span className="calc-v-name">{isMr ? p.vehicleTypeMr : p.vehicleType}</span>
                      <span className="calc-v-rate">₹{p.ratePerKmPerQuintal}/km/qtl</span>
                    </button>
                  ))}
                </div>
              </div>
              {calcFreight() && (
                <div className="total-bid-value calc-result">
                  <span>{isMr ? 'एकूण अंदाजे भाडे:' : 'Total Estimated Freight:'}</span>
                  <h3>₹{calcFreight().toLocaleString('en-IN')}</h3>
                  <p className="calc-breakdown">
                    {isMr ? 'बेस भाडे' : 'Base'}: ₹{calcVehicle?.baseFare} + ({calcDistance} km × {calcWeight} qtl × ₹{calcVehicle?.ratePerKmPerQuintal})
                  </p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn-outline" onClick={() => setCalcModal(false)}>{isMr ? 'बंद करा' : 'Close'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
