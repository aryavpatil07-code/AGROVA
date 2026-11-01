import { NASHIK_MANDI_RATES } from './nashikMandiRates';

const BASE_MANDI_RATES = [
  {
    id: "m1",
    crop: "Wheat (Sharbati)",
    category: "Grains",
    mandi: "Indore Mandi",
    district: "Indore",
    state: "Madhya Pradesh",
    minPrice: 2450,
    maxPrice: 2820,
    modalPrice: 2680,
    unit: "Quintal (100 kg)",
    dailyChange: +3.2,
    trend: "up",
    lastUpdated: "10 mins ago",
    arrivalQty: "1,450 MT",
    qualityGrade: "Grade A",
    dataSources: ["AGMARKNET Portal", "e-NAM", "Data.gov.in"],
    consensusScore: "98.6%",
    dataIntegrityStatus: "AUTHENTICATED",
    history: [
      { date: "Aug 15", price: 2480 },
      { date: "Aug 22", price: 2510 },
      { date: "Aug 29", price: 2560 },
      { date: "Sep 05", price: 2600 },
      { date: "Sep 11", price: 2680 }
    ],
    prediction: {
      forecast7Days: 2790,
      confidence: "88%",
      recommendation: "Hold & Store",
      storageDaysAdvice: "7 - 12 days",
      expectedGainPercent: "+4.1%"
    }
  },
  {
    id: "m-nasik",
    crop: "Onion (Nashik Red)",
    category: "Horticulture",
    mandi: "Lasalgaon APMC",
    district: "Nashik",
    state: "Maharashtra",
    minPrice: 1650,
    maxPrice: 2250,
    modalPrice: 1950,
    unit: "Quintal (100 kg)",
    dailyChange: +4.2,
    trend: "up",
    lastUpdated: "5 mins ago",
    arrivalQty: "4,200 MT",
    qualityGrade: "Grade A+",
    dataSources: ["AGMARKNET Portal", "Agriwatch", "Napanta"],
    consensusScore: "99.1%",
    dataIntegrityStatus: "AUTHENTICATED",
    history: [
      { date: "Aug 15", price: 1720 },
      { date: "Aug 22", price: 1780 },
      { date: "Aug 29", price: 1840 },
      { date: "Sep 05", price: 1890 },
      { date: "Sep 11", price: 1950 }
    ],
    prediction: {
      forecast7Days: 2180,
      confidence: "92%",
      recommendation: "Hold in Cold Storage",
      storageDaysAdvice: "15 - 30 days",
      expectedGainPercent: "+11.8%"
    }
  },
  {
    id: "m-pune",
    crop: "Wheat (Lokwan)",
    category: "Grains",
    mandi: "Pune Grain Market",
    district: "Pune",
    state: "Maharashtra",
    minPrice: 2500,
    maxPrice: 2950,
    modalPrice: 2780,
    unit: "Quintal (100 kg)",
    dailyChange: +1.8,
    trend: "up",
    lastUpdated: "12 mins ago",
    arrivalQty: "2,100 MT",
    qualityGrade: "Grade A",
    dataSources: ["KisanDeals Maharashtra", "e-NAM", "Data.gov.in"],
    consensusScore: "98.4%",
    dataIntegrityStatus: "AUTHENTICATED",
    history: [
      { date: "Aug 15", price: 2600 },
      { date: "Aug 22", price: 2650 },
      { date: "Aug 29", price: 2700 },
      { date: "Sep 05", price: 2740 },
      { date: "Sep 11", price: 2780 }
    ],
    prediction: {
      forecast7Days: 2890,
      confidence: "89%",
      recommendation: "Hold & Store",
      storageDaysAdvice: "10 days",
      expectedGainPercent: "+3.9%"
    }
  },
  {
    id: "m-satara",
    crop: "Soybean (Yellow)",
    category: "Oilseeds",
    mandi: "Satara Market Yard",
    district: "Satara",
    state: "Maharashtra",
    minPrice: 4050,
    maxPrice: 4580,
    modalPrice: 4380,
    unit: "Quintal (100 kg)",
    dailyChange: +2.1,
    trend: "up",
    lastUpdated: "18 mins ago",
    arrivalQty: "1,650 MT",
    qualityGrade: "Grade B+",
    dataSources: ["KisanDeals Maharashtra", "AGMARKNET", "Agriwatch"],
    consensusScore: "97.9%",
    dataIntegrityStatus: "AUTHENTICATED",
    history: [
      { date: "Aug 15", price: 4150 },
      { date: "Aug 22", price: 4200 },
      { date: "Aug 29", price: 4280 },
      { date: "Sep 05", price: 4330 },
      { date: "Sep 11", price: 4380 }
    ],
    prediction: {
      forecast7Days: 4540,
      confidence: "86%",
      recommendation: "Hold & Store",
      storageDaysAdvice: "12 days",
      expectedGainPercent: "+3.6%"
    }
  },
  {
    id: "m2",
    crop: "Basmati Rice (1121)",
    category: "Grains",
    mandi: "Karnal Grain Market",
    district: "Karnal",
    state: "Haryana",
    minPrice: 4200,
    maxPrice: 4850,
    modalPrice: 4600,
    unit: "Quintal (100 kg)",
    dailyChange: -1.1,
    trend: "down",
    lastUpdated: "25 mins ago",
    arrivalQty: "2,800 MT",
    qualityGrade: "Grade A+",
    dataSources: ["e-NAM", "AGMARKNET Portal"],
    consensusScore: "98.1%",
    dataIntegrityStatus: "AUTHENTICATED",
    history: [
      { date: "Aug 15", price: 4750 },
      { date: "Aug 22", price: 4720 },
      { date: "Aug 29", price: 4680 },
      { date: "Sep 05", price: 4650 },
      { date: "Sep 11", price: 4600 }
    ],
    prediction: {
      forecast7Days: 4520,
      confidence: "82%",
      recommendation: "Sell Now",
      storageDaysAdvice: "0 days (high arrival expected)",
      expectedGainPercent: "-1.7%"
    }
  },
  {
    id: "m3",
    crop: "Cotton (Long Staple)",
    category: "Commercial",
    mandi: "Rajkot Mandi",
    district: "Rajkot",
    state: "Gujarat",
    minPrice: 6800,
    maxPrice: 7450,
    modalPrice: 7200,
    unit: "Quintal (100 kg)",
    dailyChange: +4.8,
    trend: "up",
    lastUpdated: "5 mins ago",
    arrivalQty: "920 MT",
    qualityGrade: "Grade A",
    dataSources: ["Data.gov.in", "AGMARKNET Portal"],
    consensusScore: "99.0%",
    dataIntegrityStatus: "AUTHENTICATED",
    history: [
      { date: "Aug 15", price: 6500 },
      { date: "Aug 22", price: 6650 },
      { date: "Aug 29", price: 6800 },
      { date: "Sep 05", price: 7000 },
      { date: "Sep 11", price: 7200 }
    ],
    prediction: {
      forecast7Days: 7650,
      confidence: "91%",
      recommendation: "Store in Warehouse",
      storageDaysAdvice: "15 - 20 days",
      expectedGainPercent: "+6.25%"
    }
  },
  {
    id: "m4",
    crop: "Soybean (Yellow)",
    category: "Oilseeds",
    mandi: "Latur Grain Yard",
    district: "Latur",
    state: "Maharashtra",
    minPrice: 4100,
    maxPrice: 4650,
    modalPrice: 4420,
    unit: "Quintal (100 kg)",
    dailyChange: +1.5,
    trend: "up",
    lastUpdated: "18 mins ago",
    arrivalQty: "1,120 MT",
    qualityGrade: "Grade B+",
    dataSources: ["KisanDeals Maharashtra", "Agriwatch"],
    consensusScore: "98.2%",
    dataIntegrityStatus: "AUTHENTICATED",
    history: [
      { date: "Aug 15", price: 4200 },
      { date: "Aug 22", price: 4250 },
      { date: "Aug 29", price: 4340 },
      { date: "Sep 05", price: 4380 },
      { date: "Sep 11", price: 4420 }
    ],
    prediction: {
      forecast7Days: 4580,
      confidence: "85%",
      recommendation: "Hold & Store",
      storageDaysAdvice: "10 days",
      expectedGainPercent: "+3.6%"
    }
  },
  {
    id: "m5",
    crop: "Mustard Seed",
    category: "Oilseeds",
    mandi: "Bharatpur Mandi",
    district: "Bharatpur",
    state: "Rajasthan",
    minPrice: 5300,
    maxPrice: 5900,
    modalPrice: 5650,
    unit: "Quintal (100 kg)",
    dailyChange: +2.3,
    trend: "up",
    lastUpdated: "12 mins ago",
    arrivalQty: "1,850 MT",
    qualityGrade: "Grade A",
    dataSources: ["Agriwatch", "Data.gov.in"],
    consensusScore: "98.5%",
    dataIntegrityStatus: "AUTHENTICATED",
    history: [
      { date: "Aug 15", price: 5250 },
      { date: "Aug 22", price: 5350 },
      { date: "Aug 29", price: 5480 },
      { date: "Sep 05", price: 5560 },
      { date: "Sep 11", price: 5650 }
    ],
    prediction: {
      forecast7Days: 5880,
      confidence: "89%",
      recommendation: "Store in Warehouse",
      storageDaysAdvice: "14 days",
      expectedGainPercent: "+4.0%"
    }
  },
  {
    id: "m6",
    crop: "Potato (Jyoti)",
    category: "Horticulture",
    mandi: "Agra Vegetable Market",
    district: "Agra",
    state: "Uttar Pradesh",
    minPrice: 1250,
    maxPrice: 1580,
    modalPrice: 1420,
    unit: "Quintal (100 kg)",
    dailyChange: -2.4,
    trend: "down",
    lastUpdated: "2 mins ago",
    arrivalQty: "3,400 MT",
    qualityGrade: "Grade B",
    dataSources: ["Napanta", "AGMARKNET Portal"],
    consensusScore: "97.5%",
    dataIntegrityStatus: "AUTHENTICATED",
    history: [
      { date: "Aug 15", price: 1600 },
      { date: "Aug 22", price: 1540 },
      { date: "Aug 29", price: 1490 },
      { date: "Sep 05", price: 1450 },
      { date: "Sep 11", price: 1420 }
    ],
    prediction: {
      forecast7Days: 1350,
      confidence: "78%",
      recommendation: "Cold Storage Urgently",
      storageDaysAdvice: "30 days (wait for festival season)",
      expectedGainPercent: "+18.0%"
    }
  },
  {
    id: "m7",
    crop: "Tomato (Hybrid)",
    category: "Horticulture",
    mandi: "Kolar Market",
    district: "Kolar",
    state: "Karnataka",
    minPrice: 1800,
    maxPrice: 2600,
    modalPrice: 2200,
    unit: "Quintal (100 kg)",
    dailyChange: +8.5,
    trend: "up",
    lastUpdated: "Just now",
    arrivalQty: "850 MT",
    qualityGrade: "Grade A+",
    dataSources: ["Data.gov.in", "e-NAM"],
    consensusScore: "99.4%",
    dataIntegrityStatus: "AUTHENTICATED",
    history: [
      { date: "Aug 15", price: 1400 },
      { date: "Aug 22", price: 1650 },
      { date: "Aug 29", price: 1850 },
      { date: "Sep 05", price: 2020 },
      { date: "Sep 11", price: 2200 }
    ],
    prediction: {
      forecast7Days: 2500,
      confidence: "94%",
      recommendation: "Sell Now / High Demand",
      storageDaysAdvice: "1-2 days max (Perishable)",
      expectedGainPercent: "+13.6%"
    }
  }
];

// Merge Nashik-specific rates with national rates — Nashik entries appear first
export const MANDI_RATES = [...NASHIK_MANDI_RATES, ...BASE_MANDI_RATES];

export const CROP_CATEGORIES = ["All", "Grains", "Oilseeds", "Commercial", "Horticulture"];

export const STATES_LIST = ["All States", "Maharashtra", "Madhya Pradesh", "Haryana", "Gujarat", "Rajasthan", "Uttar Pradesh", "Karnataka"];

