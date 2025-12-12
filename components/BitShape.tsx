import React, { useEffect, useState } from 'react';

export interface BitShapeProps {
  map: string[];
  runFast: boolean;
  bias: number;
  className?: string;
}

export const BitShape: React.FC<BitShapeProps> = ({ map, runFast, bias, className }) => {
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
    const speed = runFast ? 50 : 100; 
    
    intervalId = setInterval(() => {
      setBits(prev => prev.map((row, rIndex) => 
        row.map((bit, cIndex) => {
          // Only update valid bits
          if (map[rIndex][cIndex] !== '#') return ' ';
          
          // 50% chance to update any specific bit per tick. 
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