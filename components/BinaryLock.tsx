import React, { useEffect, useState } from 'react';

interface BinaryLockProps {
  isLocked: boolean;
  onToggle: () => void;
}

// Maps defining the shape using '#' for visible bits
const SHACKLE_MAP = [
  "   ######   ",
  "  ##    ##  ",
  "  ##    ##  ",
  "  ##    ##  ",
  "  ##    ##  ",
  "  ##    ##  ",
  "  ##    ##  ",
];

const BODY_MAP = [
  "################",
  "################",
  "################",
  "#######  #######",
  "######    ######",
  "######    ######",
  "#######  #######",
  "################",
  "################",
];

export const BinaryLock: React.FC<BinaryLockProps> = ({ isLocked, onToggle }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle click to trigger animation then toggle
  const handleClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Play transition animation
    const delay = isLocked ? 800 : 300; 
    
    setTimeout(() => {
      onToggle();
      setIsAnimating(false);
    }, delay);
  };

  const statusColor = isLocked ? 'text-red-500' : 'text-emerald-400';
  
  // Calculate bias (probability of a '1')
  // Locked: 0.0 (All 0s)
  // Unlocked: 1.0 (All 1s)
  // Transitioning: Chaos (0.5)
  const bias = isAnimating ? 0.5 : (isLocked ? 0.0 : 1.0);
  
  // Speed Control: 
  // Fast when animating (chaos) or unlocked (active state)
  // "Slow" when locked (stable state), but fast enough to settle visually
  const runFast = isAnimating || !isLocked;

  return (
    <div 
      className="relative flex flex-col items-center justify-center select-none cursor-pointer group scale-100 md:scale-125 transition-transform duration-300 active:scale-95"
      onClick={handleClick}
      role="button"
      aria-label={isLocked ? "Unlock System" : "Lock System"}
    >
      {/* Shackle Container */}
      <div 
        className={`
          relative z-0 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          ${isLocked ? 'translate-y-[2.5rem]' : '-translate-y-4 rotate-[-25deg]'}
          origin-[75%_90%]
        `}
      >
        <BitShape 
          map={SHACKLE_MAP} 
          runFast={runFast}
          bias={bias}
          className={statusColor}
        />
      </div>

      {/* Lock Body Container */}
      <div className="relative z-10">
         {/* Dark backing to obscure shackle legs behind the body text */}
         <div className="absolute inset-1 bg-slate-900 rounded-lg z-[-1]" />
         
        <BitShape 
          map={BODY_MAP} 
          runFast={runFast}
          bias={bias}
          className={`${statusColor} drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]`}
        />
        
        {/* Glow effect backing */}
        <div className={`
          absolute inset-0 rounded-xl bg-current opacity-5 blur-xl transition-opacity duration-500 
          ${isLocked ? 'text-red-500' : 'text-emerald-400'}
        `} />
      </div>

      <div className={`
        mt-12 text-xs font-mono tracking-[0.3em] font-bold uppercase transition-all duration-300
        ${statusColor}
        ${isAnimating ? 'animate-pulse' : ''}
      `}>
        {isAnimating ? 'DECRYPTING...' : (isLocked ? 'LOCKED' : 'UNLOCKED')}
      </div>
    </div>
  );
};

// --- Helper Component for Rendering Bit Grids ---

interface BitShapeProps {
  map: string[];
  runFast: boolean;
  bias: number;
  className?: string;
}

const BitShape: React.FC<BitShapeProps> = ({ map, runFast, bias, className }) => {
  // Initialize bits with strict adherence to current bias
  const [bits, setBits] = useState<string[][]>(() => 
    map.map(row => row.split('').map(char => {
      if (char !== '#') return ' ';
      return Math.random() < bias ? '1' : '0';
    }))
  );

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    
    // Fast (50ms) for chaos/active, Slow (100ms) for stable decay and "breathing" effect
    // 100ms allows the blinking to feel like a terminal refresh rate
    const speed = runFast ? 50 : 100; 
    
    intervalId = setInterval(() => {
      setBits(prev => prev.map((row, rIndex) => 
        row.map((bit, cIndex) => {
          // Only update valid bits
          if (map[rIndex][cIndex] !== '#') return ' ';
          
          // 50% chance to update any specific bit per tick. 
          // Higher update rate (0.5) ensures faster convergence to all-0s/all-1s
          if (Math.random() > 0.5) return bit;
          
          // Generate new bit based on current bias
          return Math.random() < bias ? '1' : '0';
        })
      ));
    }, speed);

    return () => clearInterval(intervalId);
  }, [runFast, bias, map]);

  return (
    <div className={`flex flex-col items-center leading-none ${className}`}>
      {bits.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((bit, colIndex) => {
            const isVisible = map[rowIndex][colIndex] === '#';
            
            // Random flicker effect: 
            // 5% chance to dim significantly
            // 2% chance to be brighter (if using text shadow, but here we stick to opacity)
            // This is re-evaluated every render cycle (approx every 50-100ms)
            const randomVal = Math.random();
            const isDim = randomVal < 0.05;
            const isBright = randomVal > 0.98;

            return (
              <span 
                key={colIndex} 
                className={`
                  w-[1.2ch] h-[1.2em] flex items-center justify-center 
                  font-bold font-mono text-base md:text-xl
                  transition-all duration-75
                  ${isVisible 
                    ? (isDim ? 'opacity-40 scale-90' : (isBright ? 'opacity-100 scale-110 brightness-150' : 'opacity-90')) 
                    : 'opacity-0'
                  }
                `}
                aria-hidden="true"
              >
                {isVisible ? bit : '0'}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};