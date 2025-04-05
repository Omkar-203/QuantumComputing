import React, { useState, useEffect } from 'react';
import { ShareButtons } from './ShareButtons';
import { CircuitWire } from '../types/quantum';
import { encodeCircuitState } from '../utils/sharing';
import { captureScreenshot } from '../utils/screenshot';

interface ShareCircuitProps {
  wires: CircuitWire[];
  onClose: () => void;
}

export const ShareCircuit: React.FC<ShareCircuitProps> = ({ wires, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const shareText = `Built a quantum circuit with Aqademy's Simulator! Try it at https://aqademy.quantum-simulator.com ${encodeCircuitState(wires)}`;

  useEffect(() => {
    const captureInitialScreenshot = async () => {
      setIsCapturing(true);
      try {
        const imageUrl = await captureScreenshot();
        setScreenshotUrl(imageUrl);
      } catch (error) {
        console.error('Screenshot error:', error);
      } finally {
        setIsCapturing(false);
      }
    };

    captureInitialScreenshot();
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async (platform: 'linkedin' | 'twitter') => {
    try {
      await navigator.clipboard.writeText(shareText);

      const shareUrl = platform === 'linkedin' 
        ? 'https://www.linkedin.com/sharing/share-offsite/?url=https://aqademy.quantum-simulator.com'
        : `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

      const notification = document.createElement('div');
      notification.className = 'fixed bottom-4 right-4 bg-white text-gray-800 p-4 rounded-lg shadow-lg z-50 border border-gray-200';
      notification.textContent = `The circuit details have been copied to your clipboard. You can now paste them in the ${platform === 'linkedin' ? 'LinkedIn' : 'X (Twitter)'} post.`;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 5000);

      window.open(shareUrl, '_blank');
    } catch (error) {
      console.error('Sharing error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full border border-gray-200 shadow-xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-2 text-gray-800">Share Your Circuit</h3>
        <p className="text-sm text-gray-600 mb-4">
          Share your quantum circuit creation with your network or save it for later.
        </p>

        <ShareButtons
          onShare={handleShare}
          onCopy={handleCopy}
          copied={copied}
          isCapturing={isCapturing}
        />

        {screenshotUrl && (
          <div className="mb-4">
            <div className="relative h-48 overflow-hidden rounded-lg border border-gray-200">
              <img 
                src={screenshotUrl} 
                alt="Circuit Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100/50" />
            </div>
            <a 
              href={screenshotUrl}
              download="quantum-circuit.png"
              className="mt-2 text-blue-600 hover:text-blue-700 text-sm flex items-center justify-center gap-1"
            >
              Download Full Resolution Screenshot
            </a>
          </div>
        )}

        <div className="bg-gray-50 p-2 rounded-md mb-4 text-xs font-mono break-all max-h-20 overflow-y-auto text-gray-800 border border-gray-200">
          {shareText}
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};