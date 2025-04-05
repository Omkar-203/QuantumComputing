import React from 'react';
import { QubitState } from '../types/game';

interface QubitDisplayProps {
  state: QubitState;
}

export function QubitDisplay({ state }: QubitDisplayProps) {
  const getStateColor = () => {
    switch (state) {
      case '|0>': return 'bg-blue-100 text-blue-600 border-blue-200';
      case '|1>': return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'superposition': return 'bg-indigo-100 text-indigo-600 border-indigo-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-4">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Current Qubit State</h2>
      <div className={`
        w-16 h-16 sm:w-24 sm:h-24 rounded-full 
        ${getStateColor()}
        flex items-center justify-center
        font-bold text-lg sm:text-xl
        shadow-md
        border-2
        transition-all duration-300
      `}>
        {state}
      </div>
    </div>
  );
}