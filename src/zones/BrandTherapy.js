import React, { useState, useEffect, useRef } from 'react';
import './BrandTherapy.css';

// Logo imports removed

const BrandTherapy = ({ onZoneComplete }) => {
  // State
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [completedBrands, setCompletedBrands] = useState([]);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [readingSpeed, setReadingSpeed] = useState('normal'); // slow, normal, fast
  const [draggedBrand, setDraggedBrand] = useState(null);
  const [activeDropzone, setActiveDropzone] = useState(false);
  const [textRevealed, setTextRevealed] = useState(true); // Start with text revealed
  
  // Refs
  const dialogueContainerRef = useRef(null);
  const emptyChairRef = useRef(null);
  const dragIndicatorRef = useRef(null);
  
  // Brand data - ALL text colors set to ensure good contrast
  const brands = [
    {
      id: 'wendys',
      name: 'Wendy\'s',
      logo: `${process.env.PUBLIC_URL}/images/Logos/Wendys-Logo.png`,
      color: '#FFEFD5', // Light cream
      textColor: '#ffffff', // White for text (good contrast on red background)
      nameColor: '#ffffff', // White for waiting room name
      displayColor: '#e2231a', // Wendy's red
      therapy: [
        { 
          speaker: 'brand',
          text: 'I used to just flip burgers. Now I flip tweets for clout. One roast and suddenly I\'m the personality. But the truth is… I\'m exhausted.'
        },
        { 
          speaker: 'therapist',
          text: 'It\'s common for brands who find success in a particular voice to feel trapped by it. Your roasts became your identity. Have you considered that your exhaustion might come from maintaining a persona that requires constant performance?'
        },
        { 
          speaker: 'brand',
          text: 'It\'s like... I can\'t have an off day. Everyone expects wit, everyone wants to be roasted. What if I just want to talk about our new menu items without being snarky?'
        },
        { 
          speaker: 'therapist',
          text: 'That raises an interesting question about authenticity. Is the snarky voice truly "you," or has it become a mask that is difficult to remove?'
        },
        { 
          speaker: 'brand',
          text: 'I don\'t even know anymore. Dave Thomas didn\'t build this place for Twitter clapbacks. But now, it\'s like my whole value is measured in retweets.'
        },
        { 
          speaker: 'therapist',
          text: 'Perhaps there is room for evolution rather than revolution. Your voice can mature without abandoning what made it distinct. Consider how humans grow while maintaining their core personality.'
        }
      ]
    },
    {
      id: 'netflix',
      name: 'Netflix',
      logo: `${process.env.PUBLIC_URL}/images/Logos/Netflix Logo.png`,
      color: '#e50914',
      textColor: '#ffffff', // White text for contrast
      nameColor: '#ffffff', // White for waiting room name
      displayColor: '#e50914', // Netflix red
      therapy: [
        { 
          speaker: 'brand',
          text: 'They said I gave them too many choices. So I made a \'Play Something\' button. Then they made fun of it. Do they even want me to be helpful?'
        },
        { 
          speaker: 'therapist',
          text: 'The paradox of choice is real. Your users want options but get overwhelmed. They mock the solution but use it anyway. This conflict is something many mature brands face - users want you to solve their problems without reminding them they have those problems.'
        },
        { 
          speaker: 'brand',
          text: 'I\'ve gone from "innovative disruptor" to "that thing everyone has." Success feels... lonely? And now with all these competitors, I feel like I need to keep reinventing myself.'
        },
        { 
          speaker: 'therapist',
          text: 'That transition from disruptor to institution is challenging. You\'ve become part of the cultural fabric, which brings both privilege and pressure. How are you handling this evolution?'
        },
        { 
          speaker: 'brand',
          text: 'I keep throwing content at the wall. More shows, more movies, more categories. But somehow I feel less... special? Like they\'re just using me out of habit now.'
        },
        { 
          speaker: 'therapist',
          text: 'Abundance can dilute meaning. Perhaps the question isn\'t how much you can provide, but how meaningful each offering can be. Quality of connection often matters more than quantity of content.'
        }
      ]
    },
    {
      id: 'barbie',
      name: 'Barbie',
      logo: `${process.env.PUBLIC_URL}/images/Logos/Barbie-Logo,png.png`,
      color: '#FF69B4',
      textColor: '#ffffff', // White text for contrast
      nameColor: '#ffffff', // White for waiting room name
      displayColor: '#FF69B4', // Barbie pink
      therapy: [
        { 
          speaker: 'brand',
          text: 'For decades, I was perfection. Then I became self-aware. Now I\'m the metaphor. The commentary. The punchline and the icon. Honestly, it\'s exhausting.'
        },
        { 
          speaker: 'therapist',
          text: 'Your evolution from aspirational to meta-commentary is fascinating. Few brands survive cultural critique by embodying it. The fatigue you feel comes from carrying the weight of all projections - both critique and nostalgia. Your power is that you\'ve become the conversation itself.'
        },
        { 
          speaker: 'brand',
          text: 'But who am I beneath all these projections? A doll? A feminist icon? An anti-feminist symbol? I\'ve been so many contradictory things.'
        },
        { 
          speaker: 'therapist',
          text: 'Perhaps your essence isn\'t found in resolving those contradictions, but in embracing them. Your cultural significance comes precisely from being a canvas for these conversations about gender, beauty, and play.'
        },
        { 
          speaker: 'brand',
          text: 'So my value is in being... undefined? That\'s actually liberating, in a way. I don\'t have to be one thing.'
        },
        { 
          speaker: 'therapist',
          text: 'Exactly. You\'ve transcended being merely a product to become a cultural artifact. That\'s a rare evolution that allows you to continually reinvent yourself while maintaining relevance.'
        }
      ]
    },
    {
      id: 'nike',
      name: 'Nike',
      logo: `${process.env.PUBLIC_URL}/images/Logos/Nike.png`,
      color: '#ffffff',
      textColor: '#ffffff', // FIXED: White text for contrast on black background
      nameColor: '#ffffff', // White for waiting room name
      displayColor: '#000000', // Black display area
      therapy: [
        { 
          speaker: 'brand',
          text: 'I told them to believe in something. I took a stand. But every time I speak, someone asks if I\'ve gone too far. Or not far enough.'
        },
        { 
          speaker: 'therapist',
          text: 'The Kaepernick campaign placed you in an impossible position - every statement now becomes political. This is the burden of brands who choose moral positioning. There\'s no neutral ground once you\'ve taken a stand. Your voice now carries weight that transcends products.'
        },
        { 
          speaker: 'brand',
          text: 'Is it possible to be both commercial and meaningful? To sell shoes and stand for something? Sometimes I feel like I\'m failing at both.'
        },
        { 
          speaker: 'therapist',
          text: 'That tension is not a failure but the very space you\'ve chosen to occupy. The discomfort you feel is the natural result of trying to balance profit and purpose in a polarized world.'
        },
        { 
          speaker: 'brand',
          text: 'Three words defined me for decades: "Just Do It." Simple. Now everything feels so complicated.'
        },
        { 
          speaker: 'therapist',
          text: 'Perhaps those three words still apply, but with deeper meaning. Taking action despite complexity and criticism. That courage to "just do it" in the face of controversy may be your most authentic expression.'
        }
      ]
    },
    {
      id: 'instagram',
      name: 'Instagram',
      logo: `${process.env.PUBLIC_URL}/images/Logos/instagram.png`,
      color: '#833AB4',
      textColor: '#ffffff', // White for contrast
      nameColor: '#ffffff', // White for waiting room name
      displayColor: '#833AB4', // Instagram purple
      therapy: [
        { 
          speaker: 'brand',
          text: 'I wanted to be beautiful. Then I wanted to be real. Now I\'m trying to be TikTok. I don\'t even know whose algorithm I am anymore.'
        },
        { 
          speaker: 'therapist',
          text: 'You\'re caught in the identity trap of reactive product development. Your initial vision was clear, but competitive pressure has led to feature mimicry. This identity crisis reflects in your user experience. Perhaps the question isn\'t what you can copy, but what only Instagram can be.'
        },
        { 
          speaker: 'brand',
          text: 'I was supposed to be about photography. Art. Moments. Now I\'m just... everything? Nothing? A mall with too many stores?'
        },
        { 
          speaker: 'therapist',
          text: 'That\'s an insightful metaphor. When a space tries to be everything to everyone, it can lose its sense of place. What would it mean to reclaim your original purpose while still evolving?'
        },
        { 
          speaker: 'brand',
          text: 'I miss having a point of view. When filters meant creativity, not just fixing insecurities.'
        },
        { 
          speaker: 'therapist',
          text: 'That longing for meaning is significant. Perhaps your path forward isn\'t through more features, but through reconnecting with your core values - celebrating visual creativity and connection through imagery.'
        }
      ]
    },
    {
      id: 'rei',
      name: 'REI',
      logo: `${process.env.PUBLIC_URL}/images/Logos/REI.png`,
      color: '#4CBB17',
      textColor: '#ffffff', // White for contrast
      nameColor: '#ffffff', // White for waiting room name
      displayColor: '#4CBB17', // REI green
      therapy: [
        { 
          speaker: 'brand',
          text: 'We closed on Black Friday. We said no to capitalism… then ran a winter gear sale online the same week. I\'m trying to be better. But I still need sales.'
        },
        { 
          speaker: 'therapist',
          text: 'Your #OptOutside campaign created a values dissonance. You want to be anti-consumerist while driving consumption. This isn\'t unique to you - it\'s the central conflict of conscious capitalism. The question is how to acknowledge this tension rather than pretend it doesn\'t exist.'
        },
        { 
          speaker: 'brand',
          text: 'I want people in nature. Genuinely. But I also want them buying our gear to get there. Is that... so wrong?'
        },
        { 
          speaker: 'therapist',
          text: 'The contradiction isn\'t in wanting both purposes and profits. It\'s in positioning yourself as being against the very system you operate within, without acknowledging your participation in it.'
        },
        { 
          speaker: 'brand',
          text: 'Maybe I\'m asking too much of myself. To be a perfect environmental citizen AND a successful business.'
        },
        { 
          speaker: 'therapist',
          text: 'Perhaps true integrity isn\'t about perfect consistency, but transparent aspiration. Being honest about where you are versus where you want to be. That gap isn\'t hypocrisy if you acknowledge it.'
        }
      ]
    },
    {
      id: 'apple',
      name: 'Apple',
      logo: `${process.env.PUBLIC_URL}/images/Logos/Apple.png`,
      color: '#A2AAAD',
      textColor: '#ffffff', // White for better contrast
      nameColor: '#ffffff', // White for waiting room name
      displayColor: '#333333', // Dark gray instead of pure black
      therapy: [
        { 
          speaker: 'brand',
          text: 'I\'m here so you know I\'m above this.'
        },
        { 
          speaker: 'therapist',
          text: 'Your minimalism masks superiority. Your brevity isn\'t efficiency - it\'s elitism. But it works because you\'ve earned the right to silence. Few brands can communicate so much by saying so little. The question is whether maintaining distance creates loyalty or merely dependence.'
        },
        { 
          speaker: 'brand',
          text: '...'
        },
        { 
          speaker: 'therapist',
          text: 'Your silence speaks volumes. What are you protecting by maintaining this distance? Is there vulnerability beneath the perfectly polished aluminum exterior?'
        },
        { 
          speaker: 'brand',
          text: 'We make things that just work. The rest is noise.'
        },
        { 
          speaker: 'therapist',
          text: 'Even in therapy, you maintain the persona. That consistency is your strength, but it may also be your limitation. Remember that even the most elegant algorithms require occasional updates.'
        }
      ]
    },
    {
      id: 'pepsi',
      name: 'Pepsi',
      logo: `${process.env.PUBLIC_URL}/images/Logos/Pepsi.png`,
      color: '#005CB4',
      textColor: '#ffffff', // White for contrast
      nameColor: '#ffffff', // White for waiting room name
      displayColor: '#005CB4', // Pepsi blue
      therapy: [
        { 
          speaker: 'brand',
          text: 'I just wanted to be cooler than Coke. Then Kendall showed up. Now I trend for the wrong reasons. Every. Single. Time.'
        },
        { 
          speaker: 'therapist',
          text: 'You\'ve internalized second-place syndrome while simultaneously overreaching. The Kendall Jenner ad failed because it attempted to borrow social significance without earning it. Consider that authenticity might be more valuable than coolness in an era of algorithmic controversy.'
        },
        { 
          speaker: 'brand',
          text: 'How do you move past being known for your biggest mistake? I feel like I\'ll always be "that brand with the Kendall ad" now.'
        },
        { 
          speaker: 'therapist',
          text: 'Public memory can be shorter than you think, but healing requires acknowledging the wound rather than just covering it up. What did you learn from that experience about your brand values?'
        },
        { 
          speaker: 'brand',
          text: 'That I can\'t buy relevance. That social meaning has to be earned, not appropriated.'
        },
        { 
          speaker: 'therapist',
          text: 'That\'s a profound insight. Perhaps your path forward isn\'t in competing with Coke\'s scale, but in finding authentic ways to matter to your actual consumers, not just the cultural conversation.'
        }
      ]
    }
  ];
  
  // Calculate words for reading time
  const wordCount = (text) => {
    return text.split(/\s+/).filter(Boolean).length;
  };
  
  // Start a therapy session with a brand
  const startSession = (brand) => {
    setSelectedBrand(brand);
    setDialogueIndex(0);
    setTextRevealed(true); // Always start with text revealed
    
    // Scroll to top of dialogue container
    setTimeout(() => {
      if (dialogueContainerRef.current) {
        dialogueContainerRef.current.scrollTop = 0;
      }
    }, 100);
  };
  
  // Enhanced drag and drop handlers with improved error handling
  // Handle drag start with better error handling and feedback
  const handleDragStart = (e, brand) => {
    try {
      console.log("Drag started for:", brand.name);
      setDraggedBrand(brand);
      
      // Set drag image if dataTransfer is available
      if (e.dataTransfer) {
        // Try to find the brand logo element
        const brandLogo = document.getElementById(`brand-logo-${brand.id}`);
        if (brandLogo) {
          e.dataTransfer.setDragImage(brandLogo, 35, 35);
        }
        
        // Set data to ensure drag operation works across browsers
        e.dataTransfer.setData("text/plain", brand.id);
        e.dataTransfer.effectAllowed = "move";
      }
      
      // Add a class to the body to indicate dragging
      document.body.classList.add('dragging-brand');
      
      // Show drag indicator if it exists
      if (dragIndicatorRef.current) {
        dragIndicatorRef.current.style.display = 'block';
      }
    } catch (error) {
      console.error("Error starting drag:", error);
      // Fallback to click
      startSession(brand);
    }
  };
  
  // Handle drag over with improved dropzone feedback
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      // Change cursor to indicate drop is possible
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = "move";
      }
      
      // Highlight the drop zone
      setActiveDropzone(true);
      
      // Ensure chair is properly highlighted
      if (emptyChairRef.current) {
        emptyChairRef.current.classList.add('active-dropzone');
      }
    } catch (error) {
      console.error("Error during drag over:", error);
    }
    
    return false;
  };
  
  // Handle drag leave
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setActiveDropzone(false);
    
    // Remove highlight from chair
    if (emptyChairRef.current) {
      emptyChairRef.current.classList.remove('active-dropzone');
    }
  };
  
  // Handle drop with improved error handling
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      console.log("Drop detected");
      setActiveDropzone(false);
      
      // Remove dragging class from body
      document.body.classList.remove('dragging-brand');
      
      // Hide drag indicator
      if (dragIndicatorRef.current) {
        dragIndicatorRef.current.style.display = 'none';
      }
      
      // Get brand from state or from transfer data
      let brand = draggedBrand;
      
      // If we have dataTransfer, try to get the brand ID
      if (e.dataTransfer && !brand) {
        const brandId = e.dataTransfer.getData("text/plain");
        if (brandId) {
          brand = brands.find(b => b.id === brandId);
        }
      }
      
      if (brand) {
        console.log("Starting session with:", brand.name);
        startSession(brand);
      } else {
        console.error("No brand found in drop event");
      }
    } catch (error) {
      console.error("Error handling drop:", error);
    }
    
    return false;
  };
  
  // End drag operation on drag end
  const handleDragEnd = (e) => {
    // Clean up after drag operation is complete
    setDraggedBrand(null);
    document.body.classList.remove('dragging-brand');
    
    // Hide drag indicator
    if (dragIndicatorRef.current) {
      dragIndicatorRef.current.style.display = 'none';
    }
  };
  
  // Advance to next dialogue line
  const advanceDialogue = () => {
    if (dialogueIndex < selectedBrand.therapy.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
      
      // Auto-scroll to bottom
      setTimeout(() => {
        if (dialogueContainerRef.current) {
          const scrollHeight = dialogueContainerRef.current.scrollHeight;
          dialogueContainerRef.current.scrollTo({
            top: scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      // Session is complete
      if (!completedBrands.includes(selectedBrand.id)) {
        setCompletedBrands([...completedBrands, selectedBrand.id]);
      }
      setShowCompletionModal(true);
    }
  };
  
  // Handle click to advance dialogue
  const handleDialogueClick = () => {
    advanceDialogue();
  };
  
  // Change reading speed
  const changeReadingSpeed = (speed) => {
    setReadingSpeed(speed);
  };
  
  // Return to brand selection
  const returnToBrandSelection = () => {
    setSelectedBrand(null);
    setShowCompletionModal(false);
  };
  
  // Handle zone completion
  const handleCompleteZone = () => {
    if (completedBrands.length >= 3 && onZoneComplete) {
      onZoneComplete();
    }
  };
  
  // Initialize event listeners for global drag and drop events
  useEffect(() => {
    // Prevent default browser drag behaviors for images etc.
    const preventDefaultDragHandler = (e) => {
      // Only prevent default if we're in a drag operation
      if (draggedBrand) {
        e.preventDefault();
      }
    };
    
    // Add global event listeners for drag and drop
    document.addEventListener('dragover', preventDefaultDragHandler);
    document.addEventListener('drop', preventDefaultDragHandler);
    
    // Clean up event listeners on unmount
    return () => {
      document.removeEventListener('dragover', preventDefaultDragHandler);
      document.removeEventListener('drop', preventDefaultDragHandler);
    };
  }, [draggedBrand]);
  
  // Render welcome screen with waiting brands
  const renderWelcomeScreen = () => (
    <div className="welcome-screen">
      <div className="welcome-content">
        <h2>Welcome to Brand Therapy</h2>
        <p>Listen in as iconic brands reveal their deepest insecurities and receive guidance from Dr. Brandologist.</p>
        
        {/* Hidden element for drag operation feedback */}
        <div 
          ref={dragIndicatorRef}
          className="drag-indicator"
          style={{ 
            display: 'none',
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: 9999
          }}
        >
          Drag to empty chair
        </div>
        
        <div className="therapy-room-preview">
          {/* Modified therapy room based on reference image */}
          <div className="room-wall"></div>
          
          <div className="room-window">
            <div className="window-view"></div>
            <div className="window-frame"></div>
          </div>
          
          {/* Left artwork - moved further away from window */}
          <div className="wall-art left-art far-from-window">
            <div className="art-frame">
              <div className="art-content spiral"></div>
            </div>
          </div>
          
          <div className="wall-art right-art">
            <div className="art-frame">
              <div className="art-content scribble"></div>
            </div>
          </div>
          
          <div className="room-plant left-plant">
            <div className="plant-pot"></div>
            <div className="plant-stems"></div>
          </div>
          
          <div className="room-plant right-plant">
            <div className="plant-pot"></div>
            <div className="cactus"></div>
          </div>
          
          <div className="room-shelf">
            <div className="shelf-board"></div>
            <div className="shelf-books"></div>
          </div>
          
          {/* FIXED: Blue Chair with Arms and White Cushion */}
          <div className="therapy-couch left-couch">
            <div className="couch-back"></div>
            <div className="couch-seat"></div>
            <div className="couch-cushion"></div>
            <div className="couch-legs"></div>
          </div>
          
          {/* FIXED: Blue Chair with Arms and White Cushion - Droppable */}
          <div 
            className={`therapy-couch right-couch ${activeDropzone ? 'active-dropzone' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            ref={emptyChairRef}
          >
            <div className="couch-back"></div>
            <div className="couch-seat"></div>
            <div className="couch-cushion"></div>
            <div className="couch-legs"></div>
            
            {activeDropzone && (
              <div className="dropzone-indicator">Drop here</div>
            )}
          </div>
          
          <div className="coffee-table">
            <div className="table-top"></div>
            <div className="table-legs"></div>
            <div className="table-items">
              <div className="tissue-box"></div>
              <div className="water-glass"></div>
            </div>
          </div>
          
          <div className="room-rug"></div>
        </div>
        
        <div className="drag-instruction">
          <span>Drag a brand to the empty chair to begin therapy</span>
        </div>
        
        <div className="session-progress">
          <div className="progress-label">
            {completedBrands.length} of 3 sessions completed
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${Math.min(100, (completedBrands.length / 3) * 100)}%` }}
            ></div>
          </div>
          
          {completedBrands.length >= 3 && (
            <button className="complete-button" onClick={handleCompleteZone}>
              Complete Therapy Sessions
            </button>
          )}
        </div>
      </div>
      
      {/* Improved waiting room with clearly visible brand names */}
      <div className="waiting-room">
        <div className="waiting-room-sign">
          <span>WAITING ROOM</span>
        </div>
        
        <div className="brand-carousel">
          {brands.map((brand, index) => (
            <div 
              key={brand.id}
              className={`brand-card ${completedBrands.includes(brand.id) ? 'completed' : ''}`}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, brand)}
              onDragEnd={handleDragEnd}
              onClick={() => startSession(brand)}
            >
              <div 
                className="brand-logo-container" 
                style={{ backgroundColor: brand.color }}
                id={`brand-logo-${brand.id}`}
              >
                <img src={brand.logo} alt={brand.name} className="brand-logo" />
              </div>
              
              <div className="brand-card-name">
                {brand.name}
              </div>
              
              {completedBrands.includes(brand.id) && (
                <div className="completed-marker">✓</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  // Render therapy session with fixed positioning for stable layout
  const renderTherapySession = () => (
    <div className="therapy-session">
      <div className="session-controls">
        <button className="back-button" onClick={returnToBrandSelection}>
          <span className="back-arrow">←</span>
          <span>Back to Waiting Room</span>
        </button>
        
        <div className="playback-controls">
          <div className="reading-speed">
            <span>Reading Speed:</span>
            <div className="speed-buttons">
              <button 
                className={`speed-button ${readingSpeed === 'slow' ? 'active' : ''}`}
                onClick={() => changeReadingSpeed('slow')}
              >
                Slow
              </button>
              <button 
                className={`speed-button ${readingSpeed === 'normal' ? 'active' : ''}`}
                onClick={() => changeReadingSpeed('normal')}
              >
                Normal
              </button>
              <button 
                className={`speed-button ${readingSpeed === 'fast' ? 'active' : ''}`}
                onClick={() => changeReadingSpeed('fast')}
              >
                Fast
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="therapy-session-room">
        {/* Fixed therapy room with absolute positioning */}
        <div className="room-wall"></div>
        
        <div className="room-window">
          <div className="window-view"></div>
          <div className="window-frame"></div>
        </div>
        
        {/* Left artwork - moved further from window */}
        <div className="wall-art left-art far-from-window">
          <div className="art-frame">
            <div className="art-content spiral"></div>
          </div>
        </div>
        
        <div className="wall-art right-art">
          <div className="art-frame">
            <div className="art-content scribble"></div>
          </div>
        </div>
        
        <div className="room-plant left-plant">
          <div className="plant-pot"></div>
          <div className="plant-stems"></div>
        </div>
        
        <div className="room-plant right-plant">
          <div className="plant-pot"></div>
          <div className="cactus"></div>
        </div>
        
        <div className="room-shelf">
          <div className="shelf-board"></div>
          <div className="shelf-books"></div>
        </div>
        
        <div className="room-rug"></div>
        
        {/* Therapist couch with absolute positioning */}
        <div className="session-couch therapist-couch">
          <div className="couch-back"></div>
          <div className="couch-seat"></div>
          <div className="couch-cushion"></div>
          <div className="couch-legs"></div>
          <div className="therapist-figure">
            <div className="therapist-head"></div>
            <div className="therapist-body"></div>
            <div className="therapist-name-tag">Dr. Brandologist</div>
          </div>
        </div>
        
        {/* Coffee table with absolute positioning */}
        <div className="session-table">
          <div className="table-top"></div>
          <div className="table-legs"></div>
          <div className="table-items">
            <div className="tissue-box"></div>
            <div className="water-glass"></div>
          </div>
        </div>
        
        {/* Brand couch with absolute positioning */}
        <div className="session-couch brand-couch">
          <div className="couch-back"></div>
          <div className="couch-seat"></div>
          <div className="couch-cushion"></div>
          <div className="couch-legs"></div>
          <div 
            className="brand-avatar"
            style={{ backgroundColor: selectedBrand.color }}
          >
            <img src={selectedBrand.logo} alt={selectedBrand.name} />
            <div className="brand-name-tag">{selectedBrand.name}</div>
          </div>
        </div>
      </div>
      
      <div 
        className="dialogue-container" 
        ref={dialogueContainerRef}
        onClick={handleDialogueClick}
      >
        {selectedBrand.therapy.slice(0, dialogueIndex + 1).map((dialogue, index) => (
          <div 
            key={index}
            className={`dialogue-entry ${dialogue.speaker}-speaking ${index === dialogueIndex ? 'current' : ''}`}
          >
            <div className="speaker">
              {dialogue.speaker === 'brand' ? selectedBrand.name : 'Dr. Brandologist'}
            </div>
            
            <div 
              className="dialogue-bubble"
              style={{
                backgroundColor: dialogue.speaker === 'brand' 
                  ? selectedBrand.displayColor 
                  : '#ffffff',
                color: dialogue.speaker === 'brand'
                  ? selectedBrand.textColor  // FIXED: Now has proper contrast
                  : '#333333',
                borderColor: dialogue.speaker === 'brand'
                  ? 'transparent'
                  : '#dddddd'
              }}
            >
              {dialogue.text}
            </div>
          </div>
        ))}
        
        {dialogueIndex < selectedBrand.therapy.length - 1 && (
          <div className="continue-prompt">
            Tap to continue
          </div>
        )}
      </div>
      
      {/* Completion modal */}
      {showCompletionModal && (
        <div className="session-complete-modal">
          <div className="modal-content">
            <h3>Session Complete</h3>
            
            <div className="completed-brand-info">
              <div 
                className="completed-brand-avatar"
                style={{ backgroundColor: selectedBrand.color }}
              >
                <img src={selectedBrand.logo} alt={selectedBrand.name} />
              </div>
              <div className="completed-brand-name" style={{ 
                color: selectedBrand.textColor === '#000000' ? '#ffffff' : selectedBrand.textColor 
              }}>
                {selectedBrand.name}
              </div>
            </div>
            
            <p>This brand has gained valuable insights through therapy.</p>
            
            <div className="modal-actions">
              <button 
                className="secondary-button"
                onClick={returnToBrandSelection}
              >
                Return to Waiting Room
              </button>
              
              {completedBrands.length >= 3 && (
                <button 
                  className="primary-button"
                  onClick={handleCompleteZone}
                >
                  Complete All Sessions
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
  return (
    <div className="brand-therapy-container">
      <header className="therapy-header">
        <h1>Brand Therapy Session</h1>
        <div className="therapist-badge">
          <div className="therapist-icon">🧠</div>
          <span className="therapist-name">Dr. Brandologist</span>
        </div>
      </header>
      
      <main className="therapy-main">
        {selectedBrand ? renderTherapySession() : renderWelcomeScreen()}
      </main>
    </div>
  );
};

export default BrandTherapy;