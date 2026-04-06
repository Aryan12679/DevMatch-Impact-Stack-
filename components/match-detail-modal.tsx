'use client';

import { useDevMatch } from '@/lib/context';
import { Button } from '@/components/ui/button';
import { calculateCompatibilityScore } from '@/lib/matching';
import { X } from 'lucide-react';

interface MatchDetailModalProps {
  userId: string;
  onClose: () => void;
  onMatch: () => void;
}

export default function MatchDetailModal({ userId, onClose, onMatch }: MatchDetailModalProps) {
  const { allUsers, currentUser } = useDevMatch();
  const matchedUser = allUsers.find(u => u.id === userId);

  if (!matchedUser || !currentUser) return null;

  const score = calculateCompatibilityScore(currentUser, matchedUser);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 text-white max-w-2xl rounded-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{matchedUser.name}</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-700 rounded">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Hero Section */}
          <div className="flex items-center gap-6 pb-6 border-b border-slate-700">
            <div className="text-6xl">{matchedUser.avatar}</div>
            <div>
              <h3 className="text-xl font-bold">{matchedUser.name}</h3>
              <p className="text-blue-400 capitalize">{matchedUser.role}</p>
              <p className="text-slate-400 text-sm mt-1">{matchedUser.bio}</p>
            </div>
          </div>

          {/* Compatibility Breakdown */}
          <div className="bg-slate-700 rounded-lg p-6">
            <h4 className="font-semibold mb-4">Compatibility Score: {score}/100</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Skill Match</span>
                  <span className="text-sm text-blue-400">40%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Role Fit</span>
                  <span className="text-sm text-cyan-400">35%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Experience Fit</span>
                  <span className="text-sm text-purple-400">15%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Preference Match</span>
                  <span className="text-sm text-green-400">10%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h4 className="font-semibold mb-3">Skills & Expertise</h4>
            <div className="flex flex-wrap gap-2">
              {matchedUser.skills.map(skill => (
                <span
                  key={skill.id}
                  className="inline-flex items-center px-3 py-1 rounded-lg text-sm bg-blue-600 text-blue-100"
                >
                  {skill.name}
                  <span className="ml-2 text-xs opacity-75 capitalize">({skill.level})</span>
                </span>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">Team Size</p>
              <p className="font-semibold capitalize">{matchedUser.preferences.teamSize}</p>
            </div>
            <div className="bg-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">Time Commitment</p>
              <p className="font-semibold capitalize">{matchedUser.preferences.timeCommitment}</p>
            </div>
            <div className="bg-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">Experience</p>
              <p className="font-semibold capitalize">{matchedUser.experience}</p>
            </div>
            <div className="bg-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">Looking For</p>
              <p className="font-semibold capitalize">{matchedUser.lookingFor.slice(0, 2).join(', ')}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-800 border-t border-slate-700 p-6 flex gap-3 justify-end">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            Close
          </Button>
          <Button
            onClick={onMatch}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Start Collaboration
          </Button>
        </div>
      </div>
    </div>
  );
}
