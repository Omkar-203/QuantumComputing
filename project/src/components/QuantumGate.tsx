import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { QuantumGate as QuantumGateType } from '../types/quantum';

interface Props {
  gate: QuantumGateType;
}

export const QuantumGate: React.FC<Props> = ({ gate }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: gate.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="w-10 h-10 sm:w-12 sm:h-12 bg-white/90 border-2 border-blue-400 rounded-lg flex items-center justify-center cursor-move hover:bg-blue-50 transition-colors shadow-lg backdrop-blur-sm touch-none"
    >
      <span className="text-base sm:text-lg font-bold text-blue-900">{gate.symbol}</span>
    </div>
  );
};