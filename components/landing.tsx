'use client';

import { Button } from '@/components/ui/button';
import { Zap, Users, Heart } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fadeInUp">
          <div className="inline-flex items-center justify-center gap-2 bg-slate-800 rounded-full px-4 py-2 mb-8 hover:bg-slate-700 transition-colors">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">Smart Hackathon Teaming</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Find Your Perfect Hackathon Teammate
          </h1>
          
          <p className="text-xl text-slate-400 mb-8">
            Stop wasting time finding teammates. DevMatch uses AI-powered skill matching to connect you with the perfect collaborators for your hackathon project.
          </p>
          
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 hover:scale-105 transition-transform animate-pulse-glow"
          >
            Get Started Now
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Smart Matching</h3>
            <p className="text-slate-400">
              Our algorithm analyzes skills, experience, and preferences to find your ideal match.
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Real-Time Chat</h3>
            <p className="text-slate-400">
              Connect instantly with matched teammates and start collaborating right away.
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Build Together</h3>
            <p className="text-slate-400">
              Form balanced teams with complementary skills and ship amazing projects.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-slate-800 rounded-lg p-12 border border-slate-700">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">50+</div>
              <p className="text-slate-400">Available Skills</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-400 mb-2">6</div>
              <p className="text-slate-400">Expert Teammates</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">100%</div>
              <p className="text-slate-400">Match Success</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
