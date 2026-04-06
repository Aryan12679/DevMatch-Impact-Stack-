'use client';

import { useState } from 'react';
import { useDevMatch } from '@/lib/context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, ChevronRight } from 'lucide-react';
import MatchDetailModal from './match-detail-modal';

export default function MatchesPage() {
  const { potentialMatches, acceptMatch, rejectMatch } = useDevMatch();
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [rejectedIds, setRejectedIds] = useState<Set<string>>(new Set());

  const availableMatches = potentialMatches.filter(m => !rejectedIds.has(m.user.id));

  const handleReject = (userId: string) => {
    setRejectedIds(prev => {
      const newSet = new Set(prev);
      newSet.add(userId);
      return newSet;
    });
    rejectMatch(userId);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Find Your Teammates</h2>
        <p className="text-slate-400">
          {availableMatches.length} compatible developers found based on your skills and preferences
        </p>
      </div>

      {availableMatches.length === 0 ? (
        <Card className="bg-slate-800 border-slate-700 p-12 text-center">
          <p className="text-slate-400 mb-4">No more potential matches!</p>
          <Button variant="outline" onClick={() => setRejectedIds(new Set())}>
            Show All Again
          </Button>
        </Card>
      ) : (
        <div className="grid gap-6">
          {availableMatches.map(({ user, score }) => (
            <Card
              key={user.id}
              className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-colors p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">{user.avatar}</div>
                    <div>
                      <h3 className="text-xl font-bold">{user.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-blue-400 capitalize">{user.role}</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-400 capitalize">{user.experience}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-300 mb-4">{user.bio}</p>

                  {/* Skills */}
                  <div className="mb-4">
                    <p className="text-xs text-slate-400 mb-2 font-semibold uppercase">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map(skill => (
                        <span
                          key={skill.id}
                          className="inline-flex items-center px-2 py-1 rounded text-xs bg-slate-700 text-slate-200"
                        >
                          {skill.name}
                          <span className="ml-1 text-slate-400">({skill.level})</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="text-sm text-slate-400">
                    <span className="capitalize">{user.preferences.teamSize} team • </span>
                    <span className="capitalize">{user.preferences.timeCommitment} commitment</span>
                  </div>
                </div>

                {/* Compatibility Score and Actions */}
                <div className="ml-6 text-right">
                  <div className="bg-blue-600 rounded-lg p-4 mb-4 text-center">
                    <div className="text-3xl font-bold">{score}</div>
                    <div className="text-xs text-blue-200 mt-1">Compatibility</div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => acceptMatch(user.id)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                      size="sm"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Match
                    </Button>
                    <Button
                      onClick={() => handleReject(user.id)}
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      size="sm"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => setSelectedMatchId(user.id)}
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      size="sm"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {selectedMatchId && (
        <MatchDetailModal
          userId={selectedMatchId}
          onClose={() => setSelectedMatchId(null)}
          onMatch={() => {
            const match = availableMatches.find(m => m.user.id === selectedMatchId);
            if (match) acceptMatch(match.user.id);
            setSelectedMatchId(null);
          }}
        />
      )}
    </div>
  );
}
