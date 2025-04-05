import { ComplexNumber } from '../types/quantum';
import { complexMultiply } from './complexMath';

export const tensorProduct = (a: ComplexNumber[][], b: ComplexNumber[][]): ComplexNumber[][] => {
  const rowsA = a.length;
  const colsA = a[0].length;
  const rowsB = b.length;
  const colsB = b[0].length;
  const result: ComplexNumber[][] = [];

  for (let i = 0; i < rowsA * rowsB; i++) {
    result[i] = [];
    for (let j = 0; j < colsA * colsB; j++) {
      const a_i = Math.floor(i / rowsB);
      const a_j = Math.floor(j / colsB);
      const b_i = i % rowsB;
      const b_j = j % colsB;
      result[i][j] = complexMultiply(a[a_i][a_j], b[b_i][b_j]);
    }
  }
  return result;
};