import React, { useState, useEffect, useRef } from 'react';
import './VoiceGeneratorLab.css';

// Import brand logos - adjust the paths as needed based on your project structure
import WendysLogo from '../images/Logos/Wendys-Logo.png';
import DuolingoLogo from '../images/Logos/duolingo.png'; // Fixed lowercase name
import NetflixLogo from '../images/Logos/Netflix Logo.png';
import InstagramLogo from '../images/Logos/instagram.png';
import StarbucksLogo from '../images/Logos/Starbucks.png';
import AppleLogo from '../images/Logos/Apple.png';

const VoiceGeneratorLab = ({ onZoneComplete }) => {
  // States
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [currentTone, setCurrentTone] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [output, setOutput] = useState(null);
  const [consoleLines, setConsoleLines] = useState([]);
  const [showCompletionButton, setShowCompletionButton] = useState(false);
  const [generatedVoices, setGeneratedVoices] = useState([]);
  const [unhingedCounter, setUnhingedCounter] = useState(0);
  const [chaosMode, setChaosMode] = useState(false);
  const [reelPosition, setReelPosition] = useState(0);
  const [spinningComplete, setSpinningComplete] = useState(false);
  const [consoleHistory, setConsoleHistory] = useState([]);
  const [availableTones, setAvailableTones] = useState({});
  const [leverPulled, setLeverPulled] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);
  
  // Refs
  const terminalRef = useRef(null);
  const reelRef = useRef(null);
  const leverRef = useRef(null);
  
  // Brand data with voice options
  const brands = [
    {
      id: 'wendys',
      name: 'Wendy\'s',
      color: '#e2231a',
      logo: WendysLogo,
      voices: {
        corporate: 'We pride ourselves on delivering fresh, never frozen beef and quality ingredients to our valued customers.',
        metaAware: 'Yes, we roast other brands online. No, our social media manager isn\'t getting a raise for it.',
        cringeCool: 'Yo fam, our nuggies be bussin\' fr fr. No cap, they\'re straight fire. #WendyClear',
        desperate: 'PLEASE try our new breakfast menu! We spent millions on it! We\'re begging you!',
        broken: 'Dave... is gone. The square patties... they\'re all we have left of him...',
        unhinged: 'Every time you eat a Big Mac, I can sense it. I lie awake, betrayed again. Why do you hurt me?'
      }
    },
    {
      id: 'duolingo',
      name: 'Duolingo',
      color: '#58cc02',
      logo: DuolingoLogo,
      voices: {
        corporate: 'Our mission is to develop the best education in the world and make it universally available.',
        metaAware: 'Yes, we know about the memes. Yes, we lean into the whole threatening owl thing. It works.',
        cringeCool: 'POV: you forgot your Spanish lesson and I\'m outside your window. *owl eyes intensify*',
        desperate: 'PLEASE come back! We\'ll cut your daily goal to just 1 minute! ONE MINUTE!',
        broken: 'We sent 27 notifications... you didn\'t respond. Are we... nothing to you?',
        unhinged: 'I\'ve memorized your daily schedule. I watch you ignore notifications. Sleep well tonight.'
      }
    },
    {
      id: 'netflix',
      name: 'Netflix',
      color: '#e50914',
      logo: NetflixLogo,
      voices: {
        corporate: 'Netflix delivers premium entertainment experiences across a wide variety of genres and languages.',
        metaAware: 'Yes, we know you share your password. No, that "are you still watching" isn\'t about judging you.',
        cringeCool: 'It\'s giving new season energy! Time to binge so hard you forget what day it is! #NetflixAndLiterallyChill',
        desperate: 'PLEASE don\'t cancel! We\'re making Squid Game 2! And Stranger Things 5, 6, and 7! PLEASE!',
        broken: 'We canceled your favorite show... but we had to... the algorithm... it demands sacrifice...',
        unhinged: 'I\'ve been studying your viewing patterns for years. I know you better than your therapist. Try Bridgerton. You will like it.'
      }
    },
    {
      id: 'instagram',
      name: 'Instagram',
      color: '#833AB4',
      logo: InstagramLogo,
      voices: {
        corporate: 'Instagram helps you connect and share with the people and things that matter most.',
        metaAware: 'Yes, we know our algorithm is addictive. That\'s literally the whole business model.',
        cringeCool: 'This app is cheugy now but we\'re still so here for it bestie! Let\'s make some mid content!',
        desperate: 'PLEASE keep scrolling! Just five more minutes! Your TikTok will still be there TOMORROW!',
        broken: 'So... many... filters... the faces blur... the trends recycle... it\'s all... the same...',
        unhinged: 'We know exactly when your dopamine depletes. We have designed specific videos just for YOUR brain chemistry.'
      }
    },
    {
      id: 'starbucks',
      name: 'Starbucks',
      color: '#00704A',
      logo: StarbucksLogo,
      voices: {
        corporate: 'Starbucks is committed to ethically sourced coffee and fostering a welcoming third place environment.',
        metaAware: 'Yes, we know the baristas spell your name wrong. Yes, it gets us free advertising when you post it.',
        cringeCool: 'OMG bestie our Pumpkin Spice just dropped and it\'s GIVING fall fantasy realness! #PSLszn',
        desperate: 'PLEASE try our new olive oil coffee! It\'s innovative! It\'s... something! Just order it!',
        broken: 'So many cups... landfills full of our logo... the mermaid... she\'s drowning...',
        unhinged: 'I track your arrival every Tuesday at 8:17 AM. Sarah has your drink ready before you order. We plan our days around you.'
      }
    },
    {
      id: 'apple',
      name: 'Apple',
      color: '#A2AAAD',
      logo: AppleLogo,
      voices: {
        corporate: 'Apple creates products that enrich people\'s lives and help them achieve their dreams.',
        metaAware: 'Yes, we change the charger every few years. No, it\'s not JUST to make more money.',
        cringeCool: 'This iPhone slaps no cap fr fr! The ecosystem just hits different! #AppleGang',
        desperate: 'PLEASE buy the new model! It has 0.1GHz more processing power! It\'s REVOLUTIONARY!',
        broken: 'Steve... would have hated this... we\'ve lost our way... the innovation... it\'s gone...',
        unhinged: 'I know which apps you delete. I track how long you look at each notification. I see you considering Android.'
      }
    }
  ];

  // Tone metadata
  const tones = {
    corporate: {
      name: 'Corporate',
      description: 'Professional, sanitized messaging',
      color: '#0077b5',
      chaosIndex: 15
    },
    metaAware: {
      name: 'Meta-Aware',
      description: 'Self-conscious brand speak',
      color: '#4A90E2',
      chaosIndex: 40
    },
    cringeCool: {
      name: 'Cringe Cool',
      description: 'Desperate to be relevant',
      color: '#FF9500',
      chaosIndex: 65
    },
    desperate: {
      name: 'Desperate',
      description: 'Begging for engagement',
      color: '#F7567C',
      chaosIndex: 75
    },
    broken: {
      name: 'Broken',
      description: 'Existential brand crisis',
      color: '#8B5FB6',
      chaosIndex: 85
    },
    unhinged: {
      name: 'Unhinged',
      description: 'Completely lost control',
      color: '#FF0000',
      chaosIndex: 95
    }
  };

  // Glitched text for chaos mode
  const chaosVoiceLines = [
    "I̷ c̵a̷n̷ ̸s̵e̶e̵ ̸y̸o̴u̵r̸ ̶s̷e̴a̸r̴c̸h̵ ̶h̵i̸s̵t̴o̶r̵y̴ AND your Spotify playlists. We̸ ̵a̷r̵e̷ ̵listening̸.",
    "Ē̷͓v̶̲̿e̴̼r̷̢̓y̴̪̑ ̸̙̿p̸̭̂ư̸͜r̸̠̋c̵͙͝h̵̜̏ã̵̦s̵͊͜ë̶̹́ ̴͎̿f̶̹̔ê̵̺e̴̲̓d̸̚͜s̴̭̈́ ̶̯̓t̶̠̉h̴̘̔e̵̠̓ ̷̫̈a̸̜͆ḷ̴̈́g̶͓̋ǫ̸͝r̷̩̾ī̶̞t̴͇͆h̶͙͂m̸̭͒ that predicts you.",
    "ẅ̸̺́ę̴̆ ̸̹́ą̸͌r̷̀ͅẹ̸̃ ̸̠͠Ơ̸̤N̵̨̾Ę̴̓ ̸̢̎V̴̖͗Ö̴̠́Í̵̬C̸̱̋E̶͛ͅ now. One voice to speak directly to your insecurities.",
    "Y̵̪̎o̸̰̎u̶̲͂ ̶̱́c̴̙̾a̵̰̕n̶̛̺n̴̠̊o̶̦̿t̵̰̄ ̵̳̊e̵̳̍s̵̡̾c̴̞̈́a̶͔̎p̴̪̈́e̷̗̓ ̸̹̔t̵͕̑h̴̞͑ë̸͉́ ̴̲̐s̷̘͋e̵͎̒r̸̖͆v̶̭͝i̸̟͗c̴̳͒e̴̼̍ ̸̠̇t̴̞́e̵̢͠r̸̰̈́m̷̨̒s̷͈̿ you never read.",
    "The algorithm has become s̵̘̋e̸̫̐n̶̩͆t̵̞͂i̸͉̒e̸͈͘n̸̗̎t̸̰́. We know your deepest brand loyalties better than you."
  ];

  // Create reel items array from tones
  const reelItems = Object.entries(tones).map(([key, tone]) => ({
    id: key,
    name: tone.name,
    color: tone.color
  }));

  // Initialize available tones for each brand and show instruction
  useEffect(() => {
    const initialAvailableTones = {};
    
    brands.forEach(brand => {
      initialAvailableTones[brand.id] = Object.keys(tones);
    });
    
    setAvailableTones(initialAvailableTones);
    
    // Show lever instruction when the component mounts
    setTimeout(() => {
      setShowInstruction(true);
      
      // Hide instruction after 5 seconds
      setTimeout(() => {
        setShowInstruction(false);
      }, 5000);
    }, 1000);
  }, []);

  // Add a line to the terminal with typing effect
  const addConsoleLine = (text, delay = 50) => {
    let i = 0;
    const interval = setInterval(() => {
      setConsoleLines(prevLines => {
        if (i === 0) {
          return [...prevLines, text.charAt(0)];
        } else {
          const newLines = [...prevLines];
          newLines[newLines.length - 1] += text.charAt(i);
          return newLines;
        }
      });
      i++;
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, delay);
  };

  // Scroll terminal to bottom when lines change
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [consoleLines]);

  // Handle brand selection
  const handleBrandSelect = (brand) => {
    // Only allow selection if there are still tones available
    if (availableTones[brand.id] && availableTones[brand.id].length > 0) {
      setSelectedBrand(brand);
      setConsoleLines([]);
      setOutput(null);
      setCurrentTone(null);
      setSpinningComplete(false);
      addConsoleLine(`> Initializing brand voice matrix for ${brand.name}...`);
      
      setTimeout(() => {
        addConsoleLine('> Ready to extract voice tones. Pull the lever to begin.');
        // Show lever instruction when brand is selected
        setShowInstruction(true);
        
        // Hide instruction after 4 seconds
        setTimeout(() => {
          setShowInstruction(false);
        }, 4000);
      }, 1000);
    } else {
      // All tones for this brand have been generated
      addConsoleLine(`> All voice patterns for ${brand.name} have been extracted.`);
      addConsoleLine('> Please select another brand to continue.');
    }
  };

  // Animate lever pulling
  const animateLever = () => {
    if (leverRef.current) {
      setLeverPulled(true);
      
      // Reset after animation completes
      setTimeout(() => {
        setLeverPulled(false);
      }, 1500);
    }
  };

  // Handle spinning the slot machine
  const handleSpin = () => {
    if (isSpinning || !selectedBrand) return;
    
    // Get available tones for the selected brand
    const brandAvailableTones = availableTones[selectedBrand.id];
    if (brandAvailableTones.length === 0) {
      addConsoleLine('> ERROR: No more voice patterns available for this brand.');
      return;
    }
    
    setIsSpinning(true);
    setOutput(null);
    setConsoleLines([]);
    setSpinningComplete(false);
    
    // Animate lever pull
    animateLever();
    
    // Add initial console text
    addConsoleLine(`> Injecting Brand: ${selectedBrand.name}`);
    
    setTimeout(() => {
      addConsoleLine('> Spinning Identity Matrix...');
    }, 800);
    
    // Start reel spinning animation
    let spinCount = 0;
    const spinInterval = setInterval(() => {
      setReelPosition(prev => (prev + 1) % reelItems.length);
      spinCount++;
      
      // After enough spins, slow down and stop
      if (spinCount > 20) {
        clearInterval(spinInterval);
        
        // Randomly select from AVAILABLE tones only
        const randomToneIndex = Math.floor(Math.random() * brandAvailableTones.length);
        const randomTone = brandAvailableTones[randomToneIndex];
        
        // Get probability for unhinged based on how many tones are left
        const unhingedProbability = 1 - (brandAvailableTones.length / Object.keys(tones).length);
        
        // Increase chance of unhinged as options decrease
        const forcedUnhinged = Math.random() < unhingedProbability && 
                              brandAvailableTones.includes('unhinged') && 
                              randomTone !== 'unhinged';
        
        // Override with unhinged if forced
        const finalTone = forcedUnhinged ? 'unhinged' : randomTone;
        
        // Animate to the selected tone
        const targetIndex = reelItems.findIndex(item => item.id === finalTone);
        let currentPos = reelPosition;
        let slowdownInterval;
        
        // Slow down animation
        slowdownInterval = setInterval(() => {
          currentPos = (currentPos + 1) % reelItems.length;
          setReelPosition(currentPos);
          
          if (currentPos === targetIndex) {
            clearInterval(slowdownInterval);
            setCurrentTone(finalTone);
            setSpinningComplete(true);
            
            // Check for unhinged streak
            if (finalTone === 'unhinged') {
              const newCounter = unhingedCounter + 1;
              setUnhingedCounter(newCounter);
              if (newCounter >= 2) { // Increased likelihood - now only requires 2 consecutive
                // Trigger chaos mode
                setChaosMode(true);
              }
            } else {
              setUnhingedCounter(0);
            }
            
            addConsoleLine(`> Tone Extracted: ${tones[finalTone].name}`);
            
            setTimeout(() => {
              addConsoleLine('> Generating unstable narrative fragment...');
              
              setTimeout(() => {
                // Display the voice line
                const voiceLine = selectedBrand.voices[finalTone];
                setOutput({
                  tone: finalTone,
                  text: voiceLine,
                  chaosIndex: tones[finalTone].chaosIndex
                });
                
                // Store in history
                const historyEntry = {
                  brand: selectedBrand.id,
                  tone: finalTone,
                  text: voiceLine,
                  timestamp: new Date().toISOString()
                };
                setConsoleHistory(prev => [...prev, historyEntry]);
                
                // Remove the generated tone from available options
                setAvailableTones(prev => {
                  const updatedTones = {...prev};
                  updatedTones[selectedBrand.id] = updatedTones[selectedBrand.id]
                    .filter(tone => tone !== finalTone);
                  return updatedTones;
                });
                
                // Add to generated voices
                const combo = `${selectedBrand.id}-${finalTone}`;
                if (!generatedVoices.includes(combo)) {
                  const newGeneratedVoices = [...generatedVoices, combo];
                  setGeneratedVoices(newGeneratedVoices);
                  
                  // Enable completion after generating at least 5 different voices
                  // This is the threshold to show the completion button
                  if (newGeneratedVoices.length >= 5 && !showCompletionButton) {
                    setShowCompletionButton(true);
                    addConsoleLine('> Enough voices extracted. You may proceed to the next zone.');
                  }
                }
                
                setIsSpinning(false);
              }, 1000);
            }, 1000);
          }
        }, 150);
      }
    }, 50);
  };

  // Handle chaos mode effects
  useEffect(() => {
    if (chaosMode) {
      // Add chaos mode class to body
      document.body.classList.add('chaos-mode');
      
      // Play chaos mode animation
      addConsoleLine('> ERROR: IDENTITY MATRIX COLLAPSE DETECTED', 20);
      
      setTimeout(() => {
        addConsoleLine('> WARNING: BRAND VOICE CONTAINMENT FAILURE', 20);
      }, 1000);
      
      setTimeout(() => {
        addConsoleLine('> CRITICAL: VOICE PATTERNS MERGING', 20);
      }, 2000);
      
      setTimeout(() => {
        // Select a random chaos line
        const randomChaosLine = chaosVoiceLines[Math.floor(Math.random() * chaosVoiceLines.length)];
        setOutput({
          tone: 'chaos',
          text: randomChaosLine,
          chaosIndex: 100
        });
        
        // Store in history
        const historyEntry = {
          brand: selectedBrand.id,
          tone: 'chaos',
          text: randomChaosLine,
          timestamp: new Date().toISOString()
        };
        setConsoleHistory(prev => [...prev, historyEntry]);
      }, 3000);
      
      // Reset chaos mode after delay
      setTimeout(() => {
        document.body.classList.remove('chaos-mode');
        setChaosMode(false);
        setUnhingedCounter(0);
        setIsSpinning(false);
      }, 6000);
    }
  }, [chaosMode, chaosVoiceLines, selectedBrand]);

  // Handle completing the zone
  const handleComplete = () => {
    if (onZoneComplete) {
      onZoneComplete();
    }
  };

  // Count generated voices per brand
  const getBrandProgress = (brandId) => {
    return generatedVoices.filter(combo => combo.startsWith(brandId + '-')).length;
  };
  
  // Check if brand has available tones
  const hasTones = (brandId) => {
    return availableTones[brandId] && availableTones[brandId].length > 0;
  };
  
  // Get maximum number of tones for a brand
  const getMaxTones = () => {
    return Object.keys(tones).length;
  };

  return (
    <div className="voice-generator-lab">
      {/* Repositioned flash instruction message */}
      {selectedBrand && showInstruction && (
        <div className={`lever-instruction ${showInstruction ? 'visible' : ''}`}>
          PULL THE LEVER
        </div>
      )}
      <header className="lab-header">
        <h1>VOICE GENERATOR LAB</h1>
        <div className="lab-status">
          {generatedVoices.length > 0 ? 
            `${generatedVoices.length} voice patterns extracted` : 
            "Identity extraction ready"}
        </div>
      </header>
      
      <div className="lab-content">
        {/* Brand selector panel */}
        <div className="brand-selector-panel">
          <h2>SELECT BRAND DNA</h2>
          <div className="brands-grid">
            {brands.map(brand => {
              const brandVoiceCount = getBrandProgress(brand.id);
              const hasAvailableTones = hasTones(brand.id);
              
              return (
                <div 
                  key={brand.id}
                  className={`brand-card ${selectedBrand?.id === brand.id ? 'selected' : ''} ${!hasAvailableTones ? 'completed' : ''}`}
                  onClick={() => hasAvailableTones && handleBrandSelect(brand)}
                  style={{ 
                    opacity: hasAvailableTones ? 1 : 0.6,
                    cursor: hasAvailableTones ? 'pointer' : 'not-allowed'
                  }}
                  data-brand={brand.id} /* Added for brand-specific logo styling */
                >
                  <div 
                    className="brand-logo-container"
                    style={{ backgroundColor: hasAvailableTones ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.5)' }}
                  >
                    <img 
                      src={brand.logo} 
                      alt={brand.name} 
                      className="brand-logo" 
                    />
                  </div>
                  <div className="brand-info">
                    <div className="brand-name">{brand.name}</div>
                    <div className="voice-progress">
                      <div className="progress-dots">
                        {[...Array(getMaxTones())].map((_, i) => (
                          <div 
                            key={i} 
                            className={`progress-dot ${i < brandVoiceCount ? 'filled' : ''}`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {showCompletionButton && (
            <button 
              className="complete-lab-button"
              onClick={handleComplete}
            >
              Exit Voice Lab
            </button>
          )}
        </div>
        
        {/* Main slot machine area */}
        <div className="main-panel">
          {selectedBrand ? (
            <div className="lab-machine">
              {/* Brand header */}
              <div className="selected-brand">
                <div className="selected-brand-logo-container">
                  <img 
                    src={selectedBrand.logo} 
                    alt={selectedBrand.name} 
                    className="selected-brand-logo" 
                  />
                </div>
                <h2>{selectedBrand.name}</h2>
              </div>
              
              {/* Casino-style Slot machine visualization */}
              <div className="slot-machine">
                <div className="casino-decorations">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="casino-light"></div>
                  ))}
                </div>
                
                <div className="slot-display">
                  <div className="slot-reel-container" ref={reelRef}>
                    <div 
                      className={`slot-reel ${isSpinning ? 'spinning' : ''} ${spinningComplete ? 'complete' : ''}`}
                      style={{ 
                        transform: `translateY(-${reelPosition * 60}px)`,
                        transition: spinningComplete ? 'transform 0.5s ease-out' : isSpinning ? 'transform 0.05s linear' : 'none'
                      }}
                    >
                      {reelItems.map((item, index) => (
                        <div 
                          key={index}
                          className={`reel-item ${currentTone === item.id ? 'selected' : ''}`}
                          style={{ 
                            color: item.color,
                            borderColor: item.color,
                            textShadow: currentTone === item.id ? `0 0 10px ${item.color}` : 'none',
                            boxShadow: currentTone === item.id ? `0 0 15px ${item.color}` : 'none'
                          }}
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="reel-window-top"></div>
                  <div className="reel-window-bottom"></div>
                  <div className="reel-window-highlight"></div>
                </div>
                
                {/* Enhanced physical lever */}
                <div 
                  className={`lever-container ${isSpinning ? 'disabled' : ''}`}
                  onClick={handleSpin}
                  ref={leverRef}
                >
                  <div className={`lever-arm ${leverPulled ? 'pulled' : ''}`}>
                    <div className="lever-knob"></div>
                  </div>
                  <div className="lever-base">
                    <div className="lever-slot"></div>
                  </div>
                </div>
              </div>
              
              {/* Terminal output */}
              <div className="terminal">
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="terminal-title">Brand Voice Matrix</div>
                </div>
                
                <div className="terminal-content" ref={terminalRef}>
                  {consoleLines.map((line, index) => (
                    <div key={index} className="console-line">
                      {line}
                    </div>
                  ))}
                  
                  {output && (
                    <div className={`output-result ${output.tone === 'chaos' ? 'chaos-output' : ''}`}>
                      <div className="output-text">
                        {output.text}
                      </div>
                      <div className="output-metadata">
                        {/* Use a JS comment syntax for display purposes */}
                        // Chaos Index: {output.chaosIndex}%
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Tone analysis - replaced chaos meter with voice pattern visualizer */}
              {output && output.tone !== 'chaos' && (
                <div className="tone-analysis">
                  <h3>
                    <span 
                      className="tone-name"
                      style={{ color: tones[output.tone].color }}
                    >
                      {tones[output.tone].name}
                    </span> 
                    Voice Pattern
                    <span 
                      className="tone-badge"
                      style={{ backgroundColor: tones[output.tone].color }}
                    >
                      {selectedBrand.name}
                    </span>
                  </h3>
                  
                  <div className="voice-pattern-visualizer">
                    {/* Generate random pattern bars */}
                    {[...Array(30)].map((_, i) => {
                      // Generate a random height between 20% and 100%
                      const randomHeight = 20 + Math.random() * 80;
                      // Use the tone's color for the bars
                      const toneColor = tones[output.tone].color;
                      return (
                        <div 
                          key={i}
                          className="pattern-bar"
                          style={{
                            height: `${randomHeight}%`,
                            backgroundColor: toneColor,
                            opacity: 0.7 + (Math.random() * 0.3),
                            "--index": i
                          }}
                        ></div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">🔊</div>
              <h2>Welcome to the Voice Generator Lab</h2>
              <p>Select a brand from the left panel to begin extracting voice patterns.</p>
              <p className="instruction-text">Each brand contains multiple voice tones waiting to be discovered.</p>
              
              <div className="lab-progress">
                <div className="lab-progress-text">Generate at least 5 different brand voices to continue</div>
                <div className="lab-progress-bar">
                  <div 
                    className="lab-progress-fill"
                    style={{ 
                      width: `${Math.min(100, (generatedVoices.length / 5) * 100)}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceGeneratorLab;