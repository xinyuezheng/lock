import React, { useState } from 'react';
import { BinaryLock } from './components/BinaryLock';
import { BackgroundEffects } from './components/BackgroundEffects';

const App: React.FC = () => {
  const [isLocked, setIsLocked] = useState(true);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-900 text-slate-100 font-sans selection:bg-yellow-500/30">
      <BackgroundEffects />
      
      {/* LOTR Themed Background Layer - Fades in when unlocked */}
      <div 
        className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out pointer-events-none ${isLocked ? 'opacity-0' : 'opacity-100'}`}
      >
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        
        {/* Fiery Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 via-transparent to-black/80 z-10 mix-blend-overlay" />
        
        {/* Ring Script Background Texture */}
        <div 
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images4.alphacoders.com/600/600528.jpg')`, // Classic One Ring script on black
            filter: 'sepia(1) hue-rotate(-50deg) saturate(2) contrast(1.2)' // Make it fiery gold/red
          }}
        />
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] z-20" />
      </div>

      <div className="z-30 flex flex-col items-center justify-center gap-16 md:gap-24 w-full max-w-6xl px-4">
        {/* Header */}
        <div className="text-center w-full min-h-[8rem] flex items-center justify-center">
          {isLocked ? (
            <div className="space-y-4 animate-[fadeIn_0.5s_ease-out]">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                SYSTEM LOCKED
              </h1>
              <p className="text-slate-400 text-sm md:text-base tracking-widest uppercase opacity-60 font-mono">
                Biometric Encryption Active
              </p>
            </div>
          ) : (
            <div className="animate-[fadeIn_1s_ease-out]">
              <h1 className="text-3xl md:text-6xl font-serif italic text-yellow-500 text-center leading-relaxed drop-shadow-[0_4px_8px_black] animate-[pulse_3s_infinite]">
                "One pipeline to <span className="text-orange-500 font-bold drop-shadow-[0_0_20px_rgba(249,115,22,0.8)]">rule</span> them all"
              </h1>
            </div>
          )}
        </div>

        {/* Main Content Area - Lock is centered with ample spacing */}
        <div className="flex flex-col items-center justify-center w-full">
          {/* Lock Component */}
          <div className="transition-transform duration-500 scale-125 md:scale-150">
            <BinaryLock isLocked={isLocked} onToggle={() => setIsLocked(!isLocked)} />
          </div>
        </div>
      </div>
      
      {/* Global Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;