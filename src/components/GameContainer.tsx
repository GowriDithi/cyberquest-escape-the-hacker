
import React from "react";
import { useGameContext } from "../context/GameContext";
import { formatTime } from "../utils/gameUtils";
import { Shield, Clock, Database } from "lucide-react";

interface GameContainerProps {
  children: React.ReactNode;
}

const GameContainer: React.FC<GameContainerProps> = ({ children }) => {
  const { 
    currentLevel, 
    score, 
    timeRemaining, 
    isTimerRunning,
    showHint,
    toggleHint
  } = useGameContext();

  // Only show the header on levels, not on intro or victory screens
  const showHeader = currentLevel !== 'intro' && currentLevel !== 'victory';

  return (
    <div className="min-h-screen w-full matrix-bg">
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-cyber-glow pointer-events-none"></div>
      
      {showHeader && (
        <header className="fixed top-0 left-0 right-0 z-10 glass-panel backdrop-blur-md bg-black/30 border-b border-cyber-blue/20 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Shield className="text-cyber-blue animate-pulse-glow" size={24} />
              <h1 className="text-xl font-medium text-cyber-light">CyberQuest</h1>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Clock className="text-cyber-warning" size={20} />
                <span className={`font-mono text-lg ${timeRemaining < 60 ? 'text-cyber-danger animate-pulse' : 'text-cyber-light'}`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Database className="text-cyber-blue" size={20} />
                <span className="font-mono text-lg text-cyber-light">{score}</span>
              </div>
              
              <button 
                onClick={toggleHint}
                className="cyber-button py-1 px-3 text-sm"
              >
                {showHint ? 'Hide' : 'Show'} Hint
              </button>
            </div>
          </div>
        </header>
      )}
      
      <main className={`container mx-auto ${showHeader ? 'pt-24 pb-8' : 'py-8'} px-4 min-h-screen flex flex-col justify-center relative z-0`}>
        {children}
      </main>
      
      <div className="fixed bottom-4 left-4 text-xs text-cyber-blue/60 font-mono z-10">
        sys.version: 1.0.0
      </div>
    </div>
  );
};

export default GameContainer;
