'use client';

import { useDevMatch } from '@/lib/context';
import { MOCK_USERS } from '@/lib/mock-data';
import { useState } from 'react';
import LandingPage from '@/components/landing';
import AuthPage from '@/components/auth';
import DashboardPage from '@/components/dashboard';

export default function Home() {
  const { currentUser, setCurrentUser } = useDevMatch();
  const [authStep, setAuthStep] = useState<'landing' | 'auth'>('landing');

  if (!currentUser) {
    if (authStep === 'landing') {
      return <LandingPage onGetStarted={() => setAuthStep('auth')} />;
    }
    return <AuthPage onSelectUser={(userId) => {
      const user = MOCK_USERS.find(u => u.id === userId);
      if (user) setCurrentUser(user);
      setAuthStep('landing');
    }} />;
  }

  return <DashboardPage />;
}
