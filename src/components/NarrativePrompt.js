import React, { useState, useEffect } from 'react';
import './NarrativePrompt.css'; // Keep the original CSS filename

const NarrativePrompt = ({ text, onContinue }) => {
  const [visible, setVisible] = useState(false);
  const [backgroundPos, setBackgroundPos] = useState({ x: 0, y: 0 });
  
  // Determine if this is the welcome prompt
  const isWelcomePrompt = text.includes("Welcome to");
  
  // Parallax effect on mouse move
  const handleMouseMove = (e) => {
    if (!isWelcomePrompt) return;
    
    const x = (e.clientX / window.innerWidth) * 20 - 10; // -10 to 10
    const y = (e.clientY / window.innerHeight) * 20 - 10; // -10 to 10
    
    setBackgroundPos({ x, y });
  };
  
  // Fade in the prompt
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div 
      className={`narrative-prompt ${visible ? 'visible' : ''} ${isWelcomePrompt ? 'welcome-prompt' : ''}`} 
      onMouseMove={handleMouseMove}
    >
      <div 
        className="prompt-background"
        style={{ 
          transform: `translate(${backgroundPos.x}px, ${backgroundPos.y}px)` 
        }}
      />
      
      {isWelcomePrompt ? (
        <div className="welcome-content">
          <div className="brand-icons-background">
            {Array(20).fill().map((_, i) => (
              <div 
                key={i} 
                className="floating-brand-icon"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.1,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 10 + 15}s`
                }}
              >
                {['🍔', '💻', '🦉', '👟', '📱', '🎀', '🧼', '🟪', '⚪', '🥤'][Math.floor(Math.random() * 10)]}
              </div>
            ))}
          </div>
          
          <h1 className="welcome-title">What Do You Want Me to Be?</h1>
          <p className="welcome-subtitle">A journey through the evolving voices of brands in digital culture</p>
          
          <div className="glowing-line"></div>
          
          <button 
            className="enter-button"
            onClick={onContinue}
            aria-label="Begin the journey"
          >
            Begin Journey
          </button>
        </div>
      ) : (
        <>
          <p className="prompt-text">{text}</p>
          <button 
            className="continue-button" 
            onClick={onContinue}
          >
            Continue
          </button>
        </>
      )}
    </div>
  );
};

export default NarrativePrompt;