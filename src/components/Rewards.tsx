import React from 'react';
import { levels } from '../data/levels';
import { motion } from 'framer-motion';

interface Props {
  collectedRewards: string[];
  onBack: () => void;
}

export function Rewards({ collectedRewards, onBack }: Props) {
  const allRewards = levels.map(l => l.reward);

  return (
    <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center p-8">
      <div className="pixel-panel p-8 max-w-3xl w-full flex flex-col gap-6 h-full max-h-[80vh] overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-pixel text-4xl text-yellow-400 pixel-text">Your Treasures</h2>
          <button 
            onClick={onBack}
            className="pixel-button bg-red-600 hover:bg-red-500 text-white font-pixel text-xl py-2 px-4"
          >
            Back
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {allRewards.map((reward, index) => {
            const isCollected = collectedRewards.includes(reward.name);
            
            return (
              <motion.div
                key={index}
                whileHover={isCollected ? { scale: 1.05 } : {}}
                className={`pixel-panel p-6 flex flex-col items-center justify-center text-center transition-all ${
                  isCollected 
                    ? 'bg-purple-900/80 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]' 
                    : 'bg-slate-800/80 border-slate-600 opacity-50 grayscale'
                }`}
              >
                <div className="text-6xl mb-4">
                  {isCollected ? reward.icon : '❓'}
                </div>
                <h3 className="font-pixel text-xl text-white mb-2">
                  {isCollected ? reward.name : 'Locked'}
                </h3>
                {isCollected && (
                  <span className="text-sm text-yellow-400 font-pixel">+{reward.points} pts</span>
                )}
              </motion.div>
            );
          })}
        </div>

        {collectedRewards.length === 0 && (
          <div className="text-center mt-8 text-slate-400 font-sans text-lg">
            Complete levels to unlock magical treasures!
          </div>
        )}
      </div>
    </div>
  );
}
