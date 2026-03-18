import React, { useState, useEffect } from 'react';
import { StartMenu } from './components/StartMenu';
import { CharacterCreation } from './components/CharacterCreation';
import { MapScreen } from './components/MapScreen';
import { LevelScreen } from './components/LevelScreen';
import { Instructions } from './components/Instructions';
import { Rewards } from './components/Rewards';
import { Victory } from './components/Victory';
import { IntroScreen } from './components/IntroScreen';
import { levels } from './data/levels';
import { audioManager } from './utils/audioManager';

export type Screen = 'start' | 'character-creation' | 'intro' | 'map' | 'level' | 'instructions' | 'rewards' | 'victory';

export interface PlayerData {
  name: string;
  gender: 'boy' | 'girl';
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');
  const [player, setPlayer] = useState<PlayerData>({ name: '', gender: 'boy' });
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([1]);
  const [score, setScore] = useState<number>(0);
  const [collectedRewards, setCollectedRewards] = useState<string[]>([]);
  const [currentLevelId, setCurrentLevelId] = useState<number>(1);
  const [isMusicOn, setIsMusicOn] = useState(true);
  const [isSoundOn, setIsSoundOn] = useState(true);

  // Initialize audio on first user interaction
  useEffect(() => {
    const handleInteract = () => {
      audioManager.init();
      window.removeEventListener('click', handleInteract);
      window.removeEventListener('keydown', handleInteract);
    };
    window.addEventListener('click', handleInteract);
    window.addEventListener('keydown', handleInteract);
    return () => {
      window.removeEventListener('click', handleInteract);
      window.removeEventListener('keydown', handleInteract);
    };
  }, []);

  // Handle BGM changes based on screen
  useEffect(() => {
    if (['start', 'character-creation', 'instructions'].includes(currentScreen)) {
      audioManager.setBGM('menu');
    } else if (currentScreen === 'victory') {
      audioManager.setBGM('victory');
    } else {
      audioManager.setBGM('level');
    }
  }, [currentScreen]);

  const toggleMusic = () => setIsMusicOn(audioManager.toggleMusic());
  const toggleSound = () => setIsSoundOn(audioManager.toggleSound());

  const handleStartGame = () => {
    if (player.name) {
      setCurrentScreen('map');
    } else {
      setCurrentScreen('character-creation');
    }
  };

  const handleLevelComplete = (levelId: number, pointsEarned: number, rewardName: string) => {
    setScore(prev => prev + pointsEarned);
    if (!collectedRewards.includes(rewardName)) {
      setCollectedRewards(prev => [...prev, rewardName]);
    }
    
    const nextLevelId = levelId + 1;
    if (nextLevelId <= levels.length) {
      if (!unlockedLevels.includes(nextLevelId)) {
        setUnlockedLevels(prev => [...prev, nextLevelId]);
      }
      setCurrentScreen('map');
    } else {
      setCurrentScreen('victory');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-4xl aspect-[4/3] bg-black relative overflow-hidden pixel-borders rounded-lg shadow-2xl">
        
        {/* Top Bar (visible in game screens) */}
        {['map', 'level', 'rewards'].includes(currentScreen) && (
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-50 pointer-events-none">
            <div className="pixel-panel px-4 py-2 flex items-center gap-2 pointer-events-auto">
              <span className="text-xl">⭐</span>
              <span className="font-pixel text-2xl text-yellow-400">{score}</span>
            </div>
            <div className="pixel-panel px-4 py-2 flex items-center gap-3 pointer-events-auto">
              <span className="text-2xl">{player.gender === 'boy' ? '👦' : '👧'}</span>
              <span className="font-pixel text-xl text-blue-300">{player.name}</span>
            </div>
          </div>
        )}

        {/* Audio Controls */}
        <div className="absolute bottom-4 right-4 flex gap-2 z-50">
          <button 
            onClick={toggleMusic} 
            className={`pixel-panel p-2 transition-colors ${!isMusicOn ? 'opacity-50' : 'hover:bg-slate-700'}`}
            title="Toggle Music"
          >
            {isMusicOn ? '🎵 ON' : '🎵 OFF'}
          </button>
          <button 
            onClick={toggleSound} 
            className={`pixel-panel p-2 transition-colors ${!isSoundOn ? 'opacity-50' : 'hover:bg-slate-700'}`}
            title="Toggle Sound"
          >
            {isSoundOn ? '🔊 ON' : '🔊 OFF'}
          </button>
        </div>

        {currentScreen === 'start' && (
          <StartMenu onNavigate={setCurrentScreen} />
        )}
        
        {currentScreen === 'character-creation' && (
          <CharacterCreation 
            player={player} 
            setPlayer={setPlayer} 
            onComplete={() => setCurrentScreen('intro')} 
          />
        )}

        {currentScreen === 'intro' && (
          <IntroScreen 
            playerName={player.name} 
            onComplete={() => setCurrentScreen('map')} 
          />
        )}

        {currentScreen === 'map' && (
          <MapScreen 
            unlockedLevels={unlockedLevels}
            onSelectLevel={(id) => {
              setCurrentLevelId(id);
              setCurrentScreen('level');
            }}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'level' && (
          <LevelScreen 
            levelId={currentLevelId}
            playerName={player.name}
            onComplete={handleLevelComplete}
            onBack={() => setCurrentScreen('map')}
          />
        )}

        {currentScreen === 'instructions' && (
          <Instructions onBack={() => setCurrentScreen('start')} />
        )}

        {currentScreen === 'rewards' && (
          <Rewards 
            collectedRewards={collectedRewards} 
            onBack={() => setCurrentScreen('map')} 
          />
        )}

        {currentScreen === 'victory' && (
          <Victory 
            score={score} 
            playerName={player.name} 
            onRestart={() => {
              setScore(0);
              setUnlockedLevels([1]);
              setCollectedRewards([]);
              setCurrentScreen('start');
            }} 
          />
        )}
      </div>
    </div>
  );
}
