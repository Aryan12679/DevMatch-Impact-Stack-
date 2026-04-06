'use client';

import { MOCK_USERS } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface AuthPageProps {
  onSelectUser: (userId: string) => void;
}

export default function AuthPage({ onSelectUser }: AuthPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Select Your Profile</h1>
          <p className="text-slate-400 text-center mb-12">
            Choose a developer profile to experience DevMatch. In a real app, you&apos;d sign up here.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {MOCK_USERS.map(user => (
              <Card
                key={user.id}
                className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-colors cursor-pointer overflow-hidden"
                onClick={() => onSelectUser(user.id)}
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-5xl">{user.avatar}</div>
                    <div>
                      <h3 className="text-xl font-bold">{user.name}</h3>
                      <p className="text-blue-400 text-sm capitalize">{user.role}</p>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm mb-4">{user.bio}</p>

                  <div className="mb-4">
                    <p className="text-xs text-slate-400 mb-2 font-semibold">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {user.skills.slice(0, 4).map(skill => (
                        <span
                          key={skill.id}
                          className="inline-flex items-center px-2 py-1 rounded text-xs bg-slate-700 text-slate-200"
                        >
                          {skill.name}
                        </span>
                      ))}
                      {user.skills.length > 4 && (
                        <span className="text-xs text-slate-400">+{user.skills.length - 4} more</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4 text-xs text-slate-400">
                    <span className="capitalize">{user.experience} level</span>
                    <span className="capitalize">{user.preferences.timeCommitment}</span>
                  </div>

                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectUser(user.id);
                    }}
                  >
                    Use This Profile
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
