'use client';

import { useState } from 'react';
import { useDevMatch } from '@/lib/context';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MatchesPage from './matches';
import ChatPage from './chat';
import ProfilePage from './profile';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { currentUser, setCurrentUser } = useDevMatch();
  const [activeTab, setActiveTab] = useState('matches');

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">DevMatch</h1>
            <p className="text-slate-400">Welcome back, {currentUser.name}!</p>
          </div>
          <Button
            variant="outline"
            onClick={() => setCurrentUser(null)}
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-slate-800 border-b border-slate-700">
            <TabsTrigger
              value="matches"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Find Teammates
            </TabsTrigger>
            <TabsTrigger
              value="chat"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Messages
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              My Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="mt-8">
            <MatchesPage />
          </TabsContent>

          <TabsContent value="chat" className="mt-8">
            <ChatPage />
          </TabsContent>

          <TabsContent value="profile" className="mt-8">
            <ProfilePage />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
