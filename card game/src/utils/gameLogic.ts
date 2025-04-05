import { Card, CardType, QubitState, Player } from '../types/game';
import { CARD_DISTRIBUTION } from '../config/gameConfig';
import { shuffle } from './arrayUtils';

export function createDeck(): Card[] {
  const deck: Card[] = [];

  Object.entries(CARD_DISTRIBUTION).forEach(([type, count]) => {
    for (let i = 0; i < count; i++) {
      deck.push({
        id: `${type}-${i}`,
        type: type as CardType
      });
    }
  });

  return shuffle(deck);
}

export function applyCardEffect(currentState: QubitState, cardType: CardType): QubitState {
  switch (cardType) {
    case '|0>':
      return '|0>';
    case '|1>':
      return '|1>';
    case 'H':
      return 'superposition';
    case 'X':
      if (currentState === '|0>') return '|1>';
      if (currentState === '|1>') return '|0>';
      return 'superposition';
    default:
      return currentState;
  }
}

export function measureSuperposition(): QubitState {
  return Math.random() < 0.5 ? '|0>' : '|1>';
}

export function determineWinner(finalState: QubitState, players: [Player, Player]): Player | null {
  if (finalState === 'superposition') {
    return null;
  }
  return finalState === players[0].desiredEndState ? players[0] : players[1];
}