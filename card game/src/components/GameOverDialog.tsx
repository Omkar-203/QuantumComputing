import React, { useRef, useState } from 'react';
import { Player } from '../types/game';
import { Trophy, ShoppingCart, RotateCcw, Share2 } from 'lucide-react';
import { ShareDialog } from './ShareDialog';
import { captureElement } from '../utils/screenshot';

interface GameOverDialogProps {
  winner: Player | null;
  finalState: string;
  onPlayAgain: () => void;
}

export function GameOverDialog({ winner, finalState, onPlayAgain }: GameOverDialogProps) {
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [screenshotUrl, setScreenshotUrl] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    if (contentRef.current) {
      const imageUrl = await captureElement(contentRef.current);
      setScreenshotUrl(imageUrl);
      setShowShareDialog(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="relative bg-gradient-to-br from-indigo-900/90 to-purple-900/90 p-8 rounded-2xl border border-indigo-500/50 max-w-md w-full mx-4 shadow-2xl">
        <div ref={contentRef}>
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gradient-to-br from-yellow-400 to-orange-500 w-24 h-24 rounded-full flex items-center justify-center shadow-lg border-4 border-indigo-900">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          
          <div className="mt-8">
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-center mb-4">
              {winner ? `${winner.name} Wins!` : "It's a Draw!"}
            </h3>
            
            <p className="text-white/80 text-center mb-8">
              Final state: <span className="font-mono bg-indigo-950/50 px-2 py-1 rounded">{finalState}</span>
            </p>
          </div>
        </div>

        <button
          onClick={handleShare}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <Share2 className="w-5 h-5" />
        </button>
        
        <div className="space-y-4">
          <button
            onClick={onPlayAgain}
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg text-white font-bold hover:from-emerald-600 hover:to-teal-600 transition-all transform hover:scale-105 shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
          
          <a
            href="https://www.amazon.in/Number-Matching-Players-Reverse-colors/dp/B0DLV7KSHS"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-white font-bold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg group"
          >
            <ShoppingCart className="w-5 h-5 group-hover:animate-bounce" />
            Buy Physical Cards
          </a>
        </div>
      </div>

      {showShareDialog && (
        <ShareDialog
          imageUrl={screenshotUrl}
          onClose={() => setShowShareDialog(false)}
        />
      )}
    </div>
  );
}