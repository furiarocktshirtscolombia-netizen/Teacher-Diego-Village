import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  score: number;
  playerName: string;
  onRestart: () => void;
}

export function Victory({ score, playerName, onRestart }: Props) {
  return (
    <div className="w-full h-full bg-slate-900 relative flex flex-col items-center justify-center p-8">
      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/rpg-victory/800/600?blur=2')] bg-cover bg-center opacity-50"></div>
      
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center gap-8">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="pixel-panel p-8 bg-yellow-900/90 border-yellow-400 text-center w-full"
        >
          <div className="text-8xl mb-6 animate-bounce">🏆</div>
          
          <h1 className="font-pixel text-6xl text-yellow-400 pixel-text mb-4">
            Victory!
          </h1>
          
          <p className="font-sans text-2xl text-white mb-8">
            Congratulations, <span className="text-blue-300 font-bold">{playerName}</span>!
            <br />
            You have restored the magic of the village!
          </p>
          
          <div className="flex flex-col items-center gap-4 mb-8">
            <span className="font-pixel text-3xl text-slate-300">Final Score</span>
            <span className="font-pixel text-6xl text-yellow-400 pixel-text">{score}</span>
          </div>

          <div className="text-xl text-green-400 font-sans mb-8">
            "You are a true There Is Master!" - Teacher Diego
          </div>

          <button 
            onClick={onRestart}
            className="pixel-button bg-blue-600 hover:bg-blue-500 text-white font-pixel text-3xl py-4 px-8"
          >
            Play Again
          </button>
        </motion.div>
      </div>
    </div>
  );
}
