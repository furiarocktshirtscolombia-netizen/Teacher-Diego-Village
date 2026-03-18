import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Props {
  speaker: string;
  text: string;
  onNext: () => void;
  isLast?: boolean;
}

export function DialogBox({ speaker, text, onNext, isLast = false }: Props) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 30); // Typing speed

    return () => clearInterval(interval);
  }, [text]);

  const handleInteraction = () => {
    if (isTyping) {
      // Skip typing
      setDisplayedText(text);
      setIsTyping(false);
    } else {
      onNext();
    }
  };

  return (
    <div 
      className="w-full max-w-2xl pixel-panel bg-slate-900/90 border-slate-300 p-4 cursor-pointer relative"
      onClick={handleInteraction}
    >
      <div className="absolute -top-6 left-4 bg-yellow-500 border-4 border-yellow-700 px-4 py-1 font-pixel text-xl text-black">
        {speaker}
      </div>
      
      <div className="min-h-[100px] mt-4 font-sans text-xl md:text-2xl leading-relaxed text-white">
        {displayedText}
        {isTyping && <span className="animate-pulse">_</span>}
      </div>
      
      {!isTyping && (
        <motion.div 
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="absolute bottom-4 right-4 text-yellow-400 font-pixel text-xl"
        >
          {isLast ? 'Start! ▶' : 'Next ▼'}
        </motion.div>
      )}
    </div>
  );
}
