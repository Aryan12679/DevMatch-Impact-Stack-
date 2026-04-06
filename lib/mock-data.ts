import { User, Skill } from './types';

const SKILLS_DATABASE: Skill[] = [
  // Backend
  { id: 'nodejs', name: 'Node.js', category: 'backend', level: 'advanced' },
  { id: 'python', name: 'Python', category: 'backend', level: 'advanced' },
  { id: 'rust', name: 'Rust', category: 'backend', level: 'intermediate' },
  { id: 'golang', name: 'Go', category: 'backend', level: 'intermediate' },
  { id: 'postgres', name: 'PostgreSQL', category: 'backend', level: 'advanced' },
  { id: 'mongodb', name: 'MongoDB', category: 'backend', level: 'intermediate' },
  
  // Frontend
  { id: 'react', name: 'React', category: 'frontend', level: 'advanced' },
  { id: 'vue', name: 'Vue', category: 'frontend', level: 'intermediate' },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', level: 'advanced' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', level: 'advanced' },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', level: 'advanced' },
  { id: 'graphql', name: 'GraphQL', category: 'frontend', level: 'intermediate' },
  
  // ML
  { id: 'tensorflow', name: 'TensorFlow', category: 'ml', level: 'intermediate' },
  { id: 'pytorch', name: 'PyTorch', category: 'ml', level: 'advanced' },
  { id: 'nlp', name: 'NLP', category: 'ml', level: 'intermediate' },
  { id: 'cv', name: 'Computer Vision', category: 'ml', level: 'advanced' },
  
  // DevOps
  { id: 'docker', name: 'Docker', category: 'devops', level: 'advanced' },
  { id: 'k8s', name: 'Kubernetes', category: 'devops', level: 'intermediate' },
  { id: 'aws', name: 'AWS', category: 'devops', level: 'advanced' },
  { id: 'gcp', name: 'Google Cloud', category: 'devops', level: 'intermediate' },
  
  // Design
  { id: 'figma', name: 'Figma', category: 'design', level: 'advanced' },
  { id: 'ux', name: 'UX Design', category: 'design', level: 'advanced' },
];

export const MOCK_USERS: User[] = [
  {
    id: 'user1',
    name: 'Alex Chen',
    email: 'alex@example.com',
    bio: 'Full-stack developer passionate about building scalable applications.',
    role: 'fullstack',
    skills: [
      { id: 'nodejs', name: 'Node.js', category: 'backend', level: 'advanced' },
      { id: 'react', name: 'React', category: 'frontend', level: 'advanced' },
      { id: 'typescript', name: 'TypeScript', category: 'frontend', level: 'advanced' },
      { id: 'postgres', name: 'PostgreSQL', category: 'backend', level: 'intermediate' },
    ],
    experience: 'mid',
    avatar: '👨‍💻',
    preferences: {
      teamSize: 'small',
      timeCommitment: 'intense',
      focusArea: ['backend', 'database design'],
    },
    lookingFor: ['backend', 'frontend', 'ml'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user2',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    bio: 'Frontend engineer obsessed with beautiful, accessible UIs.',
    role: 'frontend',
    skills: [
      { id: 'react', name: 'React', category: 'frontend', level: 'advanced' },
      { id: 'nextjs', name: 'Next.js', category: 'frontend', level: 'advanced' },
      { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', level: 'advanced' },
      { id: 'typescript', name: 'TypeScript', category: 'frontend', level: 'advanced' },
    ],
    experience: 'junior',
    avatar: '👩‍💻',
    preferences: {
      teamSize: 'small',
      timeCommitment: 'intense',
      focusArea: ['UI/UX', 'performance'],
    },
    lookingFor: ['backend', 'fullstack'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user3',
    name: 'Marcus Johnson',
    email: 'marcus@example.com',
    bio: 'Backend engineer with expertise in distributed systems and microservices.',
    role: 'backend',
    skills: [
      { id: 'golang', name: 'Go', category: 'backend', level: 'advanced' },
      { id: 'python', name: 'Python', category: 'backend', level: 'intermediate' },
      { id: 'postgres', name: 'PostgreSQL', category: 'backend', level: 'advanced' },
      { id: 'k8s', name: 'Kubernetes', category: 'devops', level: 'intermediate' },
    ],
    experience: 'senior',
    avatar: '👨‍💼',
    preferences: {
      teamSize: 'pair',
      timeCommitment: 'moderate',
      focusArea: ['backend architecture', 'devops'],
    },
    lookingFor: ['frontend', 'fullstack', 'devops'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user4',
    name: 'Emma Rodriguez',
    email: 'emma@example.com',
    bio: 'ML engineer passionate about computer vision and edge computing.',
    role: 'ml',
    skills: [
      { id: 'pytorch', name: 'PyTorch', category: 'ml', level: 'advanced' },
      { id: 'python', name: 'Python', category: 'backend', level: 'advanced' },
      { id: 'cv', name: 'Computer Vision', category: 'ml', level: 'advanced' },
      { id: 'aws', name: 'AWS', category: 'devops', level: 'intermediate' },
    ],
    experience: 'mid',
    avatar: '👩‍🔬',
    preferences: {
      teamSize: 'small',
      timeCommitment: 'intense',
      focusArea: ['model deployment', 'optimization'],
    },
    lookingFor: ['backend', 'devops', 'fullstack'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user5',
    name: 'David Kim',
    email: 'david@example.com',
    bio: 'DevOps engineer making infrastructure invisible to developers.',
    role: 'devops',
    skills: [
      { id: 'docker', name: 'Docker', category: 'devops', level: 'advanced' },
      { id: 'k8s', name: 'Kubernetes', category: 'devops', level: 'advanced' },
      { id: 'aws', name: 'AWS', category: 'devops', level: 'advanced' },
      { id: 'python', name: 'Python', category: 'backend', level: 'intermediate' },
    ],
    experience: 'senior',
    avatar: '⚙️',
    preferences: {
      teamSize: 'pair',
      timeCommitment: 'moderate',
      focusArea: ['infrastructure', 'ci/cd'],
    },
    lookingFor: ['backend', 'ml', 'fullstack'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user6',
    name: 'Lisa Park',
    email: 'lisa@example.com',
    bio: 'UX/UI Designer creating delightful user experiences.',
    role: 'designer',
    skills: [
      { id: 'figma', name: 'Figma', category: 'design', level: 'advanced' },
      { id: 'ux', name: 'UX Design', category: 'design', level: 'advanced' },
    ],
    experience: 'junior',
    avatar: '🎨',
    preferences: {
      teamSize: 'small',
      timeCommitment: 'intense',
      focusArea: ['user research', 'prototyping'],
    },
    lookingFor: ['frontend', 'fullstack'],
    createdAt: new Date().toISOString(),
  },
];

export function getSkillById(id: string): Skill | undefined {
  return SKILLS_DATABASE.find(s => s.id === id);
}

export function getSkillsByCategory(category: string): Skill[] {
  return SKILLS_DATABASE.filter(s => s.category === category);
}
