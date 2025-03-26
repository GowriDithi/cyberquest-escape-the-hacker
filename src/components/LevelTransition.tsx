
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGameContext } from '../context/GameContext';

interface LevelTransitionProps {
  levelNumber: number;
  title: string;
  description: string;
  onComplete: () => void;
}

const LevelTransition: React.FC<LevelTransitionProps> = ({
  levelNumber,
  title,
  description,
  onComplete
}) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const { pauseTimer } = useGameContext();
  
  useEffect(() => {
    pauseTimer();
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [pauseTimer]);
  
  useEffect(() => {
    if (animationComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [animationComplete, onComplete]);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-cyber-dark bg-opacity-80 backdrop-blur-md"
    >
      <div className="text-center max-w-2xl px-6">
        <motion.div
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="font-mono text-4xl text-cyber-blue">LEVEL {levelNumber}</span>
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold text-cyber-light mb-4"
        >
          {title}
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-lg text-cyber-light opacity-80 mb-8"
        >
          {description}
        </motion.p>
        
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="relative w-16 h-16 mx-auto"
        >
          <div className="absolute inset-0 animate-spin bg-gradient-to-r from-cyber-blue to-cyber-accent rounded-full opacity-75" style={{ clipPath: "inset(0 0 50% 0)" }}></div>
          <div className="absolute inset-0 animate-pulse-glow"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LevelTransition;
