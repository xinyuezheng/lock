import React from 'react';

export const BackgroundEffects: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Radial Gradient for focus */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-slate-900 opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-transparent to-slate-900 opacity-80" />

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
    </div>
  );
};