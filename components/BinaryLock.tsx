import React, { useState } from 'react';
import { BitShape } from './BitShape';

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
  
  // Speed Control
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