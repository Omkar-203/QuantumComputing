import React from 'react';
import { Linkedin, Twitter, Link2, Check } from 'lucide-react';

interface ShareButtonsProps {
  onShare: (platform: 'linkedin' | 'twitter') => void;
  onCopy: () => void;
  copied: boolean;
  isCapturing: boolean;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({
  onShare,
  onCopy,
  copied,
  isCapturing
}) => (
  <div className="flex justify-center gap-4 mb-6">
    <button
      onClick={() => onShare('linkedin')}
      disabled={isCapturing}
      className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
    >
      <div className="w-12 h-12 bg-[#0A66C2] rounded-full flex items-center justify-center shadow-md">
        <Linkedin className="w-6 h-6 text-white" />
      </div>
      <span className="text-sm font-medium text-gray-700">LinkedIn</span>
    </button>

    <button
      onClick={() => onShare('twitter')}
      disabled={isCapturing}
      className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
    >
      <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-md">
        <Twitter className="w-6 h-6 text-white" />
      </div>
      <span className="text-sm font-medium text-gray-700">X (Twitter)</span>
    </button>

    <button
      onClick={onCopy}
      className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
        {copied ? (
          <Check className="w-6 h-6 text-white" />
        ) : (
          <Link2 className="w-6 h-6 text-white" />
        )}
      </div>
      <span className="text-sm font-medium text-gray-700">
        {copied ? 'Copied!' : 'Copy Link'}
      </span>
    </button>
  </div>
);