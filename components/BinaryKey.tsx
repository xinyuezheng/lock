import React from 'react';
import { BitShape } from './BitShape';

const KEY_MAP = [
  "   ######   ",
  "  ##    ##  ",
  "  ##    ##  ",
  "   ######   ",
  "     ##     ",
  "     ##     ",
  "     ##     ",
  "   ####     ",
  "   ####     ",
  "     ##     ",
  "   ####     ",
];

export const BinaryKey: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center select-none scale-100 md:scale-125 opacity-80 hover:opacity-100 transition-opacity duration-300">
      
      {/* Key Body */}
      <div className="relative z-10">
         <div className="absolute inset-1 bg-slate-900 rounded-lg z-[-1]" />
         
         {/* 
           Using bias 0.5 for purely random chaotic energy, 
           and runFast=true for constant activity 
         */}
         <BitShape 
           map={KEY_MAP} 
           runFast={true} 
           bias={0.5} 
           className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" 
         />
         
         {/* Glow effect */}
         <div className="absolute inset-0 rounded-full bg-cyan-400 opacity-10 blur-xl animate-pulse" />
      </div>

      {/* Label matching the lock's label style */}
      <div className="mt-12 text-xs font-mono tracking-[0.3em] font-bold uppercase text-cyan-400 animate-pulse">
        Magic Pipeline
      </div>
    </div>
  );
};