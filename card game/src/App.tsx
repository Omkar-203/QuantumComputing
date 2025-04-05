import React, { useEffect } from 'react';
import { QubitDisplay } from './components/QubitDisplay';
import { PlayerHand } from './components/PlayerHand';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GameState } from './types/game';
import { MCardDialog } from './components/MCardDialog';
import { GameOverDialog } from './components/GameOverDialog';
import { useGameState } from './hooks/useGameState';

export function App() {
  const {
    gameState,
    initializeGame,
    handlePlayCard,
    handleMDecision
  } = useGameState();

  useEffect(() => {
    if (!gameState.gameStarted) {
      initializeGame();
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-16 sm:pt-24 px-2 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-8">
          <div className="flex justify-center mb-6 sm:mb-12">
            <QubitDisplay state={gameState.currentQubitState} />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-8">
            {gameState.players.map((player, index) => (
              <PlayerHand
                key={player.id}
                player={player}
                isCurrentPlayer={index === gameState.currentPlayerIndex && !gameState.gameEnded}
                onPlayCard={handlePlayCard}
              />
            ))}
          </div>

          {gameState.awaitingMDecision && (
            <MCardDialog onDecision={handleMDecision} />
          )}

          {gameState.gameEnded && (
            <GameOverDialog 
              winner={gameState.winner} 
              finalState={gameState.currentQubitState}
              onPlayAgain={initializeGame}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}