import React from 'react';

interface Props {
  onBack: () => void;
}

export function Instructions({ onBack }: Props) {
  return (
    <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center p-8">
      <div className="pixel-panel p-8 max-w-2xl w-full flex flex-col gap-6 h-full max-h-[80vh] overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-pixel text-4xl text-yellow-400 pixel-text">How to Play</h2>
          <button 
            onClick={onBack}
            className="pixel-button bg-red-600 hover:bg-red-500 text-white font-pixel text-xl py-2 px-4"
          >
            Back
          </button>
        </div>
        
        <div className="flex flex-col gap-6 font-sans text-lg text-slate-200">
          <section>
            <h3 className="font-pixel text-2xl text-blue-300 mb-2">1. The Goal</h3>
            <p>Help Teacher Diego restore the magic of the village by completing reading challenges. You will practice using <strong>"There is"</strong> and <strong>"There are"</strong>.</p>
          </section>

          <section>
            <h3 className="font-pixel text-2xl text-green-300 mb-2">2. The Rules</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use <strong>"There is"</strong> for ONE object (singular).<br/><span className="text-slate-400 italic">Example: There is a book.</span></li>
              <li>Use <strong>"There are"</strong> for TWO OR MORE objects (plural).<br/><span className="text-slate-400 italic">Example: There are three books.</span></li>
            </ul>
          </section>

          <section>
            <h3 className="font-pixel text-2xl text-purple-300 mb-2">3. Points & Rewards</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Correct answer: <span className="text-yellow-400 font-bold">+10 points</span></li>
              <li>First try bonus: <span className="text-yellow-400 font-bold">+20 points</span></li>
              <li>Level complete: <span className="text-yellow-400 font-bold">+50 points</span></li>
              <li>Find treasures in each level to earn extra points and badges!</li>
            </ul>
          </section>
          
          <div className="mt-4 p-4 bg-slate-800 border-2 border-slate-600 rounded">
            <p className="text-center italic text-slate-400">"Read carefully and take your time. You can do it!" - Teacher Diego</p>
          </div>
        </div>
      </div>
    </div>
  );
}
