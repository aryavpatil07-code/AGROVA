export const LEARNING_LESSONS = [
  {
    id: "lesson-1",
    title: "1. Framework Basics & Vite",
    icon: "Zap",
    summary: "Why use React + Vite instead of standard HTML/JS files?",
    concepts: [
      "A framework like React structures UI into reusable, self-contained components.",
      "Vite is the modern build tool that bundles your JavaScript instantaneously using native ES modules.",
      "Hot Module Replacement (HMR) lets you edit code and see changes in real-time without reloading the webpage!"
    ],
    codeSnippet: `// Standard React + Vite structure
// index.html -> src/main.jsx -> src/App.jsx -> Components

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Renders the root React component into the <div id="root"> element in index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`
  },
  {
    id: "lesson-2",
    title: "2. Components & Props in Agrova",
    icon: "Box",
    summary: "Building reusable UI blocks (e.g. Mandi Card, Warehouse Card)",
    concepts: [
      "Components are functions that return JSX (JavaScript XML HTML syntax).",
      "Props (properties) are parameters passed from parent components to child components.",
      "In Agrova, <MandiCard cropData={crop} /> renders each crop item dynamically!"
    ],
    codeSnippet: `// Example Component from Agrova: MandiCard.jsx
function MandiCard({ crop, onSelect }) {
  return (
    <div className="mandi-card" onClick={() => onSelect(crop)}>
      <h3>{crop.crop}</h3>
      <div className="price-tag">₹{crop.modalPrice} / {crop.unit}</div>
      <span className={crop.trend === 'up' ? 'badge-up' : 'badge-down'}>
        {crop.dailyChange > 0 ? '+' : ''}{crop.dailyChange}%
      </span>
    </div>
  );
}`
  },
  {
    id: "lesson-3",
    title: "3. State Management (`useState`)",
    icon: "RefreshCw",
    summary: "Handling user interaction, search filters, and active tab switching",
    concepts: [
      "State is internal memory held by a component that triggers automatic re-renders when changed.",
      "The useState hook gives you a state variable and a setter function: const [search, setSearch] = useState('');",
      "Whenever setSearch('Wheat') is called, React re-calculates filtered crop lists instantly."
    ],
    codeSnippet: `// Agrova search state example
import { useState } from 'react';

function MandiSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // React automatically re-evaluates filtered crops when search or category changes!
  const filteredCrops = MANDI_RATES.filter(crop => {
    const matchesSearch = crop.crop.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || crop.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <input 
      value={searchTerm} 
      onChange={(e) => setSearchTerm(e.target.value)} 
      placeholder="Search crop or mandi..." 
    />
  );
}`
  },
  {
    id: "lesson-4",
    title: "4. Calculations & Computed State",
    icon: "Calculator",
    summary: "Dynamic calculations for Quality Grading & Warehouse Storage Costs",
    concepts: [
      "You don't always need separate state for calculated values!",
      "Calculate formulas directly in render logic or wrap heavy calculations in useMemo.",
      "In Agrova's Quality Calculator, Moisture %, Impurities, and Grain Size automatically derive Grade A+ and Price Premiums!"
    ],
    codeSnippet: `// Quality Score Calculation Logic in Agrova
const calculateGrade = (moisture, impurity) => {
  if (moisture <= 12 && impurity <= 1) return { grade: "Grade A+", premium: "+8%" };
  if (moisture <= 14 && impurity <= 2) return { grade: "Grade A", premium: "+4%" };
  if (moisture <= 16 && impurity <= 4) return { grade: "Grade B", premium: "0%" };
  return { grade: "Grade C (High moisture)", premium: "-6%" };
};`
  },
  {
    id: "lesson-5",
    title: "5. Hackathon Pitching & Deployment Tips",
    icon: "Rocket",
    summary: "How to run, build, and deploy Agrova for your hackathon judges",
    concepts: [
      "Run locally: npm run dev (accessible on http://localhost:3000)",
      "Build for production: npm run build (creates optimized static bundle in dist/)",
      "Deploy in 2 minutes: Connect your Git repository to Vercel or Netlify for a live demo URL!"
    ],
    codeSnippet: `// Terminal Commands:
// 1. Install dependencies:
npm install

// 2. Start local development server:
npm run dev

// 3. Create production build:
npm run build`
  }
];
