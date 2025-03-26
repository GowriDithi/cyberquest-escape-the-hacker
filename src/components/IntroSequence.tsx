
import React, { useState } from 'react';
import Terminal from './Terminal';
import { useGameContext } from '../context/GameContext';
import { motion } from 'framer-motion';
import { showSuccessToast } from '../utils/gameUtils';

const IntroSequence: React.FC = () => {
  const { setCurrentLevel, setPlayerName, playerName, resetTimer, startTimer } = useGameContext();
  const [stage, setStage] = useState<'intro' | 'name' | 'ready'>('intro');
  
  const introLines = [
    "SYSTEM ALERT: Unauthorized access detected...",
    "SYSTEM: Connection hijacked by unknown entity.",
    "????: Well, hello there.",
    "????: I see you've found your way into my little game.",
    "????: I've taken control of your system, and the only way out is to beat me at my own game.",
    "????: I've set up a series of cybersecurity challenges for you.",
    "????: Complete them all, and I'll release control of your system.",
    "????: Fail, and... well, let's just say your data won't be yours anymore.",
    "????: Let's see if you have what it takes to escape the hacker.",
    "????: First, tell me your name so I know who I'm dealing with."
  ];
  
  const nameLines = [
    `????: So, ${playerName || '[ENTER YOUR NAME]'}... Are you ready to begin?`,
    "????: I've prepared three challenges that will test your cybersecurity knowledge.",
    "????: You'll need to identify phishing attempts, create strong passwords, and detect an insider threat.",
    "????: The clock is ticking. You have 5 minutes to complete all challenges.",
    "????: Good luck. You're going to need it.",
    "SYSTEM: Press 'Begin Challenge' when you're ready to start."
  ];
  
  const handleIntroComplete = () => {
    setStage('name');
  };
  
  const handleNameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (playerName.trim()) {
      setStage('ready');
    }
  };
  
  const startGame = () => {
    resetTimer(300); // 5 minutes
    startTimer();
    showSuccessToast("Challenge started! Good luck!");
    setCurrentLevel('level1');
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[80vh] px-4"
    >
      {stage === 'intro' && (
        <Terminal 
          lines={introLines} 
          onComplete={handleIntroComplete} 
        />
      )}
      
      {stage === 'name' && (
        <div className="max-w-3xl w-full mx-auto">
          <form onSubmit={handleNameSubmit} className="cyber-card flex flex-col items-center mb-6 p-6">
            <h2 className="text-xl text-cyber-blue mb-4">Enter your name:</h2>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="cyber-input w-full max-w-md mb-4"
              placeholder="Your name..."
              autoFocus
            />
            <button type="submit" className="cyber-button">
              Continue
            </button>
          </form>
          
          <Terminal lines={nameLines} />
        </div>
      )}
      
      {stage === 'ready' && (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="cyber-card max-w-3xl w-full mx-auto p-8 text-center"
        >
          <h1 className="text-3xl font-bold text-cyber-blue mb-6">Ready to Begin?</h1>
          <p className="text-cyber-light mb-8 max-w-xl mx-auto">
            You'll have 5 minutes to complete all three cybersecurity challenges. Pay close attention to details and think critically about each scenario.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="cyber-card p-4">
              <h3 className="text-lg text-cyber-blue mb-2">Challenge 1</h3>
              <p className="text-sm text-cyber-light">Identify a phishing attempt in your inbox</p>
            </div>
            <div className="cyber-card p-4">
              <h3 className="text-lg text-cyber-blue mb-2">Challenge 2</h3>
              <p className="text-sm text-cyber-light">Strengthen weak passwords</p>
            </div>
            <div className="cyber-card p-4">
              <h3 className="text-lg text-cyber-blue mb-2">Challenge 3</h3>
              <p className="text-sm text-cyber-light">Detect the insider threat</p>
            </div>
          </div>
          
          <button 
            onClick={startGame}
            className="cyber-button text-lg px-8 py-4 animate-pulse-glow"
          >
            Begin Challenge
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default IntroSequence;
