import React, { useState } from 'react';
import {
  Truck, Warehouse, CheckCircle2, ChevronRight, Star,
  Phone, MapPin, Package, Zap, Building2, User, ArrowRight,
  Shield, Clock, IndianRupee, Camera, Upload, X, Send,
  BadgeCheck, AlertCircle, RefreshCw
} from 'lucide-react';

const PROVIDER_TYPES = [
  {
    id: 'transport',
    icon: '🚛',
    title: 'Transport Provider',
    titleMr: 'वाहतूक प्रदाता',
    titleHi: 'वाहन प्रदाता',
    desc: 'Register your trucks, tempos or tractors to carry farm produce to mandis.',
    descMr: 'शेतमाल मंडीपर्यंत नेण्यासाठी तुमचे ट्रक, टेम्पो किंवा ट्रॅक्टर नोंदवा.',
    color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)',
    fields: ['vehicleType', 'vehicleNumber', 'capacity', 'ratePerKm', 'serviceArea', 'gpsEnabled'],
  },
  {
    id: 'warehouse',
    icon: '🏭',
    title: 'Warehouse / Cold Storage',
    titleMr: 'गोदाम / कोल्ड स्टोरेज',
    titleHi: 'गोदाम / कोल्ड स्टोरेज',
    desc: 'List your storage facility — cold rooms, dry godowns, CA stores — for farmer bookings.',
    descMr: 'शेतकऱ्यांसाठी तुमची साठवण सुविधा — कोल्ड रूम, कोरडे गोदाम — नोंदवा.',
    color: '#06b6d4', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)',
    fields: ['warehouseType', 'totalCapacity', 'ratePerDay', 'temperatureControl', 'wdraStatus', 'address'],
  },
  {
    id: 'commission_agent',
    icon: '🤝',
    title: 'Commission Agent / Arthiya',
    titleMr: 'कमिशन एजंट / आडत्या',
    titleHi: 'कमीशन एजेंट / आड़तिया',
    desc: 'Register as an APMC-licensed commission agent to connect farmers with buyers.',
    descMr: 'APMC-परवानाधारक कमिशन एजंट म्हणून नोंदणी करा.',
    color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)',
    fields: ['licenseNumber', 'apmc', 'commodities', 'commissionRate', 'yearsActive'],
  },
  {
    id: 'quality_tester',
    icon: '🔬',
    title: 'Quality Testing Lab',
    titleMr: 'गुणवत्ता चाचणी प्रयोगशाळा',
    titleHi: 'गुणवत्ता परीक्षण प्रयोगशाळा',
    desc: 'Offer moisture, impurity and grading tests certified by FSSAI/NABL.',
    descMr: 'FSSAI/NABL प्रमाणित आर्द्रता, अशुद्धता आणि ग्रेडिंग चाचण्या द्या.',
    color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.3)',
    fields: ['labType', 'certifications', 'turnaroundTime', 'ratePerTest'],
  },
  {
    id: 'equipment',
    icon: '🚜',
    title: 'Farm Equipment Rental',
    titleMr: 'शेती उपकरण भाडेतत्त्वावर',
    titleHi: 'कृषि उपकरण किराया',
    desc: 'List tractors, harvesters, sprayers or drip sets available for rent.',
    descMr: 'भाड्याने देण्यासाठी ट्रॅक्टर, हार्वेस्टर, फवारणी यंत्रे नोंदवा.',
    color: '#f43f5e', bg: 'rgba(244,63,94,0.1)', border: 'rgba(244,63,94,0.3)',
    fields: ['equipmentType', 'makeModel', 'ratePerHour', 'serviceArea'],
  },
  {
    id: 'input_supplier',
    icon: '🌱',
    title: 'Input & Seed Supplier',
    titleMr: 'बियाणे व खते पुरवठादार',
    titleHi: 'बीज व खाद आपूर्तिकर्ता',
    desc: 'Register your agri-input shop — seeds, fertilizers, pesticides — for digital orders.',
    descMr: 'बियाणे, खते, कीटकनाशके — तुमचे दुकान डिजिटल ऑर्डरसाठी नोंदवा.',
    color: '#84cc16', bg: 'rgba(132,204,22,0.1)', border: 'rgba(132,204,22,0.3)',
    fields: ['shopName', 'licenseType', 'products', 'deliveryRange'],
  },
];

