import React, { useState } from 'react';
import { LEARNING_LESSONS } from '../data/learningGuide';
import { BookOpen, Zap, Box, RefreshCw, Calculator, Rocket, CheckCircle, Copy, Code } from 'lucide-react';

export default function FrameworkGuide({ isOpen, onClose }) {
  const [activeLessonId, setActiveLessonId] = useState(LEARNING_LESSONS[0].id);
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!isOpen) return null;

  const currentLesson = LEARNING_LESSONS.find(l => l.id === activeLessonId) || LEARNING_LESSONS[0];

  const handleCopyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="modal-overlay guide-overlay" onClick={onClose}>
      <div className="modal-content guide-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="guide-modal-header">
          <div className="guide-header-title">
            <div className="guide-icon-badge">
              <BookOpen size={24} />
            </div>
            <div>
              <h2>React + Vite Framework Masterclass</h2>
              <p>Learn how Agrova was engineered from scratch using React component architecture</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="guide-modal-body">
          {/* Sidebar Navigation */}
          <div className="guide-sidebar">
            <span className="sidebar-heading">LESSON MODULES</span>
            {LEARNING_LESSONS.map((lesson, idx) => (
              <button 
                key={lesson.id}
                className={`guide-nav-item ${activeLessonId === lesson.id ? 'active' : ''}`}
                onClick={() => setActiveLessonId(lesson.id)}
              >
                <Code size={16} />
                <span>{lesson.title}</span>
              </button>
            ))}
          </div>

          {/* Main Lesson Content */}
          <div className="guide-content-area">
            <div className="lesson-header">
              <h2>{currentLesson.title}</h2>
              <p className="lesson-summary">{currentLesson.summary}</p>
            </div>

            {/* Key Concept Bullets */}
            <div className="concepts-card">
              <h4>Key Architectural Takeaways:</h4>
              <ul>
                {currentLesson.concepts.map((concept, i) => (
                  <li key={i}>
                    <CheckCircle size={16} className="txt-success flex-shrink-0" />
                    <span>{concept}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Code Snippet Box with Copy Button */}
            <div className="code-snippet-box">
              <div className="snippet-header">
                <span className="file-tag">Agrova Source Code Example</span>
                <button 
                  className="copy-btn"
                  onClick={() => handleCopyCode(currentLesson.codeSnippet, activeLessonId)}
                >
                  <Copy size={14} />
                  {copiedIndex === activeLessonId ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
              <pre className="code-display">
                <code>{currentLesson.codeSnippet}</code>
              </pre>
            </div>
          </div>
        </div>

        <div className="guide-modal-footer">
          <span className="footer-tip">💡 Tip: Inspect `src/components/` files to edit and customize your hackathon features!</span>
          <button className="btn-primary" onClick={onClose}>Got It! Return to Agrova App</button>
        </div>
      </div>
    </div>
  );
}
