import React, { useState, useEffect } from 'react';

// Import Zone Components
import MascotMausoleum from './zones/MascotMausoleum';
import BrandTherapy from './zones/BrandTherapy';
import VoiceGeneratorLab from './zones/VoiceGeneratorLab';
import BrandIdentityMirror from './zones/BrandIdentityMirror';
import NarrativePrompt from './components/NarrativePrompt';
import KaleidoscopeLanding from './components/KaleidoscopeLanding';
import EndingSlide from './components/EndingSlide';

const App = () => {
  const [currentZone, setCurrentZone] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [showDevControls, setShowDevControls] = useState(false);
  const [showEndingSlide, setShowEndingSlide] = useState(false);
  
  // Improved narrative prompts with better segues between zones - updated to 4 zones
  const narrativePrompts = [
    // Zone 0 to 1: Mascot Mausoleum
    "Deep in the archives of brand history lie the mascots that defined generations. Some evolved, others faded away... each with a story to tell.",
    
    // Zone 1 to 2: Brand Therapy
    "Behind every tagline and tweet is a brand struggling with its identity. Step into the therapy room where brands reveal their deepest insecurities.",
    
    // Zone 2 to 3: Voice Generator Lab
    "Every brand speaks in a distinctive voice that was carefully crafted. Enter the lab where brand voices are engineered, from corporate to chaotic.",
    
    // Zone 3 to 4: Brand Identity Mirror
    "In quiet reflection, brands confront their true selves. Peer into the mirror where masks fall away and authentic voices emerge."
  ];
  
  // Toggle dev controls with the 'd' key
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'd') {
        setShowDevControls(prev => !prev);
        console.log("Developer controls:", !showDevControls);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showDevControls]);
  
  // Handle landing page completion
  const handleLandingComplete = () => {
    setShowLanding(false);
    setShowPrompt(true);
  };
  
  // Handle narrative prompt completion
  const handlePromptComplete = () => {
    setShowPrompt(false);
  };
  
  // When a zone is complete, show the prompt for the next zone
  const handleZoneComplete = () => {
    console.log("Zone completed:", currentZone);
    
    // Move to next zone if not at the end
    if (currentZone < 3) { // Changed from 4 to 3
      const nextZone = currentZone + 1;
      setCurrentZone(nextZone);
      setShowPrompt(true);
      console.log("Moving to zone:", nextZone);
    } else {
      // Show ending slide instead of looping back to the beginning
      setShowEndingSlide(true);
      console.log("Experience complete, showing ending slide");
    }
  };
  
  // Handle restart from ending slide
  const handleRestart = () => {
    setShowEndingSlide(false);
    setCurrentZone(0);
    setShowLanding(true);
  };
  
  // Function to directly go to a zone (for development)
  const goToZone = (index) => {
    setCurrentZone(index);
    setShowPrompt(false);
    setShowLanding(false);
    setShowEndingSlide(false);
  };
  
  // Function to show landing
  const goToLanding = () => {
    setShowLanding(true);
    setShowPrompt(false);
    setShowEndingSlide(false);
  };
  
  // Function to show ending
  const goToEnding = () => {
    setShowEndingSlide(true);
    setShowPrompt(false);
    setShowLanding(false);
  };
  
  // Development controls
  const devControls = (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      zIndex: 9999,
      background: 'rgba(0,0,0,0.7)',
      padding: '10px',
      borderRadius: '5px'
    }}>
      <small style={{color: 'white', fontSize: '10px', display: 'block', marginBottom: '5px', textAlign: 'center'}}>
        Press 'd' to hide
      </small>
      
      <button 
        style={{
          padding: '5px 10px',
          background: '#333',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
          display: 'block',
          marginBottom: '5px',
          width: '100%'
        }}
        onClick={goToLanding}
      >
        Landing
      </button>
      
      <button 
        style={{
          padding: '5px 10px',
          background: '#333',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
          display: 'block',
          marginBottom: '5px',
          width: '100%'
        }}
        onClick={() => {
          setShowPrompt(true);
          setShowLanding(false);
          setShowEndingSlide(false);
        }}
      >
        Show Prompt
      </button>
      
      {[0, 1, 2, 3].map(index => (
        <button 
          key={index}
          style={{
            padding: '5px 10px',
            background: currentZone === index && !showLanding && !showPrompt && !showEndingSlide ? 
              '#4A90E2' : '#333',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
            display: 'block',
            marginBottom: '5px',
            width: '100%'
          }}
          onClick={() => goToZone(index)}
        >
          Zone {index + 1}
        </button>
      ))}
      
      <button 
        style={{
          padding: '5px 10px',
          background: showEndingSlide ? '#4A90E2' : '#333',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
          display: 'block',
          marginBottom: '5px',
          width: '100%'
        }}
        onClick={goToEnding}
      >
        Ending
      </button>
    </div>
  );
  
  // Render the appropriate view based on state
  const renderContent = () => {
    if (showLanding) {
      return <KaleidoscopeLanding onContinue={handleLandingComplete} />;
    }
    
    if (showEndingSlide) {
      return <EndingSlide onRestart={handleRestart} />;
    }
    
    if (showPrompt) {
      return (
        <NarrativePrompt 
          text={narrativePrompts[currentZone]}
          onContinue={handlePromptComplete}
        />
      );
    }
    
    // Wrapping each zone in a scrollable container
    const scrollableContainerStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflowY: 'auto'
    };
    
    switch(currentZone) {
      case 0:
        return (
          <div style={scrollableContainerStyle}>
            <MascotMausoleum onZoneComplete={handleZoneComplete} />
          </div>
        );
      case 1:
        return (
          <div style={scrollableContainerStyle}>
            <BrandTherapy onZoneComplete={handleZoneComplete} />
          </div>
        );
      case 2:
        return (
          <div style={scrollableContainerStyle}>
            <VoiceGeneratorLab onZoneComplete={handleZoneComplete} />
          </div>
        );
      case 3:
        return (
          <div style={scrollableContainerStyle}>
            <BrandIdentityMirror onZoneComplete={handleZoneComplete} />
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="app-container">
      {/* Only show dev controls when toggled */}
      {showDevControls && devControls}
      
      {/* Render the appropriate content */}
      {renderContent()}
    </div>
  );
};

export default App;