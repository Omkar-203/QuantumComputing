import { ComplexNumber } from '../types/quantum';

export const complexZero = (): ComplexNumber => ({ 
  real: 0, 
  imag: 0 
});

export const complexOne = (): ComplexNumber => ({ 
  real: 1, 
  imag: 0 
});

export const complexAdd = (a: ComplexNumber, b: ComplexNumber): ComplexNumber => ({
  real: a.real + b.real,
  imag: a.imag + b.imag
});

export const complexMultiply = (a: ComplexNumber, b: ComplexNumber): ComplexNumber => ({
  real: a.real * b.real - a.imag * b.imag,
  imag: a.real * b.imag + a.imag * b.real
});