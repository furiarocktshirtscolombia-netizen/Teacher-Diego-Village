import React from 'react';
import { PlayerData } from '../App';

interface Props {
  player: PlayerData;
  setPlayer: React.Dispatch<React.SetStateAction<PlayerData>>;
  onComplete: () => void;
}

export function CharacterCreation({ player, setPlayer, onComplete }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (player.name.trim()) {
      onComplete();
    }
  };

  return (
    <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center p-8">
      <div className="pixel-panel p-8 max-w-md w-full flex flex-col gap-6">
        <h2 className="font-pixel text-4xl text-center text-yellow-400 pixel-text">Create Character</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-pixel text-2xl text-white">Your Name:</label>
            <input 
              type="text" 
              value={player.name}
              onChange={(e) => setPlayer({ ...player, name: e.target.value })}
              className="bg-slate-900 border-4 border-slate-600 p-3 font-pixel text-2xl text-white focus:outline-none focus:border-yellow-400"
              placeholder="Enter name..."
              maxLength={12}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-pixel text-2xl text-white">Select Avatar:</label>
            <div className="flex justify-center gap-8 mt-2">
              <button
                type="button"
                onClick={() => setPlayer({ ...player, gender: 'boy' })}
                className={`pixel-panel p-4 transition-transform ${player.gender === 'boy' ? 'border-yellow-400 scale-110' : 'border-slate-600 opacity-70 hover:opacity-100'}`}
              >
                <div className="text-6xl">👦</div>
                <div className="font-pixel text-xl mt-2 text-center">Boy</div>
              </button>
              
              <button
                type="button"
                onClick={() => setPlayer({ ...player, gender: 'girl' })}
                className={`pixel-panel p-4 transition-transform ${player.gender === 'girl' ? 'border-yellow-400 scale-110' : 'border-slate-600 opacity-70 hover:opacity-100'}`}
              >
                <div className="text-6xl">👧</div>
                <div className="font-pixel text-xl mt-2 text-center">Girl</div>
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={!player.name.trim()}
            className="pixel-button bg-green-500 hover:bg-green-400 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-pixel text-3xl py-4 mt-4"
          >
            Start Adventure
          </button>
        </form>
      </div>
    </div>
  );
}
