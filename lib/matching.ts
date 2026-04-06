import { User, Match } from './types';

/**
 * Calculate compatibility score between two users
 * Score breakdown:
 * - Skill overlap (40%): Common skills between users
 * - Role diversity (35%): Complementary roles for balanced team
 * - Experience fit (15%): Similar experience levels
 * - Preference match (10%): User preferences alignment
 */
export function calculateCompatibilityScore(user1: User, user2: User): number {
  let score = 0;

  // Skill overlap (40 points)
  const user1Skills = new Set(user1.skills.map(s => s.name.toLowerCase()));
  const user2Skills = new Set(user2.skills.map(s => s.name.toLowerCase()));
  const commonSkills = Array.from(user1Skills).filter(skill => user2Skills.has(skill)).length;
  const totalSkills = new Set([...user1Skills, ...user2Skills]).size;
  const skillOverlapScore = totalSkills > 0 ? (commonSkills / totalSkills) * 40 : 0;
  score += skillOverlapScore;

  // Role diversity (35 points) - complement roles are better
  const roleComplementarity = getRoleComplementarity(user1.role, user2.role);
  const roleScore = roleComplementarity * 35;
  score += roleScore;

  // Experience fit (15 points)
  const experienceMatch = getExperienceMatch(user1.experience, user2.experience);
  const experienceScore = experienceMatch * 15;
  score += experienceScore;

  // Preference match (10 points)
  const preferenceMatch = getPreferenceMatch(user1, user2);
  const preferenceScore = preferenceMatch * 10;
  score += preferenceScore;

  return Math.round(score);
}

function getRoleComplementarity(role1: string, role2: string): number {
  // Complementary role pairs get higher scores
  const complementaryPairs: Record<string, string[]> = {
    backend: ['frontend', 'ml', 'devops'],
    frontend: ['backend', 'designer', 'ml'],
    fullstack: ['ml', 'devops', 'designer'],
    ml: ['backend', 'frontend', 'devops'],
    devops: ['backend', 'ml'],
    designer: ['frontend', 'fullstack'],
    pm: ['backend', 'frontend', 'fullstack'],
  };

  if (role1 === role2) return 0.5; // Same role, moderate score
  if (complementaryPairs[role1]?.includes(role2)) return 1.0; // Complementary roles
  return 0.3; // Non-complementary roles
}

function getExperienceMatch(exp1: string, exp2: string): number {
  const experienceLevels = ['student', 'junior', 'mid', 'senior'];
  const exp1Index = experienceLevels.indexOf(exp1);
  const exp2Index = experienceLevels.indexOf(exp2);
  
  // Small difference (1 level) is ideal for mentorship
  const diff = Math.abs(exp1Index - exp2Index);
  if (diff === 0) return 0.8; // Same level
  if (diff === 1) return 1.0; // Ideal for mentorship
  if (diff === 2) return 0.7;
  return 0.4;
}

function getPreferenceMatch(user1: User, user2: User): number {
  // Check if users are looking for each other's roles
  const user1LooksForUser2 = user1.lookingFor.includes(user2.role);
  const user2LooksForUser1 = user2.lookingFor.includes(user1.role);
  
  // Check time commitment compatibility
  const timeMatch = user1.preferences.timeCommitment === user2.preferences.timeCommitment ? 0.5 : 0.2;
  
  // Check if they're looking for each other
  if (user1LooksForUser2 && user2LooksForUser1) return 1.0;
  if (user1LooksForUser2 || user2LooksForUser1) return 0.7;
  return timeMatch;
}

export function findMatches(currentUser: User, allUsers: User[]): Array<{ user: User; score: number }> {
  return allUsers
    .filter(user => user.id !== currentUser.id)
    .map(user => ({
      user,
      score: calculateCompatibilityScore(currentUser, user),
    }))
    .sort((a, b) => b.score - a.score);
}
