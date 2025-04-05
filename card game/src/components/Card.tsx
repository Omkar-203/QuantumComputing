import React from 'react';
import { Card as CardType } from '../types/game';
import { cardImages } from '../config/cardImages';

interface CardProps {
  card: CardType;
  onClick?: () => void;
  disabled?: boolean;
}

export function Card({ card, onClick, disabled }: CardProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="relative group"
    >
      <div className={`
        relative w-20 h-32 sm:w-32 sm:h-48 rounded-xl overflow-hidden
        ${disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'group-hover:scale-105 transform transition-all cursor-pointer hover:shadow-xl'}
        bg-white
        shadow-md
        transition-all duration-300
      `}>
        <img 
          src={cardImages[card.type]} 
          alt={`${card.type} card`}
          className="w-full h-full object-cover"
        />
      </div>
    </button>
  );
}