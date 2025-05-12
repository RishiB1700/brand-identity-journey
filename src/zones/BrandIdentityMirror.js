import React, { useState, useEffect, useRef } from 'react';
import './BrandIdentityMirror.css';

const BrandIdentityMirror = ({ onZoneComplete }) => {
  // Game state - simplified for stability
  const [gameState, setGameState] = useState({
    gameStarted: false,
    currentRound: 0,
    score: 0,
    selectedBrand: null,
    showFeedback: false,
    isCorrect: false,
    roundsCompleted: [],
    feedbackMessage: '',
    showingAnswer: false,
    currentOptions: [],
    lockInteraction: false // Used to prevent multiple interactions
  });
  
  const [bgShapes, setBgShapes] = useState([]); // Background decoration shapes
  const timeoutsRef = useRef([]); // Keep track of all timeouts
  const brandOptionsRef = useRef(null);
  const gameScreenRef = useRef(null);
  
  // Map of logo paths
  const logoMap = {
    adobe: `${process.env.PUBLIC_URL}/images/Logos/Adobe.png`,
    apple: `${process.env.PUBLIC_URL}/images/Logos/Apple.png`,
    barbie: `${process.env.PUBLIC_URL}/images/Logos/Barbie-Logo,png.png`,
    burgerking: `${process.env.PUBLIC_URL}/images/Logos/Burger King.png`,
    delta: `${process.env.PUBLIC_URL}/images/Logos/Delta.png`,
    instagram: `${process.env.PUBLIC_URL}/images/Logos/instagram.png`,
    netflix: `${process.env.PUBLIC_URL}/images/Logos/Netflix Logo.png`,
    nike: `${process.env.PUBLIC_URL}/images/Logos/Nike.png`,
    oldspice: `${process.env.PUBLIC_URL}/images/Logos/Old spice logo.png`,
    pepsi: `${process.env.PUBLIC_URL}/images/Logos/Pepsi.png`,
    rei: `${process.env.PUBLIC_URL}/images/Logos/REI.png`,
    skittles: `${process.env.PUBLIC_URL}/images/Logos/Skittles.png`,
    spotify: `${process.env.PUBLIC_URL}/images/Logos/Spotify,png.png`,
    tacobell: `${process.env.PUBLIC_URL}/images/Logos/Taco_Bell_2016.png`,
    twitter: `${process.env.PUBLIC_URL}/images/Logos/Twitter.png`,
    wendys: `${process.env.PUBLIC_URL}/images/Logos/Wendys-Logo.png`,
    duolingo: `${process.env.PUBLIC_URL}/images/Logos/duolingo.png`,
    starbucks: `${process.env.PUBLIC_URL}/images/Logos/Starbucks.png`,
    amazon: `${process.env.PUBLIC_URL}/images/Logos/Amazon.png`,
    facebook: `${process.env.PUBLIC_URL}/images/Logos/facebook.png`,
    hulu: `${process.env.PUBLIC_URL}/images/Logos/Hulu.png`,
    ikea: `${process.env.PUBLIC_URL}/images/Logos/Ikea.png`,
    linkedin: `${process.env.PUBLIC_URL}/images/Logos/Linkedin.png`,
    mcdonalds: `${process.env.PUBLIC_URL}/images/Logos/Mcdonalds.png`,
    peloton: `${process.env.PUBLIC_URL}/images/Logos/Peloton.png`,
    sephora: `${process.env.PUBLIC_URL}/images/Logos/Sephora.png`,
    snapchat: `${process.env.PUBLIC_URL}/images/Logos/Snpachat.png`,
    target: `${process.env.PUBLIC_URL}/images/Logos/Target.png`,
    tiktok: `${process.env.PUBLIC_URL}/images/Logos/Tiktok.png`,
    tinder: `${process.env.PUBLIC_URL}/images/Logos/tinder.png`,
    walmart: `${process.env.PUBLIC_URL}/images/Logos/Walmart.png`,
    youtube: `${process.env.PUBLIC_URL}/images/Logos/Youtube.png`
  };

  // Game data - Quotes and their real brands
  const rounds = [
    {
      id: 1,
      quote: "Your attention is our most valuable asset. We're not interrupting your day—we're becoming it.",
      realBrand: "tiktok",
      disguisedAs: "linkedin",
      feedback: {
        correct: "Yes! That's actually TikTok pretending to be LinkedIn. The 'attention as asset' mindset is pure TikTok.",
        incorrect: "That was TikTok in a business suit. LinkedIn would never admit it wants your attention that badly."
      }
    },
    {
      id: 2,
      quote: "Feeling inadequate yet? Our products are designed to create problems you didn't know you had.",
      realBrand: "apple",
      disguisedAs: "amazon",
      feedback: {
        correct: "Correct! That's Apple masquerading as Amazon. Only Apple has mastered making you feel behind if you don't upgrade.",
        incorrect: "That was Apple wearing Amazon's clothes. They're experts at creating needs through subtle inadequacy."
      }
    },
    {
      id: 3,
      quote: "We're deeply committed to sustainability efforts that don't actually impact our bottom line.",
      realBrand: "starbucks",
      disguisedAs: "nike",
      feedback: {
        correct: "You got it! That's Starbucks pretending to be Nike. Those green initiatives sound nice until you count the cups.",
        incorrect: "That was Starbucks in athletic wear. Those plastic lids aren't going to recycle themselves."
      }
    },
    {
      id: 4,
      quote: "Our algorithm knows you better than your therapist, and costs about the same monthly.",
      realBrand: "netflix",
      disguisedAs: "spotify",
      feedback: {
        correct: "Correct! That's Netflix wearing Spotify's headphones. The therapy comparison gives away their recommendation engine swagger.",
        incorrect: "That was Netflix pretending to be Spotify. Both claim to know you deeply, but only one charges you to show you the same things repeatedly."
      }
    },
    {
      id: 5,
      quote: "Come for the impulse purchase. Stay for the existential dread of accumulated stuff.",
      realBrand: "amazon",
      disguisedAs: "target",
      feedback: {
        correct: "You nailed it! That's Amazon dressed as Target. The existential dread of accumulated Prime packages is the giveaway.",
        incorrect: "That was Amazon wearing a Target name badge. The 'impulse purchase into existential dread' pipeline is their specialty."
      }
    },
    {
      id: 6,
      quote: "We turned basic human interaction into content. You're welcome and we're sorry.",
      realBrand: "instagram",
      disguisedAs: "tinder",
      feedback: {
        correct: "Right! That's Instagram swiping right as Tinder. The 'human interaction as content' model is pure Instagram philosophy.",
        incorrect: "That was Instagram in Tinder's dating clothes. Both monetize social connection, but Instagram perfected making it a performance."
      }
    }
  ];
  
  // Enhanced brand data with IMPROVED colors for visibility
  const brands = {
    facebook: { name: "Facebook", color: "#1877F2", icon: "👍", bgColor: "#ffffff" },
    tiktok: { name: "TikTok", color: "#FF0050", icon: "📱", bgColor: "#ffffff" }, // Brighter color for TikTok
    linkedin: { name: "LinkedIn", color: "#0077B5", icon: "👔", bgColor: "#ffffff" },
    instagram: { name: "Instagram", color: "#C13584", icon: "📸", bgColor: "#ffffff" },
    apple: { name: "Apple", color: "#A2AAAD", icon: "🍎", bgColor: "#ffffff" },
    sephora: { name: "Sephora", color: "#FF3399", icon: "💄", bgColor: "#ffffff" },
    peloton: { name: "Peloton", color: "#181A1C", icon: "🚲", bgColor: "#ffffff" },
    amazon: { name: "Amazon", color: "#FF9900", icon: "📦", bgColor: "#ffffff" },
    mcdonalds: { name: "McDonald's", color: "#FFC72C", icon: "🍔", bgColor: "#ffffff" },
    starbucks: { name: "Starbucks", color: "#00704A", icon: "☕", bgColor: "#ffffff" },
    nike: { name: "Nike", color: "#4D99E7", icon: "👟", bgColor: "#ffffff" }, // Changed to blue for Nike
    rei: { name: "REI", color: "#4CBB17", icon: "🏔️", bgColor: "#ffffff" },
    netflix: { name: "Netflix", color: "#E50914", icon: "🎬", bgColor: "#ffffff" }, // Changed bg to white
    spotify: { name: "Spotify", color: "#1DB954", icon: "🎵", bgColor: "#ffffff" }, // Changed bg to white
    hulu: { name: "Hulu", color: "#3DBB3D", icon: "📺", bgColor: "#ffffff" }, // Changed bg to white
    youtube: { name: "YouTube", color: "#FF0000", icon: "▶️", bgColor: "#ffffff" },
    ikea: { name: "IKEA", color: "#0051BA", icon: "🛋️", bgColor: "#ffff00" },
    target: { name: "Target", color: "#CC0000", icon: "🎯", bgColor: "#ffffff" },
    walmart: { name: "Walmart", color: "#0071CE", icon: "🛒", bgColor: "#ffffff" },
    twitter: { name: "Twitter", color: "#1DA1F2", icon: "🐦", bgColor: "#ffffff" },
    snapchat: { name: "Snapchat", color: "#FFFC00", icon: "👻", bgColor: "#000000" },
    tinder: { name: "Tinder", color: "#FE3C72", icon: "❤️", bgColor: "#ffffff" },
    burgerking: { name: "Burger King", color: "#D62300", icon: "👑", bgColor: "#ffffff" },
    tacobell: { name: "Taco Bell", color: "#702082", icon: "🌮", bgColor: "#ffffff" },
    wendys: { name: "Wendy's", color: "#e2231a", icon: "🍔", bgColor: "#ffffff" },
    duolingo: { name: "Duolingo", color: "#58cc02", icon: "🦉", bgColor: "#ffffff" }
  };

  // Clean up all timeouts when component unmounts
  useEffect(() => {
    return () => {
      // Clear all timeouts
      timeoutsRef.current.forEach(id => clearTimeout(id));
    };
  }, []);

  // Create background decorative elements
  useEffect(() => {
    // Generate random shapes for background decoration
    const generateBgShapes = () => {
      const shapes = [];
      // Brand colors array for random selection
      const brandColors = Object.values(brands).map(brand => brand.color);
      
      // Generate 15 random shapes
      for (let i = 0; i < 15; i++) {
        const type = Math.random() > 0.5 ? 'circle' : 'square';
        const color = brandColors[Math.floor(Math.random() * brandColors.length)];
        const size = 10 + Math.random() * 40; // 10-50px
        const left = Math.random() * 100; // 0-100%
        const top = Math.random() * 100; // 0-100%
        const opacity = 0.05 + Math.random() * 0.1; // 0.05-0.15 opacity
        const animationDuration = 20 + Math.random() * 40; // 20-60s
        const animationDelay = Math.random() * -20; // -20-0s
        
        shapes.push({
          type,
          color,
          size,
          left,
          top,
          opacity,
          animationDuration,
          animationDelay
        });
      }
      
      return shapes;
    };
    
    setBgShapes(generateBgShapes());
  }, []);

  // Enhanced styling to improve visibility and add playful elements
  useEffect(() => {
    // Add custom styles for better visibility and design
    const style = document.createElement('style');
    style.textContent = `
      /* Set full height and enhanced background */
      html, body, #root, .app-container {
        min-height: 100vh;
        height: 100%;
        background-color: #0a0a14 !important;
      }
      
      /* Ensure brandmasquerade container fills entire view with enhanced bg */
      .brandmasquerade {
        min-height: 100vh;
        background-color: #0a0a14;
        background-image: 
          radial-gradient(circle at 25% 25%, rgba(138, 43, 226, 0.15) 0%, rgba(10, 10, 20, 0) 70%),
          radial-gradient(circle at 75% 75%, rgba(70, 130, 180, 0.15) 0%, rgba(10, 10, 20, 0) 70%);
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      
      /* Subtle grid pattern overlay */
      .brandmasquerade::after {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: 
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
        background-size: 30px 30px;
        pointer-events: none;
        z-index: 0;
      }
      
      /* Ensure content has proper background */
      .brandmasquerade-content {
        flex: 1;
        background-color: transparent;
        min-height: 0;
        position: relative;
        z-index: 1;
      }
      
      /* Enhanced game screen */
      .game-screen {
        width: 100%;
        background-color: transparent;
        padding-bottom: 50px;
      }
      
      /* Enhanced quote card with subtle glow */
      .quote-card {
        background-color: rgba(15, 15, 25, 0.8);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(138, 43, 226, 0.2);
        backdrop-filter: blur(5px);
      }
      
      /* Fixed brand options grid */
      .brand-options {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        margin: 0 auto;
        max-width: 800px;
      }
      
      /* Enhanced brand option cards - IMPORTANT improved for visibility */
      .brand-option {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgba(15, 15, 25, 0.8);
        border-radius: 8px;
        padding: 15px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        border: 2px solid transparent;
        position: relative;
        overflow: hidden;
      }
      
      /* Enhanced brand icon containers for better visibility */
      .brand-icon-container {
        width: 70px;
        height: 70px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white !important;
        padding: 8px;
        margin-bottom: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        position: relative;
        z-index: 2;
      }
      
      /* Improved brand name visibility */
      .brand-name {
        font-size: 1.1rem;
        font-weight: 600;
        text-align: center;
        color: white !important;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        position: relative;
        z-index: 2;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  // Generate options for current round
  const generateOptionsForRound = (roundIndex) => {
    if (roundIndex < 0 || roundIndex >= rounds.length) return [];
    
    const roundData = rounds[roundIndex];
    
    // Always include the real brand
    const options = [roundData.realBrand];
    
    // Get all available brands except the real brand and disguised brand
    const availableBrands = Object.keys(brands).filter(
      id => id !== roundData.realBrand && id !== roundData.disguisedAs
    );
    
    // Shuffle available brands
    const shuffled = availableBrands.sort(() => 0.5 - Math.random());
    
    // Take first 3 to make a total of 4 options
    const additionalOptions = shuffled.slice(0, 3);
    
    // Combine and shuffle final options
    return [...options, ...additionalOptions].sort(() => 0.5 - Math.random());
  };

  // Get brand logo or icon fallback
  const getBrandImage = (brandId) => {
    if (logoMap[brandId]) {
      return logoMap[brandId];
    }
    return null;
  };

  // Set up current round when the round changes
  useEffect(() => {
    // Only run this effect when the game has started and we're not at the end
    if (gameState.gameStarted && gameState.currentRound < rounds.length) {
      console.log("Setting up round:", gameState.currentRound + 1);
      
      // Generate fresh options for this round
      const options = generateOptionsForRound(gameState.currentRound);
      
      // Update game state for new round
      setGameState(prevState => ({
        ...prevState,
        currentOptions: options,
        selectedBrand: null,
        showFeedback: false,
        showingAnswer: false,
        lockInteraction: false
      }));
      
      // Force scroll to top
      window.scrollTo(0, 0);
    }
  }, [gameState.gameStarted, gameState.currentRound]);

  // Start game handler - simplified to update all state at once
  const startGame = () => {
    setGameState({
      gameStarted: true,
      currentRound: 0,
      score: 0,
      selectedBrand: null,
      showFeedback: false,
      isCorrect: false,
      roundsCompleted: [],
      feedbackMessage: '',
      showingAnswer: false,
      currentOptions: generateOptionsForRound(0),
      lockInteraction: false
    });
  };

  // Handle brand selection - Simplified with atomic state update
  const handleBrandSelect = (brandId) => {
    // Prevent selection during feedback or when locked
    if (gameState.showFeedback || gameState.lockInteraction) return;
    
    console.log("Selected brand:", brandId);
    
    // Safety check for current round
    if (gameState.currentRound >= rounds.length) {
      console.error("Invalid round:", gameState.currentRound);
      return;
    }
    
    const currentRoundData = rounds[gameState.currentRound];
    const correct = brandId === currentRoundData.realBrand;
    const feedbackMessage = correct 
      ? currentRoundData.feedback.correct 
      : currentRoundData.feedback.incorrect;
    
    // Update game state with selection result - all at once to prevent glitches
    setGameState(prevState => ({
      ...prevState,
      selectedBrand: brandId,
      showFeedback: true,
      isCorrect: correct,
      score: correct ? prevState.score + 1 : prevState.score,
      feedbackMessage: feedbackMessage,
      lockInteraction: true
    }));
    
    // After 2 seconds, show the answer
    const showAnswerTimer = setTimeout(() => {
      setGameState(prevState => ({
        ...prevState,
        showingAnswer: true
      }));
      
      // After 5 more seconds (7 total), advance to next round or complete
      const advanceTimer = setTimeout(() => {
        advanceToNextRound();
      }, 5000);
      
      // Keep track of the timeout to clear it later if needed
      timeoutsRef.current.push(advanceTimer);
    }, 2000);
    
    // Keep track of the timeout to clear it later if needed
    timeoutsRef.current.push(showAnswerTimer);
  };

  // Advance to next round - Simplified with atomic state update
  const advanceToNextRound = () => {
    console.log("Advancing to next round");
    
    // Clear all existing timeouts
    timeoutsRef.current.forEach(id => clearTimeout(id));
    timeoutsRef.current = [];
    
    // Get current round data
    if (gameState.currentRound >= 0 && gameState.currentRound < rounds.length) {
      const currentRoundData = rounds[gameState.currentRound];
      const newCompletedRounds = [...gameState.roundsCompleted, currentRoundData.id];
      
      if (gameState.currentRound < rounds.length - 1) {
        // Move to next round
        const nextRound = gameState.currentRound + 1;
        console.log(`Moving from round ${gameState.currentRound + 1} to ${nextRound + 1}`);
        
        // Update all state at once
        setGameState(prevState => ({
          ...prevState,
          currentRound: nextRound,
          roundsCompleted: newCompletedRounds,
          selectedBrand: null,
          showFeedback: false,
          showingAnswer: false,
          lockInteraction: false,
          currentOptions: generateOptionsForRound(nextRound)
        }));
      } else {
        // Game complete, call onZoneComplete
        console.log("Game complete, calling onZoneComplete");
        if (onZoneComplete) {
          onZoneComplete();
        }
      }
    }
  };

  // Handle manual advancement when clicking anywhere
  const handleManualAdvance = () => {
    // Only allow manual advancement when feedback is showing
    if (gameState.showFeedback) {
      advanceToNextRound();
    }
  };

  // Safely get current round data
  const getCurrentRoundData = () => {
    if (gameState.currentRound >= 0 && gameState.currentRound < rounds.length) {
      return rounds[gameState.currentRound];
    }
    
    // Default fallback
    return {
      id: 0,
      quote: "Loading...",
      realBrand: "tiktok",
      disguisedAs: "linkedin",
      feedback: {
        correct: "",
        incorrect: ""
      }
    };
  };

  // Get current round data safely
  const currentRoundData = getCurrentRoundData();

  return (
    <div className="brandmasquerade">
      {/* Background decorative shapes */}
      {bgShapes.map((shape, index) => (
        <div
          key={index}
          className={`bg-shape ${shape.type}`}
          style={{
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            backgroundColor: shape.color,
            left: `${shape.left}%`,
            top: `${shape.top}%`,
            opacity: shape.opacity,
            animationDuration: `${shape.animationDuration}s`,
            animationDelay: `${shape.animationDelay}s`
          }}
        />
      ))}
      
      <header className="brandmasquerade-header">
        <h1>Brandmasquerade: Guess Who I Am</h1>
        <div className="header-subtitle">
          Can you identify the true voice behind the mask?
        </div>
      </header>
      
      <main className="brandmasquerade-content">
        {!gameState.gameStarted ? (
          <div className="intro-screen">
            <div className="intro-mask">🎭</div>
            <h2>Welcome to the Brandmasquerade</h2>
            <p>
              Brands are masters of disguise, often adopting the voices of others to appeal to new audiences.
            </p>
            <p>
              In this game, you'll see quotes from brands pretending to be someone they're not.
              Can you identify who's really speaking behind the mask?
            </p>
            <button className="start-button" onClick={startGame}>
              Start The Game
            </button>
          </div>
        ) : (
          <div 
            className="game-screen" 
            ref={gameScreenRef}
            onClick={handleManualAdvance} // Enable manual advance on click
          >
            <div className="game-progress">
              <div className="round-indicator">
                Round {gameState.currentRound + 1} of {rounds.length}
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${(gameState.roundsCompleted.length / rounds.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="quote-card-container">
              <div 
                className={`quote-card ${gameState.showFeedback ? (gameState.isCorrect ? 'correct' : 'incorrect') : ''}`}
                style={{
                  borderColor: gameState.showingAnswer ? 
                    brands[currentRoundData.realBrand].color : 
                    gameState.showFeedback ? 
                      (gameState.isCorrect ? '#4CBB17' : '#e53935') : 
                      brands[currentRoundData.disguisedAs].color
                }}
              >
                <div 
                  className="disguise-marker"
                  style={{
                    backgroundColor: gameState.showingAnswer ? 
                      brands[currentRoundData.realBrand].color : 
                      brands[currentRoundData.disguisedAs].color
                  }}
                >
                  <span className="disguise-icon">
                    {gameState.showingAnswer ? 
                      brands[currentRoundData.realBrand].icon : 
                      brands[currentRoundData.disguisedAs].icon}
                  </span>
                  <span className="disguise-name">
                    {gameState.showingAnswer ? 
                      `Actually ${brands[currentRoundData.realBrand].name}` : 
                      `Sounds like ${brands[currentRoundData.disguisedAs].name}`}
                  </span>
                </div>
                <div className="quote-text">"{currentRoundData.quote}"</div>
                {gameState.showFeedback && (
                  <div className="feedback-message">
                    {gameState.feedbackMessage}
                  </div>
                )}
              </div>
            </div>
            
            {/* Brand selection area */}
            <div className="brands-selection">
              <div className="selection-prompt">
                {gameState.showFeedback ? 
                  (gameState.isCorrect ? "Correct! Well done." : "Not quite right.") : 
                  "Who is really speaking?"}
              </div>
              
              {/* Brand options with explicit grid layout */}
              <div className="brand-options" ref={brandOptionsRef}>
                {gameState.currentOptions.map((brandId) => {
                  // Convert the brand color to RGB for CSS variables
                  const hexToRgb = (hex) => {
                    let r = 0, g = 0, b = 0;
                    // 3 digits
                    if (hex.length === 4) {
                      r = parseInt(hex[1] + hex[1], 16);
                      g = parseInt(hex[2] + hex[2], 16);
                      b = parseInt(hex[3] + hex[3], 16);
                    // 6 digits
                    } else if (hex.length === 7) {
                      r = parseInt(hex.slice(1, 3), 16);
                      g = parseInt(hex.slice(3, 5), 16);
                      b = parseInt(hex.slice(5, 7), 16);
                    }
                    return `${r}, ${g}, ${b}`;
                  };
                  
                  const brandColor = brands[brandId].color;
                  const brandColorRgb = hexToRgb(brandColor);
                  
                  return (
                    <div 
                      key={brandId}
                      className={`brand-option ${gameState.selectedBrand === brandId ? 'selected' : ''} ${
                        gameState.showingAnswer ? 
                          (brandId === currentRoundData.realBrand ? 'real-brand' : '') : 
                          ''
                      }`}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the game-screen click
                        if (!gameState.showFeedback && !gameState.lockInteraction) {
                          handleBrandSelect(brandId);
                        }
                      }}
                      style={{
                        borderColor: gameState.selectedBrand === brandId && gameState.showFeedback ? 
                          (gameState.isCorrect ? '#4CBB17' : '#e53935') : 
                          brands[brandId].color,
                        boxShadow: `0 5px 15px rgba(0, 0, 0, 0.3), 0 0 10px rgba(${brandColorRgb}, 0.2)`,
                        '--brand-color-rgb': brandColorRgb // CSS variable for hover effects
                      }}
                    >
                      <div 
                        className="brand-icon-container"
                        style={{ 
                          backgroundColor: '#ffffff', // Force white background for ALL logos
                          borderColor: brands[brandId].color
                        }}
                      >
                        {getBrandImage(brandId) ? (
                          <img 
                            src={getBrandImage(brandId)} 
                            alt={brands[brandId].name} 
                            className="brand-icon-image"
                          />
                        ) : (
                          <div className="brand-icon" style={{ color: brands[brandId].color }}>
                            {brands[brandId].icon}
                          </div>
                        )}
                      </div>
                      <div className="brand-name">{brands[brandId].name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Click guidance during feedback state */}
            {gameState.showFeedback && (
              <div className="click-to-continue" style={{
                textAlign: 'center',
                marginTop: '20px',
                color: 'rgba(255,255,255,0.7)',
                fontStyle: 'italic'
              }}>
                Click anywhere to continue
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default BrandIdentityMirror;