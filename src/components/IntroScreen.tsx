import React, { useState, useEffect } from 'react';
import { DialogBox } from './DialogBox';

interface Props {
  playerName: string;
  onComplete: () => void;
}

export function IntroScreen({ playerName, onComplete }: Props) {
  const [dialogIndex, setDialogIndex] = useState(0);

  const dialogs = [
    `Hello, ${playerName}! I am Teacher Diego.`,
    "Welcome to our magic village.",
    "We have a big problem. The magic words 'there is' and 'there are' are lost!",
    "I need your help to find them and restore the village.",
    "Are you ready for the adventure?"
  ];

  const handleNext = () => {
    if (dialogIndex < dialogs.length - 1) {
      setDialogIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="w-full h-full bg-slate-900 relative flex flex-col items-center justify-center p-8">
      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/rpg-town/800/600?blur=2')] bg-cover bg-center opacity-40"></div>
      
      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-2xl">
        <div className="pixel-panel p-4 bg-blue-900/80 border-blue-400 animate-pulse">
          <div className="text-8xl">🧙‍♂️</div>
        </div>
        
        <DialogBox 
          speaker="Teacher Diego" 
          text={dialogs[dialogIndex]} 
          onNext={handleNext}
          isLast={dialogIndex === dialogs.length - 1}
        />
      </div>
    </div>
  );
}