const VEHICLE_TYPES = ['Mini Truck (Tata Ace)', 'Tractor Trailer', 'Pickup Van', '6-Wheeler Truck', '10-Wheeler Truck', 'Refrigerated Van', 'Other'];
const WAREHOUSE_TYPES = ['Cold Storage (0–4°C)', 'CA Storage (Grapes)', 'Dry Agricultural Godown', 'Onion Chawl Storage', 'Govt. Certified (CWC/SWC)'];
const EQUIPMENT_TYPES = ['Tractor', 'Combine Harvester', 'Sprayer', 'Rotavator', 'Drip Irrigation Set', 'Power Tiller', 'Other'];

const STEPS = ['Type', 'Details', 'Documents', 'Review'];

export default function ServiceProvider({ lang = 'mr' }) {
  const isMr = lang === 'mr';
  const isHi = lang === 'hi';
  const t = (mr, hi, en) => isMr ? mr : isHi ? hi : en;

  const [selectedType, setSelectedType] = useState(null);
  const [step, setStep] = useState(0); // 0=type select, 1=details, 2=docs, 3=review, 4=success
  const [form, setForm] = useState({
    name: '', phone: '', email: '', address: '', district: 'Nashik', state: 'Maharashtra',
    vehicleType: '', vehicleNumber: '', capacity: '', ratePerKm: '', serviceArea: '', gpsEnabled: true,
    warehouseType: '', totalCapacity: '', ratePerDay: '', temperatureControl: false, wdraStatus: false,
    licenseNumber: '', apmc: '', commodities: '', commissionRate: '', yearsActive: '',
    labType: '', certifications: '', turnaroundTime: '', ratePerTest: '',
    equipmentType: '', makeModel: '', ratePerHour: '',
    shopName: '', licenseType: '', products: '', deliveryRange: '',
    agreeTerms: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSelectType = (type) => {
    setSelectedType(type);
    setStep(1);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="sp-root">
        <div className="sp-success">
          <div className="sp-success-icon">✅</div>
          <h2>{t('नोंदणी यशस्वी!', 'पंजीकरण सफल!', 'Registration Successful!')}</h2>
          <p>{t(
            `तुमची ${selectedType?.titleMr} नोंदणी अर्ज प्राप्त झाला. AGROVA टीम 24 तासांत तपासणी करेल आणि तुम्हाला ${form.phone} वर कळवेल.`,
            `आपका ${selectedType?.titleHi} पंजीकरण आवेदन प्राप्त हुआ। AGROVA टीम 24 घंटे में सत्यापन करेगी।`,
            `Your ${selectedType?.title} registration has been received. The AGROVA team will verify and contact you at ${form.phone} within 24 hours.`
          )}</p>
          <div className="sp-success-ref">
            <span>{t('संदर्भ क्रमांक', 'संदर्भ संख्या', 'Reference ID')}: </span>
            <strong>AGR-SP-{Date.now().toString().slice(-6)}</strong>
          </div>
          <button className="sp-btn-primary" onClick={() => { setSubmitted(false); setStep(0); setSelectedType(null); }}>
            <RefreshCw size={16}/> {t('नवीन नोंदणी करा', 'नई पंजीकरण करें', 'Register Another Service')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="sp-root">

      {/* Hero */}
      <div className="sp-hero">
        <div className="sp-hero-left">
          <span className="sp-hero-pill">🤝 {t('सेवा प्रदाता पोर्टल', 'सेवा प्रदाता पोर्टल', 'Service Provider Portal')}</span>
          <h1 className="sp-hero-title">{t('AGROVA नेटवर्कमध्ये सामील व्हा', 'AGROVA नेटवर्क में शामिल हों', 'Join the AGROVA Network')}</h1>
          <p className="sp-hero-sub">{t(
            'तुमची सेवा नोंदवा आणि हजारो शेतकऱ्यांशी जोडले जा. वाहतूक, गोदाम, उपकरणे — सर्व एका प्लॅटफॉर्मवर.',
            'अपनी सेवा पंजीकृत करें और हजारों किसानों से जुड़ें।',
            'Register your service and connect with thousands of farmers. Transport, storage, equipment — all on one platform.'
          )}</p>
        </div>
        <div className="sp-hero-stats">
          {[
            ['5,000+', t('नोंदणीकृत शेतकरी', 'पंजीकृत किसान', 'Farmers')],
            ['₹0', t('नोंदणी शुल्क', 'पंजीकरण शुल्क', 'Registration Fee')],
            ['24h', t('तपासणी वेळ', 'सत्यापन समय', 'Verification')],
          ].map(([val, lbl]) => (
            <div key={lbl} className="sp-hstat">
              <span className="sp-hstat-val">{val}</span>
              <span className="sp-hstat-lbl">{lbl}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stepper */}
      {step > 0 && (
        <div className="sp-stepper">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div className={`sp-step ${i + 1 <= step ? 'done' : ''} ${i + 1 === step ? 'active' : ''}`}>
                <div className="sp-step-dot">
                  {i + 1 < step ? <CheckCircle2 size={14}/> : <span>{i + 1}</span>}
                </div>
                <span className="sp-step-label">{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`sp-step-line ${i + 1 < step ? 'done' : ''}`}/>}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* STEP 0 — Type Selection */}
      {step === 0 && (
        <div className="sp-section">
          <h2 className="sp-section-title">{t('तुमची सेवा निवडा', 'अपनी सेवा चुनें', 'Select Your Service Type')}</h2>
          <div className="sp-type-grid">
            {PROVIDER_TYPES.map(type => (
              <button
                key={type.id}
                className="sp-type-card"
                style={{ '--sp-color': type.color, '--sp-bg': type.bg, '--sp-border': type.border }}
                onClick={() => handleSelectType(type)}
              >
                <span className="sp-type-icon">{type.icon}</span>
                <h3 className="sp-type-title">{isMr ? type.titleMr : isHi ? type.titleHi : type.title}</h3>
                <p className="sp-type-desc">{isMr ? type.descMr : type.desc}</p>
                <span className="sp-type-cta">
                  {t('नोंदणी करा', 'पंजीकरण करें', 'Register')} <ArrowRight size={14}/>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 1 — Basic Details */}
      {step === 1 && selectedType && (
        <div className="sp-section">
          <div className="sp-step-header" style={{ borderColor: selectedType.border, background: selectedType.bg }}>
            <span className="sp-step-icon">{selectedType.icon}</span>
            <div>
              <h2>{isMr ? selectedType.titleMr : isHi ? selectedType.titleHi : selectedType.title}</h2>
              <p>{t('मूलभूत माहिती भरा', 'बुनियादी जानकारी भरें', 'Fill in your basic details')}</p>
            </div>
          </div>

          <div className="sp-form-grid">
            {/* Always collected */}
            <div className="sp-form-group">
              <label>{t('पूर्ण नाव', 'पूरा नाम', 'Full Name')} *</label>
              <input className="sp-input" value={form.name} onChange={e => upd('name', e.target.value)} placeholder={t('उदा. राजेश पाटील', 'जैसे: राजेश पाटील', 'e.g. Rajesh Patil')} />
            </div>
            <div className="sp-form-group">
              <label>{t('मोबाइल नंबर', 'मोबाइल नंबर', 'Mobile Number')} *</label>
              <input className="sp-input" value={form.phone} onChange={e => upd('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" type="tel" />
            </div>
            <div className="sp-form-group">
              <label>{t('ईमेल (पर्यायी)', 'ईमेल (वैकल्पिक)', 'Email (Optional)')}</label>
              <input className="sp-input" value={form.email} onChange={e => upd('email', e.target.value)} placeholder="name@example.com" type="email" />
            </div>
            <div className="sp-form-group">
              <label>{t('जिल्हा', 'जिला', 'District')}</label>
              <select className="sp-select" value={form.district} onChange={e => upd('district', e.target.value)}>
                {['Nashik', 'Pune', 'Ahmednagar', 'Aurangabad', 'Solapur', 'Kolhapur', 'Other'].map(d => <option key={d}>{d}</option>)}
              </select>
            </div>

            {/* Transport-specific */}
            {selectedType.id === 'transport' && <>
              <div className="sp-form-group">
                <label>{t('वाहन प्रकार', 'वाहन प्रकार', 'Vehicle Type')} *</label>
                <select className="sp-select" value={form.vehicleType} onChange={e => upd('vehicleType', e.target.value)}>
                  <option value="">{t('निवडा...', 'चुनें...', 'Select...')}</option>
                  {VEHICLE_TYPES.map(v => <option key={v}>{v}</option>)}
                </select>
              </div>
              <div className="sp-form-group">
                <label>{t('वाहन नोंदणी क्रमांक', 'वाहन पंजीकरण संख्या', 'Vehicle Reg. Number')} *</label>
                <input className="sp-input" value={form.vehicleNumber} onChange={e => upd('vehicleNumber', e.target.value)} placeholder="MH-15-AB-1234" />
              </div>
              <div className="sp-form-group">
                <label>{t('क्षमता (टन)', 'क्षमता (टन)', 'Capacity (Tons)')}</label>
                <input className="sp-input" value={form.capacity} onChange={e => upd('capacity', e.target.value)} placeholder="e.g. 1.5" type="number" />
              </div>
              <div className="sp-form-group">
                <label>{t('दर (₹/किमी)', 'दर (₹/किमी)', 'Rate (₹/km)')}</label>
                <input className="sp-input" value={form.ratePerKm} onChange={e => upd('ratePerKm', e.target.value)} placeholder="e.g. 25" type="number" />
              </div>
              <div className="sp-form-group sp-full">
                <label>{t('सेवा क्षेत्र', 'सेवा क्षेत्र', 'Service Area')}</label>
                <input className="sp-input" value={form.serviceArea} onChange={e => upd('serviceArea', e.target.value)} placeholder={t('उदा. लासलगाव, दिंडोरी, नाशिक', 'जैसे: लासलगाव, दिंडोरी, नाशिक', 'e.g. Lasalgaon, Dindori, Nashik')} />
              </div>
              <div className="sp-form-group sp-toggle-row">
                <label>{t('GPS ट्रॅकिंग उपलब्ध?', 'GPS ट्रैकिंग उपलब्ध?', 'GPS Tracking Available?')}</label>
                <button className={`sp-toggle ${form.gpsEnabled ? 'on' : ''}`} onClick={() => upd('gpsEnabled', !form.gpsEnabled)}>
                  {form.gpsEnabled ? t('हो ✓', 'हाँ ✓', 'Yes ✓') : t('नाही', 'नहीं', 'No')}
                </button>
              </div>
            </>}

            {/* Warehouse-specific */}
            {selectedType.id === 'warehouse' && <>
              <div className="sp-form-group">
                <label>{t('गोदाम प्रकार', 'गोदाम प्रकार', 'Warehouse Type')} *</label>
                <select className="sp-select" value={form.warehouseType} onChange={e => upd('warehouseType', e.target.value)}>
                  <option value="">{t('निवडा...', 'चुनें...', 'Select...')}</option>
                  {WAREHOUSE_TYPES.map(w => <option key={w}>{w}</option>)}
                </select>
              </div>
              <div className="sp-form-group">
                <label>{t('एकूण क्षमता (MT)', 'कुल क्षमता (MT)', 'Total Capacity (MT)')}</label>
                <input className="sp-input" value={form.totalCapacity} onChange={e => upd('totalCapacity', e.target.value)} placeholder="e.g. 5000" type="number" />
              </div>
              <div className="sp-form-group">
                <label>{t('दैनिक दर (₹/क्विंटल)', 'दैनिक दर (₹/क्विंटल)', 'Daily Rate (₹/Quintal)')}</label>
                <input className="sp-input" value={form.ratePerDay} onChange={e => upd('ratePerDay', e.target.value)} placeholder="e.g. 3.5" type="number" step="0.1" />
              </div>
              <div className="sp-form-group sp-full">
                <label>{t('पत्ता / स्थान', 'पता / स्थान', 'Address / Location')}</label>
                <input className="sp-input" value={form.address} onChange={e => upd('address', e.target.value)} placeholder={t('APMC मार्केट यार्ड, लासलगाव, नाशिक', 'APMC मार्केट यार्ड, लासलगाव', 'APMC Market Yard, Lasalgaon, Nashik')} />
              </div>
              <div className="sp-form-group sp-toggle-row">
                <label>{t('तापमान नियंत्रण?', 'तापमान नियंत्रण?', 'Temperature Controlled?')}</label>
                <button className={`sp-toggle ${form.temperatureControl ? 'on' : ''}`} onClick={() => upd('temperatureControl', !form.temperatureControl)}>
                  {form.temperatureControl ? t('हो ✓', 'हाँ ✓', 'Yes ✓') : t('नाही', 'नहीं', 'No')}
                </button>
              </div>
              <div className="sp-form-group sp-toggle-row">
                <label>{t('WDRA प्रमाणित?', 'WDRA प्रमाणित?', 'WDRA Certified?')}</label>
                <button className={`sp-toggle ${form.wdraStatus ? 'on' : ''}`} onClick={() => upd('wdraStatus', !form.wdraStatus)}>
                  {form.wdraStatus ? t('हो ✓', 'हाँ ✓', 'Yes ✓') : t('नाही', 'नहीं', 'No')}
                </button>
              </div>
            </>}

            {/* Commission Agent */}
            {selectedType.id === 'commission_agent' && <>
              <div className="sp-form-group">
                <label>{t('APMC परवाना क्रमांक', 'APMC लाइसेंस नंबर', 'APMC License Number')} *</label>
                <input className="sp-input" value={form.licenseNumber} onChange={e => upd('licenseNumber', e.target.value)} placeholder="APMC/NI/2024/XXXX" />
              </div>
              <div className="sp-form-group">
                <label>{t('APMC मंडी', 'APMC मंडी', 'APMC Market')}</label>
                <select className="sp-select" value={form.apmc} onChange={e => upd('apmc', e.target.value)}>
                  {['Lasalgaon', 'Pimpalgaon', 'Nashik City', 'Chandwad', 'Dindori', 'Niphad', 'Other'].map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div className="sp-form-group">
                <label>{t('कमिशन दर (%)', 'कमीशन दर (%)', 'Commission Rate (%)')}</label>
                <input className="sp-input" value={form.commissionRate} onChange={e => upd('commissionRate', e.target.value)} placeholder="e.g. 2.5" type="number" step="0.1" />
              </div>
              <div className="sp-form-group">
                <label>{t('अनुभव (वर्षे)', 'अनुभव (साल)', 'Years of Experience')}</label>
                <input className="sp-input" value={form.yearsActive} onChange={e => upd('yearsActive', e.target.value)} placeholder="e.g. 12" type="number" />
              </div>
            </>}

            {/* Equipment */}
            {selectedType.id === 'equipment' && <>
              <div className="sp-form-group">
                <label>{t('उपकरण प्रकार', 'उपकरण प्रकार', 'Equipment Type')} *</label>
                <select className="sp-select" value={form.equipmentType} onChange={e => upd('equipmentType', e.target.value)}>
                  <option value="">{t('निवडा...', 'चुनें...', 'Select...')}</option>
                  {EQUIPMENT_TYPES.map(e => <option key={e}>{e}</option>)}
                </select>
              </div>
              <div className="sp-form-group">
                <label>{t('ब्रँड / मॉडेल', 'ब्रांड / मॉडल', 'Make / Model')}</label>
                <input className="sp-input" value={form.makeModel} onChange={e => upd('makeModel', e.target.value)} placeholder="e.g. Mahindra 575 DI" />
              </div>
              <div className="sp-form-group">
                <label>{t('दर (₹/तास)', 'दर (₹/घंटा)', 'Rate (₹/Hour)')}</label>
                <input className="sp-input" value={form.ratePerHour} onChange={e => upd('ratePerHour', e.target.value)} placeholder="e.g. 600" type="number" />
              </div>
              <div className="sp-form-group">
                <label>{t('सेवा क्षेत्र (किमी त्रिज्या)', 'सेवा क्षेत्र (किमी त्रिज्या)', 'Service Area (km radius)')}</label>
                <input className="sp-input" value={form.serviceArea} onChange={e => upd('serviceArea', e.target.value)} placeholder="e.g. 40" type="number" />
              </div>
            </>}

            {/* Input Supplier */}
            {selectedType.id === 'input_supplier' && <>
              <div className="sp-form-group">
                <label>{t('दुकानाचे नाव', 'दुकान का नाम', 'Shop Name')} *</label>
                <input className="sp-input" value={form.shopName} onChange={e => upd('shopName', e.target.value)} placeholder={t('उदा. पाटील ऍग्रो सेंटर', 'जैसे: पाटील एग्रो सेंटर', 'e.g. Patil Agro Center')} />
              </div>
              <div className="sp-form-group">
                <label>{t('परवाना प्रकार', 'लाइसेंस प्रकार', 'License Type')}</label>
                <select className="sp-select" value={form.licenseType} onChange={e => upd('licenseType', e.target.value)}>
                  {['Fertilizer License', 'Pesticide License', 'Seed License', 'All Three', 'Other'].map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div className="sp-form-group">
                <label>{t('मुख्य उत्पादने', 'मुख्य उत्पाद', 'Main Products')}</label>
                <input className="sp-input" value={form.products} onChange={e => upd('products', e.target.value)} placeholder={t('उदा. Onion Seeds, DAP, Urea', 'जैसे: प्याज बीज, DAP, यूरिया', 'e.g. Onion Seeds, DAP, Urea')} />
              </div>
              <div className="sp-form-group">
                <label>{t('डिलिव्हरी त्रिज्या (किमी)', 'डिलीवरी त्रिज्या (किमी)', 'Delivery Range (km)')}</label>
                <input className="sp-input" value={form.deliveryRange} onChange={e => upd('deliveryRange', e.target.value)} placeholder="e.g. 25" type="number" />
              </div>
            </>}

            {/* Quality Lab */}
            {selectedType.id === 'quality_tester' && <>
              <div className="sp-form-group">
                <label>{t('प्रयोगशाळा प्रकार', 'प्रयोगशाला प्रकार', 'Lab Type')}</label>
                <input className="sp-input" value={form.labType} onChange={e => upd('labType', e.target.value)} placeholder="NABL Accredited / FSSAI Approved" />
              </div>
              <div className="sp-form-group">
                <label>{t('प्रमाणपत्रे', 'प्रमाण पत्र', 'Certifications')}</label>
                <input className="sp-input" value={form.certifications} onChange={e => upd('certifications', e.target.value)} placeholder="NABL, FSSAI, ISO 17025" />
              </div>
              <div className="sp-form-group">
                <label>{t('रिपोर्ट वेळ (तास)', 'रिपोर्ट समय (घंटे)', 'Report Turnaround (hrs)')}</label>
                <input className="sp-input" value={form.turnaroundTime} onChange={e => upd('turnaroundTime', e.target.value)} placeholder="e.g. 4" type="number" />
              </div>
              <div className="sp-form-group">
                <label>{t('दर प्रति चाचणी (₹)', 'दर प्रति परीक्षण (₹)', 'Rate Per Test (₹)')}</label>
                <input className="sp-input" value={form.ratePerTest} onChange={e => upd('ratePerTest', e.target.value)} placeholder="e.g. 150" type="number" />
              </div>
            </>}
          </div>

          <div className="sp-form-actions">
            <button className="sp-btn-outline" onClick={() => setStep(0)}>← {t('मागे', 'वापस', 'Back')}</button>
            <button className="sp-btn-primary" onClick={() => setStep(2)} disabled={!form.name || !form.phone}>
              {t('पुढे: कागदपत्रे', 'आगे: दस्तावेज़', 'Next: Documents')} →
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 — Documents */}
      {step === 2 && (
        <div className="sp-section">
          <h2 className="sp-section-title">{t('कागदपत्रे अपलोड करा', 'दस्तावेज़ अपलोड करें', 'Upload Documents')}</h2>
          <p className="sp-section-sub">{t('सत्यापनासाठी आवश्यक कागदपत्रे. PDF किंवा JPG स्वीकारले जातात.', 'सत्यापन के लिए आवश्यक दस्तावेज।', 'Required for verification. PDF or JPG accepted.')}</p>

          <div className="sp-docs-grid">
            {[
              { label: t('आधार कार्ड / मतदार ओळखपत्र', 'आधार/वोटर ID', 'Aadhaar / Voter ID'), required: true, icon: '🪪' },
              { label: t('बँक पासबुक (पहिले पान)', 'बैंक पासबुक', 'Bank Passbook (first page)'), required: true, icon: '🏦' },
              { label: selectedType?.id === 'transport' ? t('RC Book', 'RC Book', 'RC Book') : selectedType?.id === 'warehouse' ? t('WDRA Certificate', 'WDRA सर्टिफिकेट', 'WDRA Certificate') : t('व्यवसाय परवाना', 'व्यवसाय लाइसेंस', 'Business License'), required: false, icon: '📄' },
              { label: t('फोटो (पासपोर्ट आकार)', 'फोटो (पासपोर्ट साइज)', 'Photo (Passport size)'), required: false, icon: '📸' },
            ].map((doc, i) => (
              <div key={i} className="sp-doc-card">
                <div className="sp-doc-icon">{doc.icon}</div>
                <div className="sp-doc-info">
                  <span className="sp-doc-label">{doc.label} {doc.required && <span className="sp-required">*</span>}</span>
                  <span className="sp-doc-hint">PDF / JPG / PNG • max 5MB</span>
                </div>
                <label className="sp-upload-btn">
                  <Upload size={14}/> {t('अपलोड', 'अपलोड', 'Upload')}
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: 'none' }} onChange={() => {}} />
                </label>
              </div>
            ))}
          </div>

          <div className="sp-notice">
            <AlertCircle size={15} style={{ color: '#f59e0b', flexShrink: 0 }}/>
            <span>{t('कागदपत्रे सुरक्षित ठेवली जातात. केवळ AGROVA तपासणी टीमला प्रवेश आहे.', 'दस्तावेज़ सुरक्षित हैं। केवल AGROVA टीम देख सकती है।', 'Documents are stored securely. Only the AGROVA verification team has access.')}</span>
          </div>

          <div className="sp-form-actions">
            <button className="sp-btn-outline" onClick={() => setStep(1)}>← {t('मागे', 'वापस', 'Back')}</button>
            <button className="sp-btn-primary" onClick={() => setStep(3)}>
              {t('पुढे: पुनरावलोकन', 'आगे: समीक्षा', 'Next: Review')} →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 — Review & Submit */}
      {step === 3 && selectedType && (
        <div className="sp-section">
          <h2 className="sp-section-title">{t('अर्ज पुनरावलोकन करा', 'आवेदन की समीक्षा करें', 'Review Your Application')}</h2>

          <div className="sp-review-card">
            <div className="sp-review-header" style={{ background: selectedType.bg, borderColor: selectedType.border }}>
              <span>{selectedType.icon}</span>
              <div>
                <strong>{isMr ? selectedType.titleMr : isHi ? selectedType.titleHi : selectedType.title}</strong>
                <span>{t('नोंदणी अर्ज', 'पंजीकरण आवेदन', 'Registration Application')}</span>
              </div>
              <BadgeCheck size={24} style={{ color: selectedType.color, marginLeft: 'auto' }}/>
            </div>
            <div className="sp-review-rows">
              {[
                [t('नाव', 'नाम', 'Name'), form.name || '—'],
                [t('मोबाइल', 'मोबाइल', 'Mobile'), form.phone || '—'],
                [t('जिल्हा', 'जिला', 'District'), form.district],
                ...(selectedType.id === 'transport' ? [
                  [t('वाहन प्रकार', 'वाहन', 'Vehicle'), form.vehicleType || '—'],
                  [t('नोंदणी क्र.', 'पंजीकरण', 'Reg. No.'), form.vehicleNumber || '—'],
                  [t('क्षमता', 'क्षमता', 'Capacity'), form.capacity ? `${form.capacity} MT` : '—'],
                  [t('दर', 'दर', 'Rate'), form.ratePerKm ? `₹${form.ratePerKm}/km` : '—'],
                  ['GPS', form.gpsEnabled ? t('उपलब्ध', 'उपलब्ध', 'Available') : t('नाही', 'नहीं', 'No')],
                ] : []),
                ...(selectedType.id === 'warehouse' ? [
                  [t('गोदाम प्रकार', 'गोदाम', 'Warehouse'), form.warehouseType || '—'],
                  [t('क्षमता', 'क्षमता', 'Capacity'), form.totalCapacity ? `${form.totalCapacity} MT` : '—'],
                  [t('दर', 'दर', 'Rate'), form.ratePerDay ? `₹${form.ratePerDay}/qtl/day` : '—'],
                  ['WDRA', form.wdraStatus ? t('प्रमाणित', 'प्रमाणित', 'Certified') : t('नाही', 'नहीं', 'No')],
                ] : []),
              ].map(([lbl, val]) => (
                <div key={lbl} className="sp-review-row">
                  <span>{lbl}</span><strong>{val}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="sp-agree-row">
            <input type="checkbox" id="agree" checked={form.agreeTerms} onChange={e => upd('agreeTerms', e.target.checked)} />
            <label htmlFor="agree">
              {t('मी AGROVA सेवा अटी आणि गोपनीयता धोरणाशी सहमत आहे.', 'मैं AGROVA की सेवा शर्तों से सहमत हूं।', 'I agree to AGROVA\'s Terms of Service and Privacy Policy.')}
            </label>
          </div>

          <div className="sp-form-actions">
            <button className="sp-btn-outline" onClick={() => setStep(2)}>← {t('मागे', 'वापस', 'Back')}</button>
            <button className="sp-btn-submit" disabled={!form.agreeTerms || !form.name || !form.phone} onClick={handleSubmit}>
              <Send size={16}/> {t('अर्ज सादर करा', 'आवेदन जमा करें', 'Submit Application')}
            </button>
          </div>
        </div>
      )}

      {/* Benefits strip */}
      {step === 0 && (
        <div className="sp-benefits">
          {[
            ['🆓', t('मोफत नोंदणी', 'मुफ़्त पंजीकरण', 'Free to Register'), t('कोणतीही लपलेली फी नाही', 'कोई छुपा शुल्क नहीं', 'No hidden charges')],
            ['⚡', t('जलद तपासणी', 'त्वरित सत्यापन', 'Fast Verification'), t('24 तासांत तपासणी', '24 घंटे में सत्यापन', 'Verified within 24 hours')],
            ['📱', t('तत्काळ ऑर्डर', 'तत्काल ऑर्डर', 'Instant Orders'), t('शेतकऱ्यांकडून थेट बुकिंग', 'किसानों से सीधी बुकिंग', 'Direct bookings from farmers')],
            ['💳', t('डिजिटल पेमेंट', 'डिजिटल भुगतान', 'Digital Payments'), t('UPI/बँक द्वारे सुरक्षित', 'UPI/बैंक द्वारा सुरक्षित', 'Secure UPI/bank transfers')],
          ].map(([icon, title, sub]) => (
            <div key={title} className="sp-benefit-card">
              <span className="sp-benefit-icon">{icon}</span>
              <strong>{title}</strong>
              <span>{sub}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
