import React from 'react';
import { Shuffle } from 'lucide-react';

interface PreGameScreenProps {
  onStartGame: () => void;
  onShuffle: () => void;
}

export function PreGameScreen({ onStartGame, onShuffle }: PreGameScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full mx-4 text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Quantum Cards</h1>
        <p className="text-gray-600">Get ready to play! Shuffle the cards before starting.</p>
        
        <div className="space-y-4">
          <button
            onClick={onShuffle}
            className="w-full px-6 py-3 bg-indigo-100 text-indigo-600 rounded-lg font-semibold 
                     hover:bg-indigo-200 transition-colors flex items-center justify-center gap-2 group"
          >
            <Shuffle className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Shuffle Cards
          </button>
          
          <button
            onClick={onStartGame}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 
                     text-white rounded-lg font-semibold hover:from-blue-700 
                     hover:to-indigo-700 transition-all transform hover:scale-105"
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}