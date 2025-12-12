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

      <div className="z-30 flex flex-col items-center justify-center w-full max-w-6xl px-4 h-full">
        {/* Header - z-50 ensures text stays ON TOP of the lock if they overlap */}
        <div className="relative z-50 text-center w-full min-h-[14rem] flex items-end justify-center pb-8">
          {isLocked ? (
            <div className="space-y-4 animate-[fadeIn_0.5s_ease-out]">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 leading-tight">
                Squad PREPAYMENT & PIPELINE
              </h1>
            </div>
          ) : (
            <div className="animate-[popUp_0.8s_cubic-bezier(0.34,1.56,0.64,1)_forwards] mb-2 perspective-1000">
              <h1 className="text-4xl md:text-7xl font-serif italic text-yellow-500 text-center leading-tight drop-shadow-[0_4px_8px_black] animate-[glowPulse_3s_infinite]">
                "One pipeline to <span className="text-orange-500 font-bold drop-shadow-[0_0_30px_rgba(249,115,22,1)] inline-block hover:scale-110 transition-transform duration-300">rule</span> them all"
              </h1>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="relative z-0 flex flex-col items-center justify-start w-full">
          {/* Lock Component Wrapper 
              - Added padding (p-12) to reserve space for the scale transform so it doesn't bleed into text 
              - Added mt-4 to provide a little more breathing room
          */}
          <div className="transition-transform duration-500 scale-125 md:scale-150 p-12 mt-4">
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
        @keyframes popUp {
          0% { opacity: 0; transform: scale(0.5) translateY(50px); filter: blur(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
        @keyframes glowPulse {
          0%, 100% { text-shadow: 0 0 15px rgba(234, 179, 8, 0.4); }
          50% { text-shadow: 0 0 40px rgba(234, 179, 8, 0.9), 0 0 20px rgba(251, 191, 36, 0.6); }
        }
      `}</style>
    </div>
  );
};

export default App;