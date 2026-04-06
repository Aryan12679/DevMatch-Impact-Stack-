'use client';

import { useState } from 'react';
import { useDevMatch } from '@/lib/context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, MessageSquare } from 'lucide-react';
import ChatRoom from './chat-room';

export default function ChatPage() {
  const { acceptedMatches, currentUser } = useDevMatch();
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);

  if (!currentUser) return null;

  const selectedMatch = selectedMatchId ? acceptedMatches.find(u => u.id === selectedMatchId) : null;

  return (
    <div className="grid grid-cols-3 gap-6 h-[600px]">
      {/* Matches List */}
      <div className="col-span-1 bg-slate-800 border border-slate-700 rounded-lg overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-700">
          <h3 className="font-semibold flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Matched Teammates ({acceptedMatches.length})
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto">
          {acceptedMatches.length === 0 ? (
            <div className="p-4 text-slate-400 text-sm text-center">
              No matches yet. Find teammates to start chatting!
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {acceptedMatches.map(match => (
                <button
                  key={match.id}
                  onClick={() => setSelectedMatchId(match.id)}
                  className={`w-full text-left px-3 py-3 rounded transition-colors ${
                    selectedMatchId === match.id
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{match.avatar}</span>
                    <div>
                      <div className="font-medium text-sm">{match.name}</div>
                      <div className="text-xs text-slate-400 capitalize">{match.role}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="col-span-2">
        {selectedMatch ? (
          <ChatRoom key={selectedMatch.id} matchedUser={selectedMatch} />
        ) : (
          <Card className="bg-slate-800 border-slate-700 h-full flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">Select a match to start chatting</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
