
import { toast } from "sonner";

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function typeWriter(text: string, speed: number = 50): Promise<string> {
  return new Promise((resolve) => {
    let index = 0;
    let result = '';
    
    function type() {
      if (index < text.length) {
        result += text.charAt(index);
        index++;
        setTimeout(type, speed);
      } else {
        resolve(result);
      }
    }
    
    type();
  });
}

export function validatePassword(password: string): {
  isValid: boolean;
  strength: 'weak' | 'medium' | 'strong';
  feedback: string[];
} {
  const feedback: string[] = [];
  
  // Check length
  if (password.length < 8) {
    feedback.push('Password should be at least 8 characters long');
  }
  
  // Check for uppercase
  if (!/[A-Z]/.test(password)) {
    feedback.push('Include at least one uppercase letter');
  }
  
  // Check for lowercase
  if (!/[a-z]/.test(password)) {
    feedback.push('Include at least one lowercase letter');
  }
  
  // Check for numbers
  if (!/\d/.test(password)) {
    feedback.push('Include at least one number');
  }
  
  // Check for special characters
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    feedback.push('Include at least one special character');
  }
  
  // Calculate strength
  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  if (feedback.length <= 1) {
    strength = 'strong';
  } else if (feedback.length <= 3) {
    strength = 'medium';
  }
  
  return {
    isValid: feedback.length === 0,
    strength,
    feedback
  };
}

export function showSuccessToast(message: string) {
  toast.success(message);
}

export function showErrorToast(message: string) {
  toast.error(message);
}

export function showInfoToast(message: string) {
  toast.info(message);
}

// Data for the phishing challenge
export const emails = [
  {
    id: 1,
    sender: 'HR Department <hr@company.com>',
    subject: 'Updated Company Policies',
    date: '10:34 AM',
    content: 'Dear Employee, Please review the updated company policies attached to this email. These changes will take effect next month. Thank you, HR Department',
    isPhishing: false
  },
  {
    id: 2,
    sender: 'IT Support <it-support@c0mpany.net>',
    subject: 'URGENT: Your Password Will Expire',
    date: '11:02 AM',
    content: 'Dear User, Your password will expire in 24 hours. Click here to reset your password immediately: http://password-reset.c0mpany.net/login. IT Support',
    isPhishing: true,
    clues: ['Suspicious domain (c0mpany.net instead of company.com)', 'Creates urgency', 'Contains suspicious link']
  },
  {
    id: 3,
    sender: 'Google Drive <notification@google.com>',
    subject: 'Document Shared With You',
    date: '2:15 PM',
    content: 'John Doe has shared a document with you. Click here to view the document. Google Drive Team',
    isPhishing: false
  },
  {
    id: 4,
    sender: 'FedEx Shipping <fedex-shipping@fedex-delivery.info>',
    subject: 'Your Package Delivery Status',
    date: '4:30 PM',
    content: 'Dear Customer, Your package is pending delivery. Please confirm your address details by clicking on this link: http://fedx-delivery.info/confirm?id=12345. FedEx Shipping Team',
    isPhishing: true,
    clues: ['Suspicious domain (fedex-delivery.info)', 'Misspelled company name in URL (fedx)', 'Request for personal information']
  },
  {
    id: 5,
    sender: 'Team Meeting <john.smith@company.com>',
    subject: 'Weekly Team Meeting Agenda',
    date: '9:45 AM',
    content: 'Hello team, Attached is the agenda for our weekly meeting this Friday at 2 PM. Please review and come prepared with any additional items. Best, John',
    isPhishing: false
  }
];

// Data for the password challenge
export const weakPasswords = [
  { 
    password: 'password123', 
    username: 'admin', 
    weaknessReason: 'Common word with predictable numbers' 
  },
  { 
    password: 'qwerty', 
    username: 'user1', 
    weaknessReason: 'Keyboard pattern, too short' 
  },
  { 
    password: 'company2023', 
    username: 'jdoe', 
    weaknessReason: 'Contains company name and current year' 
  },
  { 
    password: '123456', 
    username: 'guest', 
    weaknessReason: 'Simple numeric sequence' 
  },
  { 
    password: 'letmein', 
    username: 'support', 
    weaknessReason: 'Common password phrase' 
  }
];

