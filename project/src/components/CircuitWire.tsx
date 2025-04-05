import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { QuantumGate } from './QuantumGate';
import type { CircuitWire as CircuitWireType } from '../types/quantum';
import { X } from 'lucide-react';

interface Props {
  wire: CircuitWireType;
  onRemoveGate: (gateId: string) => void;
  label: string;
}

export const CircuitWire: React.FC<Props> = ({ wire, onRemoveGate, label }) => {
  const { setNodeRef } = useDroppable({
    id: wire.id,
  });

  return (
    <div className="relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-8">
        <span className="font-mono text-xs sm:text-sm font-bold text-gray-800">{label}</span>
      </div>
      <div
        ref={setNodeRef}
        className="h-12 sm:h-16 border-2 border-gray-200 rounded-md flex items-center gap-2 p-2 bg-gray-50 relative group touch-none"
      >
        <div className="flex items-center gap-2 min-w-[200px]">
          {wire.gates.map((gate) => (
            <div key={gate.id} className="relative group flex-shrink-0">
              <QuantumGate gate={gate} />
              <button
                onClick={() => onRemoveGate(gate.id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          {wire.gates.length === 0 && (
            <div className="text-gray-400 text-xs sm:text-sm absolute inset-0 flex items-center justify-center">
              Drop quantum gates here
            </div>
          )}
        </div>
      </div>
    </div>
  );
};