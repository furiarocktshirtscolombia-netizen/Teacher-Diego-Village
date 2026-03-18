import React, { useState, useEffect } from 'react';
import { levels, Question } from '../data/levels';
import { DialogBox } from './DialogBox';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager } from '../utils/audioManager';

interface Props {
  levelId: number;
  playerName: string;
  onComplete: (levelId: number, pointsEarned: number, rewardName: string) => void;
  onBack: () => void;
}

type Phase = 'intro' | 'playing' | 'feedback' | 'completed';

export function LevelScreen({ levelId, playerName, onComplete, onBack }: Props) {
  const level = levels.find(l => l.id === levelId)!;
  
  const [phase, setPhase] = useState<Phase>('intro');
  const [introIndex, setIntroIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const currentQuestion = level.questions[questionIndex];

  const handleNextIntro = () => {
    if (introIndex < level.introDialog.length - 1) {
      setIntroIndex(prev => prev + 1);
    } else {
      setPhase('playing');
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer.trim().toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
    
    if (isCorrect) {
      audioManager.playSFX('correct');
    } else {
      audioManager.playSFX('wrong');
    }
    
    setFeedback({
      isCorrect,
      message: isCorrect ? currentQuestion.feedbackCorrect : currentQuestion.feedbackIncorrect
    });
    
    setPhase('feedback');
  };

  const handleNextQuestion = () => {
    if (feedback?.isCorrect) {
      // Award points
      let points = 10; // Base points
      if (attempts === 0) points += 20; // Accuracy bonus
      setPointsEarned(prev => prev + points);
      
      if (questionIndex < level.questions.length - 1) {
        setQuestionIndex(prev => prev + 1);
        setPhase('playing');
        setSelectedAnswer('');
        setFeedback(null);
        setAttempts(0);
      } else {
        // Level complete
        audioManager.playSFX('treasure');
        setPointsEarned(prev => prev + 50); // Completion bonus
        setPhase('completed');
      }
    } else {
      // Try again
      setAttempts(prev => prev + 1);
      setPhase('playing');
      setSelectedAnswer('');
      setFeedback(null);
    }
  };

  const finishLevel = () => {
    if (levelId === levels.length) {
      audioManager.playSFX('complete');
    }
    onComplete(levelId, pointsEarned + level.reward.points, level.reward.name);
  };

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center p-8 bg-slate-900">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${level.backgroundUrl})` }}
      ></div>
      
      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center h-full">
        
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-8 mt-12">
          <div className="pixel-panel px-4 py-2 bg-slate-800/90 border-slate-500">
            <h2 className="font-pixel text-3xl text-yellow-400">{level.title}</h2>
          </div>
          <button 
            onClick={onBack}
            className="pixel-button bg-red-600 hover:bg-red-500 text-white font-pixel text-xl py-2 px-4"
          >
            Quit
          </button>
        </div>

        {/* Intro Phase */}
        {phase === 'intro' && (
          <div className="flex-1 flex flex-col items-center justify-center gap-8 w-full">
            <div className="pixel-panel p-4 bg-blue-900/80 border-blue-400 animate-pulse">
              <div className="text-8xl">🧙‍♂️</div>
            </div>
            <DialogBox 
              speaker="Teacher Diego" 
              text={level.introDialog[introIndex].replace('{player}', playerName)} 
              onNext={handleNextIntro}
              isLast={introIndex === level.introDialog.length - 1}
            />
          </div>
        )}

        {/* Playing Phase */}
        {phase === 'playing' && (
          <div className="flex-1 flex flex-col items-center justify-center gap-8 w-full">
            <div className="pixel-panel bg-slate-800/90 border-slate-400 p-8 w-full">
              <div className="flex justify-between items-center mb-6">
                <span className="font-pixel text-xl text-slate-400">Question {questionIndex + 1} of {level.questions.length}</span>
              </div>
              
              <h3 className="font-sans text-2xl md:text-3xl font-semibold text-white mb-8 leading-relaxed">
                {currentQuestion.text}
              </h3>

              {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedAnswer(option)}
                      className={`pixel-panel p-4 text-left transition-all font-sans text-xl ${
                        selectedAnswer === option 
                          ? 'bg-blue-600 border-blue-300 scale-105' 
                          : 'bg-slate-700 border-slate-500 hover:bg-slate-600'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'fill-blank' && (
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    value={selectedAnswer}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    placeholder="Type 'There is' or 'There are'"
                    className="bg-slate-900 border-4 border-slate-500 p-4 font-sans text-2xl text-white focus:outline-none focus:border-yellow-400"
                    autoFocus
                  />
                </div>
              )}

              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedAnswer}
                  className="pixel-button bg-green-500 hover:bg-green-400 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-pixel text-2xl py-3 px-8"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Feedback Phase */}
        {phase === 'feedback' && feedback && (
          <div className="flex-1 flex flex-col items-center justify-center gap-8 w-full">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`pixel-panel p-8 w-full text-center ${
                feedback.isCorrect ? 'bg-green-900/90 border-green-400' : 'bg-red-900/90 border-red-400'
              }`}
            >
              <div className="text-6xl mb-4">
                {feedback.isCorrect ? '✨' : '❌'}
              </div>
              <h3 className="font-pixel text-4xl text-white mb-4">
                {feedback.isCorrect ? 'Correct!' : 'Not quite...'}
              </h3>
              <p className="font-sans text-2xl text-slate-200 mb-8">
                {feedback.message}
              </p>
              <button
                onClick={handleNextQuestion}
                className="pixel-button bg-blue-500 hover:bg-blue-400 text-white font-pixel text-2xl py-3 px-8"
              >
                {feedback.isCorrect ? 'Continue' : 'Try Again'}
              </button>
            </motion.div>
          </div>
        )}

        {/* Completed Phase */}
        {phase === 'completed' && (
          <div className="flex-1 flex flex-col items-center justify-center gap-8 w-full">
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="pixel-panel bg-yellow-900/90 border-yellow-400 p-8 w-full text-center flex flex-col items-center"
            >
              <h2 className="font-pixel text-5xl text-yellow-400 mb-2">Level Complete!</h2>
              <p className="font-sans text-xl text-slate-300 mb-8">Great job, {playerName}!</p>
              
              <div className="flex items-center gap-8 mb-8">
                <div className="flex flex-col items-center">
                  <span className="text-sm text-slate-400 font-pixel mb-2">Points Earned</span>
                  <span className="font-pixel text-4xl text-white">+{pointsEarned}</span>
                </div>
                
                <div className="w-px h-16 bg-slate-600"></div>
                
                <div className="flex flex-col items-center">
                  <span className="text-sm text-slate-400 font-pixel mb-2">Treasure Found</span>
                  <div className="flex items-center gap-2">
                    <span className="text-4xl">{level.reward.icon}</span>
                    <span className="font-pixel text-2xl text-yellow-300">{level.reward.name}</span>
                  </div>
                  <span className="text-xs text-yellow-500 mt-1">+{level.reward.points} pts</span>
                </div>
              </div>

              <button
                onClick={finishLevel}
                className="pixel-button bg-green-500 hover:bg-green-400 text-white font-pixel text-3xl py-4 px-12 animate-pulse"
              >
                Claim Reward
              </button>
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
}
