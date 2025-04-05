import React from 'react';
import { QuantumState } from '../types/quantum';

interface Props {
  state: QuantumState;
}

const formatComplex = (num: { real: number; imag: number }): string => {
  const realPart = num.real.toFixed(3);
  const imagPart = num.imag.toFixed(3);
  
  if (Math.abs(num.imag) < 0.001) return realPart;
  if (Math.abs(num.real) < 0.001) return `${imagPart}i`;
  
  return `${realPart}${num.imag >= 0 ? '+' : ''}${imagPart}i`;
};

export const StateDisplay: React.FC<Props> = ({ state }) => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Quantum State</h2>
      <div className="space-y-4">
        <div className="text-sm md:text-lg font-mono bg-gray-50 p-3 md:p-4 rounded-md text-blue-600 border border-gray-200 overflow-x-auto whitespace-nowrap">
          |ψ⟩ = {state.map((amplitude, idx) => (
            <span key={idx} className="mr-2">
              {formatComplex(amplitude)}|{idx.toString(2).padStart(Math.log2(state.length), '0')}⟩
              {idx < state.length - 1 ? ' + ' : ''}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {state.map((amplitude, idx) => (
            <div key={idx} className="bg-gray-50 p-3 rounded-md border border-gray-200">
              <div className="font-semibold text-gray-800 text-sm md:text-base">
                Basis State |{idx.toString(2).padStart(Math.log2(state.length), '0')}⟩
              </div>
              <div className="text-xs md:text-sm text-blue-600">
                Amplitude: {formatComplex(amplitude)}
              </div>
              <div className="text-xs md:text-sm text-blue-600">
                Probability: {(Math.pow(amplitude.real, 2) + Math.pow(amplitude.imag, 2)).toFixed(3)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};