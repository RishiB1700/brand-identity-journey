import React, { useState, useEffect, useRef } from 'react';
import './MascotMausoleum.css';

const MascotMausoleum = ({ onZoneComplete }) => {
  const [selectedMascot, setSelectedMascot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visitedMascots, setVisitedMascots] = useState([]);
  const [showCompletionButton, setShowCompletionButton] = useState(false);
  const [visibleEra, setVisibleEra] = useState('');
  const [viewingTimeline, setViewingTimeline] = useState(true);
  
  // Reference for container
  const containerRef = useRef(null);
  
  // Define eras with consistent theming
  const eras = [
    { 
      id: 'pioneers', 
      name: 'The Pioneers',
      years: '1898-1950',
      description: 'The birth of brand personification',
      color: '#4A5ED0' 
    },
    { 
      id: 'golden', 
      name: 'The Golden Age',
      years: '1950-1985',
      description: 'Television brings mascots to life',
      color: '#D0A44A' 
    },
    { 
      id: 'millennial', 
      name: 'The Millennial Shift',
      years: '1985-2010',
      description: 'Irony and self-awareness emerge',
      color: '#B44AD0'
    },
    { 
      id: 'modern', 
      name: 'The Digital Natives',
      years: '2010-Present',
      description: 'Social media reshapes character-driven marketing',
      color: '#4AD0B4'
    }
  ];
  
  // Consistent mascot data structure with richer storytelling elements
  const mascots = [
    // Pioneers Era
    {
      id: 'michelin-man',
      name: 'Michelin Man',
      brand: 'Michelin',
      year: '1898',
      decade: '1800',
      tagline: 'Because so much is riding on your tires.',
      story: {
        origin: 'Created from a stack of tires, Bibendum (his real name) was inspired by a pile of tires at the Lyon Exhibition of 1894.',
        evolution: 'Originally depicted as an imposing figure with glasses and a cigar, he shed weight and softened his appearance over the decades.',
        legacy: 'One of the oldest brand mascots still in use, proving the staying power of well-designed brand personification.'
      },
      narrative: "The Michelin Man's journey mirrors the evolution of advertising itself—from intimidating to approachable, from luxury to mass market appeal. Through world wars and cultural revolutions, his form endured while his character adapted.",
      status: 'evolved',
      era: 'pioneers',
      iconText: '🏍️',
      image: `${process.env.PUBLIC_URL}/images/Mascots/michellin-man.png`,
      color: '#2196F3'
    },
    {
      id: 'elsie-cow',
      name: 'Elsie the Cow',
      brand: 'Borden Dairy',
      year: '1936',
      decade: '1930',
      tagline: "If it's Borden's, it's got to be good.",
      story: {
        origin: 'Created to humanize the dairy industry during the Great Depression, when trust in food quality was vital.',
        evolution: "Developed an entire family, including husband Elmer (who became the face of Elmer's Glue) and four children.",
        legacy: 'Became a symbol of motherhood and wholesome Americana, before fading as dairy conglomerates consolidated.'
      },
      narrative: "Elsie represented domesticity during an era when American identity was being shaped around family values. Her decline mirrors the fading of this idealized vision of rural America.",
      status: 'retired',
      era: 'pioneers',
      iconText: '🐄',
      image: `${process.env.PUBLIC_URL}/images/Mascots/elsie-cow.png`,
      color: '#FFC107'
    },
    
    // Golden Age
    {
      id: 'mr-clean',
      name: 'Mr. Clean',
      brand: 'Procter & Gamble',
      year: '1958',
      decade: '1950',
      tagline: 'Mr. Clean gets rid of dirt and grime and grease in just a minute.',
      story: {
        origin: 'Created as a bald, muscular man with a single earring—a bold character design for 1950s America.',
        evolution: 'Remarkably consistent over 60+ years, maintaining silence and mysterious background while other mascots changed drastically.',
        legacy: 'Represents an era when household cleaning was being redefined through chemistry and marketing.'
      },
      narrative: "Mr. Clean's steadfast silence speaks to masculinity's complicated relationship with domestic labor. His unchanging presence suggests cleanliness as an eternal virtue rather than a trend.",
      status: 'extant',
      era: 'golden',
      iconText: '🧼',
      image: `${process.env.PUBLIC_URL}/images/Mascots/mr-clean.png`,
      color: '#E0E0E0'
    },
    {
      id: 'ronald-mcdonald',
      name: 'Ronald McDonald',
      brand: "McDonald's",
      year: '1963',
      decade: '1960',
      tagline: 'Put a Smile On.',
      story: {
        origin: 'First portrayed by weatherman Willard Scott in Washington, D.C. television commercials.',
        evolution: 'Expanded into McDonaldland with a cast of characters, then gradually withdrew as cultural attitudes toward clowns shifted.',
        legacy: 'The cultural backlash against Ronald reflects changing attitudes about marketing to children and fast food.'
      },
      narrative: "Ronald's journey from beloved icon to controversial figure mirrors America's complicated relationship with fast food—from celebration to concern, from innocence to accountability.",
      status: 'retired',
      era: 'golden',
      iconText: '🤡',
      image: `${process.env.PUBLIC_URL}/images/Mascots/ronald-mcdonald.png`,
      color: '#F44336'
    },
    {
      id: 'pillsbury-doughboy',
      name: 'Pillsbury Doughboy',
      brand: 'Pillsbury',
      year: '1965',
      decade: '1960',
      tagline: "Nothin' says lovin' like somethin' from the oven.",
      story: {
        origin: 'Created by Leo Burnett agency with stop-motion animation, taking five bodies and 15 heads to shoot one commercial.',
        evolution: "His giggle when poked in the stomach became one of advertising\'s most recognizable moments.",
        legacy: "Survived the shift from scratch baking to convenience foods, adapting to each generation's relationship with home cooking."
      },
      narrative: "The Doughboy represents the commercialization of warmth itself—packaging domesticity for mass consumption while preserving a sense of authentic connection.",
      status: 'extant',
      era: 'golden',
      iconText: '👨‍🍳',
      image: `${process.env.PUBLIC_URL}/images/Mascots/pillsbury-doughboy.png`,
      color: '#90CAF9'
    },
    {
      id: 'tony-tiger',
      name: 'Tony the Tiger',
      brand: "Kellogg's Frosted Flakes",
      year: '1952',
      decade: '1950',
      tagline: "They're Gr-r-reat!",
      story: {
        origin: 'Won a mascot contest against three other characters including Katy the Kangaroo.',
        evolution: 'Transformed from cartoon animal to athletic coach/mentor figure, aligning with sports marketing in the 1970s-80s.',
        legacy: 'Faced challenges with sugar cereal marketing regulations and nutritional concerns.'
      },
      narrative: "Tony's transformation from simple cartoon to aspirational sports figure mirrors changing approaches to reaching children—from basic animation to lifestyle marketing.",
      status: 'evolved',
      era: 'golden',
      iconText: '🐯',
      image: `${process.env.PUBLIC_URL}/images/Mascots/tony-tiger.png`,
      color: '#FF9800'
    },
    {
      id: 'kool-aid-man',
      name: 'Kool-Aid Man',
      brand: 'Kool-Aid',
      year: '1975',
      decade: '1970',
      tagline: 'Oh Yeah!',
      story: {
        origin: 'Evolved from the earlier "Pitcher Man" illustration into a full anthropomorphic pitcher bursting through walls.',
        evolution: 'His explosive entrances made him a cultural icon, later becoming self-referential in the internet age.',
        legacy: 'Transformed from earnest advertising to meme, finding new relevance through cultural nostalgia and irony.'
      },
      narrative: "The Kool-Aid Man's journey from straightforward mascot to self-aware meme reflects how brands must evolve from sincerity to irony to survive cultural shifts.",
      status: 'evolved',
      era: 'golden',
      iconText: '🧃',
      image: `${process.env.PUBLIC_URL}/images/Mascots/kool-aid-man.png`,
      color: '#F44336'
    },
    
    // Millennial Shift
    {
      id: 'energizer-bunny',
      name: 'Energizer Bunny',
      brand: 'Energizer',
      year: '1989',
      decade: '1980',
      tagline: 'Keeps going and going and going…',
      story: {
        origin: "Created as a parody of rival Duracell's bunny, with Duracell unable to use their bunny in the U.S. due to trademark issues.",
        evolution: 'Pioneered meta-advertising by disrupting fake commercials for fictional products.',
        legacy: 'Maintained relevance through changing technology, even as batteries became less central to consumer electronics.'
      },
      narrative: "The Bunny represents advertising's growing self-awareness, breaking the fourth wall as consumers became more media-literate and marketing-savvy.",
      status: 'extant',
      era: 'millennial',
      iconText: '🐰',
      image: `${process.env.PUBLIC_URL}/images/Mascots/energizer-bunny.png`,
      color: '#F06292'
    },
    {
      id: 'noid',
      name: 'The Noid',
      brand: "Domino's Pizza",
      year: '1986',
      decade: '1980',
      tagline: 'Avoid the Noid!',
      story: {
        origin: 'Created by Group 243 advertising to personify the problems that could happen to pizza during delivery.',
        evolution: 'Starred in television campaigns and video games before being retired after a mentally ill man with the surname Noid held employees hostage.',
        legacy: 'Returned decades later as brands mined nostalgia, demonstrating the cyclical nature of advertising characters.'
      },
      narrative: "The Noid's story reveals the unpredictable relationship between fictional characters and real-world events, and how brands navigate these unexpected connections.",
      status: 'reborn',
      era: 'millennial',
      iconText: '🍕',
      image: `${process.env.PUBLIC_URL}/images/Mascots/noid.png`,
      color: '#E53935'
    },
    {
      id: 'geico-gecko',
      name: 'GEICO Gecko',
      brand: 'GEICO',
      year: '1999',
      decade: '1990',
      tagline: '15 minutes could save you 15% or more on car insurance.',
      story: {
        origin: 'Created during the Screen Actors Guild strike when using human actors became difficult.',
        evolution: 'Initially explained how to pronounce GEICO before developing a full personality with a British accent.',
        legacy: 'Pioneered a conversational, direct-to-camera approach that influenced a generation of advertising.'
      },
      narrative: "The Gecko represents advertising's shift toward approachable personalities rather than product facts—humanizing an industry as impersonal as insurance.",
      status: 'extant',
      era: 'millennial',
      iconText: '🦎',
      image: `${process.env.PUBLIC_URL}/images/Mascots/geico-gecko.png`,
      color: '#4CAF50'
    },
    {
      id: 'flo',
      name: 'Flo',
      brand: 'Progressive Insurance',
      year: '2008',
      decade: '2000',
      tagline: 'Discount!',
      story: {
        origin: 'Introduced as an enthusiastic cashier in a supernatural "store" for insurance, breaking category conventions.',
        evolution: 'Expanded into an entire universe with recurring characters like Jamie and Dr. Rick.',
        legacy: 'Created a character-driven approach to insurance marketing, forcing competitors to develop their own mascots.'
      },
      narrative: "Flo represents the personification of corporations, giving an approachable face to an intangible service and creating parasocial relationships with consumers.",
      status: 'evolved',
      era: 'millennial',
      iconText: '👩',
      image: `${process.env.PUBLIC_URL}/images/Mascots/flo.png`,
      color: '#2196F3'
    },
    {
      id: 'maxwell-pig',
      name: 'Maxwell the Pig',
      brand: 'GEICO',
      year: '2010',
      decade: '2010',
      tagline: 'Wee wee wee all the way home!',
      story: {
        origin: 'Inspired by the nursery rhyme "This Little Piggy", Maxwell first appeared in a 2010 commercial.',
        evolution: 'Evolved from a one-off character into a recurring mascot with his own smartphone and personality.',
        legacy: 'Demonstrated how insurance marketing could expand beyond functional benefits to pure entertainment.'
      },
      narrative: "Maxwell represents the era of viral marketing, where the connection to the product became increasingly tangential as entertainment value took center stage.",
      status: 'extant',
      era: 'millennial',
      iconText: '🐷',
      image: `${process.env.PUBLIC_URL}/images/Mascots/maxwell-pig.png`,
      color: '#EC407A'
    },
    
    // Modern Era
    {
      id: 'mayhem',
      name: 'Mayhem',
      brand: 'Allstate',
      year: '2010',
      decade: '2010',
      tagline: 'Are you in good hands?',
      story: {
        origin: 'Introduced as the personification of accidents and disasters that could happen to you.',
        evolution: 'Actor Dean Winters brought dark humor to increasingly outlandish scenarios.',
        legacy: 'Evolved from physical threats to digital dangers, reflecting changing consumer concerns.'
      },
      narrative: "Mayhem represents fear marketing's evolution—making abstract risks tangible through personification while using humor to make anxiety palatable.",
      status: 'extant',
      era: 'modern',
      iconText: '💥',
      image: `${process.env.PUBLIC_URL}/images/Mascots/mayhem-allstate.png`,
      color: '#424242'
    },
    {
      id: 'duolingo-owl',
      name: 'Duo the Owl',
      brand: 'Duolingo',
      year: '2011',
      decade: '2010',
      tagline: 'Learn a language for free. Forever.',
      story: {
        origin: 'Started as a friendly app mascot for gamified language learning.',
        evolution: 'Notifications evolved from encouraging to passive-aggressive, before the brand fully embraced the "threatening" persona meme.',
        legacy: 'Became one of the first mascots born in the app era to achieve mainstream recognition.'
      },
      narrative: "Duo represents how mascots now evolve through user interaction rather than top-down marketing—his persona shaped as much by memes as by corporate intent.",
      status: 'evolved',
      era: 'modern',
      iconText: '🦉',
      image: `${process.env.PUBLIC_URL}/images/Mascots/duolingo.png`,
      color: '#58CC02'
    },
    {
      id: 'colonel-sanders',
      name: 'Colonel Sanders',
      brand: 'KFC',
      year: '1952',
      decade: '1950', // Original era
      tagline: "It's Finger Lickin' Good!",
      story: {
        origin: 'Based on the actual founder Harland Sanders, who franchised his secret recipe.',
        evolution: 'After his death, became portrayed by actors, then abandoned, then revived as a rotating cast of celebrities.',
        legacy: 'Transformed into a dating sim character and CGI Instagram influencer, showing how historic mascots can be reinvented for digital natives.'
      },
      narrative: "The Colonel's journey from real person to fictional character to digital avatar mirrors advertising's evolution from authenticity to performance to simulation.",
      status: 'reborn',
      era: 'modern', // Placed in modern for resurrection
      iconText: '🍗',
      image: `${process.env.PUBLIC_URL}/images/Mascots/colonel-sanders.png`,
      color: '#FF5722'
    },
    {
      id: 'jake-statefarm',
      name: 'Jake from State Farm',
      brand: 'State Farm',
      year: '2011',
      decade: '2010',
      tagline: 'Like a good neighbor, State Farm is there.',
      story: {
        origin: 'Originally actual State Farm employee Jake Stone in the viral "3am khakis" commercial.',
        evolution: 'Recast with actor Kevin Miles in 2020, updating the character while maintaining continuity.',
        legacy: 'Transitioned from one-line wonder to recurring brand representative, demonstrating how viral moments can become sustained campaigns.'
      },
      narrative: "Jake's evolution from actual employee to professional actor reflects how authenticity in advertising has become a performed quality rather than an inherent one.",
      status: 'reborn',
      era: 'modern',
      iconText: '👨🏽',
      image: `${process.env.PUBLIC_URL}/images/Mascots/jake-statefarm.png`,
      color: '#E53935'
    }
  ];
  
  // Monitor visited mascots for showing completion button
  useEffect(() => {
    if (visitedMascots.length >= 5 && !showCompletionButton) {
      setShowCompletionButton(true);
    }
  }, [visitedMascots, showCompletionButton]);
  
  // Disable scrolling when component mounts
  useEffect(() => {
    // Store original overflow setting
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    // Disable scrolling
    document.body.style.overflow = 'hidden';
    
    // Restore original setting on unmount
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
  
  // Handle mascot click
  const handleMascotClick = (mascot) => {
    setSelectedMascot(mascot);
    setIsModalOpen(true);
    
    // Add to visited mascots if not already viewed
    if (!visitedMascots.includes(mascot.id)) {
      const newVisitedMascots = [...visitedMascots, mascot.id];
      setVisitedMascots(newVisitedMascots);
    }
  };
  
  // Close modal
  const closeModal = () => {
    const modal = document.querySelector('.mascot-modal');
    if (modal) {
      modal.classList.add('closing');
      
      setTimeout(() => {
        setIsModalOpen(false);
        setSelectedMascot(null);
      }, 400);
    } else {
      setIsModalOpen(false);
      setSelectedMascot(null);
    }
  };
  
  // Handle zone completion
  const handleComplete = () => {
    if (onZoneComplete && typeof onZoneComplete === 'function') {
      onZoneComplete();
    }
  };
  
  // Group mascots by era
  const pioneerMascots = mascots.filter(m => m.era === 'pioneers');
  const goldenMascots = mascots.filter(m => m.era === 'golden');
  const millennialMascots = mascots.filter(m => m.era === 'millennial');
  const modernMascots = mascots.filter(m => m.era === 'modern');

  // Navigate to timeline
  const goToTimeline = () => {
    setViewingTimeline(true);
  };

  // Navigate to an era
  const goToEra = (eraId) => {
    setViewingTimeline(false);
    setVisibleEra(eraId);
  };

  // Calculate progress stats per era
  const getEraProgress = (eraId) => {
    const eraMascots = mascots.filter(m => m.era === eraId);
    const visitedInEra = eraMascots.filter(m => visitedMascots.includes(m.id));
    return {
      visited: visitedInEra.length,
      total: eraMascots.length,
      percent: (visitedInEra.length / eraMascots.length) * 100
    };
  };

  // Calculate total progress stats
  const getTotalProgress = () => {
    return {
      visited: visitedMascots.length,
      total: mascots.length,
      percent: (visitedMascots.length / mascots.length) * 100
    };
  };

  const renderExitButton = () => {
    if (showCompletionButton) {
      return (
        <div className="exit-area visible">
          <button className="exit-button" onClick={handleComplete}>
            Exit the Mausoleum
          </button>
        </div>
      );
    }
    return null;
  };

  // Create a floating completion indicator
  const renderCompletionIndicator = () => {
    if (visitedMascots.length > 0) {
      const progress = getTotalProgress();
      const requiredMascots = 5;
      
      return (
        <div className="floating-progress">
          <div className="progress-container">
            <div className="progress-text">
              <span className="progress-count">{progress.visited}/{requiredMascots}</span> mascots explored
            </div>
            <div className="progress-bar">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${Math.min(100, (progress.visited / requiredMascots) * 100)}%` }}
              ></div>
            </div>
          </div>
          {progress.visited >= requiredMascots && (
            <button className="floating-exit-button" onClick={handleComplete}>
              Exit Mausoleum
            </button>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mausoleum-container" ref={containerRef}>
      {/* Atmospheric elements */}
      <div className="mausoleum-mist"></div>
      <div className="mausoleum-vignette"></div>
      <div className="light-beam light-beam-1"></div>
      <div className="light-beam light-beam-2"></div>
      
      {/* Visual header */}
      <header className="mausoleum-header">
        <h1 className="mausoleum-title">MASCOT MAUSOLEUM</h1>
        <p className="mausoleum-subtitle">A memorial to the characters that defined generations</p>
      </header>
      
      {/* Sticky era indicator - now clickable to return to timeline */}
      {!viewingTimeline && (
        <div className="era-indicator">
          <div 
            className={`era-pill era-pill-${visibleEra}`}
            onClick={goToTimeline}
          >
            {eras.find(era => era.id === visibleEra)?.name || ''}
            <span className="return-icon">↑</span>
          </div>
        </div>
      )}
      
      {/* Floating completion indicator */}
      {renderCompletionIndicator()}
      
      {/* Timeline navigation */}
      {viewingTimeline && (
        <div className="timeline-section">
          <div className="timeline-navigation">
            <div className="timeline-track"></div>
            
            <div className="timeline-eras">
              {eras.map(era => {
                const eraProgress = getEraProgress(era.id);
                
                return (
                  <div 
                    key={era.id}
                    className="era-marker" 
                    onClick={() => goToEra(era.id)}
                  >
                    <div className="era-dot"></div>
                    <div className="era-label">
                      {era.years} 
                      {eraProgress.visited > 0 && (
                        <span className="era-progress-indicator">
                          {eraProgress.visited}/{eraProgress.total}
                        </span>
                      )}
                    </div>
                    <div className="era-title">{era.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Timeline View Completion Area */}
          {showCompletionButton && (
            <div className="timeline-completion-area">
              <div className="timeline-completion-message">
                You've explored {visitedMascots.length} mascots across different eras
              </div>
              <button 
                className="timeline-exit-button"
                onClick={handleComplete}
              >
                Exit the Mausoleum
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Era content - only show the selected era */}
      {!viewingTimeline && (
        <div className="era-content">
          {/* Pioneers Era */}
          {visibleEra === 'pioneers' && (
            <div id="pioneers-mascots" className="era-section">
              <div className="era-introduction">
                <h2 className="era-intro-title">The Pioneers <span className="era-years">(1898-1950)</span></h2>
                <p className="era-intro-description">The birth of brand personification</p>
              </div>
              
              <div className="mascots-grid">
                {pioneerMascots.map((mascot, index) => (
                  <div 
                    key={mascot.id} 
                    className={`memorial-card pioneers-card ${visitedMascots.includes(mascot.id) ? 'visited' : ''}`}
                    onClick={() => handleMascotClick(mascot)}
                    style={{"--card-index": index}}
                  >
                    <div className="card-image-container">
                      {mascot.image ? (
                        <img src={mascot.image} alt={mascot.name} className="mascot-image" />
                      ) : (
                        <div className="mascot-fallback">{mascot.iconText}</div>
                      )}
                    </div>
                    
                    <div className="mascot-info">
                      <h2 className="mascot-name">{mascot.name}</h2>
                      <p className="mascot-year">{mascot.year}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Exit Button */}
              {renderExitButton()}
            </div>
          )}
          
          {/* Golden Age Era */}
          {visibleEra === 'golden' && (
            <div id="golden-mascots" className="era-section">
              <div className="era-introduction">
                <h2 className="era-intro-title">The Golden Age <span className="era-years">(1950-1985)</span></h2>
                <p className="era-intro-description">Television brings mascots to life</p>
              </div>
              
              <div className="mascots-grid-balanced">
                <div className="mascots-row">
                  {goldenMascots.slice(0, 3).map((mascot, index) => (
                    <div 
                      key={mascot.id} 
                      className={`memorial-card golden-card ${visitedMascots.includes(mascot.id) ? 'visited' : ''}`}
                      onClick={() => handleMascotClick(mascot)}
                      style={{"--card-index": index}}
                    >
                      <div className="card-image-container">
                        {mascot.image ? (
                          <img src={mascot.image} alt={mascot.name} className="mascot-image" />
                        ) : (
                          <div className="mascot-fallback">{mascot.iconText}</div>
                        )}
                      </div>
                      
                      <div className="mascot-info">
                        <h2 className="mascot-name">{mascot.name}</h2>
                        <p className="mascot-year">{mascot.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mascots-row centered">
                  {goldenMascots.slice(3).map((mascot, index) => (
                    <div 
                      key={mascot.id} 
                      className={`memorial-card golden-card ${visitedMascots.includes(mascot.id) ? 'visited' : ''}`}
                      onClick={() => handleMascotClick(mascot)}
                      style={{"--card-index": index + 3}}
                    >
                      <div className="card-image-container">
                        {mascot.image ? (
                          <img src={mascot.image} alt={mascot.name} className="mascot-image" />
                        ) : (
                          <div className="mascot-fallback">{mascot.iconText}</div>
                        )}
                      </div>
                      
                      <div className="mascot-info">
                        <h2 className="mascot-name">{mascot.name}</h2>
                        <p className="mascot-year">{mascot.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Exit Button */}
              {renderExitButton()}
            </div>
          )}
          
          {/* Millennial Shift Era */}
          {visibleEra === 'millennial' && (
            <div id="millennial-mascots" className="era-section">
              <div className="era-introduction">
                <h2 className="era-intro-title">The Millennial Shift <span className="era-years">(1985-2010)</span></h2>
                <p className="era-intro-description">Irony and self-awareness emerge</p>
              </div>
              
              <div className="mascots-grid-balanced">
                <div className="mascots-row">
                  {millennialMascots.slice(0, 3).map((mascot, index) => (
                    <div 
                      key={mascot.id} 
                      className={`memorial-card millennial-card ${visitedMascots.includes(mascot.id) ? 'visited' : ''}`}
                      onClick={() => handleMascotClick(mascot)}
                      style={{"--card-index": index}}
                    >
                      <div className="card-image-container">
                        {mascot.image ? (
                          <img src={mascot.image} alt={mascot.name} className="mascot-image" />
                        ) : (
                          <div className="mascot-fallback">{mascot.iconText}</div>
                        )}
                      </div>
                      
                      <div className="mascot-info">
                        <h2 className="mascot-name">{mascot.name}</h2>
                        <p className="mascot-year">{mascot.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mascots-row centered">
                  {millennialMascots.slice(3).map((mascot, index) => (
                    <div 
                      key={mascot.id} 
                      className={`memorial-card millennial-card ${visitedMascots.includes(mascot.id) ? 'visited' : ''}`}
                      onClick={() => handleMascotClick(mascot)}
                      style={{"--card-index": index + 3}}
                    >
                      <div className="card-image-container">
                        {mascot.image ? (
                          <img src={mascot.image} alt={mascot.name} className="mascot-image" />
                        ) : (
                          <div className="mascot-fallback">{mascot.iconText}</div>
                        )}
                      </div>
                      
                      <div className="mascot-info">
                        <h2 className="mascot-name">{mascot.name}</h2>
                        <p className="mascot-year">{mascot.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Exit Button */}
              {renderExitButton()}
            </div>
          )}
          
          {/* Modern Era */}
          {visibleEra === 'modern' && (
            <div id="modern-mascots" className="era-section">
              <div className="era-introduction">
                <h2 className="era-intro-title">The Digital Natives <span className="era-years">(2010-Present)</span></h2>
                <p className="era-intro-description">Social media reshapes character-driven marketing</p>
              </div>
              
              <div className="mascots-grid">
                {modernMascots.map((mascot, index) => (
                  <div 
                    key={mascot.id} 
                    className={`memorial-card modern-card ${visitedMascots.includes(mascot.id) ? 'visited' : ''}`}
                    onClick={() => handleMascotClick(mascot)}
                    style={{"--card-index": index}}
                  >
                    <div className="card-image-container">
                      {mascot.image ? (
                        <img src={mascot.image} alt={mascot.name} className="mascot-image" />
                      ) : (
                        <div className="mascot-fallback">{mascot.iconText}</div>
                      )}
                    </div>
                    
                    <div className="mascot-info">
                      <h2 className="mascot-name">{mascot.name}</h2>
                      <p className="mascot-year">{mascot.year}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Exit Button */}
              {renderExitButton()}
            </div>
          )}
        </div>
      )}
      
      {/* Improved Storytelling Modal */}
      {isModalOpen && selectedMascot && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="mascot-modal" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>×</button>
            
            {/* Visual Side */}
            <div className="modal-visual-side">
              <div className="modal-gradient-overlay"></div>
              
              <div className="modal-mascot-display">
                {selectedMascot.image ? (
                  <img 
                    src={selectedMascot.image} 
                    alt={selectedMascot.name} 
                    className="mascot-image-large" 
                  />
                ) : (
                  <div className="mascot-silhouette" 
                      style={{backgroundColor: selectedMascot.color, fontSize: '5rem'}}>
                    {selectedMascot.iconText}
                  </div>
                )}
              </div>
              
              <div className="brand-year-tag">
                <h2 className="brand-name">{selectedMascot.name}</h2>
                <p className="brand-year">{selectedMascot.brand}</p>
              </div>
            </div>
            
            {/* Narrative Side */}
            <div className="modal-narrative-side">
              <div className="narrative-container">
                <div className="narrative-tagline">"{selectedMascot.tagline}"</div>
                
                <div className="story-section">
                  <h3 className="story-title">Origin Story</h3>
                  <p className="story-text">{selectedMascot.story.origin}</p>
                </div>
                
                <div className="story-section">
                  <h3 className="story-title">Evolution</h3>
                  <p className="story-text">{selectedMascot.story.evolution}</p>
                </div>
                
                <div className="story-section">
                  <h3 className="story-title">Legacy</h3>
                  <p className="story-text">{selectedMascot.story.legacy}</p>
                </div>
                
                <div className="narrative-reflection">
                  <p>{selectedMascot.narrative}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MascotMausoleum;