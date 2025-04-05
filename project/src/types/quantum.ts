export type ComplexNumber = {
  real: number;
  imag: number;
};

export type QuantumState = ComplexNumber[];

export type QuantumGate = {
  id: string;
  name: string;
  matrix: ComplexNumber[][];
  symbol: string;
  description: string;
};

export type CircuitWire = {
  id: string;
  gates: QuantumGate[];
};