
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameContext } from '../context/GameContext';
import { 
  weakPasswords, 
  passwordTips, 
  validatePassword, 
  showSuccessToast, 
  showErrorToast 
} from '../utils/gameUtils';
import { Key, Lock, ShieldCheck, Info, Check, AlertTriangle } from 'lucide-react';

const PasswordChallenge: React.FC = () => {
  const { addPoints, completedLevel, setCurrentLevel, showHint } = useGameContext();
  const [identifiedWeakPasswords, setIdentifiedWeakPasswords] = useState<number[]>([]);
  const [newPassword, setNewPassword] = useState('');
  const [passwordFeedback, setPasswordFeedback] = useState<{
    isValid: boolean;
    strength: 'weak' | 'medium' | 'strong';
    feedback: string[];
  } | null>(null);
  const [stage, setStage] = useState<'identify' | 'create'>('identify');
  
  const handlePasswordCheck = (index: number) => {
    if (identifiedWeakPasswords.includes(index)) {
      setIdentifiedWeakPasswords(identifiedWeakPasswords.filter(i => i !== index));
    } else {
      setIdentifiedWeakPasswords([...identifiedWeakPasswords, index]);
    }
  };
  
  const handleSubmitWeakPasswords = () => {
    // All passwords in the list are weak, so the user should identify all of them
    if (identifiedWeakPasswords.length === weakPasswords.length) {
      showSuccessToast("Great job! You correctly identified all weak passwords.");
      addPoints(30);
      setStage('create');
    } else {
      showErrorToast("Not all weak passwords have been identified. Try again!");
    }
  };
  
  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setNewPassword(password);
    
    if (password) {
      setPasswordFeedback(validatePassword(password));
    } else {
      setPasswordFeedback(null);
    }
  };
  
  const handleCreatePassword = () => {
    if (!passwordFeedback) return;
    
    if (passwordFeedback.isValid) {
      showSuccessToast("Excellent! You've created a strong password.");
      addPoints(70);
      completedLevel('level2');
      setTimeout(() => {
        setCurrentLevel('level3');
      }, 2000);
    } else {
      showErrorToast("Your password still has weaknesses. Please address the feedback.");
    }
  };
  
  const getStrengthColor = (strength: 'weak' | 'medium' | 'strong') => {
    switch (strength) {
      case 'weak': return 'bg-cyber-danger';
      case 'medium': return 'bg-cyber-warning';
      case 'strong': return 'bg-cyber-success';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto w-full"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-cyber-blue mb-3">Password Security Challenge</h1>
        <p className="text-cyber-light text-lg max-w-2xl mx-auto">
          {stage === 'identify' 
            ? "Identify all the weak passwords in the list below. Then create a strong password that meets security requirements."
            : "Now, create a strong password that meets all security criteria."}
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
              <h3 className="text-cyber-warning font-medium mb-2">Password Security Tips</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {passwordTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
      
      {stage === 'identify' && (
        <>
          <div className="cyber-card mb-6">
            <div className="p-4 border-b border-cyber-blue/20 flex items-center">
              <Key className="text-cyber-blue mr-2" size={20} />
              <h2 className="text-xl font-medium">Password Database</h2>
            </div>
            
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cyber-blue/20">
                    <th className="text-left py-2 px-4">Username</th>
                    <th className="text-left py-2 px-4">Password</th>
                    <th className="text-center py-2 px-4">Mark as Weak</th>
                  </tr>
                </thead>
                <tbody>
                  {weakPasswords.map((entry, index) => (
                    <tr key={index} className="border-b border-cyber-blue/10">
                      <td className="py-3 px-4">{entry.username}</td>
                      <td className="py-3 px-4 font-mono">{entry.password}</td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handlePasswordCheck(index)}
                          className={`w-6 h-6 rounded-md border ${
                            identifiedWeakPasswords.includes(index)
                              ? 'bg-cyber-blue/20 border-cyber-blue'
                              : 'bg-transparent border-cyber-blue/30'
                          } transition-colors flex items-center justify-center`}
                        >
                          {identifiedWeakPasswords.includes(index) && (
                            <Check size={14} className="text-cyber-blue" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={handleSubmitWeakPasswords}
              className="cyber-button flex items-center"
            >
              <ShieldCheck className="mr-2" size={18} />
              Submit Identified Weak Passwords
            </button>
          </div>
        </>
      )}
      
      {stage === 'create' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="cyber-card mb-6">
            <div className="p-4 border-b border-cyber-blue/20 flex items-center">
              <Lock className="text-cyber-blue mr-2" size={20} />
              <h2 className="text-xl font-medium">Create a Strong Password</h2>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-sm text-cyber-light/80 mb-2">Password Requirements:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>At least 8 characters long</li>
                  <li>Include uppercase letters</li>
                  <li>Include lowercase letters</li>
                  <li>Include numbers</li>
                  <li>Include special characters (e.g., !@#$%^&*)</li>
                </ul>
              </div>
              
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  New Password
                </label>
                <input
                  id="password"
                  type="text"
                  value={newPassword}
                  onChange={handlePasswordInput}
                  className="cyber-input w-full"
                  placeholder="Enter a strong password..."
                />
              </div>
              
              {passwordFeedback && newPassword && (
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-medium mr-2">Password Strength:</span>
                    <div className="flex-1 bg-cyber-blue/10 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getStrengthColor(passwordFeedback.strength)}`}
                        style={{ 
                          width: passwordFeedback.strength === 'weak' 
                            ? '33%' 
                            : passwordFeedback.strength === 'medium' 
                              ? '66%' 
                              : '100%' 
                        }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-medium capitalize">
                      {passwordFeedback.strength}
                    </span>
                  </div>
                  
                  {passwordFeedback.feedback.length > 0 && (
                    <div className="bg-cyber-blue/5 p-3 rounded">
                      <div className="flex items-start">
                        <AlertTriangle className="text-cyber-warning mr-2 mt-1 flex-shrink-0" size={16} />
                        <div>
                          <p className="text-sm font-medium mb-1">Feedback:</p>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            {passwordFeedback.feedback.map((feedback, index) => (
                              <li key={index}>{feedback}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={handleCreatePassword}
              disabled={!newPassword}
              className="cyber-button flex items-center"
            >
              <ShieldCheck className="mr-2" size={18} />
              Submit New Password
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PasswordChallenge;
