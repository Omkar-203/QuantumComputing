import { useState, useEffect } from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import { CircuitWire, QuantumState } from '../types/quantum';
import { QUANTUM_GATES } from '../utils/quantumGates';
import { updateStateForQubits } from '../utils/stateManagement';
import { applyGate } from '../utils/quantumOperations';

export function useCircuit() {
  const [wires, setWires] = useState<CircuitWire[]>([
    { id: 'wire-1', gates: [] },
    { id: 'wire-2', gates: [] },
  ]);
  const [quantumState, setQuantumState] = useState<QuantumState>(updateStateForQubits(2));

  // Update quantum state whenever gates change
  useEffect(() => {
    let currentState = updateStateForQubits(wires.length);
    
    // Apply gates in order for each wire
    wires.forEach((wire, wireIndex) => {
      wire.gates.forEach(gate => {
        currentState = applyGate(currentState, gate, wireIndex);
      });
    });
    
    setQuantumState(currentState);
  }, [wires]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over) {
      const wireId = over.id as string;
      const gateId = active.id as string;
      const gate = QUANTUM_GATES.find(g => g.id === gateId);
      
      if (gate) {
        setWires(wires.map(wire => {
          if (wire.id === wireId) {
            return {
              ...wire,
              gates: [...wire.gates, {
                ...gate,
                id: `${gate.id}-${Date.now()}`
              }]
            };
          }
          return wire;
        }));
      }
    }
  };

  const handleRemoveGate = (wireId: string, gateId: string) => {
    setWires(wires.map(wire => {
      if (wire.id === wireId) {
        return {
          ...wire,
          gates: wire.gates.filter(gate => gate.id !== gateId)
        };
      }
      return wire;
    }));
  };

  const addWire = () => {
    setWires(prev => [...prev, { id: `wire-${prev.length + 1}`, gates: [] }]);
  };

  const removeWire = () => {
    if (wires.length > 1) {
      setWires(prev => prev.slice(0, -1));
    }
  };

  return {
    wires,
    quantumState,
    handleDragEnd,
    handleRemoveGate,
    addWire,
    removeWire
  };
}