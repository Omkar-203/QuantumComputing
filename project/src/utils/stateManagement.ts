import { ComplexNumber, QuantumState } from '../types/quantum';
import { complexOne, complexZero } from './complexMath';

// Create initial state |0⟩^⊗n for n qubits
export const createInitialState = (numQubits: number): QuantumState => {
  const stateSize = Math.pow(2, numQubits);
  return Array(stateSize)
    .fill(null)
    .map((_, i) => i === 0 ? { ...complexOne() } : { ...complexZero() });
};

// Update quantum state when number of qubits changes
export const updateStateForQubits = (numQubits: number): QuantumState => {
  return createInitialState(numQubits);
};