// Data for the insider threat challenge
export const employees = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'System Administrator',
    department: 'IT',
    photoUrl: '/placeholder.svg',
    accessLevel: 'High',
    activityLogs: [
      { time: '2023-05-15 09:23:16', action: 'Logged in from office IP', suspicious: false },
      { time: '2023-05-15 12:45:32', action: 'Accessed user database (routine maintenance)', suspicious: false },
      { time: '2023-05-15 17:30:05', action: 'Logged out', suspicious: false }
    ]
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Finance Manager',
    department: 'Finance',
    photoUrl: '/placeholder.svg',
    accessLevel: 'Medium',
    activityLogs: [
      { time: '2023-05-15 08:15:42', action: 'Logged in from office IP', suspicious: false },
      { time: '2023-05-15 22:37:19', action: 'Downloaded financial reports (2GB data)', suspicious: true },
      { time: '2023-05-15 22:45:08', action: 'Sent email with attachments to personal email address', suspicious: true },
      { time: '2023-05-15 23:05:31', action: 'Logged out', suspicious: false }
    ]
  },
  {
    id: 3,
    name: 'Miguel Rodriguez',
    role: 'Software Developer',
    department: 'Engineering',
    photoUrl: '/placeholder.svg',
    accessLevel: 'Medium',
    activityLogs: [
      { time: '2023-05-15 10:10:58', action: 'Logged in from home IP (VPN)', suspicious: false },
      { time: '2023-05-15 14:22:36', action: 'Committed code to repository', suspicious: false },
      { time: '2023-05-15 18:45:22', action: 'Logged out', suspicious: false }
    ]
  },
  {
    id: 4,
    name: 'Emily Parker',
    role: 'HR Specialist',
    department: 'Human Resources',
    photoUrl: '/placeholder.svg',
    accessLevel: 'Medium',
    activityLogs: [
      { time: '2023-05-15 09:05:33', action: 'Logged in from office IP', suspicious: false },
      { time: '2023-05-15 11:30:45', action: 'Accessed employee records', suspicious: false },
      { time: '2023-05-15 16:55:12', action: 'Logged out', suspicious: false }
    ]
  },
  {
    id: 5,
    name: 'David Kim',
    role: 'Marketing Specialist',
    department: 'Marketing',
    photoUrl: '/placeholder.svg',
    accessLevel: 'Low',
    activityLogs: [
      { time: '2023-05-15 08:45:22', action: 'Logged in from unknown IP address', suspicious: true },
      { time: '2023-05-15 08:50:17', action: 'Failed access attempt to financial database', suspicious: true },
      { time: '2023-05-15 09:30:52', action: 'Attempted to elevate user privileges', suspicious: true },
      { time: '2023-05-15 16:20:05', action: 'Logged out', suspicious: false }
    ]
  }
];

export const insiderThreatTips = [
  "Look for unusual access times or locations",
  "Pay attention to large data downloads",
  "Watch for attempts to access systems beyond normal job duties",
  "Notice multiple failed login attempts",
  "Check for emails sent to personal accounts with attachments"
];

export const phishingTips = [
  "Check the sender's email address carefully",
  "Be suspicious of urgent or threatening language",
  "Hover over links to see the actual URL before clicking",
  "Watch for spelling and grammar errors",
  "Be cautious of unexpected attachments",
  "Verify requests for sensitive information through other channels"
];

export const passwordTips = [
  "Use a minimum of 12 characters",
  "Include uppercase and lowercase letters, numbers, and symbols",
  "Avoid using personal information",
  "Don't use common words or patterns",
  "Use a unique password for each account",
  "Consider using a password manager"
];
