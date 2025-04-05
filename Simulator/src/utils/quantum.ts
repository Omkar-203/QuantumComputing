import { ComplexNumber, QuantumState } from '../types/quantum';

export const multiply = (a: ComplexNumber, b: ComplexNumber): ComplexNumber => ({
  real: a.real * b.real - a.imag * b.imag,
  imag: a.real * b.imag + a.imag * b.real,
});

export const add = (a: ComplexNumber, b: ComplexNumber): ComplexNumber => ({
  real: a.real + b.real,
  imag: a.imag + b.imag,
});

export const applyGate = (state: QuantumState, matrix: ComplexNumber[][]): QuantumState => {
  const newState: QuantumState = new Array(state.length).fill({ real: 0, imag: 0 });
  
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < state.length; j++) {
      newState[i] = add(newState[i], multiply(matrix[i][j], state[j]));
    }
  }
  
  return newState;
};