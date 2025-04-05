import { QuantumGate } from '../types/quantum';

export const QUANTUM_GATES: QuantumGate[] = [
  {
    id: 'H',
    name: 'Hadamard',
    symbol: 'H',
    description: 'Creates quantum superposition',
    matrix: [
      [{ real: 1/Math.sqrt(2), imag: 0 }, { real: 1/Math.sqrt(2), imag: 0 }],
      [{ real: 1/Math.sqrt(2), imag: 0 }, { real: -1/Math.sqrt(2), imag: 0 }]
    ]
  },
  {
    id: 'X',
    name: 'Pauli-X',
    symbol: 'X',
    description: 'Quantum NOT gate - flips the state',
    matrix: [
      [{ real: 0, imag: 0 }, { real: 1, imag: 0 }],
      [{ real: 1, imag: 0 }, { real: 0, imag: 0 }]
    ]
  },
  {
    id: 'Y',
    name: 'Pauli-Y',
    symbol: 'Y',
    description: 'Rotation around Y-axis',
    matrix: [
      [{ real: 0, imag: 0 }, { real: 0, imag: -1 }],
      [{ real: 0, imag: 1 }, { real: 0, imag: 0 }]
    ]
  },
  {
    id: 'Z',
    name: 'Pauli-Z',
    symbol: 'Z',
    description: 'Phase flip operation',
    matrix: [
      [{ real: 1, imag: 0 }, { real: 0, imag: 0 }],
      [{ real: 0, imag: 0 }, { real: -1, imag: 0 }]
    ]
  },
  {
    id: 'S',
    name: 'Phase',
    symbol: 'S',
    description: 'π/2 phase rotation',
    matrix: [
      [{ real: 1, imag: 0 }, { real: 0, imag: 0 }],
      [{ real: 0, imag: 0 }, { real: 0, imag: 1 }]
    ]
  }
];