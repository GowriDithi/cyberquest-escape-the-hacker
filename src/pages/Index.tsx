
import React from 'react';
import { GameProvider } from '../context/GameContext';
import GameContainer from '../components/GameContainer';
import IntroSequence from '../components/IntroSequence';
import PhishingChallenge from '../components/PhishingChallenge';
import PasswordChallenge from '../components/PasswordChallenge';
import InsiderThreatChallenge from '../components/InsiderThreatChallenge';
import { useGameContext } from '../context/GameContext';
import LevelTransition from '../components/LevelTransition';
import { AnimatePresence, motion } from 'framer-motion';

const GameContent = () => {
  const { currentLevel, setCurrentLevel } = useGameContext();
  const [showTransition, setShowTransition] = React.useState(false);
  const [transitionData, setTransitionData] = React.useState({
    levelNumber: 1,
    title: '',
    description: ''
  });
  
  // Handle level transitions
  React.useEffect(() => {
    if (currentLevel === 'level1') {
      setTransitionData({
        levelNumber: 1,
        title: 'Phishing Attack',
        description: 'Identify the phishing email in your inbox by analyzing sender addresses, content, and suspicious elements.'
      });
      setShowTransition(true);
    } else if (currentLevel === 'level2') {
      setTransitionData({
        levelNumber: 2,
        title: 'Password Security',
        description: 'Identify weak passwords and create a strong, secure password that meets security requirements.'
      });
      setShowTransition(true);
    } else if (currentLevel === 'level3') {
      setTransitionData({
        levelNumber: 3,
        title: 'Insider Threat',
        description: 'Analyze employee profiles and activity logs to identify the insider threat in your organization.'
      });
      setShowTransition(true);
    }
  }, [currentLevel]);
  
  const handleTransitionComplete = () => {
    setShowTransition(false);
  };
  
  return (
    <GameContainer>
      <AnimatePresence mode="wait">
        {showTransition && (
          <LevelTransition
            levelNumber={transitionData.levelNumber}
            title={transitionData.title}
            description={transitionData.description}
            onComplete={handleTransitionComplete}
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        {currentLevel === 'intro' && <IntroSequence />}
        {currentLevel === 'level1' && !showTransition && <PhishingChallenge />}
        {currentLevel === 'level2' && !showTransition && <PasswordChallenge />}
        {currentLevel === 'level3' && !showTransition && <InsiderThreatChallenge />}
        {currentLevel === 'victory' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-cyber-blue mb-3">Mission Complete!</h1>
              <p className="text-cyber-light text-lg">
                Congratulations! You've successfully completed all cybersecurity challenges and escaped the hacker.
              </p>
            </div>
            
            <div className="cyber-card p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Cybersecurity Skills Mastered:</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="cyber-card p-4 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-cyber-blue/20 flex items-center justify-center mb-4">
                    <Mail className="text-cyber-blue" size={28} />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Phishing Detection</h3>
                  <p className="text-sm text-center">You can now identify suspicious emails and protect yourself from phishing attacks.</p>
                </div>
                
                <div className="cyber-card p-4 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-cyber-blue/20 flex items-center justify-center mb-4">
                    <Lock className="text-cyber-blue" size={28} />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Password Security</h3>
                  <p className="text-sm text-center">You understand how to create and maintain strong, secure passwords.</p>
                </div>
                
                <div className="cyber-card p-4 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-cyber-blue/20 flex items-center justify-center mb-4">
                    <User className="text-cyber-blue" size={28} />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Insider Threat Detection</h3>
                  <p className="text-sm text-center">You can identify suspicious insider activities that may compromise security.</p>
                </div>
              </div>
              
              <button 
                onClick={() => setCurrentLevel('intro')}
                className="cyber-button mx-auto"
              >
                Play Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GameContainer>
  );
};

const Index = () => {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
};

export default Index;
