import React from 'react';

interface MCardDialogProps {
  onDecision: (state: '|0>' | '|1>') => void;
}

export function MCardDialog({ onDecision }: MCardDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-indigo-900/80 p-8 rounded-lg border-2 border-indigo-500/30 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold text-white mb-4">Choose Qubit State</h3>
        <p className="text-white/80 mb-6">Select the state you want to set the qubit to:</p>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => onDecision('|0>')}
            className="px-6 py-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg text-white font-bold hover:scale-105 transition-transform"
          >
            |0⟩
          </button>
          <button
            onClick={() => onDecision('|1>')}
            className="px-6 py-3 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-lg text-white font-bold hover:scale-105 transition-transform"
          >
            |1⟩
          </button>
        </div>
      </div>
    </div>
  );
}