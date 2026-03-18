import React from 'react';
import { Screen } from '../App';

interface Props {
  onNavigate: (screen: Screen) => void;
}

export function StartMenu({ onNavigate }: Props) {
  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://picsum.photos/seed/rpg-village/800/600?blur=4)' }}>
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="pixel-panel p-8 text-center animate-bounce">
          <h1 className="font-pixel text-5xl md:text-6xl text-yellow-400 pixel-text mb-2">
            The Village of
          </h1>
          <h1 className="font-pixel text-6xl md:text-7xl text-white pixel-text">
            Teacher Diego
          </h1>
        </div>

        <div className="flex flex-col gap-4 w-64">
          <button 
            onClick={() => onNavigate('character-creation')}
            className="pixel-button bg-green-500 hover:bg-green-400 text-white font-pixel text-2xl py-3 px-6"
          >
            Start Game
          </button>
          <button 
            onClick={() => onNavigate('instructions')}
            className="pixel-button bg-blue-500 hover:bg-blue-400 text-white font-pixel text-2xl py-3 px-6"
          >
            How to Play
          </button>
        </div>
      </div>
    </div>
  );
}
