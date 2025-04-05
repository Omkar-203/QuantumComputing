import { Player, Card, QubitState } from '../types/game';

export function handleMDecision(
  players: [Player, Player],
  currentPlayerIndex: number,
  chosenState: QubitState
): [Player, Player] {
  return players.map((player, index) => {
    if (index === currentPlayerIndex) {
      return {
        ...player,
        cards: player.cards.filter(c => c.type !== 'M')
      };
    }
    return player;
  }) as [Player, Player];
}

export function updatePlayerCards(
  players: [Player, Player],
  currentPlayerIndex: number,
  cardId: string
): [Player, Player] {
  return players.map((player, index) => {
    if (index === currentPlayerIndex) {
      return {
        ...player,
        cards: player.cards.map(c => 
          c.id === cardId 
            ? { ...c, count: c.count - 1 }
            : c
        ).filter(c => c.count > 0)
      };
    }
    return player;
  }) as [Player, Player];
}