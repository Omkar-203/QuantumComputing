export type CardType = '|0>' | '|1>' | 'H' | 'X' | 'M';

export interface Card {
  id: string;
  type: CardType;
}

export type QubitState = '|0>' | '|1>' | 'superposition';

export interface Player {
  id: number;
  name: string;
  cards: Card[];
  desiredEndState: '|0>' | '|1>';
}

export interface GameState {
  currentQubitState: QubitState;
  players: [Player, Player];
  currentPlayerIndex: 0 | 1;
  gameStarted: boolean;
  gameEnded: boolean;
  winner: Player | null;
  awaitingMDecision: boolean;
  lastPlayedCardId: string | null;
}