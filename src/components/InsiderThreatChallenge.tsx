
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameContext } from '../context/GameContext';
import { 
  employees, 
  insiderThreatTips, 
  showSuccessToast, 
  showErrorToast 
} from '../utils/gameUtils';
import { User, Shield, Info, AlertTriangle, Clock, Check } from 'lucide-react';

const InsiderThreatChallenge: React.FC = () => {
  const { addPoints, completedLevel, setCurrentLevel, showHint } = useGameContext();
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Sarah Chen (ID: 2) is the insider threat in our scenario
  const insiderThreatId = 2;
  
  const handleSelectEmployee = (id: number) => {
    setSelectedEmployee(id);
    setShowFeedback(false);
  };
  
  const handleIdentifyThreat = () => {
    if (selectedEmployee === null) {
      showErrorToast("Please select an employee first");
      return;
    }
    
    setShowFeedback(true);
    
    if (selectedEmployee === insiderThreatId) {
      showSuccessToast("Correct! You've identified the insider threat!");
      addPoints(100);
      completedLevel('level3');
      setTimeout(() => {
        setCurrentLevel('victory');
      }, 3000);
    } else {
      showErrorToast("Incorrect! This employee is not the insider threat. Try again!");
      setTimeout(() => {
        setShowFeedback(false);
      }, 3000);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto w-full"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-cyber-blue mb-3">Insider Threat Challenge</h1>
        <p className="text-cyber-light text-lg max-w-2xl mx-auto">
          Analyze the employee profiles and identify the insider threat. Look for suspicious activities, unusual access patterns, or behaviors that deviate from normal.
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
              <h3 className="text-cyber-warning font-medium mb-2">Insider Threat Detection Tips</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {insiderThreatTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {employees.map((employee) => (
          <motion.div
            key={employee.id}
            whileHover={{ scale: 1.02 }}
            className={`cyber-card cursor-pointer ${
              selectedEmployee === employee.id ? 'border-cyber-blue' : ''
            }`}
            onClick={() => handleSelectEmployee(employee.id)}
          >
            <div className="flex justify-between items-start p-4 border-b border-cyber-blue/20">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-cyber-blue/20 flex items-center justify-center mr-3">
                  <User className="text-cyber-blue" size={20} />
                </div>
                <div>
                  <h3 className="font-medium">{employee.name}</h3>
                  <p className="text-sm text-cyber-light/70">{employee.role}</p>
                </div>
              </div>
              
              {selectedEmployee === employee.id && (
                <div className="w-6 h-6 rounded-full bg-cyber-blue/20 border border-cyber-blue flex items-center justify-center">
                  <Check size={14} className="text-cyber-blue" />
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                <div>
                  <span className="text-cyber-light/70">Department:</span>
                  <p>{employee.department}</p>
                </div>
                <div>
                  <span className="text-cyber-light/70">Access Level:</span>
                  <p>{employee.accessLevel}</p>
                </div>
              </div>
              
              <div className="mb-2">
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <Clock size={14} className="mr-1" />
                  Activity Logs
                </h4>
                <ul className="space-y-2 text-sm">
                  {employee.activityLogs.map((log, index) => (
                    <li 
                      key={index}
                      className={`p-2 rounded bg-cyber-blue/5 ${
                        log.suspicious ? 'border-l-2 border-cyber-warning' : ''
                      }`}
                    >
                      <div className="flex items-start">
                        {log.suspicious && (
                          <AlertTriangle className="text-cyber-warning mr-2 mt-0.5 flex-shrink-0" size={14} />
                        )}
                        <div>
                          <p className="text-xs text-cyber-light/70 mb-1">{log.time}</p>
                          <p className={log.suspicious ? 'text-cyber-warning' : ''}>{log.action}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {showFeedback && selectedEmployee === employee.id && (
              <div className={`p-4 border-t border-cyber-blue/20 ${
                employee.id === insiderThreatId ? 'bg-cyber-success/10' : 'bg-cyber-danger/10'
              }`}>
                {employee.id === insiderThreatId ? (
                  <div className="flex items-start">
                    <Check className="text-cyber-success mr-2 mt-0.5 flex-shrink-0" size={18} />
                    <div>
                      <p className="font-medium text-cyber-success">Correct identification!</p>
                      <p className="text-sm mt-1">
                        This employee was downloading large amounts of data after hours and sending company data to personal email.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start">
                    <AlertTriangle className="text-cyber-danger mr-2 mt-0.5 flex-shrink-0" size={18} />
                    <div>
                      <p className="font-medium text-cyber-danger">Incorrect!</p>
                      <p className="text-sm mt-1">
                        This employee is not the insider threat. Look for suspicious activities in other profiles.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-center">
        <button 
          onClick={handleIdentifyThreat}
          disabled={selectedEmployee === null}
          className="cyber-button flex items-center"
        >
          <Shield className="mr-2" size={18} />
          Identify as Insider Threat
        </button>
      </div>
    </motion.div>
  );
};

export default InsiderThreatChallenge;
