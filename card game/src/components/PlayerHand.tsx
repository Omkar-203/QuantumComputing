import React from 'react';
import { Card as CardComponent } from './Card';
import { Player } from '../types/game';

interface PlayerHandProps {
  player: Player;
  isCurrentPlayer: boolean;
  onPlayCard: (cardId: string) => void;
}

export function PlayerHand({ player, isCurrentPlayer, onPlayCard }: PlayerHandProps) {
  return (
    <div className={`
      p-4 sm:p-6 rounded-lg
      ${isCurrentPlayer 
        ? 'bg-blue-50 border-2 border-blue-200' 
        : 'bg-gray-50 border border-gray-200'}
      transition-colors duration-300
      shadow-sm
    `}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800">
          {player.name} 
          <span className="ml-2 text-sm font-normal text-gray-600 block sm:inline">
            (Wants: {player.desiredEndState})
          </span>
        </h3>
        <span className="text-sm text-gray-500">
          Cards: {player.cards.length}
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
        {player.cards.map(card => (
          <CardComponent
            key={card.id}
            card={card}
            onClick={() => onPlayCard(card.id)}
            disabled={!isCurrentPlayer}
          />
        ))}
      </div>
    </div>
  );
}