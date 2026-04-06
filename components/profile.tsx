'use client';

import { useState } from 'react';
import { useDevMatch } from '@/lib/context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit2, Save, X } from 'lucide-react';

export default function ProfilePage() {
  const { currentUser, updateCurrentUser } = useDevMatch();
  const [isEditing, setIsEditing] = useState(false);
  const [bioInput, setBioInput] = useState(currentUser?.bio || '');

  if (!currentUser) return null;

  const handleSaveBio = () => {
    if (currentUser && bioInput.trim()) {
      updateCurrentUser({ bio: bioInput });
      setIsEditing(false);
    }
  };

  return (
    <div className="max-w-3xl">
      {/* Profile Header */}
      <Card className="bg-slate-800 border-slate-700 mb-8">
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="text-7xl">{currentUser.avatar}</div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{currentUser.name}</h1>
                <p className="text-blue-400 capitalize text-lg">{currentUser.role}</p>
                <p className="text-slate-400 text-sm mt-2">{currentUser.email}</p>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit2 className="w-4 h-4 mr-2" />}
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          </div>

          {/* Bio Section */}
          <div>
            <p className="text-slate-400 text-sm mb-2 font-semibold">About</p>
            {isEditing ? (
              <div className="space-y-3">
                <textarea
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-400 min-h-[100px]"
                  placeholder="Tell us about yourself..."
                />
                <Button
                  onClick={handleSaveBio}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Bio
                </Button>
              </div>
            ) : (
              <p className="text-slate-200">{currentUser.bio}</p>
            )}
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Experience & Preferences */}
        <Card className="bg-slate-800 border-slate-700 p-6">
          <h3 className="text-xl font-bold mb-6">Experience & Preferences</h3>

          <div className="space-y-4">
            <div>
              <p className="text-slate-400 text-sm mb-2">Experience Level</p>
              <p className="text-lg font-semibold capitalize">{currentUser.experience}</p>
            </div>

            <div>
              <p className="text-slate-400 text-sm mb-2">Team Size Preference</p>
              <p className="text-lg font-semibold capitalize">{currentUser.preferences.teamSize}</p>
            </div>

            <div>
              <p className="text-slate-400 text-sm mb-2">Time Commitment</p>
              <p className="text-lg font-semibold capitalize">{currentUser.preferences.timeCommitment}</p>
            </div>

            <div>
              <p className="text-slate-400 text-sm mb-2">Looking For Roles</p>
              <div className="flex flex-wrap gap-2">
                {currentUser.lookingFor.map(role => (
                  <span key={role} className="px-3 py-1 bg-blue-600 text-blue-100 rounded capitalize text-sm">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Skills */}
        <Card className="bg-slate-800 border-slate-700 p-6">
          <h3 className="text-xl font-bold mb-6">Skills & Expertise</h3>

          <div className="space-y-3">
            {currentUser.skills.map(skill => (
              <div key={skill.id} className="flex items-center justify-between p-3 bg-slate-700 rounded">
                <div>
                  <p className="font-medium">{skill.name}</p>
                  <p className="text-xs text-slate-400 capitalize">{skill.category}</p>
                </div>
                <span className="px-2 py-1 bg-blue-600 text-blue-100 rounded text-xs capitalize">
                  {skill.level}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Focus Areas */}
      <Card className="bg-slate-800 border-slate-700 p-6 mt-8">
        <h3 className="text-xl font-bold mb-4">Focus Areas</h3>
        <div className="flex flex-wrap gap-2">
          {currentUser.preferences.focusArea.map(area => (
            <span key={area} className="px-4 py-2 bg-slate-700 rounded-full text-sm">
              {area}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}
