import { CircuitWire } from '../types/quantum';
import { QUANTUM_GATES } from './quantumGates';

export const encodeCircuitState = (wires: CircuitWire[]): string => {
  const circuitState = {
    version: '1',
    wires: wires.map(wire => ({
      id: wire.id,
      gates: wire.gates.map(gate => ({
        id: gate.id.split('-')[0],
        position: wire.gates.indexOf(gate)
      }))
    }))
  };
  
  return btoa(JSON.stringify(circuitState));
};

export const decodeCircuitState = (encoded: string): CircuitWire[] | null => {
  try {
    const decoded = JSON.parse(atob(encoded));
    if (decoded.version !== '1') return null;
    
    return decoded.wires.map((wire: any) => ({
      id: wire.id,
      gates: wire.gates.map((gate: any) => ({
        ...QUANTUM_GATES.find(g => g.id === gate.id)!,
        id: `${gate.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      }))
    }));
  } catch (error) {
    console.error('Error decoding circuit state:', error);
    return null;
  }
};