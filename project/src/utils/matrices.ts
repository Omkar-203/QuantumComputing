import { ComplexNumber } from '../types/quantum';
import { complexZero } from './complexMath';

export const createIdentityMatrix = (size: number): ComplexNumber[][] => {
  return Array(size).fill(null).map((_, i) => 
    Array(size).fill(null).map((_, j) => ({
      real: i === j ? 1 : 0,
      imag: 0
    }))
  );
};

export const matrixMultiply = (a: ComplexNumber[][], b: ComplexNumber[][]): ComplexNumber[][] => {
  const result: ComplexNumber[][] = [];
  for (let i = 0; i < a.length; i++) {
    result[i] = [];
    for (let j = 0; j < b[0].length; j++) {
      result[i][j] = complexZero();
      for (let k = 0; k < b.length; k++) {
        const product = {
          real: a[i][k].real * b[k][j].real - a[i][k].imag * b[k][j].imag,
          imag: a[i][k].real * b[k][j].imag + a[i][k].imag * b[k][j].real
        };
        result[i][j].real += product.real;
        result[i][j].imag += product.imag;
      }
    }
  }
  return result;
};