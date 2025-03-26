
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameContext } from '../context/GameContext';
import { emails, phishingTips, showSuccessToast, showErrorToast } from '../utils/gameUtils';
import { Mail, AlertTriangle, Check, X, Info } from 'lucide-react';

const PhishingChallenge: React.FC = () => {
  const { addPoints, completedLevel, setCurrentLevel, showHint } = useGameContext();
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);
  const [flaggedEmail, setFlaggedEmail] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const handleSelectEmail = (id: number) => {
    setSelectedEmail(id);
  };
  
  const handleFlagAsPhishing = () => {
    if (selectedEmail === null) {
      showErrorToast("Please select an email first");
      return;
    }
    
    setFlaggedEmail(selectedEmail);
    setShowFeedback(true);
    
    const email = emails.find(e => e.id === selectedEmail);
    
    if (email?.isPhishing) {
      addPoints(50);
      showSuccessToast("Correct! You identified a phishing email!");
      setTimeout(() => {
        completedLevel('level1');
        setCurrentLevel('level2');
      }, 3000);
    } else {
      showErrorToast("Incorrect! This is a legitimate email. Try again!");
      setTimeout(() => {
        setFlaggedEmail(null);
        setShowFeedback(false);
      }, 3000);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto w-full"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-cyber-blue mb-3">Phishing Attack Challenge</h1>
        <p className="text-cyber-light text-lg max-w-2xl mx-auto">
          Identify the phishing email in your inbox. Look carefully at sender addresses, links, and the content for suspicious elements.
        </p>
      </div>
      
      {showHint && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="cyber-card border-cyber-warning mb-6 overflow-hidden"
        >
          <div className="flex items-start p-4">
            <Info className="text-cyber-warning mr-3 mt-1 flex-shrink-0" size={20} />
            <div>
              <h3 className="text-cyber-warning font-medium mb-2">Phishing Detection Tips</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {phishingTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
      
      <div className="cyber-card mb-6">
        <div className="p-4 border-b border-cyber-blue/20 flex items-center">
          <Mail className="text-cyber-blue mr-2" size={20} />
          <h2 className="text-xl font-medium">Inbox</h2>
        </div>
        
        <div className="divide-y divide-cyber-blue/10">
          {emails.map((email) => (
            <div 
              key={email.id}
              onClick={() => handleSelectEmail(email.id)}
              className={`p-4 cursor-pointer transition-all hover:bg-cyber-blue/5 ${selectedEmail === email.id ? 'bg-cyber-blue/10' : ''}`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-cyber-light">{email.sender}</h3>
                <span className="text-xs text-cyber-light/60">{email.date}</span>
              </div>
              <div className="mb-1 font-medium">{email.subject}</div>
              <div className="text-sm text-cyber-light/80 line-clamp-2">{email.content}</div>
              
              {flaggedEmail === email.id && showFeedback && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex items-center p-2 rounded"
                >
                  {email.isPhishing ? (
                    <div className="flex items-center text-cyber-success">
                      <Check size={18} className="mr-2" />
                      <span>Correct! This is a phishing email.</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-cyber-danger">
                      <X size={18} className="mr-2" />
                      <span>Incorrect! This is a legitimate email.</span>
                    </div>
                  )}
                </motion.div>
              )}
              
              {email.isPhishing && flaggedEmail === email.id && showFeedback && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2 text-sm bg-cyber-blue/5 p-3 rounded"
                >
                  <p className="font-medium mb-1 text-cyber-warning">Phishing indicators:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {email.clues?.map((clue, index) => (
                      <li key={index}>{clue}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center">
        <button 
          onClick={handleFlagAsPhishing}
          disabled={selectedEmail === null}
          className="cyber-button flex items-center"
        >
          <AlertTriangle className="mr-2" size={18} />
          Flag as Phishing
        </button>
      </div>
    </motion.div>
  );
};

export default PhishingChallenge;
