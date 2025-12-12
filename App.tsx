import React, { useState } from 'react';
import { BinaryLock } from './components/BinaryLock';
import { BackgroundEffects } from './components/BackgroundEffects';

const App: React.FC = () => {
  const [isLocked, setIsLocked] = useState(true);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-900 text-slate-100">
      <BackgroundEffects />
      
      <div className="z-10 flex flex-col items-center gap-8">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse">
          {isLocked ? 'SYSTEM LOCKED' : 'ACCESS GRANTED'}
        </h1>
        
        <p className="text-slate-400 text-sm md:text-base max-w-md text-center opacity-80">
          {isLocked 
            ? 'Click the biometric interface below to initiate decryption sequence.' 
            : 'Secure channel established. System is open.'}
        </p>

        <div className="mt-8">
          <BinaryLock isLocked={isLocked} onToggle={() => setIsLocked(!isLocked)} />
        </div>
      </div>
    </div>
  );
};

export default App;