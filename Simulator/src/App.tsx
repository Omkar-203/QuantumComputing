import React, { useState } from 'react';
import { DndContext, TouchSensor, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Plus, Minus } from 'lucide-react';
import { CircuitWire } from './components/CircuitWire';
import { GatePanel } from './components/GatePanel';
import { StateDisplay } from './components/StateDisplay';
import { ShareCircuit } from './components/ShareCircuit';
import { Navbar } from './components/Navbar';
import { AtomicBackground } from './components/AtomicBackground';
import { useCircuit } from './hooks/useCircuit';

export default function App() {
  const [showShareModal, setShowShareModal] = useState(false);
  const {
    wires,
    quantumState,
    handleDragEnd,
    handleRemoveGate,
    addWire,
    removeWire
  } = useCircuit();

  // Configure sensors for both mouse and touch interactions
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <div className="min-h-screen flex flex-col relative">
      <AtomicBackground />
      <Navbar onShare={() => setShowShareModal(true)} />

      <main className="max-w-7xl mx-auto px-4 pt-20 md:pt-24 pb-8 space-y-6 md:space-y-8 flex-grow w-full relative">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <GatePanel />
          
          <div className="bg-white/90 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
              <h2 className="text-xl font-bold text-gray-800">Quantum Circuit</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={addWire}
                  className="flex-1 sm:flex-none px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center justify-center gap-1 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span className="sm:inline">Add Qubit</span>
                </button>
                <button
                  onClick={removeWire}
                  className="flex-1 sm:flex-none px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md flex items-center justify-center gap-1 transition-colors"
                  disabled={wires.length <= 1}
                >
                  <Minus className="w-4 h-4" />
                  <span className="sm:inline">Remove Qubit</span>
                </button>
              </div>
            </div>
            <div className="space-y-4 pl-4 sm:pl-8">
              {wires.map((wire, index) => (
                <CircuitWire
                  key={wire.id}
                  wire={wire}
                  label={`q${index}`}
                  onRemoveGate={(gateId) => handleRemoveGate(wire.id, gateId)}
                />
              ))}
            </div>
          </div>

          <StateDisplay state={quantumState} />
        </DndContext>
      </main>
      
      {showShareModal && (
        <ShareCircuit 
          wires={wires} 
          onClose={() => setShowShareModal(false)} 
        />
      )}
    </div>
  );
}