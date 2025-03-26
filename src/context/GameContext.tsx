
import React, { createContext, useContext, useState, useEffect } from 'react';

export type GameLevel = 'intro' | 'level1' | 'level2' | 'level3' | 'victory';

interface GameContextType {
  currentLevel: GameLevel;
  setCurrentLevel: (level: GameLevel) => void;
  playerName: string;
  setPlayerName: (name: string) => void;
  score: number;
  addPoints: (points: number) => void;
  timeRemaining: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: (seconds?: number) => void;
  isTimerRunning: boolean;
  showHint: boolean;
  toggleHint: () => void;
  levelCompleted: {
    level1: boolean;
    level2: boolean;
    level3: boolean;
  };
  completedLevel: (level: 'level1' | 'level2' | 'level3') => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLevel, setCurrentLevel] = useState<GameLevel>('intro');
  const [playerName, setPlayerName] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(300); // 5 minutes by default
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [levelCompleted, setLevelCompleted] = useState({
    level1: false,
    level2: false,
    level3: false,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isTimerRunning && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      // If time runs out, you could handle game over or reset level
      pauseTimer();
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTimerRunning, timeRemaining]);

  const startTimer = () => setIsTimerRunning(true);
  const pauseTimer = () => setIsTimerRunning(false);
  
  const resetTimer = (seconds = 300) => {
    setTimeRemaining(seconds);
    setIsTimerRunning(false);
  };

  const addPoints = (points: number) => {
    setScore((prevScore) => prevScore + points);
  };

  const toggleHint = () => {
    setShowHint((prev) => !prev);
  };
  
  const completedLevel = (level: 'level1' | 'level2' | 'level3') => {
    setLevelCompleted((prev) => ({
      ...prev,
      [level]: true
    }));
  };

  return (
    <GameContext.Provider
      value={{
        currentLevel,
        setCurrentLevel,
        playerName,
        setPlayerName,
        score,
        addPoints,
        timeRemaining,
        startTimer,
        pauseTimer,
        resetTimer,
        isTimerRunning,
        showHint,
        toggleHint,
        levelCompleted,
        completedLevel
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};
