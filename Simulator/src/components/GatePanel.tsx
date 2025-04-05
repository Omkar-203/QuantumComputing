import React from 'react';
import { QuantumGate } from './QuantumGate';
import { QUANTUM_GATES } from '../utils/quantumGates';
import { Info } from 'lucide-react';

export const GatePanel: React.FC = () => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
        Quantum Gates
        <Info className="w-5 h-5 text-blue-500" />
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 min-w-[300px] touch-none">
        {QUANTUM_GATES.map((gate) => (
          <div key={gate.id} className="text-center group relative">
            <QuantumGate gate={gate} />
            <div className="mt-2">
              <p className="font-medium text-gray-800 text-sm md:text-base">{gate.name}</p>
              <p className="text-xs md:text-sm text-gray-600">{gate.description}</p>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 w-48 pointer-events-none">
              Matrix representation available
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}