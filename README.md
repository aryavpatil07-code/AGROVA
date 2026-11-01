# Agrova 🌱

**Algorithmic Agricultural Price Discovery & Market-Linkage Platform**

Agrova empowers farmers, traders, and wholesale buyers with real-time APMC Mandi market intelligence, AI price forecasting, crop quality grading, WDRA cold-storage discovery, logistics management, and digital ledger (Khaata) tracking.

---

## 🚀 Key Features

1. **🌾 Live Mandi Rates Hub**: Real-time market prices across major Indian APMC Mandis (Indore, Karnal, Rajkot, Bharatpur, Agra, Nashik, etc.) with multi-state filtering, modal rates, and daily price fluctuation indicators.
2. **📈 AI Price Forecasting & ROI Simulator**: Machine-learning-driven price prediction engine (`mandi_ml_predictor.py`) offering sell vs. hold recommendations and warehouse storage profit simulations.
3. **🔍 Crop Quality & Grading Suite**: Tests moisture %, foreign matter, and grain damage to calculate certified quality grades (A+, A, B, C) and determine quality premiums.
4. **🏬 WDRA Warehouse & Cold Storage Locator**: Geo-aware storage discovery with capacity utilization, daily rental rates per quintal, and e-NWR pledge loan eligibility.
5. **🤝 Wholesale Buyer & Trader Marketplace**: Direct bulk procurement portal with verified lab certificates and digital bidding workflows.
6. **🚚 Transport & Logistics Linkage**: Connecting farm gates to warehouses and markets with verified vehicle booking and fare estimation.
7. **📒 Kisan Mitra & Payment Khaata**: Digital ledger and vernacular assistance for farmers to track credits, dues, and transaction histories.
8. **📱 Cross-Platform Support**: Built with Vite + React and integrated with Capacitor for Android native deployment.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Lucide Icons, CSS3
- **Mobile Runtime**: Capacitor Android 8.5
- **Machine Learning / Backend**: Python 3, scikit-learn, pandas, numpy
- **Deployment**: Static Web & Android APK

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18+)
- Python 3.9+ (for ML scripts)

### Setup & Run Frontend
```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev
```

The app will be accessible at `http://localhost:3000`.

### Run ML Predictor
```bash
# Install Python dependencies
pip install -r requirements.txt

# Run predictor
python mandi_ml_predictor.py
```

### Build for Production
```bash
# Generate optimized web build
npm run build

# Sync with Capacitor Android
npx cap sync android
```

---

## 📄 License
MIT License
