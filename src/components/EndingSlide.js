import React, { useState, useEffect } from 'react';
import './EndingSlide.css';

const EndingSlide = ({ onRestart }) => {
  const [visible, setVisible] = useState(false);
  const [wavesVisible, setWavesVisible] = useState(false);
  const [primaryTextVisible, setPrimaryTextVisible] = useState(false);
  const [secondaryTextVisible, setSecondaryTextVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  
  // Animation sequence
  useEffect(() => {
    // Fade in background
    setTimeout(() => {
      setVisible(true);
    }, 300);
    
    // Fade in waves
    setTimeout(() => {
      setWavesVisible(true);
    }, 1000);
    
    // Fade in primary text
    setTimeout(() => {
      setPrimaryTextVisible(true);
    }, 2000);
    
    // Fade in secondary text
    setTimeout(() => {
      setSecondaryTextVisible(true);
    }, 3000);
    
    // Fade in button
    setTimeout(() => {
      setButtonVisible(true);
    }, 3800);
    
    // Fade in footer
    setTimeout(() => {
      setFooterVisible(true);
    }, 4300);
  }, []);
  
  return (
    <div className={`ending-container ${visible ? 'visible' : ''}`}>
      {/* Voice wave visualization */}
      <div className={`wave-container ${wavesVisible ? 'visible' : ''}`}>
        {/* Multiple wave rings */}
        {[...Array(8)].map((_, index) => (
          <div 
            key={index} 
            className="wave-ring"
            style={{ 
              animationDelay: `${index * 0.5}s`,
              animationDuration: `${8 + index * 0.5}s`
            }}
          ></div>
        ))}
        
        {/* Additional outer rings spinning counterclockwise with lower opacity */}
        <div className="outer-wave-ring counterclockwise-1"></div>
        <div className="outer-wave-ring counterclockwise-2"></div>
        
        {/* Wave particles */}
        <div className="wave-particles"></div>
      </div>
      
      {/* Primary text */}
      <div className={`primary-text ${primaryTextVisible ? 'visible' : ''}`}>
        <p>I only ever echoed you.</p>
      </div>
      
      {/* Secondary text */}
      <div className={`secondary-text ${secondaryTextVisible ? 'visible' : ''}`}>
        <p>This is just the beginning of the conversation... there is always more to become.</p>
      </div>
      
      {/* Begin again button - now with enhanced prominence */}
      <div className={`ending-actions ${buttonVisible ? 'visible' : ''}`}>
        <button 
          className="begin-again-button"
          onClick={onRestart}
          aria-label="Begin the journey again"
        >
          Begin Again
        </button>
      </div>
      
      {/* Footer */}
      <div className={`ending-footer ${footerVisible ? 'visible' : ''}`}>
        <p>WHAT DO YOU WANT ME TO BE? &nbsp;|&nbsp; DESIGNED BY RISHI BHANUSHALI &nbsp;|&nbsp; EXPERIMENTAL INTERACTIVE NARRATIVE &nbsp;|&nbsp; 2025</p>
      </div>
    </div>
  );
};

export default EndingSlide;