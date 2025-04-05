import { useState } from 'react';
import { GameState, Player, QubitState } from '../types/game';
import { createDeck, applyCardEffect, measureSuperposition, determineWinner } from '../utils/gameLogic';
import { CARDS_PER_PLAYER } from '../config/gameConfig';

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>({
    currentQubitState: '|0>',
    players: [
      { id: 1, name: 'Player 1', cards: [], desiredEndState: '|0>' },
      { id: 2, name: 'Player 2', cards: [], desiredEndState: '|1>' }
    ],
    currentPlayerIndex: 0,
    gameStarted: false,
    gameEnded: false,
    winner: null,
    awaitingMDecision: false,
    lastPlayedCardId: null
  });

  const initializeGame = () => {
    const deck = createDeck();
    const player1Cards = deck.slice(0, CARDS_PER_PLAYER);
    const player2Cards = deck.slice(CARDS_PER_PLAYER);

    setGameState({
      currentQubitState: '|0>',
      players: [
        { id: 1, name: 'Player 1', cards: player1Cards, desiredEndState: '|0>' },
        { id: 2, name: 'Player 2', cards: player2Cards, desiredEndState: '|1>' }
      ],
      currentPlayerIndex: 0,
      gameStarted: true,
      gameEnded: false,
      winner: null,
      awaitingMDecision: false,
      lastPlayedCardId: null
    });
  };

  const handlePlayCard = (cardId: string) => {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    const card = currentPlayer.cards.find(c => c.id === cardId);
    
    if (!card) return;

    if (card.type === 'M') {
      setGameState(prev => ({ 
        ...prev, 
        awaitingMDecision: true,
        lastPlayedCardId: cardId
      }));
      return;
    }

    let newState: QubitState = applyCardEffect(gameState.currentQubitState, card.type);

    const updatedPlayers = gameState.players.map(player => {
      if (player.id === currentPlayer.id) {
        return {
          ...player,
          cards: player.cards.filter(c => c.id !== cardId)
        };
      }
      return player;
    }) as [Player, Player];

    const allCardsPlayed = updatedPlayers.every(p => p.cards.length === 0);
    let winner = null;
    let finalState = newState;

    if (allCardsPlayed) {
      finalState = gameState.currentQubitState === 'superposition' 
        ? measureSuperposition()
        : gameState.currentQubitState;
      winner = determineWinner(finalState, updatedPlayers);
    }

    setGameState(prev => ({
      ...prev,
      currentQubitState: finalState,
      players: updatedPlayers,
      currentPlayerIndex: (prev.currentPlayerIndex + 1) % 2 as 0 | 1,
      gameEnded: allCardsPlayed,
      winner
    }));
  };

  const handleMDecision = (chosenState: '|0>' | '|1>') => {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    const updatedPlayers = gameState.players.map(player => {
      if (player.id === currentPlayer.id) {
        return {
          ...player,
          cards: player.cards.filter(c => c.id !== gameState.lastPlayedCardId)
        };
      }
      return player;
    }) as [Player, Player];

    const allCardsPlayed = updatedPlayers.every(p => p.cards.length === 0);
    let winner = null;

    if (allCardsPlayed) {
      winner = determineWinner(chosenState, updatedPlayers);
    }

    setGameState(prev => ({
      ...prev,
      currentQubitState: chosenState,
      players: updatedPlayers,
      currentPlayerIndex: (prev.currentPlayerIndex + 1) % 2 as 0 | 1,
      awaitingMDecision: false,
      lastPlayedCardId: null,
      gameEnded: allCardsPlayed,
      winner
    }));
  };

  return {
    gameState,
    initializeGame,
    handlePlayCard,
    handleMDecision
  };
}