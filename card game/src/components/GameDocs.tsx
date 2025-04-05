import React from 'react';
import { cardImages } from '../config/cardImages';

export function GameDocs() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How to Play</h2>
      
      <div className="prose prose-lg max-w-none">
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Game Overview</h3>
          <p className="text-gray-800 mb-4">
            Quantum Cards is a two-player game where each player tries to manipulate a quantum bit (qubit) 
            to reach their desired final state. Player 1 aims for |0⟩ while Player 2 aims for |1⟩.
          </p>
          <p className="text-gray-800">
            Each player starts with 26 cards. Take turns playing cards to manipulate the qubit's state 
            until all cards are played.
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Card Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                type: '|0>',
                name: "Zero State",
                image: cardImages['|0>'],
                description: "Sets the qubit to the |0⟩ state",
                count: 12
              },
              {
                type: '|1>',
                name: "One State",
                image: cardImages['|1>'],
                description: "Sets the qubit to the |1⟩ state",
                count: 12
              },
              {
                type: 'H',
                name: "Hadamard Gate",
                image: cardImages['H'],
                description: "Puts the qubit in superposition",
                count: 10
              },
              {
                type: 'X',
                name: "NOT Gate",
                image: cardImages['X'],
                description: "Flips between |0⟩ and |1⟩ states",
                count: 10
              },
              {
                type: 'M',
                name: "Measurement",
                image: cardImages['M'],
                description: "Measure the qubit, forcing it to |0⟩ or |1⟩",
                count: 8
              }
            ].map(card => (
              <div key={card.type} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex gap-4">
                  <img 
                    src={card.image} 
                    alt={card.name}
                    className="w-24 h-36 object-cover rounded-lg shadow-sm"
                  />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">{card.name}</h4>
                    <p className="text-gray-700 mb-2">{card.description}</p>
                    <p className="text-sm text-gray-600">Cards in deck: {card.count}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Winning the Game</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-800">
            <li>The game ends when all cards have been played</li>
            <li>If the final state is |0⟩, Player 1 wins</li>
            <li>If the final state is |1⟩, Player 2 wins</li>
            <li>If the final state is in superposition, it will be measured to determine the winner</li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Strategy Tips</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-800">
            <li>Save your Measurement cards for critical moments</li>
            <li>Use Hadamard gates to create uncertainty for your opponent</li>
            <li>Keep track of your opponent's remaining cards</li>
            <li>Plan several moves ahead to reach your desired state</li>
          </ul>
        </div>
      </div>
    </div>
  );
}