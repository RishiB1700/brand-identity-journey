import React, { useState, useEffect, useRef } from 'react';
import './KaleidoscopeLanding.css';

const KaleidoscopeLanding = ({ onContinue }) => {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let lastClickTime = 0;
    
    // Settings for kaleidoscope
    const triangleCount = 10; // Adjust for more coverage
    const angleIncrement = (Math.PI * 2) / triangleCount;
    let patternOffsetX = 0;
    let patternOffsetY = 0;
    let rotation = 0;
    const rotationSpeed = 0.0003;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Create larger pattern canvas for kaleidoscope source
    const patternCanvas = document.createElement('canvas');
    const patternCtx = patternCanvas.getContext('2d');
    patternCanvas.width = 1000; // Much larger pattern
    patternCanvas.height = 1000;
    
    // Brand-based color palette
    const colorPalette = [
      '#e2231a', // Wendy's red
      '#58cc02', // Duolingo green
      '#FF69B4', // Barbie pink
      '#4A90E2', // Twitter blue
      '#FFC72C', // McDonald's yellow
      '#833AB4'  // Instagram purple
    ];
    
    // Generate a vibrant, colorful pattern with MUCH more density
    const generatePattern = () => {
      // Fill with transparent background
      patternCtx.clearRect(0, 0, patternCanvas.width, patternCanvas.height);
      
      // Create a pattern with multiple layers - MUCH more elements
      
      // Base layer - large elements for structure
      for (let i = 0; i < 200; i++) { // More elements
        const colorIndex = Math.floor(Math.random() * colorPalette.length);
        const color = colorPalette[colorIndex];
        
        // Wider distribution
        const x = Math.random() * patternCanvas.width;
        const y = Math.random() * patternCanvas.height;
        const size = 20 + Math.random() * 60; // Larger sizes
        
        patternCtx.fillStyle = color;
        patternCtx.globalAlpha = 0.3 + Math.random() * 0.4;
        
        // Different shape types
        const shapeType = Math.floor(Math.random() * 4);
        switch(shapeType) {
          case 0: // Circle
            patternCtx.beginPath();
            patternCtx.arc(x, y, size, 0, Math.PI * 2);
            patternCtx.fill();
            break;
          case 1: // Square
            patternCtx.save();
            patternCtx.translate(x, y);
            patternCtx.rotate(Math.random() * Math.PI * 2);
            patternCtx.fillRect(-size/2, -size/2, size, size);
            patternCtx.restore();
            break;
          case 2: // Triangle
            patternCtx.beginPath();
            patternCtx.save();
            patternCtx.translate(x, y);
            patternCtx.rotate(Math.random() * Math.PI * 2);
            patternCtx.moveTo(0, -size/2);
            patternCtx.lineTo(size/2, size/2);
            patternCtx.lineTo(-size/2, size/2);
            patternCtx.closePath();
            patternCtx.fill();
            patternCtx.restore();
            break;
          case 3: // Star
            patternCtx.beginPath();
            patternCtx.save();
            patternCtx.translate(x, y);
            patternCtx.rotate(Math.random() * Math.PI * 2);
            for (let j = 0; j < 5; j++) {
              const angle = (j * Math.PI * 2) / 5;
              const outerX = Math.cos(angle) * size;
              const outerY = Math.sin(angle) * size;
              const innerX = Math.cos(angle + Math.PI/5) * (size/2);
              const innerY = Math.sin(angle + Math.PI/5) * (size/2);
              
              if (j === 0) {
                patternCtx.moveTo(outerX, outerY);
              } else {
                patternCtx.lineTo(outerX, outerY);
              }
              
              patternCtx.lineTo(innerX, innerY);
            }
            patternCtx.closePath();
            patternCtx.fill();
            patternCtx.restore();
            break;
        }
      }
      
      // Middle layer - smaller elements for detail
      for (let i = 0; i < 300; i++) { // More elements
        const colorIndex = Math.floor(Math.random() * colorPalette.length);
        const color = colorPalette[colorIndex];
        const x = Math.random() * patternCanvas.width;
        const y = Math.random() * patternCanvas.height;
        const size = 8 + Math.random() * 20;
        
        patternCtx.fillStyle = color;
        patternCtx.globalAlpha = 0.4 + Math.random() * 0.4;
        
        patternCtx.beginPath();
        patternCtx.arc(x, y, size, 0, Math.PI * 2);
        patternCtx.fill();
      }
      
      // Top layer - white highlights
      for (let i = 0; i < 150; i++) { // More elements
        const x = Math.random() * patternCanvas.width;
        const y = Math.random() * patternCanvas.height;
        const size = 2 + Math.random() * 6;
        
        patternCtx.fillStyle = '#ffffff';
        patternCtx.globalAlpha = 0.5 + Math.random() * 0.5;
        patternCtx.beginPath();
        patternCtx.arc(x, y, size, 0, Math.PI * 2);
        patternCtx.fill();
      }
    };
    
    // Draw kaleidoscope with depth effect
    const drawKaleidoscope = () => {
      // Clear canvas
      ctx.fillStyle = '#0a0a14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      // Much larger radius to ensure screen coverage
      const radius = Math.max(canvas.width, canvas.height) * 1.5;
      
      // Loop through each triangle segment
      for (let i = 0; i < triangleCount; i++) {
        const angle = i * angleIncrement + rotation;
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle);
        
        // Create a triangular path for clipping
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(radius * Math.cos(0), radius * Math.sin(0));
        ctx.lineTo(radius * Math.cos(angleIncrement), radius * Math.sin(angleIncrement));
        ctx.closePath();
        
        // Scale pattern to ensure full coverage
        const scale = 1.5; // Larger scale factor
        
        // Alternative segments for variation
        if (i % 2 === 0) {
          // Draw pattern with offset
          ctx.save();
          ctx.clip(); // Clip to triangle
          
          // Apply pattern with transformations for movement and scale
          ctx.translate(patternOffsetX, patternOffsetY);
          ctx.scale(scale, scale);
          ctx.drawImage(patternCanvas, -patternCanvas.width/2, -patternCanvas.height/2);
          ctx.restore();
        } else {
          // Draw mirrored pattern for alternating segments
          ctx.save();
          ctx.clip(); // Clip to triangle
          
          // Apply mirrored pattern
          ctx.scale(-scale, scale); // Mirror horizontally and scale
          ctx.translate(-patternOffsetX, patternOffsetY);
          ctx.drawImage(patternCanvas, -patternCanvas.width/2, -patternCanvas.height/2);
          ctx.restore();
        }
        
        ctx.restore();
      }
    };
    
    // Handle click for pattern transformation
    const handleClick = (e) => {
      const now = Date.now();
      if (now - lastClickTime < 500) return;
      lastClickTime = now;
      
      // Generate new pattern
      generatePattern();
      
      // Add ripple effect
      createRipple(e.clientX, e.clientY);
    };
    
    canvas.addEventListener('click', handleClick);
    
    // Ripple effects
    const ripples = [];
    
    const createRipple = (x, y) => {
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.max(canvas.width, canvas.height) * 0.4,
        alpha: 1
      });
    };
    
    // Animation loop
    const animate = () => {
      // Update pattern position very slightly for subtle movement
      patternOffsetX += 0.2;
      patternOffsetY += 0.15;
      
      // Update rotation
      rotation += rotationSpeed;
      
      // Draw the kaleidoscope
      drawKaleidoscope();
      
      // Draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${r.alpha})`;
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Update ripple
        r.radius += 10;
        r.alpha -= 0.02;
        
        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    generatePattern();
    
    setTimeout(() => {
      animate();
      setIsVisible(true);
      
      // Initial ripple at center
      createRipple(canvas.width/2, canvas.height/2);
      
      // Sequence the appearance of elements
      setTimeout(() => setTitleVisible(true), 500);
      setTimeout(() => setSubtitleVisible(true), 1500);
      setTimeout(() => {
        setButtonVisible(true);
        setHintVisible(true);
        setTimeout(() => setHintVisible(false), 3000);
      }, 2500);
      
      // Auto-regenerate pattern every 15 seconds for visual interest
      const patternInterval = setInterval(() => {
        generatePattern();
        createRipple(canvas.width/2, canvas.height/2);
      }, 15000);
      
      return () => clearInterval(patternInterval);
    }, 100);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <div className={`kaleidoscope-landing ${isVisible ? 'visible' : ''}`}>
      <canvas 
        ref={canvasRef} 
        className="kaleidoscope-canvas"
      />
      
      <div className="content-container">
        <div className="text-panel"></div>
        
        <div className="landing-content">
          <h1 className={`landing-title ${titleVisible ? 'visible' : ''}`}>
            What Do You Want Me to Be?
          </h1>
          
          <p className={`landing-subtitle ${subtitleVisible ? 'visible' : ''}`}>
            Explore the evolving identities of brands through the digital age
          </p>
          
          <button 
            className={`landing-cta ${buttonVisible ? 'visible' : ''}`}
            onClick={onContinue}
          >
            Enter the Experience
          </button>
        </div>
      </div>
      
      <div className={`click-anywhere ${hintVisible ? 'visible' : ''}`}>
        Click anywhere to transform the kaleidoscope
      </div>
    </div>
  );
};

export default KaleidoscopeLanding;