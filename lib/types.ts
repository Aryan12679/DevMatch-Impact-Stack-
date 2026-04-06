export type Skill = {
  id: string;
  name: string;
  category: 'backend' | 'frontend' | 'fullstack' | 'ml' | 'devops' | 'design' | 'other';
  level: 'beginner' | 'intermediate' | 'advanced';
};

export type UserRole = 'backend' | 'frontend' | 'fullstack' | 'ml' | 'devops' | 'designer' | 'pm';

export type User = {
  id: string;
  name: string;
  email: string;
  bio: string;
  role: UserRole;
  skills: Skill[];
  experience: 'student' | 'junior' | 'mid' | 'senior';
  avatar: string;
  preferences: {
    teamSize: 'solo' | 'pair' | 'small' | 'large';
    timeCommitment: 'casual' | 'moderate' | 'intense';
    focusArea: string[];
  };
  lookingFor: UserRole[];
  createdAt: string;
};

export type Match = {
  userId: string;
  matchedUserId: string;
  compatibilityScore: number;
  matchedAt: string;
  status: 'pending' | 'accepted' | 'rejected';
};

export type ChatRoom = {
  id: string;
  participants: string[];
  createdAt: string;
  messages: ChatMessage[];
};

export type ChatMessage = {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isTyping?: boolean;
};

export type Team = {
  id: string;
  name: string;
  members: string[];
  createdAt: string;
  skills: string[];
};
