import { ComplexNumber, QuantumState, QuantumGate } from '../types/quantum';
import { complexAdd, complexMultiply, complexZero, complexOne } from './complexMath';
import { tensorProduct } from './tensorProduct';

// Helper to create single-qubit identity matrix
const createIdentityMatrix = (): ComplexNumber[][] => [
  [complexOne(), complexZero()],
  [complexZero(), complexOne()]
];

// Create the full gate matrix for multiple qubits
const createFullGateMatrix = (gate: QuantumGate, targetQubit: number, totalQubits: number): ComplexNumber[][] => {
  let fullMatrix = gate.matrix;
  
  // Add identity matrices for qubits before target
  for (let i = 0; i < targetQubit; i++) {
    fullMatrix = tensorProduct(createIdentityMatrix(), fullMatrix);
  }
  
  // Add identity matrices for qubits after target
  for (let i = targetQubit + 1; i < totalQubits; i++) {
    fullMatrix = tensorProduct(fullMatrix, createIdentityMatrix());
  }
  
  return fullMatrix;
};

// Apply a matrix to the quantum state
const applyMatrix = (state: QuantumState, matrix: ComplexNumber[][]): QuantumState => {
  const newState: QuantumState = Array(state.length)
    .fill(null)
    .map(() => ({ ...complexZero() }));
  
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < state.length; j++) {
      const product = complexMultiply(matrix[i][j], state[j]);
      newState[i] = complexAdd(newState[i], product);
    }
  }
  
  // Normalize the state
  const normalizationFactor = Math.sqrt(newState.reduce((sum, amplitude) => 
    sum + amplitude.real * amplitude.real + amplitude.imag * amplitude.imag, 0
  ));
  
  return newState.map(amplitude => ({
    real: amplitude.real / normalizationFactor,
    imag: amplitude.imag / normalizationFactor
  }));
};

export const applyGate = (state: QuantumState, gate: QuantumGate, qubitIndex: number): QuantumState => {
  if (!state || !gate || !gate.matrix) return state;
  
  const totalQubits = Math.log2(state.length);
  if (qubitIndex >= totalQubits) return state;
  
  // Create the full gate matrix for all qubits
  const fullMatrix = createFullGateMatrix(gate, qubitIndex, totalQubits);
  
  // Apply the matrix to the state and return normalized result
  return applyMatrix(state, fullMatrix);
};