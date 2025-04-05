import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dices, Play } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { GameDocs } from '../components/GameDocs';
import { AtomicBackground } from '../components/AtomicBackground';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navbar />
      <AtomicBackground />
      
      <div className="relative z-10 pt-16">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center pt-24">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Quantum Cards
          </h1>
          <p className="text-xl text-gray-800 mb-12">
            Experience quantum computing through an engaging card game. Challenge your friends and master quantum mechanics!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 rounded-lg font-semibold 
                       hover:bg-white/90 transition-colors flex items-center justify-center gap-2 group"
            >
              <Dices className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              Shuffle
            </button>
            
            <button
              onClick={() => navigate('/game')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 
                       text-white rounded-lg font-semibold hover:from-blue-700 
                       hover:to-indigo-700 transition-all transform hover:scale-105
                       flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Start Game
            </button>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <GameDocs />
          </div>
        </div>
      </div>
    </div>
  );
}