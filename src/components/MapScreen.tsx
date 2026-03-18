import React from 'react';
import { levels } from '../data/levels';
import { Screen } from '../App';
import { motion } from 'framer-motion';

interface Props {
  unlockedLevels: number[];
  onSelectLevel: (id: number) => void;
  onNavigate: (screen: Screen) => void;
}

export function MapScreen({ unlockedLevels, onSelectLevel, onNavigate }: Props) {
  return (
    <div className="w-full h-full bg-slate-800 relative flex flex-col items-center justify-center p-8">
      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/rpg-map/800/600?blur=4')] bg-cover bg-center opacity-30"></div>
      
      <div className="relative z-10 w-full max-w-3xl flex flex-col h-full">
        <div className="flex justify-between items-center mb-8 mt-12">
          <h2 className="font-pixel text-5xl text-yellow-400 pixel-text">World Map</h2>
          <div className="flex gap-4">
            <button 
              onClick={() => onNavigate('rewards')}
              className="pixel-button bg-purple-600 hover:bg-purple-500 text-white font-pixel text-xl py-2 px-4"
            >
              Treasures
            </button>
            <button 
              onClick={() => onNavigate('start')}
              className="pixel-button bg-red-600 hover:bg-red-500 text-white font-pixel text-xl py-2 px-4"
            >
              Menu
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
            {levels.map((level, index) => {
              const isUnlocked = unlockedLevels.includes(level.id);
              const isCurrent = Math.max(...unlockedLevels) === level.id;
              
              return (
                <motion.button
                  key={level.id}
                  whileHover={isUnlocked ? { scale: 1.05 } : {}}
                  whileTap={isUnlocked ? { scale: 0.95 } : {}}
                  onClick={() => isUnlocked && onSelectLevel(level.id)}
                  disabled={!isUnlocked}
                  className={`relative p-6 text-left transition-all ${
                    isUnlocked 
                      ? 'pixel-panel bg-blue-900/80 border-blue-400 cursor-pointer hover:bg-blue-800' 
                      : 'pixel-panel bg-slate-800/80 border-slate-600 cursor-not-allowed opacity-60 grayscale'
                  }`}
                >
                  {isCurrent && (
                    <div className="absolute -top-3 -right-3 text-3xl animate-bounce">
                      ⭐
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-pixel text-2xl text-yellow-400">Level {level.id}</span>
                    <span className="text-2xl">{isUnlocked ? '🔓' : '🔒'}</span>
                  </div>
                  
                  <h3 className="font-pixel text-3xl text-white mb-2">{level.title}</h3>
                  <p className="font-sans text-sm text-blue-200">{level.theme}</p>
                  
                  {isUnlocked && (
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-sm text-slate-300 font-pixel">Reward:</span>
                      <span className="text-xl">{level.reward.icon}</span>
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
